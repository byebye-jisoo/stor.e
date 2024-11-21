import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Three.js 필수 요소
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, // 시야각
  window.innerWidth / window.innerHeight, // 종횡비
  1, // 카메라 시작 범위
  10000 // 카메라 끝 범위
);
camera.position.set(0, 30, 145);
const renderer = new THREE.WebGLRenderer();

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// 렌더러 크기 설정 및 HTML에 추가
const content = document.getElementById("content");
renderer.setSize(content.clientWidth, content.clientHeight);
content.appendChild(renderer.domElement);

// 렌더러를 content 요소에 추가
content.appendChild(renderer.domElement);

// content 요소 스타일 설정
content.style.position = "absolute";
content.style.left = "32.9vw";
content.style.top = "13.6vh";
content.style.width = "63.65vw";
content.style.height = "72.78vh";

// GLTFLoader 생성 및 glTF 파일 로드
const loader = new GLTFLoader();
const url = "../img/resources/modeling.glb";
loader.load(url, (gltf) => {
    scene.add(gltf.scene);

    // 모델 크기 조절 (필요한 경우)
    gltf.scene.scale.set(0.45, 0.45, 0.45);
    function animate(){
      requestAnimationFrame(animate) //1초에 60번 실행됨.

      //회전
      gltf.scene.rotation.y += 0.010;
      renderer.render(scene,camera);  
  }
    // 애니메이션 시작
    animate();
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.error(error);
  }
);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// 창 크기 조절에 따른 렌더러 및 카메라 업데이트
window.addEventListener("resize", () => {
  const contentRect = document
    .getElementById("content")
    .getBoundingClientRect();
  const width = contentRect.width;
  const height = contentRect.height;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

// export 하는 부분 추가
export function init() {
  // 초기화 로직 (기존 코드의 일부를 이동)
  const scene = new THREE.Scene();
  // ... 나머지 초기화 코드
  animate();
}
