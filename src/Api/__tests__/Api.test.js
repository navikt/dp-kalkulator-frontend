import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import { getLoginUrl } from "../Config";
import mockInnsyn from "../../../public/__mocks__/mockInnsyn.json";

const mock = new MockAdapter(axios);

describe("Api", () => {
  it("Skal gi tilbake riktig url T6 og T1", () => {
    const url = getLoginUrl("https://t6.no");
    expect(url).to.equal("https://loginservice.nav.no/login?level=Level3");
  });

  it("Skal gi tilbake riktig url Q", () => {
    const url = getLoginUrl("https://www-q.no");
    expect(url).to.equal("https://loginservice-q.nav.no/login?level=Level3");
  });

  it("Hente behov", async () => {
    mock.onGet(`/behov`).reply(200, mockInnsyn);
    try {
      const response = await axios.get("/behov", {});
      expect(response.data).to.eql(mockInnsyn);
    } catch (error) {
      throw new Error(error);
    }
  });

  it("Hente behov timer ut", async () => {
    mock.onGet(`/behov`).timeout();
    try {
      await axios.get("/behov", {});
    } catch (error) {
      expect(error.code).to.eql("ECONNABORTED");
    }
  });

  it("Hente behov skal gi 401 når du ikke er logget inn", async () => {
    mock.onGet(`/behov`).reply(401, {});
    try {
      await axios.get("/behov", {});
    } catch (error) {
      expect(error.response.status).to.eql(401);
    }
  });
});
