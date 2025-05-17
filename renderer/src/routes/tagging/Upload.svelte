<script lang="ts">
  import ipc from "../../ipc";


async function upload() {
    const results = await ipc.selectFiles();
    console.log(results);
}
</script>


<button onclick={upload} class="btn btn-primary btn-sm"><i class="fa-solid fa-upload pe-1"></i> Upload</button>