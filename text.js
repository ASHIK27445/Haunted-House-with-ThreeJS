import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'
import { Timer } from 'three/examples/jsm/Addons.js'
import '/style.css'
import { Group } from 'three/examples/jsm/libs/tween.module.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas =  document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const gui = new GUI()

// Model loader
const gltfLoader = new GLTFLoader()

//texture
const textureLoader = new THREE.TextureLoader()
const floorAlphaTexture = textureLoader.load('/floor/alpha.jpg')
floorAlphaTexture.colorSpace = THREE.SRGBColorSpace
const floorColorTexture = textureLoader.load('/floor/coast sand rocks/coast_sand_rocks_02_diff_1k.webp')
floorColorTexture.colorSpace = THREE.SRGBColorSpace
const floorARMTexture = textureLoader.load('/floor/coast sand rocks/coast_sand_rocks_02_arm_1k.webp')
// floorARMTexture.colorSpace = THREE.SRGBColorSpace
const floorNormalTexture = textureLoader.load('/floor/coast sand rocks/coast_sand_rocks_02_nor_gl_1k.webp')
// floorNormalTexture.colorSpace = THREE.SRGBColorSpace
const floorDisplacementTexture = textureLoader.load('/floor/coast sand rocks/coast_sand_rocks_02_disp_1k.webp')
// floorDisplacementTexture.colorSpace = THREE.SRGBColorSpace

const ghostShadowAlphaJPG = textureLoader.load('/01.jpg')

