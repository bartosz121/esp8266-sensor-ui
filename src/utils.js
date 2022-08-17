import axios from "axios";

import { loading } from "./stores.js";

/**
 * @param {string} timestamp
 */
export function toLocalTimezone(timestamp) {
  const dt = new Date(
    new Date(timestamp).getTime() - new Date().getTimezoneOffset() * 60000
  );
  return dt;
}