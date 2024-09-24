let workbook;
let currentVisualizations = [];

document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please upload an Excel file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        workbook = XLSX.read(data, { type: 'array' });

        const sheetSelect = document.getElementById('sheetSelect');
        sheetSelect.innerHTML = '';
        workbook.SheetNames.forEach(sheetName => {
            const option = document.createElement('option');
            option.value = sheetName;
            option.textContent = sheetName;
            sheetSelect.appendChild(option);
        });

        sheetSelect.style.display = 'block';
        document.getElementById('viewButton').style.display = 'block';
    };

    reader.readAsArrayBuffer(file);
});

document.getElementById('viewButton').addEventListener('click', function() {
    const sheetSelect = document.getElementById('sheetSelect');
    const selectedSheet = sheetSelect.value;

    const chartsDiv = document.getElementById('charts');
    chartsDiv.innerHTML = '';

    const worksheet = workbook.Sheets[selectedSheet];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (jsonData.length < 2) {
        alert('Not enough data to create charts.');
        return;
    }

    currentVisualizations = createVisualizations(jsonData);
});

document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const chartsDiv = document.getElementById('charts');
    chartsDiv.innerHTML = '';

    currentVisualizations.forEach(visualization => {
        if (visualization.category.toLowerCase().includes(searchTerm)) {
            chartsDiv.appendChild(visualization.chart);
            chartsDiv.appendChild(visualization.statsDiv);
        }
    });
});

function createVisualizations(jsonData) {
    const labels = jsonData[0].slice(1);
    const dataSets = {};
    const visualizations = [];

    jsonData.slice(1).forEach(row => {
        const category = row[0];
        if (!dataSets[category]) {
            dataSets[category] = [];
        }
        dataSets[category].push(row.slice(1).map(Number));
    });

    for (const [category, data] of Object.entries(dataSets)) {
        const flatData = data.flat();
        const barChart = createBarChart(category, labels, flatData);
        const pieChart = createPieChart(category, flatData);
        const statsDiv = createStatistics(category, flatData);
        
        visualizations.push({ category, chart: barChart, statsDiv });
        visualizations.push({ category, chart: pieChart, statsDiv });
    }

    return visualizations;
}

function createBarChart(category, labels, data) {
    const canvas = document.createElement('canvas');
    document.getElementById('charts').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Bar Chart: ${category}`,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Values'
                    }
                }
            }
        }
    });

    return canvas;
}

function createPieChart(category, data) {
    const canvas = document.createElement('canvas');
    document.getElementById('charts').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [...Array(data.length).keys()].map(i => `${category} ${i + 1}`),
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
            }]
        },
        options: {
            responsive: true
        }
    });

    return canvas;
}

function createStatistics(category, data) {
    const statsDiv = document.createElement('div');
    statsDiv.className = 'stats';
    statsDiv.innerHTML = `
        <h3>Statistics for ${category}</h3>
        <p><strong>Mean:</strong> ${calculateMean(data)}</p>
        <p><strong>Median:</strong> ${calculateMedian(data)}</p>
        <p><strong>Standard Deviation:</strong> ${calculateStandardDeviation(data)}</p>
        <p><strong>Range:</strong> ${calculateRange(data)}</p>
    `;
    
    return statsDiv;
}

// Statistical functions
function calculateMean(data) {
    const sum = data.reduce((acc, val) => acc + val, 0);
    return (sum / data.length).toFixed(2);
}

function calculateMedian(data) {
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
}

function calculateStandardDeviation(data) {
    const mean = calculateMean(data);
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    return Math.sqrt(variance).toFixed(2);
}

function calculateRange(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return (max - min).toFixed(2);
}
