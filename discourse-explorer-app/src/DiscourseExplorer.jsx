import { useState, useCallback, useRef, useEffect, useMemo } from "react";

const DM_LOGO_SRC = "data:image/jpeg;base64,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";
const DmLogo = ({ height = 22 }) => (
  <img src={DM_LOGO_SRC} alt="d+m" style={{ height: `${height}px`, display: "block" }} />
);

const DM = {
  yellow: "#FFD900", black: "#111111", nearBlack: "#1A1A1A",
  grey600: "#555555", grey400: "#999999", grey200: "#D4D4D4", grey100: "#EEEEEE", grey50: "#F7F7F7",
  white: "#FFFFFF", red: "#DB2B39",
};
const Q_COLORS = { topLeft: "#0A3A75", topRight: "#2A8C51", bottomLeft: "#999999", bottomRight: "#EB573F" };

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
  { id: 1, tensionId: 1, title: "What if empowerment meant needing the bank less?", text: "If the only time clients describe feeling empowered is when they leave, perhaps genuine empowerment means helping clients outgrow your services \u2014 and trusting they\u2019ll come back for the next level.", evidence: "Empowerment Exit narrative \u2014 clients consistently describe self-directed platforms as liberating." },
  { id: 2, tensionId: 1, title: "When clients say they want \u2018control,\u2019 what are they actually asking to control?", text: "The empowerment discourse is saturated with control language. But control of what? Investments? Fees? The relationship itself? Unpacking this reveals whether empowerment is about financial capability or relational autonomy.", evidence: "Linguistic analysis across r/FIREUK and r/fatFIRE \u2014 \u2018control\u2019 appears 3x more often than \u2018growth\u2019 in trust contexts." },
  { id: 3, tensionId: 2, title: "Could heritage be reframed as proof of adaptability rather than proof of endurance?", text: "The heritage narrative currently says \u2018we\u2019ve survived.\u2019 But survival is passive. What if 150 years of history was evidence of radical reinvention \u2014 the trust credential becoming \u2018we\u2019ve changed more than anyone\u2019?", evidence: "Heritage Authority narrative \u2014 positive heritage references correlate with Asian markets; negative with UK/US digital-native segments." },
  { id: 4, tensionId: 3, title: "What if the most trusted banker in 2030 isn\u2019t a person?", text: "Algorithmic Trust is a frontier signal, but it\u2019s growing. The first institution to make AI-mediated advice feel personally trustworthy \u2014 warm, not cold \u2014 may redefine the category.", evidence: "Algorithmic Trust narrative \u2014 FT Alphaville and Reddit discourse on AI vs. human adviser trust." },
  { id: 5, tensionId: 4, title: "Does showing everything make a premium bank feel less premium?", text: "Radical transparency is the emerging trust baseline. But premium positioning has historically relied on mystique and exclusivity. The provocation: can you be fully transparent and still feel aspirational?", evidence: "Transparency Imperative and Heritage Authority narratives \u2014 conflicting trust signals across segments." },
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

