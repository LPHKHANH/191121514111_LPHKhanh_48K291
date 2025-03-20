document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q6Chart').getContext('2d');
    
    // Sample data - replace with your actual data
    const data = {
        labels: [
            "08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", 
            "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", 
            "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", 
            "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00"
        ],
        values: [
            27.11, 26.22, 30.65, 29.04, 37.78, 27.35, 28.57, 28.43, 
            34.17, 32.08, 40.05, 39.02, 36.23, 35.85, 36.27, 36.25
        ],
        colors: [
            "#4682B4", "#80B1D3", "#FF9800", "#FFCC80", "#81C784", "#C5E1A5", 
            "#D4B157", "#F7DC6F", "#26A69A", "#80CBC4", "#E57373", "#EF9A9A", 
            "#A1887F", "#D7CCC8", "#EC407A", "#F8BBD0"
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
                    text: 'Doanh số bán hàng trung bình theo Khung giờ',
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
                        ctx.font = '10px Arial';
                        ctx.fillText(`${data} triệu VND`, bar.x, bar.y - 5);
                    });
                }
            });
        }
    };
    
    chart.update();
});