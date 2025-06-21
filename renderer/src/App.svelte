<script lang="ts">
  // import Router from "svelte-spa-router";
  import Tagging from "./routes/tagging/Tagging.svelte";
  import { TOAST_STORE } from "./components/toast/toastSvc.svelte";
  import Toast from "./components/toast/Toast.svelte";
  import TaggingEntry from "./routes/tagging-entry/TaggingEntry.svelte";
  import { Router, type RouteConfig } from "@mateothegreat/svelte5-router";

  const routes: RouteConfig[] = [
    {
      component: Tagging
    },
    {
      path: "tagging",
      component: Tagging
    },
    {
      path: "/tagging/(?<uid>[a-z0-9]{25})",
      component: TaggingEntry
    }
  ]

  // const routes = {
  //   '/test': Test,
  //   '/tagging': Tagging,
  //   '/tagging/:uid/':TaggingEntry,
  //   '*': Tagging
  // };

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