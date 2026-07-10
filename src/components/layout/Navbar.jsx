import {
  Bell,
  Menu
} from "lucide-react";


import {
useWorkspace
} from "../../features/workspace/context/WorkspaceContext";


import UserMenu from "./UserMenu";



export default function Navbar({
setMobileOpen
}){


const {workspace}=useWorkspace();



return (

<header className="
h-20
bg-white
border-b
flex
items-center
justify-between
px-4
sm:px-6
">


<div className="
flex
items-center
gap-4
">


<button

onClick={()=>setMobileOpen(true)}

className="
lg:hidden
h-11
w-11
rounded-xl
hover:bg-slate-100
flex
items-center
justify-center
"

>

<Menu/>

</button>



<div>

<h2 className="
font-semibold
">

{workspace?.name || "Workspace"}

</h2>


<p className="
text-sm
text-slate-500
">

Techuvo Flow

</p>


</div>


</div>



<div className="
flex
items-center
gap-3
">


<button

className="
h-11
w-11
rounded-xl
hover:bg-slate-100
flex
items-center
justify-center
"

>

<Bell/>

</button>



<UserMenu/>


</div>



</header>

)

}