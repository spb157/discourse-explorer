import PptxGenJS from 'pptxgenjs';
import { useState, useCallback, useRef, useEffect, useMemo } from "react";

const DM_LOGO_SRC = "data:image/png;base64,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TBstr/1rcBzHMIxRo0ax57jqEhH/dkSeDE6aNGnYsGGQLgAKN7Tpur5x48a+ffvyaTV+H1wsw6mpqU899ZT7FOYLnYAQonfv3qtXr772jV9ehoPn4cOH77///r1793LVRtHqlnuw46BBg1577TW/lPcUheviicO4cePGjh0brpMjAEIf4qWUx44d69GjR05OTnisl7tpz+XLl7/zzjsXRmqW6n/84x8zZswIb9EKdl1paWkPPfTQyZMn+XzzotItlihd1wcNGvTee+/53b8XyhjTdX3EiBFz5sy5HnobACEI8VLKfv367d69mw93D6dwoWnayy+/zGlA99bYja1YseKll166fpI3LF3btm3r2bPnRT1o4eiWuwl35MiR7733nn9XSgsRPmZG07S+ffteUa4WAPBbE8H3339//vz54bfBn6NlTk7Of//3f7thmmsOjx071qdPH64Xv07SV+xBDcNYtmzZSy+99LubuuRVdynDMMaOHfv6669f3Q7wcG19IUR2dvbjjz/O9SloEwCu2o7s2rVrxIgRl7nm4dN7XL58+eLFi7m2kKs2nn/++f3794eZv7x81/WPf/zjiy++uPS8/4oDqyuMn332GXcpbLkt0PS6rm/btm348OEefKQsAH6ZAtq2/fzzz585c8Z1J+HKqFGj8vLyiEjX9blz586ePZuPa7g+v3QhxHPPPZeenn4J13XFusVO61//+tczzzzDRZwIzReVrkmTJn311Vf+OkYMAC8ELyKKjIz86KOPVqxYEd62g3Oh27Ztmz9/vqZpx48fHzZsmAefjR4yuNDv8OHDzz///CXmK/JK35Sfp9KzZ89z586F/TzoWsaeUmrIkCHsTdEgAFxRnMnIyHj11Ve9fGZuIcYKIcTEiROFEK+++ur+/fuDyzSuz3m/pmkLFiyYNWvWb2UL5RW1r1KKd8wdOXIkXJPOhTWNMgzj559/njJlyo033ogGAeAynRbXvo8ePTojI4M3g4b35JgrBjds2DBx4sTPPvvsepDqy9TyESNGHD9+/KLuU15R+2qaNnTo0LVr16IW43JmDUKIkSNHPvroozCmAFyOzSKi//3f/+3ateu0adPC+HTTi4aLgQMHZmVl4YG0lH+qSFpa2t///veLCrm8/GblE3wnTpyIzUmXb0+zs7M3bdqE1gDgMv1Wdnb2ggULzp49e10dVO3K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";
const DmLogo = ({ height = 22 }) => (
  <img src={DM_LOGO_SRC} alt="d+m" style={{ height: `${height}px`, display: "block" }} />
);

const DM = {
  yellow: "#FFD900", black: "#111111", nearBlack: "#1A1A1A",
  grey600: "#555555", grey400: "#999999", grey200: "#D4D4D4", grey100: "#EEEEEE", grey50: "#F7F7F7",
  white: "#FFFFFF", red: "#DB2B39",
};
const Q_COLORS = { topLeft: "#0A3A75", topRight: "#2A8C51", bottomLeft: "#999999", bottomRight: "#EB573F" };

/* ─── PROVOCATION TYPES ─── */
const PROV_TYPES = {
  "Two Sides": {
    bg: "#FFF3CD", border: "#E6AC00", text: "#7A5800",
    description: "Present both opposing forces and ask which feels closer to their truth.",
    placeholder: "e.g. \"some people want full control over their money, others want to hand it over \u2014 which camp are you in?\"",
    definition: "Puts both forces directly to participants: 'Some people feel [Force A]; others feel [Force B]. Which is closer to your experience \u2014 and where does the friction come from?'",
  },
  "Bold Claim": {
    bg: "#FFE8E8", border: "#DB2B39", text: "#8B0000",
    description: "A provocative statement in real discourse language \u2014 does this ring true?",
    placeholder: "e.g. \"people describe their bank as a landlord they can\u2019t leave \u2014 does that land for you?\"",
    definition: "A bold claim using corpus language that participants react to: 'We came across people describing [category] as [verbatim corpus phrase]. Does that ring true for you?'",
  },
  "Future Scenario": {
    bg: "#E8F0FF", border: "#3366CC", text: "#1A3A7A",
    description: "A near-future world where the tension resolves one way. What does that feel like?",
    placeholder: "e.g. \"it\u2019s 2030 and your most trusted financial adviser is an AI \u2014 is that a relief or a loss?\"",
    definition: "Presents a near-future world where the tension has resolved in one direction: 'Imagine it\u2019s [year] and [Force A has won]. What does that world feel like \u2014 and is that a good thing?'",
  },
  "Language Playback": {
    bg: "#E8F8EE", border: "#2A8C51", text: "#1A5230",
    description: "Play real words from the discourse back to participants \u2014 what do they reveal?",
    placeholder: "e.g. \"people keep using the word escape when they talk about switching banks \u2014 what does that tell you?\"",
    definition: "Plays back actual discourse language to participants: 'We found people using the phrase [metaphor or framing from corpus] when talking about [subject]. What does that language tell you about how people really feel?'",
  },
  "Flip It": {
    bg: "#F3E8FF", border: "#7B3FA0", text: "#4A1A6A",
    description: "Ask participants to reason from an unexpected angle and break category assumptions.",
    placeholder: "e.g. \"if your bank were a personal trainer rather than a security guard, what would it do differently?\"",
    definition: "Asks participants to reason from an unexpected angle: 'If [category] were [adjacent category], what would it need to do differently?'",
  },
};
const PROV_TYPE_KEYS = Object.keys(PROV_TYPES);

/* ─── DEMO DATA ─── */
const SAMPLE_META = {
  territory: "The Language of Empowering Trust",
  client: "HSBC", project: "Growth Mindset Programme",
  markets: ["UK", "Hong Kong", "US", "UAE", "China", "Singapore", "India"],
  timeScope: "2020\u20132025", date: "2026-02-25",
  researchObjective: "How is trust constructed and expressed among globally affluent financial services customers \u2014 and how has the language shifted from protection to empowerment?",
  goingInHunches: [
    "Trust language has shifted from fortress metaphors to launchpad metaphors",
    "Empowerment framing is stronger in emerging markets than established ones",
    "Digital trust is a separate discourse from interpersonal trust",
  ],
  corpusNotes: "42 curated sources across 7 markets. 4 Perplexity reports, 2 Gemini reports. Strong on UK, US, HK. Lighter on UAE and India social media.",
  gaps: [
    "Limited social media sources from UAE and India",
    "No Singlish/Hokkien language sources from Singapore",
    "Under-represented: video content, podcast transcripts",
    "Thin on CIB/institutional banking discourse \u2014 corpus skews IWPB/wealth",
  ],
};

const SAMPLE_SOURCES = [
  { id: 1, title: "Trust in Banking: A Fortress Under Siege", author: "Martin Wolf", date: "2024-03", url: "https://ft.com/content/trust-banking", type: "News", market: "UK" },
  { id: 2, title: "The Great Wealth Transfer and Trust", author: "Campden Wealth", date: "2024-06", url: "https://campdenwealth.com/great-transfer", type: "Category", market: "Global" },
  { id: 3, title: "Why I left my private banker", author: "Various", date: "2024-01", url: "https://reddit.com/r/fatFIRE", type: "Social", market: "US" },
  { id: 4, title: "\u4fe1\u4efb\u5c31\u662f\u5b89\u5168\u611f\u3002\u94f6\u884c\u7ed9\u6211\u7684\u4fe1\u4efb\u5c31\u662f\u4e0d\u4f1a\u5012\u95ed", author: "Zhihu discussion", date: "2024-04", url: "", type: "Social", market: "China" },
  { id: 5, title: "Empowerment in Wealth Management", author: "McKinsey & Co", date: "2024-09", url: "https://mckinsey.com/empowerment-wealth", type: "Category", market: "Global" },
  { id: 6, title: "Hong Kong\u2019s Trust Deficit", author: "SCMP", date: "2024-07", url: "https://scmp.com/trust-deficit", type: "News", market: "Hong Kong" },
  { id: 7, title: "Digital Trust in Asian Banking", author: "Bain & Company", date: "2024-05", url: "https://bain.com/digital-trust-asia", type: "Category", market: "Singapore" },
  { id: 8, title: "Self-directed platforms changed my life", author: "Various", date: "2024-02", url: "https://reddit.com/r/FIREUK", type: "Social", market: "UK" },
  { id: 9, title: "The Trusted Adviser Myth", author: "Robin Powell", date: "2024-08", url: "https://evidenceinvestor.com/trusted-adviser", type: "Opinion", market: "UK" },
  { id: 10, title: "Rebuilding Trust After SVB", author: "Harvard Business Review", date: "2023-11", url: "https://hbr.org/svb-trust", type: "Academic", market: "US" },
  { id: 11, title: "Generational Trust Dynamics in MENA", author: "PwC", date: "2024-04", url: "https://pwc.com/mena-trust", type: "Category", market: "UAE" },
  { id: 12, title: "The Language of Financial Confidence", author: "Edelman Trust Barometer", date: "2024-01", url: "https://edelman.com/trust-barometer", type: "Academic", market: "Global" },
  { id: 13, title: "\u79c1\u4eba\u94f6\u884c\u662f\u670d\u52a1\u8fd8\u662f\u675f\u7f1a\uff1f", author: "Xiaohongshu post", date: "2024-03", url: "", type: "Social", market: "China" },
  { id: 14, title: "Trust and the Algorithmic Banker", author: "FT Alphaville", date: "2024-10", url: "https://ftalphaville.ft.com/algo-banker", type: "Opinion", market: "UK" },
  { id: 15, title: "What Indian HNWIs Really Want", author: "IIFL Wealth", date: "2024-06", url: "https://iiflwealth.com/hnwi-wants", type: "Category", market: "India" },
];

const SAMPLE_NARRATIVES = [
  { id: 1, name: "Fortress Trust", description: "Trust as protection, security, and risk mitigation. The dominant language of banking trust \u2014 vaults, shields, guarantees. Clients frame trust as the absence of fear rather than the presence of enablement.", x: 0.1, salience: 85,
    emotionalRegister: { primary: "Anxiety", secondary: "Comfort", rationale: "The underlying emotion is anxiety about loss \u2014 and the bank\u2019s role is to soothe it." },
    metaphorFamily: { primary: "TRUST IS A FORTRESS", examples: ["rock solid", "safe haven", "financial shield", "protected", "ring-fenced"], rationale: "Trust understood through physical enclosure and military defence. Makes trust about what\u2019s kept out, not what\u2019s enabled." },
    culturalStrategy: { orthodoxy: "Banks exist to protect your wealth from risk. The foundational myth of the category.", contradiction: "People experience empowering trust in every other relationship. Banking is the only trust that stops at anxiety reduction.", opportunity: "The brand that redefines banking trust from \u2018protection from\u2019 to \u2018confidence to\u2019 tells an entirely new category story." },
    quotes: [
      { text: "I just need to know my money is safe. That\u2019s all trust means to me with a bank.", source: "Reddit r/UKPersonalFinance, 2024", market: "UK" },
      { text: "\u4fe1\u4efb\u5c31\u662f\u5b89\u5168\u611f\u3002\u94f6\u884c\u7ed9\u6211\u7684\u4fe1\u4efb\u5c31\u662f\u4e0d\u4f1a\u5012\u95ed\u3002", source: "Zhihu discussion, 2024", market: "China" },
      { text: "After SVB, trust means one thing: will this institution still exist tomorrow?", source: "HBR, 2023", market: "US" },
      { text: "The first question any wealthy client asks is not \u2018can you grow my money?\u2019 It\u2019s \u2018can you protect it?\u2019", source: "Campden Wealth, 2024", market: "Global" },
      { text: "We chose HSBC because nobody ever got fired for picking the biggest bank. It\u2019s not exciting. It\u2019s safe.", source: "PwC MENA, 2024", market: "UAE" },
    ],
    sources: [1, 4, 10, 12], markets: ["UK", "Hong Kong", "US", "China"],
    linguisticPatterns: ["Fortress/vault metaphors", "Insurance language", "Passive voice \u2014 trust is received, not built", "Negation framing: \u2018won\u2019t lose\u2019 rather than \u2018will gain\u2019"],
    relatedNarratives: [2, 6],
  },
  { id: 2, name: "Relationship Covenant", description: "Trust as a personal bond between banker and client. The handshake, the long lunch, the adviser who \u2018knows my family.\u2019 Strongest in older wealth and Asian markets where guanxi frames commercial relationships.", x: 0.18, salience: 65,
    emotionalRegister: { primary: "Comfort", secondary: "Nostalgia", rationale: "Warmth and familiarity \u2014 the emotional texture is belonging, not excitement." },
    metaphorFamily: { primary: "TRUST IS A BOND", examples: ["my banker", "they know me", "long-standing relationship", "personal touch", "handshake"], rationale: "Trust as interpersonal connection. Makes switching feel like betrayal rather than a rational decision." },
    culturalStrategy: { orthodoxy: "The personal banker relationship is the gold standard of financial trust.", contradiction: "NextGen clients find the personal banker model paternalistic and opaque.", opportunity: "Reframe personal service from \u2018I know what\u2019s best for you\u2019 to \u2018I help you do what\u2019s best for you.\u2019" },
    quotes: [
      { text: "My banker came to my daughter\u2019s wedding. You don\u2019t leave that kind of relationship.", source: "Campden Wealth, 2024", market: "Global" },
      { text: "The relationship model feels like they\u2019re managing me, not my money.", source: "Reddit r/fatFIRE, 2024", market: "US" },
      { text: "\u79c1\u4eba\u94f6\u884c\u5bb6\u8bf4\u2018\u6211\u4eec\u662f\u4e00\u5bb6\u4eba\u2019\u2014\u2014\u4f46\u8d26\u5355\u6765\u7684\u65f6\u5019\u5c31\u4e0d\u50cf\u4e86\u3002", source: "Xiaohongshu, 2024", market: "China" },
      { text: "My father\u2019s banker knew three generations of our family. My fintech knows my spending patterns. Which is real trust?", source: "IIFL Wealth, 2024", market: "India" },
      { text: "In Hong Kong, you don\u2019t switch banks. Your banker moves, and you follow the person, not the institution.", source: "SCMP, 2024", market: "Hong Kong" },
    ],
    sources: [2, 3, 6, 15], markets: ["UK", "Hong Kong", "US", "India"],
    linguisticPatterns: ["Kinship language", "Possessive pronouns: \u2018my banker\u2019", "Time markers: \u2018for 20 years\u2019", "Loyalty vocabulary"],
    relatedNarratives: [1, 6],
  },
  { id: 3, name: "Transparency Imperative", description: "Trust through radical openness \u2014 fees, performance, decision-making logic. The antidote to banking\u2019s perceived opacity. Growing fast, especially post-SVB and among digital-native clients.", x: 0.4, salience: 38,
    emotionalRegister: { primary: "Indignation", secondary: "Defiance", rationale: "Driven by frustration with hidden fees and opaque practices. The tone is assertive, not passive." },
    metaphorFamily: { primary: "TRUST IS VISIBILITY", examples: ["show me the numbers", "nothing to hide", "full disclosure", "see-through", "open book"], rationale: "Trust as optical clarity. If I can see it, I can trust it. Demands that institutions reveal rather than reassure." },
    culturalStrategy: { orthodoxy: "Banks earn trust through reputation and track record.", contradiction: "Reputation is inherited, not earned \u2014 and track records are selectively presented.", opportunity: "Make transparency the product, not just the policy. First bank to make every fee, every decision visible in real time wins a generation." },
    quotes: [
      { text: "If you can\u2019t show me exactly what I\u2019m paying for, I\u2019m out.", source: "Reddit r/FIREUK, 2024", market: "UK" },
      { text: "Transparency isn\u2019t a feature. It\u2019s the minimum.", source: "FT Alphaville, 2024", market: "UK" },
      { text: "I switched from a private bank to Vanguard. Not because the returns were better. Because I could finally see the fees.", source: "Reddit r/fatFIRE, 2024", market: "US" },
      { text: "Every time I ask my RM for a fee breakdown, I get a PDF that raises more questions than it answers.", source: "Reddit r/HNWObsessed, 2024", market: "US" },
      { text: "The challenger banks won trust by showing everything. The incumbents lost it by hiding the obvious.", source: "Edelman Trust Barometer, 2024", market: "Global" },
    ],
    sources: [8, 9, 14, 10], markets: ["UK", "US", "Singapore"],
    linguisticPatterns: ["Visual metaphors: see, show, reveal", "Demand language: \u2018I want\u2019, \u2018show me\u2019", "Audit vocabulary", "Comparison to tech platforms"],
    relatedNarratives: [5, 8],
  },
  { id: 4, name: "Empowerment Exit", description: "Trust as self-directed capability. People describe empowerment only when *leaving* banks \u2014 moving to self-directed platforms, taking control. Empowerment is framed as escape from banking, not a banking service.", x: 0.65, salience: 22,
    emotionalRegister: { primary: "Defiance", secondary: "Pride", rationale: "The emotional register is liberation \u2014 triumphant departure from a constraining relationship." },
    metaphorFamily: { primary: "BANKING IS CAPTIVITY", examples: ["finally free", "took control", "broke away", "liberated", "on my own terms"], rationale: "Banking framed as confinement. Empowerment only exists outside the bank\u2019s walls. A devastating metaphor for any institution trying to own empowerment." },
    culturalStrategy: { orthodoxy: "Banks empower clients through expert advice and managed services.", contradiction: "Clients only use empowerment language when describing departure. The bank is what they\u2019re empowered *from*.", opportunity: "The brand that makes empowerment mean \u2018with us\u2019 rather than \u2018away from us\u2019 rewrites the category\u2019s emotional contract." },
    quotes: [
      { text: "Moving to a self-directed platform was the most empowering financial decision I ever made.", source: "Reddit r/FIREUK, 2024", market: "UK" },
      { text: "I don\u2019t want a trusted adviser. I want tools that make me the expert.", source: "Reddit r/fatFIRE, 2024", market: "US" },
      { text: "The day I moved my ISA out of the bank and into a platform I controlled, I felt like an adult for the first time.", source: "Reddit r/UKPersonalFinance, 2024", market: "UK" },
      { text: "Empowerment in wealth management remains the industry\u2019s most aspirational \u2014 and least delivered \u2014 promise.", source: "McKinsey & Co, 2024", market: "Global" },
      { text: "My bank kept saying \u2018we\u2019re here to help you grow.\u2019 I grew by leaving.", source: "Reddit r/FIREUK, 2024", market: "UK" },
    ],
    sources: [3, 5, 8, 9], markets: ["UK", "US"],
    linguisticPatterns: ["Escape/liberation vocabulary", "Agency markers: \u2018I decided\u2019, \u2018I took control\u2019", "Before/after narratives", "Platform names as liberation markers"],
    relatedNarratives: [3, 7],
  },
  { id: 5, name: "Digital Confidence", description: "Trust in platforms, interfaces, and data. Not trust in people but trust in systems. Speed, UX, and real-time data as trust signals. Growing fastest in Singapore and among under-40s globally.", x: 0.52, salience: 30,
    emotionalRegister: { primary: "Confidence", secondary: "Aspiration", rationale: "Forward-leaning energy \u2014 digital tools make people feel capable and modern." },
    metaphorFamily: { primary: "TRUST IS A DASHBOARD", examples: ["real-time", "at my fingertips", "instant access", "seamless", "in control"], rationale: "Trust mediated through interface design. The experience IS the trust \u2014 if the app feels right, the bank feels right." },
    culturalStrategy: { orthodoxy: "Trust is built through human relationships over time.", contradiction: "A generation trusts an app they\u2019ve used for six months more than a banker they\u2019ve known for six years.", opportunity: "Design trust, don\u2019t declare it. The interface is the relationship." },
    quotes: [
      { text: "I trust Revolut more than my private bank because I can see everything happening in real time.", source: "Reddit r/UKPersonalFinance, 2024", market: "UK" },
      { text: "Good UX is trust. Bad UX is a reason to leave.", source: "Bain & Company, 2024", market: "Singapore" },
      { text: "When the app works seamlessly, I don\u2019t think about the bank at all. That\u2019s the highest form of trust \u2014 not having to worry.", source: "Reddit r/fatFIRE, 2024", market: "US" },
      { text: "My 28-year-old clients trust their banking app more than their relationship manager. They\u2019ve never met the RM. They use the app daily.", source: "Bain & Company, 2024", market: "Singapore" },
      { text: "If the app is down for two hours, my trust drops more than if my banker takes a week to return my call. Different generation, different trust.", source: "FT Alphaville, 2024", market: "UK" },
    ],
    sources: [7, 8, 14], markets: ["UK", "Singapore", "US", "Hong Kong"],
    linguisticPatterns: ["Tech/platform vocabulary", "Speed markers: \u2018instant\u2019, \u2018real-time\u2019", "Control language", "Comparison to consumer tech"],
    relatedNarratives: [3, 4],
  },
  { id: 6, name: "Heritage Authority", description: "Trust earned through longevity, institutional weight, and brand heritage. \u2018150 years of banking excellence.\u2019 Powerful in Asian markets where institutional age signals stability. Under pressure in the West.", x: 0.2, salience: 58,
    emotionalRegister: { primary: "Comfort", secondary: "Pride", rationale: "Heritage signals safety through survival \u2014 if they\u2019ve lasted this long, they must be trustworthy." },
    metaphorFamily: { primary: "TRUST IS INHERITANCE", examples: ["established", "time-tested", "legacy", "pedigree", "founded in"], rationale: "Trust as something passed down rather than earned. Age is the credential." },
    culturalStrategy: { orthodoxy: "Older institutions are more trustworthy because they\u2019ve survived.", contradiction: "Survival doesn\u2019t equal relevance. Heritage can signal \u2018stuck\u2019 as easily as \u2018stable.\u2019", opportunity: "Use heritage to tell a story about evolution, not endurance. \u2018We\u2019ve adapted for 150 years\u2019 beats \u2018we\u2019ve existed for 150 years.\u2019" },
    quotes: [
      { text: "There\u2019s comfort in banking with an institution that\u2019s older than your country.", source: "SCMP, 2024", market: "Hong Kong" },
      { text: "Heritage means nothing if the digital experience is from 2010.", source: "Reddit r/fatFIRE, 2024", market: "US" },
      { text: "In the Gulf, we say \u2018old money trusts old banks.\u2019 The new generation doesn\u2019t care how old you are. They care how fast you are.", source: "PwC MENA, 2024", market: "UAE" },
      { text: "HSBC\u2019s 150 years means something in Asia. In London, it just means they\u2019ve had 150 years to accumulate legacy systems.", source: "FT Alphaville, 2024", market: "UK" },
      { text: "When my grandfather opened his account, the bank\u2019s age was reassuring. For me, it\u2019s a question: have you changed in all that time?", source: "IIFL Wealth, 2024", market: "India" },
    ],
    sources: [1, 2, 6, 11], markets: ["UK", "Hong Kong", "UAE", "India"],
    linguisticPatterns: ["Temporal markers: \u2018since\u2019, \u2018for generations\u2019", "Architectural metaphors", "Lineage language", "Weight/gravity vocabulary"],
    relatedNarratives: [1, 2],
  },
  { id: 7, name: "Community-Embedded Trust", description: "Trust rooted in local presence, community ties, and shared identity. Not institutional trust but belonging trust. Strong in India and UAE where family office culture intersects with community networks.", x: 0.75, salience: 15,
    emotionalRegister: { primary: "Pride", secondary: "Hope", rationale: "Community trust carries collective pride and aspiration \u2014 \u2018our bank\u2019 not \u2018my bank.\u2019" },
    metaphorFamily: { primary: "TRUST IS BELONGING", examples: ["our community", "one of us", "understands our values", "speaks our language", "family"], rationale: "Trust through shared identity. The bank earns trust by being part of the community, not serving it from outside." },
    culturalStrategy: { orthodoxy: "Banks serve communities from a position of institutional authority.", contradiction: "Global banks struggle to feel local. The \u2018glocal\u2019 promise rarely lands authentically.", opportunity: "Embed, don\u2019t just localise. Community trust requires genuine participation, not translated marketing." },
    quotes: [
      { text: "I bank where my family has always banked. It\u2019s not about rates.", source: "IIFL Wealth, 2024", market: "India" },
      { text: "They sponsor our mosque\u2019s iftar every year. That\u2019s trust you can\u2019t buy.", source: "PwC MENA, 2024", market: "UAE" },
      { text: "A global bank will never understand what matters to a Gujarati family office. We need someone who speaks the language \u2014 literally and culturally.", source: "IIFL Wealth, 2024", market: "India" },
      { text: "In our community, your banker\u2019s reputation is your reputation. You choose carefully.", source: "PwC MENA, 2024", market: "UAE" },
      { text: "The Singaporean Chinese community still banks through introductions. Nobody trusts a cold call from a private bank. You need someone to vouch.", source: "Bain & Company, 2024", market: "Singapore" },
    ],
    sources: [11, 15], markets: ["India", "UAE"],
    linguisticPatterns: ["Collective pronouns: \u2018we\u2019, \u2018our\u2019", "Cultural/religious references", "Place-based language", "Generational continuity"],
    relatedNarratives: [2, 6],
  },
  { id: 8, name: "Algorithmic Trust", description: "The frontier: trusting AI and algorithms over human judgement for financial decisions. Very early signal, mostly in tech-forward segments. Raises profound questions about what trust even means when the adviser is a model.", x: 0.88, salience: 8,
    emotionalRegister: { primary: "Aspiration", secondary: "Anxiety", rationale: "Excitement about capability mixed with unease about ceding control to systems we don\u2019t fully understand." },
    metaphorFamily: { primary: "TRUST IS COMPUTATION", examples: ["data-driven", "objective", "unbiased", "optimised", "the algorithm knows"], rationale: "Trust as mathematical certainty. Removes human error but also human connection." },
    culturalStrategy: { orthodoxy: "Trust requires human judgement, empathy, and accountability.", contradiction: "Algorithms already outperform human advisers on most measurable outcomes. The emotional case for human trust is losing its rational foundation.", opportunity: "The first bank to make AI feel personally trustworthy \u2014 not cold and efficient but warm and capable \u2014 owns the next decade." },
    quotes: [
      { text: "An algorithm doesn\u2019t have bad days. It doesn\u2019t have conflicts of interest. Why wouldn\u2019t I trust it more?", source: "FT Alphaville, 2024", market: "UK" },
      { text: "I\u2019d rather trust a model that shows its working than a banker who hides behind \u2018experience.\u2019", source: "Reddit r/fatFIRE, 2024", market: "US" },
      { text: "The robo-adviser doesn\u2019t judge me for asking basic questions. My private banker made me feel stupid for not knowing.", source: "Reddit r/UKPersonalFinance, 2024", market: "UK" },
      { text: "AI will replace the adviser. But it won\u2019t replace the feeling of someone caring about your future. That\u2019s the gap.", source: "McKinsey & Co, 2024", market: "Global" },
      { text: "In Singapore, the young tech founders already trust algo-driven wealth platforms more than any human RM. It\u2019s not even close.", source: "Bain & Company, 2024", market: "Singapore" },
    ],
    sources: [14, 3, 7], markets: ["UK", "US", "Singapore"],
    linguisticPatterns: ["Computing vocabulary", "Comparison to human fallibility", "Objectivity language", "Sci-fi adjacent framing"],
    relatedNarratives: [5, 3],
  },
];

