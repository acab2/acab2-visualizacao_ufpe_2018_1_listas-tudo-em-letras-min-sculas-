 //Segunda Visualização
 //Não consegui pintar corretamente as regiões por causa que o json com as coordenadas não possuia a divisão por estado
 
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
	var ocorrencia = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	d3.csv("https://raw.githubusercontent.com/nosbielcs/opendata_aig_brazil/master/data/oco.csv", function(data) {
		for(i=0; i< data.length; i++){	
			if(data.ocorrencia_uf == "AC"){ ocorrencia[0]++;}
			else if(data[i].ocorrencia_uf == "AL"){ocorrencia[1]++;}
			else if(data[i].ocorrencia_uf == "AP"){ocorrencia[2]++;}
			else if(data[i].ocorrencia_uf == "AM"){ocorrencia[3]++;}
			else if(data[i].ocorrencia_uf == "BA"){ocorrencia[4]++;}
			else if(data[i].ocorrencia_uf == "CE"){ocorrencia[5]++;}
			else if(data[i].ocorrencia_uf == "DF"){ocorrencia[6]++;}
			else if(data[i].ocorrencia_uf == "ES"){ocorrencia[7]++;}
			else if(data[i].ocorrencia_uf == "GO"){ocorrencia[8]++;}
			else if(data[i].ocorrencia_uf == "MA"){ocorrencia[9]++;}
			else if(data[i].ocorrencia_uf == "MT"){ocorrencia[10]++;}
			else if(data[i].ocorrencia_uf == "MS"){ocorrencia[11]++;}
			else if(data[i].ocorrencia_uf == "MG"){ocorrencia[12]++;}
			else if(data[i].ocorrencia_uf == "PA"){ocorrencia[13]++;}
			else if(data[i].ocorrencia_uf == "PB"){ocorrencia[14]++;}
			else if(data[i].ocorrencia_uf == "PR"){ocorrencia[15]++;}
			else if(data[i].ocorrencia_uf == "PE"){ocorrencia[16]++;}
			else if(data[i].ocorrencia_uf == "PI"){ocorrencia[17]++;}
			else if(data[i].ocorrencia_uf == "RJ"){ocorrencia[18]++;}
			else if(data[i].ocorrencia_uf == "RN"){ocorrencia[19]++;}
			else if(data[i].ocorrencia_uf == "RS"){ocorrencia[20]++;}
			else if(data[i].ocorrencia_uf == "RO"){ocorrencia[21]++;}
			else if(data[i].ocorrencia_uf == "RR"){ocorrencia[22]++;}
			else if(data[i].ocorrencia_uf == "SC"){ocorrencia[23]++;}
			else if(data[i].ocorrencia_uf == "SP"){ocorrencia[24]++;}
			else if(data[i].ocorrencia_uf == "SE"){ocorrencia[25]++;}
			else{ocorrencia[26]++;  } //TO
		}
		dataOco = data;
	});
		
		function getColor(d) {
			var result = '';			
			if(d == "AC"){ result = ocorrencia[0];}
			else if(d == "AL"){ result = ocorrencia[1];}
			else if(d == "AP"){ result = ocorrencia[2];}
			else if(d == "AM"){ result = ocorrencia[3];}
			else if(d == "BA"){ result = ocorrencia[4];}
			else if(d == "CE"){ result = ocorrencia[5];}
			else if(d == "DF"){ result = ocorrencia[6];}
			else if(d == "ES"){ result = ocorrencia[7];}
			else if(d == "GO"){ result = ocorrencia[8];}
			else if(d == "MA"){ result = ocorrencia[9];}
			else if(d == "MT"){ result = ocorrencia[10];}
			else if(d == "MS"){ result = ocorrencia[11];}
			else if(d == "MG"){ result = ocorrencia[12];}
			else if(d == "PA"){ result = ocorrencia[13];}
			else if(d == "PB"){ result = ocorrencia[14];}
			else if(d == "PR"){ result = ocorrencia[15];}
			else if(d == "PE"){ result = ocorrencia[16];}
			else if(d == "PI"){ result = ocorrencia[17];}
			else if(d == "RJ"){ result = ocorrencia[18];}
			else if(d == "RN"){ result = ocorrencia[19];}
			else if(d == "RS"){ result = ocorrencia[20];}
			else if(d == "RO"){ result = ocorrencia[21];}
			else if(d == "RR"){ result = ocorrencia[22];}
			else if(d == "SC"){ result = ocorrencia[23];}
			else if(d == "SP"){ result = ocorrencia[24];}
			else if(d == "SE"){ result = ocorrencia[25];}
			else{ result = ocorrencia[26];  } //TO
			
			return result > 1000 ? '#6e016b' :
				   result > 750  ? '#88419d' :
				   result > 500  ? '#8c6bb1' :
				   result > 250  ? '#8c96c6' :
				   result > 100  ? '#9ebcda' :
				   result > 50   ? '#bfd3e6' :
				   result > 25   ? '#e0ecf4' :
							 '#f7fcfd' ;
		}
		
		function getColorLegend(d) {
			return d > 1000 ? '#6e016b' :
				   d > 750  ? '#88419d' :
				   d > 500  ? '#8c6bb1' :
				   d > 250  ? '#8c96c6' :
				   d > 100  ? '#9ebcda' :
				   d > 50   ? '#bfd3e6' :
				   d > 25   ? '#e0ecf4' :
							 '#f7fcfd' ;
			
		}
		
var dataset;
function getState(cidade){
	d3.json("https://gist.githubusercontent.com/letanure/3012978/raw/36fc21d9e2fc45c078e0e0e07cce3c81965db8f9/estados-cidades.json", function(err, data){
		if(err) console.log(err);
		for(var i = 0; i < data.estados.length; i++){
			for(var j = 0; j < data.estados[i].cidades.length; j++){
				if(data.estados[i].cidades[j] == cidade){  return data.estados[0].sigla;}
			}
		}
		dataset = data;
		
	});
	
}
	var dataMap;
	d3.json("https://visualizacao-ufpe.github.io/data_vis_assignments/2017.2/data/geojs-100-mun.json.txt", function(err, data) {
		if(err) console.log(err);
		dataMap = data;
		var cloro;
		
		L.geoJson(data, {style: function(data){
			return {
				fillColor: getColor(getState(data.ocorrencia_cidade)),
				weight: 2,
				opacity:1,
				color: '',
				dashArray: '3',
				fillOpacity: 0.3
			};
		}}).addTo(mymap);
	});
	
	var legend = L.control({position: 'topright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 25, 50, 100, 250, 500, 750, 1000],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorLegend(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
	
    return div;
};

legend.addTo(mymap);
	