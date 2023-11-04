# price-smart (Price Smart)

<br>

## Introduction
Price Smart is an Amazon price tracker, and users can subscribe to product price and inventory changes via email notifications. 
My primary goal is implementing web scraping techniques and cron jobs on Vercel.


<br>

## Objective
- Web Scraping: Scrap product information from Amazon.
- Data Storage: Store the scraped data.
- Alert System: Check for price and inventory changes, and send email notifications if a change is detected.

<br> 

## High-Level Design


#### Amazon Data Scraping
This project utilizes Cheerio and Axios to scrape product data from Amazon. This data includes price information, inventory status, and more.

#### Database Management
Scraped data is stored in a MongoDB database, which ensures efficient storage and retrieval of product information.

#### Automated Alert System
Cron jobs are configured to run every 24 hours, checking for any price or inventory changes in the database. If a change is detected, Nodemailer is used to send email alerts to the respective users.

#### Deployment
This application is deployed on Vercel.

<br> 

## Reference
Next.js: https://nextjs.org/docs
