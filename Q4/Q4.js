document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q4Chart').getContext('2d');
    
    // Sample data - replace with your actual data
    const data = {
        labels: [
            "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"
        ],
        values: [
            11.86, 11.93, 12.32, 12.86, 14.13, 14.85, 13.76
        ],
        colors: [
            "#4682B4", "#FF9800", "#E57373", "#80CBC4", "#81C784", "#FFD54F", "#CE93D8"
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
                    text: 'Doanh số bán hàng trung bình theo Ngày trong tuần',
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