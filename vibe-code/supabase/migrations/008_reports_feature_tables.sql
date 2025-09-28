-- 1. profiles 테이블 생성 (auth.users와 1:1 매핑)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'user' CHECK (role IN ('user','moderator','admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. reports 테이블 생성
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  reporter_user_id UUID REFERENCES auth.users(id) NOT NULL,
  target_id UUID NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('project','comment','community_post','tool_review')),
  reason TEXT NOT NULL CHECK (reason IN ('inappropriate_content','harassment','spam','misinformation','other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','reviewed','resolved','dismissed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id)
);

-- 3. 인덱스
CREATE INDEX IF NOT EXISTS idx_reports_target ON reports(target_id, target_type);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_reporter_user_id ON reports(reporter_user_id);

-- 4. RLS 활성화
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- 5. 정책
DROP POLICY IF EXISTS "Users can submit reports" ON reports;
CREATE POLICY "Users can submit reports" ON reports
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view own reports" ON reports;
CREATE POLICY "Users can view own reports" ON reports
  FOR SELECT USING (reporter_user_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own reports" ON reports;
CREATE POLICY "Users can update own reports" ON reports
  FOR UPDATE USING (reporter_user_id = auth.uid());

DROP POLICY IF EXISTS "Admins can manage all reports" ON reports;
CREATE POLICY "Admins can manage all reports" ON reports
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND (profiles.role = 'admin' OR profiles.role = 'moderator')
    )
  );

-- 6. 신고 제출 함수
CREATE OR REPLACE FUNCTION submit_report(
  p_target_id UUID,
  p_target_type TEXT,
  p_reason TEXT,
  p_description TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  report_id UUID;
BEGIN
  INSERT INTO reports(reporter_user_id, target_id, target_type, reason, description)
  VALUES(auth.uid(), p_target_id, p_target_type, p_reason, p_description)
  RETURNING id INTO report_id;

  RETURN report_id;
END;
$$;

-- 7. 각 콘텐츠 테이블에 report_count 추가
ALTER TABLE projects ADD COLUMN IF NOT EXISTS report_count INTEGER DEFAULT 0;
ALTER TABLE comments ADD COLUMN IF NOT EXISTS report_count INTEGER DEFAULT 0;
ALTER TABLE community_posts ADD COLUMN IF NOT EXISTS report_count INTEGER DEFAULT 0;

-- 8. tool_reviews 테이블 (없으면 생성, is_public 포함)
CREATE TABLE IF NOT EXISTS tool_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  tool_tech_name VARCHAR(255) NOT NULL,
  overall_rating INTEGER CHECK (overall_rating BETWEEN 1 AND 5),
  one_liner_pros TEXT,
  one_liner_cons TEXT,
  content TEXT NOT NULL,
  hero_image_url TEXT,
  demo_video_url TEXT,
  font_preference VARCHAR(50) DEFAULT 'retro',
  vibe_check_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  report_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 혹시 기존에 tool_reviews가 이미 있고 is_public이 없다면 추가
ALTER TABLE tool_reviews ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;

-- 9. tool_reviews RLS 정책
ALTER TABLE tool_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Everyone can view public tool reviews" ON tool_reviews;
CREATE POLICY "Everyone can view public tool reviews" ON tool_reviews
  FOR SELECT USING (is_public = true);

DROP POLICY IF EXISTS "Authenticated users can create tool reviews" ON tool_reviews;
CREATE POLICY "Authenticated users can create tool reviews" ON tool_reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can update their own tool reviews" ON tool_reviews;
CREATE POLICY "Users can update their own tool reviews" ON tool_reviews
  FOR UPDATE USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete their own tool reviews" ON tool_reviews;
CREATE POLICY "Users can delete their own tool reviews" ON tool_reviews
  FOR DELETE USING (user_id = auth.uid());

-- 10. report_count 자동 업데이트 함수
CREATE OR REPLACE FUNCTION update_content_report_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    CASE NEW.target_type
      WHEN 'project' THEN
        UPDATE projects SET report_count = report_count + 1 WHERE id = NEW.target_id;
      WHEN 'comment' THEN
        UPDATE comments SET report_count = report_count + 1 WHERE id = NEW.target_id;
      WHEN 'community_post' THEN
        UPDATE community_posts SET report_count = report_count + 1 WHERE id = NEW.target_id;
      WHEN 'tool_review' THEN
        UPDATE tool_reviews SET report_count = report_count + 1 WHERE id = NEW.target_id;
    END CASE;
  ELSIF TG_OP = 'DELETE' THEN
    CASE OLD.target_type
      WHEN 'project' THEN
        UPDATE projects SET report_count = GREATEST(report_count - 1, 0) WHERE id = OLD.target_id;
      WHEN 'comment' THEN
        UPDATE comments SET report_count = GREATEST(report_count - 1, 0) WHERE id = OLD.target_id;
      WHEN 'community_post' THEN
        UPDATE community_posts SET report_count = GREATEST(report_count - 1, 0) WHERE id = OLD.target_id;
      WHEN 'tool_review' THEN
        UPDATE tool_reviews SET report_count = GREATEST(report_count - 1, 0) WHERE id = OLD.target_id;
    END CASE;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 11. 트리거 생성
DROP TRIGGER IF EXISTS trigger_update_content_report_count ON reports;
CREATE TRIGGER trigger_update_content_report_count
  AFTER INSERT OR DELETE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_content_report_count();