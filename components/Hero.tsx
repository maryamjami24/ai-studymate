import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      <h1 className="text-6xl md:text-7xl font-extrabold">
        AI StudyMate
      </h1>

      <p className="mt-6 text-xl text-gray-300 max-w-2xl">
        Study smarter with Artificial Intelligence.
        Generate summaries, quizzes, viva questions,
        and personalized study plans in seconds.
      </p>

      <div className="mt-10 flex gap-5">
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold"
        >
          Get Started
        </Link>

        <a
          href="#features"
          className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-black transition"
        >
          Learn More
        </a>
      </div>

    </section>
  );
}