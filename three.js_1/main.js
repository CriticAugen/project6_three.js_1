import './style.css';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import gsap from 'gsap'

//Scene
const scene = new THREE.Scene()

//Create Sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83", 
  roughness:0.25,
})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//Light
const Light = new THREE.PointLight(0xffffff,1,100)
Light.position.set(0,10,10)
// Light.intensity(1.25)
scene.add(Light)

//Sizes
const sizes = {
  width : window.innerWidth,
  height : window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(45, 800 / 600)
camera.position.z = 20
scene.add(camera)

//Renderer
const canvas = document.querySelector('.webgl');
const Renderer = new THREE.WebGLRenderer({canvas});
Renderer.setSize(sizes.width,sizes.height)
Renderer.setPixelRatio(2)
Renderer.render(scene,camera)

//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

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

//Timeline magic
const tl = gsap.timeline({defaults:{duration:1}})

tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
tl.fromTo(".title",{opacity:0},{opacity:1})

//Mouse Animation Color
let mouseDown = false
let rgb =[]
window.addEventListener(
  "mousedown",() => (mouseDown=true)
)
window.addEventListener(
  "mouseup",() => (mouseDown=false)
)
window.addEventListener("mousemove",(e) => {
  if(mouseDown){
    rgb=[
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150
    ]
    //Lets animate
    let newColor= new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,
      {
        r: newColor.r,
        g: newColor.g,
        b: newColor.b,
      })
  }
})
