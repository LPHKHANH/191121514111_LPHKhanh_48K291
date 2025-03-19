const data = [
    { category: "Đồ uống", sales: 300 },
    { category: "Bánh ngọt", sales: 150 },
    { category: "Thực phẩm", sales: 200 },
    { category: "Sữa", sales: 180 },
    { category: "Trà", sales: 250 }
];

const width = 600;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const x = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([margin.left, width - margin.right])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales)])
    .nice()
    .range([height - margin.bottom, margin.top]);

svg.append("g")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.category))
    .attr("y", d => y(d.sales))
    .attr("height", d => height - margin.bottom - y(d.sales))
    .attr("width", x.bandwidth());

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
