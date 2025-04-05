import { ICheckInsRepository } from "../repositories/check-ins-repository-interface";

interface IGetUserMetricsRequest {
  userId: string;
}

interface IGetUserMetricsResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
