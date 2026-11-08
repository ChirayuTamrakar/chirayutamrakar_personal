import React, { useState } from 'react';
import { SKILLS_CATEGORIES, type SkillCategory } from '../data/content';
import { Search, Sparkles, Filter } from 'lucide-react';

export const SkillsInteractiveChart: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<'all' | 'devops' | 'cloud' | 'development'>('devops');
  const [hoveredCategoryId, setHoveredCategoryId] = useState<'devops' | 'cloud' | 'development' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // The active display category is whichever is currently hovered, or the selected one if not hovering
  const effectiveCategoryId = hoveredCategoryId || (activeCategoryId === 'all' ? 'devops' : activeCategoryId);

  const activeCategory = SKILLS_CATEGORIES.find((c) => c.id === effectiveCategoryId) || SKILLS_CATEGORIES[0];

  // All combined skills with their category tags
  const allSkills = SKILLS_CATEGORIES.flatMap((cat) =>
    cat.skills.map((s) => ({ name: s, categoryId: cat.id, categoryName: cat.name, color: cat.color }))
  );

  // Filter skills based on active selection and search query
  const displayedSkills = allSkills.filter((item) => {
    const matchesCategory =
      activeCategoryId === 'all'
        ? true
        : hoveredCategoryId
        ? item.categoryId === hoveredCategoryId
        : item.categoryId === activeCategoryId;

    const matchesSearch = searchQuery.trim() === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate SVG arc paths for the 3 categories
  // Angles in degrees: total 360
  // DevOps: 50% (180 deg), Cloud: 26% (93.6 deg), Development: 24% (86.4 deg)
  const segments = [
    {
      id: 'devops' as const,
      name: 'DevOps',
      percentage: 50,
      startAngle: -90,
      endAngle: 90,
      color: '#1A1A1A',
      hoverColor: '#000000',
      label: 'DevOps (41)'
    },
    {
      id: 'cloud' as const,
      name: 'Cloud',
      percentage: 26,
      startAngle: 90,
      endAngle: 183.6,
      color: '#C27803',
      hoverColor: '#D97706',
      label: 'Cloud (22)'
    },
    {
      id: 'development' as const,
      name: 'Development',
      percentage: 24,
      startAngle: 183.6,
      endAngle: 270,
      color: '#3F5161',
      hoverColor: '#4F667A',
      label: 'Development (20)'
    }
  ];

  // Convert polar coordinates to Cartesian for SVG path
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const createDonutSlice = (
    centerX: number,
    centerY: number,
    innerRadius: number,
    outerRadius: number,
    startAngle: number,
    endAngle: number
  ) => {
    // Add small gap between slices for elegant editorial separation
    const adjustedStart = startAngle + 1.2;
    const adjustedEnd = endAngle - 1.2;

    const startOuter = polarToCartesian(centerX, centerY, outerRadius, adjustedEnd);
    const endOuter = polarToCartesian(centerX, centerY, outerRadius, adjustedStart);
    const startInner = polarToCartesian(centerX, centerY, innerRadius, adjustedStart);
    const endInner = polarToCartesian(centerX, centerY, innerRadius, adjustedEnd);

    const arcSweep = adjustedEnd - adjustedStart <= 180 ? '0' : '1';

    return [
      `M ${startOuter.x} ${startOuter.y}`,
      `A ${outerRadius} ${outerRadius} 0 ${arcSweep} 0 ${endOuter.x} ${endOuter.y}`,
      `L ${startInner.x} ${startInner.y}`,
      `A ${innerRadius} ${innerRadius} 0 ${arcSweep} 1 ${endInner.x} ${endInner.y}`,
      'Z'
    ].join(' ');
  };

  return (
    <section className="mt-16 pt-8 max-w-[760px] mx-auto font-serif">
      <div className="border-t border-[#E5E1D8] pt-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
          <h2 className="text-2xl md:text-[26px] font-normal text-[#1A1A1A]">
            Technical Skills
          </h2>
          <span className="text-xs font-sans text-[#777]">
            Hover or click slices to explore domains
          </span>
        </div>
        <p className="text-[15.5px] leading-relaxed text-[#555] mb-8">
          Core competencies across cloud-native architecture, deployment orchestration, CI/CD automation, and full-stack engineering.
        </p>

        {/* 2-Column Split: Skills List on Left, Pie Chart on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Skills Explorer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Header for Active Category */}
            <div className="mb-4 pb-3 border-b border-[#EAE6DE] flex items-baseline justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{
                      backgroundColor:
                        activeCategoryId === 'all' ? '#1A1A1A' : activeCategory.color
                    }}
                  />
                  <h3 className="text-xl font-medium text-[#1A1A1A]">
                    {activeCategoryId === 'all'
                      ? 'All Technical Skills'
                      : activeCategory.name}
                  </h3>
                </div>
                <p className="text-xs font-sans text-[#666]">
                  {activeCategoryId === 'all'
                    ? 'Complete inventory of 74+ technologies and engineering tools'
                    : activeCategory.tagline}
                </p>
              </div>

              <span className="text-xs font-sans font-medium px-2 py-0.5 rounded-md bg-[#EBE7DF] text-[#444] shrink-0">
                {displayedSkills.length} skills
              </span>
            </div>

            {/* Quick Search Input */}
            <div className="relative mb-5">
              <Search className="w-4 h-4 text-[#888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. Kubernetes, AWS, Terraform, Docker, React)..."
                className="w-full pl-9 pr-3 py-1.5 text-xs font-sans rounded-lg border border-[#D8D4CA] bg-white text-[#111] focus:outline-none focus:ring-1 focus:ring-black placeholder:text-[#999]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-sans text-[#777] hover:text-black cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Badges Grid */}
            <div className="flex flex-wrap gap-2 min-h-[220px] content-start">
              {displayedSkills.length > 0 ? (
                displayedSkills.map((skill, idx) => {
                  const isDevops = skill.categoryId === 'devops';
                  const isCloud = skill.categoryId === 'cloud';
                  return (
                    <span
                      key={`${skill.name}-${idx}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[13.5px] font-sans font-medium transition-all duration-150 shadow-2xs ${
                        isDevops
                          ? 'bg-[#FCFBF8] border-[#DEDBD2] text-[#1A1A1A] hover:border-black hover:bg-white'
                          : isCloud
                          ? 'bg-[#FFFDF9] border-[#E8DCC8] text-[#8C5000] hover:border-[#C27803] hover:bg-white'
                          : 'bg-[#F9FAFA] border-[#D1D9DF] text-[#2F4250] hover:border-[#3F5161] hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                      <span>{skill.name}</span>
                    </span>
                  );
                })
              ) : (
                <div className="w-full py-8 text-center text-sm font-sans text-[#777]">
                  No skills matching &ldquo;{searchQuery}&rdquo;. Try another term.
                </div>
              )}
            </div>

            {/* Quick Toggle Link */}
            <div className="mt-4 pt-3 border-t border-[#EAE6DE] flex items-center justify-between text-xs font-sans text-[#666]">
              <span>
                Tip: Hover over the pie slices on the right to switch categories.
              </span>
              <button
                onClick={() => {
                  setActiveCategoryId(activeCategoryId === 'all' ? 'devops' : 'all');
                  setHoveredCategoryId(null);
                }}
                className="underline underline-offset-3 hover:text-black cursor-pointer font-medium text-[#222]"
              >
                {activeCategoryId === 'all' ? 'Focus by Category' : 'Show All (74)'}
              </button>
            </div>
          </div>

          {/* RIGHT: Interactive SVG Pie/Donut Chart (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl border border-[#DEDBD2] bg-[#FCFBF8] shadow-xs">
            {/* SVG Pie Chart */}
            <div className="relative w-52 h-52 sm:w-56 sm:h-56">
              <svg viewBox="0 0 240 240" className="w-full h-full transform transition-transform">
                <defs>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
                  </filter>
                </defs>

                {segments.map((seg) => {
                  const isHovered = hoveredCategoryId === seg.id;
                  const isSelected = activeCategoryId === seg.id;
                  const isActive = isHovered || (isSelected && !hoveredCategoryId);

                  // Expand radius slightly when active for prominent pop
                  const innerR = isActive ? 56 : 58;
                  const outerR = isActive ? 104 : 100;

                  return (
                    <path
                      key={seg.id}
                      d={createDonutSlice(120, 120, innerR, outerR, seg.startAngle, seg.endAngle)}
                      fill={isActive ? seg.hoverColor : seg.color}
                      className="cursor-pointer transition-all duration-200"
                      filter={isActive ? 'url(#shadow)' : undefined}
                      onMouseEnter={() => setHoveredCategoryId(seg.id)}
                      onMouseLeave={() => setHoveredCategoryId(null)}
                      onClick={() => {
                        setActiveCategoryId(seg.id);
                        setHoveredCategoryId(null);
                      }}
                    />
                  );
                })}

                {/* Donut Center Display */}
                <g className="pointer-events-none select-none text-center">
                  <text
                    x="120"
                    y="110"
                    textAnchor="middle"
                    className="font-serif text-[16px] font-normal fill-[#1A1A1A]"
                  >
                    {activeCategoryId === 'all' && !hoveredCategoryId
                      ? 'Total Skills'
                      : activeCategory.name.split(' ')[0]}
                  </text>
                  <text
                    x="120"
                    y="132"
                    textAnchor="middle"
                    className="font-sans text-[13px] font-semibold fill-[#666]"
                  >
                    {activeCategoryId === 'all' && !hoveredCategoryId
                      ? '74 Skills'
                      : `${activeCategory.skills.length} skills`}
                  </text>
                  <text
                    x="120"
                    y="148"
                    textAnchor="middle"
                    className="font-sans text-[10px] uppercase tracking-wider fill-[#999]"
                  >
                    {activeCategoryId === 'all' && !hoveredCategoryId
                      ? '100%'
                      : `${activeCategory.percentage}% of stack`}
                  </text>
                </g>
              </svg>
            </div>

            {/* Interactive Legend / Segment Buttons */}
            <div className="w-full mt-5 space-y-1.5 font-sans">
              {segments.map((seg) => {
                const isSelected = activeCategoryId === seg.id;
                const isHovered = hoveredCategoryId === seg.id;
                const catObj = SKILLS_CATEGORIES.find((c) => c.id === seg.id)!;

                return (
                  <button
                    key={seg.id}
                    onMouseEnter={() => setHoveredCategoryId(seg.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                    onClick={() => {
                      setActiveCategoryId(seg.id);
                      setHoveredCategoryId(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      isSelected || isHovered
                        ? 'bg-white border border-[#D5D0C5] text-black shadow-2xs'
                        : 'hover:bg-[#F2EFE8] text-[#555] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: seg.color }}
                      />
                      <span className="font-medium text-[13px]">
                        {catObj.name}
                      </span>
                    </div>

                    <span className="text-[#777] tabular-nums font-mono text-[11px]">
                      {catObj.skills.length} ({seg.percentage}%)
                    </span>
                  </button>
                );
              })}

              {/* View All Button */}
              <button
                onClick={() => {
                  setActiveCategoryId('all');
                  setHoveredCategoryId(null);
                }}
                className={`w-full text-center py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer mt-1 ${
                  activeCategoryId === 'all'
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-[#666] hover:text-black hover:bg-[#F0EDE5]'
                }`}
              >
                View Complete Stack (All 74)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
