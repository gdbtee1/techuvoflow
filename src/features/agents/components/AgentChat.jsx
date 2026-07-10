import {
useState
} from "react";



export default function AgentChat({

agent

}){


const [
input,
setInput
]=useState("");



const [
messages,
setMessages
]=useState([

{

id:1,

role:"assistant",

content:"Hello! I am ready to help test this AI agent.",

time:"Now"

}

]);



const [
loading,
setLoading
]=useState(false);






function sendMessage(){


if(!input.trim())return;



const userMessage={

id:Date.now(),

role:"user",

content:input,

time:"Now"

};



setMessages(prev=>[

...prev,

userMessage

]);



setInput("");



setLoading(true);





setTimeout(()=>{


setMessages(prev=>[

...prev,

{

id:Date.now(),

role:"assistant",

content:"AI response will connect here through OpenAI API.",

time:"Now"

}

]);



setLoading(false);



},700);



}









function clearChat(){


setMessages([

{

id:1,

role:"assistant",

content:"Conversation cleared. Ready for testing.",

time:"Now"

}

]);


}









return (

<div className="
bg-white
rounded-2xl
shadow
border
flex
flex-col
min-h-[450px]
max-h-[600px]
overflow-hidden
w-full
">







{/* Header */}

<div className="
p-5
border-b
flex
justify-between
items-center
gap-3
">


<div className="
min-w-0
">


<h2 className="
font-bold
text-lg
truncate
">

{
agent?.name || "Agent Preview"
}

</h2>



<p className="
text-sm
text-slate-500
truncate
">

{

agent?.role || "AI Assistant"

}

</p>


</div>






<button

onClick={clearChat}

className="
text-sm
text-slate-500
hover:text-black
"

>

Clear

</button>


</div>









{/* Messages */}

<div className="
flex-1
overflow-y-auto
p-5
space-y-4
">


{

messages.map(message=>(


<div

key={message.id}

className={`
flex
${
message.role==="user"

?

"justify-end"

:

"justify-start"

}
`}

>



<div

className={`
max-w-[85%]
rounded-2xl
p-3
break-words

${
message.role==="user"

?

"bg-black text-white"

:

"bg-slate-100 text-slate-900"

}

`}

>


<p>

{message.content}

</p>


<span className="
text-xs
opacity-60
block
mt-2
">

{message.time}

</span>


</div>



</div>


))


}






{

loading && (

<div className="
bg-slate-100
rounded-2xl
p-3
w-fit
text-sm
">

Thinking...

</div>

)

}



</div>









{/* Input */}

<div className="
border-t
p-4
flex
gap-3
">


<input

value={input}

onChange={
e=>setInput(e.target.value)
}

onKeyDown={
e=>{

if(e.key==="Enter"){

sendMessage();

}

}

}

placeholder="Test your AI agent..."

className="
flex-1
border
rounded-xl
px-4
py-3
min-w-0
"

/>






<button

onClick={sendMessage}

className="
bg-black
text-white
rounded-xl
px-5
"

>

Send

</button>



</div>








</div>

)

}