import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {signup} from "../services/authService";


export default function Signup(){


const navigate = useNavigate();


const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");



async function handleSignup(){


setLoading(true);

setError("");



const {error} = await signup(
email,
password
);



if(error){

setError(error.message);

setLoading(false);

return;

}



navigate("/onboarding");


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
w-full
max-w-md
bg-white
rounded-3xl
shadow-lg
p-6
sm:p-10
">


<div className="mb-8">


<h1 className="
text-3xl
sm:text-4xl
font-bold
tracking-tight
">

Create your Techuvo Flow account

</h1>


<p className="
text-slate-500
mt-3
">

Start building your AI-powered business workspace.

</p>


</div>



{
error && (

<div className="
bg-red-50
border
border-red-200
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

Email

</label>


<input

className="
w-full
h-12
border
rounded-xl
px-4
mb-5
outline-none
focus:ring-2
focus:ring-black/20
"

placeholder="you@company.com"

value={email}

onChange={
e=>setEmail(e.target.value)
}

/>




<label className="
text-sm
font-medium
block
mb-2
">

Password

</label>


<input

className="
w-full
h-12
border
rounded-xl
px-4
mb-6
outline-none
focus:ring-2
focus:ring-black/20
"

placeholder="Create a password"

type="password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

/>




<button

onClick={handleSignup}

disabled={loading}

className="
w-full
h-12
rounded-xl
bg-black
text-white
font-medium
transition
hover:opacity-90
disabled:opacity-50
"

>

{

loading

?

"Creating account..."

:

"Create Account"

}


</button>



<button

onClick={()=>navigate("/login")}

className="
w-full
mt-5
text-sm
text-slate-500
hover:text-black
"

>

Already have an account? Login

</button>



</section>


</main>

)

}