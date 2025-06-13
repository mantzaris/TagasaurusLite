import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { join } from "path";
import { createTaggingRecord, deleteAllFromTagging, getAllFromTagging, TaggingRecord } from "./db/tagging";
import { client, initDB } from "./db/db";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { initConfigFolders } from "./config";

let mainWindow: BrowserWindow;



app.once("ready", main);

async function main() {


  //nothing before this important line
  try {
    initConfigFolders();
  } catch(err) {
    console.error(err);

    return app.quit();
  }


  if(!initDB()) {
    console.error("could not init the DB");
    app.exit(1);
    return;
  }

  // await deleteAllFromTagging();

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

  const titles = [
    "Whispers of the Horizon",
    "City Lights, Silent Nights",
    "The Edge of Stillness",
    "Through the Fog",
    "Balloons Over Dusk",
    "Frozen in Time",
    "Lanterns Beneath the Stars",
    "Steps Through Memory",
    "Crimson Skies, Golden Fields",
    "The Watcher in the Grass",
    "Echoes of a Quiet Morning",
    "Shadow and Bloom",
    "Reflections Before Dawn",
    "Path to Nowhere",
    "Windswept Silence",
    "Among the Falling Leaves",
    "A Moment Between Storms",
    "Twilight Crossing",
    "Lights Beneath the Rain",
    "Into the Ember Light",
    "Where the Mountains Breathe",
    "Stories in the Stone",
    "Midnight on the Marsh",
    "Above the Sleeping World",
    "Beneath the Lantern Glow"
  ];

  const descriptions = [
    "A tranquil lake mirrors the cotton-candy sky as dawn breaks over the mountains.",
    "A child’s balloon floats skyward between towering city skyscrapers.",
    "Golden light filters through an ancient forest, dancing on the moss-covered floor.",
    "A lone figure stands at the edge of a cliff, silhouetted against the setting sun.",
    "A rusty bicycle leans against a graffiti-covered alley wall, telling stories of time gone by.",
    "Waves crash dramatically against a rugged coastline under stormy skies.",
    "An old train chugs across a wooden trestle bridge nestled in autumn foliage.",
    "A marketplace bustles with color and energy, filled with spices, fabrics, and laughter.",
    "Snowflakes fall gently on a sleeping village, blanketing rooftops in silence.",
    "A lantern-lit boat glides across still waters under a canopy of stars.",
    "Dust swirls in golden shafts of light inside an abandoned cathedral.",
    "Children splash in puddles after a summer rainstorm, their laughter echoing through the streets.",
    "A curious fox peers through tall grass at the edge of a meadow at dusk.",
    "Neon lights reflect in rain-slicked streets of a quiet urban nightscape.",
    "A herd of wild horses gallops freely across a wide open plain at sunrise.",
    "An aerial view reveals a patchwork of farmland stretching to the horizon.",
    "Hot air balloons drift lazily above a canyon carved by centuries of wind and water.",
    "A weathered fisherman casts his net into a foggy sea at first light.",
    "Flower petals swirl in the wind during a spring festival in a mountain village.",
    "The Milky Way blazes across the sky above a solitary desert campsite.",
    "A narrow cobblestone street winds between ivy-covered stone houses.",
    "Golden reeds sway in rhythm with the breeze beside a quiet marsh.",
    "Steam rises from a cup of tea beside a rain-splattered windowpane.",
    "A group of dancers twirl in traditional dress during a cultural celebration.",
    "Fireflies shimmer above a tranquil forest clearing on a warm summer night."
  ];

  try{
    if(Math.random() <0.05) return new Error("Something went wrong uploading file.");

    //TODO: validate record
    const hash = createHash('sha256');
    hash.update(readFileSync(file_path));

    const res = await createTaggingRecord({
      file_path,
      id: BigInt('0'),
      file_type: "image",
      file_hash: hash.digest('hex'),
      title: titles[ Math.floor( Math.random() * titles.length ) ],
      description: descriptions[ Math.floor( Math.random() * descriptions.length ) ],
      description_embedding: new Float32Array(384),
      face_embeddings: new Float32Array(512)
    })

    return res;
  } catch(err) {
    console.error(err);
    return new Error("Could not upload file.");
  }

})