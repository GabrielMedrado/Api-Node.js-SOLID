import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { createCheckInController } from "./create-check-in-controller";
import { validateCheckInController } from "./validate-controller";
import { metricsGymController } from "./metrics-controller";
import { historyGymController } from "./history-controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/check-ins/metrics", metricsGymController);
  app.get("/check-ins/history", historyGymController);

  app.post("/gym/:gymId/check-ins", createCheckInController);
  app.patch("/check-ins/:checkInId/validate", validateCheckInController);
}
