import React, { useState, useEffect } from 'react';
import { Header, type NavTab } from './components/Header';
import { PolymathView } from './components/PolymathView';
import { ProjectsView } from './components/ProjectsView';
import { ThoughtsView } from './components/ThoughtsView';
import { BooksView } from './components/BooksView';
import { ArtView } from './components/ArtView';
import { EmailModal } from './components/EmailModal';
import { BIO_DATA } from './data/content';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('me');
  const [selectedEssaySlug, setSelectedEssaySlug] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Sync with browser hash if present (e.g. #me, #thoughts, #books, #art)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'polymath' || hash === 'me') {
        setCurrentTab('me');
      } else if (['thoughts', 'books', 'art'].includes(hash)) {
        setCurrentTab(hash as NavTab);
      } else {
        // Fallback to 'me' if hash is 'projects' or unknown
        setCurrentTab('me');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    // Block switching to projects
    if (tab === 'projects') {
      return;
    }
    const targetTab = tab === 'polymath' ? 'me' : tab;
    setCurrentTab(targetTab);
    window.location.hash = targetTab;
    // When switching tabs, reset essay view if moving away from thoughts
    if (targetTab !== 'thoughts') {
      setSelectedEssaySlug(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-serif selection:bg-[#EAE4DC] selection:text-[#111]">
      <div className="max-w-[760px] mx-auto px-5 sm:px-8 min-h-screen flex flex-col justify-between">
        <div>
          {/* Top Bar & Navigation */}
          <Header
            currentTab={currentTab}
            onSelectTab={handleSelectTab}
            onOpenEmail={() => setIsEmailModalOpen(true)}
          />

          {/* Active Tab View */}
          <main className="w-full">
            {(currentTab === 'me' || currentTab === 'polymath') && (
              <PolymathView />
            )}

            {currentTab === 'thoughts' && (
              <ThoughtsView
                initialSlug={selectedEssaySlug}
                onSelectEssaySlug={setSelectedEssaySlug}
              />
            )}

            {currentTab === 'books' && <BooksView />}

            {currentTab === 'art' && <ArtView />}
          </main>
        </div>

        {/* Minimalist Editorial Footer */}
        <footer className="w-full py-10 border-t border-[#E8E4DA] text-xs font-sans text-[#777] flex items-center justify-between">
          <span>&copy; {new Date().getFullYear()} {BIO_DATA.name}</span>
        </footer>
      </div>

      {/* Email / Contact Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  );
}
