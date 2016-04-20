var d3 = require('d3');
var $ = require('jquery');

var errList = [];

function pushError () {
    errList.push(.8);
};

function graphPoints () {
    if (errList.length === 0) {
      return 0;
    } else {
      return errList.pop();
    }
};

function graphInitialize(node) {
    var n, data, x, y, line, svg, path, clipPath, xAxis;

    n = 400,
        //sets up array of 800 zeros
        data = d3.range( n ).map( function( n ){ return 0; } );

    var d3Node = d3.select(node);

    var margin = { top: 20, right: 40, bottom: 20, left: 40 },
        // width = 960 - margin.left - margin.right,
        // height = 500 - margin.top - margin.bottom;
        width = 0,
        height = 200 - margin.top - margin.bottom;        

    d3.select(window).on('resize', resize);

    function resize () {
        var w = node.parentElement ?
            node.parentElement.getBoundingClientRect().width :
            d3Node.style('width');

        // update width
        width = parseInt(w, 10);

        if (width > 80) {
            // console.log(width);
            width = width - margin.left - margin.right;

            // reset x range
            x.range([0, width]);

            xAxis
                .call(d3.svg.axis().scale(x).orient("bottom"));

            clipPath
                .attr("width", width)
                .attr("height", height);

            svg
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
        }
    }

    function update () {
        // width = node.parentElement.getBoundingClientRect().width;
        // console.log(width);
        // resize();
    }

    x = d3.scale.linear()
           .domain([1, n-2])
           .range([0, width]);

    y = d3.scale.linear()
            .domain([0, 1])
            .range([height, 0]);

    line = d3.svg.line()
            // .interpolate("basis")
            .x(function(d, i) { return x(i); })
            .y(function(d, i) { return y(d); });

    svg = d3Node.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    clipPath = svg.append("defs").append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("width", width)
            .attr("height", height);

    xAxis = svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + y(0) + ")")
            .call(d3.svg.axis().scale(x).orient("bottom"));

    svg.append("g")
            .attr("class", "y axis")
            .call(d3.svg.axis().scale(y).orient("left"));

    path = svg.append("g")
          .attr("clip-path", "url(#clip)")
          .append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line);

    function tick () {
        // push a new data point onto the back
        data.push( graphPoints() );

        // console.log( data );
        // debugger;

        // redraw the line, and slide it to the left
        path
            .attr("d", line)
            .attr("transform", null)
            .transition()
            .duration(200)
            .ease("linear")
            .attr("transform", "translate(" + x(0) + ",0)")
            .each("end", tick);

        // pop the old data point off the front
        data.shift();
    };

    return {
        tick: tick,
        resize: resize
    };
};

var errorCount = { userErrors: 0, appErrors:0 }

function updateCount( userErrors, appErrors) {

    errorCount.userErrors = userErrors;
    errorCount.appErrors = appErrors;

    if (errorCount.userErrors === 0)  {
        errorCount.userErrors = 1;
    };
}

function pieChart () { 
    var w = 300,              
    h = 300,                            
    r = 100,                            
    color = d3.scale.category20c();     


    var pieData = [{"label":"user", "value":errorCount.userErrors}, 
            {"label":"app", "value":errorCount.appErrors}]; 
    
    $('#pie-chart').html('');

    var vis = d3.select('#pie-chart')
        .append("svg:svg")              
        .data([pieData])                   
        .attr("width", w)           
        .attr("height", h)
        .append("svg:g")                
        .attr("transform", "translate(" + r + "," + r + ")");

    var arc = d3.svg.arc()              
        .outerRadius(r);

    var pie = d3.layout.pie()           
        .value(function(d) { return d.value; });

    var arcs = vis.selectAll("g.slice")      
        .data(pie)                          
        .enter()                            
        .append("svg:g")                
        .attr("class", "slice");

    arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) 
                .attr("d", arc);   

    arcs.append("svg:text")                                     
                .attr("transform", function(d) {                    
                    d.innerRadius = 0;
                    d.outerRadius = r;
                    return "translate(" + arc.centroid(d) + ")";        
                })
                .attr("text-anchor", "middle")                          
                .text(function(d, i) { return pieData[i].label; });        

}

module.exports = {
    graphInitialize: graphInitialize,
    pushError: pushError,
    pieChart: pieChart,
    updateCount: updateCount
}
