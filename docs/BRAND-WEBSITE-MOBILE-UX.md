# WITH. Brand, Website and Mobile UX

## Brand position

WITH. should feel calm, human, credible and useful before it feels technical.

It should not use fear as the primary acquisition strategy.

The central brand thought is:

> Safety should start before the emergency.

The name works because safety should not mean being alone:

- with your people
- with nearby help
- with the devices you already use
- with professional response where available
- with a network that keeps going when one layer fails

## Tone

Use language that is:

- calm
- factual
- transparent
- plain
- South African without forcing slang
- serious without sounding militarised
- useful without pretending the system is already live

Avoid:

- fear driven imagery
- dramatic crime language
- claims that WITH. keeps someone safe
- fake statistics
- fake partner logos
- fake safety scores
- invented response times
- claims that AI predicts danger

## Visual system

### Warm cream

Everyday life and calm default state.

Suggested base: `#f5f2ea`.

### Near black

Serious system information and strong actions.

Suggested base: `#111417`.

### Coral

Attention, activation and emergency action.

Suggested base: `#ff6248`.

### Lime

Protected, ready, confirmed, acknowledged.

Suggested base: `#c8f678`.

## Photography

Use real people in ordinary environments:

- friends walking
- commuting
- working
- leaving a building
- waiting for transport
- moving through a campus
- entering a staffed business

Do not build the brand around images of women looking terrified, dark alleys, hands over mouths, weapons or staged attacks.

The product is about preserving freedom and ordinary movement, not visually rehearsing violence.

## Website information architecture

The website is deliberately multi page.

### Home `/`

Job: explain the value in under a minute.

Primary messages:

- Safety should start before the emergency.
- WITH. connects things people already use.
- It is not another panic button.
- One failure should not end the safety chain.
- The product is still in research and prototype stage.

Primary calls to action:

- Join early
- See how it works
- Open phone prototype

### Mission `/mission`

Job: explain why WITH. exists.

Core thought:

> South Africa does not have zero safety infrastructure. It has fragmented safety infrastructure.

Explain that emergency services, private security, support organisations, phones, watches, businesses and communities already exist. WITH. attempts to connect them earlier and more reliably.

### How it works `/how-it-works`

Job: teach the protection logic.

Explain:

- Everyday
- Guardian
- Private Risk
- Incident
- Safety Countdown
- incident state
- server continuity
- degraded connectivity

Keep the language user facing. The detailed architecture belongs in technical documentation.

### Assistance Points `/assistance-points`

Job: explain physical help.

Never call an Assistance Point a guaranteed safe place.

Use:

> A place with a verified assistance process.

Explain current staffing status, staff procedure, periodic verification, response connection and the fact that a business cannot close an active incident.

### Organisations `/organisations`

Job: become the commercial funnel.

Audiences:

- employers
- universities
- banks
- insurers
- property groups
- security and response providers
- community and GBV organisations

Explain sponsorship, Assistance Networks, response integration and privacy boundaries.

### Trust `/trust`

Job: make privacy and anti abuse design part of the product.

Explain:

- no public map of nearby women
- no secret partner tracking
- no sale of individual movement history
- minimal retention
- separate incident evidence
- AI boundaries
- marketing data separate from safety telemetry

### Join `/join`

Job: collect real research and partnership interest.

Current fields:

- first name
- last name
- email
- optional phone
- city or area
- role
- optional message
- explicit contact consent

The live form uses the WITH. Supabase research project and validated Edge Function.

## Ask WITH.

The website includes a constrained product educator.

Current prototype topics:

- phone stolen
- no data
- watch use
- Private Risk
- Assistance Points
- privacy
- pricing
- mission
- organisations

Immediate danger language should interrupt product education and surface existing emergency resources.

A future LLM version must be guarded and should retain the same emergency boundary.

## Mobile product principles

### One primary action

The home screen should not expose the whole architecture.

Primary action:

> Start protection

Then ask the closest real world context:

- Going somewhere
- Taking a ride
- Short vulnerable moment
- Private Risk

### Home answers three questions

1. Am I ready?
2. What do I want protected?
3. Where is help?

### SOS is reachable but not dominant

SOS should be persistently accessible without turning every screen red.

A press and hold interaction can reduce accidental activation.

## Current phone prototype

Route: `/app`

### Home

Shows:

- You are ready
- protection readiness
- Start protection
- 10 minute check in
- Private Risk
- Nearby help
- Trusted Circle
- last protected moment

### Start protection

Options:

- Going somewhere
- Taking a ride
- Short vulnerable moment
- Private Risk

### Guardian setup

Collect only what is needed:

- destination
- travel mode
- Trusted Circle readiness

### Guardian active

The interface changes to a focused protected state:

> You are being watched over.

Show:

- destination
- expected arrival
- connection
- last heartbeat
- Trusted Circle
- nearby help
- I arrived safely
- Find nearby help

### Safety Countdown

Choose:

- 5 minutes
- 10 minutes
- 15 minutes
- 30 minutes

Show a quiet timer and two completion actions:

- I am safe
- Add 5 minutes

When it expires:

> Are you okay?

Possible outcomes:

- I am okay
- I need help
- no response

### Private Risk

Keep the interface visually quiet.

Potential controls:

- next check in
- safe place
- Trusted Circle
- Duress PIN
- temporary location sharing
- Emergency Identification Pack

Never imply the app is monitoring another person.

### Assistance Points

Show nearby places with:

- category
- distance
- current operational status
- verification note
- Navigate
- Details

Use `OPEN + STAFFED` rather than `SAFE`.

### Trusted Circle

Make the sharing rules visible:

- only during protection
- arrival updates
- emergency escalation

No continuous family or partner tracking by default.

### Readiness

Show protection dependencies clearly:

```text
Location access      Ready
Notifications        Ready
Trusted Circle       Ready
Watch                Not paired
```

A user should know when protection is degraded before starting a journey.

## Onboarding direction

The next interface pass should focus on the first 30 seconds after installation.

Goal:

Get a new user to the first successful protected moment without making setup feel like a security form.

Suggested onboarding:

1. Explain the simple promise in one screen.
2. Request notification permission with context.
3. Request location permission only with clear active protection purpose.
4. Add one Trusted Circle person.
5. Set Home or a first destination optionally.
6. Show SOS behavior without triggering anything.
7. Start a two minute practice Countdown.
8. Confirm first successful protected session.

## Accessibility

Safety flows must remain usable under stress.

Requirements:

- large tap targets
- high contrast
- screen reader labels
- limited text during incident state
- no dependence on colour alone
- haptics where useful
- simple language
- important status visible without scrolling
- accessible emergency actions

## Anti pattern list

Do not turn the app into:

- a dashboard full of cards
- a crime map
- a constant live tracker
- a social feed
- a security company control panel
- an AI chat product with safety features attached
- a gamified points system
- an anxiety generating warning stream

The product should feel normal when life is normal, focused when protection is active, and unambiguous when an incident begins.
