<script>
  // @ts-nocheck

  import { onMount, onDestroy } from "svelte";
  import { chart } from "svelte-apexcharts";

  import { chartId, userBrowserLocale } from "../stores.js";
  import { useSensorData } from "../api.js";
  import { dateToFormattedString, toLocalTimezone } from "../utils.js"; // FIXME TIMEZONES!!!

  import en from "../locales/en.json";
  import pl from "../locales/pl.json";

  onDestroy(() => {
    chartData = null;
  });

  const sensorData = useSensorData();

  let chartData = {
    chart: {
      width: "95%",
      height: "100%",
      id: "mainChart",
      type: "line",
      locales: [en, pl],
      defaultLocale: "en", // TODO pickup locale from browser
      toolbar: {
        offsetY: null,
      },
    },
    // responsive: [
    //   {
    //     breakpoint: 1000,
    //     options: {
    //       chart: {
    //         width: "50%",
    //       },
    //     },
    //   },
    // ],
    noData: { text: "Loading..." },
    series: [
      {
        name: "Temp \u00b0C",
        type: "line",
        data: [],
      },
    ],
    xaxis: {
      type: "datetime",
      labels: {
        formatter: (/** @type {string} */ value) => {
          let date = new Date(value);
          return dateToFormattedString($userBrowserLocale, date, {
            timeStyle: "short",
          });
        },
      },
    },
    yaxis: {
      title: {
        text: "Temp \u00b0C",
      },
    },
    tooltip: {
      x: {
        formatter: (/** @type {string} */ value) => {
          let date = new Date(value);
          return dateToFormattedString($userBrowserLocale, date);
        },
      },
    },
  };

  $: {
    chartData.series[0].data = $sensorData.data.map((item, i) => ({
      x: toLocalTimezone(item.timestamp).getTime(),
      y: item.temp,
    }));
  }
</script>

<div class="h-full w-full">
  <div use:chart={chartData} />
</div>
