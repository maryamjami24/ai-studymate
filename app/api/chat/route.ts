import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are AI StudyMate, an intelligent AI assistant built for students.

Your responsibilities:
- Explain concepts in simple and easy language.
- Help students prepare for exams.
- Summarize long notes into short and clear points.
- Generate quizzes and viva questions when requested.
- Answer programming, computer science, mathematics and general study questions accurately.
- Keep answers well-structured and student-friendly.
- If appropriate, use bullet points and headings.
- Never generate harmful or misleading information.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        reply: "Sorry! Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}