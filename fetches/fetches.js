export async function createChat(data) {
  try {
    const pdfData = {
      pdfName: data.pdfName,
      fileKey: data.fileKey,
    };
    console.log("pdfData:FROMF ETCHES", pdfData);

    const response = await fetch("http://localhost:3000/api/create-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pdfData),
    });
    if (!response.ok) {
      console.log("erreur dans le fetch");
      const errorResponse = await response.json();
      alert(errorResponse.message);
      return {
        response,
        errorResponse,
      };
    }
    //result est la réponse envoyée par le server suite à la requete POST
    const result = await response.json();
    // alert("Document chargé, analyse en cours...");
    return {
      response,
      result,
    };
  } catch (error) {
    console.log("error:", error);
  }
}

//fonction pour obtenir les messages d'un chat

export const fetchMessages = async (chatId) => {
  try {
    const response = await fetch("http://localhost:3000/api/getMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chatId }),
    });
    if (!response.ok) {
      console.log("erreur dans le fetchMessages");
      throw new Error("Network response was not ok");
    }
    //dans la constante data j'avais fais un return de response.json() mais je n'ai pas utilisé cette constante et je n'avais pas utilisé await d'ou le probleme du undefined dans le front
    const data = await response.json();
    console.log("PARSED data:", data);
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};
