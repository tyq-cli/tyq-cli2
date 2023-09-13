import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

function install (Vue, options = {}) {
  if (/yunzhijia\.com$/.test(location.host)) {
    Sentry.init({
      Vue,
      dsn: "",
      integrations: [
        new Integrations.BrowserTracing({
          ...(options.router ? {
            routingInstrumentation: Sentry.vueRouterInstrumentation(options.router),
          } : {}),
          tracingOrigins: ["localhost", /^\//],
        }),
      ],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    })
  }
}

function setUser ({
  id,
  username,
  eid,
}) {
  Sentry.configureScope(scope => {
    scope.setUser({
      id,
      username,
      eid,
    })
  })
}

export default {
  install,
  setUser
}
