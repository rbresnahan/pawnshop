const GAME_VERSION = '0.1.7';
const GAME_BUILD_LOADED_AT = new Date().toISOString();

window.ONE_STAR_PAWN_VERSION = GAME_VERSION;
window.ONE_STAR_PAWN_BUILD_LOADED_AT = GAME_BUILD_LOADED_AT;
console.log(`One Star Pawn v${GAME_VERSION}`);

const GAME_DATA = window.ONE_STAR_PAWN_DATA || {};
const ITEMS = GAME_DATA.items || [];
const CHARACTERS = GAME_DATA.characters || [];
const CHARACTER_COMMERCE_TRAITS = GAME_DATA.characterCommerceTraits || [];
const CHARACTER_ITEM_POOLS = GAME_DATA.characterItemPools || [];
const EVENT_BLUEPRINTS = GAME_DATA.eventBlueprints || [];
const TURN_HISTORY_LIMIT = 25;
const NORMAL_CUSTOMER_HISTORY_LIMIT = 5;
const NORMAL_CUSTOMER_MAX_CONSECUTIVE = 2;
const CONVERSATION_EXIT_DELAY_MS = 200;
const AUTO_DIALOGUE_BASE_DELAY_MS = 2100;
const AUTO_DIALOGUE_PER_CHAR_MS = 18;
const AUTO_DIALOGUE_MAX_DELAY_MS = 3600;
const COP_CONSEQUENCE_TYPE = 'cop_consequence';
const COP_CONSEQUENCE_CHARACTER_ID = 'cop_consequence';
const COP_CONSEQUENCE_EVENT_ID = 'cop_consequence_visit';
const THUG_CONSEQUENCE_TYPE = 'thug_robbery_consequence';
const THUG_CONSEQUENCE_CHARACTER_ID = 'tracksuit_thug';
const THUG_CONSEQUENCE_EVENT_ID = 'tracksuit_thug_robbery';
const TRACKSUIT_CREW_FACTION_ID = 'tracksuit_crew';
const IMPLEMENTED_PRESSURE_FACTION_IDS = new Set([TRACKSUIT_CREW_FACTION_ID]);
const SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS = 6;
const SPECIAL_ENCOUNTER_GUARANTEE_TURN = 10;
const COP_EMERGENCY_RISK = 120;
const COP_INVESTIGATION_MIN_FULL_TURNS = 3;
const COP_INVESTIGATION_MAX_FULL_TURNS = 5;
const COP_INVESTIGATION_CHECKPOINTS = [25, 45, 70, 100];
const COP_RISK_ADJUSTMENTS = {
  searchFoundNothing: -6,
  voluntarySurrender: -13,
  foundAfterDenial: -12,
  successfulBribe: -5,
  failedObstruction: 0
};
const COP_RISK_INVESTIGATION_RESIDUAL_FLOOR = 1;
const TRACKSUIT_CONSEQUENCE_MIN_PRESSURE = 3;
const THUG_CONSEQUENCE_MIN_FULL_TURNS = 1;
const THUG_CASH_HANDOVER_RATE = 0.28;
const THUG_CASH_HANDOVER_MIN = 8;
const THUG_REFUSE_CASH_RATE = 0.45;
const THUG_REFUSE_CASH_MIN = 14;
const THUG_HANDOVER_PRESSURE_MULTIPLIER = 0.2;
const THUG_REFUSE_PRESSURE_MULTIPLIER = 0;
const HITMAN_WEAPON_BUYBACK_COOLDOWN_NORMAL_ENCOUNTERS = 4;
const BUY_FROM_SHOP_ECONOMY = {
  ageMultipliers: [0.1, 0.2, 0.45, 0.7],
  matureAgeMultiplier: 1,
  liquidityMultipliers: {
    high: 1.2,
    medium: 1,
    low: 0.55,
    junk: 0.3
  },
  unavailableDemandChance: 0.15,
  maxConsecutiveUnavailableDemand: 2,
  maxNormalSelectionRetries: 8
};

const NPC_TARGET_VISIBLE_HEIGHT_RATIO = 0.31;
const NPC_MAX_STAGE_VISIBLE_HEIGHT_RATIO = 0.72;
const NPC_MAX_VISIBLE_HEIGHT = 425;
const NPC_ALPHA_THRESHOLD = 8;
const NPC_IDLE_ANCHOR_LEFT_X = 0.34;
const NPC_IDLE_ANCHOR_RIGHT_X = 0.68;
const NPC_FEET_BASELINE = 0.995;
const NPC_CUSTOMER_VISUAL_HEIGHT = '220px';
const NPC_CUSTOMER_VISUAL_LEFT = '-25px';
const NPC_CUSTOMER_VISUAL_LEFT_RIGHT_FACING = '-100px';
const NPC_CUSTOMER_VISUAL_TOP = '-140px';
const NPC_OFFSCREEN_CLEARANCE = 24;
const NPC_ENTRY_MS = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 20 : 420;
const NPC_EXIT_MS = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 20 : 520;

let activeCustomers = [];
const npcBoundsCache = new Map();
const npcSizingLogCache = new Set();
let npcTransitionToken = 0;

const ITEM_ICONS = {
  jewelry: 'JWL',
  electronics: 'ELE',
  computer: 'ELE',
  tool: 'TLS',
  tools: 'TLS',
  watch: 'WAT',
  game_console: 'GME',
  collectible: 'COL',
  collectibles: 'COL',
  weapon: 'WPN',
  weapons: 'WPN',
  luxury: 'LUX',
  mystery: '???',
  junk: 'JNK',
  appliance: 'JNK',
  instrument: 'INS',
  default: 'ITM'
};

const NEUTRAL_DIALOGUE_PROFILE = {
  intro: ['I need to talk business.', 'Got a minute for a deal?', 'You buying, selling, or judging today?'],
  item: ['It is {quantity} {item}, {condition}. I want {price}.', 'Here is {quantity} {item}. Condition is {condition}. Price is {price}.', '{quantity} {item}, {condition}. That makes it {price}.'],
  accept: ['Fine. We have a deal.', 'That works.', 'Done.'],
  reject: ['Then we are finished.', 'No deal, then.', 'I will take it somewhere else.'],
  lowball: ['That number is an insult with shoes on.', 'You always start that ugly?', 'Try saying that again with respect.'],
  trade: ['A trade is a trade.', 'That swap works.', 'Fine, trade it is.'],
  exit: ['I am leaving.', 'See you around.', 'Keep the counter warm.']
};

const NPC_DIALOGUE_PROFILES = {
  crackhead: {
    intro: ['Door was open, so fate sent me.', 'I got something and I need cash before my luck wakes up.', 'Quick deal, quick feet, everybody wins.'],
    item: ['This is {quantity} {item}, {condition}. I need {price}, no opera about it.', '{quantity} {item}. Condition says {condition}. Price says {price}.', 'Look, {quantity} {item}, {condition}, and I only need {price}.'],
    accept: ['Beautiful. I knew this counter loved me.', 'Done. No receipts, no speeches.', 'That is the number I meant the whole time.'],
    reject: ['Cold world. Cold counter.', 'Fine, I know a guy with worse lights.', 'Your loss, probably somebody else\'s too.'],
    lowball: ['That lowball came in wearing brass knuckles.', 'You trying to buy it or hurt my feelings?', 'I am desperate, not decorative.'],
    trade: ['Trade works. Cash is a rumor anyway.', 'Swap it and let me vanish.', 'Fine, trade before I think.'],
    exit: ['I was never here loudly.', 'Door and me got business.', 'Tell the cameras I blinked.']
  },
  bum: {
    intro: ['Morning, boss. The sidewalk economy is moving.', 'I brought you a little opportunity with dents.', 'Got a deal if your register is feeling neighborly.'],
    item: ['It is {quantity} {item}, {condition}. I am asking {price}.', '{quantity} {item}. Seen worse days, condition is {condition}. Need {price}.', 'This here {quantity} {item} is {condition}. {price} gets it gone.'],
    accept: ['Much obliged. That helps.', 'Fair enough. We are square.', 'Done, boss.'],
    reject: ['No hard feelings. Mostly soft ones.', 'I will keep walking it around.', 'Alright. The sidewalk has opinions too.'],
    lowball: ['That is a small number for a heavy day.', 'You shave it any closer, it disappears.', 'Come on, boss, leave me bus fare.'],
    trade: ['Trade is alright if it carries easier.', 'I can work with a swap.', 'Fine, I will take the trade.'],
    exit: ['Stay dry in here.', 'I will be around.', 'Mind the door, it judges.']
  },
  hitman: {
    intro: ['I require a quiet transaction.', 'This should be brief.', 'I prefer business without witnesses to confusion.'],
    item: ['{quantity} {item}. {condition}. The price is {price}.', 'You are looking at {quantity} {item}, {condition}. I expect {price}.', '{quantity} {item}, condition {condition}. {price} is clean enough.'],
    accept: ['Acceptable.', 'Good. Efficient.', 'We understand each other.'],
    reject: ['Unfortunate.', 'Then we are done.', 'I dislike wasted visits.'],
    lowball: ['That offer has poor survival instincts.', 'Careful. Numbers can offend.', 'I heard you. I recommend improvement.'],
    trade: ['The exchange is acceptable.', 'A trade will do.', 'Fine. Transfer ownership.'],
    exit: ['Forget the face.', 'Close the register slowly.', 'I was not here long.']
  },
  junkie: {
    intro: ['The universe coughed this up and told me your address.', 'I got a deal with wires in its dreams.', 'You ever feel like merchandise is watching? Anyway.'],
    item: ['It is {quantity} {item}, {condition}. The spirits say {price}.', '{quantity} {item}. Condition is {condition}, legally or emotionally. Need {price}.', 'This {quantity} {item} is {condition}. {price} keeps the moon quiet.'],
    accept: ['Yes. The counter agrees.', 'Good, good, good. Done.', 'The deal has chosen us.'],
    reject: ['The object will remember that.', 'Fine. I will ask a mailbox.', 'Bad omen, but alright.'],
    lowball: ['That number has teeth.', 'Do not lowball the haunted math.', 'You made the price sad.'],
    trade: ['Trade completes the triangle.', 'Yes, swap the energies.', 'Fine, the trade breathes.'],
    exit: ['Do not follow the buzzing.', 'I am leaving before it hatches.', 'Tell nobody about the triangle.']
  },
  '70s_hustler': {
    intro: ['My friend, opportunity just walked in wearing good shoes.', 'I brought flavor, value, and a flexible memory.', 'Let us make the register sing something funky.'],
    item: ['This is {quantity} {item}, {condition}. For you, {price}.', '{quantity} {item}, {condition}, with a story worth extra. I need {price}.', 'Feast your eyes: {quantity} {item}, {condition}. Price is {price}.'],
    accept: ['Smooth business. I respect it.', 'Now that is rhythm.', 'Done with style.'],
    reject: ['You wound me in fluorescent lighting.', 'Another counter will appreciate class.', 'Your taste needs tailoring.'],
    lowball: ['That offer is dressed for failure.', 'You cannot discount charisma that hard.', 'My shoes cost more than that insult.'],
    trade: ['A swap with swagger. I like it.', 'Trade accepted, with reservations and flair.', 'Fine, we exchange legends.'],
    exit: ['Stay shiny, cashier.', 'I leave richer in spirit at least.', 'Tell the street I was magnificent.']
  },
  red_hustler: {
    intro: ['I need something handled quick.', 'You look open enough for business.', 'Let us talk numbers before somebody talks too much.'],
    item: ['{quantity} {item}, {condition}. I want {price}.', 'Here: {quantity} {item}. Condition {condition}. Price {price}.', 'This {quantity} {item} is {condition}. {price}, and we stay friendly.'],
    accept: ['Good. Smart choice.', 'Done. Easy.', 'That works for both of us.'],
    reject: ['Bad read, clerk.', 'Fine, I have other doors.', 'You pass on money weirdly.'],
    lowball: ['Do I look like a clearance rack?', 'That offer came out sideways.', 'Try not to insult me in my good jacket.'],
    trade: ['Trade works if the math behaves.', 'Fine. Swap it.', 'I can live with that trade.'],
    exit: ['Keep looking busy.', 'I will remember the counter.', 'Later.']
  },
  slot_grandma: {
    intro: ['Hello, sweetheart. Grandma needs a little cash miracle.', 'Be a dear and look at this for me.', 'The machines are due, and I brought something nice.'],
    item: ['It is {quantity} {item}, {condition}. I am asking {price}.', 'This {quantity} {item} is {condition}. I would like {price}, honey.', '{quantity} {item}, condition {condition}. {price} would help me greatly.'],
    accept: ['Bless you. That will do.', 'Good enough, sweetheart.', 'Done. Wish me luck.'],
    reject: ['Oh, that is a shame.', 'I suppose I will try elsewhere.', 'No deal, then. Be kind to the next fool.'],
    lowball: ['Sweetheart, I have seen kinder slot machines.', 'That offer is thinner than casino coffee.', 'Do not make Grandma frown for free.'],
    trade: ['A trade? Well, I have made worse bargains.', 'Alright, we can swap.', 'Fine, honey. Trade it is.'],
    exit: ['Say a little prayer for me.', 'I will be back if fortune blinks.', 'Keep your receipts, dear.']
  }
};
const state = {
  money: 120,
  reputation: 5,
  profit: 0,
  inventory: [],
  turn: 0,
  copRisk: 0,
  factionPressure: {
    [TRACKSUIT_CREW_FACTION_ID]: 0
  },
  factionPressureSources: {
    [TRACKSUIT_CREW_FACTION_ID]: []
  },
  scamRisk: 0,
  consequenceQueue: [],
  consequenceSerial: 0,
  copConsequenceCooldownUntil: 0,
  thugConsequenceCooldownUntil: 0,
  normalEncountersSinceSpecial: SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS,
  normalEncounterCount: 0,
  normalCustomerHistory: [],
  copWarnings: 0,
  copStrikes: 0,
  nextCopInvestigationRisk: COP_INVESTIGATION_CHECKPOINTS[0],
  copInvestigationArmed: true,
  copInvestigationNormalizationLog: '',
  activeConsequence: null,
  currentCustomer: null,
  currentDeal: null,
  conversation: null,
  isResolving: false,
  isTransitioningCustomer: false,
  isGameOver: false,
  sellMissStreak: 0,
  unavailableSellRequestStreak: 0,
  unavailableSellRequestCount: 0,
  buybackCooldownDiagnostics: [],
  inventorySelection: {
    active: false,
    encounterId: null,
    mode: null,
    selectedInstanceIds: []
  }
};

const els = {
  game: document.querySelector('.game-screen'),
  customer: document.getElementById('customerSprite'),
  npcStage: document.querySelector('.npc-stage'),
  speaker: document.getElementById('speaker'),
  dialogue: document.getElementById('dialogue'),
  dialoguePanel: document.querySelector('.dialogue-panel'),
  dialogueNext: document.getElementById('dialogueNext'),
  money: document.getElementById('money'),
  profit: document.getElementById('profit'),
  reputation: document.getElementById('reputation'),
  inventoryTotal: document.getElementById('inventoryTotal'),
  inventoryCount: document.getElementById('inventoryCount'),
  stockCount: document.getElementById('stockCount'),
  inventoryGrid: document.getElementById('inventoryGrid'),
  expandableInventory: document.getElementById('expandableInventory'),
  inventoryPanel: document.getElementById('inventoryPanel'),
  inventoryTitle: document.querySelector('.inventory-panel .panel-title'),
  openInventory: document.getElementById('openInventory'),
  openShopLog: document.getElementById('openShopLog'),
  closeInventory: document.getElementById('closeInventory'),
  dealText: document.getElementById('dealText'),
  choices: document.getElementById('choices'),
  bottomHud: document.querySelector('.bottom-hud'),
  log: document.getElementById('log'),
  historyList: document.getElementById('historyList'),
  clearHistory: document.getElementById('clearHistory')
};

const gameVersionElement = document.getElementById('game-version');
if (gameVersionElement) {
  gameVersionElement.textContent = `Build: v${GAME_VERSION}`;
} else {
  console.warn('One Star Pawn version label not found.');
}

let typingTimer;
let typedLine = '';
let isTypingLine = false;
let autoProgressTimer = 0;
let autoProgressToken = 0;
let activeLowerPanel = 'closed';
let inventorySerial = 0;
let encounterSerial = 0;
let turnHistory = [];

const CUSTOMER_BUY_REQUEST_LABELS = {
  jewelry: 'jewelry',
  electronics: 'electronics',
  watch: 'watch',
  watches: 'watch',
  tool: 'tool',
  tools: 'tools',
  collectible: 'collectible',
  collectibles: 'collectibles',
  instrument: 'instrument',
  instruments: 'instruments',
  console: 'console',
  consoles: 'consoles',
  game_console: 'console',
  luxury: 'luxury item',
  weapon: 'weapon',
  appliance: 'appliance'
};

const CUSTOMER_BUY_REQUEST_PRIORITY = [
  'jewelry',
  'watch',
  'watches',
  'electronics',
  'game_console',
  'console',
  'consoles',
  'tools',
  'tool',
  'collectibles',
  'collectible',
  'instruments',
  'instrument',
  'luxury',
  'weapon',
  'appliance'
];
const BROAD_BUY_TAGS = new Set(['electronics', 'junk', 'collectible', 'collectibles', 'luxury', 'practical', 'portable']);
const SELECTIVE_MERCHANDISE_TAGS = new Set(['broken', 'fake', 'possibly_fake', 'hot', 'suspicious', 'stolen', 'junk', 'cursed', 'mystery', 'rare']);
const BAD_CONDITIONS = new Set(['poor', 'fake', 'questionable', 'unknown', 'broken']);
const LIQUIDITY_SCORE = {
  high: 2,
  medium: 1,
  low: 0
};

