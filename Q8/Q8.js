const data = [
    { month: "Jan", categories: { "Đồ uống": 30, "Bánh ngọt": 20, "Thực phẩm": 25, "Sữa": 15, "Trà": 10 } },
    { month: "Feb", categories: { "Đồ uống": 35, "Bánh ngọt": 25, "Thực phẩm": 20, "Sữa": 10, "Trà": 10 } },
    { month: "Mar", categories: { "Đồ uống": 40, "Bánh ngọt": 20, "Thực phẩm": 15, "Sữa": 15, "Trà": 10 } }
];

const categories = ["Đồ uống", "Bánh ngọt", "Thực phẩm", "Sữa", "Trà"];
const colors = d3.scaleOrdinal(d3.schemeCategory10);

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const x0 = d3.scaleBand()
    .domain(data.map(d => d.month))
    .range([margin.left, width - margin.right])
    .padding(0.2);

const x1 = d3.scaleBand()
    .domain(categories)
    .range([0, x0.bandwidth()])
    .padding(0.05);

const y = d3.scaleLinear()
    .domain([0, 50])
    .nice()
    .range([height - margin.bottom, margin.top]);

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", d => `translate(${x0(d.month)},0)`)
    .selectAll("rect")
    .data(d => categories.map(category => ({ category, value: d.categories[category] })))
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x1(d.category))
    .attr("y", d => y(d.value))
    .attr("width", x1.bandwidth())
    .attr("height", d => height - margin.bottom - y(d.value))
    .attr("fill", d => colors(d.category));

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
