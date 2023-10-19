import { MousePointerClick } from "lucide-react";
import React from "react";

import Searchbar from "@/components/Searchbar";
import HeroCarousel from "@/components/HeroCarousel";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

type Props = {};

const Home = async (props: Props) => {
  const allProducts = await getAllProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-20 py-24">
        {/* Hero Layout */}
        <div className="flex max-xl:flex-col gap-16">
          {/* Hero Text */}
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart and Hassle Free Shopping With Us
              <MousePointerClick className="w-6 h-6" />
            </p>
            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary inline-block">PriceSmart</span>
            </h1>
            <p className="mt-6">
              The most powerful product tracking analytical tool ever to enable
              you to shop smart, save more, and have fun.
            </p>
            {/* Search Bar */}
            <Searchbar />
          </div>
          {/* Hero Carousel */}
          <HeroCarousel />
        </div>
      </section>

      {/* Recent Search Section */}
      <section className="trending-section">
        {/* Recent Search Title */}
        <h2 className="section-text">Recent Search</h2>
        {/* Recent Search Products */}
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
