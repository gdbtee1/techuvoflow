import {
createContext,
useContext,
useEffect,
useState
} from "react";


import {supabase} from "../../../lib/supabase";


import {
useAuth
} from "../../auth/context/AuthContext";



const WorkspaceContext=createContext();



export function WorkspaceProvider({children}){


const {
user
}=useAuth();



const [workspace,setWorkspace]=useState(null);


const [loading,setLoading]=useState(true);



async function loadWorkspace(){


if(!user){

console.log("NO USER");

setLoading(false);

return;

}



console.log(
"CURRENT USER ID:",
user.id
);



try{


const {
data:profile,
error:profileError

}=await supabase

.from("profiles")

.select("organization_id")

.eq(
"user_id",
user.id
)

.maybeSingle();



console.log(
"PROFILE:",
profile
);


console.log(
"PROFILE ERROR:",
profileError
);



if(profileError){

throw profileError;

}



if(!profile?.organization_id){


console.log(
"NO ORGANIZATION ID"
);


setWorkspace(null);

setLoading(false);

return;

}




const {
data:organization,
error:organizationError

}=await supabase

.from("organizations")

.select("*")

.eq(
"id",
profile.organization_id
)

.maybeSingle();



console.log(
"ORGANIZATION:",
organization
);


console.log(
"ORGANIZATION ERROR:",
organizationError
);



if(organizationError){

throw organizationError;

}



setWorkspace(
organization
);



}catch(error){


console.error(
"WORKSPACE ERROR:",
error
);


setWorkspace(null);


}finally{


setLoading(false);


}


}




useEffect(()=>{


loadWorkspace();



},[user]);





return (

<WorkspaceContext.Provider

value={{

workspace,

loading,

refreshWorkspace:loadWorkspace

}}

>

{children}

</WorkspaceContext.Provider>

)

}




export function useWorkspace(){

return useContext(WorkspaceContext);

}