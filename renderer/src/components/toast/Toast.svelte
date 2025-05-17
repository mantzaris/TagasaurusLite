<script lang="ts">
  import type { Toast } from './toast.svelte';
    
  let {toast}:{toast:Toast} = $props();

    

</script>



<div class={`alert alert-${toast.kind}`} role="alert">
    {toast.content}
</div>