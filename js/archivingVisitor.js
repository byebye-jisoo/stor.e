// 로컬 스토리지 키
const LOCAL_STORAGE_KEY = "guestListData";

// guestList 초기화 함수
function initializeGuestList() {
  const guestList = document.querySelector(".guestList");
  const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  // 로컬 스토리지 데이터를 렌더링
  storedData.forEach((data) => {
    const item = createGuestItem(data.dateTime, data.name, data.contents);
    guestList.appendChild(item);
  });
}

// 새로운 guestItem 생성 함수
function createGuestItem(dateTime, name, contents) {
  const newItem = document.createElement("div");
  newItem.classList.add("guestItem");

  // 줄바꿈 문자를 <br>로 변환
  const formattedContents = contents.replace(/\n/g, "<br>");

  newItem.innerHTML = `
    <div class="header">
      <small class="guestDate">${dateTime}</small>
      <p class="guestName">${name}</p>
    </div>
    <hr class="divider">
    <p class="guestContents">${formattedContents}</p>
  `;
  return newItem;
}

function formatDate(date) {
  const year = date.getFullYear(); // 연도
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (1부터 시작, 2자리)
  const day = String(date.getDate()).padStart(2, "0"); // 일 (2자리)
  const hours = String(date.getHours()).padStart(2, "0"); // 시간 (24시간제)
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분 (2자리)

  return `${year}.${month}.${day} ${hours}:${minutes}`; // 원하는 형식으로 반환
}

// 폼 제출 이벤트 처리
document
  .getElementById("visitorForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // 폼의 기본 동작 막기

    // 현재 날짜와 시간 가져오기
    const now = new Date();
    const dateTime = formatDate(now); // 날짜를 포맷

    // 입력 필드 값 가져오기
    const name = document.getElementById("name").value.trim();
    const contents = document.getElementById("contents").value.trim();

    // 입력 값이 모두 있는지 확인
    if (name && contents) {
      // 새로운 데이터 추가
      const newData = { dateTime, name, contents };

      // 기존 데이터 가져오기
      const storedData =
        JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

      // 새로운 데이터를 맨 앞에 추가
      storedData.unshift(newData);

      // 로컬 스토리지에 업데이트
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedData));

      // 화면에 렌더링
      const guestList = document.querySelector(".guestList");
      const newItem = createGuestItem(dateTime, name, contents);

      // 기존 아이템들을 뒤로 밀기
      const items = Array.from(guestList.children);
      guestList.innerHTML = ""; // 기존 아이템 초기화
      guestList.appendChild(newItem);
      items.forEach((item) => guestList.appendChild(item));

      // 입력 필드 초기화
      document.getElementById("name").value = "";
      document.getElementById("contents").value = "";
    } else {
      alert("모든 필드를 입력해주세요!");
    }
  });

// 페이지 로드 시 초기화
window.addEventListener("DOMContentLoaded", initializeGuestList);
