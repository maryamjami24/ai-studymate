"use client";

import { useState } from "react";
import { Brain, Sparkles } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";


export default function QuizPage() {

  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState("");
  const [loading, setLoading] = useState(false);



  const generateQuiz = async () => {

    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }


    setLoading(true);
    setQuiz("");


    try {


      const res = await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },


        body: JSON.stringify({

          message: `
Create 5 important MCQs on this topic:

${topic}

Format:

Question 1:
A)
B)
C)
D)

Correct Answer:

Question 2:
A)
B)
C)
D)

Correct Answer:
          `,

        }),

      });



      const data = await res.json();


      setQuiz(data.reply);



      // Save quiz history

      if (auth.currentUser) {

        await addDoc(collection(db, "history"), {

          type: "Quiz Generator",

          question: topic,

          answer: data.reply,

          userId: auth.currentUser.uid,

          createdAt: serverTimestamp(),

        });

      }



    } catch(error) {


      setQuiz("Something went wrong. Please try again.");


    }



    setLoading(false);


  };






  return (

    <main className="min-h-screen bg-slate-950 text-white flex">


      <Sidebar />


      <div className="flex-1 flex flex-col">



        <section className="p-10 flex-1">


          <div className="flex items-center gap-4">


            <div className="bg-purple-600 p-4 rounded-2xl">

              <Brain size={35}/>

            </div>


            <div>

              <h1 className="text-4xl font-bold">

                Quiz Generator 🧠

              </h1>


              <p className="text-gray-400 mt-2">

                Create AI powered quizzes for your exams.

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

              placeholder="Enter topic (Example: Artificial Intelligence)"

              value={topic}

              onChange={(e)=>setTopic(e.target.value)}

              className="
              w-full
              bg-slate-800
              p-4
              rounded-xl
              outline-none
              text-white
              "

            />





            <button

              onClick={generateQuiz}

              disabled={loading}

              className="
              mt-5
              flex
              items-center
              gap-2
              bg-purple-600
              hover:bg-purple-700
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
                : "Generate Quiz"
              }


            </button>



          </div>






          {
            quiz && (


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

                  Your Quiz 📚

                </h2>



                <p className="leading-7">

                  {quiz}

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