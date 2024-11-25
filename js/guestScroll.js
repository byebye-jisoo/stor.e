// .scrolling 요소에서만 스크롤 가능
const scrollingElement = document.querySelector(".scrolling");

// 스크롤 이벤트 핸들러
scrollingElement.addEventListener("wheel", (event) => {
  event.preventDefault(); // 기본 스크롤 동작 방지
  event.stopPropagation(); // 상위로 이벤트 전파 방지

  const isScrollable =
    scrollingElement.scrollHeight > scrollingElement.clientHeight; // 스크롤 가능한지 확인

  if (isScrollable) {
    const delta = event.deltaY * 0.2; // 스크롤 강도 조절 (0.1 ~ 0.5로 설정 가능)
    scrollingElement.scrollTop += delta; // 스크롤 이동
  }
});
