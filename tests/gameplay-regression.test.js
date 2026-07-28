const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');

function makeElement() {
  const classes = new Set();
  const element = {
    children: [],
    hidden: false,
    disabled: false,
    textContent: '',
    innerHTML: '',
    className: '',
    clientWidth: 500,
    clientHeight: 500,
    style: {
      setProperty(name, value) {
        this[name] = value;
      }
    },
    dataset: {},
    classList: {
      add(...names) {
        names.forEach(name => classes.add(name));
        element.className = [...classes].join(' ');
      },
      remove(...names) {
        names.forEach(name => classes.delete(name));
        element.className = [...classes].join(' ');
      },
      toggle(name, force) {
        const shouldAdd = force === undefined ? !classes.has(name) : Boolean(force);
        if (shouldAdd) classes.add(name);
        else classes.delete(name);
        element.className = [...classes].join(' ');
        return shouldAdd;
      },
      contains(name) {
        return classes.has(name);
      }
    },
    append(...children) {
      this.children.push(...children);
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    addEventListener() {},
    removeEventListener() {},
    getBoundingClientRect() {
      return { width: this.clientWidth, height: this.clientHeight, left: 0, top: 0 };
    },
    setAttribute(name, value) {
      this[name] = value;
    },
    getAttribute(name) {
      return this[name];
    },
    removeAttribute(name) {
      delete this[name];
    },
    querySelector() {
      return makeElement();
    },
    querySelectorAll() {
      return [];
    },
    closest() {
      return makeElement();
    }
  };
  return element;
}

function makeRandom(randomValue) {
  if (!Array.isArray(randomValue)) return () => randomValue;
  let index = 0;
  return () => {
    const value = randomValue[Math.min(index, randomValue.length - 1)] ?? 0;
    index += 1;
    return value;
  };
}

function loadGame(randomValue = 0) {
  const elementCache = new Map();
  const body = makeElement();
  let clipboardText = '';
  const document = {
    body,
    querySelector(selector) {
      if (!elementCache.has(selector)) elementCache.set(selector, makeElement());
      return elementCache.get(selector);
    },
    getElementById(id) {
      if (!elementCache.has(id)) elementCache.set(id, makeElement());
      return elementCache.get(id);
    },
    createElement() {
      return makeElement();
    }
  };
  document.execCommand = command => command === 'copy';
  const window = {
    ONE_STAR_PAWN_TEST_MODE: true,
    navigator: {
      clipboard: {
        async writeText(text) {
          clipboardText = text;
        }
      }
    },
    matchMedia() {
      return { matches: true };
    },
    requestAnimationFrame(callback) {
      return setTimeout(callback, 0);
    },
    setTimeout,
    clearTimeout
  };
  const context = vm.createContext({
    window,
    document,
    console,
    structuredClone,
    navigator: window.navigator,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Math: Object.create(Math, {
      random: {
        value: makeRandom(randomValue)
      }
    })
  });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'gameData.js'), 'utf8'), context, { filename: 'gameData.js' });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'main.js'), 'utf8'), context, { filename: 'main.js' });
  const hooks = window.ONE_STAR_PAWN_TEST_HOOKS;
  hooks.getClipboardText = () => clipboardText;
  return hooks;
}

function resetState(hooks) {
  const { state } = hooks;
  state.money = 120;
  state.reputation = 5;
  state.profit = 0;
  state.inventory = [];
  state.turn = 10;
  state.copRisk = 0;
  state.scamRisk = 0;
  state.factionPressure = { hustlers: 0, tracksuits: 0 };
  state.factionPressureSources = { hustlers: [], tracksuits: [] };
  state.consequenceQueue = [];
  state.consequenceSerial = 0;
  state.copConsequenceCooldownUntil = 0;
  state.thugConsequenceCooldownUntil = 0;
  state.tracksuitRetaliationSettlingNormalEncountersRemaining = 0;
  state.copWarnings = 0;
  state.copStrikes = 0;
  state.nextCopInvestigationRisk = 25;
  state.copInvestigationArmed = true;
  state.activeConsequence = null;
  state.normalEncountersSinceSpecial = 6;
  state.normalEncounterCount = 6;
  state.normalCustomerHistory = [];
  state.normalEncounterTypeHistory = [];
  state.sellMissStreak = 0;
  state.unavailableSellRequestStreak = 0;
  state.unavailableSellRequestCount = 0;
  state.lowCashRecoveryDryStreak = 0;
  state.lowCashRecoveryLastDiagnostics = null;
  state.lowCashRecoveryResetReason = '';
  state.buybackCooldownDiagnostics = [];
  state.currentDeal = null;
  state.currentCustomer = null;
  state.fastTestMode = false;
}

function item(hooks, id, cost = 20) {
  return hooks.createInventoryItem(hooks.getItem(id), cost, 'test_customer', '', 'Test fixture.');
}

function forceNegotiationOutcome(hooks, type, outcomeName) {
  const config = hooks.constants.NEGOTIATION_OUTCOMES;
  const key = type === 'lowball' ? 'lowballWeights' : type === 'markup' ? 'markupWeights' : 'tradeWeights';
  Object.keys(config[key]).forEach(outcome => {
    config[key][outcome] = outcome === outcomeName ? 10000 : -10000;
  });
}

function prepareSaleDeal(hooks, poolId = 'bargain_hunter_buys_dvds', itemId = 'dvd_stack') {
  const shelfItem = item(hooks, itemId, 4);
  hooks.state.inventory.push(shelfItem);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === poolId));
  hooks.applySelectedInventoryItemToDeal(deal, shelfItem);
  return { deal, shelfItem };
}

function primeChoiceSmoke(hooks, deal) {
  hooks.state.currentDeal = deal;
  hooks.state.currentCustomer = deal.customer;
  hooks.state.conversation = { phase: 'choices', lines: [], index: 0, selectedAction: null, outcome: null };
  hooks.state.isResolving = false;
  hooks.state.isTransitioningCustomer = false;
  hooks.state.isGameOver = false;
}

function activeTestCustomer(hooks, id) {
  const character = hooks.getCharacter(id);
  return {
    ...character,
    baseSpriteKey: id,
    stageSide: character.facing === 'right' ? 'left' : 'right',
    spriteBounds: {
      sourceWidth: 100,
      sourceHeight: 200,
      minX: 0,
      minY: 0,
      maxX: 99,
      maxY: 199,
      visibleWidth: 100,
      visibleHeight: 200
    }
  };
}

function prepareFastNextSmoke(hooks, deal, nextCustomerId = 'slot_grandma') {
  hooks.setFastTestMode(true);
  hooks.setActiveCustomers([
    activeTestCustomer(hooks, deal.customer.id),
    activeTestCustomer(hooks, nextCustomerId)
  ]);
  hooks.state.normalCustomerHistory = [deal.customer.id, deal.customer.id];
  primeChoiceSmoke(hooks, deal);
}

async function pressNextAndWaitForNewNpc(hooks, previousCustomerId, previousTurn) {
  assert.equal(hooks.canAdvanceConversationManually(), true);
  hooks.advanceConversation();
  hooks.advanceConversation();
  await new Promise(resolve => setTimeout(resolve, 360));
  assert.notEqual(hooks.state.currentCustomer?.id, previousCustomerId);
  assert.ok(hooks.state.currentDeal);
  assert.ok(hooks.state.turn > previousTurn);
  assert.equal(hooks.state.isTransitioningCustomer, false);
  assert.equal(hooks.state.isResolving, false);
  assert.equal(hooks.state.conversation?.phase, 'intro');
}

function prepareAutoAdvanceSmoke(hooks, deal, nextCustomerId = 'slot_grandma') {
  hooks.setActiveCustomers([
    activeTestCustomer(hooks, deal.customer.id),
    activeTestCustomer(hooks, nextCustomerId)
  ]);
  hooks.state.normalCustomerHistory = [deal.customer.id, deal.customer.id];
  primeChoiceSmoke(hooks, deal);
}

async function drainResolvedAutoAdvance(hooks, previousCustomerId, previousTurn) {
  assert.equal(hooks.state.conversation?.phase, 'resolved');
  for (let i = 0; i < 3 && hooks.state.conversation?.phase === 'resolved'; i += 1) {
    hooks.finishTypingLine();
    hooks.advanceConversation(true);
  }
  assert.equal(hooks.state.conversation?.phase, 'exiting');
  for (let i = 0; i < 12 && hooks.state.conversation?.phase !== 'intro'; i += 1) {
    await new Promise(resolve => setTimeout(resolve, 120));
  }
  assert.notEqual(hooks.state.currentCustomer?.id, previousCustomerId);
  assert.ok(hooks.state.currentDeal);
  assert.ok(hooks.state.turn > previousTurn);
  assert.equal(hooks.state.isTransitioningCustomer, false);
  assert.equal(hooks.state.isResolving, false);
  assert.equal(hooks.state.conversation?.phase, 'intro');
}

function makeCopDeal(hooks, inventoryItem = null) {
  if (inventoryItem) hooks.state.inventory.push(inventoryItem);
  const consequence = hooks.queueConsequence({
    type: 'cop_consequence',
    sourceTurn: hooks.state.turn,
    triggeringCharacterId: 'undercover_cop',
    triggeringDealId: 'test_cop_source',
    triggeringItemId: inventoryItem?.itemId || inventoryItem?.id || 'smart_watch_locked',
    triggeringInventoryInstanceId: inventoryItem?.instanceId || 'missing_tracked_instance',
    reason: 'Test cop consequence',
    earliestTurn: hooks.state.turn,
    metadata: { debug: true, triggeringItemName: inventoryItem?.name || 'Tracked Evidence' }
  });
  const deal = hooks.buildCopConsequenceDeal(consequence, hooks.getCharacter('cop_consequence'));
  deal.bribeAmount = 37;
  return { consequence, deal };
}

test('fast test mode is runtime-only and only changes presentation timing', () => {
  const hooks = loadGame(0);
  resetState(hooks);

  const normalTiming = hooks.getActivePresentationTimingSnapshot();
  const normalDelay = hooks.getAutoDialogueDelay('long enough to show normal pacing');
  hooks.typeLine('Slow receipt.');
  assert.notEqual(hooks.getDialogueText(), 'Slow receipt.');
  assert.equal(hooks.finishTypingLine(), true);

  hooks.setFastTestMode(true);
  const fastTiming = hooks.getActivePresentationTimingSnapshot();
  assert.equal(hooks.isFastTestModeEnabled(), true);
  assert.equal(hooks.isFastTestCssActive(), true);
  assert.ok(hooks.getAutoDialogueDelay('long enough to show normal pacing') < normalDelay);
  assert.ok(fastTiming.dialogueTypewriterMs < normalTiming.dialogueTypewriterMs);
  assert.ok(fastTiming.entranceMs < normalTiming.entranceMs);
  assert.ok(fastTiming.reactionMs < normalTiming.reactionMs);
  assert.ok(fastTiming.exitMs < normalTiming.exitMs);
  assert.ok(fastTiming.nextEncounterDelayMs < normalTiming.nextEncounterDelayMs);
  assert.ok(fastTiming.npcTransitionSettleMs < normalTiming.npcTransitionSettleMs);
  hooks.typeLine('Instant receipt.');
  assert.equal(hooks.getDialogueText(), 'Instant receipt.');
  assert.equal(hooks.state.fastTestMode, true);

  hooks.setFastTestMode(false);
  const restoredTiming = hooks.getActivePresentationTimingSnapshot();
  assert.equal(hooks.isFastTestModeEnabled(), false);
  assert.equal(hooks.isFastTestCssActive(), false);
  assert.deepEqual(restoredTiming, normalTiming);

  const reloadedHooks = loadGame(0);
  assert.equal(reloadedHooks.isFastTestModeEnabled(), false);
});

test('normal mode smoke: standard purchase uses resolveChoice and records full turn history', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('buyAsk');

  assert.equal(hooks.isFastTestModeEnabled(), false);
  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.money, 120 - deal.defaultOffer);
  assert.equal(hooks.state.inventory.length, 1);
  assert.equal(hooks.state.inventory[0].itemId, deal.item.id);
  assert.equal(hooks.getTurnHistory().length, 1);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /Inventory: \+/);
  assert.match(hooks.getVisibleDealPanelText(), /item is now yours|problem/i);
  assert.equal(hooks.finishTypingLine(), true);
  hooks.resetAutoProgress();
});

test('v0.1.26 accepted marked-up sale auto-advances exactly once', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'accepted');
  const { deal, shelfItem } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
  deal.salePrice = 50;
  deal.markupPrice = 65;
  prepareAutoAdvanceSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('markup');

  assert.equal(hooks.state.money, 120 + deal.markupPrice);
  assert.equal(hooks.state.inventory.some(item => item.instanceId === shelfItem.instanceId), false);
  await drainResolvedAutoAdvance(hooks, deal.customer.id, previousTurn);
  assert.equal(hooks.state.turn, previousTurn + 1);
});

test('v0.1.26 Tracksuit final refusal after rejected lowball queues future thug and still advances normally', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = 31;
  hooks.state.factionPressure.tracksuit_crew = 3;
  forceNegotiationOutcome(hooks, 'lowball', 'rejectedOriginal');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_gold_watch'));
  prepareAutoAdvanceSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('lowball');
  assert.equal(hooks.state.conversation.phase, 'choices');
  assert.equal(hooks.state.currentCustomer.id, '70s_hustler');
  hooks.resolveChoice('refuse');

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 4);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && !entry.resolved).length, 1);
  await drainResolvedAutoAdvance(hooks, deal.customer.id, previousTurn);
  assert.equal(hooks.state.turn, previousTurn + 1);
  assert.notEqual(hooks.state.currentCustomer?.id, 'tracksuit_thug');
});

test('v0.1.26 non-terminal counteroffer flow does not auto-advance until final refusal', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'counteroffer');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
  prepareAutoAdvanceSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('markup');

  assert.equal(hooks.state.conversation.phase, 'choices');
  assert.equal(hooks.state.currentCustomer.id, deal.customer.id);
  assert.equal(hooks.state.turn, previousTurn);
  hooks.resolveChoice('refuse');
  await drainResolvedAutoAdvance(hooks, deal.customer.id, previousTurn);
});

test('v0.1.26 accepted normal-price sale and completed seller purchase auto-advance', async () => {
  let hooks = loadGame(0);
  resetState(hooks);
  let prepared = prepareSaleDeal(hooks, 'bargain_hunter_buys_dvds', 'dvd_stack');
  prepareAutoAdvanceSmoke(hooks, prepared.deal, 'slot_grandma');
  let previousTurn = hooks.state.turn;

  hooks.resolveChoice('sellTag');
  await drainResolvedAutoAdvance(hooks, prepared.deal.customer.id, previousTurn);

  hooks = loadGame(0);
  resetState(hooks);
  const buyDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  prepareAutoAdvanceSmoke(hooks, buyDeal);
  previousTurn = hooks.state.turn;

  hooks.resolveChoice('buyAsk');
  await drainResolvedAutoAdvance(hooks, buyDeal.customer.id, previousTurn);
});

test('v0.1.26 rejected markup stays open without advancing', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'rejectedOriginal');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
  prepareAutoAdvanceSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('markup');

  assert.equal(hooks.state.conversation.phase, 'choices');
  assert.equal(hooks.state.currentCustomer.id, deal.customer.id);
  assert.equal(hooks.state.turn, previousTurn);
  assert.equal(deal.resolvedAction, undefined);
});

test('v0.1.26 resolved trade and special consequence auto-advance', async () => {
  let hooks = loadGame(0);
  resetState(hooks);
  const sourceItem = item(hooks, 'gold_ring_engravings', 88);
  hooks.state.inventory.push(sourceItem);
  let deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [sourceItem.instanceId];
  deal.requestedInventoryItems = [sourceItem];
  deal.requestedInventoryItem = sourceItem;
  prepareAutoAdvanceSmoke(hooks, deal);
  let previousTurn = hooks.state.turn;

  hooks.resolveChoice('submitTradeOffer');
  assert.equal(hooks.state.conversation.phase, 'choices');
  hooks.resolveChoice('confirmTrade');
  await drainResolvedAutoAdvance(hooks, deal.customer.id, previousTurn);

  hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 80;
  hooks.state.factionPressure.tracksuit_crew = 4;
  const consequence = hooks.queueThugConsequence('progression smoke', { debug: true });
  deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));
  prepareAutoAdvanceSmoke(hooks, deal, 'slot_grandma');
  previousTurn = hooks.state.turn;

  hooks.resolveChoice('thugCash');
  await drainResolvedAutoAdvance(hooks, deal.customer.id, previousTurn);
});

test('copy turn history copies complete log without mutating game state', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const firstDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  primeChoiceSmoke(hooks, firstDeal);
  hooks.resolveChoice('buyAsk');
  const secondDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  primeChoiceSmoke(hooks, secondDeal);
  hooks.resolveChoice('refuse');
  const before = {
    state: hooks.snapshotState(),
    fastTestMode: hooks.isFastTestModeEnabled(),
    historyLength: hooks.getTurnHistory().length,
    conversationPhase: hooks.state.conversation?.phase
  };

  const result = await hooks.copyTurnHistory();

  assert.equal(result.copied, true);
  assert.equal(hooks.getClipboardText(), hooks.getTurnHistoryCopyText());
  assert.match(result.text, /T10|T\d+/);
  assert.match(result.text, /Purchase:/);
  assert.match(result.text, /Faction merchandise refusal|no inventory, money, profit, reputation, cop risk, scam risk, or faction pressure changed/i);
  assert.equal(hooks.getCopyHistoryLabel(), 'COPIED');
  assert.deepEqual(hooks.snapshotState(), before.state);
  assert.equal(hooks.isFastTestModeEnabled(), before.fastTestMode);
  assert.equal(hooks.getTurnHistory().length, before.historyLength);
  assert.equal(hooks.state.conversation?.phase, before.conversationPhase);
});

test('v0.1.29 consequence meters read distinct cop, hustler, and tracksuit state', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure = { hustlers: 2, tracksuits: 3 };
  hooks.state.copRisk = 14;
  hooks.state.nextCopInvestigationRisk = 25;

  const meters = hooks.getConsequenceDiagnostics();
  const cop = meters.find(meter => meter.id === 'cop');
  const hustler = meters.find(meter => meter.id === 'hustlers');
  const tracksuit = meters.find(meter => meter.id === 'tracksuits');

  assert.equal(cop.value, 14);
  assert.equal(cop.threshold, 25);
  assert.equal(hustler.value, 2);
  assert.equal(tracksuit.value, 3);
  assert.match(hustler.detail, /Thug hustler-heavy/);
  assert.match(hustler.detail, /Event hustler_thug_robbery/);
  assert.match(tracksuit.detail, /Thug tracksuit-thug/);
  assert.match(tracksuit.detail, /Event tracksuit_thug_robbery/);
});

test('v0.1.29 consequence meters show queued eligibility, chance, active, and cooldown state', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure = { tracksuits: 4 };
  hooks.state.normalEncountersSinceSpecial = 6;
  const queued = hooks.queueThugConsequence('diagnostic test', { debug: true });
  queued.earliestTurn = hooks.state.turn;

  let tracksuit = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'tracksuits');
  assert.equal(tracksuit.queued, true);
  assert.equal(tracksuit.active, false);
  assert.equal(tracksuit.selectionChance, 25);
  assert.match(tracksuit.status, /Eligible: 25% chance/);

  hooks.state.activeConsequence = queued;
  tracksuit = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'tracksuits');
  assert.equal(tracksuit.active, true);
  assert.match(tracksuit.status, /currently active/);

  hooks.state.activeConsequence = null;
  hooks.state.normalEncountersSinceSpecial = 2;
  tracksuit = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'tracksuits');
  assert.equal(tracksuit.selectionChance, null);
  assert.match(tracksuit.status, /Waiting for shared cooldown/);
  assert.match(tracksuit.detail, /Cooldown 2\/6/);
});