function buildProvocationPrompt(tensions, narratives, meta, userPrompt) {
  const ts = tensions.map(t => `T${t.rank}: ${t.forceA} \u2194 ${t.forceB} \u2014 ${t.summary}`).join("\n");
  return `You are a discourse strategist for d+m. Generate a fieldwork provocation for ${meta.client}'s "${meta.territory}" territory.

TENSIONS:
${ts}

THE STRATEGIST ASKS:
"${userPrompt}"

${DISCOURSE_NARRATIVE_VOICE}

Return ONLY a JSON object (no markdown, no fences):
{
  "tensionId": <id of most relevant tension>,
  "title": "A single-sentence question that would provoke discussion in fieldwork",
  "text": "2-3 sentences expanding the provocation",
  "evidence": "Brief citation grounding it in the analysis"
}

The title MUST be a single-sentence question. Not a two-part tension format.`;
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

  const [editingId, setEditingId] = useState(null);
  const [editingKey, setEditingKey] = useState(null);
  const [dragItemType, setDragItemType] = useState(null);
  const [dragIdx, setDragIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);
  const [showGaps, setShowGaps] = useState(false);
  const [expandedTension, setExpandedTension] = useState(null);

  const mapRef = useRef(null);
  const fileRef = useRef(null);

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
    if (!provPrompt.trim() || provGenerating) return;
    setProvGenerating(true); setProvError("");
    try {
      const prompt = buildProvocationPrompt(allTensions, allNarratives, meta, provPrompt.trim());
      const res = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const result = await res.json();
      const text = result.content?.map(b => b.text || "").join("") || "";
      const prov = JSON.parse(text.replace(/```json|```/g, "").trim());
      prov.id = Math.max(0, ...allProvocations.map(p => p.id)) + 1;
      prov._generated = true;
      setAllProvocations(prev => [...prev, prov]);
      setProvPrompt("");
    } catch (err) { setProvError("Failed: " + err.message); }
    setProvGenerating(false);
  }, [provPrompt, provGenerating, allTensions, allNarratives, meta, allProvocations]);

  // Refine narrative
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
          <div style={{ background: DM.white, border: `2px solid ${DM.yellow}`, borderRadius: "4px", padding: "44px 48px", maxWidth: "540px", width: "92%", animation: "onboard 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
            <div style={{ marginBottom: "20px" }}><DmLogo height={28} /></div>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "28px", color: DM.black, marginBottom: "12px", lineHeight: 1.1 }}>Discourse Explorer</h2>
            <p style={{ fontSize: "13px", fontWeight: 300, color: DM.grey600, lineHeight: 1.7, marginBottom: "28px" }}>
              Upload a discourse analysis JSON, choose your strategic lens, and explore the cultural landscape of your territory.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "32px" }}>
              {[
                { label: "Analyse", desc: "Start in the Claude chat Discourse Project to generate research prompts, then run them in Perplexity & Gemini" },
                { label: "Generate", desc: "Feed the research documents back to Claude Cowork to run analysis and produce the Explorer JSON" },
                { label: "Explore", desc: "Upload the JSON to this Explorer to choose your lens and explore the 2\u00D72" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px", background: "#FFF9DB", borderRadius: "4px" }}>
                  <div style={{ width: "5px", height: "5px", background: DM.yellow, flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", fontWeight: 600, color: DM.black }}>{item.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 300, color: DM.grey600 }}>{"\u2014"} {item.desc}</span>
                </div>
              ))}
            </div>
            <button onClick={() => fileRef.current?.click()} style={{ width: "100%", padding: "14px", border: "none", borderRadius: "4px", background: DM.yellow, color: DM.black, fontFamily: "'Anton', sans-serif", fontSize: "14px", cursor: "pointer", marginBottom: "10px" }}>Upload analysis JSON {"\u2192"}</button>
            <button onClick={loadDemo} style={{ width: "100%", padding: "10px", border: `1.5px solid ${DM.grey200}`, borderRadius: "4px", background: "transparent", color: DM.grey400, fontFamily: "'Poppins', sans-serif", fontSize: "11px", cursor: "pointer" }}>View demo with sample data</button>
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
                <div style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>Dominant</div>
                <div style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%) rotate(90deg)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>Emergent</div>
                <div style={{ position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>{currentAxis.topLabel}</div>
                <div style={{ position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Anton'", fontSize: "10px", letterSpacing: "0.1em", color: DM.grey200 }}>{currentAxis.bottomLabel}</div>
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
                          {n.quotes.map((q, i) => (
                            <div key={i} style={{ padding: "12px 14px", background: DM.white, borderRadius: "4px", borderLeft: `2px solid ${DM.grey200}` }}>
                              <p style={{ fontSize: "12px", fontStyle: "italic", color: DM.nearBlack, lineHeight: 1.6 }}>{"\u201C"}{q.text}{"\u201D"}</p>
                              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                                <span style={{ fontSize: "10px", fontWeight: 500, color: DM.grey400 }}>{q.source}</span>
                                <MarketPill market={q.market} />
                              </div>
                            </div>
                          ))}
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
                {/* AI Generate bar */}
                <div style={{ marginBottom: "24px", padding: "16px 20px", borderRadius: "4px", background: DM.nearBlack, border: `1px solid ${DM.yellow}30` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: DM.yellow }} />
                    <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.yellow }}>AI Generate</span>
                    <span style={{ fontSize: "10px", fontWeight: 300, color: "rgba(255,255,255,0.4)" }}>{"\u2014"} describe what you want to provoke</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input value={provPrompt} onChange={e => setProvPrompt(e.target.value)} onKeyDown={e => e.key === "Enter" && generateProvocation()}
                      placeholder={'e.g. "A provocation about digital trust for Gen Z" \u2022 "Something about heritage vs. innovation"'}
                      style={{ flex: 1, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", fontFamily: "'Poppins'", fontSize: "12px", color: DM.white, background: "rgba(255,255,255,0.06)", outline: "none" }} />
                    <button onClick={generateProvocation} disabled={!provPrompt.trim() || provGenerating}
                      style={{ padding: "10px 20px", border: "none", borderRadius: "4px", background: provPrompt.trim() && !provGenerating ? DM.yellow : "rgba(255,255,255,0.1)", color: provPrompt.trim() && !provGenerating ? DM.black : "rgba(255,255,255,0.3)", fontFamily: "'Poppins'", fontSize: "11px", fontWeight: 600, cursor: provPrompt.trim() && !provGenerating ? "pointer" : "default", whiteSpace: "nowrap" }}>
                      {provGenerating ? "Generating..." : "Generate \u2192"}
                    </button>
                  </div>
                  {provError && <p style={{ color: "#FF6B6B", fontSize: "10px", marginTop: "6px" }}>{provError}</p>}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {allProvocations.map((p, idx) => {
                    const tension = allTensions.find(t => t.id === p.tensionId);
                    return (
                      <div key={p.id} draggable onDragStart={() => handleDragStart("provocation", idx)}
                        onDragOver={e => handleDragOver(e, idx)} onDrop={() => handleDrop("provocation", idx)}
                        style={{ padding: "18px 22px", borderRadius: "4px", border: dragOverIdx === idx && dragItemType === "provocation" ? `2px solid ${DM.yellow}` : `1px solid ${DM.grey200}`, background: DM.white, cursor: "grab" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "8px" }}>
                          {tension && <TensionPill rank={tension.rank} />}
                          {p._generated && <span style={{ fontFamily: "'Space Mono'", fontSize: "8px", color: DM.yellow, background: "#FFF9DB", padding: "2px 6px", borderRadius: "3px" }}>AI</span>}
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
                  setAllProvocations(prev => [...prev, { id: newId, tensionId: allTensions[0]?.id || 1, title: "New provocation question?", text: "Description...", evidence: "Source..." }]);
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
                    <div key={type} style={{ marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "8px", borderBottom: `1px solid ${DM.grey100}`, marginBottom: "8px" }}>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: DM.grey600 }}>{type}</span>
                        <span style={{ fontFamily: "'Space Mono'", fontSize: "9px", color: DM.grey400 }}>({sources.length})</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {sources.map(s => (
                          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "4px", background: DM.grey50 }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontSize: "11px", fontWeight: 500, color: DM.nearBlack }}>{s.title}</span>
                              <div style={{ fontSize: "9px", color: DM.grey400, marginTop: "2px" }}>{s.author} {"\u00B7"} {s.date}</div>
                            </div>
                            <MarketPill market={s.market} />
                          </div>
                        ))}
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
      </>)}
    </div>
  );
}

export default DiscourseExplorer;
