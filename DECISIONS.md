# Decisions

The choices behind the prototype, and what I traded for them.

## Scope

- **Option A, one loop done well.** Home → feed → lock → unlock → coin packs → back to the episode. I chose it over Option B because a gamification feature that is genuinely engaging needs more time to think through and build than the 6–8 hours allowed, while the design gave a clear target for A.
- **Only what the loop needs.** The task values quality over completeness, so Discover, Romance, Library and Profile show a placeholder.
- **Coins only.** The task asks for one unlock flow; coins show the most product logic (prices, balance, packs). Premium, VIP and ads from the design are left out.

## Platform

- **Expo Go, managed workflow.** Reviewers can run the app from a QR code without building it. Libraries that need their own native code, such as MMKV, were ruled out for that reason.
- **Storage: AsyncStorage.** It is the most familiar choice and is fast enough for three small values. I also tried `expo-sqlite/kv-store`, which works in Expo Go and has synchronous reads, but kept AsyncStorage: three small values don't justify installing a whole SQLite library just to use it as a key-value store. Beyond the prototype I'd move to MMKV, which is faster and synchronous. It needs a development build instead of Expo Go, but the project can stay in the managed workflow (no bare project), and only `safeStorage.ts` would change.
- **Wait for saved state.** The root layout renders only after both stores have loaded, so the app never shows the starting balance by mistake or loses a purchase made in the first moments.
- **Safe storage reads.** Both stores read and write through `safeStorage`. If a read fails, it returns `null`, so the store starts from its initial state (15 coins, nothing unlocked, every series from episode 1) instead of leaving the app on a blank screen; a failed write is ignored. That trade-off only works for a prototype: in production the coins and unlocks would come from a server, so a broken local copy couldn't lose a purchase.

## Feed

- **Only nearby videos load.** The visible card and its neighbours get a video source; the others keep their poster. This keeps memory and video decoders low, and swiping to the next card is still instant.
- **Only the active card can move the feed on.** On Android, players of hidden cards can report that a video ended; ignoring those stops the feed from jumping ahead.
- **Our own controls only.** The player's native controls are turned off: they added a second set of buttons over the design (skip, seek, fullscreen), differed between iOS and Android, and sat under the bottom shade. Play and pause go through the Watch button. Native controls would also work, and bring seeking, fullscreen (including watching in landscape) and picture-in-picture for free; which way to go is a call I'd make together with design. Otherwise, a slim progress bar in the app's style would be the next step.
- **Resume where you left off.** Opening a series starts at the last episode watched, saved per series in its own store, separate from coins.

## Prices and unlocking

- **Prices from the design.** An episode costs 85 and the season 150, with a starting balance of 15. That makes the season the best value and sends the loop through the coin packs.
- **The season never costs more than the episodes left**, and it is only offered while more than one episode is locked; otherwise it would be the same as unlocking the episode.
- **Only coin packs that cover the price are shown**, so a purchase always completes the unlock the user chose.
- **Both paths end on the episode.** With enough coins, "Continue the romance" unlocks right away and returns to the episode. Without them, it opens the coin packs; after the purchase the unlock happens automatically and the user lands on the same episode, which now plays, so there is no second tap.
- **Double taps are ignored** on Unlock and Buy, so a fast double tap can't charge twice.
