import React from 'react';
import { BIO_DATA } from '../data/content';

export type NavTab = 'polymath' | 'projects' | 'thoughts' | 'books' | 'art';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenEmail: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenEmail
}) => {
  const tabs: { key: NavTab; label: string }[] = [
    { key: 'polymath', label: 'Polymath' },
    { key: 'projects', label: 'Projects' },
    { key: 'thoughts', label: 'Thoughts' },
    { key: 'books', label: 'Books' },
    { key: 'art', label: 'Art' }
  ];

  return (
    <header className="w-full pt-8 pb-12">
      {/* Top Right Utility Bar */}
      <div className="flex justify-end items-center gap-5 text-[15px] text-[#222220] mb-6">
        <a
          href={BIO_DATA.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          GitHub
        </a>
        <a
          href={BIO_DATA.socials.x}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          X
        </a>
        <a
          href={BIO_DATA.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition-colors"
        >
          LinkedIn
        </a>
        <button
          onClick={onOpenEmail}
          className="hover:text-black transition-colors cursor-pointer underline text-[#222220]"
          style={{ textUnderlineOffset: '3px' }}
        >
          Email
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        {/* Site Title / Brand */}
        <button
          onClick={() => onSelectTab('polymath')}
          className="text-left text-2xl md:text-[26px] font-normal tracking-tight text-[#111111] hover:opacity-80 transition-opacity cursor-pointer font-serif"
        >
          {BIO_DATA.name}
        </button>

        {/* Section Tabs */}
        <nav className="flex items-center gap-6 md:gap-7 text-[16px] md:text-[17px] font-serif">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onSelectTab(tab.key)}
                className={`transition-colors cursor-pointer ${
                  isActive
                    ? 'text-black underline underline-offset-4 font-medium'
                    : 'text-[#444442] hover:text-black hover:underline hover:underline-offset-4'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