test('v0.1.33 copy consequence meters includes build and all meter diagnostics', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure = { hustlers: 1, tracksuits: 3 };
  hooks.state.copRisk = 20;
  hooks.state.nextCopInvestigationRisk = 25;

  const result = await hooks.copyConsequenceMeters();

  assert.equal(result.copied, true);
  assert.equal(hooks.getClipboardText(), hooks.getConsequenceMetersCopyText());
  assert.match(result.text, /Build: v0\.1\.33/);
  assert.match(result.text, /Cop\nRisk: 20\/25/);
  assert.match(result.text, /Hustler Thug\nFaction: hustlers\nPressure: 1\/4/);
  assert.match(result.text, /Thug: hustler-heavy/);
  assert.match(result.text, /Event: hustler_thug_robbery/);
  assert.match(result.text, /Tracksuit Thug\nFaction: tracksuits\nPressure: 3\/4/);
  assert.match(result.text, /Thug: tracksuit-thug/);
  assert.match(result.text, /Event: tracksuit_thug_robbery/);
  assert.equal(hooks.getCopyConsequenceMetersLabel(), 'COPIED');
});

test('v0.1.30 restored normal NPC data chains resolve from generated data', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const expected = [
    ['regular-business-drunk', 'regular_business_drunk_sunglasses', 'regular_business_drunk_sunglasses_offer', 'assets/sprites/regular-business-drunk-idle_i.png'],
    ['regular-lady-divorce', 'regular_lady_divorce_gold_bracelet', 'regular_lady_divorce_bracelet_offer', 'assets/sprites/regular-lady-divorce-idle_r.png'],
    ['old-grandma-slots', 'old_grandma_slots_gold_ring', 'old_grandma_slots_ring_offer', 'assets/sprites/old_grandma-slots_idel_r.png'],
    ['senior-grandpa-catfish', 'senior_grandpa_catfish_drill', 'senior_grandpa_catfish_tool_offer', 'assets/sprites/senior-grandpa-catfish-idle_l.png']
  ];

  expected.forEach(([characterId, poolId, eventId, spritePath]) => {
    const character = hooks.getCharacter(characterId);
    assert.ok(character, `${characterId} character`);
    assert.equal(character.activeInRotation, true);
    assert.equal(character.spritePath, spritePath);
    assert.ok(hooks.getTraits(characterId).characterId, `${characterId} traits`);
    assert.ok(hooks.data.characterItemPools.some(pool => pool.id === poolId && pool.characterId === characterId), `${characterId} pool`);
    assert.ok(hooks.data.eventBlueprints.some(event => event.id === eventId && event.characterId === characterId), `${characterId} event`);
  });
});

test('v0.1.30 restored normal NPCs have executable selectable encounters', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  [
    'regular-business-drunk',
    'regular-lady-divorce',
    'old-grandma-slots',
    'senior-grandpa-catfish'
  ].forEach(characterId => {
    const character = hooks.getCharacter(characterId);
    const pools = hooks.getSelectablePoolsForCharacter(character);
    assert.ok(pools.length > 0, `${characterId} selectable pools`);
    const deal = hooks.buildDeal(pools[0]);
    assert.equal(deal.customer.id, characterId);
    assert.ok(deal.blueprint, `${characterId} matching event blueprint`);
  });
});

test('v0.1.30 hustler thug event resolves, queues, and updates the meter', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = 20;
  hooks.setFactionPressure('hustlers', hooks.constants.TRACKSUIT_CONSEQUENCE_MIN_PRESSURE);

  let hustler = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'hustlers');
  assert.match(hustler.detail, /Thug hustler-heavy/);
  assert.match(hustler.detail, /Event hustler_thug_robbery/);

  const consequence = hooks.maybeQueueFactionThugConsequence('hustlers', { customer: hooks.getCharacter('hustler-sista'), thugHistoryLines: [] }, 'hustler test threshold');
  assert.ok(consequence);
  assert.equal(consequence.factionId, 'hustlers');
  assert.equal(consequence.metadata.thugCharacterId, 'hustler-heavy');

  hustler = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'hustlers');
  assert.equal(hustler.queued, true);
  assert.match(hustler.detail, /Event hustler_thug_robbery/);
});

test('v0.1.31 hustler lowball consequence applies hustler pressure without touching tracksuits', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 1);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  const history = hooks.getTurnHistory()[0].lines.join('\n');
  assert.match(history, /Hustler Pressure: 0 -> 1 \(\+1\)/);
  assert.match(history, /faction pressure applied to hustlers/);
  assert.doesNotMatch(history, /penalty had no visible state change/);
  const hustler = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'hustlers');
  assert.equal(hustler.value, 1);
});

test('v0.1.31 hustler-kangol uses the same generic hustler pressure path', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_kangol_locked_watch'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 1);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /Kangol retaliated after a hostile lowball outcome|Hustler Pressure/);
});

test('v0.1.31 tracksuit lowball consequence still applies tracksuit pressure only', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_legs_locked_watch'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.tracksuits, 1);
  assert.equal(hooks.state.factionPressure.hustlers, 0);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /Tracksuit Pressure: 0 -> 1 \(\+1\)/);
});

test('v0.1.31 non-faction lowball consequence falls back visibly without faction pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'regular_lady_divorce_gold_bracelet'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 0);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  assert.ok(hooks.state.reputation < 5);
  const history = hooks.getTurnHistory()[0].lines.join('\n');
  assert.match(history, /not an implemented faction pressure source|reputation 5 -> 4/);
  assert.doesNotMatch(history, /penalty had no visible state change/);
});

test('v0.1.31 accepted mild hustler lowball does not automatically add pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 500;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  deal.lowballPrice = Math.round(deal.askingPrice * 0.8);
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 0);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  assert.doesNotMatch(hooks.getTurnHistory()[0].lines.join('\n'), /Hustler Pressure:/);
});

test('v0.1.32 accepted moderate hustler lowball applies hustler pressure only', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 500;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  deal.lowballPrice = Math.round(deal.askingPrice * 0.6);
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(deal.lowballOutcome, 'accepted');
  assert.equal(hooks.state.factionPressure.hustlers, 1);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  const history = hooks.getTurnHistory()[0].lines.join('\n');
  assert.match(history, /Faction pressure evaluation: accepted moderate lowball; faction hustlers; rule accepted seller lowball; pressure 0 -> 1 \(\+1\)/);
  assert.match(history, /duplicate guard clear/);
});

test('v0.1.32 accepted severe hustler hidden-problem lowball applies pressure once', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 500;
  forceNegotiationOutcome(hooks, 'lowball', 'acceptedHiddenProblem');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  deal.lowballPrice = Math.round(deal.askingPrice * 0.4);
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(deal.lowballOutcome, 'acceptedHiddenProblem');
  assert.equal(hooks.state.factionPressure.hustlers, 1);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  const history = hooks.getTurnHistory()[0].lines.join('\n');
  assert.equal((history.match(/Faction pressure source: hustlers/g) || []).length, 1);
  assert.match(history, /accepted severe lowball/);
});

test('v0.1.32 accepted mild hustler lowball records below-severity diagnostic', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 500;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  deal.lowballPrice = Math.round(deal.askingPrice * 0.8);
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 0);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /accepted mild lowball; faction hustlers; rule mild accepted seller lowball; pressure \+0; .*below pressure rule/);
});

test('v0.1.32 accepted moderate tracksuit lowball applies tracksuit pressure only', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 500;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_legs_locked_watch'));
  deal.lowballPrice = Math.round(deal.askingPrice * 0.6);
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.tracksuits, 1);
  assert.equal(hooks.state.factionPressure.hustlers, 0);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /Faction pressure evaluation: accepted moderate lowball; faction tracksuits; rule accepted seller lowball; pressure 0 -> 1 \(\+1\)/);
});

test('v0.1.32 accepted moderate hustler markup applies hustler pressure only', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'accepted');
  const { deal } = prepareSaleDeal(hooks, 'hustler_sista_buys_watch', 'suspicious_gold_watch');
  deal.salePrice = 40;
  deal.defaultSalePrice = 40;
  deal.markupPrice = 54;
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('markup');

  assert.equal(deal.markupOutcome, 'accepted');
  assert.equal(hooks.state.factionPressure.hustlers, 1);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /completed moderate markup; faction hustlers; rule completed aggressive markup; pressure 0 -> 1 \(\+1\)/);
});

test('v0.1.32 counteroffer after aggressive hustler markup applies pressure once from original markup', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'counteroffer');
  const { deal } = prepareSaleDeal(hooks, 'hustler_sista_buys_watch', 'suspicious_gold_watch');
  deal.salePrice = 40;
  deal.defaultSalePrice = 40;
  deal.markupPrice = 54;
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('markup');
  assert.equal(deal.counterofferOpen, true);
  hooks.resolveChoice('acceptCounteroffer');

  assert.equal(hooks.state.factionPressure.hustlers, 1);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  const history = hooks.getTurnHistory()[0].lines.join('\n');
  assert.equal((history.match(/Faction pressure source: hustlers/g) || []).length, 1);
  assert.match(history, /completed moderate markup; faction hustlers; rule completed aggressive markup; pressure 0 -> 1 \(\+1\)/);
});

test('v0.1.32 normal asking-price faction transaction adds no pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal } = prepareSaleDeal(hooks, 'hustler_sista_buys_watch', 'suspicious_gold_watch');
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('sellTag');

  assert.equal(hooks.state.factionPressure.hustlers, 0);
  assert.equal(hooks.state.factionPressure.tracksuits, 0);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /normal asking-price transaction; faction hustlers; pressure \+0; .*fair transaction, no pressure/);
});

test('v0.1.32 explicit hostile consequence pressure does not duplicate', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 1);
  const history = hooks.getTurnHistory()[0].lines.join('\n');
  assert.equal((history.match(/Faction pressure source: hustlers/g) || []).length, 1);
  assert.match(history, /hostile moderate lowball; faction hustlers; rule hostile seller lowball; pressure 0 -> 1 \(\+1\)/);
});

test('v0.1.32 accepted faction lowball queues matching thug at threshold and refreshes meter', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = 20;
  hooks.state.money = 500;
  hooks.state.factionPressure.hustlers = 3;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  deal.lowballPrice = Math.round(deal.askingPrice * 0.6);
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 4);
  const queued = hooks.state.consequenceQueue.find(entry => entry.type === 'thug_robbery_consequence' && entry.factionId === 'hustlers' && !entry.resolved);
  assert.ok(queued);
  assert.equal(queued.metadata.thugCharacterId, 'hustler-heavy');
  const hustler = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'hustlers');
  assert.equal(hustler.value, 4);
  assert.equal(hustler.queued, true);
  assert.match(hustler.detail, /Event hustler_thug_robbery/);
});

test('v0.1.32 accepted tracksuit lowball queues tracksuit thug at threshold', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = 20;
  hooks.state.money = 500;
  hooks.state.factionPressure.tracksuits = 3;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_legs_locked_watch'));
  deal.lowballPrice = Math.round(deal.askingPrice * 0.6);
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.tracksuits, 4);
  const queued = hooks.state.consequenceQueue.find(entry => entry.type === 'thug_robbery_consequence' && entry.factionId === 'tracksuits' && !entry.resolved);
  assert.ok(queued);
  assert.equal(queued.metadata.thugCharacterId, 'tracksuit-thug');
  const tracksuit = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'tracksuits');
  assert.equal(tracksuit.value, 4);
  assert.equal(tracksuit.queued, true);
  assert.match(tracksuit.detail, /Event tracksuit_thug_robbery/);
});

test('v0.1.32 admin panel starts with history controls before consequence meters', () => {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /Buy low, sell ugly/);
  assert.doesNotMatch(html, /Hidden trouble: cops, bruisers, and refunds/);
  const notesStart = html.indexOf('<aside class="notes">');
  const turnHistory = html.indexOf('Turn History', notesStart);
  const build = html.indexOf('id="game-version"', turnHistory);
  const fast = html.indexOf('id="fastTestToggle"', build);
  const copyMeters = html.indexOf('id="copyConsequenceMeters"', fast);
  const copy = html.indexOf('id="copyHistory"', copyMeters);
  const clear = html.indexOf('id="clearHistory"', copy);
  const meters = html.indexOf('Consequence Meters', clear);
  const historyList = html.indexOf('id="historyList"', meters);
  assert.ok(notesStart >= 0);
  assert.ok(turnHistory > notesStart);
  assert.ok(build > turnHistory);
  assert.ok(fast > build);
  assert.ok(copyMeters > fast);
  assert.ok(copy > copyMeters);
  assert.ok(clear > copy);
  assert.ok(meters > clear);
  assert.ok(historyList > meters);
  assert.match(html, /gameData\.js\?v=0\.1\.33/);
  assert.match(html, /main\.js\?v=0\.1\.33/);
});

test('v0.1.31 hustler pressure threshold queues hustler thug through shared scheduler', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = 20;
  hooks.state.factionPressure.hustlers = 3;
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hustler_sista_locked_watch'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');

  assert.equal(hooks.state.factionPressure.hustlers, 4);
  const queued = hooks.state.consequenceQueue.find(entry => entry.type === 'thug_robbery_consequence' && entry.factionId === 'hustlers' && !entry.resolved);
  assert.ok(queued);
  assert.equal(queued.metadata.thugCharacterId, 'hustler-heavy');
  const hustler = hooks.getConsequenceDiagnostics().find(meter => meter.id === 'hustlers');
  assert.equal(hustler.queued, true);
  assert.match(hustler.detail, /Event hustler_thug_robbery/);
});

test('fast mode smoke: standard purchase resumes to a new NPC after Next', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  prepareFastNextSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('buyAsk');

  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.money, 120 - deal.defaultOffer);
  assert.equal(hooks.state.inventory.length, 1);
  assert.equal(hooks.getTurnHistory().length, 1);
  assert.match(hooks.getVisibleDealPanelText(), /item is now yours|problem/i);
  await new Promise(resolve => setTimeout(resolve, 160));
  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.conversation.index, 1);

  await pressNextAndWaitForNewNpc(hooks, deal.customer.id, previousTurn);
});

test('fast mode smoke: inventory-selected sale pauses on the resolved result and resumes to a new NPC', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  prepareFastNextSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('sellTag');

  assert.equal(hooks.isFastTestModeEnabled(), true);
  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.money, 120 + deal.salePrice);
  assert.equal(hooks.state.inventory.some(item => item.instanceId === shelfItem.instanceId), false);
  assert.equal(hooks.getTurnHistory().length, 1);
  assert.match(hooks.getTurnHistory()[0].lines.join('\n'), /Sale:|Inventory: -/);
  assert.match(hooks.getVisibleDealPanelText(), /Sold|register/i);
  await new Promise(resolve => setTimeout(resolve, 160));
  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.conversation.index, 1);
  assert.match(hooks.getDialogueText(), /deal is closed|Sold|register/i);
  assert.match(hooks.getVisibleDealPanelText(), /deal is closed|Sold|register/i);

  await pressNextAndWaitForNewNpc(hooks, deal.customer.id, previousTurn);
});

test('fast mode smoke: refusal resumes to a new NPC after Next without transaction mutation', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  prepareFastNextSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('refuse');

  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.money, 120);
  assert.equal(hooks.state.inventory.length, 0);
  assert.equal(hooks.getTurnHistory().length, 1);
  await new Promise(resolve => setTimeout(resolve, 160));
  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.conversation.index, 1);

  await pressNextAndWaitForNewNpc(hooks, deal.customer.id, previousTurn);
});

test('successful demand-cash trade receives Collectible Action Figure with instance history', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const sourceItem = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(sourceItem);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_figure_trade'));
  deal.cashInstead = 38;
  deal.selectedTradeInventoryInstanceIds = [sourceItem.instanceId];
  deal.requestedInventoryItems = [sourceItem];
  deal.requestedInventoryItem = sourceItem;

  const before = hooks.snapshotState();
  const pending = hooks.resolveTrade('tradeCash', deal);
  assert.match(pending.text || pending, /Review trade/i);
  const result = hooks.resolveTrade('confirmTrade', deal);
  const after = hooks.snapshotState();
  const lines = hooks.buildHistoryLines(before, after, deal);

  assert.equal(hooks.state.money, 158);
  assert.equal(hooks.state.reputation, 6);
  assert.equal(hooks.state.inventory.length, 1);
  assert.equal(hooks.state.inventory[0].itemId, 'rare_action_figure');
  assert.match(hooks.state.inventory[0].instanceId, /^inv_\d{4}$/);
  assert.deepEqual(Array.from(hooks.state.inventory[0].tags), ['rare', 'broken']);
  assert.equal(hooks.state.inventory[0].condition, 'used');
  assert.equal(hooks.state.inventory[0].costBasis, 26);
  assert.equal(hooks.state.inventory[0].acquisitionCost, 26);
  assert.ok(lines.some(line => line.includes(`Inventory: - Gold Ring`) && line.includes(sourceItem.instanceId)));
  assert.ok(lines.some(line => line.includes('Inventory: + Rare Action Figure, No Head') && line.includes(hooks.state.inventory[0].instanceId)));
  assert.ok(lines.some(line => line.includes('Trade Summary: gave Gold Ring')));
  assert.ok(lines.some(line => line.includes('Trade basis: surrendered basis $64') && line.includes('cash received $38') && line.includes('$26')));
  assert.match(result.text || result, /Trade Summary|trade clears/i);
});

test('successful named item-for-item trades swap inventory through instance workflow', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const sourceItem = item(hooks, 'gold_ring_engravings', 88);
  hooks.state.inventory.push(sourceItem);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [sourceItem.instanceId];
  deal.requestedInventoryItems = [sourceItem];
  deal.requestedInventoryItem = sourceItem;

  const before = hooks.snapshotState();
  const pending = hooks.resolveTrade('submitTradeOffer', deal);
  assert.match(pending.text || pending, /Review trade/i);
  hooks.resolveTrade('confirmTrade', deal);
  const after = hooks.snapshotState();
  const lines = hooks.buildHistoryLines(before, after, deal);

  assert.equal(hooks.state.inventory.length, 1);
  assert.equal(hooks.state.inventory[0].itemId, 'pocket_knife');
  assert.notEqual(hooks.state.inventory[0].instanceId, sourceItem.instanceId);
  assert.equal(hooks.state.inventory[0].costBasis, 88);
  assert.ok(lines.some(line => line.includes(`Inventory: - Gold Ring`) && line.includes(sourceItem.instanceId)));
  assert.ok(lines.some(line => line.includes('Inventory: + Pocket Knife') && line.includes(hooks.state.inventory[0].instanceId)));
  assert.ok(lines.some(line => line.includes('Trade Summary:')));
});

test('failed demand-cash trade does not mutate inventory', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  const sourceItem = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(sourceItem);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_figure_trade'));
  deal.selectedTradeInventoryInstanceIds = [sourceItem.instanceId];
  deal.requestedInventoryItems = [sourceItem];
  deal.requestedInventoryItem = sourceItem;

  hooks.resolveTrade('tradeCash', deal);

  assert.equal(hooks.state.inventory.length, 1);
  assert.equal(hooks.state.inventory[0].instanceId, sourceItem.instanceId);
  assert.equal(hooks.state.inventory[0].itemId, 'gold_ring_engravings');
});

test('v0.1.23 failed Hitman cash-demand trade resolves terminally and next customer starts', async () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  const sourceItem = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(sourceItem);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  deal.cashInstead = 20;
  deal.selectedTradeInventoryInstanceIds = [sourceItem.instanceId];
  deal.requestedInventoryItems = [sourceItem];
  deal.requestedInventoryItem = sourceItem;
  prepareFastNextSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;
  const before = hooks.snapshotState();

  hooks.resolveChoice('tradeCash');

  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(deal.resolvedAction, 'tradeCash');
  assert.equal(deal.pendingTradeConfirmation, null);
  assert.deepEqual(Array.from(deal.selectedTradeInventoryInstanceIds), []);
  assert.equal(deal.requestedInventoryItem, null);
  assert.equal(hooks.state.inventory.length, 1);
  assert.equal(hooks.state.inventory[0].instanceId, sourceItem.instanceId);
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.profit, before.profit);
  assert.equal(hooks.state.reputation, before.reputation);
  assert.equal(hooks.state.scamRisk, before.scamRisk);
  assert.equal(hooks.getTurnHistory().length, 1);
  const history = hooks.getTurnHistory()[0].lines.join('\n');
  assert.match(history, /ordinary failed negotiation, not refund\/dispute payout/i);
  assert.match(history, /ordinary pressure capped \d+ -> [12]/i);
  assert.ok((hooks.state.factionPressure.tracksuit_crew || 0) <= 2);
  assert.match(history, /Finalized trade state after cash-demand resolution/i);

  hooks.setActiveCustomers([activeTestCustomer(hooks, 'slot_grandma')]);
  await new Promise(resolve => setTimeout(resolve, 160));
  assert.equal(hooks.state.conversation.phase, 'resolved');
  assert.equal(hooks.state.conversation.index, 1);
  await pressNextAndWaitForNewNpc(hooks, deal.customer.id, previousTurn);
});

