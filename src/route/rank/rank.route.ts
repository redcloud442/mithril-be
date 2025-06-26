import { Hono } from "hono";
import { RankService } from "./rank.controller.js";
import { rankMiddleware } from "./rank.middleware.js";

const rank = new Hono();

rank.post("/:id", rankMiddleware, RankService);

export default rank;
