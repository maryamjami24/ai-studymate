"use client";

import { useState } from "react";
import { Send, Bot, User } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";


interface ChatMessage {
  role: "user" | "ai";
  text: string;
}



export default function ChatPage() {


  const { user } = useAuth();


  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);



  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      text: "Hello 👋 I am your AI StudyMate. How can I help you today?",
    },
  ]);




  const sendMessage = async () => {


    if (!message.trim()) return;



    const userMessage = message;



    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);



    setMessage("");

    setLoading(true);



    try {



      const res = await fetch("/api/chat", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },


        body: JSON.stringify({
          message: userMessage,
        }),

      });



      const data = await res.json();




      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply,
        },
      ]);





      // Save chat history in Firestore

      if (user) {

        await addDoc(
          collection(db, "history"),
          {

            userId: user.uid,

            type: "AI Chat",

            question: userMessage,

            answer: data.reply,

            createdAt: serverTimestamp(),

          }
        );

      }




    } catch (error) {


      setMessages((prev) => [

        ...prev,

        {
          role: "ai",
          text: "Something went wrong.",
        },

      ]);

    }



    setLoading(false);


  };






  return (

    <main className="min-h-screen bg-slate-950 text-white flex">


      <Sidebar />



      <div className="flex-1 flex flex-col">


        <section className="flex-1 p-10">


          <h1 className="text-4xl font-bold">
            AI Chat 🤖
          </h1>


          <p className="text-gray-400 mt-2">
            Ask anything and get instant AI assistance.
          </p>




          <div className="mt-8 bg-slate-900 rounded-2xl h-[600px] flex flex-col">



            <div className="flex-1 overflow-y-auto p-6 space-y-6">



              {messages.map((msg,index)=>(


                <div
                  key={index}
                  className={`flex ${
                    msg.role==="user"
                    ? "justify-end"
                    : "justify-start"
                  }`}
                >



                  <div
                    className={`flex gap-3 max-w-xl ${
                      msg.role==="user"
                      ? "flex-row-reverse"
                      : ""
                    }`}
                  >



                    <div
                      className={`p-3 rounded-full ${
                        msg.role==="user"
                        ? "bg-green-600"
                        : "bg-blue-600"
                      }`}
                    >

                      {
                        msg.role==="user"
                        ?
                        <User size={18}/>
                        :
                        <Bot size={18}/>
                      }

                    </div>




                    <div
                      className={`rounded-2xl p-4 ${
                        msg.role==="user"
                        ?
                        "bg-green-700"
                        :
                        "bg-slate-800"
                      }`}
                    >

                      {msg.text}

                    </div>



                  </div>



                </div>



              ))}





              {loading && (

                <div className="flex items-center gap-3">


                  <div className="bg-blue-600 p-3 rounded-full">

                    <Bot size={18}/>

                  </div>



                  <div className="bg-slate-800 px-5 py-3 rounded-xl">

                    Thinking...

                  </div>



                </div>

              )}



            </div>






            <div className="border-t border-slate-800 p-5 flex gap-3">


              <input

                type="text"

                placeholder="Ask anything..."

                value={message}

                onChange={(e)=>setMessage(e.target.value)}

                onKeyDown={(e)=>{

                  if(e.key==="Enter"){
                    sendMessage();
                  }

                }}

                className="flex-1 bg-slate-800 rounded-xl px-5 py-4 outline-none"

              />




              <button

                onClick={sendMessage}

                disabled={loading}

                className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl disabled:bg-gray-600"

              >

                <Send/>

              </button>



            </div>




          </div>



        </section>




        <Footer />



      </div>



    </main>

  );

}