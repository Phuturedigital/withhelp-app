# WITH. Safety Automation and Operating Model

## Decision

WITH. should use deterministic automation as the default intelligence layer.

The product should not make people manually coordinate every safety step, and it should not depend on generative AI to decide whether someone is in danger.

The operating rule is:

> **State machine first. Timers and rules second. Human judgement third. AI only where explanation or low-risk assistance adds value.**

This model is designed to address the main risks in the WITH. concept: activation friction, false alarms, alert fatigue, Assistance Point drift, response-provider dependency, unsafe confidence, network cold start, adversarial misuse and operational cost.

---

# 1. What WITH. is solving

A person should not have to coordinate a phone, friends, security companies, businesses, emergency services and support organisations while stressed.

WITH. should make one protected moment easier to start and allow deterministic automation to carry routine coordination until human help is actually needed.

The V1 promise is deliberately narrow:

> **Start protection for a journey or vulnerable moment. If the expected pattern changes, WITH. checks, preserves context and moves the safety process forward through the paths that are actually available.**

WITH. does not promise to predict violence or guarantee prevention.

---

# 2. The automation principle

## Do automatically

Automation should handle repeatable facts and time-based rules:

- readiness preflight
- session start and expiry
- expected arrival windows
- Safety Countdown expiry
- heartbeat freshness
- connectivity degradation
- sustained route deviation reported by the device
- check-in timers
- duplicate-event rejection
- notification retries
- stale Assistance Point status
- response acknowledgement timers
- provider retry/fallback rules where contracts permit them
- incident state reconciliation
- audit events

## Do not automate as a guess

WITH. should not automatically infer that an assault is happening from:

- heart rate
- a single GPS deviation
- a missed heartbeat alone
- unusual speed alone
- silence alone
- relationship metadata
- an AI risk score

These may change the product state or trigger a check, but they should not independently create a claim of danger.

---

# 3. Three-layer intelligence model

```text
ON DEVICE
fast, local, battery-aware rules
        |
        v
SUPABASE SAFETY BACKEND
state machine + timers + durable incident state
        |
        v
HUMAN / PROFESSIONAL RESPONSE
only when the state actually requires human judgement or physical intervention
```

## Layer 1: on-device automation

The phone should do routine work locally when practical:

- maintain Guardian and Countdown timers
- compare movement with the expected route using conservative thresholds
- recognise connectivity loss
- queue events while offline
- preserve encrypted session state
- show degraded protection honestly
- prompt the user before escalating ambiguous situations

This limits cloud cost, protects privacy and allows the experience to continue during poor connectivity.

## Layer 2: durable backend automation

Supabase should hold canonical shared state for active sessions and incidents.

Use:

- PostgreSQL for durable state
- Edge Functions for authenticated safety API operations
- database triggers for immediate state transitions
- Supabase Queues / pgmq for retryable notification and dispatch work
- Supabase Cron / pg_cron for watchdogs and reconciliation
- pg_net for asynchronous HTTP calls where appropriate
- Vault for backend secrets
- Realtime Broadcast for private state updates to authorised clients

Cron is a watchdog, not the emergency engine. Immediate events should be handled event-first; Cron catches missed deadlines and repairs stalled workflows.

## Layer 3: human escalation

Human or professional judgement should enter when:

- the user explicitly requests help
- a duress action is used
- a check-in remains unanswered after the configured escalation path
- a response provider must accept or reject a dispatch
- an Assistance Point staff member receives someone
- a trusted person needs to make a judgement call

---

# 4. Session states

Use a small explicit state machine.

```text
CREATED
READY
ACTIVE
CHECK_REQUIRED
ESCALATING
INCIDENT_ACTIVE
COMPLETED_SAFE
CANCELLED
EXPIRED
```

No hidden states should be presented as successful protection.

The UI should separately show the current capability state:

```text
Protection active + connected
Protection active + degraded connection
Local protection only
Professional response unavailable in this area
Protection unavailable
```

Never show a reassuring green state when a critical dependency is missing.

---

# 5. Incident states

```text
CREATED
DELIVERED
ACKNOWLEDGED
RESPONDER_ASSIGNED
RESPONDER_EN_ROUTE
RESPONDER_ARRIVED
USER_LOCATED
RESOLVED
```

`Alert sent` is not success.

The user and authorised participants should be able to distinguish:

