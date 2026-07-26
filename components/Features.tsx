export default function Features() {
  const features = [
    {
      title: "📄 Notes Summary",
      desc: "Convert long notes into short and easy summaries.",
    },
    {
      title: "📝 AI Quiz",
      desc: "Generate MCQs instantly from your topic.",
    },
    {
      title: "🎤 Viva Questions",
      desc: "Prepare for viva with AI-generated questions.",
    },
    {
      title: "📅 Study Planner",
      desc: "Create a personalized study timetable.",
    },
    {
      title: "💬 AI Chat",
      desc: "Ask any study-related question instantly.",
    },
    {
      title: "📚 History",
      desc: "Access your previous AI responses anytime.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-slate-900 text-white py-20 px-8"
    >
      <h2 className="text-4xl font-bold text-center mb-14">
        Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold mb-3">
              {feature.title}
            </h3>

            <p className="text-gray-300">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}