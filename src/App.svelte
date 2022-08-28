<script>
  import { fade } from "svelte/transition";
  import Card from "./lib/Card.svelte";
  import Chart from "./lib/Chart.svelte";
  import Table from "./lib/Table.svelte";
  import Spinner from "./lib/Spinner.svelte";
  import "./app.css";

  import { loading } from "./stores.js";
</script>

<main class="pt-2 h-screen w-screen bg-neutral-100">
  {#if $loading}
    <div
      out:fade={{ duration: 1000 }}
      class="absolute h-full w-full flex justify-center items-center"
    >
      <Spinner size="lg" />
    </div>
  {/if}
  <Card className="h-1/2 md:h-3/5">
    <Chart />
  </Card>
  <Card>
    <Table />
  </Card>

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
