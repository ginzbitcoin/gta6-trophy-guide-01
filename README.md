# Leonida Platinum Atlas

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/ginzbitcoin/gta6-trophy-guide-01/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/ginzbitcoin/gta6-trophy-guide-01/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

An offline guide and tracker for all 55 PlayStation 5 trophies in Grand Theft Auto VI.

Built for the make.fun bounty: [gta6-trophy-guide-01](https://make.fun/bounty/gta6-trophy-guide-01)

Referral code: `fv6v3cs2`

## What it is

Leonida Platinum Atlas is a single-page app that runs fully offline. It lists every GTA VI trophy with its official description, grade, and a plain-words guide, plus a tracker that saves your progress in the browser.

- Header and progress card: earned count out of 55, percent to platinum, and counts per grade.
- Guide and tracker tab: checklist with localStorage, export and import as JSON, search, grade and kind filters, missable-only and hide-earned toggles, and a spoiler-free mode.
- Roadmap to platinum tab: seven stages in order, starting with the five missable trophies.
- Missable trophies tab: the five trophies that can only be earned once, with a warning to save first.
- Deep links: `#guide`, `#roadmap`, and `#missable` jump straight to a tab.

## Run it

Serve the `app/` folder with any static server, then open it in a browser:

```sh
node serve.ts
```

Then visit http://localhost:4173

## Files

- `app/index.html` - the app shell
- `app/style.css` - dark theme with neon pink and teal
- `app/app.js` - tracker, filters, tabs, and roadmap
- `app/data/trophies.json` - the 55 trophies
- `main.ts` - hand-in script that copies the app and screenshots to the output and writes `dossier.json`
- `serve.ts` - local test server
- `screenshots/` - three preview screenshots

## License

MIT. See `LICENSE`.
