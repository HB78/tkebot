import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import md5 from "md5";
import { getEmbeddings } from "./embeddings";
import { downloadFromS3 } from "./s3-server";
import { convertToAscii } from "./utils";

//avec ce code je me connect a pinecone
export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

//la fonction va permettre de lire le fichier pdf dans le bucket s3 et de le convertir en vecteur pour le mettre dans pinecone
export async function loadS3IntoPinecone(fileKey) {
  console.log("fileKey:fromPINECONE.js", fileKey);
  // 1. obtain the pdf -> downlaod and read from pdf
  console.log("downloading s3 into file your system");
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("could not download from s3");
  }
  console.log("loading pdf into memory" + file_name);

  // La il faut récuperer le texte du pdf on va donc utiliser langchain
  const loader = new PDFLoader(file_name);
  const pages = await loader.load();

  // 2. split and segment the pdf / les docs sont trop grands on va donc réduire leur taille
  const documents = await Promise.all(pages.map(prepareDocument));

  // 3. vectorise and embed individual documents
  let vectors = await Promise.all(documents.flat().map(embedDocument));
  console.log("vectors:", vectors);
  console.log("typeof vectors", typeof vectors);

  // 4. upload to pinecone
  const client = await getPineconeClient();
  const pineconeIndex = await client.index("chatpdf-tke");
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));

  console.log("inserting vectors into pinecone");
  await namespace.upsert(vectors);

  return documents[0];
}

export const truncateStringByBytes = (str, bytes) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

// on va utiliser langchain pour vectoriser chaque doc avec cette fonction
async function embedDocument(doc) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    // on va hasher le doc pour l'identifier en utilisant md5, cad on crée un id unique pour chaque doc
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    };
  } catch (error) {
    console.log("error embedding document", error);
    throw error;
  }
}
async function prepareDocument(page) {
  let { pageContent, metadata } = page;
  // Convertir pageContent en string s'il ne l'est pas déjà
  if (typeof pageContent !== "string") {
    pageContent = String(pageContent);
  }
  const pageNumber =
    typeof metadata?.loc?.pageNumber === "number"
      ? metadata.loc.pageNumber
      : parseInt(metadata.loc.pageNumber);

  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
