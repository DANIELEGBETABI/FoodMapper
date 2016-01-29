var map;
var markers = [];
var infowindow;

function initMap(){
	navigator.geolocation.getCurrentPosition(
		function(position){
			var loc = {lat: position.coords.latitude,lng: position.coords.longitude};
			map = new google.maps.Map(document.getElementById('map'), {
				center:loc,
				zoom: 15
			});

			infowindow = new google.maps.InfoWindow();

		},function(error){

		}
	);
}
$(document).ready(function(){
	$("#junk").click(function(){
		deleteMarkers();
		createMarkers("fast food");
	});
	$("#asian").click(function(){
		deleteMarkers();
		createMarkers("asian food");
	});
	$("#mex").click(function(){
		deleteMarkers();
		createMarkers("mexican food");
	});
	$("#happy").click(function(){
		deleteMarkers();
		createMarkers("happy hour");
	});
	$("#drunk").click(function(){
		deleteMarkers();
		createMarkers("burgers");
	});
});

function createMarkers(query){
	var service = new google.maps.places.PlacesService(map);
	service.textSearch({
	    location: map.getCenter(),
	    radius: 500,
	    query: [query]
	}, function(results, status){
		if (status === google.maps.places.PlacesServiceStatus.OK){
	    for (var i = 0; i < results.length; i++) {
	    	createMarker(results[i]);
	    }
	}
	});
}

function deleteMarkers(){
	for (var i = 0; i < markers.length; i++){
		markers[i].setMap(null);
	}
	markers = [];
}
function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("<img src=\"" + place.icon + "\"> <br><h1>" + place.name + "</h1><p>" + place.formatted_address + "</p>");
    infowindow.open(map, this);
  });

  markers.push(marker);
}
