import React from "react";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import { captureException, withScope } from "@sentry/browser";
import { redirectToLogin } from "../Api";
import { logAktivitet } from "../lib/tracking";
import { Alert } from "@navikt/ds-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: {},
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: [
        error.toString(),
        info.componentStack
          .split("\n")
          .map((line) => line.trim())
          .find((line) => !!line),
      ].join(" "),
    });
    // send til sentry
    withScope((scope) => {
      Object.keys(info).forEach((key) => {
        scope.setExtra(key, info[key]);
        captureException(error);
      });
    });
  }

  render() {
    const { hasError, error } = this.state;
    const { children, apiErrors, t } = this.props;
    // JS feil
    if (hasError) {
      return (
        <Alert variant="warning" size="medium">
          {`Feilmelding: ${error}`}
        </Alert>
      );
    }

    // API feil
    if (apiErrors.hasError) {
      let feilmelding;
      const { status } = apiErrors.response || {};

      switch (status) {
        case 401:
          logAktivitet({ aktivitet: "Bruker blir videresendt til login, da h*n ikke er innlogget" });
          return redirectToLogin();
        case 404:
          feilmelding = t("ERROR.404");
          break;
        case 418:
          feilmelding = t("ERROR.418");
          break;
        case 403:
          feilmelding = t("ERROR.403");
          break;
        case 500:
          feilmelding = t("ERROR.500");
          break;
        case 502:
          feilmelding = t("ERROR.502");
          break;
        case 504:
          feilmelding = t("ERROR.504");
          break;
        default:
          feilmelding = t("ERROR.UNDEFINED");
          break;
      }

      return (
        <Alert variant="warning" size="medium">
          {feilmelding}
        </Alert>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  apiErrors: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ErrorBoundary);
