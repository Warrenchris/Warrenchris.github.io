import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Stars({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // New palette: #dda15e, #bc6c25, and light variations
    const colorOptions = [
      [0.87, 0.63, 0.37],    // #dda15e — Earth Yellow base
      [0.74, 0.42, 0.15],    // #bc6c25 — Tiger's Eye dark
      [0.94, 0.82, 0.69],    // #efd0b0 — Warm cream
      [1.0, 1.0, 1.0],       // White
      [0.99, 0.96, 0.94],    // Warm white
      [0.53, 0.38, 0.22],    // #886237 — Muted brown/gold
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
      {/* Earth Yellow octahedron */}
      <mesh ref={meshRef} position={[2, 0, -1]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#dda15e"
          emissive="#dda15e"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
      {/* Tiger's Eye icosahedron */}
      <mesh ref={mesh2Ref} position={[-2.5, 0.5, -0.5]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#bc6c25"
          emissive="#bc6c25"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Warm cream tetrahedron */}
      <mesh ref={mesh3Ref} position={[1.5, -1, -1.5]}>
        <tetrahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial
          color="#efd0b0"
          emissive="#efd0b0"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Accent lights */}
      <pointLight position={[0, 0, 2]} intensity={3} color="#dda15e" distance={5} />
      <pointLight position={[-2, 1, 1]} intensity={2} color="#bc6c25" distance={5} />
      <pointLight position={[2, -1, 0]} intensity={1.5} color="#efd0b0" distance={4} />
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
