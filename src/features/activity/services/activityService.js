import { supabase } from "../../../lib/supabase";


export async function getLeadActivities(leadId){


const {
data,
error

}=await supabase

.from("lead_activities")

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





export async function createActivity(activity){


const {
data,
error

}=await supabase

.from("lead_activities")

.insert({

lead_id: activity.lead_id,

organization_id: activity.organization_id,

type: activity.type,

description: activity.description

})

.select()

.single();



if(error){

throw error;

}



return data;

}