# WITH. open-source visual and product toolkit

These projects are recommended building blocks for WITH. They should support the brand system and product rules rather than dictate them.

## In use

| Project | GitHub | Role |
| --- | --- | --- |
| Expo | [expo/expo](https://github.com/expo/expo) | One React Native codebase for Android, iOS and web |
| React Native | [facebook/react-native](https://github.com/facebook/react-native) | Native cross-platform UI foundation |
| Lucide | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) | Consistent interface and website icons |
| React Native SVG | [software-mansion/react-native-svg](https://github.com/software-mansion/react-native-svg) | Vector icon rendering in the mobile app |
| Supabase | [supabase/supabase](https://github.com/supabase/supabase) | Waitlist today and a possible durable backend boundary for the connected alpha |

## Recommended for diagrams and explanation

| Project | GitHub | Best use |
| --- | --- | --- |
| Mermaid | [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | Version-controlled architecture, incident-state and sequence diagrams in documentation |
| React Flow | [xyflow/xyflow](https://github.com/xyflow/xyflow) | Interactive network and protection-flow explainers when static diagrams are no longer enough |
| Rough.js | [rough-stuff/rough](https://github.com/rough-stuff/rough) | Human, illustrative diagram accents; use sparingly and never for live operational states |
| D3 | [d3/d3](https://github.com/d3/d3) | Bespoke network-growth and coverage visualisations once real governed data exists |

## Recommended for mobile capability

| Project | GitHub | Best use |
| --- | --- | --- |
| MapLibre React Native | [maplibre/maplibre-react-native](https://github.com/maplibre/maplibre-react-native) | Map rendering without coupling the product to one commercial map renderer |
| Turf | [Turfjs/turf](https://github.com/Turfjs/turf) | On-device corridor, distance and route-deviation calculations |
| Expo Notifications | [expo/expo](https://github.com/expo/expo) | APNs and FCM notification integration through Expo modules |
| WatermelonDB | [Nozbe/WatermelonDB](https://github.com/Nozbe/WatermelonDB) | Evaluate for offline-first local records and event queues; encryption still needs a separate design |
| Sentry React Native | [getsentry/sentry-react-native](https://github.com/getsentry/sentry-react-native) | Crash and performance monitoring with strict sensitive-data scrubbing |

## Styling guidance

- Keep the current warm cream, near-black, coral and lime brand palette.
- Use Lucide icons instead of custom SVG controls.
- Keep consumer diagrams simple and explanatory; Mermaid is preferred for technical documentation.
- Do not introduce a utility CSS framework solely to restyle the current website.
- If the website moves to a component framework, evaluate [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) or CSS Modules, but retain brand tokens as the source of truth.
- Never visualize fake live coverage, response times, safety scores or partner availability.

## Selection rule

Before adopting a project, review its maintenance activity, licence, security posture, bundle impact, offline behaviour and accessibility. Safety-critical state must remain owned by WITH. application logic rather than a visualisation library.
