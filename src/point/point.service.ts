import { BadRequestException, Injectable } from '@nestjs/common';
import { PointHistoryTable } from 'src/database/pointhistory.table';
import { UserPointTable } from 'src/database/userpoint.table';

@Injectable()
export class PointService {
  constructor(
    private readonly userDb: UserPointTable,
    private readonly historyDb: PointHistoryTable,
  ) {}

  async getPointOfUser(userId: number) {
    try {
      // 유저가 존재하는지 체크
      const user = await this.userDb.selectById(userId);

      if (user === null || !user) {
        throw new BadRequestException('유저가 존재하지 않습니다.');
      }

      // 유저가 있다면 포인트 반환
      return {
        result: 'success',
        message: { userId: user.id, point: user.point },
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // 원래 에러는 그대로 던진다
      }
      console.error('error: ', error);
      throw new BadRequestException('포인트 조회 중 에러가 발생했습니다.');
    }
  }
}
