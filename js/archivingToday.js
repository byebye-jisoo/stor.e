// 현재 날짜를 가져오는 함수
function setTodayDate() {
  const today = new Date(); // 현재 날짜 가져오기

  // 날짜를 "YYYY-MM-DD" 형식으로 포맷
  const formattedDate = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // writeDate 요소에 날짜 삽입
  const writeDateElement = document.querySelector(".writeDate");
  if (writeDateElement) {
    writeDateElement.textContent = formattedDate; // 날짜 텍스트 설정
  }
}

// 페이지가 로드될 때 날짜 설정
window.addEventListener("DOMContentLoaded", setTodayDate);
