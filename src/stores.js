import axios from "axios";
import { writable, readable } from "svelte/store";
import { getBrowserLocale } from "./utils";

async function fetchSensorData() {
  loading.set(true)
  const res = await axios.get("https://piec.bartoszmagiera.me/data")
  const data = res.data;
  loading.set(false)
  return data;
}

export const chartId = writable("mainChart");
export const loading = writable(false);

export const userBrowserLocale = readable(getBrowserLocale())

export const sensorData = readable(await fetchSensorData(), function start(set) {
  const interval = setInterval(async () => {
    set(await fetchSensorData())
  }, 180000) // update every 3 min TODO make this time frame a state and store it in local storage

  return function stop() {
    clearInterval(interval)
  }
})