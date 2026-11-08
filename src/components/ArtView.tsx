import React, { useState, useRef, useEffect } from 'react';
import { ART_DATA, type AudioTrack } from '../data/content';
import { Play, Pause, Volume2, VolumeX, Music, Heart } from 'lucide-react';

export const ArtView: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [likesCount, setLikesCount] = useState<number>(86);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const currentTrack = ART_DATA.musicTracks[currentTrackIndex];

  // Synthesize realistic warm acoustic guitar pluck using Web Audio API
  const playGuitarPluck = (freq: number, duration: number = 2.4, gainVal: number = 0.22) => {
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

      const now = ctx.currentTime;

      // Dual oscillators for rich guitar string body + fret harmonic overtones
      const osc1 = ctx.createOscillator(); // fundamental
      const osc2 = ctx.createOscillator(); // 1st harmonic overtone
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, now);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Low-pass filter to simulate string damping (highs decay faster)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 6, now);
      filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.5, 200), now + duration * 0.8);

      // Pluck attack & exponential string decay
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gainVal, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(gainVal * 0.45, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch {
      // Audio fallback for restricted browser states
    }
  };

  // Play realistic fingerstyle guitar arpeggios when playing
  useEffect(() => {
    if (isPlaying) {
      // Fingerstyle guitar chord voicings (DADGAD & open acoustic tunings)
      const guitarChords = [
        [146.83, 220.0, 293.66, 369.99, 440.0], // DADGAD / D major
        [98.0, 146.83, 196.0, 246.94, 329.63],   // G add9
        [123.47, 185.0, 220.0, 293.66, 369.99],  // Bm7
        [110.0, 164.81, 220.0, 293.66, 440.0]    // Asus4
      ];

      let chordStep = 0;
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });

        const currentChord = guitarChords[chordStep % guitarChords.length];
        // Fingerpicking finger roll across strings
        currentChord.forEach((noteFreq, stringIdx) => {
          window.setTimeout(() => {
            playGuitarPluck(noteFreq, 2.6, 0.18 - stringIdx * 0.015);
          }, stringIdx * 80);
        });
        chordStep++;
      }, 1600);
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
          my guitar music
        </a>
        .
      </p>

      {/* Featured Summit / Landscape Image Card */}
      <div className="mb-12">
        <div className="rounded-2xl overflow-hidden shadow-xs border border-black/5 bg-[#EAE6DE] max-w-[480px]">
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

      {/* Section: "My guitar & music" with Interactive Player and Studio Image */}
      <section id="music" className="border-t border-[#E5E1D8] pt-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Music className="w-5 h-5 text-[#444]" />
            <h2 className="text-2xl md:text-[26px] font-normal text-[#1A1A1A]">
              My guitar &amp; music
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
          Guitar has been my primary creative anchor since childhood. Whether playing acoustic fingerstyle melodies or experimenting with warm electric tones and vintage tube amp reverb, playing guitar resets my perspective. These are recordings and instrumental sketches that reflect different textures.
        </p>

        {/* Studio Guitar Setup Image Card */}
        {ART_DATA.guitarImageUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden shadow-xs border border-black/5 bg-[#EAE6DE] max-w-[620px]">
            <img
              src={ART_DATA.guitarImageUrl}
              alt="Chirayu's acoustic guitar and vintage tube amplifier setup"
              className="w-full h-auto object-cover max-h-[380px]"
              referrerPolicy="no-referrer"
            />
            <div className="px-4 py-2.5 bg-[#FAF8F3] border-t border-[#EAE6DE] text-xs text-[#666] font-sans flex items-center justify-between">
              <span>Acoustic guitar &amp; vintage tube amplifier</span>
              <span className="text-[#888]">Studio setup</span>
            </div>
          </div>
        )}

        {/* Minimalist Audio Player Console */}
        <div className="p-6 rounded-2xl border border-[#DEDBD2] bg-[#FCFBF8] shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-sans uppercase tracking-wider text-[#888] block mb-0.5">
                Now Playing · Guitar Session
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