const SAMPLE_AXES = [
  { id: "protection-empowerment", name: "Protection \u2194 Empowerment", topLabel: "Empowerment", bottomLabel: "Protection",
    rationale: "The deepest tension in this territory: trust that shields you from risk vs. trust that enables you to act. Where the category\u2019s biggest strategic opportunity sits.",
    quadrants: {
      topLeft: { label: "Established Enablers", tagline: "Dominant empowerment narratives" },
      topRight: { label: "Empowerment Frontier", tagline: "Emerging enablement territory" },
      bottomLeft: { label: "Safety Orthodoxy", tagline: "The trust baseline everyone expects" },
      bottomRight: { label: "New Protection", tagline: "Emerging safety narratives" },
    },
    yPositions: { "1": 0.85, "2": 0.62, "3": 0.3, "4": 0.12, "5": 0.25, "6": 0.78, "7": 0.35, "8": 0.18 },
    narrative: {
      headline: "Trust empowers people everywhere in their lives \u2014 except at the bank",
      summary: "Most of what the banking category puts into the world about trust still revolves around protection: safeguarding assets, managing risk, shielding wealth from volatility. This is the foundational language of banking trust. It\u2019s credible, familiar, and increasingly insufficient.\n\nMeanwhile, in every other domain of life \u2014 personal relationships, education, healthcare, work \u2014 trust is the thing that enables people to take risks, grow, and act with confidence. Trust empowers. Except, apparently, at the bank.\n\nThe most striking finding in this corpus is what we\u2019ve called the Empowerment Gap: clients only use empowerment language when describing their departure from banking relationships. Moving to self-directed platforms, taking control, breaking free. Empowerment is what happens when you leave, not when you stay.\n\nThis creates a profound strategic challenge for HSBC\u2019s Growth Mindset Programme. The programme\u2019s ambition is to position HSBC as the bank that empowers. But the discourse suggests that empowerment and banking are, in cultural terms, currently antonyms. The opportunity is enormous \u2014 but it requires rewriting the category\u2019s emotional contract, not just its marketing.",
      keyTension: "How might HSBC redefine empowerment so it means \u2018with us\u2019 rather than \u2018away from us\u2019?",
    },
  },
  { id: "institutional-personal", name: "Institutional \u2194 Personal", topLabel: "Personal", bottomLabel: "Institutional",
    rationale: "Where trust resides: in the institution\u2019s brand and systems, or in individual relationships and personal capability.",
    quadrants: {
      topLeft: { label: "Personal Mainstream", tagline: "Established human-centred trust" },
      topRight: { label: "New Intimacy", tagline: "Emerging personal trust forms" },
      bottomLeft: { label: "Institutional Bedrock", tagline: "Trust in brands and systems" },
      bottomRight: { label: "System Challengers", tagline: "New institutional trust forms" },
    },
    yPositions: { "1": 0.75, "2": 0.15, "3": 0.55, "4": 0.2, "5": 0.65, "6": 0.82, "7": 0.1, "8": 0.7 },
    narrative: {
      headline: "The institution earned the trust. The person keeps it. Neither can work alone.",
      summary: "Banking trust has always had two legs: the institution\u2019s brand (\u2018HSBC is solid\u2019) and the personal relationship (\u2018my banker understands me\u2019). This corpus reveals that the two are pulling apart.\n\nInstitutional trust is under pressure from crisis contagion (SVB, Credit Suisse) and a generational shift away from deference to authority. Heritage alone no longer closes the trust gap. Meanwhile, personal trust is under pressure from digital transformation \u2014 the private banker model doesn\u2019t scale, and younger clients often prefer an interface to an individual.\n\nThe most interesting space is where personal and institutional trust intersect with digital capability. Clients in Singapore and Hong Kong describe trusting apps that feel personal \u2014 not because a human is behind them, but because the experience anticipates their needs.\n\nThe implication for HSBC: institutional trust gets you in the room. Personal trust (human or digital) keeps you there. The challenge is building personal-feeling trust at institutional scale.",
      keyTension: "Can a global institution feel personally trustworthy \u2014 and if so, does that require humans, technology, or both?",
    },
  },
  { id: "rational-emotional", name: "Rational \u2194 Emotional", topLabel: "Emotional", bottomLabel: "Rational",
    rationale: "How trust is constructed: through evidence, data, and transparency (rational) or through feeling, belonging, and identity (emotional).",
    quadrants: {
      topLeft: { label: "Emotional Establishment", tagline: "The familiar trust playbook" },
      topRight: { label: "Feeling Frontiers", tagline: "Emerging emotional territory" },
      bottomLeft: { label: "Evidence Base", tagline: "Rational trust foundations" },
      bottomRight: { label: "Proof Disruptors", tagline: "New forms of rational trust" },
    },
    yPositions: { "1": 0.72, "2": 0.2, "3": 0.82, "4": 0.55, "5": 0.7, "6": 0.18, "7": 0.12, "8": 0.88 },
    narrative: {
      headline: "The category sells trust on emotion \u2014 but a new generation wants receipts",
      summary: "Banking has always earned trust through emotional signals: heritage, gravitas, the reassuring weight of marble and mahogany. This emotional playbook built the category and still dominates. But the corpus reveals a growing segment \u2014 particularly under-40s and digitally native wealth \u2014 who find emotional trust signals insufficient or even suspicious.\n\nThe rational trust discourse is growing fast. Transparency, data, evidence, fees laid bare. These clients don\u2019t want to feel trusted; they want to verify trust. The language is strikingly different: optical, auditory, computational.\n\nBut the most nuanced finding is that rational and emotional trust aren\u2019t opposites \u2014 they\u2019re sequential. Rational trust (transparency, data) gets permission to build emotional trust (belonging, empowerment). Banks that skip the rational foundation and go straight to emotional messaging are increasingly mistrusted.\n\nFor HSBC, this suggests a sequencing strategy: lead with transparency to earn the right to inspire.",
      keyTension: "Does HSBC lead with proof to earn the right to inspire \u2014 or lead with inspiration and back it with proof?",
    },
  },
];

const SAMPLE_TENSIONS = [
  { id: 1, rank: 1, forceA: "Trust as Protection", forceB: "Trust as Empowerment",
    summary: "The Empowerment Gap \u2014 banks position trust as safety, but clients only use empowerment language when describing departure.",
    evidence: [
      { text: "Moving to a self-directed platform was the most empowering financial decision I ever made.", source: "Reddit r/FIREUK", narrativeId: 4 },
      { text: "I just need to know my money is safe. That\u2019s all trust means to me with a bank.", source: "Reddit r/UKPersonalFinance", narrativeId: 1 },
      { text: "Empowerment in wealth management remains the industry\u2019s most aspirational \u2014 and least delivered \u2014 promise.", source: "McKinsey & Co", narrativeId: 4 },
    ],
    significance: "This tension sits at the heart of HSBC\u2019s strategic challenge. The entire Growth Mindset Programme is predicated on empowerment \u2014 but the discourse reveals that empowerment and banking are currently experienced as opposites.",
    categoryRelevance: "Directly maps to HSBC\u2019s Growth Mindset Programme. If empowerment means leaving, the programme needs to redefine what empowerment feels like inside a banking relationship.",
    strategicQuestion: "How might HSBC redefine empowerment so it means \u2018with us\u2019 rather than \u2018away from us\u2019?",
  },
  { id: 2, rank: 2, forceA: "Heritage Authority", forceB: "Digital Innovation",
    summary: "150 years of history is a trust asset in Asia and a trust liability among digital natives. The same credential works in opposite directions across segments.",
    evidence: [
      { text: "There\u2019s comfort in banking with an institution that\u2019s older than your country.", source: "SCMP", narrativeId: 6 },
      { text: "Heritage means nothing if the digital experience is from 2010.", source: "Reddit r/fatFIRE", narrativeId: 6 },
      { text: "Good UX is trust. Bad UX is a reason to leave.", source: "Bain & Company", narrativeId: 5 },
    ],
    significance: "This tension reflects a generational and cultural fault line. It\u2019s not just about channels \u2014 it\u2019s about what counts as a trust credential in different worlds.",
    categoryRelevance: "HSBC\u2019s 150-year heritage is one of its strongest brand assets. But the discourse reveals it needs to be deployed strategically \u2014 leading with heritage in HK/UAE, leading with digital in UK/Singapore.",
    strategicQuestion: "Can a 150-year heritage ever feel genuinely innovative \u2014 or does HSBC need separate trust stories for heritage and digital audiences?",
  },
  { id: 3, rank: 3, forceA: "Institutional Trust", forceB: "Personal Trust",
    summary: "Trust in the brand gets you in the room. Trust in the person keeps you there. But digital is disrupting both \u2014 and creating a third form neither fully owns.",
    evidence: [
      { text: "My banker came to my daughter\u2019s wedding. You don\u2019t leave that kind of relationship.", source: "Campden Wealth", narrativeId: 2 },
      { text: "The relationship model feels like they\u2019re managing me, not my money.", source: "Reddit r/fatFIRE", narrativeId: 2 },
      { text: "I trust Revolut more than my private bank because I can see everything happening in real time.", source: "Reddit r/UKPersonalFinance", narrativeId: 5 },
    ],
    significance: "This tension runs deep because it\u2019s about where trust actually resides \u2014 in systems, in people, or in interfaces. Digital platforms are creating a hybrid that challenges both poles.",
    categoryRelevance: "HSBC operates both institutional (brand) and personal (relationship banker) trust models. The question is how digital capability enhances or replaces both.",
    strategicQuestion: "What does personally trustworthy feel like when the \u2018person\u2019 is an interface?",
  },
  { id: 4, rank: 4, forceA: "Opacity as Premium", forceB: "Transparency as Baseline",
    summary: "Traditional wealth management treated discretion as a luxury. A new generation treats opacity as a red flag. The premium signal has inverted.",
    evidence: [
      { text: "If you can\u2019t show me exactly what I\u2019m paying for, I\u2019m out.", source: "Reddit r/FIREUK", narrativeId: 3 },
      { text: "Transparency isn\u2019t a feature. It\u2019s the minimum.", source: "FT Alphaville", narrativeId: 3 },
      { text: "Discretion used to mean the bank didn\u2019t talk. Now it means they\u2019re hiding something.", source: "Edelman Trust Barometer", narrativeId: 3 },
    ],
    significance: "This is a cultural inversion happening in real time. What signalled premium (discretion, exclusivity, opacity) now signals suspicion for a growing segment.",
    categoryRelevance: "HSBC\u2019s wealth management proposition still carries some legacy opacity signals. The shift to transparency is both a risk and an opportunity to lead the category.",
    strategicQuestion: "Does radical transparency destroy the premium mystique \u2014 or create a new kind of premium?",
  },
  { id: 5, rank: 5, forceA: "Global Consistency", forceB: "Local Authenticity",
    summary: "Global banks promise consistency. Local trust demands specificity. The \u2018glocal\u2019 compromise satisfies neither \u2014 it reads as corporate in local markets and incoherent globally.",
    evidence: [
      { text: "I bank where my family has always banked. It\u2019s not about rates.", source: "IIFL Wealth", narrativeId: 7 },
      { text: "They sponsor our mosque\u2019s iftar every year. That\u2019s trust you can\u2019t buy.", source: "PwC MENA", narrativeId: 7 },
      { text: "HSBC says it\u2019s the world\u2019s local bank but it doesn\u2019t feel local anywhere.", source: "SCMP", narrativeId: 7 },
    ],
    significance: "This tension goes to the heart of global banking identity. Community-embedded trust is fundamentally local, but HSBC\u2019s scale advantage is fundamentally global.",
    categoryRelevance: "Directly relevant to HSBC\u2019s multi-market positioning across 7 markets with very different trust cultures. The CIB segment may resolve this differently from IWPB.",
    strategicQuestion: "Is global consistency the enemy of local trust \u2014 or can HSBC find trust expressions that are globally coherent but locally authentic?",
  },
];

const SAMPLE_PROVOCATIONS = [
  { id: 1, tensionId: 1, type: "Two Sides", title: "What if empowerment meant needing the bank less?", text: "If the only time clients describe feeling empowered is when they leave, perhaps genuine empowerment means helping clients outgrow your services \u2014 and trusting they\u2019ll come back for the next level.", evidence: "Empowerment Exit narrative \u2014 clients consistently describe self-directed platforms as liberating." },
  { id: 2, tensionId: 1, type: "Bold Claim", title: "When clients say they want \u2018control,\u2019 what are they actually asking to control?", text: "The empowerment discourse is saturated with control language. But control of what? Investments? Fees? The relationship itself? Unpacking this reveals whether empowerment is about financial capability or relational autonomy.", evidence: "Linguistic analysis across r/FIREUK and r/fatFIRE \u2014 \u2018control\u2019 appears 3x more often than \u2018growth\u2019 in trust contexts." },
  { id: 3, tensionId: 2, type: "Flip It", title: "Could heritage be reframed as proof of adaptability rather than proof of endurance?", text: "The heritage narrative currently says \u2018we\u2019ve survived.\u2019 But survival is passive. What if 150 years of history was evidence of radical reinvention \u2014 the trust credential becoming \u2018we\u2019ve changed more than anyone\u2019?", evidence: "Heritage Authority narrative \u2014 positive heritage references correlate with Asian markets; negative with UK/US digital-native segments." },
  { id: 4, tensionId: 3, type: "Future Scenario", title: "What if the most trusted banker in 2030 isn\u2019t a person?", text: "Algorithmic Trust is a frontier signal, but it\u2019s growing. The first institution to make AI-mediated advice feel personally trustworthy \u2014 warm, not cold \u2014 may redefine the category.", evidence: "Algorithmic Trust narrative \u2014 FT Alphaville and Reddit discourse on AI vs. human adviser trust." },
  { id: 5, tensionId: 4, type: "Language Playback", title: "Does showing everything make a premium bank feel less premium?", text: "Radical transparency is the emerging trust baseline. But premium positioning has historically relied on mystique and exclusivity. The provocation: can you be fully transparent and still feel aspirational?", evidence: "Transparency Imperative and Heritage Authority narratives \u2014 conflicting trust signals across segments." },
];

/* ─── API Prompts ─── */
const DISCOURSE_NARRATIVE_VOICE = `NARRATIVE VOICE: Write for a progressive, ambitious CMO who wants cultural insight that challenges their assumptions. Be sharp, evocative, and clear. Avoid academic language and jargon. Every sentence should make a busy executive lean in.

TONE RULES:
- NEVER use "it's not X, it's Y" constructions
- NEVER use dramatic absolutes like "where X goes to die"
- Write in natural paragraphs, not taxonomies
- End with a genuine strategic question

CULTURAL STRATEGY LENS: Read through Douglas Holt's cultural branding framework:
1. ORTHODOXY: What the category assumes is natural and true
2. CULTURAL CONTRADICTIONS: Where orthodoxy breaks against lived experience
3. OPPORTUNITY: Where a new cultural story is forming
Never use the terms "orthodoxy", "myth market", or "ideological opportunity" in the output.`;

function buildAxisPrompt(narratives, meta, userAngle) {
  const ns = narratives.map(n => `- ${n.name} (id:${n.id}, salience:${n.salience}%, x:${n.x}): ${n.description}`).join("\n");
  return `You are a discourse strategist for d+m. You have ${narratives.length} discourse narratives from the territory "${meta.territory}" for ${meta.client}.

THE NARRATIVES:
${ns}

THE STRATEGIST WANTS TO EXPLORE THIS ANGLE:
"${userAngle}"

Generate exactly ONE new y-axis for a 2\u00D72 strategic map.
The x-axis is always Dominant (0) \u2192 Emergent (1).

${DISCOURSE_NARRATIVE_VOICE}

Return ONLY a JSON object (no markdown, no fences):
{
  "id": "kebab-case-id",
  "name": "Top Pole \u2194 Bottom Pole",
  "topLabel": "Top Pole Name",
  "bottomLabel": "Bottom Pole Name",
  "rationale": "1-2 sentences",
  "quadrants": {
    "topLeft": { "label": "Name", "tagline": "Short descriptor" },
    "topRight": { "label": "Name", "tagline": "Short descriptor" },
    "bottomLeft": { "label": "Name", "tagline": "Short descriptor" },
    "bottomRight": { "label": "Name", "tagline": "Short descriptor" }
  },
  "yPositions": { ${narratives.map(n => `"${n.id}": 0.5`).join(", ")} },
  "narrative": {
    "headline": "One-line strategic headline",
    "summary": "3-5 paragraphs separated by \\n\\n",
    "keyTension": "Central strategic question"
  }
}

Position each narrative on the y-axis (0=top, 1=bottom). Be precise.`;
}