test('v0.1.27 identical item_id trade candidates are excluded from selection', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const cards = item(hooks, 'baseball_card_box', 16);
  const ring = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(cards, ring);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_cards_trade'));
  hooks.state.currentDeal = deal;

  hooks.openTradeSelection();

  const eligible = hooks.getEligibleTradeInventoryItems(deal);
  assert.equal(eligible.some(entry => entry.instanceId === cards.instanceId), false);
  assert.equal(eligible.some(entry => entry.instanceId === ring.instanceId), true);
  const history = (deal.tradeHistoryLines || []).join('\n');
  assert.match(history, new RegExp(`Trade candidate excluded: Box of Baseball Cards \\[${cards.instanceId}\\]; same item type as offered Box of Baseball Cards\\.`));
  assert.match(history, new RegExp(`Trade selection opened: eligible \\[${ring.instanceId}\\]`));
  assert.equal(hooks.isInventoryOpen(), true);
});

test('v0.1.27 baseball cards cannot be traded for baseball cards even with cash', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const cards = item(hooks, 'baseball_card_box', 16);
  hooks.state.inventory.push(cards);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_cards_trade'));
  deal.cashAdjustment = -25;
  deal.cashInstead = 25;
  deal.selectedTradeInventoryInstanceIds = [cards.instanceId];
  deal.requestedInventoryItems = [cards];
  deal.requestedInventoryItem = cards;
  const before = hooks.snapshotState();

  const submit = hooks.resolveTrade('submitTradeOffer', deal);
  const demandCash = hooks.resolveTrade('tradeCash', deal);
  const after = hooks.snapshotState();

  assert.match(submit.text, /same item type as the offered Box of Baseball Cards/i);
  assert.match(demandCash.text, /same item type as the offered Box of Baseball Cards/i);
  assert.equal(deal.tradeSubmissions || 0, 0);
  assert.equal(after.money, before.money);
  assert.equal(after.profit, before.profit);
  assert.equal(after.reputation, before.reputation);
  assert.equal(after.copRisk, before.copRisk);
  assert.equal(after.scamRisk, before.scamRisk);
  assert.deepEqual(after.inventory.map(entry => entry.instanceId), before.inventory.map(entry => entry.instanceId));
});

test('v0.1.27 no eligible inventory after identical-item exclusion keeps trade unavailable cleanly', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const cards = item(hooks, 'baseball_card_box', 16);
  hooks.state.inventory.push(cards);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_cards_trade'));
  hooks.state.currentDeal = deal;
  deal.selectedTradeInventoryInstanceIds = [cards.instanceId];
  const before = hooks.snapshotState();

  hooks.openTradeSelection();
  const refuse = hooks.resolveTrade('refuse', deal);
  const after = hooks.snapshotState();

  assert.equal(hooks.isInventoryOpen(), false);
  assert.equal(deal.selectedTradeInventoryInstanceIds.length, 0);
  assert.equal(deal.requestedInventoryItem, null);
  assert.match((deal.tradeHistoryLines || []).join('\n'), /Trade unavailable: no eligible inventory after identical-item exclusion/i);
  assert.match(refuse.text, /refuse the trade/i);
  assert.equal(after.money, before.money);
  assert.equal(after.profit, before.profit);
  assert.equal(after.reputation, before.reputation);
  assert.equal(after.copRisk, before.copRisk);
  assert.equal(after.scamRisk, before.scamRisk);
  assert.deepEqual(after.inventory.map(entry => entry.instanceId), before.inventory.map(entry => entry.instanceId));
});

test('v0.1.27 different item types remain eligible and normal trade confirmation still works', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const ring = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(ring);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_cards_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [ring.instanceId];

  const evaluation = hooks.evaluateTradeOffer(deal);
  const pending = hooks.resolveTrade('submitTradeOffer', deal);
  hooks.resolveTrade('confirmTrade', deal);

  assert.equal(evaluation.canSubmit, true);
  assert.match(pending.text, /Review trade/i);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === ring.instanceId), false);
  assert.equal(hooks.state.inventory.some(entry => entry.itemId === 'baseball_card_box'), true);
});

test('v0.1.27 repeated customer item offers remain possible across separate encounters', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const cardsPool = hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_cards_trade');
  const redHustlerPool = hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_figure_trade');

  const firstDeal = hooks.buildDeal(cardsPool);
  const secondDeal = hooks.buildDeal(cardsPool);
  const firstRedHustlerDeal = hooks.buildDeal(redHustlerPool);
  const secondRedHustlerDeal = hooks.buildDeal(redHustlerPool);

  assert.equal(firstDeal.customer.id, '70s_hustler');
  assert.equal(secondDeal.customer.id, '70s_hustler');
  assert.equal(firstDeal.item.id, 'baseball_card_box');
  assert.equal(secondDeal.item.id, 'baseball_card_box');
  assert.equal(firstRedHustlerDeal.customer.id, 'red_hustler');
  assert.equal(secondRedHustlerDeal.customer.id, 'red_hustler');
  assert.equal(firstRedHustlerDeal.item.id, 'rare_action_figure');
  assert.equal(secondRedHustlerDeal.item.id, 'rare_action_figure');
});

test('rejected player-selected trade can be changed and accepted', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  const tablet = item(hooks, 'cracked_tablet', 18);
  hooks.state.inventory.push(dvd, tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));
  deal.cashAdjustment = 0;

  deal.selectedTradeInventoryInstanceIds = [dvd.instanceId];
  let before = hooks.snapshotState();
  let result = hooks.resolveTrade('submitTradeOffer', deal);
  assert.equal(result.keepEncounterOpen, true);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.equal(hooks.state.money, before.money);
  assert.match(result.text, /reject/i);

  deal.selectedTradeInventoryInstanceIds = [dvd.instanceId, tablet.instanceId];
  before = hooks.snapshotState();
  result = hooks.resolveTrade('submitTradeOffer', deal);
  assert.match(result.text || result, /Review trade/i);
  result = hooks.resolveTrade('confirmTrade', deal);

  assert.match(result.text || result, /Trade accepted/i);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), false);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === tablet.instanceId), false);
  assert.equal(hooks.state.inventory.some(entry => entry.itemId === 'silverware_bundle'), true);
});

test('trade no-deal ends without money or inventory mutation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const sourceItem = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(sourceItem);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  const before = hooks.snapshotState();

  const result = hooks.resolveTrade('refuse', deal);

  assert.equal(deal.resolvedAction, 'refuse');
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.equal(hooks.state.inventory[0].instanceId, sourceItem.instanceId);
  assert.match(result.text || result, /refuse/i);
});

test('multi-item trade offer does not duplicate inventory removal', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  const tablet = item(hooks, 'cracked_tablet', 18);
  hooks.state.inventory.push(dvd, tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [dvd.instanceId, dvd.instanceId, tablet.instanceId];

  hooks.resolveTrade('submitTradeOffer', deal);
  hooks.resolveTrade('confirmTrade', deal);

  assert.equal(deal.transaction.removedItems.length, 2);
  assert.deepEqual(new Set(deal.transaction.removedItems.map(entry => entry.instanceId)).size, 2);
  assert.equal(hooks.state.inventory.filter(entry => entry.itemId === 'silverware_bundle').length, 1);
});

test('normal selection blocks Bum on the third consecutive normal selection', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setActiveCustomers([hooks.getCharacter('bum'), hooks.getCharacter('slot_grandma')]);
  hooks.state.normalCustomerHistory = ['bum', 'bum'];

  const selection = hooks.chooseNextCustomerWithPools();

  assert.equal(selection.customer.id, 'slot_grandma');
  assert.deepEqual(Array.from(selection.diagnostics.blockedCustomerIds), ['bum']);
  assert.match(hooks.formatSelectionDiagnostics(selection.diagnostics), /bum \(2 consecutive normal encounters\)/);
});

test('special consequence does not clear a normal Bum streak', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setActiveCustomers([hooks.getCharacter('bum'), hooks.getCharacter('slot_grandma')]);
  hooks.state.normalCustomerHistory = ['bum', 'bum'];
  hooks.state.normalEncountersSinceSpecial = 0;

  const selection = hooks.chooseNextCustomerWithPools();

  assert.equal(selection.customer.id, 'slot_grandma');
  assert.deepEqual(Array.from(hooks.state.normalCustomerHistory), ['bum', 'bum']);
});

test('encounter follow-up choices do not duplicate normal-history entries', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  hooks.rememberNormalCustomer('bum');
  const sourceItem = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(sourceItem);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_figure_trade'));

  hooks.resolveTrade('tradeCash', deal);
  hooks.resolveTrade('tradeCash', deal);

  assert.deepEqual(Array.from(hooks.state.normalCustomerHistory), ['bum']);
});

test('sole eligible normal customer remains selectable after two consecutive appearances', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setActiveCustomers([hooks.getCharacter('bum')]);
  hooks.state.normalCustomerHistory = ['bum', 'bum'];

  const selection = hooks.chooseNextCustomerWithPools();

  assert.equal(selection.customer.id, 'bum');
  assert.deepEqual(Array.from(selection.diagnostics.blockedCustomerIds), []);
});

test('non-Bum customers follow the same consecutive-repeat block', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setActiveCustomers([hooks.getCharacter('red_hustler'), hooks.getCharacter('slot_grandma')]);
  hooks.state.inventory.push(item(hooks, 'gold_ring_engravings', 64));
  hooks.state.normalCustomerHistory = ['red_hustler', 'red_hustler'];

  const selection = hooks.chooseNextCustomerWithPools();

  assert.equal(selection.customer.id, 'slot_grandma');
  assert.deepEqual(Array.from(selection.diagnostics.blockedCustomerIds), ['red_hustler']);
});

test('v0.1.23 alternating low-tier customers receive group saturation penalty', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setActiveCustomers([
    hooks.getCharacter('bum'),
    hooks.getCharacter('crackhead'),
    hooks.getCharacter('junkie'),
    hooks.getCharacter('slot_grandma')
  ]);
  hooks.state.normalCustomerHistory = ['bum', 'crackhead', 'junkie'];

  const selection = hooks.chooseNextCustomerWithPools();
  const diagnostics = selection.diagnostics;
  const lowTierIds = ['bum', 'crackhead', 'junkie'];
  const lowTierWeights = diagnostics.weights.filter(entry => lowTierIds.includes(entry.id));
  const nonLowTierWeights = diagnostics.weights.filter(entry => !lowTierIds.includes(entry.id));

  assert.ok(lowTierWeights.length > 0);
  assert.ok(nonLowTierWeights.length > 0);
  assert.ok(lowTierWeights.every(entry => entry.lowTierGroupMultiplier < 1));
  assert.ok(nonLowTierWeights.every(entry => entry.lowTierGroupMultiplier === 1));
  assert.match(hooks.formatSelectionDiagnostics(diagnostics), /low-tier group saturation street_desperate/i);
});

test('v0.1.23 low-tier group is not suppressed without executable alternative', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setActiveCustomers([
    hooks.getCharacter('bum'),
    hooks.getCharacter('crackhead'),
    hooks.getCharacter('junkie')
  ]);
  hooks.state.normalCustomerHistory = ['bum', 'crackhead', 'junkie', 'bum'];

  const selection = hooks.chooseNextCustomerWithPools();

  assert.ok(['bum', 'crackhead', 'junkie'].includes(selection.customer.id));
  assert.ok(selection.diagnostics.weights.every(entry => entry.lowTierGroupMultiplier === 1));
  assert.match(hooks.formatSelectionDiagnostics(selection.diagnostics), /alternative available no/i);
});

test('v0.1.23 reputation modifier remains mild at extremes', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));

  hooks.state.reputation = 10;
  const highRep = hooks.resolveNegotiationOutcome('lowball', deal, { ratio: 0.8, item: deal.item, originalPrice: deal.askingPrice, attemptedPrice: deal.lowballPrice });
  hooks.state.reputation = 0;
  const lowRep = hooks.resolveNegotiationOutcome('lowball', deal, { ratio: 0.8, item: deal.item, originalPrice: deal.askingPrice, attemptedPrice: deal.lowballPrice });

  assert.ok(Math.abs(highRep.reputationModifier) <= 3);
  assert.ok(Math.abs(lowRep.reputationModifier) <= 3);
});

test('v0.1.24 70s Hustler accepted modest lowball completes purchase and adds one Tracksuit pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_gold_watch'));
  deal.lowballPrice = Math.max(1, Math.ceil(deal.askingPrice * 0.75));
  const before = hooks.snapshotState();

  hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballOutcome, 'accepted');
  assert.equal(hooks.state.money, before.money - deal.lowballPrice);
  assert.equal(hooks.state.inventory.length, before.inventory.length + 1);
  assert.equal(hooks.state.factionPressure.tracksuit_crew, 1);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /Tracksuit Pressure: 0 -> 1 \(\+1\)/);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /accepted a mild below-asking fence offer/i);
});

test('v0.1.25 Red Hustler accepted severe lowball completes purchase and adds one Tracksuit pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  deal.lowballPrice = Math.max(1, Math.ceil(deal.askingPrice * 0.45));
  const before = hooks.snapshotState();

  hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballOutcome, 'accepted');
  assert.equal(hooks.state.money, before.money - deal.lowballPrice);
  assert.equal(hooks.state.inventory.length, before.inventory.length + 1);
  assert.equal(hooks.state.factionPressure.tracksuit_crew, 1);
  assert.ok(hooks.state.copRisk >= before.copRisk);
  assert.equal(hooks.state.scamRisk, before.scamRisk + 1);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /accepted a severe below-asking fence offer/i);
});

test('v0.1.24 refusing affordable Tracksuit seller offer adds pressure once', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));

  hooks.resolveBuy('refuse', deal);
  hooks.resolveBuy('refuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 1);
  assert.equal((deal.factionPressureHistoryLines || []).filter(line => /Tracksuit Pressure:/.test(line)).length, 1);
});

test('v0.1.24 refusing unaffordable Tracksuit seller offer adds no pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 1;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));

  hooks.resolveBuy('refuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, 0);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /No Tracksuit pressure: the shop could not afford the original asking price/i);
});

test('v0.1.24 refusing Tracksuit buyer with matching inventory adds pressure once', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.inventory.push(item(hooks, 'suspicious_gold_watch', 43));
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_buys_watch'));

  hooks.resolveSell('refuse', deal);
  hooks.resolveSell('refuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 1);
  assert.equal((deal.factionPressureHistoryLines || []).filter(line => /Tracksuit Pressure:/.test(line)).length, 1);
});

test('v0.1.24 refusing Tracksuit buyer with no matching inventory adds no pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_buys_watch'));

  hooks.resolveSell('refuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, 0);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /No Tracksuit pressure: no matching requested inventory was available/i);
});

test('v0.1.24 refusing Tracksuit trade with eligible inventory adds pressure once', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.inventory.push(item(hooks, 'cracked_tablet', 18));
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_figure_trade'));

  hooks.resolveTrade('refuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 1);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /proposed an actionable trade and the shop refused/i);
});

test('v0.1.24 refusing unavailable Tracksuit trade adds no pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_figure_trade'));

  hooks.resolveTrade('refuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, 0);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /No Tracksuit pressure: trade could not be constructed/i);
});

test('v0.1.25 future-dispute Tracksuit sale records pending incident before dispute pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'acceptedFutureDispute');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');

  hooks.resolveSell('markup', deal);
  hooks.resolveSell('markup', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, 0);
  assert.equal(deal.tracksuitBadMerchandiseIncident.status, 'pending');
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /bad merchandise incident recorded as pending/i);
});

test('v0.1.25 resolving pending Tracksuit dispute adds pressure exactly once', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'acceptedFutureDispute');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');

  hooks.resolveSell('markup', deal);
  hooks.state.currentDeal = deal;
  hooks.angryCustomer();
  hooks.angryCustomer();

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 2);
  assert.equal((deal.factionPressureHistoryLines || []).filter(line => /Tracksuit Pressure:/.test(line)).length, 1);
  assert.equal(deal.tracksuitBadMerchandiseIncident.status, 'consumed');
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /duplicate bad merchandise dispute suppressed/i);
});

test('v0.1.25 one bad Tracksuit merchandise incident cannot exceed bounded pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'acceptedFutureDispute');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');

  hooks.resolveSell('markup', deal);
  hooks.state.currentDeal = deal;
  hooks.angryCustomer();

  assert.equal(hooks.state.factionPressure.tracksuit_crew, hooks.constants.TRACKSUIT_RELATIONSHIP_PRESSURE.badMerchandise);
  assert.ok(hooks.state.factionPressure.tracksuit_crew <= 2);
});

test('v0.1.24 ordinary sale of hidden-problem merchandise to Tracksuit buyer does not add premature pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal, shelfItem } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'luxury_handbag_fake');
  shelfItem.hiddenProblem = { source: 'test' };

  hooks.resolveSell('sellTag', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, 0);
});

test('v0.1.27 Tracksuit pressure 3 does not queue retaliation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure.tracksuit_crew = 3;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_gold_watch'));

  const consequence = hooks.maybeQueueThugConsequence(deal, 'below v0.1.27 threshold');

  assert.equal(consequence, null);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence').length, 0);
  assert.match((deal.thugHistoryLines || []).join('\n'), /Tracksuit scheduling: pressure 3\/4; not queued\./);
});

test('v0.1.24 Tracksuit relationship pressure crossing threshold queues one thug consequence', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure.tracksuit_crew = 3;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_gold_watch'));
  deal.lowballPrice = Math.max(1, Math.ceil(deal.askingPrice * 0.75));

  hooks.resolveBuy('lowball', deal);
  hooks.resolveBuy('lowball', deal);

  const thugQueue = hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence');
  assert.equal(hooks.state.factionPressure.tracksuit_crew, 4);
  assert.equal(thugQueue.length, 1);
  assert.equal(thugQueue[0].metadata.threshold, 4);
  assert.equal(thugQueue[0].metadata.factionPressureAtQueue, 4);
  assert.match((deal.thugHistoryLines || []).join('\n'), /Tracksuit scheduling: pressure threshold reached 4\/4; checking queue arm\./);
});

test('v0.1.25 accepted Tracksuit lowball and actionable refusal stay at one pressure each', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const lowballDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_gold_watch'));
  lowballDeal.lowballPrice = Math.max(1, Math.ceil(lowballDeal.askingPrice * 0.75));
  hooks.resolveBuy('lowball', lowballDeal);

  const refusalDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  hooks.resolveBuy('refuse', refusalDeal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 2);
  assert.match((lowballDeal.factionPressureHistoryLines || []).join('\n'), /Tracksuit Pressure: 0 -> 1 \(\+1\)/);
  assert.match((refusalDeal.factionPressureHistoryLines || []).join('\n'), /Tracksuit Pressure: 1 -> 2 \(\+1\)/);
});

test('v0.1.25 accepted Tracksuit markup adds bounded pressure without changing sale outcome', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'accepted');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
  deal.salePrice = 50;
  deal.markupPrice = 65;
  const before = hooks.snapshotState();

  hooks.resolveSell('markup', deal);

  assert.equal(hooks.state.money, before.money + deal.markupPrice);
  assert.equal(hooks.state.inventory.length, before.inventory.length - 1);
  assert.equal(hooks.state.factionPressure.tracksuit_crew, hooks.constants.TRACKSUIT_RELATIONSHIP_PRESSURE.acceptedMarkup.meaningful);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /accepted a moderate marked-up sale/i);
});

test('v0.1.25 accepted aggressive Tracksuit markup caps at two pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'accepted');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
  deal.salePrice = 50;
  deal.markupPrice = 110;

  hooks.resolveSell('markup', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, hooks.constants.TRACKSUIT_RELATIONSHIP_PRESSURE.acceptedMarkup.aggressive);
  assert.ok(hooks.state.factionPressure.tracksuit_crew <= 2);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /accepted a severe marked-up sale/i);
});

test('v0.1.25 markup pressure and later dispute from same sale do not stack', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'acceptedFutureDispute');
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
  deal.salePrice = 50;
  deal.markupPrice = 110;

  hooks.resolveSell('markup', deal);
  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, 0);
  hooks.state.currentDeal = deal;
  hooks.angryCustomer();

  assert.equal(hooks.state.factionPressure.tracksuit_crew, hooks.constants.TRACKSUIT_RELATIONSHIP_PRESSURE.badMerchandise);
  assert.equal((deal.factionPressureHistoryLines || []).filter(line => /Tracksuit Pressure:/.test(line)).length, 1);
  assert.doesNotMatch((deal.factionPressureHistoryLines || []).join('\n'), /accepted a severe marked-up sale/i);
});

