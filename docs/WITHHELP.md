# WITHHELP / WITH.

> Canonical product source of truth for WITH., a South African personal safety network concept.

**Working product name:** WITH.  
**Repository:** `Phuturedigital/withhelp`  
**Public domain:** `withhelp.co.za`  
**Stage:** Research, interface prototyping, partner discovery and pilot design  

## Product thesis

WITH. is not another panic button.

The product is being designed as a personal safety network that connects systems people already use into one continuity layer:

- phone
- smartwatch
- trusted people
- transport
- nearby staffed businesses
- professional response providers
- emergency services
- recovery and support services

The simple promise is:

> Get me from A to B with someone or something watching, and get me to help quickly if something goes wrong.

The product should remain useful if a user owns no wearable, contributes no community data, never uses AI and cannot pay for a premium subscription.

## Mission

Safety should start before the emergency.

People should not need to become security experts to move through ordinary life. They should not have to know which private security provider covers which road, whether a friend saw a WhatsApp message, which app is still running, or whether one alert was acknowledged.

South Africa already has many useful safety systems. The problem is that they are fragmented.

WITH. is an attempt to connect them earlier and more reliably.

## Core design rule

The system must continue to make useful progress when any single component fails.

No single point of failure should collapse the whole safety chain.

The phone, watch, backend, mapping provider, mobile network, Trusted Circle member, Assistance Point and one response provider are all layers. None of them alone is WITH.

WITH. is the continuity between them.

A non negotiable rule:

> An incident must survive the phone.

If a phone is taken, damaged, switched off or loses signal during an active incident, the server should preserve the last trusted state and continue escalation.

## Protection loop

**Prepare → Guard → Notice → Verify → Act → Reach → Recover → Learn → Prepare**

### Prepare

Check readiness before someone depends on the system:

- battery
- location permission
- mobile connection
- notifications
- Trusted Circle configured
- response coverage where available
- nearby Assistance Points
- destination or countdown configured

### Guard

Protect a defined journey, ride, countdown or private risk period.

### Notice

Meaningful events may include:

- manual SOS
- major route deviation
- missed arrival
- prolonged unexpected stop
- phone and watch separation where technically reliable
- unexpected connectivity loss
- missed scheduled check in

### Verify

Use a discreet question where appropriate, for example:

> Are you okay?

The product must not claim it detected an assault or infer who caused danger.

### Act

Escalation should run in parallel where appropriate:

**Incident → Trusted Circle + professional response + durable incident state**

### Reach

Help the user reach a verified responder, Assistance Point, chosen safe destination, medical support, police or emergency services where needed.

### Recover

The safety system should not end when the incident ends. Potential paths include medical care, trauma support, shelter information, police reporting, protection order guidance, missing person support and an incident timeline.

### Learn

Use carefully governed, anonymised system signals to improve reliability without turning the network into surveillance.

## Protection modes

### Everyday

Normal readiness and nearby support:

- Assistance Points
- protection readiness
- simple community conditions
- personal safety plan
- emergency information

### Guardian

Protect a journey or vulnerable moment:

- walking
- own car
- ride hailing
- taxi
- public transport
- someone else driving
- short Safety Countdown

### Private Risk

For risk involving someone the user knows. The user activates it manually.

The system must not diagnose a relationship or label another person abusive.

Potential features:

- scheduled check ins
- Trusted Circle
- chosen safe destination
- Duress PIN
- Emergency Identification Pack
- important documents
- protection order information
- GBV support resources
- location sharing review
- unknown tracker checks

### Incident

Immediate escalation and continuity:

- incident creation
- durable server state
- last known movement
- Trusted Circle notification
- professional response dispatch
- Assistance Point routing
- recovery workflow

## Guardian Journey

Guardian protects a defined journey.

The user selects a destination, travel mode and Trusted Circle. The phone should perform as much routine analysis locally as possible.

The cloud should not need every raw GPS coordinate to decide that a normal journey is normal.

The phone can compare the current location with the expected route locally, then send lightweight state heartbeats.

Potential heartbeat state:

```json
{
  "session_state": "active",
  "protection_state": "green",
  "battery_percent": 54,
  "watch_connected": true,
  "timestamp": "server_or_device_time"
}
```

## Safety Countdown

A short protection mode for moments such as walking to a car.

Example:

> Watch me for 8 minutes while I walk to my car.

Flow:

**Start countdown → timer expires → discreet check in → safe / help / no response**

Silence during an active protection session must not automatically mean safety.

## SOS and response state

SOS should always be reachable without turning the whole product into a panic screen.

A production incident should move through measurable states:

1. CREATED
2. DELIVERED
3. ACKNOWLEDGED
4. RESPONDER ASSIGNED
5. RESPONDER EN ROUTE
6. RESPONDER ARRIVED
7. USER LOCATED
8. RESOLVED

`Alert sent` is not a successful response outcome.

If acknowledgement does not happen, configured escalation should continue.

## Duress

The product can support two credentials where technically appropriate.

