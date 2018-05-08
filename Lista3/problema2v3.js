 //Terceira Visualização
 
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
	
	var dataOco;
	var dataMun;
	
	d3.csv("https://raw.githubusercontent.com/nosbielcs/opendata_aig_brazil/master/data/oco.csv", function(data) {
		
		dataOco = data;
		dataMun = d3.nest()
		.key(function(d) { return d.ocorrencia_cidade; })
		.entries(data);
	});
		
		function getColor(d) {
			
			var result = d;			

			
			return result > 200  ? '#0c2c84' :
				   result > 150  ? '#225ea8' :
				   result > 100  ? '#1d91c0' :
				   result > 50   ? '#41b6c4' :
				   result > 30   ? '#7fcdbb' :
				   result > 10   ? '#c7e9b4' :
								   '#ffffcc' ;
		}
		
	var dataMap;
	var n = -1;
	
	function fillColor(name){ 
	
				for(i=0; i< dataMun.length; i++){
					
					if(name.toUpperCase() == dataMun[i].key){
					
						return getColor(dataMun[i].values.length)}
					
					
				}
				return getColor(0);
	}
	
	d3.json("https://visualizacao-ufpe.github.io/data_vis_assignments/2017.2/data/geojs-100-mun.json.txt", function(err, data) {
		if(err) console.log(err);
		dataMap = data;
		var cloro;
		
		
		L.geoJson(data, {style: 
			function(data){
				
				n++;
				if(n<dataMap.features.length){
					return {
						fillColor: fillColor(dataMap.features[n].properties.description),
						weight: 2,
						opacity:1,
						color: '',
						dashArray: '3',
						fillOpacity: 1
					};	
				}
			}
		}).addTo(mymap);
		
			
			
			//console.log(dataMap.features[n].properties.description);
			
			
	});
	
	var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 30, 50, 100, 150, 200],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
	
    return div;
};

legend.addTo(mymap);
	

// a tercerira visualização deve mostrar o número de ocorrências por município brasileiro. Novamente, escolha uma escala de cores apropriada e mostre uma legenda.