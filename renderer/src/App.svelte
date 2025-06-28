<script lang="ts">
  import { TOAST_STORE } from "./components/toast/toastSvc.svelte";
  import Toast from "./components/toast/Toast.svelte";
  import { Router, createRouter, goto } from '@roxi/routify'
  import routes from "../.routify/routes.default.js"
  import { onMount } from "svelte";
  export const router = createRouter({ routes });

  onMount(() => {
    $goto("/tagging");
  });
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