// 현재 위치 상태를 관리할 변수
let currentPosition = 0; // 0: 좌측, 1: 중앙, 2: 우측

// 정렬 상태에 따른 justify-content 값 배열
const justifyContents = ["flex-start", "center", "flex-end"];

// barContainer DOM 요소 선택
const barContainer = document.querySelector(".barContainer");

// 스크롤 이벤트 처리 함수
function handleScroll(event) {
  // 스크롤 방향 감지 (deltaY > 0: 아래, deltaY < 0: 위)
  const scrollDown = event.deltaY > 0;

  // 위치 업데이트 (0, 1, 2로 제한)
  if (scrollDown) {
    currentPosition = Math.min(currentPosition + 1, 2); // 최대값 2
  } else {
    currentPosition = Math.max(currentPosition - 1, 0); // 최소값 0
  }

  // justify-content 값을 업데이트하여 위치 변경
  barContainer.style.justifyContent = justifyContents[currentPosition];
}

// 스크롤 이벤트 리스너 추가
window.addEventListener("wheel", handleScroll);
