import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Three.js 필수 요소 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, // 시야각
  window.innerWidth / window.innerHeight, // 종횡비
  1, // 카메라 시작 범위
  10000 // 카메라 끝 범위
);
camera.position.set(0, 40, 145);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);

// 배경색을 흰색으로 설정
renderer.setClearColor(0xfafafa, 1);

document.getElementById("content").appendChild(renderer.domElement);

// OrbitControls 추가 (카메라 조작)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 이동 효과
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

// Ambient Light 추가
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 10);
scene.add(directionalLight);

// Pivot 생성
const pivot = new THREE.Object3D();
scene.add(pivot);

// GLTFLoader로 모델 로드
const loader = new GLTFLoader();
const modelURL = "../img/resources/modeling.glb";

loader.load(
  modelURL,
  (gltf) => {
    const model = gltf.scene;

    // 모델 크기 조정
    model.scale.set(0.75, 0.75, 0.75);

    // 모델의 Bounding Box 계산
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 모델 위치를 Pivot 중심으로 이동
    model.position.sub(center);

    // Pivot에 모델 추가
    pivot.add(model);

    // Pivot 자체를 화면 우측으로 이동
    pivot.position.set(35, 0, 0); // x축으로 50만큼 이동

    // Pivot을 장면에 추가
    scene.add(pivot);

    // 애니메이션 함수
    const animate = () => {
      requestAnimationFrame(animate);

      // Pivot 회전 (중심 기준 회전)
      pivot.rotation.y += 0.005;

      // 렌더링
      renderer.render(scene, camera);

      // OrbitControls 업데이트
      controls.update();
    };

    // 애니메이션 시작
    animate();
  },
  (xhr) => {
    console.log(`Model ${Math.round((xhr.loaded / xhr.total) * 100)}% loaded`);
  },
  (error) => {
    console.error("An error occurred while loading the model:", error);
  }
);

// 창 크기 변경 이벤트 처리
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 카메라 비율과 렌더러 크기 업데이트
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// DOMContentLoaded 이벤트에서 렌더러 초기화
document.addEventListener("DOMContentLoaded", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
