---
name: new-screen
description: Scaffold a new screen in the DramaFlash prototype the project's way. An expo-router route file in app/ that wires the store, a presentational screen in src/features/<feature>/screens/ built from shared theme tokens and existing components, accessibility labels, and a render test. Runs the checks and hands off to safe-commit. Use when the user asks for a new screen or "/new-screen".
argument-hint: <ScreenName> <route, e.g. (tabs)/index or feed/[seriesId]> [design screen, e.g. home or coin-packs]
---

# new-screen

Arguments: $ARGUMENTS

Reply briefly, in the user's language. Read before you write; do not overwrite an existing file without asking.

## 1. Understand the screen
- From the arguments: `ScreenName` (PascalCase), the route, and the design screen name if given. Only the screens listed in `docs/design/README.md` are built: `home`, `episode-feed`, `continue-the-romance`, `coin-packs`.
- If the design screen is not in that list, say so and ask before continuing.
- Pick the feature it belongs to, from the route first and the design screen second:

  | Route | Design screen | Feature |
  |---|---|---|
  | `(tabs)/index` | `home` | `home` |
  | `feed/…` | `episode-feed` | `feed` |
  | `unlock/…`, `topup` | `continue-the-romance`, `coin-packs` | `unlock` |

  If the route and the design screen point to different features, or the route matches none of these, ask before writing.
- Read the design render `docs/design/<design-screen>.jpg` (local only, not in git) and reproduce its layout, visual hierarchy, spacing and copy, minus anything `docs/design/README.md` marks as left out. Write all text in English (the design mixes German and English).
- Read `src/shared/theme/tokens.ts`, list `src/shared/components/` and the feature's `components/`, and look at one existing screen in `src/features/*/screens/` to match its structure. Reuse components; only create a new one when nothing fits. A component used by one feature lives in that feature; one used by several lives in `shared/`.
- If something is unclear (route, presentation, what data it needs), ask one short question before writing.

## 2. Files to create
1. **Route** `app/<route>.tsx`: thin. Reads params with `useLocalSearchParams`, reads the store with selectors, calls actions and `track()` from `src/shared/analytics/track.ts`, renders `<ScreenNameScreen …props />`. No styling here.
   - Tab screens live in `app/(tabs)/` and need a `Tabs.Screen` entry in `app/(tabs)/_layout.tsx` (Ionicons icon, active color from tokens). Home is `(tabs)/index`; Discover, Romance, Library and Profile render `src/shared/components/ComingSoon` and need no new screen.
   - Full-screen flows (`feed/[seriesId]`) live outside `(tabs)`, so the tab bar is hidden.
   - Full-screen unlock steps (`unlock/[episodeId]`, design screen `continue-the-romance`) get `presentation: 'fullScreenModal'` in the root `app/_layout.tsx`. The screen draws its own gradient background and centered card; "Maybe Later" calls `router.back()` to return to the locked card in the feed.
2. **Screen** `src/features/<feature>/screens/ScreenNameScreen.tsx`: presentational only. Props in, callbacks out, no store or router imports. All colors, spacing, radii and fonts from `src/shared/theme/tokens.ts`; prices only from `src/features/unlock/domain/pricing.ts`; English text. Export it from the feature's `index.ts`.
3. **Test** `src/features/<feature>/__tests__/ScreenNameScreen.test.tsx`: render with mock props (React Native Testing Library); assert the main heading and that the primary action calls its callback.

Imports between features go only through the other feature's `index.ts`, never into its internal files.

This skill builds UI only. If the screen needs a rule or store action that doesn't exist yet, stop and say what's missing.

## 3. Screen checklist
- Every `Pressable` has `accessibilityRole` and `accessibilityLabel`, and a touch target of at least 44×44 pt (padding or `hitSlop`).
- Safe areas handled (`SafeAreaView` or `useSafeAreaInsets`).
- Loading, empty and error states where data can be missing (for the feed: video loading and video error).
- Scrolling lists use `FlatList`, not `map` inside `ScrollView`.
- No hardcoded hex colors, no `console.*`.

## 4. Verify and hand off
- Run `npm run lint`, `npm run typecheck`, `npm test -- --watchAll=false`. Fix what fails in the new files.
- Show the created files and a one-line summary of each.
- Suggest the commit message (for example `feat(home): add home screen`) and offer to run `safe-commit`. Do not commit yourself.
