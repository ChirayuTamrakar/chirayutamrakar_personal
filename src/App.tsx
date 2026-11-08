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
  const [currentTab, setCurrentTab] = useState<NavTab>('polymath');
  const [selectedEssaySlug, setSelectedEssaySlug] = useState<string | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  // Sync with browser hash if present (e.g. #projects, #thoughts, #books, #art)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['polymath', 'projects', 'thoughts', 'books', 'art'].includes(hash)) {
        setCurrentTab(hash as NavTab);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    // When switching tabs, reset essay view if moving away from thoughts
    if (tab !== 'thoughts') {
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
            {currentTab === 'polymath' && (
              <PolymathView
                onNavigateToProjects={() => handleSelectTab('projects')}
              />
            )}

            {currentTab === 'projects' && <ProjectsView />}

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
        <footer className="w-full py-10 border-t border-[#E8E4DA] text-xs font-sans text-[#777] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>&copy; {new Date().getFullYear()} {BIO_DATA.name}</span>
          <span className="italic font-serif text-[13px] text-[#666]">
            San Francisco, CA · Built with editorial care
          </span>
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
