import { writable, readable } from "svelte/store";
import { getBrowserLocale } from "./utils";

export const chartId = writable("mainChart");

export const userBrowserLocale = readable(getBrowserLocale())
