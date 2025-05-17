<script lang="ts">
    type props = {
        uid: number;
    };

    let {uid}: props = $props();

    let keywords = $state(["cat","cool","meow"]);



</script>


<h1>Tagging Entry, {uid}</h1>

<br>

<a href="#/tagging">Back</a>