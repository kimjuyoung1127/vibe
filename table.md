1. Users and Authentication Tables
users (Supabase auth.users 테이블과 연동)

id (UUID, PK): Supabase Auth에서 제공하는 사용자 ID. (FK for user_profiles.user_id)

email (TEXT): 사용자 이메일 (Supabase Auth에서 관리).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 사용자 생성 일시.

last_sign_in_at (TIMESTAMP WITH TIME ZONE): 마지막 로그인 일시.

Note: Supabase Auth는 내부적으로 auth.users 테이블을 관리하므로, 여기에 직접적인 테이블을 생성하기보다는 auth.users의 id를 user_profiles 테이블에서 참조하는 것이 일반적입니다.

user_profiles

id (UUID, PK, DEFAULT gen_random_uuid()): 프로필 고유 ID.

user_id (UUID, FK auth.users(id)): Supabase Auth 사용자 ID. (UNIQUE)

username (TEXT, UNIQUE, NOT NULL): Vibe Code 내에서 표시될 고유 사용자 이름.

display_name (TEXT): 사용자가 설정한 표시 이름 (닉네임).

avatar_url (TEXT): 프로필 이미지 URL (Supabase Storage 경로).

bio (TEXT): 사용자 소개 글.

github_url (TEXT): GitHub 프로필 URL.

linkedin_url (TEXT): LinkedIn 프로필 URL.

website_url (TEXT): 개인 웹사이트 URL.

total_vibe_checks_received (INTEGER, DEFAULT 0): 받은 총 Vibe Check 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 프로필 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 프로필 마지막 업데이트 일시.

is_public (BOOLEAN, DEFAULT TRUE): 프로필 공개 여부.

Indexes: user_id (UNIQUE), username (UNIQUE).

2. Projects Showcase Tables
projects

id (UUID, PK, DEFAULT gen_random_uuid()): 프로젝트 고유 ID.

user_id (UUID, FK user_profiles(user_id)): 프로젝트 작성자 ID.

title (TEXT, NOT NULL): 프로젝트 제목.

tagline (TEXT, NOT NULL): 한 줄 요약.

hero_image_url (TEXT, NOT NULL): 대표 이미지 URL.

content (TEXT, NOT NULL): 프로젝트 상세 설명 (Markdown).

github_url (TEXT): GitHub 리포지토리 URL.

live_demo_url (TEXT): 라이브 데모 URL.

deployment_platform (TEXT): 배포 플랫폼.

font_preference (TEXT, DEFAULT 'Modern Sans-serif'): 'Retro Casual' 또는 'Modern Sans-serif'.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

is_public (BOOLEAN, DEFAULT TRUE): 공개 여부.

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, created_at, vibe_check_count.

project_categories (N:M 관계를 위한 조인 테이블)

project_id (UUID, FK projects(id), PK)

category_name (TEXT, PK)

Note: category_name은 별도의 categories 테이블을 만들어 FK로 연결할 수도 있습니다. (예: categories.id)

project_features

id (UUID, PK, DEFAULT gen_random_uuid())

project_id (UUID, FK projects(id)): 소속 프로젝트 ID.

feature_text (TEXT, NOT NULL): 기능 설명.

order_index (INTEGER): 기능 순서.

Indexes: project_id.

project_technologies (N:M 관계를 위한 조인 테이블)

project_id (UUID, FK projects(id), PK)

tech_name (TEXT, PK)

Note: tech_name도 별도의 technologies 테이블을 만들어 FK로 연결할 수 있습니다.

project_tools (N:M 관계를 위한 조인 테이블)

project_id (UUID, FK projects(id), PK)

tool_name (TEXT, PK)

Note: tool_name도 별도의 tools 테이블을 만들어 FK로 연결할 수 있습니다.

3. Tool & Tech Review Tables
tool_reviews

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): 리뷰 작성자 ID.

title (TEXT, NOT NULL): 리뷰 제목.

tool_tech_name (TEXT, NOT NULL): 리뷰 대상 도구/기술 이름.

