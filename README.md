# LoveFlix beta prototype

A clickable React Native prototype of the LoveFlix beta app (vertical micro-drama series), built with Expo as a take-home task for TargetVideo (Option A).

## What it shows

One loop, built end to end:

1. **Home**: spotlight series, genre chips, rows of series and the tab bar.
2. **Episode feed**: a vertical, TikTok-style feed. Episodes 1–4 play; when episode 4 ends, the feed moves on to episode 5, which is locked.
3. **Continue the romance**: unlock the episode or, while more than one episode is locked, the whole season, with coins.
4. **Coin packs**: not enough coins opens the packs. The purchase is simulated; it adds the coins, unlocks what was chosen and returns to the episode, which now plays.

Coins, unlocked episodes, likes and the last watched episode of each series are saved on the device, so they survive a restart.

## Run it

You need Node 24 and the [Expo Go](https://expo.dev/go) app on an iOS or Android phone.

```bash
npm ci
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

Checks, the same ones CI runs on every pull request:

```bash
npm run lint
npm run typecheck
npm run format:check
npm test
```

## Stack

- Expo SDK 58, React Native 0.88, TypeScript (strict), React Compiler
- expo-router for navigation, expo-video for playback
- zustand with AsyncStorage for the saved state
- Jest with React Native Testing Library; ESLint and Prettier; GitHub Actions

## Structure

```
app/                       routes, kept thin: read params and stores, render a screen
  (tabs)/                  Home and the placeholder tabs
  feed/[seriesId].tsx      vertical episode feed
  unlock/[episodeId].tsx   "Continue the romance" (full-screen modal)
  topup.tsx                coin packs (full-screen modal)
src/
  features/
    home/                  Home screen and poster card
    feed/                  feed screen, episode card, watch progress store
    unlock/                domain rules and prices, wallet store, unlock and coin pack screens
  shared/                  theme tokens, UI strings, mock catalog, shared components
```

Screens only take props; routes connect them to the stores. Business rules (what is locked, prices, which coin packs fit) are pure functions in `src/features/unlock/domain/`, with tests. Features import each other only through their `index.ts`.

## Decisions

The main ones, in short; [DECISIONS.md](DECISIONS.md) has the reasoning.

- **Expo Go first.** Everything runs in Expo Go, so the prototype opens without a native build. That ruled out MMKV for storage (it needs a development build instead of Expo Go; beyond the prototype I'd move to it and still stay in the managed workflow).
- **Prices.** An episode costs 85 coins and the season 150, and the starting balance is 15 (as in the design), so the loop always reaches the coin packs. The season never costs more than the episodes still locked, and it is only offered while more than one is locked.
- **Only coin packs that cover the price** are shown, so a purchase always unlocks what was chosen.
- **Simulated purchase**, said on the screen. No real payments.
- **Video memory.** Only the visible card and its neighbours load their video; the others keep their poster.

Left out on purpose: subscriptions (Premium and VIP), ads, login, the series detail page and the library, as allowed by the task.

## What I'd do next

- Real in-app purchases on the App Store and Google Play instead of the simulated one, with the wallet on a backend.
- Analytics for the funnel: `episode_start`, `lock_shown`, `unlock_option_selected`, `topup_opened`, `purchase_completed`, `unlock_completed`. The first metrics to watch: lock-to-unlock conversion, season vs. episode share, and revenue per paying user.
- MMKV in a development build (still the managed workflow) for faster, synchronous storage; only the two store files would change.
- End-to-end tests of the loop with Maestro, and tests for the routes.
- Screen reader focus that lands on the main choice when a screen opens, checked with VoiceOver and TalkBack.
- Prefetch the next episode's video, and A/B test the prices and the default option.

## AI use

I built this with Claude Code as a pair programmer. We started with a plan: the scope, the stack, the folder structure and the order of the pull requests, which I reviewed before any code was written. From there it drafted code and docs, and I reviewed every change, tested it on Android and iOS and made the product and design calls. The project rules it followed are in `CLAUDE.md` and `.claude/skills/`.
