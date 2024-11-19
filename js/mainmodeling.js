import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Three.js 필수 요소
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, // 시야각
  window.innerWidth / window.innerHeight, // 종횡비
  0.1, // 카메라 시작 범위
  1000 // 카메라 끝 범위
);
camera.position.set(0, 0, 5);
const renderer = new THREE.WebGLRenderer();

// 렌더러 크기 설정
renderer.setSize(window.innerWidth, window.innerHeight);

// HTML의 .content에 렌더러 추가
const content = document.getElementById("content");
content.appendChild(renderer.domElement);

// 카메라 위치 설정
camera.position.z = 5;

// GLTFLoader 생성 및 glTF 파일 로드
const loader = new GLTFLoader();
loader.load(
  "../img/resources/modeling.glb",
  function (gltf) {
    // 로드된 모델을 장면에 추가
    scene.add(gltf.scene);

    // 렌더링 시작
    animate();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

const ambientLight = new THREE.AmbientLight(0xdddddd);
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
