// scripts/inject-cache-busting.js
//
// 목적: assets/js/*.js, assets/css/*.css 로컬 에셋을 참조하는 모든 HTML 파일의
// <script src="...">, <link rel="stylesheet" href="..."> 태그에 파일 내용
// 기반 해시(?v=콘텐츠해시8자리)를 자동으로 붙인다.
//
// 원리(수동 버전 관리의 "깜빡함" 문제 해결):
// - 파일 내용이 바뀌면 해시도 바뀌므로, 사람이 버전 번호를 직접 올리는 걸
//   잊어도 자동으로 새 버전으로 인식되어 브라우저 캐시가 무효화된다.
// - 파일 내용이 그대로면 해시도 그대로라, 매 빌드마다 불필요한 git diff가
//   생기지 않는다(변경된 에셋만 버전이 바뀜).
//
// 실행 방식:
// - GitHub Actions 워크플로(generate-coin-pages.yml)에서 코인 페이지 생성
//   직후 이 스크립트를 실행한다.
// - 로컬에서 수동 실행: `node scripts/inject-cache-busting.js`
//
// 대상 HTML 파일:
// - index.html, coin-detail.html (레포 루트)
// - pages/*.html
// - coins/coin-*.html (generate-coin-pages.js가 생성한 결과물)
//
// 대상에서 제외:
// - naver*.html (네이버 사이트 인증 파일, 에셋 참조 없음)
// - assets/, node_modules/, .git/ 등 비-HTML 디렉토리

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.join(__dirname, '..');

// ── 1. 대상 로컬 에셋 파일 목록과 콘텐츠 해시 계산 ──
const ASSET_DIRS = [
  { dir: 'assets/js', ext: '.js' },
  { dir: 'assets/css', ext: '.css' },
];

function hashFile(absPath) {
  const content = fs.readFileSync(absPath);
  return crypto.createHash('sha256').update(content).digest('hex').slice(0, 8);
}

// key: "assets/js/nav.js" (항상 슬래시, 루트 기준 상대경로) → value: 8자리 해시
const assetHashes = {};
for (const { dir, ext } of ASSET_DIRS) {
  const absDir = path.join(ROOT, dir);
  if (!fs.existsSync(absDir)) continue;
  for (const file of fs.readdirSync(absDir)) {
    if (!file.endsWith(ext)) continue;
    const relKey = `${dir}/${file}`; // 예: assets/js/nav.js
    assetHashes[relKey] = hashFile(path.join(absDir, file));
  }
}

// ── 2. 대상 HTML 파일 수집 ──
function collectHtmlFiles() {
  const files = [];

  // 루트: index.html, coin-detail.html (naver 인증 파일 등은 제외)
  for (const name of ['index.html', 'coin-detail.html']) {
    const p = path.join(ROOT, name);
    if (fs.existsSync(p)) files.push(p);
  }

  // pages/*.html
  const pagesDir = path.join(ROOT, 'pages');
  if (fs.existsSync(pagesDir)) {
    for (const name of fs.readdirSync(pagesDir)) {
      if (name.endsWith('.html')) files.push(path.join(pagesDir, name));
    }
  }

  // coins/coin-*.html
  const coinsDir = path.join(ROOT, 'coins');
  if (fs.existsSync(coinsDir)) {
    for (const name of fs.readdirSync(coinsDir)) {
      if (name.startsWith('coin-') && name.endsWith('.html')) {
        files.push(path.join(coinsDir, name));
      }
    }
  }

  return files;
}

// ── 3. HTML 파일 내 src/href를 해시 버전으로 교체 ──
// 매치 대상: src="...assets/js/X.js" 또는 href="...assets/css/X.css"
// 상대경로 접두사(../ 등)는 그대로 유지하고, 파일명 뒤의 기존 ?v=... 는 제거 후
// 새 해시로 교체한다.
const ASSET_REF_RE = /((?:src|href)=")((?:\.\.\/)*assets\/(?:js|css)\/[a-zA-Z0-9_-]+\.(?:js|css))(\?v=[a-zA-Z0-9_-]+)?(")/g;

function injectIntoFile(absPath) {
  const original = fs.readFileSync(absPath, 'utf8');
  let changed = false;

  const updated = original.replace(ASSET_REF_RE, (match, prefix, refPath, _oldQuery, suffix) => {
    // refPath 예: "../assets/js/nav.js" → key로 변환 시 "../" 제거
    const key = refPath.replace(/^(\.\.\/)+/, '');
    const hash = assetHashes[key];
    if (!hash) return match; // 매핑에 없는 파일(오탈자 등)은 건드리지 않음
    const newTag = `${prefix}${refPath}?v=${hash}${suffix}`;
    if (newTag !== match) changed = true;
    return newTag;
  });

  if (changed) {
    fs.writeFileSync(absPath, updated, 'utf8');
  }
  return changed;
}

// ── 4. 실행 ──
function main() {
  const htmlFiles = collectHtmlFiles();
  let changedCount = 0;

  for (const file of htmlFiles) {
    if (injectIntoFile(file)) {
      changedCount++;
      console.log(`  갱신: ${path.relative(ROOT, file)}`);
    }
  }

  console.log(`[inject-cache-busting] 에셋 ${Object.keys(assetHashes).length}개 해시 계산, ` +
    `HTML ${htmlFiles.length}개 검사, ${changedCount}개 파일 갱신`);
}

main();

module.exports = { injectIntoFile, collectHtmlFiles, assetHashes };
