# 🎬 Netflix Clone

Netflix UI/UX를 참고하여 제작하는 프론트엔드 클론 코딩 프로젝트입니다.

React와 TypeScript를 기반으로 구현하며 Tailwind CSS를 사용하여 스타일링합니다.

---

## 👩‍💻 Frontend Team

<table>
  <tr>
    <td align="center">
      <img src="./src/assets/members/yebin.jpeg" width="120" /><br />
      <b>김예빈</b><br />
      <a href="https://github.com/y2bnn">@y2bnn</a>
    </td>
    <td align="center">
      <img src="./src/assets/members/subin.jpeg" width="120" /><br />
      <b>양수빈</b><br />
      <a href="https://github.com/chubin925">@chubin925</a>
    </td>
    <td align="center">
      <img src="./src/assets/members/juhee.jpeg" width="120" /><br />
      <b>이주희</b><br />
      <a href="https://github.com/jooeeeh17">@jooeeeh17</a>
    </td>
    <td align="center">
      <img src="./src/assets/members/nagyeong.jpeg" width="120" /><br />
      <b>김나경</b><br />
      <a href="https://github.com/kimnkgyeong">@kimnkgyeong</a>
    </td>
  </tr>
</table>

---

## 🛠 Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🤝 Collaboration

### Workflow

```text
Issue 생성
↓
최신 develop에서 작업 브랜치 생성
↓
기능 구현 및 자체 테스트
↓
작업 브랜치 → develop PR
↓
팀원 최소 1명 검토
↓
develop Merge
↓
작업 브랜치 삭제
```

> `main`은 배포용 브랜치로 사용합니다.  
> 모든 기능 개발은 `develop`을 기준으로 진행하며, 배포 시에만 `develop` → `main`으로 Merge합니다.

### Branch

작업 브랜치는 항상 최신 `develop`에서 생성합니다.

```bash
git checkout develop
git pull origin develop
git checkout -b feat/2-login
```

브랜치명은 다음 형식을 사용합니다.

```text
타입/이슈번호-작업내용

feat/2-login
fix/3-login-error
refactor/7-button
```

다른 작업이 먼저 Merge되었다면 PR 전에 최신 `develop`을 반영합니다.

```bash
git checkout develop
git pull origin develop

git checkout 작업브랜치명
git merge develop
```

### Pull Request

- PR의 base 브랜치는 `develop`으로 설정합니다.
- PR 전 기능 동작과 `npm run build`를 확인합니다.
- PR에 `Closes #이슈번호`를 작성합니다.
- PR 작성자를 제외한 **팀원 최소 1명이 브랜치를 직접 실행하여 확인한 후 Merge**합니다.
- 문제가 있다면 PR 작성자가 수정한 후 다시 Push합니다.
- Merge 완료 후 작업 브랜치를 삭제합니다.

#### PR Convention

PR 제목은 다음 형식으로 작성합니다.

```text
타입: 작업 내용

feat: 로그인 기능 구현
fix: 로그인 오류 수정
refactor: Header 컴포넌트 분리
style: 메인 페이지 스타일 수정
docs: README 수정
chore: 프로젝트 설정 변경
```

### Commit Convention

| Type | 설명 |
| --- | --- |
| `feat` | 새로운 기능 |
| `fix` | 버그 수정 |
| `refactor` | 코드 리팩토링 |
| `style` | 스타일 수정 |
| `docs` | 문서 수정 |
| `chore` | 설정 및 기타 작업 |

커밋 메시지는 다음 형식으로 작성합니다.

```text
타입: 작업 내용

feat: 로그인 기능 구현
fix: 로그인 오류 수정
refactor: Header 컴포넌트 분리
```

---

## 🚀 Deployment

모든 기능 개발과 테스트가 완료되면 `develop` → `main` PR을 생성하고 Vercel을 통해 배포합니다.
