# How to use Next.js 13 Server Actions with User Confirmation

Next.js 13 has brought exciting new experimental React features to web development. The combination of server-side rendered components and server actions have the potential to simplify web development while still giving us the full power of client-side React when we need it.

This article introduces the basics of server actions, and how to use them in combination with actions that require user confirmation. This is a common scenario for destructive actions such as deleting a record from a database.

## Sample Application

This article assumes you're acquainted with setting up and running Next.js applications.

To view the code referenced in this article, [checkout the repo](https://github.com/CodingZeal/nextjs-example-confirm-server-action).

This article and accompanying example application utilize Next.js version 13.5.4 configured with TailwindCSS and TypeScript. Bear in mind that server actions remain in the experimental phase and could evolve.

## A Glimpse at Server Actions

Next.js's server actions empower developers to execute server-side operations directly from the client without the hassle of wiring up HTTP client code. As the Next.js [documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations) succinctly puts it:

> With Server Actions, you don't need to manually create API endpoints. Instead, you define asynchronous server functions that can be called directly from your components.

### Required Next.js Configurations

To leverage server actions, the experimental feature flag must be enabled in your Next.js configuration file (`next.config.js`):

```ts
module.exports = {
  experimental: {
    serverActions: true,
  },
};
```

### Basic Server Action Example

Consider the following rudimentary example that sends form data from the client to the server action and then renders to the server console. Note, the server action is set as the form's `action`:

```tsx
export default function SomePage() {
  async function exampleServerFunction(formData: FormData) {
    "use server";

    console.log("formData", Array.from(formData));
  }

  return (
    <div>
      <form action={exampleServerFunction}>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

## Using the Experimental `useFormStatus` Hook for User Feedback

At its core, `useFormStatus` tells us the current state of our form's server action, allowing for dynamic UI updates based on server action outcomes.

The hook currently returns a `pending` property, which is set to true during the form submission process. This can be incredibly useful for preventing multiple submissions and giving users feedback that the form submission is still in process.

Before we continue, here is the server action we are calling:

```ts
"use server";

export async function deleteSomething(params: FormData) {
  const id = params.get("id");
  const type = params.get("type");

  console.log(`[${type}] Deleting ${id}...`);

  // Simulate a long-running operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
}
```

The following example shows how to use `useFormStatus` to disable the submit button while the form is submitting:

- this component contains a form with a server action bound to its action attribute
- the form is submitted via a child component: `<ServerActionButton />`

```tsx
import { deleteSomething } from "@/app/server-actions";
import { ServerActionButton } from "./ServerActionButton";

type Props = { id: string };

export const SomeComponent = ({ id }: Props) => {
  return (
    <form action={deleteSomething} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <ServerActionButton />
    </form>
  );
};
```

The `ServerActionButton` component is responsible for rendering the submit button and disabling it while the form is submitting using the `useFormStatus` hook:

```tsx
"use client";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type Props = { text?: string };

export const ServerActionButton = ({ text = "Click Me!" }: Props) => {
  const { pending } = useFormStatus();

  const css = [
    /* ... base styles ... */
  ];

  if (pending) {
    css.push("border-gray-300 text-gray-300 cursor-not-allowed");
  }

  return (
    <button
      className={css.join(" ")}
      type="submit"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "Please wait..." : text}
    </button>
  );
};
```

In the code example, the `ServerActionButton` component dynamically alters its appearance based on the `pending` status. When the form linked to a server action is submitting, the button displays a "Please wait..." message and becomes visually disabled, preventing users from clicking it again.

### Important!

It's essential to recognize that the `useFormStatus` hook must be employed within a child component of the `form` associated with a server action. Use of the hook does not work when placed directly in the form component itself.

## Are you sure?

When performing destructive actions, it's common to ask the user to confirm their intent before proceeding (`Are you sure?`). This is typically done with a modal dialog, but can also be done with a simple JavaScript `confirm` dialog.

## Using `confirm` with a Server Action

The following example shows how to use a JavaScript `confirm` dialog with a server action:

```tsx
"use client";

