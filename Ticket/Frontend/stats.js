// document.getElementById('upload').addEventListener('change', handleFile);
// document.getElementById('loadData').addEventListener('click', loadDataFromLocalStorage);

//         function handleFile(event) {
//             const file = event.target.files[0];
//             const reader = new FileReader();

//             reader.onload = function(e) {
//                 const data = new Uint8Array(e.target.result);
//                 const workbook = XLSX.read(data, { type: 'array' });
//                 populateSheetSelector(workbook);
//                 displayData(workbook, workbook.SheetNames[0]); // Display first sheet by default
//             };

//             reader.readAsArrayBuffer(file);
//         }

//         function populateSheetSelector(workbook) {
//             const sheetSelector = document.getElementById('sheetSelector');
//             sheetSelector.innerHTML = '';

//             workbook.SheetNames.forEach((sheetName) => {
//                 const option = document.createElement('option');
//                 option.value = sheetName;
//                 option.textContent = sheetName;
//                 sheetSelector.appendChild(option);
//             });

//             sheetSelector.addEventListener('change', function() {
//                 displayData(workbook, sheetSelector.value);
//             });
//         }

//         function displayData(workbook, sheetName) {
//             const worksheet = workbook.Sheets[sheetName];
//             const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//             const tableBody = document.querySelector('.stats-table tbody');
//             tableBody.innerHTML = '';

//             // Store the data in an object to keep track of metrics
//             const metrics = {};

//             // Process the data and populate metrics
//             json.forEach((row, rowIndex) => {
//                 if (rowIndex === 0) return; // Skip header row
//                 const metricName = row[0]; // First column is the metric name

//                 // Initialize the metric if it doesn't exist
//                 if (!metrics[metricName]) {
//                     metrics[metricName] = Array(12).fill('');
//                 }

//                 // Fill the months data
//                 for (let i = 1; i <= 12; i++) { // Columns for January to December
//                     if (row[i] !== undefined) {
//                         metrics[metricName][i - 1] = row[i]; // Assign the value to the corresponding month
//                     }
//                 }
//             });

//             // Create rows in the table based on metrics
//             Object.keys(metrics).forEach(metric => {
//                 const tr = document.createElement('tr');
//                 const tdMetric = document.createElement('td');
//                 tdMetric.textContent = metric;
//                 tr.appendChild(tdMetric);
                
//                 metrics[metric].forEach(value => {
//                     const td = document.createElement('td');
//                     td.contentEditable = true; // Make cells editable
//                     td.textContent = value;
//                     tr.appendChild(td);
//                 });
                
//                 tableBody.appendChild(tr);
//             });
//         }
//         function loadDataFromLocalStorage() {
//             const storedData = localStorage.getItem('monthlyStats');
//             if (storedData) {
//                 const parsedData = JSON.parse(storedData);
//                 displayData(parsedData);
//             } else {
//                 alert('No data found in local storage.');
//             }
//         }
// window.onload = loadDataFromLocalStorage;
// Event listeners for file upload and loading data
document.getElementById('upload').addEventListener('change', handleFile);
document.getElementById('loadData').addEventListener('click', loadDataFromLocalStorage);

// Function to handle file upload
function handleFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        populateSheetSelector(workbook);
        displayData(workbook, workbook.SheetNames[0]); // Display first sheet by default
    };

    reader.readAsArrayBuffer(file);
}

// Function to populate the sheet selector
function populateSheetSelector(workbook) {
    const sheetSelector = document.getElementById('sheetSelector');
    sheetSelector.innerHTML = '';

    workbook.SheetNames.forEach((sheetName) => {
        const option = document.createElement('option');
        option.value = sheetName;
        option.textContent = sheetName;
        sheetSelector.appendChild(option);
    });

    sheetSelector.addEventListener('change', function() {
        displayData(workbook, sheetSelector.value);
    });
}

// Function to display data in the table
function displayData(workbook, sheetName) {
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    const tableBody = document.querySelector('.stats-table tbody');
    tableBody.innerHTML = '';

    // Store the data in an object to keep track of metrics
    const metrics = {};

    // Process the data and populate metrics
    json.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; // Skip header row
        const metricName = row[0]; // First column is the metric name

        // Initialize the metric if it doesn't exist
        if (!metrics[metricName]) {
            metrics[metricName] = Array(12).fill('');
        }

        // Fill the months data
        for (let i = 1; i <= 12; i++) { // Columns for January to December
            if (row[i] !== undefined) {
                const cellAddress = XLSX.utils.encode_cell({ r: rowIndex, c: i });
                const cell = worksheet[cellAddress];
                const fillColor = cell && cell.s && cell.s.fill && cell.s.fill.fgColor && cell.s.fill.fgColor.rgb;

                metrics[metricName][i - 1] = {
                    value: row[i],
                    fillColor: fillColor ? `#${fillColor}` : '' // Prepare color with #
                };
            }
        }
    });


    // Create rows in the table based on metrics
    Object.keys(metrics).forEach(metric => {
        const tr = document.createElement('tr');
        const tdMetric = document.createElement('td');
        tdMetric.textContent = metric;
        tr.appendChild(tdMetric);
        
        
        metrics[metric].forEach(value => {
            const td = document.createElement('td');
            td.contentEditable = true; // Make cells editable
            td.textContent = item.value;

            if (item.fillColor) {
                td.style.backgroundColor = `#${item.fillColor}`; // Set background color
            }
            tr.appendChild(td);
        });
        
        
        tableBody.appendChild(tr);
    });

    // Save the metrics to local storage
    localStorage.setItem('monthlyStats', JSON.stringify(metrics));
}

// Function to load data from local storage
function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('monthlyStats');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        displayDataFromLocalStorage(parsedData);
    } else {
        alert('No data found in local storage.');
    }
}

// Function to display data from local storage
function displayDataFromLocalStorage(data) {
    const tableBody = document.querySelector('.stats-table tbody');
    tableBody.innerHTML = '';

    Object.keys(data).forEach(metric => {
        const tr = document.createElement('tr');
        const tdMetric = document.createElement('td');
        tdMetric.textContent = metric;
        tr.appendChild(tdMetric);

        
        
        data[metric].forEach(value => {
            const td = document.createElement('td');
            td.contentEditable = true; // Make cells editable
            td.textContent = value;
            tr.appendChild(td);
        });
        
        tableBody.appendChild(tr);
    });
}

// Call loadDataFromLocalStorage on page load to display any saved data
window.onload = loadDataFromLocalStorage;