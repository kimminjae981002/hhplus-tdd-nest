import { Test, TestingModule } from '@nestjs/testing';
import { PointService } from './point.service';

// PointService 테스트 정의
describe('PointService', () => {
  let service: PointService;

  // 각 테스트 전에 매번 실행한다.
  beforeEach(async () => {
    // 테스트 모듈을 생성하고, PointService를 Provider로 주입한다.
    const module: TestingModule = await Test.createTestingModule({
      providers: [PointService],
    }).compile();

    // PointService 인스턴스를 가져온다.
    service = module.get<PointService>(PointService);
  });

  // PointService가 존재하는지 체크
  it('should be defined ', () => {
    expect(service).toBeDefined();
  });

  // PointService 특정 유저의 포인트를 조회하는 로직이 있나?
  it('should not exist point check method', () => {
    const getPoint = service.findPointOfUser(1);
    expect(getPoint).toEqual({ id: expect.any(Number), point: 10000 });
  });
});
