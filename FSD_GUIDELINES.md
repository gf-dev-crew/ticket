# FSD 코드 배치 가이드라인

## 📁 전체 구조 개요

```
src/
├── app/                    # Next.js App Router (라우팅 전용)
├── support/               # Support 스코프 (고객용)
├── admin/                 # Admin 스코프 (관리자용)
└── shared/                # 전역 공통
```

## 🎯 스코프별 배치 원칙

### 1. **Support 스코프** (`src/support/`)

- **목적**: 고객이 사용하는 기능들
- **특징**: 도메인 소비자 역할 (entities 없음)

```
support/
├── features/              # 고객용 기능들
│   ├── qa/               # Q&A 질문하기
│   ├── faq/              # FAQ 보기
│   └── notice/           # 공지사항 보기
└── shared/               # Support 스코프 내 공통
    ├── ui/               # Support 전용 UI 컴포넌트
    ├── hooks/            # Support 전용 훅
    └── utils/            # Support 전용 유틸리티
```

### 2. **Admin 스코프** (`src/admin/`)

- **목적**: 관리자가 사용하는 기능들
- **특징**: 도메인 생산자 및 관리자 역할

```
admin/
├── features/             # 관리자용 기능들
│   ├── auth/            # 로그인/로그아웃
│   ├── dashboard/       # 대시보드
│   ├── user/            # 사용자 관리
│   ├── qa/              # Q&A 관리
│   ├── faq/             # FAQ 관리
│   ├── notice/          # 공지사항 관리
│   └── settings/        # 설정 관리
├── entities/            # Admin 전용 도메인
│   └── user/            # 사용자 도메인
└── shared/              # Admin 스코프 내 공통
    ├── ui/              # Admin 전용 UI (레이아웃, 사이드바 등)
    ├── guards/          # 인증 가드
    ├── hooks/           # Admin 전용 훅
    └── utils/           # Admin 전용 유틸리티
```

### 3. **Shared** (`src/shared/`)

- **목적**: 모든 스코프에서 공통으로 사용
- **특징**: 재사용 가능한 코드

```
shared/
├── ui/                  # 전역 공통 UI 컴포넌트
├── layout/              # 전역 레이아웃
├── features/            # 전역 공통 기능
│   └── home/           # 메인페이지
├── entities/            # 공통 도메인 (양방향 사용)
│   ├── qa/             # Q&A 도메인
│   ├── faq/            # FAQ 도메인
│   └── notice/         # 공지사항 도메인
├── api/                # API 관련 (Supabase 클라이언트 포함)
├── utils/              # 공통 유틸리티
├── constants/          # 상수
├── types/              # 공통 타입
├── hooks/              # 공통 훅
└── providers/          # Context Provider
```

## 🧩 레이어별 배치 가이드

### **Features** (기능 레이어)

```
features/
└── [feature-name]/
    ├── ui/              # UI 컴포넌트
    ├── model/           # 상태 관리, 비즈니스 로직
    ├── api/             # API 호출
    └── index.ts         # Public API
```

**배치 기준:**

- **Support**: 고객이 직접 사용하는 기능
- **Admin**: 관리자가 사용하는 기능
- **Shared**: 양쪽 모두 사용하는 기능

### **Entities** (도메인 레이어)

```
entities/
└── [entity-name]/
    ├── ui/              # 도메인 관련 UI 컴포넌트
    ├── model/           # 도메인 모델, 타입
    ├── api/             # 도메인 관련 API
    └── index.ts         # Public API
```

**배치 기준:**

- **Admin**: 관리자만 관리하는 도메인 (예: user)
- **Shared**: 양방향으로 사용되는 도메인 (예: qa, faq, notice)

### **Shared** (공통 레이어)

```
shared/
├── ui/                  # 재사용 가능한 UI 컴포넌트
├── hooks/               # 공통 커스텀 훅
├── utils/               # 유틸리티 함수
├── guards/              # 인증/권한 가드
└── layout/              # 레이아웃 컴포넌트
```

## 📋 구체적인 배치 예시

### 🎨 **UI 컴포넌트**

| 컴포넌트 타입   | 위치                             | 예시                                   |
| --------------- | -------------------------------- | -------------------------------------- |
| 전역 공통 UI    | `shared/ui/`                     | Button, Input, Modal, Pagination       |
| Admin 전용 UI   | `admin/shared/ui/`               | AdminLayout, AdminSidebar, AdminHeader |
| Support 전용 UI | `support/shared/ui/`             | SupportLayout, SupportHeader           |
| 기능별 UI       | `[scope]/features/[feature]/ui/` | LoginForm, QAForm, UserListPage        |
| 도메인 UI       | `[scope]/entities/[entity]/ui/`  | QAStatusBadge, UserCard                |

### 🪝 **커스텀 훅**

| 훅 타입         | 위치                                | 예시                             |
| --------------- | ----------------------------------- | -------------------------------- |
| 전역 공통 훅    | `shared/hooks/`                     | useLocalStorage, useDebounce     |
| Admin 전용 훅   | `admin/shared/hooks/`               | useAdminAuth, useAdminPermission |
| Support 전용 훅 | `support/shared/hooks/`             | useSupportChat                   |
| 기능별 훅       | `[scope]/features/[feature]/model/` | useLogin, useQAForm              |
| 도메인 훅       | `[scope]/entities/[entity]/model/`  | useUser, useQA                   |

