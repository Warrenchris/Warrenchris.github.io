import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // BVB palette: Yellow, Gold, White, near-white
    const colorOptions = [
      [0.99, 0.91, 0.0],    // #FDE900 — BVB yellow
      [0.96, 0.65, 0.14],   // #F5A623 — Gold
      [1.0, 0.93, 0.0],     // #FFED00 — Bright yellow
      [1.0, 1.0, 1.0],      // White
      [1.0, 0.72, 0.0],     // #FFB800 — Amber
      [1.0, 0.85, 0.0],     // Light gold
    ];

    for (let i = 0; i < count; i++) {
      const spread = 4;
      positions[i * 3]     = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      const c = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3]     = c[0];
      colors[i * 3 + 1] = c[1];
      colors[i * 3 + 2] = c[2];
    }
    return [positions, colors];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.025;
      ref.current.rotation.y -= delta * 0.035;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mesh2Ref = useRef<THREE.Mesh>(null!);
  const mesh3Ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3;
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = -t * 0.2;
      mesh2Ref.current.rotation.z = t * 0.3;
      mesh2Ref.current.position.y = Math.cos(t * 0.6) * 0.15;
    }
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = t * 0.5;
      mesh3Ref.current.rotation.z = t * 0.2;
      mesh3Ref.current.position.x = Math.sin(t * 0.4) * 0.1;
    }
  });

  return (
    <>
      {/* BVB Yellow octahedron */}
      <mesh ref={meshRef} position={[2, 0, -1]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#FDE900"
          emissive="#FDE900"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Gold icosahedron */}
      <mesh ref={mesh2Ref} position={[-2.5, 0.5, -0.5]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#F5A623"
          emissive="#F5A623"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Amber tetrahedron */}
      <mesh ref={mesh3Ref} position={[1.5, -1, -1.5]}>
        <tetrahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#FFED00"
          emissive="#FFED00"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Yellow lights */}
      <pointLight position={[0, 0, 2]} intensity={3} color="#FDE900" distance={5} />
      <pointLight position={[-2, 1, 1]} intensity={2} color="#F5A623" distance={5} />
      <pointLight position={[2, -1, 0]} intensity={1.5} color="#FFED00" distance={4} />
      <ambientLight intensity={0.05} />
    </>
  );
}

const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Stars count={3000} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
