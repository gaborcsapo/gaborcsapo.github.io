var listOfCities = [];
var map;
var listMarkers = [];
var infowindow = null;

var initMap = function() {
	//initializes the map on page load	
	
	var myLatlng = new google.maps.LatLng(0, 0);
	var mapOptions = {
		zoom: 2,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
	};
	map = new google.maps.Map(document.getElementById("map"),
		mapOptions);
	grabWeather();	
};

var AutoCenter = function () {
		var bounds = new google.maps.LatLngBounds();
		$.each(listMarkers, function (index, marker) {
		bounds.extend(marker.position);
		});
		map.fitBounds(bounds);
	};


function makeWeatherRequest(Url){
	//makes Ajax call to request weather data from the passed in Url

	$.ajax({
		url: Url,
		type: 'GET',
		dataType: 'JSON',
		
		error: function(data) {
			console.log("I got an error... ");
		},
		
		success: function(data) {
		console.log("Successful data retrieval ");
			listOfCities.push(data);
		}
	});
}


function grabWeather() {
	//loop through all the cities to get wheather data for ALL cities

	var cityNames = ['London,uk', 'Bangkok', 'Paris', 'Singapore', 'HongKong', 'NewYork' , 'Dubai', 'Rome,it', 'Seoul', 'Barcelona', 'Dublin,ie', 'Muscat', 'Shanghai', 'Toronto',
	'KualaLumpur', 'Istanbul', 'Madrid', 'Amsterdam', 'Mecca', 'Prague', 'Moscow', 'Beijing', 'Vienna', 'Taipei', 'StPetersburg', 'Cancun', 'Macau', 'Venice,it', 'Warsaw', 'Mexico,mex',
	'LosAngeles', 'Berlin', 'RioDeJaneiro', 'Budapest', 'SanFrancisco', 'Miami', 'Munich', 'Milan,it', 'Sydney', 'Oahu', 'Honolulu', 'Cairo', 'Florence,it', 'Lisbon', 'LasVegas', 'Marrakesh',
	'Tokyo', 'AbuDhabi', 'Copenhagen', 'Zurich', 'Edinburgh',  'CapeTown', 'Seville,sp', 'SãoPaulo', 'Chicago', 'Guilin', 'Stockholm', 'Tallinn', 'Boston', 'Krakow', 'LaHavana', 'SalvadordeBahia',
	'Melbourne,au', 'Salzburg', 'City', 'Nanjing', 'Helsinki', 'Xian','Lhasa', 'Hamburg', 'Lyon', 'Montreal', 'Mumbai', 'Bruges', 'Antwerp,be', 'Liverpool', 'NewDelhi', 'Valencia', 'Kunming',
	'Granada', 'Chennai', 'Geneva,ch', 'Agra', 'Osaka', 'Oslo', 'Chengdu', 'Fortaleza', 'Atlanta', 'Houston', 'Gothenburg,sw','PuertoRico', 'LuxembourgCity', 'BuenosAires', 'Reykjavik', 'Nürnberg',
	'Naples,it', 'Seattle', 'Monaco', 'Brighton', 'Heidelberg,DE', 'Genova,it', 'Graz', 'Goa,in', 'Bilbao', 'Marseille', 'Jerusalem', 'Malmö', 'Split', 'podgorica', 'Sofia', 'Athens', 'Kiev',
	'Beirut', 'baku', 'Tehran', 'Isfahan', 'salalah', 'Kathmandu', 'colombo', 'Hanoi', 'phomphen', 'Bali', 'palawan', 'Samarkand', 'Zanzibar', 'Accra', 'Timbuktu', 'Tunis', 'Benghazi', 'Beira',
	'Santiago', 'lima', 'irkutsk', 'Almati', 'Luxor', 'Ljubjana', 'portdouglas', 'Fiji', 'Noumea', 'portlouis' , 'male', 'Juneau', 'jaipur', 'Udaipur', 'Calcutta' ];
	for (var i = 0; i <= cityNames.length; i++){
		var Url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + cityNames[i] + "&mode=json&units=metric&cnt="+7+"&APPID=bda8a449681332f32467e05a221adc2a";
		makeWeatherRequest(Url);
	}
}


var checkWeather = function(maximTemp, minimTemp) {
	//it checks wether the weather in the list of cities matches the preferences and it and it appends to good cities to another list which will be displayed...
	var listOfMatches = [];
	for (var p = 0; p <= listOfCities.length-1; p++) {
		var temperature = listOfCities[p].list[6].temp.day;
		if ( temperature > minimTemp && temperature < maximTemp && listOfCities[p].list[6].weather[0].main != "Rain") {
			listOfMatches.push(listOfCities[p]);
		}
	}
	//puts the markers on the map
	putMarkers(listOfMatches);
};


var putMarkers = function(matches) {
	//cleans up markers from previous search
	var listOfMatches = matches;
	for (var s = listMarkers.length-1; s >= 0; s--) {
			listMarkers[s].setMap(null);
		}

	listMarkers = [];
	
	//creates new markers
	var infowindow = new google.maps.InfoWindow({
		content: "lószar",
		});

	for (var l = listOfMatches.length - 1; l >= 0; l--) {
		//create the info window text
		var infoContent = '<div id="content">'+
			'<div id="siteNotice">'+
			'</div>'+
			'<h1 id="firstHeading" class="firstHeading">' +
			listOfMatches[l].city.name + '</h1>'+
			'<div id="bodyContent">'+
			'Temperature 7 days from now: ' + listOfMatches[l].list[6].temp.day + ' Degrees (C)<br>' +
			'Weather: ' + listOfMatches[l].list[6].weather[0].description +
			'</div>'+
			'</div>';
		var newLatLng = new google.maps.LatLng(listOfMatches[l].city.coord.lat, listOfMatches[l].city.coord.lon);
		
		var marker = new google.maps.Marker({
			position: newLatLng,
			map: map,
			title: listOfMatches[l].city.name,
			icon: 'placemarker.png',
			html: infoContent,
		});

		createClickEvent(marker, infowindow);

		marker.setMap(map);
		listMarkers.push(marker);
	}

	AutoCenter();
};


function createClickEvent(theMarker, infowindow){
	google.maps.event.addListener(theMarker, 'click', function () {
	// where I have added .html to the marker object.
		infowindow.setContent(this.html);
		infowindow.open(map, this);
	});
}


$(document).ready(function() {
	
	initMap();

	//if cicked on the button, it filters the cities
	$('#search').click(function(){
		var maximumT = Number($("#Temp").val());
		var minimumT = Number($("#Range").val());
		if (minimumT >= maximumT) {
			window.alert("Invalid input. The maximum temperature has to be more than the minimum Temperature.");
		} else {
			checkWeather(maximumT, minimumT);
		}
	});
});