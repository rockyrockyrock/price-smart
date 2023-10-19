import { NextResponse } from "next/server";

import Product from "@/lib/models/product.model";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { connectToDB } from "@/lib/scraper/mongoose";
import {
  getAveragePrice,
  getEmailNotificationType,
  getHighestPrice,
  getLowestPrice,
} from "@/lib/utils";

export const maxDuration = 10;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    connectToDB();

    // Get all products from the database to update them
    const products = await Product.find({});

    if (!products) {
      throw new Error("No products found.");
    }

    // 1. Scrape latest product details and update the database
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url); // scrape the product from Amazon

        if (!scrapedProduct) {
          throw new Error("No products found.");
        }

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ]; // update the price history

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        }; // update the product variable

        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product
        ); // update the product in the database

        // 2. Check each product's status and send emails accordingly
        const emailNotificationType = getEmailNotificationType(
          scrapedProduct,
          currentProduct
        );

        // If there is a price drop or inventory change and there are users who want to be notified, send email
        if (emailNotificationType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          }; // get the product info

          const emailContent = generateEmailBody(
            productInfo,
            emailNotificationType
          ); // generate email content

          const userEmails = updatedProduct.users.map(
            (user: any) => user.email
          ); // get the user emails

          await sendEmail(emailContent, userEmails); // send email
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "OK",
      data: updatedProducts,
    });
  } catch (error) {
    throw new Error(`Error in GET: ${error}`);
  }
}
