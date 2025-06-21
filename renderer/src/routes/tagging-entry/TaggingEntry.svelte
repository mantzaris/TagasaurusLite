<script lang="ts">
  import type { RouteResult } from "@mateothegreat/svelte5-router";




    type props = RouteResult;

    let {route}:props = $props();

    console.log(route)

    
    let keywords = $state(["cat","cool","meow"]);



</script>


<!-- <h1>Tagging Entry, {uid}</h1> -->

<br>

<a href="#/tagging">Back</a>