import path from 'path';
import fs from 'fs';
import {app} from 'electron';


const INSTALLER_CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));
const { BUILD_INSTALLER, DEBUG_BUILD, DEV } = INSTALLER_CONFIG;

export const TAGA_FILES_DIRECTORY = BUILD_INSTALLER ? path.join(app.getPath('userData'), 'TagasaurusFiles') :
                                               path.join(__dirname, '..', '..', '..', 'TagasaurusFiles')
                   
export const TAGA_DATA_DIRECTORY = path.join(TAGA_FILES_DIRECTORY, 'files'); //where the media files get stored

export const DB_FILE_NAME = 'TagasaurusDB.db';

export const TAGGING_TABLE_NAME = "Tagging"