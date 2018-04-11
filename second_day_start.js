var dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
	       [410, 12], [475, 44], [25, 67], [85, 21], [220, 388]];

var svg = d3.select("svg");
var circleGroup = svg.append("g");
//var myBrush = circleGroup.attr("class", "brush");
//var brushGroup = svg.attr("call", "brush");

function updatePlot(){
	
    console.log("you should update your plot here");

    var circles = circleGroup.selectAll("circle").data(dataset);
    circles.exit().remove();

	circles.transition()
	//.duration(2000)
	//.delay(1000)
	.attr("cx",d=>d[0])
	.attr("cy",d=>d[1])
	.attr("r",5)
	//.attr("fill", "orange")
	;
	
    circles
	.enter()
	.append("circle")
	//.merge(circles)
	.attr("cx",d=>d[0])
	.attr("cy",d=>d[1])
	.attr("r",5).on("mouseover",function(){
	d3.select(this).attr("fill","orange");
    })
    .on("mouseout",function(){
	d3.select(this).attr("fill","black");
    })
    .on("click",function(){
	d3.select(this).attr("fill","red").attr("r",   function(){
														if(d3.select(this).attr("r") == 5){return 15;}
														else{return 5;}});
    });
    /**/
    var texts = d3.select("svg").selectAll("text").data(dataset);
    texts.exit().remove();

   /* texts
	.enter()
	.append("text")
	.attr("x",d=>d[0])
	.attr("y",d=>d[1])
	.text(d=>[Math.round(d[0],2),Math.round(d[1],2)])
	.attr("fill","red");

    texts
    	.attr("x",d=>d[0])
    	.attr("y",d=>d[1])
    	.text(d=>[Math.round(d[0],2),Math.round(d[1],2)])
    	.attr("fill","red");
	/**/

}

function eventoClique(){
    var numPoints =  Math.random()*10 + 1;
    dataset = [];
    
    for(var i = 0 ; i < numPoints ; ++i){
	var point = [Math.random()*500,Math.random()*500];
	dataset.push(point);
    }
    console.log(dataset.length);
    updatePlot();
}