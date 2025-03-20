document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('q8Chart').getContext('2d');
    
    // Sample data - replace with your actual data
    const months = ["Tháng 01", "Tháng 02", "Tháng 03", "Tháng 04", "Tháng 05", "Tháng 06", 
                    "Tháng 07", "Tháng 08", "Tháng 09", "Tháng 10", "Tháng 11", "Tháng 12"];
    
    const data = {
        labels: months,
        datasets: [
            {
                label: "[BOT] Bột",
                data: [39.5, 33, 33.2, 34.3, 35.2, 35.5, 38, 37.2, 40, 45.5, 54, 40],
                borderColor: "#4682B4",
                backgroundColor: "rgba(70, 130, 180, 0.1)",
                tension: 0.3,
                pointRadius: 3,
            },
            {
                label: "[SET] Set trà",
                data: [34, 25, 23.2, 23.5, 25.3, 24.2, 22.8, 24, 21, 21.2, 21, 26.5],
                borderColor: "#FF9800",
                backgroundColor: "rgba(255, 152, 0, 0.1)",
                tension: 0.3,
                pointRadius: 3,
            },
            {
                label: "[THO] Trà hoa",
                data: [49, 51, 51.2, 61.2, 59, 67.5, 68, 64, 52.5, 52, 51.5, 51],
                borderColor: "#E57373",
                backgroundColor: "rgba(229, 115, 115, 0.1)",
                tension: 0.3,
                pointRadius: 3,
            },
            {
                label: "[TMX] Trà mix",
                data: [47.5, 48, 54.5, 52.5, 48.5, 65, 64.5, 64, 54, 57.5, 54, 49.5],
                borderColor: "#80CBC4",
                backgroundColor: "rgba(128, 203, 196, 0.1)",
                tension: 0.3,
                pointRadius: 3,
            },
            {
                label: "[TTC] Trà cũ, quả sấy",
                data: [54, 48, 45.2, 45.5, 45.3, 45.5, 45.5, 45, 53, 58.5, 68, 59],
                borderColor: "#81C784",
                backgroundColor: "rgba(129, 199, 132, 0.1)",
                tension: 0.3,
                pointRadius: 3,
            }
        ]
    };

    // Create chart
    const chart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Xác suất bán hàng của Nhóm hàng theo Tháng',
                    font: {
                        size: 18,
                    },
                    color: '#4682B4',
                    padding: 20,
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}%`;
                        }
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: "rgba(0, 0, 0, 0.05)",
                    },
                },
                y: {
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
                    min: 20,
                    max: 70,
                },
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
        },
    });
});