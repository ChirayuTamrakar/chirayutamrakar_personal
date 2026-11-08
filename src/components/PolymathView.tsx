import React from 'react';
import { BIO_DATA, PUBLICATIONS, EXPERIENCES } from '../data/content';
import { MoxLogo, SpcLogo, FoundersIncLogo } from './CompanyLogos';

interface PolymathViewProps {
  onNavigateToProjects: () => void;
}

export const PolymathView: React.FC<PolymathViewProps> = ({ onNavigateToProjects }) => {
  return (
    <div className="w-full pb-20 animate-fade-in font-serif">
      {/* Centered Circular Profile Photo */}
      <div className="flex justify-center mb-12">
        <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-xs ring-1 ring-black/5 bg-[#EFECE6]">
          <img
            src={BIO_DATA.avatarUrl}
            alt={BIO_DATA.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Bio Copy */}
      <div className="space-y-6 text-[18px] md:text-[19px] leading-[1.7] text-[#1A1A1A] max-w-[720px] mx-auto">
        <p className="font-normal">{BIO_DATA.greeting}</p>

        <p>
          I&apos;m currently building{' '}
          <button
            onClick={onNavigateToProjects}
            className="underline underline-offset-4 text-[#1A1A1A] hover:text-black cursor-pointer inline"
          >
            talent evaluation and routing infrastructure
          </button>{' '}
          for AI safety. More great talent seems like the best way to make AI
          safety progress compound faster within the timeframes we have.
        </p>

        <p>
          Before this I was building in the talent space too. Colleges are an
          expensive and inefficient signaling mechanism, education is in a
          suboptimal Nash equilibrium. I spent years thinking about alternative
          proof-of-work systems for high-agency talent.
        </p>

        <p>
          I&apos;m also passionate about coordinating efforts in AI alignment,
          technical governance, and finding people with the agency to do
          high-leverage work.
        </p>
      </div>

      {/* Publications Section */}
      <section className="mt-16 pt-8 max-w-[720px] mx-auto">
        <h2 className="text-2xl md:text-[26px] font-normal text-[#1A1A1A] mb-6">
          Here are my AI research publications
        </h2>

        <ul className="space-y-5 text-[17px] md:text-[18px] leading-[1.65] text-[#1A1A1A] list-disc list-outside pl-5">
          {PUBLICATIONS.map((pub) => (
            <li key={pub.id} className="pl-1">
              {pub.authors && <span>{pub.authors}, </span>}
              <span>{pub.title} </span>
              <span className="text-[#333]">{pub.conferenceOrVenue}</span>
              {pub.linkText && pub.url && (
                <span>
                  :{' '}
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-black"
                  >
                    {pub.linkText}
                  </a>
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Education & Experience Section */}
      <section className="mt-16 pt-8 max-w-[720px] mx-auto">
        <div className="border-t border-[#E5E1D8] pt-8">
          <h2 className="text-2xl md:text-[26px] font-normal text-[#1A1A1A] mb-8">
            Education &amp; Experience
          </h2>

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="space-y-4">
              {/* Header row: Logos + Role + Subtitle */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <MoxLogo />
                  <SpcLogo />
                  <FoundersIncLogo />
                </div>

                <div>
                  <h3 className="text-xl font-medium text-[#1A1A1A] leading-snug">
                    {exp.role}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[#666461] leading-tight mt-0.5">
                    {exp.organization} | {exp.dates} | {exp.location}
                  </p>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4 text-[17px] md:text-[18px] leading-[1.7] text-[#1A1A1A] pt-2">
                <p>
                  I&apos;ve been a founder on and off since January 2025:
                  launched 7 different products, and learnt loads with every
                  iteration. I&apos;ve been a member at South Park Commons and
                  Founders Inc along the way.
                </p>
                <p>
                  I&apos;m now building Polymath out of{' '}
                  <a
                    href="https://moxsf.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-black"
                  >
                    Mox
                  </a>
                  , the community for rationalists and effective altruists in
                  San Francisco.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
