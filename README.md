# One Star Pawn - Playable Prototype

Run a local static server from this repository root and open the served URL. Do not open an older downloaded copy or a `file://` version of `index.html`.

## What this demonstrates

- Single-screen pawn shop layout with separate background, clerk, glass, customer, and HTML UI layers
- A state-driven customer loop with enter and exit transitions
- Three choices per customer for buy, sell, and trade deals
- Visible money, profit, reputation, and inventory updates
- Hidden cop, thug, and scam risk checks that can trigger consequences
- Bankruptcy loss state when money reaches zero or less

## Key files

- `assets/shop-background.png`
- `assets/booth-glass.png`
- `assets/sprites/clerk-idle.png`
- Current active NPC sprites under `assets/sprites/`, including street, service, senior, regular, hustler, and tracksuit customers
- `one_star_pawn_tables/*.csv`
- `scripts/generate-game-data.ps1`
- `gameData.js`
- `index.html`
- `styles.css`
- `main.js`

## Notes

This is still a dirty browser prototype. Starter data from `one_star_pawn_tables/` is generated into plain JavaScript constants in `gameData.js`; the browser does not parse or fetch CSV files at runtime.

## NPC data rules

Active customers come from `one_star_pawn_tables/Characters.csv` rows where `active_in_rotation` is `True`. The clerk sprite is not a customer, and inactive prototype rows remain in the tables for reference only.

To add another NPC:

1. Add a transparent PNG under `assets/sprites/`.
2. Add a `Characters.csv` row with a unique lowercase ID, display name, `active_in_rotation=True`, a direct `sprite_path` that exactly matches the asset filename, and `facing` set to `left` or `right`.
3. Add or reference commerce traits in `Character_Commerce_Traits.csv`.
4. Add item-pool rows in `Character_Item_Pools.csv` so at least one deal can be generated.
5. Add or reference event data in `Event_Blueprint.csv`.
6. Regenerate `gameData.js` with `.\scripts\generate-game-data.ps1`.
7. Run the game and check the `[customer-validation]` startup summary.

Do not update a JavaScript customer whitelist; the runtime uses the complete validated active-customer collection. Do not create alias PNG files. Active customer sprites must use `_r.png` for artwork that faces right and `_l.png` for artwork that faces left. Right-facing sprites enter, idle, and exit from the left side; left-facing sprites enter, idle, and exit from the right side.

The shared customer layout contract applies to all current and future NPC sprites by default: proportional width, 220px visual height, `left: -25px`, and `top: -140px` from the reusable customer element. Use `sprite_visual_height` in `Characters.csv` only for intentional source-art scale exceptions.

## Developer NPC commerce editor

`npc-editor.html` is a small local-only tool for tuning existing NPC commerce CSV data. It edits `Character_Commerce_Traits.csv` and `Character_Item_Pools.csv`; the CSVs remain the source of truth, and the player-facing game still uses generated `gameData.js`.

Workflow:

1. Start/open the project using the normal local static-server method.
2. Open `npc-editor.html` in a browser that supports the File System Access API.
3. Click `Open Data Folder`.
4. Select the project `one_star_pawn_tables` directory.
5. Choose an NPC.
6. Set Buy / Sell / Trade to Yes or No.
7. Check or uncheck the items that NPC can use for each enabled deal type.
8. Save changes.
9. Regenerate `gameData.js` with `.\scripts\generate-game-data.ps1`.
10. Reload the game and test the NPC.

Buy maps to `buy_from_shop`, Sell maps to `sell_to_shop`, and Trade maps to `trade`. Turning a deal type off sets that NPC's existing commerce weight to `0`; turning it on restores a simple positive weight while preserving the rest of the trait row. Existing item-pool rows are kept as-is unless that exact NPC/deal/item is unchecked.

## Developer item editor

`item-editor.html` is a small local-only tool for editing `Items.csv`. It can rename existing items without changing their `item_id`, create new item rows with unique lowercase IDs, and choose category, condition, and tag values from the current CSV reference data.

Workflow:

1. Start/open the project using the normal local static-server method.
2. Open `item-editor.html` in a browser that supports the File System Access API.
3. Click `Open Data Folder`.
4. Select the project `one_star_pawn_tables` directory.
5. Choose an existing item or click `New Item`.
6. Edit the item fields and save changes.
7. Regenerate `gameData.js` with `.\scripts\generate-game-data.ps1`.
8. Reload the game and smoke-test the catalog change.
