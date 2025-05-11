
import { NewsItemProps } from '@/components/NewsCard';

export const mockNews: NewsItemProps[] = [
  {
    id: '1',
    title: 'Copenhagen Named Europe\'s Most Sustainable City for Third Year',
    summary: 'The Danish capital has once again topped the list of sustainable European cities, thanks to its innovative green initiatives and commitment to carbon neutrality by 2025.',
    category: 'Top News',
    imageUrl: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?q=80&w=2070&auto=format&fit=crop',
    fullStory: `Copenhagen has been named Europe's most sustainable city for the third consecutive year in the annual European Green City Index. The Danish capital's ambitious climate plan, which aims to make it carbon-neutral by 2025, continues to be a benchmark for urban sustainability worldwide.

    The city's extensive cycling infrastructure, with over 350km of dedicated bike lanes, allows 62% of residents to commute by bicycle daily. Additionally, Copenhagen's district heating system now runs on nearly 80% renewable energy sources, primarily wind and biomass.

    "We're honored by this recognition, but our work is far from complete," said Copenhagen's Mayor. "With rising sea levels and more extreme weather events, we must accelerate our efforts towards complete carbon neutrality."

    The city's next major initiatives include expanding its floating solar panel program on harbor waters and converting its public bus fleet to be entirely electric by 2024.`
  },
  {
    id: '2',
    title: 'Danish Tech Startup Raises €50 Million for Revolutionary Wind Turbine Design',
    summary: 'A Copenhagen-based renewable energy startup has secured major funding for their innovative floating wind turbine technology that promises to reduce installation costs by 40%.',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2070&auto=format&fit=crop',
    fullStory: `WindSphere, a Danish renewable energy startup based in Copenhagen, has successfully closed a €50 million Series B funding round led by Nordic Green Ventures, with participation from several European clean energy investors.

    The company's revolutionary floating wind turbine design allows for installation in deeper waters without the need for expensive fixed foundations, potentially reducing installation costs by up to 40% compared to traditional offshore wind farms.

    "This funding will accelerate our path to commercial deployment," said WindSphere CEO Marie Larsen. "We've spent four years perfecting the technology, and now we're ready to demonstrate its capabilities at scale."

    The company plans to deploy its first commercial-scale 15MW prototype off the coast of Bornholm next year, with plans for a 200MW wind farm by 2027 if testing proves successful. The technology could be particularly valuable for countries with deep coastal waters that have been unable to fully capitalize on offshore wind energy.`
  },
  {
    id: '3',
    title: 'Aarhus Food Festival Celebrates Record Attendance as Nordic Cuisine Thrives',
    summary: 'Denmark\'s second-largest city hosted over 100,000 visitors at its annual food festival, showcasing the country\'s growing influence on global culinary trends.',
    category: 'Lifestyle',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    fullStory: `The Aarhus Food Festival, Denmark's largest culinary event, closed yesterday with record-breaking attendance figures. Over 100,000 visitors flocked to the coastal city over the three-day event, representing a 30% increase from last year.

    This year's festival featured more than 200 exhibitors, from Michelin-starred restaurants to small-scale producers of traditional Danish foods. The growing international attendance highlights Denmark's significant influence on global food culture, particularly through the New Nordic movement pioneered by chefs like René Redzepi.

    "What we're seeing is a profound interest in our approach to seasonality, sustainability, and food innovation," said festival director Lars Pedersen. "Visitors from around the world come not just to taste our food but to understand our food philosophy."

    Among the most popular attractions were workshops on fermentation techniques, foraging expeditions in nearby forests, and demonstrations of traditional preservation methods adapted for modern kitchens.

    The festival also unveiled the "Future Food" pavilion, showcasing Denmark's advances in plant-based proteins and sustainable seafood alternatives.`
  },
  {
    id: '4',
    title: 'Denmark Announces Major Expansion of Electric Vehicle Charging Network',
    summary: 'The government has approved funding for 10,000 new public charging points as electric vehicle ownership hits record levels across the country.',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1558717091-32196c0ba355?q=80&w=2070&auto=format&fit=crop',
    fullStory: `The Danish Ministry of Transportation has announced an ambitious plan to install 10,000 new public electric vehicle charging points nationwide by the end of 2025. The €80 million initiative comes as electric vehicle registrations in Denmark reached a record 42% of all new car sales in the first quarter of this year.

    "We're witnessing an electric vehicle revolution in Denmark, and our infrastructure needs to keep pace," said Transportation Minister Anders Jensen at a press conference in Copenhagen yesterday. "This expansion will ensure that no Danish driver is ever more than 25 kilometers from a fast-charging station."

    The program will focus particularly on rural areas and smaller towns, where charging infrastructure has lagged behind urban centers. Additionally, all highway service stations will be required to install at least four fast-charging points capable of delivering 150kW or more.

    The initiative is part of Denmark's broader strategy to phase out the sale of new fossil-fuel vehicles by 2030, five years ahead of the EU mandate. To further support this transition, the government also announced an extension of tax incentives for electric vehicle purchases through 2026.`
  },
  {
    id: '5',
    title: 'Danish National Football Team Unveils New Strategy Ahead of European Championship',
    summary: 'Following a series of disappointing friendly matches, Denmark\'s coach has announced a tactical overhaul and several new player selections for the upcoming tournament.',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop',
    fullStory: `Denmark's national football team coach Kasper Hjulmand has unveiled a major tactical overhaul ahead of next month's European Championship. The announcement comes after the team's underwhelming performance in recent friendly matches.

    "We've been analyzing our strengths and weaknesses extensively, and it's time for a fresh approach," Hjulmand explained at the team's training facility outside Copenhagen. "Our new system will better utilize our players' technical abilities while addressing our defensive vulnerabilities."

    The revised strategy includes a shift from the team's traditional 4-3-3 formation to a more fluid 3-4-2-1 system, designed to create overloads in midfield while maintaining defensive solidity. The coach also announced several surprise additions to the squad, including 20-year-old winger Felix Andersen, who has impressed during his breakthrough season with FC Midtjylland.

    Team captain Simon Kjær expressed confidence in the new direction: "We've been working on these changes for several weeks now, and the squad is fully committed to this approach. I believe this system plays much better to our collective strengths."

    Denmark will begin their European Championship campaign against Finland on June 12th, followed by group stage matches against Belgium and Serbia.`
  }
];

export const mockCategories = [
  {
    id: 'top',
    name: 'Top News',
    icon: '📰',
    color: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    id: 'local',
    name: 'Local News',
    icon: '🏙️',
    color: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 'international',
    name: 'International',
    icon: '🌎',
    color: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    color: 'bg-orange-100 dark:bg-orange-900/30'
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    color: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    color: 'bg-pink-100 dark:bg-pink-900/30'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    color: 'bg-indigo-100 dark:bg-indigo-900/30'
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle',
    icon: '🏄‍♂️',
    color: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  {
    id: 'weather',
    name: 'Weather',
    icon: '🌤️',
    color: 'bg-sky-100 dark:bg-sky-900/30'
  },
];

export const mockSearchSuggestions = [
  "Danish elections",
  "Copenhagen restaurants",
  "Aarhus festival",
  "Danish royal family",
  "Denmark Eurovision",
  "Climate policy",
  "Cycling infrastructure",
  "Renewable energy Denmark"
];
