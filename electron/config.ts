import path from 'path';
import fs from 'fs';
import {app} from 'electron';


const configPath = app.isPackaged ? path.join(process.resourcesPath, 'app', 'config.json')
  : path.join(__dirname, '..', '..', "config.json");

const INSTALLER_CONFIG = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const { BUILD_INSTALLER, DEBUG_BUILD, DEV } = INSTALLER_CONFIG;

export const TAGA_FILES_DIRECTORY = BUILD_INSTALLER ? path.join(app.getPath('userData'), 'TagasaurusLiteFiles') :
                                               path.join(__dirname, '..', '..', '..', 'TagasaurusLiteFiles')
                   
export const TAGA_DATA_DIRECTORY = path.join(TAGA_FILES_DIRECTORY, 'files'); //where the media files get stored

export const DB_FILE_NAME = 'TagasaurusDB.db';



export function initConfigFolders() {
  fs.mkdirSync(TAGA_FILES_DIRECTORY,{recursive:true});
  fs.mkdirSync(TAGA_DATA_DIRECTORY,{recursive: true});

}