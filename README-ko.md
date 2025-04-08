# NestJS REST API 보일러플레이트

<p style="text-align: center;">
  <a href="https://github.com/songminkyu/nestjs-boilerplate/blob/main/README.md"> English</a> &nbsp; | &nbsp; 한국어</a>
</p>

[![image](https://github.com/brocoders/nestjs-boilerplate/assets/72293912/197da43e-02f4-4895-8d3e-b7a42a591c26)](https://github.com/new?template_name=nestjs-boilerplate&template_owner=brocoders)

![github action status](https://github.com/brocoders/nestjs-boilerplate/actions/workflows/docker-e2e.yml/badge.svg)
[![renovate](https://img.shields.io/badge/renovate-enabled-%231A1F6C?logo=renovatebot)](https://app.renovatebot.com/dashboard)
[![Static Badge](https://img.shields.io/badge/supported_by-brocoders-d91965?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjE4NyIgdmlld0JveD0iMCAwIDEzMCAxODciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI%2BCjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF83NzExXzQ4OTEpIj4KPHBhdGggZD0iTTc1Ljk5NjcgNDUuNzUwNkM2NS4xMDg5IDQ2Ljg2MSA1Ny45MjMgNTguNDA5NyA2Mi4yNzgxIDY4Ljg0OEwxMDguNDQyIDE4N0w3My42MDEzIDE1NS4wMTlIMzQuODQwOUMyMC42ODY4IDE1NS4wMTkgOS4zNjM0OSAxNDMuNDcgOS4zNjM0OSAxMjkuMDM0Vjk0LjYxMDVDOS4zNjM0OSA5Mi4xNjc1IDguNDkyNDYgODkuNzI0NSA2Ljc1MDQyIDg3Ljk0NzdMMCA4MS4wNjNMNi43NTA0MiA3NC4xNzgxQzguNDkyNDYgNzIuNDAxNCA5LjM2MzQ5IDY5Ljk1ODQgOS4zNjM0OSA2Ny41MTU0VjMxLjA5MjZDOS4zNjM0OSAxMy43Njk2IDIzLjA4MjEgMCAzOS44NDkyIDBINTguMTQwN0w3NS45OTY3IDQ1Ljc1MDZaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTI1LjY0NiAxMTIuMzc4Vjk0LjgzMjdDMTI1LjY0NiA5My43MjIyIDEyNi4wODEgOTIuNjExOCAxMjYuOTUyIDkxLjcyMzRMMTMwLjAwMSA4OC4zOTIxTDEyNi45NTIgODUuMDYwN0MxMjYuMDgxIDg0LjE3MjQgMTI1LjY0NiA4My4wNjE5IDEyNS42NDYgODEuOTUxNFY2OS43MzY1QzEyNS42NDYgNTYuNDExMSAxMTQuOTc2IDQ1Ljc1MDcgMTAyLjEyOCA0NS43NTA3SDc1Ljk5NzNMMTA1LjYxMiAxMzAuODExQzEwNS42MTIgMTMwLjgxMSAxMTAuNjIgMTMwLjgxMSAxMTAuODM4IDEzMC44MTFDMTE5LjExMyAxMjkuMDM1IDEyNS42NDYgMTIxLjQ4NCAxMjUuNjQ2IDExMi4zNzhaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c%2BCjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzc3MTFfNDg5MSI%2BCjxyZWN0IHdpZHRoPSIxMzAiIGhlaWdodD0iMTg3IiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM%2BCjwvc3ZnPgo%3D&logoColor=d91965)](https://brocoders.com/)
[![Discord Badge](https://img.shields.io/badge/discord-NodeJS_boilerplate-d91965?style=flat&labelColor=5866f2&logo=discord&logoColor=white&link=https://discord.com/channels/520622812742811698/1197293125434093701)](https://discord.com/channels/520622812742811698/1197293125434093701)

<br />
<p align="center"><a href="https://discord.com/channels/520622812742811698/1197293125434093701"><img src="https://github.com/brocoders/nestjs-boilerplate/assets/72293912/c9d5fbf0-b56d-46b5-bb30-f96f44764bae" width="300"/></a></p>
<br />

## 설명 <!-- omit in toc -->

일반적인 프로젝트를 위한 NestJS REST API 보일러플레이트

[전체 문서 보기](/docs/readme.md)

데모: <https://nestjs-boilerplate-test.herokuapp.com/docs>

완전히 호환되는 프론트엔드 보일러플레이트: <https://github.com/brocoders/extensive-react-boilerplate>

[bc 보일러플레이트](https://bcboilerplates.com/) 생태계에 속합니다

<https://github.com/user-attachments/assets/a66f114a-c714-4036-8eeb-20cbf04ae985>

## 목차 <!-- omit in toc -->

- [특징](#특징)
- [기여자](#기여자)
- [지원](#지원)

## 특징

- [x] 데이터베이스. [TypeORM](https://www.npmjs.com/package/typeorm)과 [Mongoose](https://www.npmjs.com/package/mongoose) 지원.
- [x] 시드 데이터 생성.
- [x] 설정 서비스 ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] 메일링 ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] 이메일을 통한 로그인 및 회원가입.
- [x] 소셜 로그인 (Apple, Facebook, Google).
- [x] 관리자 및 사용자 역할.
- [x] 국제화/번역 (I18N) ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] 파일 업로드. 로컬 및 Amazon S3 드라이버 지원.
- [x] Swagger.
- [x] E2E 및 단위 테스트.
- [x] Docker.
- [x] CI (Github Actions).

## 기여자

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Shchepotin"><img src="https://avatars.githubusercontent.com/u/6001723?v=4?s=100" width="100px;" alt="Vladyslav Shchepotin"/><br /><sub><b>Vladyslav Shchepotin</b></sub></a><br /><a href="#maintenance-Shchepotin" title="Maintenance">🚧</a> <a href="#doc-Shchepotin" title="Documentation">📖</a> <a href="#code-Shchepotin" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/SergeiLomako"><img src="https://avatars.githubusercontent.com/u/31205374?v=4?s=100" width="100px;" alt="SergeiLomako"/><br /><sub><b>SergeiLomako</b></sub></a><br /><a href="#code-SergeiLomako" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ElenVlass"><img src="https://avatars.githubusercontent.com/u/72293912?v=4?s=100" width="100px;" alt="Elena Vlasenko"/><br /><sub><b>Elena Vlasenko</b></sub></a><br /><a href="#doc-ElenVlass" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://brocoders.com"><img src="https://avatars.githubusercontent.com/u/226194?v=4?s=100" width="100px;" alt="Rodion"/><br /><sub><b>Rodion</b></sub></a><br /><a href="#business-sars" title="Business development">💼</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## 지원

컨설팅, 지원 또는 협업을 원하시면 [boilerplates@brocoders.com](mailto:boilerplates@brocoders.com)으로 연락해 주세요. 보일러플레이트에 관한 질문은 [GitHub Discussions](https://github.com/brocoders/nestjs-boilerplate/discussions) 또는 [Discord](https://discord.com/channels/520622812742811698/1197293125434093701)에서 자유롭게 문의하세요.
