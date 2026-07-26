"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";

import { History, MessageSquare } from "lucide-react";


interface HistoryItem {
  id: string;
  type: string;
  question: string;
  answer: string;
}



export default function HistoryPage() {


  const { user } = useAuth();


  const [history, setHistory] = useState<HistoryItem[]>([]);



  useEffect(() => {


    if (!user) return;



    const q = query(

      collection(db, "history"),

      where("userId", "==", user.uid),

      orderBy("createdAt", "desc")

    );



    const unsubscribe = onSnapshot(q, (snapshot)=>{


      const data = snapshot.docs.map((doc)=>({

        id: doc.id,

        ...doc.data(),

      })) as HistoryItem[];



      setHistory(data);



    });



    return () => unsubscribe();



  }, [user]);






  return (

    <main className="min-h-screen bg-slate-950 text-white flex">


      <Sidebar />


      <div className="flex-1 flex flex-col">


        <section className="p-10 flex-1">


          <h1 className="text-4xl font-bold flex items-center gap-3">

            <History />

            History

          </h1>


          <p className="text-gray-400 mt-2">

            Your previous AI learning activities.

          </p>





          <div className="mt-8 space-y-6">



            {
              history.length === 0 ? (


                <div className="bg-slate-900 p-8 rounded-2xl text-gray-400">

                  No history found. Start using AI Chat 🚀

                </div>


              ) : (


                history.map((item)=>(


                  <div

                    key={item.id}

                    className="
                    bg-slate-900
                    rounded-2xl
                    p-6
                    border
                    border-slate-800
                    "

                  >


                    <div className="flex items-center gap-3 mb-4">

                      <div className="bg-blue-600 p-3 rounded-xl">

                        <MessageSquare size={20}/>

                      </div>


                      <h2 className="text-xl font-bold">

                        {item.type}

                      </h2>


                    </div>



                    <p className="text-gray-400 text-sm">
                      Question:
                    </p>


                    <p className="mb-4">
                      {item.question}
                    </p>




                    <p className="text-gray-400 text-sm">
                      Answer:
                    </p>


                    <p className="text-gray-200">
                      {item.answer}
                    </p>



                  </div>


                ))


              )
            }



          </div>




        </section>



        <Footer />

      </div>



    </main>

  );

}