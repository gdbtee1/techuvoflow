import { supabase } from "../../../lib/supabase";



// Get all tasks for an organization

export async function getTasks(
organizationId
){


const {
data,
error

}=await supabase

.from("tasks")

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






// Get tasks connected to a specific lead

export async function getLeadTasks(
leadId
){


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








// Create task

export async function createTask(
task
){


const {
data,
error

}=await supabase

.from("tasks")

.insert({

...task

})

.select()

.single();



if(error){

throw error;

}



return data;

}








// Update task

export async function updateTask(
taskId,
updates
){


const {
data,
error

}=await supabase

.from("tasks")

.update({

...updates

})

.eq(
"id",
taskId
)

.select()

.single();



if(error){

throw error;

}



return data;

}








// Complete / reopen task

export async function toggleTaskStatus(
taskId,
currentStatus
){


const newStatus =

currentStatus === "completed"

?

"pending"

:

"completed";




return await updateTask(

taskId,

{

status:newStatus

}

);


}








// Delete one task

export async function deleteTask(
taskId
){


const {
error

}=await supabase

.from("tasks")

.delete()

.eq(
"id",
taskId
);



if(error){

throw error;

}



}








// Delete multiple tasks

export async function deleteTasks(
taskIds
){


const {
error

}=await supabase

.from("tasks")

.delete()

.in(
"id",
taskIds
);



if(error){

throw error;

}



}








// Get upcoming tasks

export async function getUpcomingTasks(
organizationId
){


const today =
new Date()
.toISOString();




const {
data,
error

}=await supabase

.from("tasks")

.select("*")

.eq(
"organization_id",
organizationId
)

.neq(
"status",
"completed"
)

.gte(
"due_date",
today
)

.order(
"due_date",
{
ascending:true
}

);



if(error){

throw error;

}



return data || [];

}