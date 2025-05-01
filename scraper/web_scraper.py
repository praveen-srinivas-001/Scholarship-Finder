"""
Scholarship Finder - Web Scraper Module
This script scrapes scholarship information from various websites and stores it in MongoDB.
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
from datetime import datetime
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# MongoDB Connection
def connect_to_mongodb():
    try:
        # Replace with your MongoDB connection URI
        client = MongoClient("mongodb+srv://pravns26:KarKavi@scholarship-database.acsyi.mongodb.net/?retryWrites=true&w=majority&appName=scholarship-database")
        db = client["scholarship_finder"]
        collection = db["scholarships"]
        print("Connected to MongoDB successfully")
        return collection
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

# Sample scraper for Buddy4Study website
def scrape_buddy4study():
    scholarships = []
    try:
        # Set up headless Chrome browser
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        driver = webdriver.Chrome(options=chrome_options)
        
        # Navigate to Buddy4Study scholarship page
        print("Scraping Buddy4Study...")
        url = "https://www.buddy4study.com/scholarships"
        driver.get(url)
        
        # Wait for the page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "scholarship-list-item"))
        )
        
        # Get scholarship items
        items = driver.find_elements(By.CLASS_NAME, "scholarship-list-item")
        
        for item in items:
            try:
                name = item.find_element(By.CSS_SELECTOR, ".scholarship-title").text.strip()
                provider = item.find_element(By.CSS_SELECTOR, ".provider-name").text.strip()
                deadline_text = item.find_element(By.CSS_SELECTOR, ".deadline-text").text.strip()
                # Extract deadline date from text like "Last Date: 31 Dec 2023"
                deadline = deadline_text.replace("Last Date: ", "")
                
                # Try to get eligibility info
                try:
                    eligibility = item.find_element(By.CSS_SELECTOR, ".eligibility-text").text.strip()
                except:
                    eligibility = "Details on website"
                
                # Get link to the scholarship page
                link_element = item.find_element(By.CSS_SELECTOR, "a.scholarship-title")
                url = link_element.get_attribute("href")
                
                # Create scholarship object
                scholarship = {
                    "scholarship_id": name.lower().replace(" ", "_") + "_" + provider.lower().replace(" ", "_"),
                    "name": name,
                    "provider": provider,
                    "deadline": deadline,
                    "eligibility": eligibility,
                    "url": url,
                    "source": "Buddy4Study",
                    "last_updated": datetime.now()
                }
                scholarships.append(scholarship)
                
            except Exception as e:
                print(f"Error extracting scholarship info: {e}")
        
        driver.quit()
        return scholarships
    
    except Exception as e:
        print(f"Error scraping Buddy4Study: {e}")
        return scholarships

# Sample scraper for National Scholarship Portal (simplified)
def scrape_nsp():
    scholarships = []
    try:
        # For demonstration - in real implementation, this would use Selenium
        # to navigate through NSP's dynamic content
        print("Scraping National Scholarship Portal...")
        
        # Simulating some sample NSP scholarships
        # In actual implementation, use Selenium to extract this data
        sample_nsp_scholarships = [
            {
                "scholarship_id": "post_matric_scholarship_minorities",
                "name": "Post-Matric Scholarship for Minorities",
                "provider": "Ministry of Minority Affairs",
                "deadline": "31 Oct 2023",
                "eligibility": "Minority students with family income < 2.5 lakh per annum",
                "url": "https://scholarships.gov.in/",
                "category": "minority",
                "source": "NSP",
                "last_updated": datetime.now()
            },
            {
                "scholarship_id": "central_sector_scheme",
                "name": "Central Sector Scheme of Scholarship",
                "provider": "Ministry of Education",
                "deadline": "31 Oct 2023",
                "eligibility": "Top 20 percentile in Class 12 exam",
                "url": "https://scholarships.gov.in/",
                "category": "merit",
                "source": "NSP",
                "last_updated": datetime.now()
            }
        ]
        
        scholarships.extend(sample_nsp_scholarships)
        return scholarships
    
    except Exception as e:
        print(f"Error in NSP scraper: {e}")
        return scholarships

# Main function to run all scrapers and update database
def run_scrapers():
    # Connect to MongoDB
    collection = connect_to_mongodb()
    if collection is None:
        return
    
    # Run scrapers
    all_scholarships = []
    
    # Run Buddy4Study scraper
    buddy4study_scholarships = scrape_buddy4study()
    all_scholarships.extend(buddy4study_scholarships)
    print(f"Found {len(buddy4study_scholarships)} scholarships from Buddy4Study")
    
    # Run NSP scraper
    nsp_scholarships = scrape_nsp()
    all_scholarships.extend(nsp_scholarships)
    print(f"Found {len(nsp_scholarships)} scholarships from NSP")
    
    # Update database
    if all_scholarships:
        for scholarship in all_scholarships:
            # Update if exists, insert if not
            collection.update_one(
                {"scholarship_id": scholarship["scholarship_id"]},
                {"$set": scholarship},
                upsert=True
            )
        
        print(f"Successfully updated {len(all_scholarships)} scholarships in database")
    else:
        print("No scholarships found")

if __name__ == "__main__":
    run_scrapers()