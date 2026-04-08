# 📝 할 일 관리 앱 - React 프론트엔드

## 기술 스택

| 항목 | 버전 |
|------|------|
| React | 18 |
| Vite | 5 |
| Tailwind CSS | 3 |
| Axios | 1.7 |

---

## 프로젝트 구조

```
src/
├── api/
│   └── todoApi.js          # 백엔드 API 통신 (axios)
├── components/
│   ├── TodoInput.jsx        # 할 일 입력 폼
│   ├── TodoItem.jsx         # 개별 할 일 아이템
│   ├── StatsBar.jsx         # 통계 & 진행률 바
│   ├── FilterTabs.jsx       # 전체/진행중/완료 필터
│   └── ErrorBanner.jsx      # 에러 메시지 배너
├── hooks/
│   └── useTodos.js          # 상태 관리 커스텀 훅
├── App.jsx                  # 루트 컴포넌트
├── main.jsx                 # 앱 진입점
└── index.css                # Tailwind + 글로벌 스타일
```

---

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build
```

---

## 백엔드 API 연동 (Spring Boot)

Vite의 프록시 설정 덕분에 개발 환경에서 **CORS 없이** 통신합니다.

```js
// vite.config.js
proxy: {
  '/api': { target: 'http://localhost:8080', changeOrigin: true }
}
```

### 필요한 API 엔드포인트

| Method | URL | 역할 |
|--------|-----|------|
| `GET` | `/api/todos` | 전체 목록 조회 |
| `POST` | `/api/todos` | 새 할 일 추가 |
| `PATCH` | `/api/todos/{id}` | 완료 상태 수정 |
| `DELETE` | `/api/todos/{id}` | 삭제 |

### Spring Boot Todo 엔티티 예시

```java
// Spring Boot에서 기대하는 JSON 구조
{
  "id": 1,
  "title": "할 일 내용",
  "completed": false
}
```

### Spring Boot CORS 설정 (선택)

프로덕션 환경에서는 Vite 프록시 대신 Spring Boot에 CORS 설정이 필요합니다.

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PATCH", "DELETE");
    }
}
```

---

## 주요 기능

- ✅ 할 일 목록 조회 (서버 연동)
- ✅ 할 일 추가 (Enter 키 또는 + 버튼)
- ✅ 완료 체크 (낙관적 업데이트)
- ✅ 할 일 삭제 (낙관적 업데이트)
- ✅ 완료된 항목 일괄 삭제
- ✅ 전체 / 진행 중 / 완료 필터
- ✅ 진행률 표시 바
- ✅ 에러 핸들링 및 재시도
- ✅ 다크 모드 UI
