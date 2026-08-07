# 카테고리 배너 low-poly 배경 (작업 중 — 아직 style.css에 미반영)

2026-08-07 세션에서 생성한 카테고리 배너(index.html `.cat-gold`/`.cat-silver`/
`.cat-collectible`) 배경 후보 에셋. 아직 실제 사이트에는 적용하지 않은 상태이며,
색감/톤(진한 vs 연화) 결정 전까지 유실 방지 목적으로 먼저 레포에 저장해둠.

## 파일
- `gold-lowpoly.svg` / `silver-lowpoly.svg` / `bronze-lowpoly.svg`
  → 원본(진한 대비) 톤. 불규칙 Delaunay 삼각분할 기반, "구겨진 금박지" 느낌의
  강한 명암 대비.
- `gold-lowpoly-soft.svg` / `silver-lowpoly-soft.svg` / `bronze-lowpoly-soft.svg`
  → 대비를 압축한 연화 톤. 텍스트/버튼 가독성을 고려한 버전.

## 재생성 방법
`scripts/generate-category-banners.py` 참고 (numpy, scipy 필요).
포인트 시드값, 색상 스톱(GOLD_STOPS 등), 조명 방향(light_dir) 등을 조정해
다시 생성 가능.

## 다음 단계 (미결정)
- 진한 톤 vs 연화 톤 중 최종 채택안 결정 필요
- 텍스트 가독성 확보 방식 결정 필요:
  - A안: 연화 톤 + 중앙 방사형 스크림
  - B안: 원본 진한 톤 유지 + 텍스트 뒤 반투명 카드(패널)
  - 절충안: 연화 톤 + 카드 병행 가능
- 결정되면 `assets/css/style.css`의 `.cat-gold`/`.cat-silver`/`.cat-collectible`
  배경 이미지 교체 + `index.html`의 `.cat-content` 마크업(카드/스크림 여부)
  조정 필요
