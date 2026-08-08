window.ONE_STAR_PAWN_DATA = {
  "factions": [
    {
      "id": "hustlers",
      "displayName": "Hustlers",
      "members": [
        "hustler-shorty",
        "hustler-cool-j",
        "hustler-kangol"
      ],
      "thug": "hustler-thug-red",
      "notes": "Uses shared thug retaliation consequence metadata."
    },
    {
      "id": "tracksuits",
      "displayName": "Tracksuits",
      "members": [
        "tracksuit-legs",
        "tracksuit-slim"
      ],
      "thug": "tracksuit-thug-vincent",
      "notes": "Organizational metadata only; consequence behavior remains unchanged."
    }
  ],
  "characters": [
    {
      "id": "street-crackhead",
      "displayName": "Crackhead",
      "archetype": "Desperate Seller",
      "spriteType": "seller",
      "factionId": "street_desperate",
      "spritePath": "assets/sprites/street-crackhead-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-street-crackhead",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 0.0,
      "cashMax": 70.0,
      "trust": 26,
      "trustLabel": "1 - liar",
      "copRiskBias": 2.0,
      "thugRiskBias": 2.0,
      "scamRiskBias": 4.0,
      "preferredItemTags": [
        "junk",
        "broken",
        "suspicious",
        "electronics",
        "mystery"
      ],
      "notes": "Moves like a shopping cart with a court date. Sells fast, lies faster."
    },
    {
      "id": "street-bum",
      "displayName": "Bum",
      "archetype": "Desperate Regular",
      "spriteType": "regular",
      "factionId": "street_desperate",
      "spritePath": "assets/sprites/street-bum-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-street-bum",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 0.0,
      "cashMax": 45.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "junk",
        "broken",
        "cursed",
        "appliance"
      ],
      "notes": "Smells like sidewalk rain and bad economics. Somehow knows the value of copper."
    },
    {
      "id": "service-hitman",
      "displayName": "Hitman",
      "archetype": "Dangerous Buyer",
      "spriteType": "thug",
      "factionId": "professional_independent",
      "spritePath": "assets/sprites/service-hitman-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-service-hitman",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 80.0,
      "cashMax": 500.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 5.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "weapon",
        "luxury",
        "hot",
        "suspicious",
        "electronics"
      ],
      "notes": "Too calm, too clean, and somehow worse than both. Never asks for a receipt."
    },
    {
      "id": "street-junkie",
      "displayName": "Junkie",
      "archetype": "Mystery Seller",
      "spriteType": "weirdo",
      "factionId": "street_desperate",
      "spritePath": "assets/sprites/street-junkie-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-street-junkie",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 5.0,
      "cashMax": 110.0,
      "trust": 26,
      "trustLabel": "1 - liar",
      "copRiskBias": 3.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 5.0,
      "preferredItemTags": [
        "electronics",
        "mystery",
        "suspicious",
        "cursed",
        "broken"
      ],
      "notes": "Offers items, trades, and explanations that all have missing screws."
    },
    {
      "id": "desperate_regular",
      "displayName": "Desperate Regular",
      "archetype": "Desperate Regular",
      "spriteType": "regular",
      "factionId": "street_desperate",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 0.0,
      "cashMax": 40.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "junk",
        "broken",
        "suspicious"
      ],
      "notes": "Always needs cash today. Yesterday was also today somehow."
    },
    {
      "id": "nervous_seller",
      "displayName": "Nervous Seller",
      "archetype": "Nervous Seller",
      "spriteType": "seller",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 10.0,
      "cashMax": 120.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 2.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "electronics",
        "hot",
        "suspicious"
      ],
      "notes": "Sweats through a denim jacket; often has items with stories that do not survive follow-up questions."
    },
    {
      "id": "collector",
      "displayName": "Collector",
      "archetype": "Collector",
      "spriteType": "collector",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 80.0,
      "cashMax": 500.0,
      "trust": 62,
      "trustLabel": "4 - mostly honest",
      "copRiskBias": 0.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "rare",
        "collectible"
      ],
      "notes": "Knows value. Will absolutely judge your display case."
    },
    {
      "id": "mechanic",
      "displayName": "Mechanic",
      "archetype": "Mechanic",
      "spriteType": "seller",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 20.0,
      "cashMax": 180.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "tool",
        "repairable",
        "broken"
      ],
      "notes": "Sells tools, parts, and objects that smell like a garage fire."
    },
    {
      "id": "street_fence",
      "displayName": "Street Fence",
      "archetype": "Fence",
      "spriteType": "seller",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 50.0,
      "cashMax": 300.0,
      "trust": 26,
      "trustLabel": "1 - liar",
      "copRiskBias": 3.0,
      "thugRiskBias": 2.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "stolen",
        "hot",
        "luxury"
      ],
      "notes": "Everything is definitely from his cousin. Cousins have been busy."
    },
    {
      "id": "bargain_hunter",
      "displayName": "Bargain Hunter",
      "archetype": "Bargain Hunter",
      "spriteType": "buyer",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 15.0,
      "cashMax": 160.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "junk",
        "collectible",
        "electronics"
      ],
      "notes": "Wants a discount because Mercury is in retrograde, probably on Facebook Marketplace."
    },
    {
      "id": "tracksuit-thug-vincent",
      "displayName": "Vincent",
      "archetype": "Thug",
      "spriteType": "thug",
      "factionId": "tracksuits",
      "spritePath": "assets/sprites/tracksuit-thug-vincent-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-tracksuit-thug-vincent",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 20.0,
      "cashMax": 250.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 0.0,
      "thugRiskBias": 4.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "weapon",
        "luxury",
        "hot"
      ],
      "notes": "Negotiates with eye contact and visible neck tattoos."
    },
    {
      "id": "undercover_cop",
      "displayName": "Suspiciously Normal Guy",
      "archetype": "Cop Bait",
      "spriteType": "cop",
      "factionId": "law_enforcement",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 40.0,
      "cashMax": 200.0,
      "trust": 74,
      "trustLabel": "5 - reliable",
      "copRiskBias": 5.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 0.0,
      "preferredItemTags": [
        "stolen",
        "weapon",
        "hot"
      ],
      "notes": "Asks if the serial number being scratched off is 'normal pawn shop stuff'."
    },
    {
      "id": "angry_returner",
      "displayName": "Angry Returner",
      "archetype": "Angry Customer",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 0.0,
      "cashMax": 80.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 4.0,
      "preferredItemTags": [
        "broken",
        "fake"
      ],
      "notes": "Comes back holding your receipt like evidence in a municipal trial."
    },
    {
      "id": "mystery_weirdo",
      "displayName": "Mystery Weirdo",
      "archetype": "Mystery Weirdo",
      "spriteType": "weirdo",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 0.0,
      "cashMax": 999.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 1.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "cursed",
        "mystery",
        "rare"
      ],
      "notes": "May sell treasure. May sell a box of wet teeth. Budget accordingly."
    },
    {
      "id": "purple_customer",
      "displayName": "Purple Customer",
      "archetype": "Prototype Placeholder",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "",
      "facing": "",
      "spriteClass": "",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 0.0,
      "cashMax": 100.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 0.0,
      "preferredItemTags": [
        "prototype"
      ],
      "notes": "Original prototype row. Kept inactive for reference only; not used in gameplay rotation."
    },
    {
      "id": "regular-mr-seventies",
      "displayName": "Mr. Seventies",
      "archetype": "Vintage Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/regular-mr-seventies-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-regular-mr-seventies",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 60.0,
      "cashMax": 350.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 2.0,
      "thugRiskBias": 2.0,
      "scamRiskBias": 4.0,
      "preferredItemTags": [
        "luxury",
        "collectible",
        "jewelry",
        "electronics",
        "suspicious"
      ],
      "notes": "Dresses like a casino carpet and talks like every object has appreciated since 1978."
    },
    {
      "id": "regular-business-drunk",
      "displayName": "Business Drunk",
      "archetype": "Regular Buyer",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/regular-business-drunk-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-regular-business-drunk",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 35.0,
      "cashMax": 260.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "electronics",
        "luxury",
        "watch",
        "collectible",
        "portable",
        "suspicious"
      ],
      "notes": "Tie loose, judgment looser, but still knows a decent gadget when he sees one."
    },
    {
      "id": "regular-lady-divorce",
      "displayName": "Divorce Lady",
      "archetype": "Regular Seller",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/regular-lady-divorce-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-regular-lady-divorce",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 20.0,
      "cashMax": 240.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "jewelry",
        "watch",
        "luxury",
        "collectible",
        "household"
      ],
      "notes": "Converting household history into cash with terrifying calm."
    },
    {
      "id": "money-jan-takai",
      "displayName": "Jan Takai",
      "archetype": "Practical Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/money-jan-takai-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-money-jan-takai",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 25.0,
      "cashMax": 260.0,
      "trust": 62,
      "trustLabel": "4 - mostly honest",
      "copRiskBias": 0.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "household",
        "appliance",
        "jewelry",
        "electronics",
        "tool",
        "collectible",
        "practical"
      ],
      "notes": "Shops like every object has to justify its shelf space by Friday."
    },
    {
      "id": "regular-mr-tourist",
      "displayName": "Mr. Tourist",
      "archetype": "Tourist Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/regular-mr-tourist-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-regular-mr-tourist",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 45.0,
      "cashMax": 360.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 1.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "electronics",
        "camera",
        "watch",
        "jewelry",
        "souvenir",
        "collectible",
        "luxury",
        "suspicious"
      ],
      "notes": "Wants local authenticity and keeps finding regional lawsuits instead."
    },
    {
      "id": "regular-mrs-tourist",
      "displayName": "Mrs. Tourist",
      "archetype": "Tourist Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/regular-mrs-tourist-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-regular-mrs-tourist",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 45.0,
      "cashMax": 360.0,
      "trust": 62,
      "trustLabel": "4 - mostly honest",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "jewelry",
        "watch",
        "luxury",
        "souvenir",
        "collectible",
        "decorative",
        "household"
      ],
      "notes": "Knows the difference between a keepsake and clutter. Buys both anyway."
    },
    {
      "id": "regular-tim-lee",
      "displayName": "Tim Lee",
      "archetype": "Everyday Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/regular-tim-lee-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-regular-tim-lee",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 30.0,
      "cashMax": 280.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "electronics",
        "computer",
        "console",
        "tool",
        "watch",
        "collectible",
        "household",
        "practical"
      ],
      "notes": "Practical until the price drops, then suddenly sentimental."
    },
    {
      "id": "hustler-shorty",
      "displayName": "Shorty",
      "archetype": "Flashy Deal Chaser",
      "spriteType": "buyer",
      "factionId": "hustlers",
      "spritePath": "assets/sprites/hustler-shorty-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-hustler-shorty",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 40.0,
      "cashMax": 280.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 3.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot",
        "suspicious"
      ],
      "notes": "Confident, impatient, and dressed like subtlety owes him money."
    },
    {
      "id": "hustler-cool-j",
      "displayName": "Cool J",
      "archetype": "Flashy Deal Chaser",
      "spriteType": "buyer",
      "factionId": "hustlers",
      "spritePath": "assets/sprites/hustler-cool-J-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-hustler-cool-j",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 40.0,
      "cashMax": 280.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 3.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot",
        "suspicious"
      ],
      "notes": "Confident, impatient, and dressed like subtlety owes him money."
    },
    {
      "id": "hustler-kangol",
      "displayName": "Kangol",
      "archetype": "Flashy Deal Chaser",
      "spriteType": "buyer",
      "factionId": "hustlers",
      "spritePath": "assets/sprites/hustler-kangol-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-hustler-kangol",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 40.0,
      "cashMax": 280.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 3.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot",
        "suspicious"
      ],
      "notes": "Confident, impatient, and dressed like subtlety owes him money."
    },
    {
      "id": "hustler-thug-red",
      "displayName": "Red",
      "archetype": "Thug",
      "spriteType": "thug",
      "factionId": "hustlers",
      "spritePath": "assets/sprites/hustler-thug-red-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-hustler-thug-red",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 20.0,
      "cashMax": 250.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 0.0,
      "thugRiskBias": 4.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "weapon",
        "luxury",
        "hot"
      ],
      "notes": "Consequence-ready heavy for the hustlers metadata roster."
    },
    {
      "id": "tracksuit-legs",
      "displayName": "Tracksuit Legs",
      "archetype": "Flashy Deal Chaser",
      "spriteType": "buyer",
      "factionId": "tracksuits",
      "spritePath": "assets/sprites/tracksuit-legs-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-tracksuit-legs",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 40.0,
      "cashMax": 280.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 3.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot",
        "suspicious"
      ],
      "notes": "All stride, all attitude, all cash-in-hand problems."
    },
    {
      "id": "tracksuit-slim",
      "displayName": "Tracksuit Slim",
      "archetype": "Flashy Deal Chaser",
      "spriteType": "buyer",
      "factionId": "tracksuits",
      "spritePath": "assets/sprites/tracksuit-slim-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-tracksuit-slim",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 40.0,
      "cashMax": 280.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 3.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot",
        "suspicious"
      ],
      "notes": "Tall, sharp, and haggles like the price insulted him first."
    },
    {
      "id": "tracksuit-tommy",
      "displayName": "Tommy",
      "archetype": "Tracksuit Regular",
      "spriteType": "buyer",
      "factionId": "tracksuits",
      "spritePath": "assets/sprites/tracksuit-tommy-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-tracksuit-tommy",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 40.0,
      "cashMax": 280.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 3.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot",
        "suspicious"
      ],
      "notes": "Tracksuit roster record awaiting deal data."
    },
    {
      "id": "regular-grandma-slots",
      "displayName": "Slot Grandma",
      "archetype": "Compulsive Gambler",
      "spriteType": "seller",
      "factionId": "casino_regular",
      "spritePath": "assets/sprites/regular-grandma-slots-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-regular-grandma-slots",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 0.0,
      "cashMax": 65.0,
      "trust": 62,
      "trustLabel": "4 - mostly honest",
      "copRiskBias": 0.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "jewelry",
        "collectible",
        "luxury",
        "household"
      ],
      "notes": "Sweet, broke, and one jackpot away from solving the problem she created with the last jackpot."
    },
    {
      "id": "regular-grandpa-catfish",
      "displayName": "Catfish Grandpa",
      "archetype": "Senior Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/regular-grandpa-catfish-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-regular-grandpa-catfish",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 10.0,
      "cashMax": 180.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "tool",
        "electronics",
        "appliance",
        "watch",
        "collectible",
        "suspicious"
      ],
      "notes": "Has a garage full of practical objects and stories that almost line up."
    },
    {
      "id": "money-salaryman",
      "displayName": "Salaryman",
      "archetype": "Office Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/money-salaryman-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-money-salaryman",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 40.0,
      "cashMax": 340.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "watch",
        "electronics",
        "computer",
        "office",
        "instrument",
        "luxury",
        "collectible",
        "appliance",
        "practical"
      ],
      "notes": "Arrives with spreadsheet posture and lunch-break desperation."
    },
    {
      "id": "money-devon-dollars",
      "displayName": "Devon Dollars",
      "archetype": "Money Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/money-devon-dollars-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-money-devon-dollars",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 120.0,
      "cashMax": 760.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 2.0,
      "preferredItemTags": [
        "watch",
        "jewelry",
        "luxury",
        "electronics",
        "computer",
        "collectible"
      ],
      "notes": "Buys like the receipt is evidence of taste, sells like liquidity is a lifestyle."
    },
    {
      "id": "money-douche-brad",
      "displayName": "Brad",
      "archetype": "Money Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/money-douche-brad-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-money-douche-brad",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 90.0,
      "cashMax": 620.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 1.0,
      "thugRiskBias": 2.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "luxury",
        "watch",
        "electronics",
        "portable",
        "possibly_fake",
        "collectible"
      ],
      "notes": "Has more confidence than provenance and wants every deal to look expensive."
    },
    {
      "id": "money-penny",
      "displayName": "Penny",
      "archetype": "Money Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/money-penny-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-money-penny",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 100.0,
      "cashMax": 700.0,
      "trust": 62,
      "trustLabel": "4 - mostly honest",
      "copRiskBias": 0.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "jewelry",
        "luxury",
        "watch",
        "collectible",
        "electronics",
        "camera"
      ],
      "notes": "Quiet money, sharp eye, and no patience for display-case theater."
    },
    {
      "id": "vice-addict-arty",
      "displayName": "Addict Arty",
      "archetype": "Vice Regular",
      "spriteType": "weirdo",
      "factionId": "independent",
      "spritePath": "assets/sprites/vice-addict-arty-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-vice-addict-arty",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 5.0,
      "cashMax": 130.0,
      "trust": 26,
      "trustLabel": "1 - liar",
      "copRiskBias": 3.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 5.0,
      "preferredItemTags": [
        "electronics",
        "mystery",
        "suspicious",
        "cursed",
        "broken",
        "junk"
      ],
      "notes": "Shows up with shaky math and merchandise that sounds like it came from under a stairwell."
    },
    {
      "id": "vice-clepto-carlo",
      "displayName": "Clepto Carlo",
      "archetype": "Vice Regular",
      "spriteType": "weirdo",
      "factionId": "independent",
      "spritePath": "assets/sprites/vice-clepto-carlo-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-vice-clepto-carlo",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 10.0,
      "cashMax": 180.0,
      "trust": 26,
      "trustLabel": "1 - liar",
      "copRiskBias": 4.0,
      "thugRiskBias": 2.0,
      "scamRiskBias": 4.0,
      "preferredItemTags": [
        "stolen",
        "hot",
        "suspicious",
        "electronics",
        "portable",
        "jewelry"
      ],
      "notes": "Everything he owns was borrowed from a timeline where permission got lost."
    },
    {
      "id": "vice-dealer-danny",
      "displayName": "Dealer Danny",
      "archetype": "Vice Regular",
      "spriteType": "weirdo",
      "factionId": "independent",
      "spritePath": "assets/sprites/vice-dealer-danny-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-vice-dealer-danny",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 20.0,
      "cashMax": 240.0,
      "trust": 26,
      "trustLabel": "1 - liar",
      "copRiskBias": 4.0,
      "thugRiskBias": 3.0,
      "scamRiskBias": 4.0,
      "preferredItemTags": [
        "hot",
        "suspicious",
        "weapon",
        "electronics",
        "luxury",
        "portable"
      ],
      "notes": "Friendly in a way that makes the serial numbers sweat."
    },
    {
      "id": "vice-pervert-pete",
      "displayName": "Pervert Pete",
      "archetype": "Vice Regular",
      "spriteType": "weirdo",
      "factionId": "independent",
      "spritePath": "assets/sprites/vice-pervert-pete-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-vice-pervert-pete",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 15.0,
      "cashMax": 160.0,
      "trust": 26,
      "trustLabel": "1 - liar",
      "copRiskBias": 2.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 5.0,
      "preferredItemTags": [
        "junk",
        "collectible",
        "luxury",
        "possibly_fake",
        "suspicious",
        "portable"
      ],
      "notes": "Browses like the shelf owes him a secret and pays like shame has a budget."
    },
    {
      "id": "vice-raver-remy",
      "displayName": "Raver Remy",
      "archetype": "Vice Regular",
      "spriteType": "weirdo",
      "factionId": "independent",
      "spritePath": "assets/sprites/vice-raver-remy-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-vice-raver-remy",
      "spriteVisualHeight": null,
      "activeInRotation": true,
      "cashMin": 20.0,
      "cashMax": 220.0,
      "trust": 38,
      "trustLabel": "2 - sketchy",
      "copRiskBias": 2.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 3.0,
      "preferredItemTags": [
        "electronics",
        "portable",
        "collectible",
        "instrument",
        "luxury",
        "suspicious"
      ],
      "notes": "Runs on bass, bracelets, and an alarming understanding of resale value."
    },
    {
      "id": "service-boots-penales",
      "displayName": "Boots Penales",
      "archetype": "Service Regular",
      "spriteType": "regular",
      "factionId": "independent",
      "spritePath": "assets/sprites/service-boots-penales-idle_l.png",
      "facing": "left",
      "spriteClass": "npc-service-boots-penales",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 40.0,
      "cashMax": 220.0,
      "trust": 50,
      "trustLabel": "3 - mixed",
      "copRiskBias": 0.0,
      "thugRiskBias": 1.0,
      "scamRiskBias": 1.0,
      "preferredItemTags": [
        "tool",
        "electronics",
        "watch",
        "collectible"
      ],
      "notes": "Service roster record awaiting deal data."
    },
    {
      "id": "cop_consequence",
      "displayName": "Cop",
      "archetype": "Consequence Officer",
      "spriteType": "cop",
      "factionId": "law_enforcement",
      "spritePath": "assets/sprites/cop-highway-patrol-idle_r.png",
      "facing": "right",
      "spriteClass": "npc-cop-highway-patrol",
      "spriteVisualHeight": null,
      "activeInRotation": false,
      "cashMin": 0.0,
      "cashMax": 0.0,
      "trust": 74,
      "trustLabel": "5 - reliable",
      "copRiskBias": 5.0,
      "thugRiskBias": 0.0,
      "scamRiskBias": 0.0,
      "preferredItemTags": [
        "hot",
        "suspicious",
        "stolen",
        "weapon"
      ],
      "notes": "Shows up later when the paperwork smell gets too strong."
    }
  ],
  "characterCommerceTraits": [
    {
      "characterId": "street-crackhead",
      "sellsToShopWeight": 6.0,
      "buysFromShopWeight": 1.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "junk",
        "electronics",
        "mystery"
      ],
      "sellOfferTags": [
        "junk",
        "broken",
        "suspicious",
        "hot",
        "electronics"
      ],
      "tradeInterestTags": [
        "electronics",
        "junk",
        "mystery"
      ],
      "avoidTags": [
        "luxury",
        "collectible"
      ],
      "maxMarkupTolerance": 1.05,
      "lowballTolerance": 0.35,
      "haggleAggression": 3.0,
      "tradeFairness": 0.45,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "High-chaos seller/trader. Good source of cheap bad decisions."
    },
    {
      "characterId": "street-bum",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 1.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "junk",
        "appliance",
        "cursed"
      ],
      "sellOfferTags": [
        "junk",
        "broken",
        "cursed"
      ],
      "tradeInterestTags": [
        "junk",
        "electronics",
        "appliance"
      ],
      "avoidTags": [
        "luxury",
        "weapon"
      ],
      "maxMarkupTolerance": 1.0,
      "lowballTolerance": 0.4,
      "haggleAggression": 1.0,
      "tradeFairness": 0.6,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Mostly harmless junk economy. Will accept humiliating offers if they include cash."
    },
    {
      "characterId": "service-hitman",
      "sellsToShopWeight": 2.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 5.0,
      "buyInterestTags": [
        "weapon",
        "luxury",
        "hot",
        "suspicious",
        "electronics"
      ],
      "sellOfferTags": [
        "weapon",
        "luxury",
        "suspicious"
      ],
      "tradeInterestTags": [
        "weapon",
        "luxury",
        "electronics"
      ],
      "avoidTags": [
        "junk",
        "cursed"
      ],
      "maxMarkupTolerance": 1.25,
      "lowballTolerance": 0.8,
      "haggleAggression": 5.0,
      "tradeFairness": 0.75,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Dangerous buyer/trader. Refusing or insulting him should wake up thug risk."
    },
    {
      "characterId": "street-junkie",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 2.0,
      "tradesWeight": 5.0,
      "buyInterestTags": [
        "mystery",
        "electronics",
        "cursed"
      ],
      "sellOfferTags": [
        "mystery",
        "suspicious",
        "broken",
        "electronics"
      ],
      "tradeInterestTags": [
        "mystery",
        "electronics",
        "junk"
      ],
      "avoidTags": [
        "luxury"
      ],
      "maxMarkupTolerance": 1.1,
      "lowballTolerance": 0.45,
      "haggleAggression": 4.0,
      "tradeFairness": 0.4,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Trade-focused customer with worse math. Great for risk and weird inventory."
    },
    {
      "characterId": "desperate_regular",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 1.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "junk",
        "electronics"
      ],
      "sellOfferTags": [
        "junk",
        "broken",
        "suspicious"
      ],
      "tradeInterestTags": [
        "junk",
        "electronics"
      ],
      "avoidTags": [
        "luxury"
      ],
      "maxMarkupTolerance": 1.05,
      "lowballTolerance": 0.45,
      "haggleAggression": 1.0,
      "tradeFairness": 0.7,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Cash-starved seller. Accepts humiliating lowballs with impressive speed."
    },
    {
      "characterId": "nervous_seller",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 1.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "electronics",
        "junk"
      ],
      "sellOfferTags": [
        "electronics",
        "hot",
        "suspicious"
      ],
      "tradeInterestTags": [
        "electronics",
        "mystery"
      ],
      "avoidTags": [
        "weapon",
        "luxury"
      ],
      "maxMarkupTolerance": 1.1,
      "lowballTolerance": 0.6,
      "haggleAggression": 2.0,
      "tradeFairness": 0.75,
      "riskTolerance": 3.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Mostly sells sketchy electronics. Panics when asked follow-up questions."
    },
    {
      "characterId": "collector",
      "sellsToShopWeight": 1.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "collectible",
        "rare",
        "mystery"
      ],
      "sellOfferTags": [
        "collectible",
        "rare"
      ],
      "tradeInterestTags": [
        "collectible",
        "rare"
      ],
      "avoidTags": [
        "weapon",
        "hot",
        "stolen"
      ],
      "maxMarkupTolerance": 1.35,
      "lowballTolerance": 0.9,
      "haggleAggression": 3.0,
      "tradeFairness": 1.2,
      "riskTolerance": 1.0,
      "prefersCash": false,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Good buyer for collectible inventory. Harder to fool, sadly literate."
    },
    {
      "characterId": "mechanic",
      "sellsToShopWeight": 4.0,
      "buysFromShopWeight": 3.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "tool",
        "repairable",
        "electronics"
      ],
      "sellOfferTags": [
        "tool",
        "repairable",
        "broken"
      ],
      "tradeInterestTags": [
        "tool",
        "electronics"
      ],
      "avoidTags": [
        "cursed",
        "possibly_fake"
      ],
      "maxMarkupTolerance": 1.2,
      "lowballTolerance": 0.7,
      "haggleAggression": 2.0,
      "tradeFairness": 1.0,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Trades around tools and repairables. Suspicious of cursed appliances, which is unfair but correct."
    },
    {
      "characterId": "street_fence",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 2.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "luxury",
        "weapon",
        "hot",
        "suspicious"
      ],
      "sellOfferTags": [
        "stolen",
        "hot",
        "luxury",
        "suspicious"
      ],
      "tradeInterestTags": [
        "luxury",
        "weapon",
        "electronics"
      ],
      "avoidTags": [
        "junk"
      ],
      "maxMarkupTolerance": 1.15,
      "lowballTolerance": 0.55,
      "haggleAggression": 4.0,
      "tradeFairness": 0.65,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "High-risk source of hot goods. Makes the cops itchy."
    },
    {
      "characterId": "bargain_hunter",
      "sellsToShopWeight": 1.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "junk",
        "collectible",
        "electronics"
      ],
      "sellOfferTags": [
        "junk"
      ],
      "tradeInterestTags": [
        "junk",
        "collectible"
      ],
      "avoidTags": [
        "weapon",
        "hot"
      ],
      "maxMarkupTolerance": 1.05,
      "lowballTolerance": 0.8,
      "haggleAggression": 3.0,
      "tradeFairness": 0.9,
      "riskTolerance": 1.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Buys cheap inventory and argues like every dollar has a lawyer."
    },
    {
      "characterId": "tracksuit-thug-vincent",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 3.0,
      "tradesWeight": 5.0,
      "buyInterestTags": [
        "weapon",
        "luxury",
        "hot"
      ],
      "sellOfferTags": [
        "weapon",
        "hot",
        "suspicious"
      ],
      "tradeInterestTags": [
        "weapon",
        "luxury",
        "electronics"
      ],
      "avoidTags": [
        "junk"
      ],
      "maxMarkupTolerance": 1.1,
      "lowballTolerance": 0.65,
      "haggleAggression": 5.0,
      "tradeFairness": 0.55,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Dangerous trade-heavy NPC. Refusing him badly should wake up thug risk."
    },
    {
      "characterId": "undercover_cop",
      "sellsToShopWeight": 0.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "stolen",
        "weapon",
        "hot",
        "suspicious"
      ],
      "sellOfferTags": [],
      "tradeInterestTags": [
        "weapon",
        "hot",
        "stolen"
      ],
      "avoidTags": [
        "junk",
        "cursed"
      ],
      "maxMarkupTolerance": 1.0,
      "lowballTolerance": 1.0,
      "haggleAggression": 4.0,
      "tradeFairness": 1.0,
      "riskTolerance": 5.0,
      "prefersCash": false,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Bait buyer. Selling hot goods to this guy should be extremely stupid."
    },
    {
      "characterId": "angry_returner",
      "sellsToShopWeight": 0.0,
      "buysFromShopWeight": 2.0,
      "tradesWeight": 0.0,
      "buyInterestTags": [
        "broken",
        "fake"
      ],
      "sellOfferTags": [],
      "tradeInterestTags": [],
      "avoidTags": [
        "weapon",
        "hot",
        "luxury"
      ],
      "maxMarkupTolerance": 1.0,
      "lowballTolerance": 0.7,
      "haggleAggression": 4.0,
      "tradeFairness": 0.8,
      "riskTolerance": 1.0,
      "prefersCash": true,
      "acceptsTrades": false,
      "acceptsJunkBundles": false,
      "notes": "Dispute/return customer. Useful for scam-risk consequences more than normal deals."
    },
    {
      "characterId": "mystery_weirdo",
      "sellsToShopWeight": 4.0,
      "buysFromShopWeight": 2.0,
      "tradesWeight": 5.0,
      "buyInterestTags": [
        "cursed",
        "mystery",
        "rare"
      ],
      "sellOfferTags": [
        "cursed",
        "mystery",
        "rare"
      ],
      "tradeInterestTags": [
        "mystery",
        "cursed",
        "rare",
        "junk"
      ],
      "avoidTags": [],
      "maxMarkupTolerance": 1.4,
      "lowballTolerance": 0.5,
      "haggleAggression": 2.0,
      "tradeFairness": 0.5,
      "riskTolerance": 4.0,
      "prefersCash": false,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Trade goblin. May produce profit or a box that sounds wet."
    },
    {
      "characterId": "regular-mr-seventies",
      "sellsToShopWeight": 4.0,
      "buysFromShopWeight": 3.0,
      "tradesWeight": 5.0,
      "buyInterestTags": [
        "luxury",
        "collectible",
        "jewelry",
        "electronics"
      ],
      "sellOfferTags": [
        "luxury",
        "suspicious",
        "collectible",
        "jewelry"
      ],
      "tradeInterestTags": [
        "luxury",
        "collectible",
        "electronics",
        "jewelry"
      ],
      "avoidTags": [
        "broken",
        "cursed",
        "junk"
      ],
      "maxMarkupTolerance": 1.2,
      "lowballTolerance": 0.55,
      "haggleAggression": 4.0,
      "tradeFairness": 0.65,
      "riskTolerance": 4.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Trade-heavy old-school regular. Values presentation more than provenance."
    },
    {
      "characterId": "regular-business-drunk",
      "sellsToShopWeight": 2.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "electronics",
        "luxury",
        "watch",
        "collectible",
        "portable"
      ],
      "sellOfferTags": [
        "electronics",
        "luxury",
        "watch"
      ],
      "tradeInterestTags": [
        "electronics",
        "luxury"
      ],
      "avoidTags": [
        "cursed",
        "junk",
        "broken"
      ],
      "maxMarkupTolerance": 1.12,
      "lowballTolerance": 0.7,
      "haggleAggression": 3.0,
      "tradeFairness": 0.8,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Normal buyer with a loose expense-account energy."
    },
    {
      "characterId": "regular-lady-divorce",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 2.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "jewelry",
        "luxury",
        "collectible"
      ],
      "sellOfferTags": [
        "jewelry",
        "luxury",
        "household",
        "collectible"
      ],
      "tradeInterestTags": [
        "jewelry",
        "collectible"
      ],
      "avoidTags": [
        "weapon",
        "hot",
        "stolen"
      ],
      "maxMarkupTolerance": 1.08,
      "lowballTolerance": 0.62,
      "haggleAggression": 2.0,
      "tradeFairness": 0.85,
      "riskTolerance": 1.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Mostly sells valuables and accepts sober-enough offers."
    },
    {
      "characterId": "money-jan-takai",
      "sellsToShopWeight": 4.0,
      "buysFromShopWeight": 4.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "household",
        "appliance",
        "jewelry",
        "electronics",
        "tool",
        "collectible",
        "practical"
      ],
      "sellOfferTags": [
        "household",
        "appliance",
        "jewelry",
        "electronics",
        "tool",
        "collectible"
      ],
      "tradeInterestTags": [
        "household",
        "electronics",
        "tool",
        "collectible"
      ],
      "avoidTags": [
        "weapon",
        "hot",
        "stolen"
      ],
      "maxMarkupTolerance": 1.1,
      "lowballTolerance": 0.65,
      "haggleAggression": 2.0,
      "tradeFairness": 0.9,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Practical regular who moves useful goods without much theater."
    },
    {
      "characterId": "regular-mr-tourist",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "camera",
        "electronics",
        "watch",
        "jewelry",
        "souvenir",
        "collectible",
        "luxury"
      ],
      "sellOfferTags": [
        "camera",
        "watch",
        "jewelry",
        "collectible",
        "luxury",
        "suspicious"
      ],
      "tradeInterestTags": [
        "camera",
        "watch",
        "collectible",
        "luxury"
      ],
      "avoidTags": [
        "broken",
        "cursed",
        "weapon"
      ],
      "maxMarkupTolerance": 1.18,
      "lowballTolerance": 0.62,
      "haggleAggression": 3.0,
      "tradeFairness": 0.8,
      "riskTolerance": 3.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Tourist commerce with souvenir logic and luxury curiosity."
    },
    {
      "characterId": "regular-mrs-tourist",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "jewelry",
        "watch",
        "luxury",
        "souvenir",
        "collectible",
        "household"
      ],
      "sellOfferTags": [
        "jewelry",
        "watch",
        "luxury",
        "household",
        "collectible"
      ],
      "tradeInterestTags": [
        "jewelry",
        "watch",
        "luxury",
        "collectible"
      ],
      "avoidTags": [
        "weapon",
        "hot",
        "stolen"
      ],
      "maxMarkupTolerance": 1.16,
      "lowballTolerance": 0.66,
      "haggleAggression": 2.0,
      "tradeFairness": 0.88,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Tourist buyer and seller with a sharp eye for wearable status."
    },
    {
      "characterId": "regular-tim-lee",
      "sellsToShopWeight": 4.0,
      "buysFromShopWeight": 4.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "electronics",
        "computer",
        "console",
        "tool",
        "watch",
        "collectible",
        "household",
        "practical"
      ],
      "sellOfferTags": [
        "electronics",
        "computer",
        "console",
        "tool",
        "watch",
        "household"
      ],
      "tradeInterestTags": [
        "electronics",
        "computer",
        "console",
        "tool",
        "collectible"
      ],
      "avoidTags": [
        "weapon",
        "cursed",
        "stolen"
      ],
      "maxMarkupTolerance": 1.12,
      "lowballTolerance": 0.63,
      "haggleAggression": 3.0,
      "tradeFairness": 0.82,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Everyday regular with broad sell-buy-trade behavior."
    },
    {
      "characterId": "hustler-shorty",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot"
      ],
      "sellOfferTags": [
        "electronics",
        "luxury",
        "suspicious",
        "hot"
      ],
      "tradeInterestTags": [
        "luxury",
        "electronics",
        "collectible"
      ],
      "avoidTags": [
        "cursed",
        "appliance",
        "junk"
      ],
      "maxMarkupTolerance": 1.15,
      "lowballTolerance": 0.6,
      "haggleAggression": 5.0,
      "tradeFairness": 0.6,
      "riskTolerance": 4.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Aggressive buyer and trader. Insults should raise thug risk."
    },
    {
      "characterId": "hustler-cool-j",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot"
      ],
      "sellOfferTags": [
        "electronics",
        "luxury",
        "suspicious",
        "hot"
      ],
      "tradeInterestTags": [
        "luxury",
        "electronics",
        "collectible"
      ],
      "avoidTags": [
        "cursed",
        "appliance",
        "junk"
      ],
      "maxMarkupTolerance": 1.15,
      "lowballTolerance": 0.6,
      "haggleAggression": 5.0,
      "tradeFairness": 0.6,
      "riskTolerance": 4.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Aggressive buyer and trader."
    },
    {
      "characterId": "hustler-kangol",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot"
      ],
      "sellOfferTags": [
        "electronics",
        "luxury",
        "suspicious",
        "hot"
      ],
      "tradeInterestTags": [
        "luxury",
        "electronics",
        "collectible"
      ],
      "avoidTags": [
        "cursed",
        "appliance",
        "junk"
      ],
      "maxMarkupTolerance": 1.15,
      "lowballTolerance": 0.6,
      "haggleAggression": 5.0,
      "tradeFairness": 0.6,
      "riskTolerance": 4.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Aggressive buyer and trader."
    },
    {
      "characterId": "tracksuit-legs",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot"
      ],
      "sellOfferTags": [
        "electronics",
        "luxury",
        "suspicious",
        "hot"
      ],
      "tradeInterestTags": [
        "luxury",
        "electronics",
        "collectible"
      ],
      "avoidTags": [
        "cursed",
        "appliance",
        "junk"
      ],
      "maxMarkupTolerance": 1.15,
      "lowballTolerance": 0.6,
      "haggleAggression": 5.0,
      "tradeFairness": 0.6,
      "riskTolerance": 4.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Aggressive buyer and trader."
    },
    {
      "characterId": "tracksuit-slim",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "luxury",
        "electronics",
        "collectible",
        "hot"
      ],
      "sellOfferTags": [
        "electronics",
        "luxury",
        "suspicious",
        "hot"
      ],
      "tradeInterestTags": [
        "luxury",
        "electronics",
        "collectible"
      ],
      "avoidTags": [
        "cursed",
        "appliance",
        "junk"
      ],
      "maxMarkupTolerance": 1.15,
      "lowballTolerance": 0.6,
      "haggleAggression": 5.0,
      "tradeFairness": 0.6,
      "riskTolerance": 4.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Aggressive buyer and trader."
    },
    {
      "characterId": "regular-grandma-slots",
      "sellsToShopWeight": 7.0,
      "buysFromShopWeight": 1.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "collectible",
        "jewelry"
      ],
      "sellOfferTags": [
        "jewelry",
        "collectible",
        "luxury",
        "household"
      ],
      "tradeInterestTags": [
        "jewelry",
        "collectible"
      ],
      "avoidTags": [
        "weapon",
        "hot",
        "stolen"
      ],
      "maxMarkupTolerance": 1.05,
      "lowballTolerance": 0.5,
      "haggleAggression": 2.0,
      "tradeFairness": 0.85,
      "riskTolerance": 1.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Cash-starved but mostly honest. Sells personal valuables to feed the slots."
    },
    {
      "characterId": "regular-grandpa-catfish",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 2.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "tool",
        "electronics",
        "appliance",
        "watch",
        "collectible"
      ],
      "sellOfferTags": [
        "tool",
        "electronics",
        "appliance",
        "suspicious"
      ],
      "tradeInterestTags": [
        "tool",
        "electronics",
        "appliance"
      ],
      "avoidTags": [
        "luxury",
        "weapon",
        "hot"
      ],
      "maxMarkupTolerance": 1.08,
      "lowballTolerance": 0.58,
      "haggleAggression": 2.0,
      "tradeFairness": 0.75,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Senior seller and trader with practical goods and dubious explanations."
    },
    {
      "characterId": "money-salaryman",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "watch",
        "electronics",
        "computer",
        "office",
        "instrument",
        "luxury",
        "collectible",
        "appliance",
        "practical"
      ],
      "sellOfferTags": [
        "watch",
        "electronics",
        "computer",
        "office",
        "instrument",
        "luxury",
        "appliance"
      ],
      "tradeInterestTags": [
        "watch",
        "electronics",
        "computer",
        "instrument",
        "luxury"
      ],
      "avoidTags": [
        "cursed",
        "stolen",
        "junk"
      ],
      "maxMarkupTolerance": 1.15,
      "lowballTolerance": 0.64,
      "haggleAggression": 3.0,
      "tradeFairness": 0.84,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Office regular with decent cash and tired standards."
    },
    {
      "characterId": "money-devon-dollars",
      "sellsToShopWeight": 2.0,
      "buysFromShopWeight": 6.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "watch",
        "jewelry",
        "luxury",
        "electronics",
        "computer",
        "collectible"
      ],
      "sellOfferTags": [
        "jewelry",
        "watch",
        "luxury",
        "electronics"
      ],
      "tradeInterestTags": [
        "watch",
        "jewelry",
        "luxury",
        "electronics"
      ],
      "avoidTags": [
        "junk",
        "cursed",
        "broken"
      ],
      "maxMarkupTolerance": 1.22,
      "lowballTolerance": 0.72,
      "haggleAggression": 3.0,
      "tradeFairness": 0.92,
      "riskTolerance": 2.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "High-cash regular who likes clean status goods and quality electronics."
    },
    {
      "characterId": "money-douche-brad",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "luxury",
        "watch",
        "electronics",
        "portable",
        "collectible"
      ],
      "sellOfferTags": [
        "luxury",
        "watch",
        "electronics",
        "possibly_fake"
      ],
      "tradeInterestTags": [
        "luxury",
        "electronics",
        "collectible"
      ],
      "avoidTags": [
        "junk",
        "cursed",
        "broken"
      ],
      "maxMarkupTolerance": 1.18,
      "lowballTolerance": 0.58,
      "haggleAggression": 4.0,
      "tradeFairness": 0.72,
      "riskTolerance": 3.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Flashy money customer with sketchier taste and weaker provenance."
    },
    {
      "characterId": "money-penny",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 5.0,
      "tradesWeight": 2.0,
      "buyInterestTags": [
        "jewelry",
        "luxury",
        "watch",
        "collectible",
        "electronics",
        "camera"
      ],
      "sellOfferTags": [
        "jewelry",
        "luxury",
        "watch",
        "electronics"
      ],
      "tradeInterestTags": [
        "jewelry",
        "watch",
        "collectible",
        "luxury"
      ],
      "avoidTags": [
        "weapon",
        "hot",
        "stolen"
      ],
      "maxMarkupTolerance": 1.2,
      "lowballTolerance": 0.7,
      "haggleAggression": 2.0,
      "tradeFairness": 0.95,
      "riskTolerance": 1.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Discerning money customer for legitimate jewelry and premium keepsakes."
    },
    {
      "characterId": "vice-addict-arty",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 2.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "electronics",
        "broken",
        "junk",
        "mystery"
      ],
      "sellOfferTags": [
        "electronics",
        "mystery",
        "suspicious",
        "broken"
      ],
      "tradeInterestTags": [
        "electronics",
        "junk",
        "mystery"
      ],
      "avoidTags": [
        "luxury",
        "weapon"
      ],
      "maxMarkupTolerance": 1.06,
      "lowballTolerance": 0.44,
      "haggleAggression": 4.0,
      "tradeFairness": 0.42,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Low-cash vice regular who sells weird goods and takes rough trades."
    },
    {
      "characterId": "vice-clepto-carlo",
      "sellsToShopWeight": 5.0,
      "buysFromShopWeight": 3.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "electronics",
        "portable",
        "hot",
        "suspicious"
      ],
      "sellOfferTags": [
        "stolen",
        "hot",
        "suspicious",
        "electronics"
      ],
      "tradeInterestTags": [
        "electronics",
        "portable",
        "jewelry"
      ],
      "avoidTags": [
        "cursed",
        "appliance"
      ],
      "maxMarkupTolerance": 1.1,
      "lowballTolerance": 0.48,
      "haggleAggression": 4.0,
      "tradeFairness": 0.55,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Hot-goods seller and trader using existing cop-risk inventory paths."
    },
    {
      "characterId": "vice-dealer-danny",
      "sellsToShopWeight": 4.0,
      "buysFromShopWeight": 4.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "weapon",
        "hot",
        "suspicious",
        "luxury",
        "electronics"
      ],
      "sellOfferTags": [
        "hot",
        "suspicious",
        "electronics",
        "weapon"
      ],
      "tradeInterestTags": [
        "weapon",
        "electronics",
        "luxury"
      ],
      "avoidTags": [
        "junk",
        "cursed"
      ],
      "maxMarkupTolerance": 1.12,
      "lowballTolerance": 0.52,
      "haggleAggression": 5.0,
      "tradeFairness": 0.58,
      "riskTolerance": 5.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Risk-tolerant vice regular for dangerous or suspicious merchandise."
    },
    {
      "characterId": "vice-pervert-pete",
      "sellsToShopWeight": 3.0,
      "buysFromShopWeight": 4.0,
      "tradesWeight": 3.0,
      "buyInterestTags": [
        "junk",
        "collectible",
        "luxury",
        "possibly_fake",
        "portable"
      ],
      "sellOfferTags": [
        "luxury",
        "possibly_fake",
        "suspicious",
        "collectible"
      ],
      "tradeInterestTags": [
        "junk",
        "collectible",
        "luxury"
      ],
      "avoidTags": [
        "weapon",
        "stolen",
        "cursed"
      ],
      "maxMarkupTolerance": 1.08,
      "lowballTolerance": 0.5,
      "haggleAggression": 3.0,
      "tradeFairness": 0.6,
      "riskTolerance": 4.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": true,
      "notes": "Sleazy bargain layer for fake luxury and low-value collectibles."
    },
    {
      "characterId": "vice-raver-remy",
      "sellsToShopWeight": 4.0,
      "buysFromShopWeight": 4.0,
      "tradesWeight": 4.0,
      "buyInterestTags": [
        "electronics",
        "portable",
        "collectible",
        "instrument"
      ],
      "sellOfferTags": [
        "electronics",
        "portable",
        "collectible",
        "suspicious"
      ],
      "tradeInterestTags": [
        "electronics",
        "portable",
        "instrument",
        "collectible"
      ],
      "avoidTags": [
        "weapon",
        "cursed"
      ],
      "maxMarkupTolerance": 1.12,
      "lowballTolerance": 0.56,
      "haggleAggression": 3.0,
      "tradeFairness": 0.7,
      "riskTolerance": 3.0,
      "prefersCash": true,
      "acceptsTrades": true,
      "acceptsJunkBundles": false,
      "notes": "Nightlife electronics trader with medium risk tolerance."
    },
    {
      "characterId": "cop_consequence",
      "sellsToShopWeight": 0.0,
      "buysFromShopWeight": 0.0,
      "tradesWeight": 0.0,
      "buyInterestTags": [
        "hot",
        "suspicious",
        "stolen",
        "weapon"
      ],
      "sellOfferTags": [],
      "tradeInterestTags": [],
      "avoidTags": [
        "junk",
        "cursed"
      ],
      "maxMarkupTolerance": 1.0,
      "lowballTolerance": 1.0,
      "haggleAggression": 0.0,
      "tradeFairness": 1.0,
      "riskTolerance": 5.0,
      "prefersCash": false,
      "acceptsTrades": false,
      "acceptsJunkBundles": false,
      "notes": "Consequence-only cop encounter traits placeholder."
    }
  ],
  "items": [
    {
      "item_id": "microwave_haunted",
      "id": "microwave_haunted",
      "name": "Microwave That Hums Prayers",
      "category": "appliance",
      "default_condition": "poor",
      "condition": "poor",
      "base_value": 35.0,
      "baseValue": 35.0,
      "shop_buy_min": 5.0,
      "shopBuyMin": 5.0,
      "shop_buy_max": 18.0,
      "shopBuyMax": 18.0,
      "target_sell_price": 45.0,
      "targetSellPrice": 45.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "low",
      "demandLevel": "low",
      "liquidity": "low",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "junk",
        "broken",
        "cursed"
      ],
      "description": "Turns on by itself. Mostly because the button is stuck."
    },
    {
      "item_id": "fake_gold_chain",
      "id": "fake_gold_chain",
      "name": "Fake Gold Chain",
      "category": "jewelry",
      "default_condition": "fake",
      "condition": "fake",
      "base_value": 20.0,
      "baseValue": 20.0,
      "shop_buy_min": 3.0,
      "shopBuyMin": 3.0,
      "shop_buy_max": 12.0,
      "shopBuyMax": 12.0,
      "target_sell_price": 35.0,
      "targetSellPrice": 35.0,
      "heat": 1.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "fake",
        "suspicious"
      ],
      "description": "Green neck technology included."
    },
    {
      "item_id": "suspicious_gold_watch",
      "id": "suspicious_gold_watch",
      "name": "Suspicious Gold Watch",
      "category": "watch",
      "default_condition": "questionable",
      "condition": "questionable",
      "base_value": 120.0,
      "baseValue": 120.0,
      "shop_buy_min": 40.0,
      "shopBuyMin": 40.0,
      "shop_buy_max": 75.0,
      "shopBuyMax": 75.0,
      "target_sell_price": 160.0,
      "targetSellPrice": 160.0,
      "heat": 2.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "possibly_fake",
        "luxury",
        "suspicious"
      ],
      "description": "Heavy enough to feel real. Sketchy enough to be trouble."
    },
    {
      "item_id": "old_gaming_pc",
      "id": "old_gaming_pc",
      "name": "Old Gaming PC",
      "category": "computer",
      "default_condition": "used",
      "condition": "used",
      "base_value": 260.0,
      "baseValue": 260.0,
      "shop_buy_min": 80.0,
      "shopBuyMin": 80.0,
      "shop_buy_max": 150.0,
      "shopBuyMax": 150.0,
      "target_sell_price": 330.0,
      "targetSellPrice": 330.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "electronics",
        "repairable"
      ],
      "description": "RGB fans, dusty lungs, one mystery password."
    },
    {
      "item_id": "hospital_vcr",
      "id": "hospital_vcr",
      "name": "Hospital VCR",
      "category": "electronics",
      "default_condition": "questionable",
      "condition": "questionable",
      "base_value": 70.0,
      "baseValue": 70.0,
      "shop_buy_min": 8.0,
      "shopBuyMin": 8.0,
      "shop_buy_max": 30.0,
      "shopBuyMax": 30.0,
      "target_sell_price": 95.0,
      "targetSellPrice": 95.0,
      "heat": 1.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "low",
      "demandLevel": "low",
      "liquidity": "low",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "hot",
        "suspicious"
      ],
      "description": "Still has a tape labeled 'DO NOT BILL INSURANCE'."
    },
    {
      "item_id": "cracked_tablet",
      "id": "cracked_tablet",
      "name": "Cracked Tablet",
      "category": "electronics",
      "default_condition": "poor",
      "condition": "poor",
      "base_value": 55.0,
      "baseValue": 55.0,
      "shop_buy_min": 10.0,
      "shopBuyMin": 10.0,
      "shop_buy_max": 25.0,
      "shopBuyMax": 25.0,
      "target_sell_price": 70.0,
      "targetSellPrice": 70.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "broken"
      ],
      "description": "Screen looks like a spider got promoted to architect."
    },
    {
      "item_id": "cordless_drill",
      "id": "cordless_drill",
      "name": "Cordless Drill",
      "category": "tool",
      "default_condition": "used",
      "condition": "used",
      "base_value": 65.0,
      "baseValue": 65.0,
      "shop_buy_min": 20.0,
      "shopBuyMin": 20.0,
      "shop_buy_max": 40.0,
      "shopBuyMax": 40.0,
      "target_sell_price": 90.0,
      "targetSellPrice": 90.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "repairable"
      ],
      "description": "Battery lasts fourteen seconds, which is technically time."
    },
    {
      "item_id": "bolt_cutters",
      "id": "bolt_cutters",
      "name": "Bolt Cutters",
      "category": "tool",
      "default_condition": "good",
      "condition": "good",
      "base_value": 45.0,
      "baseValue": 45.0,
      "shop_buy_min": 15.0,
      "shopBuyMin": 15.0,
      "shop_buy_max": 30.0,
      "shopBuyMax": 30.0,
      "target_sell_price": 70.0,
      "targetSellPrice": 70.0,
      "heat": 2.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "high",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "suspicious"
      ],
      "description": "Honest landscaping equipment, if your shrubs are padlocked."
    },
    {
      "item_id": "pawn_shop_guitar",
      "id": "pawn_shop_guitar",
      "name": "Guitar Missing Two Strings",
      "category": "instrument",
      "default_condition": "poor",
      "condition": "poor",
      "base_value": 80.0,
      "baseValue": 80.0,
      "shop_buy_min": 20.0,
      "shopBuyMin": 20.0,
      "shop_buy_max": 45.0,
      "shopBuyMax": 45.0,
      "target_sell_price": 110.0,
      "targetSellPrice": 110.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "repairable"
      ],
      "description": "Perfect for blues, because it already knows suffering."
    },
    {
      "item_id": "gold_ring_engravings",
      "id": "gold_ring_engravings",
      "name": "Gold Ring With Weird Engraving",
      "category": "jewelry",
      "default_condition": "good",
      "condition": "good",
      "base_value": 180.0,
      "baseValue": 180.0,
      "shop_buy_min": 60.0,
      "shopBuyMin": 60.0,
      "shop_buy_max": 110.0,
      "shopBuyMax": 110.0,
      "target_sell_price": 240.0,
      "targetSellPrice": 240.0,
      "heat": 2.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "luxury",
        "suspicious"
      ],
      "description": "Engraving says 'Forever, Todd.' Todd is not present."
    },
    {
      "item_id": "baseball_card_box",
      "id": "baseball_card_box",
      "name": "Box of Baseball Cards",
      "category": "collectible",
      "default_condition": "unknown",
      "condition": "unknown",
      "base_value": 100.0,
      "baseValue": 100.0,
      "shop_buy_min": 10.0,
      "shopBuyMin": 10.0,
      "shop_buy_max": 60.0,
      "shopBuyMax": 60.0,
      "target_sell_price": 150.0,
      "targetSellPrice": 150.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "mystery"
      ],
      "description": "Could be valuable. Could be 900 cards of a backup catcher."
    },
    {
      "item_id": "rare_action_figure",
      "id": "rare_action_figure",
      "name": "Rare Action Figure, No Head",
      "category": "collectible",
      "default_condition": "poor",
      "condition": "poor",
      "base_value": 75.0,
      "baseValue": 75.0,
      "shop_buy_min": 12.0,
      "shopBuyMin": 12.0,
      "shop_buy_max": 35.0,
      "shopBuyMax": 35.0,
      "target_sell_price": 95.0,
      "targetSellPrice": 95.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "low",
      "demandLevel": "low",
      "liquidity": "low",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "rare",
        "broken"
      ],
      "description": "Rare because nobody else saved it after the lawnmower incident."
    },
    {
      "item_id": "pocket_knife",
      "id": "pocket_knife",
      "name": "Pocket Knife",
      "category": "weapon",
      "default_condition": "used",
      "condition": "used",
      "base_value": 30.0,
      "baseValue": 30.0,
      "shop_buy_min": 8.0,
      "shopBuyMin": 8.0,
      "shop_buy_max": 18.0,
      "shopBuyMax": 18.0,
      "target_sell_price": 45.0,
      "targetSellPrice": 45.0,
      "heat": 1.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [],
      "description": "Small, dull, and somehow still threatening."
    },
    {
      "item_id": "rusty_revolver_prop",
      "id": "rusty_revolver_prop",
      "name": "Rusty Movie Prop Revolver",
      "category": "weapon",
      "default_condition": "questionable",
      "condition": "questionable",
      "base_value": 90.0,
      "baseValue": 90.0,
      "shop_buy_min": 20.0,
      "shopBuyMin": 20.0,
      "shop_buy_max": 50.0,
      "shopBuyMax": 50.0,
      "target_sell_price": 130.0,
      "targetSellPrice": 130.0,
      "heat": 4.0,
      "availability_tier": "rare",
      "availabilityTier": "rare",
      "demand_level": "low",
      "demandLevel": "low",
      "liquidity": "low",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "suspicious",
        "hot"
      ],
      "description": "Probably a prop. The word 'probably' is doing a lot of paperwork."
    },
    {
      "item_id": "luxury_handbag_fake",
      "id": "luxury_handbag_fake",
      "name": "Luxury Handbag Maybe",
      "category": "luxury",
      "default_condition": "questionable",
      "condition": "questionable",
      "base_value": 140.0,
      "baseValue": 140.0,
      "shop_buy_min": 30.0,
      "shopBuyMin": 30.0,
      "shop_buy_max": 80.0,
      "shopBuyMax": 80.0,
      "target_sell_price": 190.0,
      "targetSellPrice": 190.0,
      "heat": 1.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "possibly_fake"
      ],
      "description": "Logo is one lawsuit away from being correct."
    },
    {
      "item_id": "sealed_mystery_box",
      "id": "sealed_mystery_box",
      "name": "Sealed Mystery Box",
      "category": "mystery",
      "default_condition": "unknown",
      "condition": "unknown",
      "base_value": 75.0,
      "baseValue": 75.0,
      "shop_buy_min": 15.0,
      "shopBuyMin": 15.0,
      "shop_buy_max": 50.0,
      "shopBuyMax": 50.0,
      "target_sell_price": 120.0,
      "targetSellPrice": 120.0,
      "heat": 2.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "suspicious"
      ],
      "description": "Rattles like regret."
    },
    {
      "item_id": "stolen_bike_wheel",
      "id": "stolen_bike_wheel",
      "name": "Single Expensive Bike Wheel",
      "category": "tool",
      "default_condition": "good",
      "condition": "good",
      "base_value": 110.0,
      "baseValue": 110.0,
      "shop_buy_min": 25.0,
      "shopBuyMin": 25.0,
      "shop_buy_max": 65.0,
      "shopBuyMax": 65.0,
      "target_sell_price": 150.0,
      "targetSellPrice": 150.0,
      "heat": 3.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "stolen",
        "hot",
        "suspicious"
      ],
      "description": "A whole bicycle minus every honest explanation."
    },
    {
      "item_id": "dvd_stack",
      "id": "dvd_stack",
      "name": "Stack of DVDs Nobody Asked For",
      "category": "collectible",
      "default_condition": "used",
      "condition": "used",
      "base_value": 25.0,
      "baseValue": 25.0,
      "shop_buy_min": 2.0,
      "shopBuyMin": 2.0,
      "shop_buy_max": 8.0,
      "shopBuyMax": 8.0,
      "target_sell_price": 30.0,
      "targetSellPrice": 30.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "low",
      "demandLevel": "low",
      "liquidity": "low",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "junk"
      ],
      "description": "Mostly Steven Seagal. The risk is emotional."
    },
    {
      "item_id": "smart_watch_locked",
      "id": "smart_watch_locked",
      "name": "Locked Smart Watch",
      "category": "watch",
      "default_condition": "used",
      "condition": "used",
      "base_value": 95.0,
      "baseValue": 95.0,
      "shop_buy_min": 20.0,
      "shopBuyMin": 20.0,
      "shop_buy_max": 50.0,
      "shopBuyMax": 50.0,
      "target_sell_price": 130.0,
      "targetSellPrice": 130.0,
      "heat": 2.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "low",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "electronics",
        "suspicious"
      ],
      "description": "Owner forgot the password, name, birthday, and legal exposure."
    },
    {
      "item_id": "silverware_bundle",
      "id": "silverware_bundle",
      "name": "Loose Silverware Bundle",
      "category": "jewelry",
      "default_condition": "questionable",
      "condition": "questionable",
      "base_value": 60.0,
      "baseValue": 60.0,
      "shop_buy_min": 10.0,
      "shopBuyMin": 10.0,
      "shop_buy_max": 30.0,
      "shopBuyMax": 30.0,
      "target_sell_price": 85.0,
      "targetSellPrice": 85.0,
      "heat": 2.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "possibly_fake",
        "suspicious"
      ],
      "description": "Tied together with a shoelace. Classy, like a raccoon wedding."
    },
    {
      "item_id": "countertop_blender",
      "id": "countertop_blender",
      "name": "Countertop Blender With One Speed",
      "category": "appliance",
      "default_condition": "used",
      "condition": "used",
      "base_value": 40.0,
      "baseValue": 40.0,
      "shop_buy_min": 10.0,
      "shopBuyMin": 10.0,
      "shop_buy_max": 22.0,
      "shopBuyMax": 22.0,
      "target_sell_price": 55.0,
      "targetSellPrice": 55.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "practical"
      ],
      "description": "The one speed is violence."
    },
    {
      "item_id": "air_fryer",
      "id": "air_fryer",
      "name": "Greasy Air Fryer",
      "category": "appliance",
      "default_condition": "used",
      "condition": "used",
      "base_value": 65.0,
      "baseValue": 65.0,
      "shop_buy_min": 18.0,
      "shopBuyMin": 18.0,
      "shop_buy_max": 35.0,
      "shopBuyMax": 35.0,
      "target_sell_price": 85.0,
      "targetSellPrice": 85.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "medium",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "practical"
      ],
      "description": "Smells faintly of wings and financial collapse."
    },
    {
      "item_id": "shop_vac",
      "id": "shop_vac",
      "name": "Shop Vacuum Full of Mystery Dust",
      "category": "appliance",
      "default_condition": "used",
      "condition": "used",
      "base_value": 85.0,
      "baseValue": 85.0,
      "shop_buy_min": 25.0,
      "shopBuyMin": 25.0,
      "shop_buy_max": 45.0,
      "shopBuyMax": 45.0,
      "target_sell_price": 115.0,
      "targetSellPrice": 115.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "practical",
        "repairable"
      ],
      "description": "Includes several pounds of somebody else's renovation."
    },
    {
      "item_id": "flat_screen_tv",
      "id": "flat_screen_tv",
      "name": "Flat-Screen TV, No Remote",
      "category": "electronics",
      "default_condition": "used",
      "condition": "used",
      "base_value": 140.0,
      "baseValue": 140.0,
      "shop_buy_min": 45.0,
      "shopBuyMin": 45.0,
      "shop_buy_max": 80.0,
      "shopBuyMax": 80.0,
      "target_sell_price": 185.0,
      "targetSellPrice": 185.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "practical"
      ],
      "description": "The universal remote will become somebody else's problem."
    },
    {
      "item_id": "bluetooth_speaker",
      "id": "bluetooth_speaker",
      "name": "Oversized Bluetooth Speaker",
      "category": "electronics",
      "default_condition": "good",
      "condition": "good",
      "base_value": 90.0,
      "baseValue": 90.0,
      "shop_buy_min": 30.0,
      "shopBuyMin": 30.0,
      "shop_buy_max": 55.0,
      "shopBuyMax": 55.0,
      "target_sell_price": 125.0,
      "targetSellPrice": 125.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "portable"
      ],
      "description": "Loud enough to turn any sidewalk into a bad decision."
    },
    {
      "item_id": "game_console",
      "id": "game_console",
      "name": "Current-Generation Game Console",
      "category": "console",
      "default_condition": "good",
      "condition": "good",
      "base_value": 360.0,
      "baseValue": 360.0,
      "shop_buy_min": 190.0,
      "shopBuyMin": 190.0,
      "shop_buy_max": 255.0,
      "shopBuyMax": 255.0,
      "target_sell_price": 430.0,
      "targetSellPrice": 430.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "medium",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "electronics",
        "popular"
      ],
      "description": "Clean, complete, and suspiciously free of snack crumbs."
    },
    {
      "item_id": "handheld_console",
      "id": "handheld_console",
      "name": "Handheld Game Console",
      "category": "console",
      "default_condition": "used",
      "condition": "used",
      "base_value": 180.0,
      "baseValue": 180.0,
      "shop_buy_min": 80.0,
      "shopBuyMin": 80.0,
      "shop_buy_max": 125.0,
      "shopBuyMax": 125.0,
      "target_sell_price": 230.0,
      "targetSellPrice": 230.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "electronics",
        "portable",
        "collectible"
      ],
      "description": "Battery health is a private matter between it and the wall outlet."
    },
    {
      "item_id": "used_smartphone",
      "id": "used_smartphone",
      "name": "Used Smartphone, Factory Reset",
      "category": "electronics",
      "default_condition": "good",
      "condition": "good",
      "base_value": 240.0,
      "baseValue": 240.0,
      "shop_buy_min": 110.0,
      "shopBuyMin": 110.0,
      "shop_buy_max": 165.0,
      "shopBuyMax": 165.0,
      "target_sell_price": 295.0,
      "targetSellPrice": 295.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "portable"
      ],
      "description": "Actually reset. A rare miracle in this building."
    },
    {
      "item_id": "budget_laptop",
      "id": "budget_laptop",
      "name": "Budget Laptop With Charger",
      "category": "computer",
      "default_condition": "used",
      "condition": "used",
      "base_value": 220.0,
      "baseValue": 220.0,
      "shop_buy_min": 85.0,
      "shopBuyMin": 85.0,
      "shop_buy_max": 140.0,
      "shopBuyMax": 140.0,
      "target_sell_price": 285.0,
      "targetSellPrice": 285.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "electronics",
        "practical"
      ],
      "description": "Runs office software, web browsers, and one fan at maximum panic."
    },
    {
      "item_id": "mirrorless_camera",
      "id": "mirrorless_camera",
      "name": "Mirrorless Camera Body",
      "category": "electronics",
      "default_condition": "good",
      "condition": "good",
      "base_value": 480.0,
      "baseValue": 480.0,
      "shop_buy_min": 230.0,
      "shopBuyMin": 230.0,
      "shop_buy_max": 330.0,
      "shopBuyMax": 330.0,
      "target_sell_price": 575.0,
      "targetSellPrice": 575.0,
      "heat": 0.0,
      "availability_tier": "rare",
      "availabilityTier": "rare",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "luxury"
      ],
      "description": "No lens included. Hope is included at no extra charge."
    },
    {
      "item_id": "circular_saw",
      "id": "circular_saw",
      "name": "Circular Saw With Case",
      "category": "tool",
      "default_condition": "good",
      "condition": "good",
      "base_value": 110.0,
      "baseValue": 110.0,
      "shop_buy_min": 40.0,
      "shopBuyMin": 40.0,
      "shop_buy_max": 70.0,
      "shopBuyMax": 70.0,
      "target_sell_price": 145.0,
      "targetSellPrice": 145.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "repairable",
        "practical"
      ],
      "description": "Still has all its teeth, unlike several customers."
    },
    {
      "item_id": "socket_set",
      "id": "socket_set",
      "name": "Mostly Complete Socket Set",
      "category": "tool",
      "default_condition": "used",
      "condition": "used",
      "base_value": 75.0,
      "baseValue": 75.0,
      "shop_buy_min": 22.0,
      "shopBuyMin": 22.0,
      "shop_buy_max": 42.0,
      "shopBuyMax": 42.0,
      "target_sell_price": 100.0,
      "targetSellPrice": 100.0,
      "heat": 0.0,
      "availability_tier": "common",
      "availabilityTier": "common",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "low",
      "priceVariance": "low",
      "tags": [
        "practical"
      ],
      "description": "Missing the exact socket everyone always needs."
    },
    {
      "item_id": "pressure_washer",
      "id": "pressure_washer",
      "name": "Pressure Washer",
      "category": "tool",
      "default_condition": "used",
      "condition": "used",
      "base_value": 190.0,
      "baseValue": 190.0,
      "shop_buy_min": 70.0,
      "shopBuyMin": 70.0,
      "shop_buy_max": 115.0,
      "shopBuyMax": 115.0,
      "target_sell_price": 245.0,
      "targetSellPrice": 245.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "practical",
        "repairable"
      ],
      "description": "Strong enough to remove paint, grime, and poor planning."
    },
    {
      "item_id": "electric_guitar",
      "id": "electric_guitar",
      "name": "Solid-Body Electric Guitar",
      "category": "instrument",
      "default_condition": "good",
      "condition": "good",
      "base_value": 260.0,
      "baseValue": 260.0,
      "shop_buy_min": 100.0,
      "shopBuyMin": 100.0,
      "shop_buy_max": 165.0,
      "shopBuyMax": 165.0,
      "target_sell_price": 335.0,
      "targetSellPrice": 335.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "collectible"
      ],
      "description": "Three pickups and at least four unfinished songs."
    },
    {
      "item_id": "student_saxophone",
      "id": "student_saxophone",
      "name": "Student Alto Saxophone",
      "category": "instrument",
      "default_condition": "used",
      "condition": "used",
      "base_value": 320.0,
      "baseValue": 320.0,
      "shop_buy_min": 120.0,
      "shopBuyMin": 120.0,
      "shop_buy_max": 200.0,
      "shopBuyMax": 200.0,
      "target_sell_price": 410.0,
      "targetSellPrice": 410.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "low",
      "demandLevel": "low",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "collectible",
        "repairable"
      ],
      "description": "Comes with a case and the threat of middle-school jazz."
    },
    {
      "item_id": "dj_turntable",
      "id": "dj_turntable",
      "name": "Direct-Drive DJ Turntable",
      "category": "electronics",
      "default_condition": "good",
      "condition": "good",
      "base_value": 300.0,
      "baseValue": 300.0,
      "shop_buy_min": 125.0,
      "shopBuyMin": 125.0,
      "shop_buy_max": 200.0,
      "shopBuyMax": 200.0,
      "target_sell_price": 385.0,
      "targetSellPrice": 385.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "collectible"
      ],
      "description": "Pitch control works. Previous owner's transitions did not."
    },
    {
      "item_id": "diamond_stud_earrings",
      "id": "diamond_stud_earrings",
      "name": "Small Diamond Stud Earrings",
      "category": "jewelry",
      "default_condition": "good",
      "condition": "good",
      "base_value": 650.0,
      "baseValue": 650.0,
      "shop_buy_min": 300.0,
      "shopBuyMin": 300.0,
      "shop_buy_max": 440.0,
      "shopBuyMax": 440.0,
      "target_sell_price": 780.0,
      "targetSellPrice": 780.0,
      "heat": 0.0,
      "availability_tier": "rare",
      "availabilityTier": "rare",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "luxury"
      ],
      "description": "Tiny, legitimate, and finally accompanied by paperwork."
    },
    {
      "item_id": "gold_bracelet",
      "id": "gold_bracelet",
      "name": "14K Gold Bracelet",
      "category": "jewelry",
      "default_condition": "good",
      "condition": "good",
      "base_value": 520.0,
      "baseValue": 520.0,
      "shop_buy_min": 245.0,
      "shopBuyMin": 245.0,
      "shop_buy_max": 360.0,
      "shopBuyMax": 360.0,
      "target_sell_price": 640.0,
      "targetSellPrice": 640.0,
      "heat": 0.0,
      "availability_tier": "rare",
      "availabilityTier": "rare",
      "demand_level": "high",
      "demandLevel": "high",
      "liquidity": "high",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "luxury"
      ],
      "description": "Real gold, normal clasp, disappointingly little criminal intrigue."
    },
    {
      "item_id": "designer_sunglasses",
      "id": "designer_sunglasses",
      "name": "Designer Sunglasses With Case",
      "category": "luxury",
      "default_condition": "good",
      "condition": "good",
      "base_value": 210.0,
      "baseValue": 210.0,
      "shop_buy_min": 75.0,
      "shopBuyMin": 75.0,
      "shop_buy_max": 130.0,
      "shopBuyMax": 130.0,
      "target_sell_price": 280.0,
      "targetSellPrice": 280.0,
      "heat": 0.0,
      "availability_tier": "uncommon",
      "availabilityTier": "uncommon",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "medium",
      "priceVariance": "medium",
      "tags": [
        "portable"
      ],
      "description": "Makes anyone look expensive from a safe distance."
    },
    {
      "item_id": "automatic_watch",
      "id": "automatic_watch",
      "name": "Swiss Automatic Watch",
      "category": "watch",
      "default_condition": "excellent",
      "condition": "excellent",
      "base_value": 950.0,
      "baseValue": 950.0,
      "shop_buy_min": 430.0,
      "shopBuyMin": 430.0,
      "shop_buy_max": 650.0,
      "shopBuyMax": 650.0,
      "target_sell_price": 1150.0,
      "targetSellPrice": 1150.0,
      "heat": 0.0,
      "availability_tier": "rare",
      "availabilityTier": "rare",
      "demand_level": "normal",
      "demandLevel": "normal",
      "liquidity": "medium",
      "price_variance": "high",
      "priceVariance": "high",
      "tags": [
        "luxury",
        "collectible"
      ],
      "description": "Keeps accurate time, which makes it the most responsible thing here."
    }
  ],
  "characterItemPools": [
    {
      "id": "crackhead_fake_chain",
      "characterId": "street-crackhead",
      "itemId": "fake_gold_chain",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "fake",
        "suspicious",
        "jewelry"
      ],
      "chanceWeight": 8.0,
      "askPriceMultiplier": 0.4,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk +1",
      "notes": "Cheap fake jewelry with confidence problems."
    },
    {
      "id": "crackhead_locked_watch",
      "characterId": "street-crackhead",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 7.0,
      "askPriceMultiplier": 0.5,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +1",
      "notes": "Locked device. Comes with a story that loses signal."
    },
    {
      "id": "crackhead_mystery_trade",
      "characterId": "street-crackhead",
      "itemId": "sealed_mystery_box",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "junk",
        "mystery"
      ],
      "offeredItemTags": [
        "mystery",
        "suspicious"
      ],
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.75,
      "cashAdjustmentMin": -20.0,
      "cashAdjustmentMax": 20.0,
      "conditionOverride": "unknown",
      "riskNote": "Random scam/cop risk",
      "notes": "Trades a bad box for something easier to fence."
    },
    {
      "id": "crackhead_buys_junk",
      "characterId": "street-crackhead",
      "itemId": "dvd_stack",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "junk",
        "collectible"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.8,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Will buy junk if the price is pathetic."
    },
    {
      "id": "bum_microwave",
      "characterId": "street-bum",
      "itemId": "microwave_haunted",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "junk",
        "broken",
        "cursed"
      ],
      "chanceWeight": 8.0,
      "askPriceMultiplier": 0.45,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "poor",
      "riskNote": "Low scam risk",
      "notes": "It hums because something in it gave up."
    },
    {
      "id": "bum_dvd_stack",
      "characterId": "street-bum",
      "itemId": "dvd_stack",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "junk",
        "collectible"
      ],
      "chanceWeight": 9.0,
      "askPriceMultiplier": 0.35,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Mostly DVDs from gas stations that went bankrupt."
    },
    {
      "id": "bum_buys_cursed",
      "characterId": "street-bum",
      "itemId": "microwave_haunted",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "junk",
        "cursed",
        "appliance"
      ],
      "offeredItemTags": null,
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.75,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk if oversold",
      "notes": "May buy cursed junk because rent is already cursed."
    },
    {
      "id": "bum_junk_trade",
      "characterId": "street-bum",
      "itemId": "silverware_bundle",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "junk",
        "electronics",
        "appliance"
      ],
      "offeredItemTags": [
        "possibly_fake",
        "suspicious"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": -5.0,
      "cashAdjustmentMax": 10.0,
      "conditionOverride": "questionable",
      "riskNote": "Scam risk +1",
      "notes": "A shoelace bundle of questionable silverware for shop junk."
    },
    {
      "id": "hitman_buys_weapon",
      "characterId": "service-hitman",
      "itemId": "rusty_revolver_prop",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "weapon",
        "hot",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.2,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop/thug risk if suspicious",
      "notes": "He does not ask whether it works. That is worse."
    },
    {
      "id": "hitman_buys_luxury",
      "characterId": "service-hitman",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "suspicious",
        "hot"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.15,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug risk if insulted",
      "notes": "Buys flashy inventory without haggling like a normal human."
    },
    {
      "id": "hitman_knife_trade",
      "characterId": "service-hitman",
      "itemId": "pocket_knife",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "weapon",
        "luxury",
        "electronics"
      ],
      "offeredItemTags": [
        "weapon"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 35.0,
      "conditionOverride": "used",
      "riskNote": "Thug risk +2 if refused badly",
      "notes": "Trade math happens quietly. Too quietly."
    },
    {
      "id": "hitman_prop_revolver",
      "characterId": "service-hitman",
      "itemId": "rusty_revolver_prop",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "weapon",
        "suspicious",
        "hot"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +3; thug risk +1",
      "notes": "Probably a prop. Probably is not a business plan."
    },
    {
      "id": "junkie_vcr",
      "characterId": "street-junkie",
      "itemId": "hospital_vcr",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "hot",
        "suspicious"
      ],
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.55,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1",
      "notes": "Still has hospital tape. The hospital would like that back."
    },
    {
      "id": "junkie_mystery_box",
      "characterId": "street-junkie",
      "itemId": "sealed_mystery_box",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "mystery",
        "suspicious"
      ],
      "chanceWeight": 8.0,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "unknown",
      "riskNote": "Random scam/cop risk",
      "notes": "Box rattles like a lawsuit."
    },
    {
      "id": "junkie_tablet_buy",
      "characterId": "street-junkie",
      "itemId": "cracked_tablet",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "electronics",
        "broken"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.8,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk if lied to",
      "notes": "Will buy cracked electronics if the pitch is desperate enough."
    },
    {
      "id": "junkie_weird_trade",
      "characterId": "street-junkie",
      "itemId": "cracked_tablet",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "mystery",
        "electronics",
        "junk"
      ],
      "offeredItemTags": [
        "broken",
        "electronics"
      ],
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.6,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 25.0,
      "conditionOverride": "poor",
      "riskNote": "Scam risk +1",
      "notes": "Trades broken electronics for anything that looks easier to carry."
    },
    {
      "id": "desperate_regular_microwave",
      "characterId": "desperate_regular",
      "itemId": "microwave_haunted",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "junk",
        "broken",
        "cursed"
      ],
      "chanceWeight": 8.0,
      "askPriceMultiplier": 0.6,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low scam risk",
      "notes": "Cheap junk filler."
    },
    {
      "id": "desperate_regular_dvds",
      "characterId": "desperate_regular",
      "itemId": "dvd_stack",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "junk",
        "collectible"
      ],
      "chanceWeight": 10.0,
      "askPriceMultiplier": 0.5,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Common bad inventory."
    },
    {
      "id": "desperate_regular_buys_dvds",
      "characterId": "desperate_regular",
      "itemId": "dvd_stack",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "junk",
        "collectible"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Will buy garbage if priced like garbage."
    },
    {
      "id": "desperate_regular_junk_trade",
      "characterId": "desperate_regular",
      "itemId": "fake_gold_chain",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "junk",
        "electronics"
      ],
      "offeredItemTags": [
        "fake",
        "suspicious"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.8,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 8.0,
      "conditionOverride": "",
      "riskNote": "Scam risk +1",
      "notes": "May trade fake jewelry for shop junk."
    },
    {
      "id": "nervous_seller_vcr",
      "characterId": "nervous_seller",
      "itemId": "hospital_vcr",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "hot",
        "suspicious"
      ],
      "chanceWeight": 7.0,
      "askPriceMultiplier": 0.7,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +1",
      "notes": "Good early shady deal."
    },
    {
      "id": "nervous_seller_watch",
      "characterId": "nervous_seller",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +1",
      "notes": "Locked device problem."
    },
    {
      "id": "nervous_seller_tablet_trade",
      "characterId": "nervous_seller",
      "itemId": "cracked_tablet",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "junk"
      ],
      "offeredItemTags": [
        "broken",
        "electronics"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.75,
      "cashAdjustmentMin": -5.0,
      "cashAdjustmentMax": 15.0,
      "conditionOverride": "",
      "riskNote": "Scam risk +1",
      "notes": "Offers broken electronics for almost anything that looks safer."
    },
    {
      "id": "collector_cards_buy",
      "characterId": "collector",
      "itemId": "baseball_card_box",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "collectible",
        "mystery"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.0,
      "askPriceMultiplier": 1.2,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk if lied to",
      "notes": "Collector may buy mystery collectibles."
    },
    {
      "id": "collector_action_figure_buy",
      "characterId": "collector",
      "itemId": "rare_action_figure",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "collectible",
        "rare",
        "broken"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 1.1,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Reputation hit if fake pitch",
      "notes": "Good haggling target."
    },
    {
      "id": "collector_figure_trade",
      "characterId": "collector",
      "itemId": "rare_action_figure",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "collectible",
        "rare"
      ],
      "offeredItemTags": [
        "collectible",
        "rare",
        "broken"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 1.0,
      "cashAdjustmentMin": -20.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Collector offers one collectible for another, then acts morally superior."
    },
    {
      "id": "mechanic_drill",
      "characterId": "mechanic",
      "itemId": "cordless_drill",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "tool",
        "repairable"
      ],
      "chanceWeight": 8.0,
      "askPriceMultiplier": 0.75,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Useful tool offer."
    },
    {
      "id": "mechanic_bolt_cutters",
      "characterId": "mechanic",
      "itemId": "bolt_cutters",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "tool",
        "suspicious"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.7,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug/cop flavor risk",
      "notes": "Looks sketchy on shelf."
    },
    {
      "id": "mechanic_buys_tools",
      "characterId": "mechanic",
      "itemId": "cordless_drill",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "tool",
        "repairable"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.05,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Good buyer for tool inventory."
    },
    {
      "id": "mechanic_tool_trade",
      "characterId": "mechanic",
      "itemId": "bolt_cutters",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "tool",
        "electronics"
      ],
      "offeredItemTags": [
        "tool",
        "suspicious"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 25.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +1 if hot",
      "notes": "Trades tools for tools like a garage raccoon."
    },
    {
      "id": "street_fence_ring",
      "characterId": "street_fence",
      "itemId": "gold_ring_engravings",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "jewelry",
        "luxury",
        "suspicious"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.55,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +2",
      "notes": "High profit, hot smell."
    },
    {
      "id": "street_fence_wheel",
      "characterId": "street_fence",
      "itemId": "stolen_bike_wheel",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "stolen",
        "hot",
        "suspicious"
      ],
      "chanceWeight": 7.0,
      "askPriceMultiplier": 0.45,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +2",
      "notes": "Obviously hot."
    },
    {
      "id": "street_fence_buys_luxury",
      "characterId": "street_fence",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "suspicious",
        "hot"
      ],
      "offeredItemTags": null,
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.95,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +1",
      "notes": "Fence may buy risky luxury goods."
    },
    {
      "id": "street_fence_hot_trade",
      "characterId": "street_fence",
      "itemId": "luxury_handbag_fake",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "luxury",
        "weapon",
        "electronics"
      ],
      "offeredItemTags": [
        "luxury",
        "possibly_fake"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.75,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 40.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +2; scam risk +1",
      "notes": "Bad trade offer wearing fake designer leather."
    },
    {
      "id": "bargain_hunter_buys_dvds",
      "characterId": "bargain_hunter",
      "itemId": "dvd_stack",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "junk",
        "collectible"
      ],
      "offeredItemTags": null,
      "chanceWeight": 8.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Perfect sucker for low-value clutter, but not at sane prices."
    },
    {
      "id": "bargain_hunter_buys_tablet",
      "characterId": "bargain_hunter",
      "itemId": "cracked_tablet",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "electronics",
        "broken"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk if lied to",
      "notes": "Will buy busted electronics if called 'lightly loved'."
    },
    {
      "id": "bargain_hunter_junk_trade",
      "characterId": "bargain_hunter",
      "itemId": "dvd_stack",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "junk",
        "collectible",
        "electronics"
      ],
      "offeredItemTags": [
        "junk",
        "collectible"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.8,
      "cashAdjustmentMin": -5.0,
      "cashAdjustmentMax": 12.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Junk-for-junk trade. Everybody loses with dignity."
    },
    {
      "id": "tracksuit_knife",
      "characterId": "tracksuit-thug-vincent",
      "itemId": "pocket_knife",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "weapon",
        "luxury",
        "electronics"
      ],
      "offeredItemTags": [
        "weapon"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.8,
      "cashAdjustmentMin": -20.0,
      "cashAdjustmentMax": 25.0,
      "conditionOverride": "",
      "riskNote": "Thug risk +2 if refused badly",
      "notes": "Danger customer."
    },
    {
      "id": "tracksuit_prop_revolver",
      "characterId": "tracksuit-thug-vincent",
      "itemId": "rusty_revolver_prop",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "weapon",
        "suspicious",
        "hot"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.5,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop risk +3; thug risk +2",
      "notes": "High heat, dumb money."
    },
    {
      "id": "tracksuit_buys_hot",
      "characterId": "tracksuit-thug-vincent",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "weapon",
        "luxury",
        "hot"
      ],
      "offeredItemTags": null,
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug risk if insulted",
      "notes": "Buys dangerous or flashy stuff."
    },
    {
      "id": "undercover_watch",
      "characterId": "undercover_cop",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "stolen",
        "suspicious",
        "hot",
        "luxury"
      ],
      "offeredItemTags": null,
      "chanceWeight": 3.0,
      "askPriceMultiplier": 1.3,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Selling hot item to cop is bad",
      "notes": "Bait transaction."
    },
    {
      "id": "undercover_weapon",
      "characterId": "undercover_cop",
      "itemId": "rusty_revolver_prop",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "weapon",
        "hot",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 2.0,
      "askPriceMultiplier": 1.3,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop consequence trigger candidate",
      "notes": "Do not be the idiot. Player will be the idiot."
    },
    {
      "id": "angry_returner_broken_buy",
      "characterId": "angry_returner",
      "itemId": "cracked_tablet",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "broken",
        "fake",
        "electronics"
      ],
      "offeredItemTags": null,
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.8,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam-risk callback",
      "notes": "Good source for refund/dispute events."
    },
    {
      "id": "mystery_box",
      "characterId": "mystery_weirdo",
      "itemId": "sealed_mystery_box",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "mystery",
        "suspicious"
      ],
      "chanceWeight": 9.0,
      "askPriceMultiplier": 0.75,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Random scam/cop risk",
      "notes": "Good weird event seed."
    },
    {
      "id": "mystery_weirdo_box_trade",
      "characterId": "mystery_weirdo",
      "itemId": "sealed_mystery_box",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "mystery",
        "cursed",
        "rare",
        "junk"
      ],
      "offeredItemTags": [
        "mystery",
        "suspicious"
      ],
      "chanceWeight": 7.0,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -25.0,
      "cashAdjustmentMax": 50.0,
      "conditionOverride": "unknown",
      "riskNote": "Random risk",
      "notes": "Offers a box for something equally regrettable."
    },
    {
      "id": "mystery_weirdo_buys_cursed",
      "characterId": "mystery_weirdo",
      "itemId": "microwave_haunted",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "cursed",
        "mystery",
        "rare"
      ],
      "offeredItemTags": null,
      "chanceWeight": 3.0,
      "askPriceMultiplier": 1.15,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk if broken",
      "notes": "May buy cursed trash. Do not question blessings from the dumpster."
    },
    {
      "id": "regular_mr_seventies_gold_watch",
      "characterId": "regular-mr-seventies",
      "itemId": "suspicious_gold_watch",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "luxury",
        "suspicious",
        "hot"
      ],
      "chanceWeight": 7.0,
      "askPriceMultiplier": 0.7,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "Claims it belonged to a nightclub owner. Does not clarify which owner."
    },
    {
      "id": "regular_mr_seventies_cards_trade",
      "characterId": "regular-mr-seventies",
      "itemId": "baseball_card_box",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "luxury",
        "collectible",
        "electronics"
      ],
      "offeredItemTags": [
        "collectible",
        "mystery"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": -20.0,
      "cashAdjustmentMax": 35.0,
      "conditionOverride": "used",
      "riskNote": "Scam risk +1",
      "notes": "Vintage cards in a box that has survived several bad decades."
    },
    {
      "id": "regular_mr_seventies_buys_luxury",
      "characterId": "regular-mr-seventies",
      "itemId": "gold_ring_engravings",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "jewelry",
        "collectible"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.05,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low cop risk; scam risk if misrepresented",
      "notes": "Pays for visible status and questionable history."
    },
    {
      "id": "regular_business_drunk_sunglasses",
      "characterId": "regular-business-drunk",
      "itemId": "designer_sunglasses",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "luxury",
        "portable"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.68,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Insists they were for client meetings."
    },
    {
      "id": "regular_business_drunk_buys_speaker",
      "characterId": "regular-business-drunk",
      "itemId": "bluetooth_speaker",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "electronics",
        "portable",
        "luxury"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.0,
      "askPriceMultiplier": 1.02,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Wants something loud enough to make Monday negotiable."
    },
    {
      "id": "regular_business_drunk_watch_trade",
      "characterId": "regular-business-drunk",
      "itemId": "designer_sunglasses",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "watch",
        "luxury"
      ],
      "offeredItemTags": [
        "luxury",
        "portable"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.95,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 25.0,
      "conditionOverride": "used",
      "riskNote": "Low scam risk",
      "notes": "Calls sunglasses a business accessory."
    },
    {
      "id": "regular_lady_divorce_gold_bracelet",
      "characterId": "regular-lady-divorce",
      "itemId": "gold_bracelet",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "jewelry",
        "luxury"
      ],
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.7,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "good",
      "riskNote": "Low risk; reputation penalty for cruelty",
      "notes": "Removing one more shared asset from the ledger."
    },
    {
      "id": "regular_lady_divorce_handbag_trade",
      "characterId": "regular-lady-divorce",
      "itemId": "luxury_handbag_fake",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "jewelry",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": [
        "luxury",
        "possibly_fake"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 25.0,
      "conditionOverride": "questionable",
      "riskNote": "Scam risk +1 if oversold",
      "notes": "The bag is either designer or personally offensive to designers."
    },
    {
      "id": "regular_jan_lee_blender",
      "characterId": "money-jan-takai",
      "itemId": "countertop_blender",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "appliance",
        "practical"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.72,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "One-speed blender for people who enjoy loud smoothies and poor choices."
    },
    {
      "id": "regular_jan_lee_buys_tv",
      "characterId": "money-jan-takai",
      "itemId": "flat_screen_tv",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "electronics",
        "practical"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.02,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Wants a useful screen without retail asking personal questions."
    },
    {
      "id": "regular_jan_lee_socket_trade",
      "characterId": "money-jan-takai",
      "itemId": "socket_set",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "tool",
        "appliance",
        "practical"
      ],
      "offeredItemTags": [
        "tool",
        "practical"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.88,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 18.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "A mostly complete socket set for something else that mostly works."
    },
    {
      "id": "regular_mr_tourist_camera",
      "characterId": "regular-mr-tourist",
      "itemId": "mirrorless_camera",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "luxury"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.68,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "good",
      "riskNote": "Low risk; scam risk if oversold",
      "notes": "Says it captured authentic local flavor and one parking dispute."
    },
    {
      "id": "regular_mr_tourist_buys_watch",
      "characterId": "regular-mr-tourist",
      "itemId": "automatic_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "watch",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 1.08,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk if misrepresented",
      "notes": "Wants a keepsake that looks expensive in airport lighting."
    },
    {
      "id": "regular_mr_tourist_cards_trade",
      "characterId": "regular-mr-tourist",
      "itemId": "baseball_card_box",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "camera",
        "electronics",
        "watch",
        "collectible",
        "luxury"
      ],
      "offeredItemTags": [
        "collectible",
        "mystery"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "used",
      "riskNote": "Scam risk +1",
      "notes": "Trades local nostalgia he bought ninety minutes ago."
    },
    {
      "id": "regular_mrs_tourist_bracelet",
      "characterId": "regular-mrs-tourist",
      "itemId": "gold_bracelet",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "jewelry",
        "luxury"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.74,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "good",
      "riskNote": "Low risk",
      "notes": "Says it no longer matches the vacation mood or the credit-card statement."
    },
    {
      "id": "regular_mrs_tourist_buys_sunglasses",
      "characterId": "regular-mrs-tourist",
      "itemId": "designer_sunglasses",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "portable"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.06,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Wants designer shade for sightseeing and financial denial."
    },
    {
      "id": "regular_mrs_tourist_silverware_trade",
      "characterId": "regular-mrs-tourist",
      "itemId": "silverware_bundle",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "jewelry",
        "watch",
        "luxury",
        "collectible",
        "household"
      ],
      "offeredItemTags": [
        "possibly_fake",
        "household",
        "suspicious"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.82,
      "cashAdjustmentMin": -12.0,
      "cashAdjustmentMax": 20.0,
      "conditionOverride": "questionable",
      "riskNote": "Scam risk +1",
      "notes": "A souvenir table setting with a very flexible origin story."
    },
    {
      "id": "regular_tim_lee_laptop",
      "characterId": "regular-tim-lee",
      "itemId": "budget_laptop",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "practical"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.7,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Works fine except for the fan sounding legally upset."
    },
    {
      "id": "regular_tim_lee_buys_console",
      "characterId": "regular-tim-lee",
      "itemId": "game_console",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "console",
        "electronics",
        "popular"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 1.04,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Needs a console before adulthood notices the receipt."
    },
    {
      "id": "regular_tim_lee_drill_trade",
      "characterId": "regular-tim-lee",
      "itemId": "cordless_drill",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "computer",
        "console",
        "tool",
        "practical"
      ],
      "offeredItemTags": [
        "tool",
        "repairable"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.86,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 22.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "A drill for whatever shelf item feels easier to explain."
    },
    {
      "id": "hustler_shorty_locked_watch",
      "characterId": "hustler-shorty",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 6.9,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "The lock screen belongs to somebody with a different name."
    },
    {
      "id": "hustler_shorty_buys_watch",
      "characterId": "hustler-shorty",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "hot",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.9,
      "askPriceMultiplier": 1.1,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug risk if insulted",
      "notes": "Likes merchandise that looks expensive from across a parking lot."
    },
    {
      "id": "hustler_shorty_figure_trade",
      "characterId": "hustler-shorty",
      "itemId": "rare_action_figure",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": [
        "collectible",
        "rare",
        "broken"
      ],
      "chanceWeight": 4.6,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "used",
      "riskNote": "Scam risk +1; thug risk +1 on bad refusal",
      "notes": "Calls it mint while holding it by the head."
    },
    {
      "id": "hustler_sista_locked_watch",
      "characterId": "hustler-cool-j",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 6.9,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "The lock screen belongs to somebody with a different name."
    },
    {
      "id": "hustler_sista_buys_watch",
      "characterId": "hustler-cool-j",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "hot",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.9,
      "askPriceMultiplier": 1.1,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug risk if insulted",
      "notes": "Likes merchandise that looks expensive from across a parking lot."
    },
    {
      "id": "hustler_sista_figure_trade",
      "characterId": "hustler-cool-j",
      "itemId": "rare_action_figure",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": [
        "collectible",
        "rare",
        "broken"
      ],
      "chanceWeight": 4.6,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "used",
      "riskNote": "Scam risk +1; thug risk +1 on bad refusal",
      "notes": "Calls it mint while holding it by the head."
    },
    {
      "id": "hustler_kangol_locked_watch",
      "characterId": "hustler-kangol",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 6.9,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "The lock screen belongs to somebody with a different name."
    },
    {
      "id": "hustler_kangol_buys_watch",
      "characterId": "hustler-kangol",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "hot",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.9,
      "askPriceMultiplier": 1.1,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug risk if insulted",
      "notes": "Likes merchandise that looks expensive from across a parking lot."
    },
    {
      "id": "hustler_kangol_figure_trade",
      "characterId": "hustler-kangol",
      "itemId": "rare_action_figure",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": [
        "collectible",
        "rare",
        "broken"
      ],
      "chanceWeight": 4.6,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "used",
      "riskNote": "Scam risk +1; thug risk +1 on bad refusal",
      "notes": "Calls it mint while holding it by the head."
    },
    {
      "id": "tracksuit_legs_locked_watch",
      "characterId": "tracksuit-legs",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 6.9,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "The lock screen belongs to somebody with a different name."
    },
    {
      "id": "tracksuit_legs_buys_watch",
      "characterId": "tracksuit-legs",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "hot",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.9,
      "askPriceMultiplier": 1.1,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug risk if insulted",
      "notes": "Likes merchandise that looks expensive from across a parking lot."
    },
    {
      "id": "tracksuit_legs_figure_trade",
      "characterId": "tracksuit-legs",
      "itemId": "rare_action_figure",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": [
        "collectible",
        "rare",
        "broken"
      ],
      "chanceWeight": 4.6,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "used",
      "riskNote": "Scam risk +1; thug risk +1 on bad refusal",
      "notes": "Calls it mint while holding it by the head."
    },
    {
      "id": "tracksuit_slim_locked_watch",
      "characterId": "tracksuit-slim",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 6.9,
      "askPriceMultiplier": 0.65,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "The lock screen belongs to somebody with a different name."
    },
    {
      "id": "tracksuit_slim_buys_watch",
      "characterId": "tracksuit-slim",
      "itemId": "suspicious_gold_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "hot",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.9,
      "askPriceMultiplier": 1.1,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Thug risk if insulted",
      "notes": "Likes merchandise that looks expensive from across a parking lot."
    },
    {
      "id": "tracksuit_slim_figure_trade",
      "characterId": "tracksuit-slim",
      "itemId": "rare_action_figure",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": [
        "collectible",
        "rare",
        "broken"
      ],
      "chanceWeight": 4.6,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "used",
      "riskNote": "Scam risk +1; thug risk +1 on bad refusal",
      "notes": "Calls it mint while holding it by the head."
    },
    {
      "id": "old_grandma_slots_gold_ring",
      "characterId": "regular-grandma-slots",
      "itemId": "gold_ring_engravings",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "jewelry",
        "luxury"
      ],
      "chanceWeight": 8.0,
      "askPriceMultiplier": 0.72,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Low risk; reputation penalty for extreme lowball",
      "notes": "A real family ring being converted into another spin."
    },
    {
      "id": "old_grandma_slots_silverware",
      "characterId": "regular-grandma-slots",
      "itemId": "silverware_bundle",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "possibly_fake",
        "household",
        "suspicious"
      ],
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.55,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Low scam risk",
      "notes": "Wrapped carefully in a dish towel older than the shop."
    },
    {
      "id": "old_grandma_slots_cards_trade",
      "characterId": "regular-grandma-slots",
      "itemId": "baseball_card_box",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "jewelry",
        "collectible"
      ],
      "offeredItemTags": [
        "collectible",
        "mystery"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.9,
      "cashAdjustmentMin": 5.0,
      "cashAdjustmentMax": 20.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Would rather have cash, but may trade when desperate."
    },
    {
      "id": "senior_grandpa_catfish_drill",
      "characterId": "regular-grandpa-catfish",
      "itemId": "cordless_drill",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "tool",
        "repairable"
      ],
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.7,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Says it only needs a battery and optimism."
    },
    {
      "id": "senior_grandpa_catfish_vcr",
      "characterId": "regular-grandpa-catfish",
      "itemId": "hospital_vcr",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.6,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1",
      "notes": "Claims the tape came with the machine and the machine came with the story."
    },
    {
      "id": "senior_grandpa_catfish_tool_trade",
      "characterId": "regular-grandpa-catfish",
      "itemId": "socket_set",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "tool",
        "electronics",
        "appliance"
      ],
      "offeredItemTags": [
        "tool",
        "practical"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.85,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 20.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Mostly complete tools for mostly reasonable shelf goods."
    },
    {
      "id": "regular_salaryman_watch",
      "characterId": "money-salaryman",
      "itemId": "automatic_watch",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "watch",
        "luxury",
        "collectible"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.66,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "excellent",
      "riskNote": "Low risk; scam risk if authenticity lied about",
      "notes": "Says the watch is too accurate for his current life."
    },
    {
      "id": "regular_salaryman_buys_laptop",
      "characterId": "money-salaryman",
      "itemId": "budget_laptop",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "computer",
        "electronics",
        "practical"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.05,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Needs a laptop that can survive spreadsheets and resentment."
    },
    {
      "id": "regular_salaryman_guitar_trade",
      "characterId": "money-salaryman",
      "itemId": "pawn_shop_guitar",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "watch",
        "electronics",
        "computer",
        "instrument",
        "luxury"
      ],
      "offeredItemTags": [
        "instrument",
        "repairable"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.88,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 28.0,
      "conditionOverride": "poor",
      "riskNote": "Low risk",
      "notes": "Offers a guitar from a hobby that lost to overtime."
    },
    {
      "id": "money_devon_earrings",
      "characterId": "money-devon-dollars",
      "itemId": "diamond_stud_earrings",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "jewelry",
        "luxury"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.78,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "good",
      "riskNote": "Low risk; scam risk if authenticity lied about",
      "notes": "Legitimate sparkle with a very loud asking price."
    },
    {
      "id": "money_devon_buys_watch",
      "characterId": "money-devon-dollars",
      "itemId": "automatic_watch",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "watch",
        "luxury",
        "collectible"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.12,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Wants a watch that looks expensive without explaining itself."
    },
    {
      "id": "money_devon_pc_trade",
      "characterId": "money-devon-dollars",
      "itemId": "old_gaming_pc",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "watch",
        "jewelry",
        "luxury",
        "electronics",
        "computer"
      ],
      "offeredItemTags": [
        "electronics",
        "repairable"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.92,
      "cashAdjustmentMin": -25.0,
      "cashAdjustmentMax": 45.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Trades a gaming PC for shelf status."
    },
    {
      "id": "money_brad_handbag",
      "characterId": "money-douche-brad",
      "itemId": "luxury_handbag_fake",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "luxury",
        "possibly_fake"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.62,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Scam risk +1",
      "notes": "A fake designer bag carried with real confidence."
    },
    {
      "id": "money_brad_buys_sunglasses",
      "characterId": "money-douche-brad",
      "itemId": "designer_sunglasses",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "luxury",
        "portable"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.08,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Wants designer sunglasses loud enough to count as personality."
    },
    {
      "id": "money_brad_watch_trade",
      "characterId": "money-douche-brad",
      "itemId": "suspicious_gold_watch",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "luxury",
        "electronics",
        "collectible"
      ],
      "offeredItemTags": [
        "watch",
        "luxury",
        "suspicious"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.84,
      "cashAdjustmentMin": -20.0,
      "cashAdjustmentMax": 35.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "Trades a questionable watch for anything shinier."
    },
    {
      "id": "money_penny_bracelet",
      "characterId": "money-penny",
      "itemId": "gold_bracelet",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "jewelry",
        "luxury"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.76,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "good",
      "riskNote": "Low risk",
      "notes": "A clean gold bracelet from a customer who knows exactly what it is worth."
    },
    {
      "id": "money_penny_buys_earrings",
      "characterId": "money-penny",
      "itemId": "diamond_stud_earrings",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "jewelry",
        "luxury"
      ],
      "offeredItemTags": null,
      "chanceWeight": 5.0,
      "askPriceMultiplier": 1.1,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Wants small jewelry with paperwork energy."
    },
    {
      "id": "money_penny_camera_trade",
      "characterId": "money-penny",
      "itemId": "mirrorless_camera",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "jewelry",
        "watch",
        "luxury",
        "collectible",
        "electronics"
      ],
      "offeredItemTags": [
        "electronics",
        "luxury"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.92,
      "cashAdjustmentMin": -20.0,
      "cashAdjustmentMax": 40.0,
      "conditionOverride": "good",
      "riskNote": "Low risk",
      "notes": "A premium camera body offered for something easier to wear."
    },
    {
      "id": "vice_arty_mystery_box",
      "characterId": "vice-addict-arty",
      "itemId": "sealed_mystery_box",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "mystery",
        "suspicious"
      ],
      "chanceWeight": 7.0,
      "askPriceMultiplier": 0.62,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "unknown",
      "riskNote": "Random scam/cop risk",
      "notes": "The box has a rattle and a bad alibi."
    },
    {
      "id": "vice_arty_buys_tablet",
      "characterId": "vice-addict-arty",
      "itemId": "cracked_tablet",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "electronics",
        "broken"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.78,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Scam risk if oversold",
      "notes": "Wants cracked electronics if the price looks injured."
    },
    {
      "id": "vice_arty_watch_trade",
      "characterId": "vice-addict-arty",
      "itemId": "smart_watch_locked",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "junk",
        "mystery"
      ],
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.68,
      "cashAdjustmentMin": -18.0,
      "cashAdjustmentMax": 22.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "Trades a locked watch for something with fewer questions."
    },
    {
      "id": "vice_carlo_bike_wheel",
      "characterId": "vice-clepto-carlo",
      "itemId": "stolen_bike_wheel",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "stolen",
        "hot",
        "suspicious"
      ],
      "chanceWeight": 7.0,
      "askPriceMultiplier": 0.48,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "good",
      "riskNote": "Cop risk +2",
      "notes": "A single bike wheel with a whole-bike problem."
    },
    {
      "id": "vice_carlo_buys_phone",
      "characterId": "vice-clepto-carlo",
      "itemId": "used_smartphone",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "electronics",
        "portable"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.95,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk; cop risk if hot substitute",
      "notes": "Needs a phone that does not remember him."
    },
    {
      "id": "vice_carlo_silverware_trade",
      "characterId": "vice-clepto-carlo",
      "itemId": "silverware_bundle",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "portable",
        "jewelry"
      ],
      "offeredItemTags": [
        "possibly_fake",
        "suspicious"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.72,
      "cashAdjustmentMin": -12.0,
      "cashAdjustmentMax": 25.0,
      "conditionOverride": "questionable",
      "riskNote": "Scam risk +1",
      "notes": "Trades bundled silverware with flexible ownership."
    },
    {
      "id": "vice_danny_locked_watch",
      "characterId": "vice-dealer-danny",
      "itemId": "smart_watch_locked",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "suspicious"
      ],
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.6,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1; scam risk +1",
      "notes": "The watch is locked and Danny is offended by follow-up questions."
    },
    {
      "id": "vice_danny_buys_knife",
      "characterId": "vice-dealer-danny",
      "itemId": "pocket_knife",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "weapon",
        "suspicious"
      ],
      "offeredItemTags": null,
      "chanceWeight": 4.0,
      "askPriceMultiplier": 1.0,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Cop/thug risk if suspicious",
      "notes": "Wants something small sharp and deniable."
    },
    {
      "id": "vice_danny_vcr_trade",
      "characterId": "vice-dealer-danny",
      "itemId": "hospital_vcr",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "weapon",
        "electronics",
        "luxury"
      ],
      "offeredItemTags": [
        "hot",
        "suspicious"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.78,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 35.0,
      "conditionOverride": "questionable",
      "riskNote": "Cop risk +1",
      "notes": "Trades hot electronics with a salesman smile."
    },
    {
      "id": "vice_pete_handbag",
      "characterId": "vice-pervert-pete",
      "itemId": "luxury_handbag_fake",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "luxury",
        "possibly_fake"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.58,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "questionable",
      "riskNote": "Scam risk +1",
      "notes": "A fake handbag with too much backstory."
    },
    {
      "id": "vice_pete_buys_dvds",
      "characterId": "vice-pervert-pete",
      "itemId": "dvd_stack",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "junk",
        "collectible"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.0,
      "askPriceMultiplier": 0.86,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Buys low-rent media without asking for titles."
    },
    {
      "id": "vice_pete_sunglasses_trade",
      "characterId": "vice-pervert-pete",
      "itemId": "designer_sunglasses",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "junk",
        "collectible",
        "luxury"
      ],
      "offeredItemTags": [
        "luxury",
        "portable"
      ],
      "chanceWeight": 3.0,
      "askPriceMultiplier": 0.8,
      "cashAdjustmentMin": -10.0,
      "cashAdjustmentMax": 20.0,
      "conditionOverride": "used",
      "riskNote": "Low scam risk",
      "notes": "Trades sunglasses with the confidence of a parking-lot receipt."
    },
    {
      "id": "vice_remy_turntable",
      "characterId": "vice-raver-remy",
      "itemId": "dj_turntable",
      "dealType": "sell_to_shop",
      "itemRole": "npc_offers",
      "requestedItemTags": null,
      "offeredItemTags": [
        "electronics",
        "collectible"
      ],
      "chanceWeight": 5.0,
      "askPriceMultiplier": 0.7,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "good",
      "riskNote": "Low risk; scam risk if oversold",
      "notes": "A turntable from a party that outlived the lease."
    },
    {
      "id": "vice_remy_buys_speaker",
      "characterId": "vice-raver-remy",
      "itemId": "bluetooth_speaker",
      "dealType": "buy_from_shop",
      "itemRole": "npc_requests",
      "requestedItemTags": [
        "electronics",
        "portable"
      ],
      "offeredItemTags": null,
      "chanceWeight": 6.0,
      "askPriceMultiplier": 1.02,
      "cashAdjustmentMin": 0.0,
      "cashAdjustmentMax": 0.0,
      "conditionOverride": "",
      "riskNote": "Low risk",
      "notes": "Wants a speaker loud enough to erase Tuesday."
    },
    {
      "id": "vice_remy_console_trade",
      "characterId": "vice-raver-remy",
      "itemId": "handheld_console",
      "dealType": "trade",
      "itemRole": "npc_offers",
      "requestedItemTags": [
        "electronics",
        "portable",
        "instrument",
        "collectible"
      ],
      "offeredItemTags": [
        "electronics",
        "portable",
        "collectible"
      ],
      "chanceWeight": 4.0,
      "askPriceMultiplier": 0.88,
      "cashAdjustmentMin": -15.0,
      "cashAdjustmentMax": 30.0,
      "conditionOverride": "used",
      "riskNote": "Low risk",
      "notes": "Trades handheld gaming gear for something with more bass or buttons."
    }
  ],
  "eventBlueprints": [
    {
      "id": "crackhead_locked_watch_offer",
      "characterId": "street-crackhead",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Got a smart watch. Locked for privacy. My privacy, your problem.",
      "resultNotes": "Use crackhead_locked_watch pool for item/price."
    },
    {
      "id": "bum_microwave_offer",
      "characterId": "street-bum",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Microwave works. Sometimes it starts before you touch it. Saves time.",
      "resultNotes": "Low-risk junk filler."
    },
    {
      "id": "hitman_luxury_buy",
      "characterId": "service-hitman",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I need something classy. Not traceable-classy. Just classy.",
      "resultNotes": "Requires luxury/weapon/hot inventory."
    },
    {
      "id": "hitman_knife_trade",
      "characterId": "service-hitman",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "I have a knife and a calm attitude. One is for trade.",
      "resultNotes": "Dangerous trade test."
    },
    {
      "id": "junkie_mystery_box_trade",
      "characterId": "street-junkie",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This box has value. Emotional, legal, maybe electrical.",
      "resultNotes": "Good weird-risk event."
    },
    {
      "id": "nervous_vcr_offer",
      "characterId": "nervous_seller",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Got a vintage VCR. Works great. Don’t ask why there’s hospital tape on it.",
      "resultNotes": "Use Character_Item_Pools for exact item/price."
    },
    {
      "id": "collector_cards_buy",
      "characterId": "collector",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I heard you have baseball cards. I collect terrible financial decisions.",
      "resultNotes": "Requires matching collectible inventory."
    },
    {
      "id": "tracksuit_bad_trade",
      "characterId": "tracksuit-thug-vincent",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "Nice shop. Be a shame if someone paid retail.",
      "resultNotes": "Potential thug consequence."
    },
    {
      "id": "mechanic_tool_sale",
      "characterId": "mechanic",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "You got tools back there, or just decorative tetanus?",
      "resultNotes": "Good clean selling event."
    },
    {
      "id": "street_fence_hot_offer",
      "characterId": "street_fence",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "It’s not stolen. It’s aggressively pre-owned.",
      "resultNotes": "High-risk high-profit source."
    },
    {
      "id": "undercover_bait_buy",
      "characterId": "undercover_cop",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "This serial number being scratched off, is that normal pawn shop stuff?",
      "resultNotes": "Bait event for hot inventory."
    },
    {
      "id": "mystery_weirdo_trade",
      "characterId": "mystery_weirdo",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "I brought a box. It brought itself, spiritually and maybe legally.",
      "resultNotes": "Weird trade event; keep effects simple."
    },
    {
      "id": "regular_mr_seventies_watch_offer",
      "characterId": "regular-mr-seventies",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Vintage gold. Vintage means the questions expired.",
      "resultNotes": "Use regular_mr_seventies_gold_watch pool."
    },
    {
      "id": "regular_business_drunk_sunglasses_offer",
      "characterId": "regular-business-drunk",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "These sunglasses got me through two sales meetings and one apology brunch.",
      "resultNotes": "Use regular_business_drunk_sunglasses pool."
    },
    {
      "id": "regular_business_drunk_speaker_buy",
      "characterId": "regular-business-drunk",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I need something loud and business-adjacent before good judgment clocks back in.",
      "resultNotes": "Use regular_business_drunk_buys_speaker or matching electronics inventory."
    },
    {
      "id": "regular_business_drunk_trade",
      "characterId": "regular-business-drunk",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "These sunglasses make me look employed. Trade me something with buttons.",
      "resultNotes": "Use regular_business_drunk_watch_trade pool."
    },
    {
      "id": "regular_lady_divorce_bracelet_offer",
      "characterId": "regular-lady-divorce",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Fourteen karat closure. I am keeping the dog and selling the bracelet.",
      "resultNotes": "Use regular_lady_divorce_gold_bracelet pool."
    },
    {
      "id": "regular_lady_divorce_trade",
      "characterId": "regular-lady-divorce",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This bag survived the marriage. Let us see if it survives your appraisal.",
      "resultNotes": "Use regular_lady_divorce_handbag_trade pool."
    },
    {
      "id": "regular_jan_lee_blender_offer",
      "characterId": "money-jan-takai",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Blender has one speed. That speed is lawsuit.",
      "resultNotes": "Use regular_jan_lee_blender pool."
    },
    {
      "id": "regular_jan_lee_tv_buy",
      "characterId": "money-jan-takai",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I need a TV that works and does not require a family meeting.",
      "resultNotes": "Use regular_jan_lee_buys_tv or matching practical electronics inventory."
    },
    {
      "id": "regular_jan_lee_trade",
      "characterId": "money-jan-takai",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "I brought sockets. You bring something that does not make my week worse.",
      "resultNotes": "Use regular_jan_lee_socket_trade pool."
    },
    {
      "id": "regular_mr_tourist_camera_offer",
      "characterId": "regular-mr-tourist",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Camera is authentic local purchase. I bought it three blocks from panic.",
      "resultNotes": "Use regular_mr_tourist_camera pool."
    },
    {
      "id": "regular_mr_tourist_watch_buy",
      "characterId": "regular-mr-tourist",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Show me a watch that says vacation success louder than my bank app.",
      "resultNotes": "Use regular_mr_tourist_buys_watch or matching luxury watch inventory."
    },
    {
      "id": "regular_mr_tourist_trade",
      "characterId": "regular-mr-tourist",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "I have collectible cards and a suitcase full of bad confidence.",
      "resultNotes": "Use regular_mr_tourist_cards_trade pool."
    },
    {
      "id": "regular_mrs_tourist_bracelet_offer",
      "characterId": "regular-mrs-tourist",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "It is real gold. The vacation budget is becoming more theoretical.",
      "resultNotes": "Use regular_mrs_tourist_bracelet pool."
    },
    {
      "id": "regular_mrs_tourist_sunglasses_buy",
      "characterId": "regular-mrs-tourist",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I want sunglasses expensive enough to hide this itinerary.",
      "resultNotes": "Use regular_mrs_tourist_buys_sunglasses or matching luxury inventory."
    },
    {
      "id": "regular_mrs_tourist_trade",
      "characterId": "regular-mrs-tourist",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This silverware is decorative if you do not inspect the shoelace.",
      "resultNotes": "Use regular_mrs_tourist_silverware_trade pool."
    },
    {
      "id": "regular_tim_lee_laptop_offer",
      "characterId": "regular-tim-lee",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Laptop runs great if you respect its breathing problems.",
      "resultNotes": "Use regular_tim_lee_laptop pool."
    },
    {
      "id": "regular_tim_lee_console_buy",
      "characterId": "regular-tim-lee",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Got a console back there? I need a reward for surviving errands.",
      "resultNotes": "Use regular_tim_lee_buys_console or matching electronics inventory."
    },
    {
      "id": "regular_tim_lee_trade",
      "characterId": "regular-tim-lee",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "I can trade a drill and pretend this is home improvement.",
      "resultNotes": "Use regular_tim_lee_drill_trade pool."
    },
    {
      "id": "hustler_shorty_luxury_buy",
      "characterId": "hustler-shorty",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Show me something expensive enough to make strangers lie about knowing me.",
      "resultNotes": "Use hustler_shorty_buys_watch or matching luxury inventory."
    },
    {
      "id": "hustler_shorty_locked_watch_offer",
      "characterId": "hustler-shorty",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Phone says the watch belongs to somebody else. Phone talks too much.",
      "resultNotes": "Use hustler_shorty_locked_watch pool."
    },
    {
      "id": "hustler_shorty_figure_trade_offer",
      "characterId": "hustler-shorty",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This figure is mint if you ignore how life works.",
      "resultNotes": "Use hustler_shorty_figure_trade pool."
    },
    {
      "id": "hustler_sista_luxury_buy",
      "characterId": "hustler-cool-j",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Show me something expensive enough to make strangers lie about knowing me.",
      "resultNotes": "Use hustler_sista_buys_watch or matching luxury inventory."
    },
    {
      "id": "hustler_sista_locked_watch_offer",
      "characterId": "hustler-cool-j",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Phone says the watch belongs to somebody else. Phone talks too much.",
      "resultNotes": "Use hustler_sista_locked_watch pool."
    },
    {
      "id": "hustler_sista_figure_trade_offer",
      "characterId": "hustler-cool-j",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This figure is mint if you ignore how life works.",
      "resultNotes": "Use hustler_sista_figure_trade pool."
    },
    {
      "id": "hustler_kangol_luxury_buy",
      "characterId": "hustler-kangol",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Show me something expensive enough to make strangers lie about knowing me.",
      "resultNotes": "Use hustler_kangol_buys_watch or matching luxury inventory."
    },
    {
      "id": "hustler_kangol_locked_watch_offer",
      "characterId": "hustler-kangol",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Phone says the watch belongs to somebody else. Phone talks too much.",
      "resultNotes": "Use hustler_kangol_locked_watch pool."
    },
    {
      "id": "hustler_kangol_figure_trade_offer",
      "characterId": "hustler-kangol",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This figure is mint if you ignore how life works.",
      "resultNotes": "Use hustler_kangol_figure_trade pool."
    },
    {
      "id": "tracksuit_legs_luxury_buy",
      "characterId": "tracksuit-legs",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Show me something expensive enough to make strangers lie about knowing me.",
      "resultNotes": "Use tracksuit_legs_buys_watch or matching luxury inventory."
    },
    {
      "id": "tracksuit_legs_locked_watch_offer",
      "characterId": "tracksuit-legs",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Phone says the watch belongs to somebody else. Phone talks too much.",
      "resultNotes": "Use tracksuit_legs_locked_watch pool."
    },
    {
      "id": "tracksuit_legs_figure_trade_offer",
      "characterId": "tracksuit-legs",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This figure is mint if you ignore how life works.",
      "resultNotes": "Use tracksuit_legs_figure_trade pool."
    },
    {
      "id": "tracksuit_slim_luxury_buy",
      "characterId": "tracksuit-slim",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Show me something expensive enough to make strangers lie about knowing me.",
      "resultNotes": "Use tracksuit_slim_buys_watch or matching luxury inventory."
    },
    {
      "id": "tracksuit_slim_locked_watch_offer",
      "characterId": "tracksuit-slim",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Phone says the watch belongs to somebody else. Phone talks too much.",
      "resultNotes": "Use tracksuit_slim_locked_watch pool."
    },
    {
      "id": "tracksuit_slim_figure_trade_offer",
      "characterId": "tracksuit-slim",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This figure is mint if you ignore how life works.",
      "resultNotes": "Use tracksuit_slim_figure_trade pool."
    },
    {
      "id": "old_grandma_slots_ring_offer",
      "characterId": "regular-grandma-slots",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "It was my anniversary ring. The machine is due, sweetheart.",
      "resultNotes": "Use old_grandma_slots_gold_ring pool. Keep tone darkly funny, not cruel."
    },
    {
      "id": "senior_grandpa_catfish_tool_offer",
      "characterId": "regular-grandpa-catfish",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "This drill still works if you talk to it like family.",
      "resultNotes": "Use senior_grandpa_catfish_drill pool."
    },
    {
      "id": "senior_grandpa_catfish_trade",
      "characterId": "regular-grandpa-catfish",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "I got sockets. You got shelf clutter. Somewhere in there is commerce.",
      "resultNotes": "Use senior_grandpa_catfish_tool_trade pool."
    },
    {
      "id": "regular_salaryman_watch_offer",
      "characterId": "money-salaryman",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Watch keeps perfect time. Unfortunately I am still late to everything.",
      "resultNotes": "Use regular_salaryman_watch pool."
    },
    {
      "id": "regular_salaryman_laptop_buy",
      "characterId": "money-salaryman",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I need a laptop for work and whatever dignity fits in the charger bag.",
      "resultNotes": "Use regular_salaryman_buys_laptop or matching computer inventory."
    },
    {
      "id": "regular_salaryman_trade",
      "characterId": "money-salaryman",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This guitar lost to overtime. Maybe it can still win on your shelf.",
      "resultNotes": "Use regular_salaryman_guitar_trade pool."
    },
    {
      "id": "money_devon_earrings_offer",
      "characterId": "money-devon-dollars",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "These studs are real enough to make the receipt feel underdressed.",
      "resultNotes": "Use money_devon_earrings pool."
    },
    {
      "id": "money_devon_watch_buy",
      "characterId": "money-devon-dollars",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Show me a watch that says I arrived before I open my mouth.",
      "resultNotes": "Use money_devon_buys_watch or matching luxury watch inventory."
    },
    {
      "id": "money_devon_trade",
      "characterId": "money-devon-dollars",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "I have a gaming PC and a sudden need for something less basement-coded.",
      "resultNotes": "Use money_devon_pc_trade pool."
    },
    {
      "id": "money_brad_handbag_offer",
      "characterId": "money-douche-brad",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Designer bag. Basically designer. Do not get microscopic about it.",
      "resultNotes": "Use money_brad_handbag pool."
    },
    {
      "id": "money_brad_sunglasses_buy",
      "characterId": "money-douche-brad",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I need sunglasses that make waiting in line look optional.",
      "resultNotes": "Use money_brad_buys_sunglasses or matching luxury portable inventory."
    },
    {
      "id": "money_brad_trade",
      "characterId": "money-douche-brad",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "This watch has weight. History too probably. Trade me up.",
      "resultNotes": "Use money_brad_watch_trade pool."
    },
    {
      "id": "money_penny_bracelet_offer",
      "characterId": "money-penny",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Fourteen karat and no drama attached. Price it like both are rare.",
      "resultNotes": "Use money_penny_bracelet pool."
    },
    {
      "id": "money_penny_earrings_buy",
      "characterId": "money-penny",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I am looking for earrings that do not require a story after purchase.",
      "resultNotes": "Use money_penny_buys_earrings or matching jewelry inventory."
    },
    {
      "id": "money_penny_trade",
      "characterId": "money-penny",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "Camera body is clean. I would rather leave with something that fits in a case smaller than my plans.",
      "resultNotes": "Use money_penny_camera_trade pool."
    },
    {
      "id": "vice_arty_box_offer",
      "characterId": "vice-addict-arty",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Box is sealed for value. Also because opening it feels like a court date.",
      "resultNotes": "Use vice_arty_mystery_box pool."
    },
    {
      "id": "vice_arty_tablet_buy",
      "characterId": "vice-addict-arty",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Got a cracked tablet? I like screens that already understand failure.",
      "resultNotes": "Use vice_arty_buys_tablet or matching broken electronics inventory."
    },
    {
      "id": "vice_arty_trade",
      "characterId": "vice-addict-arty",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "Locked watch for whatever you got that does not beep at me.",
      "resultNotes": "Use vice_arty_watch_trade pool."
    },
    {
      "id": "vice_carlo_wheel_offer",
      "characterId": "vice-clepto-carlo",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "It is a premium bike wheel. The bike decided to pursue other opportunities.",
      "resultNotes": "Use vice_carlo_bike_wheel pool."
    },
    {
      "id": "vice_carlo_phone_buy",
      "characterId": "vice-clepto-carlo",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I need a phone that does not recognize me first.",
      "resultNotes": "Use vice_carlo_buys_phone or matching portable electronics inventory."
    },
    {
      "id": "vice_carlo_trade",
      "characterId": "vice-clepto-carlo",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "Silverware bundle for pocket electronics. Everybody leaves shiny.",
      "resultNotes": "Use vice_carlo_silverware_trade pool."
    },
    {
      "id": "vice_danny_watch_offer",
      "characterId": "vice-dealer-danny",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Smart watch. Locked because privacy is important to whoever used to own it.",
      "resultNotes": "Use vice_danny_locked_watch pool."
    },
    {
      "id": "vice_danny_knife_buy",
      "characterId": "vice-dealer-danny",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Anything sharp and forgettable in the case today?",
      "resultNotes": "Use vice_danny_buys_knife or matching weapon inventory."
    },
    {
      "id": "vice_danny_trade",
      "characterId": "vice-dealer-danny",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "Hospital VCR for something with less paperwork smell.",
      "resultNotes": "Use vice_danny_vcr_trade pool."
    },
    {
      "id": "vice_pete_handbag_offer",
      "characterId": "vice-pervert-pete",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Luxury bag. Maybe. The logo is close if you squint morally.",
      "resultNotes": "Use vice_pete_handbag pool."
    },
    {
      "id": "vice_pete_dvds_buy",
      "characterId": "vice-pervert-pete",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "Got a stack of DVDs cheap enough that nobody asks what is in it?",
      "resultNotes": "Use vice_pete_buys_dvds or matching junk collectible inventory."
    },
    {
      "id": "vice_pete_trade",
      "characterId": "vice-pervert-pete",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "These sunglasses saw things. Trade me something with fewer witnesses.",
      "resultNotes": "Use vice_pete_sunglasses_trade pool."
    },
    {
      "id": "vice_remy_turntable_offer",
      "characterId": "vice-raver-remy",
      "eventType": "sell_to_shop",
      "pressureFactionId": "",
      "dialogue": "Turntable works. Last party did not survive its own group chat.",
      "resultNotes": "Use vice_remy_turntable pool."
    },
    {
      "id": "vice_remy_speaker_buy",
      "characterId": "vice-raver-remy",
      "eventType": "buy_from_shop",
      "pressureFactionId": "",
      "dialogue": "I need a speaker that makes rent feel theoretical.",
      "resultNotes": "Use vice_remy_buys_speaker or matching portable electronics inventory."
    },
    {
      "id": "vice_remy_trade",
      "characterId": "vice-raver-remy",
      "eventType": "trade",
      "pressureFactionId": "",
      "dialogue": "Handheld console for anything with volume knobs or better buttons.",
      "resultNotes": "Use vice_remy_console_trade pool."
    },
    {
      "id": "cop_consequence_visit",
      "characterId": "cop_consequence",
      "eventType": "cop_consequence",
      "pressureFactionId": "",
      "dialogue": "Got a couple questions about the merchandise moving through here.",
      "resultNotes": "Visible cop consequence encounter."
    },
    {
      "id": "hustler_thug_robbery",
      "characterId": "hustler-thug-red",
      "eventType": "thug_robbery_consequence",
      "pressureFactionId": "hustlers",
      "dialogue": "You been loud with people who know me. Register gets quiet now.",
      "resultNotes": "Visible hustler-thug-red robbery consequence."
    },
    {
      "id": "tracksuit_thug_robbery",
      "characterId": "tracksuit-thug-vincent",
      "eventType": "thug_robbery_consequence",
      "pressureFactionId": "tracksuits",
      "dialogue": "Nice shop. Shame the register has to learn fear today.",
      "resultNotes": "Visible tracksuit-thug-vincent robbery consequence."
    }
  ]
};
