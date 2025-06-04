# Multi-scope FSD 구조 가이드

## 📁 src/app/ - Next.js App Router (라우팅 전용)

```
src/app/
├── layout.tsx                    # 전역 레이아웃 (모든 페이지 공통 헤더/푸터)
├── page.tsx                      # 메인페이지 (히어로섹션 + 최근 공지사항)
├── providers.tsx                 # 전역 Provider 설정 (React Query, Theme 등)
├── globals.css                   # 전역 스타일 (Tailwind, 리셋 CSS)
│
├── (support)/                    # 고객용 Route Group
│   ├── layout.tsx                # Support 전용 레이아웃 (breadcrumb 등)
│   ├── qa/page.tsx               # → support/features/qa로 위임
│   ├── faq/page.tsx              # → support/features/faq로 위임
│   └── notice/
│       ├── page.tsx              # → support/features/notice/list로 위임
│       └── [id]/page.tsx         # → support/features/notice/detail로 위임
│
├── (auth)/                       # 인증 전용 Route Group
│   ├── layout.tsx                # 인증 전용 레이아웃 (헤더/푸터 없음)
│   └── admin-login/page.tsx      # → admin/features/auth/login으로 위임
│
└── (super-admin)/                # 관리자용 Route Group
    ├── layout.tsx                # Admin 레이아웃 + 권한 체크
    ├── dashboard/page.tsx        # 간단한 환영 메시지
    ├── users/
    │   ├── page.tsx              # → admin/features/user/list로 위임
    │   └── [id]/page.tsx         # → admin/features/user/detail로 위임
    ├── qa-manage/                # Q&A 관리 (경로 충돌 해결)
    │   ├── page.tsx              # → admin/features/qa/list로 위임
    │   └── [id]/page.tsx         # → admin/features/qa/detail로 위임
    ├── faq-manage/               # FAQ 관리 (경로 충돌 해결)
    │   ├── page.tsx              # → admin/features/faq/list로 위임
    │   ├── create/page.tsx       # → admin/features/faq/create로 위임
    │   └── [id]/
    │       ├── page.tsx          # → admin/features/faq/detail로 위임
    │       └── edit/page.tsx     # → admin/features/faq/edit로 위임
    ├── notices/
    │   ├── page.tsx              # → admin/features/notice/list로 위임
    │   ├── create/page.tsx       # → admin/features/notice/create로 위임
    │   └── [id]/
    │       ├── page.tsx          # → admin/features/notice/detail로 위임
    │       └── edit/page.tsx     # → admin/features/notice/edit로 위임
    └── settings/page.tsx         # → admin/features/settings로 위임
```

**📝 App Router 규칙:**

- **오직 라우팅만 담당** - 비즈니스 로직 금지
- 모든 컴포넌트는 해당 스코프의 features로 위임
- Route Groups로 스코프 분리 (support, auth, super-admin)

---

## 📁 src/support/ - Support 스코프 (고객 지원)

### 🎯 Support Features (고객용 기능)

```
src/support/features/
├── qa/                           # Q&A 기능 (고객용 - 작성/조회)
│   ├── api/
│   │   └── createQA.ts           # 고객 질문 작성 API만
│   ├── hooks/
│   │   ├── useQAList.ts          # 내 Q&A 목록 조회 훅
│   │   └── useQAForm.ts          # Q&A 작성 폼 훅
│   ├── ui/
│   │   ├── QAPage.tsx            # 탭 형태 메인 페이지
│   │   ├── QAForm.tsx            # 질문 작성 폼
│   │   ├── QAAuthForm.tsx        # 휴대폰+비밀번호 인증
│   │   ├── QAList.tsx            # 내 질문 목록
│   │   └── QAItem.tsx            # 개별 Q&A 아이템
│   └── index.ts
│
├── faq/                          # FAQ 기능 (고객용 - 읽기 전용)
│   ├── api/
│   │   └── fetchFAQs.ts          # 공개된 FAQ만 조회
│   ├── hooks/
│   │   └── useFAQList.ts         # FAQ 목록 조회 훅
│   ├── ui/
│   │   ├── FAQPage.tsx           # 아코디언 형태 메인 페이지
│   │   ├── FAQAccordion.tsx      # FAQ 아코디언 컴포넌트
│   │   ├── FAQItem.tsx           # 개별 FAQ 아이템
│   │   └── FAQSearch.tsx         # FAQ 검색 기능
│   └── index.ts
│
└── notice/                       # 공지사항 조회 (고객용 - 읽기 전용)
    ├── list/
    │   ├── api/
    │   │   └── fetchPublicNotices.ts # 공개 공지사항만 조회
    │   ├── hooks/
    │   │   └── useNoticeList.ts   # support용 공지사항 목록 훅
    │   ├── ui/
    │   │   ├── NoticeListPage.tsx # support용 공지사항 목록
    │   │   └── NoticeCard.tsx     # support용 공지사항 카드
    │   └── index.ts
    └── detail/
        ├── ui/
        │   └── NoticeDetailPage.tsx # support용 공지사항 상세
        └── index.ts
```

