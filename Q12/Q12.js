const paymentData = Array.from({ length: 100 }, () => Math.floor(Math.random() * 500) + 100); // 100 khách hàng với mức chi từ 100 - 600

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

paymentData.sort(d3.ascending);

const q1 = d3.quantile(paymentData, 0.25);
const median = d3.quantile(paymentData, 0.5);
const q3 = d3.quantile(paymentData, 0.75);
const min = d3.min(paymentData);
const max = d3.max(paymentData);

const x = d3.scaleLinear()
    .domain([min - 10, max + 10])
    .range([margin.left, width - margin.right]);

const boxWidth = 50;
const center = width / 2;

svg.append("line")
    .attr("class", "whisker")
    .attr("x1", x(min)).attr("x2", x(q1))
    .attr("y1", height / 2).attr("y2", height / 2);

svg.append("line")
    .attr("class", "whisker")
    .attr("x1", x(q3)).attr("x2", x(max))
    .attr("y1", height / 2).attr("y2", height / 2);

svg.append("rect")
    .attr("class", "box")
    .attr("x", x(q1))
    .attr("y", height / 2 - boxWidth / 2)
    .attr("width", x(q3) - x(q1))
    .attr("height", boxWidth);

svg.append("line")
    .attr("class", "median-line")
    .attr("x1", x(median)).attr("x2", x(median))
    .attr("y1", height / 2 - boxWidth / 2).attr("y2", height / 2 + boxWidth / 2);

svg.append("circle")
    .attr("cx", x(min))
    .attr("cy", height / 2)
    .attr("r", 4)
    .attr("fill", "black");

svg.append("circle")
    .attr("cx", x(max))
    .attr("cy", height / 2)
    .attr("r", 4)
    .attr("fill", "black");

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));
