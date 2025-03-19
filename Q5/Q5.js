document.addEventListener('DOMContentLoaded', function() {
  // Sample data matching the screenshot
  const data = [
    { day: 1, sales: 12.7, color: "#5b9bd5" },
    { day: 2, sales: 13.6, color: "#ed7d31" },
    { day: 3, sales: 13.5, color: "#70ad47" },
    { day: 4, sales: 12.9, color: "#ffc000" },
    { day: 5, sales: 13.2, color: "#5b9bd5" },
    { day: 6, sales: 13.6, color: "#ed7d31" },
    { day: 7, sales: 14.0, color: "#70ad47" },
    { day: 8, sales: 12.8, color: "#4472c4" },
    { day: 9, sales: 12.2, color: "#ed5353" },
    { day: 10, sales: 13.0, color: "#a5a5a5" },
    { day: 11, sales: 13.7, color: "#ff9fb4" },
    { day: 12, sales: 13.5, color: "#b266ff" },
    { day: 13, sales: 14.1, color: "#b266ff" },
    { day: 14, sales: 13.1, color: "#8a5a44" },
    { day: 15, sales: 12.6, color: "#5b9bd5" },
    { day: 16, sales: 12.9, color: "#ed7d31" },
    { day: 17, sales: 13.5, color: "#70ad47" },
    { day: 18, sales: 13.0, color: "#a2ad00" },
    { day: 19, sales: 12.1, color: "#a2ad00" },
    { day: 20, sales: 12.4, color: "#5b9bd5" },
    { day: 21, sales: 13.0, color: "#5aafb0" },
    { day: 22, sales: 11.7, color: "#ed5353" }
  ];
  
  // Add remaining days to complete the month (if needed)
  for (let i = data.length + 1; i <= 31; i++) {
    // Generate random sales between 11.5 and 14.5
    const randomSales = (Math.random() * 3 + 11.5).toFixed(1);
    data.push({
      day: i,
      sales: parseFloat(randomSales),
      color: ["#5b9bd5", "#ed7d31", "#70ad47", "#ffc000", "#4472c4", "#ed5353", "#a5a5a5"][Math.floor(Math.random() * 7)]
    });
  }
  
  // Set up dimensions
  const margin = { top: 70, right: 30, bottom: 70, left: 60 };
  let width = Math.max(1000, window.innerWidth * 0.8) - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  // Create SVG
  const svg = d3.select("#bar-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Create scales
  const x = d3.scaleBand()
    .domain(data.map(d => d.day))
    .range([0, width])
    .padding(0.2);
  
  const y = d3.scaleLinear()
    .domain([0, 16]) // Fixed domain to match the screenshot
    .range([height, 0]);
  
  // Add X axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("font-size", "12px")
    .style("text-anchor", "middle");
  
  // Add Y axis
  svg.append("g")
    .call(d3.axisLeft(y)
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
    .attr("x", d => x(d.day))
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
    .attr("x", d => x(d.day) + x.bandwidth() / 2)
    .attr("y", d => y(d.sales) - 5)
    .text(d => d.sales);
  
  // Add title
  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Doanh số bán hàng trung bình theo Ngày trong tháng");
  
  // Make chart responsive
  function resize() {
    const newWidth = Math.max(1000, window.innerWidth * 0.8) - margin.left - margin.right;
    
    // Update SVG dimensions
    d3.select("#bar-chart")
      .attr("width", newWidth + margin.left + margin.right);
    
    // Update x scale
    x.range([0, newWidth]);
    
    // Update bars
    svg.selectAll(".bar")
      .attr("x", d => x(d.day))
      .attr("width", x.bandwidth());
    
    // Update labels
    svg.selectAll(".label")
      .attr("x", d => x(d.day) + x.bandwidth() / 2);
    
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