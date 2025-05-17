import { contextBridge, ipcRenderer } from "electron";

export type SelectFileOptions = {
  directory?: string,
}

export const CONTEXT_BRIDGE = {
  /**
   * Returns the version from process.versions of the supplied target.
   */
  getVersion: async (opt: "electron" | "node"): Promise<string> => {
    return await ipcRenderer.invoke(`get-version`, opt);
  },

  selectFiles: async (opt: SelectFileOptions = {}): Promise<Electron.OpenDialogReturnValue> => {
    return await ipcRenderer.invoke("dialog:select-files", opt);
  }  
};

contextBridge.exposeInMainWorld("bridge", CONTEXT_BRIDGE);
