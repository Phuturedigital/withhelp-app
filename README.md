# WITH. mobile app

**A PhutureDigital project.**

Cross-platform mobile application for WITH., built with Expo, React Native and TypeScript.

> Safety should start before the emergency.

## Repository relationship

WITH. intentionally uses two separate repositories:

- **Website, brand and public storytelling:** https://github.com/Phuturedigital/withhelp
- **Production mobile application:** https://github.com/Phuturedigital/withhelp-app

The repositories deploy independently but share one product language, visual system and trust model.

The website repository is the canonical brand source. This repo mirrors the machine-readable contract at:

`shared/with-brand-contract.json`

A GitHub Actions check compares that file with the canonical website version so visual and language drift is detectable.

See `docs/CROSS-REPO-DESIGN-CONTRACT.md`.

## Platforms

One source codebase targets:

- Android
- iOS
- web preview

## Production stack direction

Already in use:

- Expo / React Native
- TypeScript
- Lucide
- React Native SVG

Recommended next layers:

- Ignite patterns for production architecture
- Storybook for React Native for component and state review
- React Native Reanimated for meaningful native motion
- MapLibre React Native for future native maps
- Turf for tested geospatial calculations
- Maestro for end-to-end mobile safety flows

Optional only where justified:

- gluestack-ui
- React Native Skia

See `docs/OPEN-SOURCE-TOOLKIT.md` for the adoption order and boundaries.

## Local development

Requirements: Node.js LTS and npm.

```bash
npm install
npm start
```

Then use Expo Go, an Android emulator, an iOS simulator on macOS, or run:

```bash
npm run android
npm run ios
npm run web
```

## Validation

```bash
npm run typecheck
npm run export:web
```

## Native builds

Install or invoke EAS CLI, sign in to Expo, then configure the project once:

```bash
npx eas-cli login
npx eas-cli build:configure
```

Create store-ready builds:

```bash
npx eas-cli build --platform android --profile production
npx eas-cli build --platform ios --profile production
```

Apple builds require an Apple Developer account. Google Play distribution requires a Google Play Console account. Bundle identifiers are configured in `app.json` as `za.co.withhelp.app`.

## Current scope

The app includes onboarding, readiness, Guardian, Safety Countdown, Private Risk, Assistance Points, Trusted Circle and press-and-hold SOS flows.

The current build is an interactive app preview. Live location, authentication, durable incidents, notifications and professional response require the connected-alpha backend described in `docs/MOBILE-BACKEND-ARCHITECTURE.md`.

## Product rules

- One primary action: Start protection.
- SOS remains reachable without dominating normal use.
- No permanent tracking by default.
- Assistance Points are operationally described, never blanket-labelled safe.
- An incident must survive the phone.
- No single failure should end the safety chain.
- Concept coverage must never appear as live coverage.
- Brand fundamentals cannot be redefined locally in the mobile repo.

## Documentation

- `docs/CROSS-REPO-DESIGN-CONTRACT.md` — how the website and app stay visually aligned while remaining separate
- `docs/OPEN-SOURCE-TOOLKIT.md` — mobile-specific GitHub/open-source recommendations
- `docs/MOBILE-BACKEND-ARCHITECTURE.md` — offline, API and incident architecture
- `docs/WITHHELP.md` — local product reference snapshot
- `docs/BRAND-GUIDE.md` — local brand reference snapshot; canonical source lives in `Phuturedigital/withhelp`
- `shared/with-brand-contract.json` — mirrored machine-readable design contract
