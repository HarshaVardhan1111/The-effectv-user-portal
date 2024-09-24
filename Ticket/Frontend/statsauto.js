document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit_button');
    const exportButton = document.getElementById('export_csv');
    const fileInput = document.getElementById('file-upload');
    const form = document.getElementById('uploadForm');
    const progressIndicator = document.getElementById('progress_indicator');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (fileInput.files.length === 0) {
            alert('Please select a file before submitting.');
            return;
        }

        const formData = new FormData(form);

        progressIndicator.style.display = 'block';

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('File uploaded and processing started.');
            } else {
                alert('Error uploading file: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading file.');
        })
        .finally(() => {
            progressIndicator.style.display = 'none';
        });
    });

    exportButton.addEventListener('click', () => {
        fetch('/export')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'export.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error exporting CSV.');
        });
    });
});
