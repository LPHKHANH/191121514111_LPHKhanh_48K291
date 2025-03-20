document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q5Chart').getContext('2d');
    
    // Generate sample data for 31 days with random values between 12 and 15
    const labels = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const values = Array.from({ length: 31 }, () => (Math.random() * 3 + 12).toFixed(1));
    
    // Generate colors for each bar
    const colors = [
        "#4682B4", "#FF9800", "#81C784", "#FFD54F", "#E57373", 
        "#CE93D8", "#80CBC4", "#FFAB91", "#9FA8DA", "#F48FB1",
        "#A5D6A7", "#FFF59D", "#FFCC80", "#BCAAA4", "#B39DDB",
        "#4682B4", "#FF9800", "#81C784", "#FFD54F", "#E57373", 
        "#CE93D8", "#80CBC4", "#FFAB91", "#9FA8DA", "#F48FB1",
        "#A5D6A7", "#FFF59D", "#FFCC80", "#BCAAA4", "#B39DDB"
    ];

    // Create chart
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Doanh số (triệu VND)',
                    data: values,
                    backgroundColor: colors,
                    borderColor: colors,
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
                    text: 'Doanh số bán hàng trung bình theo Ngày trong tháng',
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
                        ctx.fillText(`${data}`, bar.x, bar.y - 5);
                    });
                }
            });
        }
    };
    
    chart.update();
});