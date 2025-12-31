# 📊 Sentiment Analysis Tool - v2.0

<div align="center">

![Sentiment Analysis](https://img.shields.io/badge/Sentiment-Analysis-6366f1?style=for-the-badge)
![Version](https://img.shields.io/badge/version-2.0.0-a855f7?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge)

**A modern, full-stack web application for analyzing sentiment in customer reviews and feedback**

  [Installation](#installation) · [Documentation](./docs)

</div>

---

## ✨ What's New in v2.0

- 🎨 **Complete UI/UX Redesign** - Modern, premium interface with glassmorphism effects
- 📊 **Enhanced Analytics** - Beautiful visualizations with progress bars and stat cards
- 🚀 **Improved Performance** - Optimized file handling and processing
- 📱 **Fully Responsive** - Perfect experience on desktop, tablet, and mobile
- 🎭 **Better UX** - File selection display, error handling, and smooth animations
- 🔒 **Enhanced Security** - 10MB file size limits and improved validation

---

## 🌟 Features

### Core Functionality
- **✅ CSV File Upload** - Drag & drop or click to upload review datasets
- **📈 Sentiment Analysis** - Powered by TextBlob and NLTK for accurate results
- **📊 Visual Analytics** - Interactive charts and word clouds
- **💬 Example Reviews** - See most positive and negative reviews
- **🎯 Real-time Processing** - Fast analysis with progress indicators

### Analysis Insights
- Overall sentiment score and classification
- Sentiment distribution (Positive/Negative/Neutral)
- Word clouds for positive and negative reviews
- Subjectivity vs polarity analysis
- Detailed sentiment breakdown with percentages

### Modern UI/UX
- Clean, intuitive interface with gradient themes
- Smooth animations and micro-interactions
- Glassmorphism design elements
- Responsive grid layouts
- Dark accents with vibrant colors

---

## 🏗️ Project Structure

```
Sentiment-Analysis/
├── 📄 server/                    # Node.js/Express backend
│   ├── controllers/             # Request handlers
│   ├── middleware/              # Upload & validation middleware
│   ├── routes.js               # API routes
│   └── server.js               # Main server file
│
├── 🎨 public/                    # Frontend files
│   ├── index.html              # Main application page
│   ├── data.html               # Sample datasets page
│   ├── docs.html               # Documentation page
│   ├── style.css               # Modern CSS with design system
│   ├── script.js               # Client-side JavaScript
│   └── images/                 # Generated analysis visualizations
│
├── 🐍 seti.py                    # Python ML analysis script
├── 📊 data/                      # Sample CSV datasets
│   ├── Reviews.csv             # Restaurant reviews (1000+)
│   ├── hotel_reviews.csv       # Hotel reviews
│   ├── movie_reviews.csv       # Movie reviews
│   └── tech_reviews.csv        # Tech product reviews
│
├── 🧪 tests/                     # Test files
│   ├── server.test.js          # Node.js tests
│   └── test_seti.py            # Python tests
│
├── 📝 requirements.txt           # Python dependencies
├── 📦 package.json              # Node.js dependencies
├── ⚙️ nodemon.json               # Development server config
└── 📖 README.md                 # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Python** >= 3.8

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hritikraj8804/Sentiment-Analysis.git
   cd Sentiment-Analysis
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Download NLTK data** (first time only)
   ```python
   python -c "import nltk; nltk.download('punkt'); nltk.download('stopwords')"
   ```

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The application will be available at **http://localhost:3000**

---

## 📖 Usage

### 1. Upload Your Data

- Click **"Choose CSV File"** button
- Select a CSV file with reviews (max 10MB)
- See the selected filename and size displayed
- Click **"Analyze"** to start processing

### 2. CSV Format

Your CSV file should have at least one column with text data:

```csv
Review,Liked
"Great product, highly recommend!",1
"Poor quality, disappointed.",0
"It's okay, nothing special.",2
```

**Supported sentiment values:**
- `1` - Positive
- `0` - Negative  
- `2` - Neutral (optional)

### 3. View Results

The analysis provides:
- **Overall Sentiment** - Classified as Positive, Negative, or Neutral
- **Statistics** - Total reviews, sentiment breakdown with percentages
- **Visualizations** - Distribution charts, pie charts, word clouds
- **Example Reviews** - Most positive and most negative examples

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - ES6+ features
- **Font Awesome** - Icons
- **Google Fonts** - Inter & Poppins typography

### Machine Learning / NLP
- **Python 3** - Analysis engine
- **TextBlob** - Sentiment analysis
- **NLTK** - Natural language processing
- **pandas** - Data manipulation
- **matplotlib** - Visualization generation
- **WordCloud** - Word cloud creation

### Development
- **nodemon** - Auto-restart development server
- **Jest** - JavaScript testing
- **pytest** - Python testing
- **ESLint** - Code linting

---

## 📊 API Endpoints

### POST `/api/analyze`
Upload and analyze a CSV file

**Request:**
- Content-Type: `multipart/form-data`
- Body: `csv_file` (file)

**Response:**
```json
{
  "success": true,
  "message": "Analysis completed successfully"
}
```

### GET `/data/:filename`
Download sample dataset files

---

## 🎨 Design System

### Color Palette
- **Primary**: Purple/Blue gradient (`#6366f1` to `#a855f7`)
- **Success**: Green (`#22c55e`)
- **Error**: Red (`#ef4444`)
- **Warning**: Amber (`#f59e0b`)

### Typography
- **Body**: Inter (400, 500, 600, 700)
- **Headings**: Poppins (600, 700, 800)

### Components
- Glassmorphism cards with backdrop blur
- Smooth animations (200-300ms cubic-bezier)
- Rounded corners (0.5rem to 1.5rem)
- Elevated shadows with multiple layers

---

## 🧪 Testing

### Run JavaScript tests:
```bash
npm test
```

### Run Python tests:
```bash
pytest
```

### Run linting:
```bash
npm run lint
```

---

## 📝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Commit Convention
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test updates
- `chore:` - Maintenance tasks

---

## 🐛 Troubleshooting

### File Upload Issues
- Ensure file is `.csv` format
- Check file size is under 10MB
- Verify CSV has proper column headers

### Analysis Errors
- Use UTF-8 encoding for special characters
- Ensure at least one text column exists
- Check for malformed CSV data

### Server Issues
- Kill existing Node processes: `killall node` (Mac/Linux) or `Stop-Process -Name node -Force` (Windows)
- Clear uploads folder if needed
- Restart with `npm run dev`

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Hritikraj**
- GitHub: [@Hritikraj8804](https://github.com/Hritikraj8804)
- Project: [Sentiment-Analysis](https://github.com/Hritikraj8804/Sentiment-Analysis)

---

## 🙏 Acknowledgments

- TextBlob for sentiment analysis capabilities
- The open-source community for amazing tools and libraries
- All contributors who have helped improve this project

---

## 📸 Screenshots

### Main Dashboard
![Dashboard](./public/intro.gif)

### Analysis Results
Beautiful visualizations with:
- Sentiment distribution charts
- Category breakdown pie charts  
- Positive & negative word clouds
- Subjectivity analysis
- Example reviews with badges

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ by Hritikraj | [Report Bug](https://github.com/Hritikraj8804/Sentiment-Analysis/issues) | [Request Feature](https://github.com/Hritikraj8804/Sentiment-Analysis/issues)

</div>
