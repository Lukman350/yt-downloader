import ytsr, { Result } from "ytsr";
import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponseTypes } from "@/lib/API";

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

  const { q, limit } = req.query as {
    q: string;
    limit: string;
  };

  if (!q || !limit) {
    res.status(400).json({
      success: false,
      data: null,
      message: "Please provide a search query and limit",
    });
    return;
  }

  try {
    const results: Result = await ytsr(q, {
      limit: parseInt(limit),
      gl: "ID",
      hl: "id",
    });

    res.status(200).json({
      success: true,
      data: results,
      message: "",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      data: null,
      message: err,
    });
  }
}
