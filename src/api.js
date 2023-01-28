import { useQuery } from "@sveltestack/svelte-query";
import axios from "axios"
import { getTimestampNow24hAgo } from "./utils";

export const queryConfig = {
  staleTime: 1000 * 60 * 2,
  refetchInterval: 1000 * 60 * 2,
  refetchIntervalInBackground: true,
}

// @ts-ignore
const API_BASE_URL = import.meta.env.VITE_API_BASE;

async function fetchSensorData() {
  const start = getTimestampNow24hAgo()
  const end = new Date().getTime()

  const { data } = await axios.get(`${API_BASE_URL}/data?start=${start}&end=${end}`)
  return data
}

/**
 * @param {string} operation
 */
async function getCalculate(operation) {
  const start = getTimestampNow24hAgo()
  const end = new Date().getTime()

  const { data } = await axios.get(
    `${API_BASE_URL}/data/calculate?operation=${operation}&start=${start}&end=${end}`
  );
  return data
}

export function useSensorData() {
  return useQuery(["sensorData"], fetchSensorData, queryConfig)
}

export function useCalculateData(operation) {
  return useQuery(["sensorData", operation], () => getCalculate(operation), queryConfig)
}