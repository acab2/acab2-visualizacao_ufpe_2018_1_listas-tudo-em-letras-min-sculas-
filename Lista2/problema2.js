var selectGol = false;
var selectTam = false;
var selectAzul = false;

var dataset = function(){
	var data = [];
	var qtdGol = 0;
	var qtdTam = 0;
	var qtdAzul = 0;
	
	for(i=0;i<1248;i++){
		if(trips[i].carrier == "Gol"){
			qtdGol++;
		}else if(trips[i].carrier == "Tam"){
			qtdTam++;
		}else{
			qtdAzul++;
		}
		
	}
	
	data.push({"carrier":"Gol", "quantity": qtdGol});
	data.push({"carrier":"Tam", "quantity": qtdTam});
	data.push({"carrier":"Azul", "quantity": qtdAzul});
	
	return data;
	
}

var dataset3 = [];

var dataset2f = function(){

	var datePost = "";
    var dateStart = "";
	dataset3 = [];
	for(i=0;i<1248;i++){
		datePost = (trips[i].post).split('/');
		dateStart = (trips[i].start).split('/');
		
		qtdDays = ((new Date(dateStart[2], dateStart[1]-1, dateStart[0])) - (new Date(datePost[2], datePost[1]-1, datePost[0]))) / 86400000;
		if(trips[i].carrier == "Gol" && selectGol){
			dataset3.push([qtdDays,trips[i].price]);
		}
		if(trips[i].carrier == "Tam" && selectTam){
			dataset3.push([qtdDays,trips[i].price]);
		}
		if(trips[i].carrier == "Azul" && selectAzul){
			dataset3.push([qtdDays, trips[i].price]);
		}
		
	}
}

var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 600	 - margin.left - margin.right // Use the window's width 
  , height = 500 - margin.top - margin.bottom; // Use the window's height

var xScale = d3.scaleOrdinal().domain(["","Gol", "Tam", "Azul"]).range([0,100,200,300,400, width]);
var yScale = d3.scaleLinear().domain([0, 600]).range([height, 0]);
  
 
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + " )");
	
	svg.append("g").attr("transform", "translate(0," + (-height) + ")");

	svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

	svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale)); 
	
	svg.append("g").append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + (margin.top + height - 5) + ")")
      .style("text-anchor", "middle")
      .text("Carrier");
	  
	svg.append("g").append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left - 5)
      .attr("x",0 + (height / 2) -height)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Travels"); 
	
	svg.append("g").selectAll(".bar")
      .data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.carrier)-25; })
      .attr("width", 50)
      .attr("y", function(d) { return yScale(d.quantity); })
      .attr("height", function(d) { return height - yScale(d.quantity); })
	  .attr("fill","#fbb4ae")
	  .on("click", function(d,i){
		  if(d3.select(this).attr("fill") == "red"){d3.select(this).attr("fill","#fbb4ae");}
		  else{d3.select(this).attr("fill","red");}
		  
            if(d.carrier == "Gol" && selectGol == false){ selectGol = true;}
			else if(d.carrier == "Gol" && selectGol == true){ selectGol = false;}
			else if(d.carrier == "Tam" && selectTam == false){ selectTam = true; }
			else if(d.carrier == "Tam" && selectTam == true){ selectTam = false;}
			else if(d.carrier == "Azul" && selectAzul == false){ selectAzul = true; }
			else if(d.carrier == "Azul" && selectAzul == true){ selectAzul = false;}
			
			updatePlot();

        });;
	
var xScale2 = d3.scaleLinear().domain([0, 400]).range([0, width]);
var yScale2 = d3.scaleLinear().domain([0, 1800]).range([height, 0]);
  
var svg2 = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + (margin.top + height) +" )");
	
	svg2.append("g")
    .attr("class", "x axis")
    .call(d3.axisBottom(xScale2)); 
	
	svg2.append("g")
	.attr("transform", "translate(0," + (-height) + ")")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale2)); // Create an axis component with d3.axisLeft
	
	svg2.append("g").append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + (margin.top - 5) + ")")
      .style("text-anchor", "middle")
      .text("Start - Post");
	
	svg2.append("g").append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left - 5)
      .attr("x",0 + (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Price");  
	
	var dotGroup = svg2.append("g").attr("transform", "translate(0," + (-height) + ")");
	
function updatePlot(){
	dataset2f();
	
	dots = dotGroup.selectAll("circle").data(dataset3);
	dots.exit().remove();
	dots.enter().append("circle")
      .attr("r", 3)
      .attr("cx", d=> xScale2(d[0]))
      .attr("cy", d=> yScale2(d[1]))
	  .attr("fill", "steelblue");  
}