function moneyText(value) {
  return `$${Math.round(value)}`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chance(percent) {
  return Math.random() * 100 < percent;
}

function pickWeighted(list) {
  const total = list.reduce((sum, entry) => sum + Math.max(0, entry.chanceWeight || 0), 0);
  if (total <= 0) return list[0];
  let roll = Math.random() * total;
  for (const entry of list) {
    roll -= Math.max(0, entry.chanceWeight || 0);
    if (roll <= 0) return entry;
  }
  return list[list.length - 1];
}

function tagsOverlap(left = [], right = []) {
  return left.some(tag => right.includes(tag));
}

function getItem(itemId) {
  return ITEMS.find(item => item.id === itemId);
}

function getCharacter(characterId) {
  return CHARACTERS.find(character => character.id === characterId);
}

function getTraits(characterId) {
  return CHARACTER_COMMERCE_TRAITS.find(traits => traits.characterId === characterId) || {};
}

function getBlueprint(characterId, eventType) {
  return EVENT_BLUEPRINTS.find(blueprint => blueprint.characterId === characterId && blueprint.eventType === eventType);
}

function getBlueprintForPool(pool) {
  const blueprint = getBlueprint(pool.characterId, pool.dealType);
  if (!blueprint) return null;
  if (!isShopBuying(pool.dealType)) return blueprint;
  const blueprintText = `${blueprint.id} ${blueprint.dialogue} ${blueprint.resultNotes}`.toLowerCase();
  return blueprintText.includes(String(pool.id).toLowerCase()) ? blueprint : null;
}

function normalizeFactionId(factionId) {
  return String(factionId || '').trim();
}

function getFactionPressure(factionId) {
  const normalized = normalizeFactionId(factionId);
  if (!normalized) return 0;
  return Math.max(0, Number(state.factionPressure?.[normalized]) || 0);
}

function setFactionPressure(factionId, amount) {
  const normalized = normalizeFactionId(factionId);
  if (!normalized) return { before: 0, after: 0, delta: 0 };
  if (!state.factionPressure || typeof state.factionPressure !== 'object') state.factionPressure = {};
  const before = getFactionPressure(normalized);
  state.factionPressure[normalized] = Math.max(0, Math.floor(Number(amount) || 0));
  return { before, after: state.factionPressure[normalized], delta: state.factionPressure[normalized] - before };
}

function getFactionPressureSources(factionId) {
  const normalized = normalizeFactionId(factionId);
  if (!normalized) return [];
  if (!state.factionPressureSources || typeof state.factionPressureSources !== 'object') state.factionPressureSources = {};
  if (!Array.isArray(state.factionPressureSources[normalized])) state.factionPressureSources[normalized] = [];
  return state.factionPressureSources[normalized];
}

function recordFactionPressureSource(factionId, amount, deal, reason) {
  const normalized = normalizeFactionId(factionId);
  if (!normalized || amount <= 0) return;
  const sources = getFactionPressureSources(normalized);
  sources.push({
    turn: state.turn,
    customerId: deal?.customer?.id || state.currentCustomer?.id || null,
    customerName: deal?.customer?.displayName || state.currentCustomer?.displayName || null,
    dealId: deal?.pool?.id || deal?.blueprint?.id || null,
    eventId: deal?.blueprint?.id || null,
    reason,
    amount
  });
  if (sources.length > 12) sources.splice(0, sources.length - 12);
}

function addFactionPressure(factionId, amount, deal = null, reason = 'faction pressure increased') {
  const normalized = normalizeFactionId(factionId);
  const delta = Math.max(0, Math.ceil(Number(amount) || 0));
  if (!normalized || delta <= 0) return { before: getFactionPressure(normalized), after: getFactionPressure(normalized), delta: 0, factionId: normalized };
  const before = getFactionPressure(normalized);
  const pressure = setFactionPressure(normalized, before + delta);
  recordFactionPressureSource(normalized, delta, deal, reason);
  return { ...pressure, factionId: normalized };
}

function isImplementedPressureFaction(factionId) {
  return IMPLEMENTED_PRESSURE_FACTION_IDS.has(normalizeFactionId(factionId));
}

function getDealPressureFactionId(deal) {
  const eventFaction = normalizeFactionId(deal?.blueprint?.pressureFactionId);
  if (eventFaction) return eventFaction;
  return normalizeFactionId(deal?.customer?.factionId);
}

function getImplementedDealPressureFactionId(deal) {
  const factionId = getDealPressureFactionId(deal);
  return isImplementedPressureFaction(factionId) ? factionId : '';
}

function addDealFactionPressure(deal, amount, reason, options = {}) {
  const factionId = getDealPressureFactionId(deal);
  if (!factionId) {
    if (options.warnWhenMissing) console.warn(`[faction-pressure] ${reason} has no faction target; no pressure added.`);
    return null;
  }
  if (!isImplementedPressureFaction(factionId)) return null;
  const result = addFactionPressure(factionId, amount, deal, reason);
  if (result?.delta > 0 && deal) {
    if (!Array.isArray(deal.factionPressureHistoryLines)) deal.factionPressureHistoryLines = [];
    const label = factionId === TRACKSUIT_CREW_FACTION_ID ? 'Tracksuit Crew Pressure Source' : `Faction Pressure Source (${factionId})`;
    deal.factionPressureHistoryLines.push(`${label}: ${reason}; faction: ${factionId}.`);
  }
  return result;
}

function isShopBuying(dealType) {
  return dealType === 'sell_to_shop';
}

function isNpcBuying(dealType) {
  return dealType === 'buy_from_shop';
}

function isConsequenceDeal(dealType) {
  return String(dealType || '').endsWith('_consequence');
}

function hasInventoryItem(itemId) {
  return state.inventory.some(item => item.itemId === itemId);
}

function findInventoryItem(itemId) {
  return state.inventory.find(item => item.itemId === itemId);
}

function findInventoryByTags(tags = [], avoidTags = []) {
  return state.inventory.find(item => tagsOverlap(item.tags, tags) && !tagsOverlap(item.tags, avoidTags));
}

function findHighestHeatInventoryItem() {
  return [...state.inventory].sort((a, b) => (b.heat || 0) - (a.heat || 0) || (b.acquisitionCost || 0) - (a.acquisitionCost || 0))[0] || null;
}

function removeInventoryInstance(instanceId) {
  const index = state.inventory.findIndex(item => item.instanceId === instanceId);
  if (index >= 0) return state.inventory.splice(index, 1)[0];
  return null;
}

function typeLine(text) {
  clearInterval(typingTimer);
  clearAutoProgressTimer();
  typedLine = text || '';
  isTypingLine = true;
  els.dialogue.textContent = '';
  updateDialogueNextIndicator();
  let i = 0;
  typingTimer = setInterval(() => {
    els.dialogue.textContent += typedLine[i] || '';
    i += 1;
    if (i > typedLine.length) {
      clearInterval(typingTimer);
      isTypingLine = false;
      handleDialogueLineComplete();
    }
  }, 14);
}

function finishTypingLine() {
  if (!isTypingLine) return false;
  clearInterval(typingTimer);
  els.dialogue.textContent = typedLine;
  isTypingLine = false;
  handleDialogueLineComplete();
  return true;
}

function clearAutoProgressTimer() {
  if (!autoProgressTimer) return;
  window.clearTimeout(autoProgressTimer);
  autoProgressTimer = 0;
}

function resetAutoProgress() {
  clearAutoProgressTimer();
  autoProgressToken += 1;
}

function canAdvanceConversationManually() {
  return Boolean(
    state.conversation?.phase === 'intro' &&
    !isTypingLine &&
    !state.isResolving &&
    !state.isTransitioningCustomer &&
    !state.isGameOver
  );
}

function updateDialogueNextIndicator() {
  if (!els.dialogueNext) return;
  els.dialogueNext.hidden = !canAdvanceConversationManually();
}

function getAutoDialogueDelay(text) {
  return Math.min(AUTO_DIALOGUE_MAX_DELAY_MS, AUTO_DIALOGUE_BASE_DELAY_MS + String(text || '').length * AUTO_DIALOGUE_PER_CHAR_MS);
}

function scheduleResolvedAutoProgress() {
  const convo = state.conversation;
  if (!convo || convo.phase !== 'resolved' || isTypingLine || state.isGameOver || state.isTransitioningCustomer) return;
  clearAutoProgressTimer();
  const token = autoProgressToken;
  const currentLine = convo.lines[convo.index];
  autoProgressTimer = window.setTimeout(() => {
    autoProgressTimer = 0;
    if (token !== autoProgressToken || state.conversation !== convo || state.isGameOver) return;
    advanceConversation(true);
  }, getAutoDialogueDelay(currentLine?.text));
}

function handleDialogueLineComplete() {
  updateDialogueNextIndicator();
  if (state.conversation?.phase === 'resolved') scheduleResolvedAutoProgress();
}

function getInventoryTotal() {
  return state.inventory.reduce((total, item) => total + (item.quantity || item.count || 1), 0);
}

function renderStats() {
  const inventoryTotal = getInventoryTotal();
  els.money.textContent = moneyText(state.money);
  els.profit.textContent = moneyText(state.profit);
  els.reputation.textContent = String(state.reputation);
  els.inventoryCount.textContent = String(inventoryTotal);
  if (els.inventoryTotal) els.inventoryTotal.textContent = String(inventoryTotal);
  if (els.stockCount) els.stockCount.textContent = String(inventoryTotal);
}

function getInventorySelectionDeal() {
  const selection = state.inventorySelection;
  const deal = state.currentDeal;
  if (!selection.active || !deal || deal.encounterId !== selection.encounterId || deal.resolvedAction) return null;
  if (selection.mode === 'sale' && !isNpcBuying(deal.dealType)) return null;
  if (selection.mode === 'trade' && deal.dealType !== 'trade') return null;
  return deal;
}

function getHeldTurns(item) {
  const acquired = Number(item?.turnAcquired);
  if (!Number.isFinite(acquired)) return 0;
  return Math.max(0, state.turn - acquired);
}

function getHeldNormalEncounters(item) {
  const acquired = Number(item?.normalEncounterAcquired);
  if (!Number.isFinite(acquired)) return 0;
  return Math.max(0, state.normalEncounterCount - acquired);
}

function getInventoryDetail(item) {
  const tags = (item.tags || []).join(', ') || 'none';
  const acquired = Number.isFinite(Number(item.turnAcquired)) ? `Acquired T${item.turnAcquired}. Held ${getHeldTurns(item)} turns. ` : '';
  const heldNormal = Number.isFinite(Number(item.normalEncounterAcquired)) ? `Held ${getHeldNormalEncounters(item)} normal encounters. ` : '';
  const liquidity = item.liquidity ? `Liquidity ${item.liquidity}. ` : '';
  return `${item.name}: ${item.condition}. ${acquired}${heldNormal}${liquidity}Cost ${moneyText(item.acquisitionCost)}. Heat ${item.heat}/10. Tags: ${tags}. ${item.description}`;
}

function renderInventory() {
  const selectionDeal = getInventorySelectionDeal();
  const selectionMode = state.inventorySelection.mode;
  const visibleInventory = selectionDeal && selectionMode === 'trade'
    ? state.inventory.filter(item => isInventoryItemEligibleForTrade(selectionDeal, item))
    : state.inventory;
  els.inventoryGrid.innerHTML = '';
  if (els.inventoryTitle) {
    const count = selectionDeal ? visibleInventory.length : getInventoryTotal();
    els.inventoryTitle.innerHTML = selectionDeal
      ? selectionMode === 'trade'
        ? `Select trade items <strong>${count}</strong>`
        : `Select an item to offer <strong>${count}</strong>`
      : `Inventory <strong>${count}</strong>`;
  }

  if (!visibleInventory.length) {
    const empty = document.createElement('span');
    empty.className = 'empty';
    empty.textContent = selectionDeal ? 'No matching inventory available.' : '-';
    els.inventoryGrid.appendChild(empty);
    return;
  }

  visibleInventory.forEach(item => {
    const slot = document.createElement('button');
    const icon = document.createElement('span');
    const name = document.createElement('span');
    const value = document.createElement('span');
    const quantity = item.quantity || item.count || 1;
    const iconKey = item.tags.find(tag => ITEM_ICONS[tag]) || item.category;
    const age = Number.isFinite(Number(item.turnAcquired)) ? ` | acquired T${item.turnAcquired} | held ${getHeldTurns(item)} turns` : '';
    const title = `${item.name} | ${item.condition} | cost ${moneyText(item.acquisitionCost)} | heat ${item.heat}${age}`;
    const detail = getInventoryDetail(item);
    const compatibility = selectionDeal
      ? selectionMode === 'trade'
        ? { valid: isInventoryItemEligibleForTrade(selectionDeal, item) }
        : evaluateSaleCompatibility(selectionDeal, item)
      : { valid: true };
    const selectedForTrade = selectionMode === 'trade' && state.inventorySelection.selectedInstanceIds.includes(item.instanceId);

    slot.type = 'button';
    slot.className = `inventory-tile heat-${Math.min(3, Math.max(0, item.heat))}`;
    slot.title = title;
    slot.setAttribute('aria-label', title);
    if (selectionDeal) {
      slot.classList.toggle('is-selectable', Boolean(compatibility.valid));
      slot.classList.toggle('is-ineligible', !compatibility.valid);
      slot.classList.toggle('is-selected', selectedForTrade);
      if (selectionMode === 'trade') slot.setAttribute('aria-pressed', String(selectedForTrade));
    }
    slot.addEventListener('click', event => {
      event.stopPropagation();
      renderLog(detail);
      if (selectionDeal) {
        if (selectionMode === 'trade') toggleTradeInventorySelection(selectionDeal, item.instanceId);
        else selectInventoryItemForDeal(selectionDeal, item.instanceId);
      }
    });
    slot.addEventListener('focus', () => renderLog(detail));

    icon.className = 'item-icon';
    icon.textContent = ITEM_ICONS[iconKey] || ITEM_ICONS.default;
    name.className = 'item-name';
    name.textContent = item.name;
    value.className = 'item-value';
    value.textContent = moneyText(item.targetSellPrice || item.baseValue || item.acquisitionCost);

    slot.append(icon, name, value);

    if (quantity > 1) {
      const count = document.createElement('span');
      count.className = 'item-quantity';
      count.textContent = `x${quantity}`;
      slot.appendChild(count);
    }

    els.inventoryGrid.appendChild(slot);
  });
}
function getNpcSide(facing) {
  return facing === 'right' ? 'left' : 'right';
}

function getNpcVisualLeft(customer) {
  return customer.facing === 'right' ? NPC_CUSTOMER_VISUAL_LEFT_RIGHT_FACING : NPC_CUSTOMER_VISUAL_LEFT;
}

function getNpcRenderedImageWidth(bounds) {
  return bounds.sourceHeight > 0
    ? (bounds.sourceWidth / bounds.sourceHeight) * parseFloat(NPC_CUSTOMER_VISUAL_HEIGHT)
    : parseFloat(NPC_CUSTOMER_VISUAL_HEIGHT);
}

function getNpcSlideDistance(customer, stageWidth, anchorX) {
  const visualLeft = parseFloat(getNpcVisualLeft(customer)) || 0;
  const renderedWidth = getNpcRenderedImageWidth(customer.spriteBounds);
  const clearLeftDistance = anchorX + visualLeft + renderedWidth + NPC_OFFSCREEN_CLEARANCE;
  const clearRightDistance = stageWidth - anchorX - visualLeft + NPC_OFFSCREEN_CLEARANCE;
  return Math.ceil(Math.max(clearLeftDistance, clearRightDistance));
}

function validateCustomerFacing(character, reasons) {
  if (!['left', 'right'].includes(character.facing)) {
    reasons.push(`bad facing "${character.facing || '(blank)'}"; expected left or right`);
    return;
  }
  if (/_r\.png$/i.test(character.spritePath) && character.facing !== 'right') {
    reasons.push(`sprite_path suffix _r disagrees with facing "${character.facing}"`);
  } else if (/_l\.png$/i.test(character.spritePath) && character.facing !== 'left') {
    reasons.push(`sprite_path suffix _l disagrees with facing "${character.facing}"`);
  } else if (!/_[rl]\.png$/i.test(character.spritePath)) {
    reasons.push('sprite_path must end in _r.png or _l.png for directional customers');
  }
}

function getBaseSpriteKey(spritePath = '') {
  return spritePath
    .split('/')
    .pop()
    .replace(/-idle(?:_[rl])?\.png$/i, '')
    .replace(/(?:_[rl])?\.png$/i, '');
}

function loadNpcImage(spritePath) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Missing NPC sprite: ${spritePath}`));
    image.src = spritePath;
  });
}

async function getNpcVisibleBounds(spritePath) {
  if (npcBoundsCache.has(spritePath)) return npcBoundsCache.get(spritePath);
  const image = await loadNpcImage(spritePath);
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(image, 0, 0);
  const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let minX = canvas.width;
  let minY = canvas.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      if (data[(y * canvas.width + x) * 4 + 3] > NPC_ALPHA_THRESHOLD) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  if (maxX < 0 || maxY < 0) throw new Error(`NPC sprite has no visible pixels: ${spritePath}`);
  const bounds = {
    sourceWidth: canvas.width,
    sourceHeight: canvas.height,
    minX,
    minY,
    maxX,
    maxY,
    visibleWidth: maxX - minX + 1,
    visibleHeight: maxY - minY + 1
  };
  npcBoundsCache.set(spritePath, bounds);
  return bounds;
}

function setDealButtonsDisabled(disabled) {
  els.choices.querySelectorAll('button').forEach(button => {
    button.disabled = disabled;
  });
}

function duplicateIds(list, key) {
  const seen = new Set();
  const dupes = new Set();
  list.forEach(entry => {
    if (seen.has(entry[key])) dupes.add(entry[key]);
    seen.add(entry[key]);
  });
  return [...dupes];
}

function validateGameData() {
  const characterIds = new Set(CHARACTERS.map(character => character.id));
  const factionIds = new Set(CHARACTERS.map(character => character.factionId).filter(Boolean));
  const itemIds = new Set(ITEMS.map(item => item.id));
  const traitIds = new Set(CHARACTER_COMMERCE_TRAITS.map(traits => traits.characterId));
  const poolsByCharacter = new Map();
  CHARACTER_ITEM_POOLS.forEach(pool => {
    if (!poolsByCharacter.has(pool.characterId)) poolsByCharacter.set(pool.characterId, []);
    poolsByCharacter.get(pool.characterId).push(pool);
  });
  [
    ['character_id', duplicateIds(CHARACTERS, 'id')],
    ['item_id', duplicateIds(ITEMS, 'id')],
    ['pool_id', duplicateIds(CHARACTER_ITEM_POOLS, 'id')],
    ['event_id', duplicateIds(EVENT_BLUEPRINTS, 'id')]
  ].forEach(([label, dupes]) => {
    if (dupes.length) console.warn(`Duplicate ${label} values: ${dupes.join(', ')}`);
  });
  ITEMS.forEach((item, index) => {
    const label = item.id || item.item_id || `row ${index + 1}`;
    ['id', 'item_id', 'name', 'category', 'condition', 'default_condition', 'description'].forEach(field => {
      if (!String(item[field] ?? '').trim()) console.error(`Item ${label} missing ${field}`);
    });
    ['baseValue', 'shopBuyMin', 'shopBuyMax', 'targetSellPrice', 'heat'].forEach(field => {
      if (!Number.isFinite(Number(item[field]))) console.error(`Item ${label} has invalid ${field}: ${item[field]}`);
    });
    ['availability_tier', 'demand_level', 'price_variance'].forEach(field => {
      if (!String(item[field] ?? '').trim()) console.error(`Item ${label} missing ${field}`);
    });
    if (!Array.isArray(item.tags)) console.error(`Item ${label} tags must be an array`);
  });
  CHARACTERS.filter(character => character.activeInRotation).forEach(character => {
    if (!character.spritePath) console.error(`Active character has no sprite_path: ${character.id}`);
    if (!['left', 'right'].includes(character.facing)) console.error(`Active character has invalid facing: ${character.id} -> ${character.facing || '(blank)'}`);
    if (character.spritePath && character.facing === 'right' && !/_r\.png$/i.test(character.spritePath)) console.error(`Active character sprite_path/facing mismatch: ${character.id} sprite_path must end in _r.png for facing right`);
    if (character.spritePath && character.facing === 'left' && !/_l\.png$/i.test(character.spritePath)) console.error(`Active character sprite_path/facing mismatch: ${character.id} sprite_path must end in _l.png for facing left`);
    if (!traitIds.has(character.id)) console.error(`Active character has no commerce traits row: ${character.id}`);
  });
  CHARACTERS.forEach(character => {
    if (!character.factionId) console.error(`Character has no faction_id: ${character.id}`);
  });
  CHARACTER_ITEM_POOLS.forEach(pool => {
    if (!characterIds.has(pool.characterId)) console.error(`Item pool references missing character_id: ${pool.id} -> ${pool.characterId}`);
    if (pool.itemId && !itemIds.has(pool.itemId)) console.error(`Item pool references missing item_id: ${pool.id} -> ${pool.itemId}`);
  });
  EVENT_BLUEPRINTS.forEach(event => {
    if (!characterIds.has(event.characterId)) {
      console.error(`Event references missing character_id: ${event.id} -> ${event.characterId}`);
      return;
    }
    if (event.pressureFactionId && !factionIds.has(event.pressureFactionId)) {
      console.error(`Event references unknown pressure_faction_id: ${event.id} -> ${event.pressureFactionId}`);
    }
    if (isConsequenceDeal(event.eventType)) return;
    const matchingPools = (poolsByCharacter.get(event.characterId) || []).filter(pool => pool.dealType === event.eventType);
    if (!matchingPools.length) console.warn(`Event has no compatible pool: ${event.id} (${event.characterId}, ${event.eventType})`);
  });
  const copCharacter = getCharacter(COP_CONSEQUENCE_CHARACTER_ID);
  const copEvent = getConsequenceEvent(COP_CONSEQUENCE_TYPE);
  const thugCharacter = getCharacter(THUG_CONSEQUENCE_CHARACTER_ID);
  const thugEvent = getConsequenceEvent(THUG_CONSEQUENCE_TYPE);
  if (!copCharacter) console.error(`[consequence-validation] Missing cop character data: ${COP_CONSEQUENCE_CHARACTER_ID}`);
  else if (!copCharacter.spritePath) console.error(`[consequence-validation] Missing cop sprite path for ${COP_CONSEQUENCE_CHARACTER_ID}`);
  if (!copEvent) console.error(`[consequence-validation] Missing consequence event definition: ${COP_CONSEQUENCE_EVENT_ID}`);
  if (!thugCharacter) console.error(`[consequence-validation] Missing thug character data: ${THUG_CONSEQUENCE_CHARACTER_ID}`);
  else if (!thugCharacter.spritePath) console.error(`[consequence-validation] Missing thug sprite path for ${THUG_CONSEQUENCE_CHARACTER_ID}`);
  else if (thugCharacter.factionId !== TRACKSUIT_CREW_FACTION_ID) console.error(`[consequence-validation] Tracksuit thug character must have faction_id ${TRACKSUIT_CREW_FACTION_ID}; got ${thugCharacter.factionId || '(blank)'}`);
  if (!thugEvent) console.error(`[consequence-validation] Missing consequence event definition: ${THUG_CONSEQUENCE_EVENT_ID}`);
  else if (thugEvent.pressureFactionId !== TRACKSUIT_CREW_FACTION_ID) console.error(`[consequence-validation] Tracksuit consequence must have pressure_faction_id ${TRACKSUIT_CREW_FACTION_ID}; got ${thugEvent.pressureFactionId || '(blank)'}`);
}

function getCustomerDataRejectionReasons(character) {
  const reasons = [];
  const traits = getTraits(character.id);
  const pools = CHARACTER_ITEM_POOLS.filter(pool => pool.characterId === character.id);
  const events = EVENT_BLUEPRINTS.filter(event => event.characterId === character.id);
  const usablePools = pools.filter(pool => {
    const itemExists = !pool.itemId || Boolean(getItem(pool.itemId));
    const weighted = poolWeight(pool) > 0;
    const hasStartingPath = pool.dealType === 'sell_to_shop' || poolMatchesInventory(pool);
    return itemExists && weighted && hasStartingPath;
  });

  if (!character.id) reasons.push('missing character id');
  if (!character.displayName) reasons.push('missing display name');
  if (!character.spritePath) reasons.push('missing sprite path');
  validateCustomerFacing(character, reasons);
  if (!traits.characterId) reasons.push(`missing commerce trait reference for "${character.id}"`);
  if (!pools.length) reasons.push('missing item-pool rows');
  if (!events.length) reasons.push('missing event blueprint rows');
  pools.forEach(pool => {
    if (pool.itemId && !getItem(pool.itemId)) reasons.push(`pool "${pool.id}" references missing item "${pool.itemId}"`);
    if (poolWeight(pool) <= 0) reasons.push(`pool "${pool.id}" is blocked by commerce weight`);
  });
  if (pools.length && !usablePools.length) reasons.push('no currently possible deal type');
  return reasons;
}

async function initializeNpcRotation() {
  validateGameData();
  const activeRows = CHARACTERS.filter(character => character.activeInRotation);
  const loaded = await Promise.all(activeRows.map(async character => {
    const reasons = getCustomerDataRejectionReasons(character);
    let bounds = null;

    if (character.spritePath) {
      try {
        bounds = await getNpcVisibleBounds(character.spritePath);
      } catch (error) {
        reasons.push(`sprite failed to load at ${character.spritePath}`);
      }
    }

    if (reasons.length) {
      console.warn(`[customer-validation] ${character.id || '(missing id)'} rejected: ${reasons.join('; ')}`);
      return null;
    }

    const customer = {
      ...character,
      baseSpriteKey: getBaseSpriteKey(character.spritePath),
      stageSide: getNpcSide(character.facing),
      spriteBounds: bounds
    };
    console.info(`[customer-validation] ${character.id} accepted: ${character.spritePath}`);
    return customer;
  }));
  activeCustomers = loaded.filter(Boolean);
  console.info(`[customer-validation] ${activeCustomers.length}/${activeRows.length} active customers valid`);
  if (!activeCustomers.length) console.error('No active NPC sprites could be loaded; rotation is empty.');
}

function layoutNpc(customer) {
  if (!customer || !customer.spriteBounds || !els.npcStage) return;
  const bounds = customer.spriteBounds;
  const stageWidth = els.npcStage.clientWidth;
  const stageHeight = els.npcStage.clientHeight;
  const anchorRatio = customer.stageSide === 'left' ? NPC_IDLE_ANCHOR_LEFT_X : NPC_IDLE_ANCHOR_RIGHT_X;
  const anchorX = Math.round(stageWidth * anchorRatio);
  const baselineY = Math.round(stageHeight * NPC_FEET_BASELINE);
  const image = els.customer.querySelector(".customer-visual");
  els.customer.style.left = `${anchorX}px`;
  els.customer.style.top = `${baselineY}px`;
  els.customer.style.setProperty("--npc-slide-distance", `${getNpcSlideDistance(customer, stageWidth, anchorX)}px`);
  if (image) {
    if (image.getAttribute("src") !== customer.spritePath) image.src = customer.spritePath;
    image.style.width = "auto";
    image.style.height = NPC_CUSTOMER_VISUAL_HEIGHT;
    image.style.left = getNpcVisualLeft(customer);
    image.style.top = NPC_CUSTOMER_VISUAL_TOP;
  }
  if (!npcSizingLogCache.has(customer.id)) {
    npcSizingLogCache.add(customer.id);
    console.info("[npc-sizing]", {
      id: customer.id,
      spritePath: customer.spritePath,
      rawImageSize: `${bounds.sourceWidth}x${bounds.sourceHeight}`,
      visibleBounds: {
        x: bounds.minX,
        y: bounds.minY,
        width: bounds.visibleWidth,
        height: bounds.visibleHeight
      },
      customerVisualStyle: {
        width: "auto",
        height: NPC_CUSTOMER_VISUAL_HEIGHT,
        left: getNpcVisualLeft(customer),
        top: NPC_CUSTOMER_VISUAL_TOP
      },
      finalPosition: {
        anchorX,
        baselineY
      }
    });
  }
}


function renderCustomer(phase = 'active', noTransition = false) {
  const customer = state.currentCustomer;
  const image = els.customer.querySelector('.customer-visual');
  if (!customer) {
    els.customer.className = 'npc-sprite';
    if (image) image.removeAttribute('src');
    els.speaker.textContent = 'Clerk';
    return;
  }
  layoutNpc(customer);
  const movementClass = phase === 'offstage'
    ? `npc-offstage-${customer.stageSide}`
    : phase === 'entering'
      ? 'npc-entering'
      : phase === 'exiting'
        ? `npc-exit-${customer.stageSide} npc-exiting`
        : 'npc-idle';
  els.customer.className = `npc-sprite ${customer.spriteClass || ''} ${movementClass}`.trim();
  els.customer.setAttribute('aria-label', `${customer.displayName} sprite`);
  els.speaker.textContent = customer.displayName;
}
function nextAnimationFrame() {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => window.requestAnimationFrame(resolve));
  });
}

function waitForNpcTransition(duration) {
  return new Promise(resolve => {
    const token = ++npcTransitionToken;
    let settled = false;
    const finish = () => {
      if (settled || token !== npcTransitionToken) return;
      settled = true;
      els.customer.removeEventListener('transitionend', onTransitionEnd);
      resolve();
    };
    const onTransitionEnd = event => {
      if (event.target === els.customer && event.propertyName === 'transform') finish();
    };
    els.customer.addEventListener('transitionend', onTransitionEnd);
    window.setTimeout(finish, duration + 80);
  });
}

async function enterCurrentCustomer() {
  state.isTransitioningCustomer = true;
  renderCustomer('offstage', true);
  await nextAnimationFrame();
  els.customer.getBoundingClientRect();
  renderCustomer('offstage');
  await nextAnimationFrame();
  renderCustomer('entering');
  await waitForNpcTransition(NPC_ENTRY_MS);
  renderCustomer('idle');
  state.isTransitioningCustomer = false;
}

async function exitCurrentCustomer() {
  if (!state.currentCustomer || state.isTransitioningCustomer) return;
  state.isTransitioningCustomer = true;
  renderCustomer('exiting');
  await waitForNpcTransition(NPC_EXIT_MS);
  state.currentCustomer = null;
  renderCustomer();
  state.isTransitioningCustomer = false;
}

function getDialogueProfile(characterId) {
  return NPC_DIALOGUE_PROFILES[characterId] || NEUTRAL_DIALOGUE_PROFILE;
}

function pickDialogueLine(lines) {
  const options = Array.isArray(lines) && lines.length ? lines : NEUTRAL_DIALOGUE_PROFILE.intro;
  return options[randomInt(0, options.length - 1)];
}

function getDealPriceText(deal) {
  if (isShopBuying(deal.dealType)) return moneyText(deal.askingPrice ?? deal.askPrice);
  if (isNpcBuying(deal.dealType)) return moneyText(deal.salePrice);
  if (deal.cashAdjustment > 0) return `${moneyText(deal.cashAdjustment)} plus trade`;
  if (deal.cashAdjustment < 0) return `${moneyText(Math.abs(deal.cashAdjustment))} back with trade`;
  return 'straight trade';
}

function buildDialogueContext(deal) {
  const item = deal.item || {};
  return {
    item: dealItemLabel(item),
    requestedItemType: deal.requestedItemType || dealItemLabel(item),
    quantity: item.quantity || item.count || 1,
    condition: deal.pool.conditionOverride || item.condition || 'unknown',
    price: getDealPriceText(deal),
    askingPrice: moneyText(deal.askingPrice ?? deal.askPrice ?? 0),
    offerPrice: isNpcBuying(deal.dealType) ? moneyText(deal.salePrice || 0) : moneyText(deal.actualOffer ?? deal.defaultOffer ?? deal.askPrice ?? 0),
    resaleValue: moneyText(item.targetSellPrice || item.baseValue || deal.salePrice || deal.askPrice || 0),
    lowballPrice: moneyText(deal.lowballPrice ?? 0),
    tags: (item.tags || []).join(', ') || 'none'
  };
}

function applyDialogueTemplate(template, context) {
  return String(template || '').replace(/\{(\w+)\}/g, (match, key) => context[key] ?? match);
}

function customerDialogue(kind, deal) {
  const profile = getDialogueProfile(deal.customer?.id);
  return applyDialogueTemplate(pickDialogueLine(profile[kind] || NEUTRAL_DIALOGUE_PROFILE[kind]), buildDialogueContext(deal));
}

function getCustomerReactionKind(action, outcome, deal) {
  if (action === 'lowball') return outcome === 'succeeded' ? 'accept' : 'lowball';
  if (action === 'refuse') return 'reject';
  if (action === 'tradeAccept' || action === 'tradeCash' || action === 'submitTradeOffer') return outcome === 'succeeded' ? 'trade' : 'reject';
  if (action === 'markup') return outcome === 'succeeded' ? 'accept' : 'reject';
  return 'accept';
}

function customerBuyRequestLine(deal) {
  if (deal.blueprint?.dialogue) return deal.blueprint.dialogue;
  const request = deal.requestedItemType || 'item';
  if (request === 'jewelry') return 'Got any jewelry?';
  if (request === 'watch') return 'I am looking for a watch.';
  if (request === 'consoles' || request === 'console') return 'Show me whatever consoles you have got.';
  return `I am looking for ${getCustomerBuyRequestPhrase(deal)}.`;
}

function clerkAssessment(deal) {
  const item = deal.item;
  if (isNpcBuying(deal.dealType) && !deal.selectedInventoryInstanceId) {
    const request = deal.requestedItemType || 'item';
    if (!deal.requestSatisfiable) return `Customer wants to buy ${getCustomerBuyRequestPhrase(deal)}. You do not have any ${request} in inventory.`;
    return `Customer wants to buy ${getCustomerBuyRequestPhrase(deal)}. ${deal.eligibleInventoryInstanceIds.length} shelf item${deal.eligibleInventoryInstanceIds.length === 1 ? '' : 's'} could work.`;
  }

  const tags = (item.tags || []).length ? item.tags.join(', ') : 'none';
  const risk = deal.pool.riskNote ? ` Risk: ${deal.pool.riskNote}.` : '';
  const resale = moneyText(item.targetSellPrice || item.baseValue || deal.salePrice || deal.askPrice || 0);
  if (isShopBuying(deal.dealType)) {
    return `Assessment: ${dealItemLabel(item)} is ${deal.pool.conditionOverride || item.condition}, resale around ${resale}, heat ${item.heat}/10, tags: ${tags}.${risk}`;
  }
  if (isNpcBuying(deal.dealType)) {
    const cost = deal.inventoryItem ? moneyText(deal.inventoryItem.acquisitionCost) : 'unknown';
    return `Assessment: shelf item is ${deal.pool.conditionOverride || item.condition}, cost ${cost}, target resale ${resale}, heat ${item.heat}/10, tags: ${tags}.${risk}`;
  }
  const request = deal.requestedInventoryItem ? ` Wants your ${dealItemLabel(deal.requestedInventoryItem)}.` : ' No matching shelf item required.';
  return `Assessment: offered item is ${deal.pool.conditionOverride || item.condition}, resale around ${resale}, heat ${item.heat}/10, tags: ${tags}.${request}${risk}`;
}
function setDialogueSpeaker(speaker) {
  els.speaker.textContent = speaker === 'clerk' ? 'Clerk' : (state.currentCustomer?.displayName || 'Customer');
}

function showConversationLine(line) {
  if (!line) return;
  setDialogueSpeaker(line.speaker);
  typeLine(line.text);
}

function shouldShowDealInfo() {
  return ['choices', 'resolved', 'exiting'].includes(state.conversation?.phase);
}

function renderDialogueVisibility() {
  const showDeal = shouldShowDealInfo();
  const dealBox = els.dealText?.closest('.dialogue-deal');
  if (dealBox) dealBox.hidden = !showDeal;
  updateDialogueNextIndicator();
}

function buildConsequenceIntroConversation(deal) {
  if (deal.dealType === THUG_CONSEQUENCE_TYPE) {
    return [
      { speaker: 'customer', text: deal.blueprint?.dialogue || 'Nice little counter. Shame if bad math happened to it.' },
      { speaker: 'customer', text: 'You made some noise with the wrong people. Cash, merchandise, or pride. Pick one to lose.' },
      { speaker: 'clerk', text: 'This is a robbery dressed as customer service. Choose what leaves the shop.' }
    ];
  }
  const focus = deal.targetInventoryItem ? `${deal.targetInventoryItem.name} on your shelf` : 'some unusual inventory activity';
  return [
    { speaker: 'customer', text: deal.blueprint?.dialogue || 'Got a couple questions about the merchandise moving through here.' },
    { speaker: 'customer', text: `This is about ${focus}. I am giving you one chance to keep this simple.` },
    { speaker: 'clerk', text: 'The officer is waiting. Choose carefully.' }
  ];
}

function buildIntroConversation(deal) {
  if (isConsequenceDeal(deal.dealType)) return buildConsequenceIntroConversation(deal);
  const itemLine = isNpcBuying(deal.dealType) && !deal.selectedInventoryInstanceId ? customerBuyRequestLine(deal) : deal.blueprint?.dialogue || customerDialogue('item', deal);
  return [
    { speaker: 'customer', text: customerDialogue('intro', deal) },
    { speaker: 'customer', text: itemLine },
    { speaker: 'clerk', text: clerkAssessment(deal) }
  ];
}
function startDealConversation() {
  resetAutoProgress();
  const deal = state.currentDeal;
  state.conversation = {
    phase: 'intro',
    lines: buildIntroConversation(deal),
    index: 0,
    selectedAction: null,
    outcome: null
  };
  renderLog(deal.blueprint ? `${deal.pool.notes} ${deal.blueprint.resultNotes}` : deal.pool.notes);
  renderAll();
  showConversationLine(state.conversation.lines[0]);
}

function advanceConversation(isAutomatic = false) {
  isAutomatic = isAutomatic === true;
  if (state.isGameOver || !state.conversation || state.isTransitioningCustomer) return;
  const convo = state.conversation;
  if (!isAutomatic && !canAdvanceConversationManually()) return;

  if (convo.phase === 'intro') {
    if (isAutomatic || state.isResolving) return;
    if (convo.index < convo.lines.length - 1) {
      convo.index += 1;
      showConversationLine(convo.lines[convo.index]);
      return;
    }
    convo.phase = 'choices';
    setDialogueSpeaker('clerk');
    typeLine('Choose the play.');
    renderAll();
    return;
  }

  if (convo.phase === 'resolved') {
    if (!isAutomatic || isTypingLine) return;
    if (convo.index < convo.lines.length - 1) {
      convo.index += 1;
      showConversationLine(convo.lines[convo.index]);
      return;
    }
    convo.phase = 'exiting';
    updateDialogueNextIndicator();
    clearAutoProgressTimer();
    const token = autoProgressToken;
    autoProgressTimer = window.setTimeout(() => {
      autoProgressTimer = 0;
      if (token !== autoProgressToken || state.conversation !== convo) return;
      exitCustomer();
    }, CONVERSATION_EXIT_DELAY_MS);
  }
}
function dealItemLabel(item) {
  const quantity = item.quantity || item.count || 1;
  const name = quantity > 1 && !/s$/i.test(item.name) ? `${item.name}s` : item.name;
  return quantity > 1 ? `${quantity} ${name}` : name;
}

function renderDeal() {
  const deal = state.currentDeal;
  if (!deal) {
    els.dealText.textContent = 'The counter is quiet. That usually means trouble is parking.';
    return;
  }

  const item = deal.item;
  const itemLabel = dealItemLabel(item);
  if (isConsequenceDeal(deal.dealType)) {
    if (deal.dealType === THUG_CONSEQUENCE_TYPE) {
      const itemText = deal.stolenItemCandidate ? `${deal.stolenItemCandidate.name} [${deal.stolenItemCandidate.instanceId}]` : 'no valid shelf item';
      els.dealText.textContent = `Robbery consequence: tracksuit crew pressure came due. Cash payoff ${moneyText(getThugCashLossAmount(THUG_CASH_HANDOVER_RATE, THUG_CASH_HANDOVER_MIN))}. Item option: ${itemText}.`;
      return;
    }
    const target = deal.targetInventoryItem ? `${deal.targetInventoryItem.name} [${deal.targetInventoryItem.instanceId}]` : 'suspicious inventory';
    els.dealText.textContent = `Consequence: ${deal.consequence.reason}. Focus: ${target}. Bribe ${moneyText(deal.bribeAmount)}.`;
  } else if (isShopBuying(deal.dealType)) {
    const ask = deal.askingPrice ?? deal.askPrice;
    const offerNote = deal.availableCash <= 0
      ? ' No cash to offer.'
      : deal.defaultOffer > deal.availableCash
        ? ` Max offer ${moneyText(deal.actualOffer)}.`
        : '';
    els.dealText.textContent = `${itemLabel}: asks ${moneyText(ask)}.${offerNote} ${item.condition}. Heat ${item.heat}/10.`;
  } else if (isNpcBuying(deal.dealType)) {
    if (!deal.requestSatisfiable) {
      els.dealText.textContent = `Customer wants to buy ${getCustomerBuyRequestPhrase(deal)}. You do not have any ${deal.requestedItemType} in inventory.`;
    } else if (!deal.selectedInventoryInstanceId) {
      els.dealText.textContent = `Customer wants to buy ${getCustomerBuyRequestPhrase(deal)}. Select an item before pricing the sale.`;
    } else {
      els.dealText.textContent = `${itemLabel}: tag ${moneyText(deal.salePrice)}. Acquired for ${moneyText(deal.inventoryItem.acquisitionCost)}.`;
    }
  } else {
    const selectedTradeItems = getSelectedTradeInventoryItems(deal);
    const request = selectedTradeItems.length
      ? ` for ${selectedTradeItems.map(item => `${dealItemLabel(item)} [${item.instanceId}]`).join(', ')}`
      : deal.pool?.requestedItemTags?.length ? ` for your ${deal.pool.requestedItemTags.join('/')} inventory` : '';
    const cash = deal.cashAdjustment === 0 ? '' : ` Cash adjustment ${moneyText(Math.abs(deal.cashAdjustment))} ${deal.cashAdjustment > 0 ? 'from you' : 'to you'}.`;
    const offer = selectedTradeItems.length ? ` Your offer value about ${moneyText(getTradePlayerOfferValue(deal))}.` : '';
    els.dealText.textContent = `${itemLabel}${request}: customer-side value around ${moneyText(getTradeRequestedValue(deal))}.${cash}${offer} ${deal.pool.riskNote}.`;
  }
}

function getFullOfferLabel(deal) {
  if (!isShopBuying(deal.dealType)) return `Buy for ${moneyText(deal.askingPrice ?? deal.askPrice)}`;
  return `Buy for ${moneyText(deal.defaultOffer ?? deal.askingPrice ?? deal.askPrice)}`;
}

function getLowballOfferLabel(deal) {
  const offer = deal.lowballPrice ?? deal.actualOffer ?? 0;
  return deal.defaultOffer > deal.availableCash ? `Offer ${moneyText(offer)}` : `Lowball ${moneyText(offer)}`;
}

function openInventorySelection() {
  const deal = state.currentDeal;
  if (!deal || !isNpcBuying(deal.dealType) || deal.resolvedAction || !deal.requestSatisfiable || deal.selectedInventoryInstanceId) return;
  state.inventorySelection.active = true;
  state.inventorySelection.encounterId = deal.encounterId;
  state.inventorySelection.mode = 'sale';
  state.inventorySelection.selectedInstanceIds = [];
  renderLog('Select an item to offer. Ineligible shelf items stay dim.');
  setLowerPanel('inventory');
  renderAll();
}

function clearInventorySelection() {
  state.inventorySelection.active = false;
  state.inventorySelection.encounterId = null;
  state.inventorySelection.mode = null;
  state.inventorySelection.selectedInstanceIds = [];
}

function cancelInventorySelection() {
  const wasActive = state.inventorySelection.active;
  const deal = getInventorySelectionDeal();
  const mode = state.inventorySelection.mode;
  if (deal?.dealType === 'trade' && mode === 'trade') {
    appendTradeHistory(deal, `Trade selection cancelled: selected [${state.inventorySelection.selectedInstanceIds.join(', ') || 'none'}]; outcome cancelled; no inventory or money changed.`);
    deal.selectedTradeInventoryInstanceIds = [];
    deal.requestedInventoryItems = [];
    deal.requestedInventoryItem = null;
  }
  clearInventorySelection();
  if (wasActive) renderLog('Selection canceled. Nothing changes hands.');
  setInventoryOpen(false);
  renderAll();
}

function openTradeSelection() {
  const deal = state.currentDeal;
  if (!deal || deal.dealType !== 'trade' || deal.resolvedAction) return;
  state.inventorySelection.active = true;
  state.inventorySelection.encounterId = deal.encounterId;
  state.inventorySelection.mode = 'trade';
  state.inventorySelection.selectedInstanceIds = Array.isArray(deal.selectedTradeInventoryInstanceIds)
    ? deal.selectedTradeInventoryInstanceIds.filter(id => state.inventory.some(item => item.instanceId === id))
    : [];
  appendTradeHistory(deal, `Trade selection opened: eligible [${getEligibleTradeInventoryItems(deal).map(item => item.instanceId).join(', ') || 'none'}].`);
  renderLog(getTradeSelectionSummary(deal) || 'Select trade items from eligible inventory.');
  setLowerPanel('inventory');
  renderAll();
}

function toggleTradeInventorySelection(deal, instanceId) {
  if (!deal || deal.dealType !== 'trade' || !state.inventorySelection.active || state.inventorySelection.mode !== 'trade') return;
  const inventoryItem = state.inventory.find(item => item.instanceId === instanceId) || null;
  if (!inventoryItem || !isInventoryItemEligibleForTrade(deal, inventoryItem)) {
    appendTradeHistory(deal, `Trade selection rejected unavailable/ineligible instance [${instanceId || 'missing'}].`);
    renderLog('That item is not eligible for this trade.');
    return;
  }
  const selected = state.inventorySelection.selectedInstanceIds;
  const index = selected.indexOf(instanceId);
  if (index >= 0) selected.splice(index, 1);
  else selected.push(instanceId);
  deal.selectedTradeInventoryInstanceIds = [...selected];
  deal.requestedInventoryItems = getSelectedTradeInventoryItems(deal);
  deal.requestedInventoryItem = deal.requestedInventoryItems[0] || null;
  renderLog(getTradeSelectionSummary(deal));
  renderAll();
}

function selectInventoryItemForDeal(deal, instanceId) {
  const selectionDeal = getInventorySelectionDeal();
  if (!selectionDeal || selectionDeal !== deal || selectionDeal.encounterId !== state.inventorySelection.encounterId) return;
  const validation = validateSaleSelection(deal, instanceId);
  if (!validation.valid) {
    const selectedLabel = validation.inventoryItem ? `${validation.inventoryItem.itemId} [${validation.inventoryItem.instanceId}]` : `[${instanceId || 'missing'}]`;
    appendSaleHistory(deal, `Buyer rejected ${selectedLabel}: requested ${getCustomerBuyRequestPhrase(deal)}; ${validation.reason}.`);
    setDialogueSpeaker('customer');
    typeLine(getSaleRejectionDialogue(validation.reason));
    renderLog(`Rejected: ${validation.reason}. Select another item or refuse the sale.`);
    renderAll();
    return;
  }
  const inventoryItem = validation.inventoryItem;
  appendSaleHistory(deal, `Sale selection: requested ${getCustomerBuyRequestPhrase(deal)}; selected ${inventoryItem.itemId} [${inventoryItem.instanceId}]; matched request: yes; ${validation.reason}.`);
  applySelectedInventoryItemToDeal(deal, inventoryItem);
  clearInventorySelection();
  setInventoryOpen(false);
  setDialogueSpeaker('customer');
  typeLine(`Let me see that ${dealItemLabel(inventoryItem)}.`);
  renderAll();
  renderLog(getInventoryDetail(inventoryItem));
}

function renderChoices() {
  els.choices.innerHTML = '';
  const deal = state.currentDeal;
  const showChoices = Boolean(
    deal &&
    !state.isGameOver &&
    state.conversation?.phase === 'choices' &&
    !state.isResolving &&
    !deal.resolvedAction
  );

  els.choices.hidden = !showChoices;
  els.bottomHud?.classList.toggle('choices-active', showChoices);
  if (!showChoices) return;

  let choices;
  if (isConsequenceDeal(deal.dealType)) {
    if (deal.dealType === THUG_CONSEQUENCE_TYPE) {
      choices = [
        { label: `Hand over ${moneyText(getThugCashLossAmount(THUG_CASH_HANDOVER_RATE, THUG_CASH_HANDOVER_MIN))}`, action: 'thugCash' },
        { label: 'Give up an item', action: 'thugItem', disabled: !getThugInventoryTarget() },
        { label: 'Refuse', action: 'thugRefuse' }
      ];
    } else {
      choices = [
        { label: 'Cooperate', action: 'copCooperate' },
        { label: 'Deny everything', action: 'copDeny' },
        { label: `Offer ${moneyText(deal.bribeAmount)} bribe`, action: 'copBribe', disabled: deal.bribeAmount > state.money }
      ];
    }
  } else if (isShopBuying(deal.dealType)) {
    const canBuyFullPrice = deal.availableCash >= deal.defaultOffer;
    const canMakeLowball = deal.lowballPrice > 0;
    choices = [
      { label: getFullOfferLabel(deal), action: 'buyAsk', disabled: !canBuyFullPrice },
      { label: getLowballOfferLabel(deal), action: 'lowball', disabled: !canMakeLowball || deal.lowballRejected },
      { label: 'Refuse the item', action: 'refuse' }
    ];
  } else if (isNpcBuying(deal.dealType)) {
    if (state.inventorySelection.active && state.inventorySelection.encounterId === deal.encounterId) {
      choices = [
        { label: 'Cancel selection', action: 'cancelSelection' },
        { label: 'Refuse the sale', action: 'refuse' }
      ];
    } else if (!deal.selectedInventoryInstanceId) {
      choices = deal.requestSatisfiable
        ? [
            { label: 'Select from inventory', action: 'selectInventory' },
            { label: 'Refuse the sale', action: 'refuse' }
          ]
        : [
            { label: 'Refuse the sale', action: 'refuse' }
          ];
    } else {
      choices = [
        { label: `Sell for ${moneyText(deal.salePrice)}`, action: 'sellTag' },
        { label: `Mark up to ${moneyText(deal.markupPrice)}`, action: 'markup', disabled: deal.markupRejected },
        { label: 'Refuse the sale', action: 'refuse' }
      ];
    }
  } else {
    if (state.inventorySelection.active && state.inventorySelection.encounterId === deal.encounterId && state.inventorySelection.mode === 'trade') {
      const evaluation = evaluateTradeOffer(deal);
      choices = [
        { label: 'Submit trade offer', action: 'submitTradeOffer', disabled: !evaluation.canSubmit },
        { label: 'Cancel selection', action: 'cancelSelection' },
        { label: 'No deal', action: 'refuse' }
      ];
    } else {
      choices = [
        { label: 'Select trade items', action: 'selectTradeItems' },
        { label: `Demand ${moneyText(deal.cashInstead)}`, action: 'tradeCash' },
        { label: 'No deal', action: 'refuse' }
      ];
    }
  }

  const canChoose = true;
  choices.forEach(choice => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = choice.label;
    button.disabled = !canChoose || choice.disabled === true;
    if (!button.disabled) {
      button.addEventListener('click', event => {
        event.stopPropagation();
        if (choice.action === 'selectInventory') openInventorySelection();
        else if (choice.action === 'selectTradeItems') openTradeSelection();
        else if (choice.action === 'cancelSelection') cancelInventorySelection();
        else resolveChoice(choice.action);
      });
    }
    els.choices.appendChild(button);
  });
}
function renderLog(text) {
  els.log.textContent = text;
}

function renderAll() {
  renderStats();
  renderInventory();
  renderDeal();
  renderChoices();
  renderDialogueVisibility();
}

function choiceResult(text, options = {}) {
  return {
    text,
    runRiskCheck: options.runRiskCheck !== false,
    keepEncounterOpen: options.keepEncounterOpen === true
  };
}

function clearDealTransaction(deal) {
  if (deal) deal.transaction = null;
}

function getConsequenceEvent(type) {
  const eventId = type === COP_CONSEQUENCE_TYPE
    ? COP_CONSEQUENCE_EVENT_ID
    : type === THUG_CONSEQUENCE_TYPE
      ? THUG_CONSEQUENCE_EVENT_ID
      : '';
  return EVENT_BLUEPRINTS.find(event => event.eventType === type || (eventId && event.id === eventId)) || null;
}

function validateQueuedConsequence(consequence) {
  const errors = [];
  if (!consequence || typeof consequence !== 'object') return ['consequence is not an object'];
  if (!consequence.id) errors.push('missing consequence id');
  if (!consequence.type) errors.push('missing consequence type');
  if (!Number.isFinite(Number(consequence.sourceTurn))) errors.push('missing source turn');
  if (!Number.isFinite(Number(consequence.earliestTurn))) errors.push('missing earliest eligible turn');
  if (consequence.resolved === true) errors.push('already resolved');
  if (consequence.type === COP_CONSEQUENCE_TYPE && !getConsequenceEvent(COP_CONSEQUENCE_TYPE)) errors.push(`missing consequence event definition ${COP_CONSEQUENCE_EVENT_ID}`);
  if (consequence.type === THUG_CONSEQUENCE_TYPE) {
    const event = getConsequenceEvent(THUG_CONSEQUENCE_TYPE);
    if (!event) errors.push(`missing consequence event definition ${THUG_CONSEQUENCE_EVENT_ID}`);
    const factionId = normalizeFactionId(consequence.factionId || consequence.metadata?.factionId || event?.pressureFactionId);
    if (factionId !== TRACKSUIT_CREW_FACTION_ID) errors.push(`tracksuit consequence faction mismatch: expected ${TRACKSUIT_CREW_FACTION_ID}, got ${factionId || '(blank)'}`);
  }
  return errors;
}

function getConsequenceQueue() {
  if (!Array.isArray(state.consequenceQueue)) {
    state.consequenceQueue = [];
  }
  return state.consequenceQueue;
}

function deriveCopInvestigationCheckpoint(currentCopRisk) {
  const normalizedRisk = Math.max(0, Number(currentCopRisk) || 0);
  const nextDefined = COP_INVESTIGATION_CHECKPOINTS.find(checkpoint => checkpoint > normalizedRisk);
  if (nextDefined) return nextDefined;
  return COP_INVESTIGATION_CHECKPOINTS.at(-1) +
    (Math.floor((normalizedRisk - COP_INVESTIGATION_CHECKPOINTS.at(-1)) / 35) + 1) * 35;
}

function getNextCopInvestigationCheckpoint(checkpoint) {
  const index = COP_INVESTIGATION_CHECKPOINTS.indexOf(checkpoint);
  return index >= 0 && index < COP_INVESTIGATION_CHECKPOINTS.length - 1
    ? COP_INVESTIGATION_CHECKPOINTS[index + 1]
    : checkpoint + 35;
}

function normalizeConsequenceState() {
  const queue = getConsequenceQueue();
  if (!Number.isFinite(Number(state.consequenceSerial))) state.consequenceSerial = 0;
  if (!Number.isFinite(Number(state.copConsequenceCooldownUntil))) state.copConsequenceCooldownUntil = 0;
  if (!Number.isFinite(Number(state.thugConsequenceCooldownUntil))) state.thugConsequenceCooldownUntil = 0;
  if (!Object.prototype.hasOwnProperty.call(state, 'activeConsequence')) state.activeConsequence = null;
  if (!state.factionPressure || typeof state.factionPressure !== 'object') state.factionPressure = {};
  if (Number.isFinite(Number(state.thugRisk)) && Number(state.thugRisk) > 0 && !state.factionPressure[TRACKSUIT_CREW_FACTION_ID]) {
    state.factionPressure[TRACKSUIT_CREW_FACTION_ID] = Math.max(0, Math.floor(Number(state.thugRisk)));
    console.info(`[faction-pressure] Migrated legacy thugRisk ${state.thugRisk} to ${TRACKSUIT_CREW_FACTION_ID} pressure.`);
  }
  delete state.thugRisk;
  if (!Number.isFinite(Number(state.factionPressure[TRACKSUIT_CREW_FACTION_ID]))) state.factionPressure[TRACKSUIT_CREW_FACTION_ID] = 0;
  if (!state.factionPressureSources || typeof state.factionPressureSources !== 'object') state.factionPressureSources = {};
  getFactionPressureSources(TRACKSUIT_CREW_FACTION_ID);

  const checkpoint = Number(state.nextCopInvestigationRisk);
  if (!Number.isFinite(checkpoint) || !Number.isInteger(checkpoint) || checkpoint < COP_INVESTIGATION_CHECKPOINTS[0]) {
    const normalizedCheckpoint = deriveCopInvestigationCheckpoint(state.copRisk);
    state.nextCopInvestigationRisk = normalizedCheckpoint;
    state.copInvestigationNormalizationLog =
      `Cop investigation checkpoint normalized from legacy state: risk ${state.copRisk}, next checkpoint ${normalizedCheckpoint}.`;
    console.info(`[consequence] ${state.copInvestigationNormalizationLog}`);
  }

  if (typeof state.copInvestigationArmed !== 'boolean') {
    const unresolvedRealInvestigation = queue.some(consequence =>
      consequence?.type === COP_CONSEQUENCE_TYPE &&
      consequence.resolved !== true &&
      !consequence.metadata?.debug
    ) || (
      state.activeConsequence?.type === COP_CONSEQUENCE_TYPE &&
      !state.activeConsequence.metadata?.debug
    );
    state.copInvestigationArmed = !unresolvedRealInvestigation;
  }
  if (typeof state.copInvestigationNormalizationLog !== 'string') {
    state.copInvestigationNormalizationLog = '';
  }
  if (!Number.isFinite(Number(state.normalEncountersSinceSpecial))) state.normalEncountersSinceSpecial = SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS;
  if (!Array.isArray(state.normalCustomerHistory)) state.normalCustomerHistory = [];
  state.normalCustomerHistory = state.normalCustomerHistory.filter(id => typeof id === 'string').slice(0, NORMAL_CUSTOMER_HISTORY_LIMIT);
  if (!Number.isFinite(Number(state.copWarnings))) state.copWarnings = 0;
  if (!Number.isFinite(Number(state.copStrikes))) state.copStrikes = 0;
}

function hasPendingConsequence(type) {
  return getConsequenceQueue().some(consequence => consequence && typeof consequence === 'object' && consequence.type === type && consequence.resolved !== true && validateQueuedConsequence(consequence).length === 0);
}

function queueConsequence(details) {
  normalizeConsequenceState();
  const consequence = {
    id: details.id || `consequence_${String(++state.consequenceSerial).padStart(4, '0')}`,
    type: details.type,
    sourceTurn: Number(details.sourceTurn ?? state.turn),
    triggeringCharacterId: details.triggeringCharacterId || null,
    triggeringDealId: details.triggeringDealId || null,
    triggeringItemId: details.triggeringItemId || null,
    triggeringInventoryInstanceId: details.triggeringInventoryInstanceId || null,
    factionId: details.factionId || null,
    reason: details.reason || 'risk attracted attention',
    earliestTurn: Number(details.earliestTurn ?? state.turn + 1),
    resolved: false,
    metadata: details.metadata || {}
  };
  const errors = validateQueuedConsequence(consequence);
  if (errors.length) {
    console.error(`[consequence] malformed queued consequence: ${errors.join('; ')}`);
    return null;
  }
  getConsequenceQueue().push(consequence);
  return consequence;
}

function debugQueueCopConsequence() {
  const pending = getConsequenceQueue().find(consequence => consequence && typeof consequence === 'object' && consequence.type === COP_CONSEQUENCE_TYPE && consequence.resolved !== true && validateQueuedConsequence(consequence).length === 0);
  if (pending) {
    console.info(`[debug] Cop consequence already queued: ${pending.id}`);
    return pending;
  }

  const consequence = queueConsequence({
    type: COP_CONSEQUENCE_TYPE,
    sourceTurn: state.turn,
    triggeringCharacterId: state.currentCustomer?.id || null,
    triggeringDealId: state.currentDeal?.pool?.id || state.currentDeal?.blueprint?.id || null,
    triggeringItemId: getDealTriggerItemId(state.currentDeal),
    triggeringInventoryInstanceId: getDealTriggerInventoryInstanceId(state.currentDeal),
    reason: 'Development test: manually queued highway patrol visit',
    earliestTurn: state.turn + 1,
    metadata: { debug: true, delay: 1 }
  });
  if (consequence) console.info(`[debug] Queued ${consequence.id}; the cop will arrive next turn.`);
  return consequence;
}

function debugQueueThugConsequence() {
  const pending = getConsequenceQueue().find(consequence => consequence && typeof consequence === 'object' && consequence.type === THUG_CONSEQUENCE_TYPE && consequence.resolved !== true && validateQueuedConsequence(consequence).length === 0);
  if (pending) {
    console.info(`[debug] Thug consequence already queued: ${pending.id}`);
    return pending;
  }

  const consequence = queueThugConsequence('Development test: manually queued tracksuit thug visit', { debug: true });
  if (consequence) {
    consequence.earliestTurn = state.turn + 1;
    consequence.metadata.delay = 1;
    consequence.metadata.debugTriggeredAtPressure = getFactionPressure(TRACKSUIT_CREW_FACTION_ID);
    console.info(`[debug] Queued ${consequence.id}; the tracksuit thug will arrive next turn.`);
  }
  return consequence;
}

function cleanResolvedConsequences() {
  state.consequenceQueue = getConsequenceQueue().filter(consequence => !consequence || typeof consequence !== 'object' || consequence.resolved !== true);
}

function getEligibleQueuedConsequence() {
  const queue = getConsequenceQueue();
  for (let index = 0; index < queue.length; index += 1) {
    const consequence = queue[index];
    if (consequence && typeof consequence === 'object' && consequence.resolved === true) continue;
    const errors = validateQueuedConsequence(consequence);
    if (errors.length) {
      console.warn(`[consequence] Skipping malformed queue entry at index ${index}: ${errors.join('; ')}`);
      continue;
    }
    if (Number(consequence.earliestTurn) > state.turn) continue;
    const normalTurns = state.normalEncountersSinceSpecial;
    const emergency = consequence.type === COP_CONSEQUENCE_TYPE && state.copRisk >= COP_EMERGENCY_RISK && normalTurns >= 1;
    if (!emergency && normalTurns < SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS) continue;
    const eligibleTurn = normalTurns + 1;
    const selectionStep = 100 / (SPECIAL_ENCOUNTER_GUARANTEE_TURN - SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS);
    const selectionChance = emergency ? 100 : Math.min(100, (eligibleTurn - SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS) * selectionStep);
    consequence.metadata.eligibleSelectionChecks = (consequence.metadata.eligibleSelectionChecks || 0) + 1;
    if (chance(selectionChance)) {
      consequence.metadata.schedulingStatus = `selected with evidence eligible since T${consequence.earliestTurn}; shared cooldown satisfied (${normalTurns} normal encounters since previous special); selected on first eligible turn: ${consequence.metadata.eligibleSelectionChecks === 1 ? 'yes' : 'no'}; actual selection chance: ${selectionChance}%${emergency ? ' (emergency override)' : ''}`;
      return consequence;
    }
  }
  return null;
}

function markConsequenceResolved(consequence, result) {
  getConsequenceQueue();
  if (!consequence) return;
  if (consequence.resolved) {
    console.error(`[consequence] consequence resolved more than once: ${consequence.id}`);
    return;
  }
  consequence.resolved = true;
  consequence.resolvedTurn = state.turn;
  consequence.result = result;
}

function copyInventoryDebugItem(item) {
  return {
    instanceId: item.instanceId,
    itemId: item.itemId,
    name: item.name,
    condition: item.condition,
    tags: Array.isArray(item.tags) ? [...item.tags] : [],
    quantity: item.quantity,
    count: item.count,
    acquisitionCost: item.acquisitionCost,
    targetSellPrice: item.targetSellPrice,
    baseValue: item.baseValue,
    availability_tier: item.availability_tier,
    demand_level: item.demand_level,
    liquidity: item.liquidity,
    price_variance: item.price_variance,
    heat: item.heat,
    sourceCustomerId: item.sourceCustomerId,
    turnAcquired: item.turnAcquired,
    normalEncounterAcquired: item.normalEncounterAcquired,
    notes: item.notes
  };
}

function snapshotState() {
  return {
    money: state.money,
    reputation: state.reputation,
    profit: state.profit,
    copRisk: state.copRisk,
    factionPressure: { ...(state.factionPressure || {}) },
    scamRisk: state.scamRisk,
    inventory: state.inventory.map(copyInventoryDebugItem)
  };
}

function signedNumber(value, prefix = '') {
  const rounded = Math.round(value);
  if (rounded === 0) return `${prefix}0`;
  const sign = rounded > 0 ? '+' : '-';
  return `${sign}${prefix}${Math.abs(rounded)}`;
}

function formatDebugChange(label, before, after, formatter = value => String(value), prefix = '') {
  if (before === after) return '';
  return `${label}: ${formatter(before)} -> ${formatter(after)} (${signedNumber(after - before, prefix)})`;
}

function formatHistoryItem(item) {
  const cost = typeof item.acquisitionCost === 'number' ? `, cost ${moneyText(item.acquisitionCost)}` : '';
  const heat = typeof item.heat === 'number' ? `, heat ${item.heat}` : '';
  const acquired = Number.isFinite(Number(item.turnAcquired)) ? `, acquired T${item.turnAcquired}, held ${Math.max(0, state.turn - item.turnAcquired)} turns` : '';
  const normalHeld = Number.isFinite(Number(item.normalEncounterAcquired)) ? `, held normal ${Math.max(0, state.normalEncounterCount - item.normalEncounterAcquired)}` : '';
  return `${item.name} [${item.instanceId}${cost}${heat}${acquired}${normalHeld}]`;
}

function getInventoryDelta(before, after) {
  const beforeIds = new Set(before.inventory.map(item => item.instanceId));
  const afterIds = new Set(after.inventory.map(item => item.instanceId));
  return {
    added: after.inventory.filter(item => !beforeIds.has(item.instanceId)),
    removed: before.inventory.filter(item => !afterIds.has(item.instanceId))
  };
}

function getFactionPressureDeltaLines(before = {}, after = {}) {
  const beforePressure = before.factionPressure || {};
  const afterPressure = after.factionPressure || {};
  const factionIds = new Set([
    ...Object.keys(beforePressure),
    ...Object.keys(afterPressure)
  ]);
  const labels = {
    [TRACKSUIT_CREW_FACTION_ID]: 'Tracksuit Crew Pressure'
  };
  return [...factionIds]
    .sort()
    .map(factionId => formatDebugChange(
      labels[factionId] || `Faction Pressure (${factionId})`,
      Number(beforePressure[factionId]) || 0,
      Number(afterPressure[factionId]) || 0
    ))
    .filter(Boolean);
}

function getChoiceLabel(action, deal) {
  if (action === 'copCooperate') return 'Cooperate';
  if (action === 'copDeny') return 'Deny everything';
  if (action === 'copBribe') return `Offer ${moneyText(deal.bribeAmount)} bribe`;
  if (action === 'thugCash') return 'Hand over cash';
  if (action === 'thugItem') return 'Give up an item';
  if (action === 'thugRefuse') return 'Refuse';
  if (action === 'buyAsk') return getFullOfferLabel(deal);
  if (action === 'lowball') return getLowballOfferLabel(deal);
  if (action === 'sellTag') return `Sell for ${moneyText(deal.salePrice)}`;
  if (action === 'markup') return `Mark up to ${moneyText(deal.markupPrice)}`;
  if (action === 'tradeAccept') return 'Accept trade';
  if (action === 'submitTradeOffer') return 'Submit trade offer';
  if (action === 'tradeCash') return `Demand ${moneyText(deal.cashInstead)}`;
  if (action === 'refuse') return isNpcBuying(deal.dealType) ? 'Refuse the sale' : isShopBuying(deal.dealType) ? 'Refuse the item' : 'Refuse the trade';
  return action;
}

function classifyChoiceOutcome(action, deal, before, after) {
  const inventoryDelta = getInventoryDelta(before, after);
  if (isConsequenceDeal(deal.dealType)) return 'resolved';
  if (action === 'refuse') return 'rejected';
  if (isShopBuying(deal.dealType) && deal.transaction?.type === 'shop_purchase') return 'succeeded';
  if (action === 'lowball' && deal.lowballOutcome === 'insulted') return 'failed';
  if (action === 'lowball') return inventoryDelta.added.length ? 'succeeded' : 'rejected';
  if (action === 'buyAsk' || action === 'tradeAccept') return 'succeeded';
  if (action === 'submitTradeOffer') return inventoryDelta.added.length || inventoryDelta.removed.length ? 'succeeded' : deal.tradeOfferEndedEncounter ? 'failed' : 'rejected';
  if (action === 'sellTag' || action === 'markup') return inventoryDelta.removed.length ? 'succeeded' : 'failed';
  if (action === 'tradeCash') return after.money > before.money ? 'succeeded' : 'failed';
  return 'resolved';
}

function buildTransactionHistoryLines(deal) {
  if (!deal?.transaction) return [];
  if (deal.transaction.type === 'shop_purchase') {
    return [
      `Transaction: paid ${moneyText(deal.transaction.price)} for ${deal.transaction.itemName}`,
      `Inventory: + ${formatHistoryItem(deal.transaction.inventoryItem)}`
    ];
  }
  if (deal.transaction.type === 'trade') {
    return [
      `Trade Summary: ${deal.transaction.summary}`,
      ...deal.transaction.removedItems.map(item => `Inventory: - ${formatHistoryItem(item)}`),
      ...deal.transaction.addedItems.map(item => `Inventory: + ${formatHistoryItem(item)}`)
    ];
  }
  return [];
}

function buildHistoryLines(before, after, deal = null) {
  const inventoryDelta = getInventoryDelta(before, after);
  const lines = [
    formatDebugChange('Money', before.money, after.money, moneyText, '$'),
    formatDebugChange('Reputation', before.reputation, after.reputation),
    formatDebugChange('Profit', before.profit, after.profit, moneyText, '$'),
    formatDebugChange('Cop Risk', before.copRisk, after.copRisk),
    ...getFactionPressureDeltaLines(before, after),
    formatDebugChange('Scam Risk', before.scamRisk, after.scamRisk)
  ].filter(Boolean);

  const transactionInstanceIds = new Set();
  buildTransactionHistoryLines(deal).forEach(line => {
    lines.push(line);
    const match = line.match(/\[(inv_\d+)/);
    if (match) transactionInstanceIds.add(match[1]);
  });
  inventoryDelta.added
    .filter(item => !transactionInstanceIds.has(item.instanceId))
    .forEach(item => lines.push(`Inventory: + ${formatHistoryItem(item)}`));
  inventoryDelta.removed
    .filter(item => !transactionInstanceIds.has(item.instanceId))
    .forEach(item => lines.push(`Inventory: - ${formatHistoryItem(item)}`));
  (deal?.saleHistoryLines || []).forEach(line => lines.push(line));
  (deal?.negotiationHistoryLines || []).forEach(line => lines.push(line));
  (deal?.tradeHistoryLines || []).forEach(line => lines.push(line));
  (deal?.buybackCooldownHistoryLines || []).forEach(line => lines.push(line));
  (deal?.investigationHistoryLines || []).forEach(line => lines.push(line));
  (deal?.factionPressureHistoryLines || []).forEach(line => lines.push(line));
  (deal?.thugHistoryLines || []).forEach(line => lines.push(line));
  if (deal?.selectionDiagnostics && !isConsequenceDeal(deal.dealType)) lines.push(formatSelectionDiagnostics(deal.selectionDiagnostics));
  if (deal?.demandDiagnostics && isNpcBuying(deal.dealType)) lines.push(formatDemandDiagnostics(deal.demandDiagnostics));
  if (deal?.consequenceResult) lines.push(`Result: ${deal.consequenceResult}`);
  if (deal?.copRiskResolution) {
    const risk = deal.copRiskResolution;
    lines.push(`Cop Risk Resolution: ${risk.before} -> ${risk.after} (${signedNumber(risk.delta)}); ${risk.reason}`);
  }
  if (deal?.tracksuitPressureResolution) {
    const pressure = deal.tracksuitPressureResolution;
    lines.push(`Tracksuit Crew Pressure Resolution: ${pressure.before} -> ${pressure.after} (${signedNumber(pressure.delta)}); ${pressure.reason}`);
  }
  return lines.length ? lines : ['No state changes'];
}

function renderHistory() {
  if (!els.historyList) return;
  els.historyList.innerHTML = '';
  if (!turnHistory.length) {
    const empty = document.createElement('div');
    empty.className = 'history-empty';
    empty.textContent = 'No resolved choices yet.';
    els.historyList.appendChild(empty);
    return;
  }

  turnHistory.forEach(entry => {
    const item = document.createElement('article');
    item.className = 'history-entry';

    const meta = document.createElement('div');
    meta.className = 'history-meta';
    const title = document.createElement('strong');
    title.textContent = `T${entry.turn} ${entry.customer}`;
    meta.appendChild(title);
    meta.append(` | Deal: ${entry.dealType} | Choice: ${entry.choice} | Outcome: ${entry.outcome}`);
    item.appendChild(meta);

    const lines = document.createElement('div');
    lines.className = 'history-lines';
    entry.lines.forEach(line => {
      const row = document.createElement('div');
      row.textContent = line;
      lines.appendChild(row);
    });
    item.appendChild(lines);
    els.historyList.appendChild(item);
  });
}

function getConsequenceSourceLabel(consequence) {
  if (!consequence) return 'unknown';
  const item = consequence.triggeringItemId || consequence.triggeringInventoryInstanceId || 'risk';
  return `T${consequence.sourceTurn} ${item}`;
}

function recordTurnHistory(action, deal, before, after) {
  const customer = deal.customer?.displayName || deal.customer?.id || state.currentCustomer?.displayName || state.currentCustomer?.id || 'Unknown';
  const eventLabel = isConsequenceDeal(deal.dealType)
    ? `Consequence: ${deal.dealType} | Source: ${getConsequenceSourceLabel(deal.consequence)}`
    : deal.blueprint?.id ? `${deal.dealType}/${deal.blueprint.id}` : deal.dealType;
  const historyLines = buildHistoryLines(before, after, deal);
  turnHistory.unshift({
    turn: state.turn,
    customer,
    dealType: eventLabel,
    choice: getChoiceLabel(action, deal),
    outcome: classifyChoiceOutcome(action, deal, before, after),
    lines: historyLines
  });
  deal.saleHistoryLines = [];
  turnHistory = turnHistory.slice(0, TURN_HISTORY_LIMIT);
  renderHistory();
}

function createInventoryItem(item, acquisitionCost, sourceCustomerId, conditionOverride = '', notes = '') {
  inventorySerial += 1;
  const inventoryItem = {
    instanceId: `inv_${String(inventorySerial).padStart(4, '0')}`,
    itemId: item.itemId || item.id,
    name: item.name,
    category: item.category,
    condition: conditionOverride || item.condition,
    tags: [...item.tags],
    heat: item.heat,
    acquisitionCost,
    targetSellPrice: item.targetSellPrice,
    currentAskPrice: null,
    sourceCustomerId,
    turnAcquired: state.turn,
    normalEncounterAcquired: state.normalEncounterCount,
    notes,
    baseValue: item.baseValue,
    base_value: item.base_value ?? item.baseValue,
    shopBuyMin: item.shopBuyMin,
    shop_buy_min: item.shop_buy_min ?? item.shopBuyMin,
    shopBuyMax: item.shopBuyMax,
    shop_buy_max: item.shop_buy_max ?? item.shopBuyMax,
    target_sell_price: item.target_sell_price ?? item.targetSellPrice,
    default_condition: item.default_condition ?? item.condition,
    availability_tier: item.availability_tier ?? item.availabilityTier,
    availabilityTier: item.availabilityTier ?? item.availability_tier,
    demand_level: item.demand_level ?? item.demandLevel,
    demandLevel: item.demandLevel ?? item.demand_level,
    liquidity: item.liquidity || 'medium',
    price_variance: item.price_variance ?? item.priceVariance,
    priceVariance: item.priceVariance ?? item.price_variance,
    description: item.description
  };
  if (typeof item.quantity !== 'undefined') inventoryItem.quantity = item.quantity;
  if (typeof item.count !== 'undefined') inventoryItem.count = item.count;
  if (typeof item.instanceData !== 'undefined') inventoryItem.instanceData = structuredClone(item.instanceData);
  return inventoryItem;
}

function getCustomerBuyRequestTags(pool = {}) {
  return Array.isArray(pool.requestedItemTags) ? pool.requestedItemTags.filter(Boolean) : [];
}

function getCustomerBuyRequestLabel(pool = {}) {
  const item = getItem(pool.itemId);
  const tags = [...getCustomerBuyRequestTags(pool), item?.category, ...(item?.tags || [])].filter(Boolean);
  const priorityTag = CUSTOMER_BUY_REQUEST_PRIORITY.find(tag => tags.includes(tag));
  if (priorityTag) return CUSTOMER_BUY_REQUEST_LABELS[priorityTag] || priorityTag.replace(/_/g, ' ');
  if (item?.category) return item.category.replace(/_/g, ' ');
  if (tags[0]) return tags[0].replace(/_/g, ' ');
  return item?.name || 'item';
}


function getCustomerBuyRequestPhrase(deal) {
  const request = deal.requestedItemType || 'item';
  return ['jewelry', 'electronics', 'tools', 'collectibles', 'instruments', 'consoles'].includes(request)
    ? `some ${request}`
    : `${/^[aeiou]/i.test(request) ? 'an' : 'a'} ${request}`;
}

function getCustomerBuyAcceptedTags(encounter) {
  const requiredTags = encounter.requiredTags || getCustomerBuyRequestTags(encounter.pool);
  const requestTypeTags = new Set(Object.keys(CUSTOMER_BUY_REQUEST_LABELS));
  const acceptedTypeTags = requiredTags.filter(tag => requestTypeTags.has(tag));
  if (acceptedTypeTags.length) return acceptedTypeTags;
  const requestedItem = getItem(encounter.requestedItemId || encounter.pool?.itemId);
  if (requestedItem?.category && CUSTOMER_BUY_REQUEST_LABELS[requestedItem.category]) return [requestedItem.category];
  return requiredTags;
}

function normalizeTags(tags = []) {
  return [...new Set(tags.filter(Boolean).map(tag => String(tag).trim()).filter(Boolean))];
}

function getSaleCompatibilityContext(deal) {
  const requestedItem = getItem(deal?.requestedItemId || deal?.pool?.itemId);
  const requiredTags = normalizeTags(deal?.requiredTags || getCustomerBuyRequestTags(deal?.pool));
  const traits = deal?.traits || getTraits(deal?.customer?.id || deal?.pool?.characterId);
  const customer = deal?.customer || getCharacter(deal?.pool?.characterId);
  return {
    requestedItem,
    requestedCategory: requestedItem?.category || null,
    requiredTags,
    traitInterestTags: normalizeTags(traits?.buyInterestTags || []),
    excludedTags: normalizeTags(deal?.excludedTags || traits?.avoidTags || []),
    riskTolerance: Number(traits?.riskTolerance) || 0,
    customer
  };
}

function hasCompatibleSelectiveInterest(selectiveTags, context) {
  const requestedAndPreferred = new Set([
    ...(context.requiredTags || []),
    ...(context.traitInterestTags || [])
  ]);
  if ([...selectiveTags].some(tag => requestedAndPreferred.has(tag))) return true;
  if (selectiveTags.has('possibly_fake') && requestedAndPreferred.has('fake')) return true;
  if (selectiveTags.has('fake') && requestedAndPreferred.has('possibly_fake')) return true;
  if ((selectiveTags.has('hot') || selectiveTags.has('stolen') || selectiveTags.has('suspicious')) && context.riskTolerance >= 4) return true;
  if ((selectiveTags.has('broken') || selectiveTags.has('junk')) && (requestedAndPreferred.has('repairable') || requestedAndPreferred.has('junk'))) return true;
  return false;
}

function getSaleRejectionDialogue(reason) {
  if (/wrong item type/.test(reason)) return 'I said a type, not a museum of almosts. Show me the right shelf.';
  if (/missing preferred tag/.test(reason)) return 'That is close enough to waste both our time, not close enough to buy.';
  if (/condition/.test(reason)) return 'That condition is doing too much explaining. I will pass.';
  if (/hot|suspicious|stolen|fake/.test(reason)) return 'I am not buying trouble just because it fits in a bag.';
  if (/low-demand|niche|liquidity/.test(reason)) return 'That is too niche for me. I need something that moves.';
  return 'No. That is not the thing I came in asking for.';
}

function evaluateSaleCompatibility(deal, inventoryItem) {
  if (!deal || !isNpcBuying(deal.dealType)) return { valid: false, score: 0, reason: 'active deal is not a customer purchase request' };
  if (!inventoryItem) return { valid: false, score: 0, reason: 'selected inventory instance is missing or stale' };

  const buybackBlock = getSameSellerBuybackBlock(deal, inventoryItem);
  if (buybackBlock.blocked) {
    return { valid: false, score: 0, reason: buybackBlock.reason, cooldownDiagnostic: buybackBlock.diagnostic };
  }

  const context = getSaleCompatibilityContext(deal);
  const itemTags = normalizeTags([inventoryItem.category, ...(inventoryItem.tags || [])]);
  const catalogItem = getItem(inventoryItem.itemId);
  const itemLiquidity = inventoryItem.liquidity || catalogItem?.liquidity || 'medium';
  const matchingRequiredTags = context.requiredTags.filter(tag => itemTags.includes(tag));
  const matchingTraitTags = context.traitInterestTags.filter(tag => itemTags.includes(tag));
  const missingImportantTags = context.requiredTags.filter(tag => !BROAD_BUY_TAGS.has(tag) && !itemTags.includes(tag));
  const exactItem = Boolean(context.requestedItem?.id && inventoryItem.itemId === context.requestedItem.id);
  const categoryMatch = Boolean(context.requestedCategory && inventoryItem.category === context.requestedCategory);
  const typeTagMatch = Boolean(context.requestedCategory && itemTags.includes(context.requestedCategory));
  const excludedMatch = context.excludedTags.find(tag => itemTags.includes(tag));

  if (excludedMatch) {
    return { valid: false, score: 0, reason: `buyer avoids ${excludedMatch} goods` };
  }

  if (context.requestedCategory && !categoryMatch && !typeTagMatch && !exactItem) {
    return { valid: false, score: 0, reason: `wrong item type: requested ${context.requestedCategory}, selected ${inventoryItem.category}` };
  }

  const selectiveTags = new Set(itemTags.filter(tag => SELECTIVE_MERCHANDISE_TAGS.has(tag)));
  if (selectiveTags.size && !hasCompatibleSelectiveInterest(selectiveTags, context)) {
    const riskyTag = [...selectiveTags][0];
    return { valid: false, score: 0, reason: `buyer avoids ${riskyTag} or suspicious goods` };
  }

  const condition = String(inventoryItem.condition || '').toLowerCase();
  if (BAD_CONDITIONS.has(condition) && !hasCompatibleSelectiveInterest(new Set([condition, ...selectiveTags]), context)) {
    return { valid: false, score: 0, reason: `condition was unacceptable (${condition})` };
  }

  let score = 0;
  if (exactItem) score += 5;
  if (categoryMatch || typeTagMatch) score += 4;
  score += matchingRequiredTags.length * 2;
  score += Math.min(3, matchingTraitTags.length);
  score += LIQUIDITY_SCORE[itemLiquidity] ?? 1;
  if (missingImportantTags.length) score -= missingImportantTags.length * 2;
  if (itemLiquidity === 'low' && !exactItem) score -= 2;

  const hasSpecificMatch = exactItem || categoryMatch || missingImportantTags.length === 0;
  const threshold = itemLiquidity === 'high' ? 5 : itemLiquidity === 'medium' ? 6 : 8;
  if (!hasSpecificMatch) {
    return { valid: false, score, reason: `missing preferred tag: ${missingImportantTags[0] || context.requiredTags[0] || 'request detail'}` };
  }
  if (score < threshold) {
    const reason = itemLiquidity === 'low'
      ? 'buyer does not want low-demand or niche merchandise'
      : `missing preferred tag: ${missingImportantTags[0] || context.requiredTags.find(tag => !matchingRequiredTags.includes(tag)) || 'request detail'}`;
    return { valid: false, score, reason };
  }

  return {
    valid: true,
    score,
    reason: `matched ${exactItem ? 'exact item' : categoryMatch ? 'requested type' : 'preferred tags'} with ${itemLiquidity} liquidity`
  };
}

function getSameSellerBuybackBlock(deal, inventoryItem) {
  const customerId = deal?.customer?.id || deal?.pool?.characterId || '';
  if (!customerId || !inventoryItem?.sourceCustomerId || inventoryItem.sourceCustomerId !== customerId) return { blocked: false };
  const tags = [inventoryItem.category, ...(inventoryItem.tags || [])].filter(Boolean);
  const isWeapon = inventoryItem.category === 'weapon' || tags.includes('weapon');
  const requiredCooldown = customerId === 'hitman' && isWeapon ? HITMAN_WEAPON_BUYBACK_COOLDOWN_NORMAL_ENCOUNTERS : 0;
  if (!requiredCooldown) return { blocked: false };
  const heldNormalEncounters = getHeldNormalEncounters(inventoryItem);
  if (heldNormalEncounters >= requiredCooldown) return { blocked: false };
  const diagnostic = `Buyback cooldown excluded ${inventoryItem.instanceId}: original seller ${inventoryItem.sourceCustomerId}; acquired T${inventoryItem.turnAcquired}; held normal encounters ${heldNormalEncounters}; required cooldown ${requiredCooldown}.`;
  return {
    blocked: true,
    reason: `same-seller buyback cooldown: held ${heldNormalEncounters}/${requiredCooldown} normal encounters`,
    diagnostic
  };
}

function getInventoryAgeDemandMultiplier(inventoryItem) {
  const heldNormalEncounters = getHeldNormalEncounters(inventoryItem);
  const configured = BUY_FROM_SHOP_ECONOMY.ageMultipliers[heldNormalEncounters];
  return Number.isFinite(configured) ? configured : BUY_FROM_SHOP_ECONOMY.matureAgeMultiplier;
}

function normalizeDemandLevel(value) {
  const normalized = String(value || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  if (['high', 'hot', 'strong', 'fast'].includes(normalized)) return 'high';
  if (['medium', 'normal', 'common', 'uncommon', 'average', 'standard'].includes(normalized)) return 'medium';
  if (['low', 'slow', 'niche'].includes(normalized)) return 'low';
  if (['junk', 'very_low', 'verylow', 'trash', 'none'].includes(normalized)) return 'junk';
  return '';
}

function getItemDemandLevel(inventoryItem) {
  const catalogItem = getItem(inventoryItem?.itemId);
  return normalizeDemandLevel(
    inventoryItem?.demand_level ??
    inventoryItem?.demandLevel ??
    catalogItem?.demand_level ??
    catalogItem?.demandLevel
  ) || normalizeDemandLevel(inventoryItem?.liquidity ?? catalogItem?.liquidity) || 'medium';
}

function getItemLiquidityDemandMultiplier(inventoryItem) {
  const demandLevel = getItemDemandLevel(inventoryItem);
  return BUY_FROM_SHOP_ECONOMY.liquidityMultipliers[demandLevel] ?? 1;
}

function getCustomerPreferenceMultiplier(compatibility) {
  const score = Number(compatibility?.score);
  if (!Number.isFinite(score)) return 1;
  return Math.max(0.25, Math.min(2, score / 8));
}

function formatDemandWeight(value) {
  return `${Number(value || 0).toFixed(2)}x`;
}

function buildDemandCandidate(pool, customer, inventoryItem, baseEventWeight = 1) {
  const traits = getTraits(pool.characterId);
  const encounter = {
    pool,
    customer,
    traits,
    dealType: pool.dealType,
    requestedItemId: pool.itemId,
    requiredTags: getCustomerBuyRequestTags(pool),
    excludedTags: traits.avoidTags || []
  };
  const compatibility = evaluateSaleCompatibility(encounter, inventoryItem);
  const heldNormalEncounters = getHeldNormalEncounters(inventoryItem);
  const ageMultiplier = getInventoryAgeDemandMultiplier(inventoryItem);
  const demandLevel = getItemDemandLevel(inventoryItem);
  const liquidityMultiplier = getItemLiquidityDemandMultiplier(inventoryItem);
  const preferenceMultiplier = compatibility.valid ? getCustomerPreferenceMultiplier(compatibility) : 0;
  const finalWeight = compatibility.valid
    ? Math.max(0, baseEventWeight * preferenceMultiplier * ageMultiplier * liquidityMultiplier)
    : 0;
  return {
    inventoryItem,
    instanceId: inventoryItem?.instanceId || null,
    compatibility,
    eligible: compatibility.valid,
    acquiredTurn: inventoryItem?.turnAcquired ?? null,
    heldNormalEncounters,
    ageMultiplier,
    demandLevel,
    liquidityMultiplier,
    preferenceMultiplier,
    finalWeight,
    chanceWeight: finalWeight,
    diagnostic: compatibility.valid
      ? `Demand candidate: ${inventoryItem.name} [${inventoryItem.instanceId}]; acquired T${inventoryItem.turnAcquired ?? '?'}; held ${heldNormalEncounters} normal encounter${heldNormalEncounters === 1 ? '' : 's'}; age ${formatDemandWeight(ageMultiplier)}; liquidity ${demandLevel} ${formatDemandWeight(liquidityMultiplier)}; customer preference ${formatDemandWeight(preferenceMultiplier)}; final ${formatDemandWeight(finalWeight)}.`
      : `Demand candidate excluded: ${inventoryItem?.name || 'missing item'} [${inventoryItem?.instanceId || 'missing'}]; acquired T${inventoryItem?.turnAcquired ?? '?'}; held ${heldNormalEncounters} normal encounter${heldNormalEncounters === 1 ? '' : 's'}; age ${formatDemandWeight(ageMultiplier)}; liquidity ${demandLevel} ${formatDemandWeight(liquidityMultiplier)}; reason ${compatibility.reason}.`
  };
}

function getDemandCandidatesForPool(pool, customer = getCharacter(pool.characterId), baseEventWeight = 1) {
  if (!pool || !isNpcBuying(pool.dealType)) return [];
  return state.inventory.map(item => buildDemandCandidate(pool, customer, item, baseEventWeight));
}

function getEligibleDemandCandidatesForPool(pool, customer = getCharacter(pool.characterId), baseEventWeight = 1) {
  return getDemandCandidatesForPool(pool, customer, baseEventWeight).filter(candidate => candidate.eligible && candidate.finalWeight > 0);
}

function getBuyPoolDemandMultiplier(pool, customer = getCharacter(pool.characterId)) {
  const candidates = getEligibleDemandCandidatesForPool(pool, customer, 1);
  if (!candidates.length) return 0;
  const total = candidates.reduce((sum, candidate) => sum + candidate.finalWeight, 0);
  return Math.max(0.05, Math.min(3, total));
}

function getBuyFromShopBaseEventWeight(pool) {
  const traits = getTraits(pool.characterId);
  return (Number(pool?.baseChanceWeight ?? pool?.chanceWeight) || 1) * (traits.buysFromShopWeight ?? 1);
}

function buildDemandDiagnostics(pool, customer, candidates, selectedCandidate = null, options = {}) {
  return {
    poolId: pool?.id || 'buy_from_shop',
    requestedItemId: pool?.itemId || null,
    requestedItemType: getCustomerBuyRequestLabel(pool),
    matchingInventoryInstanceIds: candidates.filter(candidate => candidate.eligible).map(candidate => candidate.instanceId),
    selectedInventoryInstanceId: selectedCandidate?.instanceId || null,
    intentionalUnavailableDemand: options.intentionalUnavailableDemand === true,
    rerollReason: options.rerollReason || '',
    lines: [
      `Demand request: ${getCustomerBuyRequestLabel(pool)}${pool?.itemId ? ` (${pool.itemId})` : ''}; customer ${customer?.id || pool?.characterId || 'unknown'}; intentional unavailable: ${options.intentionalUnavailableDemand === true ? 'yes' : 'no'}.`,
      ...candidates.map(candidate => candidate.diagnostic),
      selectedCandidate
        ? `Demand selected weighted instance: ${selectedCandidate.inventoryItem.name} [${selectedCandidate.instanceId}].`
        : `Demand selected weighted instance: none${options.intentionalUnavailableDemand ? ' (intentional unavailable request)' : ''}.`,
      options.rerollReason ? `Demand reroll reason: ${options.rerollReason}.` : ''
    ].filter(Boolean)
  };
}

function canCustomerBuyItem(customer, inventoryItem, encounter) {
  if (!customer || !inventoryItem || !encounter) return false;
  const dealLike = {
    ...encounter,
    customer,
    traits: encounter.traits || getTraits(customer.id || encounter.pool?.characterId),
    dealType: encounter.dealType || encounter.pool?.dealType || 'buy_from_shop',
    requestedItemId: encounter.requestedItemId || encounter.pool?.itemId,
    requiredTags: encounter.requiredTags || getCustomerBuyRequestTags(encounter.pool),
    excludedTags: encounter.excludedTags
  };
  return evaluateSaleCompatibility(dealLike, inventoryItem).valid;
}

function getEligibleInventoryItemsForPool(pool, customer = getCharacter(pool.characterId)) {
  return getDemandCandidatesForPool(pool, customer, 1)
    .filter(candidate => {
      if (!candidate.compatibility.valid && candidate.compatibility.cooldownDiagnostic) {
        recordBuybackCooldownDiagnostic(pool, candidate.compatibility.cooldownDiagnostic);
      }
      return candidate.compatibility.valid;
    })
    .map(candidate => candidate.inventoryItem);
}

function getSelectedInventoryItem(deal) {
  if (!deal?.selectedInventoryInstanceId) return null;
  return state.inventory.find(item => item.instanceId === deal.selectedInventoryInstanceId) || null;
}

function appendSaleHistory(deal, line) {
  if (!Array.isArray(deal.saleHistoryLines)) deal.saleHistoryLines = [];
  deal.saleHistoryLines.push(line);
}

function appendNegotiationHistory(deal, line) {
  if (!Array.isArray(deal.negotiationHistoryLines)) deal.negotiationHistoryLines = [];
  deal.negotiationHistoryLines.push(line);
}

function appendTradeHistory(deal, line) {
  if (!Array.isArray(deal.tradeHistoryLines)) deal.tradeHistoryLines = [];
  deal.tradeHistoryLines.push(line);
}

function recordBuybackCooldownDiagnostic(pool, diagnostic) {
  if (!diagnostic) return;
  if (!Array.isArray(state.buybackCooldownDiagnostics)) state.buybackCooldownDiagnostics = [];
  const line = `${pool?.id || 'buy_from_shop'}: ${diagnostic}`;
  if (!state.buybackCooldownDiagnostics.includes(line)) state.buybackCooldownDiagnostics.push(line);
}

function validateSaleSelection(deal, instanceId = deal?.selectedInventoryInstanceId) {
  if (!deal || !isNpcBuying(deal.dealType)) return { valid: false, inventoryItem: null, reason: 'active deal is not a customer purchase request' };
  if (!instanceId) return { valid: false, inventoryItem: null, reason: 'no inventory instance was selected' };
  const inventoryItem = state.inventory.find(item => item.instanceId === instanceId) || null;
  if (!inventoryItem) return { valid: false, inventoryItem: null, reason: 'selected inventory instance is missing or stale' };
  const compatibility = evaluateSaleCompatibility(deal, inventoryItem);
  return { ...compatibility, inventoryItem };
}

function resetInvalidSaleSelection(deal) {
  deal.selectedInventoryInstanceId = null;
  deal.inventoryItem = null;
  deal.item = getItem(deal.requestedItemId) || deal.item;
  const eligibleItems = getEligibleInventoryItemsForPool(deal.pool, deal.customer);
  deal.eligibleInventoryInstanceIds = eligibleItems.map(item => item.instanceId);
  deal.requestSatisfiable = eligibleItems.length > 0;
}

function applySelectedInventoryItemToDeal(deal, inventoryItem) {
  if (!deal || !inventoryItem) return;
  deal.selectedInventoryInstanceId = inventoryItem.instanceId;
  deal.inventoryItem = inventoryItem;
  deal.item = inventoryItem;
  deal.salePrice = Math.max(2, Math.round((inventoryItem.targetSellPrice || inventoryItem.baseValue || inventoryItem.acquisitionCost) * deal.pool.askPriceMultiplier));
  deal.defaultSalePrice = deal.salePrice;
  deal.markupPrice = Math.max(deal.salePrice + 2, Math.round(deal.salePrice * deal.traits.maxMarkupTolerance));
}

function poolWeight(pool) {
  const traits = getTraits(pool.characterId);
  const satisfiable = isNpcBuying(pool.dealType) ? poolMatchesInventory(pool) : true;
  let weight = pool.chanceWeight;
  if (isShopBuying(pool.dealType)) weight *= traits.sellsToShopWeight ?? 1;
  else if (isNpcBuying(pool.dealType)) weight *= traits.buysFromShopWeight ?? 1;
  else weight *= traits.tradesWeight ?? 1;

  if (isNpcBuying(pool.dealType)) {
    if (satisfiable) {
      weight *= getSellOpportunityWeightMultiplier();
      weight *= getBuyPoolDemandMultiplier(pool);
      if (state.unavailableSellRequestStreak > 0) weight *= 8;
      if (state.money <= 25 && hasSellableInventory()) weight *= 4;
    } else {
      weight *= getUnavailableSellRequestWeightMultiplier();
    }
  }
  return weight;
}

function getEligibleSellPools() {
  return CHARACTER_ITEM_POOLS.filter(pool => isNpcBuying(pool.dealType) && poolMatchesInventory(pool));
}

function hasSellableInventory() {
  return state.inventory.length > 0;
}

function hasEligibleSellOpportunity() {
  return getEligibleSellPools().length > 0;
}

function getSellOpportunityWeightMultiplier() {
  let multiplier = 3.4;
  if (state.sellMissStreak >= 2) multiplier *= 5;
  if (state.sellMissStreak >= 3) multiplier *= 30;
  if (state.money <= 25) multiplier *= 3;
  else if (state.money <= 60) multiplier *= 1.8;
  return multiplier;
}

function getUnavailableSellRequestWeightMultiplier() {
  if (state.unavailableSellRequestStreak >= BUY_FROM_SHOP_ECONOMY.maxConsecutiveUnavailableDemand) return 0;
  let multiplier = BUY_FROM_SHOP_ECONOMY.unavailableDemandChance;
  if (state.unavailableSellRequestCount >= 2) multiplier *= 0.35;
  if (hasEligibleSellOpportunity()) multiplier *= 0.55;
  if (state.money <= 25 && hasSellableInventory()) multiplier *= 0.1;
  return multiplier;
}

function updateSellOpportunityStreak(deal) {
  if (!hasEligibleSellOpportunity()) {
    state.sellMissStreak = 0;
  } else {
    state.sellMissStreak = deal && isNpcBuying(deal.dealType) && deal.requestSatisfiable ? 0 : state.sellMissStreak + 1;
  }

  if (deal && isNpcBuying(deal.dealType) && !deal.requestSatisfiable) {
    state.unavailableSellRequestStreak += 1;
    state.unavailableSellRequestCount += 1;
  } else {
    state.unavailableSellRequestStreak = 0;
    if (deal && isNpcBuying(deal.dealType) && deal.requestSatisfiable) {
      state.unavailableSellRequestCount = Math.max(0, state.unavailableSellRequestCount - 1);
    }
  }
}

function shouldForceSellOpportunity() {
  return state.sellMissStreak >= 3 && hasEligibleSellOpportunity();
}

function shouldCheckBankruptcy() {
  return state.money === 0 && !hasSellableInventory();
}

function clampMoney() {
  state.money = Math.max(0, Math.round(state.money));
}

function poolMatchesInventory(pool) {
  if (isNpcBuying(pool.dealType)) {
    return getEligibleInventoryItemsForPool(pool).length > 0;
  }
  if (pool.dealType === 'trade') {
    const dealLike = { pool, dealType: 'trade', traits: getTraits(pool.characterId) };
    return !pool.requestedItemTags.length || getEligibleTradeInventoryItems(dealLike).length > 0;
  }
  return true;
}

function resolvePoolItem(pool) {
  const item = getItem(pool.itemId);
  if (item) return item;
  const matches = ITEMS.filter(candidate => tagsOverlap(candidate.tags, pool.offeredItemTags));
  return matches.length ? pickWeighted(matches.map(match => ({ ...match, chanceWeight: 1 }))) : ITEMS[0];
}

function buildDeal(pool) {
  const customer = getCharacter(pool.characterId);
  const traits = getTraits(pool.characterId);
  const item = resolvePoolItem(pool);
  const demandCandidates = isNpcBuying(pool.dealType)
    ? getDemandCandidatesForPool(pool, customer, getBuyFromShopBaseEventWeight(pool))
    : [];
  demandCandidates.forEach(candidate => {
    if (!candidate.compatibility.valid && candidate.compatibility.cooldownDiagnostic) {
      recordBuybackCooldownDiagnostic(pool, candidate.compatibility.cooldownDiagnostic);
    }
  });
  const eligibleDemandCandidates = demandCandidates.filter(candidate => candidate.eligible && candidate.finalWeight > 0);
  const selectedDemandCandidate = eligibleDemandCandidates.length ? pickWeighted(eligibleDemandCandidates) : null;
  const eligibleInventoryItems = isNpcBuying(pool.dealType)
    ? eligibleDemandCandidates.map(candidate => candidate.inventoryItem)
    : [];
  const inventoryItem = null;
  const requestedInventoryItem = null;
  const jitter = randomInt(-4, 6);
  const askingPrice = Math.max(1, Math.round(item.baseValue * pool.askPriceMultiplier + jitter));
  const availableCash = Math.max(0, state.money);
  const defaultOffer = isShopBuying(pool.dealType) ? askingPrice : 0;
  const normalLowballPrice = Math.max(1, Math.round(askingPrice * traits.lowballTolerance));
  const lowballPrice = isShopBuying(pool.dealType)
    ? availableCash >= askingPrice
      ? normalLowballPrice
      : availableCash
    : normalLowballPrice;
  const actualOffer = isShopBuying(pool.dealType) ? lowballPrice : 0;
  const saleItem = selectedDemandCandidate?.inventoryItem || eligibleInventoryItems[0] || item;
  const salePrice = isNpcBuying(pool.dealType) ? null : Math.max(2, Math.round((saleItem.targetSellPrice || saleItem.baseValue) * pool.askPriceMultiplier));
  const markupPrice = salePrice ? Math.max(salePrice + 2, Math.round(salePrice * traits.maxMarkupTolerance)) : null;
  const cashAdjustment = pool.dealType === 'trade' ? randomInt(pool.cashAdjustmentMin, pool.cashAdjustmentMax) : 0;

  return {
    encounterId: `encounter-${++encounterSerial}`,
    pool,
    traits,
    customer,
    item: isNpcBuying(pool.dealType) ? item : item,
    dealType: pool.dealType,
    requestedItemId: isNpcBuying(pool.dealType) ? pool.itemId : null,
    requestedItemType: isNpcBuying(pool.dealType) ? getCustomerBuyRequestLabel(pool) : null,
    requiredTags: isNpcBuying(pool.dealType) ? getCustomerBuyRequestTags(pool) : [],
    excludedTags: isNpcBuying(pool.dealType) ? (traits.avoidTags || []) : [],
    requestSatisfiable: !isNpcBuying(pool.dealType) || eligibleInventoryItems.length > 0,
    intentionalUnavailableDemand: Boolean(isNpcBuying(pool.dealType) && pool.intentionalUnavailableDemand && eligibleInventoryItems.length === 0),
    eligibleInventoryInstanceIds: eligibleInventoryItems.map(item => item.instanceId),
    demandCandidateWeights: demandCandidates.map(candidate => ({
      instanceId: candidate.instanceId,
      acquiredTurn: candidate.acquiredTurn,
      heldNormalEncounters: candidate.heldNormalEncounters,
      ageMultiplier: candidate.ageMultiplier,
      demandLevel: candidate.demandLevel,
      liquidityMultiplier: candidate.liquidityMultiplier,
      customerPreferenceMultiplier: candidate.preferenceMultiplier,
      finalWeight: candidate.finalWeight,
      eligible: candidate.eligible,
      reason: candidate.compatibility.reason
    })),
    demandDiagnostics: isNpcBuying(pool.dealType)
      ? buildDemandDiagnostics(pool, customer, demandCandidates, selectedDemandCandidate, {
          intentionalUnavailableDemand: Boolean(pool.intentionalUnavailableDemand && eligibleInventoryItems.length === 0),
          rerollReason: pool.rerollReason || ''
        })
      : null,
    weightedDemandInventoryInstanceId: selectedDemandCandidate?.instanceId || null,
    selectedInventoryInstanceId: null,
    askPrice: askingPrice,
    askingPrice,
    defaultOffer,
    actualOffer,
    availableCash,
    normalAskPrice: askingPrice,
    lowballPrice,
    normalLowballPrice,
    lowballRejected: false,
    markupRejected: false,
    salePrice,
    defaultSalePrice: salePrice,
    markupPrice,
    cashAdjustment,
    cashInstead: Math.max(1, Math.round(askingPrice * traits.tradeFairness)),
    inventoryItem,
    requestedInventoryItem,
    requestedInventoryItems: [],
    selectedTradeInventoryInstanceIds: [],
    buybackCooldownHistoryLines: (state.buybackCooldownDiagnostics || []).filter(line => line.startsWith(`${pool.id}:`) || line.includes(`original seller ${pool.characterId}`)),
    blueprint: getBlueprintForPool(pool)
  };
}

function getSelectablePoolsForCharacter(character) {
  const characterPools = CHARACTER_ITEM_POOLS.filter(pool => pool.characterId === character.id);
  const validPools = characterPools
    .map(pool => {
      const requestSatisfiable = poolMatchesInventory(pool);
      const intentionalUnavailableDemand = Boolean(isNpcBuying(pool.dealType) && !requestSatisfiable && hasSellableInventory() && getUnavailableSellRequestWeightMultiplier() > 0);
      return {
        ...pool,
        baseChanceWeight: pool.chanceWeight,
        requestSatisfiable,
        intentionalUnavailableDemand,
        chanceWeight: poolWeight(pool)
      };
    })
    .filter(pool => pool.requestSatisfiable || pool.intentionalUnavailableDemand)
    .filter(pool => pool.chanceWeight > 0);
  if (validPools.length) return validPools;
  return characterPools
    .filter(pool => !isNpcBuying(pool.dealType) && poolMatchesInventory(pool))
    .map(pool => ({ ...pool, chanceWeight: poolWeight(pool) }))
    .filter(pool => pool.chanceWeight > 0);
}

function characterHasCompatiblePool(character) {
  return getSelectablePoolsForCharacter(character).length > 0;
}

function buildCopConsequenceDeal(consequence, customer) {
  const targetInventoryItem = consequence.triggeringInventoryInstanceId
    ? state.inventory.find(item => item.instanceId === consequence.triggeringInventoryInstanceId) || null
    : null;
  const triggerItem = consequence.triggeringItemId ? getItem(consequence.triggeringItemId) : null;
  const item = targetInventoryItem || triggerItem || { id: 'suspicious_inventory', name: 'Suspicious Inventory', condition: 'questionable', tags: ['suspicious'], heat: 0 };
  const bribeAmount = Math.max(10, Math.min(state.money, Math.round(25 + state.copRisk * 5)));
  return {
    encounterId: `encounter-${++encounterSerial}`,
    consequence,
    pool: { id: consequence.id, notes: consequence.reason, riskNote: '', conditionOverride: '' },
    traits: {},
    customer,
    item,
    dealType: consequence.type,
    targetInventoryItem,
    bribeAmount,
    resolvedAction: null,
    transaction: null,
    consequenceResult: '',
    blueprint: getConsequenceEvent(consequence.type)
  };
}

function buildThugConsequenceDeal(consequence, customer) {
  const stolenItemCandidate = getThugInventoryTarget();
  const item = stolenItemCandidate || { id: 'cash_or_consequences', name: 'Cash or Consequences', condition: 'ugly', tags: ['thug'], heat: 0 };
  return {
    encounterId: `encounter-${++encounterSerial}`,
    consequence,
    pool: { id: consequence.id, notes: consequence.reason, riskNote: '', conditionOverride: '' },
    traits: {},
    customer,
    item,
    dealType: consequence.type,
    stolenItemCandidate,
    resolvedAction: null,
    transaction: null,
    consequenceResult: '',
    blueprint: getConsequenceEvent(consequence.type)
  };
}

function getConsequenceCharacterId(type) {
  if (type === COP_CONSEQUENCE_TYPE) return COP_CONSEQUENCE_CHARACTER_ID;
  if (type === THUG_CONSEQUENCE_TYPE) return THUG_CONSEQUENCE_CHARACTER_ID;
  return '';
}

function buildConsequenceDeal(consequence, customer) {
  if (consequence.type === COP_CONSEQUENCE_TYPE) return buildCopConsequenceDeal(consequence, customer);
  if (consequence.type === THUG_CONSEQUENCE_TYPE) return buildThugConsequenceDeal(consequence, customer);
  return null;
}

async function startConsequenceTurn(consequence) {
  const errors = validateQueuedConsequence(consequence);
  if (errors.length) {
    console.error(`[consequence] cannot start malformed consequence ${consequence?.id || '(missing id)'}: ${errors.join('; ')}`);
    markConsequenceResolved(consequence, 'Skipped malformed consequence.');
    return false;
  }

  const characterId = getConsequenceCharacterId(consequence.type);
  const character = getCharacter(characterId);
  if (!character || !character.spritePath) {
    console.error(`[consequence] Missing character data or sprite path: ${characterId || consequence.type}`);
    consequence.earliestTurn = state.turn + 1;
    return false;
  }

  let bounds = null;
  try {
    bounds = await getNpcVisibleBounds(character.spritePath);
  } catch (error) {
    if (!consequence.metadata.spriteLoadErrorLogged) {
      console.error(`[consequence] Sprite failed to load at ${character.spritePath}. Normal customers will continue.`, error);
      consequence.metadata.spriteLoadErrorLogged = true;
    }
    consequence.earliestTurn = state.turn + 1;
    return false;
  }

  state.activeConsequence = consequence;
  state.normalEncountersSinceSpecial = 0;
  state.currentCustomer = {
    ...character,
    baseSpriteKey: getBaseSpriteKey(character.spritePath),
    stageSide: getNpcSide(character.facing),
    spriteBounds: bounds
  };
  state.currentDeal = buildConsequenceDeal(consequence, state.currentCustomer);
  if (!state.currentDeal) {
    console.error(`[consequence] missing deal builder for consequence type: ${consequence.type}`);
    consequence.earliestTurn = state.turn + 1;
    state.activeConsequence = null;
    return false;
  }
  renderAll();
  setDealButtonsDisabled(true);
  typeLine('');
  await enterCurrentCustomer();
  if (state.isGameOver) return true;
  state.isResolving = false;
  startDealConversation();
  return true;
}
function getRecentNormalCustomerCount(characterId) {
  return (state.normalCustomerHistory || []).filter(id => id === characterId).length;
}

function getConsecutiveNormalCustomerCount(characterId) {
  let count = 0;
  for (const id of state.normalCustomerHistory || []) {
    if (id !== characterId) break;
    count += 1;
  }
  return count;
}

function getNormalCustomerRepeatMultiplier(characterId) {
  const history = state.normalCustomerHistory || [];
  if (!history.length) return 1;
  let multiplier = 1;
  if (history[0] === characterId) multiplier *= 0.35;
  if (history[1] === characterId) multiplier *= 0.6;
  const extraRecentHits = Math.max(0, history.slice(0, NORMAL_CUSTOMER_HISTORY_LIMIT).filter(id => id === characterId).length - 1);
  if (extraRecentHits) multiplier *= Math.pow(0.7, extraRecentHits);
  return multiplier;
}

function getCharacterSelectionWeight(character, eligiblePools) {
  const traits = getTraits(character.id);
  const baseWeights = eligiblePools.map(pool => {
    if (isShopBuying(pool.dealType)) return traits.sellsToShopWeight ?? 1;
    if (isNpcBuying(pool.dealType)) return traits.buysFromShopWeight ?? 1;
    return traits.tradesWeight ?? 1;
  });
  let weight = Math.max(1, ...baseWeights);
  const hasSatisfiableSell = eligiblePools.some(pool => isNpcBuying(pool.dealType) && pool.requestSatisfiable);
  if (hasSatisfiableSell) {
    weight *= getSellOpportunityWeightMultiplier();
    if (state.unavailableSellRequestStreak > 0) weight *= 2;
    if (state.money <= 25 && hasSellableInventory()) weight *= 2;
  }
  return weight;
}

function formatSelectionDiagnostics(diagnostics) {
  if (!diagnostics) return '';
  const eligible = diagnostics.eligibleCustomerIds.join(', ') || 'none';
  const penalties = diagnostics.penalizedCustomerIds.length ? diagnostics.penalizedCustomerIds.join(', ') : 'none';
  const blocked = diagnostics.blockedCustomerIds.length
    ? diagnostics.blockedCustomerIds.map(id => diagnostics.blockReasons?.[id] ? `${id} (${diagnostics.blockReasons[id]})` : id).join(', ')
    : 'none';
  return `Normal selection: eligible [${eligible}]; selected ${diagnostics.selectedCustomerId || 'none'}; repeat penalties [${penalties}]; consecutive-repeat blocks [${blocked}].`;
}

function formatDemandDiagnostics(diagnostics) {
  if (!diagnostics) return '';
  return (diagnostics.lines || []).join(' ');
}

function chooseNextCustomerWithPools() {
  const candidates = activeCustomers
    .map(character => ({ character, eligiblePools: getSelectablePoolsForCharacter(character) }))
    .filter(candidate => candidate.eligiblePools.length > 0);
  if (!candidates.length) return null;

  const blockReasons = {};
  const blockedCustomerIds = [];
  let eligibleCandidates = candidates;
  if (candidates.length > 1) {
    eligibleCandidates = candidates.filter(candidate => {
      const consecutiveCount = getConsecutiveNormalCustomerCount(candidate.character.id);
      const blocked = consecutiveCount >= NORMAL_CUSTOMER_MAX_CONSECUTIVE;
      if (blocked) {
        blockedCustomerIds.push(candidate.character.id);
        blockReasons[candidate.character.id] = `${consecutiveCount} consecutive normal encounters`;
      }
      return !blocked;
    });
    if (!eligibleCandidates.length) eligibleCandidates = candidates;
  }

  const eligibleSellIds = new Set(getEligibleSellPools().map(pool => pool.characterId));
  const forceSell = shouldForceSellOpportunity();
  const sellBias = state.money <= 25 ? 70 : state.money <= 60 ? 55 : state.sellMissStreak >= 2 ? 75 : 38;
  let selectionPool = eligibleCandidates;
  const sellCandidates = eligibleCandidates.filter(candidate => eligibleSellIds.has(candidate.character.id));
  if (sellCandidates.length && (forceSell || chance(sellBias))) selectionPool = sellCandidates;

  const weighted = selectionPool.map(candidate => {
    const baseWeight = getCharacterSelectionWeight(candidate.character, candidate.eligiblePools);
    const repeatMultiplier = getNormalCustomerRepeatMultiplier(candidate.character.id);
    return {
      ...candidate,
      baseWeight,
      repeatMultiplier,
      recentCount: getRecentNormalCustomerCount(candidate.character.id),
      consecutiveCount: getConsecutiveNormalCustomerCount(candidate.character.id),
      chanceWeight: Math.max(0.01, baseWeight * repeatMultiplier)
    };
  });
  const selected = pickWeighted(weighted);
  const diagnostics = {
    eligibleCustomerIds: candidates.map(candidate => candidate.character.id),
    selectionPoolCustomerIds: selectionPool.map(candidate => candidate.character.id),
    selectedCustomerId: selected.character.id,
    penalizedCustomerIds: weighted.filter(candidate => candidate.repeatMultiplier < 1).map(candidate => candidate.character.id),
    blockedCustomerIds,
    blockReasons,
    weights: weighted.map(candidate => ({
      id: candidate.character.id,
      baseWeight: Number(candidate.baseWeight.toFixed(2)),
      repeatMultiplier: Number(candidate.repeatMultiplier.toFixed(2)),
      finalWeight: Number(candidate.chanceWeight.toFixed(2)),
      eligiblePoolCount: candidate.eligiblePools.length
    }))
  };
  console.info('[normal-selection]', diagnostics);
  return { customer: selected.character, eligiblePools: selected.eligiblePools, diagnostics };
}

function generateDeal(customer, eligiblePools = getSelectablePoolsForCharacter(customer)) {
  const validPools = eligiblePools.filter(pool => pool.chanceWeight > 0);
  const satisfiableSellPools = validPools.filter(pool => isNpcBuying(pool.dealType) && pool.requestSatisfiable);
  const forceSell = shouldForceSellOpportunity() && satisfiableSellPools.length;
  const pool = pickWeighted(forceSell ? satisfiableSellPools : validPools);
  return pool ? buildDeal(pool) : null;
}

function getNormalDealRerollReason(deal) {
  if (!deal) return 'no deal generated';
  if (isNpcBuying(deal.dealType) && !deal.requestSatisfiable && !deal.intentionalUnavailableDemand) {
    return 'buy-from-shop request had no eligible inventory outside the intentional unavailable-demand path';
  }
  return '';
}

function chooseNextNormalDeal() {
  const rerollReasons = [];
  for (let attempt = 1; attempt <= BUY_FROM_SHOP_ECONOMY.maxNormalSelectionRetries; attempt += 1) {
    const normalSelection = chooseNextCustomerWithPools();
    if (!normalSelection?.customer) return { normalSelection, deal: null, rerollReasons };
    const deal = generateDeal(normalSelection.customer, normalSelection.eligiblePools);
    const rerollReason = getNormalDealRerollReason(deal);
    if (!rerollReason) {
      if (deal?.demandDiagnostics && rerollReasons.length) {
        deal.demandDiagnostics.rerollReason = rerollReasons.join(' | ');
        deal.demandDiagnostics.lines.push(`Demand reroll reason: ${deal.demandDiagnostics.rerollReason}.`);
      }
      return { normalSelection, deal, rerollReasons };
    }
    rerollReasons.push(`attempt ${attempt}: ${normalSelection.customer.id}; ${rerollReason}`);
  }

  const fallbackSelection = chooseNextCustomerWithPools();
  const fallbackPools = (fallbackSelection?.eligiblePools || []).filter(pool => !isNpcBuying(pool.dealType) || pool.requestSatisfiable || pool.intentionalUnavailableDemand);
  const deal = fallbackSelection?.customer ? generateDeal(fallbackSelection.customer, fallbackPools) : null;
  if (deal?.demandDiagnostics) {
    deal.demandDiagnostics.rerollReason = rerollReasons.join(' | ') || 'bounded retry fallback used';
    deal.demandDiagnostics.lines.push(`Demand reroll reason: ${deal.demandDiagnostics.rerollReason}.`);
  }
  return { normalSelection: fallbackSelection, deal, rerollReasons };
}

function rememberNormalCustomer(characterId) {
  if (!characterId) return;
  if (!Array.isArray(state.normalCustomerHistory)) state.normalCustomerHistory = [];
  state.normalCustomerHistory.unshift(characterId);
  state.normalCustomerHistory = state.normalCustomerHistory.slice(0, NORMAL_CUSTOMER_HISTORY_LIMIT);
}
async function startNextCustomer() {
  resetAutoProgress();
  normalizeConsequenceState();
  cleanResolvedConsequences();
  state.conversation = null;
  clearInventorySelection();
  if (shouldCheckBankruptcy()) {
    endGame();
    return;
  }
  state.turn += 1;
  state.isResolving = true;
  const consequence = getEligibleQueuedConsequence();
  if (consequence && await startConsequenceTurn(consequence)) return;
  state.activeConsequence = null;
  state.normalEncountersSinceSpecial += 1;
  state.normalEncounterCount += 1;
  state.buybackCooldownDiagnostics = [];
  const { normalSelection, deal: selectedNormalDeal } = chooseNextNormalDeal();
  state.currentCustomer = normalSelection?.customer || null;
  if (!state.currentCustomer) {
    state.currentDeal = null;
    renderCustomer('exiting');
    renderAll();
    typeLine('No valid customers are available. Check the data tables and sprite assets.');
    return;
  }
  state.currentDeal = selectedNormalDeal;
  if (state.currentDeal) {
    state.currentDeal.selectionDiagnostics = normalSelection.diagnostics;
    rememberNormalCustomer(state.currentCustomer.id);
  }
  updateSellOpportunityStreak(state.currentDeal);
  if (!state.currentDeal) {
    renderAll();
    typeLine(`${state.currentCustomer.displayName} has no compatible deal data.`);
    window.setTimeout(startNextCustomer, 800);
    return;
  }
  renderAll();
  setDealButtonsDisabled(true);
  typeLine('');
  await enterCurrentCustomer();
  if (state.isGameOver) return;
  state.isResolving = false;
  startDealConversation();
}

function getDealDiagnosticLogText(deal) {
  const base = `${deal.blueprint ? `${deal.pool.notes} ${deal.blueprint.resultNotes}` : deal.pool.notes}`;
  const cooldownDiagnostics = (deal.buybackCooldownHistoryLines || []).join(' ');
  const demandDiagnostics = isNpcBuying(deal.dealType) ? formatDemandDiagnostics(deal.demandDiagnostics) : '';
  return [base, cooldownDiagnostics, demandDiagnostics].filter(Boolean).join(' ');
}

function introduceDeal() {
  const deal = state.currentDeal;
  const item = deal.item;
  let line;

  if (deal.blueprint) {
    line = `${deal.customer.notes} "${deal.blueprint.dialogue}"`;
  } else if (isShopBuying(deal.dealType)) {
    line = `${deal.customer.notes} "I got a ${item.name}. Cash today, questions never."`;
  } else if (isNpcBuying(deal.dealType)) {
    line = `${deal.customer.notes} "That ${item.name} in your case. How crooked is the price?"`;
  } else {
    line = `${deal.customer.notes} "No cash. Trade you this ${item.name} and a bad feeling."`;
  }

  typeLine(line);
  renderLog(getDealDiagnosticLogText(deal));
}

function isExplicitlyIllegalItem(item) {
  const tags = (item?.tags || []).map(tag => String(tag).toLowerCase());
  return tags.some(tag => ['hot', 'stolen', 'illegal', 'contraband', 'suspicious', 'locked', 'firearm', 'weapon', 'serial_removed', 'removed_serial'].includes(tag));
}

function calculateCopRisk(item, context = {}) {
  const heat = Math.max(0, Number(item?.heat) || 0);
  const tags = (item?.tags || []).map(tag => String(tag).toLowerCase());
  const quantity = Math.max(1, Number(item?.quantity ?? item?.count ?? 1) || 1);
  const baseRisk = heat <= 0 ? 0 : heat === 1 ? 0 : heat === 2 ? 2 : heat === 3 ? 2 : heat === 4 ? 4 : 5;
  const suspiciousTags = ['hot', 'stolen', 'illegal', 'contraband', 'suspicious', 'locked', 'firearm', 'weapon', 'serial_removed', 'removed_serial'];
  const tagRisk = tags.some(tag => suspiciousTags.includes(tag)) ? 2 :
    (tags.includes('jewelry') || String(item?.category || '').toLowerCase() === 'jewelry' ? 1 : 0);
  const scaleRisk = quantity >= 10 ? 2 : quantity >= 4 ? 1 : 0;
  const priceRisk = Number(context.price) >= 500 ? 1 : 0;
  const riskNoteMatch = String(context.riskNote || '').toLowerCase().match(/cop risk \+(\d+)/);
  const notedRisk = riskNoteMatch ? Number(riskNoteMatch[1]) : 0;
  const dataRisk = Math.min(2, notedRisk);
  const multiplier = Number(context.multiplier) || 1;
  const rawRisk = baseRisk + tagRisk + scaleRisk + priceRisk + notedRisk;
  const noteCapAdjustment = dataRisk - notedRisk;
  const cappedNoteRisk = rawRisk + noteCapAdjustment;
  const genericHeatTwoCap = heat === 2 && !tagRisk && !scaleRisk && !priceRisk ? 3 : Number.POSITIVE_INFINITY;
  const transactionCapAdjustment = Math.min(cappedNoteRisk, genericHeatTwoCap) - cappedNoteRisk;
  const normalizedRisk = cappedNoteRisk + transactionCapAdjustment;
  const roundedRisk = Math.max(0, Math.round(normalizedRisk * multiplier));
  const minimumRisk = heat === 2 && !tagRisk && !scaleRisk && !priceRisk ? 2 : 0;
  const addedRisk = Math.max(minimumRisk, roundedRisk);
  const multiplierAdjustment = roundedRisk - normalizedRisk;
  const minimumAdjustment = addedRisk - roundedRisk;
  const reasons = [`heat ${heat}: +${baseRisk}`];
  if (tagRisk) reasons.push(`suspicious category/tags: +${tagRisk}`);
  if (scaleRisk) reasons.push(`quantity ${quantity}: +${scaleRisk}`);
  if (priceRisk) reasons.push('large transaction: +1');
  if (notedRisk) reasons.push(`deal risk note: +${notedRisk}`);
  if (noteCapAdjustment) reasons.push(`risk-note cap adjustment: ${signedNumber(noteCapAdjustment)}`);
  if (transactionCapAdjustment) reasons.push(`generic heat-2 transaction cap adjustment: ${signedNumber(transactionCapAdjustment)}`);
  if (multiplierAdjustment) reasons.push(`transaction multiplier/rounding adjustment (${multiplier}x): ${signedNumber(multiplierAdjustment)}`);
  if (minimumAdjustment) reasons.push(`generic heat-2 minimum adjustment: ${signedNumber(minimumAdjustment)}`);
  reasons.push(`applied cop risk: +${addedRisk}`);
  return { addedRisk, rawRisk, reason: reasons.join(', ') };
}

function addHeat(item, context = {}) {
  const risk = calculateCopRisk(item, context);
  const addedRisk = risk.addedRisk;
  state.copRisk += addedRisk;
  return risk;
}

function applyRiskNote(pool, deal = null, includeCopRisk = false) {
  const note = String(pool?.riskNote || '').toLowerCase();
  const thugMatch = note.match(/(?:thug risk|faction pressure) \+(\d+)/);
  const scamMatch = note.match(/scam risk \+(\d+)/);
  // Cop risk notes are folded into calculateCopRisk so they are not counted twice.
  if (thugMatch) {
    addDealFactionPressure(deal, Number(thugMatch[1]), `risk note on ${pool?.id || 'deal'}: ${thugMatch[0]}`, { warnWhenMissing: true });
  }
  if (scamMatch) state.scamRisk += Number(scamMatch[1]);
}

function beginDealResolution(deal, action) {
  if (deal.resolvedAction) return false;
  deal.resolvedAction = action;
  return true;
}

function validateShopPurchase(deal, price) {
  const itemId = deal?.item?.id || deal?.item?.item_id || deal?.pool?.itemId;
  const priceNumber = Number(price);
  if (!deal || !isShopBuying(deal.dealType)) return 'not a shop purchase deal';
  if (deal.committedTransaction) return 'transaction already committed';
  if (!itemId || !getItem(itemId)) return `successful shop purchase has no resolvable item_id: ${deal?.pool?.id || '(missing pool)'}`;
  if (!Number.isFinite(priceNumber) || priceNumber <= 0) return `successful shop purchase has invalid transaction price: ${price}`;
  if (priceNumber > state.money) return `successful shop purchase price exceeds available cash: ${priceNumber} > ${state.money}`;
  return '';
}

function commitShopPurchase(deal, price, notes, heatMultiplier) {
  const validationError = validateShopPurchase(deal, price);
  if (validationError) {
    console.error(`[transaction] ${validationError}`);
    return false;
  }

  const resolvedPrice = Math.round(Number(price));
  deal.committedTransaction = true;
  state.money -= resolvedPrice;
  const inventoryItem = createInventoryItem(deal.item, resolvedPrice, deal.customer.id, deal.pool.conditionOverride, notes);
  state.inventory.push(inventoryItem);
  deal.transaction = {
    type: 'shop_purchase',
    action: deal.resolvedAction,
    price: resolvedPrice,
    itemId: inventoryItem.itemId,
    itemName: inventoryItem.name,
    inventoryInstanceId: inventoryItem.instanceId,
    inventoryItem: copyInventoryDebugItem(inventoryItem)
  };
  const copRiskBefore = state.copRisk;
  const isIllegalPurchase = isExplicitlyIllegalItem(deal.item);
  const risk = addHeat(deal.item, { multiplier: heatMultiplier, price: resolvedPrice, riskNote: deal.pool.riskNote });
  applyRiskNote(deal.pool, deal, isIllegalPurchase);
  maybeQueueCopConsequence(deal, `Purchase of ${inventoryItem.name}: ${risk.reason}`, copRiskBefore, state.copRisk);
  return true;
}

function isInventoryItemEligibleForTrade(deal, inventoryItem) {
  if (!deal || deal.dealType !== 'trade' || !inventoryItem?.instanceId) return false;
  if (!state.inventory.some(item => item.instanceId === inventoryItem.instanceId)) return false;
  const avoidTags = deal.traits?.avoidTags || [];
  const itemTags = [inventoryItem.category, ...(inventoryItem.tags || [])].filter(Boolean);
  if (avoidTags.length && tagsOverlap(itemTags, avoidTags)) return false;
  const requestedTags = deal.pool?.requestedItemTags || [];
  if (!requestedTags.length) return true;
  return tagsOverlap(itemTags, requestedTags);
}

function getEligibleTradeInventoryItems(deal) {
  return state.inventory.filter(item => isInventoryItemEligibleForTrade(deal, item));
}

function getSelectedTradeInventoryItems(deal) {
  const selectedIds = Array.isArray(deal?.selectedTradeInventoryInstanceIds)
    ? deal.selectedTradeInventoryInstanceIds
    : Array.isArray(state.inventorySelection?.selectedInstanceIds) ? state.inventorySelection.selectedInstanceIds : [];
  const seen = new Set();
  return selectedIds
    .filter(instanceId => {
      if (!instanceId || seen.has(instanceId)) return false;
      seen.add(instanceId);
      return true;
    })
    .map(instanceId => state.inventory.find(item => item.instanceId === instanceId) || null)
    .filter(item => item && isInventoryItemEligibleForTrade(deal, item));
}

function getTradeItemValue(item) {
  return Math.max(1, Math.round(Number(item?.targetSellPrice || item?.baseValue || item?.acquisitionCost || 0) || 0));
}

function getTradePlayerOfferValue(deal) {
  return getSelectedTradeInventoryItems(deal).reduce((sum, item) => sum + getTradeItemValue(item), 0);
}

function getTradeRequestedValue(deal) {
  return getTradeReceivedItems(deal).reduce((sum, item) => sum + getTradeItemValue(item), 0);
}

function getTradeCashDelta(deal) {
  return deal.requestedInventoryItems?.length || deal.selectedTradeInventoryInstanceIds?.length
    ? -deal.cashAdjustment
    : deal.cashAdjustment ? -deal.cashAdjustment : -Math.max(1, Math.round(deal.askPrice * 0.25));
}

function getTradeSelectionSummary(deal) {
  const selectedItems = getSelectedTradeInventoryItems(deal);
  const selected = selectedItems.length
    ? selectedItems.map(item => `${item.name} [${item.instanceId}]`).join(', ')
    : 'nothing selected';
  const received = getTradeReceivedItems(deal).map(item => item.name).join(', ') || 'nothing';
  const cashDelta = getTradeCashDelta(deal);
  const cash = cashDelta > 0
    ? `${moneyText(cashDelta)} from customer`
    : cashDelta < 0 ? `${moneyText(Math.abs(cashDelta))} from you` : 'no cash';
  return `Trade offer: you give ${selected}; customer gives ${received}; cash ${cash}; offer value ${moneyText(getTradePlayerOfferValue(deal))}; requested value ${moneyText(getTradeRequestedValue(deal))}.`;
}

function evaluateTradeOffer(deal) {
  if (!deal || deal.dealType !== 'trade') return { canSubmit: false, accepted: false, reason: 'not a trade encounter' };
  const selectedItems = getSelectedTradeInventoryItems(deal);
  if (!selectedItems.length) return { canSubmit: false, accepted: false, reason: 'no trade inventory selected' };
  const uniqueIds = new Set(selectedItems.map(item => item.instanceId));
  if (uniqueIds.size !== selectedItems.length) return { canSubmit: false, accepted: false, reason: 'duplicate inventory instance selected' };
  const cashDelta = getTradeCashDelta(deal);
  if (cashDelta < 0 && Math.abs(cashDelta) > state.money) return { canSubmit: false, accepted: false, reason: `cannot afford required trade cash ${moneyText(Math.abs(cashDelta))}` };
  const playerValue = getTradePlayerOfferValue(deal);
  const requestedValue = getTradeRequestedValue(deal) + Math.max(0, -cashDelta) - Math.max(0, cashDelta);
  const traitFairness = Number(deal.traits?.tradeFairness) || 1;
  const requiredRatio = Math.max(0.45, Math.min(1.15, 0.72 + traitFairness * 0.18 + (Number(deal.traits?.haggleAggression) || 0) * 0.03));
  const ratio = playerValue / Math.max(1, requestedValue);
  const stronglyMatchedTags = selectedItems.some(item => tagsOverlap([item.category, ...(item.tags || [])], deal.pool?.requestedItemTags || []));
  const accepted = ratio >= requiredRatio || (stronglyMatchedTags && ratio >= requiredRatio - 0.15);
  const endsEncounter = ratio < Math.max(0.25, requiredRatio - 0.45) && (Number(deal.traits?.haggleAggression) || 0) >= 4;
  return {
    canSubmit: true,
    accepted,
    endsEncounter,
    reason: accepted ? 'accepted value/tag fit' : ratio < requiredRatio ? 'offer value too low' : 'offer did not fit requested tags',
    selectedItems,
    selectedIds: selectedItems.map(item => item.instanceId),
    playerValue,
    requestedValue,
    cashDelta,
    ratio,
    requiredRatio
  };
}

function getTradeSuppliedItems(deal) {
  const supplied = Array.isArray(deal?.requestedInventoryItems)
    ? deal.requestedInventoryItems
    : deal?.requestedInventoryItem ? [deal.requestedInventoryItem] : [];
  const seen = new Set();
  return supplied.filter(item => {
    if (!item?.instanceId || seen.has(item.instanceId)) return false;
    seen.add(item.instanceId);
    return true;
  });
}

function getTradeReceivedItems(deal) {
  const received = Array.isArray(deal?.receivedItems)
    ? deal.receivedItems
    : deal?.item ? [deal.item] : [];
  return received.filter(item => item && (item.id || item.itemId));
}

function validateTradeCommit(deal, cashDelta) {
  if (!deal || deal.dealType !== 'trade') return 'not a trade deal';
  if (deal.committedTransaction) return 'transaction already committed';
  const receivedItems = getTradeReceivedItems(deal);
  if (!receivedItems.length) return `successful trade has no received item: ${deal?.pool?.id || '(missing pool)'}`;
  const unresolvedItem = receivedItems.find(item => !getItem(item.itemId || item.id));
  if (unresolvedItem) return `successful trade has unresolvable received item_id: ${unresolvedItem.itemId || unresolvedItem.id}`;
  const suppliedItems = getTradeSuppliedItems(deal);
  if (deal.pool?.requestedItemTags?.length && !suppliedItems.length) return `successful trade requires a supplied inventory item but none was selected: ${deal.pool.id}`;
  const missingSupplied = suppliedItems.find(item => !state.inventory.some(current => current.instanceId === item.instanceId));
  if (missingSupplied) return `successful trade supplied inventory instance is missing or stale: ${missingSupplied.instanceId}`;
  const roundedCashDelta = Math.round(Number(cashDelta) || 0);
  if (roundedCashDelta < 0 && Math.abs(roundedCashDelta) > state.money) return `successful trade cash payment exceeds available cash: ${Math.abs(roundedCashDelta)} > ${state.money}`;
  return '';
}

function formatTradeSummary(removedItems, addedItems, cashDelta) {
  const gave = removedItems.length
    ? removedItems.map(item => `${item.name} [${item.instanceId}]`).join(', ')
    : 'no item';
  const got = addedItems.length
    ? addedItems.map(item => `${item.name} [${item.instanceId}]`).join(', ')
    : 'no item';
  const cash = cashDelta > 0
    ? `; cash received ${moneyText(cashDelta)}`
    : cashDelta < 0 ? `; cash paid ${moneyText(Math.abs(cashDelta))}` : '; no cash';
  return `gave ${gave}; received ${got}${cash}`;
}

function commitTrade(deal, cashDelta, reputationDelta, notes) {
  const validationError = validateTradeCommit(deal, cashDelta);
  if (validationError) {
    console.error(`[transaction] ${validationError}`);
    return false;
  }

  const suppliedItems = getTradeSuppliedItems(deal);
  const receivedItems = getTradeReceivedItems(deal);
  const removedItems = [];
  let acquisitionCost = Math.max(1, Math.round(deal.askPrice * 0.25));
  if (suppliedItems.length) acquisitionCost = suppliedItems.reduce((sum, item) => sum + (Number(item.acquisitionCost) || 0), 0);

  deal.committedTransaction = true;
  for (const suppliedItem of suppliedItems) {
    const removed = removeInventoryInstance(suppliedItem.instanceId);
    if (!removed) {
      console.error(`[transaction] trade supplied inventory disappeared during commit: ${suppliedItem.instanceId}`);
      return false;
    }
    removedItems.push(copyInventoryDebugItem(removed));
  }

  const roundedCashDelta = Math.round(Number(cashDelta) || 0);
  state.money += roundedCashDelta;
  state.reputation = Math.max(0, state.reputation + Math.round(Number(reputationDelta) || 0));

  const receivedAcquisitionCost = Math.max(1, acquisitionCost - Math.max(0, roundedCashDelta) + Math.max(0, -roundedCashDelta));
  const addedItems = receivedItems.map(item => {
    const inventoryItem = createInventoryItem(item, receivedAcquisitionCost, deal.customer.id, deal.pool.conditionOverride, notes);
    state.inventory.push(inventoryItem);
    return copyInventoryDebugItem(inventoryItem);
  });

  deal.transaction = {
    type: 'trade',
    action: deal.resolvedAction,
    cashDelta: roundedCashDelta,
    removedItems,
    addedItems,
    itemId: addedItems[0]?.itemId || null,
    itemName: addedItems[0]?.name || null,
    inventoryInstanceId: addedItems[0]?.instanceId || null
  };
  deal.transaction.summary = formatTradeSummary(removedItems, addedItems, roundedCashDelta);
  return true;
}

function resolveChoice(action) {
  const deal = state.currentDeal;
  if (state.isResolving || state.isGameOver || !deal || deal.resolvedAction || state.conversation?.phase !== 'choices') return;
  clearDealTransaction(deal);
  if (isNpcBuying(deal.dealType) && action !== 'refuse' && !deal.selectedInventoryInstanceId) return;
  if (action !== 'submitTradeOffer') clearInventorySelection();
  if (action === 'lowball' && deal.lowballRejected) return;
  if (action === 'markup' && deal.markupRejected) return;
  if (isShopBuying(deal.dealType) && action === 'buyAsk' && deal.availableCash < deal.defaultOffer) return;
  if (isShopBuying(deal.dealType) && action === 'lowball' && deal.lowballPrice <= 0) return;
  state.isResolving = true;
  renderChoices();

  const beforeState = snapshotState();
  let result;

  if (isConsequenceDeal(deal.dealType)) {
    result = resolveConsequenceChoice(action, deal);
  } else if (isShopBuying(deal.dealType)) {
    result = resolveBuy(action, deal);
  } else if (isNpcBuying(deal.dealType)) {
    result = resolveSell(action, deal);
  } else {
    result = resolveTrade(action, deal);
  }

  const resolved = typeof result === 'string' ? choiceResult(result) : result;
  let outcome = resolved.text;
  if (resolved.runRiskCheck) {
    const consequence = runRiskCheck();
    if (consequence) outcome += ` ${consequence}`;
  }

  clampMoney();
  const afterState = snapshotState();
  const outcomeClass = classifyChoiceOutcome(action, deal, beforeState, afterState);
  recordTurnHistory(action, deal, beforeState, afterState);
  renderAll();
  renderLog(outcome);

  if (resolved.keepEncounterOpen) {
    state.isResolving = false;
    state.conversation = {
      phase: 'choices',
      lines: [],
      index: 0,
      selectedAction: action,
      outcome
    };
    setDialogueSpeaker('customer');
    typeLine(customerDialogue(getCustomerReactionKind(action, outcomeClass, deal), deal));
    renderAll();
    renderLog(outcome);
    return;
  }

  state.conversation = {
    phase: 'resolved',
    lines: [
      { speaker: 'customer', text: deal.dealType === THUG_CONSEQUENCE_TYPE ? 'Smart enough, or entertaining enough. Both spend.' : isConsequenceDeal(deal.dealType) ? 'That is all for now.' : customerDialogue(getCustomerReactionKind(action, outcomeClass, deal), deal) },
      { speaker: 'clerk', text: outcome },
      { speaker: 'customer', text: deal.dealType === THUG_CONSEQUENCE_TYPE ? 'Lock up tight. I like a challenge.' : isConsequenceDeal(deal.dealType) ? 'Keep the counter clean.' : customerDialogue('exit', deal) }
    ],
    index: 0,
    selectedAction: action,
    outcome
  };
  showConversationLine(state.conversation.lines[0]);

  if (shouldCheckBankruptcy()) {
    state.conversation.lines = state.conversation.lines.slice(0, 2);
  }
}

function confiscateInventoryInstance(instanceId) {
  if (!instanceId) return null;
  const item = state.inventory.find(entry => entry.instanceId === instanceId);
  if (!item) {
    console.error(`[consequence] confiscation target missing inventory instance: ${instanceId}`);
    return null;
  }
  return removeInventoryInstance(instanceId);
}

function getAvailableInventoryForThug() {
  const seen = new Set();
  return state.inventory.filter(item => {
    if (!item || !item.instanceId || seen.has(item.instanceId)) return false;
    seen.add(item.instanceId);
    return state.inventory.some(current => current.instanceId === item.instanceId);
  });
}

function getInventoryItemValue(item) {
  return Number(item?.targetSellPrice || item?.baseValue || item?.acquisitionCost || 0) || 0;
}

function getThugInventoryTarget() {
  return [...getAvailableInventoryForThug()].sort((a, b) =>
    getInventoryItemValue(b) - getInventoryItemValue(a) ||
    (b.heat || 0) - (a.heat || 0) ||
    String(a.instanceId).localeCompare(String(b.instanceId))
  )[0] || null;
}

function getThugCashLossAmount(rate, minimum) {
  const availableCash = Math.max(0, Math.round(Number(state.money) || 0));
  if (availableCash <= 0) return 0;
  return Math.min(availableCash, Math.max(1, Math.round(Math.max(minimum, availableCash * rate))));
}

function reduceTracksuitPressure(multiplier) {
  const before = getFactionPressure(TRACKSUIT_CREW_FACTION_ID);
  return setFactionPressure(TRACKSUIT_CREW_FACTION_ID, Math.floor(before * multiplier));
}

function appendThugHistory(deal, line) {
  if (!Array.isArray(deal.thugHistoryLines)) deal.thugHistoryLines = [];
  deal.thugHistoryLines.push(line);
}

function finishThugConsequence(deal, result, riskMultiplier) {
  const consequence = deal.consequence;
  const pressure = reduceTracksuitPressure(riskMultiplier);
  deal.tracksuitPressureResolution = {
    before: pressure.before,
    after: pressure.after,
    delta: pressure.delta,
    reason: 'Tracksuit thug consequence resolved tracksuit crew pressure.'
  };
  appendThugHistory(deal, `Tracksuit pressure source summary: ${consequence.metadata?.pressureSourceSummary || 'no source details recorded'}.`);
  appendThugHistory(deal, `Tracksuit consequence queued at pressure ${consequence.metadata?.factionPressureAtQueue ?? 'unknown'}; faction: ${consequence.factionId || consequence.metadata?.factionId || 'unknown'}; queue roll occurred on T${consequence.sourceTurn}; reason: ${consequence.reason}.`);
  deal.consequenceResult = result;
  markConsequenceResolved(consequence, result);
  state.thugConsequenceCooldownUntil = state.turn + SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS;
  state.activeConsequence = null;
  return choiceResult(result, { runRiskCheck: false });
}

function resolveThugConsequence(action, deal) {
  const consequence = deal.consequence;
  if (!['thugCash', 'thugItem', 'thugRefuse'].includes(action)) {
    return choiceResult('The tracksuit waits. That was not one of the bad options.', { runRiskCheck: false, keepEncounterOpen: true });
  }
  if (consequence.resolved) {
    console.error(`[consequence] consequence resolving more than once: ${consequence.id}`);
    return choiceResult('This consequence was already resolved.', { runRiskCheck: false });
  }
  if (!beginDealResolution(deal, action)) return choiceResult('The encounter was already resolved.', { runRiskCheck: false });

  if (action === 'thugCash') {
    const cashBefore = Math.max(0, Math.round(Number(state.money) || 0));
    const loss = getThugCashLossAmount(THUG_CASH_HANDOVER_RATE, THUG_CASH_HANDOVER_MIN);
    state.money = Math.max(0, cashBefore - loss);
    const result = loss > 0
      ? `The tracksuit thug takes ${moneyText(loss)} from the drawer and calls it a neighborhood subscription.`
      : 'The drawer is empty. The tracksuit thug finds lint, insults the lint, and lets the risk cool.';
    appendThugHistory(deal, `Robbery cash handover: ${moneyText(cashBefore)} -> ${moneyText(state.money)}; stolen ${moneyText(loss)}.`);
    return finishThugConsequence(deal, result, THUG_HANDOVER_PRESSURE_MULTIPLIER);
  }

  if (action === 'thugItem') {
    const target = getThugInventoryTarget();
    if (!target) {
      deal.resolvedAction = null;
      return choiceResult('There is no valid shelf item to hand over. Pick cash or refuse.', { runRiskCheck: false, keepEncounterOpen: true });
    }
    const removed = removeInventoryInstance(target.instanceId);
    if (!removed) {
      deal.resolvedAction = null;
      return choiceResult('That shelf item is already gone. Pick again.', { runRiskCheck: false, keepEncounterOpen: true });
    }
    const result = `The tracksuit thug walks out with ${removed.name} [${removed.instanceId}] and the smug posture of a man who just invented theft.`;
    appendThugHistory(deal, `Robbery inventory handover: stolen ${removed.name} [${removed.instanceId}], estimated value ${moneyText(getInventoryItemValue(removed))}.`);
    return finishThugConsequence(deal, result, THUG_HANDOVER_PRESSURE_MULTIPLIER);
  }

  const cashBefore = Math.max(0, Math.round(Number(state.money) || 0));
  const loss = getThugCashLossAmount(THUG_REFUSE_CASH_RATE, THUG_REFUSE_CASH_MIN);
  state.money = Math.max(0, cashBefore - loss);
  const target = getThugInventoryTarget();
  const removed = target ? removeInventoryInstance(target.instanceId) : null;
  const reputationBefore = state.reputation;
  state.reputation = Math.max(0, state.reputation - 1);
  const effects = [
    loss > 0 ? `${moneyText(loss)} stolen` : 'no cash available',
    removed ? `${removed.name} [${removed.instanceId}] stolen` : 'no inventory available',
    reputationBefore !== state.reputation ? `reputation ${reputationBefore} -> ${state.reputation}` : 'reputation already bottomed out'
  ];
  const result = `You refuse. He disagrees with the furniture, the register, and your business model: ${effects.join('; ')}.`;
  appendThugHistory(deal, `Robbery refusal retaliation: cash ${moneyText(cashBefore)} -> ${moneyText(state.money)}; ${removed ? `stolen ${removed.name} [${removed.instanceId}]` : 'no item stolen'}; reputation ${reputationBefore} -> ${state.reputation}.`);
  return finishThugConsequence(deal, result, THUG_REFUSE_PRESSURE_MULTIPLIER);
}

function resolveCopConsequence(action, deal) {
  const consequence = deal.consequence;
  if (!['copCooperate', 'copDeny', 'copBribe'].includes(action)) {
    return choiceResult('The officer waits. That was not an answer.', { runRiskCheck: false, keepEncounterOpen: true });
  }
  if (consequence.resolved) {
    console.error(`[consequence] consequence resolving more than once: ${consequence.id}`);
    return choiceResult('This consequence was already resolved.', { runRiskCheck: false });
  }
  if (!beginDealResolution(deal, action)) return choiceResult('The encounter was already resolved.', { runRiskCheck: false });

  let result = '';
  let riskDelta = COP_RISK_ADJUSTMENTS.failedObstruction;
  let riskReason = 'Failed obstruction did not relieve police attention.';
  const trackedInstanceId = consequence.triggeringInventoryInstanceId;
  const target = trackedInstanceId
    ? state.inventory.find(item => item.instanceId === trackedInstanceId) || null
    : null;
  const trackedItemName = consequence.metadata?.triggeringItemName || deal.item?.name || 'tracked evidence';
  const evidenceMissing = Boolean(trackedInstanceId) && !target;
  const warningsBefore = state.copWarnings;
  const strikesBefore = state.copStrikes;
  const reputationBefore = state.reputation;
  const moneyBefore = state.money;
  const inventoryCountBefore = state.inventory.length;

  if (action === 'copCooperate') {
    if (target) {
      const removed = confiscateInventoryInstance(target.instanceId);
      result = removed
        ? `Officer confiscated ${removed.name} [${removed.instanceId}] and issued a warning.`
        : 'The officer tried to tag evidence, but the item was already gone.';
      riskDelta = COP_RISK_ADJUSTMENTS.voluntarySurrender;
      riskReason = `Voluntary surrender of tracked evidence ${trackedItemName}.`;
      state.copWarnings += 1;
    } else {
      result = `The cops search the shop but find nothing tied to the ${trackedItemName} deal. The tracked evidence item was no longer present.`;
      riskDelta = COP_RISK_ADJUSTMENTS.searchFoundNothing;
      riskReason = `Search found nothing because tracked evidence ${trackedItemName} was no longer present.`;
    }
    state.reputation = Math.max(0, state.reputation - 1);
  } else if (action === 'copDeny') {
    if (evidenceMissing) {
      result = state.copWarnings > 0
        ? 'The cop checks the shelves and finds nothing tied to the deal. He leaves irritated, but your name stays in the notebook.'
        : `The cop searches twice and finds air where the ${trackedItemName} used to be. Disposal beats paperwork today.`;
      riskDelta = COP_RISK_ADJUSTMENTS.searchFoundNothing;
      riskReason = `Unsuccessful search: tracked evidence ${trackedItemName} was disposed of before the visit.`;
    } else if (target) {
      const removed = confiscateInventoryInstance(target.instanceId);
      result = removed
        ? `The denial falls apart. Officer confiscated ${removed.name} [${removed.instanceId}].`
        : 'The denial falls apart, but the suspected item is already gone.';
      riskDelta = COP_RISK_ADJUSTMENTS.foundAfterDenial;
      riskReason = `Denial failed and police found and confiscated tracked evidence ${trackedItemName}.`;
      state.reputation = Math.max(0, state.reputation - 2);
      state.copWarnings += 1;
      state.copStrikes += 1;
    }
  } else if (action === 'copBribe') {
    const bribe = deal.bribeAmount;
    if (!Number.isFinite(bribe) || bribe <= 0 || bribe > state.money) {
      console.error(`[consequence] invalid bribe amount: ${bribe}`);
      deal.resolvedAction = null;
      return choiceResult('You cannot make that bribe with the cash in the drawer.', { runRiskCheck: false, keepEncounterOpen: true });
    }
    state.money -= bribe;
    const successChance = Math.max(20, Math.min(75, 58 + state.reputation * 2 - state.copRisk * 3));
    if (chance(successChance)) {
      result = `The bribe lands. You pay ${moneyText(bribe)} and the officer forgets the shelf for now.`;
      riskDelta = COP_RISK_ADJUSTMENTS.successfulBribe;
      riskReason = 'Successful bribe reduced immediate pressure moderately.';
    } else {
      state.reputation = Math.max(0, state.reputation - 2);
      state.copWarnings += 1;
      state.copStrikes += 1;
      result = `The bribe fails. You still lose ${moneyText(bribe)}, and the officer looks more interested than before.`;
      riskReason = 'Failed deceptive response did not relieve police attention.';
    }
  }

  const riskBefore = state.copRisk;
  const residualFloor = evidenceMissing && riskDelta === COP_RISK_ADJUSTMENTS.searchFoundNothing && !consequence.metadata?.debug
    ? COP_RISK_INVESTIGATION_RESIDUAL_FLOOR
    : 0;
  state.copRisk = Math.max(residualFloor, riskBefore + riskDelta, 0);
  const appliedRiskDelta = state.copRisk - riskBefore;
  const riskFloorAdjustment = appliedRiskDelta - riskDelta;
  deal.copRiskResolution = {
    before: riskBefore,
    after: state.copRisk,
    delta: state.copRisk - riskBefore,
    reason: riskReason
  };
  appendInvestigationHistory(deal, `Investigation source: T${consequence.sourceTurn}; tracked ${trackedItemName} [${trackedInstanceId || 'no inventory instance'}]; earliest T${consequence.earliestTurn}; ${consequence.metadata?.schedulingStatus || 'selected/active'}.`);
  appendInvestigationHistory(deal, `Resolution evidence: ${target ? `present as ${trackedItemName} [${trackedInstanceId}]` : `missing (${trackedItemName} [${trackedInstanceId || 'untracked'}])`}.`);
  const penalties = [];
  if (state.inventory.length !== inventoryCountBefore) penalties.push(`tracked evidence confiscated: ${trackedItemName} [${trackedInstanceId}]`);
  if (state.money !== moneyBefore) penalties.push(`money ${moneyText(moneyBefore)} -> ${moneyText(state.money)}`);
  if (state.reputation !== reputationBefore) penalties.push(`reputation ${reputationBefore} -> ${state.reputation}`);
  if (state.copWarnings !== warningsBefore) penalties.push(`warnings ${warningsBefore} -> ${state.copWarnings}`);
  if (state.copStrikes !== strikesBefore) penalties.push(`strikes ${strikesBefore} -> ${state.copStrikes}`);
  appendInvestigationHistory(deal, `Penalties: ${penalties.length ? penalties.join('; ') : 'none'}.`);
  const unchanged = [];
  if (state.inventory.length === inventoryCountBefore) unchanged.push('inventory');
  if (state.money === moneyBefore) unchanged.push('money');
  if (state.reputation === reputationBefore) unchanged.push('reputation');
  if (state.copWarnings === warningsBefore) unchanged.push('warnings');
  if (state.copStrikes === strikesBefore) unchanged.push('strikes');
  if (unchanged.length) appendInvestigationHistory(deal, `Unchanged: ${unchanged.join(', ')}.`);
  appendInvestigationHistory(deal, `Cop risk: requested adjustment ${signedNumber(riskDelta)}${riskFloorAdjustment ? `; floor/minimum adjustment ${signedNumber(riskFloorAdjustment)}` : ''}; applied reduction ${signedNumber(appliedRiskDelta)} (${riskBefore} -> ${state.copRisk}). Next checkpoint: ${state.nextCopInvestigationRisk}.`);

  deal.consequenceResult = result;
  markConsequenceResolved(consequence, result);
  state.copConsequenceCooldownUntil = state.turn + SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS;
  if (!consequence.metadata?.debug) state.copInvestigationArmed = true;
  state.activeConsequence = null;
  return choiceResult(result, { runRiskCheck: false });
}

function resolveConsequenceChoice(action, deal) {
  if (deal.dealType === COP_CONSEQUENCE_TYPE) return resolveCopConsequence(action, deal);
  if (deal.dealType === THUG_CONSEQUENCE_TYPE) return resolveThugConsequence(action, deal);
  console.error(`[consequence] missing resolver for consequence type: ${deal.dealType}`);
  return choiceResult('This consequence has no resolver. Check the console.', { runRiskCheck: false, keepEncounterOpen: true });
}

function pickRejectedLowballOutcome(deal) {
  const { customer, traits } = deal;
  const tolerant = Number(traits.lowballTolerance) <= 0.55 || Number(traits.haggleAggression) <= 1;
  const volatile = Number(traits.haggleAggression) >= 4 || Number(customer.thugRiskBias) >= 4 || Number(traits.riskTolerance) >= 5;
  const weights = [
    { outcome: 'hold', chanceWeight: 60 + (tolerant ? 20 : 0) - (volatile ? 10 : 0) },
    { outcome: 'raise', chanceWeight: 25 + (volatile ? 10 : 0) - (tolerant ? 10 : 0) },
    { outcome: 'insulted', chanceWeight: 15 + (volatile ? 8 : 0) - (tolerant ? 10 : 0) }
  ].map(entry => ({ ...entry, chanceWeight: Math.max(3, entry.chanceWeight) }));
  return pickWeighted(weights).outcome;
}

function resolveBuy(action, deal) {
  const { item, customer, traits } = deal;
  if (!['refuse', 'buyAsk', 'lowball'].includes(action)) {
    return choiceResult('No deal. The counter stays exactly as dirty as it was.', { runRiskCheck: false });
  }
  if (action === 'lowball' && deal.lowballRejected) {
    return choiceResult('The lowball is already dead on the counter.', { runRiskCheck: false, keepEncounterOpen: true });
  }
  if (action === 'buyAsk' && deal.availableCash < deal.defaultOffer) {
    return choiceResult(`The register is short. The customer wants ${moneyText(deal.askingPrice)} and you cannot make the full-price buy.`, { runRiskCheck: false, keepEncounterOpen: true });
  }
  if (action === 'lowball' && deal.lowballPrice <= 0) {
    return choiceResult('The register is empty. You cannot offer what the drawer cannot cough up.', { runRiskCheck: false, keepEncounterOpen: true });
  }

  if (action === 'refuse') {
    if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    state.reputation = Math.max(0, state.reputation - (customer.trust < 35 ? 1 : 0));
    return choiceResult('You pass. They pocket the item like it might testify later.', { runRiskCheck: false });
  }

  if (action === 'buyAsk') {
    const price = deal.defaultOffer;
    const validationError = validateShopPurchase(deal, price);
    if (validationError) {
      console.error(`[transaction] ${validationError}`);
      return choiceResult('The purchase cannot complete because the offer data is invalid. Check the console.', { runRiskCheck: false, keepEncounterOpen: true });
    }
    if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    if (!commitShopPurchase(deal, price, deal.pool.notes, 1)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    return choiceResult('The item is now yours. So is the problem.', { runRiskCheck: false });
  }

  const offer = deal.lowballPrice;
  const ask = deal.askingPrice ?? deal.askPrice;
  const offerRatio = Math.min(1, offer / Math.max(1, ask));
  const offerPenalty = Math.round((1 - offerRatio) * 35);
  const successChance = Math.max(12, customer.trust + state.reputation * 3 - traits.haggleAggression * 4 - customer.thugRiskBias * 4 - item.heat * 2 - offerPenalty);
  if (chance(successChance)) {
    const validationError = validateShopPurchase(deal, offer);
    if (validationError) {
      console.error(`[transaction] ${validationError}`);
      return choiceResult('The purchase cannot complete because the offer data is invalid. Check the console.', { runRiskCheck: false, keepEncounterOpen: true });
    }
    if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    if (!commitShopPurchase(deal, offer, `Bought via below-asking offer of ${moneyText(offer)} against ${moneyText(ask)} ask.`, 0.9)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    state.reputation += 1;
    return choiceResult(`They take the below-asking ${moneyText(offer)} offer and leave with the confidence of a person ruining several lives.`, { runRiskCheck: false });
  }

  state.reputation = Math.max(0, state.reputation - 1);
  addDealFactionPressure(
    deal,
    Math.ceil(customer.thugRiskBias / 2) + Math.ceil(traits.haggleAggression / 3),
    `rejected lowball against ${customer.displayName}`
  );
  deal.lowballRejected = true;
  const lowballOutcome = pickRejectedLowballOutcome(deal);
  deal.lowballOutcome = lowballOutcome;

  if (lowballOutcome === 'raise') {
    const oldAsk = deal.askingPrice ?? deal.askPrice;
    const raisedAsk = Math.max(oldAsk + 1, Math.round(oldAsk * (1.1 + Math.random() * 0.1)));
    deal.askPrice = raisedAsk;
    deal.askingPrice = raisedAsk;
    deal.defaultOffer = raisedAsk;
    deal.normalAskPrice = raisedAsk;
    deal.availableCash = Math.max(0, state.money);
    appendNegotiationHistory(deal, `Lowball rejected. Asking price increased from ${moneyText(oldAsk)} to ${moneyText(raisedAsk)}.`);
    return choiceResult(`The below-asking ${moneyText(offer)} offer lands badly. Asking price is now ${moneyText(raisedAsk)}.`, { runRiskCheck: false, keepEncounterOpen: true });
  }

  if (lowballOutcome === 'insulted') {
    if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    appendNegotiationHistory(deal, 'Lowball insulted seller. Customer ended the deal.');
    return choiceResult(`The below-asking ${moneyText(offer)} offer insults them clean out the door. No deal.`, { runRiskCheck: false });
  }

  appendNegotiationHistory(deal, `Lowball rejected. Asking price remains ${moneyText(ask)}.`);
  return choiceResult(`The below-asking ${moneyText(offer)} offer lands badly. Asking price stays ${moneyText(ask)}.`, { runRiskCheck: false, keepEncounterOpen: true });
}

function resolveSell(action, deal) {
  const { customer, traits } = deal;
  if (!['refuse', 'sellTag', 'markup'].includes(action)) return choiceResult('No deal. The counter stays exactly as dirty as it was.', { runRiskCheck: false });
  if (action === 'markup' && deal.markupRejected) {
    return choiceResult('The marked-up price already died in the room.', { runRiskCheck: false, keepEncounterOpen: true });
  }
  if (action === 'refuse') {
    if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    return deal.requestSatisfiable
      ? choiceResult('You keep the shelf stocked. The customer leaves empty-handed and unimpressed.', { runRiskCheck: false })
      : choiceResult(`Missed sale. They wanted ${getCustomerBuyRequestPhrase(deal)}, and the shelf had nothing close.`, { runRiskCheck: false });
  }

  const validation = validateSaleSelection(deal);
  if (!validation.valid) {
    const selectedName = validation.inventoryItem?.name || deal.inventoryItem?.name || 'missing item';
    appendSaleHistory(deal, `Sale validation rejected: requested ${getCustomerBuyRequestPhrase(deal)}; selected ${selectedName} [${deal.selectedInventoryInstanceId || 'missing'}]; matched request: no; reason: ${validation.reason}.`);
    resetInvalidSaleSelection(deal);
    return choiceResult('That shelf item is missing or does not match the request. Select another item or refuse the sale.', { runRiskCheck: false, keepEncounterOpen: true });
  }
  const inventoryItem = validation.inventoryItem;
  const item = inventoryItem;
  appendSaleHistory(deal, `Sale validation: requested ${getCustomerBuyRequestPhrase(deal)}; selected ${inventoryItem.name} [${inventoryItem.instanceId}]; matched request: yes.`);

  const price = action === 'markup' ? deal.markupPrice : deal.salePrice;
  const markupRatio = price / Math.max(1, inventoryItem.targetSellPrice);
  const markupRisk = action === 'markup' ? 18 + customer.scamRiskBias * 5 + traits.haggleAggression * 3 : 0;
  const tolerated = markupRatio <= traits.maxMarkupTolerance || chance(45);
  const saleWorks = action !== 'markup' || (tolerated && chance(Math.max(15, customer.trust + state.reputation * 4 - item.heat - markupRisk)));

  if (!saleWorks) {
    state.reputation = Math.max(0, state.reputation - 1);
    state.scamRisk += 3 + customer.scamRiskBias;
    deal.markupRejected = true;
    return choiceResult('The markup fails. They ask if the price includes the lie or if that is extra.', { runRiskCheck: false, keepEncounterOpen: true });
  }

  if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
  removeInventoryInstance(inventoryItem.instanceId);
  state.money += price;
  state.profit += price - inventoryItem.acquisitionCost;
  state.scamRisk += inventoryItem.tags.some(tag => ['locked', 'cursed', 'suspicious', 'fake', 'possibly_fake'].includes(tag)) ? 2 : 0;
  const copRiskBefore = state.copRisk;
  const saleRisk = calculateCopRisk(inventoryItem, { price, multiplier: 0.65 });
  const customerExposure = isExplicitlyIllegalItem(inventoryItem) ? customer.copRiskBias : 0;
  const addedSaleRisk = Math.max(0, saleRisk.addedRisk + customerExposure);
  state.copRisk += addedSaleRisk;
  maybeQueueCopConsequence(deal, `Sale of ${inventoryItem.name}: ${saleRisk.reason}${customerExposure ? `, customer exposure: +${customerExposure}` : ''}`, copRiskBefore, state.copRisk);
  return action === 'markup'
    ? `They pay the markup for ${dealItemLabel(inventoryItem)}. Somewhere, a consumer protection office feels cold.`
    : `Sold ${dealItemLabel(inventoryItem)}. The register opens like it is ashamed of the noise.`;
}
function resolveTrade(action, deal) {
  const { item, customer, traits } = deal;
  if (!['refuse', 'tradeCash', 'tradeAccept', 'submitTradeOffer'].includes(action)) return choiceResult('No deal. The counter stays exactly as dirty as it was.', { runRiskCheck: false });
  if (action === 'refuse') {
    appendTradeHistory(deal, 'Trade no-deal: cancelled/refused; no inventory or money changed.');
    if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    if (traits.haggleAggression >= 4) addDealFactionPressure(deal, 2, `refused aggressive trade from ${customer.displayName}`);
    return choiceResult('You refuse the trade. The bad idea leaves under its own power.', { runRiskCheck: false });
  }

  if (action === 'submitTradeOffer' || action === 'tradeAccept') {
    const evaluation = evaluateTradeOffer(deal);
    appendTradeHistory(
      deal,
      `Trade attempt: selected [${evaluation.selectedIds?.join(', ') || 'none'}]; player-offer value ${moneyText(evaluation.playerValue || 0)}; requested customer-side value ${moneyText(evaluation.requestedValue || getTradeRequestedValue(deal))}; cash component ${moneyText(evaluation.cashDelta || 0)}; outcome ${evaluation.accepted ? 'accepted' : evaluation.endsEncounter ? 'rejected-ended' : 'rejected'}; reason: ${evaluation.reason}.`
    );
    if (!evaluation.canSubmit) {
      return choiceResult(`Trade offer cannot be submitted: ${evaluation.reason}.`, { runRiskCheck: false, keepEncounterOpen: true });
    }
    deal.requestedInventoryItems = evaluation.selectedItems;
    deal.requestedInventoryItem = evaluation.selectedItems[0] || null;
    deal.selectedTradeInventoryInstanceIds = evaluation.selectedIds;

    if (!evaluation.accepted) {
      if (evaluation.endsEncounter) {
        deal.tradeOfferEndedEncounter = true;
        clearInventorySelection();
        if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
        if (traits.haggleAggression >= 4) addDealFactionPressure(deal, 2, `insulting trade offer to ${customer.displayName}`);
        return choiceResult('The offer is bad enough to end the conversation. They take their merchandise and their expression elsewhere.', { runRiskCheck: false });
      }
      return choiceResult('They reject the trade offer. Change the selected items or call it off.', { runRiskCheck: false, keepEncounterOpen: true });
    }

    const cashDelta = evaluation.cashDelta;
    const validationError = validateTradeCommit(deal, cashDelta);
    if (validationError) {
      console.error(`[transaction] ${validationError}`);
      return choiceResult('The trade cannot complete because the item data is invalid. Check the console.', { runRiskCheck: false, keepEncounterOpen: true });
    }
    if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
    if (!commitTrade(deal, cashDelta, 0, 'Acquired via player-selected trade.')) {
      deal.resolvedAction = null;
      return choiceResult('The trade could not complete. Check the console.', { runRiskCheck: false, keepEncounterOpen: true });
    }
    clearInventorySelection();
    const copRiskBefore = state.copRisk;
    const isIllegalTrade = isExplicitlyIllegalItem(item);
    const risk = addHeat(item, { multiplier: 1.15, price: deal.askPrice, riskNote: deal.pool.riskNote });
    applyRiskNote(deal.pool, deal, isIllegalTrade);
    maybeQueueCopConsequence(deal, `Trade for ${item.name}: ${risk.reason}`, copRiskBefore, state.copRisk);
    state.scamRisk += item.tags.includes('mystery') || item.tags.includes('possibly_fake') ? 2 : 0;
    return `Trade accepted. ${deal.transaction.summary}. Everybody pretends this is commerce.`;
  }

  if (action === 'tradeCash') {
    const evaluation = evaluateTradeOffer(deal);
    if (!evaluation.canSubmit) {
      appendTradeHistory(deal, `Trade cash demand rejected before mutation: selected [${evaluation.selectedIds?.join(', ') || 'none'}]; reason: ${evaluation.reason}.`);
      return choiceResult(`Select trade items before demanding cash: ${evaluation.reason}.`, { runRiskCheck: false, keepEncounterOpen: true });
    }
    deal.requestedInventoryItems = evaluation.selectedItems;
    deal.requestedInventoryItem = evaluation.selectedItems[0] || null;
    deal.selectedTradeInventoryInstanceIds = evaluation.selectedIds;
    const successChance = Math.max(10, customer.trust - traits.haggleAggression * 6 - customer.thugRiskBias * 5 + state.reputation * 4);
    appendTradeHistory(deal, `Trade cash demand: selected [${evaluation.selectedIds.join(', ')}]; player-offer value ${moneyText(evaluation.playerValue)}; requested customer-side value ${moneyText(evaluation.requestedValue)}; cash component ${moneyText(deal.cashInstead)}; outcome pending roll.`);
    if (chance(successChance)) {
      const validationError = validateTradeCommit(deal, deal.cashInstead);
      if (validationError) {
        console.error(`[transaction] ${validationError}`);
        return choiceResult('The trade cannot complete because the item data is invalid. Check the console.', { runRiskCheck: false, keepEncounterOpen: true });
      }
      if (!beginDealResolution(deal, action)) return choiceResult('The deal was already resolved.', { runRiskCheck: false });
      if (!commitTrade(deal, deal.cashInstead, 1, `Acquired via trade with demanded ${moneyText(deal.cashInstead)} cash.`)) {
        deal.resolvedAction = null;
        return choiceResult('The trade could not complete. Check the console.', { runRiskCheck: false, keepEncounterOpen: true });
      }
      const copRiskBefore = state.copRisk;
      const isIllegalCashTrade = isExplicitlyIllegalItem(item);
      const cashTradeRisk = addHeat(item, { multiplier: 1.15, price: deal.askPrice, riskNote: deal.pool.riskNote });
      applyRiskNote(deal.pool, deal, isIllegalCashTrade);
      maybeQueueCopConsequence(deal, `Trade for ${item.name}: ${cashTradeRisk.reason}`, copRiskBefore, state.copRisk);
      state.scamRisk += item.tags.includes('mystery') || item.tags.includes('possibly_fake') ? 2 : 0;
      clearInventorySelection();
      return `They add ${moneyText(deal.cashInstead)} and the trade clears: ${deal.transaction.summary}.`;
    }
    addDealFactionPressure(
      deal,
      2 + Math.ceil(customer.thugRiskBias / 2) + Math.ceil(traits.haggleAggression / 3),
      `failed demand-for-cash trade against ${customer.displayName}`
    );
    state.reputation = Math.max(0, state.reputation - 1);
    return 'Demanding cash goes poorly. The room gets smaller and the price of manners goes up.';
  }
}

function getDealTriggerItemId(deal) {
  return deal?.transaction?.itemId || deal?.item?.itemId || deal?.item?.id || deal?.pool?.itemId || null;
}

function getDealTriggerInventoryInstanceId(deal) {
  return deal?.transaction?.inventoryInstanceId || deal?.selectedInventoryInstanceId || deal?.requestedInventoryItem?.instanceId || null;
}

function appendInvestigationHistory(deal, line) {
  if (!deal) return;
  if (!Array.isArray(deal.investigationHistoryLines)) deal.investigationHistoryLines = [];
  deal.investigationHistoryLines.push(line);
}

function maybeQueueCopConsequence(deal, reason = 'cop risk increased', riskBefore = state.copRisk, riskAfter = state.copRisk) {
  const item = deal?.transaction?.inventoryItem || deal?.item;
  if (riskAfter <= riskBefore) return null;

  normalizeConsequenceState();
  if (state.copInvestigationNormalizationLog) {
    appendInvestigationHistory(deal, state.copInvestigationNormalizationLog);
    state.copInvestigationNormalizationLog = '';
  }

  const checkpoint = state.nextCopInvestigationRisk;
  const checkpointReached = riskAfter >= checkpoint;
  appendInvestigationHistory(
    deal,
    `Cop Risk: +${riskAfter - riskBefore} (${riskBefore} -> ${riskAfter}); reason: ${reason}; next investigation checkpoint: ${checkpoint}; ${checkpointReached ? 'checkpoint reached' : 'investigation not queued'}.`
  );

  const pending = hasPendingConsequence(COP_CONSEQUENCE_TYPE) || state.activeConsequence?.type === COP_CONSEQUENCE_TYPE;
  if (pending) {
    appendInvestigationHistory(deal, 'Investigation: not queued because a real cop investigation is already pending or active; original evidence remains tracked.');
    return null;
  }
  if (!state.copInvestigationArmed) {
    appendInvestigationHistory(deal, 'Investigation: not queued because the system is waiting to re-arm after resolution.');
    return null;
  }
  if (!checkpointReached) return null;

  const fullTurns = randomInt(COP_INVESTIGATION_MIN_FULL_TURNS, COP_INVESTIGATION_MAX_FULL_TURNS);
  const earliestTurn = state.turn + fullTurns + 1;
  const triggeringItemName = deal?.transaction?.itemName || item?.name || null;
  const consequence = queueConsequence({
    type: COP_CONSEQUENCE_TYPE,
    sourceTurn: state.turn,
    triggeringCharacterId: deal?.customer?.id || state.currentCustomer?.id || null,
    triggeringDealId: deal?.pool?.id || deal?.blueprint?.id || null,
    triggeringItemId: getDealTriggerItemId(deal),
    triggeringInventoryInstanceId: getDealTriggerInventoryInstanceId(deal),
    reason,
    earliestTurn,
    metadata: {
      copRiskAtQueue: riskAfter,
      riskBefore,
      riskAfter,
      investigationCheckpoint: checkpoint,
      fullInterveningTurns: fullTurns,
      delay: fullTurns + 1,
      triggeringItemName
    }
  });
  if (consequence) {
    const nextCheckpoint = getNextCopInvestigationCheckpoint(checkpoint);
    state.nextCopInvestigationRisk = nextCheckpoint;
    state.copInvestigationArmed = false;
    const normalTurnsAtQueue = state.normalEncountersSinceSpecial;
    const cooldownSatisfiedAtQueue = normalTurnsAtQueue >= SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS;
    consequence.metadata.normalEncountersAtQueue = normalTurnsAtQueue;
    consequence.metadata.sharedCooldownSatisfiedAtQueue = cooldownSatisfiedAtQueue;
    appendInvestigationHistory(
      deal,
      `Investigation queued: source T${state.turn}; tracked ${triggeringItemName || consequence.triggeringItemId} [${consequence.triggeringInventoryInstanceId || 'no inventory instance'}]; first evidence-eligible turn T${earliestTurn}; ${normalTurnsAtQueue} normal encounters since previous special; shared cooldown already satisfied: ${cooldownSatisfiedAtQueue ? 'yes' : 'no'}.`
    );
    appendInvestigationHistory(deal, cooldownSatisfiedAtQueue
      ? 'Scheduling: evidence delay is still pending; the shared special-encounter cooldown is already satisfied, so no six-new-normal-encounter wait begins here. Once evidence-eligible, selection rises 25% per eligible turn through a guarantee on the tenth normal encounter since the previous special.'
      : `Scheduling: evidence delay and shared cooldown are separate; the shared cooldown needs ${SPECIAL_ENCOUNTER_MIN_NORMAL_TURNS - normalTurnsAtQueue} more complete normal encounter(s). Once both are satisfied, selection rises 25% per eligible turn through a guarantee on the tenth normal encounter since the previous special.`);
    appendInvestigationHistory(deal, `Next investigation checkpoint advanced: ${checkpoint} -> ${nextCheckpoint}.`);
  }
  return consequence;
}

function getTracksuitPressureSourceSummary() {
  const sources = getFactionPressureSources(TRACKSUIT_CREW_FACTION_ID);
  if (!sources.length) return '';
  return sources
    .map(source => `T${source.turn} ${source.customerName || source.customerId || 'unknown'} (${source.reason}, +${source.amount})`)
    .join('; ');
}

function canQueueThugConsequence() {
  normalizeConsequenceState();
  if (getFactionPressure(TRACKSUIT_CREW_FACTION_ID) < TRACKSUIT_CONSEQUENCE_MIN_PRESSURE) return false;
  if (state.turn < state.thugConsequenceCooldownUntil) return false;
  if (hasPendingConsequence(THUG_CONSEQUENCE_TYPE) || state.activeConsequence?.type === THUG_CONSEQUENCE_TYPE) return false;
  return true;
}

function queueThugConsequence(reason = 'tracksuit crew pressure came due', metadata = {}) {
  if (!canQueueThugConsequence() && !metadata.debug) return null;
  const tracksuitPressure = getFactionPressure(TRACKSUIT_CREW_FACTION_ID);
  return queueConsequence({
    type: THUG_CONSEQUENCE_TYPE,
    sourceTurn: state.turn,
    triggeringCharacterId: state.currentDeal?.customer?.id || state.currentCustomer?.id || null,
    triggeringDealId: state.currentDeal?.pool?.id || state.currentDeal?.blueprint?.id || null,
    triggeringItemId: getDealTriggerItemId(state.currentDeal),
    triggeringInventoryInstanceId: getDealTriggerInventoryInstanceId(state.currentDeal),
    factionId: TRACKSUIT_CREW_FACTION_ID,
    reason,
    earliestTurn: state.turn + THUG_CONSEQUENCE_MIN_FULL_TURNS + 1,
    metadata: {
      factionId: TRACKSUIT_CREW_FACTION_ID,
      factionPressureAtQueue: tracksuitPressure,
      pressureBefore: tracksuitPressure,
      pressureSources: getFactionPressureSources(TRACKSUIT_CREW_FACTION_ID).map(source => ({ ...source })),
      pressureSourceSummary: getTracksuitPressureSourceSummary(),
      delay: THUG_CONSEQUENCE_MIN_FULL_TURNS + 1,
      ...metadata
    }
  });
}

function runRiskCheck() {
  const copChance = Math.min(45, state.copRisk * 4);
  const tracksuitPressure = getFactionPressure(TRACKSUIT_CREW_FACTION_ID);
  const thugChance = Math.min(40, tracksuitPressure * 5);
  const scamChance = Math.min(38, state.scamRisk * 5);

  if (state.copRisk > 0 && chance(copChance)) {
    maybeQueueCopConsequence(state.currentDeal, 'A patrol noticed suspicious activity');
    return 'A marked cruiser rolls past the window. This is not over.';
  }
  if (tracksuitPressure > 0 && chance(thugChance)) return thugBust();
  if (state.scamRisk > 0 && chance(scamChance)) return angryCustomer();
  return '';
}

function copBust() {
  maybeQueueCopConsequence(state.currentDeal, 'Cop risk reached the front window');
  return 'A marked cruiser slows outside. Any real trouble will happen face to face.';
}

function thugBust() {
  const consequence = queueThugConsequence('Tracksuit crew pressure drew a tracksuit problem to the front door');
  return consequence
    ? 'A tracksuit problem clocks the cameras from outside. This bad deal is coming in person.'
    : 'The wrong people notice the shop, but tonight they keep walking.';
}

function angryCustomer() {
  const refund = randomInt(6, 24);
  state.money = Math.max(0, state.money - refund);
  state.reputation = Math.max(0, state.reputation - 2);
  state.scamRisk = Math.max(0, Math.floor(state.scamRisk * 0.3));
  return `The refund hurts, but the lesson is tax deductible. Probably not. Lose ${moneyText(refund)}.`;
}

async function exitCustomer() {
  resetAutoProgress();
  if (state.isGameOver || state.isTransitioningCustomer) return;
  state.isResolving = true;
  renderChoices();
  setDealButtonsDisabled(true);
  await exitCurrentCustomer();
  if (shouldCheckBankruptcy()) {
    endGame();
    return;
  }
  if (!state.isGameOver) startNextCustomer();
}

function endGame() {
  resetAutoProgress();
  state.isGameOver = true;
  state.isResolving = true;
  state.money = 0;
  state.currentDeal = null;
  state.currentCustomer = null;
  state.conversation = null;
  clearInterval(typingTimer);
  renderCustomer('exiting');
  renderAll();
  els.choices.innerHTML = '';
  els.speaker.textContent = 'BANKRUPT';
  els.dialogue.textContent = 'The register is empty. The pawn shop now belongs to whoever can lift it.';
  renderLog(`BANKRUPTCY: ${moneyText(state.money)}. One Star Pawn closes with two stars worth of legal exposure.`);
}


function setLowerPanel(panelName) {
  if (!els.game || !els.expandableInventory || !els.openInventory || !els.openShopLog || !els.closeInventory) return;
  const requestedPanel = panelName === 'inventory' || panelName === 'log' ? panelName : 'closed';
  activeLowerPanel = activeLowerPanel === requestedPanel ? 'closed' : requestedPanel;

  const isOpen = activeLowerPanel !== 'closed';
  const showInventory = activeLowerPanel === 'inventory';
  const showLog = activeLowerPanel === 'log';
  const logPanel = els.log?.closest('.log-panel');

  if (els.inventoryPanel) els.inventoryPanel.hidden = !showInventory;
  if (logPanel) logPanel.hidden = !showLog;
  els.openInventory.classList.toggle('is-active', showInventory);
  els.openShopLog.classList.toggle('is-active', showLog);
  els.openInventory.setAttribute('aria-expanded', String(showInventory));
  els.openShopLog.setAttribute('aria-expanded', String(showLog));
  els.closeInventory.hidden = !isOpen;
  els.closeInventory.setAttribute('aria-expanded', String(isOpen));

  if (isOpen) {
    els.expandableInventory.hidden = false;
    window.requestAnimationFrame(() => els.game.classList.add('inventory-open'));
    return;
  }

  els.game.classList.remove('inventory-open');
  const hidePanel = () => {
    if (!els.game.classList.contains('inventory-open')) els.expandableInventory.hidden = true;
  };
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hidePanel();
  } else {
    window.setTimeout(hidePanel, 260);
  }
}

function setInventoryOpen(isOpen) {
  if (isOpen) {
    setLowerPanel('inventory');
    return;
  }
  setLowerPanel('closed');
}

if (els.openInventory) {
  els.openInventory.addEventListener('click', () => setLowerPanel('inventory'));
}

if (els.openShopLog) {
  els.openShopLog.addEventListener('click', () => setLowerPanel('log'));
}

if (els.closeInventory) {
  els.closeInventory.addEventListener('click', event => {
    event.stopPropagation();
    setInventoryOpen(false);
  });
}

if (els.dialoguePanel) {
  els.dialoguePanel.addEventListener('click', () => advanceConversation());
}

if (els.dialogueNext) {
  els.dialogueNext.addEventListener('click', event => {
    event.stopPropagation();
    advanceConversation();
  });
}

if (els.clearHistory) {
  els.clearHistory.addEventListener('click', () => {
    turnHistory = [];
    renderHistory();
  });
}

setInventoryOpen(false);
renderStats();
renderInventory();
renderHistory();
window.debugQueueCopConsequence = debugQueueCopConsequence;
window.debugQueueThugConsequence = debugQueueThugConsequence;
window.ONE_STAR_PAWN_TEST_HOOKS = {
  data: GAME_DATA,
  state,
  get activeCustomers() {
    return activeCustomers;
  },
  setActiveCustomers(customers) {
    activeCustomers = customers;
  },
  getItem,
  getCharacter,
  getTraits,
  createInventoryItem,
  removeInventoryInstance,
  getHeldNormalEncounters,
  getInventoryAgeDemandMultiplier,
  getItemDemandLevel,
  getItemLiquidityDemandMultiplier,
  getDemandCandidatesForPool,
  getEligibleDemandCandidatesForPool,
  getBuyPoolDemandMultiplier,
  getSelectablePoolsForCharacter,
  buildDeal,
  applySelectedInventoryItemToDeal,
  validateSaleSelection,
  evaluateSaleCompatibility,
  getEligibleInventoryItemsForPool,
  evaluateTradeOffer,
  resolveBuy,
  resolveSell,
  resolveTrade,
  chooseNextCustomerWithPools,
  rememberNormalCustomer,
  getConsecutiveNormalCustomerCount,
  snapshotState,
  buildHistoryLines,
  getInventoryDelta,
  copyInventoryDebugItem,
  formatSelectionDiagnostics,
  constants: {
    NORMAL_CUSTOMER_MAX_CONSECUTIVE,
    NORMAL_CUSTOMER_HISTORY_LIMIT,
    BUY_FROM_SHOP_ECONOMY
  }
};
if (!window.ONE_STAR_PAWN_TEST_MODE) {
  window.requestAnimationFrame(() => els.game?.classList.add('ui-ready'));
  initializeNpcRotation().then(startNextCustomer);
}
