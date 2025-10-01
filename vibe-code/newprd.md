# Vibe Code 기술 아키텍처 및 데이터베이스 설계

이 문서는 Vibe Code 프로젝트의 기술 아키텍처, 개발 표준, 그리고 데이터베이스 설계를 정의합니다.

---

## 1. 기술 아키텍처 (Technical Architecture)

### 1.1. 기술 스택 (Technical Details)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom React components
- **Icons**: Material Symbols
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime
- **Deployment**: Netlify (planned)

### 1.2. 개발 프로세스 및 가이드라인 (Development Process & Guidelines)

#### 구현 접근 방식
1.  **컴포넌트 기반 아키텍처**: 모든 UI 요소를 Atomic Design 원칙에 따라 재사용 가능하고 독립적인 컴포넌트로 구축합니다.
2.  **모듈화 전략**: 기능을 기준으로 컴포넌트를 체계적으로 분류하고 복잡도를 관리합니다.
3.  **점진적 개발**: 각 기능을 점진적으로 구현하며, 단계별로 철저한 테스트를 수행합니다.
4.  **코드 재사용성**: 전역 컴포넌트(네비게이션 등)를 여러 페이지에서 재사용하여 일관성을 유지합니다.
5.  **데이터베이스 우선 접근**: 모든 기능은 초기부터 전체 데이터베이스 통합을 고려하여 구현합니다.
6.  **오류 처리 및 사용자 피드백**: 모든 작업에 대해 적절한 오류 처리와 사용자 피드백을 구현합니다.
7.  **유지보수성**: 향후 기능 확장을 용이하게 하기 위해 컴포넌트를 모듈화하여 관리합니다.

#### 코딩 표준
- **TypeScript**: 모든 컴포넌트와 인터페이스에 엄격한 타이핑(Strict Typing)을 적용합니다.
- **컴포넌트 구조**: 각 컴포넌트는 명확한 네이밍 컨벤션을 따라 자체 파일로 분리합니다.
- **스타일링**: Tailwind CSS와 커스텀 테마 설정을 사용합니다.
- **반응형 디자인**: Mobile-first 접근 방식을 채택하고 반응형 중단점(breakpoint)을 사용합니다.
- **접근성**: 시맨틱 HTML과 적절한 ARIA 속성을 사용하여 웹 접근성을 준수합니다.
- **데이터베이스 연동**: 모든 데이터베이스 작업에 Supabase 클라이언트를 일관되게 사용합니다.
- **성능 최적화**: 데이터베이스 쿼리와 컴포넌트 렌더링을 최적화합니다.

### 1.3. 디렉토리 구조 (Directory Structure)
```
app/
├── components/         # 전역 컴포넌트 (네비게이션, 공통 UI)
│   ├── navbar.tsx
│   └── topnav.tsx
├── mainpage/           # 메인 페이지 섹션
├── projects/           # 프로젝트 시스템 (목록, 상세, 생성)
├── gear/               # 도구 & 기술 리뷰 시스템
├── community/          # 커뮤니티 (코딩 라운지)
├── news/               # IT 뉴스 시스템
├── profile/            # 사용자 프로필
├── page.tsx            # 메인 페이지 진입점
├── layout.tsx          # 전역 레이아웃
└── globals.css         # 전역 스타일
```

### 1.4. UI/UX 구현
- **반응형 디자인**: 데스크톱, 태블릿, 모바일에서 일관된 사용자 경험을 제공합니다.
- **사용자 피드백**: 모든 인터랙티브 요소에 hover 및 active 상태를 명확히 표시합니다.
- **언어 지원**: 애플리케이션 전반에 걸쳐 완전한 한국어 지원을 제공합니다.
- **로딩 및 오류 상태**: 모든 비동기 작업에 대해 명확한 로딩 및 오류 상태 UI를 구현합니다.

---

## 2. 데이터베이스 설계 (Database Design)

