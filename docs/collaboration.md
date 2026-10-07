# Team collaboration

How the four of us share one Figma prototype and one set of docs. This follows how product teams usually work in Figma (one live file, clear ownership, comments for review, named versions), adapted to a student team without Figma's paid branching.

| | |
|---|---|
| **Design source of truth** | The Figma file [Tourix – Worldwide Discovery App (UX Prototype)](https://www.figma.com/design/pNoyIJM8bCB4qtwVQeF0Kj) |
| **Docs, plugins and AI context** | This GitHub repo (`main` branch) |
| **Team size** | 4 |
| **Lead / file owner** | Maneet |

## 1. Figma setup (once)

1. **Get Figma Education for everyone.** Each member applies at figma.com/education/apply with their APU email (Higher Ed, SheerID check). University students get the **Professional plan free for one year**. Starter limits (3 design files, no prototype-only share links) stop being a problem.
2. **Lead creates a team** `Tourix – CT120-3-3` and moves the prototype file into it (file menu → **Move to project…**). A file in someone's Drafts is personal; a file in a team is shared.
3. **Lead invites the other three to the team** as **Can edit**. Everyone opens the file with their own Figma login.
4. **Share prototype links** (Present → Share prototype) with tutors and test participants. Never send them an edit link.

## 2. How the file is organised

| Page | Who edits | Purpose |
|---|---|---|
| `Mobile Prototype (iOS)` | Section owner only (see §3) | The live prototype. What gets marked. Don't break links. |
| `Working – <name>` (one per member) | That member | Your sandbox. Explore here, then move finished frames into your section. |
| Design system (components, `Tourix Tokens` variables) | **Lead only** | Shared parts. Ask before changing one; it affects every screen. |

Don't rename existing pages, sections or screens: the plugins and docs look them up by name (see [CLAUDE.md](../CLAUDE.md) §3).

## 3. Who owns what

Edit only the flows you own. To change someone else's screen, leave a Figma comment and @mention them.

| Owner | Flows | Screens (approx.) |
|---|---|---|
| Maneet (lead) | 1 First launch · 2 Returning user · design system and Read me board | 01–05, 07–13, components |
| Member 2 — *name* | 3 AR Heritage Lens · 9 Bahasa Melayu | 13, 21–23, 70–72, 74 |
| Member 3 — *name* | 4 Plan a day trip · 5 States & edge cases · 8 Offline mode | 09–10, 16–20, 24–25, 56–62, 67–69, 73 |
| Member 4 — *name* | 6 Country guides · 7 Destinations | 06, 14, 26–55, 63–66 |

Replace the placeholders with real names and fix the screen lists in your first meeting.

## 4. Everyday rules

- **Edit together freely by hand.** Figma is multiplayer; four people can edit at once in different sections.
- **One Claude or plugin run at a time.** Bulk edits by Claude or a development plugin can touch many screens. Before one:
  1. Check [`FIGMA_LOCK.md`](../FIGMA_LOCK.md) is free and post in the group chat.
  2. Pull the repo, take the lock (edit the file, commit, push).
  3. In Figma, **File → Save to version history** with a name like `Before <name> – <what> – <date>`.
  4. Run it. Check the result in presentation mode (close and reopen the prototype tab first).
  5. Update the docs and [changelog](changelog.md), release the lock, commit and push.
- **Review with comments**, not by editing someone else's frames. Resolve the comment when it's fixed.
- **Mark status** on each section label: `In progress`, `Ready for review`, `Done`.
- **Weekly backup:** the lead saves a named version and exports a `.fig` copy to [`figma-backups/`](../figma-backups/README.md).

## 5. Git rules (docs and plugins)

- Always `git pull` before you start and `git push` when you finish.
- Small changes (a typo, a changelog line) can go straight to `main`.
- Bigger doc changes or new plugins: make a branch and open a pull request; one other member approves.
- Every plugin that writes to Figma goes in `existing-project-files/figma-plugins/` with a short README, so the others can see exactly what ran.

## 6. Using Claude (each member with their own)

Everyone's Claude must read this repo's [CLAUDE.md](../CLAUDE.md) first. In Cowork, add your local clone of this repo as a folder, so Claude reads the current docs, not an old copy. Tell Claude your name and which flows you own; it must stay inside them and follow §4.
