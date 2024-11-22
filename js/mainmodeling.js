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

// content 요소 스타일 설정
content.style.position = "absolute";
 content.style.left = "22vw"; //"32.9vw"
// content.style.top = "13.6vh";
content.style.width = "80vw"; //"63.65vw"
// content.style.height = "72.78vh";

// GLTFLoader 생성 및 glTF 파일 로드
const loader = new GLTFLoader();
const url = "../img/resources/modeling.glb";

// Pivot 생성
const pivot = new THREE.Object3D(); // 회전 중심을 위한 Object3D 생성
scene.add(pivot); // Pivot을 Scene에 추가

loader.load(
  url,
  (gltf) => {
    const model = gltf.scene;

    // 모델 크기 조절
    model.scale.set(0.45, 0.45, 0.45);

    // 모델의 바운딩 박스 계산
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center); // 모델의 중심 좌표 계산
    console.log("Model Center:", center);

    // 모델 중심을 (0, 0, 0)으로 이동
    model.position.sub(center);

    // Pivot에 모델 추가
    pivot.add(model);

    // 애니메이션 함수
    function animate() {
      requestAnimationFrame(animate);

      // Pivot을 기준으로 회전
      pivot.rotation.y += 0.01;

      // OrbitControls 업데이트
      controls.update();

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

// Ambient Light 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(1, 1, 10);
scene.add(directionalLight);

// DOMContentLoaded에서 content 크기 다시 읽기
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

// OrbitControls 추가
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 이동을 위한 감쇠 효과
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

