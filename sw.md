-- weekly_vibe_ranking의 CONCURRENTLY REFRESH를 지원하기 위한 UNIQUE 인덱스 추가
-- 기존 일반 인덱스 삭제 후 UNIQUE 인덱스 생성

DROP INDEX IF EXISTS idx_weekly_vibe_ranking_project_id;

CREATE UNIQUE INDEX idx_weekly_vibe_ranking_project_id_unique
  ON weekly_vibe_ranking(project_id);

-- 리프레시 쓰로틀 제어 테이블
CREATE TABLE IF NOT EXISTS refresh_control (
  name text PRIMARY KEY,
  last_refreshed timestamptz NOT NULL DEFAULT now()
);

-- 초기 레코드 보장
INSERT INTO refresh_control(name)
VALUES ('weekly_vibe_ranking')
ON CONFLICT (name) DO NOTHING;

-- 쓰로틀 + 락 적용된 리프레시 함수
CREATE OR REPLACE FUNCTION refresh_weekly_vibe_ranking()
RETURNS TRIGGER AS $
DECLARE
  can_lock boolean;
  last_ts timestamptz;
  throttle_interval interval := interval '30 seconds'; -- 필요시 5s~60s 등으로 조정
BEGIN
  -- 동시 실행 방지: 어드바이저리 락 시도
  can_lock := pg_try_advisory_lock(1234567890);
  IF NOT can_lock THEN
    -- 이미 누군가 리프레시 중이면 조용히 종료
    RETURN NULL;
  END IF;

  -- 예외 발생에도 락 해제 보장
  BEGIN
    SELECT last_refreshed INTO last_ts
    FROM refresh_control
    WHERE name = 'weekly_vibe_ranking'
    FOR UPDATE;

    -- 쓰로틀: 최근 리프레시가 throttle_interval 내면 스킵
    IF (now() - last_ts) < throttle_interval THEN
      PERFORM pg_advisory_unlock(1234567890);
      RETURN NULL;
    END IF;

    -- 타임스탬프 먼저 갱신(경쟁 상태 방지)
    UPDATE refresh_control
    SET last_refreshed = now()
    WHERE name = 'weekly_vibe_ranking';

    -- CONCURRENTLY 리프레시 (UNIQUE 인덱스가 필요)
    REFRESH MATERIALIZED VIEW CONCURRENTLY weekly_vibe_ranking;

    PERFORM pg_advisory_unlock(1234567890);
    RETURN NULL;
  EXCEPTION WHEN OTHERS THEN
    -- 예외 발생 시 락 해제
    PERFORM pg_advisory_unlock(1234567890);
    RAISE;
  END;
END;
$ LANGUAGE plpgsql;

-- VibeCheckButton 컴포넌트에서 발생하는 문제 해결을 위한 추가 조치
-- weekly_vibe_ranking 뷰를 새로 고치는 기능을 개선하여 동시성 문제를 해결

-- 1. 기존의 refresh_weekly_vibe_ranking 함수를 개선하여 advisory lock을 사용
-- 2. refresh_control 테이블을 사용하여 너무 잦은 refresh를 방지
-- 3. 에러 처리를 개선하여 사용자에게 더 나은 피드백을 제공

-- VibeCheckButton에서 weekly_vibe_ranking을 refresh할 때 발생하는 오류를 해결하기 위한
-- 새로운 refresh 함수 생성 (advisory lock 사용)
CREATE OR REPLACE FUNCTION refresh_weekly_vibe_ranking_with_lock()
RETURNS VOID AS $
DECLARE
  can_lock boolean;
  last_ts timestamptz;
  throttle_interval interval := interval '30 seconds';
BEGIN
  -- 동시 실행 방지: 어드바이저리 락 시도 (다른 값 사용하여 충돌 방지)
  can_lock := pg_try_advisory_lock(1234567891);
  IF NOT can_lock THEN
    -- 이미 누군가 리프레시 중이면 조용히 종료
    RAISE NOTICE 'Another refresh is already in progress, skipping this refresh';
    RETURN;
  END IF;

  -- 예외 발생에도 락 해제 보장
  BEGIN
    -- refresh_control 테이블에서 마지막 refresh 시간 확인
    SELECT last_refreshed INTO last_ts
    FROM refresh_control
    WHERE name = 'weekly_vibe_ranking'
    FOR UPDATE;

    -- 쓰로틀: 최근 리프레시가 throttle_interval 내면 스킵
    IF (now() - last_ts) < throttle_interval THEN
      RAISE NOTICE 'Refresh throttled, last refresh was less than 30 seconds ago';
      PERFORM pg_advisory_unlock(1234567891);
      RETURN;
    END IF;

    -- 타임스탬프 먼저 갱신(경쟁 상태 방지)
    UPDATE refresh_control
    SET last_refreshed = now()
    WHERE name = 'weekly_vibe_ranking';

    -- CONCURRENTLY 리프레시
    REFRESH MATERIALIZED VIEW CONCURRENTLY weekly_vibe_ranking;

    -- 성공 메시지
    RAISE NOTICE 'Successfully refreshed weekly_vibe_ranking materialized view';

    PERFORM pg_advisory_unlock(1234567891);
  EXCEPTION WHEN OTHERS THEN
    -- 예외 발생 시 락 해제
    PERFORM pg_advisory_unlock(1234567891);
    RAISE EXCEPTION 'Error refreshing weekly_vibe_ranking: %', SQLERRM;
  END;
END;
$ LANGUAGE plpgsql;

-- VibeCheckButton에서 사용할 수 있는 안전한 refresh 프로시저
-- 이 프로시저는 필요한 경우에만 refresh를 수행하고, 동시성 문제를 방지함
CREATE OR REPLACE FUNCTION safe_refresh_weekly_vibe_ranking()
RETURNS VOID AS $
DECLARE
  can_refresh boolean := false;
  last_refresh timestamptz;
BEGIN
  -- refresh_control 테이블에서 마지막 refresh 시간 확인
  SELECT last_refreshed INTO last_refresh
  FROM refresh_control
  WHERE name = 'weekly_vibe_ranking';

  -- 마지막 refresh가 30초 이상 지난 경우에만 refresh 허용
  IF last_refresh IS NULL OR (now() - last_refresh) > interval '30 seconds' THEN
    can_refresh := true;
  END IF;

  -- refresh가 허용된 경우에만 수행
  IF can_refresh THEN
    -- refresh_control 테이블 업데이트
    UPDATE refresh_control
    SET last_refreshed = now()
    WHERE name = 'weekly_vibe_ranking';

    -- materialized view refresh
    REFRESH MATERIALIZED VIEW CONCURRENTLY weekly_vibe_ranking;
    
    RAISE NOTICE 'Weekly vibe ranking refreshed successfully';
  ELSE
    RAISE NOTICE 'Refresh skipped due to throttling (last refresh was less than 30 seconds ago)';
  END IF;
END;
$ LANGUAGE plpgsql;