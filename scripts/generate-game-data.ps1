$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
$TablesDir = Join-Path $Root 'one_star_pawn_tables'

function Split-List([string]$Value) {
  if ([string]::IsNullOrWhiteSpace($Value)) { return @() }
  return @($Value -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
}

function Split-List-Or-Null([string]$Value) {
  $Items = Split-List $Value
  if ($Items.Count -eq 0) { return $null }
  return $Items
}

function To-Number($Value, [double]$Fallback = 0) {
  $Parsed = 0.0
  if ([double]::TryParse([string]$Value, [Globalization.NumberStyles]::Float, [Globalization.CultureInfo]::InvariantCulture, [ref]$Parsed)) { return $Parsed }
  return $Fallback
}

function Assert-Required($Row, [string]$Field, [string]$RowLabel, [System.Collections.Generic.List[string]]$Errors) {
  if ([string]::IsNullOrWhiteSpace([string]$Row.$Field)) { $Errors.Add("${RowLabel}: missing ${Field}") }
}

function Assert-Required-Number($Row, [string]$Field, [string]$RowLabel, [System.Collections.Generic.List[string]]$Errors) {
  Assert-Required $Row $Field $RowLabel $Errors
  $Parsed = 0.0
  if (![string]::IsNullOrWhiteSpace([string]$Row.$Field) -and ![double]::TryParse([string]$Row.$Field, [Globalization.NumberStyles]::Float, [Globalization.CultureInfo]::InvariantCulture, [ref]$Parsed)) {
    $Errors.Add("${RowLabel}: ${Field} must be numeric, got `"$($Row.$Field)`"")
  }
}

function To-Bool($Value) {
  return ([string]$Value).ToLowerInvariant() -eq 'true'
}

function Trust-Score([string]$Label) {
  if ($Label -match '^(\d+)') { return [Math]::Min(100, [Math]::Max(0, ([int]$Matches[1] * 12) + 14)) }
  return 50
}

$Characters = Import-Csv (Join-Path $TablesDir 'Characters.csv') | ForEach-Object {
  [ordered]@{
    id = $_.character_id
    displayName = $_.display_name
    archetype = $_.archetype
    spriteType = $_.sprite_type
    spritePath = $_.sprite_path
    facing = $_.facing
    spriteClass = $_.sprite_class
    activeInRotation = To-Bool $_.active_in_rotation
    cashMin = To-Number $_.cash_min
    cashMax = To-Number $_.cash_max
    trust = Trust-Score $_.trustworthiness
    trustLabel = $_.trustworthiness
    copRiskBias = To-Number $_.cop_risk_bias
    thugRiskBias = To-Number $_.thug_risk_bias
    scamRiskBias = To-Number $_.scam_risk_bias
    preferredItemTags = @(Split-List $_.preferred_item_tags)
    notes = $_.notes
  }
}

$CharacterCommerceTraits = Import-Csv (Join-Path $TablesDir 'Character_Commerce_Traits.csv') | ForEach-Object {
  [ordered]@{
    characterId = $_.character_id
    sellsToShopWeight = To-Number $_.sells_to_shop_weight
    buysFromShopWeight = To-Number $_.buys_from_shop_weight
    tradesWeight = To-Number $_.trades_weight
    buyInterestTags = @(Split-List $_.buy_interest_tags)
    sellOfferTags = @(Split-List $_.sell_offer_tags)
    tradeInterestTags = @(Split-List $_.trade_interest_tags)
    avoidTags = @(Split-List $_.avoid_tags)
    maxMarkupTolerance = To-Number $_.max_markup_tolerance 1
    lowballTolerance = To-Number $_.lowball_tolerance 1
    haggleAggression = To-Number $_.haggle_aggression
    tradeFairness = To-Number $_.trade_fairness 1
    riskTolerance = To-Number $_.risk_tolerance
    prefersCash = To-Bool $_.prefers_cash
    acceptsTrades = To-Bool $_.accepts_trades
    acceptsJunkBundles = To-Bool $_.accepts_junk_bundles
    notes = $_.notes
  }
}

$ItemRows = @(Import-Csv (Join-Path $TablesDir 'Items.csv'))
$ItemErrors = [System.Collections.Generic.List[string]]::new()
$SeenItemIds = [System.Collections.Generic.HashSet[string]]::new()
$DuplicateItemIds = [System.Collections.Generic.HashSet[string]]::new()

for ($Index = 0; $Index -lt $ItemRows.Count; $Index += 1) {
  $Row = $ItemRows[$Index]
  $RowLabel = "Items.csv row $($Index + 2)"
  if (![string]::IsNullOrWhiteSpace($Row.item_id)) { $RowLabel += " ($($Row.item_id))" }

  @('item_id', 'name', 'category', 'default_condition', 'availability_tier', 'demand_level', 'price_variance', 'description') | ForEach-Object {
    Assert-Required $Row $_ $RowLabel $ItemErrors
  }
  @('base_value', 'shop_buy_min', 'shop_buy_max', 'target_sell_price', 'heat') | ForEach-Object {
    Assert-Required-Number $Row $_ $RowLabel $ItemErrors
  }
  if (![string]::IsNullOrWhiteSpace($Row.item_id)) {
    if (!$SeenItemIds.Add($Row.item_id)) { [void]$DuplicateItemIds.Add($Row.item_id) }
  }
}

$DuplicateItemIds | ForEach-Object { $ItemErrors.Add("Items.csv: duplicate item_id `"$_`"") }

if ($ItemErrors.Count) {
  throw "Malformed item catalog:`n- $($ItemErrors -join "`n- ")"
}

$Items = $ItemRows | ForEach-Object {
  [ordered]@{
    item_id = $_.item_id
    id = $_.item_id
    name = $_.name
    category = $_.category
    default_condition = $_.default_condition
    condition = $_.default_condition
    base_value = To-Number $_.base_value
    baseValue = To-Number $_.base_value
    shop_buy_min = To-Number $_.shop_buy_min
    shopBuyMin = To-Number $_.shop_buy_min
    shop_buy_max = To-Number $_.shop_buy_max
    shopBuyMax = To-Number $_.shop_buy_max
    target_sell_price = To-Number $_.target_sell_price
    targetSellPrice = To-Number $_.target_sell_price
    heat = To-Number $_.heat
    availability_tier = $_.availability_tier
    availabilityTier = $_.availability_tier
    demand_level = $_.demand_level
    demandLevel = $_.demand_level
    price_variance = $_.price_variance
    priceVariance = $_.price_variance
    tags = @(Split-List $_.tags)
    description = $_.description
  }
}

$CharacterItemPools = Import-Csv (Join-Path $TablesDir 'Character_Item_Pools.csv') | ForEach-Object {
  [ordered]@{
    id = $_.pool_id
    characterId = $_.character_id
    itemId = $_.item_id
    dealType = $_.deal_type
    itemRole = $_.item_role
    requestedItemTags = Split-List-Or-Null $_.requested_item_tags
    offeredItemTags = Split-List-Or-Null $_.offered_item_tags
    chanceWeight = To-Number $_.chance_weight
    askPriceMultiplier = To-Number $_.ask_price_multiplier 1
    cashAdjustmentMin = To-Number $_.cash_adjustment_min
    cashAdjustmentMax = To-Number $_.cash_adjustment_max
    conditionOverride = $_.condition_override
    riskNote = $_.risk_note
    notes = $_.notes
  }
}

$MissingPoolItemRefs = @($CharacterItemPools | Where-Object { $_.itemId -and !$SeenItemIds.Contains($_.itemId) } | ForEach-Object { "$($_.id) -> $($_.itemId)" })
if ($MissingPoolItemRefs.Count) {
  throw "Character_Item_Pools.csv references missing item_id values:`n- $($MissingPoolItemRefs -join "`n- ")"
}

$EventBlueprints = Import-Csv (Join-Path $TablesDir 'Event_Blueprint.csv') | ForEach-Object {
  [ordered]@{
    id = $_.event_id
    characterId = $_.character_id
    eventType = $_.event_type
    dialogue = $_.dialogue
    resultNotes = $_.result_notes
  }
}

$Data = [ordered]@{
  characters = @($Characters)
  characterCommerceTraits = @($CharacterCommerceTraits)
  items = @($Items)
  characterItemPools = @($CharacterItemPools)
  eventBlueprints = @($EventBlueprints)
}

$Json = $Data | ConvertTo-Json -Depth 20
Set-Content -NoNewline -Path (Join-Path $Root 'gameData.js') -Value "window.ONE_STAR_PAWN_DATA = $Json;`n"

$ActiveCharacters = @($Characters | Where-Object { $_.activeInRotation })
Write-Output "Generated $($Characters.Count) characters ($($ActiveCharacters.Count) active)."
Write-Output "Generated $($Items.Count) items."
$ActiveCharacters | ForEach-Object { Write-Output "$($_.id): $($_.spritePath)" }