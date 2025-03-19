const purchaseData = Array.from({ length: 100 }, () => Math.floor(Math.random() * 50) + 1); // 100 lượt mua ngẫu nhiên từ 1-50 sản phẩm

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const x = d3.scaleLinear()
    .domain([0, d3.max(purchaseData)])
    .nice()
    .range([margin.left, width - margin.right]);

const histogram = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(20));

const bins = histogram(purchaseData);

const y = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .nice()
    .range([height - margin.bottom, margin.top]);

svg.append("g")
    .selectAll("rect")
    .data(bins)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.x0) + 1)
    .attr("y", d => y(d.length))
    .attr("width", d => x(d.x1) - x(d.x0) - 1)
    .attr("height", d => height - margin.bottom - y(d.length));

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
