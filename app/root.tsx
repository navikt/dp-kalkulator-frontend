import { Theme } from "@navikt/ds-react";
import { onLanguageSelect } from "@navikt/nav-dekoratoren-moduler";
import parse from "html-react-parser";
import {
  data,
  isRouteErrorResponse,
  Links,
  type LinksFunction,
  type LoaderFunctionArgs,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigate
} from "react-router";

import akselStyles from "@navikt/ds-css/dist/index.css?url";
import appStyles from "./index.css?url";
import { useInjectDecoratorScript } from "./hooks/useInjectDecoratorScript";
import { getDekoratorHTML, getDekoratorLanguage } from "./models/dekorator.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: akselStyles },
  { rel: "stylesheet", href: appStyles }
];

export async function loader({ request }: LoaderFunctionArgs) {
  const language = await getDekoratorLanguage(request);
  const decoratorFragments = await getDekoratorHTML(language);

  return data({
    decoratorFragments,
    language
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { decoratorFragments, language } = useLoaderData<typeof loader>();
  const { DECORATOR_HEAD_ASSETS, DECORATOR_SCRIPTS, DECORATOR_HEADER, DECORATOR_FOOTER } =
    decoratorFragments;

  useInjectDecoratorScript(DECORATOR_SCRIPTS);

  onLanguageSelect(() => {
    navigate(0);
  });

  return (
    <html lang={language}>
      <head lang={language}>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Dagpengerkalkulator</title>
        {parse(DECORATOR_HEAD_ASSETS, { trim: true })}
        <Meta />
        <Links />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: DECORATOR_HEADER }} />
        {children}
        <ScrollRestoration />
        <div dangerouslySetInnerHTML={{ __html: DECORATOR_FOOTER }} />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Theme>
      <Outlet />
    </Theme>
  );
}

export function ErrorBoundary({ error }: { error: unknown }) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <h1>Ikke funnet</h1>;
  }

  if (isRouteErrorResponse(error) || error instanceof Error) {
    return <h1>Teknisk feil</h1>;
  }

  return <h1>Ukjent feil</h1>;
}