test('v0.1.25 early Tracksuit consequence uses source customer warning and has no economic penalty', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = hooks.constants.TRACKSUIT_ROBBERY_MIN_TURN - 1;
  hooks.state.money = 80;
  hooks.state.profit = 12;
  hooks.state.reputation = 4;
  hooks.state.copRisk = 7;
  hooks.state.scamRisk = 3;
  hooks.state.inventory.push(item(hooks, 'dvd_stack', 4));
  hooks.state.factionPressure.tracksuit_crew = 4;
  hooks.state.factionPressureSources.tracksuit_crew = [{ turn: 7, customerName: 'Red Hustler', reason: 'test early offense', amount: 4 }];
  const consequence = hooks.queueThugConsequence('early test pressure', { debug: true }, { customer: hooks.getCharacter('red_hustler') });
  consequence.triggeringCharacterId = 'red_hustler';
  const presentation = hooks.prepareTracksuitConsequencePresentation(consequence);
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter(presentation.characterId));
  const before = hooks.snapshotState();

  hooks.resolveConsequenceChoice('thugWarning', deal);

  assert.equal(presentation.warningOnly, true);
  assert.equal(deal.customer.id, 'red_hustler');
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.equal(hooks.state.profit, before.profit);
  assert.equal(hooks.state.reputation, before.reputation);
  assert.equal(hooks.state.copRisk, before.copRisk);
  assert.equal(hooks.state.scamRisk, before.scamRisk);
  assert.equal(consequence.resolved, true);
  assert.equal(hooks.state.factionPressure.tracksuit_crew, 0);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && !entry.resolved).length, 0);
  assert.equal(hooks.state.tracksuitRetaliationSettlingNormalEncountersRemaining, hooks.constants.TRACKSUIT_RETALIATION_SETTLING_NORMAL_ENCOUNTERS);
  assert.match((deal.thugHistoryLines || []).join('\n'), /Early Tracksuit warning/i);
  assert.match((deal.thugHistoryLines || []).join('\n'), /Warning resolution: no money, inventory, Profit, reputation, cop risk, or scam risk changed/i);
});

test('v0.1.25 T10 Tracksuit consequence keeps normal robbery presentation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = hooks.constants.TRACKSUIT_ROBBERY_MIN_TURN;
  hooks.state.money = 80;
  hooks.state.factionPressure.tracksuit_crew = 4;
  const consequence = hooks.queueThugConsequence('turn ten pressure', { debug: true }, { customer: hooks.getCharacter('red_hustler') });
  consequence.triggeringCharacterId = 'red_hustler';
  const presentation = hooks.prepareTracksuitConsequencePresentation(consequence);
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter(presentation.characterId));
  const before = hooks.snapshotState();

  hooks.resolveConsequenceChoice('thugCash', deal);

  assert.equal(presentation.warningOnly, false);
  assert.equal(deal.customer.id, 'tracksuit_thug');
  assert.ok(hooks.state.money < before.money);
  assert.equal(consequence.resolved, true);
  assert.doesNotMatch((deal.thugHistoryLines || []).join('\n'), /Early Tracksuit warning/i);
});

test('v0.1.25 thug resolution resets pressure and starts settling period', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  hooks.state.factionPressureSources.tracksuit_crew = [{ turn: 1, customerName: 'Old Source', reason: 'old pressure', amount: 5 }];
  const consequence = hooks.queueThugConsequence('old tracksuit debt', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugRefuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 0);
  assert.equal(hooks.state.tracksuitRetaliationSettlingNormalEncountersRemaining, hooks.constants.TRACKSUIT_RETALIATION_SETTLING_NORMAL_ENCOUNTERS);
  assert.equal(hooks.state.factionPressureSources.tracksuit_crew.length, 0);
  assert.match((deal.thugHistoryLines || []).join('\n'), /retaliation settled/i);
});

test('v0.1.25 threshold pressure during settling defers thug queue and preserves new source', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.tracksuitRetaliationSettlingNormalEncountersRemaining = hooks.constants.TRACKSUIT_RETALIATION_SETTLING_NORMAL_ENCOUNTERS;
  hooks.state.factionPressure.tracksuit_crew = 3;
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const pressureDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_gold_watch'));
  pressureDeal.lowballPrice = Math.max(1, Math.ceil(pressureDeal.askingPrice * 0.75));

  hooks.resolveBuy('lowball', pressureDeal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, 4);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && !entry.resolved).length, 0);
  assert.match((pressureDeal.thugHistoryLines || []).join('\n'), /post-retaliation settling period/i);
  assert.match(hooks.state.factionPressureSources.tracksuit_crew[0].reason, /accepted a mild below-asking fence offer/i);
});

test('v0.1.25 settling completion queues one thug with earliest post-retaliation source', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.tracksuitRetaliationSettlingNormalEncountersRemaining = 2;
  hooks.state.factionPressure.tracksuit_crew = 4;
  hooks.state.factionPressureSources.tracksuit_crew = [
    { turn: 21, customerName: '70s Hustler', reason: 'post-retaliation short payment', amount: 1 },
    { turn: 22, customerName: 'Red Hustler', reason: 'post-retaliation refusal', amount: 1 }
  ];
  const firstNormalDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_dvd_stack'));
  const secondNormalDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'junkie_vcr'));

  hooks.advanceTracksuitRetaliationSettlingAfterNormal(firstNormalDeal);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence').length, 0);
  hooks.advanceTracksuitRetaliationSettlingAfterNormal(secondNormalDeal);

  const thugQueue = hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && !entry.resolved);
  assert.equal(thugQueue.length, 1);
  assert.match(thugQueue[0].metadata.pressureSourceSummary, /^T21 70s Hustler/);
  assert.doesNotMatch(thugQueue[0].metadata.pressureSourceSummary, /Old Source/i);
  assert.match((secondNormalDeal.thugHistoryLines || []).join('\n'), /queued after settling period/i);
});

test('v0.1.25 cop investigation can queue while Tracksuit settling defers thug', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.tracksuitRetaliationSettlingNormalEncountersRemaining = 4;
  hooks.state.factionPressure.tracksuit_crew = 4;
  hooks.state.copRisk = 24;
  hooks.state.nextCopInvestigationRisk = 25;
  const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');

  hooks.resolveSell('sellTag', deal);
  hooks.maybeQueueThugConsequence(deal, 'test threshold during settling');

  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'cop_consequence').length, 1);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && !entry.resolved).length, 0);
  assert.match((deal.thugHistoryLines || []).join('\n'), /post-retaliation settling period/i);
});

test('generated catalog includes liquidity for every item', () => {
  const hooks = loadGame(0);
  assert.ok(hooks.data.items.length > 0);
  assert.equal(hooks.data.items.every(entry => ['high', 'medium', 'low'].includes(entry.liquidity)), true);
});

test('invalid item liquidity fails generation with a useful error', () => {
  const itemsPath = path.join(ROOT, 'one_star_pawn_tables', 'Items.csv');
  const original = fs.readFileSync(itemsPath, 'utf8');
  const generatorPath = path.join(ROOT, 'scripts', 'generate-game-data.js');
  try {
    fs.writeFileSync(
      itemsPath,
      original.replace(
        'cordless_drill,Cordless Drill,tool,used,65,20,40,90,0,common,high,low,high,repairable',
        'cordless_drill,Cordless Drill,tool,used,65,20,40,90,0,common,high,low,liquid-ish,repairable'
      )
    );
    delete require.cache[generatorPath];
    assert.throws(
      () => require(generatorPath),
      /liquidity must be one of high, medium, low/
    );
  } finally {
    fs.writeFileSync(itemsPath, original);
    delete require.cache[generatorPath];
    require(generatorPath);
  }
});

test('strong buyer match completes a normal sale and records inventory age', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.turn = 18;
  const shelfItem = item(hooks, 'suspicious_gold_watch', 70);
  hooks.state.inventory.push(shelfItem);
  hooks.state.turn = 22;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_buys_watch'));
  hooks.applySelectedInventoryItemToDeal(deal, shelfItem);

  const before = hooks.snapshotState();
  const result = hooks.resolveSell('sellTag', deal);
  const after = hooks.snapshotState();
  const lines = hooks.buildHistoryLines(before, after, deal);

  assert.equal(hooks.state.inventory.length, 0);
  assert.ok(hooks.state.money > before.money);
  assert.match(result.text || result, /Sold|register/i);
  assert.ok(lines.some(line => line.includes('Inventory: -') && line.includes('acquired T18') && line.includes('held 4 turns')));
});

test('broad poor buyer match is rejected without mutating money or inventory', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_buys_cursed'));
  const before = hooks.snapshotState();

  const validation = hooks.validateSaleSelection(deal, dvd.instanceId);

  assert.equal(validation.valid, false);
  assert.match(validation.reason, /wrong item type|missing preferred tag|low-demand|niche/);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.equal(hooks.state.inventory[0].instanceId, dvd.instanceId);
  assert.equal(hooks.state.money, before.money);
});

test('appliance request is not satisfied by DVDs or generic junk', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  const fakeChain = item(hooks, 'fake_gold_chain', 5);
  hooks.state.inventory.push(dvd, fakeChain);
  const pool = hooks.data.characterItemPools.find(entry => entry.id === 'bum_buys_cursed');
  const deal = hooks.buildDeal(pool);

  assert.equal(hooks.validateSaleSelection(deal, dvd.instanceId).valid, false);
  assert.equal(hooks.validateSaleSelection(deal, fakeChain.instanceId).valid, false);
});

test('buy-from-shop demand applies inventory age multipliers without hard-blocking fresh stock', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const watch = item(hooks, 'suspicious_gold_watch', 55);
  hooks.state.inventory.push(watch);
  const pool = hooks.data.characterItemPools.find(entry => entry.id === 'hitman_buys_luxury');

  hooks.state.normalEncounterCount = watch.normalEncounterAcquired;
  let candidates = hooks.getEligibleDemandCandidatesForPool(pool, hooks.getCharacter('hitman'));
  assert.equal(candidates.some(candidate => candidate.instanceId === watch.instanceId), true);
  assert.equal(hooks.getInventoryAgeDemandMultiplier(watch), 0.1);

  hooks.state.normalEncounterCount = watch.normalEncounterAcquired + 1;
  assert.equal(hooks.getInventoryAgeDemandMultiplier(watch), 0.2);

  hooks.state.normalEncounterCount = watch.normalEncounterAcquired + 4;
  candidates = hooks.getEligibleDemandCandidatesForPool(pool, hooks.getCharacter('hitman'));
  assert.equal(hooks.getInventoryAgeDemandMultiplier(watch), 1);
  assert.ok(candidates[0].finalWeight > 0);
});

test('special consequence turns do not age inventory as completed normal encounters', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const drill = item(hooks, 'cordless_drill', 24);
  hooks.state.inventory.push(drill);

  hooks.state.turn += 3;

  assert.equal(hooks.getHeldNormalEncounters(drill), 0);
  assert.equal(hooks.getInventoryAgeDemandMultiplier(drill), 0.1);
});

test('high-liquidity inventory receives more buy demand weight than comparable low-liquidity inventory', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const drill = item(hooks, 'cordless_drill', 24);
  const tablet = item(hooks, 'cracked_tablet', 18);
  drill.normalEncounterAcquired = 2;
  tablet.normalEncounterAcquired = 2;
  hooks.state.normalEncounterCount = 6;
  hooks.state.inventory.push(drill, tablet);

  assert.equal(hooks.getItemDemandLevel(drill), 'high');
  assert.equal(hooks.getItemDemandLevel(tablet), 'medium');
  assert.ok(hooks.getItemLiquidityDemandMultiplier(drill) > hooks.getItemLiquidityDemandMultiplier(tablet));
});

test('multiple matching inventory instances are weighted instead of newest-first selected', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  const freshWatch = item(hooks, 'suspicious_gold_watch', 55);
  const olderWatch = item(hooks, 'suspicious_gold_watch', 55);
  freshWatch.normalEncounterAcquired = 6;
  olderWatch.normalEncounterAcquired = 1;
  hooks.state.normalEncounterCount = 6;
  hooks.state.inventory.push(freshWatch, olderWatch);
  const pool = hooks.data.characterItemPools.find(entry => entry.id === 'hitman_buys_luxury');

  const deal = hooks.buildDeal(pool);

  assert.deepEqual(deal.eligibleInventoryInstanceIds, [freshWatch.instanceId, olderWatch.instanceId]);
  assert.equal(deal.weightedDemandInventoryInstanceId, olderWatch.instanceId);
});

test('Hitman cannot buy back the same weapon instance on the next normal turn', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.normalEncounterCount = 8;
  const sellDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_prop_revolver'));
  hooks.resolveBuy('buyAsk', sellDeal);
  const weapon = hooks.state.inventory.find(entry => entry.itemId === 'rusty_revolver_prop');
  assert.ok(weapon);
  assert.equal(weapon.sourceCustomerId, 'hitman');

  hooks.state.normalEncounterCount = weapon.normalEncounterAcquired + 1;
  const pool = hooks.data.characterItemPools.find(entry => entry.id === 'hitman_buys_weapon');
  const eligible = hooks.getEligibleInventoryItemsForPool(pool, hooks.getCharacter('hitman'));

  assert.equal(eligible.some(entry => entry.instanceId === weapon.instanceId), false);
  assert.ok(hooks.state.buybackCooldownDiagnostics.some(line => line.includes(weapon.instanceId) && line.includes('required cooldown 4')));
});

test('Hitman weapon buyback becomes eligible after cooldown', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.normalEncounterCount = 8;
  const weapon = item(hooks, 'rusty_revolver_prop', 40);
  weapon.sourceCustomerId = 'hitman';
  weapon.normalEncounterAcquired = 8;
  hooks.state.inventory.push(weapon);
  hooks.state.normalEncounterCount = 12;
  const pool = hooks.data.characterItemPools.find(entry => entry.id === 'hitman_buys_weapon');

  const eligible = hooks.getEligibleInventoryItemsForPool(pool, hooks.getCharacter('hitman'));

  assert.equal(eligible.some(entry => entry.instanceId === weapon.instanceId), true);
});

test('intentional unavailable-demand sale refuses without transaction mutation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const pool = {
    ...hooks.data.characterItemPools.find(entry => entry.id === 'bum_buys_cursed'),
    intentionalUnavailableDemand: true
  };
  const deal = hooks.buildDeal(pool);
  const before = hooks.snapshotState();

  const result = hooks.resolveSell('refuse', deal);

  assert.equal(deal.requestSatisfiable, false);
  assert.equal(deal.intentionalUnavailableDemand, true);
  assert.match(result.text || result, /Missed sale/);
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.profit, before.profit);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.equal(hooks.state.inventory[0].instanceId, dvd.instanceId);
});

test('unavailable-demand encounters are capped at two consecutive requests', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.inventory.push(item(hooks, 'dvd_stack', 4));
  hooks.state.unavailableSellRequestStreak = hooks.constants.BUY_FROM_SHOP_ECONOMY.maxConsecutiveUnavailableDemand;

  const selectable = hooks.getSelectablePoolsForCharacter(hooks.getCharacter('bum'));

  assert.equal(selectable.some(pool => pool.id === 'bum_buys_cursed' && pool.intentionalUnavailableDemand), false);
});

test('another customer can buy a Hitman-sold weapon during cooldown', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const weapon = item(hooks, 'rusty_revolver_prop', 40);
  weapon.sourceCustomerId = 'hitman';
  weapon.normalEncounterAcquired = 8;
  hooks.state.normalEncounterCount = 9;
  hooks.state.inventory.push(weapon);
  const pool = hooks.data.characterItemPools.find(entry => entry.id === 'undercover_weapon');

  const eligible = hooks.getEligibleInventoryItemsForPool(pool, hooks.getCharacter('undercover_cop'));

  assert.equal(eligible.some(entry => entry.instanceId === weapon.instanceId), true);
});

test('mild lowball can be accepted', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  deal.lowballPrice = Math.ceil(deal.askingPrice * 0.8);
  const before = hooks.snapshotState();

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballOutcome, 'accepted');
  assert.equal(hooks.state.money, before.money - deal.lowballPrice);
  assert.equal(hooks.state.inventory.length, before.inventory.length + 1);
  assert.match(result.text, /take/i);
});

test('rejected lowball can keep original asking price and cannot be spammed', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'rejectedOriginal');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  const ask = deal.askingPrice;
  const before = hooks.snapshotState();

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballOutcome, 'rejectedOriginal');
  assert.equal(deal.lowballRejected, true);
  assert.equal(deal.lowballAttempts, 1);
  assert.equal(deal.askingPrice, ask);
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.match(result.text, /stays/);
  assert.match(hooks.resolveBuy('lowball', deal).text, /already dead/);
});

test('rejected lowball can raise the asking price for the encounter', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'priceWorsened');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  const ask = deal.askingPrice;

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballRejected, true);
  assert.ok(deal.askingPrice > ask);
  assert.equal(deal.defaultOffer, deal.askingPrice);
  assert.match(result.text, /went from/);
});

test('severe lowball walkout resolves without transferring cash or inventory', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'customerWalks');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_prop_revolver'));
  deal.lowballPrice = Math.max(1, Math.floor(deal.askingPrice * 0.35));
  const before = hooks.snapshotState();

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.resolvedAction, 'lowball');
  assert.equal(deal.lowballOutcome, 'customerWalks');
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.match(result.text, /No deal/);
});

test('faction-connected customer can add faction pressure after insulting lowball', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_prop_revolver'));
  deal.lowballPrice = Math.max(1, Math.floor(deal.askingPrice * 0.35));

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballOutcome, 'consequence');
  assert.ok(hooks.state.factionPressure.tracksuit_crew > 0);
  assert.equal(result.keepEncounterOpen, true);
});

test('v0.1.20 genuinely insulting faction lowball can still add pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_prop_revolver'));
  deal.askingPrice = 91;
  deal.askPrice = 91;
  deal.defaultOffer = 91;
  deal.lowballPrice = 50;
  const beforePressure = hooks.state.factionPressure.tracksuit_crew || 0;

  hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballOutcome, 'consequence');
  assert.ok((hooks.state.factionPressure.tracksuit_crew || 0) > beforePressure);
});

test('v0.1.20 routine moderate faction lowball does not automatically add pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_prop_revolver'));
  deal.askingPrice = 91;
  deal.askPrice = 91;
  deal.defaultOffer = 91;
  deal.lowballPrice = 70;
  const before = hooks.snapshotState();

  hooks.resolveBuy('lowball', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, before.factionPressure.tracksuit_crew || 0);
  assert.equal(hooks.state.reputation, before.reputation);
});

test('v0.1.20 neutral refusal after pressure lowball does not repeat pressure-source history', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_prop_revolver'));
  deal.askingPrice = 91;
  deal.askPrice = 91;
  deal.defaultOffer = 91;
  deal.lowballPrice = 50;
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');
  const lowballEntry = hooks.getTurnHistory()[0];
  hooks.resolveChoice('refuse');
  const refusalEntry = hooks.getTurnHistory()[0];

  assert.match(lowballEntry.lines.join('\n'), /Tracksuit Pressure Source/);
  assert.doesNotMatch(refusalEntry.lines.join('\n'), /Tracksuit Pressure Source/);
  assert.match(refusalEntry.lines.join('\n'), /Neutral item refusal/);
});

test('successful lowball hidden problem mutates only acquired inventory instance', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'acceptedHiddenProblem');
  const existing = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(existing);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));

  hooks.resolveBuy('lowball', deal);

  const added = hooks.state.inventory.find(entry => entry.instanceId !== existing.instanceId);
  assert.ok(added.hiddenProblem);
  assert.notEqual(added.condition, deal.item.condition);
  assert.ok(added.resaleModifier < 1);
  assert.match(deal.hiddenProblemMutation ? hooks.buildHistoryLines(hooks.snapshotState(), hooks.snapshotState(), deal).join('\n') : '', /adjusted resale estimate/i);
  assert.equal(hooks.state.inventory.find(entry => entry.instanceId === existing.instanceId).condition, existing.condition);
});

