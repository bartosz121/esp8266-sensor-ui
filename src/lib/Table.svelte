<script>
  import axios from "axios";

  import Spinner from "./Spinner.svelte";

  import {
    sensorData,
    userBrowserLocale,
    startTime,
    endTime,
  } from "../stores.js";
  import {
    toLocalTimezone,
    dateToFormattedString,
    getLocaleValues,
  } from "../utils.js";

  const shortDataOptions = {
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  /**
   * @param {number} n
   * @param {{ temp: string; }[]} data
   */
  function getDiff(data, n) {
    let x = data[n] ? parseFloat(data[n].temp) : null;
    let y = parseFloat(data[0].temp);

    if (x === null) {
      return null;
    }

    return x - y;
  }

  /**
   * @param {string} operation
   * @param {number} [start] // timestamp
   * @param {number} [end] // timestamp
   */
  async function getCalculate(operation, start, end) {
    const res = await axios.get(
      `${API_BASE_URL}/data/calculate?operation=${operation}&start=${start}&end=${end}`
    );
    return res.data.result;
  }

  // @ts-ignore
  const API_BASE_URL = import.meta.env.VITE_API_BASE;
  let locale = getLocaleValues($userBrowserLocale);

  // reactive
  $: lastDataPoint = $sensorData[$sensorData.length - 1];
  $: diff10min = getDiff($sensorData.slice(0, 10), 9);
  $: diff1h = getDiff($sensorData.slice(0, 60), 59);
  $: promiseMaxT = getCalculate("max", $startTime, $endTime);
  $: promiseMinT = getCalculate("min", $startTime, $endTime);
  $: promiseAvgT = getCalculate("avg", $startTime, $endTime);
</script>

<div>
  <table class="w-full table-auto">
    <tr class="w-1/2 bg-zinc-300">
      <th class="p-2 w-2/3">{locale.table.headName}</th>
      <th class="p-2 text-center pr-4">{locale.table.headVal}</th>
    </tr>
    <tr class="">
      <td class="p-2"
        >{locale.table.lastRead} - {dateToFormattedString(
          $userBrowserLocale,
          toLocalTimezone(lastDataPoint.timestamp),
          shortDataOptions
        )}</td
      >
      <td class="text-center">{`${lastDataPoint.temp}\u00b0C`}</td>
    </tr>
    <tr class="bg-gray-200">
      <td class="p-2" on:click={() => console.log($sensorData)}
        >{locale.table.diff10min}</td
      >
      <td class="text-center"
        >{diff10min ? `${diff10min.toFixed(2)}\u00b0C` : "Error"}</td
      >
    </tr>
    <tr class="">
      <td class="p-2">{locale.table.diff1h}</td>
      <td class="text-center"
        >{diff1h ? `${diff1h.toFixed(2)}\u00b0C` : "Error"}</td
      >
    </tr>
    <tr class="bg-gray-200">
      <td class="p-2">{locale.table.maxT}</td>
      <td class="text-center">
        {#await promiseMaxT}
          <Spinner size="sm" extraCls="mx-auto" />
        {:then maxT}
          <span>{`${maxT.toFixed(2)}\u00b0C`}</span>
        {:catch error}
          <span>Error</span>
        {/await}
      </td>
    </tr>
    <tr class="">
      <td class="p-2">{locale.table.minT}</td>
      <td class="text-center">
        {#await promiseMinT}
          <Spinner size="sm" extraCls="mx-auto" />
        {:then minT}
          <span>{`${minT.toFixed(2)}\u00b0C`}</span>
        {:catch error}
          <span>Error</span>
        {/await}
      </td>
    </tr>
    <tr class="bg-gray-200">
      <td class="p-2">{locale.table.avgT}</td>
      <td class="text-center">
        {#await promiseAvgT}
          <Spinner size="sm" extraCls="mx-auto" />
        {:then avgT}
          <span>{`${avgT.toFixed(2)}\u00b0C`}</span>
        {:catch error}
          <span>Error</span>
        {/await}
      </td>
    </tr>
  </table>
</div>
