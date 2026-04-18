# =============================================================
# Stage 1: 빌드 단계
# 역할: dist/ 폴더를 만들기 위한 임시 작업 공간
# 이 단계는 최종 이미지에 포함되지 않고 버려짐
# =============================================================
# Stage의 이름을 builder로 설정
FROM node:22-alpine AS builder
WORKDIR /app

# 의존성 파일만 먼저 복사
# COPY package*.json ./  → package.json 그대로 → 캐시 재사용 ✓
# RUN npm ci             → 위가 캐시니까       → 캐시 재사용 ✓ (실행 안 함)
# COPY . .               → 소스코드 바뀜       → 캐시 무효화, 다시 실행
# RUN npm run build      → 위가 바뀌었으니까   → 다시 실행

# 나쁜 순서
# COPY . .               ← 소스코드 바뀜
# RUN npm ci             ← 소스코드랑 묶여있어서 매번 재실행됨 (느림)
# RUN npm run build
# npm run build 속도보다 npm ci의 속도가 훨씬 오래 걸리기 때문에 자주 바뀌지 않는 package.json을 먼저 복사해 캐시를 사용할 수 있도록 하기 위함
COPY package*.json ./

# node_modules 설치
# 이 시점에 node_modules/는 /app/node_modules/ 에 생성됨 (dist/ 안이 아님)
RUN npm ci

# 소스 코드 전체 복사
# .dockerignore에 node_modules를 추가해두면
# 호스트의 node_modules는 복사되지 않음 (.gitignore와 별개 파일)
COPY . .

# 빌드 실행
# - src/ 소스코드 + node_modules/ 라이브러리를 번들링(합치기)해서
#   dist/ 폴더 안에 index.html, assets/index.js, assets/index.css 등 생성
# - node_modules 폴더 자체가 dist/로 복사되는 게 아니라
#   필요한 코드만 뽑아서 js 파일 하나로 합쳐짐
RUN npm run build

# 빌드 후 /app/ 구조:
# /app/
# ├── node_modules/   ← Stage 2에서 가져가지 않음
# ├── src/            ← Stage 2에서 가져가지 않음
# ├── dist/           ← 이것만 Stage 2에서 가져감
# │   ├── index.html
# │   └── assets/
# │       ├── index-abc.js   (node_modules 코드가 여기 합쳐져 있음)
# │       └── index-def.css
# └── package.json    ← Stage 2에서 가져가지 않음

# =============================================================
# Stage 2: 서빙 단계
# 역할: dist/ 안의 정적 파일을 nginx로 서빙하는 최종 이미지
# 이 단계만 실제 컨테이너로 실행됨 (Stage 1은 여기서 버려짐)
# 최종 이미지 크기: ~20MB (Stage 1 전체를 쓰면 ~400MB)
# nginx로 서빙 (node_modules 불포함)
# =============================================================
FROM nginx:alpine

# Stage 1에서 dist/ 폴더만 꺼내서 nginx 서빙 경로로 복사
# node_modules, src, package.json 등은 dist/ 밖에 있으므로 포함되지 않음
# dist/ 안은 순수 정적 파일(html, css, js)만 있음
# builder라는 이름의 Stage를 지정
COPY --from=builder /app/dist /usr/share/nginx/html

# 프로젝트 루트의 nginx.conf를 컨테이너 안의 nginx 설정으로 복사
# nginx.conf는 서버(호스트)에 있을 필요 없음
# 이 명령어로 컨테이너 안에 포함되기 때문
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3000번 포트 오픈
EXPOSE 3000

# nginx 실행 (컨테이너 안에서 nginx가 작동함, 호스트의 nginx와 무관)
CMD ["nginx", "-g", "daemon off;"]