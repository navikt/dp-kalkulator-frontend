import {
  fetchDecoratorHtml,
  type DecoratorElements,
  type DecoratorEnvProps,
  type DecoratorFetchProps,
  type DecoratorLocale as DecoratorLocaleType
} from "@navikt/nav-dekoratoren-moduler/ssr";

export enum DecoratorLocale {
  NB = "nb",
  EN = "en"
}

export const availableLanguages = [
  {
    locale: DecoratorLocale.NB,
    url: "https://www.nav.no/person/kontakt-oss/nb/",
    handleInApp: true as const
  },
  {
    locale: DecoratorLocale.EN,
    url: "https://www.nav.no/person/kontakt-oss/en/",
    handleInApp: true as const
  }
];

function isSupportedLanguage(value: string | undefined): value is DecoratorLocale {
  return value === DecoratorLocale.NB || value === DecoratorLocale.EN;
}

export async function getDekoratorHTML(language: DecoratorLocale): Promise<DecoratorElements> {
  const env = (process.env.DECORATOR_ENV ?? "localhost") as DecoratorEnvProps["env"];

  const config: DecoratorFetchProps = {
    env,
    localUrl: "https://dekoratoren.ekstern.dev.nav.no",
    params: {
      context: "privatperson",
      chatbot: false,
      redirectToApp: true,
      level: "Level4",
      language: language as DecoratorLocaleType,
      availableLanguages
    }
  };

  return await fetchDecoratorHtml(config);
}

export async function getDekoratorLanguage(request: Request): Promise<DecoratorLocale> {
  const cookieHeader = request.headers.get("Cookie");
  const match = cookieHeader?.match(/decorator-language=([^;]+)/);

  const lang = match?.[1];
  return isSupportedLanguage(lang) ? lang : DecoratorLocale.NB;
}
