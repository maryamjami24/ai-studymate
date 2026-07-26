"use client";

import { useRouter } from "next/navigation";

import {
  MessageSquare,
  FileText,
  Brain,
  Mic,
  Calendar,
  History,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";


export default function Dashboard() {

  const router = useRouter();


  const features = [
    {
      title: "AI Chat",
      description: "Ask questions and get instant AI assistance.",
      icon: <MessageSquare size={38}/>,
      gradient: "from-blue-600 to-cyan-500",
      route: "/chat",
    },

    {
      title: "Notes Summary",
      description: "Convert lengthy notes into simple summaries.",
      icon: <FileText size={38}/>,
      gradient: "from-green-600 to-emerald-400",
      route: "/summary",
    },

    {
      title: "Quiz Generator",
      description: "Create smart quizzes for exam preparation.",
      icon: <Brain size={38}/>,
      gradient: "from-purple-600 to-violet-400",
      route: "/quiz",
    },

    {
      title: "Viva Generator",
      description: "Practice important viva questions with AI.",
      icon: <Mic size={38}/>,
      gradient: "from-pink-600 to-rose-400",
      route: "/viva",
    },

    {
      title: "Study Planner",
      description: "Organize your daily study routine.",
      icon: <Calendar size={38}/>,
      gradient: "from-orange-600 to-yellow-400",
      route: "/planner",
    },

    {
      title: "History",
      description: "Access previous learning activities.",
      icon: <History size={38}/>,
      gradient: "from-cyan-600 to-blue-400",
      route: "/history",
    },
  ];


  return (

    <main className="min-h-screen bg-slate-950 text-white flex">

      <Sidebar />


      <div className="flex-1 flex flex-col">


        <section className="p-10 flex-1">


          <div className="flex items-center gap-3">

            <Sparkles className="text-yellow-400"/>

            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

          </div>


          <p className="text-gray-400 mt-3">
            Your AI powered learning dashboard.
          </p>



          <div className="grid md:grid-cols-3 gap-6 mt-8">


            {features.map((feature,index)=>(


              <div
                key={index}
                className="
                bg-white/5
                backdrop-blur-lg
                rounded-3xl
                p-7
                border border-white/10
                hover:border-cyan-400
                hover:-translate-y-3
                transition-all
                duration-300
                shadow-xl
                "
              >


                <div
                  className={`
                  w-16 h-16
                  rounded-2xl
                  bg-gradient-to-r
                  ${feature.gradient}
                  flex items-center justify-center
                  `}
                >

                  {feature.icon}

                </div>



                <h2 className="text-2xl font-bold mt-6">
                  {feature.title}
                </h2>


                <p className="text-gray-400 mt-3">
                  {feature.description}
                </p>



                <button

                  onClick={()=>router.push(feature.route)}

                  className="
                  mt-6
                  flex
                  items-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  hover:scale-105
                  transition
                  "

                >

                  Open Module

                  <ArrowRight size={18}/>


                </button>


              </div>


            ))}


          </div>


        </section>


        <Footer/>


      </div>


    </main>

  );

}