# Repository development

Use the checkout-local scripts described in docs/development.md. Never run setup.sh
against a shared home as a worktree setup step: it installs global pi configuration.
Preserve sibling checkouts, runtime sessions and user changes. No kill-by-port/name.

Use Node 22+ and npm with committed lockfiles. This is a shell/TypeScript extension
repository with an optional Convex example in extensions/e2b, not a Turborepo.
No frontend is configured; do not use worktree start --frontend.

All CI compute uses ubicloud-standard-2-ubuntu-2404. PR metadata enforcement runs
trusted base code only. Follow docs/pull-request-standard.md for PRs.
On shared agents, acquire /home/cloudagent/.cache/fantastic-heavy.lock for every
Node test/check/install/codegen/backend integration subprocess tree, with
NODE_OPTIONS=--max-old-space-size=512 and test concurrency 1. Run full checks in CI.

Full repository check:all, lint, typecheck and build are CI-only. Never increase
resource limits, replace shared package managers or stop unverified processes.
