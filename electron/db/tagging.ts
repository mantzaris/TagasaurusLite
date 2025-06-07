import { Row } from "@libsql/client";
import { client } from "./db"



export type TaggingRecord = {
    id: bigint,
    file_path: string,
    filetype: string
    file_hash: string,
    title: string,
    description: string,
    description_embedding: Float32Array,    
    face_embeddings: Float32Array,
}

export async function createTaggingRecord(r:TaggingRecord) {
    const {file_path, filetype, file_hash, title, description, description_embedding, face_embeddings} = r;
    const res = await client.execute({
        sql: `INSERT INTO tagging (file_path, filetype, file_hash, title, description, description_embedding, face_embeddings) values (?,?,?,?,?,?,?)`,
        args: [file_path, filetype, file_hash, title, description, description_embedding, face_embeddings],
    })

    r.id = res.lastInsertRowid;
    return r;
}


function taggingRowToTaggingRecord(row: Row) {
    return {
        ...row,
    } as unknown as TaggingRecord;
}
   
export async function getAllFromTagging() {
    const res = await client.execute(`SELECT * FROM tagging;`);

    return res.rows.map(taggingRowToTaggingRecord);
}
