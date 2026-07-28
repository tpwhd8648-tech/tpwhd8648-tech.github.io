/* ── Google Analytics 4 (GA4) ── */
(function () {
  var gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-2T60WHRDLX';
  document.head.appendChild(gaScript);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-2T60WHRDLX');
})();

(function () {

  /* ── 스타일 주입 (구 nav.css) ── */
  const style = document.createElement('style');
  style.textContent = `
    .logo-wrap { display:flex; align-items:center; gap:14px; text-decoration:none; min-width:0; }
    .logo-symbol { flex-shrink:0; width:54px; height:54px; }
    .logo-text-block { display:flex; flex-direction:column; justify-content:center; min-width:0; overflow:hidden; }
    .logo-brand { font-family:'Playfair Display',serif; font-size:24px; font-weight:600; letter-spacing:1.5px; line-height:1; text-transform:uppercase; background:linear-gradient(135deg,#C8A84B 0%,#F5E090 40%,#C8A84B 60%,#9A7B2E 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    @media (max-width: 480px) {
      .header-inner { padding-left:14px; padding-right:14px; gap:10px; }
      .logo-symbol { width:40px; height:40px; }
      .logo-wrap { gap:10px; }
      .logo-brand { font-size:19px; letter-spacing:1px; }
      .header-icons { gap:2px; }
      .icon-btn { padding:6px; }
    }
    @media (max-width: 350px) {
      .logo-symbol { width:32px; height:32px; }
      .logo-wrap { gap:8px; }
      .logo-brand { font-size:16px; letter-spacing:0.5px; }
    }
    .custom-dropdown { position:relative; }
    .custom-dropdown-btn {
      display:flex; align-items:center; gap:8px;
      background:transparent; color:#333;
      border:1px solid #ccc; border-radius:6px;
      padding:0 12px;
      height:44px;
      box-sizing:border-box;
      font-family:'Noto Serif KR',serif;
      font-size:13px; letter-spacing:1px; cursor:pointer;
      outline:none; white-space:nowrap;
      transition: border-color 0.2s;
    }
    .custom-dropdown-btn svg { transition: transform 0.2s; }
    .custom-dropdown-btn.open { border-color:#C8A84B; color:#C8A84B; }
    .custom-dropdown-btn.open svg { transform:rotate(180deg); }
    .custom-dropdown-menu {
      display:none; position:absolute; top:calc(100% + 6px); left:0;
      background:#fff; border:1px solid #C8A84B; border-radius:6px;
      overflow:hidden; z-index:9999; min-width:130px;
      box-shadow:0 4px 16px rgba(0,0,0,0.1);
    }
    .custom-dropdown-menu.open { display:block; }
    .custom-dropdown-item {
      display:block; padding:10px 16px;
      font-family:'Noto Serif KR',serif; font-size:13px;
      color:#333; text-decoration:none; letter-spacing:1px;
      transition:background 0.15s, color 0.15s;
    }
    .custom-dropdown-item:hover { background:#fdf6e3; color:#C8A84B; }
    .search-suggest {
      display:none; position:absolute; top:calc(100% + 4px); left:0; right:0;
      background:#fff; border:1px solid #C8A84B; border-radius:4px;
      z-index:9999; box-shadow:0 4px 16px rgba(0,0,0,0.1); max-height:260px; overflow-y:auto;
    }
    .search-suggest.open { display:block; }
    .search-suggest-item {
      padding:10px 16px; font-family:'Noto Sans KR',sans-serif; font-size:13px;
      color:#333; cursor:pointer; transition:background 0.15s;
    }
    .search-suggest-item:hover, .search-suggest-item.active { background:#fdf6e3; color:#C8A84B; }
    .mobile-menu-close {
      position:absolute; top:16px; right:20px;
      background:none; border:none; color:#fff;
      font-size:28px; cursor:pointer; line-height:1;
      padding:4px 8px;
    }

    /* ── Shimmer 공통 ── */
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
    /* 탑바용 shimmer (어두운 배경) */
    .shimmer-bar {
      display: inline-block;
      border-radius: 4px;
      background: linear-gradient(90deg, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.08) 75%);
      background-size: 800px 100%;
      animation: shimmer 1.4s infinite;
      vertical-align: middle;
      width: 56px; height: 13px;
    }
    /* 금시세 카드용 shimmer (밝은 배경) */
    .shimmer-card-line {
      display: block;
      border-radius: 4px;
      background: linear-gradient(90deg, #ede8da 25%, #f5f0e6 50%, #ede8da 75%);
      background-size: 800px 100%;
      animation: shimmer 1.4s infinite;
    }
    .shimmer-card-lg { width: 75%; height: 28px; }
  `;
  document.head.appendChild(style);

  const page = location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    return page === href ? ' active' : '';
  }

  /* ── 검색 리다이렉트 공용 함수 ── */
  function goSearch(keyword) {
    const trimmed = (keyword || '').trim();
    if (!trimmed) {
      location.href = '/pages/coins.html';
      return;
    }
    location.href = '/pages/coins.html?q=' + encodeURIComponent(trimmed);
  }

  /* ── Top Bar ── */
  const topBar = document.getElementById('nav-topbar');
  if (topBar) {
    topBar.innerHTML = `
      <div class="top-bar-inner">
        <div class="top-bar-prices">
          <span class="price-item">금 <span class="price-val gold" id="tb-gold"><span class="shimmer-bar"></span></span></span>
          <span class="price-item">은 <span class="price-val silver" id="tb-silver"><span class="shimmer-bar"></span></span></span>
          <span class="price-item">백금 <span class="price-val platinum" id="tb-platinum"><span class="shimmer-bar"></span></span></span>
          <span class="price-item">환율 <span class="price-val" id="tb-rate" style="color:#a0c4ff;"><span class="shimmer-bar"></span></span></span>
        </div>
      </div>`;
  }

  /* ── Header ── */
  const header = document.getElementById('nav-header');
  if (header) {
    header.className = 'header';
    header.innerHTML = `
      <div class="header-inner">
        <a href="/index.html" class="logo-wrap">
          <svg class="logo-symbol" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="petal1" cx="50%" cy="20%" r="70%"><stop offset="0%" stop-color="#F5E090"/><stop offset="50%" stop-color="#C8A84B"/><stop offset="100%" stop-color="#7A5C10" stop-opacity="0.7"/></radialGradient>
              <radialGradient id="petal2" cx="80%" cy="20%" r="70%"><stop offset="0%" stop-color="#F5E090"/><stop offset="50%" stop-color="#C8A84B"/><stop offset="100%" stop-color="#7A5C10" stop-opacity="0.7"/></radialGradient>
              <radialGradient id="petal3" cx="80%" cy="80%" r="70%"><stop offset="0%" stop-color="#F5E090"/><stop offset="50%" stop-color="#C8A84B"/><stop offset="100%" stop-color="#7A5C10" stop-opacity="0.7"/></radialGradient>
              <radialGradient id="petal4" cx="50%" cy="80%" r="70%"><stop offset="0%" stop-color="#F5E090"/><stop offset="50%" stop-color="#C8A84B"/><stop offset="100%" stop-color="#7A5C10" stop-opacity="0.7"/></radialGradient>
              <radialGradient id="petal5" cx="20%" cy="80%" r="70%"><stop offset="0%" stop-color="#F5E090"/><stop offset="50%" stop-color="#C8A84B"/><stop offset="100%" stop-color="#7A5C10" stop-opacity="0.7"/></radialGradient>
              <radialGradient id="petal6" cx="20%" cy="20%" r="70%"><stop offset="0%" stop-color="#F5E090"/><stop offset="50%" stop-color="#C8A84B"/><stop offset="100%" stop-color="#7A5C10" stop-opacity="0.7"/></radialGradient>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#FFFDE0"/><stop offset="60%" stop-color="#F5E090"/><stop offset="100%" stop-color="#C8A84B"/></radialGradient>
            </defs>
            <ellipse cx="27" cy="16" rx="9" ry="15" fill="url(#petal1)" opacity="0.85" transform="rotate(0 27 27)"/>
            <ellipse cx="27" cy="16" rx="9" ry="15" fill="url(#petal2)" opacity="0.85" transform="rotate(60 27 27)"/>
            <ellipse cx="27" cy="16" rx="9" ry="15" fill="url(#petal3)" opacity="0.85" transform="rotate(120 27 27)"/>
            <ellipse cx="27" cy="16" rx="9" ry="15" fill="url(#petal4)" opacity="0.85" transform="rotate(180 27 27)"/>
            <ellipse cx="27" cy="16" rx="9" ry="15" fill="url(#petal5)" opacity="0.85" transform="rotate(240 27 27)"/>
            <ellipse cx="27" cy="16" rx="9" ry="15" fill="url(#petal6)" opacity="0.85" transform="rotate(300 27 27)"/>
            <circle cx="27" cy="27" r="8" fill="url(#centerGlow)"/>
            <circle cx="27" cy="27" r="8" fill="none" stroke="#C8A84B" stroke-width="0.8" opacity="0.6"/>
          </svg>
          <div class="logo-text-block">
            <span class="logo-brand">OneTroy Bullion</span>
          </div>
        </a>
        <div class="header-search">
          <div class="search-category custom-dropdown" id="custom-dropdown">
            <button class="custom-dropdown-btn" id="dropdown-btn" type="button">
              전체
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <div class="custom-dropdown-menu" id="dropdown-menu">
              <a class="custom-dropdown-item" href="/pages/coins.html">금화 보기</a>
              <a class="custom-dropdown-item" href="/pages/gold-price.html">실시간 시세</a>
              <a class="custom-dropdown-item" href="/pages/coins.html?brand=1">브랜드별</a>
              <a class="custom-dropdown-item" href="/pages/coins.html?instock">IN STOCK</a>
              <a class="custom-dropdown-item" href="/pages/contact.html">구매 문의</a>
            </div>
          </div>
          <input type="text" placeholder="금화 검색" class="search-input" autocomplete="off">
          <div class="search-suggest" id="search-suggest"></div>
          <button class="search-btn">검색</button>
        </div>
        <div class="header-icons">
          <button class="icon-btn auth-btn auth-btn-pending" id="auth-btn" aria-label="로그인">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span class="auth-btn-label">로그인</span>
          </button>
          <!-- 장바구니 아이콘: 사용자 결정으로 장바구니 사이드바 기능 자체를
               제거하면서 함께 삭제함. 상품별 구매는 coin-detail.html의
               단일 "구매 문의하기"(카카오톡 연결) 버튼으로 통일됨. -->
          <button class="hamburger" id="hamburger"><span></span><span></span><span></span></button>
        </div>
      </div>`;

    /* ── 드롭다운 이벤트 ── */
    const btn = document.getElementById('dropdown-btn');
    const menu = document.getElementById('dropdown-menu');
    if (btn && menu) {
      let isOpen = false;
      let justToggled = false;

      function openDropdown() {
        isOpen = !isOpen;
        btn.classList.toggle('open', isOpen);
        menu.classList.toggle('open', isOpen);
      }

      function closeDropdown() {
        isOpen = false;
        btn.classList.remove('open');
        menu.classList.remove('open');
      }

      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        openDropdown();
      });

      btn.addEventListener('touchend', function(e) {
        e.preventDefault();
        justToggled = true;
        openDropdown();
        setTimeout(() => { justToggled = false; }, 0);
      });

      document.addEventListener('click', function(e) {
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
          closeDropdown();
        }
      });

      document.addEventListener('touchend', function(e) {
        if (justToggled) return;
        if (!btn.contains(e.target) && !menu.contains(e.target)) {
          closeDropdown();
        }
      });
    }

    /* ── 검색창 이벤트 (데스크탑) ── */
    const searchInput = header.querySelector('.search-input');
    const searchBtn = header.querySelector('.search-btn');
    const suggestBox = document.getElementById('search-suggest');

    // 검색 자동완성용 코인명 목록.
    // coin-data.js가 로드된 페이지는 IMAGE_MAP에서 자동 추출한 최신
    // 목록을 쓴다 — 상품 추가/삭제 시 coin-data.js의 IMAGE_MAP만 고치면
    // 검색 자동완성도 자동 동기화된다. coin-data.js를 로드하는 페이지는
    // index.html을 포함해 coins.html/coin-detail.html/정적 coin-*.html
    // 전부다 (2026-06-25부터 — 이전에는 index.html이 빠져 있어 수동
    // 동기화가 필요했으나, IMAGE_MAP만 분리한 coin-data.js를 만들어
    // index.html에도 추가함으로써 해소함. 자세한 배경은 coin-data.js
    // 상단 주석 참고).
    // 아래 FALLBACK_COIN_NAMES는 coin-data.js 자체가 로드되지 않는
    // 페이지(mypage/contact/gold-price 등)나, 스크립트 로드 실패 등
    // 예외 상황을 위한 최후 안전장치다. coin-data.js는 nav.js보다 늦게
    // <script> 태그로 로드되므로, 호출 시점(입력 이벤트 발생 시)에
    // window.getCoinNamesForSearch 존재 여부를 매번 확인해 지연 평가한다.
    const FALLBACK_COIN_NAMES = [
      '버팔로', '메이플리프', '브리타니아', '캥거루', '아메리칸이글', '필하모닉',
      '크루거랜드', '판다', '성조지', '퀸즈라이언', '라이언이글',
      '말띠', '네스호', '스완', '체코라이언', '아웃백',
      '케이브라이언', '로얄드래곤', '브리티시라이언', '레이디저스티스'
    ];
    function getCoinNames() {
      if (typeof window.getCoinNamesForSearch === 'function') {
        try {
          const names = window.getCoinNamesForSearch();
          if (Array.isArray(names) && names.length) return names;
        } catch (e) { /* fall through to fallback */ }
      }
      return FALLBACK_COIN_NAMES;
    }

    let activeIdx = -1;

    function showSuggest(val) {
      if (!suggestBox) return;
      const trimmed = val.trim();
      if (!trimmed) { hideSuggest(); return; }
      const matched = getCoinNames().filter(n => n.includes(trimmed));
      if (!matched.length) { hideSuggest(); return; }
      activeIdx = -1;
      suggestBox.innerHTML = matched.map(n =>
        `<div class="search-suggest-item" data-name="${n}">${n}</div>`
      ).join('');
      suggestBox.classList.add('open');
      suggestBox.querySelectorAll('.search-suggest-item').forEach(item => {
        item.addEventListener('mousedown', function(e) {
          e.preventDefault();
          goSearch(this.dataset.name);
          hideSuggest();
        });
      });
    }

    function hideSuggest() {
      if (!suggestBox) return;
      suggestBox.classList.remove('open');
      suggestBox.innerHTML = '';
      activeIdx = -1;
    }

    if (searchInput && searchBtn) {
      searchInput.addEventListener('input', function() {
        showSuggest(this.value);
      });

      searchInput.addEventListener('keydown', function(e) {
        const items = suggestBox ? suggestBox.querySelectorAll('.search-suggest-item') : [];
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeIdx = Math.min(activeIdx + 1, items.length - 1);
          items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeIdx = Math.max(activeIdx - 1, -1);
          items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
        } else if (e.key === 'Enter') {
          if (activeIdx >= 0 && items[activeIdx]) {
            goSearch(items[activeIdx].dataset.name);
            hideSuggest();
          } else {
            goSearch(this.value);
          }
        } else if (e.key === 'Escape') {
          hideSuggest();
        }
      });

      searchInput.addEventListener('blur', function() {
        setTimeout(hideSuggest, 150);
      });

      searchBtn.addEventListener('click', function() {
        goSearch(searchInput.value);
      });

      document.addEventListener('click', function(e) {
        if (suggestBox && !searchInput.contains(e.target) && !suggestBox.contains(e.target)) {
          hideSuggest();
        }
      });
    }
  }

  /* ── Main Nav ── */
  const nav = document.getElementById('nav-main');
  if (nav) {
    nav.className = 'main-nav';
    nav.innerHTML = `
      <div class="nav-inner">
        <ul class="nav-list">
          <li class="nav-item"><a href="/pages/coins.html" class="nav-link${isActive('coins.html')}">금화 보기</a></li>
          <li class="nav-item"><a href="/pages/gold-price.html" class="nav-link${isActive('gold-price.html')}">실시간 시세</a></li>
          <li class="nav-item"><a href="/pages/coins.html?brand=1" class="nav-link${isActive('coins.html?brand=1')}">브랜드별</a></li>
          <li class="nav-item"><a href="/pages/coins.html?instock" class="nav-link${isActive('coins.html?instock')}">IN STOCK</a></li>
          <li class="nav-item"><a href="/pages/contact.html" class="nav-link${isActive('contact.html')}">구매 문의</a></li>
          <li class="nav-item"><a href="/pages/faq.html" class="nav-link${isActive('faq.html')}">FAQ</a></li>
          <li class="nav-item"><a href="/pages/about.html" class="nav-link${isActive('about.html')}">브랜드 소개</a></li>
        </ul>
      </div>`;
  }

  /* ── Mobile Menu ── */
  const mobile = document.getElementById('nav-mobile');
  if (mobile) {
    mobile.className = 'mobile-menu';
    mobile.innerHTML = `
      <button class="mobile-menu-close" id="mobile-menu-close">✕</button>
      <ul>
        <li><a href="/pages/coins.html">금화 보기</a></li>
        <li><a href="/pages/gold-price.html">실시간 시세</a></li>
        <li><a href="/pages/coins.html?brand=1">브랜드별</a></li>
        <li><a href="/pages/coins.html?instock">IN STOCK</a></li>
        <li><a href="/pages/contact.html">구매 문의</a></li>
        <li><a href="/pages/faq.html">FAQ</a></li>
        <li><a href="/pages/about.html">브랜드 소개</a></li>
        <li><a href="#" id="mobile-auth-link" class="auth-btn-pending">로그인</a></li>
      </ul>`;
  }

  /* ── 햄버거 이벤트 ── */
  function bindHamburger() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('nav-mobile');
    const closeBtn = document.getElementById('mobile-menu-close');

    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openMenu);
    hamburger.addEventListener('touchend', function(e) {
      e.preventDefault();
      openMenu();
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
      closeBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        closeMenu();
      });
    }

    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindHamburger);
  } else {
    bindHamburger();
  }

})();