test('v0.1.19 hidden problem dialogue names item and only summarizes meaningful resale change', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'acceptedHiddenProblem');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));

  const result = hooks.resolveBuy('lowball', deal);
  const text = result.text || result;

  assert.match(text, /Locked Smart Watch/);
  assert.match(text, /estimated resale value dropped from \$56 to \$51/i);
  assert.doesNotMatch(text, /condition .* -> /i);
  assert.doesNotMatch(text, /heat \d+ -> \d+/i);
  assert.doesNotMatch(text, /modifier/i);
  assert.doesNotMatch(text, /tag|no new tag/i);
  assert.doesNotMatch(text, /inv_\d+/i);
});

test('v0.1.19 hidden problem Deal panel summarizes transaction and current item state', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'acceptedHiddenProblem');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  hooks.state.currentDeal = deal;
  hooks.state.conversation = { phase: 'resolved' };

  const result = hooks.resolveBuy('lowball', deal);
  deal.currentResultSummary = result.text;
  hooks.setDialogueText(result.text);
  const panel = hooks.renderDealPanelText(result.text);

  assert.match(panel, new RegExp(`^Locked Smart Watch\\nPaid: \\$${deal.lowballPrice}\\nCondition: Questionable\\nEstimated resale: \\$51`, 'm'));
  assert.match(panel, /Risk: Suspicious/);
  assert.notEqual(panel, result.text);
  assert.doesNotMatch(panel, /inv_\d+/i);
  assert.doesNotMatch(panel, /Hidden problem|condition .* -> |modifier|no new tag/i);
});

test('v0.1.19 hidden problem Turn History keeps diagnostics with readable item name and instance ID', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'acceptedHiddenProblem');
  for (let index = 0; index < 11; index += 1) {
    hooks.state.inventory.push(item(hooks, 'dvd_stack', 4));
  }
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');
  const history = hooks.getTurnHistoryCopyText();

  assert.match(history, /Hidden problem on Locked Smart Watch \[inv_0012\]/);
  assert.match(history, /condition questionable -> questionable/i);
  assert.match(history, /heat 2 -> 2/i);
  assert.match(history, /adjusted resale estimate \$56 -> \$51/i);
});

test('v0.1.19 hidden problem with condition and heat changes uses concise combined summary', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'acceptedHiddenProblem');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));

  const result = hooks.resolveBuy('lowball', deal);
  const text = result.text || result;

  assert.match(text, /Microwave That Hums Prayers/);
  assert.match(text, /Condition dropped from poor to questionable/i);
  assert.match(text, /Heat increased from 0 to 1/i);
  assert.match(text, /estimated resale fell from \$\d+ to \$\d+/i);
  assert.doesNotMatch(text, /condition .* -> |heat \d+ -> \d+|modifier|inv_\d+/i);
});

test('v0.1.19 hidden problem formatter falls back to the item when lookup is missing', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const text = hooks.formatHiddenProblemDialogue({
    hiddenProblemMutation: {
      instanceId: 'inv_9999',
      before: { condition: 'used', heat: 1, targetSellPrice: 50, resaleModifier: 1 },
      after: { condition: 'used', heat: 1, targetSellPrice: 40, resaleModifier: 1 },
      adjustedResaleBefore: 30,
      adjustedResaleAfter: 24
    }
  }, 'inv_9999');

  assert.match(text, /^Deal done\. The item has a hidden issue\./);
  assert.doesNotMatch(text, /inv_9999|undefined|null/i);
});

test('v0.1.19 normal successful purchases without hidden problems remain unchanged', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));

  const result = hooks.resolveBuy('buyAsk', deal);

  assert.equal(result.text, 'The item is now yours. So is the problem.');
});

test('v0.1.19 existing trade and sale result formatting remains unchanged', () => {
  const saleHooks = loadGame(0);
  resetState(saleHooks);
  const { deal: saleDeal } = prepareSaleDeal(saleHooks);

  const saleResult = saleHooks.resolveSell('sellTag', saleDeal);
  const saleText = saleResult.text || saleResult;

  assert.equal(saleText, 'Sold Stack of DVDs Nobody Asked For. The register opens like it is ashamed of the noise.');

  const tradeHooks = loadGame(0);
  resetState(tradeHooks);
  const tradeDeal = tradeHooks.buildDeal(tradeHooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));

  const tradeResult = tradeHooks.resolveTrade('refuse', tradeDeal);
  const tradeText = tradeResult.text || tradeResult;

  assert.equal(tradeText, 'You refuse the trade. The bad idea leaves under its own power.');
});

test('v0.1.17 hidden problems are rare for ordinary goods but possible for suspicious goods', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const ordinaryDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_dvd_stack'));
  const suspiciousDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  const ordinaryOutcome = hooks.resolveNegotiationOutcome('lowball', ordinaryDeal, {
    ratio: 0.8,
    item: ordinaryDeal.item
  });
  const suspiciousOutcome = hooks.resolveNegotiationOutcome('lowball', suspiciousDeal, {
    ratio: 0.8,
    item: suspiciousDeal.item
  });
  const ordinaryWeights = Object.fromEntries(ordinaryOutcome.adjustedWeights.map(entry => [entry.outcome, entry.chanceWeight]));
  const suspiciousWeights = Object.fromEntries(suspiciousOutcome.adjustedWeights.map(entry => [entry.outcome, entry.chanceWeight]));

  assert.ok(ordinaryWeights.acceptedHiddenProblem < ordinaryWeights.accepted);
  assert.ok(suspiciousWeights.acceptedHiddenProblem > 0);
  assert.ok(suspiciousWeights.acceptedHiddenProblem < suspiciousWeights.accepted + suspiciousWeights.rejectedOriginal);
});

test('customer sale quote respects inventory-instance defects and heat tolerance', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const cleanWatch = item(hooks, 'suspicious_gold_watch', 70);
  const damagedWatch = item(hooks, 'suspicious_gold_watch', 70);
  damagedWatch.condition = 'broken';
  damagedWatch.tags = [...new Set([...damagedWatch.tags, 'broken', 'fake', 'hot'])];
  damagedWatch.heat = 5;
  damagedWatch.resaleModifier = 0.6;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_buys_watch'));

  const cleanQuote = hooks.calculateCustomerOfferForInventoryItem(deal, cleanWatch);
  const damagedQuote = hooks.calculateCustomerOfferForInventoryItem(deal, damagedWatch);

  assert.ok(damagedQuote.price < cleanQuote.price);
  assert.equal(damagedQuote.basis, 70);
  assert.equal(damagedQuote.marginClass, 'suspiciousOrHot');
  assert.ok(damagedQuote.riskMultiplier >= 1);
  assert.ok(Number.isFinite(damagedQuote.conditionAdjustedValue));
  assert.ok(Number.isFinite(damagedQuote.marketAdjustedValue));
  assert.ok(damagedQuote.marketAdjustedValue < damagedQuote.baseTargetValue);
});

test('ordinary buyer discounts high-heat goods instead of treating risk as universal upside', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const tablet = item(hooks, 'cracked_tablet', 25);
  const hotTablet = item(hooks, 'cracked_tablet', 25);
  hotTablet.tags = [...new Set([...hotTablet.tags, 'hot', 'suspicious'])];
  hotTablet.heat = 5;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bargain_hunter_buys_tablet'));

  const normalQuote = hooks.calculateCustomerOfferForInventoryItem(deal, tablet);
  const hotQuote = hooks.calculateCustomerOfferForInventoryItem(deal, hotTablet);

  assert.ok(hotQuote.price < normalQuote.price);
  assert.ok(hotQuote.riskMultiplier < 1);
});

test('v0.1.17 exact-match buyer offer is tied to market-adjusted value', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const watch = item(hooks, 'suspicious_gold_watch', 43);
  hooks.state.inventory.push(watch);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_buys_watch'));
  hooks.applySelectedInventoryItemToDeal(deal, watch);

  assert.ok(deal.saleQuote.marketAdjustedValue > 0);
  assert.ok(deal.saleQuote.price >= Math.round(deal.saleQuote.marketAdjustedValue * 0.65));
  assert.ok(deal.saleQuote.matchedBuyerFloor.rate >= 0.7);
  assert.notEqual(deal.saleQuote.matchedBuyerFloor.price, 13);
});

test('v0.1.17 market-adjusted $56 watch floor is not near $13', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const watch = item(hooks, 'suspicious_gold_watch', 43);
  hooks.state.inventory.push(watch);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_buys_watch'));
  hooks.applySelectedInventoryItemToDeal(deal, watch);

  deal.saleQuote.marketAdjustedValue = 56;
  const floorAt56 = Math.round(deal.saleQuote.marketAdjustedValue * deal.saleQuote.matchedBuyerFloor.rate * hooks.constants.ECONOMY_BALANCE.matchedBuyerOfferFloors.minimumCustomerMultiplier);
  assert.ok(floorAt56 >= 33);
});

test('microwave exact appliance buyer avoids duplicate broken penalties and exposes staged quote values', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const microwave = item(hooks, 'microwave_haunted', 7);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_buys_cursed'));

  const quote = hooks.calculateCustomerOfferForInventoryItem(deal, microwave);

  assert.equal(quote.basis, 7);
  assert.equal(quote.baseTargetValue, 45);
  assert.equal(quote.compatibility.valid, true);
  assert.equal(quote.marginClass, 'junk');
  assert.ok(quote.skippedDuplicateTagPenalties.includes('broken'));
  assert.ok(quote.conditionAdjustedValue > quote.marketAdjustedValue);
  assert.ok(quote.price >= quote.matchedBuyerFloor.price);
  assert.ok(quote.price >= 5);

  hooks.applySelectedInventoryItemToDeal(deal, microwave);
  const diagnostics = (deal.economicHistoryLines || []).join('\n');
  assert.match(diagnostics, /base\/ideal target/i);
  assert.match(diagnostics, /condition-adjusted/i);
  assert.match(diagnostics, /market-adjusted/i);
  assert.match(diagnostics, /final customer offer/i);
  assert.match(diagnostics, /matched-buyer floor/i);
});

test('rusty revolver hidden-problem state keeps exact weapon demand visible in quote', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const revolver = item(hooks, 'rusty_revolver_prop', 31);
  revolver.condition = 'broken';
  revolver.heat = 5;
  revolver.targetSellPrice = 112;
  revolver.resaleModifier = 0.86;
  revolver.tags = [...new Set([...revolver.tags, 'broken'])];
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_buys_weapon'));

  const quote = hooks.calculateCustomerOfferForInventoryItem(deal, revolver);

  assert.equal(quote.basis, 31);
  assert.equal(quote.baseTargetValue, 112);
  assert.equal(quote.compatibility.valid, true);
  assert.equal(quote.matchedBuyerFloor.reason, 'exact item match');
  assert.ok(quote.skippedDuplicateTagPenalties.includes('broken'));
  assert.ok(quote.preferenceMultiplier > 1);
  assert.ok(quote.price >= quote.matchedBuyerFloor.price);
  assert.ok(quote.price < quote.baseTargetValue);
});

test('healthy exact match receives stronger offer than low-demand unrelated inventory', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const healthyWatch = item(hooks, 'suspicious_gold_watch', 70);
  healthyWatch.condition = 'good';
  healthyWatch.liquidity = 'medium';
  healthyWatch.tags = ['luxury'];
  healthyWatch.heat = 0;
  const unrelated = item(hooks, 'dvd_stack', 4);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_buys_watch'));

  const exactQuote = hooks.calculateCustomerOfferForInventoryItem(deal, healthyWatch);
  const unrelatedQuote = hooks.calculateCustomerOfferForInventoryItem(deal, unrelated);

  assert.equal(exactQuote.compatibility.valid, true);
  assert.equal(unrelatedQuote.compatibility.valid, false);
  assert.ok(exactQuote.price > unrelatedQuote.price * 3);
  assert.ok(exactQuote.matchedBuyerFloor.price > 0);
});

test('junk buyer can still make a deliberately poor offer', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 20);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bargain_hunter_buys_dvds'));

  const quote = hooks.calculateCustomerOfferForInventoryItem(deal, dvd);

  assert.equal(quote.compatibility.valid, true);
  assert.equal(quote.marginClass, 'junk');
  assert.ok(quote.price < quote.baseTargetValue);
  assert.ok(quote.customerAskMultiplier < 1);
});

test('markup can be accepted', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'accepted');
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  const before = hooks.snapshotState();

  const result = hooks.resolveSell('markup', deal);

  assert.equal(deal.markupOutcome, 'accepted');
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === shelfItem.instanceId), false);
  assert.equal(hooks.state.money, before.money + deal.markupPrice);
  assert.match(result.text || result, /pay/i);
});

test('rejected markup may preserve original sale', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'rejectedOriginal');
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  const before = hooks.snapshotState();

  const result = hooks.resolveSell('markup', deal);

  assert.equal(deal.markupOutcome, 'rejectedOriginal');
  assert.equal(result.keepEncounterOpen, true);
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === shelfItem.instanceId), true);
  assert.match(result.text, /original/i);
});

test('rejected markup may produce lower counteroffer', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'counteroffer');
  const { deal } = prepareSaleDeal(hooks);

  const result = hooks.resolveSell('markup', deal);

  assert.equal(deal.markupOutcome, 'counteroffer');
  assert.equal(deal.counterofferOpen, true);
  assert.ok(deal.counterofferPrice < deal.markupPrice);
  assert.equal(result.keepEncounterOpen, true);
});

test('markup rejection may make customer walk', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'customerWalks');
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  const before = hooks.snapshotState();

  const result = hooks.resolveSell('markup', deal);

  assert.equal(deal.resolvedAction, 'markup');
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === shelfItem.instanceId), true);
  assert.match(result.text, /walk/i);
});

test('v0.1.20 $3 to $5 markup is mild and adds no negotiation risk without an explicit lie', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  deal.salePrice = 3;
  deal.markupPrice = 5;
  const outcome = hooks.resolveNegotiationOutcome('markup', deal, {
    ratio: deal.markupPrice / deal.salePrice,
    item: shelfItem,
    originalPrice: deal.salePrice,
    attemptedPrice: deal.markupPrice
  });

  assert.equal(outcome.severity, 'mild');
  assert.equal(outcome.markupContext.absoluteIncrease, 2);
  assert.equal(outcome.consequencesAllowed, false);
  assert.equal(outcome.pressureAllowed, false);

  const before = hooks.snapshotState();
  const result = hooks.resolveSell('markup', deal);

  assert.equal(hooks.state.reputation, before.reputation);
  assert.equal(hooks.state.scamRisk, before.scamRisk);
  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, before.factionPressure.tracksuit_crew || 0);
  assert.notEqual(deal.markupOutcome, 'consequence');
  assert.doesNotMatch(result.text || result, /fraud|scam|insult/i);
});

test('v0.1.20 $6 to $8 markup is not severe and has no automatic consequence', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  deal.salePrice = 6;
  deal.markupPrice = 8;

  const outcome = hooks.resolveNegotiationOutcome('markup', deal, {
    ratio: deal.markupPrice / deal.salePrice,
    item: shelfItem,
    originalPrice: deal.salePrice,
    attemptedPrice: deal.markupPrice
  });
  const weights = Object.fromEntries(outcome.adjustedWeights.map(entry => [entry.outcome, entry.chanceWeight]));

  assert.notEqual(outcome.severity, 'severe');
  assert.equal(outcome.consequencesAllowed, false);
  assert.equal(weights.consequence, 0);
  assert.equal(weights.acceptedFutureDispute, 0);
});

test('v0.1.20 markup within customer tolerance stays ordinary negotiation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal, shelfItem } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
  deal.traits = { ...deal.traits, maxMarkupTolerance: 1.2 };
  deal.salePrice = 47;
  deal.markupPrice = 56;
  forceNegotiationOutcome(hooks, 'markup', 'rejectedOriginal');
  const before = hooks.snapshotState();

  const result = hooks.resolveSell('markup', deal);
  const history = (deal.negotiationHistoryLines || []).join('\n');

  assert.equal(result.keepEncounterOpen, true);
  assert.equal(hooks.state.reputation, before.reputation);
  assert.equal(hooks.state.scamRisk, before.scamRisk);
  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, before.factionPressure.tracksuit_crew || 0);
  assert.match(history, /within tolerance/);
  assert.match(result.text, /They reject the higher price\. The original \$47 offer still stands\./);
});

test('v0.1.20 markup slightly above tolerance can reject or counter without pressure', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  deal.traits = { ...deal.traits, maxMarkupTolerance: 1.2 };
  deal.salePrice = 47;
  deal.markupPrice = 60;

  const outcome = hooks.resolveNegotiationOutcome('markup', deal, {
    ratio: deal.markupPrice / deal.salePrice,
    item: shelfItem,
    originalPrice: deal.salePrice,
    attemptedPrice: deal.markupPrice
  });
  const weights = Object.fromEntries(outcome.adjustedWeights.map(entry => [entry.outcome, entry.chanceWeight]));

  assert.match(outcome.markupContext.label, /slightly above tolerance|above tolerance/);
  assert.equal(outcome.pressureAllowed, false);
  assert.ok(weights.rejectedOriginal + weights.counteroffer > weights.consequence);
});

test('v0.1.20 large abusive markup can still add scam risk or faction pressure', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const watch = item(hooks, 'suspicious_gold_watch', 43);
  hooks.state.inventory.push(watch);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_buys_hot'));
  hooks.applySelectedInventoryItemToDeal(deal, watch);
  deal.salePrice = 47;
  deal.markupPrice = 100;
  forceNegotiationOutcome(hooks, 'markup', 'consequence');

  hooks.resolveSell('markup', deal);

  assert.ok((hooks.state.factionPressure.tracksuit_crew || 0) > 0);
});

test('v0.1.20 known fake item with deceptive markup can still create consequences', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const fakeBag = item(hooks, 'luxury_handbag_fake', 8);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'street_fence_buys_luxury'));
  deal.salePrice = 10;
  deal.markupPrice = 22;

  const outcome = hooks.resolveNegotiationOutcome('markup', deal, {
    ratio: deal.markupPrice / deal.salePrice,
    item: fakeBag,
    originalPrice: deal.salePrice,
    attemptedPrice: deal.markupPrice
  });
  const weights = Object.fromEntries(outcome.adjustedWeights.map(entry => [entry.outcome, entry.chanceWeight]));

  assert.equal(outcome.markupContext.knownBadItem, true);
  assert.equal(outcome.consequencesAllowed, true);
  assert.ok(weights.consequence > 0 || weights.acceptedFutureDispute > 0);
});

test('v0.1.20 deterministic negotiation smoke covers low-dollar, within-tolerance, and abusive markup', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const { deal, shelfItem } = prepareSaleDeal(hooks);

  const cases = [
    { original: 3, attempted: 5, tolerance: 1.05, expectedSeverity: 'mild', expectedConsequence: false },
    { original: 47, attempted: 56, tolerance: 1.2, expectedSeverity: 'mild', expectedConsequence: false },
    { original: 47, attempted: 100, tolerance: 1.1, expectedSeverity: 'severe', expectedConsequence: true }
  ];

  const results = cases.map(testCase => {
    deal.salePrice = testCase.original;
    deal.markupPrice = testCase.attempted;
    deal.traits = { ...deal.traits, maxMarkupTolerance: testCase.tolerance };
    return hooks.resolveNegotiationOutcome('markup', deal, {
      ratio: testCase.attempted / testCase.original,
      item: shelfItem,
      originalPrice: testCase.original,
      attemptedPrice: testCase.attempted
    });
  });

  results.forEach((outcome, index) => {
    assert.equal(outcome.severity, cases[index].expectedSeverity);
    assert.equal(outcome.consequencesAllowed, cases[index].expectedConsequence);
  });
});

test('accepting counteroffer removes correct inventory instance and pays exactly once', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'counteroffer');
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  hooks.resolveSell('markup', deal);
  const counter = deal.counterofferPrice;

  hooks.resolveSell('acceptCounteroffer', deal);
  const moneyAfterAccept = hooks.state.money;
  hooks.resolveSell('acceptCounteroffer', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === shelfItem.instanceId), false);
  assert.equal(hooks.state.money, 120 + counter);
  assert.equal(hooks.state.money, moneyAfterAccept);
});

test('refusing counteroffer changes no inventory or money', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'counteroffer');
  const { deal, shelfItem } = prepareSaleDeal(hooks);
  hooks.resolveSell('markup', deal);
  const before = hooks.snapshotState();

  const result = hooks.resolveSell('refuseCounteroffer', deal);

  assert.equal(result.keepEncounterOpen, true);
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === shelfItem.instanceId), true);
  assert.equal(deal.counterofferOpen, false);
});

