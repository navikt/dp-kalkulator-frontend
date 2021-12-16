import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "../App";

// todo mocke i18next skikkelig opp
jest.mock("../../lib/i18n");

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Suspense fallback={<div>loading...</div>}>
        <App />
      </Suspense>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  // it("skal vise samtykke", () => {
  //   const wrapper = shallow(<app />);
  //   const samtykkepanel = wrapper.find(samtykkepanel);
  //   const kalkulator = wrapper.find(kalkulator);
  //   expect(samtykkepanel).to.have.length(1);
  //   expect(kalkulator).to.have.length(0);
  // });
  //
  // it("Skal vise kalkulator etter man har klikket på knappen", () => {
  //   const wrapper = shallow(<App />);
  //   const samtykkePanel = wrapper.find(SamtykkePanel);
  //   const kalkulator = wrapper.find(Kalkulator);
  //   const samtykkeKnapp = samtykkePanel.dive().find("Hovedknapp");
  //   expect(samtykkePanel).to.have.length(1);
  //   expect(kalkulator).to.have.length(0);
  //   samtykkeKnapp.simulate("click");
  //   expect(samtykkePanel).to.have.length(1);
  //   expect(kalkulator).to.have.length(0);
  // });
});