**Normal PIN:** actually cancels.

**Duress PIN:** interface appears cancelled while the incident silently remains active and the control layer marks possible coercion.

This must be configured before an incident.

## Phone loss and offline behaviour

The mobile product should be offline first.

Encrypted local state should include:

- active session
- expected route
- last confirmed heartbeat
- pending events
- protection state
- Trusted Circle references

If connectivity disappears:

1. continue local protection logic
2. queue events locally
3. preserve the last confirmed server state
4. retry intelligently
5. reconcile when connectivity returns

Example event history:

```text
14:05 heartbeat
14:06 heartbeat
14:07 heartbeat
14:08 route deviation
14:09 watch disconnected
14:09 device offline
```

A responder should receive a search corridor and context rather than one stale GPS dot.

Potential connectivity ladder:

**mobile data → Wi Fi → SMS or cellular fallback → emergency voice → future Safety Node → future peer relay → store and retry**

Peer relay and physical Safety Nodes are research directions, not launch promises.

## Verified Assistance Points

An Assistance Point is not automatically a safe place. It is a place with a verified assistance process.

Potential locations include:

- petrol stations
- pharmacies
- hotels
- gyms
- banks
- malls
- universities
- apartment buildings
- 24 hour stores
- restaurants
- security offices

Verification may require:

- location verified
- current staffing status
- monitored area or CCTV where applicable
- emergency procedure
- response connection
- employee training
- remote panic path
- periodic audit

Operational status can be:

- OPEN + STAFFED
- LIMITED
- CLOSED
- UNAVAILABLE

Staff procedure:

1. acknowledge the request
2. move the user to a visible staffed waiting area
3. do not confront a suspected offender
4. contact professional response if required
5. keep the user with staff until handover or safety confirmation
6. close the business side with an outcome code

The business itself should not be able to silently close an active incident.

## Community information

Launch without fake precision.

Do not create a public numeric safety score.

Simple community conditions can include:

- Comfortable
- Caution
- Unsafe

Possible reasons include poor lighting, harassment, isolation or a temporary verified incident.

Do not publish live victim positions, live responder positions, suspect profiles, vigilante feeds or identifiable vulnerable people.

## Professional response

WITH. should remain the technology and intelligence layer rather than building a physical response fleet at launch.

Preferred model:

**WITH. → registered response partner → private security or medical escalation → police or emergency service where needed**

Professional response cost is a major commercial variable and must be proven with real partner quotes.

Do not publish invented response pricing.

## Transport strategy

WITH. must not depend on Uber, Bolt, Apple, Google or one transport provider.

Those systems are adapters into the Safety Network.

V1 asks how the user is travelling:

- Walking
- My car
- Uber
- Bolt
- Taxi
- Train
- Someone driving me

Guardian monitors independently.

Integration direction:

- Google Routes API for expected route, alternatives and ETA
- Uber deep link initially
- approved Riders or Guest Rides integration only when useful
- Bolt Guardian mode without depending on a public API
- WhatsApp secure journey link for Trusted Circle
- Apple Watch and Wear OS for SOS and check ins

## AI

AI should educate, explain and assist with planning.

It should not predict assault, diagnose danger, determine guilt, label a relationship abusive, replace emergency services or create a fake certainty score.

Ask WITH. can explain:

- phone loss
- connectivity loss
- Guardian
- Private Risk
- Assistance Points
- organisational participation
- privacy
- pricing principles

If someone reports immediate danger, the interface should surface existing human emergency routes rather than act as an emergency AI.

## Privacy and anti abuse

Safety cannot become surveillance.

WITH. should not:

- sell individual movement histories
- create a public map of nearby women
- allow secret partner tracking
- show active responder locations publicly
- keep ordinary journey history permanently by default
- allow businesses to see nearby users
- publish vigilante or suspect feeds
- use health signals as proof of assault

Data should be separated by purpose:

- identity
- safety sessions
- incidents
- Assistance Points
- community signals
- marketing and research

Incident evidence should have separate retention rules from normal journey data.

Required controls include TLS, encryption at rest, encrypted local storage, RBAC, RLS, sensitive access audit logs, signed QR tokens, temporary and revocable Trusted Circle sharing and purpose limited access.

POPIA and relevant private security regulation require legal review before production launch.

## Website

The website is intentionally multi page rather than one long landing page.

Routes:

- `/` — value proposition and network overview
- `/mission` — why the product exists
- `/how-it-works` — protection modes and continuity
- `/assistance-points` — physical help model
- `/organisations` — B2B and partner participation
- `/trust` — privacy, AI and anti abuse boundaries
- `/join` — research and pilot intake
- `/app` — clickable phone prototype

Brand direction:

- warm cream = ordinary life
- black = serious system information
- lime = protected, ready, confirmed
- coral = attention and emergency action

The product should feel calm enough to live on a phone every day. It should not look like a police app, security company app, medical dashboard, panic button app or AI dashboard.

## Current mobile prototype

The clickable phone prototype includes:

