import React, { useState, useRef, useEffect } from 'react';
import { ART_DATA, type AudioTrack } from '../data/content';
import { Play, Pause, Volume2, VolumeX, Music, Heart } from 'lucide-react';

export const ArtView: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [likesCount, setLikesCount] = useState<number>(74);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const currentTrack = ART_DATA.musicTracks[currentTrackIndex];

  // Synthesize realistic warm acoustic piano sound using Web Audio API
  const playPianoNote = (freq: number, duration: number = 2.0, gainVal: number = 0.2) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (isMuted) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm piano overtone timbre
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Acoustic piano envelope (sharp attack, exponential decay)
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio fallback
    }
  };

  // Play an ambient musical motif when playing
  useEffect(() => {
    if (isPlaying) {
      // Play a chord immediately
      const chords = [
        [261.63, 329.63, 392.0], // C major
        [220.0, 261.63, 329.63], // A minor
        [174.61, 220.0, 261.63], // F major
        [196.0, 246.94, 293.66]  // G major
      ];

      let step = 0;
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });

        const chord = chords[step % chords.length];
        chord.forEach((freq, i) => {
          setTimeout(() => playPianoNote(freq, 2.5, 0.15), i * 140);
        });
        step++;
      }, 1500);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikesCount((c) => c + 1);
    }
  };

  return (
    <div className="w-full pb-20 animate-fade-in font-serif max-w-[720px] mx-auto">
      {/* Title */}
      <h1 className="text-3xl md:text-[38px] font-normal text-[#1A1A1A] mb-8 tracking-tight">
        {ART_DATA.title}
      </h1>

      {/* Intro text */}
      <p className="text-[18px] md:text-[19px] leading-[1.7] text-[#1A1A1A] mb-10">
        I appreciate art deeply and it&apos;s added much colour to my life. This page has{' '}
        <a href="#life" className="underline underline-offset-4 hover:text-black">
          my thoughts on art
        </a>
        ,{' '}
        <a href="#life" className="underline underline-offset-4 hover:text-black">
          life
        </a>
        , and{' '}
        <a href="#music" className="underline underline-offset-4 hover:text-black">
          my music
        </a>
        .
      </p>

      {/* Featured Image Card */}
      <div className="mb-12">
        <div className="rounded-2xl overflow-hidden shadow-xs border border-black/5 bg-[#EAE6DE] max-w-[440px]">
          <img
            src={ART_DATA.landscapeImageUrl}
            alt="Chirayu on mountain summit overlooking observatories"
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Essay Section: "What's life about for me?" */}
      <section id="life" className="mb-16">
        <h2 className="text-2xl md:text-[26px] font-normal text-[#1A1A1A] mb-6">
          {ART_DATA.subheading}
        </h2>

        <div className="space-y-6 text-[18px] md:text-[19px] leading-[1.75] text-[#1A1A1A]">
          {ART_DATA.essayParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      {/* Section: "My music" with Interactive Player */}
      <section id="music" className="border-t border-[#E5E1D8] pt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Music className="w-5 h-5 text-[#444]" />
            <h2 className="text-2xl md:text-[26px] font-normal text-[#1A1A1A]">
              My music
            </h2>
          </div>

          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer font-sans ${
              hasLiked ? 'text-rose-700 bg-rose-50' : 'text-[#666] hover:bg-[#EFECE6]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{likesCount}</span>
          </button>
        </div>

        <p className="text-[17px] leading-[1.65] text-[#444] mb-8">
          Piano has been my primary creative anchor since childhood. These are four recordings and melodic sketches that reflect different emotional textures.
        </p>

        {/* Minimalist Audio Player Console */}
        <div className="p-6 rounded-2xl border border-[#DEDBD2] bg-[#FCFBF8] shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-sans uppercase tracking-wider text-[#888] block mb-0.5">
                Now Playing
              </span>
              <h3 className="text-xl font-medium text-[#1A1A1A]">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-[#666]">
                {currentTrack.composer} · {currentTrack.duration}
              </p>
            </div>

            {/* Play/Pause & Mute Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-lg text-[#666] hover:text-black hover:bg-[#EFECE6] transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-rose-600" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-black transition-transform active:scale-95 shadow-xs cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-[#E8E4DA] rounded-full overflow-hidden mb-3 cursor-pointer">
            <div
              className="h-full bg-[#1A1A1A] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-[#555] italic leading-relaxed">
            {currentTrack.description}
          </p>
        </div>

        {/* Track Playlist List */}
        <div className="space-y-2">
          {ART_DATA.musicTracks.map((track: AudioTrack, idx: number) => {
            const isSelected = idx === currentTrackIndex;
            return (
              <button
                key={track.id}
                onClick={() => handleSelectTrack(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'border-[#1A1A1A] bg-white shadow-xs'
                    : 'border-transparent hover:border-[#E5E1D8] hover:bg-[#F8F6F0]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans ${
                      isSelected && isPlaying
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#ECE8DF] text-[#555]'
                    }`}
                  >
                    {isSelected && isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-medium text-[#1A1A1A]">
                      {track.title}
                    </h4>
                    <span className="text-xs text-[#777] font-sans">
                      {track.composer}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-[#777] font-sans">
                  {track.duration}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
