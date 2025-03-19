document.addEventListener('DOMContentLoaded', function() {
  // Sample data matching the screenshot
  const data = [
    { id: "TMX", name: "Trà mix", rate: 54.5, color: "#5aafb0" },
    { id: "THO", name: "Trà hoa", rate: 54.4, color: "#e05d5d" },
    { id: "TTC", name: "Trà cỏ, quả sấy", rate: 53.3, color: "#5fa55a" },
    { id: "BOT", name: "Bột", rate: 40.3, color: "#4a7ebb" },
    { id: "SET", name: "Set trà", rate: 23.9, color: "#f0913d" }
  ];
  
  // Sort data by rate in descending order
  data.sort((a, b) => b.rate - a.rate);
  
  // Set up dimensions
  const margin = { top: 50, right: 120, bottom: 50, left: 150 };
  let width = Math.max(800, window.innerWidth * 0.8) - margin.left - margin.right;
  const height = data.length * 80 + margin.top + margin.bottom;
  
  // Create SVG
  const svg = d3.select("#bar-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Create scales
  const x = d3.scaleLinear()
    .domain([0, 60]) // Fixed domain to match the screenshot
    .range([0, width]);
  
  const y = d3.scaleBand()
    .domain(data.map(d => d.id))
    .range([0, height - margin.top - margin.bottom])
    .padding(0.4);
  
  // Add X axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x)
      .tickFormat(d => `${d}%`)
      .ticks(6))
    .selectAll("text")
    .style("font-size", "12px");
  
  // Add Y axis with product group names
  svg.append("g")
    .call(d3.axisLeft(y).tickSize(0))
    .selectAll(".tick text")
    .text(d => {
      const group = data.find(p => p.id === d);
      return group ? `[${group.id}] ${group.name}` : d;
    })
    .style("font-size", "12px")
    .style("text-anchor", "end")
    .attr("dx", "-0.5em");
  
  // Remove Y axis line
  svg.selectAll(".domain").attr("stroke", "#e5e7eb");
  
  // Add vertical grid lines
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisBottom(x)
      .tickSize(height - margin.top - margin.bottom)
      .tickFormat("")
      .ticks(6))
    .attr("stroke", "#e5e7eb")
    .attr("stroke-opacity", 0.7);
  
  // Add bars
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("y", d => y(d.id) || 0)
    .attr("height", y.bandwidth())
    .attr("x", 0)
    .attr("width", d => x(d.rate))
    .attr("fill", d => d.color);
  
  // Add rate values at the end of each bar
  svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("y", d => (y(d.id) || 0) + y.bandwidth() / 2 + 4)
    .attr("x", d => x(d.rate) + 5)
    .text(d => `${d.rate}%`);
  
  // Add title
  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Xác suất bán hàng theo Nhóm hàng");
  
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
      .attr("width", d => x(d.rate));
    
    // Update labels
    svg.selectAll(".label")
      .attr("x", d => x(d.rate) + 5);
    
    // Update grid lines
    svg.select(".grid")
      .call(d3.axisBottom(x)
        .tickSize(height - margin.top - margin.bottom)
        .tickFormat("")
        .ticks(6));
    
    // Update title position
    svg.select(".title")
      .attr("x", newWidth / 2);
    
    // Update width variable for future use
    width = newWidth;
  }
  
  // Add resize listener
  window.addEventListener("resize", resize);
});