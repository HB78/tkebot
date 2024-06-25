import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export async function getEmbeddings(text) {
  try {
    // // Vérifier si text est une chaîne de caractères
    // if (typeof text !== "string") {
    //   throw new Error("Input text should be a string");
    // }

    const request = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: JSON.stringify(text).replace(/\n/g, " "),
    });
    // const result = await request.json();
    console.log("request:", request);
    console.log("text:", text);
    // const response = result.data[0].embedding;
    return request.data[0].embedding;
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
//avant j'avais fais cel input: text.replace(/\n/g, " "),
