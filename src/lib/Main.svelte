<script>
  // @ts-nocheck

  import { useSensorData } from "../api.js";
  import { fade } from "svelte/transition";
  import Card from "./Card.svelte";
  import Chart from "./Chart.svelte";
  import Table from "./Table.svelte";
  import Spinner from "./Spinner.svelte";

  const sensorData = useSensorData();
</script>

{#if $sensorData.isLoading}
  <div
    out:fade={{ duration: 1000 }}
    class="absolute h-full w-full flex justify-center items-center"
  >
    <Spinner size="lg" />
  </div>
{:else if $sensorData.error}
  An error has occurred:
  {$sensorData.error.message}
{:else if $sensorData.data.length === 0}
  <h1>No data</h1>
{:else}
  <Card className="h-1/2 md:h-3/5">
    <Chart />
  </Card>
  <Card>
    <Table />
  </Card>
{/if}
