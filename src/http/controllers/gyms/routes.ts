import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";

import { createGymController } from "./create-gym-controller";
import { searchGymController } from "./search-gym-controller";
import { nearbyGymsController } from "./nearby-gym-controller";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchGymController);
  app.get("/gyms/nearby", nearbyGymsController);

  app.post("/gyms", createGymController);
}
