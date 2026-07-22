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
  const document = {
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
  const window = {
    ONE_STAR_PAWN_TEST_MODE: true,
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
  return window.ONE_STAR_PAWN_TEST_HOOKS;
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
  state.factionPressure = { tracksuit_crew: 0 };
  state.factionPressureSources = { tracksuit_crew: [] };
  state.normalEncountersSinceSpecial = 6;
  state.normalEncounterCount = 6;
  state.normalCustomerHistory = [];
  state.sellMissStreak = 0;
  state.unavailableSellRequestStreak = 0;
  state.unavailableSellRequestCount = 0;
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
  const result = hooks.resolveTrade('tradeCash', deal);
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
  hooks.resolveTrade('submitTradeOffer', deal);
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
  assert.equal(hooks.state.inventory.find(entry => entry.instanceId === existing.instanceId).condition, existing.condition);
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
  hooks.state.factionPressure.tracksuit_crew = 5;
  const watch = item(hooks, 'smart_watch_locked', 42);
  hooks.state.inventory.push(watch);
  const consequence = hooks.queueThugConsequence('test robbery', { debug: true });
  const deal = hooks.buildThugConsequenceDeal(consequence, hooks.getCharacter('tracksuit_thug'));

  hooks.resolveConsequenceChoice('thugItem', deal);

  assert.equal(hooks.state.inventory.some(entry => entry.instanceId === watch.instanceId), false);
  assert.equal(hooks.state.profit, -42);
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
  assert.equal(restored, 'Fresh deal context.');
  assert.equal(hooks.isDealPanelHidden(), false);
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
