function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var margin = { top: 50, right: 300, bottom: 50, left: 50 },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xCat = "female",
    yCat = "male",
    colorCat = "domain";


$.getJSON("img/global-sum.json", function(download) {
    $("#images").append("<img class='card-img-top img-responsive' src='img/tile.jpg'>");
    $("#images").append("<img class='card-img-top img-responsive' style='position: absolute; max-width:40% !important; top:50%; left:50%; transform: translate(-50%,-50%)' src='img/average.jpg'>");
    var fm_sum = 0;
    var m_sum = 0;
    d3.json("img/global-sum.json", function(data) {
      console.log('csving')
      data.forEach(function(d) {
        d.female = +d.female;
        fm_sum += d.female;
        d.male = +d.male;
        m_sum += d.male;
      });
      
      $( "#global-fm" ).html(fm_sum);
      $( "#global-m" ).html(m_sum);

      var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
          xMin = d3.min(data, function(d) { return d[xCat]; }),
          xMin = xMin > 0 ? 0 : xMin,
          yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
          yMin = d3.min(data, function(d) { return d[yCat]; }),
          yMin = yMin > 0 ? 0 : yMin;

      x.domain([xMin, xMax]);
      y.domain([yMin, yMax]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .tickSize(-height);

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickSize(-width);

      var color = d3.scale.category10();

      var tip = d3.tip()
          .attr("class", "d3-tip")
          .offset([-10, 0])
          .html(function(d) {
            return d[colorCat] + "<br>" + xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
          });

      var zoomBeh = d3.behavior.zoom()
          .x(x)
          .y(y)
          .scaleExtent([0, 500])
          .on("zoom", zoom);

      var svg = d3.select("#scatter-global")
        .append("svg")
          .attr("width", outerWidth)
          .attr("height", outerHeight)
          //.attr("background", 'rgba(255, 255, 255, 0)')
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .call(zoomBeh);

      svg.call(tip);

      svg.append("rect")
          .attr("width", width)
          .attr("height", height);

      svg.append("g")
          .classed("x axis", true)
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .classed("label", true)
          .attr("x", width)
          .attr("y", margin.bottom - 10)
          .style("text-anchor", "end")
          .text(xCat);

      svg.append("g")
          .classed("y axis", true)
          .call(yAxis)
        .append("text")
          .classed("label", true)
          .attr("transform", "rotate(-90)")
          .attr("y", -margin.left)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(yCat);

      var objects = svg.append("svg")
          .classed("objects", true)
          .attr("width", width)
          .attr("height", height);

      objects.append("svg:line")
          .classed("axisLine hAxisLine", true)
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", width)
          .attr("y2", 0)
          .attr("transform", "translate(0," + height + ")");
      
      objects.append("svg:line")
          .classed("axisLine vAxisLine", true)
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", height);

      objects.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .classed("dot", true)
          .attr("r", function (d) { return 8; })
          .attr("transform", transform)
          .style("fill", function(d) { return color(d[colorCat]); })
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide);
      
      objects.selectAll(".myline")
          .data([[-1000,-1000,5000,5000]])
        .enter().append("line")
          .attr("x1", function(d){return x(d[0])})
          .attr("y1", function(d){return y(d[1])})
          .attr("x2", function(d){return x(d[2])})
          .attr("y2", function(d){return y(d[3])})
          .classed("myline", true)
          .attr("stroke-width", 2)
          .attr("stroke", "red")
          .attr("stroke-dasharray", "5,5")
        
      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .classed("legend", true)
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("circle")
          .attr("r", 3.5)
          .attr("cx", width + 20)
          .attr("fill", color);

      legend.append("text")
          .attr("x", width + 26)
          .attr("dy", ".35em")
          .text(function(d) { return d; });

      d3.select("input").on("click", change);

      function change() {
        console.log("cahnged")
      }

      function zoom() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
        objects.selectAll(".myline")
            .attr("x1", function(d){return x(d[0])})
            .attr("y1", function(d){return y(d[1])})
            .attr("x2", function(d){return x(d[2])})
            .attr("y2", function(d){return y(d[3])})
        svg.selectAll(".dot")
            .attr("transform", transform);
      }

      function transform(d) {
        return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
      }
      
    });
})