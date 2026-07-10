export default function AgentBuilder({

onCreate

}){


return (

<div className="
bg-white
rounded-2xl
shadow
p-6
space-y-6
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
">

Configure your AI employee before connecting APIs.

</p>

</div>







<div className="
space-y-4
">


<input

placeholder="Agent Name"

className="
border
rounded-xl
p-3
w-full
"

/>





<select

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







<textarea

placeholder="Agent instructions..."

className="
border
rounded-xl
p-3
w-full
h-32
"

/>







<select

className="
border
rounded-xl
p-3
w-full
"

>


<option>

Professional Tone

</option>


<option>

Friendly Tone

</option>


<option>

Casual Tone

</option>


</select>







</div>







<button

onClick={onCreate}

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