### 🔧 **유틸리티 함수**

| 유틸리티 타입 | 위치                                | 예시                               |
| ------------- | ----------------------------------- | ---------------------------------- |
| 전역 공통     | `shared/utils/`                     | formatDate, validateEmail          |
| Admin 전용    | `admin/shared/utils/`               | formatAdminData, validateAdminForm |
| Support 전용  | `support/shared/utils/`             | formatSupportData                  |
| 기능별        | `[scope]/features/[feature]/model/` | validateLoginForm                  |

### 📡 **API 함수**

| API 타입   | 위치                              | 예시                                       |
| ---------- | --------------------------------- | ------------------------------------------ |
| 전역 공통  | `shared/api/`                     | apiClient, authInterceptor, supabaseClient |
| 기능별 API | `[scope]/features/[feature]/api/` | loginApi, qaApi                            |
| 도메인 API | `[scope]/entities/[entity]/api/`  | userApi, qaEntityApi                       |

### 🎭 **타입 정의**

| 타입 타입   | 위치                                | 예시                          |
| ----------- | ----------------------------------- | ----------------------------- |
| 전역 공통   | `shared/types/`                     | ApiResponse, PaginationParams |
| 도메인 타입 | `[scope]/entities/[entity]/model/`  | User, QA, FAQ                 |
| 기능별 타입 | `[scope]/features/[feature]/model/` | LoginFormData, QAFormData     |

## 🤔 배치 결정 플로우차트

```
새로운 코드를 작성할 때
    ↓
1. 이 코드가 어떤 스코프에서 사용되는가?
    ├── Support만 → support/
    ├── Admin만 → admin/
    └── 양쪽 모두 → shared/
    ↓
2. 이 코드의 성격은?
    ├── 기능 (Feature) → features/[feature-name]/
    ├── 도메인 (Entity) → entities/[entity-name]/
    └── 공통 (Shared) → shared/[type]/
    ↓
3. 구체적인 타입은?
    ├── UI 컴포넌트 → ui/
    ├── 비즈니스 로직/상태 → model/
    ├── API 호출 → api/
    ├── 훅 → hooks/ (shared인 경우) 또는 model/ (feature/entity인 경우)
    └── 유틸리티 → utils/
```

## ✅ 실제 사용 예시

### 예시 1: Q&A 질문 폼 컴포넌트

```typescript
// 위치: src/support/features/qa/ui/QAForm.tsx
// 이유: Support 스코프에서만 사용하는 Q&A 기능의 UI 컴포넌트
```

### 예시 2: 사용자 관리 훅

```typescript
// 위치: src/admin/features/user/model/useUserManagement.ts
// 이유: Admin 스코프의 user 기능에서만 사용하는 훅
```

### 예시 3: QA 상태 배지 컴포넌트

```typescript
// 위치: src/shared/entities/qa/ui/QAStatusBadge.tsx
// 이유: QA 도메인 관련이며, Support와 Admin 양쪽에서 사용
```

### 예시 4: 공통 버튼 컴포넌트

```typescript
// 위치: src/shared/ui/Button.tsx
// 이유: 모든 스코프에서 사용하는 기본 UI 컴포넌트
```

### 예시 5: Admin 레이아웃

```typescript
// 위치: src/admin/shared/ui/AdminLayout.tsx
// 이유: Admin 스코프에서만 사용하는 레이아웃 컴포넌트
```

## 🚨 주의사항

1. **의존성 방향**: 하위 레이어는 상위 레이어를 참조할 수 없음

   - ❌ `entities`에서 `features` 참조
   - ✅ `features`에서 `entities` 참조

2. **스코프 간 참조**: 다른 스코프 직접 참조 금지

   - ❌ `support`에서 `admin` 직접 참조
   - ✅ `shared`를 통한 간접 참조

3. **Public API**: 각 모듈은 `index.ts`를 통해 Public API만 노출

4. **네이밍 규칙**:
   - 폴더: kebab-case
   - 컴포넌트 파일: PascalCase
   - 기타 파일: camelCase

## 🗄️ **데이터베이스 & 외부 서비스**

### **Supabase 관련 파일**

| 파일 타입       | 위치               | 예시                    | 설명                             |
| --------------- | ------------------ | ----------------------- | -------------------------------- |
| DB 클라이언트   | `shared/api/`      | supabaseClient.ts       | 모든 스코프에서 사용하는 DB 연결 |
| DB 에러 핸들러  | `shared/utils/`    | supabaseErrorHandler.ts | DB 에러 처리 유틸리티            |
| DB 타입         | `shared/types/`    | database.types.ts       | Supabase 자동 생성 타입          |
| DB 마이그레이션 | `shared/database/` | migrations/, seeds/     | 스키마 변경 및 초기 데이터       |

### **현재 Supabase 파일 위치 분석**

```typescript
// ✅ 적절한 위치
src/shared/supabase/client.ts          → src/shared/api/supabaseClient.ts
src/shared/supabase/error-handler.ts   → src/shared/utils/supabaseErrorHandler.ts

// 이유:
// - client.ts: 모든 스코프에서 사용하는 API 클라이언트
// - error-handler.ts: 공통 에러 처리 유틸리티
```
