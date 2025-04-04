import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../repositories/check-ins-repository-interface";

interface IFetchUserCheckInsHistoryServiceRequest {
  userId: string;
  page: number;
}

interface IFetchUserCheckInsHistoryServiceResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryServiceRequest): Promise<IFetchUserCheckInsHistoryServiceResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
