import {
supabase
} from "../../../lib/supabase";



export async function getConversations(
organizationId
){


const {
data,
error

}=await supabase

.from("conversations")

.select(`
*,
messages(*)
`)

.eq(
"organization_id",
organizationId
)

.order(
"updated_at",
{
ascending:false
}

);



if(error){

throw error;

}



return data || [];

}







export async function createConversation({

organization_id,

lead_id,

channel="manual",

contact_name,

contact_email

}){


const {

data,

error

}=await supabase

.from("conversations")

.insert({

organization_id,

lead_id,

channel,

contact_name,

contact_email

})

.select()

.single();



if(error){

throw error;

}



return data;

}







export async function sendMessage({

conversation_id,

content,

sender="user"

}){


const {

data,

error

}=await supabase

.from("messages")

.insert({

conversation_id,

content,

sender

})

.select()

.single();



if(error){

throw error;

}




await supabase

.from("conversations")

.update({

last_message:content,

updated_at:new Date()

})

.eq(
"id",
conversation_id
);



return data;

}