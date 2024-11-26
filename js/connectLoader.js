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
    introduceName: "송세아의 애장품",
    introduceTitle: "목도리",
    introduceDetail: `
      자취하는 대학생들의 애장품을 가구에 담아보았다.<br />
      모듈 결합 방식에 대해 설명한 후 자유롭게 가구를 채울 수 있도록 시간을 주고<br />
      그 과정을 기록하고 물건에 대한 이야기를 나눴다.<br />
    `,
    connectElements: [
      {
        image: "../img/connect/송세아/",
        text: "일본 가서 선물 받은 래번클로 목도리",
      },
      {
        image: "../img/connect/송세아/크롭1.png",
        text: "크리스마스 선물 목도리",
      },
      { image: "../img/connect/송세아/크롭2.png", text: "생일선물 목도리" },
      {
        image: "../img/connect/송세아/크롭3.png",
        text: "엄마가 춥다고 사준 목도리",
      },
      {
        image: "../img/connect/송세아/",
        text: "목도리인 척 하는 콘서트 슬로건",
      },
    ],
  },
  connect02: {
    leftImage: "../img/connect/connect02/main.jpg",
    introduceName: "김수아의 애장품",
    introduceTitle: "책, 공책",
    introduceDetail: `
      나만의 공간에 꼭 필요한 물건들.<br />
      시간이 지나도 변하지 않는 애장품들입니다.<br />
    `,
    connectElements: [
      {
        image: "../img/connect/김수아/크롭1.png",
        text: "초록색 곰인형",
      },
    ],
  },
  connect04: {
    leftImage: "../img/connect/connect02/main.jpg",
    introduceName: "정재문의 애장품",
    introduceTitle: "앨범",
    introduceDetail: `
      나만의 공간에 꼭 필요한 물건들.<br />
      시간이 지나도 변하지 않는 애장품들입니다.<br />
    `,
    connectElements: [
      { image: "../img/connect/정재문/", text: "사자 피규어" },
      { image: "../img/connect/정재문/", text: "스텔라장 앨범" },
      { image: "../img/connect/정재문/", text: "어린시절 앨범(외부)" },
      { image: "../img/connect/정재문/", text: "작품 앨범(외부)" },
      { image: "../img/connect/정재문/", text: "어린시절 앨범(내부)" },
      { image: "../img/connect/정재문/", text: "작품 앨범(내부)" },
    ],
  },
  connect06: {
    leftImage: "../img/connect/connect02/main.jpg",
    introduceName: "정병호의 애장품",
    introduceTitle: "카메라, 카라비너",
    introduceDetail: `
      나만의 공간에 꼭 필요한 물건들.<br />
      시간이 지나도 변하지 않는 애장품들입니다.<br />
    `,
    connectElements: [
      { image: "../img/connect/정병호/", text: "카메라" },
      { image: "../img/connect/정병호/", text: "카라비너" },
    ],
  },
  connect12: {
    leftImage: "../img/connect/connect02/main.jpg",
    introduceName: "신한영의 애장품",
    introduceTitle: "오디오 인터페이스",
    introduceDetail: `
      나만의 공간에 꼭 필요한 물건들.<br />
      시간이 지나도 변하지 않는 애장품들입니다.<br />
    `,
    connectElements: [
      { image: "../img/connect/신한영/", text: "헤드셋" },
      { image: "../img/connect/신한영/", text: "마이크" },
      { image: "../img/connect/신한영/", text: "오디오 인터페이스" },
    ],
  },
};
