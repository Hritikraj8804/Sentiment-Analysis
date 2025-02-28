import pytest
import pandas as pd
from seti import analyze_sentiment, generate_wordcloud

def test_analyze_sentiment():
    # Test data
    test_data = pd.DataFrame({
        'review_text': [
            'This is a great product!',
            'I really hate this product.',
            'The product is okay.'
        ]
    })
    
    # Test analysis
    result = analyze_sentiment(test_data)
    assert result is not None
    assert 'total_reviews' in result
    assert result['total_reviews'] == 3

def test_generate_wordcloud():
    # Test data
    texts = ['This is a great product!', 'Amazing service', 'Wonderful experience']
    
    # Test wordcloud generation
    image_path = 'test_wordcloud.png'
    result = generate_wordcloud(texts, image_path)
    assert result is True  # Assuming the function returns True on success

def test_empty_input():
    # Test empty DataFrame
    empty_data = pd.DataFrame({'review_text': []})
    with pytest.raises(ValueError):
        analyze_sentiment(empty_data)

def test_invalid_input():
    # Test invalid DataFrame (missing required column)
    invalid_data = pd.DataFrame({'wrong_column': ['Test']})
    with pytest.raises(KeyError):
        analyze_sentiment(invalid_data) 