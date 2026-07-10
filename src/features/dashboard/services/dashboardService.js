import {supabase} from "../../../lib/supabase";



export async function getDashboardStats(
organizationId
){


const [

leadsResult,

tasksResult,

automationsResult,

pipelineResult

]=await Promise.all([



supabase

.from("leads")

.select("*",{count:"exact",head:true})

.eq(
"organization_id",
organizationId
),



supabase

.from("tasks")

.select("*",{count:"exact",head:true})

.eq(
"organization_id",
organizationId
),



supabase

.from("automations")

.select("*",{count:"exact",head:true})

.eq(
"organization_id",
organizationId
),




supabase

.from("leads")

.select("stage")

.eq(
"organization_id",
organizationId
)



]);





if(leadsResult.error)
throw leadsResult.error;


if(tasksResult.error)
throw tasksResult.error;


if(automationsResult.error)
throw automationsResult.error;


if(pipelineResult.error)
throw pipelineResult.error;






const pipeline={

new:0,

contacted:0,

qualified:0,

proposal:0,

won:0,

lost:0

};





pipelineResult.data.forEach(
(lead)=>{


if(pipeline[lead.stage] !== undefined){

pipeline[lead.stage]++;

}


}

);





return {

leads:
leadsResult.count || 0,


tasks:
tasksResult.count || 0,


automations:
automationsResult.count || 0,


appointments:0,


pipeline

};


}








export async function getRecentActivities(
organizationId
){


const {
data,
error

}=await supabase

.from("activities")

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
)

.limit(10);




if(error){

throw error;

}



return data;


}