### 🔧 Support Shared (Support 스코프 공통)

```
src/support/shared/
├── ui/
│   ├── SupportLayout.tsx         # Support 전용 레이아웃
│   ├── SupportHeader.tsx         # Support 전용 헤더
│   ├── SupportBreadcrumb.tsx     # Support 전용 breadcrumb
│   └── SupportSidebar.tsx        # Support 도움말 사이드바
├── constants/
│   └── supportRoutes.ts          # Support 라우트 상수
└── index.ts
```

**📝 Support 스코프 규칙:**

- **고객용 기능만** - 읽기 중심, 제한된 쓰기 (Q&A 작성만)
- **인증 불필요** - 휴대폰+비밀번호로 간단 인증
- **공개 데이터만** - 비공개/관리자 데이터 접근 금지

---

## 📁 src/admin/ - Admin 스코프 (관리자)

### 🎯 Admin Features (관리자용 기능)

```
src/admin/features/
├── auth/                         # 관리자 인증 기능
│   └── login/
│       ├── api/
│       │   ├── adminLogin.ts     # 관리자 로그인 API
│       │   └── loginSchema.ts    # 로그인 폼 유효성 검사
│       ├── hooks/
│       │   └── useAdminLogin.ts  # 관리자 로그인 훅
│       ├── ui/
│       │   ├── AdminLoginPage.tsx # 관리자 로그인 페이지
│       │   └── LoginForm.tsx     # 로그인 폼 컴포넌트
│       └── index.ts
│
├── user/                         # 사용자 관리 기능
│   ├── list/
│   │   ├── api/
│   │   │   └── fetchAllUsers.ts  # 모든 사용자 조회 API
│   │   ├── hooks/
│   │   │   └── useUserManagement.ts # 사용자 관리 훅
│   │   ├── ui/
│   │   │   ├── UserListPage.tsx  # 사용자 목록 페이지
│   │   │   ├── UserTable.tsx     # 사용자 테이블
│   │   │   └── UserFilter.tsx    # 사용자 필터
│   │   └── index.ts
│   ├── detail/
│   │   ├── ui/
│   │   │   └── UserDetailPage.tsx # 사용자 상세 페이지
│   │   └── index.ts
│   └── shared/
│       ├── ui/
│       │   ├── UserForm.tsx      # 사용자 생성/수정 공통 폼
│       │   └── UserActions.tsx   # 사용자 액션 버튼들
│       └── index.ts
│
├── qa/                           # Q&A 관리 기능
│   ├── list/
│   │   ├── api/
│   │   │   └── fetchAllQAs.ts    # 모든 Q&A 조회 API
│   │   ├── hooks/
│   │   │   └── useQAManagement.ts # Q&A 관리 훅
│   │   ├── ui/
│   │   │   ├── QAManagePage.tsx  # Q&A 관리 메인 페이지
│   │   │   ├── QAManageTable.tsx # Q&A 관리 테이블
│   │   │   └── QAStatusFilter.tsx # Q&A 상태 필터
│   │   └── index.ts
│   ├── detail/
│   │   ├── api/
│   │   │   ├── answerQA.ts       # Q&A 답변 API
│   │   │   └── assignQA.ts       # Q&A 담당자 배정 API
│   │   ├── hooks/
│   │   │   └── useQAAnswer.ts    # Q&A 답변 훅
│   │   ├── ui/
│   │   │   ├── QADetailPage.tsx  # Q&A 상세 관리 페이지
│   │   │   ├── QAAnswerForm.tsx  # 답변 작성 폼
│   │   │   └── QAHistory.tsx     # Q&A 히스토리
│   │   └── index.ts
│   └── shared/
│       ├── ui/
│       │   ├── QAAdminItem.tsx   # 관리자용 Q&A 아이템
│       │   └── QAAssignModal.tsx # 담당자 배정 모달
│       └── index.ts
│
├── faq/                          # FAQ 관리 기능
│   ├── list/
│   │   ├── api/
│   │   │   └── fetchAllFAQs.ts   # 모든 FAQ 조회 (관리자용)
│   │   ├── hooks/
│   │   │   └── useFAQManagement.ts # FAQ 관리 훅
│   │   ├── ui/
│   │   │   ├── FAQManagePage.tsx # FAQ 관리 메인 페이지
│   │   │   ├── FAQManageTable.tsx # FAQ 관리 테이블
│   │   │   └── FAQStatusFilter.tsx # FAQ 상태 필터
│   │   └── index.ts
│   ├── create/
│   │   ├── api/
│   │   │   └── createFAQ.ts      # FAQ 생성 API
│   │   ├── hooks/
│   │   │   └── useFAQCreate.ts   # FAQ 생성 훅
│   │   ├── ui/
│   │   │   └── FAQCreatePage.tsx # FAQ 생성 페이지
│   │   └── index.ts
│   ├── edit/
│   │   ├── api/
│   │   │   └── updateFAQ.ts      # FAQ 수정 API
│   │   ├── hooks/
│   │   │   └── useFAQEdit.ts     # FAQ 수정 훅
│   │   ├── ui/
│   │   │   └── FAQEditPage.tsx   # FAQ 수정 페이지
│   │   └── index.ts
│   ├── detail/
│   │   ├── ui/
│   │   │   └── FAQDetailPage.tsx # FAQ 상세 관리 페이지
│   │   └── index.ts
│   └── shared/
│       ├── ui/
│       │   ├── FAQForm.tsx       # FAQ 생성/수정 공통 폼
│       │   ├── FAQEditor.tsx     # FAQ 에디터 (마크다운)
│       │   └── FAQPreview.tsx    # FAQ 미리보기
│       └── index.ts
│
├── notice/                       # 공지사항 관리 기능
│   ├── list/
│   │   ├── ui/
│   │   │   ├── AdminNoticeListPage.tsx # 관리자용 공지사항 목록
│   │   │   └── NoticeManageTable.tsx # 공지사항 관리 테이블
│   │   └── index.ts
│   ├── create/
│   │   ├── ui/
│   │   │   └── NoticeCreatePage.tsx # 공지사항 생성 페이지
│   │   └── index.ts
│   ├── edit/
│   │   ├── ui/
│   │   │   └── NoticeEditPage.tsx # 공지사항 수정 페이지
│   │   └── index.ts
│   ├── detail/
│   │   ├── ui/
│   │   │   └── AdminNoticeDetailPage.tsx # 관리자용 공지사항 상세
│   │   └── index.ts
│   └── shared/
│       ├── ui/
│       │   ├── NoticeForm.tsx    # 공지사항 생성/수정 공통 폼
│       │   └── NoticeEditor.tsx  # 관리자용 에디터
│       └── index.ts
│
└── settings/                     # 시스템 설정 기능
    ├── api/
    │   └── updateSettings.ts     # 시스템 설정 API
    ├── hooks/
    │   └── useSettings.ts        # 설정 관리 훅
    ├── ui/
    │   ├── SettingsPage.tsx      # 설정 페이지
    │   ├── GeneralSettings.tsx   # 일반 설정
    │   └── SecuritySettings.tsx  # 보안 설정
    └── index.ts
```