overall_rating (INTEGER, NOT NULL, CHECK (overall_rating BETWEEN 1 AND 5)): 종합 평점.

one_liner_pros (TEXT): 한 줄 장점.

one_liner_cons (TEXT): 한 줄 단점.

content (TEXT, NOT NULL): 상세 리뷰 본문 (Markdown).

hero_image_url (TEXT): 대표 이미지/스크린샷 URL.

demo_video_url (TEXT): 데모 비디오 URL.

font_preference (TEXT, DEFAULT 'Modern Sans-serif'): 폰트 설정.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, tool_tech_name, overall_rating, created_at.

review_categories (N:M 관계를 위한 조인 테이블)

review_id (UUID, FK tool_reviews(id), PK)

category_name (TEXT, PK)

4. Community (Coding Lounge) Tables
community_posts

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): 게시물 작성자 ID.

title (TEXT, NOT NULL): 게시물 제목.

content (TEXT, NOT NULL): 게시물 본문 (Markdown).

image_urls (TEXT[]): 첨부 이미지 URL 배열.

font_preference (TEXT, DEFAULT 'Modern Sans-serif'): 폰트 설정.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, created_at.

community_post_tags (N:M 관계를 위한 조인 테이블)

post_id (UUID, FK community_posts(id), PK)

tag_name (TEXT, PK)

community_polls (선택 사항 - 만약 투표 기능을 구현한다면)

id (UUID, PK, DEFAULT gen_random_uuid())

post_id (UUID, FK community_posts(id), UNIQUE): 소속 게시물 ID.

question (TEXT, NOT NULL): 투표 질문.

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

community_poll_options

id (UUID, PK, DEFAULT gen_random_uuid())

poll_id (UUID, FK community_polls(id))

option_text (TEXT, NOT NULL): 투표 항목 텍스트.

vote_count (INTEGER, DEFAULT 0): 해당 항목 투표 수.

community_poll_votes

poll_option_id (UUID, FK community_poll_options(id), PK)

user_id (UUID, FK user_profiles(user_id), PK)

voted_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

5. Vibe News Tables
news_articles

id (UUID, PK, DEFAULT gen_random_uuid())

admin_id (UUID, FK user_profiles(user_id)): 게시 관리자 ID (F-07 참조).

title (TEXT, NOT NULL): 기사 제목.

summary (TEXT): 기사 요약.

hero_image_url (TEXT): 대표 이미지 URL.

content (TEXT, NOT NULL): 기사 본문 (Markdown).

source_name (TEXT): 원본 뉴스 출처 이름.

source_url (TEXT): 원본 뉴스 URL.

crawled_at (TIMESTAMP WITH TIME ZONE, NOT NULL): 크롤링 일시.

published_at (TIMESTAMP WITH TIME ZONE): 사이트 게시 일시.

is_published (BOOLEAN, DEFAULT FALSE): 게시 여부.

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

comment_count (INTEGER, DEFAULT 0): 댓글 수 (집계용).

Indexes: published_at, crawled_at, admin_id.

news_categories (N:M 관계를 위한 조인 테이블)

article_id (UUID, FK news_articles(id), PK)

category_name (TEXT, PK)

6. Interaction and Statistics Tables
comments (모든 게시판의 댓글을 통합 관리)

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): 댓글 작성자 ID.

parent_id (UUID, FK comments(id)): 대댓글용 (셀프 참조).

content (TEXT, NOT NULL): 댓글 내용.

post_type (TEXT, NOT NULL, CHECK (post_type IN ('project', 'review', 'community', 'news'))): 댓글이 달린 게시물 유형.

post_id (UUID, NOT NULL): 댓글이 달린 게시물 ID (Generic FK - RLS로 타입별 접근 제어 필요).

vibe_check_count (INTEGER, DEFAULT 0): 받은 Vibe Check 수 (집계용).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

Indexes: user_id, post_id, created_at.

Note: post_id를 하나의 테이블에서 모두 관리하는 것은 유연하지만, RLS 정책 수립 시 post_type과 post_id를 함께 사용하여 해당 테이블에 대한 접근을 제한해야 합니다.

