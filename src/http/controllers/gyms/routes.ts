import { FastifyInstance } from "fastify";

import { verifyJWT } from "../../middlewares/verify-jwt";
import { nearbyGymsController } from "./nearby-gym";
import { searchGymController } from "./search-gym";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.get("/gyms/search", searchGymController);
  app.get("/gyms/nearby", nearbyGymsController);

  app.post("/gyms", nearbyGymsController);
}
