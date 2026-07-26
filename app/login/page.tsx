"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../../lib/firebase";



export default function LoginPage() {


  const router = useRouter();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);

  const [loading,setLoading] = useState(false);





  const handleLogin = async()=>{


    if(!email || !password){

      alert("Please fill all fields");

      return;

    }



    try{


      setLoading(true);



      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );



      alert("Login Successful!");

      router.push("/dashboard");



    }
    catch(error:any){

      alert(error.message);

    }
    finally{

      setLoading(false);

    }


  };







  const handleForgotPassword = async () => {

  if (!email) {
    alert("Please enter your email first");
    return;
  }

  try {

    await sendPasswordResetEmail(auth, email);

    alert("Password reset email sent!");

  } catch (error: any) {

    console.log(error.code);

    alert(
      "Error: " + error.code
    );

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

Login

</h1>






<input

type="email"

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

autoComplete="email"

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







<div className="relative mt-4">


<input

type={
showPassword
?
"text"
:
"password"
}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

autoComplete="current-password"

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

onClick={handleLogin}

disabled={loading}

className="
w-full
mt-6
bg-blue-600
hover:bg-blue-700
disabled:bg-gray-500
text-white
p-3
rounded-lg
"

>


{

loading

?

"Logging in..."

:

"Login"

}


</button>







<button

onClick={handleForgotPassword}

className="
text-blue-400
hover:underline
mt-4
w-full
"

>

Forgot Password?

</button>







<p className="
text-center
text-gray-300
mt-5
">


Don't have an account?{" "}


<Link

href="/register"

className="
text-blue-400
hover:underline
"

>

Register

</Link>


</p>






</div>


</main>


);


}