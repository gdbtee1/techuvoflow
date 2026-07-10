import {supabase} from "../../../lib/supabase";



export async function getLeads(organizationId){

const {
data,
error

}=await supabase

.from("leads")

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






export async function getLead(leadId){

const {
data,
error

}=await supabase

.from("leads")

.select("*")

.eq(
"id",
leadId
)

.single();


if(error){

throw error;

}


return data;

}







export async function createLead(lead){

const {
data,
error

}=await supabase

.from("leads")

.insert({

...lead

})

.select()

.single();


if(error){

throw error;

}


return data;

}







export async function updateLead(
leadId,
updates
){

const {
data,
error

}=await supabase

.from("leads")

.update({

name:updates.name,

email:updates.email,

phone:updates.phone,

company:updates.company,

notes:updates.notes,

value:updates.value,

stage:updates.stage,

status:updates.status

})

.eq(
"id",
leadId
)

.select()

.single();



if(error){

throw error;

}


return data;

}







export async function updateLeadStage(
leadId,
stage
){

const {
error

}=await supabase

.from("leads")

.update({

stage

})

.eq(
"id",
leadId
);



if(error){

throw error;

}


}







export async function deleteLead(
leadId
){

const {
error

}=await supabase

.from("leads")

.delete()

.eq(
"id",
leadId
);



if(error){

throw error;

}


}







export async function deleteLeads(
leadIds
){

const {
error

}=await supabase

.from("leads")

.delete()

.in(
"id",
leadIds
);



if(error){

throw error;

}


}