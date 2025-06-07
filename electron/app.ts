import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { join } from "path";
import { createTaggingRecord, getAllFromTagging, TaggingRecord } from "./db/tagging";
import { client, initDB } from "./db/db";
import { createHash } from "crypto";
import { readFileSync } from "fs";

let mainWindow: BrowserWindow;



app.once("ready", main);

async function main() {
  if(!initDB()) {
    console.error("could not init the DB");
    app.exit(1);
    return;
  }

  mainWindow = new BrowserWindow({
    width: 1440,
    height: 1024,
    autoHideMenuBar: true,
    resizable: true,
    show: true,
    webPreferences: {
      devTools: !app.isPackaged,
      preload: join(__dirname, "preload.js"),
    },
  });
  
  mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  mainWindow.once("ready-to-show", mainWindow.show);

}

ipcMain.handle("get-version", (_, key: "electron" | "node") => {
  return String(process.versions[key]);
});


ipcMain.handle("dialog:select-files", async (event, args) => {
  let dir = app.getPath('pictures');
  if(args.directory !== "") {
    dir = args.directory;
  }

  return await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'], //, 'multiSelections'],
    defaultPath: dir,    
  })
})


ipcMain.handle("tagging:get-all", async () => {
  return await getAllFromTagging();
})


ipcMain.handle("tagging:upload", async (_, file_path: string) => {
  //TODO: validate record
  const hash = createHash('sha256');
  hash.update(readFileSync(file_path));

  const res = await createTaggingRecord({
    file_path,
    id: BigInt('0'),
    filetype: "image",
    file_hash: hash.digest('hex'),
    title: 'my record',
    description: 'cool pic',
    description_embedding: new Float32Array(384),
    face_embeddings: new Float32Array(512)
  })

  console.log(res);
  return res;
})