document.addEventListener('DOMContentLoaded', function() {
  // Sample data matching the screenshot
  const data = [
    { timeSlot: "08:00-09:59", sales: 771114, color: "#4a7ebb" },
    { timeSlot: "10:00-11:59", sales: 746272, color: "#a8d7f0" },
    { timeSlot: "12:00-13:59", sales: 760585, color: "#ed7d31" },
    { timeSlot: "14:00-15:59", sales: 770584, color: "#ffbe7d" },
    { timeSlot: "16:00-17:59", sales: 877651, color: "#70ad47" },
    { timeSlot: "18:00-19:59", sales: 779131, color: "#a9d18e" },
    { timeSlot: "20:00-21:59", sales: 753330, color: "#b7a52a" },
    { timeSlot: "22:00-23:59", sales: 764376, color: "#ffe699" },
    { timeSlot: "00:00-01:59", sales: 817778, color: "#31859c" },
    { timeSlot: "02:00-03:59", sales: 830000, color: "#4bacc6" },
    { timeSlot: "04:00-05:59", sales: 865000, color: "#f44336" },
    { timeSlot: "06:00-07:59", sales: 850563, color: "#ff7961" },
    { timeSlot: "08:00-09:59", sales: 842353, color: "#795548" },
    { timeSlot: "10:00-11:59", sales: 832353, color: "#a1887f" },
    { timeSlot: "12:00-13:59", sales: 862726, color: "#e91e63" },
    { timeSlot: "14:00-15:59", sales: 852726, color: "#f48fb1" }
  ];
  
  // Set up dimensions
  const margin = { top: 70, right: 30, bottom: 100, left: 80 };
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
    .domain(data.map(d => d.timeSlot))
    .range([0, width])
    .padding(0.2);
  
  const y = d3.scaleLinear()
    .domain([0, 900000]) // Fixed domain to match the screenshot
    .range([height, 0]);
  
  // Add X axis
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("font-size", "11px")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-45)");
  
  // Add Y axis
  svg.append("g")
    .call(d3.axisLeft(y)
      .tickFormat(d => d === 0 ? "0" : `${d/1000}K`)
      .ticks(9))
    .selectAll("text")
    .style("font-size", "11px");
  
  // Add horizontal grid lines
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat("")
      .ticks(9))
    .attr("stroke", "#e5e7eb")
    .attr("stroke-opacity", 0.7);
  
  // Add bars
  svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.timeSlot))
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
    .attr("x", d => x(d.timeSlot) + x.bandwidth() / 2)
    .attr("y", d => y(d.sales) - 10)
    .text(d => `${formatNumber(d.sales)} VND`);
  
  // Add title
  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Doanh số bán hàng trung bình theo Khung giờ");
  
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
      .attr("x", d => x(d.timeSlot))
      .attr("width", x.bandwidth());
    
    // Update labels
    svg.selectAll(".label")
      .attr("x", d => x(d.timeSlot) + x.bandwidth() / 2);
    
    // Update grid lines
    svg.select(".grid")
      .call(d3.axisLeft(y)
        .tickSize(-newWidth)
        .tickFormat("")
        .ticks(9));
    
    // Update title position
    svg.select(".title")
      .attr("x", newWidth / 2);
    
    // Update width variable for future use
    width = newWidth;
  }
  
  // Add resize listener
  window.addEventListener("resize", resize);
});