- WITH. created the incident
- a notification was delivered
- a person or control room acknowledged it
- a responder was assigned
- a responder is actually moving

---

# 6. Automation recipes

## Guardian journey

1. User chooses destination and travel mode.
2. Preflight checks permissions, connectivity, battery and available support paths.
3. WITH. starts the session even if some optional layers are unavailable, but labels the degraded state clearly.
4. Device evaluates route locally.
5. Normal variation does nothing.
6. A sustained meaningful deviation triggers `CHECK_REQUIRED`, not an incident.
7. User receives a discreet check.
8. Safe confirmation returns the session to `ACTIVE` or completes it.
9. Help request or configured unanswered-check path moves to escalation.
10. Arrival closes the routine protection session.

## Safety Countdown

1. User chooses the duration.
2. Device maintains the timer locally.
3. Backend stores the expected expiry.
4. At expiry, the app asks for a simple confirmation.
5. Safe closes the session.
6. Help creates escalation.
7. No response follows a configured staged escalation path.

## SOS / duress

Explicit SOS and duress are stronger signals than route anomalies.

They may create an incident immediately and enqueue the authorised notification/response paths without waiting for an additional risk score.

## Lost phone

A missed heartbeat alone should not automatically dispatch armed response.

Instead:

- if the session is otherwise normal, mark connectivity degraded and continue local/server timers;
- if a check was already required, continue that escalation timer;
- if an incident already exists, the incident remains active server-side;
- if the user used SOS/duress before loss, that explicit signal remains authoritative.

Destroying the phone must not destroy the incident.

---

# 7. Reducing false alarms

False alarms are a product risk, an operational risk and a cost risk.

Use staged escalation.

## Stage A: observe

Conservative device rules identify something worth checking.

Examples:

- sustained route deviation
- expected arrival missed beyond grace
- Countdown expiry

## Stage B: ask

The user receives one simple question:

> Are you okay?

Actions:

- I am safe
- I need help
- discreet duress path

## Stage C: trusted support

If configured and appropriate, notify the selected Trusted Circle according to the user's plan.

## Stage D: professional response

Professional dispatch should happen only when the product has an authorised contractual path and the triggering conditions are defined for that pilot.

Do not hide the distinction between trusted-person support and professional response.

Thresholds should be remotely configurable per mode/pilot. Do not hard-code one national rule before field evidence exists.

---

# 8. Trusted Circle without alert fatigue

The Trusted Circle should not receive routine noise by default.

Recommended defaults:

- no notification for every normal GPS update
- optional notification when Guardian starts
- arrival notification only if the user chooses it
- alert for meaningful check-required escalation
- immediate notification for SOS/duress according to plan
- incident status changes only when materially useful

A person who receives ten unnecessary notifications will ignore the eleventh.

---

# 9. Assistance Points that do not become false promises

Do not treat `verified` as a permanent binary badge.

Model at least three separate facts:

```text
ORGANISATION VERIFIED
LOCATION VERIFIED
CURRENTLY OPERATIONAL
```

An Assistance Point should have:

- verified organisation/site identity
- coordinates
- hours
- current staffing declaration
- training/procedure version
- last operational confirmation
- escalation path
- periodic audit date
- response connection where applicable

## Fail closed when stale

Automation should expire operational status.

Example rule:

- site has not refreshed its operating status within the allowed window -> do not present it as currently staffed
- training/procedure expired -> site remains listed only if the product can clearly show that it is not currently verified for active assistance
- repeated failed acknowledgements -> automatically suspend the site from active Assistance Point routing pending review

The system should prefer one honestly available location over ten stale pins.

---

# 10. Assistance Point staff procedure

Keep the staff job small.

Staff should:

1. acknowledge the person
2. move them to a visible staffed area
3. follow the defined escalation process
4. avoid confrontation
5. support handover

Staff should not:

- chase a suspected offender
- investigate the incident
- access wider movement history
- decide an active WITH. incident is resolved without the authorised process

---

# 11. Response providers are adapters, not interchangeable commodities

WITH. should not assume every security company can receive every incident.

Each provider integration needs explicit attributes:

- geographic coverage
- operating hours
- incident types accepted
- acknowledgement SLA
- dispatch API/control-room method
- pricing/wholesale rules
- fallback permissions
- data fields required
- escalation contact

