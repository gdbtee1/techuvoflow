import {supabase} from "../../../lib/supabase";


export async function getLeadTasks(leadId){

const {
data,
error

}=await supabase

.from("tasks")

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




export async function createTask(task){


const {
data,
error

}=await supabase

.from("tasks")

.insert(task)

.select()

.single();



if(error){

throw error;

}


return data;

}