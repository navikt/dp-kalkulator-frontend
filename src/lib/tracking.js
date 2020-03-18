import amplitude from 'amplitude-js';

const getApiKey = () => {
  if (window.location.hostname.includes('www.nav.no')) {
    return 'edf391bf01b758a289ef5e7cb297f77a'; // prod
  }
  return '24eb6d83cfc9883c04c4eaec61251bf4'; // dev
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
