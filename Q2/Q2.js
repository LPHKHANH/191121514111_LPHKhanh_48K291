document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q2Chart').getContext('2d');
    
    // Sample data - replace with your actual data
    const data = {
        labels: [
            "[THO] Trà hoa",
            "[TTC] Trà cũ, quả sấy",
            "[SET] Set trà",
            "[TMX] Trà mix",
            "[BOT] Bột",
        ],
        values: [1578, 800, 778, 697, 626],
        colors: [
            "#E57373", // THO - Red
            "#81C784", // TTC - Green
            "#FF9800", // SET - Orange
            "#80CBC4", // TMX - Teal
            "#4682B4", // BOT - Blue
        ]
    };

    // Create chart
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Doanh số (triệu VND)',
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
                    text: 'Doanh số bán hàng theo Nhóm hàng',
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
                            return `${context.parsed.x} triệu VND`;
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
                            return value + 'M';
                        }
                    },
                    title: {
                        display: false,
                    }
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
                        ctx.fillText(`${data} triệu VND`, bar.x + 5, bar.y);
                    });
                }
            });
        }
    };
    
    chart.update();
});