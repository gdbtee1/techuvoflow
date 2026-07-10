import {supabase} from "../../../lib/supabase";





export async function getAgents(
organizationId
){


const {

data,

error

}=await supabase

.from("ai_agents")

.select("*")

.eq(
"organization_id",
organizationId
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








export async function createAgent({

organization_id,

name,

role,

instructions,

tone,

status="active"

}){


const {

data,

error

}=await supabase

.from("ai_agents")

.insert({

organization_id,

name,

role,

instructions,

tone,

status

})

.select()

.single();



if(error){

throw error;

}



return data;


}









export async function updateAgent(

id,

updates

){


const {

data,

error

}=await supabase

.from("ai_agents")

.update(updates)

.eq(
"id",
id
)

.select()

.single();



if(error){

throw error;

}



return data;


}








export async function deleteAgent(

id

){


const {

error

}=await supabase

.from("ai_agents")

.delete()

.eq(
"id",
id
);



if(error){

throw error;

}



return true;


}