import ytsr, { Result } from "ytsr";
import type { NextApiRequest, NextApiResponse } from "next";
import type { APIResponseTypes } from "@/lib/API";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponseTypes>
) {
  switch (req.method) {
    case "GET": {
      const { q, limit, page } = req.query as {
        q: string;
        limit: string;
        page: string;
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
          pages: page ? parseInt(page) : 1,
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

      break;
    }

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
