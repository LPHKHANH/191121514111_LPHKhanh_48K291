const data = [
    { month: "Jan", "Đồ uống": { Coffee: 30, Tea: 20, Juice: 10 }, "Bánh ngọt": { Cake: 25, Cookies: 15, Pastry: 10 } },
    { month: "Feb", "Đồ uống": { Coffee: 35, Tea: 25, Juice: 15 }, "Bánh ngọt": { Cake: 20, Cookies: 10, Pastry: 15 } },
    { month: "Mar", "Đồ uống": { Coffee: 40, Tea: 30, Juice: 20 }, "Bánh ngọt": { Cake: 30, Cookies: 20, Pastry: 10 } }
];

const categories = ["Đồ uống", "Bánh ngọt"];
const subCategories = ["Coffee", "Tea", "Juice", "Cake", "Cookies", "Pastry"];
const colors = d3.scaleOrdinal(d3.schemeCategory10);

const width = 900;
const height = 500;
const margin = { top: 20, right: 30, bottom: 50, left: 80 };

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

const stack = d3.stack()
    .keys(subCategories)
    .value((d, key) => d[key] || 0);

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

data.forEach(d => {
    categories.forEach(category => {
        d[category] = subCategories.reduce((acc, sub) => {
            acc[sub] = d[category]?.[sub] || 0;
            return acc;
        }, {});
    });
});

const groups = svg.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", d => `translate(${x0(d.month)},0)`);

categories.forEach(category => {
    const series = stack(data.map(d => d[category]));
    
    groups.append("g")
        .attr("transform", d => `translate(${x1(category)},0)`)
        .selectAll("rect")
        .data((_, i) => series.map(s => ({ key: s.key, value: s[i] })))
        .enter().append("rect")
        .attr("x", 0)
        .attr("y", d => y(d.value[1]))
        .attr("height", d => y(d.value[0]) - y(d.value[1]))
        .attr("width", x1.bandwidth())
        .attr("fill", d => colors(d.key));
});

svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x0));

svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));
