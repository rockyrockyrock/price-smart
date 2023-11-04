# ecommerce-admin (E-Commerce Admin Dashboard)
#### This is a 2-part project. Please visit ecommerce-store for reference.

<br>

## Introduction
The E-Commerce Admin Dashboard along with the E-Commerce store is an e-commerce solution.
This project aims to streamline the management of multiple vendors and stores and their operations. 
It provides features, including vendor and store management, a content management system (CMS), automated API endpoint generation, order tracking, and payment processing. 
My primary focus is to simplify the management of e-commerce stores, making it more efficient and user-friendly.

<br>

## Objective
- Vendor and Store Management: Users can create and manage multiple stores.
- Content Management: Administrators can manage store content, including products, images, categories, and billboards.
- Order Tracking: Administrators can monitor the sales process and keep track of orders in real-time.
- Dashboard: Provide graphical representations of revenue and sales data to give users a quick overview of the e-commerce operations.
- Authentication and Payment Processing: Implement Clerk Authentication for security. And, Stripe integration ensures secure payment transactions.

<br> 

## High-Level Design


#### E-Commerce Integration
The admin dashboard serves as the backend for the e-commerce store, incorporating a Content Management System (CMS), admin functionalities, and API routes to ensure smooth operations.

#### Vendor Management
The dashboard allows multiple vendors by automatically generating dedicated API routes for each vendor. This dynamic feature allows for vendor control and individualized storefront management.

#### Data Storage
The project utilizes Prisma in conjunction with MySQL as the database system for storing and managing critical data, including product and store details. This setup enables seamless Create, Read, Update, and Delete (CRUD) operations through the admin site, providing administrators with complete control.

#### End-to-End Payment Processing
Stripe is the chosen payment gateway, providing secure and convenient payment transactions for both administrators and customers.

#### Deployment
Ecommerce-Admin's frontend and backend are hosted on Vercel and built with Next.js 13. This deployment ensures reliability and performance for the admin dashboard.

<br> 

## Reference
Next.js: https://nextjs.org/docs
