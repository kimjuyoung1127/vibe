'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Line, Sphere, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface VibeFlowBackgroundProps {
  waveAmplitude?: number;
  waveFrequency?: number;
  nodeCount?: number;
  lineColor?: string;
  interactionRadius?: number;
  interactionStrength?: number;
  trailLength?: number;
  speed?: number;
  nodeColor?: string;     // 추가
  trailColor?: string;    // 추가

}

const VibeFlowBackground: React.FC<VibeFlowBackgroundProps> = ({
  waveAmplitude = 0.6,
  waveFrequency = 0.25,
  nodeCount = 20,
  lineColor = '#38bdf8',
  nodeColor = '#0ea5e9',   // 기본값
  trailColor = '#3b82f6',  // 기본값
  interactionRadius = 2.0,
  interactionStrength = 0.8,
  trailLength = 100,
  speed = 0.01,
}) => {
  const { viewport, pointer } = useThree();
  const lineRef = useRef<any>(null);
  const sphereRefs = useRef<THREE.Mesh[]>([]);

  const lineResolution = Math.max(80, Math.floor(viewport.width * 20));

  // 초기 라인 포인트
  const points = useMemo(() => {
    const arr: [number, number, number][] = [];
    const half = viewport.width / 2;
    for (let i = 0; i <= lineResolution; i++) {
      const t = i / lineResolution;
      const x = -half + t * viewport.width;
      arr.push([x, 0, 0]);
    }
    return arr;
  }, [viewport.width, lineResolution]);

  // 노드 초기 위치
  const nodePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const half = viewport.width / 2;
    for (let i = 0; i < nodeCount; i++) {
      positions.push([
        Math.random() * viewport.width - half,
        Math.random() * (waveAmplitude * 2) - waveAmplitude,
        Math.random() * -5,
      ]);
    }
    return positions;
  }, [nodeCount, waveAmplitude, viewport.width]);

  // 미래지향적 네온 팔레트
  const palette = [
    new THREE.Color('#00f0ff'), // 네온 블루
    new THREE.Color('#0fffc3'), // 청록
    new THREE.Color('#8b5cf6'), // 보라
    new THREE.Color('#ff00ff'), // 핑크
    new THREE.Color('#38bdf8'), // 하늘빛
  ];

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pointerWorld = new THREE.Vector2(
      pointer.x * viewport.width / 2,
      pointer.y * viewport.height / 2
    );

    // 파동 라인 업데이트
    if (lineRef.current) {
      const pos = lineRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i];
        let y = Math.sin(x * waveFrequency + time) * waveAmplitude;
        const dist = Math.hypot(x - pointerWorld.x, y - pointerWorld.y);
        if (dist < interactionRadius) {
          const influence = (1 - dist / interactionRadius) * interactionStrength;
          y += Math.sin(time * 8 + dist * 5) * waveAmplitude * (0.5 + influence * 0.8);
        }
        pos[i + 1] = y;
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true;
      lineRef.current.geometry.computeBoundingSphere();
    }

    // 노드 업데이트
    const half = state.viewport.width / 2;
    sphereRefs.current.forEach((sphere, index) => {
      if (!sphere) return;
      const x = sphere.position.x;

      // 직선 이동 + 파동 영향
      sphere.position.y =
        Math.sin(time * 0.6 + index * 0.5) * (waveAmplitude * 0.5) +
        Math.sin(x * waveFrequency + time) * waveAmplitude * 0.5;

      sphere.position.x += speed * (viewport.width / 20);
      if (sphere.position.x > half + 3) {
        sphere.position.x = -half - 3;
        sphere.position.y = Math.random() * (waveAmplitude * 2) - waveAmplitude;
      }

      // Sphere는 Trail target 역할만 하고 보이지 않음
    });
  });

  // 시간에 따라 색상 보간 (무지개 네온)
  const getDynamicColor = (time: number) => {
    const t = (time * 0.2) % palette.length;
    const idx = Math.floor(t);
    const next = (idx + 1) % palette.length;
    const lerpT = t - idx;
    return palette[idx].clone().lerp(palette[next], lerpT);
  };

  return (
    <>
      {/* 파동 라인 */}
      <Line ref={lineRef} points={points} color={lineColor} lineWidth={2} />

      {/* 노드 + 무지개 레이저 Trail */}
      {nodePositions.map((pos, i) => (
        <Trail
          key={i}
          width={0.3}
          length={trailLength}
          color={getDynamicColor(performance.now() / 1000)} // 시간 기반 색상
          attenuation={() => 1} // 일정한 두께 → 레이저 느낌
        >
          <Sphere
            ref={(el) => {
              if (el) sphereRefs.current[i] = el;
            }}
            position={pos}
            args={[0.01, 8, 8]}   // 아주 작게
            visible={false}       // Sphere는 보이지 않음
          >
            <meshStandardMaterial transparent opacity={0} />
          </Sphere>
        </Trail>
      ))}

      {/* 조명 */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
    </>
  );
};

export default VibeFlowBackground;