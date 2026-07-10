import {supabase} from "../../../lib/supabase";


import {
createActivity
} from "../../activity/services/activityService";



export async function runLeadCreatedAutomation({

lead,
organizationId

}){


const {

data:automations,

error

}=await supabase

.from("automations")

.select(`

*,

automation_steps(*)

`)

.eq(
"organization_id",
organizationId
)

.eq(
"trigger",
"New Lead Created"
)

.eq(
"active",
true
);



if(error){

throw error;

}



if(!automations || automations.length===0){

return;

}





for(const automation of automations){


for(const step of automation.automation_steps){


await executeStep({

step,

lead,

organizationId

});


}



}



}







async function executeStep({

step,

lead,

organizationId

}){



switch(step.type){


case "Create Task":



await supabase

.from("tasks")

.insert({

lead_id:lead.id,

organization_id:organizationId,

title:
"Follow up with lead"

});



break;






case "Send Notification":



await createActivity({

lead_id:lead.id,

type:"notification",

content:
"Automation notification sent"

});



break;







case "Send Email":



await createActivity({

lead_id:lead.id,

type:"email",

content:
"Automation email triggered"

});



break;







default:


console.log(
"Unknown automation step:",
step.type
);



}



}