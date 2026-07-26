"use client";

import {
  MessageSquare,
  FileText,
  Brain,
  Mic,
  Calendar,
  History,
  User,
  LogOut,
} from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

import { useEffect, useState } from "react";


export default function Sidebar() {

  const router = useRouter();
  const pathname = usePathname();


  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");



  useEffect(() => {

    const user = auth.currentUser;

    if(user){

      setUserName(user.displayName || "Student");
      setEmail(user.email || "");

    }

  }, []);





  const handleLogout = async () => {

    await signOut(auth);

    router.push("/login");

  };





  const menuItems = [

    {
      name:"AI Chat",
      icon:MessageSquare,
      path:"/chat",
    },

    {
      name:"Notes Summary",
      icon:FileText,
      path:"/summary",
    },

    {
      name:"Quiz Generator",
      icon:Brain,
      path:"/quiz",
    },

    {
      name:"Viva Generator",
      icon:Mic,
      path:"/viva",
    },

    {
      name:"Study Planner",
      icon:Calendar,
      path:"/planner",
    },

    {
      name:"History",
      icon:History,
      path:"/history",
    },

    {
      name:"Profile",
      icon:User,
      path:"/profile",
    },

  ];






return (

<aside className="
w-72
min-h-screen
bg-slate-900
p-6
text-white
border-r
border-slate-800
">


<h1 className="text-2xl font-bold mb-8">
AI StudyMate 🤖
</h1>



{/* User Profile */}

<div className="
bg-slate-800
rounded-2xl
p-4
mb-8
">


<h2 className="font-bold text-lg">
Welcome 👋
</h2>


<p className="mt-2 text-blue-400">
{userName}
</p>


<p className="text-sm text-gray-400 break-all">
{email}
</p>


</div>





<nav className="space-y-3">


{
menuItems.map((item)=>{


const Icon=item.icon;

const active=pathname===item.path;


return (

<button

key={item.path}

onClick={()=>router.push(item.path)}

className={`
w-full
flex
items-center
gap-4
px-4
py-3
rounded-xl
transition

${
active
?
"bg-blue-600 text-white"
:
"text-gray-300 hover:bg-slate-800 hover:text-white"
}

`}

>


<Icon size={22}/>

<span>
{item.name}
</span>


</button>


);


})

}


</nav>





<button

onClick={handleLogout}

className="
mt-10
flex
items-center
gap-4
bg-red-600
hover:bg-red-700
px-4
py-3
rounded-xl
w-full
"

>


<LogOut size={22}/>

Logout


</button>




</aside>


);


}