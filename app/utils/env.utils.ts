declare global {
  interface Window {
    env: IEnv;
  }
}

export type IEnv = {
  USE_MSW: string;
  BASE_PATH: string;
  IS_LOCALHOST: string;
  DEKORATOR_ENV: string;
};

export function getEnv(value: keyof IEnv) {
  const env = typeof window !== "undefined" ? window.env : process.env;

  return env[value] || "";
}
