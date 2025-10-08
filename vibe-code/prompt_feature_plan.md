# 프롬프트 공유 및 비교 기능 구현 계획

## 1. 개요

사용자들이 AI 프롬프트와 그 결과물을 공유하고, 서로의 결과물을 비교하며 프롬프트 엔지니어링 기술을 향상시킬 수 있는 새로운 커뮤니티 기능을 구현합니다.

## 2. 데이터베이스 설계 (`table.md`)

`table.md` 파일에 다음 테이블 정의를 추가합니다.

### `prompts` 테이블

- `id` (UUID, PK, DEFAULT gen_random_uuid()): 프롬프트 고유 ID.
- `user_id` (UUID, FK user_profiles(user_id)): 프롬프트 작성자 ID.
- `title` (TEXT, NOT NULL): 프롬프트 제목.
- `prompt_text` (TEXT, NOT NULL): 프롬프트 본문.
- `model_used` (TEXT): 사용된 AI 모델 (e.g., 'GPT-3', 'DALL-E 2').
- `tags` (TEXT[]): 관련 태그 배열.
- `vibe_check_count` (INTEGER, DEFAULT 0): 받은 'Vibe Check' 수.
- `comment_count` (INTEGER, DEFAULT 0): 댓글 수.
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.
- `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 마지막 업데이트 일시.

### `prompt_results` 테이블

- `id` (UUID, PK, DEFAULT gen_random_uuid()): 결과물 고유 ID.
- `prompt_id` (UUID, FK prompts(id)): 원본 프롬프트 ID.
- `user_id` (UUID, FK user_profiles(user_id)): 결과물 제출자 ID.
- `result_text` (TEXT): 텍스트 기반 결과물.
- `result_image_url` (TEXT): 이미지 기반 결과물 URL.
- `vibe_check_count` (INTEGER, DEFAULT 0): 받은 'Vibe Check' 수.
- `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()): 생성 일시.

## 3. 디렉토리 및 컴포넌트 구조

`app` 디렉토리 내에 새로운 `prompts` 섹션을 생성합니다.

```
app/
├── prompts/
│   ├── [id]/                 # 프롬프트 상세 페이지
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── PromptDetails.tsx
│   │       ├── ResultCard.tsx
│   │       └── ResultSubmissionForm.tsx
│   ├── create/               # 프롬프트 생성 페이지
│   │   ├── page.tsx
│   │   └── components/
│   │       └── PromptCreateForm.tsx
│   ├── page.tsx              # 프롬프트 목록 페이지
│   └── components/
│       ├── PromptCard.tsx
│       └── SearchAndFilter.tsx
└── ... (기존 구조)
```

## 4. 페이지 구현 계획

### 4.1. 프롬프트 목록 페이지 (`/prompts`)

- **기능:**
    - 모든 프롬프트를 카드 형태로 보여주는 그리드 레이아웃.
    - `SearchAndFilter.tsx` 컴포넌트를 사용하여 제목, 태그, 사용 모델로 프롬프트를 검색하고 필터링.
    - '인기순', '최신순'으로 정렬하는 기능.
    - 새 프롬프트를 작성 페이지로 연결되는 '새 프롬프트' 버튼.
- **컴포넌트:**
    - `PromptCard.tsx`: 프롬프트 제목, 작성자, 'Vibe Check' 수, 댓글 수를 표시.

### 4.2. 프롬프트 상세 페이지 (`/prompts/[id]`)

- **기능:**
    - 선택된 프롬프트의 상세 정보 (본문, 모델, 태그)를 표시.
    - 해당 프롬프트에 대해 다른 사용자들이 제출한 결과물들을 `ResultCard.tsx`를 사용하여 그리드 형태로 표시.
    - 사용자가 자신의 결과물(텍스트 또는 이미지)을 제출할 수 있는 `ResultSubmissionForm.tsx`.
    - 기존 댓글 시스템을 재사용하여 토론 기능 제공.
- **컴포넌트:**
    - `PromptDetails.tsx`: 프롬프트의 모든 정보를 표시.
    - `ResultCard.tsx`: 결과물 이미지 또는 텍스트와 제출자 정보를 표시.
    - `ResultSubmissionForm.tsx`: 이미지 업로드 및 텍스트 입력을 위한 폼.

### 4.3. 프롬프트 생성 페이지 (`/prompts/create`)

- **기능:**
    - 사용자가 새로운 프롬프트를 작성하고 제출하는 폼.
    - 입력 필드: 제목, 프롬프트 본문, 사용 모델, 태그.
    - 폼 유효성 검사 및 제출 처리.
    - 성공적으로 제출되면 생성된 프롬프트의 상세 페이지로 리디렉션.
- **컴포넌트:**
    - `PromptCreateForm.tsx`: 모든 입력 필드와 제출 로직을 포함.

## 5. API 및 데이터 연동

- Supabase 클라이언트를 사용하여 `prompts` 및 `prompt_results` 테이블에 대한 CRUD(Create, Read, Update, Delete) 함수를 구현합니다.
- 각 페이지 컴포넌트에서 필요한 데이터를 비동기적으로 가져옵니다.
- 이미지 결과물은 Supabase Storage에 업로드하고 URL을 `prompt_results` 테이블에 저장합니다.
- 성능 최적화를 위해 Next.js의 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 활용합니다.

## 6. UI/UX

- 전체적인 디자인은 기존 'Vibe Code'의 모던 레트로 팝 아트 스타일을 따릅니다.
- 기존에 정의된 `tailwind.config.js`의 색상, 폰트, 스타일을 재사용하여 일관성을 유지합니다.
- 모든 페이지는 반응형으로 디자인하여 모바일, 태블릿, 데스크톱에서 최적의 경험을 제공합니다.
- 다국어 지원(i18n)을 적용하여 모든 UI 텍스트를 영어와 한국어로 제공합니다.

## 7. 진행 상황 추적 (`progress.md`)

`progress.md` 파일에 다음 항목을 추가하여 구현 진행 상황을 추적합니다.

```markdown
### 36. 프롬프트 공유 기능 구현

- [ ] **Phase 1: 데이터베이스 설계**
  - [ ] `prompts` 테이블 스키마 정의 및 `table.md` 업데이트
  - [ ] `prompt_results` 테이블 스키마 정의 및 `table.md` 업데이트
- [ ] **Phase 2: 페이지 및 컴포넌트 구조 생성**
  - [ ] `app/prompts` 디렉토리 및 하위 파일 구조 생성
- [ ] **Phase 3: 프롬프트 생성 페이지 구현**
  - [ ] `PromptCreateForm` 컴포넌트 UI 구현
  - [ ] Supabase 연동하여 프롬프트 데이터 저장
- [ ] **Phase 4: 프롬프트 목록 페이지 구현**
  - [ ] `PromptCard` 컴포넌트 UI 구현
  - [ ] Supabase 연동하여 프롬프트 목록 데이터 조회
  - [ ] 검색 및 필터 기능 구현
- [ ] **Phase 5: 프롬프트 상세 페이지 구현**
  - [ ] `PromptDetails` 및 `ResultCard` 컴포넌트 UI 구현
  - [ ] Supabase 연동하여 프롬프트 및 결과물 데이터 조회
  - [ ] `ResultSubmissionForm` 구현 및 결과물 제출 기능 연동
- [ ] **Phase 6: UI/UX 및 최종 테스트**
  - [ ] 반응형 디자인 및 스타일 일관성 확인
  - [ ] 다국어 지원 적용
  - [ ] 전체 기능 테스트 및 버그 수정
```
