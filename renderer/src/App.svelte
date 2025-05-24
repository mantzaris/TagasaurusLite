<script lang="ts">
  import Router from "svelte-spa-router";
  import Tagging from "./routes/tagging/Tagging.svelte";
  import { TOAST_STORE } from "./components/toast/toastSvc.svelte";
  import Toast from "./components/toast/Toast.svelte";
    

  const routes = {
    '/tagging': Tagging,
    '*': Tagging
  };

</script>

<main>


  <Router routes={routes} />

  <div id="toasts-container">
    {#each TOAST_STORE.toasts as toast}
      <Toast {toast} />
    {/each}
  </div>
  

</main>

<style>

#toasts-container {
  position:absolute;
  bottom: 5vh;
  right: 5vw;
}

</style>