floorColorTexture.repeat.set(8,8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorARMTexture.repeat.set(8,8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8,8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.set(8,8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

//wall
const wallColorTexture = textureLoader.load('wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
wallColorTexture.colorSpace = THREE.SRGBColorSpace
const wallARMTexture = textureLoader.load('wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallNormalTexture = textureLoader.load('wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')


//roof
const roofColorTexture = textureLoader.load('roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
roofColorTexture.colorSpace = THREE.SRGBColorSpace
const roofARMTexture = textureLoader.load('roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textureLoader.load('roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')

roofColorTexture.repeat.set(3,1)
roofARMTexture.repeat.set(3,1)
roofNormalTexture.repeat.set(3,1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

//bush
const bushColorTexture = textureLoader.load('bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
bushColorTexture.colorSpace = THREE.SRGBColorSpace
const bushARMTexture = textureLoader.load('bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNormalTexture = textureLoader.load('bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')

bushColorTexture.repeat.set(3,1)
bushARMTexture.repeat.set(3,1)
bushNormalTexture.repeat.set(3,1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

//grave
const graveColorTexture = textureLoader.load('grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
graveColorTexture.colorSpace = THREE.SRGBColorSpace
const graveARMTexture = textureLoader.load('grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textureLoader.load('grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')


//door
const doorColorTexture = textureLoader.load('door/woodern modern/wooden_garage_door_diff_1k.webp')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorARMTexture = textureLoader.load('door/woodern modern/wooden_garage_door_arm_1k.webp')
const doorNormalTexture = textureLoader.load('door/woodern modern/wooden_garage_door_nor_gl_1k.webp')
const doorDisplacementTexture = textureLoader.load('door/woodern modern/wooden_garage_door_disp_1k.webp')


/****House******** */
//floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20, 100, 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: - 0.2
    })
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

//house
const house = new THREE.Group()
scene.add(house)

//wall
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        aoMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        normalMap: wallNormalTexture
    })
)
walls.position.y = 1.25
house.add(walls)

//roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
roof.position.y = 2.5 + 1.5 * 0.5
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 2.1,100,100),
    new THREE.MeshStandardMaterial({
        // color: 'red',
        map: doorColorTexture,
        aoMap: doorARMTexture,
        roughnessMap: doorARMTexture,
        metalnessMap: doorARMTexture,
        normalMap: doorNormalTexture,
        displacementMap: doorDisplacementTexture,
        displacementScale: 0.375,
        displacementBias: - 0.1
    })
)
door.position.z = 2 + 0.001
door.position.y = 2.1 * 0.5
house.add(door)

//bushes
const bushGeometry = new THREE.SphereGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({
        color: 'green',
        map: bushColorTexture,
        aoMap: bushARMTexture,
        metalnessMap: bushARMTexture,
        roughnessMap: bushARMTexture,
        normalMap: bushNormalTexture
})

const bush1 =  new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.z = 2.2
bush1.position.y = 0.2
bush1.position.x = 0.8
bush1.rotation.x = - 0.75
scene.add(bush1)

const bush2 =  new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4, 0.1, 2.2)
bush2.rotation.x = - 0.75
scene.add(bush2)

const bush3 =  new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.setScalar(0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = - 0.75
scene.add(bush3)

const bush4 =  new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.setScalar(0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = - 0.75
scene.add(bush4)

//graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
        map: graveColorTexture,
        aoMap: graveARMTexture,
        metalnessMap: graveARMTexture,
        roughnessMap: graveARMTexture,
        normalMap: graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for( let i = 0; i< 30; i++){
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    const angle = Math.random() * Math.PI * 2
    const graveRadius = 4 + Math.random() * 3
    const graveX = Math.sin(angle) * graveRadius
    const graveZ = Math.cos(angle) * graveRadius

    grave.position.x = graveX
    grave.position.z = graveZ
    grave.position.y = Math.random() * 0.3

    const graveRotationAxis = (Math.random() - 0.5) * 0.5
    grave.rotation.set(graveRotationAxis, graveRotationAxis, graveRotationAxis)

    graves.add(grave)
}

gui.add(door.material, 'displacementScale').min(0).max(1).step(0.001).name('DDS')
gui.add(door.material, 'displacementBias').min(-1).max(1).step(0.001).name('DDB')
//ambient light
const ambientLight = new THREE.AmbientLight('#516886', 0.5)
scene.add(ambientLight)

gui.add(ambientLight, 'intensity').min(0).max(10).step(0.01)
const directionalLight = new THREE.DirectionalLight('#516886', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.01)


const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
scene.add(doorLight)

//ghost light
const ghost1 = new THREE.PointLight('#8800ff', 6)
const ghost2 = new THREE.PointLight('#ff0000', 6)
const ghost3 = new THREE.PointLight('#ff8800', 6)
scene.add(ghost1, ghost2, ghost3)

const cursor = {
    x:0,
    y: 0
}
window.addEventListener('mousemove', (mouse)=> {
    cursor.x = mouse.clientX / sizes.width - 0.5
    cursor.y = mouse.clientY / sizes.height - 0.5
})

window.addEventListener('resize', ()=> {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
})
window.addEventListener('dblclick', ()=> {
    const fullScreen = document.fullscreenElement
    if(!fullScreen){
        canvas.requestFullscreen()
    }
    else{
        document.exitFullscreen()
    }
})

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 100)
scene.add(camera)
camera.position.set(4, 2, 5)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
//cast and recieve shadow
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true
floor.receiveShadow = true

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}

//mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256


directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.left = -8

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10
ghost2.shadow.camera.far = 10
ghost3.shadow.camera.far = 10
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256

//sky
const sky = new Sky()
sky.scale.setScalar(100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)


// const skyUniforms = sky.material.uniforms
// skyUniforms['turbidity'].value = 3.5
// skyUniforms['rayleigh'].value = 0.116
// skyUniforms['mieCoefficient'].value = 0.005
// skyUniforms['mieDirectionalG'].value = 0.7
// // skyUniforms['elevation'].value = 15.9
// // skyUniforms['exposure'].value = 0.0413
// skyUniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

// gui.add(skyUniforms.sunPosition.value, 'x').min(-10).max(10).step(0.001).name('sunPosX')
// gui.add(skyUniforms.sunPosition.value, 'y').min(-10).max(10).step(0.0001).name('sunPosY')
// gui.add(skyUniforms.sunPosition.value, 'z').min(-10).max(10).step(0.001).name('sunPosZ')
// // Add GUI controls for other sky parameters
// gui.add(skyUniforms['turbidity'], 'value').min(0).max(20).step(0.1).name('Turbidity')
// gui.add(skyUniforms['rayleigh'], 'value').min(0).max(4).step(0.001).name('Rayleigh')
// gui.add(skyUniforms['mieCoefficient'], 'value').min(0).max(0.1).step(0.001).name('Mie Coefficient')
// gui.add(skyUniforms['mieDirectionalG'], 'value').min(0).max(1).step(0.001).name('Mie Directional G')
// const sun = new THREE.Vector3()
// const phi = THREE.MathUtils.degToRad(90 - 10)
// const theta = THREE.MathUtils.degToRad(180)
// sun.setFromSphericalCoords(1, phi, theta)
// skyUniforms['sunPosition'].value.copy(sun)

//fog
scene.fog = new THREE.FogExp2('#02343f', 0.1)

//Audio load
const listener = new THREE.AudioListener()
camera.add(listener)

const batSound = new THREE.Audio(listener)
const audioLoader = new THREE.AudioLoader()
audioLoader.load('bats-sound.mp3', (buffer) => {
  batSound.setBuffer(buffer)
  batSound.setLoop(true)
  batSound.setVolume(0.6)
})

let soundStarted = false   
let mixer = null
const mixers = []

/*****Bat model Load */
const bats = []
const batPath = './bat.glb'

function spawnBat() {
  gltfLoader.load(batPath, (gltf) => {
    const bat = gltf.scene
    bat.scale.set(0.03, 0.03, 0.03)

    // random position every time
    const x = Math.random() * 20 - 10   // -10 to +10
    const y = 3 + Math.random() * 3     // 3 to 6 (above ground)
    const z = Math.random() * 20 - 10
    bat.position.set(x, y, z)

    scene.add(bat)
    bats.push(bat)

    // play animation
    const mixer = new THREE.AnimationMixer(bat)
    if (gltf.animations.length > 0) {
      const action = mixer.clipAction(gltf.animations[0])
      action.play()
    }
    mixers.push(mixer)

    if (!soundStarted) {
      batSound.play()
      soundStarted = true
    }
  })
}

// remove last bat
function removeBat() {
  if (bats.length > 0) {
    const bat = bats.pop()
    scene.remove(bat)

    const mixer = mixers.pop()
    if (mixer) mixer.stopAllAction()
 
  }

    // 🔇 if no bats left, stop the looping sound
  if (bats.length === 0 && batSound.isPlaying) {
    batSound.stop()
    soundStarted = false  // so next spawn will restart it
  }
}


// press "b" to add one bat
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'b') {
    spawnBat()
  }

  if(e.key.toLowerCase() === 'r'){
    removeBat()
  }

  if (e.key.toLowerCase() === 's') {
    if (batSound.isPlaying) {
      batSound.stop()
      soundStarted = false  
    }
  }
})

//zombie Load:
let loadModel = null
gltfLoader.load(
    'zombie_walk.glb', (gltf)=>{

        const zombie = gltf.scene
        zombie.scale.set(0.008, 0.008, 0.008)
         zombie.position.set( -3, 0, 5 )   // << set position here
        scene.add(zombie)
        loadModel = zombie
        mixer = new THREE.AnimationMixer(zombie)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()
    }
)

// ---- Zombie Sound ----
const zombieSound = new THREE.Audio(listener)
const zombieAudioLoader = new THREE.AudioLoader()
zombieAudioLoader.load('zmb3.mp3', (buffer) => {
  zombieSound.setBuffer(buffer)
  zombieSound.setLoop(true)   // loop so it keeps playing
  zombieSound.setVolume(0.25)  // adjust volume if needed
})

// Toggle with P
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'p') {
    if (zombieSound.isPlaying) {
      zombieSound.pause()  // pause sound
    } else {
      zombieSound.play()   // play sound
    }
  }
})




