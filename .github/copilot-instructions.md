# AI Coding Guidelines for start-1

## Project Overview

This is a Vite-based Three.js web application for 3D graphics rendering. The project uses ES modules and focuses on creating interactive 3D scenes with a canvas-based renderer.

## Architecture

- **Entry Point**: `index.html` loads `/src/scene1.js` as the main module
- **Scene Structure**: Single scene file (`scene1.js`) contains all 3D objects, camera, renderer, and controls
- **Rendering**: WebGL renderer targets a canvas element with id "app"
- **Build Tool**: Vite handles development server, building, and preview

## Key Patterns

- **Three.js Setup**: Import `* as THREE from 'three'` and specific addons like `OrbitControls`
- **Scene Initialization**: Create scene, camera (PerspectiveCamera), renderer, and controls in sequence
- **Object Creation**: Use geometry + material + mesh pattern, e.g., `new THREE.Mesh(geometry, material)`
- **Animation Loop**: `requestAnimationFrame(update)` function handles rendering and updates
- **Responsive Design**: Update camera aspect on window resize: `camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix()`
- **Controls**: OrbitControls with `enableDamping = true` and `control.update()` in animation loop

## Developer Workflows

- **Development**: `pnpm dev` starts Vite dev server with hot reload
- **Build**: `pnpm build` creates production bundle in `dist/`
- **Preview**: `pnpm preview` serves built files locally
- **Package Manager**: Use pnpm for all dependency operations

## Code Conventions

- **Imports**: Group Three.js core imports first, then addons, then local files
- **Naming**: Use descriptive names like `cube`, `plane` for meshes; `geometry`, `material` for components
- **Positioning**: Use `position.set(x, y, z)` or `position.x = value` for object placement
- **Rotation**: Convert degrees to radians with `THREE.MathUtils.degToRad(degrees)`
- **Transparency**: Set `transparent: true` and `opacity` on materials for see-through effects

## File Structure

- `src/scene1.js`: Main 3D scene logic and rendering loop
- `src/style.css`: Basic styling with `body { overflow: hidden }` for full-screen canvas
- `index.html`: Minimal HTML with canvas element
- `public/`: Static assets served by Vite

## Dependencies

- **three**: Core 3D library (latest version)
- **vite**: Build tool and dev server
- **OrbitControls**: From `three/examples/jsm/Addons.js` for camera interaction

## Common Tasks

- Adding new 3D objects: Create geometry/material/mesh, position, add to scene
- Modifying camera: Adjust FOV, near/far planes, or position
- Performance: Use `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))` for high-DPI displays
- Effects: Add fog with `scene.fog = new THREE.Fog(color, near, far)`