Provider selection should be deterministic:

```text
incident location
+ provider coverage
+ provider availability
+ contract eligibility
+ incident type
= eligible provider set
```

Fallback to another provider only where contracts and operational rules permit it.

---

# 12. Queue every external side effect

Do not make a user-facing database transaction wait for an SMS gateway, push provider or responder API.

Use queues for:

- push notifications
- SMS fallback
- email where needed
- Trusted Circle delivery
- responder dispatch attempts
- webhook callbacks
- partner status updates

Every message should have:

- immutable job ID
- incident/session ID
- idempotency key
- attempt count
- next retry time
- provider
- last error

Failures should retry with bounded backoff and move to an operator-visible dead-letter path after the configured attempt limit.

---

# 13. Cron jobs WITH. actually needs

Use Cron for reconciliation and expiry rather than primary emergency action.

Suggested jobs:

## Every minute

- find sessions whose expected milestone has passed
- move eligible sessions into `CHECK_REQUIRED`
- advance unanswered checks whose grace period expired
- find incidents waiting too long for provider acknowledgement
- enqueue allowed fallback actions

## Every five minutes

- reconcile stuck queue jobs
- identify operational Assistance Points whose freshness window expired
- refresh derived network health metrics

## Daily

- expire stale Assistance Point verification states
- generate pilot operating summaries
- review unresolved incident/dispatch anomalies
- enforce routine retention policies

Supabase recommends keeping Cron jobs short and limiting concurrent jobs. Complex work should enqueue messages or invoke an Edge Function rather than doing everything inside the scheduled SQL transaction.

---

# 14. Realtime usage

Use private Realtime Broadcast for user/session status updates where low latency improves the experience.

Do not stream every raw GPS coordinate to every participant.

Broadcast small state changes such as:

- session active
- check required
- trusted contact acknowledged
- incident created
- responder assigned
- responder en route
- safe arrival

Location sharing should remain purpose-bound to the active protection event and authorised participant.

---

# 15. Activation friction: make automation think enough for the user

WITH. fails if users must remember too much.

The app should reduce cognitive work with deterministic shortcuts:

- recent destinations
- saved safe places
- one-tap Guardian from the home screen
- Lock Screen / Action Button / watch shortcuts where supported
- suggested duration based on the route ETA the user selected
- automatic arrival prompt when the destination geofence is reached
- automatic session completion after safe confirmation
- reminders for routines the user explicitly chooses

Do not silently start location protection because the system thinks a person might be at risk.

User agency remains the start boundary.

---

# 16. Cold-start strategy

Do not launch nationally as a thin network.

Launch for density.

Recommended first operating unit:

- one Johannesburg corridor / precinct
- 100-300 invited users
- 20-50 real Assistance Points
- one contracted professional response partner
- a small set of participating employers/campuses/properties

A dense useful network in one area is more valuable than thousands of scattered pins.

Expansion gate:

> Do not open the next area until the current area meets the agreed activation, Assistance Point readiness and response reliability thresholds.

---

# 17. What a new person actually adds

Do not claim that app downloads automatically make an area safer.

People strengthen the network in specific ways:

- a new Trusted Circle relationship creates another human support path
- pilot participation creates demand evidence
- voluntary feedback identifies coverage gaps
- community participation creates local legitimacy
- people can invite organisations and places they trust to participate

Physical safety coverage improves only when infrastructure and response capacity grow too.

Public wording should therefore say:

> **More people standing together can help the network grow. Better coverage comes when people, places and responders participate together.**

---

# 18. Business and partner incentive design

A partner should receive real value for participating.

Examples:

## Gym

Can contribute:

- Assistance Point
- venue
- self-defence classes delivered by credible instructors
- safety workshops
- sponsored class places

Can receive:

- visibility as a participating location
- community relevance
- class demand
- partnership opportunities

WITH. should connect or subsidise credible programmes rather than becoming the self-defence training operator itself.

## Retail / hospitality

Can contribute staffed places and a receiving procedure.

## Security provider

Can contribute response capacity and gain additional contracted demand.

## Employer / university / bank / insurer / property group

Can fund access or defined programmes and strengthen safety around populations they already serve.

## NGO

Can contribute specialist prevention, shelter, counselling, legal or survivor-support pathways.

## Government

Can later connect public facilities, emergency services and programmes. Government must not be required for V1 to function.