test('scam risk or reputation changes only once per negotiation outcome', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'markup', 'consequence');
  const { deal } = prepareSaleDeal(hooks);

  hooks.resolveSell('markup', deal);
  const scamRiskAfter = hooks.state.scamRisk;
  const reputationAfter = hooks.state.reputation;
  hooks.resolveSell('markup', deal);

  assert.equal(hooks.state.scamRisk, scamRiskAfter);
  assert.equal(hooks.state.reputation, reputationAfter);
});

test('v0.1.20 faction markup consequences do not double-dip below severe abuse', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const watch = item(hooks, 'suspicious_gold_watch', 43);
  hooks.state.inventory.push(watch);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_buys_hot'));
  hooks.applySelectedInventoryItemToDeal(deal, watch);
  deal.markupPrice = Math.round(deal.salePrice * 1.28);
  forceNegotiationOutcome(hooks, 'markup', 'consequence');

  hooks.resolveSell('markup', deal);

  assert.equal(hooks.state.scamRisk, 0);
  assert.ok((hooks.state.factionPressure.tracksuit_crew || 0) > 0);
});

test('trade rejection can allow reselection', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'trade', 'rejectedRetry');
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [dvd.instanceId];

  const result = hooks.resolveTrade('submitTradeOffer', deal);

  assert.equal(result.keepEncounterOpen, true);
  assert.equal(deal.tradeSubmissions, 1);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), true);
});

test('insulting trade can end encounter without transaction mutation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'trade', 'rejectedEnds');
  const tablet = item(hooks, 'cracked_tablet', 4);
  hooks.state.inventory.push(tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));
  deal.cashAdjustment = 100;
  deal.pool.requestedItemTags = [];
  deal.selectedTradeInventoryInstanceIds = [tablet.instanceId];

  const result = hooks.resolveTrade('submitTradeOffer', deal);

  assert.equal(deal.resolvedAction, 'submitTradeOffer');
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === tablet.instanceId), true);
  assert.match(result.text, /end/i);
});

test('trade retry limits cannot be bypassed by reopening inventory', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'trade', 'rejectedRetry');
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [dvd.instanceId];

  hooks.resolveTrade('submitTradeOffer', deal);
  hooks.resolveTrade('submitTradeOffer', deal);
  hooks.resolveTrade('submitTradeOffer', deal);
  const result = hooks.resolveTrade('submitTradeOffer', deal);

  assert.equal(deal.tradeSubmissions, hooks.constants.NEGOTIATION_OUTCOMES.attemptLimits.trade);
  assert.match(result.text, /No more submissions/i);
});

test('cancelled trade selection does not count as negotiation attempt', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));

  assert.equal(deal.tradeSubmissions, 0);
});

test('successful bribe deducts money and preserves tracked evidence', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.copRisk = 3;
  const watch = item(hooks, 'smart_watch_locked', 18);
  const { deal } = makeCopDeal(hooks, watch);

  const result = hooks.resolveConsequenceChoice('copBribe', deal);

  assert.equal(hooks.state.money, 83);
  assert.equal(hooks.state.profit, -37);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), true);
  assert.equal(hooks.state.copWarnings, 0);
  assert.equal(hooks.state.copStrikes, 0);
  assert.match(result.text, /ignores the evidence/i);
});

test('failed bribe with evidence present deducts money and confiscates exact tracked item once', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  hooks.state.copRisk = 3;
  const watch = item(hooks, 'smart_watch_locked', 18);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const { deal } = makeCopDeal(hooks, watch);

  const result = hooks.resolveConsequenceChoice('copBribe', deal);
  const moneyAfter = hooks.state.money;
  hooks.resolveConsequenceChoice('copBribe', deal);

  assert.equal(hooks.state.money, 83);
  assert.equal(hooks.state.profit, -55);
  assert.equal(hooks.state.money, moneyAfter);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), false);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), true);
  assert.equal(hooks.state.copWarnings, 1);
  assert.equal(hooks.state.copStrikes, 1);
  assert.match(result.text, /confiscates/);
  assert.match(result.text, new RegExp(watch.instanceId));
});

test('failed bribe with evidence missing cannot confiscate unrelated item', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  hooks.state.copRisk = 3;
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const { deal } = makeCopDeal(hooks, null);

  const result = hooks.resolveConsequenceChoice('copBribe', deal);

  assert.equal(hooks.state.money, 83);
  assert.equal(hooks.state.profit, -37);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), true);
  assert.match(result.text, /missing/i);
});

test('tracksuit inventory theft reduces realized profit by stored cost basis', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const watch = item(hooks, 'smart_watch_locked', 42);
  hooks.state.inventory.push(watch);
  const consequence = hooks.queueThugConsequence('test robbery', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), false);
  assert.equal(hooks.state.profit, -42);
  assert.equal(hooks.state.inventory.length, 0);
  assert.match((deal.thugHistoryLines || []).join('\n'), /Robbery diagnostics:/);
});

test('v0.1.20 actual thug consequence history keeps original queue-source summary', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure.tracksuit_crew = 5;
  const consequence = hooks.queueThugConsequence('queued after moderate lowball insult from Tracksuit Thug', {
    debug: true,
    pressureSourceSummary: 'moderate lowball insult from Tracksuit Thug; faction: tracksuit_crew.'
  });
  assert.ok(consequence);
  const thugDeal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugRefuse', thugDeal);
  const history = (thugDeal.thugHistoryLines || []).join('\n');

  assert.match(history, /Tracksuit pressure source summary:/i);
  assert.match(history, /moderate lowball insult|lowball insult/i);
  assert.match(history, /Tracksuit consequence queued at pressure/);
});

test('v0.1.17 tracksuit choices split cash and item surrender based on available resources', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.factionPressure.tracksuit_crew = 5;
  const watch = item(hooks, 'smart_watch_locked', 42);
  hooks.state.inventory.push(watch);
  let consequence = hooks.queueThugConsequence('test choice resources', { debug: true });
  let deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  let choices = hooks.getThugChoiceDescriptors(deal);
  assert.ok(choices.some(choice => choice.label === 'Don\'t make this worse' && choice.action === 'thugComply'));
  assert.ok(choices.some(choice => choice.label === 'Try to talk him down' && choice.action === 'thugCash'));
  assert.ok(choices.some(choice => choice.action === 'thugRefuse'));
  assert.equal(choices.some(choice => String(choice.action).startsWith('thugItem:')), false);
  assert.equal(choices.some(choice => /cash or merchandise/i.test(choice.label)), false);

  resetState(hooks);
  hooks.state.inventory = [];
  hooks.state.money = 40;
  hooks.state.factionPressure.tracksuit_crew = 5;
  consequence = hooks.queueThugConsequence('test cash only choice', { debug: true });
  deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));
  choices = hooks.getThugChoiceDescriptors(deal);
  assert.ok(choices.some(choice => choice.action === 'thugCash'));
  assert.ok(choices.some(choice => choice.action === 'thugComply'));
  assert.equal(choices.some(choice => String(choice.action).startsWith('thugItem')), false);

  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  consequence = hooks.queueThugConsequence('test item only choice', { debug: true });
  deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));
  choices = hooks.getThugChoiceDescriptors(deal);
  assert.equal(choices.some(choice => choice.action === 'thugCash'), false);
  assert.ok(choices.some(choice => choice.action === 'thugComply'));
  assert.equal(choices.some(choice => String(choice.action).startsWith('thugItem')), false);

  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.inventory = [];
  hooks.state.factionPressure.tracksuit_crew = 5;
  consequence = hooks.queueThugConsequence('test empty choice', { debug: true });
  deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));
  choices = hooks.getThugChoiceDescriptors(deal);
  assert.equal(choices.some(choice => choice.action === 'thugCash'), false);
  assert.equal(choices.some(choice => choice.action === 'thugComply'), false);
  assert.equal(choices.some(choice => String(choice.action).startsWith('thugItem')), false);
  assert.ok(choices.some(choice => choice.action === 'thugRefuse'));
});

test('v0.1.23 Tracksuit Guy chooses stolen item without opening player inventory selection', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const ring = item(hooks, 'gold_ring_engravings', 64);
  hooks.state.inventory.push(ring);
  const consequence = hooks.queueThugConsequence('test thug-controlled selection', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  const choices = hooks.getThugChoiceDescriptors(deal);
  const result = hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(choices.some(choice => String(choice.action).startsWith('thugItem:')), false);
  assert.equal(hooks.state.inventorySelection.active, false);
  assert.equal(hooks.isInventoryOpen(), false);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === ring.instanceId), false);
  assert.match(result.text, /Gold Ring With Weird Engraving/);
  assert.match((deal.thugHistoryLines || []).join('\n'), /Tracksuit Heavy selected Gold Ring With Weird Engraving/);
});

test('v0.1.23 luxury and valuable inventory is preferred over fake or junk inventory', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  hooks.state.factionPressure.tracksuit_crew = 5;
  const ring = item(hooks, 'gold_ring_engravings', 64);
  const fakeBag = item(hooks, 'luxury_handbag_fake', 8);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(ring, fakeBag, dvd);
  const consequence = hooks.queueThugConsequence('test valuable preferred', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === ring.instanceId), false);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === fakeBag.instanceId), true);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), true);
  const diagnostics = (deal.thugHistoryLines || []).join('\n');
  assert.match(diagnostics, /selected Gold Ring With Weird Engraving/);
  assert.match(diagnostics, /reason preferred tags jewelry\/luxury\/suspicious/);
});

test('v0.1.23 thug robbery selection is weighted rather than highest-value only', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure.tracksuit_crew = 5;
  const watch = item(hooks, 'smart_watch_locked', 42);
  const revolver = item(hooks, 'rusty_revolver_prop', 45);
  hooks.state.inventory.push(watch, revolver);
  const consequence = hooks.queueThugConsequence('test weighted selection', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === revolver.instanceId), false);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), true);
  const diagnostics = (deal.thugHistoryLines || []).join('\n');
  assert.match(diagnostics, /Locked Smart Watch .* value \$90/);
  assert.match(diagnostics, /selected Rusty Movie Prop Revolver/);
});

test('tracksuit cash payoff takes shelf item when cash drawer is empty', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const watch = item(hooks, 'smart_watch_locked', 42);
  hooks.state.inventory.push(watch);
  const consequence = hooks.queueThugConsequence('test empty drawer robbery', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  const result = hooks.resolveConsequenceChoice('thugCash', deal);

  assert.equal(hooks.state.money, 0);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), false);
  assert.equal(hooks.state.profit, -42);
  assert.match(result.text, /Locked Smart Watch/);
  assert.doesNotMatch(result.text, /empty-handed only/i);
  assert.match((deal.thugHistoryLines || []).join('\n'), /cash \$0 -> \$0; item Locked Smart Watch/);
  assert.match((deal.thugHistoryLines || []).join('\n'), /final consequence loss \$42/);
});

test('v0.1.23 tracksuit compliance falls back to cash when inventory is unsuitable or unavailable', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 40;
  const fakeBag = item(hooks, 'luxury_handbag_fake', 8);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory = [fakeBag, dvd];
  hooks.state.factionPressure.tracksuit_crew = 5;
  const consequence = hooks.queueThugConsequence('test item fallback cash robbery', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  const result = hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(hooks.state.money, 29);
  assert.equal(hooks.state.profit, -11);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === fakeBag.instanceId), true);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), true);
  assert.match(result.text, /\$11 cash instead|takes \$11 cash/i);
  assert.match((deal.thugHistoryLines || []).join('\n'), /compliance fallback/);
});

test('v0.1.23 junk inventory can be selected when no cash or better item exists', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const consequence = hooks.queueThugConsequence('test junk fallback', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), false);
  assert.equal(hooks.state.profit, -4);
  assert.match((deal.thugHistoryLines || []).join('\n'), /selected Stack of DVDs Nobody Asked For/);
});

test('v0.1.23 thug-selected item can be paired with cash for remaining robbery value exactly once', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 200;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const knife = item(hooks, 'pocket_knife', 10);
  hooks.state.inventory.push(knife);
  const consequence = hooks.queueThugConsequence('test mixed compliance loss', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugComply', deal);
  const history = (deal.thugHistoryLines || []).join('\n');
  hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === knife.instanceId), false);
  assert.equal(hooks.state.money, 185);
  assert.equal(hooks.state.profit, -25);
  assert.match(history, /selected Pocket Knife/);
  assert.match(history, /cash top-up \$15/);
  assert.match(history, /remaining value sought \$0/);
  assert.match(history, /final consequence loss \$25/);
});

test('v0.1.23 thug-selected small robbery can prefer weighted suitable item over highest value', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const watch = item(hooks, 'smart_watch_locked', 43);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(watch, dvd);
  const consequence = hooks.queueThugConsequence('test proportionate item robbery', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugComply', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === dvd.instanceId), true);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), false);
  const diagnostics = (deal.thugHistoryLines || []).join('\n');
  assert.match(diagnostics, /intended value \$8|intended value \$9/);
  assert.match(diagnostics, /actual value taken/);
  assert.match(diagnostics, /overage/);
  assert.match(diagnostics, /selected Locked Smart Watch/);
});

test('tracksuit cash payoff uses available cash without disproportionate item overpayment', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 5;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const watch = item(hooks, 'smart_watch_locked', 42);
  hooks.state.inventory.push(watch);
  const consequence = hooks.queueThugConsequence('test short drawer robbery', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  const result = hooks.resolveConsequenceChoice('thugCash', deal);

  assert.equal(hooks.state.money, 0);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), true);
  assert.equal(hooks.state.profit, -5);
  assert.match(result.text, /\$5/);
  assert.doesNotMatch(result.text, /Locked Smart Watch/);
  assert.match((deal.thugHistoryLines || []).join('\n'), /cash \$5 -> \$0; item none/);
});

test('tracksuit cash payoff leaves empty-handed only when cash and inventory are unavailable', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const consequence = hooks.queueThugConsequence('test bare shop robbery', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  const result = hooks.resolveConsequenceChoice('thugCash', deal);

  assert.equal(hooks.state.money, 0);
  assert.equal(hooks.state.inventory.length, 0);
  assert.equal(hooks.state.profit, 0);
  assert.match(result.text, /empty-handed only because there is nothing to steal/i);
  assert.match((deal.thugHistoryLines || []).join('\n'), /item candidates \[none\]/);
});

test('trade cash-demand and submission actions are blocked with no selected inventory', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));

  assert.equal(hooks.canSubmitTradeAction(deal).canSubmit, false);
  assert.match(hooks.resolveTrade('tradeCash', deal).text, /Select trade items/i);
  assert.equal(deal.tradeSubmissions, 0);
});

test('invalid trade clicks through resolver do not consume attempts or write turn history', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));
  hooks.state.currentDeal = deal;
  hooks.state.currentCustomer = deal.customer;
  hooks.state.conversation = { phase: 'choices' };
  const beforeTurn = hooks.state.turn;
  const beforeNormal = hooks.state.normalEncounterCount;

  hooks.resolveChoice('tradeCash');
  hooks.resolveChoice('tradeCash');

  assert.equal(deal.tradeSubmissions, 0);
  assert.equal(hooks.getTurnHistory().length, 0);
  assert.equal(hooks.state.turn, beforeTurn);
  assert.equal(hooks.state.normalEncounterCount, beforeNormal);
});

test('trade attempt limit blocks further submissions without pressure or repeated history', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [dvd.instanceId];
  deal.tradeSubmissions = hooks.constants.NEGOTIATION_OUTCOMES.attemptLimits.trade;
  const pressureBefore = hooks.state.factionPressure.tracksuit_crew || 0;

  const first = hooks.resolveTrade('submitTradeOffer', deal);
  const second = hooks.resolveTrade('submitTradeOffer', deal);

  assert.equal(hooks.isTradeSubmissionLimitReached(deal), true);
  assert.equal(first.skipHistory, true);
  assert.equal(second.skipHistory, true);
  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, pressureBefore);
  assert.equal((deal.tradeHistoryLines || []).filter(line => /submission limit/.test(line)).length, 1);
});

test('v0.1.22 single-item trade inventory selection closes and does not duplicate item', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const tablet = item(hooks, 'cracked_tablet', 24);
  hooks.state.inventory.push(tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  hooks.state.currentDeal = deal;
  hooks.state.currentCustomer = deal.customer;

  hooks.openTradeSelection();
  assert.equal(hooks.isInventoryOpen(), true);
  hooks.toggleTradeInventorySelection(deal, tablet.instanceId);
  hooks.toggleTradeInventorySelection(deal, tablet.instanceId);

  assert.equal(hooks.isInventoryOpen(), false);
  assert.equal(deal.selectedTradeInventoryInstanceIds.join(','), tablet.instanceId);
  assert.equal(deal.requestedInventoryItems.map(entry => entry.instanceId).join(','), tablet.instanceId);
  assert.equal(hooks.state.inventorySelection.active, false);
  assert.equal(hooks.canSubmitTradeAction(deal).canSubmit, true);
});

test('v0.1.22 ordinary inventory browsing stays open during item inspection', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  hooks.setInventoryOpen(true);

  const visible = hooks.renderDealPanelText(hooks.getInventoryDetail(dvd));

  assert.equal(hooks.isInventoryOpen(), true);
  assert.match(visible, /^Stack of DVDs Nobody Asked For:/);
});

test('v0.1.23 normal NPC arrival closes inventory and clears stale selection state', async () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  prepareFastNextSmoke(hooks, deal);
  const previousTurn = hooks.state.turn;

  hooks.resolveChoice('buyAsk');
  hooks.setInventoryOpen(true);
  hooks.state.inventorySelection.active = true;
  hooks.state.inventorySelection.encounterId = deal.encounterId;
  hooks.state.inventorySelection.mode = 'trade';
  hooks.state.inventorySelection.selectedInstanceIds = ['stale_instance'];
  await new Promise(resolve => setTimeout(resolve, 160));
  await pressNextAndWaitForNewNpc(hooks, deal.customer.id, previousTurn);

  assert.equal(hooks.isInventoryOpen(), false);
  assert.equal(hooks.state.inventorySelection.active, false);
  assert.deepEqual(Array.from(hooks.state.inventorySelection.selectedInstanceIds), []);
});

test('v0.1.23 consequence NPC arrival cleanup closes inventory and clears stale selection state', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setInventoryOpen(true);
  hooks.state.inventorySelection.active = true;
  hooks.state.inventorySelection.encounterId = 'old_encounter';
  hooks.state.inventorySelection.mode = 'sale';
  hooks.state.inventorySelection.selectedInstanceIds = ['old_item'];

  hooks.clearTemporaryEncounterUiState();

  assert.equal(hooks.isInventoryOpen(), false);
  assert.equal(hooks.state.inventorySelection.active, false);
  assert.equal(hooks.state.inventorySelection.encounterId, null);
  assert.equal(hooks.state.inventorySelection.mode, null);
  assert.deepEqual(Array.from(hooks.state.inventorySelection.selectedInstanceIds), []);
});

test('v0.1.23 inventory can reopen during a later eligible sale encounter after cleanup', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.inventory.push(item(hooks, 'dvd_stack', 4));
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bargain_hunter_buys_dvds'));
  hooks.state.currentDeal = deal;
  hooks.state.currentCustomer = deal.customer;
  hooks.clearTemporaryEncounterUiState();

  hooks.openInventorySelection();

  assert.equal(hooks.isInventoryOpen(), true);
  assert.equal(hooks.state.inventorySelection.active, true);
  assert.equal(hooks.state.inventorySelection.mode, 'sale');
  assert.equal(hooks.state.inventorySelection.encounterId, deal.encounterId);
});

test('v0.1.22 deal-panel lowball rejection includes item display name without raw IDs', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'rejectedOriginal');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('lowball');
  const visible = hooks.getVisibleDealPanelText();

  assert.match(visible, /^Locked Smart Watch: The below-asking/);
  assert.doesNotMatch(visible, /\binv_\d+\b|red_hustler_locked_watch|undefined|null/);
});

