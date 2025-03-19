document.addEventListener('DOMContentLoaded', function() {
  // Sample data matching the screenshot
  const data = [
    { month: 1, sales: 250, color: "#6b6363" },
    { month: 2, sales: 270, color: "#a39e9e" },
    { month: 3, sales: 240, color: "#e06a8e" },
    { month: 4, sales: 196, color: "#f7c1d7" },
    { month: 5, sales: 215, color: "#a16a9c" },
    { month: 6, sales: 230, color: "#d9a6d9" },
    { month: 7, sales: 272, color: "#8d6347" },
    { month: 8, sales: 367, color: "#c1a78f" },
    { month: 9, sales: 433, color: "#3d8a8a" },
    { month: 10, sales: 520, color: "#7ec3c3" },
    { month: 11, sales: 650, color: "#e05d5d" },
    { month: 12, sales: 750, color: "#f7a0a0" }
  ];
  
  // Set up dimensions
  const margin = { top: 70, right: 30, bottom: 70, left: 60 };
  let width = Math.max(800, window.innerWidth * 0.8) - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  // Create SVG
  const svg = d3.select("#bar-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Create scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([0, width])
    .padding(0.3);
  
  const y = d3.scaleLinear()
    .domain([0, 800]) // Fixed domain to match the screenshot
    .range([height, 0]);
  
  // Add X axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x)
      .tickFormat(d => `Tháng ${d.toString().padStart(2, '0')}`))
    .selectAll("text")
    .style("font-size", "12px")
    .style("text-anchor", "middle");
  
  // Add Y axis
  svg.append("g")
    .call(d3.axisLeft(y)
      .tickFormat(d => d === 0 ? "0" : `${d}M`)
      .ticks(8))
    .selectAll("text")
    .style("font-size", "12px");
  
  // Add horizontal grid lines
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat("")
      .ticks(8))
    .attr("stroke", "#e5e7eb")
    .attr("stroke-opacity", 0.7);
  
  // Add bars
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.month))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d.sales))
    .attr("height", d => height - y(d.sales))
    .attr("fill", d => d.color);
  
  // Add sales values on top of each bar
  svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.month) + x.bandwidth() / 2)
    .attr("y", d => y(d.sales) - 10)
    .text(d => `${d.sales} triệu VND`);
  
  // Add title
  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Doanh số bán hàng theo Tháng");
  
  // Make chart responsive
  function resize() {
    const newWidth = Math.max(800, window.innerWidth * 0.8) - margin.left - margin.right;
    
    // Update SVG dimensions
    d3.select("#bar-chart")
      .attr("width", newWidth + margin.left + margin.right);
    
    // Update x scale
    x.range([0, newWidth]);
    
    // Update bars
    svg.selectAll(".bar")
      .attr("x", d => x(d.month))
      .attr("width", x.bandwidth());
    
    // Update labels
    svg.selectAll(".label")
      .attr("x", d => x(d.month) + x.bandwidth() / 2);
    
    // Update grid lines
    svg.select(".grid")
      .call(d3.axisLeft(y)
        .tickSize(-newWidth)
        .tickFormat("")
        .ticks(8));
    
    // Update title position
    svg.select(".title")
      .attr("x", newWidth / 2);
    
    // Update width variable for future use
    width = newWidth;
  }
  
  // Add resize listener
  window.addEventListener("resize", resize);
});