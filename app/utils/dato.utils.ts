import { addDays, getDate, getMonth, getYear, subDays } from "date-fns";

function finnPaskeSondag(aar: number): Date {
  const a = aar % 19;
  const b = Math.floor(aar / 100);
  const c = aar % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const maaned = Math.floor((h + l - 7 * m + 114) / 31);
  const dag = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(`${aar}-${maaned}-${dag}`);
}

function hentFridager(aar: number): Set<string> {
  const paskeSondag = finnPaskeSondag(aar);

  const datoer = [
    new Date(`${aar}-01-01`),
    subDays(paskeSondag, 7),
    subDays(paskeSondag, 3),
    subDays(paskeSondag, 2),
    paskeSondag,
    addDays(paskeSondag, 1),
    addDays(paskeSondag, 39),
    addDays(paskeSondag, 49),
    addDays(paskeSondag, 50),
    new Date(`${aar}-05-01`),
    new Date(`${aar}-05-17`),
    new Date(`${aar}-12-25`),
    new Date(`${aar}-12-26`)
  ];

  return new Set(datoer.map((dato) => `${getYear(dato)}-${getMonth(dato)}-${getDate(dato)}`));
}

function erFridag(dato: Date): boolean {
  const datoSomSkalSjekkes = `${getYear(dato)}-${getMonth(dato)}-${getDate(dato)}`;
  return hentFridager(getYear(dato)).has(datoSomSkalSjekkes);
}

export function hentMaanederATrekkeFra(datoObjekt: Date): number {
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
