/* 구매 문의 공용 스크립트
 *
 * 1) 상품 상세페이지의 "구매 문의하기"(.btn-inquiry) 클릭 시 바로 카카오톡으로 가지 않고
 *    [카카오톡 / 문자] 선택 팝업을 띄운다. (JS가 꺼져 있으면 기존 href=카카오톡 링크로 폴백)
 * 2) 문의 페이지의 "문자로 문의하기"(.sms-btn) 클릭 시 문자 앱을 연다.
 * 3) PC처럼 문자 앱이 없는 환경에서는 번호를 클립보드에 복사하고 안내한다.
 */
(function () {
  'use strict';

  var KAKAO_URL = 'https://open.kakao.com/o/sB6Gduni';
  var PHONE_RAW = '01082667773';
  var PHONE_DISPLAY = '010-8266-7773';

  function isMobile() {
    var ua = navigator.userAgent || '';
    if (/Android|iPhone|iPad|iPod/i.test(ua)) return true;
    // iPadOS는 Macintosh로 보고되므로 터치 포인트로 구분
    return /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1;
  }

  function isIOS() {
    var ua = navigator.userAgent || '';
    return /iPhone|iPad|iPod/i.test(ua) ||
      (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  }

  function buildSmsUrl(productName) {
    var text = productName
      ? '[' + productName + '] 구매 문의드립니다.'
      : '구매 문의드립니다.';
    // iOS는 & 구분자, 안드로이드는 ? 구분자
    var sep = isIOS() ? '&' : '?';
    return 'sms:' + PHONE_RAW + sep + 'body=' + encodeURIComponent(text);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('copy failed'));
      } catch (e) { reject(e); }
    });
  }

  var toastTimer = null;
  function showToast(message) {
    var el = document.getElementById('inq-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'inq-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 3500);
  }

  // 문자 문의 실행: 모바일은 문자 앱, PC는 번호 복사
  function startSms(productName) {
    if (isMobile()) {
      window.location.href = buildSmsUrl(productName);
      return;
    }
    copyText(PHONE_DISPLAY).then(function () {
      showToast('PC에서는 문자 앱을 열 수 없어 번호를 복사했어요: ' + PHONE_DISPLAY);
    }, function () {
      showToast('문의 번호: ' + PHONE_DISPLAY + ' (휴대폰 문자로 보내주세요)');
    });
  }

  /* ---------- 스타일 (팝업 + 토스트) ---------- */
  function injectStyles() {
    if (document.getElementById('inq-style')) return;
    var css = [
      '.inq-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;z-index:10000;padding:20px;}',
      '.inq-overlay.open{display:flex;}',
      '.inq-box{background:#fff;width:100%;max-width:380px;padding:28px 24px 24px;position:relative;box-sizing:border-box;font-family:"Noto Sans KR",sans-serif;box-shadow:0 12px 40px rgba(0,0,0,.25);}',
      '.inq-close{position:absolute;top:8px;right:10px;background:none;border:none;font-size:26px;line-height:1;color:#999;cursor:pointer;padding:6px 10px;}',
      '.inq-close:hover{color:#333;}',
      '.inq-title{font-size:16px;font-weight:700;color:#1a1a1a;margin:0 0 6px;}',
      '.inq-product{font-size:13px;color:#8a6d1d;margin:0 0 20px;line-height:1.5;word-break:keep-all;}',
      '.inq-actions{display:flex;flex-direction:column;gap:10px;}',
      '.inq-btn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:14px;box-sizing:border-box;font-family:"Noto Sans KR",sans-serif;font-size:14px;font-weight:700;letter-spacing:.5px;cursor:pointer;text-decoration:none;border:none;transition:opacity .2s,transform .15s;}',
      '.inq-btn:hover{opacity:.9;transform:translateY(-1px);}',
      '.inq-kakao{background:#FEE500;color:#3C1E1E;}',
      '.inq-sms{background:#fff;color:#1a1a1a;border:1px solid #C8A84B;}',
      '#inq-toast{position:fixed;left:50%;bottom:32px;transform:translateX(-50%) translateY(20px);background:rgba(26,26,26,.92);color:#fff;font-family:"Noto Sans KR",sans-serif;font-size:13px;padding:12px 18px;max-width:90vw;box-sizing:border-box;text-align:center;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;z-index:10001;line-height:1.5;}',
      '#inq-toast.show{opacity:1;transform:translateX(-50%) translateY(0);}'
    ].join('\n');
    var style = document.createElement('style');
    style.id = 'inq-style';
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- 팝업 ---------- */
  var overlay = null;
  var lastFocus = null;
  var currentProduct = '';

  function buildModal() {
    if (overlay) return;
    injectStyles();
    overlay = document.createElement('div');
    overlay.className = 'inq-overlay';
    overlay.innerHTML =
      '<div class="inq-box" role="dialog" aria-modal="true" aria-labelledby="inq-title">' +
        '<button type="button" class="inq-close" aria-label="닫기">&times;</button>' +
        '<h2 class="inq-title" id="inq-title">구매 문의</h2>' +
        '<p class="inq-product" id="inq-product"></p>' +
        '<div class="inq-actions">' +
          '<a class="inq-btn inq-kakao" id="inq-kakao" href="' + KAKAO_URL + '" target="_blank" rel="noopener noreferrer">' +
            '<svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 2C8.27 2 2 7.37 2 14c0 4.2 2.65 7.9 6.67 10.1L7.1 28.8a.6.6 0 0 0 .84.76l6.4-4.27c.54.05 1.09.08 1.66.08 7.73 0 14-5.37 14-12S23.73 2 16 2z" fill="#3C1E1E"/></svg>' +
            '카카오톡으로 문의' +
          '</a>' +
          '<button type="button" class="inq-btn inq-sms" id="inq-sms">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A84B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' +
            '문자로 문의' +
          '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('.inq-close').addEventListener('click', closeModal);
    overlay.querySelector('#inq-kakao').addEventListener('click', function () {
      closeModal(true);
    });
    overlay.querySelector('#inq-sms').addEventListener('click', function () {
      startSms(currentProduct);
      closeModal(true);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
    });
  }

  function openModal(productName) {
    buildModal();
    currentProduct = productName || '';
    var p = overlay.querySelector('#inq-product');
    p.textContent = currentProduct;
    p.style.display = currentProduct ? '' : 'none';
    lastFocus = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var first = overlay.querySelector('#inq-kakao');
    if (first) first.focus();
  }

  function closeModal(skipRestoreFocus) {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (skipRestoreFocus !== true && lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function getProductName() {
    var h = document.querySelector('.product-title');
    return h ? h.textContent.trim() : '';
  }

  /* ---------- 이벤트 위임 (상세페이지 버튼은 동적 렌더링되므로 document에서 처리) ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    var inquiry = t.closest('.btn-inquiry');
    if (inquiry) {
      e.preventDefault();
      openModal(getProductName());
      return;
    }

    var sms = t.closest('.sms-btn');
    if (sms) {
      e.preventDefault();
      startSms('');
    }
  });
})();
