"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw, Sparkles, Upload } from "lucide-react";

interface ThreePOPViewerProps {
  materialType?: string;
  hasUVVarnish?: boolean;
}

export function ThreePOPViewer({
  materialType = "carton-4mm",
  hasUVVarnish = true,
}: ThreePOPViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [textureTheme, setTextureTheme] = useState<"kraft" | "blanco" | "negro" | "acrilico">(
    materialType.includes("acrilico") ? "acrilico" : "kraft"
  );
  const [brandName, setBrandName] = useState("IMPRESOS AMERICANA");
  const [customLogoImg, setCustomLogoImg] = useState<HTMLImageElement | null>(null);
  const [showLogoInput, setShowLogoInput] = useState(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (materialType.includes("acrilico")) {
      setTextureTheme("acrilico");
    } else if (materialType.includes("mdf")) {
      setTextureTheme("kraft");
    }
  }, [materialType]);

  const handleCustomLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setCustomLogoImg(img);
        setBrandName(file.name.replace(/\.[^/.]+$/, "").slice(0, 18));
      };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 360;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 2.2, 3.8);
    camera.lookAt(0, 0.6, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(4, 6, 4);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    // Red ambient accent light matching Americana Action Red
    const redLight = new THREE.PointLight(0xe30613, 3, 8);
    redLight.position.set(-2.5, 2, -1);
    scene.add(redLight);

    const fillLight = new THREE.DirectionalLight(0xdde3ea, 0.8);
    fillLight.position.set(-3, 2, -3);
    scene.add(fillLight);

    // Floor shadow receiver
    const floorGeo = new THREE.PlaneGeometry(10, 10);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.55;
    floor.receiveShadow = true;
    scene.add(floor);

    // Display Root Group
    const popGroup = new THREE.Group();
    groupRef.current = popGroup;
    scene.add(popGroup);

    // Materials based on theme
    let bodyColor = 0xc29b6c; // Kraft natural
    let roughness = 0.85;
    let metalness = 0.05;
    let opacity = 1.0;
    let transparent = false;

    if (textureTheme === "blanco") {
      bodyColor = 0xeeeeee;
      roughness = 0.6;
    } else if (textureTheme === "negro") {
      bodyColor = 0x222228;
      roughness = 0.5;
    } else if (textureTheme === "acrilico") {
      bodyColor = 0xf0f5ff;
      roughness = 0.1;
      metalness = 0.1;
      opacity = 0.65;
      transparent = true;
    }

    const bodyMat = new THREE.MeshStandardMaterial({
      color: bodyColor,
      roughness: hasUVVarnish ? Math.max(0.2, roughness - 0.35) : roughness,
      metalness: metalness,
      transparent: transparent,
      opacity: opacity,
    });

    const redMat = new THREE.MeshStandardMaterial({
      color: 0xe30613,
      roughness: 0.3,
      metalness: 0.1,
    });

    const darkBaseMat = new THREE.MeshStandardMaterial({
      color: 0x181820,
      roughness: 0.6,
    });

    // 1. Back Wall
    const backGeo = new THREE.BoxGeometry(1.2, 2.2, 0.05);
    const backMesh = new THREE.Mesh(backGeo, bodyMat);
    backMesh.position.set(0, 0.65, -0.45);
    backMesh.castShadow = true;
    backMesh.receiveShadow = true;
    popGroup.add(backMesh);

    // 2. Left Side Panel with angled 60-degree corner
    const leftGeo = new THREE.BoxGeometry(0.04, 2.0, 0.9);
    const leftMesh = new THREE.Mesh(leftGeo, redMat);
    leftMesh.position.set(-0.6, 0.55, 0);
    leftMesh.castShadow = true;
    leftMesh.receiveShadow = true;
    popGroup.add(leftMesh);

    // 3. Right Side Panel
    const rightGeo = new THREE.BoxGeometry(0.04, 2.0, 0.9);
    const rightMesh = new THREE.Mesh(rightGeo, redMat);
    rightMesh.position.set(0.6, 0.55, 0);
    rightMesh.castShadow = true;
    rightMesh.receiveShadow = true;
    popGroup.add(rightMesh);

    // 4. Shelves (3 tiers)
    const shelfGeo = new THREE.BoxGeometry(1.16, 0.04, 0.82);
    const shelfPositions = [0.1, 0.6, 1.1];

    shelfPositions.forEach((yPos) => {
      const shelf = new THREE.Mesh(shelfGeo, bodyMat);
      shelf.position.set(0, yPos, 0);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      popGroup.add(shelf);

      // Shelf front red bumper lip
      const lipGeo = new THREE.BoxGeometry(1.18, 0.06, 0.03);
      const lip = new THREE.Mesh(lipGeo, redMat);
      lip.position.set(0, yPos + 0.02, 0.41);
      lip.castShadow = true;
      popGroup.add(lip);

      // Representative retail products on shelves
      for (let p = -0.4; p <= 0.4; p += 0.26) {
        const prodGeo = new THREE.BoxGeometry(0.14, 0.28, 0.14);
        const prodMat = new THREE.MeshStandardMaterial({
          color: Math.abs(p) < 0.1 ? 0xffffff : 0x121212,
          roughness: 0.3,
        });
        const prod = new THREE.Mesh(prodGeo, prodMat);
        prod.position.set(p, yPos + 0.16, 0.15);
        prod.castShadow = true;
        popGroup.add(prod);
      }
    });

    // 5. Header Crowner (Cabezote Superior)
    const crownerGeo = new THREE.BoxGeometry(1.3, 0.45, 0.06);
    const crownerMesh = new THREE.Mesh(crownerGeo, redMat);
    crownerMesh.position.set(0, 1.95, -0.2);
    crownerMesh.castShadow = true;
    popGroup.add(crownerMesh);

    // Dynamic Canvas Texture for Custom Brand Logo
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 512, 128);

      if (customLogoImg) {
        const h = 96;
        const aspect = customLogoImg.width / customLogoImg.height;
        const w = Math.min(460, h * aspect);
        ctx.drawImage(customLogoImg, (512 - w) / 2, (128 - h) / 2, w, h);
      } else {
        ctx.fillStyle = "#E30613";
        ctx.fillRect(16, 16, 480, 96);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px Montserrat, Arial, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(brandName.toUpperCase(), 256, 64);
      }
    }

    const badgeTexture = new THREE.CanvasTexture(canvas);
    badgeTexture.needsUpdate = true;

    // Brand badge plate on Crowner with dynamic texture
    const badgeGeo = new THREE.BoxGeometry(0.95, 0.28, 0.02);
    const badgeMat = new THREE.MeshStandardMaterial({
      map: badgeTexture,
      roughness: 0.15,
      metalness: 0.05,
    });
    const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
    badgeMesh.position.set(0, 1.95, -0.16);
    popGroup.add(badgeMesh);

    // 6. Base Kickplate (Zócalo inferior)
    const baseGeo = new THREE.BoxGeometry(1.26, 0.25, 0.92);
    const baseMesh = new THREE.Mesh(baseGeo, darkBaseMat);
    baseMesh.position.set(0, -0.42, 0.02);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    popGroup.add(baseMesh);

    // Drag to Rotate logic
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !groupRef.current) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      groupRef.current.rotation.y += deltaX * 0.01;
      groupRef.current.rotation.x = Math.max(
        -0.3,
        Math.min(0.4, groupRef.current.rotation.x + deltaY * 0.005)
      );
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support with vertical tilt
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || !groupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;

      groupRef.current.rotation.y += deltaX * 0.015;
      groupRef.current.rotation.x = Math.max(
        -0.3,
        Math.min(0.4, groupRef.current.rotation.x + deltaY * 0.005)
      );
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (isRotating && !isDragging && popGroup) {
        popGroup.rotation.y += 0.007;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 360;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      badgeTexture.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [textureTheme, isRotating, hasUVVarnish, brandName, customLogoImg]);

  return (
    <div className="relative w-full h-80 sm:h-96 rounded-xl bg-[#121216] border border-white/5 overflow-hidden flex flex-col justify-between">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Arrastra para rotar 360°"
      />

      {/* Floating 3D Control Badges */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#E30613] text-white uppercase tracking-wider flex items-center gap-1 shadow-md">
          <Sparkles className="w-3 h-3" />
          WebGL 360°
        </span>
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`p-1.5 rounded-md text-[10px] font-mono border transition-colors ${
            isRotating
              ? "bg-white/10 text-white border-white/20"
              : "bg-[#181820] text-zinc-400 border-white/10"
          }`}
          title={isRotating ? "Pausar autorrotación" : "Activar autorrotación"}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
        </button>

        {/* Live Logo Customizer Trigger */}
        <button
          onClick={() => setShowLogoInput(!showLogoInput)}
          className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#1C1C26] hover:bg-[#252535] text-zinc-200 border border-white/10 flex items-center gap-1.5 transition-colors"
        >
          <Upload className="w-3 h-3 text-[#E30613]" />
          <span>Ver Mi Logo en el 3D</span>
        </button>
      </div>

      {/* Logo Customizer Floating Dropdown */}
      {showLogoInput && (
        <div className="absolute top-12 left-3 z-30 p-3 rounded-xl bg-[#181822]/95 backdrop-blur-md border border-white/15 shadow-2xl max-w-xs w-full text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase text-[#E30613] font-bold">
              Proyectar Marca en el Cabezote 3D
            </span>
            <button
              onClick={() => setShowLogoInput(false)}
              className="text-zinc-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              value={brandName}
              onChange={(e) => {
                setBrandName(e.target.value.slice(0, 20));
                setCustomLogoImg(null);
              }}
              placeholder="Escribe tu marca..."
              className="w-full bg-[#121217] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#E30613]"
            />

            <label className="block w-full text-center py-1.5 rounded-lg border border-dashed border-white/20 hover:border-[#E30613] bg-white/5 cursor-pointer text-[10px] font-mono text-zinc-300">
              <span>Subir logo en PNG</span>
              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleCustomLogoUpload}
                className="hidden"
              />
            </label>

            {/* Quick Demo Brands */}
            <div className="flex items-center gap-1 pt-1">
              {["Americana", "Postobón", "Éxito", "EcoBrand"].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => {
                    setBrandName(b);
                    setCustomLogoImg(null);
                  }}
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 hover:bg-[#E30613] text-zinc-300 hover:text-white"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Material Texture View Switcher */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10">
          <span className="text-[10px] font-mono text-zinc-400 px-1 hidden sm:inline">
            Acabado 3D:
          </span>
          <button
            onClick={() => setTextureTheme("kraft")}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
              textureTheme === "kraft"
                ? "bg-[#C29B6C] text-black font-bold"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Kraft
          </button>
          <button
            onClick={() => setTextureTheme("blanco")}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
              textureTheme === "blanco"
                ? "bg-white text-black font-bold"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Estucado
          </button>
          <button
            onClick={() => setTextureTheme("negro")}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
              textureTheme === "negro"
                ? "bg-[#252530] text-white font-bold border border-white/20"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Dark POP
          </button>
          <button
            onClick={() => setTextureTheme("acrilico")}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-colors ${
              textureTheme === "acrilico"
                ? "bg-cyan-500/30 text-cyan-200 border border-cyan-400/50 font-bold"
                : "text-zinc-300 hover:text-white"
            }`}
          >
            Acrílico
          </button>
        </div>

        <span className="text-[10px] font-mono text-zinc-400 bg-black/80 px-2 py-1 rounded border border-white/10 hidden sm:inline-block">
          Arrastra para rotar
        </span>
      </div>
    </div>
  );
}