import { deleteSomething } from "@/app/server-actions";
import { ServerActionButton } from "./ServerActionButton";

type Props = { id: string };

export const ConfirmV1 = ({ id }: Props) => {
  const onSubmit = (formData: FormData) => {
    if (confirm("Are you sure?")) {
      deleteSomething(formData);
    }
  };

  return (
    <form action={onSubmit} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <ServerActionButton />
    </form>
  );
};
```

This component must be a client component because it uses the `confirm` dialog. The `confirm` dialog is a browser feature and cannot be used on the server. Note the `"use client"` pragma at the top of the file, this tells Next.js to render this component on the client.

We wrap the server action with a client-side function, this allows us to use the `confirm` dialog before calling the server action. We must pass the `formData` to the server action so it can be submitted to the server. In this case the client-side function is bound to the form action.

## onSubmit with Action

Here is a variation of the previous example that uses the `onSubmit` form event for the JavaScript `confirm` but still uses the server action for the form action:

```tsx
"use client";

import { deleteSomething } from "@/app/server-actions";
import { ServerActionButton } from "./ServerActionButton";
import { FormEvent } from "react";

type Props = { id: string };

export const ConfirmV2 = ({ id }: Props) => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!confirm("Are you sure?")) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteSomething} onSubmit={onSubmit} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <ServerActionButton />
    </form>
  );
};
```

When the user clicks "OK" to confirm the submission, the `onSubmit` handler just lets the form do its thing and send off the data. But if the user clicks "Cancel", then the `onSubmit` handler uses `preventDefault` stopping the normal form behavior of submitting the data.

## Custom Modal Dialog

Sometimes we require more control over the design of the confirmation dialog. In this case we can create a custom modal dialog component and use it in place of the JavaScript `confirm` dialog.

We need a `Modal` component that can be opened and closed and we need to pass the entire form to the modal as a child. This allows us to open the modal from the parent component and display the confirmation dialog to the user, once they confirm the action we can submit the form.

You can reference the sample application for the `Modal` implementation, it exports both the component and a use hook `useModal` which exposes the `isOpen` state along with the `open` and `close` functions. Here is the parent component:

```tsx
"use client";

import { deleteSomething } from "@/app/server-actions";
import { ServerActionButton } from "./ServerActionButton";
import { Modal, useModal } from "./Modal";
import { Button } from "./Button";

type Props = { id: string };

export const DialogConfirm = ({ id }: Props) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <div className="flex flex-col h-full text-center">
        <div className="bg-white py-8 px-8 dark:bg-slate-900">
          <Button text="Click Me!" onClick={open} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        close={close}
        title="Confirm"
        content="Are you sure?"
      >
        <form action={deleteSomething} className="inline-block">
          <input type="hidden" name="id" value={id} />

          <Button text="Cancel" onClick={close} className="mr-2" />
          <ServerActionButton text="Ok" />
        </form>
      </Modal>
    </>
  );
};
```

This works great! When a user clicks the submit button, the modal dialog opens up. The user can then confirm the action by clicking the 'real' submit button, or cancel the action by clicking the cancel button (and thereby closing the modal).

Unfortunately our implementation has an issue that is not immediately obvious. When the form submission is complete the modal remains open. We are controlling the state of the `Modal` by calling the `open` and `close` functions, but we have no way of knowing when the form submission is complete.

## Using `useFormState` to Close the Modal

The `useFormState` hook is similar to `useFormStatus`, but it returns the server action's state after the form has been submitted. This allows us to close the modal when the form submission is complete.

We need to make a few changes to our code to use `useFormState`:

```tsx
"use client";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { deleteSomethingWithResponse } from "@/app/server-actions";
import { ServerActionButton } from "./ServerActionButton";
import { Modal, useModal } from "./Modal";
import { useEffect, useState } from "react";
import { Button } from "./Button";

