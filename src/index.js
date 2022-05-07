	import * as THREE from 'three';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
    import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

    //adds scne camera + renderer
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	const renderer = new THREE.WebGLRenderer({
    antialias: true
  	});	

	//renderer size
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );


	//for objexts and colors

	scene.background = new THREE.Color("rgb(26, 143, 236)");
	const concrete = new THREE.Color("rgb(128, 128, 118)")
	const building= new THREE.BoxGeometry(1.5,5,1.5);
	
	const rect = new THREE.BoxGeometry(10,.6,10);
	const material = new THREE.MeshBasicMaterial( {color: "rgb(38, 37, 36)" } );


	const buildingmat = new THREE.MeshBasicMaterial( { color: "rgb(89, 88, 86)" } );
	//mat forbuildings
	const newB = new THREE.MeshStandardMaterial({color: "rgb(38, 37, 36)" });
	//grass
	const grassplane = new THREE.BoxGeometry(3,.5,3);
	const grass = new THREE.MeshStandardMaterial({color: "rgb(78, 252, 3)" });
	const rectgrass = new THREE.Mesh(grassplane, grass);
	rectgrass.name = "cube";
	scene.add(rectgrass);
	rectgrass.position.x = 3;
	rectgrass.position.z = 3;
	rectgrass.position.y = .054;





	//create plane
   	const plane = new THREE.Mesh(rect, material);
	//road text
         	
	//raycast
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();


	function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	}
	//texture for special building
	const lloader = new THREE.TextureLoader();

	const specmate = new THREE.MeshBasicMaterial({
  	map: lloader.load('images/buildingtexture.png'),
	});
	  

            
//camera position
	camera.position.x = -10;

	camera.position.z = 10;
	camera.position.y = 5;
//geometry
const buildings = [
	new THREE.BoxGeometry(1.5,5,1.5), //0
	new THREE.BoxGeometry(1.5,2.5,1.5), //1
	new THREE.BoxGeometry(1.5,3,1.5), //2
	new THREE.BoxGeometry(1.5,4.5,1.5), //3
	new THREE.BoxGeometry(1.5,3.5,1.5), //4
	new THREE.BoxGeometry(1.5,2,1.5), //5
	new THREE.BoxGeometry(1.5,3.78,1.5), //6
	new THREE.BoxGeometry(1.5,2.87,1.5), //7
	new THREE.BoxGeometry(1.5,2.23,1.5), //8
	new THREE.BoxGeometry(1.5,3.97,1.5), //9
	new THREE.BoxGeometry(1.5,4.51,1.5), //10
	new THREE.BoxGeometry(1.5,5,1.5), //11
	new THREE.BoxGeometry(1.5,2.1,1.5), //12

	
];
//create and name cubes + y positioning
let cube = [];
let cubeBoundingBox;
let boxSize = new THREE.Vector3();
let num = 0.0;
for(let i = 0; i < 13;i++){
	if(i != 11){
		cube.push(new THREE.Mesh( buildings[i], newB ));
	}
	else{
		cube.push(new THREE.Mesh( buildings[i], specmate ));
	}
	cube[i].name = "cube";
	if(i == 11){cube[i].name = "cap"}
	cubeBoundingBox = new THREE.Box3().setFromObject( cube[i]);
	cubeBoundingBox.getSize(boxSize);
	cube[i].position.y = parseFloat(boxSize.y/2);


	 // Returns Vector3
	//cube[i].position.y = buildings[i].BoxGeometry.Meas


}
//name plane for raycast
plane.name = "cube";



//cube positioning
cube[0].position.x = 4.24;
cube[1].position.x = 2.16;
cube[2].position.x = 0;

cube[3].position.z = 4.24;
cube[4].position.z = 2.16;

//sec 2
cube[5].position.x = -4;
cube[6].position.x = -4;
cube[6].position.z = 2.16;

