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

    document.getElementById('sentiment-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(document.getElementById('sentiment-form'));
        const file = formData.get('csv_file');
        
        if (!file) {
            document.getElementById('upload-status').textContent = 'Please select a CSV file.';
            return;
        }

        if (!file.name.endsWith('.csv')) {
            document.getElementById('upload-status').textContent = 'Please upload a CSV file only.';
            return;
        }

        document.getElementById('upload-status').textContent = 'Analyzing... Please wait.';
        
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
            document.getElementById('upload-status').textContent = `Error: ${error.message}`;
            document.getElementById('analysis-results').classList.add('hidden');
        }
    });

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
            document.getElementById('upload-status').textContent = 'Analysis completed successfully!';
            
        } catch (error) {
            document.getElementById('upload-status').textContent = `Error displaying results: ${error.message}`;
        }
    }
});