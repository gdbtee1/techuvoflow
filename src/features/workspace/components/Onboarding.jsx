import {
useState
} from "react";


import {
useAuth
} from "../../auth/context/AuthContext";


import {
createWorkspace
} from "../services/workspaceService";



export default function Onboarding(){


const {
user
}=useAuth();



const [business,setBusiness]=useState("");

const [industry,setIndustry]=useState("");

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");



async function submit(){


if(!user){

setError(
"User session not found. Please login again."
);

return;

}



if(!business || !industry){

setError(
"Please complete all fields."
);

return;

}



try{


setLoading(true);

setError("");



await createWorkspace({

name:business,

industry,

userId:user.id

});



// Reload app so workspace state refreshes

window.location.href="/";



}catch(err){


setError(
err.message
);


}finally{


setLoading(false);


}



}



return (

<main className="
min-h-screen
bg-slate-50
flex
items-center
justify-center
px-4
">


<section className="
bg-white
rounded-3xl
shadow-lg
w-full
max-w-lg
p-6
sm:p-10
">


<h1 className="
text-3xl
sm:text-4xl
font-bold
mb-3
">

Create Your Workspace

</h1>


<p className="
text-slate-500
mb-8
">

Set up your business profile before entering Techuvo Flow.

</p>



{
error && (

<div className="
bg-red-50
text-red-600
rounded-xl
p-3
mb-5
text-sm
">

{error}

</div>

)

}



<label className="
text-sm
font-medium
block
mb-2
">

Business Name

</label>



<input

className="
w-full
h-12
border
rounded-xl
px-4
mb-5
focus:ring-2
focus:ring-black/20
outline-none
"

placeholder="Example: Apex Roofing"

value={business}

onChange={
e=>setBusiness(e.target.value)
}

/>



<label className="
text-sm
font-medium
block
mb-2
">

Industry

</label>



<input

className="
w-full
h-12
border
rounded-xl
px-4
mb-6
focus:ring-2
focus:ring-black/20
outline-none
"

placeholder="Example: Roofing"

value={industry}

onChange={
e=>setIndustry(e.target.value)
}

/>



<button

onClick={submit}

disabled={loading}

className="
w-full
h-12
rounded-xl
bg-black
text-white
font-medium
disabled:opacity-50
transition
"

>

{

loading

?

"Creating Workspace..."

:

"Create Workspace"

}


</button>


</section>


</main>

)

}