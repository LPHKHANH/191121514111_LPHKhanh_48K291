const data = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    sales: Math.floor(Math.random() * 200) + 50 // Tạo dữ liệu ngẫu nhiên
}));

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const x = d3.scaleLinear()
    .domain([0, 23])
    .range([margin.left, width - margin.right]);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales)])
    .nice()
    .range([height - margin.bottom, margin.top]);

const line = d3.line()
    .x(d => x(d.hour))
    .y(d => y(d.sales));

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

svg.selectAll(".circle")
    .data(data)
    .enter().append("circle")
    .attr("class", "circle")
    .attr("cx", d => x(d.hour))
    .attr("cy", d => y(d.sales))
    .attr("r", 4);

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d => `${d}h`));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
