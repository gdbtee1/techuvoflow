import {supabase} from "../../../lib/supabase";


export async function createWorkspace({

name,
industry,
userId

}){


const {data:organization,error}

=
await supabase

.from("organizations")

.insert({

name,

industry,

owner_id:userId

})

.select()

.single();



if(error){

throw error;

}



const {error:profileError}

=
await supabase

.from("profiles")

.insert({

user_id:userId,

organization_id:organization.id,

role:"owner"

});



if(profileError){

throw profileError;

}



return organization;


}