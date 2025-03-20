document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q11Chart').getContext('2d');
    
    // Sample data based on the image - replace with your actual data
    const data = {
        labels: Array.from({ length: 22 }, (_, i) => (i + 1).toString()),
        values: [
            4850, 1200, 800, 650, 420, 330, 250, 180, 150, 110, 
            90, 70, 60, 50, 40, 35, 30, 25, 20, 15, 10, 5
        ]
    };

    // Create chart
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Số lượt mua hàng',
                    data: data.values,
                    backgroundColor: '#4682B4',
                    borderColor: '#4682B4',
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
                    text: 'Phân phối Lượt mua hàng',
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
                            return `${context.parsed.y} khách hàng`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Số lượt mua hàng'
                    },
                    grid: {
                        display: false,
                    },
                },
                y: {
                    title: {
                        display: true,
                        text: 'Số khách hàng'
                    },
                    grid: {
                        display: true,
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000) {
                                return value / 1000 + 'k';
                            }
                            return value;
                        }
                    }
                },
            },
        },
    });
});