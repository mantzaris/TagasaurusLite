<script lang="ts">
  import { toast } from "../../components/toast/toastSvc.svelte";
  import ipc from "../../ipc";


async function upload() {
    const results = await ipc.selectFiles();
    console.log(results);
    
    if(results.canceled) {
      return toast("info", "Upload Canceled")
    }

    if(results.filePaths.length != 1) {
      return toast("warning", "Currently 1 file upload is permitted at a time")
    }

    const filePath = results.filePaths[0];
    console.log(filePath);

    const entry = await ipc.createTaggingRecordFromFilePath(filePath);
    console.log(entry);
}
</script>


<button onclick={upload} class="btn btn-primary btn-sm"><i class="fa-solid fa-upload pe-1"></i> Upload</button>