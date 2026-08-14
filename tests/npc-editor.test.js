const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');

function makeElement(id = '') {
  const listeners = {};
  let innerHTML = '';
  const element = {
    id,
    children: [],
    disabled: false,
    hidden: false,
    value: '',
    textContent: '',
    className: '',
    type: '',
    checked: false,
    classList: {
      add() {},
      remove() {},
      contains() {
        return false;
      }
    },
    get innerHTML() {
      return innerHTML;
    },
    set innerHTML(value) {
      innerHTML = value;
      this.children = [];
    },
    append(...children) {
      this.children.push(...children);
    },
    addEventListener(type, handler) {
      if (!listeners[type]) listeners[type] = [];
      listeners[type].push(handler);
    },
    async dispatch(type = 'click') {
      const results = (listeners[type] || []).map(handler => handler({ target: this }));
      await Promise.all(results);
    }
  };
  return element;
}

function makeEditorHarness(files) {
  const elements = new Map();
  const getElementById = id => {
    if (!elements.has(id)) elements.set(id, makeElement(id));
    return elements.get(id);
  };
  const writes = {};
  const directoryHandle = {
    async getFileHandle(fileName) {
      return {
        async getFile() {
          return {
            async text() {
              return files[fileName];
            }
          };
        },
        async createWritable() {
          return {
            async write(text) {
              writes[fileName] = text;
            },
            async close() {}
          };
        }
      };
    }
  };
  const context = {
    console,
    window: {
      async showDirectoryPicker() {
        return directoryHandle;
      }
    },
    document: {
      getElementById,
      createElement(tagName) {
        return makeElement(tagName);
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'npc-editor.js'), 'utf8'), context, { filename: 'npc-editor.js' });
  return {
    elements,
    writes,
    getElementById,
    async click(id) {
      await getElementById(id).dispatch('click');
    },
    async input(id, value) {
      const element = getElementById(id);
      element.value = value;
      await element.dispatch('input');
    },
    async change(id, value) {
      const element = getElementById(id);
      element.checked = value;
      await element.dispatch('change');
    },
    async select(id, value) {
      const element = getElementById(id);
      element.value = value;
      await element.dispatch('change');
    }
  };
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        value += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ',') {
      row.push(value);
      value = '';
    } else if (char === '\n') {
      row.push(value.replace(/\r$/, ''));
      rows.push(row);
      row = [];
      value = '';
    } else {
      value += char;
    }
  }
  if (value.length || row.length) row.push(value.replace(/\r$/, ''));
  if (row.length) rows.push(row);
  return rows.filter(values => values.some(cell => cell !== ''));
}

function readCsvRows(text) {
  const [headers, ...rows] = parseCsv(text);
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

test('npc editor displays the synchronized game build version', () => {
  const html = fs.readFileSync(path.join(ROOT, 'npc-editor.html'), 'utf8');
  const mainJs = fs.readFileSync(path.join(ROOT, 'main.js'), 'utf8');
  const version = mainJs.match(/const GAME_VERSION = '([^']+)'/)?.[1];
  assert.equal(version, '0.1.49');
  assert.match(html, new RegExp(`id="editor-version"[^>]*>v${version}<`));
  assert.match(html, new RegExp(`npc-editor\\.js\\?v=${version.replace(/\./g, '\\.')}`));
  assert.match(html, /CSV edits are source-only\. Regenerate gameData\.js before testing or shipping gameplay\./);
});

