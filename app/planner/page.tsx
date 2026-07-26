"use client";

import { useState } from "react";
import { Calendar, Sparkles } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";


export default function PlannerPage() {


  const [subjects, setSubjects] = useState("");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);



  const generatePlan = async () => {


    if (!subjects || !days || !hours) {

      alert("Please fill all fields");

      return;

    }



    setLoading(true);

    setPlan("");



    try {


      const res = await fetch("/api/chat", {


        method: "POST",


        headers: {

          "Content-Type": "application/json",

        },


        body: JSON.stringify({


          message: `
Create a personalized study plan.

Subjects:
${subjects}

Number of days:
${days}

Daily study hours:
${hours}

Make a day-wise plan with revision and practice.
Keep it simple and exam focused.
          `


        }),


      });





      const data = await res.json();



      setPlan(data.reply);





      // Save planner history

      if (auth.currentUser) {


        await addDoc(collection(db, "history"), {


          type: "Study Planner",


          question: `${subjects} - ${days} days - ${hours} hours`,


          answer: data.reply,


          userId: auth.currentUser.uid,


          createdAt: serverTimestamp(),


        });


      }




    } catch(error) {


      setPlan("Something went wrong. Please try again.");


    }



    setLoading(false);


  };






  return (


    <main className="min-h-screen bg-slate-950 text-white flex">


      <Sidebar />



      <div className="flex-1 flex flex-col">



        <section className="p-10 flex-1">



          <div className="flex items-center gap-4">


            <div className="bg-orange-600 p-4 rounded-2xl">

              <Calendar size={35}/>

            </div>



            <div>

              <h1 className="text-4xl font-bold">

                Study Planner 📅

              </h1>


              <p className="text-gray-400 mt-2">

                Create your personalized AI study schedule.

              </p>


            </div>


          </div>







          <div className="
          mt-10
          bg-slate-900
          p-8
          rounded-3xl
          border
          border-slate-800
          space-y-5
          ">




            <input

              type="text"

              placeholder="Subjects (Example: OOP, AI, Database)"

              value={subjects}

              onChange={(e)=>setSubjects(e.target.value)}

              className="
              w-full
              bg-slate-800
              p-4
              rounded-xl
              outline-none
              "

            />





            <input

              type="number"

              placeholder="Number of days"

              value={days}

              onChange={(e)=>setDays(e.target.value)}

              className="
              w-full
              bg-slate-800
              p-4
              rounded-xl
              outline-none
              "

            />





            <input

              type="number"

              placeholder="Daily study hours"

              value={hours}

              onChange={(e)=>setHours(e.target.value)}

              className="
              w-full
              bg-slate-800
              p-4
              rounded-xl
              outline-none
              "

            />





            <button

              onClick={generatePlan}

              disabled={loading}

              className="
              flex
              items-center
              gap-2
              bg-orange-600
              hover:bg-orange-700
              px-6
              py-3
              rounded-xl
              disabled:bg-gray-600
              "

            >


              <Sparkles size={20}/>


              {

                loading

                ? "Generating..."

                : "Generate Study Plan"

              }



            </button>




          </div>








          {

            plan && (


              <div className="
              mt-8
              bg-slate-900
              p-8
              rounded-3xl
              border
              border-slate-800
              whitespace-pre-line
              ">



                <h2 className="text-2xl font-bold mb-5">

                  Your Study Plan 📚

                </h2>



                <p className="leading-7">

                  {plan}

                </p>




              </div>


            )

          }





        </section>



        <Footer />


      </div>



    </main>


  );

}