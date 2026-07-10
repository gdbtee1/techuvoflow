import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {login} from "../services/authService";


export default function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);

const [error,setError] = useState("");



async function handleLogin(){

setLoading(true);
setError("");

const {error}=await login(
email,
password
);


if(error){

setError(error.message);

setLoading(false);

return;

}


navigate("/");


}



return (

<main className="
min-h-screen
flex
items-center
justify-center
px-4
bg-slate-50
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


<h1 className="
text-3xl
font-bold
mb-2
">

Welcome back

</h1>


<p className="
text-slate-500
mb-8
">

Login to your Techuvo Flow workspace

</p>



{error && (

<div className="
bg-red-50
text-red-600
p-3
rounded-xl
mb-4
">

{error}

</div>

)}



<input

className="
w-full
h-12
border
rounded-xl
px-4
mb-4
"

placeholder="Email"

onChange={
e=>setEmail(e.target.value)
}

/>



<input

className="
w-full
h-12
border
rounded-xl
px-4
mb-6
"

type="password"

placeholder="Password"

onChange={
e=>setPassword(e.target.value)
}

/>



<button

disabled={loading}

onClick={handleLogin}

className="
w-full
h-12
rounded-xl
bg-black
text-white
font-medium
disabled:opacity-50
"

>

{
loading
?
"Logging in..."
:
"Login"
}

</button>



<button

className="
mt-4
text-sm
text-slate-500
"

onClick={()=>navigate("/signup")}

>

Don't have an account? Sign up

</button>


</section>


</main>

)

}