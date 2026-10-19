# DramaFlash beta prototype

Clickable React Native prototype of the DramaFlash beta app (micro-drama series), built with Expo as a take-home task for TargetVideo. Mobile only: iOS and Android.

The prototype builds one loop, done well: Home → tap Play or a poster → vertical episode feed → episode 5 is locked → "Continue the romance" (unlock episode or season with coins) → not enough coins → coin packs → simulated purchase → back to the episode, which plays. Quality over completeness.

## Commands

```bash
npx expo install <package>   # always use this instead of npm install, it picks SDK-compatible versions
npx expo start               # dev server (port 8081 may be taken, use --port 8082)
npm run lint                 # ESLint (eslint-config-expo + prettier)
npm run typecheck            # tsc --noEmit
npm run format               # Prettier
npm test                     # Jest (jest-expo); Testing Library 14: `await render(...)`
npx expo-doctor              # dependency and config check
```

Run lint, typecheck and tests before calling a task done.

## Expo

The project is on Expo SDK 58. Expo changes APIs between SDKs: before writing code against an Expo or React Native API, check the versioned docs at https://docs.expo.dev/versions/v58.0.0/ (index: https://docs.expo.dev/llms.txt) instead of relying on memory. There are no `ios/` or `android/` folders; native config lives in `app.json`.

## Structure

```
app/                      expo-router routes, thin: read params and store, render a screen
  (tabs)/                 Home + placeholder tabs (Discover, Romance, Library, Profile)
  feed/[seriesId].tsx     vertical episode feed, outside tabs
  unlock/[episodeId].tsx  "Continue the romance", fullScreenModal
  topup.tsx               coin packs, returns to the episode
src/
  features/
    home/                 screens, components, index.ts
    feed/                 screens, components, index.ts
    unlock/               domain/ (pricing, rules), store/ (wallet), screens, components, __tests__
  shared/                 theme/tokens.ts, components/, data/catalog.ts, analytics/track.ts
docs/design/              README with the screens we build; renders are local only
```

## Code rules

- TypeScript strict, no `any`.
- Business rules live only in `src/features/unlock/domain/` as pure functions, with tests.
- Screens and components take props only; they never import the store or the router. Routes in `app/` connect the store to screens.
- A feature imports from another feature only through its `index.ts`.
- Colors, spacing, radii and fonts come only from `src/shared/theme/tokens.ts`. Prices come only from `src/features/unlock/domain/pricing.ts`.
- Every pressable has `accessibilityRole`, `accessibilityLabel` and a touch target of at least 44×44 pt.
- App text is English.
- No `console.*`, except `console.info` inside `if (__DEV__)` in `src/shared/analytics/track.ts`.

## Git

- Conventional Commits in English, one logical change per commit. Use the `safe-commit` skill.
- Feature work goes on `feat/*` branches and reaches `main` through a pull request, merged with a merge commit.
- No `Co-Authored-By` or "Generated with" lines in commits or pull requests.
- Never push, open or merge a pull request without the user's explicit confirmation.

## Out of scope

Real payments, backend, login, subscriptions, ads, series detail page, library. Purchases are simulated.
