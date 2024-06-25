import AWS from "aws-sdk";

export async function uploadToS3(file) {
  console.log("file:FINAL TEST", file);
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME },
      region: process.env.NEXT_PUBLIC_AWS_REGION,
    });

    const file_key =
      "upload/" +
      Date.now().toString() +
      file.name.replace(/[^a-zA-Z0-9.]/g, "").replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
      Key: file_key,
      Body: file,
    };

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (progress) => {
        console.log(
          "uploading tos3",
          parseInt((progress.loaded * 100) / progress.total).toString() + "%"
        );
      })
      .promise();
    await upload.then((data) => {
      console.log("data:from s3.js successfully added", file_key);
    });

    return Promise.resolve({
      key: file_key,
      file_name: file.name,
    });
  } catch (error) {
    console.log("error:from s3.js", error);
  }
}

export function getS3Url(file_key) {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${file_key}`;
  return url;
}

// export function getS3Url(file_key) {
//   // Supprimer les espaces et conserver uniquement les lettres, les chiffres et le point avant .pdf
//   const cleanedFileName = file_key.replace(/[^a-zA-Z0-9.]/g, "");
//   const dotIndex = cleanedFileName.lastIndexOf(".pdf");

//   // Retirer tous les points sauf celui avant .pdf
//   const cleanedFileNameWithoutExtraDots =
//     cleanedFileName.slice(0, dotIndex).replace(/\./g, "") + ".pdf";

//   const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${cleanedFileNameWithoutExtraDots}`;
//   return url;
// }
