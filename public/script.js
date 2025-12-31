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

    function showAnalyzingAnimation() {
        const uploadStatus = document.getElementById('upload-status');
        uploadStatus.innerHTML = `
            <div class="analyzing-animation">
                <span class="analyzing-text">Analyzing</span>
                <div class="dots-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill"></div>
                </div>
            </div>
        `;
    }

    function showErrorAnimation(message) {
        const uploadStatus = document.getElementById('upload-status');
        uploadStatus.innerHTML = `
            <div class="error-animation">
                <div class="error-icon"></div>
                <span class="error-text">${message}</span>
            </div>
        `;
    }

    function clearStatusMessage() {
        const uploadStatus = document.getElementById('upload-status');
        uploadStatus.innerHTML = '';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    function showSelectedFile(file) {
        const selectedFileDiv = document.getElementById('selected-file');
        selectedFileDiv.innerHTML = `
            <i class="fas fa-file-csv"></i>
            <span class="file-name">${file.name}</span>
            <span class="file-size">${formatFileSize(file.size)}</span>
            <button type="button" class="remove-file" title="Remove file">
                <i class="fas fa-times"></i>
            </button>
        `;
        selectedFileDiv.classList.add('active');

        // Add remove file functionality
        const removeBtn = selectedFileDiv.querySelector('.remove-file');
        removeBtn.addEventListener('click', function () {
            document.getElementById('csv_file').value = '';
            selectedFileDiv.classList.remove('active');
            selectedFileDiv.innerHTML = '';
        });
    }

    // Clear error and show filename when file is selected
    const fileInput = document.getElementById('csv_file');
    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files.length > 0) {
                clearStatusMessage();
                showSelectedFile(this.files[0]);
            }
        });
    }


    document.getElementById('sentiment-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(document.getElementById('sentiment-form'));
        const file = formData.get('csv_file');

        if (!file || !file.name || file.size === 0) {
            showErrorAnimation('Please select a file first!');
            return;
        }

        if (!file.name.endsWith('.csv')) {
            showErrorAnimation('Please upload a CSV file only.');
            return;
        }

        showAnalyzingAnimation();

        try {
            // Upload the file and run analysis
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!result.success) {
                throw new Error(result.message);
            }

            // Display results
            await displayResults();

        } catch (error) {
            showErrorAnimation(`Error: ${error.message}`);
            document.getElementById('analysis-results').classList.add('hidden');
        }
    });

    function showSuccessAnimation() {
        const uploadStatus = document.getElementById('upload-status');
        uploadStatus.innerHTML = `
            <div class="success-animation">
                <span class="success-text">Analysis completed successfully!</span>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
        `;
    }

    async function displayResults() {
        try {
            // Fetch analysis summary
            const response = await fetch('/analysis_summary.json');
            const summary = await response.json();

            // Create results HTML
            let resultsHTML = `
                <div class="summary-stats">
                    <h3>Analysis Summary</h3>
                    <p>Total Reviews: ${summary.total_reviews}</p>
                    <p>Average Sentiment: ${summary.average_polarity.toFixed(2)}</p>
                    <div class="sentiment-breakdown">
                        <h4>Sentiment Breakdown:</h4>
                        <ul>
                            ${Object.entries(summary.sentiment_counts).map(([category, count]) =>
                `<li>${category}: ${count}</li>`
            ).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="visualizations">
                    <div class="viz-row">
                        <div class="viz-item">
                            <h3>Sentiment Distribution</h3>
                            <img src="/images/sentiment_distribution.png" alt="Sentiment Distribution">
                        </div>
                        <div class="viz-item">
                            <h3>Sentiment Categories</h3>
                            <img src="/images/sentiment_categories.png" alt="Sentiment Categories">
                        </div>
                    </div>
                    <div class="viz-row">
                        <div class="viz-item">
                            <h3>Word Cloud - Positive Reviews</h3>
                            <img src="/images/wordcloud_positive_reviews.png" alt="Positive Reviews Word Cloud">
                        </div>
                        <div class="viz-item">
                            <h3>Word Cloud - Negative Reviews</h3>
                            <img src="/images/wordcloud_negative_reviews.png" alt="Negative Reviews Word Cloud">
                        </div>
                    </div>
                    <div class="viz-row">
                        <div class="viz-item">
                            <h3>Subjectivity vs Polarity</h3>
                            <img src="/images/subjectivity_polarity.png" alt="Subjectivity vs Polarity">
                        </div>
                    </div>
                </div>
                
                <div class="example-reviews">
                    <h3>Example Reviews</h3>
                    <div class="review-box positive">
                        <h4>Most Positive Review</h4>
                        <p>${summary.most_positive}</p>
                    </div>
                    <div class="review-box negative">
                        <h4>Most Negative Review</h4>
                        <p>${summary.most_negative}</p>
                    </div>
                </div>
            `;

            document.getElementById('results-display').innerHTML = resultsHTML;
            document.getElementById('analysis-results').classList.remove('hidden');
            showSuccessAnimation();

        } catch (error) {
            document.getElementById('upload-status').textContent = `Error displaying results: ${error.message}`;
        }
    }
});