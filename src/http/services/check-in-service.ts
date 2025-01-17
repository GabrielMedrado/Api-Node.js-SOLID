import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/check-ins-repository";

interface ICheckInServiceRequest {
  userId: string;
  gymId: string;
}

interface ICheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
