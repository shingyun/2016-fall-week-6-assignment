console.log('6.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');

//Import data and parse
d3.csv('../data/olympic_medal_count.csv',parse, function(err,rows){
     console.table(rows);
     console.table(rows.medal);///?????
     //min max of Y
     /*var maxY=d3.max(rows,function(d){return d.medal}),
         minY=d3.min(rows,function(d){return d.medal});
     console.log(minY,maxY);
     //scaleY
     var scaleY=d3.scaleLinear()
          .domain([minY,maxY])
          .range([h,0]);*/

     //select data
     rows.sort(function(a,b){
        return b.medal-a.medal
     });
     console.table(rows);

     var fiveOfRows = rows.slice(0,5);
     console.table(fiveOfRows);

     //Map out X
     var x=fiveOfRows.map(function(d){
       return d.country   
     });
     console.log("domain",x);

     //scaleX
     /*var scaleX=d3.scaleLinear()
          .domain([0,x.length])
          .range([0,w]);

      console.log(x.length);*/

     /*var scaleX=d3.scaleOrdinal()
          .domain(x)
          .range([0,w]);*/

     var scaleX=d3.scaleBand()
          .domain(x)
          .range([0,w])
          .round(true)
          .padding(0.5);
          
     
     //new scaleY
     var newMaxY=d3.max(fiveOfRows,function(d){return d.medal}),
         newMinY=d3.min(fiveOfRows,function(d){return d.medal});
     console.log(newMinY,newMaxY);
     
     var newScaleY=d3.scaleLinear()
          .domain([0,120])
          .range([h,0]);
  
     //creat rect
     var rect = plot.selectAll("rect")
           .data(fiveOfRows)
           .enter()
           .append("rect")
           .attr("class","bar")
           .attr("x",function(d){return scaleX(d.country)})
           .attr("y",function(d){return newScaleY(d.medal)})
           .attr("width",50)
           .attr("height",function(d){ return h-newScaleY(d.medal)
             });
     //axisY
     var axisY = d3.axisLeft()
                   .scale(newScaleY)
                   .tickSize(-w);

     plot.append("g").attr("class","axis")
           .call(axisY);
     //axisX + text
     var axisX = d3.axisBottom()
                   .scale(scaleX)
                   .tickPadding(1);

     // nodes=plot.selectAll(".country")
     //     .data(fiveOfRows)
     //     .enter()
     //     .append("g")
     //     .attr("class","country")
     //     .attr("transform",function(d){
     //      return "translate("+scaleX(d.country)+","+h+")";
     //     })
     //     .call(axisX)
         // .append("text")
         // .text(function(d){return d.country});
      plot.append('g')
          .attr("class","country")
          .attr("transform","translate(0,"+h+")")
          .call(axisX);


     //text --> wrong method
     /*var nodes=plot.selectAll(".country")
         .data(fiveOfRows)
         .enter()
         .append("g")
         .attr("class","country")
         .attr("transform",function(d){
          return "translate("+scaleX(d.country)+","+(h+20)+")";
         })
     nodes.append("text")
          .text(function(d){return d.country});*/

});

 
function parse(d) {
  return {
  	medal: +d["2012"],
  	country: d["Country"]
  }

}



 
