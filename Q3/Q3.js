const data = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 180 },
    { month: "Mar", sales: 160 },
    { month: "Apr", sales: 200 },
    { month: "May", sales: 240 },
    { month: "Jun", sales: 220 },
    { month: "Jul", sales: 260 },
    { month: "Aug", sales: 280 },
    { month: "Sep", sales: 300 },
    { month: "Oct", sales: 320 },
    { month: "Nov", sales: 340 },
    { month: "Dec", sales: 360 }
];

const width = 700;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const x = d3.scalePoint()
    .domain(data.map(d => d.month))
    .range([margin.left, width - margin.right])
    .padding(0.5);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales)])
    .nice()
    .range([height - margin.bottom, margin.top]);

const line = d3.line()
    .x(d => x(d.month))
    .y(d => y(d.sales));

svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

svg.selectAll(".circle")
    .data(data)
    .enter().append("circle")
    .attr("class", "circle")
    .attr("cx", d => x(d.month))
    .attr("cy", d => y(d.sales))
    .attr("r", 4);

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