gui.hide()
renderer.shadowMap.enabled = true

// ---- Background Music ----
const bgMusic = new THREE.Audio(listener)
const bgAudioLoader = new THREE.AudioLoader()
bgAudioLoader.load('bm.mp3', (buffer) => {
  bgMusic.setBuffer(buffer)
  bgMusic.setLoop(true)   // keep looping as background
  bgMusic.setVolume(0.5)  // adjust volume as you like
})

// Toggle with M
window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'm') {
    if (bgMusic.isPlaying) {
      bgMusic.pause()
    } else {
      bgMusic.play()
    }
  }
})



let direction = -1 // 1 = forward, -1 = backward

// const time = new THREE.Clock()
const timer = new Timer()
let followZombie = false // toggle flag

window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'c') {
    followZombie = !followZombie
  }
})

function updateCamera(delta) {
  if (followZombie && loadModel) {
    // target position behind the zombie
    const offset = new THREE.Vector3(0, 2, -4)
    const targetPos = loadModel.position.clone().add(offset.applyEuler(loadModel.rotation))

    // smooth transition
    camera.position.lerp(targetPos, 2 * delta)

    // look at zombie
    camera.lookAt(loadModel.position)
  } else {
    controls.update()
  }
}



const tick = () => {
    //Timer
    timer.update()
    const elapsedTime = timer.getElapsed()
    // console.log(elapsedTime)


    //light ghosting Animation
    const ghostAngle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghostAngle) * 4
    ghost1.position.z = Math.sin(ghostAngle) * 4
    ghost1.position.y = Math.sin(ghostAngle) * Math.sin(ghostAngle * 2.34) * Math.sin(ghostAngle * 3.45)

    const ghost2Angle = - elapsedTime * 0.38
    ghost2.position.x = Math.cos(ghost2Angle) * 4
    ghost2.position.z = Math.sin(ghost2Angle) * 4
    ghost2.position.y = Math.sin(ghost2Angle * 1.265) * Math.sin(ghost2Angle * 2.35) * Math.cos(ghost2Angle * 5.67)

    const ghost3Angle =  elapsedTime * 0.23
    ghost3.position.x = Math.cos(ghost3Angle) * 4
    ghost3.position.z = Math.sin(ghost3Angle) * 4
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45)

    const delta = timer.getDelta()
    mixers.forEach(m => m.update(delta))

