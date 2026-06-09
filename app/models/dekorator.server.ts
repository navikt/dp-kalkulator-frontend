import {
  DecoratorElements,
  DecoratorEnvProps,
  fetchDecoratorHtml,
  type DecoratorFetchProps
} from "@navikt/nav-dekoratoren-moduler/ssr";
import { getEnv } from "~/utils/env.utils";

export enum DecoratorLocale {
  NB = "nb",
  EN = "en"
}

export const availableLanguages = [
  {
    locale: DecoratorLocale.NB,
    url: "https://www.nav.no/person/kontakt-oss/nb/",
    handleInApp: true
  },
  {
    locale: DecoratorLocale.EN,
    url: "https://www.nav.no/person/kontakt-oss/en/",
    handleInApp: true
  }
];

export async function getDekoratorHTML(): Promise<DecoratorElements> {
  const config: DecoratorFetchProps = {
    env: (getEnv("DEKORATOR_ENV") || "localhost") as DecoratorEnvProps["env"],
    localUrl: "https://dekoratoren.ekstern.dev.nav.no",
    params: {
      context: "privatperson",
      chatbot: false,
      availableLanguages: availableLanguages,
      breadcrumbs: [
        {
          title: "dagpenger",
          url: "https://www.nav.no/dagpenger"
        },
        {
          title: "kalkulator",
          url: "https://www.nav.no/dagpenger/kalkulator-frontend"
        }
      ]
    }
  };

  return await fetchDecoratorHtml(config);
}

export async function getDekoratorLanguage(request: Request): Promise<string> {
  const cookieHeader = request.headers.get("Cookie");
  const match = cookieHeader?.match(/decorator-language=([^;]+)/);

  const lang = match?.[1] as DecoratorLocale | undefined;
  return lang ?? DecoratorLocale.NB;
}
