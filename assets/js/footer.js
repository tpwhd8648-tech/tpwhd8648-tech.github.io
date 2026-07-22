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
          <!-- contact.html의 #contact-map 섹션이 임시 주소로 활성화됨(2026-07-22)에
               따라 앵커 링크 복원함. -->
          <li><a href="/pages/contact.html#contact-map">› 오시는 길</a></li>
          <li><a href="/pages/terms.html">› 이용약관</a></li>
          <li><a href="/pages/privacy.html">› 개인정보처리방침</a></li>
          <!-- terms.html/privacy.html: 사업자 정보 미확정 상태에서 법적
               리스크(회원가입 시 개인정보 수집 중)를 없애기 위해 임시본으로
               생성함 (2026-06-26). 사업자 등록 완료 후 실제 정보로 교체할 것.
               회사 소개 / 온라인 예약 / 거래 안내 / 귀금속 투명성 / 정품 인증 /
               자주 묻는 질문: 연결할 실제 페이지가 아직 없어 삭제함 (2026-06-21).
               각 페이지가 생기면 다시 추가. -->
        </ul>
      </div>
      <div class="footer-locations">
        <h4>오시는 길</h4>
        <div class="location-grid">
          <!-- 실제 주소·전화번호·영업시간 확정 반영 (2026-07-22), 표기 방식
               변경(2026-07-22 후속) — 정식 주소가 아직 미확정이라 종로3가역
               인근 랜드마크 건물(낙원상가, 삼일대로 428)로 표시. 사용자 요청에
               따라 화면 노출 텍스트에서 "임시"/"인근" 표현은 제거했으나, 실제
               사업장 주소는 아님 — 정식 주소 확정 시 사용자가 직접 교체 예정.
               영업시간은 매일 09:00-20:00로 확정, 카카오톡 문의는 24시간 별도
               운영(contact.html KAKAO TALK 카드 참고). -->
          <div class="location-item">
            <strong>서울 본점</strong>
            <p>서울특별시 종로구 삼일대로 428<br>010-3737-5757</p>
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
            <a href="https://open.kakao.com/o/sB6Gduni" target="_blank" rel="noopener" class="social-icon kakao" style="display:flex;align-items:center;justify-content:center;"><svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 2C8.27 2 2 7.37 2 14c0 4.2 2.65 7.9 6.67 10.1L7.1 28.8a.6.6 0 0 0 .84.76l6.4-4.27c.54.05 1.09.08 1.66.08 7.73 0 14-5.37 14-12S23.73 2 16 2z" fill="#3C1E1E"/><text x="16" y="15.8" text-anchor="middle" font-family="Arial, sans-serif" font-size="7" font-weight="900" fill="#FEE500" letter-spacing="0.3">KAKAO</text></svg></a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <!-- 사업자등록번호 확정 반영 (2026-07-22).
           현재 사업자등록증 상 실제 상호는 "골든민트"이며, "OneTroy Bullion"은
           브랜드명으로 병기 표시함 (전자상거래법상 표시 상호는 사업자등록증
           기재 상호와 일치해야 하므로 실제 상호를 먼저 명시).
           상호 변경(골든민트 → 원트로이불리온) 신고 완료 시, 아래 줄에서
           "골든민트(" 와 뒤의 ")" 를 제거해 "OneTroy Bullion"만 남길 것. -->
      <!-- 대표자명·주소·전화번호 확정 반영 (2026-07-22), 표기 방식 변경(후속).
           주소는 정식 주소 확정 전까지 종로3가역 인근 랜드마크 건물(낙원상가,
           삼일대로 428)로 표기함 — 화면 노출 텍스트에는 "임시"/"인근" 표현을
           넣지 않되, 실제 사업장 주소는 아니므로 정식 주소 확정 시 사용자가
           직접 교체 예정.
           통신판매업신고번호는 아직 신청 전이라 미기재 — 신고 완료 후
           "사업자등록번호: 898-26-02365" 뒤에 이어서 추가할 것. -->
      <p>© 2026 골든민트(OneTroy Bullion) 귀금속 전문점 | 대표: 정세종</p>
      <p>사업자등록번호: 898-26-02365 | 서울특별시 종로구 삼일대로 428 | 전화: 010-3737-5757</p>
      <p>귀금속은 투자 위험이 있습니다. 투자 전 충분한 검토를 권장합니다.</p>
    </div>
  `;
})();

// ===== 카카오 플로팅 버튼 (모든 페이지 공통) =====
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .kakao-float {
      position: fixed; right: 20px; bottom: 80px;
      width: 54px; height: 54px;
      background: #FEE500; border-radius: 50%;
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
    <svg width="46" height="46" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2C8.27 2 2 7.37 2 14c0 4.2 2.65 7.9 6.67 10.1L7.1 28.8a.6.6 0 0 0 .84.76l6.4-4.27c.54.05 1.09.08 1.66.08 7.73 0 14-5.37 14-12S23.73 2 16 2z" fill="#3C1E1E"/>
      <text x="16" y="15.8" text-anchor="middle" font-family="'Arial', sans-serif" font-size="7" font-weight="900" fill="#FEE500" letter-spacing="0.3">KAKAO</text>
    </svg>
  `;
  document.body.appendChild(link);
})();
