// import { seleniumLauncher } from "@web/test-runner-selenium"
// import webdriver from "selenium-webdriver"
import { playwrightLauncher } from "@web/test-runner-playwright"

const filteredLogs = [
  'Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.'
]

const filterBrowserLogs = (log) => {
  for (const arg of log.args) {
    if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
      return false
    }
  }
  return true
}

export default {
  nodeResolve: true,
  mimeTypes: {},
  plugins: [],
  filterBrowserLogs,
  browsers: [
    playwrightLauncher({
      product: "chromium"
    })
  ]
  // debug: true,
  // browsers: [
  //   seleniumLauncher({
  //     driverBuilder: new webdriver.Builder()
  //       .forBrowser("chrome")
  //       .usingServer("http://selenium:4444/wd/hub")
  //   })
  // ]
}
