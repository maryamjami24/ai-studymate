"use client";

import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";


export default function SummaryPage() {


  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);



  const generateSummary = async () => {


    if (!notes.trim()) {

      alert("Please enter notes");

      return;

    }



    setLoading(true);

    setSummary("");



    try {


      const res = await fetch("/api/chat", {


        method: "POST",


        headers: {

          "Content-Type": "application/json",

        },


        body: JSON.stringify({


          message: `
Summarize these notes in simple words.

Make:
- Short summary
- Important points
- Easy explanation

Notes:

${notes}
          `


        }),


      });





      const data = await res.json();



      setSummary(data.reply);





      // Save summary history

      if (auth.currentUser) {


        await addDoc(collection(db, "history"), {


          type: "Notes Summary",


          question: notes.substring(0, 100),


          answer: data.reply,


          userId: auth.currentUser.uid,


          createdAt: serverTimestamp(),


        });


      }





    } catch(error) {


      setSummary("Something went wrong. Please try again.");


    }



    setLoading(false);


  };








  return (


    <main className="min-h-screen bg-slate-950 text-white flex">


      <Sidebar />



      <div className="flex-1 flex flex-col">



        <section className="p-10 flex-1">



          <div className="flex items-center gap-4">


            <div className="bg-green-600 p-4 rounded-2xl">

              <FileText size={35}/>

            </div>




            <div>


              <h1 className="text-4xl font-bold">

                Notes Summary 📚

              </h1>



              <p className="text-gray-400 mt-2">

                Convert your lengthy notes into simple summaries.

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




            <textarea


              placeholder="Paste your notes here..."


              value={notes}


              onChange={(e)=>setNotes(e.target.value)}


              className="
              w-full
              h-48
              bg-slate-800
              p-5
              rounded-xl
              outline-none
              resize-none
              "
            

            />






            <button


              onClick={generateSummary}


              disabled={loading}



              className="
              mt-5
              flex
              items-center
              gap-2
              bg-green-600
              hover:bg-green-700
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

                : "Generate Summary"

              }



            </button>



          </div>








          {

            summary && (


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

                  Summary 📖

                </h2>



                <p className="leading-7">

                  {summary}

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