import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";
import logo from "../images/logo-light.png";

export const meta: V2_MetaFunction = () => [{ title: "Remix Notes" }];

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative sm:flex sm:items-center sm:justify-center lg:min-h-screen lg:bg-white">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto w-full max-w-7xl sm:px-6 lg:px-8">
          <div className="relative w-full sm:overflow-hidden sm:rounded-2xl lg:shadow-xl">
            <div className="absolute inset-0">
              <div className="hero-bg absolute inset-0 min-h-screen mix-blend-multiply" />
            </div>
            <div className="relative px-4 pb-8 pt-16 sm:px-24 lg:p-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-white drop-shadow-md">
                  Indie Stack
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/notes"
                    className="primary-main flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-medium shadow-sm sm:px-8"
                  >
                    View Notes for {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="primary-main flex items-center justify-center rounded-md border border-transparent px-4 py-3 text-base font-medium shadow-sm sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="primary-main flex items-center justify-center rounded-md px-4 py-3 font-medium "
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>

              <a
                href="https://www.arcblock.io"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={logo}
                  alt="ArcBlock"
                  className="mx-auto mt-16 w-1/2 max-w-full"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