cube[7].position.x = -4;
cube[7].position.z = 4.24;

//sec 3
cube[8].position.x = -4.24;
cube[8].position.z = -4;

cube[9].position.x = -2.16;
cube[9].position.z = -4;

cube[10].position.x = 0;
cube[10].position.z = -4;

cube[11].position.x = 2.16;
cube[11].position.z = -4;

cube[12].position.x = 4.24;
cube[12].position.z = -4;











	//camera move
    const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.target.set(0, 1, 0);




	
		  

//add plane
scene.add(plane);



//ambient light for 3 models
const ambientLight = new THREE.AmbientLight( 0xffffff, 1.2 );
scene.add( ambientLight );
//better light?
	  const sunLight = new THREE.DirectionalLight(0xd63710, 5.5 );
            sunLight.position.set(-300, 100, -400);
            sunLight.position.multiplyScalar(5.0);

            sunLight.castShadow = true;

            sunLight.shadowMapWidth = 512;
            sunLight.shadowMapHeight = 512;

            sunLight.lookAt( new THREE.Vector3(0,0,0) );
    

    scene.add(sunLight);
//car loader
const loader = new GLTFLoader();
loader.load( 'All3dModels/car/scene.gltf', function ( gltf ) {
	gltf.scene.scale.set(0.003, 0.003, 0.003); 
	gltf.scene.position.set(-3, 0.15, -1); 
	const carroot = gltf.scene;
	carroot.name = "greenhouse";
	scene.add(carroot);


}, undefined, function ( error ) {

	console.error( error );

} );
//console.log(greenhouseroot);
//greenhouse loader

loader.load( 'All3dModels/greenhouse/scene.gltf', function ( gltf ) {
	gltf.scene.scale.set(.3, .3, .3); 
	gltf.scene.position.set(-4, 2.9, 4.3); 
	const greenroot = gltf.scene;
	greenroot.name = "green";

	scene.add( gltf.scene );


}, undefined, function ( error ) {

	console.error( error );

} );

loader.load( 'All3dModels/low_poly_garden/scene.gltf', function ( gltf ) {
	gltf.scene.scale.set(.001, .001, .001); 
    gltf.scene.position.set(2, .3, 2); 
	const tree = gltf.scene;
	tree.name = "cube";


	scene.add( gltf.scene );


}, undefined, function ( error ) {

	console.error( error );

} );


//building adder and plane adder

function addC(){
	for(let i = 0; i <= cube.length; i++){
		scene.add(cube[i]);
	  }
	  scene.add(plane);


}
function animate() {
	requestAnimationFrame( animate );
	
	controls.update();

	renderer.render( scene, camera );

}
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('click', onDocumentMouseDown, false);
addC();
animate();

//window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//naming items for raycast
console.log(cube[9].name)
//event for raycats
function onDocumentMouseDown(event) {

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  
let intersects = raycaster.intersectObjects(scene.children, true);
 
  if (intersects.length > 0){
	console.log(intersects[0].object.name);

  
	if(intersects[0].object.name != 'cube'){
	





		console.log(intersects[0].object.name);
		
		if(intersects[0].object.name == 'Cylinder_Leafs_0'||
		intersects[0].object.name == 'Cylinder_Trunk_0'||
		intersects[0].object.name == 'Cube007_Material001_0'||
		intersects[0].object.name == 'Cube019_Material003_0'||
		intersects[0].object.name == 'Cube008_Material004_0'||
		intersects[0].object.name == 'Cube008_Material005_0'||
		intersects[0].object.name == 'Plane_Ground_0'){
		}
		else if(intersects[0].object.name == 'Object_4'||intersects[0].object.name == "Object_5"){
			location.href = 'soil.html';

		}
		else if(intersects[0].object.name == 'cap'){
			location.href = 'capital.html';
		}
		else{
		location.href = 'cars.html';
		}

		
	}
	
  }
  
  


  
  
  
 

 

}