### 2.1. 보안 고려사항
1.  **행 수준 보안 (RLS)**: 모든 테이블에 RLS를 활성화하고, 사용자 역할 및 소유권에 기반한 정책을 정의하여 데이터 접근을 제한합니다.
2.  **인증**: Supabase Auth를 사용하여 사용자 인증을 처리하고, JWT 토큰으로 안전한 통신을 보장합니다.
3.  **데이터 유효성 검사**: 데이터베이스 레벨에서 제약 조건(constraints)을 사용하여 데이터 무결성을 보장합니다.
4.  **접근 제어**: 사용자 유형별로 역할을 정의하고, 직접적인 데이터베이스 접근을 제한하며, SQL Injection을 방지하기 위해 준비된 문(prepared statements)을 사용합니다.
5.  **암호화**: SSL/TLS를 통한 데이터 전송 암호화 및 필요시 민감 데이터의 저장 시 암호화를 적용합니다.

### 2.2. 테이블 생성 순서
데이터 관계의 무결성을 보장하기 위해 다음 순서로 테이블을 생성합니다.
1.  사용자 및 인증 테이블 (Users, User Profiles)
2.  프로젝트 관련 테이블 (Projects, Categories, Features, etc.)
3.  도구 & 기술 리뷰 테이블 (Tool Reviews)
4.  커뮤니티 관련 테이블 (Community Posts)
5.  뉴스 관련 테이블 (News Articles)
6.  상호작용 및 통계 테이블 (Comments, Vibe Checks)
7.  메인 페이지 집계 테이블 (Materialized Views)

### 2.3. 상세 테이블 설계

#### 사용자 및 인증
- **user_profiles**: 사용자 상세 정보 저장
    - `id` (UUID, PK), `user_id` (UUID, FK to auth.users), `username` (TEXT, UNIQUE), `display_name` (TEXT), `avatar_url` (TEXT), `bio` (TEXT), `social_urls` (TEXT), `created_at`, `updated_at`

#### 프로젝트
- **projects**: 프로젝트 정보
    - `id` (UUID, PK), `user_id` (UUID, FK), `title` (TEXT), `tagline` (TEXT), `hero_image_url` (TEXT), `content` (TEXT), `github_url` (TEXT), `live_demo_url` (TEXT), `vibe_check_count` (INT), `is_public` (BOOL), `created_at`, `updated_at`
- **project_categories**: 프로젝트-카테고리 N:M 조인 테이블
- **project_features**: 프로젝트 기능 목록
- **project_technologies**: 프로젝트-기술 스택 N:M 조인 테이블
- **project_tools**: 프로젝트-개발 도구 N:M 조인 테이블

#### 도구 & 기술 리뷰
- **tool_reviews**: 리뷰 정보
    - `id` (UUID, PK), `user_id` (UUID, FK), `title` (TEXT), `tool_tech_name` (TEXT), `overall_rating` (INT, 1-5), `one_liner_pros` (TEXT), `one_liner_cons` (TEXT), `content` (TEXT), `created_at`, `updated_at`
- **review_categories**: 리뷰-카테고리 N:M 조인 테이블

#### 커뮤니티
- **community_posts**: 커뮤니티 게시물
    - `id` (UUID, PK), `user_id` (UUID, FK), `title` (TEXT), `content` (TEXT), `image_urls` (TEXT[]), `created_at`, `updated_at`
- **community_post_tags**: 게시물-태그 N:M 조인 테이블

#### 뉴스
- **news_articles**: 뉴스 기사
    - `id` (UUID, PK), `admin_id` (UUID, FK), `title` (TEXT), `summary` (TEXT), `content` (TEXT), `source_url` (TEXT), `is_published` (BOOL), `published_at`

#### 상호작용
- **comments**: 모든 게시물의 댓글 통합 관리
    - `id` (UUID, PK), `user_id` (UUID, FK), `parent_id` (UUID, Self-ref), `content` (TEXT), `post_type` (TEXT), `post_id` (UUID)
- **vibe_checks**: 모든 '좋아요' 통합 관리
    - `id` (UUID, PK), `user_id` (UUID, FK), `target_type` (TEXT), `target_id` (UUID), UNIQUE(`user_id`, `target_type`, `target_id`)

#### 집계
- **weekly_vibe_ranking**: 주간 랭킹 (Materialized View)
    - `project_id` (UUID, PK), `vibe_check_count_7_days` (INT)
