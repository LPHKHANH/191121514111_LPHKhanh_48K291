document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('q9Chart');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = 800;
    canvas.height = 600;
    
    // Define sections
    const sections = [
        {
            title: "[BOT] Bột",
            color: "#4682B4",
            data: [{ label: "BOT01 Bột cần tây", value: 100, color: "#26A69A" }]
        },
        {
            title: "[SET] Set trà",
            color: "#FF9800",
            data: [
                { label: "SET01 Set 10 gói trà hoa cúc trắng", value: 21.5, color: "#7E57C2" },
                { label: "SET02 Set 10 gói trà gạo lứt", value: 20.8, color: "#FF7043" },
                { label: "SET03 Set 10 gói trà đường nhan", value: 19.6, color: "#9CCC65" },
                { label: "SET04 Set 10 gói trà hoa đậu biếc", value: 15.7, color: "#78909C" },
                { label: "SET05 Set 10 gói trà cam sả quế", value: 12.5, color: "#FF8A65" },
                { label: "SET06 Set 10 gói trà nụ hoa nhài", value: 9.9, color: "#9575CD" }
            ]
        },
        {
            title: "[THO] Trà hoa",
            color: "#E57373",
            data: [
                { label: "THO01 Trà hoa cúc trắng", value: 28.7, color: "#42A5F5" },
                { label: "THO02 Trà nụ hoa nhài trắng", value: 25.7, color: "#66BB6A" },
                { label: "THO03 Trà hoa đậu biếc", value: 22.1, color: "#FFA726" },
                { label: "THO04 Trà hoa Atiso", value: 16.1, color: "#EC407A" },
                { label: "THO05 Trà hoa hồng Tây Tạng", value: 14.6, color: "#AB47BC" }
            ]
        },
        {
            title: "[TMX] Trà mix",
            color: "#80CBC4",
            data: [
                { label: "TMX01 Trà đường nhan", value: 46.5, color: "#78909C" },
                { label: "TMX02 Trà gạo lứt 8 vị", value: 38.7, color: "#81D4FA" },
                { label: "TMX03 Trà cam sả quế", value: 15.0, color: "#FFCC80" }
            ]
        },
        {
            title: "[TTC] Trà cũ, quả sấy",
            color: "#81C784",
            data: [
                { label: "TTC01 Trà gừng", value: 56.5, color: "#EF5350" },
                { label: "TTC02 Cam lát", value: 43.5, color: "#5C6BC0" }
            ]
        }
    ];
    
    // Set dimensions
    const padding = { top: 60, right: 20, bottom: 40, left: 20 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;
    
    // Draw title
    ctx.fillStyle = "#4682B4";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Xác suất bán hàng của Mặt hàng theo Nhóm hàng", canvas.width / 2, 30);
    
    // Calculate section dimensions
    const sectionWidth = chartWidth / 3;
    const sectionHeight = chartHeight / 2;
    
    // Draw each section
    sections.forEach((section, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = padding.left + col * sectionWidth;
        const y = padding.top + row * sectionHeight;
        
        // Draw section title
        ctx.fillStyle = section.color;
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.fillText(section.title, x + sectionWidth / 2, y + 20);
        
        // Draw section bars
        const barAreaHeight = sectionHeight - 40;
        const barWidth = sectionWidth * 0.8;
        const barStartX = x + (sectionWidth - barWidth) / 2;
        const maxBarHeight = barAreaHeight * 0.8;
        const barSpacing = 5;
        const totalBars = section.data.length;
        const individualBarWidth = (barWidth - (totalBars - 1) * barSpacing) / totalBars;
        
        // Draw x-axis
        ctx.beginPath();
        ctx.moveTo(x + sectionWidth * 0.1, y + sectionHeight - 20);
        ctx.lineTo(x + sectionWidth * 0.9, y + sectionHeight - 20);
        ctx.strokeStyle = "#ccc";
        ctx.stroke();
        
        // Draw 0%, 50%, 100% markers
        ctx.fillStyle = "#666";
        ctx.font = "10px Arial";
        ctx.textAlign = "left";
        ctx.fillText("0%", x + sectionWidth * 0.1, y + sectionHeight - 10);
        ctx.textAlign = "center";
        ctx.fillText("50%", x + sectionWidth * 0.5, y + sectionHeight - 10);
        ctx.textAlign = "right";
        ctx.fillText("100%", x + sectionWidth * 0.9, y + sectionHeight - 10);
        
        // Draw bars
        section.data.forEach((item, i) => {
            const barHeight = (item.value / 100) * maxBarHeight;
            const barX = barStartX + i * (individualBarWidth + barSpacing);
            const barY = y + sectionHeight - 20 - barHeight;
            
            // Draw bar
            ctx.fillStyle = item.color;
            ctx.fillRect(barX, barY, individualBarWidth, barHeight);
            
            // Draw value
            ctx.fillStyle = "#000";
            ctx.font = "10px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`${item.value}%`, barX + individualBarWidth / 2, barY - 5);
            
            // Draw label (rotated for space)
            ctx.save();
            ctx.translate(barX + individualBarWidth / 2, y + sectionHeight - 25);
            ctx.rotate(-Math.PI / 4);
            ctx.fillStyle = "#333";
            ctx.font = "8px Arial";
            ctx.textAlign = "right";
            ctx.fillText(item.label.substring(0, 15), 0, 0);
            ctx.restore();
        });
    });
});