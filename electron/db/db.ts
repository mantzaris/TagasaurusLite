import { Client, createClient } from '@libsql/client';
import path from 'path';
import { DB_FILE_NAME, TAGA_DATA_DIRECTORY } from "../config";

export let client: Client;

export async function initDB():Promise<boolean> {
    client = createClient({ url:`file:${path.join(TAGA_DATA_DIRECTORY, DB_FILE_NAME)}`});
    
    try {
        //id auto increment
        //description string
        //description_embedding ArrayFloat32 
        //title string
        //file_path string
        //face_embeddings ArrayFloat32[]
        //fileType string
        await client.execute(`CREATE TABLE IF NOT EXISTS tagging (
            id INTEGER PRIMARY KEY, 
            file_path TEXT,
            file_type VARCHAR(50),
            file_hash TEXT,
            title VARCHAR,
            description TEXT, 
            description_embedding F32_BLOB(384), 
            face_embeddings F32_BLOB(512)
            )`);

        

    } catch(err) {
        console.error(err);
        return false;
    }

    return true;
}