//la ce fichier va servir va permettre a pinecone de lire le fichier pdf dans le bucket s3 en gros on fait le lien entre s3 et pinecone
import AWS from "aws-sdk";
import fs from "fs";
import path from "path"; // Importez le module path

export async function downloadFromS3(fileKey) {
  //cette promise va permettre de lire le fichier pdf dans le bucket s3, on va partir du principe que le fichier est bien dans le bucket s3 d'ou la promise
  try {
    //on se connecte d'abort a s3
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME },
      region: process.env.NEXT_PUBLIC_AWS_REGION,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: fileKey,
    };

    // I) je mets le bucket dans la constante obj

    // II) La méthode .promise() est appelée sur l'objet s3.getObject(params) pour retourner une promesse. Cela permet d'effectuer des opérations asynchrones et de gérer le résultat ou les erreurs à l'aide des fonctions then() et catch().

    // III) Une fois que la promesse est résolue, l'objet obj contient les métadonnées et le contenu du fichier PDF.

    // IV) Le contenu du fichier PDF est stocké dans obj.Body, qui est une instance de Buffer représentant le contenu du fichier.

    //V) Un nom de fichier est généré en utilisant la date actuelle pour éviter les conflits de noms de fichiers.Ensuite, le contenu du fichier PDF est écrit dans un fichier local en utilisant la méthode fs.writeFileSync(). Cette méthode prend en charge le chemin du fichier à écrire et les données à écrire dans ce fichier.

    const obj = await s3.getObject(params).promise();
    // Créer le répertoire '/tmp/pdf/' s'il n'existe pas déjà
    const directory = "/tmp/pdf/";
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    // Générer le nom de fichier avec la date actuelle
    const file_name = path.join(directory, `-${Date.now()}.pdf`);

    // Écrire le contenu du fichier localement
    fs.writeFileSync(file_name, Buffer.from(obj.Body));

    console.log(`Fichier téléchargé localement : ${file_name}`);
    console.log("file_name:", file_name);
    console.log("file key from s3-server:", fileKey);
    return file_name;
  } catch (error) {
    console.log("error:in s3-server.js", error);
    return null;
  }
}

// Création de l'objet S3 : Vous créez un objet S3 en utilisant les informations de configuration AWS, telles que les identifiants d'accès et le nom de région.

// Téléchargement du fichier depuis S3 : Vous spécifiez les paramètres nécessaires pour récupérer le fichier à partir du bucket S3, tels que le nom du bucket et la clé du fichier. Ensuite, vous utilisez la méthode getObject de l'objet S3 pour récupérer le contenu du fichier.

// Écriture du fichier localement : Une fois que vous avez récupéré le contenu du fichier depuis S3, vous l'écrivez localement sur votre système. Cela se fait en utilisant la méthode writeFileSync du module Node.js fs. Vous spécifiez le chemin et le nom de fichier local où vous souhaitez enregistrer le contenu, ainsi que le contenu lui-même.

// Ainsi, la fonction ne modifie pas l'objet S3 lui-même, mais elle récupère simplement le contenu d'un fichier S3 et l'écrit localement sur votre système. Si vous souhaitez ensuite mettre à jour le fichier sur S3, vous devrez utiliser des méthodes S3 appropriées pour télécharger le fichier modifié depuis votre système local vers S3.
