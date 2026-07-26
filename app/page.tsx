import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        <h1 className="text-5xl md:text-6xl font-bold">
          AI StudyMate 🤖
        </h1>

        <p className="mt-6 text-xl text-gray-400 max-w-2xl">
          Your intelligent study companion that helps you summarize notes,
          generate quizzes, prepare viva questions and plan your studies.
        </p>


        <div className="flex gap-5 mt-8">

          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl"
          >
            Login
          </Link>


          <Link
            href="/register"
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl"
          >
            Get Started
          </Link>

        </div>


        {/* Feature Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl">

          <div className="bg-slate-900 p-6 rounded-2xl">
            📄
            <h2 className="text-xl font-bold mt-3">
              Notes Summary
            </h2>
            <p className="text-gray-400">
              Convert long notes into simple summaries.
            </p>
          </div>


          <div className="bg-slate-900 p-6 rounded-2xl">
            📝
            <h2 className="text-xl font-bold mt-3">
              AI Quiz Generator
            </h2>
            <p className="text-gray-400">
              Practice with smart AI generated quizzes.
            </p>
          </div>


          <div className="bg-slate-900 p-6 rounded-2xl">
            💬
            <h2 className="text-xl font-bold mt-3">
              AI Chat
            </h2>
            <p className="text-gray-400">
              Ask questions and learn instantly.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}