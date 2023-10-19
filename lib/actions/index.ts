"use server";

import { revalidatePath } from "next/cache";

import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../scraper";
import { connectToDB } from "../scraper/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) {
    throw new Error("Product URL is required.");
  }

  try {
    // Connect to DB
    await connectToDB();

    // Scrape the product
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) {
      throw new Error("Failed to scrape the product.");
    }

    let product = scrapedProduct;

    // Create a product variable from the scraped product
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    // If there is a product with the same url, update the price history
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      // Update the product variable
      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    // Update or create the product model using the updated product variable
    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true } // create on if the product does not exist in the product model
    );

    // Nextjs13 does not clear network cache, meaning it remains static
    // After update/create the product info, we have to revalidate the path so that the new info is available
    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    console.error(`Failed to create/update product: ${error.message}`);
    throw error;
  }
}

export async function getProductById(productId: string) {
  try {
    await connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return null;
    }
    return product;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllProducts() {
  try {
    await connectToDB();

    const products = await Product.find({}).sort({ createdAt: -1 });

    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    await connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) {
      return [];
    }

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.error(error);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    // Send out an email to the user
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.error(error);
  }
}