test('npc editor bulk actions affect only the current deal section and visible filtered items', async () => {
  const files = {
    'Characters.csv': [
      'character_id,display_name',
      'npc-one,NPC One'
    ].join('\n'),
    'Character_Commerce_Traits.csv': [
      'character_id,sells_to_shop_weight,buys_from_shop_weight,trades_weight,buy_interest_tags,sell_offer_tags,trade_interest_tags,avoid_tags,max_markup_tolerance,lowball_tolerance,haggle_aggression,trade_fairness,risk_tolerance,prefers_cash,accepts_trades,accepts_junk_bundles,notes',
      'npc-one,1,1,1,jewelry,electronics,console,,1,1,1,1,1,True,True,False,test'
    ].join('\n'),
    'Character_Item_Pools.csv': [
      'pool_id,character_id,item_id,deal_type,item_role,requested_item_tags,offered_item_tags,chance_weight,ask_price_multiplier,cash_adjustment_min,cash_adjustment_max,condition_override,risk_note,notes',
      'buy_gold,npc-one,gold_ring,buy_from_shop,npc_requests,jewelry,,4,1,0,0,,low,existing buy',
      'sell_laptop,npc-one,laptop,sell_to_shop,npc_offers,,electronics,4,1,0,0,,low,existing sell',
      'trade_console,npc-one,game_console,trade,npc_offers,console,console,4,1,0,0,,low,existing trade'
    ].join('\n'),
    'Items.csv': [
      'item_id,name,category,tags',
      'gold_ring,Gold Ring,jewelry,luxury',
      'silver_ring,Silver Ring,jewelry,collectible',
      'laptop,Laptop,electronics,computer',
      'game_console,Game Console,console,electronics',
      'microwave,Microwave,appliance,junk'
    ].join('\n')
  };
  const harness = makeEditorHarness(files);

  await harness.click('openFolder');
  await harness.input('filterBuy', 'ring');
  await harness.click('selectAllBuy');

  assert.equal(harness.getElementById('save').disabled, false);
  assert.match(harness.getElementById('status').textContent, /Unsaved changes/);
  assert.equal(Object.keys(harness.writes).length, 0);

  await harness.click('deselectAllSell');
  await harness.change('toggleSell', false);
  await harness.click('save');

  const savedPools = harness.writes['Character_Item_Pools.csv'];
  assert.match(savedPools, /buy_gold,npc-one,gold_ring,buy_from_shop/);
  assert.match(savedPools, /npc_one_buys_silver_ring,npc-one,silver_ring,buy_from_shop/);
  assert.doesNotMatch(savedPools, /npc-one,laptop,buy_from_shop/);
  assert.doesNotMatch(savedPools, /sell_laptop,npc-one,laptop,sell_to_shop/);
  assert.match(savedPools, /trade_console,npc-one,game_console,trade/);
  assert.match(harness.getElementById('status').textContent, /Saved/);
});

test('npc editor save syncs current deal toggles before seller-only validation', async () => {
  const files = {
    'Characters.csv': [
      'character_id,display_name',
      'fixture_seller,Fixture Seller'
    ].join('\n'),
    'Character_Commerce_Traits.csv': [
      'character_id,sells_to_shop_weight,buys_from_shop_weight,trades_weight,buy_interest_tags,sell_offer_tags,trade_interest_tags,avoid_tags,max_markup_tolerance,lowball_tolerance,haggle_aggression,trade_fairness,risk_tolerance,prefers_cash,accepts_trades,accepts_junk_bundles,notes',
      'fixture_seller,5,3,2,electronics,electronics,electronics,,1,1,1,1,1,True,True,False,test'
    ].join('\n'),
    'Character_Item_Pools.csv': [
      'pool_id,character_id,item_id,deal_type,item_role,requested_item_tags,offered_item_tags,chance_weight,ask_price_multiplier,cash_adjustment_min,cash_adjustment_max,condition_override,risk_note,notes',
      'fixture_seller_vcr,fixture_seller,hospital_vcr,sell_to_shop,npc_offers,,electronics,7,0.7,0,0,,low,existing sell'
    ].join('\n'),
    'Items.csv': [
      'item_id,name,category,tags',
      'hospital_vcr,Hospital VCR,electronics,suspicious',
      'cracked_tablet,Cracked Tablet,electronics,broken'
    ].join('\n')
  };
  const harness = makeEditorHarness(files);

  await harness.click('openFolder');
  harness.getElementById('toggleBuy').checked = false;
  harness.getElementById('toggleSell').checked = true;
  harness.getElementById('toggleTrade').checked = false;
  await harness.click('save');

  assert.match(harness.getElementById('status').textContent, /Saved/);
  const savedTraits = readCsvRows(harness.writes['Character_Commerce_Traits.csv']);
  assert.equal(savedTraits[0].buys_from_shop_weight, '0');
  assert.equal(savedTraits[0].sells_to_shop_weight, '5');
  assert.equal(savedTraits[0].trades_weight, '0');
  assert.match(harness.writes['Character_Item_Pools.csv'], /fixture_seller_vcr,fixture_seller,hospital_vcr,sell_to_shop/);
});

