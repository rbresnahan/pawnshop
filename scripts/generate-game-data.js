const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const tablesDir = path.join(root, 'one_star_pawn_tables');

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

  return rows.filter(values => values.some(cell => cell !== ''));
}

function readTable(fileName) {
  const text = fs.readFileSync(path.join(tablesDir, fileName), 'utf8');
  const [headers, ...rows] = parseCsv(text);
  return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
}

function list(value) {
  if (!value) return [];
  return value.split(',').map(entry => entry.trim()).filter(Boolean);
}

function maybeList(value) {
  const parsed = list(value);
  return parsed.length ? parsed : null;
}

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function required(row, field, rowLabel, errors) {
  if (!String(row[field] ?? '').trim()) errors.push(`${rowLabel}: missing ${field}`);
}

function requiredNumber(row, field, rowLabel, errors) {
  required(row, field, rowLabel, errors);
  if (String(row[field] ?? '').trim() && !Number.isFinite(Number(row[field]))) {
    errors.push(`${rowLabel}: ${field} must be numeric, got "${row[field]}"`);
  }
}

function bool(value) {
  return String(value).toLowerCase() === 'true';
}

function trustScore(label) {
  const match = String(label).match(/^(\d+)/);
  if (!match) return 50;
  return Math.min(100, Math.max(0, Number(match[1]) * 12 + 14));
}

const characters = readTable('Characters.csv').map(row => ({
  id: row.character_id,
  displayName: row.display_name,
  archetype: row.archetype,
  spriteType: row.sprite_type,
  spritePath: row.sprite_path,
  facing: row.facing,
  spriteClass: row.sprite_class,
  activeInRotation: bool(row.active_in_rotation),
  cashMin: number(row.cash_min),
  cashMax: number(row.cash_max),
  trust: trustScore(row.trustworthiness),
  trustLabel: row.trustworthiness,
  copRiskBias: number(row.cop_risk_bias),
  thugRiskBias: number(row.thug_risk_bias),
  scamRiskBias: number(row.scam_risk_bias),
  preferredItemTags: list(row.preferred_item_tags),
  notes: row.notes
}));

const characterCommerceTraits = readTable('Character_Commerce_Traits.csv').map(row => ({
  characterId: row.character_id,
  sellsToShopWeight: number(row.sells_to_shop_weight),
  buysFromShopWeight: number(row.buys_from_shop_weight),
  tradesWeight: number(row.trades_weight),
  buyInterestTags: list(row.buy_interest_tags),
  sellOfferTags: list(row.sell_offer_tags),
  tradeInterestTags: list(row.trade_interest_tags),
  avoidTags: list(row.avoid_tags),
  maxMarkupTolerance: number(row.max_markup_tolerance, 1),
  lowballTolerance: number(row.lowball_tolerance, 1),
  haggleAggression: number(row.haggle_aggression),
  tradeFairness: number(row.trade_fairness, 1),
  riskTolerance: number(row.risk_tolerance),
  prefersCash: bool(row.prefers_cash),
  acceptsTrades: bool(row.accepts_trades),
  acceptsJunkBundles: bool(row.accepts_junk_bundles),
  notes: row.notes
}));

const itemRows = readTable('Items.csv');
const itemErrors = [];
const seenItemIds = new Set();
const duplicateItemIds = new Set();

itemRows.forEach((row, index) => {
  const rowLabel = `Items.csv row ${index + 2}${row.item_id ? ` (${row.item_id})` : ''}`;
  [
    'item_id',
    'name',
    'category',
    'default_condition',
    'availability_tier',
    'demand_level',
    'price_variance',
    'description'
  ].forEach(field => required(row, field, rowLabel, itemErrors));
  ['base_value', 'shop_buy_min', 'shop_buy_max', 'target_sell_price', 'heat'].forEach(field => {
    requiredNumber(row, field, rowLabel, itemErrors);
  });
  if (row.item_id) {
    if (seenItemIds.has(row.item_id)) duplicateItemIds.add(row.item_id);
    seenItemIds.add(row.item_id);
  }
});

duplicateItemIds.forEach(id => itemErrors.push(`Items.csv: duplicate item_id "${id}"`));

if (itemErrors.length) {
  throw new Error(`Malformed item catalog:\n- ${itemErrors.join('\n- ')}`);
}

const items = itemRows.map(row => ({
  item_id: row.item_id,
  id: row.item_id,
  name: row.name,
  category: row.category,
  default_condition: row.default_condition,
  condition: row.default_condition,
  base_value: number(row.base_value),
  baseValue: number(row.base_value),
  shop_buy_min: number(row.shop_buy_min),
  shopBuyMin: number(row.shop_buy_min),
  shop_buy_max: number(row.shop_buy_max),
  shopBuyMax: number(row.shop_buy_max),
  target_sell_price: number(row.target_sell_price),
  targetSellPrice: number(row.target_sell_price),
  heat: number(row.heat),
  availability_tier: row.availability_tier,
  availabilityTier: row.availability_tier,
  demand_level: row.demand_level,
  demandLevel: row.demand_level,
  price_variance: row.price_variance,
  priceVariance: row.price_variance,
  tags: list(row.tags),
  description: row.description
}));

const characterItemPools = readTable('Character_Item_Pools.csv').map(row => ({
  id: row.pool_id,
  characterId: row.character_id,
  itemId: row.item_id,
  dealType: row.deal_type,
  itemRole: row.item_role,
  requestedItemTags: maybeList(row.requested_item_tags),
  offeredItemTags: maybeList(row.offered_item_tags),
  chanceWeight: number(row.chance_weight),
  askPriceMultiplier: number(row.ask_price_multiplier, 1),
  cashAdjustmentMin: number(row.cash_adjustment_min),
  cashAdjustmentMax: number(row.cash_adjustment_max),
  conditionOverride: row.condition_override,
  riskNote: row.risk_note,
  notes: row.notes
}));

const missingPoolItemRefs = characterItemPools
  .filter(pool => pool.itemId && !seenItemIds.has(pool.itemId))
  .map(pool => `${pool.id} -> ${pool.itemId}`);

if (missingPoolItemRefs.length) {
  throw new Error(`Character_Item_Pools.csv references missing item_id values:\n- ${missingPoolItemRefs.join('\n- ')}`);
}

const eventBlueprints = readTable('Event_Blueprint.csv').map(row => ({
  id: row.event_id,
  characterId: row.character_id,
  eventType: row.event_type,
  dialogue: row.dialogue,
  resultNotes: row.result_notes
}));

const data = {
  characters,
  characterCommerceTraits,
  items,
  characterItemPools,
  eventBlueprints
};

const output = `window.ONE_STAR_PAWN_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(path.join(root, 'gameData.js'), output);

const activeCharacters = characters.filter(character => character.activeInRotation);
console.log(`Generated ${characters.length} characters (${activeCharacters.length} active).`);
console.log(`Generated ${items.length} items.`);
activeCharacters.forEach(character => console.log(`${character.id}: ${character.spritePath}`));