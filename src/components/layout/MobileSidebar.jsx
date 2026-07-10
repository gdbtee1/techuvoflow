import {
LayoutDashboard,
Users,
Workflow,
MessageSquare,
CalendarDays,
Bot,
BarChart3,
Settings,
X
} from "lucide-react";

import {NavLink} from "react-router-dom";


const navigation = [

{
name:"Dashboard",
path:"/",
icon:LayoutDashboard
},

{
name:"CRM",
path:"/crm",
icon:Users
},

{
name:"Automations",
path:"/automations",
icon:Workflow
},

{
name:"Inbox",
path:"/inbox",
icon:MessageSquare
},

{
name:"Appointments",
path:"/appointments",
icon:CalendarDays
},

{
name:"AI Agents",
path:"/agents",
icon:Bot
},

{
name:"Analytics",
path:"/analytics",
icon:BarChart3
},

{
name:"Settings",
path:"/settings",
icon:Settings
}

];


export default function MobileSidebar({
open,
setOpen
}){


return (

<div

className={`
fixed
inset-0
z-50
lg:hidden

${open ? "block" : "hidden"}

`}

>


<div

className="
absolute
inset-0
bg-black/40
"

onClick={()=>setOpen(false)}

/>



<aside

className="
relative
w-72
h-full
bg-white
p-5
"

>


<div className="
flex
justify-between
items-center
mb-8
">


<h1 className="
font-bold
text-xl
">

Techuvo Flow

</h1>


<button

onClick={()=>setOpen(false)}

className="
h-11
w-11
rounded-xl
hover:bg-slate-100
"

>

<X/>

</button>


</div>



<nav className="space-y-2">


{
navigation.map(item=>{


const Icon=item.icon;


return (

<NavLink

key={item.name}

to={item.path}

onClick={()=>setOpen(false)}

className={({isActive})=>

`
flex
items-center
gap-3
h-12
px-4
rounded-xl

${isActive
?
"bg-black text-white"
:
"hover:bg-slate-100"
}

`

}

>

<Icon size={20}/>

{item.name}


</NavLink>

)


})

}


</nav>


</aside>


</div>

)

}