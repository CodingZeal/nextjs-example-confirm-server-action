# Example application: confirm server actions

Examples using server actions that require user confirmation before executing.

## Run locally

```
pnpm install
pnpm run dev
open http://localhost:3000
```

## Initial app setup

```
pnpm create next-app
```

- ✔ Would you like to use TypeScript? … No / <u>**Yes**</u>
- ✔ Would you like to use ESLint? … No / <u>**Yes**</u>
- ✔ Would you like to use Tailwind CSS? … No / <u>**Yes**</u>
- ✔ Would you like to use `src/` directory? … <u>**No**</u> / Yes
- ✔ Would you like to use App Router? (recommended) … No / <u>**Yes**</u>
- ✔ Would you like to customize the default import alias (@/\*)? … <u>**No**</u> / Yes

Tailwind layout: https://preline.co/examples/pricing-sections.html

### enable experimental flag

https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations

```
next.config.ts

experimental: {
  serverActions: true,
},
```

## Noteworthy

- version of next, node, etc...
  - add .node-version
- `useFormStatus` put in child component of `<form`, otherwise it does not seem to work
- js confirm:
  - show implementation with just action or onSubmit
- custom dialog for confirmation

  - children as the form/submit button
  - useEffect to close dialog based on server return value: `useFormState` (not to be confused with `useFormStatus`)

- serverAction signature difference when using `useFormState`, see difference `deleteSomething` vs `deleteSomethingWithResponse`

## Resources

- https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations
- tailwind css layouts:
  - `app/page.tsx`: https://preline.co/examples/pricing-sections.html
  - `components/Modal.tsx`: https://tw-elements.com/docs/standard/components/modal/
