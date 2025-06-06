# ABC 저널 수파베이스 마이그레이션

이 프로젝트는 기존 Google Apps Script와 스프레드시트를 사용하던 시스템을 Supabase로 마이그레이션한 버전입니다.

## 개요

- 기존 Google 스프레드시트에서 관리하던 데이터를 Supabase 데이터베이스로 이전
- 회원 정보, 활동 계획, 활동 일지 관리 기능 제공

## 주요 테이블

1. `membersinfo` - 회원 정보 관리

   - 회원번호, 회원명, 생년월일, 입소일, 퇴소일

2. `activities_plan` - 활동 계획 관리

   - 계획\_id, 날짜, 시작시간, 종료시간, 직원번호, 직원명, 활동명, 생활영역, 장소, 준비물품, 내용및특이사항, 활동기록, 참고사진URL

3. `activities_journal` - 활동 일지 관리
   - 일지\_id, 날짜, 시작시간, 종료시간, 직원번호, 직원명, 활동명, 코드, 회원번호, 회원명, 참여도, 수행도, 만족도, 관찰사항, created_at

## 구현 내용

- Google Apps Script 코드를 Supabase JavaScript 클라이언트로 마이그레이션
- 날짜 데이터 처리 방식 변경 (int4 타입으로 저장)
- UUID 기반 ID 생성 시스템 적용