// ===== 탑바 시세 업데이트 (모든 페이지 공통) =====
(function () {
  const SHEET_ID = '1gMqKhtWwTAizoBGlrGDpm6sl5c6vmbotGzg3qXl16-w';
  const CACHE_KEY = 'onetroy_price_cache';
  const CACHE_TTL = 30000; // 30초 (setInterval 주기와 동일)

  function applyPrices(goldPrice, silverPrice, platPrice, exchangeRate) {
    if (goldPrice)    document.getElementById('tb-gold').textContent     = `$${Number(goldPrice).toFixed(2)}`;
    if (silverPrice)  document.getElementById('tb-silver').textContent   = `$${Number(silverPrice).toFixed(2)}`;
    if (platPrice)    document.getElementById('tb-platinum').textContent = `$${Number(platPrice).toFixed(2)}`;
    if (exchangeRate) document.getElementById('tb-rate').textContent     = `${Number(exchangeRate).toLocaleString()}원`;

    const goldVal   = document.getElementById('gold-val');
    const silverVal = document.getElementById('silver-val');
    const rateVal   = document.getElementById('rate-val');
    if (goldVal   && goldPrice)    goldVal.textContent   = `$${Number(goldPrice).toFixed(2)}`;
    if (silverVal && silverPrice)  silverVal.textContent = `$${Number(silverPrice).toFixed(2)}`;
    if (rateVal   && exchangeRate) rateVal.textContent   = `${Number(exchangeRate).toLocaleString()}`;

    if (goldPrice && exchangeRate && typeof updateCardPricesFromSheet === 'function') {
      updateCardPricesFromSheet(goldPrice * exchangeRate);
    }
  }

  async function updateNavPrices() {
    try {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=계산`;
      const res = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(
        text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*?)\);/)[1]
      );
      const row = json.table.rows[0].c;

      const goldPrice    = row[0]?.v;
      const silverPrice  = row[1]?.v;
      const platPrice    = row[2]?.v;
      const exchangeRate = row[4]?.v;

      // 캐시 저장
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
          goldPrice, silverPrice, platPrice, exchangeRate, ts: Date.now()
        }));
      } catch (_) {}

      applyPrices(goldPrice, silverPrice, platPrice, exchangeRate);

    } catch (e) {
      console.error('시세 연동 오류:', e);
    }
  }

  // 캐시가 있으면 즉시 표시 (딜레이 없음)
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
    if (cached && (Date.now() - cached.ts) < CACHE_TTL) {
      applyPrices(cached.goldPrice, cached.silverPrice, cached.platPrice, cached.exchangeRate);
    }
  } catch (_) {}

  // 300ms 딜레이 제거 — 즉시 fetch 후 30초마다 갱신
  updateNavPrices();
  setInterval(updateNavPrices, 30000);
})();

// ===== 로그인 / 회원가입 모달 + 인증 상태 토글 =====
(function () {

  /* ── 모달 DOM 생성 (최초 1회) ── */
  function ensureAuthModal() {
    if (document.getElementById('auth-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'auth-modal-overlay';
    overlay.className = 'auth-modal-overlay';
    overlay.innerHTML = `
      <div class="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
        <button class="auth-modal-close" id="auth-modal-close" aria-label="닫기">✕</button>
        <div class="auth-tabs">
          <button class="auth-tab active" id="auth-tab-signin" type="button">로그인</button>
          <button class="auth-tab" id="auth-tab-signup" type="button">회원가입</button>
        </div>
        <h2 id="auth-modal-title" class="auth-modal-title">ONETROY BULLION 로그인</h2>
        <form id="auth-form" class="auth-form" novalidate>
          <label class="auth-field">
            <span>이메일</span>
            <input type="email" id="auth-email" autocomplete="email" required placeholder="example@email.com">
          </label>
          <label class="auth-field">
            <span>비밀번호</span>
            <input type="password" id="auth-password" autocomplete="current-password" required placeholder="6자 이상 입력">
          </label>
          <label class="auth-field auth-field-confirm" id="auth-confirm-wrap" style="display:none;">
            <span>비밀번호 확인</span>
            <input type="password" id="auth-password-confirm" autocomplete="new-password" placeholder="비밀번호를 한 번 더 입력">
          </label>
          <label class="auth-agree" id="auth-agree-wrap" style="display:none;">
            <input type="checkbox" id="auth-agree-checkbox">
            <span><a href="/pages/terms.html" target="_blank" rel="noopener">이용약관</a> 및
              <a href="/pages/privacy.html" target="_blank" rel="noopener">개인정보처리방침</a>에
              동의합니다. (필수)</span>
          </label>
          <div class="auth-error" id="auth-error" role="alert"></div>
          <button type="submit" class="auth-submit-btn" id="auth-submit-btn">로그인</button>
        </form>
      </div>`;
    document.body.appendChild(overlay);

    /* ── 엘리먼트 참조 ── */
    const form = overlay.querySelector('#auth-form');
    const emailInput = overlay.querySelector('#auth-email');
    const passwordInput = overlay.querySelector('#auth-password');
    const confirmWrap = overlay.querySelector('#auth-confirm-wrap');
    const confirmInput = overlay.querySelector('#auth-password-confirm');
    const agreeWrap = overlay.querySelector('#auth-agree-wrap');
    const agreeCheckbox = overlay.querySelector('#auth-agree-checkbox');
    /* 약관/방침 링크 클릭이 label 클릭 전파로 체크박스를 같이 토글시키는
       부작용 방지 (링크 클릭 ≠ 동의로 취급되지 않도록) */
    agreeWrap.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function (e) { e.stopPropagation(); });
    });
    const errorBox = overlay.querySelector('#auth-error');
    const submitBtn = overlay.querySelector('#auth-submit-btn');
    const title = overlay.querySelector('#auth-modal-title');
    const tabSignin = overlay.querySelector('#auth-tab-signin');
    const tabSignup = overlay.querySelector('#auth-tab-signup');
    const closeBtn = overlay.querySelector('#auth-modal-close');

    let mode = 'signin'; // 'signin' | 'signup'

    function clearError() {
      errorBox.textContent = '';
      errorBox.classList.remove('show');
    }

    function showError(message) {
      errorBox.textContent = message;
      errorBox.classList.add('show');
    }

    function setMode(newMode) {
      mode = newMode;
      clearError();
      form.reset();
      if (mode === 'signup') {
        tabSignup.classList.add('active');
        tabSignin.classList.remove('active');
        title.textContent = 'ONETROY BULLION 회원가입';
        passwordInput.autocomplete = 'new-password';
        confirmWrap.style.display = 'flex';
        agreeWrap.style.display = 'flex';
        submitBtn.textContent = '회원가입';
      } else {
        tabSignin.classList.add('active');
        tabSignup.classList.remove('active');
        title.textContent = 'ONETROY BULLION 로그인';
        passwordInput.autocomplete = 'current-password';
        confirmWrap.style.display = 'none';
        agreeWrap.style.display = 'none';
        submitBtn.textContent = '로그인';
      }
    }

    tabSignin.addEventListener('click', () => setMode('signin'));
    tabSignup.addEventListener('click', () => setMode('signup'));

    function closeModal() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      clearError();
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });

    /* ── Firebase Auth 에러 코드 → 한국어 메시지 ── */
    function translateAuthError(err) {
      const code = err && err.code;
      switch (code) {
        case 'auth/invalid-email':
          return '올바른 이메일 형식이 아닙니다.';
        case 'auth/missing-password':
          return '비밀번호를 입력해 주세요.';
        case 'auth/weak-password':
          return '비밀번호는 6자 이상이어야 합니다.';
        case 'auth/email-already-in-use':
          return '이미 가입된 이메일입니다. 로그인을 이용해 주세요.';
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          return '이메일 또는 비밀번호가 일치하지 않습니다.';
        case 'auth/too-many-requests':
          return '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해 주세요.';
        case 'auth/network-request-failed':
          return '네트워크 연결을 확인해 주세요.';
        default:
          return '처리 중 문제가 발생했습니다. 다시 시도해 주세요.';
      }
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      clearError();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!window.bullionAuth) {
        showError('인증 모듈을 불러오지 못했습니다. 페이지를 새로고침해 주세요.');
        return;
      }

      if (mode === 'signup') {
        const confirm = confirmInput.value;
        if (password.length < 6) {
          showError('비밀번호는 6자 이상이어야 합니다.');
          return;
        }
        if (password !== confirm) {
          showError('비밀번호가 일치하지 않습니다.');
          return;
        }
        if (!agreeCheckbox.checked) {
          showError('이용약관 및 개인정보처리방침에 동의해 주세요.');
          return;
        }
      }

      submitBtn.disabled = true;
      submitBtn.classList.add('loading');

      try {
        if (mode === 'signup') {
          await window.bullionAuth.signUp(email, password);
        } else {
          await window.bullionAuth.signIn(email, password);
        }
        closeModal();
      } catch (err) {
        showError(translateAuthError(err));
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
      }
    });

    /* setMode 함수를 외부(openAuthModal)에서도 쓸 수 있게 보관 */
    overlay._setMode = setMode;
  }

  function openAuthModal(mode) {
    ensureAuthModal();
    const overlay = document.getElementById('auth-modal-overlay');
    if (overlay._setMode) overlay._setMode(mode || 'signin');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const emailInput = overlay.querySelector('#auth-email');
    setTimeout(() => emailInput && emailInput.focus(), 50);
  }

  /* 마이페이지로 이동 (이미 마이페이지에 있으면 아무 동작 안 함) */
  function goToMyPage() {
    const page = location.pathname.split('/').pop() || 'index.html';
    if (page === 'mypage.html') return;
    location.href = '/pages/mypage.html';
  }

  /* ── 헤더 / 모바일 메뉴의 로그인 버튼 상태 토글 ── */
  function updateAuthUI(user) {
    const authBtn = document.getElementById('auth-btn');
    const authBtnLabel = authBtn ? authBtn.querySelector('.auth-btn-label') : null;
    const mobileAuthLink = document.getElementById('mobile-auth-link');

    if (user) {
      if (authBtnLabel) authBtnLabel.textContent = '마이페이지';
      if (authBtn) authBtn.setAttribute('aria-label', '마이페이지');
      if (mobileAuthLink) mobileAuthLink.textContent = '마이페이지';
    } else {
      if (authBtnLabel) authBtnLabel.textContent = '로그인';
      if (authBtn) authBtn.setAttribute('aria-label', '로그인');
      if (mobileAuthLink) mobileAuthLink.textContent = '로그인';
    }

    // Firebase가 로그인 상태를 최초로 확인해 준 시점 — 깜빡임 없이 텍스트 노출
    if (authBtn) authBtn.classList.remove('auth-btn-pending');
    if (mobileAuthLink) mobileAuthLink.classList.remove('auth-btn-pending');
  }

  function bindAuthButtons() {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn && !authBtn.dataset.bound) {
      authBtn.dataset.bound = '1';
      authBtn.addEventListener('click', function () {
        const user = window.bullionAuth && window.bullionAuth.currentUser;
        if (user) {
          goToMyPage();
        } else {
          openAuthModal('signin');
        }
      });
    }

    const mobileAuthLink = document.getElementById('mobile-auth-link');
    if (mobileAuthLink && !mobileAuthLink.dataset.bound) {
      mobileAuthLink.dataset.bound = '1';
      mobileAuthLink.addEventListener('click', function (e) {
        e.preventDefault();
        const user = window.bullionAuth && window.bullionAuth.currentUser;
        if (user) {
          goToMyPage();
        } else {
          openAuthModal('signin');
        }
      });
    }

    // 현재 로그인 상태를 즉시 반영 (다른 페이지 이동/새로고침 시에도 동기화)
    // authReady가 true일 때만 반영 — 아직 Firebase가 상태를 확인하지 않았다면
    // pending 상태(텍스트 숨김)를 유지해 "로그인 → 마이페이지" 깜빡임을 방지
    if (window.bullionAuth && window.bullionAuth.authReady) {
      updateAuthUI(window.bullionAuth.currentUser);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindAuthButtons);
  } else {
    bindAuthButtons();
  }

  // auth.js가 nav.js보다 늦게 로드되는 경우를 대비해 약간의 지연 후 한번 더 동기화
  setTimeout(bindAuthButtons, 200);

  document.addEventListener('bullion-auth-changed', function (e) {
    updateAuthUI(e.detail && e.detail.user);
  });
})();
