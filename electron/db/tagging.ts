import { Row } from "@libsql/client";
import { client } from "./db"



export type TaggingRecord = {
    id: bigint,
    file_path: string,
    file_type: string,
    file_hash: string,
    title: string,
    description: string,
    description_embedding: Float32Array,    
    face_embeddings: Float32Array,
}

export async function createTaggingRecord(r:TaggingRecord) {
    const {file_path, file_type, file_hash, title, description, description_embedding, face_embeddings} = r;
    const res = await client.execute({
        sql: `INSERT INTO tagging (file_path, file_type, file_hash, title, description, description_embedding, face_embeddings) values (?,?,?,?,?,?,?)`,
        args: [file_path, file_type, file_hash, title, description, description_embedding, face_embeddings],
    })

    r.id = res.lastInsertRowid;
    return r;
}


   
export async function getAllFromTagging(): Promise<TaggingRecord[]> {
    try {
        const res = await client.execute(`SELECT * FROM tagging;`);
        return res.rows as unknown as TaggingRecord[];
    } catch(err) {
        console.error(err);
        return [];
    }

}


export async function deleteAllFromTagging(): Promise<boolean> {
    try {
        const res = await client.execute(`DELETE FROM tagging`);
        await client.execute(`VACUUM`);
        
        if(res.rowsAffected != 0) return true;
    } catch(err) {
        console.error(err);
    }
}