import { contextBridge, ipcRenderer } from "electron";
import { TaggingRecord } from "./db/tagging";

export type SelectFileOptions = {
  directory?: string,
}

export const CONTEXT_BRIDGE = {
  /**
   * Returns the version from process.versions of the supplied target.
   */
  getVersion: async (opt: "electron" | "node"): Promise<string> => await ipcRenderer.invoke(`get-version`, opt),

  selectFiles: async (opt: SelectFileOptions = {}): Promise<Electron.OpenDialogReturnValue> => await ipcRenderer.invoke("dialog:select-files", opt),

  getAllFromTagging: async (): Promise<TaggingRecord[]> => await ipcRenderer.invoke("tagging:get-all"),

  createTaggingRecordFromFilePath: async (filePath: string): Promise<TaggingRecord> => await ipcRenderer.invoke("tagging:upload", filePath),
};

contextBridge.exposeInMainWorld("bridge", CONTEXT_BRIDGE);
