// 모든 이미지 요소 선택
const images = document.querySelectorAll(".layer-image");

// 각 이미지에 이벤트 추가
images.forEach((img) => {
  const defaultSrc = img.src; // 기본 이미지 경로
  const hoverSrc = img.dataset.hover; // hover 시 사용할 경로

  // 마우스를 올렸을 때
  img.addEventListener("mouseenter", () => {
    img.src = hoverSrc;
  });

  // 마우스를 벗어났을 때
  img.addEventListener("mouseleave", () => {
    img.src = defaultSrc;
  });
});
