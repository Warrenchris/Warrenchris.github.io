import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorOptions = [
      [0, 0.83, 1],       // cyan
      [0.58, 0.2, 0.92],  // purple
      [0.93, 0.28, 0.6],  // magenta
      [1, 1, 1],           // white
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

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.03;
      ref.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.005}
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
      <mesh ref={meshRef} position={[2, 0, -1]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={mesh2Ref} position={[-2.5, 0.5, -0.5]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#9333ea"
          emissive="#9333ea"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh ref={mesh3Ref} position={[1.5, -1, -1.5]}>
        <tetrahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      <pointLight position={[0, 0, 2]} intensity={2} color="#00d4ff" distance={5} />
      <pointLight position={[-2, 1, 1]} intensity={1.5} color="#9333ea" distance={5} />
      <ambientLight intensity={0.1} />
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
