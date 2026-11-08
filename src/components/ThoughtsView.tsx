import React, { useState, useEffect } from 'react';
import { ESSAYS, TAKES, type Essay, type TakeItem } from '../data/content';
import { getEssaysWithViews, incrementEssayView } from '../lib/firebase';
import { Eye, Heart, Share2, Check, Plus, Minus } from 'lucide-react';

interface ThoughtsViewProps {
  initialSlug?: string | null;
  onSelectEssaySlug?: (slug: string | null) => void;
}

export const ThoughtsView: React.FC<ThoughtsViewProps> = ({
  initialSlug,
  onSelectEssaySlug
}) => {
  const [essays, setEssays] = useState<Essay[]>(ESSAYS);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(() => {
    if (initialSlug) {
      return ESSAYS.find((e) => e.slug === initialSlug) || null;
    }
    return null;
  });

  const [expandedTakeId, setExpandedTakeId] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync initial slug if changed from outside
  useEffect(() => {
    if (initialSlug) {
      const found = essays.find((e) => e.slug === initialSlug);
      if (found) {
        setSelectedEssay(found);
      }
    }
  }, [initialSlug, essays]);

  // Load essays with view counts
  useEffect(() => {
    getEssaysWithViews().then((data) => {
      setEssays(data);
      if (selectedEssay) {
        const updated = data.find((e) => e.id === selectedEssay.id);
        if (updated) setSelectedEssay(updated);
      }
    });
  }, []);

  const handleOpenEssay = async (essay: Essay) => {
    setSelectedEssay(essay);
    setHasLiked(false);
    onSelectEssaySlug?.(essay.slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Increment view count in Firebase / local storage
    const newViews = await incrementEssayView(essay.id);
    setSelectedEssay((prev) => (prev ? { ...prev, initialViews: newViews } : null));
    setEssays((prev) =>
      prev.map((e) => (e.id === essay.id ? { ...e, initialViews: newViews } : e))
    );
  };

  const handleBack = () => {
    setSelectedEssay(null);
    onSelectEssaySlug?.(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLike = () => {
    if (!hasLiked && selectedEssay) {
      setHasLiked(true);
      setSelectedEssay((prev) =>
        prev ? { ...prev, initialLikes: prev.initialLikes + 1 } : null
      );
    }
  };

  const toggleTake = (id: string) => {
    setExpandedTakeId(expandedTakeId === id ? null : id);
  };

  // --- SINGLE ESSAY VIEW ---
  if (selectedEssay) {
    return (
      <article className="w-full pb-24 animate-fade-in font-serif max-w-[720px] mx-auto">
        {/* Back Link */}
        <div className="mb-10">
          <button
            onClick={handleBack}
            className="text-[17px] text-[#222] hover:text-black underline underline-offset-4 cursor-pointer inline-flex items-center gap-1"
          >
            ← Back to all thoughts
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-[40px] font-normal text-[#1A1A1A] leading-[1.25] mb-6 tracking-tight">
          {selectedEssay.title}
        </h1>

        {/* Metadata info */}
        <div className="flex items-center justify-between text-[14px] text-[#666] mb-10 pb-4 border-b border-[#EAE6DE]">
          <div className="flex items-center gap-4">
            <span>{selectedEssay.date}</span>
            <span>·</span>
            <span>{selectedEssay.readTime}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-[#888]" />
              {selectedEssay.initialViews.toLocaleString()} views
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                hasLiked
                  ? 'bg-rose-50 text-rose-700 font-medium'
                  : 'hover:bg-[#EFECE6] text-[#555]'
              }`}
              title="Like essay"
            >
              <Heart
                className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`}
              />
              <span>{selectedEssay.initialLikes}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-xs hover:bg-[#EFECE6] text-[#555] px-2 py-1 rounded-md transition-colors cursor-pointer"
              title="Copy share link"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Essay Paragraphs */}
        <div className="space-y-6 text-[18px] md:text-[19px] leading-[1.75] text-[#1A1A1A]">
          {selectedEssay.content.map((p, idx) => (
            <p key={idx} className="font-normal">
              {p}
            </p>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t border-[#EAE6DE] flex justify-between items-center text-[15px]">
          <button
            onClick={handleBack}
            className="underline underline-offset-4 text-[#333] hover:text-black cursor-pointer"
          >
            ← Back to all thoughts
          </button>
          <span className="text-[#888] italic">Written by Chirayu Tamrakar</span>
        </div>
      </article>
    );
  }

  // --- ESSAY & TAKES LIST VIEW ---
  return (
    <div className="w-full pb-20 animate-fade-in font-serif max-w-[720px] mx-auto">
      {/* Page Title */}
      <h1 className="text-3xl md:text-[38px] font-normal text-[#1A1A1A] mb-12 tracking-tight">
        Things I think about
      </h1>

      {/* Subheading: Essays */}
      <h2 className="text-2xl md:text-[24px] font-normal text-[#1A1A1A] mb-8">
        Essays
      </h2>

      {/* List of Essays */}
      <div className="space-y-6 mb-20">
        {essays.map((essay) => (
          <div
            key={essay.id}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-1"
          >
            <button
              onClick={() => handleOpenEssay(essay)}
              className="text-left text-[18px] md:text-[19px] text-[#1A1A1A] hover:text-black underline underline-offset-4 cursor-pointer font-normal transition-colors"
            >
              {essay.title}
            </button>

            <span className="text-[15px] md:text-[16px] text-[#666461] sm:shrink-0 sm:pl-4">
              {essay.date}
            </span>
          </div>
        ))}
      </div>

      {/* Subheading: Takes Section */}
      <div className="border-t border-[#E5E1D8] pt-12">
        <h2 className="text-2xl md:text-[25px] font-normal text-[#1A1A1A] mb-2">
          Takes
        </h2>
        <p className="text-[14.5px] text-[#777] mb-8">
          Click a title to read more.
        </p>

        {/* Takes Accordion List */}
        <div className="divide-y divide-[#EAE6DE]">
          {TAKES.map((take: TakeItem) => {
            const isExpanded = expandedTakeId === take.id;
            return (
              <div key={take.id} className="py-4">
                <button
                  onClick={() => toggleTake(take.id)}
                  className="w-full flex items-baseline justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="text-[17.5px] md:text-[18.5px] text-[#1A1A1A] group-hover:text-black font-normal leading-snug">
                    {take.title}
                  </span>
                  <span className="text-[#888] group-hover:text-black shrink-0 transition-transform">
                    {isExpanded ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                {isExpanded && (
                  <div className="mt-3.5 pr-6 text-[16.5px] leading-[1.7] text-[#333] animate-fade-in pl-0.5">
                    {take.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
