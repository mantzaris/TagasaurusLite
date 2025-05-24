<script lang="ts">
  import type { Toast } from './toastSvc.svelte';
    
  let {toast}:{toast:Toast} = $props();

    

</script>



<div class={`alert alert-${toast.kind}`} role="alert">
    {toast.content}
</div>

<style>
  div {
    min-width: 250px;
    max-width: 500px;
    overflow: visible;
  }
</style>