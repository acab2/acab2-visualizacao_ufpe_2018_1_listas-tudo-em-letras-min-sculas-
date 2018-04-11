var container = d3.select("svg");
var widgetID = "scat1";
var screenX = 0;
var screenY = 0;
var totalWidth = 200;
var totalHeight = 200;

var dataset = [[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
	       [410, 12], [475, 44], [25, 67], [85, 21], [220, 388]];

var scatterplot = new Scatterplot(container,widgetID,screenX,screenY,totalWidth,totalHeight);
scatterplot.setData(dataset);

var scatterplot = new Scatterplot(container,"scat2",310,0,totalWidth,totalHeight);
scatterplot.setData(dataset);