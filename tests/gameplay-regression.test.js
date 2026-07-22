const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');

function makeElement() {
  const element = {
    children: [],
    hidden: false,
    disabled: false,
    textContent: '',
    innerHTML: '',
    className: '',
    style: {},
    dataset: {},
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
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
    setAttribute(name, value) {
      this[name] = value;
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
  state.buybackCooldownDiagnostics = [];
  state.currentDeal = null;
  state.currentCustomer = null;
}

function item(hooks, id, cost = 20) {
  return hooks.createInventoryItem(hooks.getItem(id), cost, 'test_customer', '', 'Test fixture.');
}

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
  assert.ok(lines.some(line => line.includes(`Inventory: - Gold Ring`) && line.includes(sourceItem.instanceId)));
  assert.ok(lines.some(line => line.includes('Inventory: + Rare Action Figure, No Head') && line.includes(hooks.state.inventory[0].instanceId)));
  assert.ok(lines.some(line => line.includes('Trade Summary: gave Gold Ring')));
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

test('rejected lowball can keep original asking price and cannot be spammed', () => {
  const hooks = loadGame([0.5, 0.99, 0.1]);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'bum_microwave'));
  const ask = deal.askingPrice;

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballRejected, true);
  assert.equal(deal.askingPrice, ask);
  assert.match(result.text, /stays/);
  assert.match(hooks.resolveBuy('lowball', deal).text, /already dead/);
});

test('rejected lowball can raise the asking price for the encounter', () => {
  const hooks = loadGame([0.5, 0.99, 0.75, 0.5]);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'red_hustler_locked_watch'));
  const ask = deal.askingPrice;

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.lowballRejected, true);
  assert.ok(deal.askingPrice > ask);
  assert.equal(deal.defaultOffer, deal.askingPrice);
  assert.match(result.text, /now/);
});

test('insulted lowball walkout resolves without transferring cash or inventory', () => {
  const hooks = loadGame([0.5, 0.99, 0.99]);
  resetState(hooks);
  const deal = hooks.buildDeal(hooks.data.characterItemPools.find(entry => entry.id === 'hitman_prop_revolver'));
  const before = hooks.snapshotState();

  const result = hooks.resolveBuy('lowball', deal);

  assert.equal(deal.resolvedAction, 'lowball');
  assert.equal(deal.lowballOutcome, 'insulted');
  assert.equal(hooks.state.money, before.money);
  assert.equal(hooks.state.inventory.length, before.inventory.length);
  assert.match(result.text, /No deal/);
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
