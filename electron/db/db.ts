import libsql from 'libsql'
import path from 'path';
import { DB_FILE_NAME, TAGA_DATA_DIRECTORY, TAGGING_TABLE_NAME } from "../config";

export let db: libsql.Database;

async function initDB():Promise<boolean> {
    db = new libsql(path.join(TAGA_DATA_DIRECTORY, DB_FILE_NAME),{
        verbose: console.log
    });
    
    try {
        //id auto increment
        //description string
        //description_embedding ArrayFloat32 
        //title string
        //file_path string
        //face_embeddings ArrayFloat32[]
        //fileType string
        db.exec(`CREATE TABLE IF NOT EXISTS ${TAGGING_TABLE_NAME} (
            id INTEGER PRIMARY KEY, 
            file_path TEXT,
            file_type TEXT,
            file_hash TEXT,
            title VARCHAR,
            description TEXT, 
            description_embedding F32_BLOB(384), 
            face_embeddings F32_BLOB(384)
            )`)


    } catch(err) {
        console.error(err);
        return false;
    }

    return true;
}