# WITH. Mobile and Backend Architecture

## Decision

A phone app does not need Supabase specifically. WITH. does need a durable backend because the phone cannot be the entire safety system.

For V1, Supabase is recommended as the durable relational system of record while immediate routine protection logic remains on device.

The architecture principle is:

> Phone handles immediate local intelligence. Backend holds durable shared state. Notification systems move information. Response partners provide physical intervention. Offline storage protects against connectivity failure.

## Logical architecture

```text
MOBILE APP
  ├─ GPS and movement context
  ├─ Guardian local rules
  ├─ Safety Countdown
  ├─ watch connection state
  ├─ encrypted local session state
  ├─ offline event queue
  └─ SOS
        │
        ▼
    SAFETY API
        │
        ├─ Auth and users
        ├─ Trusted Circle
        ├─ devices
        ├─ safety sessions
        ├─ heartbeats
        ├─ incidents
        ├─ incident events
        ├─ Assistance Points
        └─ dispatch state
        │
        ├───────────────┐
        ▼               ▼
  PostgreSQL       Incident workers
                        │
              ┌─────────┼─────────┐
              ▼         ▼         ▼
            APNs       FCM      responder APIs
                        │
                     SMS / WhatsApp / voice where needed
```

## On device responsibilities

The phone should perform routine work locally where practical:

- read location during an active protected session
- compare location to the expected route
- maintain countdown timers
- maintain protection state
- detect major route deviation using conservative thresholds
- track current device connectivity
- track watch connection state where supported
- queue events when offline
- encrypt sensitive local state
- show degraded protection state clearly

The cloud should not receive every raw coordinate simply because it can.

## Backend responsibilities

Durable state includes:

- users
- trusted contacts
- device registrations
- active safety sessions
- server confirmed heartbeat state
- incidents
- incident event timeline
- Assistance Points and operational status
- professional response requests
- responder acknowledgement and state
- audit records

The backend becomes authoritative for active incident continuity once an incident is created.

## Local versus server state

The app and backend will sometimes disagree after network loss.

Every safety event should include:

- immutable event ID
- session ID
- device ID
- device timestamp
- monotonic local sequence number
- event type
- event payload

The server records its own receipt time.

On reconnect:

1. app sends unsynchronised events in order
2. backend rejects duplicate immutable IDs
3. backend applies valid transitions idempotently
4. backend returns canonical session state
5. app reconciles its local state

Server state must not be rolled backwards by delayed events.

## Idempotency

Safety actions will be retried because connectivity is unreliable.

APIs such as create incident, send heartbeat, acknowledge check in and update dispatch must accept an idempotency key.

Repeated delivery of the same request must not create duplicate incidents, duplicate responder jobs or duplicate notifications.

## Session state model

A protected session can use states such as:

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

An incident can use:

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

No response acknowledgement must be represented explicitly. `Alert sent` is not treated as response success.

## Heartbeats

A heartbeat should be lightweight and contain only what is necessary.

Potential state:

```json
{
  "session_id": "...",
  "sequence": 42,
  "state": "green",
  "battery_percent": 54,
  "connectivity": "mobile",
  "watch_connected": true,
  "route_state": "normal",
  "device_time": "..."
}
```

Exact location can be sampled and retained according to session need and privacy policy. Normal sessions should not become permanent movement archives by default.

## Offline first queue

When data connectivity disappears:

- do not stop Guardian automatically
- continue local route and countdown logic
- persist new events in an encrypted queue
- show that server confirmation is degraded
- attempt connectivity according to battery aware retry rules
- preserve emergency voice and other OS level emergency options

The UI must distinguish:

- Protected and connected
- Protected with degraded connection
- Local protection only
- Protection unavailable

Never show a reassuring green state when critical dependencies are actually unavailable.

## Phone loss

If the device disappears during a protected session, the backend already has the latest confirmed state.

Example:

```text
14:05 heartbeat
14:06 heartbeat
14:07 heartbeat
14:08 deviation
14:09 watch disconnect
14:09 phone offline
```

Once the escalation condition is met, the incident exists server side.

Destroying the phone must not destroy the incident.

## Search corridor

Responders should receive more than a stale dot when possible:

- last trusted location
- last trusted time
- direction of travel
- expected route
- expected destination
- travel mode
- recent route corridor
- relevant incident events

