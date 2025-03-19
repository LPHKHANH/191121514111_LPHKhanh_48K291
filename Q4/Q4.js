const data = [
    { day: "Thứ Hai", sales: 180 },
    { day: "Thứ Ba", sales: 150 },
    { day: "Thứ Tư", sales: 200 },
    { day: "Thứ Năm", sales: 220 },
    { day: "Thứ Sáu", sales: 250 },
    { day: "Thứ Bảy", sales: 300 },
    { day: "Chủ Nhật", sales: 280 }
];

const width = 700;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 100 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const y = d3.scaleBand()
    .domain(data.map(d => d.day))
    .range([margin.top, height - margin.bottom])
    .padding(0.2);

const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales)])
    .nice()
    .range([margin.left, width - margin.right]);

svg.append("g")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("y", d => y(d.day))
    .attr("x", margin.left)
    .attr("height", y.bandwidth())
    .attr("width", d => x(d.sales) - margin.left);

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
