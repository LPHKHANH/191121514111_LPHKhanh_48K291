document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q1Chart').getContext('2d');
    
    // Sample data - replace with your actual data
    const data = {
        labels: [
            "[BOT01] Bột cần tây",
            "[THO06] Trà nhụy hoa nghệ tây",
            "[TTC01] Trà gừng",
            "[THO03] Trà hoa cúc trắng",
            "[TTC02] Cam lát",
            "[TMX01] Trà đường nhan",
            "[THO01] Trà nụ hoa nhài trắng",
            "[THO02] Trà hoa đậu biếc",
            "[TMX02] Trà cam sả quế",
            "[SET03] Set 10 gói trà hoa cúc trắng",
            "[SET02] Set 10 gói trà hoa đậu biếc",
            "[THO04] Trà nụ hoa hồng Tây Tạng",
            "[THO05] Trà hoa Atiso",
            "[TMX03] Trà gạo lứt 8 vị",
            "[SET01] Set 10 gói trà nụ hoa nhài trắng",
            "[SET05] Set 10 gói trà đường nhan",
            "[SET04] Set 10 gói trà gừng",
            "[SET07] Set 10 gói trà cam sả quế",
            "[SET06] Set 10 gói trà gạo lứt 8 vị",
        ],
        values: [
            626, 592, 433, 421, 367, 317, 290, 279, 250, 244, 
            159, 150, 144, 130, 115, 98, 80, 50, 32
        ],
        colors: [
            "#4682B4", // BOT - Blue
            "#E57373", // THO - Red
            "#81C784", // TTC - Green
            "#E57373", // THO - Red
            "#81C784", // TTC - Green
            "#80CBC4", // TMX - Teal
            "#E57373", // THO - Red
            "#E57373", // THO - Red
            "#80CBC4", // TMX - Teal
            "#FF9800", // SET - Orange
            "#FF9800", // SET - Orange
            "#E57373", // THO - Red
            "#E57373", // THO - Red
            "#80CBC4", // TMX - Teal
            "#FF9800", // SET - Orange
            "#FF9800", // SET - Orange
            "#FF9800", // SET - Orange
            "#FF9800", // SET - Orange
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
                    text: 'Doanh số bán hàng theo Mặt hàng',
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