---

# 19. Commercial model guardrails

WITH. can be a profitable business and still operate ethically.

Internal principle:

> **Keep personal access as close to R0 as sustainable, keep the cost base efficient, charge organisations/partners in ways that scale, and reinvest enough into reliability, coverage and community value that growth improves the network.**

Do not make public pricing promises before real support, response and operating costs are known.

Do not bundle unlimited physical response into a very low software price without contracted wholesale economics.

Profit funds:

- engineering
- product
- safety operations
- cybersecurity
- support
- Assistance Point verification
- response integrations
- geographic expansion
- credible prevention/recovery partnerships

The website should explain the problem, solution and participation model. Detailed unit economics stay internal.

---

# 20. Prevent mission sprawl

WITH. should not become a gym, counselling practice, shelter operator, law firm and security fleet.

Operating rule:

> **Connect, fund or distribute before building a new service.**

Self-defence, counselling, shelters, legal services and specialist GBV programmes should be delivered by credible partners where possible.

WITH.'s core competence is the safety coordination layer and network.

---

# 21. Safety language

Avoid language that creates false assurance.

Prefer:

- Guardian active
- check-in due
- Trusted Circle connected
- Assistance Point currently staffed
- professional response connected in this pilot area
- response request acknowledged

Be careful with unqualified language such as:

- you are safe
- fully protected
- guaranteed response
- safe place

An Assistance Point is a place with a verified help process, not a guarantee that nothing harmful can happen there.

---

# 22. Adversarial safety controls

The system should assume that some users, devices or participants may be compromised.

Required controls include:

- short-lived sessions/tokens
- device registration and revocation
- session-level authorisation
- no public nearby-user map
- explicit Trusted Circle consent/revocation
- duress path that does not reveal itself through obvious UI
- signed Assistance Point QR/NFC tokens
- server-side incident closure rules
- audit logs for sensitive access
- rate limits for SOS/incident creation and partner APIs
- duplicate/idempotency protection
- staff-role separation
- incident access scoped to the active purpose

An Assistance Point employee must not be able to silently close an incident.

---

# 23. Security and data boundary

The existing WITH. Supabase project currently stores website/waitlist data only.

Do not add production Guardian location, Trusted Circle or incident telemetry to that marketing database.

Before connected alpha, create a separate production safety Supabase project/environment with:

- private safety schema behind Edge Functions
- RLS on any exposed tables
- no service/secret keys in the mobile client
- private Realtime channels
- audit logs
- explicit retention jobs
- separate incident evidence policy
- backup/recovery testing

---

# 24. The five launch gates

WITH. should not add more scope until these are proven.

## Gate 1 — activation

Can invited users start Guardian/Countdown without coaching and do they use it repeatedly?

## Gate 2 — false escalation

Can the staged check flow keep false incidents low enough that Trusted Circles and operators do not become numb?

## Gate 3 — Assistance Point operations

Can real staff on real shifts follow the receiving process, and can stale/unavailable locations disappear from active routing quickly?

## Gate 4 — response

Can one contracted response provider reliably receive, acknowledge and update incidents with idempotent retries?

## Gate 5 — buyer

Will at least one real organisation pay for a defined population or pilot because it values the operating outcome, not only the social story?

Only after these are proven should WITH. add more geographies, providers or programme types.

---

# 25. What the website should say

The public story should stay human.

## Problem

People are expected to coordinate too much of their own safety across disconnected people, apps, businesses and responders.

## Solution

WITH. lets a person start a protected moment, automates the routine coordination and connects the right people, places and response paths when the state changes.

## Why a network

One app cannot create physical coverage. People, staffed places, responders, organisations, NGOs and public services each contribute different parts.

## Why participation matters

More people standing together creates demand and human support. Better physical coverage grows when businesses and response providers participate too.

## Trust

WITH. works around active protection events, not permanent location histories.

## Commercial sustainability

Partnerships make it possible to operate and improve the network over time. Detailed pricing and internal unit economics do not belong in the public product story before validation.

---

# 26. The simplest definition of WITH.

> **WITH. is a personal safety network that helps carry the coordination burden around a protected moment. People start it. Automation handles the routine steps. Trusted people, staffed places and responders join when they are actually needed.**

And the operating promise remains:

> **Safety should start before the emergency.**
