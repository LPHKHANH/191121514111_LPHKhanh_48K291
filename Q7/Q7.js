document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q7Chart').getContext('2d');
    
    // Sample data - replace with your actual data
    const data = {
        labels: [
            "[TMX] Trà mix",
            "[THO] Trà hoa",
            "[TTC] Trà cũ, quả sấy",
            "[BOT] Bột",
            "[SET] Set trà"
        ],
        values: [54.5, 54.4, 53.3, 40.3, 23.9],
        colors: [
            "#80CBC4", // TMX - Teal
            "#E57373", // THO - Red
            "#81C784", // TTC - Green
            "#4682B4", // BOT - Blue
            "#FF9800", // SET - Orange
        ]
    };

    // Create chart
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Xác suất (%)',
                    data: data.values,
                    backgroundColor: data.colors,
                    borderColor: data.colors,
                    borderWidth: 1,
                },
            ],
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Xác suất bán hàng theo Nhóm hàng',
                    font: {
                        size: 18,
                    },
                    color: '#4682B4',
                    padding: 20,
                },
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.x}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    title: {
                        display: false,
                    },
                    max: 60,
                },
                y: {
                    grid: {
                        display: false,
                    },
                },
            },
        },
    });

    // Add data labels
    const originalDraw = chart.draw;
    chart.draw = function() {
        originalDraw.apply(this, arguments);
        
        const ctx = this.ctx;
        
        if (ctx) {
            this.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = this.getDatasetMeta(datasetIndex);
                if (!meta.hidden) {
                    meta.data.forEach((bar, index) => {
                        const data = dataset.data[index];
                        ctx.fillStyle = '#000';
                        ctx.textAlign = 'left';
                        ctx.textBaseline = 'middle';
                        ctx.font = '12px Arial';
                        ctx.fillText(`${data}%`, bar.x + 5, bar.y);
                    });
                }
            });
        }
    };
    
    chart.update();
});