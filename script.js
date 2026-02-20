// Setting up sizes
const width = 600;
const height = 400;

const margin = {
  top: 40,
  right: 40,
  bottom: 50,
  left: 60
};

let globalData;
let updateBar;

// Loading data
d3.csv("data/chocolate_sales.csv").then(data => {

  // Convert numeric fields
  data.forEach(d => {
    d.Amount = +d.Amount;
    d["Boxes Shipped"] = +d["Boxes Shipped"];
  });

  createScatter(data);
  createBar(data);

});


// Scatterplot
function createScatter(data){

  globalData = data;

  const svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Scales
  const x = d3.scaleLinear()
    .domain(d3.extent(data, d => d["Boxes Shipped"]))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Amount))
    .range([height - margin.bottom, margin.top]);

  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Points
  const dots = svg.selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class","dot")
    .attr("cx", d => x(d["Boxes Shipped"]))
    .attr("cy", d => y(d.Amount))
    .attr("r",4);


  // Brushing (for the scatterplot)
  const brush = d3.brush()
    .extent([
      [margin.left, margin.top],
      [width-margin.right, height-margin.bottom]
    ])
    .on("brush end", brushed);

  svg.append("g")
    .call(brush);


  // Brush function (linking)
  function brushed(event){

    if (!event.selection) {
      dots.classed("selected", false);
      updateBar(globalData);
      return;
    }

    const [[x0,y0],[x1,y1]] = event.selection;

    const selected = [];

    dots.classed("selected", d => {

      const cx = x(d["Boxes Shipped"]);
      const cy = y(d.Amount);

      const isSelected =
        x0 <= cx && cx <= x1 &&
        y0 <= cy && cy <= y1;

      if(isSelected) selected.push(d);

      return isSelected;
    });

    // Linked update
    updateBar(selected);
  }
}


// Bar Chart (linked view)
function createBar(data){

  const svg = d3.select("#bar")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Function accessible globally
  updateBar = function(filteredData){

    // Clear old chart
    svg.selectAll("*").remove();

    // Aggregate sales by country
    const grouped = d3.rollups(
      filteredData,
      v => d3.sum(v, d => d.Amount),
      d => d.Country
    );

    // Scales
    const x = d3.scaleBand()
      .domain(grouped.map(d => d[0]))
      .range([margin.left, width-margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(grouped, d=>d[1])])
      .nice()
      .range([height-margin.bottom, margin.top]);

    // Bars
    svg.selectAll(".bar")
      .data(grouped)
      .enter()
      .append("rect")
      .attr("class","bar")
      .attr("x", d=>x(d[0]))
      .attr("y", d=>y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", d=>height-margin.bottom-y(d[1]));

    // Axes
    svg.append("g")
      .attr("transform",`translate(0,${height-margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform",`translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  };

  // Initial render
  updateBar(data);
}
