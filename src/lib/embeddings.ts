import { log } from "console";
import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// Todo: learn more about openai embeddings
// An embedding is a vector (list) of floating point numbers.
// The distance between two vectors measures their relatedness.
// Small distances suggest high relatedness and large distances suggest low relatedness.

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    log("get embedding result", result);

    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}
