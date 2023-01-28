<script>
  // @ts-nocheck

  import Spinner from "./Spinner.svelte";
  import { userBrowserLocale } from "../stores.js";
  import {
    toLocalTimezone,
    dateToFormattedString,
    getLocaleValues,
  } from "../utils.js";

  import { useCalculateData, useSensorData } from "../api.js";

  const shortDataOptions = {
    day: "numeric",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  /**
   * @param {{ temp: string; }[]} data
   */
  function getDiff(data) {
    let x = data.at(-1) ? parseFloat(data.at(-1).temp) : null;
    let y = parseFloat(data[0].temp);

    if (x === null) {
      return null;
    }

    return x - y;
  }

  let locale = getLocaleValues($userBrowserLocale);

  // queries
  const sensorData = useSensorData();
  const sensorDataMax = useCalculateData("max");
  const sensorDataMin = useCalculateData("min");
  const sensorDataAvg = useCalculateData("avg");

  // reactive
  $: lastDataPoint = $sensorData.data[$sensorData.data.length - 1];
  $: diff10min = getDiff($sensorData.data.slice(-10));
  $: diff1h = getDiff($sensorData.data.slice(-60));
  $: title = lastDataPoint
    ? `Piec: ${lastDataPoint.temp}\u00b0C [${dateToFormattedString(
        $userBrowserLocale,
        toLocalTimezone(lastDataPoint.timestamp),
        { hour: "2-digit", minute: "2-digit", second: "2-digit" }
      )}]`
    : "Piec";
  $: {
    document.title = title;
  }
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
      <td class="p-2" on:click={() => console.log($sensorData.data)}
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
        {#if $sensorDataMax.isLoading}
          <Spinner size="sm" extraCls="mx-auto" />
        {:else if $sensorDataMax.error}
          <span>Error</span>
        {:else}
          <span>{`${$sensorDataMax.data.result.toFixed(2)}\u00b0C`}</span>
        {/if}
      </td>
    </tr>
    <tr class="">
      <td class="p-2">{locale.table.minT}</td>
      <td class="text-center">
        {#if $sensorDataMin.isLoading}
          <Spinner size="sm" extraCls="mx-auto" />
        {:else if $sensorDataMin.error}
          <span>Error</span>
        {:else}
          <span>{`${$sensorDataMin.data.result.toFixed(2)}\u00b0C`}</span>
        {/if}
      </td>
    </tr>
    <tr class="bg-gray-200">
      <td class="p-2">{locale.table.avgT}</td>
      <td class="text-center">
        {#if $sensorDataAvg.isLoading}
          <Spinner size="sm" extraCls="mx-auto" />
        {:else if $sensorDataAvg.error}
          <span>Error</span>
        {:else}
          <span>{`${$sensorDataAvg.data.result.toFixed(2)}\u00b0C`}</span>
        {/if}
      </td>
    </tr>
  </table>
</div>
