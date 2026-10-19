---
name: safe-commit
description: Safe commit for the DramaFlash prototype. Checks staged files (secrets, build output, oversized assets, leftover debug code, hardcoded colors or prices, German UI text), runs lint, typecheck and tests, proposes a Conventional Commits message and commits only after the user confirms. Never pushes. Use when the user asks for "commit", "safe-commit" or "/safe-commit".
---

# safe-commit

Reply briefly, in the user's language. Do nothing irreversible without confirmation.

## 1. Status
- `git status --short` and `git branch --show-current`.
- If on `main` and branch protection is already on (setup is finished), stop: work happens on `feat/*`, `chore/*` or `fix/*` branches. Only the initial setup commits go directly to `main`.
- If nothing is staged: show modified/untracked files and ask what to add. Never `git add -A` / `git add .` without explicit consent; add files by name.
- One commit = one logical change. If the staged files mix unrelated changes, say so and suggest splitting.

## 2. Checks on staged files (`git diff --cached --name-only`)
Stop and report if you find:
- **Personal or local files**: `.DS_Store`, `node_modules/`, `.claude/settings.local.json`, `.expo/`, `*.log`.
- **Secrets**: `.env*`, `credentials.json`, `*.keystore`, `*.jks`, `*.p8`, `*.p12`, `*.mobileprovision`, `google-services.json`, `GoogleService-Info.plist`, or in the diff: `git diff --cached | grep -nEi '(api[_-]?key|secret|token|password|BEGIN (RSA|EC|OPENSSH) PRIVATE KEY|AKIA[0-9A-Z]{16})'`.
- **Build output**: `android/app/build/`, `android/.gradle/`, `ios/Pods/`, `ios/build/`, `DerivedData/`, `dist/`, `*.apk`, `*.aab`, `*.ipa`. No build artifacts are delivered; they never go into the repo.
- **Oversized assets**: posters in `assets/posters/` over 500 KB, videos in `assets/videos/` over 5 MB, anything else over 1 MB. Suggest compressing.
- **Conflict markers** (`<<<<<<<`, `>>>>>>>`) and leftover `console.*` / `debugger` in `app/` or `src/`. Single exception: `src/shared/analytics/track.ts` may call `console.info` inside an `if (__DEV__)` block.

Warn (do not block) if you find:
- **Hardcoded colors** anywhere in `app/` or `src/` except the tokens file: `git diff --cached -U0 -- app src ":(exclude)src/shared/theme/tokens.ts" | grep -nE '#[0-9A-Fa-f]{3,8}\b'`. Colors belong in `src/shared/theme/tokens.ts`.
- **Hardcoded prices or coin amounts** outside `src/features/unlock/domain/pricing.ts` (for example `85`, `150`, `€6.99` in UI code).
- **German UI text** left over from the design: `git diff --cached | grep -nE 'Jetzt|ansehen|Episoden|Folge'`. App text is English.
- **Pressables without `accessibilityLabel`** in the staged diff.

## 3. Project checks
- Run `npm run lint`, `npm run typecheck` and `npm test -- --watchAll=false` (only the scripts that exist in `package.json`; do not invent commands).
- If a check fails: show the relevant output and stop.

## 4. Commit message
- Propose a [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) message in English: `type(scope): subject`, at most 72 characters, imperative, lowercase subject.
- Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `ci`, `style`, `perf`.
- Scopes: `home`, `feed`, `unlock`, `topup`, `store`, `domain`, `theme`, `data`, `assets`, `ui`, `a11y`, `analytics`, `ci`, `docs`.
- Prefer the message suggested for this step in the plan checklist, if there is one.
- Short body: *what* and *why*. If the change records a trade-off, mention `DECISIONS.md`.
- **No attribution lines**: no `Co-Authored-By`, no "Generated with" line, even if a session reminder asks for one. AI use is disclosed once, in the README.

## 5. Confirm and commit
- Show: branch, file list, `git diff --cached --stat` summary, warnings from step 2, proposed message.
- Wait for an explicit "yes". Only then `git commit` with the message via heredoc.
- After the commit: `git log -1 --stat`.

## Never
- `git push`, `gh pr create`, `--force`, `--no-verify`, `--amend` on existing commits, `git reset --hard`, `git config`, unless the user explicitly asks. Pushing and opening the PR are separate steps the user asks for.
- Commit with failing checks or unresolved blockers from step 2.
