import axios from "axios";
import { writable, readable, get } from "svelte/store";
import { getBrowserLocale } from "./utils";

// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE;

/**
 * @param {number} [start] // timestamp
 * @param {number} [end] // timestamp
 */
async function fetchSensorData(start, end) {
  loading.set(true)
  const res = await axios.get(`${API_BASE_URL}/data?start=${start}&end=${end}`)
  const data = res.data;
  loading.set(false)
  return data;
}

function getTimestampNow24hAgo() {
  let dt = new Date()
  dt.setDate(dt.getDate() - 1) // getDate returns day (numeric) - 1 to get date 24h ago
  return dt.getTime()

}

export const startTime = writable(getTimestampNow24hAgo())
export const endTime = writable(new Date().getTime())

export const chartId = writable("mainChart");

export const loading = writable(false);

export const userBrowserLocale = readable(getBrowserLocale())

export const sensorData = readable(await fetchSensorData(get(startTime), get(endTime)), function start(set) {
  const interval = setInterval(async () => {
    // TODO flag here if user not messed with date set form
    endTime.set(new Date().getTime())
    set(await fetchSensorData(get(startTime), get(endTime)))
  }, 70000) // update every 3 min TODO make this time frame a state and store it in local storage

  return function stop() {
    clearInterval(interval)
  }
})