Only information required for the response purpose should be shared.

## Watch boundary

Apple Watch and Wear OS are optional secondary paths.

Early roles:

- discreet SOS
- haptic check in
- phone separation signal
- safe confirmation

Do not use heart rate or wellness sensor data as proof that an assault is occurring.

The product must remain functional without a watch.

## Push and messaging

Supabase is not the push notification system.

Use:

- APNs for iOS
- FCM for Android

Other escalation channels can include WhatsApp, SMS, voice and professional responder APIs.

Routine status updates should prefer push to control cost. SMS is an emergency or fallback channel rather than the default messaging transport.

## Mapping

Google Routes or an equivalent route service can generate expected routes, ETA and alternatives.

The route can be stored on the device as a polyline. Local code can determine whether the phone is still reasonably close to the expected route.

Recalculate only when necessary instead of calling routing APIs on every GPS update.

## Transport adapters

Transport platforms are adapters, not dependencies.

V1 flow:

```text
How are you getting there?
Walking / My car / Uber / Bolt / Taxi / Train / Someone driving me
```

For Uber, an early experience can open Uber through a deep link while Guardian runs independently.

Do not assume a generic connected Uber account exposes every ride.

Bolt integration should not be required for Guardian to work.

## Assistance Points

Assistance Point data can include:

- organisation and site ID
- coordinates
- category
- operating hours
- live availability status
- verification timestamp
- procedure version
- training status
- response connection
- QR or NFC token configuration

The public app must not expose hidden operational or responder information.

## QR arrival

A signed QR can confirm arrival at an Assistance Point.

Checks can include:

- valid signed token
- current Assistance Point identity
- geolocation plausibility
- active session or incident context

Scanning a QR must not give the business access to the user's normal movement history.

## Security model

Requirements include:

- RLS on exposed tables
- least privilege service access
- no service role secrets in a client
- encrypted local storage
- TLS
- encryption at rest
- short lived credentials
- sensitive access audit logs
- explicit user controlled Trusted Circle access
- separate incident evidence retention
- separate marketing and safety data environments

## Supabase boundaries

Supabase is a practical V1 choice for:

- PostgreSQL
- Auth
- RLS
- Edge Functions
- Realtime where justified
- Storage

It must not become a conceptual single point of failure.

Application logic should sit behind a safety API boundary so critical components can be extracted later if scale, latency, data residency or reliability requirements change.

## Current waitlist database

The existing `WITH` Supabase project stores research and waitlist data only.

Current public browser permissions on `waitlist_submissions` are intentionally denied. The browser submits through a validated Edge Function.

The production safety app should use a separate database environment before real location or incident telemetry is collected.

## Suggested production tables

```text
users
devices
trusted_contacts
safety_plans
safety_sessions
session_events
session_heartbeats
incidents
incident_events
assistance_points
assistance_point_status
assistance_point_verifications
response_providers
response_dispatches
notification_deliveries
community_conditions
sensitive_access_audit
```

## Failure domains to test

1. mobile data lost during Guardian
2. device restarted during Guardian
3. battery becomes critically low
4. GPS permission removed mid session
5. push delivery fails
6. Trusted Circle contact offline
7. responder API returns 500
8. responder API times out
9. responder receives duplicate incident request
10. delayed heartbeat arrives after a newer heartbeat
11. watch disconnects
12. phone goes offline after route deviation
13. user reaches Assistance Point with poor data
14. QR scanned twice
15. server receives an old cancellation after incident escalation
16. app retries create incident multiple times
17. backend is temporarily unavailable
18. mapping API unavailable

The system must produce a defined degraded state for each case.

## Build order

### Mobile prototype

- onboarding
- readiness preflight
- Trusted Circle setup
- Start protection
- Guardian
- Safety Countdown
- Assistance Points
- SOS

### Connected alpha

- Auth
- durable sessions
- heartbeat API
- encrypted offline queue
- push notifications
- Trusted Circle journey links
- incident creation and state

### Pilot reliability

- response integration
- acknowledgement timers
- provider fallback
- Assistance Point status and signed QR
- operational dashboards
- incident audit and recovery workflow

### Later

- richer watch support
- transport partnerships
- SMS fallback
- physical Safety Nodes
- proven peer relay

The build should stop adding sophistication whenever the basic safety loop is not yet reliable.
