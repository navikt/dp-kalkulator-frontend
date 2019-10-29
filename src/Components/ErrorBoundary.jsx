import React from 'react';
import PropTypes from 'prop-types';

import AlertStripe from 'nav-frontend-alertstriper';
import { captureException, withScope } from '@sentry/browser';
import {redirectToLogin} from "../Api";

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
          .split('\n')
          .map(line => line.trim())
          .find(line => !!line),
      ].join(' '),
    });
    // send til sentry
    withScope(scope => {
      Object.keys(info).forEach(key => {
        scope.setExtra(key, info[key]);
        captureException(error);
      });
    });
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    // TODO: fiks feilmeldinger
    if (hasError) {
      let feilmelding;
      console.log(error);

      switch (error.status) {
        case 404:
          feilmelding = 'En feil har oppstått i forbindelse med tjenestekallet til inntekt';
          break;
        case 418:
          feilmelding = 'I´M A TEAPOT';
          break;
        case 403:
          feilmelding = 'Du er ikke autorisert';
          break;
        case 401:
          feilmelding = 'Du er ikke autorisert';
          break;
        case 500:
          feilmelding = '500';
          break;
        default:
          feilmelding = error;
          break;
      }

      return <AlertStripe type="feil">{`Feilmelding: ${feilmelding}`}</AlertStripe>;
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ErrorBoundary;
