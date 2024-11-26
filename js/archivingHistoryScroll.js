const container = document.querySelector(".workerImageContainer");

// 스크롤 이벤트 제어
container.addEventListener("wheel", (e) => {
  e.preventDefault(); // 기본 스크롤 동작 방지
  container.scrollLeft += e.deltaY * 2; // 휠로 가로 스크롤
});