type Props = {
  id: string;
};

export const DialogConfirm = ({ id: originalId }: Props) => {
  const [id, setId] = useState(originalId);

  const [formState, formAction] = useFormState(deleteSomethingWithResponse, {});
  const { status, newId } = formState;
  const { isOpen, open, close } = useModal();

  useEffect(() => {
    if (status === "success") {
      setId(newId);
      close();
    }
  }, [status, newId, close]);

  return (
    <>
      <div className="flex flex-col h-full text-center">
        <div className="h-full bg-white lg:mt-px lg:py-5 px-8 dark:bg-slate-900">
          <span className="mt-7 font-bold text-xl text-gray-600 dark:text-gray-200">
            Dialog confirm
          </span>
        </div>

        <div className="bg-white flex justify-center lg:mt-px pt-7 dark:bg-slate-900">
          {id}
        </div>

        <div className="bg-white py-8 px-8 dark:bg-slate-900">
          <Button text="Click Me!" onClick={open} />
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        close={close}
        title="Confirm"
        content="Are you sure?"
      >
        <form action={formAction} className="inline-block">
          <input type="hidden" name="type" value="dialog-confirm" />
          <input type="hidden" name="id" value={id} />

          <Button text="Cancel" onClick={close} className="mr-2" />
          <ServerActionButton text="Ok" />
        </form>
      </Modal>
    </>
  );
};
```

There is a lot going on here, so let's break it down.

First we need to import the server action we want to use. In this case we are using `deleteSomethingWithResponse` which returns a random id.

```tsx
import { deleteSomethingWithResponse } from "@/app/server-actions";
```

The server action implementation:

```ts
"use server";

export async function deleteSomethingWithResponse(
  _prevState: any,
  params: FormData
) {
  const id = params.get("id");
  const type = params.get("type");

  console.log(`[${type}] Deleting ${id}...`);

  // Simulate a long-running operation
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const newId = crypto.getRandomValues(new Uint32Array(1))[0].toString();

  return { status: "success", message: `Deleted ${id}!`, newId };
}
```

The return value will be assigned to the `formState` in the client component by the `useFormState` hook once the submission is complete. It contains the `status` of the server action, a `message` and a random `newId` that we are going to render in the UI.

We need to import `useFormState` from `react-dom`:

```tsx
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
```

We need to pass our server action to the `useFormState` hook:

```tsx
const [formState, formAction] = useFormState(deleteSomethingWithResponse, {});
```

The `formAction` function is used as the form's action attribute instead of using the server action directly. The `formState` object contains the response from the server. We then use the `status` in that object to close the dialog, and `newId` to update the UI.

Both of these actions will take place inside a `useEffect` when the form submission is complete. The `useEffect` will run when the `status` or `newId` change which will happen when the form submission is complete.

```tsx
useEffect(() => {
  if (status === "success") {
    setId(newId);
    close();
  }
}, [status, newId, close]);
```

If the response from the server contains `status: "success"` we update the `id` state and close the modal.

Now our UI is updated as expected, the modal closes and the new id is rendered in the UI.

### Server Action Parameter Difference When Using `useFormState`

Note the difference in the server action parameters when using `useFormState`:

```ts
export async function deleteSomethingWithResponse(
  _prevState: any,
  params: FormData
) {
  // ...
}
```

as opposed to

```ts
export async function deleteSomething(params: FormData) {
  // ...
}
```

When using `useFormState` the server action receives a `prevState` parameter as the first argument. If you get an error like this:

```ts
TypeError: params.get is not a function
```

It's likely because you are using `useFormState` and your server action is not expecting the `prevState` parameter.

## Conclusion

This article presents the basics of server actions in Next.js, and how to use them with actions that require user confirmation. Next.js 13 introduces experimental server actions, so certainly expect breaking changes and improvements in the future.

## Resources

- [https://nextjs.org/docs/app/api-reference/functions/server-actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
- [https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations)