### 🏢 Admin Entities (관리자 전용 도메인)

```
src/admin/entities/
└── user/                        # 사용자 도메인 (admin 전용)
    ├── types/
    │   ├── User.ts               # 관리자용 사용자 타입 (권한 정보 포함)
    │   └── AdminUser.ts          # 관리자 타입
    ├── api/
    │   ├── fetchUsers.ts         # 사용자 조회 API
    │   ├── createUser.ts         # 사용자 생성 API
    │   └── userApi.ts            # 사용자 관련 API 모음
    ├── ui/
    │   ├── UserRoleBadge.tsx     # 사용자 역할 뱃지
    │   └── UserStatusBadge.tsx   # 사용자 상태 뱃지
    └── index.ts
```

### 🔧 Admin Shared (Admin 스코프 공통)

```
src/admin/shared/
├── ui/
│   ├── AdminLayout.tsx           # Admin 레이아웃 컴포넌트
│   ├── AdminSidebar.tsx          # Admin 사이드바
│   ├── AdminHeader.tsx           # Admin 헤더
│   └── AdminBreadcrumb.tsx       # Admin breadcrumb
├── constants/
│   ├── adminRoutes.ts            # Admin 라우트 상수
│   └── permissions.ts            # 권한 상수
├── hooks/
│   ├── useAdminAuth.ts           # 관리자 인증 상태 (전역)
│   └── usePermissions.ts         # 권한 체크 훅
├── guards/
│   └── AuthGuard.tsx             # 인증 가드 컴포넌트
└── index.ts
```

