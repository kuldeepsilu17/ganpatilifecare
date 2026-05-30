"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import {
  PRODUCTS,
  PRODUCT_CATEGORIES,
  type ProductCategory,
  type Product,
} from "@/lib/data";
import { getProductDetails, type EnrichedProduct } from "@/lib/product-details";
import { ProductDetailsModal } from "@/components/ui/ProductDetailsModal";

export function Products() {
  const [filter, setFilter] = useState<ProductCategory>("all");
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered =
    filter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filter);

  const handleOpenDetails = (product: Product) => {
    const enriched = getProductDetails(product);
    setSelectedProduct(enriched);
    setIsModalOpen(true);
  };

  return (
    <section id="products" className="bg-background py-12 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Our Products"
          title="Premium Medical Supplies"
          description="Orthopedic, surgical, hospital uniforms, and healthcare essentials — cotton roll supplier India & surgical products supplier Rajasthan."
        />

        <div id="categories" className="mt-10 flex flex-wrap justify-center gap-2 scroll-mt-28">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-4 py-2 text-xs md:text-sm font-medium transition ${
                filter === cat.id
                  ? "bg-medical text-white shadow-md ring-2 ring-brand-orange/40"
                  : "bg-card text-foreground/80 ring-1 ring-medical/20 hover:ring-brand-orange hover:text-medical cursor-pointer"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:mt-12 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => (
            <AnimateIn key={product.id} delay={i * 0.05}>
              <motion.li
                onClick={() => handleOpenDetails(product)}
                className="card-glow group flex h-full list-none flex-col overflow-hidden rounded-2xl bg-card shadow-md transition duration-300 hover:-translate-y-1 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative aspect-square bg-muted/20 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3 md:p-5">
                  <h3 className="font-display font-semibold text-foreground text-base md:text-lg leading-snug break-words">
                    {product.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted line-clamp-2 md:line-clamp-none">
                    {product.description}
                  </p>
                  <button
                    type="button"
                    className="mt-3 block w-full rounded-full bg-medical py-2 text-center text-sm font-semibold text-white transition hover:bg-medical-dark cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </motion.li>
            </AnimateIn>
          ))}
        </ul>
      </div>

      {/* Product Details Modal Overlay */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
