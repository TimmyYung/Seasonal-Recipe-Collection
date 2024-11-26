# Seasonal Recipe Collection  
**A TerraHacks 2024 Submission**  
**Authors:** Timothy Yung, Joanne Wijetunga, Pritumi Patel, Kyle Truong  

<p align="center">
  <img src="images/logo.png" width="350px" alt="Seasonal Recipe Collection Logo"/>
</p>

## Demo Video  
[Watch the Demo](https://youtu.be/661ssGl4ef0)

## Overview  
Seasonal Recipe Collection is a web application designed to make eating both enjoyable and eco-friendly. By focusing on recipes that use seasonal ingredients, users can enjoy fresher, more flavorful meals while reducing the environmental impact of transporting out-of-season produce.  

This project was created in a **36-hour timeframe** for **TerraHacks 2024**.  

---

## Features  

1. **Find Your Location:** The app determines your current location to identify locally available ingredients.  
2. **Seasonal Ingredients:** It identifies fruits, vegetables, and herbs that are in season for the current month in your area.  
3. **Recipe Recommendations:** Provides a curated list of recipes featuring seasonal ingredients, complete with detailed ingredient lists and step-by-step instructions.  

---

## Tech Stack  

- **Front-end:** React + JavaScript (optimized with Vite)  
- **Back-end:** Python + Flask  

---

## Instructions  

To run the project locally:  

1. Create a Python virtual environment:  
   ```bash
   python -m venv /path/to/new/virtual/environment
   ```  
2. Install dependencies:  
   ```bash
   pip install -r requirements.txt
   ```  
3. Start the back-end server:  
   - Navigate to the `backend` directory and run:  
     ```bash
     flask run
     ```  
4. Start the front-end development server:  
   - In a separate terminal, run:  
     ```bash
     npm run dev
     ```

---

## Inspiration  

The inspiration for this project came from the desire to promote sustainable eating habits while making meal preparation more enjoyable and convenient. Eating seasonally not only enhances food quality but also supports local agriculture and reduces carbon footprints.

---

## How We Built It  

- The **front-end** was developed using **React** and **JavaScript**, leveraging Vite for faster builds and optimized development.  
- The **back-end** was built using **Python** and **Flask**, handling data processing and API requests.  
- To address the lack of readily available seasonal ingredient data, we implemented web scraping techniques to collect information from various sources.

---

## Challenges We Faced  

- **Lack of APIs:** There were no existing APIs or databases that provided seasonal ingredient data based on location and month, so we had to create our own solution from scratch.  
- **Web Scraping at Scale:** The website we needed to scrape had thousands of pages, making sequential scraping impractical due to time constraints. We implemented concurrency techniques to scrape up to 500 pages simultaneously, significantly speeding up the process.

---

## Accomplishments We're Proud Of  

1. Successfully building a fully functional application within 36 hours as part of our first hackathon experience.  
2. Learning and applying new technologies like React, Flask, and concurrent web scraping during the hackathon itself.  
3. Creating a scalable solution for gathering seasonal ingredient data despite initial technical limitations.

---

## What We Learned  

- Hands-on experience with React’s component-based architecture, state management, and building interactive user interfaces.
- Efficient web scraping techniques using concurrency to handle large-scale data extraction.
- Building and managing back-end servers with Flask, including handling HTTP requests and integrating with front-end applications.
- Basic computer vision concepts for potential future features involving image recognition.

---

## What's Next for Seasonal Recipe Collection  

1. **Ingredient Recognition via Computer Vision:** Allow users to upload images of their fridge contents so the system can identify ingredients and suggest personalized recipes.
2. **Streamlined Recipe Content:** Develop a tool to extract essential information from existing recipe websites, presenting it in a simplified format for easier use.
3. **Enhanced User Experience:** Add features like real-time notifications for seasonal updates or integration with grocery delivery services.

---

Seasonal Recipe Collection is more than just a recipe app—it’s a step toward sustainable living by encouraging mindful eating habits that benefit both individuals and the planet!