test('npc editor validates the authoritative pending rows after switching NPCs', async () => {
  const files = {
    'Characters.csv': [
      'character_id,display_name',
      'street-crackhead,Crackhead',
      'fixture_seller,Fixture Seller'
    ].join('\n'),
    'Character_Commerce_Traits.csv': [
      'character_id,sells_to_shop_weight,buys_from_shop_weight,trades_weight,buy_interest_tags,sell_offer_tags,trade_interest_tags,avoid_tags,max_markup_tolerance,lowball_tolerance,haggle_aggression,trade_fairness,risk_tolerance,prefers_cash,accepts_trades,accepts_junk_bundles,notes',
      'street-crackhead,6,1,4,junk,junk,junk,,1,1,1,1,1,True,True,True,crackhead',
      'fixture_seller,5,1,2,electronics,electronics,electronics,,1,1,1,1,1,True,True,False,nervous'
    ].join('\n'),
    'Character_Item_Pools.csv': [
      'pool_id,character_id,item_id,deal_type,item_role,requested_item_tags,offered_item_tags,chance_weight,ask_price_multiplier,cash_adjustment_min,cash_adjustment_max,condition_override,risk_note,notes',
      'crackhead_sell,street-crackhead,fake_gold_chain,sell_to_shop,npc_offers,,jewelry,4,1,0,0,,low,sell',
      'crackhead_buy,street-crackhead,dvd_stack,buy_from_shop,npc_requests,junk,,4,1,0,0,,low,buy',
      'crackhead_trade,street-crackhead,sealed_mystery_box,trade,npc_offers,junk,mystery,4,1,0,0,,low,trade',
      'fixture_seller_vcr,fixture_seller,hospital_vcr,sell_to_shop,npc_offers,,electronics,7,0.7,0,0,,low,existing sell'
    ].join('\n'),
    'Items.csv': [
      'item_id,name,category,tags',
      'fake_gold_chain,Fake Gold Chain,jewelry,fake',
      'dvd_stack,DVD Stack,collectible,junk',
      'sealed_mystery_box,Sealed Mystery Box,mystery,suspicious',
      'hospital_vcr,Hospital VCR,electronics,suspicious'
    ].join('\n')
  };
  const harness = makeEditorHarness(files);

  await harness.click('openFolder');
  await harness.select('npcSelect', 'fixture_seller');
  await harness.change('toggleBuy', false);
  await harness.change('toggleSell', true);
  await harness.change('toggleTrade', false);
  await harness.select('npcSelect', 'street-crackhead');
  await harness.select('npcSelect', 'fixture_seller');
  await harness.click('save');

  assert.match(harness.getElementById('status').textContent, /Saved/);
  const savedTraits = readCsvRows(harness.writes['Character_Commerce_Traits.csv']);
  const nervous = savedTraits.find(row => row.character_id === 'fixture_seller');
  assert.equal(nervous.buys_from_shop_weight, '0');
  assert.equal(nervous.sells_to_shop_weight, '5');
  assert.equal(nervous.trades_weight, '0');
  assert.match(harness.writes['Character_Commerce_Traits.csv'], /fixture_seller,5,0,0,/);
});

test('npc editor real roster excludes unimplemented NPC ids', async () => {
  const tablesDir = path.join(ROOT, 'one_star_pawn_tables');
  const files = {
    'Characters.csv': fs.readFileSync(path.join(tablesDir, 'Characters.csv'), 'utf8'),
    'Character_Commerce_Traits.csv': fs.readFileSync(path.join(tablesDir, 'Character_Commerce_Traits.csv'), 'utf8'),
    'Character_Item_Pools.csv': fs.readFileSync(path.join(tablesDir, 'Character_Item_Pools.csv'), 'utf8'),
    'Items.csv': fs.readFileSync(path.join(tablesDir, 'Items.csv'), 'utf8')
  };
  const harness = makeEditorHarness(files);

  await harness.click('openFolder');

  const removedIds = new Set([
    'desperate_regular',
    'nervous_seller',
    'collector',
    'mechanic',
    'street_fence',
    'bargain_hunter',
    'undercover_cop',
    'angry_returner',
    'mystery_weirdo',
    'purple_customer'
  ]);
  const renderedIds = harness.getElementById('npcSelect').children.map(option => option.value);

  assert.equal(renderedIds.length, 32);
  assert.equal(renderedIds.includes('street-crackhead'), true);
  assert.equal(renderedIds.includes('tracksuit-thug-vincent'), true);
  assert.equal(renderedIds.includes('cop_consequence'), true);
  removedIds.forEach(id => {
    assert.equal(renderedIds.includes(id), false, `${id} should not appear in the editor roster`);
  });
});

