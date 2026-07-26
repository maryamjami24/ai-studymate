"use client";

import { useState } from "react";
import { Mic, Sparkles } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";


export default function VivaPage() {


  const [topic, setTopic] = useState("");
  const [viva, setViva] = useState("");
  const [loading, setLoading] = useState(false);



  const generateViva = async () => {


    if (!topic.trim()) {

      alert("Please enter a topic");

      return;

    }



    setLoading(true);

    setViva("");



    try {


      const res = await fetch("/api/chat", {


        method: "POST",


        headers: {

          "Content-Type": "application/json",

        },


        body: JSON.stringify({


          message: `
Generate 10 important viva questions with answers on this topic:

${topic}

Format:

Question 1:
Answer:

Question 2:
Answer:

Keep answers simple and exam focused.
          `


        }),


      });





      const data = await res.json();



      setViva(data.reply);





      // Save Viva history

      if (auth.currentUser) {


        await addDoc(collection(db, "history"), {


          type: "Viva Generator",


          question: topic,


          answer: data.reply,


          userId: auth.currentUser.uid,


          createdAt: serverTimestamp(),


        });


      }





    } catch(error) {


      setViva("Something went wrong. Please try again.");


    }




    setLoading(false);



  };






  return (


    <main className="min-h-screen bg-slate-950 text-white flex">


      <Sidebar />



      <div className="flex-1 flex flex-col">



        <section className="p-10 flex-1">



          <div className="flex items-center gap-4">


            <div className="bg-pink-600 p-4 rounded-2xl">


              <Mic size={35}/>


            </div>




            <div>


              <h1 className="text-4xl font-bold">

                Viva Generator 🎤

              </h1>



              <p className="text-gray-400 mt-2">

                Practice important viva questions with AI.

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
          ">



            <input


              type="text"


              placeholder="Enter topic (Example: OOP, Database, AI)"


              value={topic}


              onChange={(e)=>setTopic(e.target.value)}



              className="
              w-full
              bg-slate-800
              p-4
              rounded-xl
              outline-none
              "
            

            />





            <button


              onClick={generateViva}


              disabled={loading}



              className="
              mt-5
              flex
              items-center
              gap-2
              bg-pink-600
              hover:bg-pink-700
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

                : "Generate Viva"

              }



            </button>



          </div>







          {

            viva && (


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

                  Your Viva Questions 📚

                </h2>




                <p className="leading-7">

                  {viva}

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