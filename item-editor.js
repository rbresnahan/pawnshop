(function () {
  'use strict';

  const REQUIRED_FILES = ['Items.csv', 'Lists.csv'];
  const EDITABLE_FIELDS = [
    'item_id',
    'name',
    'category',
    'default_condition',
    'base_value',
    'shop_buy_min',
    'shop_buy_max',
    'target_sell_price',
    'heat',
    'tags',
    'description'
  ];
  const GENERATOR_REQUIRED_DEFAULTS = {
    availability_tier: 'common',
    demand_level: 'normal',
    price_variance: 'medium',
    liquidity: 'medium'
  };

  const els = {
    openFolder: document.getElementById('openFolder'),
    save: document.getElementById('save'),
    reload: document.getElementById('reload'),
    status: document.getElementById('status'),
    itemSearch: document.getElementById('itemSearch'),
    newItem: document.getElementById('newItem'),
    itemList: document.getElementById('itemList'),
    formTitle: document.getElementById('formTitle'),
    itemForm: document.getElementById('itemForm'),
    itemId: document.getElementById('itemId'),
    name: document.getElementById('name'),
    category: document.getElementById('category'),
    defaultCondition: document.getElementById('defaultCondition'),
    baseValue: document.getElementById('baseValue'),
    shopBuyMin: document.getElementById('shopBuyMin'),
    shopBuyMax: document.getElementById('shopBuyMax'),
    targetSellPrice: document.getElementById('targetSellPrice'),
    heat: document.getElementById('heat'),
    tagChoices: document.getElementById('tagChoices'),
    tags: document.getElementById('tags'),
    description: document.getElementById('description')
  };

  const fields = [
    els.name,
    els.category,
    els.defaultCondition,
    els.baseValue,
    els.shopBuyMin,
    els.shopBuyMax,
    els.targetSellPrice,
    els.heat,
    els.tags,
    els.description
  ];

  const state = {
    directoryHandle: null,
    files: new Map(),
    items: [],
    lists: [],
    selectedItemId: '',
    isNewItem: false,
    dirty: false
  };

  function setStatus(message, kind = '') {
    els.status.textContent = message;
    els.status.className = `status${kind ? ` ${kind}` : ''}`;
  }

  function markDirty() {
    if (!state.selectedItemId && !state.isNewItem) return;
    state.dirty = true;
    els.save.disabled = false;
    setStatus('Unsaved changes', 'dirty');
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
        continue;
      }

      if (char === '"') {
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

    if (value.length || row.length) {
      row.push(value.replace(/\r$/, ''));
      rows.push(row);
    }

    if (inQuotes) throw new Error('Malformed CSV: unclosed quoted field');
    return rows.filter(values => values.some(cell => cell !== ''));
  }

  function tableFromText(fileName, text) {
    const rows = parseCsv(text);
    if (!rows.length) throw new Error(`${fileName} is empty`);
    const headers = rows[0].slice();
    if (headers.length) headers[0] = headers[0].replace(/^\uFEFF/, '');
    return {
      fileName,
      headers,
      rows: rows.slice(1).map(values => {
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] ?? '';
        });
        return row;
      })
    };
  }

  function escapeCsvValue(value) {
    const text = String(value ?? '');
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  }

  function tableToText(table) {
    const lines = [
      table.headers.map(escapeCsvValue).join(','),
      ...table.rows.map(row => table.headers.map(header => escapeCsvValue(row[header])).join(','))
    ];
    return `${lines.join('\n')}\n`;
  }

  function normalizeList(value) {
    return String(value || '')
      .split(',')
      .map(entry => entry.trim())
      .filter(Boolean);
  }

  function unique(values) {
    return values.filter((value, index) => value && values.indexOf(value) === index);
  }

  function safeId(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'item';
  }

  function uniqueItemId(name, ignoredRow = null) {
    const existing = new Set(state.items
      .filter(row => row !== ignoredRow)
      .map(row => row.item_id)
      .filter(Boolean));
    const base = safeId(name);
    if (!existing.has(base)) return base;
    let index = 2;
    while (existing.has(`${base}_${index}`)) index += 1;
    return `${base}_${index}`;
  }

  function getListValues(column) {
    return unique(state.lists.map(row => row[column]).filter(Boolean));
  }

  function getCategoryValues() {
    return unique([...getListValues('Item Category'), ...state.items.map(row => row.category).filter(Boolean)]);
  }

  function getConditionValues() {
    return unique([...getListValues('Condition'), ...state.items.map(row => row.default_condition).filter(Boolean)]);
  }

  function getSelectedItem() {
    return state.items.find(row => row.item_id === state.selectedItemId) || null;
  }

  function setFormEnabled(enabled) {
    fields.forEach(field => {
      field.disabled = !enabled;
    });
    els.itemId.disabled = !enabled;
  }

  function fillSelect(select, values) {
    select.innerHTML = '';
    values.forEach(value => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
  }

  function renderTagChoices() {
    els.tagChoices.innerHTML = '';
    const selectedTags = new Set(normalizeList(els.tags.value));
    getListValues('Item Tag').forEach(tag => {
      const label = document.createElement('label');
      label.className = 'tag-option';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = tag;
      checkbox.checked = selectedTags.has(tag);
      checkbox.disabled = els.tags.disabled;
      checkbox.addEventListener('change', () => {
        const typedTags = normalizeList(els.tags.value);
        const nextTags = checkbox.checked
          ? unique([...typedTags, tag])
          : typedTags.filter(value => value !== tag);
        els.tags.value = nextTags.join(', ');
        markDirty();
        renderTagChoices();
      });
      label.append(checkbox, document.createTextNode(tag));
      els.tagChoices.append(label);
    });
  }

  function populateForm(row) {
    if (!row) {
      els.formTitle.textContent = 'No item loaded';
      [els.itemId, ...fields].forEach(field => {
        field.value = '';
      });
      setFormEnabled(false);
      renderTagChoices();
      return;
    }

    setFormEnabled(true);
    els.formTitle.textContent = state.isNewItem ? 'New Item' : (row.name || row.item_id);
    els.itemId.value = row.item_id || '';
    els.name.value = row.name || '';
    els.category.value = row.category || '';
    els.defaultCondition.value = row.default_condition || '';
    els.baseValue.value = row.base_value || '';
    els.shopBuyMin.value = row.shop_buy_min || '';
    els.shopBuyMax.value = row.shop_buy_max || '';
    els.targetSellPrice.value = row.target_sell_price || '';
    els.heat.value = row.heat || '';
    els.tags.value = row.tags || '';
    els.description.value = row.description || '';
    renderTagChoices();
  }

  function applyFormToRow(row) {
    row.item_id = els.itemId.value.trim();
    row.name = els.name.value.trim();
    row.category = els.category.value.trim();
    row.default_condition = els.defaultCondition.value.trim();
    row.base_value = els.baseValue.value.trim();
    row.shop_buy_min = els.shopBuyMin.value.trim();
    row.shop_buy_max = els.shopBuyMax.value.trim();
    row.target_sell_price = els.targetSellPrice.value.trim();
    row.heat = els.heat.value.trim();
    row.tags = normalizeList(els.tags.value).join(', ');
    row.description = els.description.value.trim();
  }

  function applyCategoryTemplate(row) {
    const template = state.items.find(item => item !== row && item.category === els.category.value);
    if (!template) return;
    Object.keys(GENERATOR_REQUIRED_DEFAULTS).forEach(field => {
      if (state.files.get('Items.csv').headers.includes(field)) row[field] = template[field] || GENERATOR_REQUIRED_DEFAULTS[field];
    });
  }

  function createItemTemplate() {
    const sameCategory = state.items.find(row => row.category === els.category.value);
    const template = sameCategory || state.items[0] || {};
    const row = {};
    const itemsTable = state.files.get('Items.csv');
    itemsTable.headers.forEach(header => {
      row[header] = template[header] || GENERATOR_REQUIRED_DEFAULTS[header] || '';
    });
    row.item_id = uniqueItemId(els.name.value || 'new_item');
    row.name = '';
    row.category = getCategoryValues()[0] || template.category || '';
    row.default_condition = getConditionValues()[0] || template.default_condition || '';
    row.base_value = '';
    row.shop_buy_min = '';
    row.shop_buy_max = '';
    row.target_sell_price = '';
    row.heat = '0';
    row.tags = '';
    row.description = '';
    return row;
  }

  function itemMatchesFilter(item, filterText) {
    if (!filterText) return true;
    const haystack = `${item.name} ${item.item_id} ${item.category} ${item.tags}`.toLowerCase();
    return haystack.includes(filterText.toLowerCase());
  }

  function renderItemList() {
    els.itemList.innerHTML = '';
    const filterText = els.itemSearch.value.trim();
    const visibleItems = state.items.filter(item => itemMatchesFilter(item, filterText));
    if (!visibleItems.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = state.items.length ? 'No matching items.' : 'No items loaded.';
      els.itemList.append(empty);
      return;
    }

    visibleItems.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'item-row';
      button.setAttribute?.('aria-current', item.item_id === state.selectedItemId ? 'true' : 'false');
      const name = document.createElement('span');
      name.className = 'item-name';
      name.textContent = item.name || item.item_id;
      const id = document.createElement('span');
      id.className = 'item-id';
      id.textContent = `${item.item_id}${item.category ? ` - ${item.category}` : ''}`;
      button.append(name, id);
      button.addEventListener('click', () => selectItem(item.item_id));
      els.itemList.append(button);
    });
  }

  function render() {
    fillSelect(els.category, getCategoryValues());
    fillSelect(els.defaultCondition, getConditionValues());
    renderItemList();
    populateForm(getSelectedItem());
  }

  function selectItem(itemId) {
    syncCurrentForm();
    state.selectedItemId = itemId;
    state.isNewItem = false;
    render();
  }

  function startNewItem() {
    const row = createItemTemplate();
    state.items.push(row);
    state.selectedItemId = row.item_id;
    state.isNewItem = true;
    render();
    els.name.focus?.();
    markDirty();
  }

  function validateRequiredColumns(table, columns) {
    const missing = columns.filter(column => !table.headers.includes(column));
    if (missing.length) throw new Error(`${table.fileName} is missing columns: ${missing.join(', ')}`);
  }

  function validateLoadedTables() {
    validateRequiredColumns(state.files.get('Items.csv'), EDITABLE_FIELDS);
    validateRequiredColumns(state.files.get('Lists.csv'), ['Condition', 'Item Category', 'Item Tag']);
  }

  function syncCurrentForm() {
    const row = getSelectedItem();
    if (row) {
      const previousId = row.item_id;
      applyFormToRow(row);
      if (state.isNewItem) {
        row.item_id = uniqueItemId(row.name || row.item_id, row);
        state.selectedItemId = row.item_id;
        els.itemId.value = row.item_id;
      } else {
        row.item_id = previousId;
        els.itemId.value = previousId;
      }
    }
  }

  function validateBeforeSave() {
    syncCurrentForm();

    const itemIds = new Set();
    const errors = [];
    state.items.forEach((item, index) => {
      const label = `Items.csv row ${index + 2}${item.item_id ? ` (${item.item_id})` : ''}`;
      EDITABLE_FIELDS.forEach(field => {
        if (field !== 'tags' && !String(item[field] ?? '').trim()) errors.push(`${label}: missing ${field}`);
      });
      ['base_value', 'shop_buy_min', 'shop_buy_max', 'target_sell_price', 'heat'].forEach(field => {
        if (String(item[field] ?? '').trim() && !Number.isFinite(Number(item[field]))) {
          errors.push(`${label}: ${field} must be numeric`);
        }
      });
      Object.keys(GENERATOR_REQUIRED_DEFAULTS).forEach(field => {
        if (state.files.get('Items.csv').headers.includes(field) && !String(item[field] ?? '').trim()) {
          item[field] = GENERATOR_REQUIRED_DEFAULTS[field];
        }
      });
      if (item.item_id) {
        if (itemIds.has(item.item_id)) errors.push(`Items.csv: duplicate item_id ${item.item_id}`);
        itemIds.add(item.item_id);
      }
    });

    try {
      parseCsv(tableToText(state.files.get('Items.csv')));
    } catch (error) {
      errors.push(`Items.csv could not be serialized: ${error.message}`);
    }

    return errors;
  }

  async function readFileFromDirectory(fileName) {
    const handle = await state.directoryHandle.getFileHandle(fileName);
    const file = await handle.getFile();
    return file.text();
  }

  async function loadTables() {
    state.files.clear();
    for (const fileName of REQUIRED_FILES) {
      const text = await readFileFromDirectory(fileName);
      state.files.set(fileName, tableFromText(fileName, text));
    }
    validateLoadedTables();
    state.items = state.files.get('Items.csv').rows;
    state.lists = state.files.get('Lists.csv').rows;
    state.selectedItemId = state.items[0]?.item_id || '';
    state.isNewItem = false;
    state.dirty = false;
    els.save.disabled = true;
    els.reload.disabled = false;
    els.itemSearch.disabled = false;
    els.newItem.disabled = false;
    render();
    setStatus(`Loaded ${state.items.length} items.`, 'saved');
  }

  async function openFolder() {
    if (!window.showDirectoryPicker) {
      setStatus('This editor needs a browser with the File System Access API.', 'error');
      return;
    }
    try {
      state.directoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
      await loadTables();
    } catch (error) {
      if (error.name === 'AbortError') return;
      setStatus(`Could not open folder: ${error.message}`, 'error');
    }
  }

  async function saveTables() {
    try {
      const errors = validateBeforeSave();
      if (errors.length) {
        setStatus(`Could not save: ${errors[0]}`, 'error');
        return;
      }

      state.files.get('Items.csv').rows = state.items;
      const handle = await state.directoryHandle.getFileHandle('Items.csv');
      const writable = await handle.createWritable();
      await writable.write(tableToText(state.files.get('Items.csv')));
      await writable.close();

      state.isNewItem = false;
      state.dirty = false;
      els.save.disabled = true;
      render();
      setStatus('Saved. Regenerate gameData.js with the existing script.', 'saved');
    } catch (error) {
      setStatus(`Could not save: ${error.message}`, 'error');
    }
  }

  els.openFolder.addEventListener('click', openFolder);
  els.save.addEventListener('click', saveTables);
  els.reload.addEventListener('click', loadTables);
  els.itemSearch.addEventListener('input', renderItemList);
  els.newItem.addEventListener('click', startNewItem);
  fields.forEach(field => field.addEventListener('input', () => {
    if (state.isNewItem && field === els.name) {
      const row = getSelectedItem();
      els.itemId.value = uniqueItemId(els.name.value, row);
      if (row) {
        row.item_id = els.itemId.value;
        state.selectedItemId = els.itemId.value;
      }
    }
    markDirty();
    if (field === els.tags) renderTagChoices();
  }));
  els.category.addEventListener('change', () => {
    const row = getSelectedItem();
    if (state.isNewItem && row) applyCategoryTemplate(row);
    markDirty();
  });
  els.defaultCondition.addEventListener('change', markDirty);
}());
