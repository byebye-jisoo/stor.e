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

// 페이지 로드 함수
function loadPageContent() {
  // URL에서 page 쿼리 파라미터 가져오기
  const params = new URLSearchParams(window.location.search);
  const pageKey = params.get("connect");

  // 페이지 데이터 유효성 확인
  if (pageKey && pages[pageKey]) {
    const data = pages[pageKey];

    // 좌측 이미지 변경
    document.getElementById("leftImage").src = data.leftImage;

    // 소개란 텍스트 변경
    document.getElementById("introduceName").textContent = data.introduceName;
    document.getElementById("introduceTitle").textContent = data.introduceTitle;
    document.getElementById("introduceDetail").innerHTML = data.introduceDetail;

    // 그리드 레이어 생성
    const connectLargeGrid = document.querySelector(".connectLargeGrid");
    connectLargeGrid.innerHTML = data.connectElements
      .map(
        (element) => `
        <div class="connectSmallGrid">
          <div class="connectElement">
            <img src="${element.image}" class="elementImage" />
            <div class="elementText">${element.text}</div>
          </div>
        </div>
      `
      )
      .join("");
  } else {
    console.error("해당 페이지 데이터를 찾을 수 없습니다.");
  }
}

// 페이지 로드 시 자동 실행
window.onload = loadPageContent;
