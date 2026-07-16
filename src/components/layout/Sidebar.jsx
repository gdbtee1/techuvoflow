import {
LayoutDashboard,
Users,
Workflow,
MessageSquare,
CalendarDays,
Bot,
BarChart3,
Settings,
Menu,
X,
PanelLeftClose,
PanelLeftOpen,
Sparkles
} from "lucide-react";

import {NavLink} from "react-router-dom";
import {useState} from "react";


const navigation = [
{name:"Dashboard",path:"/",icon:LayoutDashboard},
{name:"CRM",path:"/crm",icon:Users},
{name:"Automations",path:"/automations",icon:Workflow},
{name:"Inbox",path:"/inbox",icon:MessageSquare},
{name:"Appointments",path:"/appointments",icon:CalendarDays},
{name:"AI Agents",path:"/agents",icon:Bot},
{name:"Analytics",path:"/analytics",icon:BarChart3},
{name:"Settings",path:"/settings",icon:Settings}
];


export default function Sidebar(){

const [mobileOpen,setMobileOpen]=useState(false);
const [collapsed,setCollapsed]=useState(false);

function closeMobileMenu(){
setMobileOpen(false);
}

function NavigationContent({mobile=false}){

return (
<>
<div className={`
h-20
flex
items-center
border-b
border-slate-200
transition-all
duration-500
ease-[cubic-bezier(0.22,1,0.36,1)]
${collapsed && !mobile ? "justify-center px-3" : "justify-between px-5"}
`}>

<div className="flex items-center gap-3 min-w-0">
<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-black text-white shadow-sm">
<Sparkles size={18}/>
</div>

{(!collapsed || mobile) && (
<div className="min-w-0">
<h1 className="truncate text-lg font-bold text-slate-950">Techuvo Flow</h1>
<p className="truncate text-xs text-slate-500">Business command center</p>
</div>
)}
</div>

{mobile && (
<button
 type="button"
 onClick={closeMobileMenu}
 aria-label="Close navigation"
 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition duration-300 hover:bg-slate-100 active:scale-95"
>
<X size={20}/>
</button>
)}
</div>

<nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
{navigation.map((item)=>{
const Icon=item.icon;

return (
<NavLink
 key={item.name}
 to={item.path}
 onClick={mobile ? closeMobileMenu : undefined}
 title={collapsed && !mobile ? item.name : undefined}
 className={({isActive})=>`
 group
 relative
 flex
 h-12
 items-center
 rounded-2xl
 transition-all
 duration-300
 ease-out
 ${collapsed && !mobile ? "justify-center px-3" : "gap-3 px-4"}
 ${isActive ? "bg-slate-950 text-white shadow-md" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}
 `}
>
{({isActive})=>(
<>
<div className={`
flex
h-8
w-8
shrink-0
items-center
justify-center
rounded-xl
transition-all
duration-300
${isActive ? "bg-white/10" : "group-hover:bg-white"}
`}>
<Icon size={19}/>
</div>

{(!collapsed || mobile) && (
<span className="truncate text-sm font-medium">{item.name}</span>
)}

{isActive && !collapsed && (
<span className="ml-auto h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"/>
)}
</>
)}
</NavLink>
);
})}
</nav>

<div className={`border-t border-slate-200 p-3 transition-all duration-500 ${collapsed && !mobile ? "flex justify-center" : ""}`}>
{(!collapsed || mobile) && (
<div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
<p className="text-sm font-semibold text-slate-900">Build smarter systems</p>
<p className="mt-1 text-xs leading-5 text-slate-500">Keep leads, automations, and client activity in one place.</p>
</div>
)}

{!mobile && (
<button
 type="button"
 onClick={()=>setCollapsed(prev=>!prev)}
 aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
 className={`
 flex
 h-11
 items-center
 rounded-xl
 border
 border-slate-200
 bg-white
 text-sm
 font-medium
 text-slate-600
 transition-all
 duration-300
 hover:bg-slate-100
 hover:text-slate-950
 active:scale-[0.98]
 ${collapsed ? "w-11 justify-center" : "w-full gap-3 px-4"}
 `}
>
{collapsed ? <PanelLeftOpen size={19}/> : <><PanelLeftClose size={19}/><span>Collapse menu</span></>}
</button>
)}
</div>
</>
);
}

return (
<>
<button
 type="button"
 onClick={()=>setMobileOpen(true)}
 aria-label="Open navigation"
 className="fixed left-4 top-4 z-40 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white/95 text-slate-900 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 lg:hidden"
>
<Menu size={22}/>
</button>

<div
 onClick={closeMobileMenu}
 className={`
 fixed
 inset-0
 z-40
 bg-slate-950/45
 backdrop-blur-[2px]
 transition-all
 duration-500
 ease-[cubic-bezier(0.22,1,0.36,1)]
 lg:hidden
 ${mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
 `}
/>

<aside className={`
fixed
inset-y-0
left-0
z-50
flex
w-[min(88vw,320px)]
flex-col
border-r
border-slate-200
bg-white
shadow-2xl
transition-transform
duration-500
ease-[cubic-bezier(0.22,1,0.36,1)]
lg:hidden
${mobileOpen ? "translate-x-0" : "-translate-x-full"}
`}>
<NavigationContent mobile/>
</aside>

<aside className={`
hidden
min-h-screen
shrink-0
flex-col
border-r
border-slate-200
bg-white
transition-[width]
duration-500
ease-[cubic-bezier(0.22,1,0.36,1)]
lg:flex
${collapsed ? "w-24" : "w-72"}
`}>
<NavigationContent/>
</aside>
</>
);
}
