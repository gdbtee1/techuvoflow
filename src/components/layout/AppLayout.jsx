import {
useState
} from "react";


import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

import MobileSidebar from "./MobileSidebar";



export default function AppLayout({
children
}){


const [mobileOpen,setMobileOpen]=useState(false);



return (

<div className="
min-h-screen
flex
bg-slate-50
">


<Sidebar/>


<MobileSidebar

open={mobileOpen}

setOpen={setMobileOpen}

/>



<div className="
flex-1
flex
flex-col
">


<Navbar

setMobileOpen={setMobileOpen}

/>


<main className="
flex-1
p-4
sm:p-6
">

{children}

</main>


</div>


</div>

)

}