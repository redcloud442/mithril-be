import type { Context, Next } from "hono";
import { sendErrorResponse } from "../../utils/function.js";
import { protectionMemberUser } from "../../utils/protection.js";

export const rankMiddleware = async (c: Context, next: Next) => {
  const user = c.get("user");

  const response = await protectionMemberUser(user);

  if (response instanceof Response) {
    return response;
  }

  const { teamMemberProfile } = response;

  if (!teamMemberProfile) {
    return sendErrorResponse("Unauthorized", 401);
  }

  const { company_member_id } = c.req.param();

  c.set("params", { company_member_id });
  c.set("teamMemberProfile", teamMemberProfile);

  await next();
};
