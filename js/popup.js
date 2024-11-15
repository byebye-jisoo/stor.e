// 요소 선택
const redCircle = document.getElementById("redCircle");
const popup = document.getElementById("popup");
const closeButton = document.getElementById("closeButton");

// 팝업 초기 상태: 숨김
popup.style.display = "none";

// 빨간 원 클릭 시 팝업 창 열기
redCircle.addEventListener("click", () => {
  popup.style.display = "flex"; // 팝업 창을 보이도록 설정
});

// x 버튼 클릭 시 팝업 창 닫기
closeButton.addEventListener("click", () => {
  popup.style.display = "none";
});

// 팝업 창 외부 클릭 시 팝업 창 닫기
window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});
