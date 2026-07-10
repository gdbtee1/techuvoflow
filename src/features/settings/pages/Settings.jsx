import {
useState
} from "react";


import {
useWorkspace
} from "../../workspace/context/WorkspaceContext";



export default function Settings(){


const {
workspace
}=useWorkspace();



const [
activeTab,
setActiveTab
]=useState("workspace");



const [
form,
setForm
]=useState({

company:"",
email:"",
phone:"",

});






function updateField(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}








const tabs=[

{
id:"workspace",
name:"Workspace"
},

{
id:"profile",
name:"Profile"
},

{
id:"notifications",
name:"Notifications"
},

{
id:"integrations",
name:"Integrations"
},

{
id:"billing",
name:"Billing"
},

{
id:"security",
name:"Security"
}

];






return (

<section className="
space-y-8
w-full
">





<div>


<h1 className="
text-3xl
font-bold
">

Settings

</h1>


<p className="
text-slate-500
mt-2
">

Manage your Techuvo Flow workspace.

</p>


</div>









<div className="
grid
grid-cols-1
lg:grid-cols-4
gap-6
">






<div className="
bg-white
rounded-2xl
shadow
p-4
space-y-2
">


{

tabs.map(tab=>(


<button

key={tab.id}

onClick={()=>setActiveTab(tab.id)}

className={`
w-full
text-left
px-4
py-3
rounded-xl

${
activeTab===tab.id

?

"bg-black text-white"

:

"hover:bg-slate-100"

}

`}

>


{tab.name}


</button>



))


}


</div>








<div className="
lg:col-span-3
bg-white
rounded-2xl
shadow
p-6
">





{
activeTab==="workspace"

&&

<WorkspaceSettings

form={form}

updateField={updateField}

/>

}





{
activeTab==="profile"

&&

<ProfileSettings/>

}




{
activeTab==="notifications"

&&

<NotificationSettings/>

}





{
activeTab==="integrations"

&&

<IntegrationSettings/>

}





{
activeTab==="billing"

&&

<BillingSettings/>

}





{
activeTab==="security"

&&

<SecuritySettings/>

}






</div>






</div>








</section>

)

}









function WorkspaceSettings({

form,

updateField

}){


return (

<div className="
space-y-5
">


<h2 className="
text-xl
font-bold
">

Workspace Settings

</h2>




<input

name="company"

placeholder="Company name"

value={form.company}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

/>





<input

name="email"

placeholder="Business email"

value={form.email}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

/>






<input

name="phone"

placeholder="Phone number"

value={form.phone}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

/>





<button

className="
bg-black
text-white
rounded-xl
px-5
py-3
"

>

Save Changes

</button>


</div>

)

}









function ProfileSettings(){


return (

<div>


<h2 className="
text-xl
font-bold
mb-4
">

Profile

</h2>


<p className="
text-slate-500
">

Personal account settings will appear here.

</p>


</div>

)

}









function NotificationSettings(){


return (

<div>


<h2 className="
text-xl
font-bold
mb-4
">

Notifications

</h2>


<label className="
flex
gap-3
items-center
">

<input type="checkbox"/>

Email notifications

</label>



<label className="
flex
gap-3
items-center
mt-3
">

<input type="checkbox"/>

Appointment reminders

</label>


</div>

)

}









function IntegrationSettings(){


return (

<div>


<h2 className="
text-xl
font-bold
mb-4
">

Integrations

</h2>



<div className="
space-y-3
">


<div className="
border
rounded-xl
p-4
">

OpenAI

<br/>

<span className="
text-sm
text-slate-500
">

Connect AI services later

</span>

</div>




<div className="
border
rounded-xl
p-4
">

Twilio

<br/>

<span className="
text-sm
text-slate-500
">

SMS automation later

</span>

</div>




<div className="
border
rounded-xl
p-4
">

Stripe

<br/>

<span className="
text-sm
text-slate-500
">

Billing integration later

</span>

</div>



</div>


</div>

)

}









function BillingSettings(){


return (

<div>


<h2 className="
text-xl
font-bold
mb-4
">

Billing

</h2>


<p className="
text-slate-500
">

Stripe subscription management will connect here.

</p>


</div>

)

}









function SecuritySettings(){


return (

<div>


<h2 className="
text-xl
font-bold
mb-4
">

Security

</h2>


<p className="
text-slate-500
">

Authentication and workspace permissions.

</p>


</div>

)

}