**📝 Admin 스코프 규칙:**

- **관리자 전용 기능** - 모든 데이터 CRUD 가능
- **인증 필수** - JWT 토큰 기반 인증
- **권한 체크** - 모든 페이지에서 관리자 권한 확인

---

## 📁 src/shared/ - 전역 공통

### 🎨 Shared UI (전역 UI 컴포넌트)

```
src/shared/ui/
├── Button/
│   ├── Button.tsx                # 모든 곳에서 사용하는 기본 버튼
│   ├── Button.stories.tsx        # Storybook 스토리
│   └── index.ts
├── Modal/
│   ├── Modal.tsx                 # 모든 곳에서 사용하는 모달
│   ├── ConfirmModal.tsx          # 확인 모달
│   └── index.ts
├── Form/
│   ├── Input.tsx                 # 기본 입력 필드
│   ├── Textarea.tsx              # 텍스트 영역
│   ├── Select.tsx                # 셀렉트 박스
│   └── index.ts
├── Pagination/
│   ├── Pagination.tsx            # 모든 목록에서 사용하는 페이지네이션
│   └── index.ts
├── DataList/
│   ├── DataList.tsx              # 범용 목록 컴포넌트
│   └── index.ts
├── BoardFilter/
│   ├── BoardFilter.tsx           # 카테고리 필터 (공통)
│   └── index.ts
├── LoadingSpinner/
│   └── LoadingSpinner.tsx        # 로딩 스피너 (전역)
├── Toast/
│   ├── Toast.tsx                 # 토스트 알림
│   └── index.ts
├── ImageUpload/
│   ├── ImageUpload.tsx           # 이미지 업로드 (Q&A, 공지사항 공통)
│   └── index.ts
└── index.ts                      # 모든 UI 컴포넌트 export
```

### 🏗️ Shared Layout (전역 레이아웃)

```
src/shared/layout/
├── Header/
│   ├── Header.tsx                # 전역 헤더 (로고, 네비게이션)
│   └── Navigation.tsx            # 메인 네비게이션
├── Footer/
│   └── Footer.tsx                # 전역 푸터 (회사 정보, 연락처)
└── index.ts
```

### 🎯 Shared Features (전역 공통 기능)

```
src/shared/features/
└── home/                         # 메인페이지 전용 기능
    ├── ui/
    │   ├── HeroSection.tsx       # 메인페이지 히어로 섹션
    │   ├── FeatureSection.tsx    # 기능 소개 섹션
    │   ├── CTASection.tsx        # Call-to-Action 섹션
    │   ├── TestimonialSection.tsx # 고객 후기 섹션
    │   └── RecentNotices.tsx     # 최근 공지사항 3개 표시
    └── index.ts
```

### 🏢 Shared Entities (전역 공통 도메인)

```
src/shared/entities/
├── qa/                           # Q&A 도메인 (Support + Admin 공통)
│   ├── types/
│   │   └── QA.ts                 # Q&A 타입 정의
│   ├── api/
│   │   ├── fetchQAs.ts           # Q&A 조회 API (공통)
│   │   └── qaApi.ts              # Q&A 관련 API 모음
│   ├── ui/
│   │   ├── QAStatusBadge.tsx     # Q&A 상태 뱃지 (공통)
│   │   └── QAPriorityBadge.tsx   # Q&A 우선순위 뱃지 (공통)
│   └── index.ts
│
├── faq/                          # FAQ 도메인 (Support + Admin 공통)
│   ├── types/
│   │   └── FAQ.ts                # FAQ 타입 정의
│   ├── api/
│   │   ├── fetchFAQs.ts          # FAQ 조회 API (공통)
│   │   └── faqApi.ts             # FAQ 관련 API 모음
│   ├── ui/
│   │   ├── FAQStatusBadge.tsx    # FAQ 상태 뱃지 (공통)
│   │   └── FAQCategoryBadge.tsx  # FAQ 카테고리 뱃지 (공통)
│   └── index.ts
│
└── notice/                       # 공지사항 도메인 (Support + Admin 공통)
    ├── types/
    │   └── Notice.ts             # 공지사항 타입 정의
    ├── api/
    │   ├── fetchNotices.ts       # 공지사항 조회 API (공통)
    │   └── noticeApi.ts          # 공지사항 관련 API 모음
    ├── ui/
    │   ├── NoticeItem.tsx        # 공지사항 아이템 기본 컴포넌트
    │   └── NoticeStatusBadge.tsx # 공지사항 상태 뱃지
    └── index.ts
```

