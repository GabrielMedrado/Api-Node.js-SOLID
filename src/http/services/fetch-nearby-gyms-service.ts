import { Gym } from "@prisma/client";
import { IGymsRepository } from "../repositories/gyms-repository-interface";

interface FetchNearbyGymsServiceRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymsServiceResponse {
  gyms: Gym[];
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: IGymsRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
