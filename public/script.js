document.addEventListener('DOMContentLoaded', function () {
    // Select elements
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);

    // Toggle sidebar and overlay when hamburger is clicked
    hamburger.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });

    // Close sidebar when "X" button is clicked
    closeSidebar.addEventListener('click', function () {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    });

    // Close sidebar when overlay is clicked
    overlay.addEventListener('click', function () {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    });

    // Form submission handling
    document.getElementById('sentiment-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const statusDiv = document.getElementById('upload-status');
        const resultsDiv = document.getElementById('analysis-results');

        statusDiv.textContent = 'Uploading and analyzing...';

        fetch('/formcsv', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                statusDiv.textContent = data;
                resultsDiv.classList.remove('hidden');
                document.getElementById('results-display').textContent = 'Analysis Complete, results will be shown here';
                // Here you would add code to populate the resultsDiv with actual analysis data
            })
            .catch((error) => {
                statusDiv.textContent = 'An error occurred.';
                console.error('Error:', error);
            });
    });
});