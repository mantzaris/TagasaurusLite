<script lang="ts">
  import { getContext } from "svelte";
  import { toast } from "../../components/toast/toastSvc.svelte";
  import ipc from "../../ipc";
  import type { TaggingRecord } from '../../../../electron/db/tagging';

  
  const taggingStore = getContext('tagging-store') as {
    taggingEntries: TaggingRecord[]
  }

  async function upload() {
      const results = await ipc.selectFiles();
          
      if(results.canceled) {
        return toast("info", "Upload Canceled")
      }

      if(results.filePaths.length != 1) {
        return toast("warning", "Currently 1 file upload is permitted at a time")
      }

      const filePath = results.filePaths[0];
      const entry = await ipc.createTaggingRecordFromFilePath(filePath);

      if(entry instanceof Error) {
        return toast('danger', entry.message);
      }
      
      // console.log({entry});
      taggingStore.taggingEntries.push(entry);
      toast('success',"Successfully Uploaded Media");
  }

</script>


<button onclick={upload} class="btn btn-primary btn-sm"><i class="fa-solid fa-upload pe-1"></i> Upload</button>