import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Three.js 필수 요소 초기화
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, // 시야각
  window.innerWidth / window.innerHeight, // 종횡비
  1, // 카메라 시작 범위
  10000 // 카메라 끝 범위
);
camera.position.set(0, 10, 200);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);

// 배경색을 흰색으로 설정
renderer.setClearColor(0x535353, 1);

document.getElementById("content").appendChild(renderer.domElement);

// OrbitControls 추가 (카메라 조작)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 부드러운 이동 효과
controls.dampingFactor = 0.15;
controls.screenSpacePanning = false;

const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 매우 밝게 설정
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(-5, 30, 20);
scene.add(directionalLight);

const directionalLightUnder = new THREE.DirectionalLight(0xffffff, 5);
directionalLightUnder.position.set(-5, -10, 20);
scene.add(directionalLightUnder);

const dlhelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
// scene.add(dlhelper);

const dlhelper2 = new THREE.DirectionalLightHelper(directionalLightUnder, 0.5);
// scene.add(dlhelper2);

// Pivot 생성
const pivot = new THREE.Object3D();
scene.add(pivot);

// 구 생성
const geometry = new THREE.SphereGeometry(16.5, 32, 32); // 반지름 5, 세분화 32
const material = new THREE.MeshPhysicalMaterial({
    color: 0xFAEBD7,
    transmission: 0.05,
    roughness: 1.0,
    thickness: 1,
    clearcoat: 1.0,
    clearcoatRoughness: 1.0,
    subsurfaceColor: new THREE.Color(0xFAEBD7),
    blending: THREE.AdditiveBlending
});
const sphere = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.SphereGeometry(16, 32, 32);
const material2 = new THREE.MeshPhysicalMaterial({
  color: 0xFAEBD7,
  emissive: 0x555555,
  emissiveIntensity: 0.5, // 빛나는 효과를 위한 emissive 값 설정
  roughness: 1, // 거칠기를 조절하여 빛 번짐
  metalness: 0.2
});

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(scene, 1.5, 0.2, 0.85); // intensity를 높여 빛 번짐 강도 조절
composer.addPass(bloomPass);

const sphere2 = new THREE.Mesh(geometry2, material2);

scene.fog = new THREE.Fog(0x535353, 100, 1000);

// 구 위치 설정
sphere.position.set(-6, 93.3, -6); // PointLight와 같은 높이에 위치
sphere2.position.set(-6, 93.3, -6);

// 장면에 추가
pivot.add(sphere);
pivot.add(sphere2);

// Point Light 추가
const InnerpointLight = new THREE.PointLight(0xFAEBD7, 10000, 10000);
InnerpointLight.position.set(0, 0, 0); // 모델 내부에 위치
InnerpointLight.distance =32; // 빛이 영향을 미치는 최대 거리
InnerpointLight.decay = 1; // 감쇠율 (1: 선형, 2: 제곱, 다른 값: 사용자 정의)
sphere.add(InnerpointLight); // sphere에 추가하여 함께 회전

// Point Light 추가
const pointLight = new THREE.PointLight(0xFAEBD7, 1000, 1000);
pointLight.position.set(0, 0, 0); // 모델 내부에 위치
pointLight.distance = 100; // 빛이 영향을 미치는 최대 거리
pointLight.decay = 1.5; // 감쇠율 (1: 선형, 2: 제곱, 다른 값: 사용자 정의)
sphere.add(pointLight); // sphere에 추가하여 함께 회전

const plhelper = new THREE.PointLightHelper(pointLight, 1);
// scene.add(plhelper);

// GLTFLoader로 모델 로드
const loader = new GLTFLoader();
const modelURL = "../img/resources/modeling.glb";

loader.load(
  modelURL,
  (gltf) => {
    const model = gltf.scene;

    // 모델 크기 조정
    model.scale.set(1.5, 1.5, 1.5);

    // 모델의 Bounding Box 계산
    const box = new THREE.Box3().setFromObject(model);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // 모델 위치를 Pivot 중심으로 이동
    model.position.sub(center);

    // Pivot에 모델 추가
    pivot.add(model);

    // Pivot 자체를 화면 우측으로 이동
    pivot.position.set(35, -70, 0); // x축으로 50만큼 이동

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
