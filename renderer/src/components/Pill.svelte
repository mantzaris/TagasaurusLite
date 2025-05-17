<script lang="ts">
    
    type props = {
        colors?:string[], 
    };

    let {
        colors=["#8A74E9","#C6E974","#E98C74"]
    }: props = $props();
    
    const color = colors[Math.floor(Math.random() * colors.length)]
    
</script>

<!-- svelte-ignore slot_element_deprecated -->
<span class="pill" style:border-color={color}>
    <slot/>
</span>


<style>
    .pill {
        font-size: 12px;
        padding: 0.25rem 0.5rem;
        border: 1px solid #222;
        border-radius: 8px;
    }

</style>