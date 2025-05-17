<script lang="ts">
  import Router from "svelte-spa-router";
  import Tagging from "./routes/tagging/Tagging.svelte";
    

  const routes = {
    '/tagging': Tagging,
    '*': Tagging
  };

</script>

<main>


  <Router routes={routes} />



</main>
