const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
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
    if (isScrolling) return; // 스크롤 제한 중이면 이벤트 무시

    e.preventDefault(); // 기본 스크롤 이벤트 방지

    isScrolling = true; // 스크롤 시작
    setTimeout(() => (isScrolling = false), 500); // 700ms 후 스크롤 가능

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

    // 페이지 이동
    wrap.style.top = `-${page * 81.4}vh`; // 각 세션 높이만큼 이동
  },
  { passive: false }
);
