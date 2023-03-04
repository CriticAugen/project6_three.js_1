import './style.css'
import * as THREE from "three"

//Scene
const scene = new THREE.Scene()

//Create Sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({color: "#00ff83", roughness:0.15})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//Light
const Light = new THREE.PointLight(0xffffff,1,100)
Light.position(0,10,10)
Light.intensity(1.25)
scene.add(Light)

//Sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(45, 800/600)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector('webgl')
const Renderer = new THREE.WebGLRenderer({canvas})
Renderer.setSize(sizes.width,sizes.height)
Renderer.setPixelRatio(2)
Renderer.render(scene,camera)

//Resize
window.addEventListener('resize',()=> {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  Renderer.setSize(sizes.width,sizes.height)

})

const loop = () => {
  controls.update()
  Renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}

loop()