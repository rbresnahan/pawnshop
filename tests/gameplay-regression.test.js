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
        value: () => randomValue
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
  state.normalCustomerHistory = [];
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

  const before = hooks.snapshotState();
  hooks.resolveTrade('tradeAccept', deal);
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

  hooks.resolveTrade('tradeCash', deal);

  assert.equal(hooks.state.inventory.length, 1);
  assert.equal(hooks.state.inventory[0].instanceId, sourceItem.instanceId);
  assert.equal(hooks.state.inventory[0].itemId, 'gold_ring_engravings');
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
