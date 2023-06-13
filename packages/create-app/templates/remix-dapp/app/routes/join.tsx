import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";

import { createUser, getUserByEmail } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";
import logo from "../images/logo-dark.png";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    redirectTo,
    remember: false,
    request,
    userId: user.id,
  });
};

export const meta: V2_MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div id="app">
      <section className="body">
        <div className="logo">
          <div className="login-page">
            <div className="form rounded-2xl">
              <img src={logo} alt="logo" />

              <Form method="post" className="login-form">
                <div>
                  <div className="mt-1">
                    <input
                      ref={emailRef}
                      id="email"
                      required
                      autoFocus={true}
                      name="email"
                      type="email"
                      placeholder="Email"
                      aria-invalid={
                        actionData?.errors?.email ? true : undefined
                      }
                      aria-describedby="email-error"
                      className="flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-medium shadow-sm sm:px-8"
                    />

                    {actionData?.errors?.email ? (
                      <div id="email-error" className="text-red-500">
                        {actionData.errors.email}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="mb-6 mt-1">
                    <input
                      id="password"
                      ref={passwordRef}
                      name="password"
                      type="password"
                      placeholder="password"
                      aria-invalid={
                        actionData?.errors?.password ? true : undefined
                      }
                      aria-describedby="password-error"
                      className="flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-medium shadow-sm sm:px-8"
                    />

                    {actionData?.errors?.password ? (
                      <div id="password-error" className="text-red-500">
                        {actionData.errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>

                <input type="hidden" name="redirectTo" value={redirectTo} />

                <button
                  type="submit"
                  className="primary-button flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-medium shadow-sm sm:px-8"
                >
                  sign up
                </button>

                <p className="message">
                  Already have an account?{" "}
                  <Link
                    to={{
                      pathname: "/login",
                      search: searchParams.toString(),
                    }}
                  >
                    Sign in
                  </Link>
                </p>

                <p className="message">
                  <Link
                    to={{
                      pathname: "/",
                      search: searchParams.toString(),
                    }}
                  >
                    Home
                  </Link>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
