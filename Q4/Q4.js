document.addEventListener('DOMContentLoaded', function() {
  // Sample data matching the screenshot
  const data = [
    { day: "Thứ Hai", sales: 11890000, color: "#4a7ebb" },
    { day: "Thứ Ba", sales: 11763000, color: "#f0913d" },
    { day: "Thứ Tư", sales: 12302000, color: "#e05d5d" },
    { day: "Thứ Năm", sales: 12696000, color: "#5aafb0" },
    { day: "Thứ Sáu", sales: 13419000, color: "#5fa55a" },
    { day: "Thứ Bảy", sales: 14355000, color: "#e9d22f" },
    { day: "Chủ Nhật", sales: 13768000, color: "#b76db4" }
  ];
  
  // Set up dimensions
  const margin = { top: 70, right: 30, bottom: 70, left: 80 };
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
    .domain(data.map(d => d.day))
    .range([0, width])
    .padding(0.3);
  
  const y = d3.scaleLinear()
    .domain([0, 15000000]) // Fixed domain to match the screenshot
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
      .tickFormat(d => d === 0 ? "0" : `${d/1000000}M`)
      .ticks(8))
    .selectAll("text")
    .style("font-size", "12px");
  
  // Add Y axis label
  svg.append("text")
    .attr("class", "y-axis-label")
    .attr("x", -height / 2)
    .attr("y", -60)
    .text("Doanh số (triệu VND)");
  
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
  
  // Format number with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Add sales values on top of each bar
  svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => x(d.day) + x.bandwidth() / 2)
    .attr("y", d => y(d.sales) - 10)
    .text(d => `${formatNumber(d.sales)} VND`);
  
  // Add title
  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Doanh số bán hàng trung bình theo Ngày trong tuần");
  
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