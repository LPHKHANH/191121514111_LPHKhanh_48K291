document.addEventListener('DOMContentLoaded', function() {
  // Sample data matching the screenshot
  const data = [
    { id: "BOT01", name: "Bột cần tây", group: "BOT", groupName: "Bột", sales: 626 },
    { id: "THO06", name: "Trà nhụy hoa nghệ tây", group: "THO", groupName: "Trà hoa", sales: 592 },
    { id: "TTC01", name: "Trà gừng", group: "TTC", groupName: "Trà cỏ, quả sấy", sales: 433 },
    { id: "THO03", name: "Trà hoa cúc trắng", group: "THO", groupName: "Trà hoa", sales: 421 },
    { id: "TTC02", name: "Cam lát", group: "TTC", groupName: "Trà cỏ, quả sấy", sales: 367 },
    { id: "TMX01", name: "Trà đường nhan", group: "TMX", groupName: "Trà mix", sales: 317 },
    { id: "THO01", name: "Trà nụ hoa nhài trắng", group: "THO", groupName: "Trà hoa", sales: 290 },
    { id: "THO02", name: "Trà hoa đậu biếc", group: "THO", groupName: "Trà hoa", sales: 279 },
    { id: "TMX02", name: "Trà cam sả quế", group: "TMX", groupName: "Trà mix", sales: 250 },
    { id: "SET03", name: "Set 10 gói trà hoa cúc trắng", group: "SET", groupName: "Set trà", sales: 244 },
    { id: "SET02", name: "Set 10 gói trà hoa đậu biếc", group: "SET", groupName: "Set trà", sales: 159 },
    { id: "THO04", name: "Trà nụ hoa hồng Tây Tạng", group: "THO", groupName: "Trà hoa", sales: 150 },
    { id: "THO05", name: "Trà hoa Atiso", group: "THO", groupName: "Trà hoa", sales: 144 },
    { id: "TMX03", name: "Trà gạo lứt 8 vị", group: "TMX", groupName: "Trà mix", sales: 130 },
    { id: "SET01", name: "Set 10 gói trà nụ hoa nhài trắng", group: "SET", groupName: "Set trà", sales: 115 },
    { id: "SET05", name: "Set 10 gói trà đường nhan", group: "SET", groupName: "Set trà", sales: 98 },
    { id: "SET04", name: "Set 10 gói trà gừng", group: "SET", groupName: "Set trà", sales: 80 },
    { id: "SET07", name: "Set 10 gói trà cam sả quế", group: "SET", groupName: "Set trà", sales: 50 },
    { id: "SET06", name: "Set 10 gói trà gạo lứt 8 vị", group: "SET", groupName: "Set trà", sales: 32 },
  ];
  
  // Sort data by sales in descending order
  data.sort((a, b) => b.sales - a.sales);
  
  // Define color scheme for product groups
  const colorScale = d3.scaleOrdinal()
    .domain(["BOT", "SET", "THO", "TMX", "TTC"])
    .range(["#4a7ebb", "#f0913d", "#e05d5d", "#5aafb0", "#5fa55a"]);
  
  // Set up dimensions
  const margin = { top: 50, right: 180, bottom: 50, left: 220 };
  let width = Math.max(800, window.innerWidth * 0.8) - margin.left - margin.right;
  const height = data.length * 30 + margin.top + margin.bottom;
  
  // Create SVG
  const svg = d3.select("#bar-chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  
  // Create scales
  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales) || 700])
    .range([0, width]);
  
  const y = d3.scaleBand()
    .domain(data.map(d => d.id))
    .range([0, height - margin.top - margin.bottom])
    .padding(0.3);
  
  // Add X axis
  svg.append("g")
    .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
    .call(d3.axisBottom(x)
      .tickFormat(d => `${d}M`)
      .ticks(8))
    .selectAll("text")
    .style("font-size", "12px");
  
  // Add Y axis with product names
  svg.append("g")
    .call(d3.axisLeft(y).tickSize(0))
    .selectAll(".tick text")
    .text(d => {
      const product = data.find(p => p.id === d);
      return product ? `[${product.id}] ${product.name}` : d;
    })
    .style("font-size", "12px")
    .style("text-anchor", "end")
    .attr("dx", "-0.5em");
  
  // Remove Y axis line
  svg.selectAll(".domain").attr("stroke", "#e5e7eb");
  
  // Add horizontal grid lines
  svg.append("g")
    .attr("class", "grid")
    .call(d3.axisBottom(x)
      .tickSize(height - margin.top - margin.bottom)
      .tickFormat(() => "")
      .ticks(8))
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
    .attr("width", d => x(d.sales))
    .attr("fill", d => colorScale(d.group));
  
  // Add sales values at the end of each bar
  svg.selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("y", d => (y(d.id) || 0) + y.bandwidth() / 2 + 4)
    .attr("x", d => x(d.sales) + 5)
    .text(d => `${d.sales} triệu VND`);
  
  // Add title
  svg.append("text")
    .attr("class", "title")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2)
    .attr("text-anchor", "middle")
    .text("Doanh số bán hàng theo Mặt hàng");
  
  // Add legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width + 20}, 0)`);
  
  // Legend title
  legend.append("text")
    .attr("class", "legend-title")
    .attr("x", 0)
    .attr("y", -10)
    .text("Nhóm hàng");
  
  // Group data by group for legend
  const groups = Array.from(new Set(data.map(d => d.group))).map(group => {
    const item = data.find(d => d.group === group);
    return {
      group,
      groupName: item?.groupName || ""
    };
  });
  
  // Add legend items
  const legendItems = legend.selectAll(".legend-item")
    .data(groups)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 25})`);
  
  // Add colored rectangles
  legendItems.append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("fill", d => colorScale(d.group));
  
  // Add group names
  legendItems.append("text")
    .attr("class", "legend-text")
    .attr("x", 25)
    .attr("y", 12)
    .text(d => `[${d.group}] ${d.groupName}`);
  
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
      .attr("width", d => x(d.sales));
    
    // Update labels
    svg.selectAll(".label")
      .attr("x", d => x(d.sales) + 5);
    
    // Update grid lines
    svg.select(".grid")
      .call(d3.axisBottom(x)
        .tickSize(height - margin.top - margin.bottom)
        .tickFormat(() => "")
        .ticks(8));
    
    // Update title position
    svg.select(".title")
      .attr("x", newWidth / 2);
    
    // Update legend position
    legend.attr("transform", `translate(${newWidth + 20}, 0)`);
    
    // Update width variable for future use
    width = newWidth;
  }
  
  // Add resize listener
  window.addEventListener("resize", resize);
});