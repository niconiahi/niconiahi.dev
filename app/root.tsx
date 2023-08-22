        import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Partytown } from "@builder.io/partytown/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import appStyles from "~/styles/app.css";

export function links() {
  return [
    { rel: "stylesheet", href: appStyles },
    {
      rel: "preload",
      href: "https://www.niconiahi.dev/fonts/Rubik-Regular.ttf",
      as: "font",
      type: "font/ttf",
      crossOrigin: "anonymous",
    },
  ];
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Remix notes" }];
};

export async function loader() {
  return json(
    // { gaTrackingId: process.env.GA_TRACKING_ID },
    {
      headers: {
        // https://stackoverflow.com/questions/7071763/max-value-for-cache-control-header-in-http
        "Cache-Control": "s-maxage=31536000",
      },
    }
  );
}

export default function App() {
  // const { gaTrackingId } = useLoaderData<typeof loader>();

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Partytown debug={true} forward={["dataLayer.push"]} />
        {/* {process.env.NODE_ENV === "production" ? (
          <>
            <script
              type="text/partytown"
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              type="text/partytown"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gaTrackingId}', { 
                  page_path: window.location.pathname,
              });
            `,
              }}
            />
          </>
        ) : null} */}
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}