test('npc editor does not block the edited NPC on unrelated pre-existing pool gaps', async () => {
  const files = {
    'Characters.csv': [
      'character_id,display_name',
      'street-crackhead,Crackhead',
      'fixture_seller,Fixture Seller'
    ].join('\n'),
    'Character_Commerce_Traits.csv': [
      'character_id,sells_to_shop_weight,buys_from_shop_weight,trades_weight,buy_interest_tags,sell_offer_tags,trade_interest_tags,avoid_tags,max_markup_tolerance,lowball_tolerance,haggle_aggression,trade_fairness,risk_tolerance,prefers_cash,accepts_trades,accepts_junk_bundles,notes',
      'street-crackhead,6,1,4,junk,junk,junk,,1,1,1,1,1,True,True,True,crackhead',
      'fixture_seller,5,1,2,electronics,electronics,electronics,,1,1,1,1,1,True,True,False,nervous'
    ].join('\n'),
    'Character_Item_Pools.csv': [
      'pool_id,character_id,item_id,deal_type,item_role,requested_item_tags,offered_item_tags,chance_weight,ask_price_multiplier,cash_adjustment_min,cash_adjustment_max,condition_override,risk_note,notes',
      'crackhead_sell,street-crackhead,fake_gold_chain,sell_to_shop,npc_offers,,jewelry,4,1,0,0,,low,sell',
      'crackhead_buy,street-crackhead,dvd_stack,buy_from_shop,npc_requests,junk,,4,1,0,0,,low,buy',
      'crackhead_trade,street-crackhead,sealed_mystery_box,trade,npc_offers,junk,mystery,4,1,0,0,,low,trade',
      'fixture_seller_vcr,fixture_seller,hospital_vcr,sell_to_shop,npc_offers,,electronics,7,0.7,0,0,,low,existing sell'
    ].join('\n'),
    'Items.csv': [
      'item_id,name,category,tags',
      'fake_gold_chain,Fake Gold Chain,jewelry,fake',
      'dvd_stack,DVD Stack,collectible,junk',
      'sealed_mystery_box,Sealed Mystery Box,mystery,suspicious',
      'hospital_vcr,Hospital VCR,electronics,suspicious'
    ].join('\n')
  };
  const harness = makeEditorHarness(files);

  await harness.click('openFolder');
  await harness.change('toggleBuy', false);
  await harness.change('toggleTrade', false);
  await harness.click('save');

  assert.match(harness.getElementById('status').textContent, /Saved/);
  const savedTraits = readCsvRows(harness.writes['Character_Commerce_Traits.csv']);
  const crackhead = savedTraits.find(row => row.character_id === 'street-crackhead');
  const nervous = savedTraits.find(row => row.character_id === 'fixture_seller');
  assert.equal(crackhead.buys_from_shop_weight, '0');
  assert.equal(crackhead.trades_weight, '0');
  assert.equal(nervous.buys_from_shop_weight, '1');
});

test('npc editor restores remembered positive weights and syncs Sell and Trade disabled states', async () => {
  const files = {
    'Characters.csv': [
      'character_id,display_name',
      'multi_npc,Multi NPC'
    ].join('\n'),
    'Character_Commerce_Traits.csv': [
      'character_id,sells_to_shop_weight,buys_from_shop_weight,trades_weight,buy_interest_tags,sell_offer_tags,trade_interest_tags,avoid_tags,max_markup_tolerance,lowball_tolerance,haggle_aggression,trade_fairness,risk_tolerance,prefers_cash,accepts_trades,accepts_junk_bundles,notes',
      'multi_npc,4,6,5,electronics,electronics,electronics,,1,1,1,1,1,True,True,False,test'
    ].join('\n'),
    'Character_Item_Pools.csv': [
      'pool_id,character_id,item_id,deal_type,item_role,requested_item_tags,offered_item_tags,chance_weight,ask_price_multiplier,cash_adjustment_min,cash_adjustment_max,condition_override,risk_note,notes',
      'multi_buy,multi_npc,cracked_tablet,buy_from_shop,npc_requests,electronics,,4,1,0,0,,low,buy',
      'multi_sell,multi_npc,hospital_vcr,sell_to_shop,npc_offers,,electronics,4,1,0,0,,low,sell',
      'multi_trade,multi_npc,game_console,trade,npc_offers,electronics,console,4,1,0,0,,low,trade'
    ].join('\n'),
    'Items.csv': [
      'item_id,name,category,tags',
      'hospital_vcr,Hospital VCR,electronics,suspicious',
      'cracked_tablet,Cracked Tablet,electronics,broken',
      'game_console,Game Console,console,electronics'
    ].join('\n')
  };
  const harness = makeEditorHarness(files);

  await harness.click('openFolder');
  await harness.change('toggleBuy', false);
  await harness.change('toggleBuy', true);
  harness.getElementById('toggleSell').checked = false;
  harness.getElementById('toggleTrade').checked = false;
  await harness.click('save');

  const savedTraits = readCsvRows(harness.writes['Character_Commerce_Traits.csv']);
  assert.equal(savedTraits[0].buys_from_shop_weight, '6');
  assert.equal(savedTraits[0].sells_to_shop_weight, '0');
  assert.equal(savedTraits[0].trades_weight, '0');
  assert.match(harness.getElementById('status').textContent, /Saved/);
});