test('v0.1.22 deal-panel negotiation outcomes use item context when available', () => {
  const cases = [
    {
      label: 'worsened price',
      make(hooks) {
        forceNegotiationOutcome(hooks, 'lowball', 'priceWorsened');
        return { action: 'lowball', deal: hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch')), prefix: 'Locked Smart Watch:' };
      }
    },
    {
      label: 'walk away',
      make(hooks) {
        forceNegotiationOutcome(hooks, 'lowball', 'customerWalks');
        return { action: 'lowball', deal: hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch')), prefix: 'Locked Smart Watch:' };
      }
    },
    {
      label: 'markup rejection',
      make(hooks) {
        forceNegotiationOutcome(hooks, 'markup', 'rejectedOriginal');
        const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
        return { action: 'markup', deal, prefix: 'Suspicious Gold Watch:' };
      }
    },
    {
      label: 'counteroffer',
      make(hooks) {
        forceNegotiationOutcome(hooks, 'markup', 'counteroffer');
        const { deal } = prepareSaleDeal(hooks, 'red_hustler_buys_watch', 'suspicious_gold_watch');
        return { action: 'markup', deal, prefix: 'Suspicious Gold Watch:' };
      }
    }
  ];

  cases.forEach(testCase => {
    const hooks = loadGame(0);
    resetState(hooks);
    const { action, deal, prefix } = testCase.make(hooks);
    primeChoiceSmoke(hooks, deal);

    hooks.resolveChoice(action);
    const visible = hooks.getVisibleDealPanelText();

    assert.match(visible, new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`), testCase.label);
    assert.doesNotMatch(visible, /\binv_\d+\b|undefined|null/);
  });
});

test('v0.1.22 trade result Deal text uses known item context and hides raw IDs', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'trade', 'rejectedRetry');
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_junk_trade'));
  deal.cashAdjustment = 0;
  deal.selectedTradeInventoryInstanceIds = [dvd.instanceId];
  primeChoiceSmoke(hooks, deal);

  hooks.resolveChoice('submitTradeOffer');
  const visible = hooks.getVisibleDealPanelText();

  assert.match(visible, /^Loose Silverware Bundle:/);
  assert.doesNotMatch(visible, /\binv_\d+\b|bum_junk_trade|undefined|null/);
});

test('v0.1.22 missing result lookup uses safe generic fallback', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.currentDeal = {
    encounterId: 'encounter-safe-fallback',
    dealType: 'trade',
    customer: hooks.getCharacter('bum'),
    item: null,
    currentResultSummary: 'The offer lands badly.'
  };
  hooks.state.conversation = { phase: 'choices' };

  const visible = hooks.renderDealPanelText('The offer lands badly.');

  assert.equal(visible, 'The item: The offer lands badly.');
  assert.doesNotMatch(visible, /\binv_\d+\b|undefined|null|encounter-safe-fallback/);
});

test('price-worsened lowball text and deal UI show old and new price and purchase uses new price', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'priceWorsened');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  const oldAsk = deal.askingPrice;

  const result = hooks.resolveBuy('lowball', deal);
  const newAsk = deal.askingPrice;
  hooks.state.currentDeal = deal;
  const beforeBuy = hooks.state.money;
  const dealText = hooks.getDealText();
  hooks.resolveBuy('buyAsk', deal);

  assert.ok(newAsk > oldAsk);
  assert.match(result.text, new RegExp(`\\$${oldAsk}.*\\$${newAsk}`));
  assert.match(dealText, /PRICE RAISED/);
  assert.match(hooks.getFullOfferLabel ? hooks.getFullOfferLabel(deal) : `Buy for $${deal.defaultOffer}`, new RegExp(`\\$${newAsk}`));
  assert.equal(hooks.state.money, beforeBuy - newAsk);
});

test('clerk assessment dialogue uses in-world warnings instead of raw diagnostics', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === '70s_hustler_gold_watch'));
  const assessment = hooks.clerkAssessment(deal);

  assert.doesNotMatch(assessment, /Assessment:/);
  assert.doesNotMatch(assessment, /resale around|target resale|cost \$|heat \d|tags:/i);
  assert.doesNotMatch(assessment, /(?:Cop|Scam|Thug) risk\s*\+\d+/i);
  assert.doesNotMatch(assessment, /\b[a-z]+(?:_[a-z0-9]+)+\b/);
  assert.match(assessment, /nightclub owner|police attention|fake|not real/i);
});

test('player-facing dialogue sanitizer removes source notes and internal ids', () => {
  const hooks = loadGame(0);
  const text = hooks.sanitizePlayerDialogueText('Claims it belonged to a nightclub owner. Use 70s_hustler_gold_watch pool. Cop risk +1; scam risk +1.');

  assert.match(text, /nightclub owner/);
  assert.doesNotMatch(text, /Use .*pool/i);
  assert.doesNotMatch(text, /70s_hustler_gold_watch/);
  assert.doesNotMatch(text, /risk \+\d+/i);
});

test('deal panel hides normalized duplicate dialogue when no distinct fallback exists', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.conversation = { phase: 'choices' };

  hooks.setDialogueText('No\nDeal.');
  const visible = hooks.renderDealPanelText('  no   deal  ');

  assert.equal(visible, '');
  assert.equal(hooks.isDealPanelHidden(), true);
});

test('deal panel uses distinct changed-term fallback instead of duplicating dialogue', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  hooks.state.currentDeal = deal;
  hooks.state.conversation = { phase: 'choices' };
  deal.priceWorsenedNotice = { oldAsk: 50, newAsk: 63 };

  hooks.setDialogueText('He looks offended.');
  const visible = hooks.renderDealPanelText('he looks offended!');

  assert.equal(visible, 'The asking price increased from $50 to $63.');
  assert.equal(hooks.isDealPanelHidden(), false);

  hooks.setDialogueText('Different line.');
  const restored = hooks.renderDealPanelText('Fresh deal context.');
  assert.equal(restored, 'Locked Smart Watch: Fresh deal context.');
  assert.equal(hooks.isDealPanelHidden(), false);
});

test('v0.1.14 deal panel prefixes sell-to-shop flavor with runtime item name', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  hooks.state.currentDeal = deal;
  hooks.state.conversation = { phase: 'choices' };

  const visible = hooks.renderDealPanelText(deal.pool.notes);

  assert.equal(visible, 'Locked Smart Watch: The lock screen belongs to somebody with a different name.');
});

test('v0.1.14 deal panel prefixes another item dynamically', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  hooks.state.currentDeal = deal;
  hooks.state.conversation = { phase: 'choices' };

  const visible = hooks.renderDealPanelText(deal.pool.notes);

  assert.equal(visible, 'Microwave That Hums Prayers: It hums because something in it gave up.');
});

test('v0.1.14 deal panel does not duplicate an item name already in text', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  hooks.state.currentDeal = deal;
  hooks.state.conversation = { phase: 'choices' };

  const visible = hooks.renderDealPanelText('Locked Smart Watch: The lock screen belongs to somebody with a different name.');

  assert.equal(visible, 'Locked Smart Watch: The lock screen belongs to somebody with a different name.');
});

test('v0.1.14 deal panel leaves itemless deals unchanged', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.currentDeal = { dealType: 'pawn', customer: hooks.getCharacter('bum') };
  hooks.state.conversation = { phase: 'choices' };

  const visible = hooks.renderDealPanelText('No associated item on this counter.');

  assert.equal(visible, 'No associated item on this counter.');
});

test('v0.1.14 inventory selection refreshes deal panel item prefix', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const dvd = item(hooks, 'dvd_stack', 4);
  const tablet = item(hooks, 'cracked_tablet', 12);
  hooks.state.inventory.push(dvd, tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bargain_hunter_buys_dvds'));
  hooks.state.currentDeal = deal;
  hooks.state.conversation = { phase: 'choices' };

  hooks.applySelectedInventoryItemToDeal(deal, dvd);
  const first = hooks.renderDealPanelText(hooks.getInventoryDetail(dvd));
  hooks.applySelectedInventoryItemToDeal(deal, tablet);
  const second = hooks.renderDealPanelText(hooks.getInventoryDetail(tablet));

  assert.match(first, /^Stack of DVDs Nobody Asked For:/);
  assert.match(second, /^Cracked Tablet:/);
});

test('$2 against $60 Red Hustler ask cannot be accepted below lowball floor', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  deal.askingPrice = 60;
  deal.askPrice = 60;
  deal.defaultOffer = 60;
  deal.lowballPrice = 2;

  hooks.resolveBuy('lowball', deal);

  assert.notEqual(deal.lowballOutcome, 'accepted');
  assert.equal(hooks.state.inventory.some(entry => entry.itemId === deal.item.id), false);
});

test('explicit desperation override can bypass lowball acceptance floor', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'accepted');
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  deal.askingPrice = 60;
  deal.askPrice = 60;
  deal.defaultOffer = 60;
  deal.lowballPrice = 2;
  deal.ignoreLowballAcceptanceFloor = true;

  hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballOutcome, 'accepted');
  assert.equal(hooks.state.inventory.some(entry => entry.itemId === deal.item.id), true);
});

test('trade refusal applies faction pressure no more than once and blocked submissions apply none', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));

  hooks.resolveTrade('refuse', deal);
  const afterRefuse = hooks.state.factionPressure.tracksuit_crew;
  hooks.resolveTrade('refuse', deal);

  assert.equal(hooks.state.factionPressure.tracksuit_crew, afterRefuse);

  const blocked = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));
  blocked.tradeSubmissions = hooks.constants.NEGOTIATION_OUTCOMES.attemptLimits.trade;
  hooks.resolveTrade('submitTradeOffer', blocked);
  assert.equal(hooks.state.factionPressure.tracksuit_crew, afterRefuse);
});

test('hustler and tracksuit faction pressure policy has parity for equivalent actions', () => {
  const hooks = loadGame(0);
  const base = {
    dealType: 'sell_to_shop',
    actionType: 'lowball',
    severity: 'moderate',
    outcome: 'accepted',
    transactionCompleted: true,
    encounterId: 'parity'
  };

  const hustler = hooks.evaluateFactionPressure({ ...base, factionId: 'hustlers' });
  const tracksuit = hooks.evaluateFactionPressure({ ...base, factionId: 'tracksuits' });
  const hustlerRefusal = hooks.evaluateFactionPressure({
    factionId: 'hustlers',
    dealType: 'sell_to_shop',
    actionType: 'refuseItem',
    outcome: 'refused',
    transactionCompleted: false,
    encounterId: 'parity-refusal'
  });
  const tracksuitRefusal = hooks.evaluateFactionPressure({
    factionId: 'tracksuits',
    dealType: 'sell_to_shop',
    actionType: 'refuseItem',
    outcome: 'refused',
    transactionCompleted: false,
    encounterId: 'parity-refusal'
  });

  assert.deepEqual(
    {
      eligible: hustler.eligible,
      amount: hustler.amount,
      rule: hustler.rule,
      reason: hustler.reason
    },
    {
      eligible: tracksuit.eligible,
      amount: tracksuit.amount,
      rule: tracksuit.rule,
      reason: tracksuit.reason
    }
  );
  assert.deepEqual(
    {
      eligible: hustlerRefusal.eligible,
      amount: hustlerRefusal.amount,
      rule: hustlerRefusal.rule,
      reason: hustlerRefusal.reason
    },
    {
      eligible: tracksuitRefusal.eligible,
      amount: tracksuitRefusal.amount,
      rule: tracksuitRefusal.rule,
      reason: tracksuitRefusal.reason
    }
  );
  assert.equal(hustlerRefusal.amount, 1);
});

test('hustlers and tracksuits gain identical runtime pressure from lowball, sale refusal, trade refusal, and cash demand', () => {
  const cases = [
    {
      factionId: 'hustlers',
      sellerPool: 'hustler_shorty_locked_watch',
      buyerPool: 'hustler_shorty_buys_watch',
      tradePool: 'hustler_shorty_figure_trade'
    },
    {
      factionId: 'tracksuits',
      sellerPool: 'tracksuit_legs_locked_watch',
      buyerPool: 'tracksuit_legs_buys_watch',
      tradePool: 'tracksuit_legs_figure_trade'
    }
  ];

  cases.forEach(config => {
    let hooks = loadGame(0);
    resetState(hooks);
    forceNegotiationOutcome(hooks, 'lowball', 'accepted');
    const lowballDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === config.sellerPool));
    lowballDeal.lowballPrice = Math.round((lowballDeal.askingPrice ?? lowballDeal.askPrice) * 0.55);
    hooks.resolveBuy('lowball', lowballDeal);
    assert.equal(hooks.state.factionPressure[config.factionId], 1, `${config.factionId} accepted lowball pressure`);

    hooks = loadGame(0);
    resetState(hooks);
    const { deal: saleDeal } = prepareSaleDeal(hooks, config.buyerPool, 'suspicious_gold_watch');
    hooks.resolveSell('refuse', saleDeal);
    assert.equal(hooks.state.factionPressure[config.factionId], 1, `${config.factionId} matching sale refusal pressure`);

    hooks = loadGame(0);
    resetState(hooks);
    const tradeDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === config.tradePool));
    hooks.state.inventory.push(item(hooks, 'cracked_tablet', 12));
    hooks.resolveTrade('refuse', tradeDeal);
    assert.equal(hooks.state.factionPressure[config.factionId], 2, `${config.factionId} actionable trade refusal pressure`);

    hooks = loadGame(0.99);
    resetState(hooks);
    const cashItem = item(hooks, 'cracked_tablet', 12);
    hooks.state.inventory.push(cashItem);
    const cashDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === config.tradePool));
    cashDeal.selectedTradeInventoryInstanceIds = [cashItem.instanceId];
    hooks.resolveTrade('tradeCash', cashDeal);
    assert.equal(hooks.state.factionPressure[config.factionId], 1, `${config.factionId} failed cash-demand pressure`);
  });
});

test('tracksuit pressure crossing threshold queues and selects thug within bounded eligible window', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));

  hooks.maybeQueueThugConsequence(deal, 'below threshold test');
  assert.equal(hooks.state.consequenceQueue.some(entry => entry.type === 'thug_robbery_consequence'), false);

  hooks.state.factionPressure.tracksuit_crew = 5;
  const consequence = hooks.maybeQueueThugConsequence(deal, 'threshold test');
  assert.ok(consequence);
  hooks.state.turn = consequence.earliestTurn;
  hooks.state.normalEncountersSinceSpecial = 6;

  let selected = null;
  for (let i = 0; i < hooks.constants.THUG_CONSEQUENCE_MAX_ELIGIBLE_CHECKS; i += 1) {
    selected = hooks.getEligibleQueuedConsequence();
    if (selected) break;
  }

  assert.ok(selected);
  assert.equal(selected.type, 'thug_robbery_consequence');
  assert.match(selected.metadata.schedulingStatus, /guarantee reached|actual selection chance/);
});

test('v0.1.21 tracksuit pressure arms thug queue during shared special cooldown', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  hooks.state.factionPressure.tracksuit_crew = 2;
  hooks.state.normalEncountersSinceSpecial = 0;
  hooks.state.thugConsequenceCooldownUntil = hooks.state.turn + 6;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_prop_revolver'));
  deal.askingPrice = 80;
  deal.askPrice = 80;
  deal.defaultOffer = 80;
  deal.lowballPrice = 2;

  hooks.resolveBuy('lowball', deal);
  const thugQueue = hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && entry.resolved !== true);

  assert.equal(thugQueue.length, 1);
  assert.equal(thugQueue[0].sourceTurn, hooks.state.turn);
  assert.equal(thugQueue[0].triggeringCharacterId, 'tracksuit_thug');
  assert.equal(thugQueue[0].triggeringDealId, 'tracksuit_prop_revolver');
  assert.ok(thugQueue[0].metadata.factionPressureAtQueue >= hooks.constants.TRACKSUIT_CONSEQUENCE_MIN_PRESSURE);
  assert.match((deal.thugHistoryLines || []).join('\n'), /pressure threshold reached/);
  assert.match((deal.thugHistoryLines || []).join('\n'), /Tracksuit scheduling queued: source T/);
});

test('v0.1.21 queued thug waits for shared cooldown and existing eligibility ramp', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  hooks.state.normalEncountersSinceSpecial = 0;
  hooks.state.factionPressure.tracksuit_crew = 5;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));
  const consequence = hooks.maybeQueueThugConsequence(deal, 'cooldown wait test');
  assert.ok(consequence);

  hooks.state.turn = consequence.earliestTurn;
  hooks.state.normalEncountersSinceSpecial = 5;
  assert.equal(hooks.getEligibleQueuedConsequence(), null);
  assert.equal(consequence.resolved, false);

  hooks.state.normalEncountersSinceSpecial = 6;
  assert.equal(hooks.getEligibleQueuedConsequence(), null);
  assert.equal(consequence.resolved, false);
  assert.match(consequence.metadata.schedulingStatus, /not selected on eligible check/);
});

test('v0.1.21 additional tracksuit pressure does not duplicate queue or replace original source', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.factionPressure.tracksuit_crew = 5;
  const originalDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));
  hooks.maybeQueueThugConsequence(originalDeal, 'original source test');
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence').length, 1);
  const original = hooks.state.consequenceQueue.find(entry => entry.type === 'thug_robbery_consequence');

  const laterDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_prop_revolver'));
  hooks.maybeQueueThugConsequence(laterDeal, 'later source should not replace original');

  const thugQueue = hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && entry.resolved !== true);
  assert.equal(thugQueue.length, 1);
  assert.equal(thugQueue[0].id, original.id);
  assert.equal(thugQueue[0].reason, 'original source test');
  assert.equal(thugQueue[0].triggeringDealId, originalDeal.pool.id);
  assert.match((laterDeal.thugHistoryLines || []).join('\n'), /pending\/active thug consequence; original source remains tracked/);
});

test('v0.1.21 pending cop and thug consequences coexist without overwriting each other', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const cop = hooks.queueConsequence({
    type: 'cop_consequence',
    sourceTurn: hooks.state.turn,
    triggeringCharacterId: 'undercover_cop',
    triggeringDealId: 'cop coexistence source',
    triggeringItemId: 'smart_watch_locked',
    earliestTurn: hooks.state.turn + 3,
    metadata: { debug: true }
  });
  hooks.state.factionPressure.tracksuit_crew = 5;
  const thugDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));
  const thug = hooks.maybeQueueThugConsequence(thugDeal, 'thug coexistence source');

  assert.ok(cop);
  assert.ok(thug);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'cop_consequence' && entry.resolved !== true).length, 1);
  assert.equal(hooks.state.consequenceQueue.filter(entry => entry.type === 'thug_robbery_consequence' && entry.resolved !== true).length, 1);
});

test('v0.1.21 one selected special delays but does not remove the other pending special', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const cop = hooks.queueConsequence({
    type: 'cop_consequence',
    sourceTurn: hooks.state.turn,
    triggeringCharacterId: 'undercover_cop',
    triggeringDealId: 'cop pacing source',
    triggeringItemId: 'smart_watch_locked',
    earliestTurn: hooks.state.turn,
    metadata: { debug: true }
  });
  hooks.state.factionPressure.tracksuit_crew = 5;
  const thugDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_knife'));
  const thug = hooks.maybeQueueThugConsequence(thugDeal, 'thug pacing source');
  thug.earliestTurn = hooks.state.turn;
  hooks.state.normalEncountersSinceSpecial = 6;

  const selected = hooks.getEligibleQueuedConsequence();
  assert.equal(selected.id, cop.id);
  selected.resolved = true;
  hooks.state.normalEncountersSinceSpecial = 0;

  assert.equal(hooks.getEligibleQueuedConsequence(), null);
  assert.equal(thug.resolved, false);
  assert.equal(hooks.state.consequenceQueue.some(entry => entry.id === thug.id), true);

  hooks.state.normalEncountersSinceSpecial = 6;
  assert.equal(hooks.getEligibleQueuedConsequence()?.id, thug.id);
});

test('v0.1.21 non-tracksuit generic hostile trade backlash only reduces reputation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  forceNegotiationOutcome(hooks, 'trade', 'factionPressure');
  const tablet = item(hooks, 'cracked_tablet', 4);
  hooks.state.inventory.push(tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  deal.cashAdjustment = 100;
  deal.pool.requestedItemTags = [];
  deal.selectedTradeInventoryInstanceIds = [tablet.instanceId];
  const before = hooks.snapshotState();

  hooks.resolveTrade('submitTradeOffer', deal);

  assert.equal(hooks.state.reputation, before.reputation - 1);
  assert.equal(hooks.state.factionPressure.tracksuit_crew || 0, before.factionPressure.tracksuit_crew || 0);
  assert.equal(hooks.state.consequenceQueue.some(entry => entry.type === 'thug_robbery_consequence'), false);
  assert.match((deal.factionPressureHistoryLines || []).join('\n'), /reputation loss only/);
  assert.doesNotMatch((deal.factionPressureHistoryLines || []).join('\n'), /Tracksuit Pressure Source/);
});

test('v0.1.13 trade confirmation names both sides and gates mutation', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.setFastTestMode(true);
  const tablet = item(hooks, 'cracked_tablet', 24);
  hooks.state.inventory.push(tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  deal.cashAdjustment = -40;
  deal.selectedTradeInventoryInstanceIds = [tablet.instanceId];
  hooks.state.currentDeal = deal;

  assert.match(hooks.getDealText(), /Customer offers: Pocket Knife/i);
  assert.match(hooks.getDealText(), /You selected: Cracked Tablet/i);
  const before = hooks.snapshotState();
  const pending = hooks.resolveTrade('submitTradeOffer', deal);

  assert.match(pending.text, /Review trade/i);
  assert.match(pending.text, /Cracked Tablet/i);
  assert.match(pending.text, /Pocket Knife/i);
  assert.match(pending.text, /\$40/i);
  assert.equal(hooks.state.money, before.money);
  assert.deepEqual(hooks.snapshotState().inventory, before.inventory);

  const repeated = hooks.resolveTrade('submitTradeOffer', deal);
  assert.equal(repeated.blockedAction, true);
  assert.equal(deal.tradeSubmissions, 1);

  const confirmed = hooks.resolveTrade('confirmTrade', deal);
  assert.match(confirmed, /Trade accepted/i);
  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === tablet.instanceId), false);
  assert.equal(hooks.state.inventory.filter(entry => entry.itemId === 'pocket_knife').length, 1);
});

test('v0.1.13 changing or cancelling a pending trade leaves state unchanged', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const tablet = item(hooks, 'cracked_tablet', 24);
  hooks.state.inventory.push(tablet);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_knife_trade'));
  deal.cashAdjustment = -40;
  deal.selectedTradeInventoryInstanceIds = [tablet.instanceId];
  const before = hooks.snapshotState();

  hooks.resolveTrade('submitTradeOffer', deal);
  const changed = hooks.resolveTrade('changeTradeOffer', deal);
  assert.equal(changed.keepEncounterOpen, true);
  assert.equal(hooks.state.money, before.money);
  assert.deepEqual(hooks.snapshotState().inventory, before.inventory);

  deal.selectedTradeInventoryInstanceIds = [tablet.instanceId];
  hooks.resolveTrade('submitTradeOffer', deal);
  const canceled = hooks.resolveTrade('cancelTrade', deal);
  assert.equal(canceled.keepEncounterOpen, true);
  assert.equal(hooks.state.money, before.money);
  assert.deepEqual(hooks.snapshotState().inventory, before.inventory);
});

test('v0.1.13 neutral refusals preserve reputation while severe pressure still works', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const lowTrustDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  const reputationBefore = hooks.state.reputation;

  hooks.resolveBuy('refuse', lowTrustDeal);
  assert.equal(hooks.state.reputation, reputationBefore);

  resetState(hooks);
  forceNegotiationOutcome(hooks, 'lowball', 'consequence');
  const hostileDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'tracksuit_prop_revolver'));
  hostileDeal.askingPrice = 80;
  hostileDeal.askPrice = 80;
  hostileDeal.lowballPrice = 2;
  const pressureBefore = hooks.state.factionPressure.tracksuit_crew || 0;

  hooks.resolveBuy('lowball', hostileDeal);
  assert.ok((hooks.state.factionPressure.tracksuit_crew || 0) > pressureBefore || hooks.state.reputation < 5);
});

test('v0.1.13 low-cash recovery favors revenue encounters without guaranteeing one', () => {
  const hooks = loadGame(0.99);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.inventory.push(item(hooks, 'dvd_stack', 4), item(hooks, 'cracked_tablet', 12));
  hooks.setActiveCustomers([
    activeTestCustomer(hooks, 'bum'),
    activeTestCustomer(hooks, 'junkie'),
    activeTestCustomer(hooks, 'hitman'),
    activeTestCustomer(hooks, 'slot_grandma')
  ]);

  const selection = hooks.chooseNextCustomerWithPools();
  const diagnostics = hooks.formatSelectionDiagnostics(selection.diagnostics);

  assert.equal(selection.diagnostics.lowCashRecovery.active, true);
  assert.match(diagnostics, /Low-cash recovery/i);
  assert.match(diagnostics, /customers buying owned inventory|trades with cash paid to player/i);
  assert.ok(selection.diagnostics.lowCashRecovery.favoredCustomerIds.length > 0 || selection.diagnostics.lowCashRecovery.favoredCashTradePoolIds.length > 0);
  assert.ok(selection.diagnostics.eligibleCustomerIds.length >= selection.diagnostics.lowCashRecovery.favoredCustomerIds.length);
});

test('v0.1.16 critical low-cash dry streak creates a broadened revenue fallback without guaranteeing profit', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.lowCashRecoveryDryStreak = hooks.constants.LOW_CASH_RECOVERY.guaranteeDryStreak;
  const phone = item(hooks, 'used_smartphone', 260);
  hooks.state.inventory.push(phone);
  hooks.setActiveCustomers([activeTestCustomer(hooks, 'bum')]);

  const { normalSelection, deal } = hooks.chooseNextNormalDeal();
  const diagnostics = hooks.formatSelectionDiagnostics(normalSelection.diagnostics);

  assert.equal(hooks.shouldGuaranteeLowCashRecovery(), true);
  assert.equal(deal.dealType, 'buy_from_shop');
  assert.equal(deal.recoveryFallback, true);
  assert.equal(deal.requestSatisfiable, true);
  assert.ok(deal.eligibleInventoryInstanceIds.includes(phone.instanceId));
  assert.equal(normalSelection.diagnostics.lowCashRecovery.fallbackActivated, true);
  assert.equal(normalSelection.diagnostics.lowCashRecovery.guaranteed, true);
  assert.match(diagnostics, /eligible broadened buyers/);
  assert.match((deal.demandDiagnostics.lines || []).join('\n'), /Low-cash fallback activated/);

  hooks.applySelectedInventoryItemToDeal(deal, phone);
  assert.ok(deal.salePrice > 0);
  assert.ok(deal.saleQuote.customerAskMultiplier > 0.4);
  assert.ok(deal.salePrice >= Math.round(deal.saleQuote.marketAdjustedValue * 0.5));
  const before = hooks.snapshotState();
  const refused = hooks.resolveSell('refuse', deal);
  assert.equal(hooks.state.money, before.money);
  assert.deepEqual(hooks.snapshotState().inventory, before.inventory);
  assert.match(refused.text, /shelf stocked|pass on the sale/i);
});

test('v0.1.17 low operating cash dry streak forces revenue before the drawer hits zero', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 30;
  hooks.state.lowCashRecoveryDryStreak = hooks.constants.LOW_CASH_RECOVERY.guaranteeDryStreak;
  const phone = item(hooks, 'used_smartphone', 260);
  hooks.state.inventory.push(phone);
  hooks.setActiveCustomers([activeTestCustomer(hooks, 'bum')]);

  const { normalSelection, deal } = hooks.chooseNextNormalDeal();
  const diagnostics = hooks.formatSelectionDiagnostics(normalSelection.diagnostics);

  assert.equal(hooks.shouldGuaranteeLowCashRecovery(), true);
  assert.equal(deal.dealType, 'buy_from_shop');
  assert.equal(deal.requestSatisfiable, true);
  assert.match(diagnostics, /operating cash threshold \$32/);
  assert.match(diagnostics, /buyer forcing reason dry streak reached 3/);
});

test('v0.1.17 seeded 20-turn economy smoke presents repeated buy-from-shop opportunities', () => {
  const hooks = loadGame([0.2, 0.7, 0.4, 0.9, 0.1, 0.6, 0.3, 0.8]);
  resetState(hooks);
  hooks.state.money = 30;
  hooks.state.inventory.push(
    item(hooks, 'dvd_stack', 4),
    item(hooks, 'cracked_tablet', 12),
    item(hooks, 'suspicious_gold_watch', 43)
  );
  hooks.setActiveCustomers([
    activeTestCustomer(hooks, 'bum'),
    activeTestCustomer(hooks, 'junkie'),
    activeTestCustomer(hooks, 'bargain_hunter'),
    activeTestCustomer(hooks, 'red_hustler'),
    activeTestCustomer(hooks, 'slot_grandma')
  ]);
  let buyerOpportunities = 0;
  let longestDryRun = 0;
  let currentDryRun = 0;

  for (let turn = 0; turn < 20; turn += 1) {
    const { deal } = hooks.chooseNextNormalDeal();
    if (!deal) continue;
    hooks.rememberNormalEncounterType(deal);
    if (deal.dealType === 'buy_from_shop' && deal.requestSatisfiable) {
      buyerOpportunities += 1;
      currentDryRun = 0;
    } else if (hooks.isRevenueCapableDeal(deal)) {
      currentDryRun = 0;
    } else {
      currentDryRun += hooks.state.money <= hooks.constants.LOW_CASH_RECOVERY.lowCash && hooks.state.inventory.length > 0 ? 1 : 0;
    }
    longestDryRun = Math.max(longestDryRun, currentDryRun);
    hooks.updateLowCashRecoveryDryStreak(deal);
  }

  assert.ok(buyerOpportunities >= 4);
  assert.ok(longestDryRun <= hooks.constants.LOW_CASH_RECOVERY.guaranteeDryStreak);
  assert.ok(hooks.state.normalEncounterTypeHistory.includes('buyer'));
});

test('v0.1.17 competent ordinary flips can realize positive profit without a jackpot', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  for (let i = 0; i < 3; i += 1) {
    const dvd = item(hooks, 'dvd_stack', 4);
    hooks.state.inventory.push(dvd);
    const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bargain_hunter_buys_dvds'));
    hooks.applySelectedInventoryItemToDeal(deal, dvd);
    hooks.resolveSell('sellTag', deal);
  }

  assert.ok(hooks.state.profit > 0);
  assert.ok(hooks.state.money > 120);
});

test('v0.1.18 normal encounter mix is transaction driven over 25 seeded turns', () => {
  const hooks = loadGame([
    0.15, 0.5, 0.25, 0.55, 0.85, 0.2, 0.58, 0.88, 0.3, 0.6,
    0.18, 0.52, 0.82, 0.22, 0.56, 0.9, 0.28, 0.62, 0.86, 0.35,
    0.65, 0.24, 0.54, 0.84, 0.16, 0.5, 0.8, 0.26, 0.57, 0.87,
    0.32, 0.61, 0.91, 0.12, 0.42, 0.72, 0.19, 0.49, 0.79
  ]);
  resetState(hooks);
  hooks.state.money = 120;
  hooks.state.inventory.push(
    item(hooks, 'dvd_stack', 4),
    item(hooks, 'microwave_haunted', 7),
    item(hooks, 'cracked_tablet', 12)
  );
  hooks.setActiveCustomers([
    activeTestCustomer(hooks, 'bum'),
    activeTestCustomer(hooks, 'crackhead'),
    activeTestCustomer(hooks, 'junkie'),
    activeTestCustomer(hooks, 'bargain_hunter'),
    activeTestCustomer(hooks, 'red_hustler'),
    activeTestCustomer(hooks, 'slot_grandma'),
    activeTestCustomer(hooks, 'hitman')
  ]);
  let buyers = 0;
  let sellers = 0;
  let trades = 0;
  let transactions = 0;
  let profitableFlips = 0;
  let hiddenProblems = 0;
  let acceptedPurchases = 0;
  const seriousConsequenceIds = new Set();
  let sellerRun = 0;
  let maxSellerRunWithInventory = 0;
  let buyerNoneWhileStocked = 0;

  for (let turn = 0; turn < 25; turn += 1) {
    const { normalSelection, deal } = hooks.chooseNextNormalDeal();
    assert.ok(deal, `expected normal deal on smoke turn ${turn}`);
    const type = hooks.getNormalPoolCategory(deal.pool);
    if (type === 'buyer') buyers += 1;
    if (type === 'seller') sellers += 1;
    if (type === 'trade') trades += 1;
    if (hooks.state.inventory.length && type === 'seller') sellerRun += 1;
    else sellerRun = 0;
    maxSellerRunWithInventory = Math.max(maxSellerRunWithInventory, sellerRun);
    if (hooks.state.inventory.length && normalSelection.diagnostics.executableBuyerCount === 0) buyerNoneWhileStocked += 1;

    hooks.state.currentDeal = deal;
    hooks.state.currentCustomer = deal.customer;
    if (type === 'seller' && deal.defaultOffer <= hooks.state.money && transactions < 8) {
      const result = hooks.resolveBuy('buyAsk', deal);
      transactions += 1;
      acceptedPurchases += 1;
      if (/Hidden problem/i.test(result.text || '')) hiddenProblems += 1;
    } else if (type === 'buyer' && deal.requestSatisfiable) {
      const selected = hooks.state.inventory.find(item => deal.eligibleInventoryInstanceIds.includes(item.instanceId));
      if (selected) {
        const beforeProfit = hooks.state.profit;
        hooks.applySelectedInventoryItemToDeal(deal, selected);
        hooks.resolveSell('sellTag', deal);
        transactions += 1;
        if (hooks.state.profit > beforeProfit) profitableFlips += 1;
      }
    }
    hooks.state.consequenceQueue.forEach(entry => seriousConsequenceIds.add(entry.id));
    hooks.rememberNormalEncounterType(deal);
    hooks.updateLowCashRecoveryDryStreak(deal);
  }

  assert.ok(buyers >= 6, `buyers ${buyers}`);
  assert.ok(sellers >= 5, `sellers ${sellers}`);
  assert.ok(trades >= 2, `trades ${trades}`);
  assert.ok(maxSellerRunWithInventory <= 3, `seller run ${maxSellerRunWithInventory}`);
  assert.ok(transactions >= 4, `transactions ${transactions}`);
  assert.ok(profitableFlips >= 2, `profitable flips ${profitableFlips}`);
  assert.ok(hooks.state.profit >= -5, `profit ${hooks.state.profit}`);
  assert.ok(hiddenProblems < Math.max(1, acceptedPurchases / 2));
  assert.ok(seriousConsequenceIds.size <= 2, `serious consequences ${seriousConsequenceIds.size}`);
  assert.ok(hooks.state.money > 0 || hooks.state.inventory.length > 0);
  assert.equal(buyerNoneWhileStocked, 0);
});

test('v0.1.18 low-tier junk lowballs are useful and not automatic reputation hits', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_dvd_stack'));
  deal.lowballPrice = Math.max(1, Math.round(deal.askingPrice * 0.45));
  const outcome = hooks.resolveNegotiationOutcome('lowball', deal, {
    ratio: deal.lowballPrice / deal.askingPrice,
    item: deal.item
  });
  const weights = Object.fromEntries(outcome.adjustedWeights.map(entry => [entry.outcome, entry.chanceWeight]));
  assert.ok(weights.accepted > weights.consequence);
  assert.ok(weights.accepted + weights.rejectedOriginal > weights.customerWalks + weights.consequence);

  forceNegotiationOutcome(hooks, 'lowball', 'rejectedOriginal');
  const reputationBefore = hooks.state.reputation;
  const result = hooks.resolveBuy('lowball', deal);
  assert.equal(hooks.state.reputation, reputationBefore);
  assert.equal(result.keepEncounterOpen, true);
});

test('v0.1.18 seller asking prices usually stay within configured buy range', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const watchDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'crackhead_locked_watch'));
  const fakeChainDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'crackhead_fake_chain'));

  assert.ok(watchDeal.askingPrice >= watchDeal.configuredBuyRange.min);
  assert.ok(watchDeal.askingPrice <= watchDeal.configuredBuyRange.max);
  assert.ok(fakeChainDeal.askingPrice >= fakeChainDeal.configuredBuyRange.min);
  assert.ok(fakeChainDeal.askingPrice <= fakeChainDeal.configuredBuyRange.max);
});

test('v0.1.18 matching buyers can purchase ordinary categories and low liquidity stays sellable', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  const cases = [
    ['bargain_hunter_buys_dvds', 'dvd_stack'],
    ['bum_buys_cursed', 'microwave_haunted'],
    ['junkie_tablet_buy', 'cracked_tablet'],
    ['mechanic_buys_tools', 'cordless_drill'],
    ['red_hustler_buys_watch', 'suspicious_gold_watch'],
    ['hitman_buys_weapon', 'pocket_knife']
  ];

  cases.forEach(([poolId, itemId]) => {
    const inventoryItem = item(hooks, itemId, 10);
    hooks.state.inventory.push(inventoryItem);
    const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === poolId));
    const validation = hooks.evaluateSaleCompatibility(deal, inventoryItem);
    assert.equal(validation.valid, true, `${poolId} should buy ${itemId}: ${validation.reason}`);
  });
});

test('v0.1.18 buyer selection only chooses executable inventory matches', () => {
  const hooks = loadGame(0.55);
  resetState(hooks);
  hooks.state.inventory.push(item(hooks, 'dvd_stack', 4), item(hooks, 'microwave_haunted', 7));
  hooks.setActiveCustomers([
    activeTestCustomer(hooks, 'bum'),
    activeTestCustomer(hooks, 'bargain_hunter'),
    activeTestCustomer(hooks, 'hitman')
  ]);

  for (let i = 0; i < 8; i += 1) {
    const { normalSelection, deal } = hooks.chooseNextNormalDeal();
    if (normalSelection.diagnostics.selectedEncounterTypePool === 'buyer') {
      assert.equal(deal.dealType, 'buy_from_shop');
      assert.equal(deal.requestSatisfiable, true);
      assert.ok(deal.eligibleInventoryInstanceIds.length > 0);
    }
    hooks.rememberNormalEncounterType(deal);
  }
});

test('v0.1.18 forced recovery buyer uses broad-buyer pricing instead of automatic 0.40x punishment', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.lowCashRecoveryDryStreak = hooks.constants.LOW_CASH_RECOVERY.guaranteeDryStreak;
  const phone = item(hooks, 'used_smartphone', 120);
  hooks.state.inventory.push(phone);
  hooks.setActiveCustomers([activeTestCustomer(hooks, 'bum')]);

  const { deal } = hooks.chooseNextNormalDeal();
  hooks.applySelectedInventoryItemToDeal(deal, phone);

  assert.equal(deal.dealType, 'buy_from_shop');
  assert.ok(deal.saleQuote.customerAskMultiplier > 0.4);
  assert.ok(deal.salePrice >= Math.round(deal.saleQuote.marketAdjustedValue * 0.5));
});

test('v0.1.16 low-cash dry streak resets on revenue deal and cash gain', () => {
  const hooks = loadGame(0);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.lowCashRecoveryDryStreak = 2;
  const dvd = item(hooks, 'dvd_stack', 4);
  hooks.state.inventory.push(dvd);
  const revenueDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bargain_hunter_buys_dvds'));

  hooks.updateLowCashRecoveryDryStreak(revenueDeal);
  assert.equal(hooks.state.lowCashRecoveryDryStreak, 0);

  hooks.state.lowCashRecoveryDryStreak = 2;
  const nonRevenueDeal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  hooks.updateLowCashRecoveryDryStreak(nonRevenueDeal);
  assert.equal(hooks.state.lowCashRecoveryDryStreak, 3);

  hooks.applySelectedInventoryItemToDeal(revenueDeal, dvd);
  primeChoiceSmoke(hooks, revenueDeal);
  hooks.resolveChoice('sellTag');
  assert.ok(hooks.state.money > 0);
  assert.equal(hooks.state.lowCashRecoveryDryStreak, 0);
});

test('v0.1.16 consequence encounters do not extend low-cash recovery dry streak', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 0;
  hooks.state.lowCashRecoveryDryStreak = 2;
  hooks.state.inventory.push(item(hooks, 'dvd_stack', 4));
  hooks.state.factionPressure.tracksuit_crew = 5;
  const consequence = hooks.queueThugConsequence('test consequence does not count', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugItem', deal);

  assert.equal(hooks.state.lowCashRecoveryDryStreak, 2);
});

test('low-funds full-price purchase stays open without transfer', () => {
  const hooks = loadGame(0.5);
  resetState(hooks);
  hooks.state.money = 5;
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'slot_grandma_gold_ring'));
  const before = hooks.snapshotState();

  const result = hooks.resolveBuy('buyAsk', deal);

  assert.equal(deal.resolvedAction, undefined);
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.equal(result.keepEncounterOpen, true);
  assert.match(result.text, /register is short/);
});
