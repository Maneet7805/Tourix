# Content guidelines

How Tourix talks. These rules are drawn from the copy already in the prototype; examples quoted are **Verified** text from the Figma frames.

Related: [design](design.md) · [accessibility](accessibility.md)

## 1. Voice and tone

**A knowledgeable local friend, wherever you are:** warm, practical, respectful, never salesy.

**Global vs local copy (5 Oct 2026).** Product-level copy (splash, onboarding, Home, loading, empty and error states, settings) is country-neutral. Country, destination, experience and culture-guide copy is fully local, in that country's terms.

| Do | Don't |
|---|---|
| Give the practical *why*: "Start before 9 am, before the heat." | Use hype: "Unmissable!", "Best ever" |
| Be culturally respectful: "People live here, so keep voices down." | Moralise or blame |
| Use plain verbs: "Add to trip", "Open Heritage Lens" | Use system words: "Submit", "Execute", "Confirm" |
| Include the local term with its English meaning: "In Malay: kaki lima" | Use untranslated jargon |
| Keep product-level copy country-neutral: "Start exploring", "Loading your picks…" | Name one country in global copy: "Show my Malaysia" (retired) |
| State approximate facts as approximate: "≈1 h flight", "Roughly Nov – Apr" | Invent precise prices, ratings or availability |

## 2. Patterns

| Element | Rule | Verified examples |
|---|---|---|
| Buttons | Verb first, 1–3 words, sentence case | "Continue", "Add to trip", "Start exploring", "Next landmark" |
| Contextual buttons | May carry context after a "·" | "Add to Day 1 · Sat 17 Oct" |
| Navigation labels | One word, Title Case | Home · Explore · Lens · Trips · Me |
| Screen titles | Short noun or question, Gloock | "Explore", "Trips", "Culture guide", "Where to next?" |
| Eyebrows | UPPERCASE DM Mono, "·" separators, ≤ 4 words | "PULAU PINANG · NORTHERN REGION", "PHRASE OF THE DAY", "SOUTHEAST ASIA" (country) |
| Section headings | Sentence case | "Explore by mood", "Good to know", "Near you this weekend" |
| Descriptions | 1–2 sentences, concrete nouns, no adjectives stacked | "Shophouse lanes, clan jetties and hawker food." |
| Tips | Imperative, one action, with a reason | "Cover shoulders and knees at temples and mosques." |
| Data | DM Mono, units, "≈" for estimates, "–" en dash for ranges | "≈3.5–4 h drive", "08:00", "5.41°N 100.33°E" |
| Pronunciation | Lowercase syllables, stressed syllable in CAPS | "toom-PAHNG LAH-loo" |
| Success messages | Past tense + undo | "Added to Day 1 · Undo" |
| Status lines | State + recency | "Synced on iPhone and laptop · just now" |
| Search placeholder | Name what can be searched | "Search places, food, phrases" |

### Proposed (not yet in the prototype)

| Situation | Pattern | Example |
|---|---|---|
| Empty state | What's missing + how to start + one button | "No trips yet. Save a place and we'll start a plan." **[Explore]** |
| No results | Echo the query + suggestion | "No matches for 'Penang hil'. Try 'Penang Hill'." |
| Error / offline | What happened + what still works | "You're offline. Your Penang guide still works." **[Open offline guide]** |
| AR failure | Action-oriented | "Move a little closer to the building." |
| Permission | Benefit first | "Allow camera access to see stories on buildings around you." |

## 3. Terminology

| Use | Not |
|---|---|
| Trip, Day, Stop | Itinerary item, booking |
| Save (heart) | Like, favourite |
| Experience | Activity, tour (unless it really is a tour) |
| Destination | Location, city |
| Heritage Lens / Lens | AR mode, scanner |
| Culture guide | Phrasebook (it covers etiquette too) |
| Kuala Lumpur / KL, Penang, Melaka | Malacca (use the local spelling, Melaka) |
| Country | Market, region (for a country) |
| Türkiye | Turkey (use the country's official English name) |
| e-hailing | Grab (avoid brand names) |

## 4. Localisation

- **Interface language ≠ country.** The interface language is the user's own; local terms and phrases come from the country being explored.
- **Verified languages shown:** English (default), Bahasa Melayu, 中文 (Mandarin, Simplified), தமிழ் (Tamil). Only English content is designed; the other options are choices in the picker.
- **Verified bilingual touches:** EN/BM audio guides and Malay terms in context on Malaysian screens; local phrases with pronunciation on every country guide (26–31). Product-level greetings are English only ("GOOD MORNING", "Welcome to Tourix.") since v3, because they appear for every country.
- **Planned or Proposed:** more interface languages for a worldwide audience — Arabic with right-to-left layout considerations (the brief lists Arabic), Spanish, French — if research supports them. Allow about 30 % text expansion for BM and Tamil in buttons and chips.
- Native-language names should appear in their own script on the picker. **Verified**

## 5. Accuracy rules for travel content

1. Mark any travel time, climate or distance as approximate (≈, "roughly", "often").
2. Don't fabricate ratings, reviews, prices, opening hours or availability. Say "check opening hours" instead.
3. Religious-site guidance must be respectful and general ("Dress modestly; check visiting hours").
4. Photos must show the place named, or be labelled illustrative. **Known exception:** the Langkawi image.
5. Credit photo sources in the report (Pexels).
