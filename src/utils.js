import en from "./locales/en.json";
import pl from "./locales/pl.json";

const defaultLocaleStringOptions = { weekday: 'long', day: 'numeric', month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", };


export function getBrowserLocale() {
  if (navigator.languages) {
    if (navigator.languages.length) {
      return navigator.languages[0]
    } else {
      return navigator.language
    }
  } else {
    return "en-US"
  }
}

/**
 * @param {string} userLocale
 */
export function getLocaleValues(userLocale) {
  if (userLocale == "pl-PL") {
    return pl
  }
  return en
}

/**
 * @param {string} timestamp
 */
export function toLocalTimezone(timestamp) {
  const dt = new Date(
    new Date(timestamp).getTime() - new Date().getTimezoneOffset() * 60000
  );
  return dt;
}

/**
 * @param {string} userLocale
 * @param {Date} dt
 * @param {object} localeStringOptions
 */
export function dateToFormattedString(userLocale, dt, localeStringOptions = defaultLocaleStringOptions) {
  let dtFormat = new Intl.DateTimeFormat(userLocale, localeStringOptions)
  return dtFormat.format(dt)
}

export function getTimestampNow24hAgo() {
  let dt = new Date()
  dt.setDate(dt.getDate() - 1) // getDate returns day (numeric) - 1 to get date 24h ago
  return dt.getTime()

}