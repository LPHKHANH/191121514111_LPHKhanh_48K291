document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('q10Chart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const padding = { top: 60, right: 20, bottom: 20, left: 20 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;
    
    // Draw title
    ctx.fillStyle = "#4682B4";
    ctx.fillRect(0, 0, canvas.width, 50);
    ctx.fillStyle = "#fff";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Xác suất bán hàng của Mặt hàng theo Nhóm hàng trong từng Tháng", canvas.width / 2, 30);
    
    // Define panels
    const panels = [
        {
            title: "Tout",
            data: [
                { label: "T07", value: 100 },
                { label: "T08", value: 100 },
                { label: "T09", value: 100 },
                { label: "T10", value: 100 },
                { label: "T11", value: 100 },
                { label: "T12", value: 100 }
            ],
            yMin: 90,
            yMax: 110
        },
        {
            title: "[SET] Set trà",
            data: [
                { 
                    label: "SET01",
                    values: [15, 13, 12, 15, 15, 16],
                    color: "#7E57C2"
                },
                { 
                    label: "SET02",
                    values: [11, 14, 12, 13, 12, 12],
                    color: "#FF7043"
                },
                { 
                    label: "SET03",
                    values: [20, 19, 21, 21, 21, 22],
                    color: "#9CCC65"
                },
                { 
                    label: "SET04",
                    values: [18, 22, 19, 19, 19, 20],
                    color: "#78909C"
                }
            ],
            yMin: 8,
            yMax: 25
        },
        {
            title: "[THO] Trà hoa",
            data: [
                { 
                    label: "THO01",
                    values: [28, 24, 24, 24, 24, 24],
                    color: "#42A5F5"
                },
                { 
                    label: "THO02",
                    values: [17, 20, 19, 19, 19, 18],
                    color: "#66BB6A"
                },
                { 
                    label: "THO03",
                    values: [32, 29, 28, 28, 28, 28],
                    color: "#FFA726"
                },
                { 
                    label: "THO04",
                    values: [16, 15, 14, 15, 15, 15],
                    color: "#EC407A"
                }
            ],
            yMin: 14,
            yMax: 32
        },
        {
            title: "[TMX] Trà mix",
            data: [
                { 
                    label: "TMX01",
                    values: [47, 48, 46, 46, 45, 45],
                    color: "#78909C"
                },
                { 
                    label: "TMX02",
                    values: [37, 38, 35, 39, 37, 35],
                    color: "#81D4FA"
                },
                { 
                    label: "TMX03",
                    values: [41, 40, 37, 38, 37, 37],
                    color: "#FFCC80"
                }
            ],
            yMin: 30,
            yMax: 50
        },
        {
            title: "[TTC] Trà cũ, quả sấy",
            data: [
                { 
                    label: "TTC01",
                    values: [68, 68, 70, 70, 75, 74],
                    color: "#EF5350"
                },
                { 
                    label: "TTC02",
                    values: [42, 43, 42, 47, 45, 44],
                    color: "#5C6BC0"
                }
            ],
            yMin: 35,
            yMax: 75
        }
    ];
    
    // Calculate panel dimensions
    const panelWidth = chartWidth / 3;
    const panelHeight = chartHeight / 2;
    
    // Draw each panel
    panels.forEach((panel, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = padding.left + col * panelWidth;
        const y = padding.top + row * panelHeight;
        
        // Draw panel title
        ctx.fillStyle = "#4682B4";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(panel.title, x + panelWidth / 2, y + 20);
        
        // Draw panel chart area
        const chartAreaHeight = panelHeight - 40;
        const chartAreaWidth = panelWidth * 0.9;
        const chartStartX = x + (panelWidth - chartAreaWidth) / 2;
        const chartStartY = y + 30;
        
        // Draw axes
        ctx.beginPath();
        ctx.moveTo(chartStartX, chartStartY);
        ctx.lineTo(chartStartX, chartStartY + chartAreaHeight);
        ctx.lineTo(chartStartX + chartAreaWidth, chartStartY + chartAreaHeight);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
        
        // Draw y-axis labels
        ctx.fillStyle = "#666";
        ctx.font = "10px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`${panel.yMax}%`, chartStartX - 5, chartStartY + 10);
        ctx.fillText(`${panel.yMin}%`, chartStartX - 5, chartStartY + chartAreaHeight - 10);
        
        // Draw x-axis labels
        const months = ["T07", "T08", "T09", "T10", "T11", "T12"];
        const xStep = chartAreaWidth / (months.length - 1);
        
        months.forEach((month, i) => {
            const xPos = chartStartX + i * xStep;
            ctx.fillStyle = "#666";
            ctx.font = "10px Arial";
            ctx.textAlign = "center";
            ctx.fillText(month, xPos, chartStartY + chartAreaHeight + 15);
            
            // Draw vertical grid lines
            ctx.beginPath();
            ctx.moveTo(xPos, chartStartY);
            ctx.lineTo(xPos, chartStartY + chartAreaHeight);
            ctx.strokeStyle = "#eee";
            ctx.stroke();
        });
        
        // Draw data lines
        if (index === 0) {
            // Special case for "Tout" panel - just a straight line at 100%
            ctx.beginPath();
            ctx.moveTo(chartStartX, chartStartY + chartAreaHeight * 0.5);
            ctx.lineTo(chartStartX + chartAreaWidth, chartStartY + chartAreaHeight * 0.5);
            ctx.strokeStyle = "#4682B4";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.lineWidth = 1;
        } else {
            // Draw lines for each data series
            panel.data.forEach(series => {
                ctx.beginPath();
                series.values.forEach((value, i) => {
                    const xPos = chartStartX + i * xStep;
                    const yPos = chartStartY + chartAreaHeight - ((value - panel.yMin) / (panel.yMax - panel.yMin)) * chartAreaHeight;
                    
                    if (i === 0) {
                        ctx.moveTo(xPos, yPos);
                    } else {
                        ctx.lineTo(xPos, yPos);
                    }
                });
                ctx.strokeStyle = series.color;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.lineWidth = 1;
                
                // Draw points
                series.values.forEach((value, i) => {
                    const xPos = chartStartX + i * xStep;
                    const yPos = chartStartY + chartAreaHeight - ((value - panel.yMin) / (panel.yMax - panel.yMin)) * chartAreaHeight;
                    
                    ctx.beginPath();
                    ctx.arc(xPos, yPos, 3, 0, Math.PI * 2);
                    ctx.fillStyle = series.color;
                    ctx.fill();
                });
                
                // Draw label
                const lastValue = series.values[series.values.length - 1];
                const xPos = chartStartX + chartAreaWidth + 5;
                const yPos = chartStartY + chartAreaHeight - ((lastValue - panel.yMin) / (panel.yMax - panel.yMin)) * chartAreaHeight;
                ctx.fillStyle = series.color;
                ctx.font = "10px Arial";
                ctx.textAlign = "left";
                ctx.fillText(series.label, xPos, yPos + 3);
            });
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const container = canvas.parentElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        
        // Maintain aspect ratio
        const aspectRatio = canvas.width / canvas.height;
        let newWidth = containerWidth;
        let newHeight = containerWidth / aspectRatio;
        
        if (newHeight > containerHeight) {
            newHeight = containerHeight;
            newWidth = containerHeight * aspectRatio;
        }
        
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
    });
    
    // Initial resize
    window.dispatchEvent(new Event('resize'));
});