function buildProvocationPrompt(tensions, narratives, meta, userPrompt, selectedType) {
  const ts = tensions.map(t => `T${t.rank}: ${t.forceA} \u2194 ${t.forceB} \u2014 ${t.summary}`).join("\n");
  const typeInfo = selectedType && PROV_TYPES[selectedType];
  const typeBlock = typeInfo ? `\nPROVOCATION TYPE: ${selectedType}\nTYPE DEFINITION: ${typeInfo.definition}\n` : "";
  return `You are a discourse strategist for d+m. Generate a fieldwork provocation for ${meta.client}'s "${meta.territory}" territory.
${typeBlock}
TENSIONS:
${ts}

THE STRATEGIST ASKS:
"${userPrompt}"

${DISCOURSE_NARRATIVE_VOICE}

Return ONLY a JSON object (no markdown, no fences):
{
  "tensionId": <id of most relevant tension>,
  "type": "${selectedType || 'Tension Activator'}",
  "title": "A single-sentence question in the style of the requested type, grounded in corpus language",
  "text": "2-3 sentences expanding the provocation",
  "evidence": "Brief citation grounding it in the analysis"
}

The title MUST be a single-sentence question. Start from corpus language — use actual words and framings from the analysis, not abstracted labels.`;
}

function buildNarrativeDeepDivePrompt(narrative, allNarratives, tensions, meta) {
  const relatedNames = (narrative.relatedNarratives || [])
    .map(id => allNarratives.find(n => n.id === id)?.name).filter(Boolean).join(", ");
  const tensionsInvolved = tensions
    .filter(t => t.evidence?.some(ev => ev.narrativeId === narrative.id))
    .map(t => `${t.forceA} ↔ ${t.forceB}`).join("; ");
  const quotes = (narrative.quotes || []).slice(0, 2)
    .map(q => `"${String(q.text).slice(0, 120)}" [${q.market}]`).join("\n");
  const trunc = (s, n = 150) => String(s || "").slice(0, n);

  return `You are a senior cultural analyst at d+m. Write a 4-paragraph analytical deep-dive on the narrative "${narrative.name}" from "${trunc(meta.territory)}" for ${trunc(meta.client, 50)}.

Salience: ${narrative.salience}% | Markets: ${(narrative.markets || []).join(", ")}
Description: ${trunc(narrative.description, 200)}
Emotional register: ${narrative.emotionalRegister?.primary} + ${narrative.emotionalRegister?.secondary}
Metaphor: ${narrative.metaphorFamily?.primary} — ${(narrative.metaphorFamily?.examples || []).slice(0, 4).join(", ")}
Orthodoxy: ${trunc(narrative.culturalStrategy?.orthodoxy)}
Contradiction: ${trunc(narrative.culturalStrategy?.contradiction)}
Opportunity: ${trunc(narrative.culturalStrategy?.opportunity)}
Linguistic patterns: ${(narrative.linguisticPatterns || []).join("; ")}
Related: ${relatedNames || "none"} | In tensions: ${tensionsInvolved || "none"}
Key quotes:
${quotes}

${DISCOURSE_NARRATIVE_VOICE}

Write 4 paragraphs of genuine analytical interpretation — not a summary of the data above. Cover: what this narrative reveals about how people construct meaning; what the metaphor and emotional register tell us about the psychological work being done; where this narrative is heading; and the specific strategic implication for the client. British English. Flowing prose, no headers or bullets.`;
}

function buildQuadrantSynthesisPrompt(quadrantKey, quadrantNarratives, currentAxis, meta, tensions) {
  const qMeta = currentAxis?.quadrants?.[quadrantKey];
  const isDominant = quadrantKey === "topLeft" || quadrantKey === "bottomLeft";
  const isTop = quadrantKey === "topLeft" || quadrantKey === "topRight";
  const yPole = isTop ? currentAxis?.topLabel : currentAxis?.bottomLabel;
  const trunc = (s, n = 120) => String(s || "").slice(0, n);

  const narrativeSummaries = quadrantNarratives.map(n =>
    `- ${n.name} (${n.salience}%): ${trunc(n.description, 100)} | ${n.emotionalRegister?.primary} | ${n.metaphorFamily?.primary}`
  ).join("\n");

  const relevantTensions = tensions
    .filter(t => t.evidence?.some(ev => quadrantNarratives.find(n => n.id === ev.narrativeId)))
    .map(t => `${t.forceA} ↔ ${t.forceB}`).join("; ");

  return `You are a senior cultural analyst at d+m. Write a 3-4 paragraph strategic synthesis of the "${qMeta?.label || quadrantKey}" quadrant for ${trunc(meta.client, 50)}, territory "${trunc(meta.territory)}".

Position: ${isDominant ? "Dominant" : "Emergent"} × ${yPole} | Lens: ${currentAxis?.name || ""}
Strategic position: ${isDominant && isTop ? "cultural common sense, table stakes" : isDominant ? "established consensus, may be calcifying" : isTop ? "rising territory, first-mover advantage" : "frontier, highest potential, no settled view"}

Narratives (${quadrantNarratives.length}):
${narrativeSummaries}

Tensions through this quadrant: ${relevantTensions || "none"}

${DISCOURSE_NARRATIVE_VOICE}

Write 3-4 paragraphs: what shared cultural logic holds these narratives together; what the cluster reveals that no single narrative does; what the "${currentAxis?.name || "lens"}" illuminates about them as a group; and the specific strategic implication. British English. Flowing prose, no headers or bullets.`;
}

function buildRefinePrompt(currentAxis, narratives, meta, userPrompt) {
  const ns = narratives.map(n => `- ${n.name} (salience:${n.salience}%): ${n.description}`).join("\n");
  return `You are a discourse strategist for d+m. Rewrite the strategic narrative for ${meta.client}'s "${meta.territory}" territory through the lens "${currentAxis.name}".

CURRENT NARRATIVE:
Headline: ${currentAxis.narrative.headline}
Summary: ${currentAxis.narrative.summary}
Key tension: ${currentAxis.narrative.keyTension}

NARRATIVES:
${ns}

THE STRATEGIST ASKS:
"${userPrompt}"

${DISCOURSE_NARRATIVE_VOICE}

Return ONLY a JSON object (no markdown, no fences):
{
  "headline": "...",
  "summary": "3-5 paragraphs separated by \\n\\n",
  "keyTension": "..."
}`;
}

/* ─── Process step accordion item (used on onboarding screen) ─── */
function ProcessStepItem({ num, label, headline, detail, time }) {
  const [open, setOpen] = useState(false);
  const linkStyle = { color: DM.black, fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "2px" };
  const detailContent = detail === "link" ? (
    <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, margin: 0 }}>
      Start at the <a href={CLAUDE_PROJECT_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>Claude Project</a>. Drop your brief context into a new conversation and Claude will sharpen the territory question, build a source list, and generate copy-paste queries for the trawl.
    </p>
  ) : detail === "gen" ? (
    <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, margin: 0 }}>
      Run the queries in Perplexity and Gemini Deep Research. Then feed the material back into the <a href={CLAUDE_PROJECT_URL} target="_blank" rel="noopener noreferrer" style={linkStyle}>Claude Project</a> conversation. Claude analyses the corpus, maps narratives onto the 2{"\u00D7"}2, and outputs the Explorer JSON.
    </p>
  ) : (
    <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, margin: 0 }}>{detail}</p>
  );
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "12px 14px", border: "none", background: open ? "#FFFCEB" : DM.white, cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textAlign: "left", transition: "background 0.15s" }}
      >
        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "18px", color: DM.yellow, minWidth: "28px" }}>{num}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 600, color: DM.black }}>{label}</span>
            <span style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400 }}>{time}</span>
          </div>
          <div style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, marginTop: "2px" }}>{headline}</div>
        </div>
        <span style={{ fontSize: "12px", color: DM.grey400, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>{"\u25BE"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 14px 14px 54px", background: "#FFFCEB" }}>
          {detailContent}
        </div>
      )}
    </div>
  );
}

const CLAUDE_PROJECT_URL = "https://claude.ai/project/019c8610-28e8-7549-8d4b-a2b0870ef553";
const projectLink = (text) => ({ __isLink: true, text, url: CLAUDE_PROJECT_URL });

const PROCESS_STEPS = [
  { num: "01", label: "Define", headline: "Sharpen your territory question and build the search plan",
    detail: "link",
    time: "30\u201360 min" },
  { num: "02", label: "Generate", headline: "Trawl sources, feed material to Claude, produce the Explorer JSON",
    detail: "gen",
    time: "3\u20136 hrs (full) or 1\u20132 hrs (fast)" },
  { num: "03", label: "Explore", headline: "Upload your JSON and explore the discourse landscape",
    detail: "Upload the Explorer JSON above to see your narratives positioned on the interactive 2\u00D72 map. Choose from multiple strategic lenses, explore ranked tensions and fieldwork provocations, drag narratives to reposition them, edit any text inline, and generate new y-axis lenses with AI. The Explorer is both an analytical working surface and a presentation tool \u2014 use it to walk clients through the cultural story.",
    time: "Ongoing" },
];

/* ── Pure-JS PPTX builder (no external deps) ─────────
   PPTX = ZIP (store mode, no compression) + OOXML XML   */

