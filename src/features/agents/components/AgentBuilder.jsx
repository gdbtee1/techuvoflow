import {
useState
} from "react";



export default function AgentBuilder({

onCreate

}){


const [
form,
setForm
]=useState({

name:"",

role:"Sales Agent",

tone:"Professional",

instructions:"",

goals:"",

capabilities:[]

});






const capabilities=[

"Lead Generation",

"Customer Support",

"Appointment Booking",

"Follow Ups",

"Email Replies",

"Sales Qualification"

];







function updateField(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}







function toggleCapability(item){


setForm(prev=>({


...prev,


capabilities:

prev.capabilities.includes(item)

?

prev.capabilities.filter(
cap=>cap!==item
)

:

[
...prev.capabilities,
item
]


}));


}







function create(){


if(!form.name.trim())return;



onCreate({

...form,

status:"active",

messages:0,

model:"Not Connected"

});



setForm({

name:"",

role:"Sales Agent",

tone:"Professional",

instructions:"",

goals:"",

capabilities:[]

});


}








return (

<div className="
bg-white
rounded-2xl
shadow
border
p-6
space-y-6
w-full
min-w-0
">






<div>


<h2 className="
text-xl
font-bold
">

Create AI Agent

</h2>


<p className="
text-slate-500
text-sm
mt-1
">

Design your AI employee before connecting OpenAI.

</p>


</div>









<div className="
grid
grid-cols-1
md:grid-cols-2
gap-4
">





<input

name="name"

value={form.name}

onChange={updateField}

placeholder="Agent name"

className="
border
rounded-xl
p-3
w-full
"

/>






<select

name="role"

value={form.role}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

>


<option>

Sales Agent

</option>


<option>

Support Agent

</option>


<option>

Appointment Agent

</option>


<option>

Lead Qualification Agent

</option>


</select>






<select

name="tone"

value={form.tone}

onChange={updateField}

className="
border
rounded-xl
p-3
w-full
"

>


<option>

Professional

</option>


<option>

Friendly

</option>


<option>

Casual

</option>


<option>

Luxury

</option>


</select>





</div>








<textarea

name="instructions"

value={form.instructions}

onChange={updateField}

placeholder="Agent instructions..."

className="
border
rounded-xl
p-3
w-full
h-32
resize-none
"

/>









<textarea

name="goals"

value={form.goals}

onChange={updateField}

placeholder="What should this agent accomplish?"

className="
border
rounded-xl
p-3
w-full
h-28
resize-none
"

/>









<div>


<h3 className="
font-semibold
mb-3
">

Capabilities

</h3>



<div className="
flex
flex-wrap
gap-2
">


{

capabilities.map(item=>(


<button

key={item}

type="button"

onClick={()=>toggleCapability(item)}

className={`
px-3
py-2
rounded-full
text-sm
border

${
form.capabilities.includes(item)

?

"bg-black text-white"

:

"bg-white"

}

`}

>

{item}

</button>


))


}



</div>


</div>









<button

onClick={create}

className="
bg-black
text-white
rounded-xl
px-6
py-3
"

>

Create Agent

</button>








</div>

)

}