# WITH. mobile app

Cross-platform mobile application for WITH., built with Expo, React Native and TypeScript.

> Safety should start before the emergency.

## Platforms

One source codebase targets:

- Android
- iOS
- web preview

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
- Assistance Points are `OPEN + STAFFED`, never labelled safe.
- An incident must survive the phone.
- No single failure should end the safety chain.

## Documentation

- `docs/WITHHELP.md` — product source of truth
- `docs/BRAND-GUIDE.md` — brand and language system
- `docs/BRAND-WEBSITE-MOBILE-UX.md` — mobile interaction guidance
- `docs/MOBILE-BACKEND-ARCHITECTURE.md` — offline, API and incident architecture
