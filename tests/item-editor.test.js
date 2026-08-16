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
    readonly: false,
    attributes: {},
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
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    getAttribute(name) {
      return this.attributes[name];
    },
    focus() {},
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
      },
      createTextNode(text) {
        return { textContent: text };
      }
    }
  };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'item-editor.js'), 'utf8'), context, { filename: 'item-editor.js' });
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
  if (headers.length) headers[0] = headers[0].replace(/^\uFEFF/, '');
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function fixtureFiles() {
  return {
    'Items.csv': [
      'item_id,name,category,default_condition,base_value,shop_buy_min,shop_buy_max,target_sell_price,heat,availability_tier,demand_level,price_variance,liquidity,tags,description',
      'sealed_mystery_box,Mystery Box,mystery,unknown,75,15,50,120,2,uncommon,normal,high,low,suspicious,Rattles like regret.',
      'cordless_drill,Cordless Drill,tool,used,65,20,40,90,0,common,high,low,high,repairable,Battery lasts fourteen seconds.'
    ].join('\n'),
    'Lists.csv': [
      'Condition,Item Category,Item Tag',
      'unknown,mystery,suspicious',
      'used,tool,repairable',
      'good,electronics,portable'
    ].join('\n')
  };
}

test('item editor displays the synchronized game build version', () => {
  const html = fs.readFileSync(path.join(ROOT, 'item-editor.html'), 'utf8');
  const mainJs = fs.readFileSync(path.join(ROOT, 'main.js'), 'utf8');
  const version = mainJs.match(/const GAME_VERSION = '([^']+)'/)?.[1];
  assert.equal(version, '0.1.53');
  assert.match(html, new RegExp(`id="editor-version"[^>]*>v${version}<`));
  assert.match(html, new RegExp(`item-editor\\.js\\?v=${version.replace(/\./g, '\\.')}`));
  assert.match(html, /CSV edits are source-only\. Regenerate gameData\.js before testing or shipping gameplay\./);
});

test('item editor renames an existing item without changing its durable item_id', async () => {
  const harness = makeEditorHarness(fixtureFiles());

  await harness.click('openFolder');
  assert.equal(harness.getElementById('itemId').value, 'sealed_mystery_box');
  await harness.input('name', 'Locked Safe');
  await harness.click('save');

  const savedItems = readCsvRows(harness.writes['Items.csv']);
  const edited = savedItems.find(row => row.item_id === 'sealed_mystery_box');
  assert.equal(edited.name, 'Locked Safe');
  assert.equal(edited.item_id, 'sealed_mystery_box');
  assert.equal(savedItems.some(row => row.item_id === 'locked_safe'), false);
  assert.match(harness.getElementById('status').textContent, /Saved/);
});

test('item editor creates a new item with a unique generated item_id and selected list values', async () => {
  const harness = makeEditorHarness(fixtureFiles());

  await harness.click('openFolder');
  await harness.click('newItem');
  await harness.input('name', 'Shoes');
  await harness.select('category', 'tool');
  await harness.select('defaultCondition', 'used');
  await harness.input('baseValue', '50');
  await harness.input('shopBuyMin', '15');
  await harness.input('shopBuyMax', '25');
  await harness.input('targetSellPrice', '65');
  await harness.input('heat', '0');
  await harness.input('tags', 'portable, repairable');
  await harness.input('description', 'A clean pair with normal pawn margins.');
  await harness.click('save');

  const savedItems = readCsvRows(harness.writes['Items.csv']);
  const shoes = savedItems.find(row => row.item_id === 'shoes');
  assert.ok(shoes);
  assert.equal(shoes.name, 'Shoes');
  assert.equal(shoes.category, 'tool');
  assert.equal(shoes.default_condition, 'used');
  assert.equal(shoes.base_value, '50');
  assert.equal(shoes.shop_buy_min, '15');
  assert.equal(shoes.shop_buy_max, '25');
  assert.equal(shoes.target_sell_price, '65');
  assert.equal(shoes.heat, '0');
  assert.equal(shoes.tags, 'portable, repairable');
  assert.equal(shoes.availability_tier, 'common');
  assert.equal(shoes.demand_level, 'high');
  assert.equal(shoes.price_variance, 'low');
  assert.equal(shoes.liquidity, 'high');
});
