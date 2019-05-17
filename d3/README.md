# d3学习笔记（1）—— 


添加图片为节点
 var images = nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) { return d.img;})
        .attr("x", function(d) { return -25;})
        .attr("y", function(d) { return -25;})
        .attr("height", 50)
        .attr("width", 50);

svg.append('svg:image')
.attr({
  'xlink:href': 'http://www.iconpng.com/png/beautiful_flat_color/computer.png',  // can also add svg file here
  x: 0,
  y: 0,
  width: 128,
  height: 128
});