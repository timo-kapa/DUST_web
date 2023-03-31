<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>3D City District Viewer</title>
    <style>
      body {
        margin: 0;
        overflow: hidden;
      }
      canvas {
        display: block;
      }
    </style>
  </head>
  <body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gltf-loader@1.2.0"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pointerlockcontrols/2.2.2/PointerLockControls.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/OrbitControls.min.js"></script>
    <script>
      // Set up scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Load the glTF model
      const loader = new THREE.GLTFLoader();
      loader.load(
        'https://your-public-url.com/your-model.gltf',
        (gltf) => {
          scene.add(gltf.scene);
        },
        undefined,
        (error) => {
          console.error('An error occurred while loading the model:', error);
        }
      );

      // Set up lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(0, 1, 0);
      scene.add(directionalLight);

      // Set up first-person controls
      const firstPersonControls = new THREE.PointerLockControls(camera, document.body);
      firstPersonControls.getObject().position.set(0, 0, 5); // Set initial position

      // Set up orbit controls
      const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
      orbitControls.target.set(0, 0, 0);
      orbitControls.update();

      // Active controls (start with OrbitControls)
      let activeControls = orbitControls;

      // Switch controls on key press (Tab key)
      document.addEventListener('keydown', (e) => {
        if (e.code === 'Tab') {
          e.preventDefault(); // Prevent tabbing out of the canvas
          if (activeControls === orbitControls) {
            activeControls = firstPersonControls;
            firstPersonControls.lock();
          } else {
            activeControls = orbitControls;
            firstPersonControls.unlock();
          }
        }
      });

      // Animation loop
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      // Handle window resize
      window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      });
    </script>
  </body>
</html>
```