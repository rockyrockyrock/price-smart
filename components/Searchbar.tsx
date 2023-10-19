"use client";

import React, { FormEvent, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import { scrapeAndStoreProduct } from "@/lib/actions";

type Props = {};

// Check if the submitted form url is a valid amazon link
const isValidAmazonProductURL = (url: string) => {
  try {
    // Parse the url
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    // Check if hostname contains amazon.com or amazon.xx
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
  } catch (error) {
    return false;
  }
  return false;
};

// Main Component
const Searchbar = (props: Props) => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Alert if it is a valid link
    const isValidLink = isValidAmazonProductURL(searchPrompt);
    if (!isValidLink) {
      toast.error("Please provide a valid Amazon link.");
      return;
    }

    // If it a valid link, then try this
    try {
      setIsLoading(true);

      // Scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
      toast.success("Please visit below to see your product.");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Search Bar Layout
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <Toaster />
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />

      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
