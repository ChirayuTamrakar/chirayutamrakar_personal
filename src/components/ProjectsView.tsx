import React, { useState } from 'react';
import { PROJECTS, type ProjectItem } from '../data/content';
import { X, Play, CheckCircle2, Sparkles, BookOpen, Layers, Heart, MessageCircle, Share2, Check } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  // Modal states
  const [activeVideoProject, setActiveVideoProject] = useState<ProjectItem | null>(null);
  const [showRubricModal, setShowRubricModal] = useState(false);
  const [showFullStoryModal, setShowFullStoryModal] = useState(false);
  const [showTryItModal, setShowTryItModal] = useState(false);
  const [copiedTweet, setCopiedTweet] = useState<string | null>(null);

  // Interactive "Try it yourself" simulator state
  const aiInterviewerProject = PROJECTS.find((p) => p.id === 'ai-interviewer');
  const [candidateResponse, setCandidateResponse] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const handleEvaluate = () => {
    if (!candidateResponse.trim()) return;
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
      setEvaluationResult({
        score: 94,
        feedback:
          'High conceptual precision. Strong awareness of deceptive alignment subtleties and distinction between external behavior vs latent representations.',
        strengths: [
          'Correctly proposed linear probe activation analysis on hidden states',
          'Addressed honeypot / unmonitored evaluation sandboxes',
          'Clear recognition of gradient-based auditing risks'
        ],
        improvements: [
          'Could explicitly mention mechanistic interpretability with sparse autoencoders (SAEs)'
        ]
      });
    }, 900);
  };

  const handleLoadSample = () => {
    if (aiInterviewerProject?.details.demoSampleResponse) {
      setCandidateResponse(aiInterviewerProject.details.demoSampleResponse);
    }
  };

  const handleCopyTweetLink = (id: string) => {
    navigator.clipboard?.writeText(`https://x.com/ChirayX008/status/${id}`);
    setCopiedTweet(id);
    setTimeout(() => setCopiedTweet(null), 2000);
  };

  return (
    <div className="w-full pb-20 animate-fade-in font-serif">
      {/* Title */}
      <h1 className="text-3xl md:text-[38px] font-normal text-[#1A1A1A] mb-12 tracking-tight">
        Some things I&apos;ve built
      </h1>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 max-w-[760px]">
        {PROJECTS.map((project) => {
          // --- RENDER X / TWITTER POST CARD ---
          if (project.isTweet && project.tweetData) {
            const tweet = project.tweetData;
            return (
              <div key={project.id} className="flex flex-col">
                <h2 className="text-xl md:text-[22px] font-normal text-[#1A1A1A] leading-snug mb-2">
                  {project.title}
                </h2>
                <p className="text-[15.5px] leading-[1.65] text-[#444] mb-4">
                  {project.description}
                </p>

                {/* X Post Box */}
                <div className="border border-[#DDD7CD] rounded-2xl p-4 bg-white shadow-xs font-sans text-sm flex flex-col justify-between">
                  {/* Top user row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={tweet.avatarUrl}
                        alt={tweet.author}
                        className="w-9 h-9 rounded-full object-cover border border-black/10"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-[#0F1419] text-[14px]">
                            {tweet.author}
                          </span>
                          {/* Blue Checkmark */}
                          <svg viewBox="0 0 24 24" aria-label="Verified account" className="w-4 h-4 fill-[#1D9BF0]">
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.475 9.55.6 10.92.6 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.45 1.273 2.82 2.148 4.4 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-1.45 2.148-2.82 2.148-4.4zm-12.7 4.1l-4.2-4.2 1.4-1.4 2.8 2.8 6.8-6.8 1.4 1.4-8.2 8.2z" />
                          </svg>
                        </div>
                        <div className="text-[12px] text-[#536471]">
                          @{tweet.handle} · <span className="text-[#1D9BF0] font-medium hover:underline cursor-pointer">Follow</span>
                        </div>
                      </div>
                    </div>

                    {/* Black X Logo */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>

                  {/* Tweet text */}
                  <div className="text-[13.5px] leading-[1.5] text-[#0F1419] whitespace-pre-line mb-3">
                    {tweet.text}
                  </div>

                  {/* Video/Image media thumbnail inside tweet */}
                  <div
                    onClick={() => setActiveVideoProject(project)}
                    className="relative rounded-xl overflow-hidden mb-3 aspect-[16/9] bg-black cursor-pointer group"
                  >
                    <img
                      src="/project_ai_interviewer.png"
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#1D9BF0] flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 text-white text-[11px] font-medium">
                      Watch on X
                    </div>
                  </div>

                  {/* Tweet metadata footer */}
                  <div className="text-[12px] text-[#536471] pb-2 border-b border-[#EFF3F4]">
                    {tweet.date}
                  </div>

                  <div className="flex items-center justify-between pt-2.5 text-[12px] text-[#536471]">
                    <div className="flex items-center gap-1 hover:text-rose-600 transition-colors cursor-pointer">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{tweet.likes}</span>
                    </div>

                    <div className="flex items-center gap-1 hover:text-[#1D9BF0] transition-colors cursor-pointer">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{tweet.replies}</span>
                    </div>

                    <button
                      onClick={() => handleCopyTweetLink(project.id)}
                      className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer"
                    >
                      {copiedTweet === project.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copy link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Optional links below tweet card */}
                {tweet.actionLinks && tweet.actionLinks.length > 0 && (
                  <div className="flex items-center gap-4 mt-3 text-[15px] font-serif">
                    {tweet.actionLinks.map((al, idx) => (
                      <a
                        key={idx}
                        href={al.href || '#'}
                        target={al.href ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 text-[#222] hover:text-black"
                      >
                        {al.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // --- RENDER STANDARD PROJECT CARD ---
          return (
            <div key={project.id} className="flex flex-col">
              {/* Project Title */}
              <h2 className="text-xl md:text-[22px] font-normal text-[#1A1A1A] leading-snug mb-2">
                {project.title}
              </h2>

              {/* Project Description */}
              <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#333330] mb-5 min-h-[60px]">
                {project.description}
              </p>

              {/* Video Thumbnail Preview Card */}
              {project.videoThumbnail && (
                <div
                  onClick={() => setActiveVideoProject(project)}
                  className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#222] shadow-xs cursor-pointer group border border-black/5"
                >
                  <img
                    src={project.videoThumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />

                  {/* Red YouTube-style Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg group-hover:bg-[#E00000] transition-colors">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom duration badge */}
                  {project.videoDuration && (
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-sm bg-black/80 text-white text-[12px] font-sans tracking-wide">
                      {project.videoDuration}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Links (for Project 2 or customized projects) */}
              {project.hasLinks && (
                <div className="flex items-center gap-5 mt-4 text-[15.5px] text-[#222]">
                  {project.links?.tryItYourself && (
                    <button
                      onClick={() => setShowTryItModal(true)}
                      className="underline underline-offset-4 hover:text-black cursor-pointer"
                    >
                      Try it yourself
                    </button>
                  )}
                  {project.links?.theRubric && (
                    <button
                      onClick={() => setShowRubricModal(true)}
                      className="underline underline-offset-4 hover:text-black cursor-pointer"
                    >
                      The rubric
                    </button>
                  )}
                  {project.links?.theFullStory && (
                    <button
                      onClick={() => setShowFullStoryModal(true)}
                      className="underline underline-offset-4 hover:text-black cursor-pointer"
                    >
                      The full story
                    </button>
                  )}
                  {project.linkUrl && (
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-black cursor-pointer"
                    >
                      {project.linkText || project.linkUrl}
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* --- VIDEO PLAYER MODAL --- */}
      {activeVideoProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF9F6] border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative font-serif">
            <button
              onClick={() => setActiveVideoProject(null)}
              className="absolute top-5 right-5 text-[#666] hover:text-black cursor-pointer p-1"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-normal text-[#1A1A1A] mb-1 pr-8">
              {activeVideoProject.videoTitle || activeVideoProject.title}
            </h3>
            <p className="text-sm text-[#777] mb-5">
              Speaker: {activeVideoProject.speaker || 'Chirayu Tamrakar'} · Duration:{' '}
              {activeVideoProject.videoDuration || '04:12'}
            </p>

            {/* Video preview container with simulated interactive controls */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-5 shadow-inner">
              <img
                src={activeVideoProject.videoThumbnail || '/project_compute_verification.png'}
                alt={activeVideoProject.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-12 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </div>

              {/* Scrubber bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-3 text-white text-xs font-sans">
                <span>01:14</span>
                <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF0000]" />
                </div>
                <span>{activeVideoProject.videoDuration || '04:12'}</span>
              </div>
            </div>

            <div className="text-[16px] leading-[1.65] text-[#333]">
              <h4 className="font-medium text-[#111] mb-1">Architecture Overview</h4>
              <p>{activeVideoProject.details.overview}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- TRY IT YOURSELF INTERACTIVE MODAL --- */}
      {showTryItModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF9F6] border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative font-serif max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowTryItModal(false);
                setEvaluationResult(null);
              }}
              className="absolute top-5 right-5 text-[#666] hover:text-black cursor-pointer p-1"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-sm text-[#777]">
              <Sparkles className="w-4 h-4 text-[#C27803]" />
              <span>Interactive Evaluation Simulation</span>
            </div>

            <h3 className="text-2xl font-normal text-[#1A1A1A] mb-3">
              Polymath AI Interviewer Demo
            </h3>

            <p className="text-[15px] text-[#555] mb-6">
              Test how the AI interviewer assesses conceptual depth and alignment reasoning in real time.
            </p>

            {/* Prompt Card */}
            <div className="bg-[#F2EFE8] border border-[#E0DCD3] rounded-xl p-4 mb-5">
              <span className="text-xs uppercase tracking-wider text-[#777] font-sans font-semibold block mb-1">
                Interviewer Question
              </span>
              <p className="text-[16px] text-[#111] font-medium leading-snug">
                &ldquo;{aiInterviewerProject?.details.demoPromptQuestion}&rdquo;
              </p>
            </div>

            {/* Candidate response textarea */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm text-[#555]">Your Technical Reasoning:</label>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-xs text-[#666] underline hover:text-black cursor-pointer"
                >
                  Load sample frontier answer
                </button>
              </div>

              <textarea
                value={candidateResponse}
                onChange={(e) => setCandidateResponse(e.target.value)}
                placeholder="Formulate your hypothesis, threat model, and verification methodology..."
                rows={4}
                className="w-full p-3 rounded-lg border border-[#D5D0C5] bg-white text-[#1A1A1A] text-[15px] focus:outline-none focus:ring-1 focus:ring-black leading-relaxed font-sans"
              />
            </div>

            <button
              onClick={handleEvaluate}
              disabled={isEvaluating || !candidateResponse.trim()}
              className="px-5 py-2.5 rounded-lg bg-[#1A1A1A] text-white hover:bg-black transition-colors text-[15px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-sans"
            >
              {isEvaluating ? 'Evaluating with Polymath Rubric...' : 'Evaluate My Reasoning'}
            </button>

            {/* Evaluation Result */}
            {evaluationResult && (
              <div className="mt-6 pt-5 border-t border-[#E5E1D8] space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#444] font-sans">
                    Alignment Reasoning Index
                  </span>
                  <span className="text-xl font-bold text-black font-sans">
                    {evaluationResult.score}/100
                  </span>
                </div>

                <p className="text-[15px] leading-relaxed text-[#222]">
                  {evaluationResult.feedback}
                </p>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-[#555] font-sans uppercase tracking-wider block">
                    Observed Strengths
                  </span>
                  {evaluationResult.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-2 text-[14px] text-[#222]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- THE RUBRIC MODAL --- */}
      {showRubricModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF9F6] border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative font-serif max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRubricModal(false)}
              className="absolute top-5 right-5 text-[#666] hover:text-black cursor-pointer p-1"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-sm text-[#777]">
              <Layers className="w-4 h-4 text-[#444]" />
              <span>Assessment Framework</span>
            </div>

            <h3 className="text-2xl font-normal text-[#1A1A1A] mb-3">
              The AI Safety Talent Rubric
            </h3>

            <p className="text-[16px] text-[#555] leading-relaxed mb-6">
              Developed in consultation with MATS and Constellation mentors to identify candidates who possess both theoretical depth and extreme counterfactual leverage.
            </p>

            <div className="space-y-4">
              {aiInterviewerProject?.details.rubricPoints?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#E0DCD3] bg-[#FCFBF8]"
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[17px] font-medium text-[#111]">
                      {item.criterion}
                    </h4>
                    <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded bg-[#EBE7DF] text-[#444]">
                      Weight: {item.weight}
                    </span>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-[#555]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- THE FULL STORY MODAL --- */}
      {showFullStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="bg-[#FAF9F6] border border-[#DDD7CD] rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative font-serif max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowFullStoryModal(false)}
              className="absolute top-5 right-5 text-[#666] hover:text-black cursor-pointer p-1"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-sm text-[#777]">
              <BookOpen className="w-4 h-4 text-[#444]" />
              <span>Founder Retrospective</span>
            </div>

            <h3 className="text-2xl md:text-[28px] font-normal text-[#1A1A1A] mb-4">
              Why We Built the AI Interviewer
            </h3>

            <div className="space-y-4 text-[16.5px] leading-[1.7] text-[#2A2A2A]">
              <p>
                When we looked at the bottleneck in AI safety, it wasn&apos;t raw funding—it was high-caliber talent matched to the exact frontier questions where they can have the highest counterfactual leverage.
              </p>
              <p>
                Senior researchers at MATS and Constellation were spending hundreds of hours reading applications and conducting unstructured interviews. We built an AI interviewer that conducts deep, context-aware technical discussions, probing edge cases in candidate reasoning with the rigor of a top-tier mentor.
              </p>
              <p>
                Candidates get immediate, structured feedback on their conceptual clarity, and research labs get high-signal, calibrated assessments.
              </p>
              <p>
                The ultimate goal isn&apos;t just filtering; it&apos;s unlocking routing efficiency so that researchers spend their scarce time mentoring the right minds.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
