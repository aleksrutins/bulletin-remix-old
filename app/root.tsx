import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import { cssBundleHref } from "@remix-run/css-bundle";

import "@fontsource/abril-fatface";
import { GlobalLoading } from "./components/GlobalLoading";

export const links: LinksFunction = () => [
  ...(cssBundleHref 
      ? [{rel: "stylesheet", href: cssBundleHref}]
      : []),
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-serif">
        <GlobalLoading/>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
