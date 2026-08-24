(function () {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-col">
        <h4>카탈로그</h4>
        <ul>
          <li><a href="/pages/coins.html">› 금화</a></li>
          <!-- 금화1~4: 실제 카테고리 없는 플레이스홀더라 삭제함 (2026-06-21).
               카테고리가 늘어나면 다시 추가. -->
        </ul>
        <!-- "기타 서비스"(예정1, 예정2): 연결할 실제 페이지가 없는 플레이스홀더라
             섹션 전체 삭제함 (2026-06-21). 실제 서비스가 생기면 다시 추가. -->
      </div>
      <div class="footer-col">
        <h4>문의 사항</h4>
        <ul>
          <li><a href="/pages/mypage.html">› 내 계정</a></li>
          <!-- "고객센터": 사용자 요청으로 삭제함 (2026-06-21).
               "주문 내역": 연결할 실제 페이지가 없어 삭제함 (2026-06-21).
               주문내역 페이지가 생기면 다시 추가. -->
        </ul>
        <h4 style="margin-top:1.5rem">관련 정보</h4>
        <ul>
          <!-- 브랜드 소개 페이지 신설(2026-07-24)로 링크 추가 — "원트로이 불리온"
               한글 표기를 명시적으로 노출하는 페이지, 네이버 AI 브리핑 오정보
               대응 목적(핸드오프 참고). -->
          <li><a href="/pages/about.html">› 브랜드 소개</a></li>
          <!-- contact.html의 #contact-map 섹션이 임시 주소로 활성화됨(2026-07-22)에
               따라 앵커 링크 복원함. -->
          <li><a href="/pages/contact.html#contact-map">› 오시는 길</a></li>
          <li><a href="/pages/faq.html">› 자주 묻는 질문</a></li>
          <!-- 자주 묻는 질문: pages/faq.html 신설(2026-07-23)로 링크 복원.
               기존엔 연결할 페이지가 없어 삭제됐던 항목(2026-06-21 주석 참고). -->
          <li><a href="/pages/terms.html">› 이용약관</a></li>
          <li><a href="/pages/privacy.html">› 개인정보처리방침</a></li>
          <!-- terms.html/privacy.html: 사업자 정보 미확정 상태에서 법적
               리스크(회원가입 시 개인정보 수집 중)를 없애기 위해 임시본으로
               생성함 (2026-06-26). 사업자 등록 완료 후 실제 정보로 교체할 것.
               회사 소개 / 온라인 예약 / 거래 안내 / 귀금속 투명성 / 정품 인증:
               연결할 실제 페이지가 아직 없어 삭제함 (2026-06-21).
               각 페이지가 생기면 다시 추가. -->
        </ul>
      </div>
      <div class="footer-locations">
        <h4>오시는 길</h4>
        <div class="location-grid">
          <!-- 실제 주소·전화번호·영업시간 확정 반영 (2026-07-22), 표기 방식
               변경(2026-07-22 후속) — 정식 주소가 아직 미확정이라 종로3가역
               인근 랜드마크 건물(대림빌딩, 봉익동 136 — 사용자가 지도 앱에서
               직접 확인한 지번주소, 도로명주소는 미확인)로 표시. 사용자 요청에
               따라 화면 노출 텍스트에서 "임시"/"인근" 표현과 건물명은 넣지 않고
               주소만 표기(2026-07-30 후속: 종로 183 → 봉익동 136으로 교체) — 실제
               사업장 주소는 아님, 정식 주소 확정 시 사용자가 직접 교체 예정.
               영업시간은 매일 09:00-20:00로 확정, 카카오톡 문의는 24시간 별도
               운영(contact.html KAKAO TALK 카드 참고). -->
          <div class="location-item">
            <strong>서울 본점</strong>
            <p>서울특별시 종로구 봉익동 136<br>010-3737-5757</p>
            <p>매일 09:00 - 20:00<br>카카오톡 문의 24시간 가능</p>
          </div>
          <!-- "강남 지점": 주소/전화번호가 실제 정보인지 확정되지 않아
               삭제함 (2026-06-21). 사실 확인 후 실제 정보로 다시 추가할 것. -->
        </div>
        <p class="location-notice">원활한 서비스를 위해 방문 전 예약을 권장합니다</p>
        <div class="social-section">
          <h4>소셜 미디어</h4>
          <div class="social-icons">
            <!-- facebook/instagram/youtube/line: 실제 연결된 계정이 없는
                 죽은 아이콘이라 삭제함 (2026-06-21). 실제 계정이 생기면 다시 추가. -->
            <a href="https://open.kakao.com/o/sB6Gduni" target="_blank" rel="noopener" class="social-icon kakao" style="display:flex;align-items:center;justify-content:center;border-radius:30%;overflow:hidden;"><svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C8.27 2 2 7.37 2 14c0 4.2 2.65 7.9 6.67 10.1L7.1 28.8a.6.6 0 0 0 .84.76l6.4-4.27c.54.05 1.09.08 1.66.08 7.73 0 14-5.37 14-12S23.73 2 16 2z" fill="#3C1E1E"/><text x="16" y="16.3" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" font-weight="900" fill="#FEE500" letter-spacing="0.2">TALK</text></svg></a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <!-- 상호 표기 (2026-08-24 변경): 상호 변경(골든민트 → 원트로이불리온) 신고가
           아직 완료되지 않아 법적 표시 상호(골든민트)는 유지하되, 화면 노출 순서를
           "원트로이 불리온" 우선으로 변경 — 사용자 요청(2026-08-24). 신고 완료 시
           괄호 안 "골든민트" 표기를 제거할 것(이전과 동일한 원칙, 순서만 반전됨). -->
      <p>© 2026 원트로이 불리온(ONETROY BULLION / 등록상호: 골든민트) 귀금속 전문점</p>
      <p class="footer-legal-toggle-wrap">
        <button type="button" class="footer-legal-toggle" id="footer-legal-toggle" aria-expanded="false" aria-controls="footer-legal-details">
          사업자 정보 보기 <span class="footer-legal-arrow">▾</span>
        </button>
      </p>
      <!-- 대표자명·사업자등록번호·주소·전화번호: 아코디언으로 전환(2026-08-24,
           사용자 요청). 상호/저작권 문구만 항상 노출, 나머지는 클릭 시 펼침.
           주소는 정식 주소 확정 전까지 종로3가역 인근 랜드마크 건물(대림빌딩,
           봉익동 136 — 사용자가 지도 앱에서 직접 확인한 지번주소, 도로명주소는
           미확인)로 표기함 — 화면 노출 텍스트에는 "임시"/"인근" 표현과 건물명은
           넣지 않고 주소만 표기, 실제 사업장 주소는 아니므로 정식 주소 확정 시
           사용자가 직접 교체 예정. 통신판매업신고번호는 아직 신청 전이라 미기재
           — 신고 완료 후 "사업자등록번호: 898-26-02365" 뒤에 이어서 추가할 것. -->
      <div class="footer-legal-details" id="footer-legal-details" hidden>
        <p>대표: 정세종</p>
        <p>사업자등록번호: 898-26-02365</p>
        <p>서울특별시 종로구 봉익동 136</p>
        <p>전화: 010-3737-5757</p>
      </div>
      <p>귀금속은 투자 위험이 있습니다. 투자 전 충분한 검토를 권장합니다.</p>
    </div>
  `;

  const toggleBtn = document.getElementById('footer-legal-toggle');
  const details = document.getElementById('footer-legal-details');
  if (toggleBtn && details) {
    toggleBtn.addEventListener('click', function () {
      const isOpen = !details.hidden;
      details.hidden = isOpen;
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
      toggleBtn.classList.toggle('is-open', !isOpen);
    });
  }
})();

// ===== 카카오 플로팅 버튼 (모든 페이지 공통) =====
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .kakao-float {
      position: fixed; right: 20px; bottom: 80px;
      width: 48px; height: 48px;
      background: #FEE500; border-radius: 30%;
      display: flex; align-items: center; justify-content: center;
      z-index: 2000;
      box-shadow: 0 0 0 3px #C8A84B, 0 4px 16px rgba(0,0,0,0.25);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .kakao-float:hover {
      transform: scale(1.1);
      box-shadow: 0 0 0 3px #F5E090, 0 6px 20px rgba(0,0,0,0.3);
    }
  `;
  document.head.appendChild(style);

  const KAKAO_LINK = 'https://open.kakao.com/o/sB6Gduni';

  const link = document.createElement('a');
  link.href = KAKAO_LINK;
  link.target = '_blank';
  link.rel = 'noopener';
  link.className = 'kakao-float';
  link.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.27 2 2 7.37 2 14c0 4.2 2.65 7.9 6.67 10.1L7.1 28.8a.6.6 0 0 0 .84.76l6.4-4.27c.54.05 1.09.08 1.66.08 7.73 0 14-5.37 14-12S23.73 2 16 2z" fill="#3C1E1E"/>
      <text x="16" y="16.3" text-anchor="middle" font-family="'Arial', sans-serif" font-size="9" font-weight="900" fill="#FEE500" letter-spacing="0.2">TALK</text>
    </svg>
  `;
  document.body.appendChild(link);
})();
