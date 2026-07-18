window.ONE_STAR_PAWN_DATA = {
    "characters":  [
                       {
                           "id":  "crackhead",
                           "displayName":  "Crackhead",
                           "archetype":  "Desperate Seller",
                           "spriteType":  "seller",
                           "spritePath":  "assets/sprites/crackhead-idle_l.png",
                           "facing":  "left",
                           "spriteClass":  "npc-crackhead",
                           "activeInRotation":  true,
                           "cashMin":  0,
                           "cashMax":  70,
                           "trust":  26,
                           "trustLabel":  "1 - liar",
                           "copRiskBias":  2,
                           "thugRiskBias":  2,
                           "scamRiskBias":  4,
                           "preferredItemTags":  [
                                                     "junk",
                                                     "broken",
                                                     "suspicious",
                                                     "electronics",
                                                     "mystery"
                                                 ],
                           "notes":  "Moves like a shopping cart with a court date. Sells fast, lies faster."
                       },
                       {
                           "id":  "bum",
                           "displayName":  "Bum",
                           "archetype":  "Desperate Regular",
                           "spriteType":  "regular",
                           "spritePath":  "assets/sprites/bum-idle_l.png",
                           "facing":  "left",
                           "spriteClass":  "npc-bum",
                           "activeInRotation":  true,
                           "cashMin":  0,
                           "cashMax":  45,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  0,
                           "thugRiskBias":  1,
                           "scamRiskBias":  2,
                           "preferredItemTags":  [
                                                     "junk",
                                                     "broken",
                                                     "cursed",
                                                     "appliance"
                                                 ],
                           "notes":  "Smells like sidewalk rain and bad economics. Somehow knows the value of copper."
                       },
                       {
                           "id":  "hitman",
                           "displayName":  "Hitman",
                           "archetype":  "Dangerous Buyer",
                           "spriteType":  "thug",
                           "spritePath":  "assets/sprites/hitman-idle_l.png",
                           "facing":  "left",
                           "spriteClass":  "npc-hitman",
                           "activeInRotation":  true,
                           "cashMin":  80,
                           "cashMax":  500,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  1,
                           "thugRiskBias":  5,
                           "scamRiskBias":  1,
                           "preferredItemTags":  [
                                                     "weapon",
                                                     "luxury",
                                                     "hot",
                                                     "suspicious",
                                                     "electronics"
                                                 ],
                           "notes":  "Too calm, too clean, and somehow worse than both. Never asks for a receipt."
                       },
                       {
                           "id":  "junkie",
                           "displayName":  "Junkie",
                           "archetype":  "Mystery Seller",
                           "spriteType":  "weirdo",
                           "spritePath":  "assets/sprites/junkie-idle_r.png",
                           "facing":  "right",
                           "spriteClass":  "npc-junkie",
                           "activeInRotation":  true,
                           "cashMin":  5,
                           "cashMax":  110,
                           "trust":  26,
                           "trustLabel":  "1 - liar",
                           "copRiskBias":  3,
                           "thugRiskBias":  1,
                           "scamRiskBias":  5,
                           "preferredItemTags":  [
                                                     "electronics",
                                                     "mystery",
                                                     "suspicious",
                                                     "cursed",
                                                     "broken"
                                                 ],
                           "notes":  "Offers items, trades, and explanations that all have missing screws."
                       },
                       {
                           "id":  "desperate_regular",
                           "displayName":  "Desperate Regular",
                           "archetype":  "Desperate Regular",
                           "spriteType":  "regular",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  0,
                           "cashMax":  40,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  0,
                           "thugRiskBias":  1,
                           "scamRiskBias":  2,
                           "preferredItemTags":  [
                                                     "junk",
                                                     "broken",
                                                     "suspicious"
                                                 ],
                           "notes":  "Always needs cash today. Yesterday was also today somehow."
                       },
                       {
                           "id":  "nervous_seller",
                           "displayName":  "Nervous Seller",
                           "archetype":  "Nervous Seller",
                           "spriteType":  "seller",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  10,
                           "cashMax":  120,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  2,
                           "thugRiskBias":  0,
                           "scamRiskBias":  1,
                           "preferredItemTags":  [
                                                     "electronics",
                                                     "hot",
                                                     "suspicious"
                                                 ],
                           "notes":  "Sweats through a denim jacket; often has items with stories that do not survive follow-up questions."
                       },
                       {
                           "id":  "collector",
                           "displayName":  "Collector",
                           "archetype":  "Collector",
                           "spriteType":  "collector",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  80,
                           "cashMax":  500,
                           "trust":  62,
                           "trustLabel":  "4 - mostly honest",
                           "copRiskBias":  0,
                           "thugRiskBias":  0,
                           "scamRiskBias":  1,
                           "preferredItemTags":  [
                                                     "rare",
                                                     "collectible"
                                                 ],
                           "notes":  "Knows value. Will absolutely judge your display case."
                       },
                       {
                           "id":  "mechanic",
                           "displayName":  "Mechanic",
                           "archetype":  "Mechanic",
                           "spriteType":  "seller",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  20,
                           "cashMax":  180,
                           "trust":  50,
                           "trustLabel":  "3 - mixed",
                           "copRiskBias":  0,
                           "thugRiskBias":  1,
                           "scamRiskBias":  1,
                           "preferredItemTags":  [
                                                     "tool",
                                                     "repairable",
                                                     "broken"
                                                 ],
                           "notes":  "Sells tools, parts, and objects that smell like a garage fire."
                       },
                       {
                           "id":  "street_fence",
                           "displayName":  "Street Fence",
                           "archetype":  "Fence",
                           "spriteType":  "seller",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  50,
                           "cashMax":  300,
                           "trust":  26,
                           "trustLabel":  "1 - liar",
                           "copRiskBias":  3,
                           "thugRiskBias":  2,
                           "scamRiskBias":  2,
                           "preferredItemTags":  [
                                                     "stolen",
                                                     "hot",
                                                     "luxury"
                                                 ],
                           "notes":  "Everything is definitely from his cousin. Cousins have been busy."
                       },
                       {
                           "id":  "bargain_hunter",
                           "displayName":  "Bargain Hunter",
                           "archetype":  "Bargain Hunter",
                           "spriteType":  "buyer",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  15,
                           "cashMax":  160,
                           "trust":  50,
                           "trustLabel":  "3 - mixed",
                           "copRiskBias":  0,
                           "thugRiskBias":  0,
                           "scamRiskBias":  2,
                           "preferredItemTags":  [
                                                     "junk",
                                                     "collectible",
                                                     "electronics"
                                                 ],
                           "notes":  "Wants a discount because Mercury is in retrograde, probably on Facebook Marketplace."
                       },
                       {
                           "id":  "tracksuit_thug",
                           "displayName":  "Tracksuit Guy",
                           "archetype":  "Thug",
                           "spriteType":  "thug",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  20,
                           "cashMax":  250,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  0,
                           "thugRiskBias":  4,
                           "scamRiskBias":  1,
                           "preferredItemTags":  [
                                                     "weapon",
                                                     "luxury",
                                                     "hot"
                                                 ],
                           "notes":  "Negotiates with eye contact and visible neck tattoos."
                       },
                       {
                           "id":  "undercover_cop",
                           "displayName":  "Suspiciously Normal Guy",
                           "archetype":  "Cop Bait",
                           "spriteType":  "cop",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  40,
                           "cashMax":  200,
                           "trust":  74,
                           "trustLabel":  "5 - reliable",
                           "copRiskBias":  5,
                           "thugRiskBias":  0,
                           "scamRiskBias":  0,
                           "preferredItemTags":  [
                                                     "stolen",
                                                     "weapon",
                                                     "hot"
                                                 ],
                           "notes":  "Asks if the serial number being scratched off is \u0027normal pawn shop stuff\u0027."
                       },
                       {
                           "id":  "angry_returner",
                           "displayName":  "Angry Returner",
                           "archetype":  "Angry Customer",
                           "spriteType":  "regular",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  0,
                           "cashMax":  80,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  0,
                           "thugRiskBias":  1,
                           "scamRiskBias":  4,
                           "preferredItemTags":  [
                                                     "broken",
                                                     "fake"
                                                 ],
                           "notes":  "Comes back holding your receipt like evidence in a municipal trial."
                       },
                       {
                           "id":  "mystery_weirdo",
                           "displayName":  "Mystery Weirdo",
                           "archetype":  "Mystery Weirdo",
                           "spriteType":  "weirdo",
                           "spritePath":  "",
                           "facing":  "",
                           "spriteClass":  "",
                           "activeInRotation":  false,
                           "cashMin":  0,
                           "cashMax":  999,
                           "trust":  50,
                           "trustLabel":  "3 - mixed",
                           "copRiskBias":  1,
                           "thugRiskBias":  1,
                           "scamRiskBias":  3,
                           "preferredItemTags":  [
                                                     "cursed",
                                                     "mystery",
                                                     "rare"
                                                 ],
                           "notes":  "May sell treasure. May sell a box of wet teeth. Budget accordingly."
                       },
                       {
                           "id":  "purple_customer",
                           "displayName":  "Purple Customer",
                           "archetype":  "Prototype Placeholder",
                           "spriteType":  "regular",
                           "spritePath":  "assets/sprites/customer-purple-idle.png",
                           "facing":  "",
                           "spriteClass":  "npc-purple",
                           "activeInRotation":  false,
                           "cashMin":  0,
                           "cashMax":  100,
                           "trust":  50,
                           "trustLabel":  "3 - mixed",
                           "copRiskBias":  0,
                           "thugRiskBias":  0,
                           "scamRiskBias":  0,
                           "preferredItemTags":  [
                                                     "prototype"
                                                 ],
                           "notes":  "Original prototype sprite. Kept as inactive fallback/reference only; not used in gameplay rotation."
                       },
                       {
                           "id":  "70s_hustler",
                           "displayName":  "70s Hustler",
                           "archetype":  "Vintage Street Hustler",
                           "spriteType":  "fence",
                           "spritePath":  "assets/sprites/70s-hustler-idle_r.png",
                           "facing":  "right",
                           "spriteClass":  "npc-70s-hustler",
                           "activeInRotation":  true,
                           "cashMin":  60,
                           "cashMax":  350,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  2,
                           "thugRiskBias":  2,
                           "scamRiskBias":  4,
                           "preferredItemTags":  [
                                                     "luxury",
                                                     "collectible",
                                                     "jewelry",
                                                     "electronics",
                                                     "suspicious"
                                                 ],
                           "notes":  "Dresses like a casino carpet and talks like every object has appreciated since 1978."
                       },
                       {
                           "id":  "red_hustler",
                           "displayName":  "Red Hustler",
                           "archetype":  "Flashy Deal Chaser",
                           "spriteType":  "buyer",
                           "spritePath":  "assets/sprites/red-hustler-idle_l.png",
                           "facing":  "left",
                           "spriteClass":  "npc-red-hustler",
                           "activeInRotation":  true,
                           "cashMin":  40,
                           "cashMax":  280,
                           "trust":  38,
                           "trustLabel":  "2 - sketchy",
                           "copRiskBias":  1,
                           "thugRiskBias":  3,
                           "scamRiskBias":  3,
                           "preferredItemTags":  [
                                                     "luxury",
                                                     "electronics",
                                                     "collectible",
                                                     "hot",
                                                     "suspicious"
                                                 ],
                           "notes":  "Confident, impatient, and dressed like subtlety owes him money."
                       },
                       {
                           "id":  "slot_grandma",
                           "displayName":  "Slot Grandma",
                           "archetype":  "Compulsive Gambler",
                           "spriteType":  "seller",
                           "spritePath":  "assets/sprites/slot-grandma-idle_r.png",
                           "facing":  "right",
                           "spriteClass":  "npc-slot-grandma",
                           "activeInRotation":  true,
                           "cashMin":  0,
                           "cashMax":  65,
                           "trust":  62,
                           "trustLabel":  "4 - mostly honest",
                           "copRiskBias":  0,
                           "thugRiskBias":  0,
                           "scamRiskBias":  1,
                           "preferredItemTags":  [
                                                     "jewelry",
                                                     "collectible",
                                                     "luxury",
                                                     "household"
                                                 ],
                           "notes":  "Sweet, broke, and one jackpot away from solving the problem she created with the last jackpot."
                       }
                   ],
    "characterCommerceTraits":  [
                                    {
                                        "characterId":  "crackhead",
                                        "sellsToShopWeight":  6,
                                        "buysFromShopWeight":  1,
                                        "tradesWeight":  4,
                                        "buyInterestTags":  [
                                                                "junk",
                                                                "electronics",
                                                                "mystery"
                                                            ],
                                        "sellOfferTags":  [
                                                              "junk",
                                                              "broken",
                                                              "suspicious",
                                                              "hot",
                                                              "electronics"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "electronics",
                                                                  "junk",
                                                                  "mystery"
                                                              ],
                                        "avoidTags":  [
                                                          "luxury",
                                                          "collectible"
                                                      ],
                                        "maxMarkupTolerance":  1.05,
                                        "lowballTolerance":  0.35,
                                        "haggleAggression":  3,
                                        "tradeFairness":  0.45,
                                        "riskTolerance":  5,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  true,
                                        "notes":  "High-chaos seller/trader. Good source of cheap bad decisions."
                                    },
                                    {
                                        "characterId":  "bum",
                                        "sellsToShopWeight":  5,
                                        "buysFromShopWeight":  1,
                                        "tradesWeight":  3,
                                        "buyInterestTags":  [
                                                                "junk",
                                                                "appliance",
                                                                "cursed"
                                                            ],
                                        "sellOfferTags":  [
                                                              "junk",
                                                              "broken",
                                                              "cursed"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "junk",
                                                                  "electronics",
                                                                  "appliance"
                                                              ],
                                        "avoidTags":  [
                                                          "luxury",
                                                          "weapon"
                                                      ],
                                        "maxMarkupTolerance":  1,
                                        "lowballTolerance":  0.4,
                                        "haggleAggression":  1,
                                        "tradeFairness":  0.6,
                                        "riskTolerance":  2,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  true,
                                        "notes":  "Mostly harmless junk economy. Will accept humiliating offers if they include cash."
                                    },
                                    {
                                        "characterId":  "hitman",
                                        "sellsToShopWeight":  2,
                                        "buysFromShopWeight":  5,
                                        "tradesWeight":  5,
                                        "buyInterestTags":  [
                                                                "weapon",
                                                                "luxury",
                                                                "hot",
                                                                "suspicious",
                                                                "electronics"
                                                            ],
                                        "sellOfferTags":  [
                                                              "weapon",
                                                              "luxury",
                                                              "suspicious"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "weapon",
                                                                  "luxury",
                                                                  "electronics"
                                                              ],
                                        "avoidTags":  [
                                                          "junk",
                                                          "cursed"
                                                      ],
                                        "maxMarkupTolerance":  1.25,
                                        "lowballTolerance":  0.8,
                                        "haggleAggression":  5,
                                        "tradeFairness":  0.75,
                                        "riskTolerance":  5,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Dangerous buyer/trader. Refusing or insulting him should wake up thug risk."
                                    },
                                    {
                                        "characterId":  "junkie",
                                        "sellsToShopWeight":  5,
                                        "buysFromShopWeight":  2,
                                        "tradesWeight":  5,
                                        "buyInterestTags":  [
                                                                "mystery",
                                                                "electronics",
                                                                "cursed"
                                                            ],
                                        "sellOfferTags":  [
                                                              "mystery",
                                                              "suspicious",
                                                              "broken",
                                                              "electronics"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "mystery",
                                                                  "electronics",
                                                                  "junk"
                                                              ],
                                        "avoidTags":  [
                                                          "luxury"
                                                      ],
                                        "maxMarkupTolerance":  1.1,
                                        "lowballTolerance":  0.45,
                                        "haggleAggression":  4,
                                        "tradeFairness":  0.4,
                                        "riskTolerance":  5,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  true,
                                        "notes":  "Trade-focused customer with worse math. Great for risk and weird inventory."
                                    },
                                    {
                                        "characterId":  "desperate_regular",
                                        "sellsToShopWeight":  5,
                                        "buysFromShopWeight":  1,
                                        "tradesWeight":  2,
                                        "buyInterestTags":  [
                                                                "junk",
                                                                "electronics"
                                                            ],
                                        "sellOfferTags":  [
                                                              "junk",
                                                              "broken",
                                                              "suspicious"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "junk",
                                                                  "electronics"
                                                              ],
                                        "avoidTags":  [
                                                          "luxury"
                                                      ],
                                        "maxMarkupTolerance":  1.05,
                                        "lowballTolerance":  0.45,
                                        "haggleAggression":  1,
                                        "tradeFairness":  0.7,
                                        "riskTolerance":  2,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  true,
                                        "notes":  "Cash-starved seller. Accepts humiliating lowballs with impressive speed."
                                    },
                                    {
                                        "characterId":  "nervous_seller",
                                        "sellsToShopWeight":  5,
                                        "buysFromShopWeight":  1,
                                        "tradesWeight":  2,
                                        "buyInterestTags":  [
                                                                "electronics",
                                                                "junk"
                                                            ],
                                        "sellOfferTags":  [
                                                              "electronics",
                                                              "hot",
                                                              "suspicious"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "electronics",
                                                                  "mystery"
                                                              ],
                                        "avoidTags":  [
                                                          "weapon",
                                                          "luxury"
                                                      ],
                                        "maxMarkupTolerance":  1.1,
                                        "lowballTolerance":  0.6,
                                        "haggleAggression":  2,
                                        "tradeFairness":  0.75,
                                        "riskTolerance":  3,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  true,
                                        "notes":  "Mostly sells sketchy electronics. Panics when asked follow-up questions."
                                    },
                                    {
                                        "characterId":  "collector",
                                        "sellsToShopWeight":  1,
                                        "buysFromShopWeight":  5,
                                        "tradesWeight":  3,
                                        "buyInterestTags":  [
                                                                "collectible",
                                                                "rare",
                                                                "mystery"
                                                            ],
                                        "sellOfferTags":  [
                                                              "collectible",
                                                              "rare"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "collectible",
                                                                  "rare"
                                                              ],
                                        "avoidTags":  [
                                                          "weapon",
                                                          "hot",
                                                          "stolen"
                                                      ],
                                        "maxMarkupTolerance":  1.35,
                                        "lowballTolerance":  0.9,
                                        "haggleAggression":  3,
                                        "tradeFairness":  1.2,
                                        "riskTolerance":  1,
                                        "prefersCash":  false,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Good buyer for collectible inventory. Harder to fool, sadly literate."
                                    },
                                    {
                                        "characterId":  "mechanic",
                                        "sellsToShopWeight":  4,
                                        "buysFromShopWeight":  3,
                                        "tradesWeight":  3,
                                        "buyInterestTags":  [
                                                                "tool",
                                                                "repairable",
                                                                "electronics"
                                                            ],
                                        "sellOfferTags":  [
                                                              "tool",
                                                              "repairable",
                                                              "broken"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "tool",
                                                                  "electronics"
                                                              ],
                                        "avoidTags":  [
                                                          "cursed",
                                                          "possibly_fake"
                                                      ],
                                        "maxMarkupTolerance":  1.2,
                                        "lowballTolerance":  0.7,
                                        "haggleAggression":  2,
                                        "tradeFairness":  1,
                                        "riskTolerance":  2,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Trades around tools and repairables. Suspicious of cursed appliances, which is unfair but correct."
                                    },
                                    {
                                        "characterId":  "street_fence",
                                        "sellsToShopWeight":  5,
                                        "buysFromShopWeight":  2,
                                        "tradesWeight":  4,
                                        "buyInterestTags":  [
                                                                "luxury",
                                                                "weapon",
                                                                "hot",
                                                                "suspicious"
                                                            ],
                                        "sellOfferTags":  [
                                                              "stolen",
                                                              "hot",
                                                              "luxury",
                                                              "suspicious"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "luxury",
                                                                  "weapon",
                                                                  "electronics"
                                                              ],
                                        "avoidTags":  [
                                                          "junk"
                                                      ],
                                        "maxMarkupTolerance":  1.15,
                                        "lowballTolerance":  0.55,
                                        "haggleAggression":  4,
                                        "tradeFairness":  0.65,
                                        "riskTolerance":  5,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "High-risk source of hot goods. Makes the cops itchy."
                                    },
                                    {
                                        "characterId":  "bargain_hunter",
                                        "sellsToShopWeight":  1,
                                        "buysFromShopWeight":  5,
                                        "tradesWeight":  2,
                                        "buyInterestTags":  [
                                                                "junk",
                                                                "collectible",
                                                                "electronics"
                                                            ],
                                        "sellOfferTags":  [
                                                              "junk"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "junk",
                                                                  "collectible"
                                                              ],
                                        "avoidTags":  [
                                                          "weapon",
                                                          "hot"
                                                      ],
                                        "maxMarkupTolerance":  1.05,
                                        "lowballTolerance":  0.8,
                                        "haggleAggression":  3,
                                        "tradeFairness":  0.9,
                                        "riskTolerance":  1,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  true,
                                        "notes":  "Buys cheap inventory and argues like every dollar has a lawyer."
                                    },
                                    {
                                        "characterId":  "tracksuit_thug",
                                        "sellsToShopWeight":  3,
                                        "buysFromShopWeight":  3,
                                        "tradesWeight":  5,
                                        "buyInterestTags":  [
                                                                "weapon",
                                                                "luxury",
                                                                "hot"
                                                            ],
                                        "sellOfferTags":  [
                                                              "weapon",
                                                              "hot",
                                                              "suspicious"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "weapon",
                                                                  "luxury",
                                                                  "electronics"
                                                              ],
                                        "avoidTags":  [
                                                          "junk"
                                                      ],
                                        "maxMarkupTolerance":  1.1,
                                        "lowballTolerance":  0.65,
                                        "haggleAggression":  5,
                                        "tradeFairness":  0.55,
                                        "riskTolerance":  5,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Dangerous trade-heavy NPC. Refusing him badly should wake up thug risk."
                                    },
                                    {
                                        "characterId":  "undercover_cop",
                                        "sellsToShopWeight":  0,
                                        "buysFromShopWeight":  5,
                                        "tradesWeight":  2,
                                        "buyInterestTags":  [
                                                                "stolen",
                                                                "weapon",
                                                                "hot",
                                                                "suspicious"
                                                            ],
                                        "sellOfferTags":  [

                                                          ],
                                        "tradeInterestTags":  [
                                                                  "weapon",
                                                                  "hot",
                                                                  "stolen"
                                                              ],
                                        "avoidTags":  [
                                                          "junk",
                                                          "cursed"
                                                      ],
                                        "maxMarkupTolerance":  1,
                                        "lowballTolerance":  1,
                                        "haggleAggression":  4,
                                        "tradeFairness":  1,
                                        "riskTolerance":  5,
                                        "prefersCash":  false,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Bait buyer. Selling hot goods to this guy should be extremely stupid."
                                    },
                                    {
                                        "characterId":  "angry_returner",
                                        "sellsToShopWeight":  0,
                                        "buysFromShopWeight":  2,
                                        "tradesWeight":  0,
                                        "buyInterestTags":  [
                                                                "broken",
                                                                "fake"
                                                            ],
                                        "sellOfferTags":  [

                                                          ],
                                        "tradeInterestTags":  [

                                                              ],
                                        "avoidTags":  [
                                                          "weapon",
                                                          "hot",
                                                          "luxury"
                                                      ],
                                        "maxMarkupTolerance":  1,
                                        "lowballTolerance":  0.7,
                                        "haggleAggression":  4,
                                        "tradeFairness":  0.8,
                                        "riskTolerance":  1,
                                        "prefersCash":  true,
                                        "acceptsTrades":  false,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Dispute/return customer. Useful for scam-risk consequences more than normal deals."
                                    },
                                    {
                                        "characterId":  "mystery_weirdo",
                                        "sellsToShopWeight":  4,
                                        "buysFromShopWeight":  2,
                                        "tradesWeight":  5,
                                        "buyInterestTags":  [
                                                                "cursed",
                                                                "mystery",
                                                                "rare"
                                                            ],
                                        "sellOfferTags":  [
                                                              "cursed",
                                                              "mystery",
                                                              "rare"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "mystery",
                                                                  "cursed",
                                                                  "rare",
                                                                  "junk"
                                                              ],
                                        "avoidTags":  [

                                                      ],
                                        "maxMarkupTolerance":  1.4,
                                        "lowballTolerance":  0.5,
                                        "haggleAggression":  2,
                                        "tradeFairness":  0.5,
                                        "riskTolerance":  4,
                                        "prefersCash":  false,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  true,
                                        "notes":  "Trade goblin. May produce profit or a box that sounds wet."
                                    },
                                    {
                                        "characterId":  "70s_hustler",
                                        "sellsToShopWeight":  4,
                                        "buysFromShopWeight":  3,
                                        "tradesWeight":  5,
                                        "buyInterestTags":  [
                                                                "luxury",
                                                                "collectible",
                                                                "jewelry",
                                                                "electronics"
                                                            ],
                                        "sellOfferTags":  [
                                                              "luxury",
                                                              "suspicious",
                                                              "collectible",
                                                              "jewelry"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "luxury",
                                                                  "collectible",
                                                                  "electronics",
                                                                  "jewelry"
                                                              ],
                                        "avoidTags":  [
                                                          "broken",
                                                          "cursed",
                                                          "junk"
                                                      ],
                                        "maxMarkupTolerance":  1.2,
                                        "lowballTolerance":  0.55,
                                        "haggleAggression":  4,
                                        "tradeFairness":  0.65,
                                        "riskTolerance":  4,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Trade-heavy old-school hustler. Values presentation more than provenance."
                                    },
                                    {
                                        "characterId":  "red_hustler",
                                        "sellsToShopWeight":  3,
                                        "buysFromShopWeight":  5,
                                        "tradesWeight":  4,
                                        "buyInterestTags":  [
                                                                "luxury",
                                                                "electronics",
                                                                "collectible",
                                                                "hot"
                                                            ],
                                        "sellOfferTags":  [
                                                              "electronics",
                                                              "luxury",
                                                              "suspicious",
                                                              "hot"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "luxury",
                                                                  "electronics",
                                                                  "collectible"
                                                              ],
                                        "avoidTags":  [
                                                          "cursed",
                                                          "appliance",
                                                          "junk"
                                                      ],
                                        "maxMarkupTolerance":  1.15,
                                        "lowballTolerance":  0.6,
                                        "haggleAggression":  5,
                                        "tradeFairness":  0.6,
                                        "riskTolerance":  4,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Aggressive buyer and trader. Insults should raise thug risk."
                                    },
                                    {
                                        "characterId":  "slot_grandma",
                                        "sellsToShopWeight":  7,
                                        "buysFromShopWeight":  1,
                                        "tradesWeight":  2,
                                        "buyInterestTags":  [
                                                                "collectible",
                                                                "jewelry"
                                                            ],
                                        "sellOfferTags":  [
                                                              "jewelry",
                                                              "collectible",
                                                              "luxury",
                                                              "household"
                                                          ],
                                        "tradeInterestTags":  [
                                                                  "jewelry",
                                                                  "collectible"
                                                              ],
                                        "avoidTags":  [
                                                          "weapon",
                                                          "hot",
                                                          "stolen"
                                                      ],
                                        "maxMarkupTolerance":  1.05,
                                        "lowballTolerance":  0.5,
                                        "haggleAggression":  2,
                                        "tradeFairness":  0.85,
                                        "riskTolerance":  1,
                                        "prefersCash":  true,
                                        "acceptsTrades":  true,
                                        "acceptsJunkBundles":  false,
                                        "notes":  "Cash-starved but mostly honest. Sells personal valuables to feed the slots."
                                    }
                                ],
    "items":  [
                  {
                      "item_id":  "microwave_haunted",
                      "id":  "microwave_haunted",
                      "name":  "Microwave That Hums Prayers",
                      "category":  "appliance",
                      "default_condition":  "poor",
                      "condition":  "poor",
                      "base_value":  35,
                      "baseValue":  35,
                      "shop_buy_min":  5,
                      "shopBuyMin":  5,
                      "shop_buy_max":  18,
                      "shopBuyMax":  18,
                      "target_sell_price":  45,
                      "targetSellPrice":  45,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "low",
                      "demandLevel":  "low",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "junk",
                                   "broken",
                                   "cursed"
                               ],
                      "description":  "Turns on by itself. Mostly because the button is stuck."
                  },
                  {
                      "item_id":  "fake_gold_chain",
                      "id":  "fake_gold_chain",
                      "name":  "Fake Gold Chain",
                      "category":  "jewelry",
                      "default_condition":  "fake",
                      "condition":  "fake",
                      "base_value":  20,
                      "baseValue":  20,
                      "shop_buy_min":  3,
                      "shopBuyMin":  3,
                      "shop_buy_max":  12,
                      "shopBuyMax":  12,
                      "target_sell_price":  35,
                      "targetSellPrice":  35,
                      "heat":  1,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "fake",
                                   "suspicious"
                               ],
                      "description":  "Green neck technology included."
                  },
                  {
                      "item_id":  "suspicious_gold_watch",
                      "id":  "suspicious_gold_watch",
                      "name":  "Suspicious Gold Watch",
                      "category":  "watch",
                      "default_condition":  "questionable",
                      "condition":  "questionable",
                      "base_value":  120,
                      "baseValue":  120,
                      "shop_buy_min":  40,
                      "shopBuyMin":  40,
                      "shop_buy_max":  75,
                      "shopBuyMax":  75,
                      "target_sell_price":  160,
                      "targetSellPrice":  160,
                      "heat":  2,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "possibly_fake",
                                   "luxury",
                                   "suspicious"
                               ],
                      "description":  "Heavy enough to feel real. Sketchy enough to be trouble."
                  },
                  {
                      "item_id":  "old_gaming_pc",
                      "id":  "old_gaming_pc",
                      "name":  "Old Gaming PC",
                      "category":  "computer",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  260,
                      "baseValue":  260,
                      "shop_buy_min":  80,
                      "shopBuyMin":  80,
                      "shop_buy_max":  150,
                      "shopBuyMax":  150,
                      "target_sell_price":  330,
                      "targetSellPrice":  330,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "electronics",
                                   "repairable"
                               ],
                      "description":  "RGB fans, dusty lungs, one mystery password."
                  },
                  {
                      "item_id":  "hospital_vcr",
                      "id":  "hospital_vcr",
                      "name":  "Hospital VCR",
                      "category":  "electronics",
                      "default_condition":  "questionable",
                      "condition":  "questionable",
                      "base_value":  70,
                      "baseValue":  70,
                      "shop_buy_min":  8,
                      "shopBuyMin":  8,
                      "shop_buy_max":  30,
                      "shopBuyMax":  30,
                      "target_sell_price":  95,
                      "targetSellPrice":  95,
                      "heat":  1,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "low",
                      "demandLevel":  "low",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "hot",
                                   "suspicious"
                               ],
                      "description":  "Still has a tape labeled \u0027DO NOT BILL INSURANCE\u0027."
                  },
                  {
                      "item_id":  "cracked_tablet",
                      "id":  "cracked_tablet",
                      "name":  "Cracked Tablet",
                      "category":  "electronics",
                      "default_condition":  "poor",
                      "condition":  "poor",
                      "base_value":  55,
                      "baseValue":  55,
                      "shop_buy_min":  10,
                      "shopBuyMin":  10,
                      "shop_buy_max":  25,
                      "shopBuyMax":  25,
                      "target_sell_price":  70,
                      "targetSellPrice":  70,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "broken"
                               ],
                      "description":  "Screen looks like a spider got promoted to architect."
                  },
                  {
                      "item_id":  "cordless_drill",
                      "id":  "cordless_drill",
                      "name":  "Cordless Drill",
                      "category":  "tool",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  65,
                      "baseValue":  65,
                      "shop_buy_min":  20,
                      "shopBuyMin":  20,
                      "shop_buy_max":  40,
                      "shopBuyMax":  40,
                      "target_sell_price":  90,
                      "targetSellPrice":  90,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "repairable"
                               ],
                      "description":  "Battery lasts fourteen seconds, which is technically time."
                  },
                  {
                      "item_id":  "bolt_cutters",
                      "id":  "bolt_cutters",
                      "name":  "Bolt Cutters",
                      "category":  "tool",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  45,
                      "baseValue":  45,
                      "shop_buy_min":  15,
                      "shopBuyMin":  15,
                      "shop_buy_max":  30,
                      "shopBuyMax":  30,
                      "target_sell_price":  70,
                      "targetSellPrice":  70,
                      "heat":  2,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "suspicious"
                               ],
                      "description":  "Honest landscaping equipment, if your shrubs are padlocked."
                  },
                  {
                      "item_id":  "pawn_shop_guitar",
                      "id":  "pawn_shop_guitar",
                      "name":  "Guitar Missing Two Strings",
                      "category":  "instrument",
                      "default_condition":  "poor",
                      "condition":  "poor",
                      "base_value":  80,
                      "baseValue":  80,
                      "shop_buy_min":  20,
                      "shopBuyMin":  20,
                      "shop_buy_max":  45,
                      "shopBuyMax":  45,
                      "target_sell_price":  110,
                      "targetSellPrice":  110,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "repairable"
                               ],
                      "description":  "Perfect for blues, because it already knows suffering."
                  },
                  {
                      "item_id":  "gold_ring_engravings",
                      "id":  "gold_ring_engravings",
                      "name":  "Gold Ring With Weird Engraving",
                      "category":  "jewelry",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  180,
                      "baseValue":  180,
                      "shop_buy_min":  60,
                      "shopBuyMin":  60,
                      "shop_buy_max":  110,
                      "shopBuyMax":  110,
                      "target_sell_price":  240,
                      "targetSellPrice":  240,
                      "heat":  2,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "luxury",
                                   "suspicious"
                               ],
                      "description":  "Engraving says \u0027Forever, Todd.\u0027 Todd is not present."
                  },
                  {
                      "item_id":  "baseball_card_box",
                      "id":  "baseball_card_box",
                      "name":  "Box of Baseball Cards",
                      "category":  "collectible",
                      "default_condition":  "unknown",
                      "condition":  "unknown",
                      "base_value":  100,
                      "baseValue":  100,
                      "shop_buy_min":  10,
                      "shopBuyMin":  10,
                      "shop_buy_max":  60,
                      "shopBuyMax":  60,
                      "target_sell_price":  150,
                      "targetSellPrice":  150,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "mystery"
                               ],
                      "description":  "Could be valuable. Could be 900 cards of a backup catcher."
                  },
                  {
                      "item_id":  "rare_action_figure",
                      "id":  "rare_action_figure",
                      "name":  "Rare Action Figure, No Head",
                      "category":  "collectible",
                      "default_condition":  "poor",
                      "condition":  "poor",
                      "base_value":  75,
                      "baseValue":  75,
                      "shop_buy_min":  12,
                      "shopBuyMin":  12,
                      "shop_buy_max":  35,
                      "shopBuyMax":  35,
                      "target_sell_price":  95,
                      "targetSellPrice":  95,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "low",
                      "demandLevel":  "low",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "rare",
                                   "broken"
                               ],
                      "description":  "Rare because nobody else saved it after the lawnmower incident."
                  },
                  {
                      "item_id":  "pocket_knife",
                      "id":  "pocket_knife",
                      "name":  "Pocket Knife",
                      "category":  "weapon",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  30,
                      "baseValue":  30,
                      "shop_buy_min":  8,
                      "shopBuyMin":  8,
                      "shop_buy_max":  18,
                      "shopBuyMax":  18,
                      "target_sell_price":  45,
                      "targetSellPrice":  45,
                      "heat":  1,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [

                               ],
                      "description":  "Small, dull, and somehow still threatening."
                  },
                  {
                      "item_id":  "rusty_revolver_prop",
                      "id":  "rusty_revolver_prop",
                      "name":  "Rusty Movie Prop Revolver",
                      "category":  "weapon",
                      "default_condition":  "questionable",
                      "condition":  "questionable",
                      "base_value":  90,
                      "baseValue":  90,
                      "shop_buy_min":  20,
                      "shopBuyMin":  20,
                      "shop_buy_max":  50,
                      "shopBuyMax":  50,
                      "target_sell_price":  130,
                      "targetSellPrice":  130,
                      "heat":  4,
                      "availability_tier":  "rare",
                      "availabilityTier":  "rare",
                      "demand_level":  "low",
                      "demandLevel":  "low",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "suspicious",
                                   "hot"
                               ],
                      "description":  "Probably a prop. The word \u0027probably\u0027 is doing a lot of paperwork."
                  },
                  {
                      "item_id":  "luxury_handbag_fake",
                      "id":  "luxury_handbag_fake",
                      "name":  "Luxury Handbag Maybe",
                      "category":  "luxury",
                      "default_condition":  "questionable",
                      "condition":  "questionable",
                      "base_value":  140,
                      "baseValue":  140,
                      "shop_buy_min":  30,
                      "shopBuyMin":  30,
                      "shop_buy_max":  80,
                      "shopBuyMax":  80,
                      "target_sell_price":  190,
                      "targetSellPrice":  190,
                      "heat":  1,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "possibly_fake"
                               ],
                      "description":  "Logo is one lawsuit away from being correct."
                  },
                  {
                      "item_id":  "sealed_mystery_box",
                      "id":  "sealed_mystery_box",
                      "name":  "Sealed Mystery Box",
                      "category":  "mystery",
                      "default_condition":  "unknown",
                      "condition":  "unknown",
                      "base_value":  75,
                      "baseValue":  75,
                      "shop_buy_min":  15,
                      "shopBuyMin":  15,
                      "shop_buy_max":  50,
                      "shopBuyMax":  50,
                      "target_sell_price":  120,
                      "targetSellPrice":  120,
                      "heat":  2,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "suspicious"
                               ],
                      "description":  "Rattles like regret."
                  },
                  {
                      "item_id":  "stolen_bike_wheel",
                      "id":  "stolen_bike_wheel",
                      "name":  "Single Expensive Bike Wheel",
                      "category":  "tool",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  110,
                      "baseValue":  110,
                      "shop_buy_min":  25,
                      "shopBuyMin":  25,
                      "shop_buy_max":  65,
                      "shopBuyMax":  65,
                      "target_sell_price":  150,
                      "targetSellPrice":  150,
                      "heat":  3,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "stolen",
                                   "hot",
                                   "suspicious"
                               ],
                      "description":  "A whole bicycle minus every honest explanation."
                  },
                  {
                      "item_id":  "dvd_stack",
                      "id":  "dvd_stack",
                      "name":  "Stack of DVDs Nobody Asked For",
                      "category":  "collectible",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  25,
                      "baseValue":  25,
                      "shop_buy_min":  2,
                      "shopBuyMin":  2,
                      "shop_buy_max":  8,
                      "shopBuyMax":  8,
                      "target_sell_price":  30,
                      "targetSellPrice":  30,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "low",
                      "demandLevel":  "low",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "junk"
                               ],
                      "description":  "Mostly Steven Seagal. The risk is emotional."
                  },
                  {
                      "item_id":  "smart_watch_locked",
                      "id":  "smart_watch_locked",
                      "name":  "Locked Smart Watch",
                      "category":  "watch",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  95,
                      "baseValue":  95,
                      "shop_buy_min":  20,
                      "shopBuyMin":  20,
                      "shop_buy_max":  50,
                      "shopBuyMax":  50,
                      "target_sell_price":  130,
                      "targetSellPrice":  130,
                      "heat":  2,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "electronics",
                                   "suspicious"
                               ],
                      "description":  "Owner forgot the password, name, birthday, and legal exposure."
                  },
                  {
                      "item_id":  "silverware_bundle",
                      "id":  "silverware_bundle",
                      "name":  "Loose Silverware Bundle",
                      "category":  "jewelry",
                      "default_condition":  "questionable",
                      "condition":  "questionable",
                      "base_value":  60,
                      "baseValue":  60,
                      "shop_buy_min":  10,
                      "shopBuyMin":  10,
                      "shop_buy_max":  30,
                      "shopBuyMax":  30,
                      "target_sell_price":  85,
                      "targetSellPrice":  85,
                      "heat":  2,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "possibly_fake",
                                   "suspicious"
                               ],
                      "description":  "Tied together with a shoelace. Classy, like a raccoon wedding."
                  },
                  {
                      "item_id":  "countertop_blender",
                      "id":  "countertop_blender",
                      "name":  "Countertop Blender With One Speed",
                      "category":  "appliance",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  40,
                      "baseValue":  40,
                      "shop_buy_min":  10,
                      "shopBuyMin":  10,
                      "shop_buy_max":  22,
                      "shopBuyMax":  22,
                      "target_sell_price":  55,
                      "targetSellPrice":  55,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "practical"
                               ],
                      "description":  "The one speed is violence."
                  },
                  {
                      "item_id":  "air_fryer",
                      "id":  "air_fryer",
                      "name":  "Greasy Air Fryer",
                      "category":  "appliance",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  65,
                      "baseValue":  65,
                      "shop_buy_min":  18,
                      "shopBuyMin":  18,
                      "shop_buy_max":  35,
                      "shopBuyMax":  35,
                      "target_sell_price":  85,
                      "targetSellPrice":  85,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "practical"
                               ],
                      "description":  "Smells faintly of wings and financial collapse."
                  },
                  {
                      "item_id":  "shop_vac",
                      "id":  "shop_vac",
                      "name":  "Shop Vacuum Full of Mystery Dust",
                      "category":  "appliance",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  85,
                      "baseValue":  85,
                      "shop_buy_min":  25,
                      "shopBuyMin":  25,
                      "shop_buy_max":  45,
                      "shopBuyMax":  45,
                      "target_sell_price":  115,
                      "targetSellPrice":  115,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "practical",
                                   "repairable"
                               ],
                      "description":  "Includes several pounds of somebody else\u0027s renovation."
                  },
                  {
                      "item_id":  "flat_screen_tv",
                      "id":  "flat_screen_tv",
                      "name":  "Flat-Screen TV, No Remote",
                      "category":  "electronics",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  140,
                      "baseValue":  140,
                      "shop_buy_min":  45,
                      "shopBuyMin":  45,
                      "shop_buy_max":  80,
                      "shopBuyMax":  80,
                      "target_sell_price":  185,
                      "targetSellPrice":  185,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "practical"
                               ],
                      "description":  "The universal remote will become somebody else\u0027s problem."
                  },
                  {
                      "item_id":  "bluetooth_speaker",
                      "id":  "bluetooth_speaker",
                      "name":  "Oversized Bluetooth Speaker",
                      "category":  "electronics",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  90,
                      "baseValue":  90,
                      "shop_buy_min":  30,
                      "shopBuyMin":  30,
                      "shop_buy_max":  55,
                      "shopBuyMax":  55,
                      "target_sell_price":  125,
                      "targetSellPrice":  125,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "portable"
                               ],
                      "description":  "Loud enough to turn any sidewalk into a bad decision."
                  },
                  {
                      "item_id":  "game_console",
                      "id":  "game_console",
                      "name":  "Current-Generation Game Console",
                      "category":  "console",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  360,
                      "baseValue":  360,
                      "shop_buy_min":  190,
                      "shopBuyMin":  190,
                      "shop_buy_max":  255,
                      "shopBuyMax":  255,
                      "target_sell_price":  430,
                      "targetSellPrice":  430,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "electronics",
                                   "popular"
                               ],
                      "description":  "Clean, complete, and suspiciously free of snack crumbs."
                  },
                  {
                      "item_id":  "handheld_console",
                      "id":  "handheld_console",
                      "name":  "Handheld Game Console",
                      "category":  "console",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  180,
                      "baseValue":  180,
                      "shop_buy_min":  80,
                      "shopBuyMin":  80,
                      "shop_buy_max":  125,
                      "shopBuyMax":  125,
                      "target_sell_price":  230,
                      "targetSellPrice":  230,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "electronics",
                                   "portable",
                                   "collectible"
                               ],
                      "description":  "Battery health is a private matter between it and the wall outlet."
                  },
                  {
                      "item_id":  "used_smartphone",
                      "id":  "used_smartphone",
                      "name":  "Used Smartphone, Factory Reset",
                      "category":  "electronics",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  240,
                      "baseValue":  240,
                      "shop_buy_min":  110,
                      "shopBuyMin":  110,
                      "shop_buy_max":  165,
                      "shopBuyMax":  165,
                      "target_sell_price":  295,
                      "targetSellPrice":  295,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "portable"
                               ],
                      "description":  "Actually reset. A rare miracle in this building."
                  },
                  {
                      "item_id":  "budget_laptop",
                      "id":  "budget_laptop",
                      "name":  "Budget Laptop With Charger",
                      "category":  "computer",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  220,
                      "baseValue":  220,
                      "shop_buy_min":  85,
                      "shopBuyMin":  85,
                      "shop_buy_max":  140,
                      "shopBuyMax":  140,
                      "target_sell_price":  285,
                      "targetSellPrice":  285,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "electronics",
                                   "practical"
                               ],
                      "description":  "Runs office software, web browsers, and one fan at maximum panic."
                  },
                  {
                      "item_id":  "mirrorless_camera",
                      "id":  "mirrorless_camera",
                      "name":  "Mirrorless Camera Body",
                      "category":  "electronics",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  480,
                      "baseValue":  480,
                      "shop_buy_min":  230,
                      "shopBuyMin":  230,
                      "shop_buy_max":  330,
                      "shopBuyMax":  330,
                      "target_sell_price":  575,
                      "targetSellPrice":  575,
                      "heat":  0,
                      "availability_tier":  "rare",
                      "availabilityTier":  "rare",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "luxury"
                               ],
                      "description":  "No lens included. Hope is included at no extra charge."
                  },
                  {
                      "item_id":  "circular_saw",
                      "id":  "circular_saw",
                      "name":  "Circular Saw With Case",
                      "category":  "tool",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  110,
                      "baseValue":  110,
                      "shop_buy_min":  40,
                      "shopBuyMin":  40,
                      "shop_buy_max":  70,
                      "shopBuyMax":  70,
                      "target_sell_price":  145,
                      "targetSellPrice":  145,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "repairable",
                                   "practical"
                               ],
                      "description":  "Still has all its teeth, unlike several customers."
                  },
                  {
                      "item_id":  "socket_set",
                      "id":  "socket_set",
                      "name":  "Mostly Complete Socket Set",
                      "category":  "tool",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  75,
                      "baseValue":  75,
                      "shop_buy_min":  22,
                      "shopBuyMin":  22,
                      "shop_buy_max":  42,
                      "shopBuyMax":  42,
                      "target_sell_price":  100,
                      "targetSellPrice":  100,
                      "heat":  0,
                      "availability_tier":  "common",
                      "availabilityTier":  "common",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "low",
                      "priceVariance":  "low",
                      "tags":  [
                                   "practical"
                               ],
                      "description":  "Missing the exact socket everyone always needs."
                  },
                  {
                      "item_id":  "pressure_washer",
                      "id":  "pressure_washer",
                      "name":  "Pressure Washer",
                      "category":  "tool",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  190,
                      "baseValue":  190,
                      "shop_buy_min":  70,
                      "shopBuyMin":  70,
                      "shop_buy_max":  115,
                      "shopBuyMax":  115,
                      "target_sell_price":  245,
                      "targetSellPrice":  245,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "practical",
                                   "repairable"
                               ],
                      "description":  "Strong enough to remove paint, grime, and poor planning."
                  },
                  {
                      "item_id":  "electric_guitar",
                      "id":  "electric_guitar",
                      "name":  "Solid-Body Electric Guitar",
                      "category":  "instrument",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  260,
                      "baseValue":  260,
                      "shop_buy_min":  100,
                      "shopBuyMin":  100,
                      "shop_buy_max":  165,
                      "shopBuyMax":  165,
                      "target_sell_price":  335,
                      "targetSellPrice":  335,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "collectible"
                               ],
                      "description":  "Three pickups and at least four unfinished songs."
                  },
                  {
                      "item_id":  "student_saxophone",
                      "id":  "student_saxophone",
                      "name":  "Student Alto Saxophone",
                      "category":  "instrument",
                      "default_condition":  "used",
                      "condition":  "used",
                      "base_value":  320,
                      "baseValue":  320,
                      "shop_buy_min":  120,
                      "shopBuyMin":  120,
                      "shop_buy_max":  200,
                      "shopBuyMax":  200,
                      "target_sell_price":  410,
                      "targetSellPrice":  410,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "low",
                      "demandLevel":  "low",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "collectible",
                                   "repairable"
                               ],
                      "description":  "Comes with a case and the threat of middle-school jazz."
                  },
                  {
                      "item_id":  "dj_turntable",
                      "id":  "dj_turntable",
                      "name":  "Direct-Drive DJ Turntable",
                      "category":  "electronics",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  300,
                      "baseValue":  300,
                      "shop_buy_min":  125,
                      "shopBuyMin":  125,
                      "shop_buy_max":  200,
                      "shopBuyMax":  200,
                      "target_sell_price":  385,
                      "targetSellPrice":  385,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "collectible"
                               ],
                      "description":  "Pitch control works. Previous owner\u0027s transitions did not."
                  },
                  {
                      "item_id":  "diamond_stud_earrings",
                      "id":  "diamond_stud_earrings",
                      "name":  "Small Diamond Stud Earrings",
                      "category":  "jewelry",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  650,
                      "baseValue":  650,
                      "shop_buy_min":  300,
                      "shopBuyMin":  300,
                      "shop_buy_max":  440,
                      "shopBuyMax":  440,
                      "target_sell_price":  780,
                      "targetSellPrice":  780,
                      "heat":  0,
                      "availability_tier":  "rare",
                      "availabilityTier":  "rare",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "luxury"
                               ],
                      "description":  "Tiny, legitimate, and finally accompanied by paperwork."
                  },
                  {
                      "item_id":  "gold_bracelet",
                      "id":  "gold_bracelet",
                      "name":  "14K Gold Bracelet",
                      "category":  "jewelry",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  520,
                      "baseValue":  520,
                      "shop_buy_min":  245,
                      "shopBuyMin":  245,
                      "shop_buy_max":  360,
                      "shopBuyMax":  360,
                      "target_sell_price":  640,
                      "targetSellPrice":  640,
                      "heat":  0,
                      "availability_tier":  "rare",
                      "availabilityTier":  "rare",
                      "demand_level":  "high",
                      "demandLevel":  "high",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "luxury"
                               ],
                      "description":  "Real gold, normal clasp, disappointingly little criminal intrigue."
                  },
                  {
                      "item_id":  "designer_sunglasses",
                      "id":  "designer_sunglasses",
                      "name":  "Designer Sunglasses With Case",
                      "category":  "luxury",
                      "default_condition":  "good",
                      "condition":  "good",
                      "base_value":  210,
                      "baseValue":  210,
                      "shop_buy_min":  75,
                      "shopBuyMin":  75,
                      "shop_buy_max":  130,
                      "shopBuyMax":  130,
                      "target_sell_price":  280,
                      "targetSellPrice":  280,
                      "heat":  0,
                      "availability_tier":  "uncommon",
                      "availabilityTier":  "uncommon",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "medium",
                      "priceVariance":  "medium",
                      "tags":  [
                                   "portable"
                               ],
                      "description":  "Makes anyone look expensive from a safe distance."
                  },
                  {
                      "item_id":  "automatic_watch",
                      "id":  "automatic_watch",
                      "name":  "Swiss Automatic Watch",
                      "category":  "watch",
                      "default_condition":  "excellent",
                      "condition":  "excellent",
                      "base_value":  950,
                      "baseValue":  950,
                      "shop_buy_min":  430,
                      "shopBuyMin":  430,
                      "shop_buy_max":  650,
                      "shopBuyMax":  650,
                      "target_sell_price":  1150,
                      "targetSellPrice":  1150,
                      "heat":  0,
                      "availability_tier":  "rare",
                      "availabilityTier":  "rare",
                      "demand_level":  "normal",
                      "demandLevel":  "normal",
                      "price_variance":  "high",
                      "priceVariance":  "high",
                      "tags":  [
                                   "luxury",
                                   "collectible"
                               ],
                      "description":  "Keeps accurate time, which makes it the most responsible thing here."
                  }
              ],
    "characterItemPools":  [
                               {
                                   "id":  "crackhead_fake_chain",
                                   "characterId":  "crackhead",
                                   "itemId":  "fake_gold_chain",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "fake",
                                                           "suspicious",
                                                           "jewelry"
                                                       ],
                                   "chanceWeight":  8,
                                   "askPriceMultiplier":  0.4,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk +1",
                                   "notes":  "Cheap fake jewelry with confidence problems."
                               },
                               {
                                   "id":  "crackhead_locked_watch",
                                   "characterId":  "crackhead",
                                   "itemId":  "smart_watch_locked",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "electronics",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  7,
                                   "askPriceMultiplier":  0.5,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +1",
                                   "notes":  "Locked device. Comes with a story that loses signal."
                               },
                               {
                                   "id":  "crackhead_mystery_trade",
                                   "characterId":  "crackhead",
                                   "itemId":  "sealed_mystery_box",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "electronics",
                                                             "junk",
                                                             "mystery"
                                                         ],
                                   "offeredItemTags":  [
                                                           "mystery",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  6,
                                   "askPriceMultiplier":  0.75,
                                   "cashAdjustmentMin":  -20,
                                   "cashAdjustmentMax":  20,
                                   "conditionOverride":  "unknown",
                                   "riskNote":  "Random scam/cop risk",
                                   "notes":  "Trades a bad box for something easier to fence."
                               },
                               {
                                   "id":  "crackhead_buys_junk",
                                   "characterId":  "crackhead",
                                   "itemId":  "dvd_stack",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "junk",
                                                             "collectible"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  0.8,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Will buy junk if the price is pathetic."
                               },
                               {
                                   "id":  "bum_microwave",
                                   "characterId":  "bum",
                                   "itemId":  "microwave_haunted",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "junk",
                                                           "broken",
                                                           "cursed"
                                                       ],
                                   "chanceWeight":  8,
                                   "askPriceMultiplier":  0.45,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "poor",
                                   "riskNote":  "Low scam risk",
                                   "notes":  "It hums because something in it gave up."
                               },
                               {
                                   "id":  "bum_dvd_stack",
                                   "characterId":  "bum",
                                   "itemId":  "dvd_stack",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "junk",
                                                           "collectible"
                                                       ],
                                   "chanceWeight":  9,
                                   "askPriceMultiplier":  0.35,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Low risk",
                                   "notes":  "Mostly DVDs from gas stations that went bankrupt."
                               },
                               {
                                   "id":  "bum_buys_cursed",
                                   "characterId":  "bum",
                                   "itemId":  "microwave_haunted",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "junk",
                                                             "cursed",
                                                             "appliance"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  0.75,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk if oversold",
                                   "notes":  "May buy cursed junk because rent is already cursed."
                               },
                               {
                                   "id":  "bum_junk_trade",
                                   "characterId":  "bum",
                                   "itemId":  "silverware_bundle",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "junk",
                                                             "electronics",
                                                             "appliance"
                                                         ],
                                   "offeredItemTags":  [
                                                           "possibly_fake",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.65,
                                   "cashAdjustmentMin":  -5,
                                   "cashAdjustmentMax":  10,
                                   "conditionOverride":  "questionable",
                                   "riskNote":  "Scam risk +1",
                                   "notes":  "A shoelace bundle of questionable silverware for shop junk."
                               },
                               {
                                   "id":  "hitman_buys_weapon",
                                   "characterId":  "hitman",
                                   "itemId":  "rusty_revolver_prop",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "weapon",
                                                             "hot",
                                                             "suspicious"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  1.2,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop/thug risk if suspicious",
                                   "notes":  "He does not ask whether it works. That is worse."
                               },
                               {
                                   "id":  "hitman_buys_luxury",
                                   "characterId":  "hitman",
                                   "itemId":  "suspicious_gold_watch",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "luxury",
                                                             "suspicious",
                                                             "hot"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  1.15,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Thug risk if insulted",
                                   "notes":  "Buys flashy inventory without haggling like a normal human."
                               },
                               {
                                   "id":  "hitman_knife_trade",
                                   "characterId":  "hitman",
                                   "itemId":  "pocket_knife",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "weapon",
                                                             "luxury",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  "weapon",
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.9,
                                   "cashAdjustmentMin":  -10,
                                   "cashAdjustmentMax":  35,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Thug risk +2 if refused badly",
                                   "notes":  "Trade math happens quietly. Too quietly."
                               },
                               {
                                   "id":  "hitman_prop_revolver",
                                   "characterId":  "hitman",
                                   "itemId":  "rusty_revolver_prop",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "weapon",
                                                           "suspicious",
                                                           "hot"
                                                       ],
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  0.65,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "questionable",
                                   "riskNote":  "Cop risk +3; thug risk +1",
                                   "notes":  "Probably a prop. Probably is not a business plan."
                               },
                               {
                                   "id":  "junkie_vcr",
                                   "characterId":  "junkie",
                                   "itemId":  "hospital_vcr",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "electronics",
                                                           "hot",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  6,
                                   "askPriceMultiplier":  0.55,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "questionable",
                                   "riskNote":  "Cop risk +1",
                                   "notes":  "Still has hospital tape. The hospital would like that back."
                               },
                               {
                                   "id":  "junkie_mystery_box",
                                   "characterId":  "junkie",
                                   "itemId":  "sealed_mystery_box",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "mystery",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  8,
                                   "askPriceMultiplier":  0.65,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "unknown",
                                   "riskNote":  "Random scam/cop risk",
                                   "notes":  "Box rattles like a lawsuit."
                               },
                               {
                                   "id":  "junkie_tablet_buy",
                                   "characterId":  "junkie",
                                   "itemId":  "cracked_tablet",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "electronics",
                                                             "broken"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  0.8,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk if lied to",
                                   "notes":  "Will buy cracked electronics if the pitch is desperate enough."
                               },
                               {
                                   "id":  "junkie_weird_trade",
                                   "characterId":  "junkie",
                                   "itemId":  "cracked_tablet",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "mystery",
                                                             "electronics",
                                                             "junk"
                                                         ],
                                   "offeredItemTags":  [
                                                           "broken",
                                                           "electronics"
                                                       ],
                                   "chanceWeight":  6,
                                   "askPriceMultiplier":  0.6,
                                   "cashAdjustmentMin":  -15,
                                   "cashAdjustmentMax":  25,
                                   "conditionOverride":  "poor",
                                   "riskNote":  "Scam risk +1",
                                   "notes":  "Trades broken electronics for anything that looks easier to carry."
                               },
                               {
                                   "id":  "desperate_regular_microwave",
                                   "characterId":  "desperate_regular",
                                   "itemId":  "microwave_haunted",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "junk",
                                                           "broken",
                                                           "cursed"
                                                       ],
                                   "chanceWeight":  8,
                                   "askPriceMultiplier":  0.6,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low scam risk",
                                   "notes":  "Cheap junk filler."
                               },
                               {
                                   "id":  "desperate_regular_dvds",
                                   "characterId":  "desperate_regular",
                                   "itemId":  "dvd_stack",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "junk",
                                                           "collectible"
                                                       ],
                                   "chanceWeight":  10,
                                   "askPriceMultiplier":  0.5,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Common bad inventory."
                               },
                               {
                                   "id":  "desperate_regular_buys_dvds",
                                   "characterId":  "desperate_regular",
                                   "itemId":  "dvd_stack",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "junk",
                                                             "collectible"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.85,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Will buy garbage if priced like garbage."
                               },
                               {
                                   "id":  "desperate_regular_junk_trade",
                                   "characterId":  "desperate_regular",
                                   "itemId":  "fake_gold_chain",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "junk",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  [
                                                           "fake",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  0.8,
                                   "cashAdjustmentMin":  -10,
                                   "cashAdjustmentMax":  8,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk +1",
                                   "notes":  "May trade fake jewelry for shop junk."
                               },
                               {
                                   "id":  "nervous_seller_vcr",
                                   "characterId":  "nervous_seller",
                                   "itemId":  "hospital_vcr",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "electronics",
                                                           "hot",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  7,
                                   "askPriceMultiplier":  0.7,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +1",
                                   "notes":  "Good early shady deal."
                               },
                               {
                                   "id":  "nervous_seller_watch",
                                   "characterId":  "nervous_seller",
                                   "itemId":  "smart_watch_locked",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "electronics",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.65,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +1",
                                   "notes":  "Locked device problem."
                               },
                               {
                                   "id":  "nervous_seller_tablet_trade",
                                   "characterId":  "nervous_seller",
                                   "itemId":  "cracked_tablet",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "electronics",
                                                             "junk"
                                                         ],
                                   "offeredItemTags":  [
                                                           "broken",
                                                           "electronics"
                                                       ],
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  0.75,
                                   "cashAdjustmentMin":  -5,
                                   "cashAdjustmentMax":  15,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk +1",
                                   "notes":  "Offers broken electronics for almost anything that looks safer."
                               },
                               {
                                   "id":  "collector_cards_buy",
                                   "characterId":  "collector",
                                   "itemId":  "baseball_card_box",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "collectible",
                                                             "mystery"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  6,
                                   "askPriceMultiplier":  1.2,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk if lied to",
                                   "notes":  "Collector may buy mystery collectibles."
                               },
                               {
                                   "id":  "collector_action_figure_buy",
                                   "characterId":  "collector",
                                   "itemId":  "rare_action_figure",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "collectible",
                                                             "rare",
                                                             "broken"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  1.1,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Reputation hit if fake pitch",
                                   "notes":  "Good haggling target."
                               },
                               {
                                   "id":  "collector_figure_trade",
                                   "characterId":  "collector",
                                   "itemId":  "rare_action_figure",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "collectible",
                                                             "rare"
                                                         ],
                                   "offeredItemTags":  [
                                                           "collectible",
                                                           "rare",
                                                           "broken"
                                                       ],
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  1,
                                   "cashAdjustmentMin":  -20,
                                   "cashAdjustmentMax":  30,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Collector offers one collectible for another, then acts morally superior."
                               },
                               {
                                   "id":  "mechanic_drill",
                                   "characterId":  "mechanic",
                                   "itemId":  "cordless_drill",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "tool",
                                                           "repairable"
                                                       ],
                                   "chanceWeight":  8,
                                   "askPriceMultiplier":  0.75,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Useful tool offer."
                               },
                               {
                                   "id":  "mechanic_bolt_cutters",
                                   "characterId":  "mechanic",
                                   "itemId":  "bolt_cutters",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "tool",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  0.7,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Thug/cop flavor risk",
                                   "notes":  "Looks sketchy on shelf."
                               },
                               {
                                   "id":  "mechanic_buys_tools",
                                   "characterId":  "mechanic",
                                   "itemId":  "cordless_drill",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "tool",
                                                             "repairable"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  1.05,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Good buyer for tool inventory."
                               },
                               {
                                   "id":  "mechanic_tool_trade",
                                   "characterId":  "mechanic",
                                   "itemId":  "bolt_cutters",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "tool",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  [
                                                           "tool",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.9,
                                   "cashAdjustmentMin":  -10,
                                   "cashAdjustmentMax":  25,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +1 if hot",
                                   "notes":  "Trades tools for tools like a garage raccoon."
                               },
                               {
                                   "id":  "street_fence_ring",
                                   "characterId":  "street_fence",
                                   "itemId":  "gold_ring_engravings",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "jewelry",
                                                           "luxury",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.55,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +2",
                                   "notes":  "High profit, hot smell."
                               },
                               {
                                   "id":  "street_fence_wheel",
                                   "characterId":  "street_fence",
                                   "itemId":  "stolen_bike_wheel",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "stolen",
                                                           "hot",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  7,
                                   "askPriceMultiplier":  0.45,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +2",
                                   "notes":  "Obviously hot."
                               },
                               {
                                   "id":  "street_fence_buys_luxury",
                                   "characterId":  "street_fence",
                                   "itemId":  "suspicious_gold_watch",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "luxury",
                                                             "suspicious",
                                                             "hot"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  0.95,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +1",
                                   "notes":  "Fence may buy risky luxury goods."
                               },
                               {
                                   "id":  "street_fence_hot_trade",
                                   "characterId":  "street_fence",
                                   "itemId":  "luxury_handbag_fake",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "luxury",
                                                             "weapon",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  [
                                                           "luxury",
                                                           "possibly_fake"
                                                       ],
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.75,
                                   "cashAdjustmentMin":  -15,
                                   "cashAdjustmentMax":  40,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +2; scam risk +1",
                                   "notes":  "Bad trade offer wearing fake designer leather."
                               },
                               {
                                   "id":  "bargain_hunter_buys_dvds",
                                   "characterId":  "bargain_hunter",
                                   "itemId":  "dvd_stack",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "junk",
                                                             "collectible"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  8,
                                   "askPriceMultiplier":  0.9,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Perfect sucker for low-value clutter, but not at sane prices."
                               },
                               {
                                   "id":  "bargain_hunter_buys_tablet",
                                   "characterId":  "bargain_hunter",
                                   "itemId":  "cracked_tablet",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "electronics",
                                                             "broken"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.9,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk if lied to",
                                   "notes":  "Will buy busted electronics if called \u0027lightly loved\u0027."
                               },
                               {
                                   "id":  "bargain_hunter_junk_trade",
                                   "characterId":  "bargain_hunter",
                                   "itemId":  "dvd_stack",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "junk",
                                                             "collectible",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  [
                                                           "junk",
                                                           "collectible"
                                                       ],
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  0.8,
                                   "cashAdjustmentMin":  -5,
                                   "cashAdjustmentMax":  12,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low risk",
                                   "notes":  "Junk-for-junk trade. Everybody loses with dignity."
                               },
                               {
                                   "id":  "tracksuit_knife",
                                   "characterId":  "tracksuit_thug",
                                   "itemId":  "pocket_knife",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "weapon",
                                                             "luxury",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  "weapon",
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.8,
                                   "cashAdjustmentMin":  -20,
                                   "cashAdjustmentMax":  25,
                                   "conditionOverride":  "",
                                   "riskNote":  "Thug risk +2 if refused badly",
                                   "notes":  "Danger customer."
                               },
                               {
                                   "id":  "tracksuit_prop_revolver",
                                   "characterId":  "tracksuit_thug",
                                   "itemId":  "rusty_revolver_prop",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "weapon",
                                                           "suspicious",
                                                           "hot"
                                                       ],
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  0.5,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop risk +3; thug risk +2",
                                   "notes":  "High heat, dumb money."
                               },
                               {
                                   "id":  "tracksuit_buys_hot",
                                   "characterId":  "tracksuit_thug",
                                   "itemId":  "suspicious_gold_watch",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "weapon",
                                                             "luxury",
                                                             "hot"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  0.9,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Thug risk if insulted",
                                   "notes":  "Buys dangerous or flashy stuff."
                               },
                               {
                                   "id":  "undercover_watch",
                                   "characterId":  "undercover_cop",
                                   "itemId":  "suspicious_gold_watch",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "stolen",
                                                             "suspicious",
                                                             "hot",
                                                             "luxury"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  1.3,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Selling hot item to cop is bad",
                                   "notes":  "Bait transaction."
                               },
                               {
                                   "id":  "undercover_weapon",
                                   "characterId":  "undercover_cop",
                                   "itemId":  "rusty_revolver_prop",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "weapon",
                                                             "hot",
                                                             "suspicious"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  2,
                                   "askPriceMultiplier":  1.3,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Cop consequence trigger candidate",
                                   "notes":  "Do not be the idiot. Player will be the idiot."
                               },
                               {
                                   "id":  "angry_returner_broken_buy",
                                   "characterId":  "angry_returner",
                                   "itemId":  "cracked_tablet",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "broken",
                                                             "fake",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  0.8,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam-risk callback",
                                   "notes":  "Good source for refund/dispute events."
                               },
                               {
                                   "id":  "mystery_box",
                                   "characterId":  "mystery_weirdo",
                                   "itemId":  "sealed_mystery_box",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "mystery",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  9,
                                   "askPriceMultiplier":  0.75,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Random scam/cop risk",
                                   "notes":  "Good weird event seed."
                               },
                               {
                                   "id":  "mystery_weirdo_box_trade",
                                   "characterId":  "mystery_weirdo",
                                   "itemId":  "sealed_mystery_box",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "mystery",
                                                             "cursed",
                                                             "rare",
                                                             "junk"
                                                         ],
                                   "offeredItemTags":  [
                                                           "mystery",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  7,
                                   "askPriceMultiplier":  0.85,
                                   "cashAdjustmentMin":  -25,
                                   "cashAdjustmentMax":  50,
                                   "conditionOverride":  "unknown",
                                   "riskNote":  "Random risk",
                                   "notes":  "Offers a box for something equally regrettable."
                               },
                               {
                                   "id":  "mystery_weirdo_buys_cursed",
                                   "characterId":  "mystery_weirdo",
                                   "itemId":  "microwave_haunted",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "cursed",
                                                             "mystery",
                                                             "rare"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  1.15,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Scam risk if broken",
                                   "notes":  "May buy cursed trash. Do not question blessings from the dumpster."
                               },
                               {
                                   "id":  "70s_hustler_gold_watch",
                                   "characterId":  "70s_hustler",
                                   "itemId":  "suspicious_gold_watch",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "luxury",
                                                           "suspicious",
                                                           "hot"
                                                       ],
                                   "chanceWeight":  7,
                                   "askPriceMultiplier":  0.7,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Cop risk +1; scam risk +1",
                                   "notes":  "Claims it belonged to a nightclub owner. Does not clarify which owner."
                               },
                               {
                                   "id":  "70s_hustler_cards_trade",
                                   "characterId":  "70s_hustler",
                                   "itemId":  "baseball_card_box",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "luxury",
                                                             "collectible",
                                                             "electronics"
                                                         ],
                                   "offeredItemTags":  [
                                                           "collectible",
                                                           "mystery"
                                                       ],
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  0.9,
                                   "cashAdjustmentMin":  -20,
                                   "cashAdjustmentMax":  35,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Scam risk +1",
                                   "notes":  "Vintage cards in a box that has survived several bad decades."
                               },
                               {
                                   "id":  "70s_hustler_buys_luxury",
                                   "characterId":  "70s_hustler",
                                   "itemId":  "gold_ring_engravings",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "luxury",
                                                             "jewelry",
                                                             "collectible"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  5,
                                   "askPriceMultiplier":  1.05,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Low cop risk; scam risk if misrepresented",
                                   "notes":  "Pays for visible status and questionable history."
                               },
                               {
                                   "id":  "red_hustler_locked_watch",
                                   "characterId":  "red_hustler",
                                   "itemId":  "smart_watch_locked",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "electronics",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  6,
                                   "askPriceMultiplier":  0.65,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "questionable",
                                   "riskNote":  "Cop risk +1; scam risk +1",
                                   "notes":  "The lock screen belongs to somebody with a different name."
                               },
                               {
                                   "id":  "red_hustler_buys_watch",
                                   "characterId":  "red_hustler",
                                   "itemId":  "suspicious_gold_watch",
                                   "dealType":  "buy_from_shop",
                                   "itemRole":  "npc_requests",
                                   "requestedItemTags":  [
                                                             "luxury",
                                                             "hot",
                                                             "suspicious"
                                                         ],
                                   "offeredItemTags":  null,
                                   "chanceWeight":  6,
                                   "askPriceMultiplier":  1.1,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "",
                                   "riskNote":  "Thug risk if insulted",
                                   "notes":  "Likes merchandise that looks expensive from across a parking lot."
                               },
                               {
                                   "id":  "red_hustler_figure_trade",
                                   "characterId":  "red_hustler",
                                   "itemId":  "rare_action_figure",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "electronics",
                                                             "luxury",
                                                             "collectible"
                                                         ],
                                   "offeredItemTags":  [
                                                           "collectible",
                                                           "rare",
                                                           "broken"
                                                       ],
                                   "chanceWeight":  4,
                                   "askPriceMultiplier":  0.85,
                                   "cashAdjustmentMin":  -15,
                                   "cashAdjustmentMax":  30,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Scam risk +1; thug risk +1 on bad refusal",
                                   "notes":  "Calls it mint while holding it by the head."
                               },
                               {
                                   "id":  "slot_grandma_gold_ring",
                                   "characterId":  "slot_grandma",
                                   "itemId":  "gold_ring_engravings",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "jewelry",
                                                           "luxury"
                                                       ],
                                   "chanceWeight":  8,
                                   "askPriceMultiplier":  0.72,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Low risk; reputation penalty for extreme lowball",
                                   "notes":  "A real family ring being converted into another spin."
                               },
                               {
                                   "id":  "slot_grandma_silverware",
                                   "characterId":  "slot_grandma",
                                   "itemId":  "silverware_bundle",
                                   "dealType":  "sell_to_shop",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  null,
                                   "offeredItemTags":  [
                                                           "possibly_fake",
                                                           "household",
                                                           "suspicious"
                                                       ],
                                   "chanceWeight":  6,
                                   "askPriceMultiplier":  0.55,
                                   "cashAdjustmentMin":  0,
                                   "cashAdjustmentMax":  0,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Low scam risk",
                                   "notes":  "Wrapped carefully in a dish towel older than the shop."
                               },
                               {
                                   "id":  "slot_grandma_cards_trade",
                                   "characterId":  "slot_grandma",
                                   "itemId":  "baseball_card_box",
                                   "dealType":  "trade",
                                   "itemRole":  "npc_offers",
                                   "requestedItemTags":  [
                                                             "jewelry",
                                                             "collectible"
                                                         ],
                                   "offeredItemTags":  [
                                                           "collectible",
                                                           "mystery"
                                                       ],
                                   "chanceWeight":  3,
                                   "askPriceMultiplier":  0.9,
                                   "cashAdjustmentMin":  5,
                                   "cashAdjustmentMax":  20,
                                   "conditionOverride":  "used",
                                   "riskNote":  "Low risk",
                                   "notes":  "Would rather have cash, but may trade when desperate."
                               }
                           ],
    "eventBlueprints":  [
                            {
                                "id":  "crackhead_locked_watch_offer",
                                "characterId":  "crackhead",
                                "eventType":  "sell_to_shop",
                                "dialogue":  "Got a smart watch. Locked for privacy. My privacy, your problem.",
                                "resultNotes":  "Use crackhead_locked_watch pool for item/price."
                            },
                            {
                                "id":  "bum_microwave_offer",
                                "characterId":  "bum",
                                "eventType":  "sell_to_shop",
                                "dialogue":  "Microwave works. Sometimes it starts before you touch it. Saves time.",
                                "resultNotes":  "Low-risk junk filler."
                            },
                            {
                                "id":  "hitman_luxury_buy",
                                "characterId":  "hitman",
                                "eventType":  "buy_from_shop",
                                "dialogue":  "I need something classy. Not traceable-classy. Just classy.",
                                "resultNotes":  "Requires luxury/weapon/hot inventory."
                            },
                            {
                                "id":  "hitman_knife_trade",
                                "characterId":  "hitman",
                                "eventType":  "trade",
                                "dialogue":  "I have a knife and a calm attitude. One is for trade.",
                                "resultNotes":  "Dangerous trade test."
                            },
                            {
                                "id":  "junkie_mystery_box_trade",
                                "characterId":  "junkie",
                                "eventType":  "trade",
                                "dialogue":  "This box has value. Emotional, legal, maybe electrical.",
                                "resultNotes":  "Good weird-risk event."
                            },
                            {
                                "id":  "nervous_vcr_offer",
                                "characterId":  "nervous_seller",
                                "eventType":  "sell_to_shop",
                                "dialogue":  "Got a vintage VCR. Works great. Don’t ask why there’s hospital tape on it.",
                                "resultNotes":  "Use Character_Item_Pools for exact item/price."
                            },
                            {
                                "id":  "collector_cards_buy",
                                "characterId":  "collector",
                                "eventType":  "buy_from_shop",
                                "dialogue":  "I heard you have baseball cards. I collect terrible financial decisions.",
                                "resultNotes":  "Requires matching collectible inventory."
                            },
                            {
                                "id":  "tracksuit_bad_trade",
                                "characterId":  "tracksuit_thug",
                                "eventType":  "trade",
                                "dialogue":  "Nice shop. Be a shame if someone paid retail.",
                                "resultNotes":  "Potential thug consequence."
                            },
                            {
                                "id":  "mechanic_tool_sale",
                                "characterId":  "mechanic",
                                "eventType":  "buy_from_shop",
                                "dialogue":  "You got tools back there, or just decorative tetanus?",
                                "resultNotes":  "Good clean selling event."
                            },
                            {
                                "id":  "street_fence_hot_offer",
                                "characterId":  "street_fence",
                                "eventType":  "sell_to_shop",
                                "dialogue":  "It’s not stolen. It’s aggressively pre-owned.",
                                "resultNotes":  "High-risk high-profit source."
                            },
                            {
                                "id":  "undercover_bait_buy",
                                "characterId":  "undercover_cop",
                                "eventType":  "buy_from_shop",
                                "dialogue":  "This serial number being scratched off, is that normal pawn shop stuff?",
                                "resultNotes":  "Bait event for hot inventory."
                            },
                            {
                                "id":  "mystery_weirdo_trade",
                                "characterId":  "mystery_weirdo",
                                "eventType":  "trade",
                                "dialogue":  "I brought a box. It brought itself, spiritually and maybe legally.",
                                "resultNotes":  "Weird trade event; keep effects simple."
                            },
                            {
                                "id":  "70s_hustler_watch_offer",
                                "characterId":  "70s_hustler",
                                "eventType":  "sell_to_shop",
                                "dialogue":  "Vintage gold. Vintage means the questions expired.",
                                "resultNotes":  "Use 70s_hustler_gold_watch pool."
                            },
                            {
                                "id":  "red_hustler_luxury_buy",
                                "characterId":  "red_hustler",
                                "eventType":  "buy_from_shop",
                                "dialogue":  "Show me something expensive enough to make strangers lie about knowing me.",
                                "resultNotes":  "Use red_hustler_buys_watch or matching luxury inventory."
                            },
                            {
                                "id":  "slot_grandma_ring_offer",
                                "characterId":  "slot_grandma",
                                "eventType":  "sell_to_shop",
                                "dialogue":  "It was my anniversary ring. The machine is due, sweetheart.",
                                "resultNotes":  "Use slot_grandma_gold_ring pool. Keep tone darkly funny, not cruel."
                            }
                        ]
};