### 🔧 기타 Shared 폴더들

```
src/shared/
├── api/                          # 전역 API 설정
│   ├── client.ts                 # Axios 클라이언트 설정
│   ├── types.ts                  # API 공통 타입
│   └── interceptors.ts           # API 인터셉터 (인증 토큰 등)
│
├── utils/                        # 전역 유틸리티
│   ├── formatDate.ts             # 날짜 포맷팅
│   ├── validation.ts             # 공통 유효성 검사
│   └── storage.ts                # 로컬 스토리지 유틸
│
├── constants/                    # 전역 상수
│   ├── routes.ts                 # 라우트 상수
│   ├── apiEndpoints.ts           # API 엔드포인트
│   └── config.ts                 # 앱 설정
│
├── types/                        # 전역 타입
│   ├── api.ts                    # API 응답 타입
│   └── common.ts                 # 공통 타입
│
├── hooks/                        # 전역 훅
│   ├── useLocalStorage.ts        # 로컬 스토리지 훅
│   └── useDebounce.ts            # 디바운스 훅
│
├── providers/                    # 전역 Provider
│   ├── QueryProvider.tsx         # React Query Provider
│   ├── ThemeProvider.tsx         # 테마 Provider
│   └── index.ts
│
└── assets/                       # 전역 에셋
    ├── icons/                    # 아이콘
    └── images/                   # 이미지
```

---

## 🎯 파일 배치 규칙 요약

### 📍 어디에 무엇을 넣을지 판단 기준

#### 1. **App Router (`src/app/`)**

- ✅ **넣는 것**: 라우팅 설정, 레이아웃 설정, 페이지 컴포넌트 (위임만)
- ❌ **넣지 않는 것**: 비즈니스 로직, 상태 관리, API 호출

#### 2. **Support 스코프 (`src/support/`)**

- ✅ **넣는 것**: 고객용 기능, 읽기 중심 기능, 제한된 쓰기 기능
- ❌ **넣지 않는 것**: 관리자 기능, 민감한 데이터 처리, 권한 관리

#### 3. **Admin 스코프 (`src/admin/`)**

- ✅ **넣는 것**: 관리자 전용 기능, 모든 CRUD 기능, 권한 관리
- ❌ **넣지 않는 것**: 고객용 기능, 공개 데이터만 다루는 기능

#### 4. **Shared (`src/shared/`)**

- ✅ **넣는 것**:
  - **UI**: 모든 스코프에서 사용하는 컴포넌트
  - **Entities**: Support + Admin 모두 사용하는 도메인
  - **Utils**: 전역 유틸리티 함수
  - **Types**: 전역 공통 타입
- ❌ **넣지 않는 것**: 특정 스코프에서만 사용하는 기능

### 🔍 구체적 예시

#### Q&A 관련 파일들

- `shared/entities/qa/types/QA.ts` - Q&A 타입 (Support + Admin 공통)
- `shared/entities/qa/ui/QAStatusBadge.tsx` - 상태 뱃지 (Support + Admin 공통)
- `support/features/qa/ui/QAForm.tsx` - 고객용 질문 작성 폼
- `admin/features/qa/ui/QAAnswerForm.tsx` - 관리자용 답변 작성 폼

#### 버튼 컴포넌트들

- `shared/ui/Button/Button.tsx` - 기본 버튼 (모든 곳에서 사용)
- `support/shared/ui/SupportButton.tsx` - Support 전용 버튼
- `admin/shared/ui/AdminButton.tsx` - Admin 전용 버튼

#### API 함수들

- `shared/entities/qa/api/qaApi.ts` - 공통 Q&A API
- `support/features/qa/api/createQA.ts` - 고객용 질문 작성 API
- `admin/features/qa/api/answerQA.ts` - 관리자용 답변 작성 API

이 가이드를 참고하여 새로운 파일을 만들 때 적절한 위치를 선택하시면 됩니다!
