import axios from "axios";

import { loading, userBrowserLocale } from "./stores.js";

const localeStringOptions = { weekday: 'long', day: 'numeric', month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", };


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
 */
export function dateToFormattedString(userLocale, dt) {
  // @ts-ignore
  return dt.toLocaleDateString(userLocale, localeStringOptions)
}