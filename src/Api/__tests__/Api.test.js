import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";
import {getApiBaseUrl, getLoginUrl} from "../Config";
import mockInnsyn from "../../../public/__mocks__/mockInnsyn.json";
import {getBehov, instance} from "../index";

const mock = new MockAdapter(instance);

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
    mock.onGet(`${getApiBaseUrl()}/behov?regelkontekst=veiledning`).reply(200, mockInnsyn);
    try {
      const response = await getBehov();
      expect(response.data).to.eql(mockInnsyn);
    } catch (error) {
      throw new Error(error);
    }
  });

  it("Hente behov timer ut", async () => {
    mock.onGet(`${getApiBaseUrl()}/behov?regelkontekst=veiledning`).timeout();
    try {
      await getBehov();
    } catch (error) {
      expect(error.code).to.eql("ECONNABORTED");
    }
  });

  it("Hente behov skal gi 401 når du ikke er logget inn", async () => {
    mock.onGet(`${getApiBaseUrl()}/behov?regelkontekst=veiledning`).reply(401, {});
    try {
      await getBehov();
    } catch (error) {
      expect(error.response.status).to.eql(401);
    }
  });
});
