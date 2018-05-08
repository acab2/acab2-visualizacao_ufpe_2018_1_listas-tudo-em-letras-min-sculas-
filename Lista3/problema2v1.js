 //Primeira visualização
 var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 500 - margin.left - margin.right // Use the window's width 
  , height = 600 - margin.top - margin.bottom; // Use the window's height

  d3.select('body')
	.append('div')
	.attr("id","mapid")
	.style('height', height + "px");
	
  var mymap = L.map('mapid').setView([-15.505, -55.09], 13).setZoom(4);
	  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoiY2VzYXJidWxob2VzIiwiYSI6ImNqZ3RpMnFkdDFxdDIyeW1sMnZoMWhlbGsifQ._AjrXcnvXxmlBHNo5J1Img'
	}).addTo(mymap);

function setColor(classificacao){
	if(classificacao == "ACIDENTE"){return "red";}
	else if(classificacao == "INCIDENTE"){return "blue";}
	else{return "green";}
}

function coordenadas(latitude, longitude){
	var tuple = [];
	tuple.push(latitude);
	tuple.push(longitude);
	return tuple;
}

d3.csv("https://raw.githubusercontent.com/nosbielcs/opendata_aig_brazil/master/data/oco.csv", function(data) {
		for(var i = 0; i < data.length; i++){
			L.circle(coordenadas(data[i].ocorrencia_latitude, data[i].ocorrencia_longitude), {
				color: "",
				fillColor: setColor(data[i].ocorrencia_classificacao),
				fillOpacity: 0.5,
				radius: 15000
			}).addTo(mymap);
		}
});
