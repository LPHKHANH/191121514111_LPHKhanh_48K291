document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q3Chart').getContext('2d');
    
    // Sample data - replace with your actual data
    const data = {
        labels: [
            "Tháng 01", "Tháng 02", "Tháng 03", "Tháng 04", "Tháng 05", "Tháng 06", 
            "Tháng 07", "Tháng 08", "Tháng 09", "Tháng 10", "Tháng 11", "Tháng 12"
        ],
        values: [
            284, 295, 340, 196, 213, 210, 
            327, 382, 421, 480, 520, 750
        ],
        colors: [
            "#5D4037", "#9E9E9E", "#E91E63", "#F48FB1", "#9C27B0", "#CE93D8", 
            "#795548", "#A1887F", "#009688", "#80CBC4", "#F44336", "#EF9A9A"
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
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Doanh số bán hàng theo Tháng',
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
                            return `${context.parsed.y} triệu VND`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
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
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        ctx.font = '12px Arial';
                        ctx.fillText(`${data} triệu VND`, bar.x, bar.y - 5);
                    });
                }
            });
        }
    };
    
    chart.update();
});