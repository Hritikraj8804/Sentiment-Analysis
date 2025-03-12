// Download functionality
function generatePDF(results) {
    // Create a formatted HTML content
    const content = `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { color: #1a237e; }
                    h2 { color: #283593; }
                    .section { margin: 20px 0; }
                    .metric { margin: 10px 0; }
                    .key-phrase { margin: 5px 0; }
                </style>
            </head>
            <body>
                <h1>Sentiment Analysis Results</h1>
                
                <div class="section">
                    <h2>Overall Sentiment</h2>
                    <div class="metric">${results.overallSentiment}</div>
                </div>

                <div class="section">
                    <h2>Confidence Score</h2>
                    <div class="metric">${results.confidenceScore}</div>
                </div>

                <div class="section">
                    <h2>Sentiment Distribution</h2>
                    <div class="metric">Positive: ${results.sentimentDistribution.positive}</div>
                    <div class="metric">Neutral: ${results.sentimentDistribution.neutral}</div>
                    <div class="metric">Negative: ${results.sentimentDistribution.negative}</div>
                </div>

                <div class="section">
                    <h2>Key Phrases</h2>
                    ${results.keyPhrases.map(phrase => `<div class="key-phrase">• ${phrase}</div>`).join('')}
                </div>
            </body>
        </html>
    `;

    // Create blob with HTML content
    const blob = new Blob([content], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment-analysis-results.html';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function generateWord(results) {
    // Create a formatted HTML content for Word
    const content = `
        <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { color: #1a237e; }
                    h2 { color: #283593; }
                    .section { margin: 20px 0; }
                    .metric { margin: 10px 0; }
                    .key-phrase { margin: 5px 0; }
                </style>
            </head>
            <body>
                <h1>Sentiment Analysis Results</h1>
                
                <div class="section">
                    <h2>Overall Sentiment</h2>
                    <div class="metric">${results.overallSentiment}</div>
                </div>

                <div class="section">
                    <h2>Confidence Score</h2>
                    <div class="metric">${results.confidenceScore}</div>
                </div>

                <div class="section">
                    <h2>Sentiment Distribution</h2>
                    <div class="metric">Positive: ${results.sentimentDistribution.positive}</div>
                    <div class="metric">Neutral: ${results.sentimentDistribution.neutral}</div>
                    <div class="metric">Negative: ${results.sentimentDistribution.negative}</div>
                </div>

                <div class="section">
                    <h2>Key Phrases</h2>
                    ${results.keyPhrases.map(phrase => `<div class="key-phrase">• ${phrase}</div>`).join('')}
                </div>
            </body>
        </html>
    `;

    // Create blob with HTML content
    const blob = new Blob([content], { type: 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sentiment-analysis-results.doc';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function getResults() {
    return {
        overallSentiment: document.getElementById('overallSentiment').textContent,
        sentimentDistribution: {
            positive: document.querySelector('.distribution-bar.positive .value').textContent,
            neutral: document.querySelector('.distribution-bar.neutral .value').textContent,
            negative: document.querySelector('.distribution-bar.negative .value').textContent
        },
        keyPhrases: Array.from(document.getElementById('keyPhrases').children).map(phrase => phrase.textContent),
        confidenceScore: document.getElementById('confidenceScore').textContent
    };
}

// Add event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    const downloadPDF = document.getElementById('downloadPDF');
    const downloadWord = document.getElementById('downloadWord');

    if (downloadPDF) {
        downloadPDF.addEventListener('click', function(e) {
            e.preventDefault();
            generatePDF(getResults());
        });
    }

    if (downloadWord) {
        downloadWord.addEventListener('click', function(e) {
            e.preventDefault();
            generateWord(getResults());
        });
    }
}); 