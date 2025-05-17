import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { join } from "path";

let mainWindow: BrowserWindow;

app.once("ready", main);

async function main() {
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
    properties: ['openFile'],
    defaultPath: dir 
  })  
})