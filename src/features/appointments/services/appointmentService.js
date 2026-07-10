import {
supabase
} from "../../../lib/supabase";



// Get appointments

export async function getAppointments(
organizationId
){


const {
data,
error

}=await supabase

.from("appointments")

.select(`
*,
leads(
id,
name,
email,
phone,
company
)
`)

.eq(
"organization_id",
organizationId
)

.order(
"start_time",
{
ascending:true
}

);



if(error){

throw error;

}



return data || [];

}









// Create appointment

export async function createAppointment({

organization_id,

lead_id,

title,

description,

start_time,

end_time,

status="scheduled"

}){


const {
data,
error

}=await supabase

.from("appointments")

.insert({

organization_id,

lead_id,

title,

description,

start_time,

end_time,

status

})

.select()

.single();



if(error){

throw error;

}



return data;

}









// Update appointment

export async function updateAppointment(

id,

updates

){


const {
data,
error

}=await supabase

.from("appointments")

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









// Delete appointment

export async function deleteAppointment(

id

){


const {
error

}=await supabase

.from("appointments")

.delete()

.eq(
"id",
id
);



if(error){

throw error;

}



}









// Get appointments by lead

export async function getLeadAppointments(

leadId

){


const {
data,
error

}=await supabase

.from("appointments")

.select("*")

.eq(
"lead_id",
leadId
)

.order(
"start_time",
{
ascending:false
}

);



if(error){

throw error;

}



return data || [];

}