<script>
  import { fade } from "svelte/transition";
  import Chart from "./lib/Chart.svelte";
  import Spinner from "./lib/Spinner.svelte";
  import "./app.css";

  import { loading } from "./stores.js";
</script>

<main class="h-screen w-screen">
  {#if $loading}
    <div
      out:fade={{ duration: 1000 }}
      class="absolute h-full w-full flex justify-center items-center"
    >
      <Spinner />
    </div>
  {/if}
  <Chart />

  <!-- <button
      on:click={() =>
        ApexCharts.exec(
          "mainChart",
          "zoomX",
          toLocalTimezone("2022-08-12 18:00:00").getTime(),
          toLocalTimezone("2022-08-12 20:00:00").getTime()
        )}
      class="p-4 bg-pink-400 rounded">click me</button
    > -->
</main>
