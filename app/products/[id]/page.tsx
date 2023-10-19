import React from "react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getProductById, getSimilarProducts } from "@/lib/actions";
import { Product } from "@/types";
import PriceInfoCard from "@/components/PriceInfoCard";
import { ArrowDown, ArrowUp, LineChart, ShoppingBag, Tag } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Modal from "@/components/Modal";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) {
    redirect("/");
  }

  const similarProducts = await getSimilarProducts(id);

  return (
    // Product Container
    <div className="product-container">
      {/* Product Info */}
      <div className="flex gap-28 xl:flex-row flex-col">
        {/* Product Image */}
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col">
          {/* Title and Link Container */}
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            {/* Title and Link */}
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>

              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50 underline underline-offset-2 hover:underline-offset-4"
              >
                Visit Product Page
              </Link>
            </div>
          </div>

          {/* Product Current Price Container */}
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {product.currentPrice}
              </p>

              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {product.originalPrice}
              </p>
            </div>
          </div>

          {/* Product Price History Container */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                icon={<Tag className="text-blue-500" />}
                value={`${product.currency} ${product.currentPrice}`}
              />
              <PriceInfoCard
                title="Average Price"
                icon={<LineChart className="text-purple-500" />}
                value={`${product.currency} ${product.averagePrice}`}
              />
              <PriceInfoCard
                title="Highest Price"
                icon={<ArrowUp className="text-green-500" />}
                value={`${product.currency} ${product.highestPrice}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                icon={<ArrowDown className="text-red-500" />}
                value={`${product.currency} ${product.lowestPrice}`}
              />
            </div>
          </div>

          {/* Track Product Button Modal */}
          <div className="mt-6">
            <Modal productId={id} />
          </div>

          {/* Buy Now Button */}
          <button className="btn w-fit mx-auto mt-8 flex items-center justify-center gap-3 min-w-[300px] hover:scale-95">
            <ShoppingBag className="w-6 h-6" />
            <Link href={product.url} target="_blank">
              Buy Now
            </Link>
          </button>
        </div>
      </div>

      {/* Similar Products Container */}
      {similarProducts && similarProducts.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
