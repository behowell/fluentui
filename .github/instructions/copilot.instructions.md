---
applyTo: '**'
---

# Fluent UI Copilot Instructions

## Repository overview

- Large Nx monorepo using Yarn v1, Node.js 22, TypeScript strict mode, React, and web components.
- Prefer v9 work in `packages/react-components/`.
- Treat `packages/react/` as v8 maintenance-only code; do not copy its patterns into v9 work.
- Search by specific package or component name instead of reading broad top-level directories.

## Validated setup and commands

- Run `yarn install --frozen-lockfile` during initial setup and after dependency changes. This command is validated in this repo.
- Always run project tasks through Nx:
  - `yarn nx run <project>:build`
  - `yarn nx run <project>:test`
  - `yarn nx run <project>:type-check`
  - `yarn nx run <project>:lint`
- Useful discovery commands:
  - `yarn nx show project <project>`
  - `yarn nx show projects`
- Prefer targeted project validation over full-repo commands.
- For published package changes, create a change file with `yarn change`.
- For v9 public API changes, also run `yarn nx run <project>:generate-api`.

## V9 component rules

- Package path convention: `@fluentui/react-<name>` → `packages/react-components/react-<name>/library/src/`.
- Use `ForwardRefComponent` with `React.forwardRef`; never use `React.FC`.
- Use the standard hook pipeline:
  1. `use<Component>_unstable()`
  2. `use<Component>Styles_unstable()`
  3. `render<Component>_unstable()`
- Use Griffel `makeStyles` and `mergeClasses`.
- Preserve the user `className` last in `mergeClasses(...)`.
- Never hardcode colors, spacing, typography, border radius, or shadows. Use the `tokens` export from `@fluentui/react-theme`.
- Never access `window`, `document`, or `navigator` directly. Use `useFluent_unstable().targetDocument` in components or `canUseDOM()` in utilities.
- Never add dependencies between component packages. Move shared logic to `react-utilities` or `react-shared-contexts`.

## Expected file patterns

- V9 component implementation lives under `library/src/components/<ComponentName>/`.
- Typical files:
  - `<ComponentName>.tsx`
  - `<ComponentName>.types.ts`
  - `use<ComponentName>.ts`
  - `use<ComponentName>Styles.styles.ts`
  - `render<ComponentName>.tsx`
  - adjacent `<ComponentName>.test.tsx`
- Stories live under `stories/src/`.

## Testing guidance

- Add or update focused tests next to the changed code.
- Common validation commands:
  - `yarn nx run <project>:test`
  - `yarn nx run <project>:test -u`
  - `yarn nx run <project>:type-check`
  - `yarn nx run ssr-tests-v9:test-ssr` when SSR behavior changes
  - `yarn nx run vr-tests-react-components:test-vr` for VRT-only changes
- Do not remove unrelated tests to make validation pass.

## Guardrails

- Prefer existing generators or scaffolding for new v9 packages/components.
- Follow the closest local README, spec, and test patterns instead of copying legacy v8 code.
- If you change `.github/workflows`, `package.json`, or `yarn.lock` as part of dependency or automation work, also read `.github/instructions/dependabot-security-fixes.instructions.md`.
- Keep changes surgical and avoid unrelated fixes.
