const helmet = require("helmet");

module.exports = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "tjenester.nav.no", "appres.nav.no"],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "appres.nav.no",
      "www.google-analytics.com",
      "www.googletagmanager.com",
      "static.hotjar.com",
      "script.hotjar.com",
      "*.psplugin.com",
      "*.nav.no",
    ],
    styleSrc: ["'self'", "*.nav.no", "appres.nav.no", "'unsafe-inline'"],
    connectSrc: [
      "'self'",
      "*.nav.no",
      "*.dev.nav.no",
      "appres.nav.no",
      "amplitude.nav.no/collect",
      "*.psplugin.com",
      "*.hotjar.com",
      "*.vc.hotjar.com",
      "rt6o382n.apicdn.sanity.io",
      "rt6o382n.api.sanity.io",
    ],
    fontSrc: ["data:", "*.psplugin.com", "*.hotjar.com"],
    frameSrc: ["video.qbrick.com/", "vars.hotjar.com"],
    imgSrc: ["*.hotjar.com", "www.google-analytics.com", "*.nav.no"],
    // reportUri: 'https://navdagpenger.report-uri.com/r/d/csp/enforce',
  },
});
