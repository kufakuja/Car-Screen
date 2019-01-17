var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];
var userMarker;

function initmap() {
	// set up the map
	map = new L.Map('mapid');

	// create the tile layer with correct attribution
	var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 19, attribution: osmAttrib});

	// start the map in South-East England
	map.addLayer(osm);
    
    // Set geolocation listener
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(updateGeolocation);
    } else {
        alert('Geolocation is not supported');
    }
}

function updateUserMarker(lat, lng) {
    //userMarker.setPosition(new L.LatLng(lat, lng));
    map.setView(new L.LatLng(lat, lng), 17);
    updateActiveStep();
}

function updateGeolocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var speed = position.coords.speed;
    var heading = position.coords.heading;
    var description = (heading != null) ? ((speed * 3.6) + ' km/h, heading ' + heading) : ((speed * 3.6) + ' km/h');
    //updatePanel('geolocation', description);
    updateUserMarker(lat, lng);
}