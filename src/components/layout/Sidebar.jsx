import {
LayoutDashboard,
Users,
Workflow,
MessageSquare,
CalendarDays,
Bot,
BarChart3,
Settings
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


export default function Sidebar(){


return (

<aside className="
hidden
lg:flex
w-72
bg-white
border-r
min-h-screen
flex-col
">


<div className="
h-20
flex
items-center
px-6
border-b
">

<h1 className="
text-xl
font-bold
">

Techuvo Flow

</h1>

</div>



<nav className="
flex-1
p-4
space-y-2
">


{
navigation.map((item)=>{


const Icon=item.icon;


return (

<NavLink

key={item.name}

to={item.path}

className={({isActive})=>

`
flex
items-center
gap-3
px-4
h-12
rounded-xl
transition

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

<span>

{item.name}

</span>


</NavLink>

)


})

}


</nav>



</aside>

)

}