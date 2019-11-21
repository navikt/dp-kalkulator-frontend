import amplitude from 'amplitude-js';

const getApiKey = () => {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  return process.env.REACT_APP_AMPLITUDE_KEY;
};

const tracking = amplitude.getInstance();
tracking.init(getApiKey(), '', {
  apiEndpoint: 'amplitude.nav.no/collect',
  saveEvents: false,
  includeUtm: true,
  batchEvents: false,
  includeReferrer: true,
});

export default tracking;
