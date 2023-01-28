<script>
  // @ts-nocheck

  //   <!-- todo  -->
  // <!-- zoom on render to latest data --> easy to do
  // <!-- table underneath -->
  // start-end date picker
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import "./app.css";
  import Main from "./lib/Main.svelte";

  const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
  <main class="pt-2 h-screen w-screen bg-neutral-100">
    <Main />
  </main>
</QueryClientProvider>
