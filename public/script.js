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

    document.getElementById('sentiment-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
    
        const fileInput = document.getElementById('csv_file'); // File input element
        const statusDiv = document.getElementById('upload-status'); // Status message div
        const resultsDiv = document.getElementById('analysis-results'); // Results div
    
        // Check if a file is selected
        if (!fileInput.files || fileInput.files.length === 0) {
            statusDiv.textContent = 'Please upload a CSV file first.'; // Show error message
            statusDiv.style.color = 'red'; // Make the error message red
            return; // Stop further execution
        }
    
        // If a file is selected, proceed with the form submission
        statusDiv.textContent = 'Uploading and analyzing...';
        statusDiv.style.color = 'black'; // Reset color
    
        const formData = new FormData(this); // Create FormData object from the form
    
        fetch('/formcsv', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                statusDiv.textContent = data; // Show success message
                resultsDiv.classList.remove('hidden'); // Show results section
                document.getElementById('results-display').textContent = 'Analysis Complete, results will be shown here';
                // Here you would add code to populate the resultsDiv with actual analysis data
            })
            .catch((error) => {
                statusDiv.textContent = 'An error occurred.'; // Show error message
                console.error('Error:', error);
            });
    });
});