import {Normaltekst} from "nav-frontend-typografi";
import React from "react";

export default function TotalInntekt(props) {
  return (

        <ul className = "a">
<Normaltekst>

            <li>
              Dine inntekter de siste {props.months} månedene: {props.totalIncome.toFixed(2)} kr
            </li>
            <li>
             Din gjennomsnittlige inntekt de siste {props.months} månedene: {(props.totalIncome
            / props.months).toFixed(2)}kr.
            </li>

</Normaltekst>
        </ul>


  );
}

