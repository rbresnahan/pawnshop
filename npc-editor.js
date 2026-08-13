(function () {
  'use strict';

  const REQUIRED_FILES = [
    'Characters.csv',
    'Character_Commerce_Traits.csv',
    'Character_Item_Pools.csv',
    'Items.csv'
  ];

  const DEALS = {
    buy: {
      label: 'Buy',
      dealType: 'buy_from_shop',
      weightColumn: 'buys_from_shop_weight',
      itemRole: 'npc_requests',
      tagsColumn: 'requested_item_tags',
      panelId: 'panelBuy',
      listId: 'listBuy',
      filterId: 'filterBuy',
      toggleId: 'toggleBuy',
      selectAllId: 'selectAllBuy',
      deselectAllId: 'deselectAllBuy'
    },
    sell: {
      label: 'Sell',
      dealType: 'sell_to_shop',
      weightColumn: 'sells_to_shop_weight',
      itemRole: 'npc_offers',
      tagsColumn: 'offered_item_tags',
      panelId: 'panelSell',
      listId: 'listSell',
      filterId: 'filterSell',
      toggleId: 'toggleSell',
      selectAllId: 'selectAllSell',
      deselectAllId: 'deselectAllSell'
    },
    trade: {
      label: 'Trade',
      dealType: 'trade',
      weightColumn: 'trades_weight',
      itemRole: 'npc_offers',
      tagsColumn: 'offered_item_tags',
      panelId: 'panelTrade',
      listId: 'listTrade',
      filterId: 'filterTrade',
      toggleId: 'toggleTrade',
      selectAllId: 'selectAllTrade',
      deselectAllId: 'deselectAllTrade'
    }
  };

  const els = {
    openFolder: document.getElementById('openFolder'),
    save: document.getElementById('save'),
    reload: document.getElementById('reload'),
    status: document.getElementById('status'),
    npcSelect: document.getElementById('npcSelect'),
    npcName: document.getElementById('npcName'),
    npcId: document.getElementById('npcId')
  };

  Object.values(DEALS).forEach(deal => {
    deal.panel = document.getElementById(deal.panelId);
    deal.list = document.getElementById(deal.listId);
    deal.filter = document.getElementById(deal.filterId);
    deal.toggle = document.getElementById(deal.toggleId);
    deal.selectAll = document.getElementById(deal.selectAllId);
    deal.deselectAll = document.getElementById(deal.deselectAllId);
  });

  const state = {
    directoryHandle: null,
    files: new Map(),
    characters: [],
    traits: [],
    pools: [],
    items: [],
    lastPositiveWeights: new Map(),
    editedCharacterIds: new Set(),
    selectedCharacterId: '',
    dirty: false
  };

  function setStatus(message, kind = '') {
    els.status.textContent = message;
    els.status.className = `status${kind ? ` ${kind}` : ''}`;
  }

  function markDirty() {
    state.dirty = true;
    els.save.disabled = false;
    setStatus('Unsaved changes', 'dirty');
  }

  function markCharacterEdited(characterId = state.selectedCharacterId) {
    if (characterId) state.editedCharacterIds.add(characterId);
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

  function normalizeTags(value) {
    return String(value || '')
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);
  }

  function itemTags(item) {
    return [item.category, ...normalizeTags(item.tags)]
      .filter(Boolean)
      .filter((tag, index, tags) => tags.indexOf(tag) === index)
      .join(', ');
  }

  function isEnabled(traitsRow, deal) {
    return Number(traitsRow?.[deal.weightColumn] || 0) > 0;
  }

  function getSelectedCharacter() {
    return state.characters.find(row => row.character_id === state.selectedCharacterId) || null;
  }

  function getTraitsRow(characterId = state.selectedCharacterId) {
    return state.traits.find(row => row.character_id === characterId) || null;
  }

  function getPools(characterId, dealType) {
    return state.pools.filter(row => row.character_id === characterId && row.deal_type === dealType);
  }

  function hasPool(characterId, dealType, itemId) {
    return getPools(characterId, dealType).some(row => row.item_id === itemId);
  }

  function weightMemoryKey(characterId, deal) {
    return `${characterId}:${deal.weightColumn}`;
  }

  function rememberPositiveWeight(traitsRow, deal) {
    const weight = Number(traitsRow?.[deal.weightColumn] || 0);
    if (weight > 0) {
      state.lastPositiveWeights.set(weightMemoryKey(traitsRow.character_id, deal), String(traitsRow[deal.weightColumn]));
    }
  }

  function initializePositiveWeightMemory() {
    state.lastPositiveWeights.clear();
    state.traits.forEach(row => {
      Object.values(DEALS).forEach(deal => rememberPositiveWeight(row, deal));
    });
  }

  function getDefaultWeight(deal, traitsRow) {
    const current = Number(traitsRow?.[deal.weightColumn] || 0);
    if (current > 0) return String(current);
    const remembered = state.lastPositiveWeights.get(weightMemoryKey(traitsRow.character_id, deal));
    if (Number(remembered) > 0) return remembered;
    const sameDealWeights = state.traits
      .map(row => Number(row[deal.weightColumn] || 0))
      .filter(weight => weight > 0);
    return String(sameDealWeights[0] || 1);
  }

  function safeId(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'row';
  }

  function uniquePoolId(characterId, dealType, itemId) {
    const suffix = dealType === 'buy_from_shop' ? 'buys' : dealType === 'sell_to_shop' ? 'sells' : 'trades';
    const base = `${safeId(characterId)}_${suffix}_${safeId(itemId)}`;
    const existing = new Set(state.pools.map(row => row.pool_id));
    if (!existing.has(base)) return base;
    let index = 2;
    while (existing.has(`${base}_${index}`)) index += 1;
    return `${base}_${index}`;
  }

  function templatePool(deal) {
    return state.pools.find(row => row.character_id === state.selectedCharacterId && row.deal_type === deal.dealType) ||
      state.pools.find(row => row.deal_type === deal.dealType) ||
      null;
  }

  function createPoolRow(deal, item) {
    const template = templatePool(deal);
    const row = {};
    const poolsTable = state.files.get('Character_Item_Pools.csv');
    poolsTable.headers.forEach(header => {
      row[header] = template ? template[header] || '' : '';
    });
    row.pool_id = uniquePoolId(state.selectedCharacterId, deal.dealType, item.item_id);
    row.character_id = state.selectedCharacterId;
    row.item_id = item.item_id;
    row.deal_type = deal.dealType;
    row.item_role = deal.itemRole;
    row.chance_weight = row.chance_weight || '4';
    row.ask_price_multiplier = row.ask_price_multiplier || '1';
    row.cash_adjustment_min = row.cash_adjustment_min || '0';
    row.cash_adjustment_max = row.cash_adjustment_max || '0';
    row[deal.tagsColumn] = itemTags(item);
    if (deal.dealType === 'trade' && !row.requested_item_tags) {
      const traitsRow = getTraitsRow();
      row.requested_item_tags = traitsRow?.trade_interest_tags || traitsRow?.buy_interest_tags || itemTags(item);
    }
    row.risk_note = row.risk_note || 'Editor-added pool';
    row.notes = row.notes || `Added by NPC commerce editor for ${item.name}.`;
    return row;
  }

  function setDealEnabled(deal, enabled) {
    const traitsRow = getTraitsRow();
    if (!traitsRow) return;
    rememberPositiveWeight(traitsRow, deal);
    traitsRow[deal.weightColumn] = enabled ? getDefaultWeight(deal, traitsRow) : '0';
    markCharacterEdited();
    markDirty();
    render();
  }

  function applyCurrentDealToggleState(characterId = state.selectedCharacterId) {
    const traitsRow = getTraitsRow(characterId);
    if (!traitsRow) return;
    let changed = false;
    Object.values(DEALS).forEach(deal => {
      rememberPositiveWeight(traitsRow, deal);
      const nextWeight = deal.toggle.checked ? getDefaultWeight(deal, traitsRow) : '0';
      if (String(traitsRow[deal.weightColumn] ?? '') !== nextWeight) {
        traitsRow[deal.weightColumn] = nextWeight;
        changed = true;
      }
    });
    if (changed) markCharacterEdited(characterId);
  }

  function setPoolSelection(deal, item, checked) {
    if (checked) {
      if (!hasPool(state.selectedCharacterId, deal.dealType, item.item_id)) {
        state.pools.push(createPoolRow(deal, item));
      }
    } else {
      state.pools = state.pools.filter(row =>
        !(row.character_id === state.selectedCharacterId && row.deal_type === deal.dealType && row.item_id === item.item_id)
      );
      state.files.get('Character_Item_Pools.csv').rows = state.pools;
    }
    markCharacterEdited();
    markDirty();
    renderLists();
  }

  function getVisibleItems(deal) {
    const filterText = deal.filter.value.trim();
    return state.items.filter(item => itemMatchesFilter(item, filterText));
  }

  function setBulkPoolSelection(deal, checked) {
    const visibleItems = getVisibleItems(deal);
    let changed = false;
    if (checked) {
      visibleItems.forEach(item => {
        if (!hasPool(state.selectedCharacterId, deal.dealType, item.item_id)) {
          state.pools.push(createPoolRow(deal, item));
          changed = true;
        }
      });
    } else {
      const visibleItemIds = new Set(visibleItems.map(item => item.item_id));
      const nextPools = state.pools.filter(row => {
        const remove = row.character_id === state.selectedCharacterId &&
          row.deal_type === deal.dealType &&
          visibleItemIds.has(row.item_id);
        if (remove) changed = true;
        return !remove;
      });
      if (changed) {
        state.pools = nextPools;
        state.files.get('Character_Item_Pools.csv').rows = state.pools;
      }
    }
    if (!changed) return;
    markCharacterEdited();
    markDirty();
    renderLists();
  }

  function renderNpcSelect() {
    els.npcSelect.innerHTML = '';
    state.characters.forEach(character => {
      const option = document.createElement('option');
      option.value = character.character_id;
      option.textContent = `${character.display_name || character.character_id} (${character.character_id})`;
      els.npcSelect.append(option);
    });
    els.npcSelect.disabled = state.characters.length === 0;
    if (!state.selectedCharacterId && state.characters.length) {
      state.selectedCharacterId = state.characters[0].character_id;
    }
    els.npcSelect.value = state.selectedCharacterId;
  }

  function renderNpcMeta() {
    const character = getSelectedCharacter();
    els.npcName.textContent = character ? character.display_name || character.character_id : 'No NPC selected';
    els.npcId.textContent = character ? `ID: ${character.character_id}` : '';
  }

  function itemMatchesFilter(item, filterText) {
    if (!filterText) return true;
    const haystack = `${item.name} ${item.item_id} ${item.category} ${item.tags}`.toLowerCase();
    return haystack.includes(filterText.toLowerCase());
  }

  function renderList(key) {
    const deal = DEALS[key];
    const traitsRow = getTraitsRow();
    const enabled = isEnabled(traitsRow, deal);
    deal.panel.hidden = !enabled;
    deal.filter.disabled = !enabled;
    deal.selectAll.disabled = !enabled;
    deal.deselectAll.disabled = !enabled;
    deal.list.innerHTML = '';
    if (!enabled) return;

    const visibleItems = getVisibleItems(deal);
    deal.selectAll.disabled = !enabled || visibleItems.length === 0;
    deal.deselectAll.disabled = !enabled || visibleItems.length === 0;
    if (!visibleItems.length) {
      const empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'No matching items.';
      deal.list.append(empty);
      return;
    }

    visibleItems.forEach(item => {
      const row = document.createElement('label');
      row.className = 'item-row';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = hasPool(state.selectedCharacterId, deal.dealType, item.item_id);
      checkbox.addEventListener('change', () => setPoolSelection(deal, item, checkbox.checked));

      const details = document.createElement('span');
      const name = document.createElement('span');
      name.className = 'item-name';
      name.textContent = item.name || item.item_id;
      const id = document.createElement('span');
      id.className = 'item-id';
      id.textContent = `${item.item_id}${item.category ? ` - ${item.category}` : ''}`;
      details.append(name, document.createElement('br'), id);
      row.append(checkbox, details);
      deal.list.append(row);
    });
  }

  function renderLists() {
    renderList('buy');
    renderList('sell');
    renderList('trade');
  }

  function render() {
    renderNpcSelect();
    renderNpcMeta();
    const traitsRow = getTraitsRow();
    Object.values(DEALS).forEach(deal => {
      deal.toggle.disabled = !traitsRow;
      deal.toggle.checked = isEnabled(traitsRow, deal);
    });
    renderLists();
  }

  function validateRequiredColumns(table, columns) {
    const missing = columns.filter(column => !table.headers.includes(column));
    if (missing.length) throw new Error(`${table.fileName} is missing columns: ${missing.join(', ')}`);
  }

  function validateLoadedTables() {
    validateRequiredColumns(state.files.get('Characters.csv'), ['character_id', 'display_name']);
    validateRequiredColumns(state.files.get('Character_Commerce_Traits.csv'), ['character_id', 'sells_to_shop_weight', 'buys_from_shop_weight', 'trades_weight']);
    validateRequiredColumns(state.files.get('Character_Item_Pools.csv'), ['pool_id', 'character_id', 'item_id', 'deal_type', 'item_role']);
    validateRequiredColumns(state.files.get('Items.csv'), ['item_id', 'name', 'category', 'tags']);
  }

  function validateBeforeSave() {
    state.files.get('Character_Commerce_Traits.csv').rows = state.traits;
    state.files.get('Character_Item_Pools.csv').rows = state.pools;

    const characterIds = new Set(state.characters.map(row => row.character_id).filter(Boolean));
    const itemIds = new Set(state.items.map(row => row.item_id).filter(Boolean));
    const errors = [];

    state.traits.forEach(row => {
      if (!characterIds.has(row.character_id)) errors.push(`Traits reference missing character_id ${row.character_id}`);
    });

    state.pools.forEach(row => {
      if (!characterIds.has(row.character_id)) errors.push(`Pool ${row.pool_id} references missing character_id ${row.character_id}`);
      if (!itemIds.has(row.item_id)) errors.push(`Pool ${row.pool_id} references missing item_id ${row.item_id}`);
    });

    const poolValidatedCharacterIds = state.editedCharacterIds.size
      ? new Set(state.editedCharacterIds)
      : new Set([state.selectedCharacterId].filter(Boolean));
    state.traits
      .filter(row => poolValidatedCharacterIds.has(row.character_id))
      .forEach(row => {
      Object.values(DEALS).forEach(deal => {
        if (isEnabled(row, deal) && !getPools(row.character_id, deal.dealType).length) {
          errors.push(`${row.character_id} has ${deal.label} enabled with no ${deal.dealType} item pool`);
        }
      });
    });

    REQUIRED_FILES.forEach(fileName => {
      try {
        parseCsv(tableToText(state.files.get(fileName)));
      } catch (error) {
        errors.push(`${fileName} could not be serialized: ${error.message}`);
      }
    });

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
    state.characters = state.files.get('Characters.csv').rows;
    state.traits = state.files.get('Character_Commerce_Traits.csv').rows;
    state.pools = state.files.get('Character_Item_Pools.csv').rows;
    state.items = state.files.get('Items.csv').rows;
    initializePositiveWeightMemory();
    state.editedCharacterIds.clear();
    state.selectedCharacterId = state.characters[0]?.character_id || '';
    state.dirty = false;
    els.save.disabled = true;
    els.reload.disabled = false;
    render();
    setStatus(`Loaded ${state.characters.length} NPCs and ${state.items.length} items.`, 'saved');
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
      applyCurrentDealToggleState();
      const errors = validateBeforeSave();
      if (errors.length) {
        setStatus(`Could not save: ${errors[0]}`, 'error');
        return;
      }

      state.files.get('Character_Commerce_Traits.csv').rows = state.traits;
      state.files.get('Character_Item_Pools.csv').rows = state.pools;

      for (const fileName of ['Character_Commerce_Traits.csv', 'Character_Item_Pools.csv']) {
        const handle = await state.directoryHandle.getFileHandle(fileName);
        const writable = await handle.createWritable();
        await writable.write(tableToText(state.files.get(fileName)));
        await writable.close();
      }

      state.dirty = false;
      els.save.disabled = true;
      setStatus('Saved', 'saved');
    } catch (error) {
      setStatus(`Could not save: ${error.message}`, 'error');
    }
  }

  els.openFolder.addEventListener('click', openFolder);
  els.save.addEventListener('click', saveTables);
  els.reload.addEventListener('click', loadTables);
  els.npcSelect.addEventListener('change', () => {
    applyCurrentDealToggleState();
    state.selectedCharacterId = els.npcSelect.value;
    render();
  });

  Object.values(DEALS).forEach(deal => {
    deal.toggle.addEventListener('change', () => setDealEnabled(deal, deal.toggle.checked));
    deal.filter.addEventListener('input', renderLists);
    deal.selectAll.addEventListener('click', () => setBulkPoolSelection(deal, true));
    deal.deselectAll.addEventListener('click', () => setBulkPoolSelection(deal, false));
  });
}());
