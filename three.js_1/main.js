import './style.css'
import * as THREE from "three"

//Scene
const scene = new THREE.Scene()

//Create Sphere
const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({color: "#00ff83", roughness:0.15})
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//Camera
const camera = new THREE.PerspectiveCamera(45, 800/600)
scene.add(camera)
