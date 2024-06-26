import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "./embeddings";
import { convertToAscii } from "./utils";

export async function getMatchesFromEmbeddings(embeddings, fileKey) {
  try {
    const client = new Pinecone({
      // environment: process.env.PINECONE_ENVIRONMENT,
      apiKey: process.env.PINECONE_API_KEY,
    });
    const pineconeIndex = await client.index("chatpdf-tke");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
      includeValues: true,
    });
    console.log("queryResult:", queryResult.matches);
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query, fileKey) {
  const queryEmbeddings = await getEmbeddings(query);
  console.log("queryEmbeddings:", queryEmbeddings);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
  console.log("matches:", matches);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  console.log("qualifyingDocs:", qualifyingDocs);
  const Metadata = {
    text: "",
    pageNumber: 0,
  };

  let docs = qualifyingDocs.map((match) => match.metadata.text);
  // 5 vectors
  console.log("--> docs embended", docs.join("\n").substring(0, 3000));
  return docs.join("\n").substring(0, 3000);
}
