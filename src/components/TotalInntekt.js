import {Normaltekst} from "nav-frontend-typografi";
import React from "react";

export function TotalInntekt(props) {
  return (
      <Normaltekst>

        <li>
          Dine inntekter de siste 36 månedene: {props.totalIncome.toFixed(2)} kr
        </li>
        <li>
          Din gjennomsnittlige inntekt de siste 36 månedene: {(props.totalIncome
            / 36).toFixed(2)}kr.
        </li>

      </Normaltekst>
  );
}

export function TotalInntekt12(props) {
  return (
      <Normaltekst>

        <li>
          Dine inntekter de siste 12
          månedene: {props.totalIncome12.toFixed()} kr
        </li>
        <li>
          Din gjennomsnittlige inntekt de siste 12
          månedene: {(props.totalIncome12 / 12).toFixed(2)}kr.
        </li>

      </Normaltekst>
  );
}