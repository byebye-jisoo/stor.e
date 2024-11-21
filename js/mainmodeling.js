import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
loader.load(
  url,
  (gltf) => {
    scene.add(gltf.scene);

    // 모델 크기 조절 (필요한 경우)
    gltf.scene.scale.set(0.45, 0.45, 0.45);
    gltf.scene.position.set(0, -30, 0);
    function animate() {
      requestAnimationFrame(animate); //1초에 60번 실행됨.

      // 컨트롤러 업데이터
      controls.update();

      //회전
      gltf.scene.rotation.y += 0.01;
      renderer.render(scene, camera);
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

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// DOMContentLoaded에서 content 크기 다시 읽기 (바로 뜨게 하기)
document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const width = content.clientWidth;
  const height = content.clientHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  init(); // Three.js 초기화
});

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

// orbit control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 이동을 위한 감쇠 효과
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
