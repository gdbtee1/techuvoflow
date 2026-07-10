import {
useState
} from "react";


import {
ChevronDown,
LogOut,
Settings,
User
} from "lucide-react";


import {
useAuth
} from "../../features/auth/context/AuthContext";


import {
logout
} from "../../features/auth/services/authService";


import {
useNavigate
} from "react-router-dom";



export default function UserMenu(){


const {
user
}=useAuth();


const navigate = useNavigate();


const [open,setOpen]=useState(false);



async function handleLogout(){


await logout();


navigate("/login");


}



return (

<div className="
relative
">


<button

onClick={()=>setOpen(!open)}

className="
h-12
px-3
rounded-xl
border
flex
items-center
gap-3
hover:bg-slate-50
"

>


<div className="
h-8
w-8
rounded-full
bg-black
text-white
flex
items-center
justify-center
text-sm
">

{
user?.email?.charAt(0)
.toUpperCase()
}

</div>


<div className="
hidden
sm:block
text-left
">


<p className="
text-sm
font-medium
">

Account

</p>


<p className="
text-xs
text-slate-500
">

{user?.email}

</p>


</div>


<ChevronDown size={16}/>


</button>



{
open && (

<div className="
absolute
right-0
mt-3
w-64
bg-white
border
rounded-2xl
shadow-xl
p-2
z-50
">


<button

className="
w-full
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-slate-100
"

>

<User size={18}/>

Profile

</button>



<button

onClick={()=>navigate("/settings")}

className="
w-full
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-slate-100
"

>

<Settings size={18}/>

Settings

</button>



<button

onClick={handleLogout}

className="
w-full
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-red-50
text-red-600
"

>

<LogOut size={18}/>

Logout

</button>



</div>

)

}


</div>

)

}