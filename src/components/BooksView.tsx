import React, { useState } from 'react';
import { BOOKS_TIPS, BOOKS_RECOMMENDED, type BookRecommendation } from '../data/content';
import { Star, Quote } from 'lucide-react';

export const BooksView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI & Rationality',
    'Founders & Biographies',
    'Philosophy & Governance',
    'Economics & Institutions'
  ];

  const filteredBooks =
    selectedCategory === 'All'
      ? BOOKS_RECOMMENDED
      : BOOKS_RECOMMENDED.filter((b) => b.category === selectedCategory);

  return (
    <div className="w-full pb-20 animate-fade-in font-serif max-w-[720px] mx-auto">
      {/* Title */}
      <h1 className="text-3xl md:text-[38px] font-normal text-[#1A1A1A] mb-12 tracking-tight">
        Books I really like
      </h1>

      {/* Subheading */}
      <h2 className="text-2xl md:text-[24px] font-normal text-[#1A1A1A] mb-6">
        Some tips
      </h2>

      {/* Numbered tips matching screenshot */}
      <ol className="space-y-6 text-[17.5px] md:text-[18.5px] leading-[1.7] text-[#1A1A1A] list-decimal list-outside pl-5 mb-16">
        {BOOKS_TIPS.map((tip, idx) => (
          <li key={idx} className="pl-1">
            {tip}
          </li>
        ))}
      </ol>

      {/* Curated Recommendations Section */}
      <div className="border-t border-[#E5E1D8] pt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-[24px] font-normal text-[#1A1A1A]">
            Curated Recommendations
          </h2>

          {/* Minimalist category filter */}
          <div className="flex flex-wrap gap-2 text-xs font-sans">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#555] border-[#D8D4CA] hover:border-[#888]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Book Cards */}
        <div className="space-y-8">
          {filteredBooks.map((book: BookRecommendation) => (
            <div
              key={book.id}
              className="p-6 rounded-xl border border-[#E3DFD5] bg-[#FCFBF8] shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <h3 className="text-xl font-medium text-[#1A1A1A]">
                  {book.title}
                </h3>
                <span className="text-sm text-[#777] font-sans shrink-0">
                  by {book.author}
                </span>
              </div>

              {/* Category & Rating */}
              <div className="flex items-center gap-3 text-xs text-[#666] font-sans mb-3">
                <span className="text-[#888]">{book.category}</span>
                <span>·</span>
                <div className="flex items-center gap-0.5 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-medium text-[#333] ml-0.5">
                    {book.rating} / 5
                  </span>
                </div>
              </div>

              {/* Chirayu's note */}
              <p className="text-[16px] leading-[1.65] text-[#2C2C2A] mb-3">
                {book.note}
              </p>

              {/* Quote */}
              {book.quote && (
                <div className="flex items-start gap-2.5 pt-2 text-[14.5px] italic text-[#555] border-t border-[#EDEAE3]">
                  <Quote className="w-3.5 h-3.5 text-[#AAA] shrink-0 mt-1" />
                  <span>&ldquo;{book.quote}&rdquo;</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
