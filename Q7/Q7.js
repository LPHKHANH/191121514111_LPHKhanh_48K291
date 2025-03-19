const data = [
    { category: "Đồ uống", value: 35 },
    { category: "Bánh ngọt", value: 25 },
    { category: "Thực phẩm", value: 20 },
    { category: "Sữa", value: 10 },
    { category: "Trà", value: 10 }
];

const width = 500;
const height = 500;
const radius = Math.min(width, height) / 2;

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

const color = d3.scaleOrdinal(d3.schemeCategory10);

const pie = d3.pie()
    .value(d => d.value);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius - 10);

const arcs = svg.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
    .attr("class", "arc");

arcs.append("path")
    .attr("d", arc)
    .attr("fill", d => color(d.data.category));

arcs.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data.category);
