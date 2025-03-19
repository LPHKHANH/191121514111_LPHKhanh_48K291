const data = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 300) + 50 // Tạo dữ liệu ngẫu nhiên
}));

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const x = d3.scaleBand()
    .domain(data.map(d => d.day))
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
    .attr("x", d => x(d.day))
    .attr("y", d => y(d.sales))
    .attr("height", d => height - margin.bottom - y(d.sales))
    .attr("width", x.bandwidth());

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(d => `Ngày ${d}`));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
