import { addDays, getDate, getMonth, getYear, subDays } from "date-fns";

function finnPåskeSøndag(år: number): Date {
  const a = år % 19;
  const b = Math.floor(år / 100);
  const c = år % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const måned = Math.floor((h + l - 7 * m + 114) / 31);
  const dag = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(`${år}-${måned}-${dag}`);
}

function hentFridager(år: number): Set<string> {
  const påskeSøndag = finnPåskeSøndag(år);

  const datoer = [
    new Date(`${år}-01-01`),
    subDays(påskeSøndag, 7),
    subDays(påskeSøndag, 3),
    subDays(påskeSøndag, 2),
    påskeSøndag,
    addDays(påskeSøndag, 1),
    addDays(påskeSøndag, 39),
    addDays(påskeSøndag, 49),
    addDays(påskeSøndag, 50),
    new Date(`${år}-05-01`),
    new Date(`${år}-05-17`),
    new Date(`${år}-12-25`),
    new Date(`${år}-12-26`)
  ];

  return new Set(datoer.map((dato) => `${getYear(dato)}-${getMonth(dato)}-${getDate(dato)}`));
}

function erFridag(dato: Date): boolean {
  const datoSomSkalSjekkes = `${getYear(dato)}-${getMonth(dato)}-${getDate(dato)}`;
  return hentFridager(getYear(dato)).has(datoSomSkalSjekkes);
}

export function hentMånederÅTrekkeFra(datoObjekt: Date): number {
  const [sunday, monday] = [0, 1];
  const dag = datoObjekt.getDay();
  const dato = datoObjekt.getDate();

  const regler = [
    dato <= 5,
    dato === 6 && dag === sunday,
    dato === 6 && dag === monday,
    dato === 7 && dag === monday,
    dato <= 7 && erFridag(datoObjekt)
  ];

  if (regler.includes(true)) {
    return 2;
  }

  return 1;
}

export function hentBarnetillegg(dato: Date): number {
  return getYear(dato) - 1988;
}
