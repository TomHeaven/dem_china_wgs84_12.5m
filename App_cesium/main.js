// Construct the viewer with just what we need for this base application
// var viewer = new Cesium.Viewer('cesiumContainer', {
// 	timeline:false,
// 	animation:false,
// 	vrButton:true,
// 	sceneModePicker:false,
// 	infoBox:true,
// 	scene3DOnly:true,
// 	terrainProvider: Cesium.createWorldTerrain()
// });

// // Add credit to Bentley
// viewer.scene.frameState.creditDisplay.addDefaultCredit(new Cesium.Credit('<a href="https://www.bentley.com/" target="_blank"><img src="Resources/logoBentley.png"/></a>Cesium 3D Tiles produced by Bentley ContextCapture'));

// // Create tileset. Do not forget to reduce the default screen space error to 1
// var tileset = new Cesium.Cesium3DTileset({
// 	url: '../DEM-20M-WGS84-CHINA-TAIWAN-MESH/layer.json',
// 	maximumScreenSpaceError : 1
// });

//创建viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
	selectionIndicator: false,
	baseLayerPicker: false,
	homeButton: false,
	infoBox: false,
	timeline: false,
	navigationHelpButton: false,
	navigationInstructionsInitiallyVisible: false,    
	vrButton: false,    
	fullscreenButton: false,    
	geocoder: false,    
	animation: false,    
	sceneModePicker: false,    
	shadows:true,    
	imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
		url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'   
	})  
});
viewer.cesiumWidget.creditContainer.style.display = "none";  
viewer.scene.globe.enableLighting = false;  
viewer.scene.highDynamicRange = true;  
viewer.scene.msaaSamples = 16;  
viewer.scene.fog.enabled = true;  
viewer.scene.fog.enableLighting = true;  
//加载地形
viewer.terrainProvider = new Cesium.CesiumTerrainProvider({     
	url:"http://localhost:8803/",
	tilingScheme: new Cesium.GeographicTilingScheme(),
	requestVertexNormals:true    
});

// // Override behavior of home button
// viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
// 	// Fly to tileset
// 	viewer.flyTo(tileset);

// 	// Tell the home button not to do anything
// 	commandInfo.cancel = true;
// });

var longitude_show = document.getElementById('longitude_show');
var latitude_show = document.getElementById('latitude_show');
var altitude_show = document.getElementById('altitude_show');
	
//获取坐标转经纬度
// let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
// handler.setInputAction(function (event) {
// 	console.log(event.position);
// 	let earthPosition = viewer.scene.pickPosition(event.position);
// 	if (Cesium.defined(earthPosition)) {
// 		let cartographic = Cesium.Cartographic.fromCartesian(earthPosition);
// 		console.log(cartographic);
// 		let lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(8);
// 		let lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(8);
// 		let height = cartographic.height.toFixed(2);
// 		console.log(earthPosition, {
// 			lon: lon,
// 			lat: lat,
// 			height: height,
// 		});
// 		longitude_show.innerHTML = lon;
// 		latitude_show.innerHTML = lat;
// 		altitude_show.innerHTML = height;
// 	}
// }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

var handler2 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler2.setInputAction(function (event) {
    var ray = viewer.camera.getPickRay(event.endPosition);
    var mousePosition = viewer.scene.globe.pick(ray, viewer.scene);
    if (Cesium.defined(mousePosition)) {
        var cartographic = Cesium.Cartographic.fromCartesian(mousePosition);
        var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(7);
        var lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(7);
        var height = cartographic.height.toFixed(2);
        // var lhtext =
        //     `Lat: ${(latitudeString).slice(-8)}, Lon: ${(longitudeString).slice(-8)}, Alt: ${(heightString).slice(-7)}`;
		longitude_show.innerHTML = lon;
		latitude_show.innerHTML = lat;
		altitude_show.innerHTML = height;
    }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// Add tileset to viewer and set initial camera position
// viewer.scene.primitives.add(tileset);
// viewer.zoomTo(tileset);

// Cesium全球3.5亿做建筑物，数据来源openStreetMap地图
// var buildings = viewer.scene.primitives.add(new Cesium.createOsmBuildings());
// viewer.scene.primitives.add(Cesium.createOsmBuildings({
// 	style: new Cesium.Cesium3DTileStyle({
// 	  color: {
// 		conditions: [
// 		  ["${feature['building']} === 'hospital'", "color('#0000FF')"],
// 		  ["${feature['building']} === 'school'", "color('#00FF00')"],
// 		  [true, "color('#ffffff')"]
// 		]
// 	  }
// 	})
//   }));

viewer.camera.flyTo({
	destination:Cesium.Cartesian3.fromDegrees(121.50, 25.04, 50000.0),
	orientation: {
		heading: Cesium.Math.toRadians(0.0),
		pitch: Cesium.Math.toRadians(-90.0),
		roll: 0.0
	}
});
