import { Test, TestingModule } from '@nestjs/testing';
import { PointService } from './point.service';
import { UserPointTable } from 'src/database/userpoint.table';
import { PointHistoryTable } from 'src/database/pointhistory.table';

// PointService 테스트 정의
describe('PointService', () => {
  let service: PointService;

  // PointService에는 의존성 주입이 돼있기 때문에 mock으로 처리한다.
  // Mock 객체를 설정
  const mockUserPointTable = {
    selectById: jest.fn(),
  };

  // Mock 객체를 설정
  const mockPointHistoryTable = {
    // PointHistoryTable에 필요한 메서드 mock 작성
  };

  // 각 테스트 전에 매번 실행한다.
  beforeEach(async () => {
    // 테스트 모듈을 생성하고, PointService를 Provider로 Mock도 주입한다.
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PointService,
        { provide: UserPointTable, useValue: mockUserPointTable },
        { provide: PointHistoryTable, useValue: mockPointHistoryTable },
      ], // Mock 추가,
    }).compile();

    // PointService 인스턴스를 가져온다.
    service = module.get<PointService>(PointService);
  });

  // PointService가 존재하는지 체크
  it('should be defined ', () => {
    expect(service).toBeDefined();
  });

  // getPointOfUser 로직 테스트
  describe('getPointOfUser', () => {
    // 유저가 존재하나? 없다면 에러가 나올 것이다.
    it('should throw if user not exist', async () => {
      // mock 처리를 하여 selectById가 무조건 null을 반환하게
      mockUserPointTable.selectById.mockResolvedValue(null);

      // mock 정해둔 유저를 찾지만 null이기에 에러가 나온다를 가정
      await expect(service.getPointOfUser(1)).rejects.toThrow(
        '유저가 존재하지 않습니다.',
      );

      // selectById가 1번 호출됐나?
      expect(mockUserPointTable.selectById).toHaveBeenCalledTimes(1);
    });

    // PointService 특정 유저의 포인트를 조회하는 로직이 있나?
    it('should not exist point check method', async () => {
      // mock으로 데이터를 생성한다.
      mockUserPointTable.selectById.mockResolvedValue({ id: 1, point: 10000 });

      // 실제 서비스 로직에 mock 객체를 넣어준다.
      const getPoint = await service.getPointOfUser(1);

      // 기대값과 같나?
      expect(getPoint).toEqual({
        result: 'success',
        message: { userId: 1, point: 10000 },
      });
    });
  });
});
