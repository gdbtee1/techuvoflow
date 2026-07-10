import {logout} from "../services/authService";


export default function LogoutButton(){


async function handleLogout(){

await logout();

window.location.href="/login";

}


return (

<button

onClick={handleLogout}

className="
px-4
py-2
rounded-xl
hover:bg-slate-100
"

>

Logout

</button>

)

}