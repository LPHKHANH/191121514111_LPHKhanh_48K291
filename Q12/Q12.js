document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q12Chart').getContext('2d');
    
    // Generate sample data based on the image - replace with your actual data
    // Creating 100 price points from 0 to 1,000,000 VND
    const priceRanges = [];
    const values = [];
    
    // Generate price ranges (x-axis labels)
    for (let i = 0; i < 100; i++) {
        priceRanges.push(`${i * 10}k`);
    }
    
    // Generate decreasing values with a long tail distribution
    // First few values are high, then rapidly decrease
    values.push(1500); // First bar is highest
    values.push(1150);
    values.push(1100);
    values.push(950);
    values.push(750);
    values.push(650);
    values.push(550);
    values.push(450);
    values.push(380);
    values.push(320);
    
    // Add decreasing values for the rest
    for (let i = 10; i < 100; i++) {
        // Exponential decay formula
        const value = Math.round(300 * Math.exp(-0.1 * (i - 10)));
        values.push(value);
    }

    // Create chart
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: priceRanges,
            datasets: [
                {
                    label: 'Số khách hàng',
                    data: values,
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
                    text: 'Phân phối Mức chi trả của Khách hàng',
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
                        text: 'Mức chi trả (nghìn VND)'
                    },
                    grid: {
                        display: false,
                    },
                    ticks: {
                        maxRotation: 90,
                        minRotation: 90,
                        autoSkip: true,
                        maxTicksLimit: 20
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Số khách hàng'
                    },
                    grid: {
                        display: true,
                    },
                },
            },
        },
    });
});