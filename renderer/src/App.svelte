<script lang="ts">
  import Router from "svelte-spa-router";
  import Test from "./routes/Test.svelte";
  import MainMenu from "./routes/main-menu/MainMenu.svelte";

  const routes = {
    "/test": Test,
    "/main-menu": MainMenu,

    "*": MainMenu
  };

</script>

<main>


  <Router routes={routes} />

  FOOBAR BAZ
  <i class="fa-solid fa-house"></i>

</main>
