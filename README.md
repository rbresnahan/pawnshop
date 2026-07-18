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
- `assets/sprites/70s-hustler-idle_r.png`, `bum-idle_l.png`, `crackhead-idle_l.png`, `hitman-idle_l.png`, `junkie-idle_r.png`, `red-hustler-idle_l.png`, and `slot-grandma-idle_r.png` active NPC sprites
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

The shared customer layout contract applies to all current and future NPC sprites: proportional width, 220px visual height, `left: -25px`, and `top: -140px` from the reusable customer element. Avoid character-specific positioning unless a concrete asset defect requires it.