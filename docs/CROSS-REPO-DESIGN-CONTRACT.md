# WITH. Cross Repository Design Contract

WITH. intentionally uses two repositories with different responsibilities:

- `Phuturedigital/withhelp` — website, public brand, storytelling, concept visuals, partner and research surfaces
- `Phuturedigital/withhelp-app` — production mobile app, native interface, device integrations and safety interactions

They must remain separate in deployment and code ownership, but they must operate as one product system.

## Canonical source

The website repository owns the canonical brand system:

- `docs/BRAND-GUIDE.md`
- `docs/INFOGRAPHIC-CONCEPT-DIRECTION.md`
- `shared/with-brand-contract.json`

This repository mirrors `shared/with-brand-contract.json`.

## Mobile responsibility

The app owns:
- native navigation
- touch and gesture behaviour
- permissions
- haptics
- background location implementation
- native notifications
- local encrypted storage
- offline queueing
- device and watch integrations
- mobile incident-state presentation
- mobile end-to-end tests

It does not independently redefine the brand.

## What must remain identical

Across website and app:

- `WITH.` name
- primary tagline
- feature names
- colours
- semantic meaning of coral, lime, cream and near-black
- trust and privacy language
- Assistance Point terminology
- concept-versus-live disclosure rules
- protected / attention / incident / recovery state meaning

## What may differ

The app may use:
- native sheets
- platform navigation patterns
- haptics
- larger stress-safe tap targets
- platform-specific permission prompts
- native maps
- shorter incident copy

Those adaptations must preserve the same underlying meaning.

## Contract update flow

1. Update the canonical brand guide in `Phuturedigital/withhelp`.
2. Update `withhelp/shared/with-brand-contract.json` and increment `contractVersion`.
3. Mirror the identical JSON into this repository.
4. Update mobile design tokens/components.
5. Run Storybook and mobile regression tests.
6. Review website and app side by side before release.

## Product language

Use exactly:
- Guardian
- Safety Countdown
- Private Risk
- Trusted Circle
- Assistance Point
- SOS

Do not introduce alternate product names locally.

## Design state contract

### Everyday
Calm, ordinary, low urgency.

### Protected
Focused and reassuring. Lime is used for ready, active and confirmed states.

### Attention
Coral means something needs attention or protection is degraded.

### Incident
The interface becomes minimal and unambiguous. Coral is the escalation accent, not decoration.

### Recovery
Return to calm surfaces with factual support and handoff information.

## Principle

Separate codebases. One brand system. One product language. One trust model.
