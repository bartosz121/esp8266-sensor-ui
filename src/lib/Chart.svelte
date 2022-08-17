<script>
  import { onMount, onDestroy } from "svelte";
  import { chart } from "svelte-apexcharts";

  import { chartId, sensorData } from "../stores.js";

  import en from "../locales/en.json";
  import pl from "../locales/pl.json";

  onDestroy(() => {
    chartData = null;
  });

  let chartData = {
    chart: {
      width: "95%",
      height: "100%",
      id: "mainChart",
      type: "line",
      locales: [en, pl],
      defaultLocale: "pl", // TODO pickup locale from browser
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
    },
    yaxis: {
      title: {
        text: "Temp \u00b0C",
      },
    },
    tooltip: {
      x: {
        format: "dd dddd HH:mm:ss",
      },
    },
  };

  $: {
    chartData.series[0].data = $sensorData.map((item, i) => ({
      x: new Date(item.timestamp).getTime(),
      y: item.temp,
    }));
  }
</script>

<div class="h-1/2 md:h-3/4">
  <div use:chart={chartData} />
</div>
