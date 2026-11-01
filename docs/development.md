# Development and worktrees

Node 22+ and npm are required. Preserve the extension and interview tool npm
lockfiles; the root package provides the pinned Convex CLI and repository checks.
Run npm ci at root and npm ci --prefix extensions/e2b for extension tests.
node scripts/check.mjs runs repository standards, worktree and Node eval tests
serially. npm test --prefix extensions/e2b runs extension tests.

The existing setup.sh installs into global pi configuration and is not an isolated
checkout lifecycle. Do not use it for disposable worktrees. The optional runnable
backend is extensions/e2b/convex (see e2b-convex.md); there is no web application.

Use node scripts/worktree/cli.mjs followed by setup, start, stop, teardown,
cleanup --yes or prune. setup fetches origin and discovers its live default
branch, safely fast-forwards the selected local base where possible, and refuses
dirty or diverged current branches. Resolve changes/divergence manually and retry;
never reset or stash automatically. setup --path PATH --branch BRANCH creates a
checkout from the freshly fetched base after these tools reach that base.

start launches only the local anonymous backend. No account or cloud deployment
is needed. stop preserves data and port leases; teardown releases leases and
preserves data; cleanup --yes explicitly removes owned generated state. Ownership
is checked before stopping processes or deleting files. prune releases stale
reservations. Never remove sibling state or stop processes by name or port.
.worktree, .convex, generated code and .env.local are ignored and checkout-local.
Export PI_FLEET_HOME="$PWD/.worktree/fleet" when exercising fleet commands, so
job state cannot collide with another checkout. Read .worktree/backend.env for
local API access; set FLEET_CONVEX_URL to its local CONVEX_URL, without copying
production secrets. No frontend command is configured.

Real isolation verification: node --test --test-concurrency=1
scripts/worktree/worktree.integration.mjs. It creates disposable checkouts, installs
locked dependencies, writes distinct jobs, checks restart persistence, occupied
ports and sibling-safe teardown/cleanup, and stops only its owned services.
On the shared agents host all Node checks/install/codegen/integration must hold
flock -w 3600 /home/cloudagent/.cache/fantastic-heavy.lock for the entire tree;
set NODE_OPTIONS=--max-old-space-size=512. Full checks run on UbiCloud CI.

Toolkit provenance: FantasticDevHQ/convex-worktrees at
52c0b76d960a98afedd48607d6737bc14a954c1e, installed with install.mjs.
All exported lifecycle modules/tests and scripts/worktree/LICENSE are retained.
The integration RPC adapter uses this repository's existing jobs API.
PR standards import the canonical workflow/template and reconcile validator fixes
from the toolkit (CR/LF normalization and best-effort terminal failure status);
canonical reference JibHQ/jib-factory fae094712705fc1baba55fb4b3cfaaef78041b3a.

The metadata workflow activates when trusted files reach the base branch.
Required-status protection must be configured separately by the owner after
checking plan support; installing this workflow does not enable protection.

Local adaptations to the pinned toolkit: clearer legacy-state recovery messages
for nested backends, and locked nested-backend dependency installation when
creating worktrees. The integration harness uses the same install layout.

Required check names are `PR standard`, `Repository quality gates`, and
`Real app backend isolation`. The backend job checks successful prerequisite
completion before running real isolation work; a failed/canceled/skipped
prerequisite cannot produce a passing isolation status. The coordinator manages
base branch protection separately, after the trusted metadata status activates.
