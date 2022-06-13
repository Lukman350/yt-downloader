import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponseTypes } from "@/lib/API";
import { isVideoValid } from "@/lib/Youtube";
import { getVideoDetails } from "@/lib/Youtube";
import { VideoDetails } from "ytdl-core";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseTypes>
) {
  if (req.method !== "GET") {
    res.status(405).json({
      success: false,
      data: null,
      message: "Method not allowed",
    });
    return;
  }

  const { url } = req.query as { url: string };

  if (!url) {
    res.status(400).json({
      success: false,
      data: null,
      message: "Missing url",
    });
    return;
  }

  if (isVideoValid(url) === false) {
    res.status(400).json({
      success: false,
      data: null,
      message: "No video found with that url",
    });
    return;
  }

  try {
    await getVideoDetails(url).then((video: VideoDetails) => {
      res.status(200).json({
        success: true,
        data: video,
        message: "",
      });
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: err,
    });
  }
}