const _crcT = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) { let c = i; for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1); t[i] = c; }
  return t;
})();
function _crc(buf) { let c = 0xFFFFFFFF; for (let i = 0; i < buf.length; i++) c = _crcT[(c ^ buf[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function _u32(n) { return [n & 0xFF, (n >> 8) & 0xFF, (n >> 16) & 0xFF, (n >> 24) & 0xFF]; }
function _u16(n) { return [n & 0xFF, (n >> 8) & 0xFF]; }

function _zip(files) {
  const enc = new TextEncoder(); const entries = []; let offset = 0; const chunks = [];
  for (const [name, content] of files) {
    const nb = enc.encode(name);
    const data = typeof content === "string" ? enc.encode(content) : content;
    const crc = _crc(data); const size = data.length;
    const lfh = new Uint8Array([0x50,0x4B,0x03,0x04,0x14,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,..._u32(crc),..._u32(size),..._u32(size),..._u16(nb.length),0x00,0x00,...nb]);
    entries.push({ nb, crc, size, offset }); chunks.push(lfh, data); offset += lfh.length + size;
  }
  const cdStart = offset;
  for (let i = 0; i < files.length; i++) {
    const { nb, crc, size, offset: lo } = entries[i];
    const cde = new Uint8Array([0x50,0x4B,0x01,0x02,0x14,0x00,0x14,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,..._u32(crc),..._u32(size),..._u32(size),..._u16(nb.length),0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,..._u32(lo),...nb]);
    chunks.push(cde); offset += cde.length;
  }
  const cdSize = offset - cdStart;
  chunks.push(new Uint8Array([0x50,0x4B,0x05,0x06,0x00,0x00,0x00,0x00,..._u16(files.length),..._u16(files.length),..._u32(cdSize),..._u32(cdStart),0x00,0x00]));
  const total = chunks.reduce((s,c) => s + c.length, 0); const out = new Uint8Array(total); let pos = 0;
  for (const c of chunks) { out.set(c, pos); pos += c.length; } return out;
}

const _E = 914400, _SW = 12192000, _SH = 6858000;
const _emu = (inches) => Math.round(inches * _E);
const _hx = (hex) => String(hex||"FFFFFF").replace(/^#/,"").replace(/[^0-9A-Fa-f]/g,"").slice(0,6).padEnd(6,"0");
let _sid = 100;

function _box(x, y, w, h, fill, bClr = null) {
  const id = _sid++;
  const fXml = fill ? `<a:solidFill><a:srgbClr val="${_hx(fill)}"/></a:solidFill>` : `<a:noFill/>`;
  const lXml = bClr ? `<a:ln w="12700"><a:solidFill><a:srgbClr val="${_hx(bClr)}"/></a:solidFill></a:ln>` : `<a:ln><a:noFill/></a:ln>`;
  return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="b${id}"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${_emu(x)}" y="${_emu(y)}"/><a:ext cx="${_emu(w)}" cy="${_emu(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom>${fXml}${lXml}</p:spPr><p:txBody><a:bodyPr/><a:lstStyle/><a:p/></p:txBody></p:sp>`;
}

function _txt(x, y, w, h, runs, opts = {}) {
  const id = _sid++;
  const { align = "l", valign = "t", bg = null, bClr = null } = opts;
  const fXml = bg ? `<a:solidFill><a:srgbClr val="${_hx(bg)}"/></a:solidFill>` : `<a:noFill/>`;
  const lXml = bClr ? `<a:ln w="12700"><a:solidFill><a:srgbClr val="${_hx(bClr)}"/></a:solidFill></a:ln>` : `<a:ln><a:noFill/></a:ln>`;
  const anch = valign === "c" ? "ctr" : valign === "b" ? "b" : "t";
  const algn = align === "center" ? "ctr" : align === "right" ? "r" : "l";
  const norm = typeof runs === "string" ? [{ t: runs }] : (Array.isArray(runs) ? runs : [{ t: String(runs) }]);
  const paras = []; let cur = [];
  for (const run of norm) {
    const lines = String(run.t || "").split("\n");
    for (let i = 0; i < lines.length; i++) {
      cur.push({ ...run, t: lines[i] });
      if (i < lines.length - 1) { paras.push(cur); cur = []; }
    }
  }
  if (cur.length) paras.push(cur);
  if (!paras.length) paras.push([{ t: "" }]);
  const pXml = paras.map(para =>
    `<a:p><a:pPr algn="${algn}"/>${para.map(r => {
      const { t = "", color = "111111", bold = false, italic = false, sz = 18, font = "Arial" } = r;
      const _xmlSafe = (s) => String(s).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\uFFFE\uFFFF]/g,"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\r/g,"");
      return `<a:r><a:rPr lang="en-GB" sz="${Math.round(sz*100)}" b="${bold?1:0}" i="${italic?1:0}" dirty="0"><a:solidFill><a:srgbClr val="${_hx(color)}"/></a:solidFill><a:latin typeface="${font}"/></a:rPr><a:t>${_xmlSafe(t)}</a:t></a:r>`;
    }).join("")}</a:p>`
  ).join("");
  return `<p:sp><p:nvSpPr><p:cNvPr id="${id}" name="t${id}"/><p:cNvSpPr txBox="1"><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm><a:off x="${_emu(x)}" y="${_emu(y)}"/><a:ext cx="${_emu(w)}" cy="${_emu(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom>${fXml}${lXml}</p:spPr><p:txBody><a:bodyPr wrap="square" anchor="${anch}"><a:normAutofit/></a:bodyPr><a:lstStyle/>${pXml}</p:txBody></p:sp>`;
}

function _pic(x, y, w, h, rId) {
  const id = _sid++;
  return `<p:pic><p:nvPicPr><p:cNvPr id="${id}" name="i${id}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr><p:blipFill><a:blip r:embed="${rId}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill><p:spPr><a:xfrm><a:off x="${_emu(x)}" y="${_emu(y)}"/><a:ext cx="${_emu(w)}" cy="${_emu(h)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr></p:pic>`;
}

function _sld(bg, shapes, imgRels = []) {
  const bgXml = bg ? `<p:bg><p:bgPr><a:solidFill><a:srgbClr val="${_hx(bg)}"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>` : "";
  const relEntries = imgRels.map((tgt, i) => `<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${tgt}"/>`).join("");
  return {
    xml: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:cSld>${bgXml}<p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${_SW}" cy="${_SH}"/><a:chOff x="0" y="0"/><a:chExt cx="${_SW}" cy="${_SH}"/></a:xfrm></p:grpSpPr>${shapes.filter(Boolean).join("")}</p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`,
    rels: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId999" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>${relEntries}</Relationships>`
  };
}

const _CT = (n) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/><Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/><Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/><Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/><Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/><Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/><Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>${Array.from({length:n},(_,i)=>`<Override PartName="/ppt/slides/slide${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join("")}</Types>`;
const _RELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>`;
const _PRES = (n) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentation xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst><p:sldIdLst>${Array.from({length:n},(_,i)=>`<p:sldId id="${256+i}" r:id="rId${i+2}"/>`).join("")}</p:sldIdLst><p:sldSz cx="12192000" cy="6858000" type="screen16x9"/><p:notesSz cx="6858000" cy="9144000"/></p:presentation>`;
const _PRESRELS = (n) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/><Relationship Id="rId200" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/><Relationship Id="rId201" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/><Relationship Id="rId202" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/>${Array.from({length:n},(_,i)=>`<Relationship Id="rId${i+2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i+1}.xml"/>`).join("")}</Relationships>`;
const _PROPFILES = [`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:presentationPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>`,`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:viewPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>`,`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`];
const _MASTER = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/><a:chOff x="0" y="0"/><a:chExt cx="12192000" cy="6858000"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle><a:lvl1pPr><a:defRPr lang="en-GB"/></a:lvl1pPr></p:titleStyle><p:bodyStyle><a:lvl1pPr><a:defRPr lang="en-GB"/></a:lvl1pPr></p:bodyStyle><p:otherStyle><a:lvl1pPr><a:defRPr lang="en-GB"/></a:lvl1pPr></p:otherStyle></p:txStyles></p:sldMaster>`;
const _MASTERRELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`;
const _LAYOUT = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="12192000" cy="6858000"/><a:chOff x="0" y="0"/><a:chExt cx="12192000" cy="6858000"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld></p:sldLayout>`;
const _LAYOUTRELS = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`;
const _THEME = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr lastClr="000000" val="windowText"/></a:dk1><a:lt1><a:sysClr lastClr="FFFFFF" val="window"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A9D18E"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5A96CE"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light"/></a:majorFont><a:minorFont><a:latin typeface="Calibri"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="12700"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln><a:ln w="19050"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements></a:theme>`;

/* ════════════════════════════════════════════════════ */
function DiscourseExplorer() {
  const [phase, setPhase] = useState("onboarding");
  const [activeView, setActiveView] = useState("map");

  const [meta, setMeta] = useState(null);
  const [allNarratives, setAllNarratives] = useState([]);
  const [allAxes, setAllAxes] = useState([]);
  const [allTensions, setAllTensions] = useState([]);
  const [allProvocations, setAllProvocations] = useState([]);
  const [allSources, setAllSources] = useState([]);
  const [isDemo, setIsDemo] = useState(false);

  const [selectedAxisId, setSelectedAxisId] = useState(null);
  const [selectedNarrative, setSelectedNarrative] = useState(null);
  const [narratives, setNarratives] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [hoveredNarrative, setHoveredNarrative] = useState(null);
  const [selectedQuadrant, setSelectedQuadrant] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const [newAngle, setNewAngle] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  const [editingField, setEditingField] = useState(null);
  const [refinePrompt, setRefinePrompt] = useState("");
  const [refining, setRefining] = useState(false);
  const [refineError, setRefineError] = useState("");

  const [provPrompt, setProvPrompt] = useState("");
  const [provGenerating, setProvGenerating] = useState(false);
  const [provError, setProvError] = useState("");
  const [selectedProvType, setSelectedProvType] = useState(null);
  const [hoveredProvType, setHoveredProvType] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [typePickerOpenId, setTypePickerOpenId] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [dragItemType, setDragItemType] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [showGaps, setShowGaps] = useState(false);
  const [expandedTension, setExpandedTension] = useState(null);
  const [expandedPassageId, setExpandedPassageId] = useState(null); // source id whose passage is open in narrative panel

  // Deep-dive: cache by narrative id, quadrant synthesis: cache by quadrantKey+axisId
  const [deepDiveCache, setDeepDiveCache] = useState({});
  const [deepDiveLoading, setDeepDiveLoading] = useState(null); // narrative id being generated
  const [quadrantSynthCache, setQuadrantSynthCache] = useState({});
  const [quadrantSynthLoading, setQuadrantSynthLoading] = useState(null); // quadrantKey being generated

  const [showExport, setShowExport] = useState(false);
  const [exportTensions, setExportTensions] = useState(new Set());
  const [exportProvocations, setExportProvocations] = useState(new Set());
  const [exportNarrative, setExportNarrative] = useState(true);
  const [exportSources, setExportSources] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [pptxLoaded, setPptxLoaded] = useState(false);

  const mapRef = useRef(null);
  const fileRef = useRef(null);

  // Pure-JS PPTX builder needs no external loading — always ready
  useEffect(() => { setPptxLoaded(true); }, []);

  const currentAxis = useMemo(() => allAxes.find(a => a.id === selectedAxisId) || null, [allAxes, selectedAxisId]);
  const getQ = (x, y) => { if (x < 0.5 && y < 0.5) return "topLeft"; if (x >= 0.5 && y < 0.5) return "topRight"; if (x < 0.5 && y >= 0.5) return "bottomLeft"; return "bottomRight"; };
  const qMeta = useCallback((key) => currentAxis?.quadrants?.[key] || { label: "", tagline: "" }, [currentAxis]);

  const loadData = useCallback((data, demo = false) => {
    setMeta(data.meta || SAMPLE_META);
    setAllNarratives(data.narratives || SAMPLE_NARRATIVES);
    setAllAxes(data.axes || SAMPLE_AXES);
    setAllTensions(data.tensions || SAMPLE_TENSIONS);
    setAllProvocations(data.provocations || SAMPLE_PROVOCATIONS);
    setAllSources(data.sources || SAMPLE_SOURCES);
    setIsDemo(demo);
    setSelectedAxisId(null);
    setSelectedNarrative(null);
    setPhase("frame");
  }, []);

  const loadDemo = useCallback(() => loadData({}, true), [loadData]);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.narratives || !data.axes) { setUploadError("Invalid file: missing narratives or axes."); return; }
        loadData(data, false);
      } catch (err) { setUploadError("Failed to parse JSON: " + err.message); }
    };
    reader.readAsText(file);
  }, [loadData]);

  const resetAll = useCallback(() => {
    setPhase("onboarding"); setMeta(null); setAllNarratives([]); setAllAxes([]); setAllTensions([]);
    setAllProvocations([]); setAllSources([]); setIsDemo(false); setSelectedAxisId(null);
    setSelectedNarrative(null); setNarratives([]); setActiveView("map");
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  const applyAxis = useCallback((id) => {
    const ax = allAxes.find(a => a.id === id); if (!ax) return;
    setSelectedAxisId(id);
    setNarratives(allNarratives.map(n => ({ ...n, y: ax.yPositions[n.id] ?? 0.5 })));
    setSelectedNarrative(null); setPhase("explorer"); setActiveView("map");
  }, [allAxes, allNarratives]);

  // Generate axis
  const generateAxis = useCallback(async () => {
    if (!newAngle.trim() || generating) return;
    setGenerating(true); setGenError("");
    try {
      const prompt = buildAxisPrompt(allNarratives, meta, newAngle.trim());
      const res = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }),
      });
      const result = await res.json();
      const text = result.content?.map(b => b.text || "").join("") || "";
      const axis = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (!axis.id || !axis.yPositions || !axis.quadrants || !axis.narrative) throw new Error("Missing required fields");
      axis._custom = true;
      setAllAxes(prev => [...prev, axis]);
      setNewAngle("");
    } catch (err) { setGenError("Failed: " + err.message); }
    setGenerating(false);
  }, [newAngle, generating, allNarratives, meta]);

  // Generate provocation
  const generateProvocation = useCallback(async () => {
    if (!provPrompt.trim() || provGenerating || !selectedProvType) return;
    setProvGenerating(true); setProvError("");
    try {
      const prompt = buildProvocationPrompt(allTensions, allNarratives, meta, provPrompt.trim(), selectedProvType);
      const res = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const result = await res.json();
      const text = result.content?.map(b => b.text || "").join("") || "";
      const prov = JSON.parse(text.replace(/```json|```/g, "").trim());
      prov.id = Math.max(0, ...allProvocations.map(p => p.id)) + 1;
      prov._generated = true;
      if (!prov.type) prov.type = selectedProvType;
      setAllProvocations(prev => [...prev, prov]);
      setProvPrompt("");
      // selectedProvType stays selected so researcher can generate another of same type immediately
    } catch (err) { setProvError("Failed: " + err.message); }
    setProvGenerating(false);
  }, [provPrompt, provGenerating, selectedProvType, allTensions, allNarratives, meta, allProvocations]);

  // Generate narrative deep-dive
  const generateNarrativeDeepDive = useCallback(async (narrative) => {
    const cacheKey = narrative.id;
    if (deepDiveCache[cacheKey] || deepDiveLoading) return;
    setDeepDiveLoading(cacheKey);
    try {
      const prompt = buildNarrativeDeepDivePrompt(narrative, allNarratives, allTensions, meta);
      const body = JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] });
      console.log("[DeepDive] prompt length:", prompt.length, "body length:", body.length);
      const res = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" }, body,
      });
      console.log("[DeepDive] response status:", res.status);
      const raw = await res.text();
      console.log("[DeepDive] raw response (first 200):", raw.slice(0, 200));
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const result = JSON.parse(raw);
      const text = result.content?.map(b => b.text || "").join("") || "";
      if (!text) throw new Error("Empty response");
      setDeepDiveCache(prev => ({ ...prev, [cacheKey]: text }));
    } catch (err) {
      console.error("[DeepDive] error:", err);
      setDeepDiveCache(prev => ({ ...prev, [cacheKey]: `Error: ${err.message}` }));
    }
    setDeepDiveLoading(null);
  }, [deepDiveCache, deepDiveLoading, allNarratives, allTensions, meta]);

  // Generate quadrant synthesis
  const generateQuadrantSynthesis = useCallback(async (quadrantKey, quadrantNarratives) => {
    const cacheKey = `${quadrantKey}__${selectedAxisId}`;
    if (quadrantSynthCache[cacheKey] || quadrantSynthLoading) return;
    setQuadrantSynthLoading(quadrantKey);
    try {
      const prompt = buildQuadrantSynthesisPrompt(quadrantKey, quadrantNarratives, currentAxis, meta, allTensions);
      const body = JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] });
      console.log("[QuadSynth] prompt length:", prompt.length, "body length:", body.length);
      const res = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" }, body,
      });
      console.log("[QuadSynth] response status:", res.status);
      const raw = await res.text();
      console.log("[QuadSynth] raw response (first 200):", raw.slice(0, 200));
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const result = JSON.parse(raw);
      const text = result.content?.map(b => b.text || "").join("") || "";
      if (!text) throw new Error("Empty response");
      setQuadrantSynthCache(prev => ({ ...prev, [cacheKey]: text }));
    } catch (err) {
      console.error("[QuadSynth] error:", err);
      setQuadrantSynthCache(prev => ({ ...prev, [cacheKey]: `Error: ${err.message}` }));
    }
    setQuadrantSynthLoading(null);
  }, [quadrantSynthCache, quadrantSynthLoading, currentAxis, selectedAxisId, meta, allTensions]);

  // Canvas map renderer for PPT export
  const renderMapToCanvas = useCallback(() => {
    const size = 900;
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "#EEEEEE"; ctx.lineWidth = 1;
    [0.25, 0.75].forEach(p => {
      ctx.beginPath(); ctx.moveTo(p * size, 0); ctx.lineTo(p * size, size); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, p * size); ctx.lineTo(size, p * size); ctx.stroke();
    });
    ctx.strokeStyle = "#CCCCCC"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(size / 2, 0); ctx.lineTo(size / 2, size); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, size / 2); ctx.lineTo(size, size / 2); ctx.stroke();
    ctx.strokeStyle = "#DDDDDD"; ctx.lineWidth = 1; ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
    const ax = currentAxis;
    const qColorMap = { topLeft: "#0A3A75", topRight: "#2A8C51", bottomLeft: "#999999", bottomRight: "#EB573F" };
    const drawPill = (text, cx, cy) => {
      ctx.font = 'bold 13px "Arial Black", Arial, sans-serif';
      const tw = ctx.measureText(text).width;
      const pw = tw + 24, ph = 22;
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.beginPath(); ctx.roundRect(cx - pw / 2, cy - ph / 2, pw, ph, 4); ctx.fill();
      ctx.strokeStyle = "#DDDDDD"; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = "#1A1A1A"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(text, cx, cy);
    };
    if (ax && ax.topLabel) drawPill(ax.topLabel.toUpperCase(), size / 2, 22);
    if (ax && ax.bottomLabel) drawPill(ax.bottomLabel.toUpperCase(), size / 2, size - 22);
    const drawRotatedLabel = (text, x, y, angle) => {
      ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
      ctx.font = "bold 11px Arial, sans-serif";
      const tw = ctx.measureText(text).width + 16;
      ctx.fillStyle = "rgba(247,247,247,0.95)"; ctx.fillRect(-tw / 2, -10, tw, 20);
      ctx.strokeStyle = "#CCCCCC"; ctx.lineWidth = 1; ctx.strokeRect(-tw / 2, -10, tw, 20);
      ctx.fillStyle = "#444444"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(text, 0, 0); ctx.restore();
    };
    drawRotatedLabel("\u2190 DOMINANT", 22, size / 2, -Math.PI / 2);
    drawRotatedLabel("EMERGENT \u2192", size - 22, size / 2, Math.PI / 2);
    const quadrantPositions = [
      { key: "topLeft", x: 44, y: 44, align: "left" }, { key: "topRight", x: size - 44, y: 44, align: "right" },
      { key: "bottomLeft", x: 44, y: size - 44, align: "left" }, { key: "bottomRight", x: size - 44, y: size - 44, align: "right" },
    ];
    quadrantPositions.forEach(({ key, x, y, align }) => {
      const qm = (ax && ax.quadrants && ax.quadrants[key]) || {};
      const col = qColorMap[key];
      ctx.font = 'bold 11px "Arial", sans-serif'; ctx.fillStyle = col + "CC"; ctx.textAlign = align; ctx.textBaseline = "top";
      ctx.fillText((qm.label || "").toUpperCase(), x, y);
      ctx.font = "9px Arial, sans-serif"; ctx.fillStyle = col + "88";
      ctx.fillText(qm.tagline || "", x, y + 16);
    });
    narratives.forEach(n => {
      if (n.y == null) return;
      const cx = n.x * size, cy = n.y * size;
      const r = Math.max(22, Math.min(46, n.salience * 0.5));
      const col = qColorMap[getQ(n.x, n.y)];
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = col + "28"; ctx.fill();
      ctx.strokeStyle = col + "88"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.font = "bold " + (r > 30 ? 11 : 9) + "px Arial, sans-serif";
      ctx.fillStyle = "#333333"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(n.salience + "%", cx, cy);
      ctx.font = (r > 30 ? 10 : 9) + "px Arial, sans-serif";
      ctx.fillStyle = "#1A1A1A"; ctx.textBaseline = "top";
      ctx.fillText(n.name, cx, cy + r + 5);
    });
    return canvas.toDataURL("image/png", 0.95);
  }, [narratives, currentAxis, getQ]);

  // Resolve a source ID to a display string (title + author)
  const resolveSource = useCallback((id) => {
    if (id === null || id === undefined || id === "") return "";
    const s = (allSources || []).find(s => String(s.id) === String(id));
    if (!s) return String(id);
    if (s.title && s.author) return s.title + " \u2014 " + s.author;
    return s.title || s.author || String(id);
  }, [allSources]);

  // PPT generation — PptxGenJS (battle-tested OOXML, no corruption)
  const generatePPT = useCallback(async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const pres = new PptxGenJS();
      pres.layout = "LAYOUT_16x9"; // 10 x 7.5 inches
      const W = 10, H = 7.5;
      const territory = (meta && meta.territory) || "Discourse Analysis";
      const noLine = { type: "none" };
      const ft = (slide) => slide.addText("d+m \u00B7 Cultural Discourse Analysis \u00B7 Confidential", {
        x: 0.25, y: H - 0.22, w: W - 0.5, h: 0.18,
        color: "AAAAAA", fontSize: 8, fontFace: "Poppins", align: "left"
      });

      // ── Cover
      {
        const slide = pres.addSlide();
        slide.background = { color: "111111" };
        slide.addShape("rect", { x: 0, y: H - 0.55, w: W, h: 0.55, fill: { color: "FFD900" }, line: noLine });
        slide.addText("d+m", { x: 0.3, y: H - 0.53, w: 1.5, h: 0.45, color: "111111", fontSize: 18, bold: true, fontFace: "Anton", valign: "middle" });
        slide.addText("Cultural Discourse Analysis", { x: 0.3, y: 0.4, w: 7, h: 0.32, color: "FFD900", fontSize: 11, fontFace: "Poppins" });
        slide.addText(territory, { x: 0.3, y: 0.85, w: 8.5, h: 3.0, color: "FFFFFF", fontSize: 36, bold: true, fontFace: "Anton", autoFit: true, wrap: true });
        if (meta && meta.client) slide.addText(meta.client, { x: 0.3, y: 4.1, w: 6, h: 0.42, color: "999999", fontSize: 15, fontFace: "Poppins" });
        if (meta && meta.timeScope) slide.addText(meta.timeScope, { x: 0.3, y: 4.62, w: 6, h: 0.32, color: "555555", fontSize: 11, fontFace: "Courier New" });
      }

      // ── Map
      const mapDataUrl = renderMapToCanvas();
      {
        const slide = pres.addSlide();
        slide.background = { color: "FFFFFF" };
        slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.42, fill: { color: "111111" }, line: noLine });
        slide.addText(territory, { x: 0.25, y: 0, w: 5.5, h: 0.42, color: "FFFFFF", fontSize: 12, bold: true, fontFace: "Anton", valign: "middle" });
        slide.addText("Discourse Landscape Map", { x: 5.5, y: 0, w: 4.25, h: 0.42, color: "FFD900", fontSize: 9, fontFace: "Poppins", align: "right", valign: "middle" });
        if (mapDataUrl) slide.addImage({ data: mapDataUrl, x: 0.2, y: 0.52, w: 4.8, h: 4.8 });
        const quadHex = { topLeft: "0A3A75", topRight: "2A8C51", bottomLeft: "888888", bottomRight: "EB573F" };
        const quadLight = { topLeft: "E8EEF7", topRight: "E8F4ED", bottomLeft: "F0F0F0", bottomRight: "FDF0EE" };
        [["topLeft",5.25,0.52],["topRight",7.6,0.52],["bottomLeft",5.25,2.22],["bottomRight",7.6,2.22]].forEach(([qk,bx,by]) => {
          const qm = qMeta(qk);
          slide.addShape("rect", { x: bx, y: by, w: 2.25, h: 1.6, fill: { color: quadLight[qk] }, line: { color: quadHex[qk], width: 1 } });
          slide.addShape("rect", { x: bx, y: by, w: 0.06, h: 1.6, fill: { color: quadHex[qk] }, line: noLine });
          if (qm.label) slide.addText(qm.label, { x: bx+0.12, y: by+0.1, w: 2.05, h: 0.32, color: quadHex[qk], fontSize: 9, bold: true, fontFace: "Anton" });
          if (qm.tagline) slide.addText(qm.tagline, { x: bx+0.12, y: by+0.44, w: 2.05, h: 0.9, color: "555555", fontSize: 8, fontFace: "Poppins", wrap: true });
        });
        ft(slide);
      }

      // ── Tension slides
      for (const tid of exportTensions) {
        const t = allTensions.find(t2 => t2.id === tid); if (!t) continue;
        const slide = pres.addSlide();
        slide.background = { color: "FFFFFF" };
        slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.42, fill: { color: "111111" }, line: noLine });
        slide.addText("Tension " + String(t.rank).padStart(2,"0"), { x: 0.25, y: 0, w: 2.5, h: 0.42, color: "DB2B39", fontSize: 11, fontFace: "Courier New", valign: "middle" });
        slide.addText(territory, { x: 2.5, y: 0, w: 7.25, h: 0.42, color: "666666", fontSize: 8, fontFace: "Poppins", align: "right", valign: "middle" });
        if (t.forceA) slide.addText(t.forceA, { x: 0.25, y: 0.55, w: 3.8, h: 0.8, color: "111111", fontSize: 20, bold: true, fontFace: "Anton", autoFit: true, wrap: true });
        slide.addText("\u2194", { x: 4.15, y: 0.55, w: 0.7, h: 0.8, color: "DB2B39", fontSize: 28, bold: true, fontFace: "Anton", align: "center", valign: "middle" });
        if (t.forceB) slide.addText(t.forceB, { x: 4.95, y: 0.55, w: 3.8, h: 0.8, color: "111111", fontSize: 20, bold: true, fontFace: "Anton", autoFit: true, wrap: true });
        if (t.summary) slide.addText(t.summary, { x: 0.25, y: 1.48, w: 9.5, h: 0.52, color: "555555", fontSize: 11, fontFace: "Poppins", wrap: true });
        if (t.significance) {
          slide.addText("SIGNIFICANCE", { x: 0.25, y: 2.1, w: 4.5, h: 0.2, color: "999999", fontSize: 7, bold: true, fontFace: "Poppins" });
          slide.addText(t.significance, { x: 0.25, y: 2.32, w: 4.5, h: 1.25, color: "555555", fontSize: 10, fontFace: "Poppins", wrap: true });
        }
        if (t.strategicQuestion) {
          slide.addShape("rect", { x: 5.1, y: 2.06, w: 4.65, h: 1.75, fill: { color: "FFF9DB" }, line: { color: "DB2B39", width: 1 } });
          slide.addText("STRATEGIC QUESTION", { x: 5.28, y: 2.18, w: 4.2, h: 0.22, color: "DB2B39", fontSize: 8, bold: true, fontFace: "Poppins" });
          slide.addText(t.strategicQuestion, { x: 5.28, y: 2.43, w: 4.2, h: 1.2, color: "333333", fontSize: 10, italic: true, fontFace: "Poppins", wrap: true });
        }
        if (t.evidence && t.evidence.length > 0) {
          const ev = t.evidence[0];
          slide.addShape("rect", { x: 0.25, y: 3.95, w: 9.5, h: 0.8, fill: { color: "F7F7F7" }, line: { color: "DDDDDD", width: 1 } });
          slide.addText("\u201C"+(ev.text||"")+"\u201D", { x: 0.38, y: 3.98, w: 9.25, h: 0.65, color: "333333", fontSize: 10, italic: true, fontFace: "Poppins", wrap: true });
          if (ev.source) slide.addText(resolveSource(ev.source), { x: 0.42, y: 4.78, w: 7, h: 0.2, color: "999999", fontSize: 8, fontFace: "Poppins" });
        }
        ft(slide);
      }

      // ── Provocations divider
      const selectedProvs = allProvocations.filter(p => exportProvocations.has(p.id));
      if (selectedProvs.length > 0) {
        {
          const slide = pres.addSlide();
          slide.background = { color: "0A3A75" };
          slide.addText("Provocations for Fieldwork", { x: 0.5, y: 2.5, w: W-1, h: 1.0, color: "FFFFFF", fontSize: 32, bold: true, fontFace: "Anton", align: "center", valign: "middle" });
          slide.addText(selectedProvs.length+" selected for primary research", { x: 0.5, y: 3.6, w: W-1, h: 0.4, color: "FFD900", fontSize: 13, fontFace: "Poppins", align: "center" });
        }
        for (const p of selectedProvs) {
          const tension = allTensions.find(t => t.id === p.tensionId);
          const slide = pres.addSlide();
          slide.background = { color: "FFFFFF" };
          slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.07, fill: { color: "FFD900" }, line: noLine });
          if (tension) slide.addText("T"+tension.rank+" \u00B7 "+tension.forceA+" \u2194 "+tension.forceB, { x: 0.25, y: 0.14, w: 9.5, h: 0.26, color: "999999", fontSize: 8, fontFace: "Courier New" });
          if (p.title) slide.addText(p.title, { x: 0.25, y: 0.5, w: 9.5, h: 2.8, color: "111111", fontSize: 26, bold: true, fontFace: "Anton", valign: "middle", wrap: true, autoFit: true });
          if (p.text) slide.addText(p.text, { x: 0.25, y: 3.45, w: 9.5, h: 1.1, color: "555555", fontSize: 11, fontFace: "Poppins", wrap: true });
          if (p.evidence) {
            slide.addShape("rect", { x: 0.25, y: 4.65, w: 9.5, h: 0.52, fill: { color: "F7F7F7" }, line: { color: "DDDDDD", width: 1 } });
            slide.addText("Evidence: "+p.evidence, { x: 0.35, y: 4.68, w: 9.3, h: 0.44, color: "777777", fontSize: 9, italic: true, fontFace: "Poppins", wrap: true });
          }
          ft(slide);
        }
      }

      // ── Strategic Narrative
      if (exportNarrative && currentAxis && currentAxis.narrative) {
        const narr = currentAxis.narrative;
        const paras = (narr.summary||"").split("\n\n").slice(0,3);
        const slide = pres.addSlide();
        slide.background = { color: "FFFFFF" };
        slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.42, fill: { color: "111111" }, line: noLine });
        slide.addText("Strategic Narrative", { x: 0.25, y: 0, w: 4.5, h: 0.42, color: "FFD900", fontSize: 12, bold: true, fontFace: "Anton", valign: "middle" });
        slide.addText("Lens: "+(currentAxis.name||""), { x: 4.5, y: 0, w: 5.25, h: 0.42, color: "666666", fontSize: 8, fontFace: "Courier New", align: "right", valign: "middle" });
        if (narr.headline) slide.addText(narr.headline, { x: 0.25, y: 0.55, w: 9.5, h: 1.35, color: "111111", fontSize: 22, bold: true, fontFace: "Anton", wrap: true, autoFit: true });
        paras.forEach((para, i) => {
          if (para) slide.addText(para, { x: 0.25, y: 2.05+i*1.0, w: 5.9, h: 0.9, color: "444444", fontSize: 10, fontFace: "Poppins", wrap: true });
        });
        if (narr.keyTension) {
          slide.addShape("rect", { x: 6.45, y: 0.55, w: 3.3, h: 3.6, fill: { color: "FFF9DB" }, line: { color: "FFD900", width: 2 } });
          slide.addText("KEY TENSION", { x: 6.62, y: 0.68, w: 2.9, h: 0.22, color: "999999", fontSize: 7, bold: true, fontFace: "Poppins" });
          slide.addText(narr.keyTension, { x: 6.62, y: 0.95, w: 2.9, h: 3.0, color: "333333", fontSize: 10, italic: true, fontFace: "Poppins", wrap: true });
        }
        ft(slide);
      }

      // ── Sources
      if (exportSources && allSources && allSources.length > 0) {
        const typeColors = { News:"0A3A75", Opinion:"2A8C51", Academic:"EB573F", Social:"DB2B39", Cultural:"7B4FBF", Category:"E8830A" };
        const grouped = {};
        allSources.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });
        const slide = pres.addSlide();
        slide.background = { color: "FFFFFF" };
        slide.addShape("rect", { x: 0, y: 0, w: W, h: 0.42, fill: { color: "111111" }, line: noLine });
        slide.addText("Corpus Registry", { x: 0.25, y: 0, w: 5, h: 0.42, color: "FFFFFF", fontSize: 12, bold: true, fontFace: "Anton", valign: "middle" });
        slide.addText(allSources.length+" sources", { x: 5, y: 0, w: 4.75, h: 0.42, color: "FFD900", fontSize: 9, fontFace: "Courier New", align: "right", valign: "middle" });
        let col = 0, row = 0;
        const colW = 4.5, startY = 0.58, rowH = 0.25;
        for (const [type, srcs] of Object.entries(grouped)) {
          const x = 0.25+col*(colW+0.5), y = startY+row*rowH;
          if (y > 7.1) break;
          const hxc = typeColors[type]||"555555";
          slide.addText(type.toUpperCase(), { x, y, w: 1.2, h: 0.22, color: hxc, fontSize: 7, bold: true, fontFace: "Poppins" });
          srcs.forEach((s, si) => {
            const sy = y+(si+0.85)*rowH; if (sy > 7.1) return;
            const lbl = (s.title||"").slice(0,55)+((s.title||"").length>55?"\u2026":"")+(s.author?" \u2014 "+s.author:"");
            slide.addText(lbl, { x: x+0.05, y: sy, w: colW-0.1, h: rowH-0.02, color: "444444", fontSize: 7, fontFace: "Poppins" });
          });
          row += srcs.length+1.2; if (startY+row*rowH > 6.8) { row = 0; col++; }
        }
        ft(slide);
      }

      // ── Write file
      const blob = await pres.write("blob");
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = ((meta && meta.client)||"discourse").replace(/\s+/g,"_")+"_landscape_export.pptx";
      document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch (err) { console.error("PPT export error:", err); alert("Export failed: " + err.message); }
    setExporting(false); setShowExport(false);
  }, [exporting, meta, allTensions, allProvocations, exportTensions, exportProvocations, exportNarrative, exportSources, allSources, narratives, currentAxis, qMeta, renderMapToCanvas, resolveSource]);

  const generateHTML = useCallback(() => {
    if (!meta) return;
    const esc = (s) => String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
    const territory = meta.territory || "Discourse Analysis";
    const selectedTensions = allTensions.filter(t => exportTensions.has(t.id));
    const selectedProvs = allProvocations.filter(p => exportProvocations.has(p.id));
    const narr = exportNarrative && currentAxis && currentAxis.narrative ? currentAxis.narrative : null;

    const slide = (bg, content) => `<section style="background:${bg};padding:60px 70px;min-height:540px;display:flex;flex-direction:column;justify-content:center;page-break-after:always;margin-bottom:32px;border-radius:4px;box-shadow:0 2px 12px rgba(0,0,0,0.12);">${content}</section>`;
    const bar = (content) => `<div style="background:#111;color:#fff;padding:12px 70px;margin:-60px -70px 40px;border-radius:4px 4px 0 0;">${content}</div>`;
    const label = (t,c="999") => `<p style="font-family:monospace;font-size:11px;color:#${c};letter-spacing:.08em;margin:0 0 6px;">${esc(t)}</p>`;
    const foot = `<p style="font-family:monospace;font-size:10px;color:#aaa;margin-top:auto;padding-top:24px;">d+m · Cultural Discourse Analysis · Confidential</p>`;

    let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${esc(territory)}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet"><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Poppins',Arial,sans-serif;background:#e8e8e8;padding:32px;}h1,h2,h3{font-family:'Anton','Arial Black',Arial,sans-serif;font-weight:400;}@media print{body{background:#fff;padding:0;}section{box-shadow:none!important;border-radius:0!important;margin-bottom:0!important;}}</style></head><body>`;

    // Cover
    html += slide("#111", `
      <div style="background:#FFD900;height:4px;width:60px;margin-bottom:20px;"></div>
      ${label("Cultural Discourse Analysis","FFD900")}
      <h1 style="font-size:48px;color:#fff;line-height:1.1;margin-bottom:24px;">${esc(territory)}</h1>
      ${meta.client ? `<p style="font-size:18px;color:#999;">${esc(meta.client)}</p>` : ""}
      ${meta.timeScope ? `<p style="font-family:monospace;font-size:13px;color:#555;margin-top:8px;">${esc(meta.timeScope)}</p>` : ""}
      ${foot}
    `);

    // Map — quadrant summary
    if (currentAxis) {
      const quads = [["topLeft","#0A3A75"],["topRight","#2A8C51"],["bottomLeft","#999"],["bottomRight","#EB573F"]];
      const qGrid = quads.map(([k,c]) => {
        const q = currentAxis.quadrants?.[k]||{}; return `<div style="border-left:4px solid ${c};padding:12px 16px;background:#fafafa;"><p style="font-size:12px;font-weight:700;color:${c};font-family:'Arial Black',Arial;">${esc(q.label||"")}</p><p style="font-size:11px;color:#555;margin-top:4px;">${esc(q.tagline||"")}</p></div>`;
      }).join("");
      html += slide("#fff", `
        ${bar(`<span style="font-size:13px;font-weight:700;">${esc(territory)}</span><span style="float:right;color:#FFD900;font-size:11px;">Discourse Landscape Map</span>`)}
        <p style="font-size:12px;color:#999;margin-bottom:16px;font-family:monospace;">Lens: ${esc(currentAxis.name||"")}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px;">${qGrid}</div>
        <div style="margin-top:8px;">${narr ? `<p style="font-size:16px;font-family:'Arial Black',Arial;color:#111;margin-bottom:10px;">${esc(narr.headline||"")}</p>` : ""}
        <p style="font-size:12px;color:#666;font-style:italic;">Open the Discourse Explorer to view the interactive 2×2 map.</p></div>
        ${foot}
      `);
    }

    // Tensions
    for (const t of selectedTensions) {
      const ev = t.evidence&&t.evidence[0];
      html += slide("#fff", `
        ${bar(`<span style="color:#DB2B39;font-family:monospace;">Tension ${String(t.rank).padStart(2,"0")}</span><span style="float:right;font-size:11px;color:#666;">${esc(territory)}</span>`)}
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
          <h2 style="font-size:22px;color:#111;flex:1;">${esc(t.forceA||"")}</h2>
          <span style="font-size:28px;color:#DB2B39;flex-shrink:0;">↔</span>
          <h2 style="font-size:22px;color:#111;flex:1;">${esc(t.forceB||"")}</h2>
        </div>
        <p style="font-size:13px;color:#555;margin-bottom:20px;">${esc(t.summary||"")}</p>
        ${t.significance ? `<div style="margin-bottom:16px;">${label("SIGNIFICANCE")}<p style="font-size:12px;color:#555;">${esc(t.significance)}</p></div>` : ""}
        ${t.strategicQuestion ? `<div style="background:#FFF9DB;border-left:3px solid #DB2B39;padding:14px 16px;margin-bottom:16px;">${label("STRATEGIC QUESTION","DB2B39")}<p style="font-size:12px;color:#333;font-style:italic;">${esc(t.strategicQuestion)}</p></div>` : ""}
        ${ev ? `<div style="background:#f7f7f7;padding:12px 16px;border-left:3px solid #ddd;"><p style="font-size:12px;color:#333;font-style:italic;">"${esc(ev.text||"")}"</p>${ev.source ? `<p style="font-size:10px;color:#999;margin-top:6px;">${esc(resolveSource(ev.source))}</p>` : ""}</div>` : ""}
        ${foot}
      `);
    }

    // Provocations break
    if (selectedProvs.length > 0) {
      html += slide("#0A3A75", `
        <h2 style="font-size:38px;color:#fff;text-align:center;margin-bottom:12px;">Provocations for Fieldwork</h2>
        <p style="color:#FFD900;text-align:center;font-size:15px;">${selectedProvs.length} selected for primary research</p>
      `);
      for (const p of selectedProvs) {
        const tension = allTensions.find(t => t.id === p.tensionId);
        html += slide("#fff", `
          <div style="background:#FFD900;height:4px;margin:-60px -70px 24px;border-radius:4px 4px 0 0;"></div>
          ${tension ? `<p style="font-family:monospace;font-size:10px;color:#999;margin-bottom:12px;">T${tension.rank} · ${esc(tension.forceA)} ↔ ${esc(tension.forceB)}</p>` : ""}
          <h2 style="font-size:30px;color:#111;line-height:1.2;margin-bottom:20px;">${esc(p.title||"")}</h2>
          ${p.text ? `<p style="font-size:13px;color:#555;margin-bottom:16px;">${esc(p.text)}</p>` : ""}
          ${p.evidence ? `<div style="background:#f7f7f7;padding:12px 16px;border-left:3px solid #ddd;"><p style="font-size:11px;color:#777;font-style:italic;">Evidence: ${esc(p.evidence)}</p></div>` : ""}
          ${foot}
        `);
      }
    }

    // Narrative
    if (narr) {
      const paras = (narr.summary||"").split("\n\n").slice(0,3);
      html += slide("#fff", `
        ${bar(`<span style="color:#FFD900;font-weight:700;">Strategic Narrative</span><span style="float:right;font-family:monospace;font-size:10px;color:#666;">Lens: ${esc(currentAxis?.name||"")}</span>`)}
        <h2 style="font-size:28px;color:#111;margin-bottom:20px;">${esc(narr.headline||"")}</h2>
        <div style="display:flex;gap:24px;">
          <div style="flex:2;">${paras.map(p=>`<p style="font-size:12px;color:#444;margin-bottom:12px;">${esc(p)}</p>`).join("")}</div>
          ${narr.keyTension ? `<div style="flex:1;background:#FFF9DB;border:2px solid #FFD900;padding:16px;">${label("KEY TENSION")}<p style="font-size:12px;color:#333;font-style:italic;">${esc(narr.keyTension)}</p></div>` : ""}
        </div>
        ${foot}
      `);
    }

    // Sources
    if (exportSources && allSources && allSources.length > 0) {
      const typeColors = { News:"#0A3A75",Opinion:"#2A8C51",Academic:"#EB573F",Social:"#DB2B39",Cultural:"#7B4FBF",Category:"#E8830A" };
      const grouped = {};
      allSources.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });
      const srcHtml = Object.entries(grouped).map(([type,srcs]) =>
        `<div style="margin-bottom:20px;"><p style="font-size:11px;font-weight:700;color:${typeColors[type]||"#555"};font-family:monospace;margin-bottom:6px;">${type.toUpperCase()}</p>${srcs.map(s=>`<p style="font-size:11px;color:#444;padding:4px 0;border-bottom:1px solid #f0f0f0;">${esc(s.title||"")}${s.author?` — <em>${esc(s.author)}</em>`:""}</p>`).join("")}</div>`
      ).join("");
      html += slide("#fff", `${bar(`<span>Corpus Registry</span><span style="float:right;color:#FFD900;font-family:monospace;font-size:10px;">${allSources.length} sources</span>`)}<div style="columns:2;column-gap:32px;">${srcHtml}</div>${foot}`);
    }

    html += `</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = ((meta.client||"discourse").replace(/\s+/g,"_"))+"_landscape_export.html";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [meta, allTensions, allProvocations, allSources, exportTensions, exportProvocations, exportNarrative, exportSources, currentAxis, resolveSource]);
  const refineNarrative = useCallback(async () => {
    if (!refinePrompt.trim() || refining || !currentAxis) return;
    setRefining(true); setRefineError("");
    try {
      const prompt = buildRefinePrompt(currentAxis, allNarratives, meta, refinePrompt.trim());
      const res = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2000, messages: [{ role: "user", content: prompt }] }),
      });
      const result = await res.json();
      const text = result.content?.map(b => b.text || "").join("") || "";
      const newNarr = JSON.parse(text.replace(/```json|```/g, "").trim());
      if (newNarr.headline && newNarr.summary && newNarr.keyTension) {
        setAllAxes(prev => prev.map(ax => ax.id === selectedAxisId ? { ...ax, narrative: { ...ax.narrative, ...newNarr } } : ax));
        setRefinePrompt("");
      } else throw new Error("Missing fields");
    } catch (err) { setRefineError("Failed: " + err.message); }
    setRefining(false);
  }, [refinePrompt, refining, currentAxis, selectedAxisId, allNarratives, meta]);

  const updateNarrative = useCallback((field, value) => {
    setAllAxes(prev => prev.map(ax => ax.id === selectedAxisId ? { ...ax, narrative: { ...ax.narrative, [field]: value } } : ax));
  }, [selectedAxisId]);

  // Map drag
  const handleMouseDown = useCallback((e, n) => { e.stopPropagation(); e.preventDefault(); setDragging(n.id); setSelectedNarrative(n); }, []);
  const handleMouseMove = useCallback((e) => {
    if (!dragging || !mapRef.current) return;
    const rect = mapRef.current.getBoundingClientRect();
    const x = Math.max(0.04, Math.min(0.96, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0.06, Math.min(0.94, (e.clientY - rect.top) / rect.height));
    setNarratives(p => p.map(n => n.id === dragging ? { ...n, x, y } : n));
    setSelectedNarrative(p => p && p.id === dragging ? { ...p, x, y } : p);
  }, [dragging]);
  const handleMouseUp = useCallback(() => setDragging(null), []);
  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp); };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  // List drag reorder
  const handleDragStart = useCallback((type, idx) => { setDragItemType(type); setDragIdx(idx); }, []);
  const handleDragOver = useCallback((e, idx) => { e.preventDefault(); setDragOverIdx(idx); }, []);
  const handleDrop = useCallback((type, idx) => {
    if (dragItemType !== type || dragIdx === null) return;
    const setter = type === "tension" ? setAllTensions : setAllProvocations;
    setter(prev => {
      const items = [...prev];
      const [moved] = items.splice(dragIdx, 1);
      items.splice(idx, 0, moved);
      if (type === "tension") return items.map((t, i) => ({ ...t, rank: i + 1 }));
      return items;
    });
    setDragIdx(null); setDragOverIdx(null); setDragItemType(null);
  }, [dragItemType, dragIdx]);

  // Inline edit helper
  const isEditing = (id, key) => editingId === id && editingKey === key;
  const startEdit = (id, key) => { setEditingId(id); setEditingKey(key); };
  const stopEdit = () => { setEditingId(null); setEditingKey(null); };
  const updateTension = (id, key, val) => setAllTensions(prev => prev.map(t => t.id === id ? { ...t, [key]: val } : t));
  const updateProvocation = (id, key, val) => setAllProvocations(prev => prev.map(p => p.id === id ? { ...p, [key]: val } : p));

  // Copy tab content
  const copyTabContent = useCallback(() => {
    let text = "";
    if (activeView === "tensions") {
      text = allTensions.map(t => `${t.rank}. ${t.forceA} \u2194 ${t.forceB}\n${t.summary}\n\nSignificance: ${t.significance}\nCategory relevance: ${t.categoryRelevance}\nStrategic question: ${t.strategicQuestion}\n`).join("\n---\n\n");
    } else if (activeView === "provocations") {
      text = allProvocations.map((p, i) => `${i + 1}. ${p.title}\n${p.text}\nEvidence: ${p.evidence}\n`).join("\n---\n\n");
    } else if (activeView === "narrative" && currentAxis) {
      text = `${currentAxis.narrative.headline}\n\n${currentAxis.narrative.summary}\n\nKey tension: ${currentAxis.narrative.keyTension}`;
    } else if (activeView === "sources") {
      const grouped = {};
      allSources.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });
      text = Object.entries(grouped).map(([type, sources]) =>
        `## ${type}\n${sources.map(s => `- ${s.title} (${s.author}, ${s.date}) [${s.market}]`).join("\n")}`
      ).join("\n\n");
    }
    navigator.clipboard?.writeText(text);
  }, [activeView, allTensions, allProvocations, currentAxis, allSources]);

  /* ─── Shared UI ─── */
  const Tab = ({ k, label }) => (
    <button onClick={() => setActiveView(k)} style={{ padding: "7px 14px", border: activeView === k ? `1.5px solid ${DM.yellow}` : "1.5px solid transparent", borderRadius: "4px", fontFamily: "'Poppins', sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.15s", background: activeView === k ? "#FFF9DB" : "transparent", color: activeView === k ? DM.black : DM.grey400 }}>{label}</button>
  );
  const SectionLabel = ({ children }) => (
    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.06em", color: DM.grey400, marginBottom: "8px" }}>{children}</div>
  );
  const MarketPill = ({ market }) => (
    <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, background: DM.grey50, padding: "2px 6px", borderRadius: "3px", border: `1px solid ${DM.grey100}` }}>{market}</span>
  );
  const TensionPill = ({ rank }) => (
    <span style={{ fontFamily: "'Poppins'", fontSize: "9px", fontWeight: 700, color: DM.white, background: DM.red, padding: "2px 7px", borderRadius: "3px" }}>T{rank}</span>
  );
  const EditableText = ({ value, onChange, style, multiline, onStartEdit, onStopEdit }) => {
    const [editing, setEditing] = useState(false);
    if (editing) {
      const Tag = multiline ? "textarea" : "input";
      return <Tag autoFocus value={value} onChange={e => onChange(e.target.value)}
        onBlur={() => { setEditing(false); onStopEdit?.(); }}
        onKeyDown={e => { if (e.key === "Escape") { setEditing(false); onStopEdit?.(); } if (!multiline && e.key === "Enter") { setEditing(false); onStopEdit?.(); } }}
        rows={multiline ? 4 : undefined}
        style={{ ...style, border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "6px 10px", background: "#FFFCE8", outline: "none", resize: multiline ? "vertical" : "none", width: "100%", fontFamily: style?.fontFamily || "'Poppins', sans-serif" }} />;
    }
    return <div onClick={() => { setEditing(true); onStartEdit?.(); }} style={{ ...style, cursor: "text", borderRadius: "4px", padding: "2px 4px", margin: "-2px -4px", transition: "background 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.background = "#FFFCE808"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >{value}</div>;
  };

  const MiniPreview = ({ axis }) => {
    const s = 140, pad = 12, inner = s - pad * 2;
    return (
      <div style={{ width: s, height: s, position: "relative", background: DM.white, borderRadius: "4px", border: `1px solid ${DM.grey100}`, overflow: "hidden", margin: "0 auto" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: DM.grey200 }} />
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: DM.grey200 }} />
        {allNarratives.map(n => {
          const cy = axis.yPositions[n.id] ?? 0.5;
          const r = Math.max(3, Math.min(6, n.salience * 0.06));
          return <div key={n.id} style={{ position: "absolute", left: `${pad + n.x * inner}px`, top: `${pad + cy * inner}px`, width: `${r * 2}px`, height: `${r * 2}px`, borderRadius: "50%", background: Q_COLORS[getQ(n.x, cy)], opacity: 0.55, transform: "translate(-50%,-50%)" }} />;
        })}
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", background: DM.white, color: DM.black, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: ${DM.grey200}; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideRight { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        @keyframes onboard { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
        @keyframes breathe { 0%,100% { transform:translate(-50%,-50%) scale(1); } 50% { transform:translate(-50%,-50%) scale(1.05); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        textarea:focus, input:focus { border-color: ${DM.yellow} !important; outline: none; }
      `}</style>
      <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={handleFileUpload} />

      {/* ═══ ONBOARDING ═══ */}
      {phase === "onboarding" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", zIndex: 200, display: "grid", placeItems: "center" }}>
          <div style={{ background: DM.white, border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "44px 48px", maxWidth: "600px", width: "92%", maxHeight: "90vh", overflowY: "auto", animation: "onboard 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ marginBottom: "20px" }}><DmLogo height={28} /></div>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "28px", color: DM.black, marginBottom: "12px", lineHeight: 1.1 }}>Discourse Explorer</h2>
            <p style={{ fontSize: "13px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, marginBottom: "24px" }}>
              Upload a discourse analysis JSON, choose your strategic lens, and explore the cultural landscape of your territory.
            </p>

            {/* Process steps accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0px", marginBottom: "28px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", background: DM.black }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", fontWeight: 700, color: DM.yellow, letterSpacing: "1.5px", textTransform: "uppercase" }}>How it works</span>
              </div>
              {PROCESS_STEPS.map((step, i) => (
                <div key={i} style={{ borderTop: i > 0 ? `1px solid ${DM.grey200}` : "none" }}>
                  <ProcessStepItem {...step} />
                </div>
              ))}
            </div>

            <button onClick={() => fileRef.current?.click()} style={{ width: "100%", padding: "14px", border: "none", borderRadius: "4px", background: DM.yellow, color: DM.black, fontFamily: "'Anton', sans-serif", fontSize: "14px", cursor: "pointer", marginBottom: "10px" }}>Upload analysis JSON {"\u2192"}</button>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={loadDemo} style={{ flex: 1, padding: "10px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins', sans-serif", fontSize: "11px", cursor: "pointer" }}>View demo with sample data</button>
              <button onClick={() => {
                const link = document.createElement("a");
                link.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Download the full process overview document from your d+m project folder:\n\nFilename: dm_Discourse_Explorer_Overview.docx\nLocation: d+m Discourse Analysis Claude Project \u2192 Project Files\n\nThis document covers the three-stage workflow (Define, Generate, Explore), Explorer features, multi-lens analysis, and client value proposition.");
                link.download = "Discourse_Explorer_Overview_README.txt";
                link.click();
              }} style={{ flex: 1, padding: "10px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins', sans-serif", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>{"\u2193"} Process overview (.docx)</button>
            </div>
            {uploadError && <p style={{ color: "#C82A27", fontSize: "11px", marginTop: "8px" }}>{uploadError}</p>}
          </div>
        </div>
      )}

      {/* ═══ STRATEGIC FRAMING ═══ */}
      {phase === "frame" && meta && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <header style={{ padding: "0 24px", height: "54px", display: "flex", alignItems: "center", gap: "14px", borderBottom: `1px solid ${DM.grey100}`, flexShrink: 0 }}>
            <DmLogo height={22} /><div style={{ width: "1px", height: "22px", background: DM.grey200 }} />
            <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "14px" }}>Discourse Explorer</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: DM.grey400 }}>{meta.territory} {"\u00B7"} {allNarratives.length} narratives {isDemo ? "\u00B7 Demo" : ""}</span>
          </header>
          <div style={{ flex: 1, overflow: "auto", display: "flex", justifyContent: "center", padding: "40px" }}>
            <div style={{ display: "flex", gap: "40px", maxWidth: "1100px", width: "100%", animation: "fadeUp 0.4s ease-out" }}>
              {/* Left: narratives */}
              <div style={{ flex: 1, maxWidth: "440px" }}>
                <SectionLabel>Extracted narratives</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "26px", lineHeight: 1.1, marginBottom: "6px" }}>{allNarratives.length} narratives from {meta.territory}</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>These narratives were identified through discourse analysis. Review them, then choose a strategic lens.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", maxHeight: "calc(100vh - 340px)", overflowY: "auto" }}>
                  {[...allNarratives].sort((a, b) => b.salience - a.salience).map(n => (
                    <div key={n.id} style={{ padding: "10px 14px", background: DM.grey50, borderRadius: "4px", display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", minWidth: "36px" }}>
                        <span style={{ fontFamily: "'Anton'", fontSize: "16px" }}>{n.salience}%</span>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "7px", color: DM.grey400 }}>{n.salience > 50 ? "DOM" : n.salience > 25 ? "MOD" : "EMG"}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>{n.name}</div>
                        <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey600, lineHeight: 1.5 }}>{n.description.slice(0, 120)}...</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: lenses */}
              <div style={{ flex: 1, maxWidth: "560px" }}>
                <SectionLabel>Strategic lenses</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "26px", lineHeight: 1.1, marginBottom: "6px" }}>How do you want to read these narratives?</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>
                  {allAxes.filter(a => !a._custom).length} lenses proposed. Choose one, or describe a new angle.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                  {allAxes.map(ax => (
                    <div key={ax.id} onClick={() => setSelectedAxisId(ax.id)} style={{ padding: "14px 18px", borderRadius: "4px", cursor: "pointer", border: selectedAxisId === ax.id ? `2px solid ${DM.yellow}` : `1.5px solid ${DM.grey200}`, background: selectedAxisId === ax.id ? "#FFFCE8" : DM.white, transition: "all 0.2s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, border: selectedAxisId === ax.id ? `2px solid ${DM.yellow}` : `1.5px solid ${DM.grey200}`, background: selectedAxisId === ax.id ? DM.yellow : "transparent", display: "grid", placeItems: "center", transition: "all 0.2s" }}>
                          {selectedAxisId === ax.id && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.black }} />}
                        </div>
                        <span style={{ fontFamily: "'Anton'", fontSize: "15px" }}>{ax.name}</span>
                        {ax._custom && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "2px 6px", borderRadius: "3px" }}>Custom</span>}
                      </div>
                      <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.55, paddingLeft: "28px" }}>{ax.rationale}</p>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "20px", borderRadius: "4px", border: `1.5px dashed ${DM.grey200}`, background: DM.grey50 }}>
                  <div style={{ fontSize: "11px", fontWeight: 600, marginBottom: "8px" }}>Propose a new angle</div>
                  <textarea value={newAngle} onChange={e => setNewAngle(e.target.value)} placeholder={"e.g. 'How does trust differ for inherited vs. self-made wealth?'\ne.g. 'Where does each narrative sit on local vs. global?'"} rows={3}
                    style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", color: DM.black, resize: "vertical", background: DM.white }} />
                  <button onClick={generateAxis} disabled={!newAngle.trim() || generating}
                    style={{ marginTop: "10px", width: "100%", padding: "12px", border: "none", borderRadius: "4px", background: newAngle.trim() && !generating ? DM.nearBlack : DM.grey100, color: newAngle.trim() && !generating ? DM.white : DM.grey400, fontFamily: "'Poppins'", fontSize: "12px", fontWeight: 500, cursor: newAngle.trim() && !generating ? "pointer" : "default" }}>
                    {generating ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}><span style={{ width: "14px", height: "14px", border: "2px solid transparent", borderTopColor: DM.white, borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />Generating...</span> : "Generate new lens"}
                  </button>
                  {genError && <p style={{ color: "#C82A27", fontSize: "10px", marginTop: "6px" }}>{genError}</p>}
                </div>
                <button onClick={() => selectedAxisId && applyAxis(selectedAxisId)}
                  style={{ marginTop: "24px", width: "100%", padding: "14px", border: "none", borderRadius: "4px", background: selectedAxisId ? DM.yellow : DM.grey100, color: selectedAxisId ? DM.black : DM.grey400, fontFamily: "'Anton'", fontSize: "14px", cursor: selectedAxisId ? "pointer" : "default" }}>
                  {selectedAxisId ? "Generate map \u2192" : "Select or create a lens to continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ EXPLORER ═══ */}
      {phase === "explorer" && currentAxis && (<>
        <header style={{ padding: "0 24px", height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${DM.grey100}`, zIndex: 50, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <DmLogo height={22} /><div style={{ width: "1px", height: "22px", background: DM.grey200 }} />
            <span style={{ fontFamily: "'Anton'", fontSize: "14px" }}>Discourse Explorer</span>
            <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey400 }}>{meta?.territory} {isDemo ? "\u00B7 Demo" : ""}</span>
            <div style={{ width: "1px", height: "16px", background: DM.grey100 }} />
            <button onClick={() => { setPhase("frame"); setSelectedNarrative(null); }} style={{ padding: "4px 10px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, cursor: "pointer" }}>Lens: {currentAxis.name} {"\u270E"}</button>
          </div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <Tab k="map" label="Map" /><Tab k="tensions" label="Tensions" /><Tab k="provocations" label="Provocations" /><Tab k="narrative" label="Strategic Narrative" /><Tab k="sources" label="Sources" />
            <div style={{ width: "1px", height: "16px", background: DM.grey100, margin: "0 4px" }} />
            {activeView !== "map" && (
              <button onClick={copyTabContent} style={{ padding: "4px 10px", border: `1px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, cursor: "pointer" }}>Copy</button>
            )}
            <button onClick={resetAll} style={{ padding: "4px 10px", border: `1px solid ${DM.red}40`, borderRadius: "4px", background: "transparent", fontFamily: "'Space Mono'", fontSize: "8px", color: DM.red, cursor: "pointer" }}>Reset</button>
            <div style={{ width: "1px", height: "16px", background: DM.grey100, margin: "0 4px" }} />
            <button onClick={() => { setShowExport(true); setExportTensions(new Set(allTensions.slice(0, 3).map(t => t.id))); setExportProvocations(new Set()); setExportNarrative(true); setExportSources(false); }} style={{ padding: "4px 12px", border: "none", borderRadius: "4px", background: DM.black, fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, cursor: "pointer", letterSpacing: "0.05em" }}>Export PPT {"→"}</button>
          </div>
        </header>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* ─── MAP TAB ─── */}
          {activeView === "map" && (<>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "14px 14px 14px 18px", maxWidth: "50%" }}>
              <div style={{ display: "flex", gap: "4px", marginBottom: "10px", flexShrink: 0 }}>
                {["topLeft", "topRight", "bottomLeft", "bottomRight"].map(key => { const m = qMeta(key); return (
                  <div key={key} onClick={() => { setSelectedQuadrant(key); setSelectedNarrative(null); }} style={{ flex: 1, padding: "8px 10px", borderRadius: "4px", border: selectedQuadrant === key ? `2px solid ${Q_COLORS[key]}` : `1px solid ${DM.grey100}`, background: selectedQuadrant === key ? `${Q_COLORS[key]}08` : DM.white, cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "2px", background: Q_COLORS[key] }} />
                      <span style={{ fontSize: "9px", fontWeight: 600, color: Q_COLORS[key] }}>{m.label}</span>
                    </div>
                    <div style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, paddingLeft: "13px" }}>{m.tagline}</div>
                  </div>
                ); })}
              </div>
              <div ref={mapRef} style={{ flex: 1, position: "relative", background: DM.white, borderRadius: "4px", border: `1px solid ${DM.grey200}`, overflow: "hidden", cursor: dragging ? "grabbing" : "default" }}>
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: DM.grey200 }} />
                <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: DM.grey200 }} />
                {[0.25, 0.75].map(p => <div key={`v${p}`} style={{ position: "absolute", left: `${p * 100}%`, top: 0, bottom: 0, width: "1px", background: DM.grey100 }} />)}
                {[0.25, 0.75].map(p => <div key={`h${p}`} style={{ position: "absolute", top: `${p * 100}%`, left: 0, right: 0, height: "1px", background: DM.grey100 }} />)}
                <div style={{ position: "absolute", left: "8px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontFamily: "'Space Mono'", fontSize: "9px", letterSpacing: "0.1em", fontWeight: 700, color: DM.nearBlack, background: "rgba(247,247,247,0.92)", padding: "3px 8px", borderRadius: "3px", whiteSpace: "nowrap", pointerEvents: "none" }}>{"←"} DOMINANT</div>
                <div style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Space Mono'", fontSize: "9px", letterSpacing: "0.1em", fontWeight: 700, color: DM.nearBlack, background: "rgba(247,247,247,0.92)", padding: "3px 8px", borderRadius: "3px", whiteSpace: "nowrap", pointerEvents: "none" }}>EMERGENT {"→"}</div>
                <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Anton'", fontSize: "11px", letterSpacing: "0.1em", color: DM.nearBlack, background: "rgba(255,255,255,0.88)", padding: "3px 12px", borderRadius: "3px", whiteSpace: "nowrap", pointerEvents: "none" }}>{"↑"} {currentAxis.topLabel}</div>
                <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Anton'", fontSize: "11px", letterSpacing: "0.1em", color: DM.nearBlack, background: "rgba(255,255,255,0.88)", padding: "3px 12px", borderRadius: "3px", whiteSpace: "nowrap", pointerEvents: "none" }}>{currentAxis.bottomLabel} {"↓"}</div>
                {[{key:"topLeft",s:{left:"32px",top:"26px"}},{key:"topRight",s:{right:"14px",top:"26px",textAlign:"right"}},{key:"bottomLeft",s:{left:"32px",bottom:"26px"}},{key:"bottomRight",s:{right:"14px",bottom:"26px",textAlign:"right"}}].map(({key,s})=>(
                  <div key={`ql-${key}`} onClick={() => { setSelectedQuadrant(key); setSelectedNarrative(null); }} style={{ position:"absolute",...s,cursor:"pointer",padding:"4px 6px",borderRadius:"3px",transition:"all 0.15s",background:selectedQuadrant===key?`${Q_COLORS[key]}12`:"transparent" }}
                    onMouseEnter={e => e.currentTarget.style.background=`${Q_COLORS[key]}12`} onMouseLeave={e => { if(selectedQuadrant!==key) e.currentTarget.style.background="transparent"; }}>
                    <div style={{ fontFamily:"'Poppins'",fontSize:"10px",fontWeight:600,color:Q_COLORS[key],opacity:0.65 }}>{qMeta(key).label}</div>
                    <div style={{ fontFamily:"'Poppins'",fontSize:"8px",fontWeight:300,color:Q_COLORS[key],opacity:0.4 }}>{qMeta(key).tagline}</div>
                  </div>
                ))}
                {narratives.map(n => {
                  if (n.y == null) return null;
                  const qk = getQ(n.x, n.y); const col = Q_COLORS[qk];
                  const isSel = selectedNarrative?.id === n.id;
                  const isHov = hoveredNarrative === n.id;
                  const isDim = selectedNarrative && !isSel;
                  const r = Math.max(18, Math.min(34, n.salience * 0.38));
                  return (
                    <div key={n.id} onMouseDown={e => handleMouseDown(e, n)}
                      onMouseEnter={() => setHoveredNarrative(n.id)} onMouseLeave={() => setHoveredNarrative(null)}
                      onClick={() => { setSelectedNarrative(n); setSelectedQuadrant(null); }}
                      style={{ position: "absolute", left: `${n.x * 100}%`, top: `${n.y * 100}%`, transform: "translate(-50%,-50%)", zIndex: isSel ? 20 : isHov ? 15 : 1, cursor: dragging === n.id ? "grabbing" : "grab", transition: dragging === n.id ? "none" : "opacity 0.3s", opacity: isDim ? 0.2 : 1, animation: isSel && !dragging ? "breathe 3s ease-in-out infinite" : "none" }}>
                      <div style={{ width: `${r * 2}px`, height: `${r * 2}px`, borderRadius: "50%", background: isSel ? `radial-gradient(circle at 35% 35%,${col}55,${col}22)` : isHov ? `radial-gradient(circle at 35% 35%,${col}40,${col}15)` : `radial-gradient(circle at 35% 35%,${col}30,${col}10)`, border: `1.5px solid ${isSel ? col : isHov ? col + 'AA' : col + '60'}`, display: "grid", placeItems: "center", transition: "all 0.2s", boxShadow: isSel ? `0 2px 12px ${col}25` : "0 1px 3px rgba(0,0,0,0.05)" }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: r > 24 ? "10px" : "8px", fontWeight: 700, color: isSel ? DM.black : DM.grey600 }}>{n.salience}%</span>
                      </div>
                      <div style={{ position: "absolute", top: `${r * 2 + 4}px`, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: "'Poppins'", fontSize: "9px", fontWeight: isSel ? 600 : 500, color: isSel ? DM.black : DM.grey600 }}>{n.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Detail panel - right 50% */}
            <div style={{ width: "50%", borderLeft: `1px solid ${DM.grey100}`, background: DM.grey50, overflowY: "auto", flexShrink: 0 }}>
              {selectedNarrative ? (() => {
                const n = selectedNarrative; const qk = getQ(n.x, n.y); const col = Q_COLORS[qk]; const m = qMeta(qk);
                return (
                  <div style={{ padding: "22px 24px", animation: "slideRight 0.3s ease-out" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: col }} />
                          <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: col }}>{m.label}</span>
                          {n.markets?.map(mk => <MarketPill key={mk} market={mk} />)}
                        </div>
                        <h3 style={{ fontFamily: "'Anton'", fontSize: "22px", lineHeight: 1.1 }}>{n.name}</h3>
                      </div>
                      <button onClick={() => setSelectedNarrative(null)} style={{ background: DM.grey100, border: "none", borderRadius: "4px", color: DM.grey400, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>{"\u2715"}</button>
                    </div>
                    <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, marginBottom: "20px" }}>{n.description}</p>
                    <div style={{ marginBottom: "20px" }}>
                      <SectionLabel>Salience</SectionLabel>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ flex: 1, height: "3px", background: DM.grey100, borderRadius: "2px" }}><div style={{ width: `${n.salience}%`, height: "100%", background: DM.yellow, borderRadius: "2px" }} /></div>
                        <span style={{ fontFamily: "'Anton'", fontSize: "18px" }}>{n.salience}%</span>
                      </div>
                      <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, marginTop: "3px" }}>{n.salience > 50 ? "Dominant" : n.salience > 25 ? "Moderate" : "Emergent"} presence</div>
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <SectionLabel>Feels {"\u00B7"} Speaks {"\u00B7"} Means</SectionLabel>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {n.emotionalRegister && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: `2px solid #EB573F` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: "#EB573F" }}>Emotional Register</span>
                              <span style={{ fontSize: "12px", fontWeight: 600 }}>{n.emotionalRegister.primary}</span>
                              <span style={{ fontSize: "10px", color: DM.grey400 }}>+ {n.emotionalRegister.secondary}</span>
                            </div>
                            <p style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, lineHeight: 1.4 }}>{n.emotionalRegister.rationale}</p>
                          </div>
                        )}
                        {n.metaphorFamily && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: `2px solid #0A3A75` }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: "#0A3A75" }}>Metaphor Family</span>
                              <span style={{ fontSize: "11px", fontWeight: 600 }}>{n.metaphorFamily.primary}</span>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                              {n.metaphorFamily.examples?.map((ex, i) => (
                                <span key={i} style={{ fontSize: "9px", color: DM.grey600, background: DM.grey50, padding: "2px 6px", borderRadius: "3px", fontStyle: "italic" }}>{ex}</span>
                              ))}
                            </div>
                            <p style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, lineHeight: 1.4 }}>{n.metaphorFamily.rationale}</p>
                          </div>
                        )}
                        {n.culturalStrategy && (
                          <div style={{ padding: "10px 14px", borderRadius: "4px", background: DM.white, border: `1px solid ${DM.grey100}`, borderLeft: `2px solid ${DM.yellow}` }}>
                            <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.nearBlack }}>Cultural Strategy</span>
                            {["orthodoxy", "contradiction", "opportunity"].map(k => (
                              <div key={k} style={{ marginTop: "6px" }}>
                                <span style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: k === "opportunity" ? DM.red : DM.grey400 }}>{k}</span>
                                <p style={{ fontSize: "10px", fontWeight: 300, color: DM.grey600, lineHeight: 1.45 }}>{n.culturalStrategy[k]}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    {n.quotes?.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <SectionLabel>Verbatim quotes</SectionLabel>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {n.quotes.map((q, i) => {
                            // Try to match this quote to a source object by id (string or number) or by title fragment
                            const matchedSource = allSources.find(s =>
                              String(s.id) === String(q.source) ||
                              (typeof q.source === "string" && q.source.toLowerCase().includes(s.title?.toLowerCase()?.slice(0, 20))) ||
                              (typeof q.source === "string" && s.title?.toLowerCase()?.includes(q.source?.toLowerCase()?.slice(0, 20)))
                            );
                            const hasPassage = matchedSource?.passage;
                            const passageKey = `${n.id}-${i}`;
                            const isOpen = expandedPassageId === passageKey;
                            const sourceLabel = matchedSource ? matchedSource.title : (typeof q.source === "string" ? q.source : resolveSource(q.source));
                            const canExpand = !!matchedSource;
                            return (
                              <div key={i} style={{ background: DM.white, borderRadius: "4px", borderLeft: `2px solid ${isOpen ? DM.yellow : DM.grey200}`, transition: "border-color 0.15s", overflow: "hidden" }}>
                                <div style={{ padding: "12px 14px" }}>
                                  <p style={{ fontSize: "12px", fontStyle: "italic", color: DM.nearBlack, lineHeight: 1.6 }}>{"\u201C"}{q.text}{"\u201D"}</p>
                                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                                    <span style={{ fontSize: "10px", fontWeight: 500, color: DM.grey400 }}>{sourceLabel}</span>
                                    <MarketPill market={q.market} />
                                    {canExpand && (
                                      <button
                                        onClick={() => setExpandedPassageId(isOpen ? null : passageKey)}
                                        style={{ marginLeft: "auto", fontSize: "9px", fontWeight: 600, color: isOpen ? DM.nearBlack : DM.grey400, background: isOpen ? DM.yellow : DM.grey100, border: "none", borderRadius: "3px", padding: "3px 8px", cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}
                                      >
                                        {isOpen ? "↑ Close" : (hasPassage ? "Read source →" : "Source info →")}
                                      </button>
                                    )}
                                  </div>
                                </div>
                                {isOpen && canExpand && (
                                  <div style={{ borderTop: `1px solid ${DM.grey100}`, padding: "14px 14px 16px", background: "#FFFDF0" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                                      <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: DM.yellow, flexShrink: 0 }} />
                                      <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{hasPassage ? "Source passage" : "Source"}</span>
                                      <span style={{ fontSize: "9px", color: DM.grey400, marginLeft: "auto" }}>{matchedSource.type}{matchedSource.market ? " · " + matchedSource.market : ""}</span>
                                    </div>
                                    {hasPassage && (
                                      <p style={{ fontSize: "11px", fontWeight: 300, color: DM.nearBlack, lineHeight: 1.75, margin: "0 0 10px" }}>{matchedSource.passage}</p>
                                    )}
                                    {matchedSource.passageNote && (
                                      <p style={{ fontSize: "10px", fontWeight: 400, color: DM.grey400, lineHeight: 1.5, fontStyle: "italic", margin: "0 0 10px", borderTop: `1px solid ${DM.grey100}`, paddingTop: "8px" }}>{matchedSource.passageNote}</p>
                                    )}
                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                      <span style={{ fontSize: "10px", fontWeight: 500, color: DM.grey600 }}>{matchedSource.title}</span>
                                      {(matchedSource.author || matchedSource.date) && (
                                        <span style={{ fontSize: "9px", color: DM.grey400 }}>{[matchedSource.author, matchedSource.date].filter(Boolean).join(" · ")}</span>
                                      )}
                                      {matchedSource.url && (
                                        <a href={matchedSource.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontSize: "9px", color: DM.grey400, textDecoration: "underline" }}>View original ↗</a>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {n.linguisticPatterns?.length > 0 && (
                      <div style={{ marginBottom: "20px" }}>
                        <SectionLabel>Linguistic patterns</SectionLabel>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                          {n.linguisticPatterns.map((lp, i) => (
                            <span key={i} style={{ fontSize: "10px", color: DM.grey600, background: DM.white, padding: "4px 8px", borderRadius: "4px", border: `1px solid ${DM.grey100}` }}>{lp}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {n.relatedNarratives?.length > 0 && (
                      <div>
                        <SectionLabel>Related narratives</SectionLabel>
                        <div style={{ display: "flex", gap: "4px" }}>
                          {n.relatedNarratives.map(rid => {
                            const rn = narratives.find(nn => nn.id === rid); if (!rn) return null;
                            const rqk = getQ(rn.x, rn.y);
                            return (
                              <button key={rid} onClick={() => { setSelectedNarrative(rn); setSelectedQuadrant(null); }} style={{ flex: 1, padding: "8px 10px", background: DM.white, border: `1px solid ${DM.grey100}`, borderRadius: "4px", cursor: "pointer", textAlign: "left" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                                  <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: Q_COLORS[rqk] }} />
                                  <span style={{ fontSize: "10px", fontWeight: 600 }}>{rn.name}</span>
                                </div>
                                <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey400 }}>{rn.salience}%</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {/* ── AI Deep-dive ── */}
                    {(() => {
                      const cacheKey = n.id;
                      const content = deepDiveCache[cacheKey];
                      const isLoading = deepDiveLoading === cacheKey;
                      return (
                        <div style={{ marginTop: "24px", borderTop: `1px solid ${DM.grey100}`, paddingTop: "20px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: content ? "14px" : "0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.yellow }} />
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.nearBlack, letterSpacing: "0.04em" }}>Analyst Deep-dive</span>
                            </div>
                            {!content && !isLoading && (
                              <button
                                onClick={() => generateNarrativeDeepDive(n)}
                                style={{ fontSize: "11px", fontWeight: 600, color: DM.nearBlack, background: DM.yellow, border: "none", borderRadius: "3px", padding: "5px 12px", cursor: "pointer" }}
                              >
                                Generate →
                              </button>
                            )}
                          </div>
                          {isLoading && (
                            <div style={{ padding: "20px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: "14px", height: "14px", border: `2px solid ${DM.grey200}`, borderTopColor: DM.yellow, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                              <span style={{ fontSize: "11px", fontWeight: 300, color: DM.grey400 }}>Generating analytical deep-dive…</span>
                            </div>
                          )}
                          {content && !isLoading && (
                            <div>
                              <div style={{ background: "#FFFDF0", border: `1px solid ${DM.yellow}40`, borderLeft: `3px solid ${DM.yellow}`, borderRadius: "4px", padding: "16px 18px" }}>
                                {content.split("\n\n").filter(Boolean).map((para, i) => (
                                  <p key={i} style={{ fontSize: "12px", fontWeight: 300, color: DM.nearBlack, lineHeight: 1.75, margin: i < content.split("\n\n").filter(Boolean).length - 1 ? "0 0 14px" : "0" }}>{para}</p>
                                ))}
                              </div>
                              <button
                                onClick={() => setDeepDiveCache(prev => { const next = {...prev}; delete next[cacheKey]; return next; })}
                                style={{ marginTop: "8px", fontSize: "10px", color: DM.grey400, background: "none", border: "none", cursor: "pointer", padding: "0" }}
                              >
                                ↺ Regenerate
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })() : selectedQuadrant ? (() => {
                const qk = selectedQuadrant; const col = Q_COLORS[qk]; const m = qMeta(qk);
                const qNarratives = narratives.filter(n => n.y != null && getQ(n.x, n.y) === qk).sort((a, b) => b.salience - a.salience);
                const isDominant = qk === "topLeft" || qk === "bottomLeft";
                const isTop = qk === "topLeft" || qk === "topRight";
                const quadrantStrategicNotes = {
                  topLeft: `This is where established narratives align with ${currentAxis.topLabel.toLowerCase()}. These are the familiar, high-salience positions \u2014 the cultural common sense of the category. Brands can\u2019t ignore this space, but differentiating here is hard.`,
                  topRight: `Emerging narratives that lean toward ${currentAxis.topLabel.toLowerCase()}. This is where new cultural stories are forming \u2014 lower salience but growing. First-mover advantage lives here. The brands that align early will look prescient.`,
                  bottomLeft: `The established ${currentAxis.bottomLabel.toLowerCase()} narratives. High salience, broad consensus \u2014 these are the table stakes. Every brand in the category speaks this language. The strategic question is whether staying here is sufficient.`,
                  bottomRight: `Frontier territory where ${currentAxis.bottomLabel.toLowerCase()} meets emergence. New conversations with no settled view. Highest risk but highest potential for distinctive positioning. This is where provocative research stimulus lives.`,
                };
                return (
                  <div style={{ padding: "22px 24px", animation: "slideRight 0.3s ease-out" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                          <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: col }} />
                          <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", letterSpacing: "0.06em", color: col }}>{isDominant ? "DOMINANT" : "EMERGENT"} {"\u00B7"} {isTop ? currentAxis.topLabel.toUpperCase() : currentAxis.bottomLabel.toUpperCase()}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Anton'", fontSize: "24px", lineHeight: 1.1, color: DM.black }}>{m.label}</h3>
                        <p style={{ fontSize: "12px", fontWeight: 300, color: col, marginTop: "4px" }}>{m.tagline}</p>
                      </div>
                      <button onClick={() => setSelectedQuadrant(null)} style={{ background: DM.grey100, border: "none", borderRadius: "4px", color: DM.grey400, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>{"\u2715"}</button>
                    </div>
                    {/* Strategic summary */}
                    <div style={{ padding: "16px 18px", borderRadius: "4px", background: DM.white, borderLeft: `3px solid ${col}`, marginBottom: "20px" }}>
                      <div style={{ fontSize: "10px", fontWeight: 600, color: col, marginBottom: "6px" }}>Strategic significance</div>
                      <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7 }}>{quadrantStrategicNotes[qk]}</p>
                    </div>
                    {/* Narratives in this quadrant */}
                    <SectionLabel>Narratives in this quadrant ({qNarratives.length})</SectionLabel>
                    {qNarratives.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                        {qNarratives.map(n => (
                          <button key={n.id} onClick={() => { setSelectedNarrative(n); setSelectedQuadrant(null); }}
                            style={{ padding: "14px 16px", background: DM.white, border: `1px solid ${DM.grey100}`, borderRadius: "4px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", display: "flex", alignItems: "flex-start", gap: "12px" }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = col + "60"} onMouseLeave={e => e.currentTarget.style.borderColor = DM.grey100}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", minWidth: "36px", flexShrink: 0 }}>
                              <span style={{ fontFamily: "'Anton'", fontSize: "16px", color: col }}>{n.salience}%</span>
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "7px", color: DM.grey400 }}>{n.salience > 50 ? "DOM" : n.salience > 25 ? "MOD" : "EMG"}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "13px", fontWeight: 600, color: DM.black, marginBottom: "3px" }}>{n.name}</div>
                              <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey600, lineHeight: 1.5 }}>{n.description.slice(0, 140)}...</div>
                              {n.emotionalRegister && (
                                <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                                  <span style={{ fontSize: "9px", color: "#EB573F", background: "#EB573F10", padding: "2px 6px", borderRadius: "3px" }}>{n.emotionalRegister.primary}</span>
                                  {n.metaphorFamily && <span style={{ fontSize: "9px", color: "#0A3A75", background: "#0A3A7510", padding: "2px 6px", borderRadius: "3px" }}>{n.metaphorFamily.primary}</span>}
                                </div>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: "20px", background: DM.grey50, borderRadius: "4px", textAlign: "center", marginBottom: "20px" }}>
                        <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey400 }}>No narratives currently positioned in this quadrant.</p>
                        <p style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, marginTop: "4px" }}>Try a different lens, or drag narratives here from the map.</p>
                      </div>
                    )}
                    {/* Key quotes from this quadrant */}
                    {(() => {
                      const allQuotes = qNarratives.flatMap(n => (n.quotes || []).map(q => ({ ...q, narrativeName: n.name }))).slice(0, 4);
                      if (!allQuotes.length) return null;
                      return (
                        <div>
                          <SectionLabel>Representative voices</SectionLabel>
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                            {allQuotes.map((q, i) => (
                              <div key={i} style={{ padding: "12px 14px", background: DM.white, borderRadius: "4px", borderLeft: `2px solid ${col}40` }}>
                                <p style={{ fontSize: "11px", fontStyle: "italic", color: DM.nearBlack, lineHeight: 1.6 }}>{"\u201C"}{q.text}{"\u201D"}</p>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                                  <span style={{ fontSize: "9px", fontWeight: 500, color: DM.grey400 }}>{q.source}</span>
                                  <MarketPill market={q.market} />
                                  <span style={{ fontSize: "8px", color: col, background: `${col}10`, padding: "1px 5px", borderRadius: "3px", marginLeft: "auto" }}>{q.narrativeName}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                    {/* ── AI Quadrant Synthesis ── */}
                    {qNarratives.length > 0 && (() => {
                      const cacheKey = `${qk}__${selectedAxisId}`;
                      const content = quadrantSynthCache[cacheKey];
                      const isLoading = quadrantSynthLoading === qk;
                      return (
                        <div style={{ marginTop: "24px", borderTop: `1px solid ${DM.grey100}`, paddingTop: "20px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: content ? "14px" : "0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: col }} />
                              <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.nearBlack, letterSpacing: "0.04em" }}>Strategic Synthesis</span>
                            </div>
                            {!content && !isLoading && (
                              <button
                                onClick={() => generateQuadrantSynthesis(qk, qNarratives)}
                                style={{ fontSize: "11px", fontWeight: 600, color: DM.white, background: col, border: "none", borderRadius: "3px", padding: "5px 12px", cursor: "pointer" }}
                              >
                                Generate →
                              </button>
                            )}
                          </div>
                          {isLoading && (
                            <div style={{ padding: "20px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ width: "14px", height: "14px", border: `2px solid ${DM.grey200}`, borderTopColor: col, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                              <span style={{ fontSize: "11px", fontWeight: 300, color: DM.grey400 }}>Generating strategic synthesis…</span>
                            </div>
                          )}
                          {content && !isLoading && (
                            <div>
                              <div style={{ background: `${col}08`, border: `1px solid ${col}30`, borderLeft: `3px solid ${col}`, borderRadius: "4px", padding: "16px 18px" }}>
                                {content.split("\n\n").filter(Boolean).map((para, i) => (
                                  <p key={i} style={{ fontSize: "12px", fontWeight: 300, color: DM.nearBlack, lineHeight: 1.75, margin: i < content.split("\n\n").filter(Boolean).length - 1 ? "0 0 14px" : "0" }}>{para}</p>
                                ))}
                              </div>
                              <button
                                onClick={() => setQuadrantSynthCache(prev => { const next = {...prev}; delete next[cacheKey]; return next; })}
                                style={{ marginTop: "8px", fontSize: "10px", color: DM.grey400, background: "none", border: "none", cursor: "pointer", padding: "0" }}
                              >
                                ↺ Regenerate
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                );
              })() : (
                <div style={{ padding: "60px 40px", textAlign: "center", color: DM.grey400 }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px", opacity: 0.2 }}>{"\u25CB"}</div>
                  <p style={{ fontSize: "13px", fontWeight: 300 }}>Click a narrative on the map to explore</p>
                  <p style={{ fontSize: "10px", fontWeight: 300, marginTop: "4px" }}>Drag to reposition {"\u00B7"} Click for detail</p>
                </div>
              )}
            </div>
          </>)}

          {/* ─── TENSIONS TAB ─── */}
          {activeView === "tensions" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                <SectionLabel>Tensions {"\u00B7"} Priority ranked</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "28px", lineHeight: 1.1, marginBottom: "6px" }}>{allTensions.length} strategic tensions</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>Drag to reorder. Click any text to edit. Tensions are ranked by evidence strength, cultural significance, and category relevance.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {allTensions.map((t, idx) => {
                    const isExpanded = expandedTension === t.id;
                    return (
                    <div key={t.id} draggable onDragStart={() => handleDragStart("tension", idx)}
                      onDragOver={e => handleDragOver(e, idx)} onDrop={() => handleDrop("tension", idx)}
                      style={{ borderRadius: "4px", border: dragOverIdx === idx && dragItemType === "tension" ? `2px solid ${DM.yellow}` : `1px solid ${DM.grey200}`, background: DM.white, cursor: "grab", transition: "border 0.15s" }}>
                      {/* Collapsed header - always visible */}
                      <div onClick={() => setExpandedTension(isExpanded ? null : t.id)}
                        style={{ padding: "18px 24px", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: "16px" }}>
                        <span style={{ fontFamily: "'Anton'", fontSize: "24px", color: DM.red, lineHeight: 1, flexShrink: 0 }}>{String(t.rank).padStart(2, "0")}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                            <EditableText value={t.forceA} onChange={v => updateTension(t.id, "forceA", v)} style={{ fontSize: "14px", fontWeight: 600, fontFamily: "'Poppins'" }} />
                            <span style={{ color: DM.grey400 }}>{"\u2194"}</span>
                            <EditableText value={t.forceB} onChange={v => updateTension(t.id, "forceB", v)} style={{ fontSize: "14px", fontWeight: 600, fontFamily: "'Poppins'" }} />
                          </div>
                          <EditableText value={t.summary} onChange={v => updateTension(t.id, "summary", v)} multiline style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, fontFamily: "'Poppins'" }} />
                        </div>
                        <span style={{ fontSize: "16px", color: DM.grey400, transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0, marginTop: "4px" }}>{"\u25BE"}</span>
                      </div>
                      {/* Expanded detail */}
                      {isExpanded && (
                        <div style={{ padding: "0 24px 20px", paddingLeft: "64px", animation: "fadeUp 0.2s ease-out" }}>
                          <div style={{ marginBottom: "10px" }}>
                            <span style={{ fontSize: "9px", fontWeight: 600, color: DM.grey400, textTransform: "uppercase", letterSpacing: "0.05em" }}>Significance</span>
                            <EditableText value={t.significance} onChange={v => updateTension(t.id, "significance", v)} multiline style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.6, fontFamily: "'Poppins'" }} />
                          </div>
                          <div style={{ marginBottom: "10px" }}>
                            <span style={{ fontSize: "9px", fontWeight: 600, color: DM.grey400, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category relevance</span>
                            <EditableText value={t.categoryRelevance} onChange={v => updateTension(t.id, "categoryRelevance", v)} multiline style={{ fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.6, fontFamily: "'Poppins'" }} />
                          </div>
                          <div style={{ padding: "12px 16px", borderRadius: "4px", background: "#FFF9DB", borderLeft: `3px solid ${DM.red}` }}>
                            <span style={{ fontSize: "9px", fontWeight: 600, color: DM.red, textTransform: "uppercase", letterSpacing: "0.05em" }}>Strategic question</span>
                            <EditableText value={t.strategicQuestion} onChange={v => updateTension(t.id, "strategicQuestion", v)} multiline style={{ fontSize: "12px", fontWeight: 400, color: DM.grey600, lineHeight: 1.6, fontStyle: "italic", fontFamily: "'Poppins'" }} />
                          </div>
                          {t.evidence?.length > 0 && (
                            <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                              {t.evidence.map((ev, i) => (
                                <div key={i} style={{ padding: "8px 12px", background: DM.grey50, borderRadius: "4px", borderLeft: `2px solid ${DM.grey200}` }}>
                                  <p style={{ fontSize: "11px", fontStyle: "italic", color: DM.nearBlack, lineHeight: 1.5 }}>{"\u201C"}{ev.text}{"\u201D"}</p>
                                  <span style={{ fontSize: "9px", color: DM.grey400 }}>{ev.source}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );})}
                </div>
              </div>
            </div>
          )}

          {/* ─── PROVOCATIONS TAB ─── */}
          {activeView === "provocations" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                <SectionLabel>Provocations for fieldwork</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "28px", lineHeight: 1.1, marginBottom: "6px" }}>{allProvocations.length} provocations</h2>
                <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "12px" }}>Grounded in discourse evidence. Framed to provoke reaction from research participants. Drag to reorder, click to edit.</p>

                {/* ── Generate bar ── */}
                <div style={{ marginBottom: "24px", borderRadius: "4px", background: DM.nearBlack, border: `2px solid ${selectedProvType ? PROV_TYPES[selectedProvType].border : DM.yellow + "30"}`, transition: "border-color 0.2s" }}>
                  {/* Step 1 — type pills */}
                  <div style={{ padding: "14px 16px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.yellow }} />
                      <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.yellow }}>AI Generate</span>
                      <span style={{ fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>{"\u2014"} Step 1: choose a provocation type</span>
                    </div>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {PROV_TYPE_KEYS.map(t => {
                        const tc = PROV_TYPES[t];
                        const isSelected = selectedProvType === t;
                        return (
                          <button key={t}
                            onClick={() => setSelectedProvType(prev => prev === t ? null : t)}
                            onMouseEnter={() => setHoveredProvType(t)}
                            onMouseLeave={() => setHoveredProvType(null)}
                            style={{ padding: "5px 10px", borderRadius: "3px", border: `1.5px solid ${isSelected ? tc.border : "rgba(255,255,255,0.2)"}`, background: isSelected ? tc.bg : "transparent", color: isSelected ? tc.text : "rgba(255,255,255,0.7)", fontFamily: "'Space Mono'", fontSize: "9px", cursor: "pointer", transition: "all 0.15s", fontWeight: isSelected ? 700 : 400 }}>
                            {t.toUpperCase()}
                          </button>
                        );
                      })}
                    </div>
                    {(hoveredProvType || selectedProvType) && (
                      <p style={{ margin: "7px 0 0", fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
                        {PROV_TYPES[hoveredProvType || selectedProvType].description}
                      </p>
                    )}
                  </div>
                  {/* Step 2 — focus input */}
                  <div style={{ padding: "0 16px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "7px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 300, color: selectedProvType ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)" }}>{"\u2014"} Step 2: describe your focus</span>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <input value={provPrompt} onChange={e => setProvPrompt(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && generateProvocation()}
                        disabled={!selectedProvType}
                        placeholder={selectedProvType ? PROV_TYPES[selectedProvType].placeholder : "Select a type above first"}
                        style={{ flex: 1, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", color: selectedProvType ? DM.white : "rgba(255,255,255,0.3)", background: selectedProvType ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)", outline: "none", cursor: selectedProvType ? "text" : "not-allowed" }} />
                      <button onClick={generateProvocation}
                        disabled={!provPrompt.trim() || provGenerating || !selectedProvType}
                        style={{ padding: "10px 20px", border: "none", borderRadius: "4px", background: provPrompt.trim() && !provGenerating && selectedProvType ? PROV_TYPES[selectedProvType].border : "rgba(255,255,255,0.1)", color: provPrompt.trim() && !provGenerating && selectedProvType ? "#fff" : "rgba(255,255,255,0.3)", fontFamily: "'Poppins'", fontSize: "11px", fontWeight: 600, cursor: provPrompt.trim() && !provGenerating && selectedProvType ? "pointer" : "default", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                        {provGenerating ? "Generating..." : "Generate \u2192"}
                      </button>
                    </div>
                  </div>
                  {provError && <p style={{ color: "#FF6B6B", fontSize: "10px", margin: "0 16px 10px" }}>{provError}</p>}
                </div>

                {/* ── Provocation cards ── */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {allProvocations.map((p, idx) => {
                    const tension = allTensions.find(t => t.id === p.tensionId);
                    const typeConfig = p.type && PROV_TYPES[p.type];
                    const isConfirmingDelete = confirmDeleteId === p.id;
                    const isTypePickerOpen = typePickerOpenId === p.id;
                    return (
                      <div key={p.id} draggable onDragStart={() => handleDragStart("provocation", idx)}
                        onDragOver={e => handleDragOver(e, idx)} onDrop={() => handleDrop("provocation", idx)}
                        style={{ padding: "18px 22px", borderRadius: "4px", border: dragOverIdx === idx && dragItemType === "provocation" ? `2px solid ${DM.yellow}` : `1px solid ${DM.grey200}`, background: DM.white, cursor: "grab", position: "relative" }}>

                        {/* Delete button */}
                        <div style={{ position: "absolute", top: "12px", right: "14px", display: "flex", alignItems: "center", gap: "6px" }}>
                          {isConfirmingDelete ? (
                            <>
                              <span style={{ fontSize: "10px", fontWeight: 500, color: DM.red }}>Delete?</span>
                              <button onClick={() => { setAllProvocations(prev => prev.filter(x => x.id !== p.id)); setConfirmDeleteId(null); }}
                                style={{ fontSize: "10px", fontWeight: 700, color: DM.red, background: "#FFE8E8", border: `1px solid ${DM.red}`, borderRadius: "3px", padding: "2px 8px", cursor: "pointer" }}>YES</button>
                              <button onClick={() => setConfirmDeleteId(null)}
                                style={{ fontSize: "10px", fontWeight: 700, color: DM.grey600, background: DM.grey100, border: `1px solid ${DM.grey200}`, borderRadius: "3px", padding: "2px 8px", cursor: "pointer" }}>NO</button>
                            </>
                          ) : (
                            <button onClick={() => setConfirmDeleteId(p.id)}
                              style={{ fontSize: "14px", color: DM.grey400, background: "none", border: "none", cursor: "pointer", lineHeight: 1, padding: "0 2px" }} title="Delete">×</button>
                          )}
                        </div>

                        {/* Card header row */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px", paddingRight: "60px", flexWrap: "wrap" }}>
                          {tension && <TensionPill rank={tension.rank} />}
                          {p._generated && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "2px 6px", borderRadius: "3px" }}>AI</span>}

                          {/* Type tag */}
                          {isTypePickerOpen ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
                              {PROV_TYPE_KEYS.map(t => (
                                <button key={t} onClick={() => { updateProvocation(p.id, "type", t); setTypePickerOpenId(null); }}
                                  style={{ padding: "2px 8px", borderRadius: "3px", border: `1.5px solid ${PROV_TYPES[t].border}`, background: PROV_TYPES[t].bg, color: PROV_TYPES[t].text, fontFamily: "'Space Mono'", fontSize: "8px", cursor: "pointer", fontWeight: p.type === t ? 700 : 400 }}>
                                  {t}
                                </button>
                              ))}
                              <button onClick={() => setTypePickerOpenId(null)}
                                style={{ fontSize: "12px", color: DM.grey400, background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}>✕</button>
                            </div>
                          ) : typeConfig ? (
                            <button onClick={() => setTypePickerOpenId(p.id)}
                              style={{ padding: "2px 8px", borderRadius: "3px", border: `1.5px solid ${typeConfig.border}`, background: typeConfig.bg, color: typeConfig.text, fontFamily: "'Space Mono'", fontSize: "8px", cursor: "pointer" }}
                              title="Click to change type">
                              {p.type}
                            </button>
                          ) : (
                            <button onClick={() => setTypePickerOpenId(p.id)}
                              style={{ padding: "2px 8px", borderRadius: "3px", border: `1.5px dashed ${DM.grey200}`, background: "transparent", color: DM.grey400, fontFamily: "'Space Mono'", fontSize: "8px", cursor: "pointer" }}>
                              + type
                            </button>
                          )}

                          <div style={{ flex: 1 }}>
                            <EditableText value={p.title} onChange={v => updateProvocation(p.id, "title", v)} style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.4, fontFamily: "'Poppins'" }} />
                          </div>
                        </div>

                        <div style={{ paddingLeft: "0" }}>
                          <EditableText value={p.text} onChange={v => updateProvocation(p.id, "text", v)} multiline style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "8px", fontFamily: "'Poppins'" }} />
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                            <span style={{ fontSize: "10px", fontWeight: 500, color: DM.grey400, flexShrink: 0 }}>Evidence:</span>
                            <EditableText value={p.evidence} onChange={v => updateProvocation(p.id, "evidence", v)} style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, lineHeight: 1.5, fontFamily: "'Poppins'" }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => {
                  const newId = Math.max(0, ...allProvocations.map(p => p.id)) + 1;
                  setAllProvocations(prev => [...prev, { id: newId, tensionId: allTensions[0]?.id || 1, type: selectedProvType || null, title: "New provocation question?", text: "Description...", evidence: "Source..." }]);
                }} style={{ marginTop: "16px", width: "100%", padding: "12px", border: `1.5px dashed ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins'", fontSize: "12px", cursor: "pointer" }}>+ Add provocation manually</button>
              </div>
            </div>
          )}


          {/* ─── STRATEGIC NARRATIVE TAB ─── */}
          {activeView === "narrative" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                {/* AI Refine */}
                <div style={{ marginBottom: "28px", padding: "16px 20px", borderRadius: "4px", background: DM.nearBlack, border: `1px solid ${DM.yellow}30` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.yellow }} />
                    <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.yellow }}>AI Refine</span>
                    <span style={{ fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>{"\u2014"} describe how you want the narrative changed</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input value={refinePrompt} onChange={e => setRefinePrompt(e.target.value)} onKeyDown={e => e.key === "Enter" && refineNarrative()}
                      placeholder={'e.g. "Make it more provocative" \u2022 "Reframe for a CMO audience"'}
                      style={{ flex: 1, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", color: DM.white, background: "rgba(255,255,255,0.06)", outline: "none" }} />
                    <button onClick={refineNarrative} disabled={!refinePrompt.trim() || refining}
                      style={{ padding: "10px 20px", border: "none", borderRadius: "4px", background: refinePrompt.trim() && !refining ? DM.yellow : "rgba(255,255,255,0.1)", color: refinePrompt.trim() && !refining ? DM.black : "rgba(255,255,255,0.3)", fontFamily: "'Poppins'", fontSize: "11px", fontWeight: 600, cursor: refinePrompt.trim() && !refining ? "pointer" : "default", whiteSpace: "nowrap" }}>
                      {refining ? "Refining..." : "Refine \u2192"}
                    </button>
                  </div>
                  {refineError && <p style={{ color: "#FF6B6B", fontSize: "10px", marginTop: "6px" }}>{refineError}</p>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                  <SectionLabel>Strategic narrative</SectionLabel>
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, background: DM.grey50, padding: "2px 8px", borderRadius: "3px" }}>Lens: {currentAxis.name}</span>
                  {currentAxis._custom && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "2px 6px", borderRadius: "3px" }}>Custom</span>}
                  <span style={{ fontSize: "9px", fontWeight: 300, color: DM.grey400, marginLeft: "auto" }}>Click any text to edit directly</span>
                </div>
                {editingField === "headline" ? (
                  <textarea autoFocus value={currentAxis.narrative.headline} onChange={e => updateNarrative("headline", e.target.value)} onBlur={() => setEditingField(null)} onKeyDown={e => e.key === "Escape" && setEditingField(null)}
                    style={{ fontFamily: "'Anton'", fontSize: "30px", color: DM.black, lineHeight: 1.15, marginBottom: "28px", width: "100%", border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "8px 12px", background: "#FFFCE8", resize: "vertical", outline: "none" }} />
                ) : (
                  <h2 onClick={() => setEditingField("headline")} style={{ fontFamily: "'Anton'", fontSize: "30px", lineHeight: 1.15, marginBottom: "28px", maxWidth: "620px", cursor: "text", borderRadius: "4px", padding: "8px 12px", margin: "-8px -12px 20px", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FFFCE808"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {currentAxis.narrative.headline}
                  </h2>
                )}
                {editingField === "summary" ? (
                  <textarea autoFocus value={currentAxis.narrative.summary} onChange={e => updateNarrative("summary", e.target.value)} onBlur={() => setEditingField(null)} onKeyDown={e => e.key === "Escape" && setEditingField(null)} rows={16}
                    style={{ width: "100%", fontSize: "13px", fontWeight: 300, color: DM.grey600, lineHeight: 1.75, fontFamily: "'Poppins'", border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "16px", background: "#FFFCE8", resize: "vertical", outline: "none", marginBottom: "32px" }} />
                ) : (
                  <div onClick={() => setEditingField("summary")} style={{ columnCount: 2, columnGap: "32px", marginBottom: "32px", cursor: "text", borderRadius: "4px", padding: "12px 16px", margin: "-12px -16px 20px", transition: "background 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FFFCE808"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    {currentAxis.narrative.summary.split("\n\n").map((para, i) => (
                      <p key={i} style={{ fontSize: "13px", fontWeight: 300, color: DM.grey600, lineHeight: 1.75, marginBottom: "16px", breakInside: "avoid" }}>{para}</p>
                    ))}
                  </div>
                )}
                <div style={{ padding: "20px 24px", borderRadius: "4px", background: "#FFF9DB", borderLeft: `3px solid ${DM.yellow}`, marginBottom: "36px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 600, marginBottom: "8px" }}>Key strategic tension</div>
                  {editingField === "keyTension" ? (
                    <textarea autoFocus value={currentAxis.narrative.keyTension} onChange={e => updateNarrative("keyTension", e.target.value)} onBlur={() => setEditingField(null)} onKeyDown={e => e.key === "Escape" && setEditingField(null)} rows={3}
                      style={{ width: "100%", fontSize: "14px", fontWeight: 400, color: DM.grey600, lineHeight: 1.7, fontFamily: "'Poppins'", border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "8px 12px", background: DM.white, resize: "vertical", outline: "none" }} />
                  ) : (
                    <p onClick={() => setEditingField("keyTension")} style={{ fontSize: "14px", fontWeight: 400, color: DM.grey600, lineHeight: 1.7, cursor: "text", borderRadius: "4px", padding: "4px 8px", margin: "-4px -8px", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.5)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      {currentAxis.narrative.keyTension}
                    </p>
                  )}
                </div>
                {/* Narrative salience bars */}
                <SectionLabel>Narrative salience</SectionLabel>
                <div style={{ padding: "22px", borderRadius: "4px", background: DM.grey50 }}>
                  {[...narratives].sort((a, b) => b.salience - a.salience).map((n, i) => {
                    const qk = getQ(n.x, n.y ?? 0.5);
                    return (
                      <div key={n.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "7px 0", borderBottom: i < narratives.length - 1 ? `1px solid ${DM.grey100}` : "none" }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey200, width: "16px", textAlign: "right" }}>{i + 1}</span>
                        <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: Q_COLORS[qk] }} />
                        <span style={{ fontSize: "12px", fontWeight: 500, width: "160px" }}>{n.name}</span>
                        <div style={{ flex: 1, height: "3px", background: DM.grey100, borderRadius: "2px" }}><div style={{ width: `${n.salience}%`, height: "100%", background: Q_COLORS[qk], opacity: 0.5, borderRadius: "2px" }} /></div>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", color: DM.grey600, width: "32px", textAlign: "right" }}>{n.salience}%</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: `1px solid ${DM.grey100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <DmLogo height={14} />
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>Cultural Discourse Analysis {"\u00B7"} Confidential</span>
                </div>
              </div>
            </div>
          )}

          {/* ─── SOURCES TAB ─── */}
          {activeView === "sources" && (
            <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
              <div style={{ maxWidth: "780px", margin: "0 auto", animation: "fadeUp 0.4s ease-out" }}>
                <SectionLabel>Corpus registry</SectionLabel>
                <h2 style={{ fontFamily: "'Anton'", fontSize: "28px", lineHeight: 1.1, marginBottom: "6px" }}>{allSources.length} sources</h2>
                {meta?.corpusNotes && <p style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600, lineHeight: 1.65, marginBottom: "24px" }}>{meta.corpusNotes}</p>}
                {(() => {
                  const grouped = {};
                  allSources.forEach(s => { if (!grouped[s.type]) grouped[s.type] = []; grouped[s.type].push(s); });
                  return Object.entries(grouped).map(([type, sources]) => (
                    <div key={type} style={{ marginBottom: "28px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "8px", borderBottom: `1px solid ${DM.grey100}`, marginBottom: "8px" }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>{type}</span>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey400 }}>({sources.length})</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {sources.map(s => {
                          const isOpen = expandedPassageId === `src-${s.id}`;
                          return (
                            <div key={s.id} style={{ borderRadius: "4px", border: `1px solid ${isOpen ? DM.yellow : DM.grey100}`, background: DM.white, overflow: "hidden", transition: "border-color 0.15s" }}>
                              {/* Source header row */}
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px" }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <span style={{ fontSize: "11px", fontWeight: 600, color: DM.nearBlack }}>{s.title}</span>
                                  <div style={{ fontSize: "9px", color: DM.grey400, marginTop: "2px" }}>{s.author} · {s.date}</div>
                                </div>
                                <MarketPill market={s.market} />
                                {s.passage ? (
                                  <button
                                    onClick={() => setExpandedPassageId(isOpen ? null : `src-${s.id}`)}
                                    style={{ fontSize: "9px", fontWeight: 600, color: isOpen ? DM.nearBlack : DM.grey400, background: isOpen ? DM.yellow : DM.grey100, border: "none", borderRadius: "3px", padding: "4px 10px", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s", flexShrink: 0 }}
                                  >
                                    {isOpen ? "↑ Close" : "Read passage →"}
                                  </button>
                                ) : (
                                  <span style={{ fontSize: "9px", color: DM.grey200, flexShrink: 0 }}>No passage</span>
                                )}
                              </div>
                              {/* Passage expand */}
                              {isOpen && s.passage && (
                                <div style={{ borderTop: `1px solid ${DM.grey100}`, padding: "16px 14px 18px", background: "#FFFDF0" }}>
                                  <p style={{ fontSize: "12px", fontWeight: 300, color: DM.nearBlack, lineHeight: 1.8, margin: "0 0 12px" }}>{s.passage}</p>
                                  {s.passageNote && (
                                    <p style={{ fontSize: "10px", fontWeight: 400, color: DM.grey400, lineHeight: 1.5, fontStyle: "italic", margin: "0 0 12px", borderTop: `1px solid ${DM.grey100}`, paddingTop: "10px" }}>{s.passageNote}</p>
                                  )}
                                  <div style={{ display: "flex", alignItems: "center", gap: "8px", borderTop: `1px solid ${DM.grey100}`, paddingTop: "10px" }}>
                                    <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400, textTransform: "uppercase" }}>{s.type} · {s.market}</span>
                                    {s.url && (
                                      <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", fontSize: "9px", color: DM.grey400, textDecoration: "underline" }}>View original ↗</a>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
                {/* Known Gaps - collapsed */}
                {meta?.gaps?.length > 0 && (
                  <div style={{ marginTop: "40px", borderTop: `1px solid ${DM.grey100}`, paddingTop: "20px" }}>
                    <button onClick={() => setShowGaps(!showGaps)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                      <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey400 }}>Known gaps</span>
                      {!showGaps && <span style={{ fontSize: "9px", fontStyle: "italic", color: DM.grey400, opacity: 0.7 }}>click to expand</span>}
                      <span style={{ fontSize: "14px", color: DM.grey400, transform: showGaps ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>{"\u25BE"}</span>
                    </button>
                    {showGaps && (
                      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "4px" }}>
                        {meta.gaps.map((gap, i) => (
                          <div key={i} style={{ padding: "8px 12px", background: DM.grey50, borderRadius: "4px", borderLeft: `2px solid ${DM.grey200}`, fontSize: "11px", fontWeight: 300, color: DM.grey600, lineHeight: 1.5 }}>{gap}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div style={{ marginTop: "48px", paddingTop: "20px", borderTop: `1px solid ${DM.grey100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <DmLogo height={14} />
                  <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.grey400 }}>Cultural Discourse Analysis {"\u00B7"} {meta?.client} {"\u00B7"} {meta?.territory}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ─── EXPORT DRAWER ─── */}
        {showExport && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", justifyContent: "flex-end" }} onClick={e => e.target === e.currentTarget && setShowExport(false)}>
            <div style={{ width: "420px", background: DM.white, display: "flex", flexDirection: "column", boxShadow: "-4px 0 24px rgba(0,0,0,0.12)", animation: "slideRight 0.25s ease-out" }}>
              <div style={{ padding: "22px 24px 16px", borderBottom: `1px solid ${DM.grey100}`, flexShrink: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h2 style={{ fontFamily: "'Anton'", fontSize: "22px", marginBottom: "3px" }}>Export as PowerPoint</h2>
                    <p style={{ fontSize: "11px", fontWeight: 300, color: DM.grey400 }}>Select what to include in the deck</p>
                  </div>
                  <button onClick={() => setShowExport(false)} style={{ background: DM.grey100, border: "none", borderRadius: "4px", color: DM.grey400, padding: "6px 10px", cursor: "pointer", fontSize: "12px" }}>{"✕"}</button>
                </div>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                {/* Always included */}
                <div style={{ marginBottom: "22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: DM.yellow }} />
                    <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>Always included</span>
                  </div>
                  {[{ label: "Cover slide", detail: [(meta?.territory || ""), (meta?.client || "")].filter(Boolean).join(" · ") }, { label: "Landscape Map", detail: `${narratives.length} narratives · ${currentAxis?.name || ""} lens` }].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", marginBottom: "4px", borderRadius: "4px", background: DM.grey50, border: `1px solid ${DM.grey100}` }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: DM.yellow, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "9px", color: DM.black, fontWeight: 700 }}>{"✓"}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 500 }}>{item.label}</div>
                        <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400 }}>{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Tensions */}
                {allTensions.length > 0 && (
                  <div style={{ marginBottom: "22px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: DM.red }} />
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>Tension cards</span>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => setExportTensions(new Set(allTensions.map(t => t.id)))} style={{ fontSize: "9px", color: DM.grey400, border: "none", background: "none", cursor: "pointer", textDecoration: "underline" }}>all</button>
                        <button onClick={() => setExportTensions(new Set())} style={{ fontSize: "9px", color: DM.grey400, border: "none", background: "none", cursor: "pointer", textDecoration: "underline" }}>none</button>
                      </div>
                    </div>
                    {allTensions.map(t => (
                      <div key={t.id} onClick={() => setExportTensions(prev => { const n = new Set(prev); n.has(t.id) ? n.delete(t.id) : n.add(t.id); return n; })}
                        style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", marginBottom: "4px", borderRadius: "4px", background: exportTensions.has(t.id) ? "#FFF9DB" : DM.grey50, border: `1px solid ${exportTensions.has(t.id) ? DM.yellow : DM.grey100}`, cursor: "pointer", transition: "all 0.15s" }}>
                        <div style={{ width: "14px", height: "14px", borderRadius: "3px", marginTop: "1px", flexShrink: 0, background: exportTensions.has(t.id) ? DM.yellow : DM.white, border: `1.5px solid ${exportTensions.has(t.id) ? DM.yellow : DM.grey200}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {exportTensions.has(t.id) && <span style={{ fontSize: "9px", color: DM.black, fontWeight: 700 }}>{"✓"}</span>}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "11px", fontWeight: 600, color: DM.nearBlack }}>
                            <span style={{ color: DM.red, fontFamily: "'Space Mono'", fontSize: "9px", marginRight: "6px" }}>{String(t.rank).padStart(2, "0")}</span>
                            {t.forceA} {"↔"} {t.forceB}
                          </div>
                          <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.summary}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Provocations */}
                {allProvocations.length > 0 && (
                  <div style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: "#0A3A75" }} />
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>Provocations</span>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button onClick={() => setExportProvocations(new Set(allProvocations.map(p => p.id)))} style={{ fontSize: "9px", color: DM.grey400, border: "none", background: "none", cursor: "pointer", textDecoration: "underline" }}>all</button>
                        <button onClick={() => setExportProvocations(new Set())} style={{ fontSize: "9px", color: DM.grey400, border: "none", background: "none", cursor: "pointer", textDecoration: "underline" }}>none</button>
                      </div>
                    </div>
                    <p style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, marginBottom: "8px" }}>Tick the ones you're taking into fieldwork.</p>
                    {allProvocations.map(p => {
                      const tension = allTensions.find(t => t.id === p.tensionId);
                      return (
                        <div key={p.id} onClick={() => setExportProvocations(prev => { const n = new Set(prev); n.has(p.id) ? n.delete(p.id) : n.add(p.id); return n; })}
                          style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", marginBottom: "4px", borderRadius: "4px", background: exportProvocations.has(p.id) ? "#EBF0FF" : DM.grey50, border: `1px solid ${exportProvocations.has(p.id) ? "#0A3A75" : DM.grey100}`, cursor: "pointer", transition: "all 0.15s" }}>
                          <div style={{ width: "14px", height: "14px", borderRadius: "3px", marginTop: "1px", flexShrink: 0, background: exportProvocations.has(p.id) ? "#0A3A75" : DM.white, border: `1.5px solid ${exportProvocations.has(p.id) ? "#0A3A75" : DM.grey200}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {exportProvocations.has(p.id) && <span style={{ fontSize: "9px", color: DM.white, fontWeight: 700 }}>{"✓"}</span>}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            {tension && <div style={{ fontSize: "8px", color: DM.red, fontFamily: "'Space Mono'", marginBottom: "2px" }}>T{tension.rank}</div>}
                            <div style={{ fontSize: "11px", fontWeight: 500, color: DM.nearBlack, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Strategic Narrative toggle */}
                <div style={{ marginBottom: "22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: DM.yellow }} />
                    <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>Strategic Narrative</span>
                  </div>
                  <div onClick={() => setExportNarrative(v => !v)}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "4px", background: exportNarrative ? "#FFF9DB" : DM.grey50, border: `1px solid ${exportNarrative ? DM.yellow : DM.grey100}`, cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ width: "14px", height: "14px", borderRadius: "3px", flexShrink: 0, background: exportNarrative ? DM.yellow : DM.white, border: `1.5px solid ${exportNarrative ? DM.yellow : DM.grey200}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {exportNarrative && <span style={{ fontSize: "9px", color: DM.black, fontWeight: 700 }}>{"\u2713"}</span>}
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 500 }}>Strategic Narrative</div>
                      <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400 }}>Headline, summary paragraphs, key tension{currentAxis ? ` \u00B7 ${currentAxis.name} lens` : ""}</div>
                    </div>
                  </div>
                </div>
                {/* Sources toggle */}
                {allSources.length > 0 && (
                  <div style={{ marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "2px", background: DM.grey400 }} />
                      <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>Sources</span>
                    </div>
                    <div onClick={() => setExportSources(v => !v)}
                      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "4px", background: exportSources ? "#F0F4FF" : DM.grey50, border: `1px solid ${exportSources ? "#0A3A75" : DM.grey100}`, cursor: "pointer", transition: "all 0.15s" }}>
                      <div style={{ width: "14px", height: "14px", borderRadius: "3px", flexShrink: 0, background: exportSources ? "#0A3A75" : DM.white, border: `1.5px solid ${exportSources ? "#0A3A75" : DM.grey200}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {exportSources && <span style={{ fontSize: "9px", color: DM.white, fontWeight: 700 }}>{"\u2713"}</span>}
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", fontWeight: 500 }}>Corpus Registry</div>
                        <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400 }}>{allSources.length} sources grouped by type</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Footer */}
              <div style={{ padding: "16px 24px", borderTop: `1px solid ${DM.grey100}`, flexShrink: 0, background: DM.grey50 }}>
                <div style={{ fontSize: "10px", fontWeight: 300, color: DM.grey400, marginBottom: "10px" }}>
                  {2 + exportTensions.size + (exportProvocations.size > 0 ? exportProvocations.size + 1 : 0) + (exportNarrative ? 1 : 0) + (exportSources ? 1 : 0)} slides total
                  {exportTensions.size > 0 && ` · ${exportTensions.size} tension${exportTensions.size > 1 ? "s" : ""}`}
                  {exportProvocations.size > 0 && ` · ${exportProvocations.size} provocation${exportProvocations.size > 1 ? "s" : ""}`}
                  {exportNarrative && " · narrative"}
                  {exportSources && " · sources"}
                </div>
                <button onClick={generatePPT} disabled={exporting}
                  style={{ width: "100%", padding: "13px", border: "none", borderRadius: "4px", background: !exporting ? DM.black : DM.grey200, color: !exporting ? DM.white : DM.grey400, fontFamily: "'Anton'", fontSize: "14px", cursor: !exporting ? "pointer" : "default", letterSpacing: "0.06em", marginBottom: "8px" }}>
                  {exporting ? "Generating..." : "Export as PowerPoint \u2192"}
                </button>
                <button onClick={generateHTML} disabled={exporting}
                  style={{ width: "100%", padding: "10px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", background: DM.white, color: DM.grey400, fontFamily: "'Space Mono'", fontSize: "10px", cursor: "pointer", letterSpacing: "0.04em" }}>
                  Export as HTML (paste into PPT) {"\u2192"}
                </button>
              </div>
            </div>
          </div>
        )}
      </>)}
    </div>
  );
}

export default DiscourseExplorer;