vibe_checks (모든 게시물/댓글의 '좋아요'를 통합 관리)

id (UUID, PK, DEFAULT gen_random_uuid())

user_id (UUID, FK user_profiles(user_id)): Vibe Check을 누른 사용자 ID.

target_type (TEXT, NOT NULL, CHECK (target_type IN ('project', 'review', 'community', 'news', 'comment'))): Vibe Check 대상 유형.

target_id (UUID, NOT NULL): Vibe Check 대상의 ID (Generic FK).

created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): Vibe Check 일시.

Indexes: user_id, target_id, target_type.

Unique Constraint: (user_id, target_type, target_id) - 한 사용자가 한 대상에 한 번만 Vibe Check을 할 수 있도록.

user_stats (이 테이블은 필요 없을 수도 있음)

Note: user_profiles 테이블의 total_vibe_checks_received 필드, 그리고 projects, tool_reviews, community_posts 테이블의 vibe_check_count 및 comment_count 필드로 충분히 통계 정보를 얻을 수 있습니다. 실시간 집계가 필요하다면 Supabase Functions(트리거)나 뷰를 사용하여 관리하는 것이 좋습니다.

7. Main Page Aggregation Tables
weekly_vibe_ranking (Materialized View or Aggregation Table)

project_id (UUID, PK, FK projects(id))

vibe_check_count_7_days (INTEGER)

last_updated (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

Indexes: project_id (UNIQUE) - Materialized View를 CONCURRENTLY REFRESH하기 위해 반드시 필요

Note: projects 테이블의 vibe_checks 집계와 created_at을 활용하여 주간 랭킹을 집계하는 Materialized View나 스케줄러를 통한 정기적인 업데이트를 고려합니다.

총평 및 추가 제안
세분화된 필드명: 필드명은 최대한 구체적으로 작성하여 어떤 데이터인지 명확히 알 수 있도록 했습니다. (예: image_url 대신 hero_image_url).

Generic Foreign Key: comments와 vibe_checks 테이블에서 post_id, target_id와 post_type, target_type을 함께 사용하는 "Generic Foreign Key" 패턴을 제안했습니다. 이는 유연하지만 RLS 정책 수립 시 주의가 필요합니다. 각 타입별 FK를 따로 두는 것도 방법이나, 테이블 수가 늘어납니다. (예: project_id, review_id 등 모든 FK를 nullable로 가지는 방식)

집계 필드 (_count, _total): projects, tool_reviews, community_posts의 vibe_check_count, comment_count와 user_profiles의 total_vibe_checks_received 필드는 데이터 조회 성능을 위해 카운트를 미리 저장하는 집계(Denormalization) 필드입니다. 이 필드들은 vibe_checks나 comments 테이블에 데이터가 삽입/삭제될 때 Supabase Functions(트리거)를 통해 자동으로 업데이트되도록 설정하는 것이 좋습니다.

font_preference: 'Vibe' Editor (F-03)의 Per-Post Font Selection 기능을 위해 projects, tool_reviews, community_posts, news_articles 테이블에 font_preference 필드를 추가했습니다.

news_articles.admin_id: F-07의 AI Content Automation Pipeline에서 관리자가 뉴스를 발행하므로, news_articles 테이블에 admin_id (관리자 FK)를 추가하는 것을 제안합니다. 관리자 계정을 별도로 관리하거나, user_profiles에 is_admin 필드를 추가하는 방법도 있습니다.

project_categories, project_technologies, project_tools, review_categories, community_post_tags, news_categories: N:M 관계는 조인 테이블을 통해 구현하는 것이 일반적입니다. 여기서는 조인 테이블 이름과 필드를 구체화했습니다. category_name, tech_name, tool_name, tag_name 필드들은 별도의 마스터 테이블(categories, technologies, tools, tags)을 만들어 FK로 연결하면 데이터 일관성과 관리가 더 용이해집니다.

user_stats 테이블 제거: 위에서 제안한 필드들로 충분히 통계 정보를 얻을 수 있어 중복될 수 있으므로 제거를 제안합니다.