import React from 'react';
import { BIO_DATA, PUBLICATIONS, EXPERIENCES } from '../data/content';
import { WebkorpsLogo, MedicapsLogo } from './CompanyLogos';
import { SkillsInteractiveChart } from './SkillsInteractiveChart';

interface PolymathViewProps {
  onNavigateToProjects?: () => void;
}

export const PolymathView: React.FC<PolymathViewProps> = () => {
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
        <p className="font-normal text-xl">{BIO_DATA.greeting}</p>

        {BIO_DATA.paragraphs.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

      {/* Publications Section */}
      <section className="mt-16 pt-8 max-w-[720px] mx-auto">
        <h2 className="text-2xl md:text-[26px] font-normal text-[#1A1A1A] mb-6">
          Research Publications &amp; Patents
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

          <div className="space-y-10">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="space-y-3">
                {/* Header row: Logo + Role + Subtitle */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3.5">
                  <div className="flex items-center gap-2">
                    {exp.id === 'exp-webkorps' ? <WebkorpsLogo /> : <MedicapsLogo />}
                  </div>

                  <div>
                    <h3 className="text-xl font-medium text-[#1A1A1A] leading-snug">
                      {exp.role}
                    </h3>
                    <p className="text-[14.5px] text-[#666461] leading-tight mt-0.5">
                      {exp.organization} | {exp.dates} | {exp.location}
                    </p>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-2 text-[17px] md:text-[18px] leading-[1.7] text-[#1A1A1A] pt-1">
                  {exp.description.map((desc, dIdx) => (
                    <p key={dIdx}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section with Interactive Pie Chart on Right */}
      <SkillsInteractiveChart />
    </div>
  );
};
