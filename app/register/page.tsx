"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../lib/firebase";


export default function RegisterPage() {

  const router = useRouter();


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);



  const handleRegister = async () => {


    if (!name || !email || !password) {

      alert("Please fill all fields");

      return;

    }



    try {


      setLoading(true);



      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );



      await updateProfile(
        userCredential.user,
        {
          displayName: name,
        }
      );



      alert("Account Created Successfully!");

      router.push("/dashboard");



    } catch(error:any) {


      alert(error.message);


    } finally {


      setLoading(false);


    }


  };






return (

<main className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-slate-950
via-slate-900
to-blue-950
">


<div className="
bg-slate-800
p-8
rounded-3xl
shadow-xl
w-96
">


<h1 className="
text-3xl
font-bold
text-white
text-center
">

Create Account

</h1>





<input

type="text"

placeholder="Full Name"

value={name}

onChange={(e)=>setName(e.target.value)}

autoComplete="name"

className="
w-full
mt-6
p-3
rounded-lg
bg-slate-700
text-white
outline-none
"

/>





<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

autoComplete="new-email"

className="
w-full
mt-4
p-3
rounded-lg
bg-slate-700
text-white
outline-none
"

/>





<div className="relative mt-4">


<input

type={showPassword ? "text" : "password"}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

autoComplete="new-password"

className="
w-full
p-3
rounded-lg
bg-slate-700
text-white
outline-none
pr-12
"

/>



<button

type="button"

onClick={()=>setShowPassword(!showPassword)}

className="
absolute
right-3
top-1/2
-translate-y-1/2
text-gray-300
"

>


{
showPassword
?
<EyeOff size={20}/>
:
<Eye size={20}/>
}


</button>



</div>






<button

onClick={handleRegister}

disabled={loading}

className="
w-full
mt-6
bg-green-600
hover:bg-green-700
disabled:bg-gray-500
text-white
p-3
rounded-lg
"

>


{
loading
?
"Creating Account..."
:
"Create Account"
}


</button>





</div>


</main>


);


}