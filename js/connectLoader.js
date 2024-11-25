// 페이지 데이터를 로드하여 동적으로 HTML을 생성
function loadPageContent() {
  // URL에서 pageKey 가져오기
  const params = new URLSearchParams(window.location.search);
  const pageKey = params.get("connect"); // ?connect=connect01 이런 식으로 전달받음

  // 페이지 데이터 확인
  if (pageKey && pages[pageKey]) {
    const data = pages[pageKey];

    // 좌측 이미지 설정
    const leftImage = document.getElementById("leftImage");
    if (leftImage) leftImage.src = data.leftImage;

    // 소개란 텍스트 변경
    const introduceName = document.getElementById("introduceName");
    const introduceTitle = document.getElementById("introduceTitle");
    const introduceDetail = document.getElementById("introduceDetail");

    if (introduceName && introduceTitle && introduceDetail) {
      introduceName.textContent = data.introduceName;
      introduceTitle.textContent = data.introduceTitle;
      introduceDetail.innerHTML = data.introduceDetail;
    }

    // 그리드 레이어 생성
    const connectLargeGrid = document.querySelector(".connectLargeGrid");
    if (connectLargeGrid) {
      connectLargeGrid.innerHTML = ""; // 기존 내용 초기화

      // 데이터를 2개씩 묶어서 그리드 생성
      let currentSmallGrid = ""; // 현재 그리드 HTML
      data.connectElements.forEach((element, index) => {
        // 새로운 묶음의 시작
        if (index % 2 === 0) {
          currentSmallGrid += `<div class="connectSmallGrid">`;
        }

        // 각 요소 추가
        currentSmallGrid += `
          <div class="connectElement">
            <img src="${element.image}" class="elementImage" />
            <div class="elementText">${element.text}</div>
          </div>
        `;

        // 묶음의 끝
        if (index % 2 === 1 || index === data.connectElements.length - 1) {
          currentSmallGrid += `</div>`;
          connectLargeGrid.innerHTML += currentSmallGrid;
          currentSmallGrid = ""; // 다음 묶음을 위해 초기화
        }
      });
    }
  } else {
    console.error(
      "유효하지 않은 페이지 키이거나 페이지 데이터를 찾을 수 없습니다."
    );
  }
}

// 페이지 로드 시 실행
window.onload = loadPageContent;

// 페이지 데이터 객체
const pages = {
  connect01: {
    leftImage: "../img/connect/connect01/main.jpg",
    introduceName: "김진경의 애장품",
    introduceTitle: "인형, 피규어",
    introduceDetail: `
      자취하는 대학생들의 애장품을 가구에 담아보았다.<br />
      모듈 결합 방식에 대해 설명한 후 자유롭게 가구를 채울 수 있도록 시간을 주고<br />
      그 과정을 기록하고 물건에 대한 이야기를 나눴다.<br />
    `,
    connectElements: [
      { image: "../img/connect/connect01/connect01_01.jpg", text: "인형1" },
      { image: "../img/connect/connect01/connect01_02.jpg", text: "인형2" },
      { image: "../img/connect/connect01/connect01_02.jpg", text: "인형3" },
    ],
  },
  connect02: {
    leftImage: "../img/connect/connect02/main.jpg",
    introduceName: "박영진의 애장품",
    introduceTitle: "책, 공책",
    introduceDetail: `
      나만의 공간에 꼭 필요한 물건들.<br />
      시간이 지나도 변하지 않는 애장품들입니다.<br />
    `,
    connectElements: [
      { image: "../img/connect/connect02/connect02_01.jpg", text: "책1" },
      { image: "../img/connect/connect02/connect02_02.jpg", text: "책2" },
    ],
  },
};
