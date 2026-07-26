"use client";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, ShieldCheck } from "lucide-react";


export default function ProfilePage() {

  const { user } = useAuth();


  return (

    <main className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />


      <div className="flex-1 flex flex-col">


        <section className="p-10 flex-1">


          <h1 className="text-4xl font-bold">
            Profile 👤
          </h1>


          <p className="text-gray-400 mt-2">
            Manage your AI StudyMate account.
          </p>



          <div className="
          mt-10
          max-w-xl
          bg-slate-900
          rounded-3xl
          p-8
          shadow-xl
          border
          border-slate-800
          ">


            <div className="
            w-20
            h-20
            rounded-full
            bg-blue-600
            flex
            items-center
            justify-center
            text-3xl
            font-bold
            ">

              {user?.displayName?.charAt(0) || "U"}

            </div>



            <div className="mt-6 space-y-5">


              <div className="flex items-center gap-4">

                <User className="text-blue-400"/>

                <div>

                  <p className="text-gray-400 text-sm">
                    Name
                  </p>

                  <p className="font-bold">
                    {user?.displayName || "Student"}
                  </p>

                </div>

              </div>




              <div className="flex items-center gap-4">

                <Mail className="text-green-400"/>

                <div>

                  <p className="text-gray-400 text-sm">
                    Email
                  </p>

                  <p className="font-bold">
                    {user?.email}
                  </p>

                </div>

              </div>




              <div className="flex items-center gap-4">

                <ShieldCheck className="text-purple-400"/>

                <div>

                  <p className="text-gray-400 text-sm">
                    Account Status
                  </p>

                  <p className="font-bold text-green-400">
                    Active
                  </p>

                </div>

              </div>



            </div>


          </div>


        </section>


        <Footer />


      </div>


    </main>

  );
}