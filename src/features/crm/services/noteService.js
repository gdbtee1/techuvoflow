import {supabase} from "../../../lib/supabase";


export async function getLeadNotes(leadId){

const {
data,
error

}=await supabase

.from("lead_notes")

.select("*")

.eq(
"lead_id",
leadId
)

.order(
"created_at",
{
ascending:false
}
);



if(error){

throw error;

}


return data || [];

}




export async function createNote(note){


const {
data,
error

}=await supabase

.from("lead_notes")

.insert(note)

.select()

.single();



if(error){

throw error;

}



return data;

}