- Home
- protection readiness
- Start protection
- Guardian setup
- Guardian active state
- Safety Countdown
- Private Risk
- Assistance Points
- Trusted Circle
- readiness and privacy
- SOS press and hold
- incident demo

The prototype has no live tracking, dispatch or emergency response.

## Backend strategy

The phone app does not require Supabase specifically. It does require durable backend state.

### On device

The phone should handle GPS collection, local route comparison, countdown timing, local protection state, watch connection state, encrypted offline queueing and degraded mode messaging.

### Backend

The backend should hold shared durable state for users, Trusted Circle, devices, safety sessions, heartbeats, incidents, incident events, Assistance Points, response dispatches and audit history.

### Push and messaging

Push is separate infrastructure:

- Apple Push Notification Service for iOS
- Firebase Cloud Messaging for Android

Other channels can include WhatsApp, SMS, voice and professional responder APIs.

## Supabase separation

Supabase is a good V1 backend because the product needs relational data, Auth, Row Level Security, Edge Functions and durable state.

However the current Supabase project is a **research and marketing database** for waitlist and pilot recruitment.

It must not casually become the live safety telemetry database.

Preferred separation:

```text
WITH website
  → Research / Marketing Supabase
  → waitlist_submissions

WITH mobile app
  → Production Safety API
  → Separate Production Safety database
  → users
  → trusted_contacts
  → devices
  → safety_sessions
  → session_heartbeats
  → incidents
  → incident_events
  → assistance_points
  → response_dispatches
```

Live safety telemetry is materially more sensitive than a waitlist email address.

## Business model

Core safety target: **R0**.

Core protection should not disappear because somebody cannot pay in a particular month.

Potential funding:

- employer sponsorship
- universities and campuses
- banks and insurers
- property groups
- retail and precinct partners
- optional professional response coverage
- corporate Assistance Network dashboards, training, audits and SLA products

The principle is:

> Low consumer price does not mean low revenue per protected person.

Professional response should be priced only after wholesale partner economics and coverage are proven.

## Lean Johannesburg pilot

Start in one dense Johannesburg corridor rather than launching nationally.

Working pilot shape:

- 100 to 300 invited users
- 20 to 50 Assistance Points
- one professional response partner
- phone fully functional
- watch optional if it does not delay the pilot

Test:

- day and night journeys
- walking
- ride hailing
- own car
- countdowns
- low battery
- network loss
- route deviation
- missed check in
- phone and watch separation
- Assistance Point arrival
- false alarms

Three critical validation questions:

1. Will real users voluntarily start Guardian or Countdown sessions?
2. Will businesses join and follow the Assistance Point procedure?
3. Can one professional response partner reliably receive, acknowledge and act?

If those fail, AI and custom hardware do not fix the product.

## Metrics

North star:

**Protected journeys successfully completed.**

Supporting metrics:

- weekly active protected users
- protected sessions per user
- successful session completion
- check in response rate
- false escalation rate
- SOS delivery rate
- responder acknowledgement time
- Assistance Point status accuracy
- QR arrival confirmations
- 30 day return rate

## Kill criteria

Reconsider or stop if:

- users do not voluntarily start protection sessions
- alert fatigue becomes unacceptable
- Assistance Point status is inaccurate
- professional response is unreliable
- the product is perceived as invasive surveillance
- battery impact is unacceptable
- regulatory operation is not viable
- the product offers no meaningful value above existing safety apps

## Roadmap

### Stage 0 — validation

Prototype, user interviews, business interviews, professional response quotes, legal review and pilot design.

### Stage 1 — lean V1

Phone app, Guardian, Safety Countdown, SOS, Trusted Circle, rule based anomaly checks, 20 to 50 Assistance Points, signed QR arrival, one response integration, basic community conditions and optional watch trigger.

### Stage 2 — reliability

Stronger watch support, Duress PIN, richer transport modes, offline and SMS fallback, NFC, incident vault and stronger anti abuse systems.

### Stage 3 — network intelligence

Route confidence, corridors, hotspot aggregation, institution dashboards, response performance analytics and governed network intelligence.

### Stage 4 — physical network

Safety Nodes, proven peer relay, telco partnerships, optional hardware and national sponsorship only after the software and response loop are validated.

## Non negotiable rules

1. Safety starts before the emergency.
2. The incident survives the phone.
3. Silence during active protection does not automatically mean safety.
4. No single component is allowed to become the whole safety system.
5. Danger response should be parallel where possible.
6. Assistance Points are verified processes, not blanket claims that a location is safe.
7. Businesses do not see nearby users or normal journey histories.
8. AI does not claim to predict assault.
9. Core protection should remain affordable and target free access.
10. The product should still work without a smartwatch.
11. The product should still be valuable before network effects exist.
12. Marketing data and production safety telemetry remain separate.
13. Response pricing is not published until partner economics are proven.
14. Privacy is part of the safety architecture, not a legal footer.
15. The first job is to prove the loop, not to build every possible feature.
