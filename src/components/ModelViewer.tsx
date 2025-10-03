// src/components/ModelViewer.tsx
"use client";
import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, OrbitControls, Stage } from '@react-three/drei';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

// Simple ErrorBoundary to prevent whole page crash when 3D loader fails
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    console.error('ModelViewer error', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-96 rounded-lg bg-black/10 flex items-center justify-center text-white">Errore nel caricamento del modello</div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

function FBXModel({ url }: { url: string }) {
  const obj = useLoader(FBXLoader, url) as any;
  const sceneOrGroup = obj?.scene ?? obj;
  return <primitive object={sceneOrGroup} dispose={null} />;
}

function GLTFModel({ url }: { url: string }) {
  const gltf = useGLTF(url) as any;
  const scene = gltf?.scene ?? gltf?.scenes?.[0];
  return <primitive object={scene} dispose={null} />;
}

function ModelSwitch({ url }: { url?: string | null }) {
  if (!url) {
    return (
      <mesh>
        <boxBufferGeometry args={[1, 1, 1]} />
      </mesh>
    );
  }
  const lower = url.toLowerCase();
  if (lower.endsWith('.fbx')) return <FBXModel url={url} />;
  if (lower.endsWith('.glb') || lower.endsWith('.gltf')) return <GLTFModel url={url} />;
  // unknown format: try GLTF as a best-effort
  return <GLTFModel url={url} />;
}

export const ModelViewer = ({ modelUrl }: { modelUrl?: string | null }) => {
  return (
    <div className="w-full h-96 rounded-lg bg-black/20">
      <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <ModelSwitch url={modelUrl} />
            </Stage>
          </Suspense>
        </ErrorBoundary>
        <OrbitControls autoRotate enableZoom={false} />
      </Canvas>
    </div>
  );
};