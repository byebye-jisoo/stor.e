const wrap = document.getElementsByClassName("wrap")[0]; // 스크롤 영역
const content = document.getElementsByClassName("content");
let page = 0; // 현재 페이지
const lastPage = content.length - 1; // 마지막 페이지
let isScrolling = false; // 스크롤 이벤트 중복 방지 플래그

window.onload = () => {
  wrap.style.top = "0vh"; // 초기 상태로 설정
};

window.addEventListener(
  "wheel",
  (e) => {
    if (isScrolling) return; // 스크롤 중복 방지
    e.preventDefault();

    isScrolling = true; // 스크롤 시작
    setTimeout(() => (isScrolling = false), 500); // 500ms 후 스크롤 가능

    if (e.deltaY > 0) {
      page++; // 아래로 스크롤
    } else if (e.deltaY < 0) {
      page--; // 위로 스크롤
    }

    // 페이지 범위 제한
    if (page < 0) page = 0;
    if (page > lastPage) page = lastPage;

    // 페이지 이동 (100%로 이동 계산)
    wrap.style.top = `-${page * 100}vh`;
  },
  { passive: false }
);
