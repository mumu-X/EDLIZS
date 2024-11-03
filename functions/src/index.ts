import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import {Request, Response} from "express"; // Import types

admin.initializeApp();

const bucketName = "edliz-2.appspot.com";
const fileName = "Data/EDLIZMASTER.json";

exports.downloadMasteredlizConditions =
onRequest(async (req: Request, res: Response) => {
  try {
    const bucket = admin.storage().bucket(bucketName);
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 3 * 60 * 1000, // 3 minutes in milliseconds
    });

    res.status(200).json({url});
  } catch (error) {
    console.error("Error generating download URL:", error);
    res.status(500).send("Failed to generate download link.");
  }
});
