# Sentiment Analysis 

This repository contains a comprehensive sentiment analysis project that includes a machine learning model for training and testing, and data analysis for sentiment analysis.

## Project Overview

The project aims to develop a sentiment analysis model that can classify reviews as positive or negative. The model is trained on a dataset of reviews and uses various preprocessing techniques such as lowercasing, removing stop words, lemmatization, and stemming to prepare the text data for modeling. The model is then deployed as an HTML app that takes user input reviews and provides sentiment analysis.

## Project Structure

The project structure is as follows:

📁 app: # This folder contains the HTML app for user input and sentiment analysis.<br /> 
📁 data: # This folder contains the dataset of reviews used for training and testing the model.<br /> 
📁 models: # This folder contains the machine learning model used for sentiment analysis.<br /> 
📁 notebooks: # This folder contains Jupyter notebooks for data analysis and model development. <br /> 
📁 preprocessing: # This folder contains scripts for preprocessing the text data. README.md: # This file provides an overview of the project.


## How to Use

To use the project, follow these steps:

1. **Clone** the repository to your local machine:
```bash
   https://github.com/Hritikraj8804/ML_practice.git
```
navigate to Intership_project folder and open it.

2. Open the ```Internship_Project``` folder and run ```Sentiment_analysis.ipynb``` in a Jupyter Notebook.

3. Enter a review in the input field and click the "Sumbit" button.

4. The app will display the sentiment analysis of the review.

## Model Development
The machine learning model used for sentiment analysis is a Multinomial Naive Bayes classifier. The model was trained on a dataset of reviews using TF-IDF vectorization to transform the text into numerical features. The performance of the model was evaluated using the accuracy score and a detailed classification report.

## Preprocessing Steps
**Lowercasing**: Converts all text to lowercase.<br /> 
Removing stop words: Common words (e.g., "the", "is") are removed as they do not contribute much to sentiment.<br /> 
**Lemmatization**: Converts words to their base form (e.g., "running" becomes "run").<br /> 
**Stemming**: Reduces words to their root form (e.g., "fishing" becomes "fish").<br /> 

## Data Analysis
The data analysis was conducted using Jupyter notebooks. These notebooks contain scripts for:

**Data preprocessing**: Cleaning and preparing the dataset for model training.<br /> 
**Feature engineering**: Extracting useful features from the text data.<br /> 
**Model development**: Implementing and fine-tuning the sentiment analysis model.<br /> 

## Technologies Used
The project utilizes the following technologies:

**Python**: For machine learning model development and data analysis.<br /> 
**Jupyter Notebooks**: For exploring and analyzing the dataset.<br /> 
**TF-IDF Vectorization**: For converting text data into numerical form.<br /> 
**Multinomial Naive Bayes**: A machine learning algorithm used for sentiment analysis.<br /> 

## License
This project is licensed under the MIT License.

## Contributing
Contributions to the project are welcome! If you'd like to contribute, please follow these steps:<br /> 
Fork the repository.<br /> 
Create a new branch for your feature or bug fix.<br /> 
Submit a pull request with your changes.
# We appreciate your contribution!
