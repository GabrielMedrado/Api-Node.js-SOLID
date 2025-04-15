import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/check-ins-repository-interface";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface IValidateCheckInServiceRequest {
  checkInId: string;
}

interface IValidateCheckInServiceResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInServiceRequest): Promise<IValidateCheckInServiceResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
