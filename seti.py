import pandas as pd
import numpy as np
from textblob import TextBlob
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from collections import Counter
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
import sys
import json
import os
import shutil
import glob

# Download required NLTK data
try:
    nltk.download('punkt')
    nltk.download('stopwords')
except:
    pass

def clean_old_files():
    """Clean up old analysis files."""
    # Clean up old images
    image_dir = os.path.join('public', 'images')
    if os.path.exists(image_dir):
        shutil.rmtree(image_dir)
    os.makedirs(image_dir)

    # Clean up old JSON
    json_path = os.path.join('public', 'analysis_summary.json')
    if os.path.exists(json_path):
        os.remove(json_path)

def clean_text(text):
    """Clean and preprocess text data."""
    if isinstance(text, str):
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        # Convert to lowercase
        text = text.lower()
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text
    return ''

def get_sentiment(text):
    """Get sentiment scores using TextBlob."""
    try:
        analysis = TextBlob(str(text))
        # Return polarity (-1 to 1) and subjectivity (0 to 1)
        return analysis.sentiment.polarity, analysis.sentiment.subjectivity
    except:
        return 0, 0

def generate_wordcloud(texts, title, image_dir):
    """Generate and save wordcloud image."""
    # Combine all texts
    text = ' '.join(texts)
    
    # Create and generate a word cloud image
    wordcloud = WordCloud(width=800, height=400,
                         background_color='white',
                         max_words=150,
                         contour_width=3,
                         contour_color='steelblue').generate(text)
    
    # Display the word cloud
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.title(title)
    plt.savefig(os.path.join(image_dir, f'wordcloud_{title.lower().replace(" ", "_")}.png'), bbox_inches='tight', dpi=300)
    plt.close()

def analyze_sentiment(csv_path):
    """Main function to analyze sentiments from CSV file."""
    try:
        # Clean up old analysis files first
        clean_old_files()

        # Validate file exists
        if not os.path.exists(csv_path):
            raise FileNotFoundError("CSV file not found")

        # Read CSV file
        try:
            df = pd.read_csv(csv_path)
        except pd.errors.EmptyDataError:
            raise ValueError("The CSV file is empty")
        except pd.errors.ParserError:
            raise ValueError("Invalid CSV file format")

        if df.empty:
            raise ValueError("The CSV file contains no data")
        
        # Find text column (assuming it's the longest string column)
        text_columns = df.select_dtypes(include=['object']).columns
        if len(text_columns) == 0:
            raise ValueError("No text columns found in CSV")

        text_column = None
        max_avg_length = 0
        
        for col in text_columns:
            avg_length = df[col].str.len().mean()
            if avg_length > max_avg_length:
                max_avg_length = avg_length
                text_column = col
        
        if text_column is None:
            raise ValueError("No suitable text column found in CSV")

        # Get the image directory (already created by clean_old_files)
        image_dir = os.path.join('public', 'images')

        # Clean text data
        df['cleaned_text'] = df[text_column].apply(clean_text)
        
        # Validate if we have any valid text after cleaning
        if df['cleaned_text'].str.strip().str.len().sum() == 0:
            raise ValueError("No valid text found after cleaning")

        # Get sentiment scores
        sentiments = [get_sentiment(text) for text in df['cleaned_text']]
        df['polarity'] = [s[0] for s in sentiments]
        df['subjectivity'] = [s[1] for s in sentiments]
        
        # Categorize sentiments
        df['sentiment_category'] = pd.cut(df['polarity'],
                                        bins=[-1, -0.1, 0.1, 1],
                                        labels=['Negative', 'Neutral', 'Positive'])
        
        # Set plot style
        plt.style.use('ggplot')
        
        # 1. Sentiment Distribution
        plt.figure(figsize=(10, 6))
        plt.hist(df['polarity'], bins=30, edgecolor='black')
        plt.title('Sentiment Distribution')
        plt.xlabel('Polarity')
        plt.ylabel('Count')
        plt.savefig(os.path.join(image_dir, 'sentiment_distribution.png'), bbox_inches='tight', dpi=300)
        plt.close()
        
        # 2. Sentiment Categories Pie Chart
        plt.figure(figsize=(8, 8))
        sentiment_counts = df['sentiment_category'].value_counts()
        plt.pie(sentiment_counts, labels=sentiment_counts.index, autopct='%1.1f%%')
        plt.title('Sentiment Categories Distribution')
        plt.savefig(os.path.join(image_dir, 'sentiment_categories.png'), bbox_inches='tight', dpi=300)
        plt.close()
        
        # 3. Word Clouds
        generate_wordcloud(df[df['polarity'] > 0.1]['cleaned_text'], 'Positive Reviews', image_dir)
        generate_wordcloud(df[df['polarity'] < -0.1]['cleaned_text'], 'Negative Reviews', image_dir)
        
        # 4. Subjectivity vs Polarity Scatter Plot
        plt.figure(figsize=(10, 6))
        plt.scatter(df['polarity'], df['subjectivity'], alpha=0.5)
        plt.title('Subjectivity vs Polarity')
        plt.xlabel('Polarity')
        plt.ylabel('Subjectivity')
        plt.grid(True)
        plt.savefig(os.path.join(image_dir, 'subjectivity_polarity.png'), bbox_inches='tight', dpi=300)
        plt.close()
        
        # Calculate summary statistics
        summary = {
            'total_reviews': len(df),
            'average_polarity': df['polarity'].mean(),
            'sentiment_counts': df['sentiment_category'].value_counts().to_dict(),
            'most_positive': df.loc[df['polarity'].idxmax(), text_column],
            'most_negative': df.loc[df['polarity'].idxmin(), text_column],
        }
        
        # Save summary to JSON
        with open(os.path.join('public', 'analysis_summary.json'), 'w') as f:
            json.dump(summary, f)
        
        return True, "Analysis completed successfully"
        
    except Exception as e:
        return False, str(e)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python seti.py <path_to_csv>")
        sys.exit(1)
        
    success, message = analyze_sentiment(sys.argv[1])
    print(json.dumps({"success": success, "message": message}))