if (mixer) {
        mixer.update(delta)

        if (loadModel) {
            // multiply by direction to switch between + and -
            loadModel.position.z += delta * 0.4 * direction  

            // Check boundaries
            if (loadModel.position.z <= -4) {
                direction = 1  // go toward positive z
                loadModel.rotation.y = Math.PI
                console.log(loadModel.rotation.y)
            } else if (loadModel.position.z >= 4) {
                direction = -1 // go toward negative z
                loadModel.rotation.y = 0
            }
        }
    }

    updateCamera(delta)
    window.requestAnimationFrame(tick)
    renderer.render(scene, camera)
}
tick()



// ===== UI BUTTON HOOKS =====
function toggleBatSound() {
  if (typeof batSound !== 'undefined') {
    if (batSound.isPlaying) batSound.pause(); else batSound.play();
  }
}
function toggleZombieSound() {
  if (typeof zombieSound !== 'undefined') {
    if (zombieSound.isPlaying) zombieSound.pause(); else zombieSound.play();
  }
}
function toggleBgm() {
  if (typeof bgMusic !== 'undefined') {
    if (bgMusic.isPlaying) bgMusic.pause(); else bgMusic.play();
  }
}
function toggleCameraFollow() {
  followZombie = !followZombie
}

const btnSpawn  = document.getElementById('btnSpawn');
const btnRemove = document.getElementById('btnRemove');
const btnBatS   = document.getElementById('btnBatSound');
const btnZmbS   = document.getElementById('btnZombieSound');
const btnBgm    = document.getElementById('btnBgm');
const btnCam    = document.getElementById('btnCamera');

if (btnSpawn)  btnSpawn.addEventListener('click', () => { if (typeof spawnBat === 'function') spawnBat(); });
if (btnRemove) btnRemove.addEventListener('click', () => { if (typeof removeBat === 'function') removeBat(); });
if (btnBatS)   btnBatS.addEventListener('click', toggleBatSound);
if (btnZmbS)   btnZmbS.addEventListener('click', toggleZombieSound);
if (btnBgm)    btnBgm.addEventListener('click', toggleBgm);
if (btnCam)    btnCam.addEventListener('click', toggleCameraFollow);

// finally, start animation loop
tick()
