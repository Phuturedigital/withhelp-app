# WITH. Mobile Open Source Toolkit

This repository owns the production mobile application. The projects below are recommended because they solve mobile-specific needs without redefining the WITH. brand or safety model.

The website has its own visualization stack in `Phuturedigital/withhelp/docs/WEBSITE-OPEN-SOURCE-STACK.md`.

## Already in use

| Project | GitHub | Role |
| --- | --- | --- |
| Expo | https://github.com/expo/expo | Cross-platform React Native runtime, native modules and build workflow |
| React Native | https://github.com/facebook/react-native | Native iOS and Android UI foundation |
| Lucide | https://github.com/lucide-icons/lucide | Consistent interface icons |
| React Native SVG | https://github.com/software-mansion/react-native-svg | Vector rendering |
| Supabase | https://github.com/supabase/supabase | Research backend today; possible production backend boundary later |

## Core production recommendations

### Expo

Repository: https://github.com/expo/expo

Decision: **keep**.

WITH. already uses Expo and React Native. Continue using Expo as the application platform rather than moving to Flutter or rebuilding separately for iOS and Android.

Use for:
- iOS and Android builds
- permissions
- notifications
- location modules
- secure storage integrations
- build and release workflows
- web preview where useful

### Ignite

Repository: https://github.com/infinitered/ignite

Decision: **use as the architecture benchmark, not as a destructive re-bootstrap of the existing app**.

Ignite is a battle-tested React Native project boilerplate with established conventions for project structure, theming, persistence, testing and navigation.

Because `withhelp-app` already exists, do not throw away the current app simply to generate a new Ignite project. Adopt its useful patterns deliberately:

- screen/component structure
- theme organization
- navigation boundaries
- persistence patterns
- testing discipline
- generators/conventions where useful

If the app is ever restarted before production, Ignite is the preferred bootstrap candidate.

### Storybook for React Native

Repository: https://github.com/storybookjs/react-native

Decision: **adopt early**.

Use Storybook to review components and safety states independently of the full app.

Required story families should eventually include:

- buttons: normal / pressed / disabled / loading
- Start protection
- Guardian: setup / ready / active / degraded / complete
- Safety Countdown: running / expiring / expired / check-in
- Private Risk: inactive / scheduled / active
- Assistance Point: illustrative / available / limited / closed
- Trusted Circle: ready / unreachable / removed
- SOS: idle / holding / activated
- incident: created / delivered / acknowledged / responder assigned / en route / arrived / resolved
- connectivity: online / degraded / offline / reconciling

Storybook is also where the mirrored WITH. brand contract should be visually tested.

### React Native Reanimated

Repository: https://github.com/software-mansion/react-native-reanimated

Decision: **adopt for meaningful native motion**.

Use for:
- Guardian activation transition
- protected-state feedback
- countdown motion
- bottom sheets and native-feeling transitions
- discreet attention states

Rules:
- motion must clarify state
- no gamification
- no decorative emergency animation
- respect reduced-motion settings

### MapLibre React Native

Repository: https://github.com/maplibre/maplibre-react-native

Decision: **preferred native map renderer**.

Use for:
- Guardian route display
- Assistance Point maps once real pilot data exists
- route corridors
- current location during active protection

The app must distinguish illustrative, pilot and verified operational data. Concept Assistance Points must never appear as live operational help.

### Turf.js

Repository: https://github.com/Turfjs/turf

Decision: **evaluate for shared geospatial calculations**.

Potential use:
- route deviation
- distance calculations
- corridor geometry
- proximity to Assistance Points

Safety-critical thresholds remain WITH. application logic and must be tested independently of the visualization layer.

### Maestro

Repository: https://github.com/mobile-dev-inc/Maestro

Decision: **adopt as the primary end-to-end mobile UI test layer**.

Maestro can drive Android and iOS flows with readable test definitions.

Priority flows:

1. onboarding
2. permission setup
3. add Trusted Circle contact
4. start Guardian
5. complete Guardian safely
6. start Safety Countdown
7. countdown check-in
8. activate Private Risk
9. SOS press-and-hold
10. offline/degraded-state messaging

For a safety product, key paths should become repeatable tests rather than manual demo steps.

## Optional recommendations

### gluestack-ui

Repository: https://github.com/gluestack/gluestack-ui

Decision: **optional**.

Use only if its copy-paste components materially accelerate implementation. WITH. has a custom design language, so do not allow a UI kit to dictate the brand.

Prefer the smallest component surface necessary and apply `shared/with-brand-contract.json` tokens.

### React Native Skia

Repository: https://github.com/Shopify/react-native-skia

Decision: **optional and later**.

Potential use:
- high-performance countdown visuals
- custom journey visualizations
- network graphics
- specialized animated status graphics

Do not introduce Skia for ordinary UI that standard React Native can render well.

## Local persistence

Potential options must be evaluated against encryption and incident requirements.

Candidates may include SQLite or MMKV for non-sensitive state, but sensitive safety information needs a defined encryption and retention design before implementation.

Do not assume a fast local database is automatically appropriate for incident evidence.

## Monitoring

Crash and performance monitoring is appropriate only with strict data scrubbing.

Never send raw journey coordinates, private-risk notes, incident evidence, Trusted Circle information or authentication secrets to generic telemetry by default.

## Design-system rule

Canonical contract:

`https://github.com/Phuturedigital/withhelp/blob/version_4/shared/with-brand-contract.json`

Local mirror:

`shared/with-brand-contract.json`

The app may implement native components differently from the website, but it may not redefine the meaning of the brand tokens.

## Adoption order

Do not install everything at once.

Recommended order:

1. keep Expo / React Native
2. introduce a structured app architecture inspired by Ignite
3. add Storybook
4. centralize design tokens from the shared brand contract
5. add Reanimated
6. add Maestro tests for existing safety flows
7. add MapLibre React Native when real map interaction is required
8. add Turf for tested geospatial calculations
9. evaluate gluestack only when it saves meaningful component work
10. add Skia only for graphics standard React Native cannot handle cleanly

## Selection rule

Before adopting any dependency, review:

- maintenance activity
- licence
- security posture
- React Native and Expo compatibility
- New Architecture compatibility
- accessibility
- offline behaviour
- bundle/runtime impact
- whether it becomes a single point of failure

Safety-critical state remains owned by WITH. application logic, not by a UI, map, animation or analytics library.
