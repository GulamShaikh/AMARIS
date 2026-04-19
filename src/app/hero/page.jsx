"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ================= COMPONENTS ================= */
import FeatureCards from "@/components/hero/FeatureCards";
import CTASection from "@/components/hero/CTASection";
import BenefitorsSection from "@/components/hero/BenefitorsSection";
import GetInTouchPage from "@/components/hero/Getintouch";
import FAQSection from "@/components/hero/FAQSection";
import Footer from "@/components/hero/Footer";

/* ================= EARTH ================= */

function EarthPoints() {
  const pointsRef = useRef();
  const { camera, gl } = useThree();

  const [elevMap, alphaMap] = useTexture([
    "/textures/01_earthbump1k.jpg",
    "/textures/02_earthspec1k.jpg",
  ]);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);

  const uniforms = useMemo(
    () => ({
      size: { value: 1.8 },
      elevTexture: { value: elevMap },
      alphaTexture: { value: alphaMap },
      mouseUV: { value: new THREE.Vector2(0, 0) },
    }),
    [elevMap, alphaMap],
  );

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2, 70), []);

  /* ================= SHADERS ================= */

  const vertexShader = `
    uniform float size;
    uniform sampler2D elevTexture;
    uniform vec2 mouseUV;

    varying vec2 vUv;
    varying float vVisible;

    void main() {
      vUv = uv;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

      float elv = texture2D(elevTexture, vUv).r;
      vec3 vNormal = normalMatrix * normal;

      vVisible = dot(-normalize(mvPosition.xyz), normalize(vNormal));

      mvPosition.z += 0.2 * elv;

      float dist = distance(mouseUV, vUv);
      if (dist < 0.04) {
        mvPosition.z += (0.04 - dist) * 6.0;
      }

      gl_PointSize = size;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform sampler2D alphaTexture;

    varying vec2 vUv;
    varying float vVisible;

    void main() {
      float landMask = texture2D(alphaTexture, vUv).r;
      if (landMask > 0.3) discard;

      vec3 baseColor = vec3(0.08, 0.12, 0.18);
      vec3 highlight = vec3(0.2, 0.4, 0.8);

      float visibility = clamp(vVisible * 0.5 + 0.5, 0.2, 1.0);

      vec3 finalColor = mix(baseColor, highlight, visibility * 0.6);

      float glow = pow(visibility, 3.0);
      finalColor += glow * 0.15;

      gl_FragColor = vec4(finalColor, 0.95);
    }
  `;

  useFrame(() => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.x = -0.3;
    pointsRef.current.rotation.y += 0.0025;

    const mouse = gl.domElement.__mouse || { x: 0, y: 0 };

    pointer.set(mouse.x, mouse.y);
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObject(pointsRef.current);

    if (intersects.length > 0 && intersects[0].uv) {
      uniforms.mouseUV.value.copy(intersects[0].uv);
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry} scale={0.85}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

/* ================= PAGE ================= */

export default function HomePage() {
  return (
    <>
      {/* ================= HERO ================= */}
      <section id="hero" className="relative h-screen w-full overflow-hidden">
        {/* CANVAS */}
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <color attach="background" args={["#ffffff"]} />
          <ambientLight intensity={0.3} />
          <EarthPoints />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate
            enableDamping
          />
        </Canvas>

        {/* HERO CONTENT */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-5 py-2 backdrop-blur-md shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm tracking-wide text-gray-700">
              AI-Powered Intelligence Platform
            </span>
          </div>

          <h1 className="text-7xl md:text-[120px] lg:text-[150px] font-extrabold tracking-tight leading-[0.95] text-transparent bg-clip-text bg-[linear-gradient(90deg,#0b1220,#111827,#1d4ed8,#0b1220)] [background-size:200%_100%] animate-[amarisTitle_6s_ease-in-out_infinite] drop-shadow-[0_25px_50px_rgba(0,0,0,0.2)]">
            AMARIS
          </h1>

          <p className="mt-6 max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed">
            Intelligence-first chat. Live news. Context that stays with you.
          </p>

          <div className="mt-10 h-px w-56 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          <div className="mt-6 text-xs tracking-[0.3em] text-gray-800">
            SCROLL TO EXPLORE
          </div>

          {/* KEYFRAMES */}
          {/* Style block removed for testing */}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <CTASection />

      {/* ================= FEATURES ================= */}
      <section id="features" className="bg-white">
        <FeatureCards />
      </section>

      {/* ================= BENEFITORS ================= */}
      <section id="benefitors">
        <BenefitorsSection />
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact">
        <GetInTouchPage />
      </section>

      {/* ================= FAQ ================= */}
      <section id="faqs" className="text-center">
        <FAQSection />
      </section>

      <Footer />
    </>
  );
}
