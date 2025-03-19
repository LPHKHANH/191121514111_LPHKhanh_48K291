const data = [
    { category: "Đồ uống", Coffee: 40, Tea: 30, Juice: 30 },
    { category: "Bánh ngọt", Cake: 50, Cookies: 30, Pastry: 20 },
    { category: "Thực phẩm", Rice: 60, Noodles: 25, Soup: 15 },
    { category: "Sữa", Milk: 70, Yogurt: 20, Cheese: 10 },
    { category: "Trà", GreenTea: 50, BlackTea: 30, HerbalTea: 20 }
];

const subCategories = ["Coffee", "Tea", "Juice", "Cake", "Cookies", "Pastry", "Rice", "Noodles", "Soup", "Milk", "Yogurt", "Cheese", "GreenTea", "BlackTea", "HerbalTea"];
const colors = d3.scaleOrdinal(d3.schemeCategory10);

const width = 800;
const height = 400;
const margin = { top: 20, right: 30, bottom: 50, left: 50 };

const stack = d3.stack()
    .keys(subCategories)
    .value((d, key) => d[key] || 0); 

const series = stack(data);

const x = d3.scaleBand()
    .domain(data.map(d => d.category))
    .range([margin.left, width - margin.right])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
    .nice()
    .range([height - margin.bottom, margin.top]);

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

svg.append("g")
    .selectAll("g")
    .data(series)
    .enter().append("g")
    .attr("fill", d => colors(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr("x", d => x(d.data.category))
    .attr("y", d => y(d[1]))
    .attr("height", d => y(d[0]) - y(d[1]))
    .attr("width", x.bandwidth());

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
