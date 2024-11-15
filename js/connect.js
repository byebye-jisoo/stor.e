const sections = document.querySelectorAll(".section");
let currentSection = 0;

function scrollToSection(index) {
  sections[index].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    // 스크롤 다운
    if (currentSection < sections.length - 1) {
      currentSection++;
      scrollToSection(currentSection);
    }
  } else {
    // 스크롤 업
    if (currentSection > 0) {
      currentSection--;
      scrollToSection(currentSection);
    }
  }
});
