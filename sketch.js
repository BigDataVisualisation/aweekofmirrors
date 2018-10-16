var data = [];
var ready = false;

function setup() {
  createCanvas(800, 600);

  d3.csv("aweekofmirrors.csv", function(d) {

    return {
      time: +d.Time,
      weekday: d.Weekday,
      count: +d.Count
    };
  }).then(function(csv) {
    data = csv;
    ready = true;
   
  });

}

function draw() {
  
  if (!ready) {
    background(255, 0, 0);
    return;
  } else {
    background(255);
  }

  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var x = map(d.time, 0, 23, 0, 700) + 40;
    var y = 0;

    if (d.weekday == "Monday") {
      y = 0;
    } else if (d.weekday == "Tuesday") {
      y = 50;
    } else if (d.weekday == "Wednesday") {
      y = 100;
    } else if (d.weekday == "Thursday") {
      y = 150;
    } else if (d.weekday == "Friday") {
      y = 200;
    } else if (d.weekday == "Saturday") {
      y = 250;
    } else if (d.weekday == "Sunday") {
      y = 300;
    }


    y = y + 100;
    //center point
    stroke(0);
    ellipse(x, y, 5, 5);

    //get the largest count
    let maxCount = d3.max(data,function(d){
      return d.count;
    });

    // Kreis für Anzahl Spiegel
    for (var j = 1; j <= d.count; j++) {
      var val = map(j, 0, maxCount, 0, 100);
      noFill();
      stroke('steelblue');
      ellipse(x, y, val, val);
    }
  }
}