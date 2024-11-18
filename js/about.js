const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
const content = document.getElementsByClassName("content");
let page = 0; // 영역 포지션 초기값
const lastPage = content.length - 1; // 마지막 페이지

window.onload = () => {
  wrap.style.top = "0vh";
};

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault(); // 기본 스크롤 이벤트 방지
    if (e.deltaY > 0) {
      page++; // 아래로 스크롤
    } else if (e.deltaY < 0) {
      page--; // 위로 스크롤
    }

    // 페이지 범위 제한
    if (page < 0) {
      page = 0;
    } else if (page > lastPage) {
      page = lastPage;
    }

    wrap.style.top = `-${page * 81.4}vh`; // 각 세션 높이만큼 이동
  },
  { passive: false }
); // 디폴트 기능 제거 - 스크롤
