import {
supabase
} from "../../../lib/supabase";




// Get all automations for organization

export async function getAutomations(
organizationId
){


const {
data,
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








// Create automation + steps

export async function createAutomation({

organization_id,

name,

trigger,

steps=[]

}){


const {

data:automation,

error

}=await supabase

.from("automations")

.insert({

organization_id,

name,

trigger,

active:false

})

.select()

.single();



if(error){

throw error;

}






if(steps.length){


const formattedSteps = steps.map(

(step,index)=>({

automation_id:automation.id,

type:step,

position:index

})

);



const {

error:stepError

}=await supabase

.from("automation_steps")

.insert(
formattedSteps
);



if(stepError){

throw stepError;

}


}





return automation;

}









// Update automation

export async function updateAutomation(

id,

updates

){


const {

data,

error

}=await supabase

.from("automations")

.update({

...updates

})

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









// Enable / Disable automation

export async function toggleAutomation(

id,

active

){


const {

data,

error

}=await supabase

.from("automations")

.update({

active

})

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









// Delete automation

export async function deleteAutomation(

id

){


const {

error

}=await supabase

.from("automations")

.delete()

.eq(
"id",
id
);



if(error){

throw error;

}



}
