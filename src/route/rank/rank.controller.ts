import type { Context } from "hono";
import { RankModelPost } from "./rank.model.js";

export const RankService = async (c: Context) => {
  try {
    const teamMemberProfile = c.get("teamMemberProfile");

    await RankModelPost(teamMemberProfile.company_member_id);

    return c.json({ message: "Rank Verified" }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Internal server error" }, 500);
  }
};
