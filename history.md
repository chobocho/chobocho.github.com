# 변경 이력

## 2026-04-23

### 빈 파일 정리
- 0 바이트 상태였고 어느 곳에서도 링크되지 않던 `javascript/example001.md`를 삭제.

### 콘텐츠 파일 Home 백링크 일관화
- 백링크가 없던 콘텐츠 `.md` 파일 21개 상단에 `#### [Home](../index.md)` + 구분선(`---`) 삽입.
- 대상: `chinese/*`, `english/en_wordbook01.md`, `go/make_folder.md`, `japanese/jp_wordbook01.md`, `javascript/add_google_search.md`, `dictionary/index.md`, `python/` 내 백링크 미보유 파일 16개.
- 기존에 백링크가 있던 5개 파일(`python/wxpython.md`, `python/git_gc.md`, `python/lfsr.md`, `python/folder.md`, `linux/awk.md`)은 건드리지 않음.
- 빈 파일 `javascript/example001.md`는 다음 이슈에서 처리.
- 검증: 26개 콘텐츠 파일 모두 Home 백링크 포함 (grep 확인).

### 시각 디자인 경량 개선 (cayman 확장)
- `_config.yml`에 `title`, `description`, `show_downloads: false` 추가해 헤더 문구 개선 및 불필요한 Download 버튼 제거.
- `assets/css/style.scss` 신규 작성. cayman 테마를 `@import`한 뒤 본문(`.main-content`)의 줄간격·리스트 간격·섹션 마진을 조금씩 확장.
- `prefers-color-scheme: dark` 미디어 쿼리로 다크모드 팔레트 추가 (GitHub 다크 배경/전경 톤 사용). 헤더 그라디언트는 cayman 원본 유지.

### 폴더별 README 일관성 확보
- README.md가 없던 7개 폴더에 신규 README.md 추가: `chinese`, `english`, `go`, `japanese`, `javascript`, `linux`, `python`.
- 껍데기 상태였던 7개 README.md에 공통 템플릿(Home 백링크 + 제목) 적용: `c`, `cpp`, `java`, `kotlin`, `math`, `nodejs`, `uml`.
- 기존 내용이 있던 3개 README.md 상단에 `[Home](../index.md)` 백링크만 추가해 내용을 보존: `android`, `computer`, `designpattern`.
- `math/README.md` 제목 오타 수정: "Mathmatics" → "Mathematics".
- 상위 `index.md`의 `go`, `javascript`, `linux` 링크를 각 폴더의 `README.md`로 통일.
- `dictionary`는 Jekyll 관례상 `index.md`를 유지 (예외).
- 검증: 17개 폴더 README 전부 Home 백링크 포함, README 내부 링크 25개 모두 실제 파일 확인.

### index.md 구조 재편
- 최상위 카테고리를 `Programming Languages` / `Platforms & Frameworks` / `Computer Science` / `Python Notes` / `Languages(어학)` 5개로 그룹화.
- Python 18개 링크를 `GUI`, `파일/시스템`, `데이터 처리`, `알고리즘/수학` 소분류로 정리.
- 중복이던 `Gradle` 섹션을 제거하고 `Android` 항목의 부가 설명으로 통합.
- 기존 index에 누락돼 있던 `Kotlin`, `Mathematics` 항목을 추가.
- 빈 파일(`javascript/example001.md`)은 계속 링크 제외.
- 검증: index.md가 참조하는 36개 링크 모두 실제 파일 존재 확인.
