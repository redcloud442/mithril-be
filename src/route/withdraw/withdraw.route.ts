import { Hono } from "hono";
import {
  updateWithdrawPostController,
  withdrawHideUserPostController,
  withdrawHistoryPostController,
  withdrawHistoryReportPostController,
  withdrawListPostController,
  withdrawPostController,
  withdrawTotalReportPostController,
  withdrawUserGetController,
} from "./withdraw.controller.js";
import {
  updateWithdrawMiddleware,
  withdrawHideUserPostMiddleware,
  withdrawHistoryPostMiddleware,
  withdrawHistoryReportPostMiddleware,
  withdrawListPostMiddleware,
  withdrawPostMiddleware,
  withdrawTotalReportPostMiddleware,
  withdrawUserGetMiddleware,
} from "./withdraw.middleware.js";

const withdraw = new Hono();

withdraw.post("/", withdrawPostMiddleware, withdrawPostController);

withdraw.post(
  "/history",
  withdrawHistoryPostMiddleware,
  withdrawHistoryPostController
);

withdraw.post(
  "/report",
  withdrawHistoryReportPostMiddleware,
  withdrawHistoryReportPostController
);

withdraw.post(
  "/total-report",
  withdrawTotalReportPostMiddleware,
  withdrawTotalReportPostController
);

withdraw.put("/:id", updateWithdrawMiddleware, updateWithdrawPostController);

withdraw.get("/user", withdrawUserGetMiddleware, withdrawUserGetController);

withdraw.put(
  "/:id/hide-user",
  withdrawHideUserPostMiddleware,
  withdrawHideUserPostController
);

withdraw.post("/list", withdrawListPostMiddleware, withdrawListPostController);

export default withdraw;
