export const GYM_INFO = {
  name: "DoBu Martial Arts",
  tagline: "Forge Discipline. Master the Art. Elevate Your Power.",
  description: "DoBu Martial Arts is a premier training facility dedicated to elite combat sports instruction, fitness conditioning, and personal transformation for practitioners of all skill levels.",
  phone: "+44 (0) 161 555 0199",
  email: "info@dobumartialarts.com",
  address: "14 Combat Way, City Centre, Manchester, M1 2AB",
  openingHours: {
    weekdays: "06:00 - 22:00",
    saturday: "08:00 - 20:00",
    sunday: "08:00 - 18:00"
  }
};

export const INSTRUCTORS = [
  {
    id: "mauricio-gomez",
    name: "Mauricio Gomez",
    role: "Gym Owner & Head Coach",
    disciplines: ["Jiu-jitsu", "Karate", "Judo", "Muay Thai"],
    image: "https://images.unsplash.com/photo-1564415051543-cb73a7468103?auto=format&fit=crop&q=80&w=800",
    ranks: [
      "Head Martial Arts Master",
      "Black Belt Multi-Discipline Specialist",
      "20+ Years Coaching Experience"
    ],
    bio: "Founder and Head Coach at DoBu Martial Arts. Mauricio has trained champion athletes worldwide and oversees all martial arts discipline curricula at DoBu.",
    specialty: "All Martial Arts & Fighter Development"
  },
  {
    id: "sarah-nova",
    name: "Sarah Nova",
    role: "Assistant Coach",
    disciplines: ["Judo", "Jiu-jitsu", "Karate", "Muay Thai"],
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800",
    ranks: [
      "4th Dan Blackbelt Judo",
      "3rd Dan Blackbelt Jiu-jitsu",
      "1st Dan Blackbelt Karate",
      "Accredited Muay Thai Instructor"
    ],
    bio: "International grappling competitor and tactical martial arts specialist. Sarah brings explosive submission wrestling and judo throw precision to DoBu.",
    specialty: "Grappling, Judo Throws & Ground Control"
  },
  {
    id: "guy-victory",
    name: "Guy Victory",
    role: "Assistant Coach",
    disciplines: ["Karate", "Jiu-jitsu", "Judo", "Muay Thai"],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
    ranks: [
      "5th Dan Blackbelt Karate",
      "2nd Dan Blackbelt Jiu-jitsu",
      "1st Dan Blackbelt Judo",
      "Accredited Muay Thai Master"
    ],
    bio: "Former national karate champion and striking strategist. Guy leads traditional karate kata/kumite and technical Muay Thai striking clinics.",
    specialty: "Precision Striking & Traditional Karate"
  },
  {
    id: "morris-davis",
    name: "Morris Davis",
    role: "Assistant Coach",
    disciplines: ["Karate", "Kids Martial Arts"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    ranks: [
      "3rd Dan Blackbelt Karate",
      "Youth Athletics Specialist"
    ],
    bio: "Dedicated karate coach with a passion for youth development, confidence building, and foundational footwork drills.",
    specialty: "Karate Technique & Youth Development"
  },
  {
    id: "traci-santiago",
    name: "Traci Santiago",
    role: "Fitness & Conditioning Coach",
    disciplines: ["Strength & Conditioning", "Personal Training"],
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    ranks: [
      "BSc in Sports Science",
      "S&C Specialist for Combat Athletes",
      "NASM Master Trainer"
    ],
    bio: "Traci designs high-performance strength, speed, and endurance regimes specifically tailored for martial artists preparing for competition.",
    specialty: "Combat Athletic Performance & S&C"
  },
  {
    id: "harpreet-kaur",
    name: "Harpreet Kaur",
    role: "Fitness & Rehabilitation Coach",
    disciplines: ["Physiotherapy", "Fitness Training", "Mobility"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    ranks: [
      "BSc in Physiotherapy",
      "MSc in Sports Science",
      "Certified Injury Rehabilitation Expert"
    ],
    bio: "Harpreet specializes in functional movement screening, injury prevention, joint mobility, and post-workout active recovery strategies.",
    specialty: "Rehabilitation, Mobility & Athletic Recovery"
  }
];

export const MEMBERSHIP_PLANS = [
  {
    id: "basic",
    name: "Basic Membership",
    price: 25.00,
    period: "month",
    description: "Ideal for beginners looking to focus on a single martial arts discipline.",
    features: [
      "1 Martial Art discipline selection",
      "2 Training sessions per week",
      "Access to standard open mat practice",
      "Member portal & schedule manager access",
      "Locker room & shower facilities access"
    ],
    popular: false,
    maxArts: 1,
    sessionsPerWeek: 2
  },
  {
    id: "intermediate",
    name: "Intermediate Membership",
    price: 35.00,
    period: "month",
    description: "Perfect for dedicated practitioners aiming for consistent progress.",
    features: [
      "1 Martial Art discipline selection",
      "3 Training sessions per week",
      "Full open mat practice access",
      "Fitness room standard access",
      "Sauna & steam room pass (1x/week)"
    ],
    popular: false,
    maxArts: 1,
    sessionsPerWeek: 3
  },
  {
    id: "advanced",
    name: "Advanced Membership",
    price: 45.00,
    period: "month",
    description: "Designed for cross-training combat athletes seeking multi-art mastery.",
    features: [
      "Any 2 Martial Arts disciplines selection",
      "5 Training sessions per week",
      "Unlimited Fitness Room access",
      "Unlimited Sauna & Steam room access",
      "Discounts on private coaching & seminars"
    ],
    popular: false,
    maxArts: 2,
    sessionsPerWeek: 5
  },
  {
    id: "elite",
    name: "Elite Membership",
    price: 60.00,
    period: "month",
    description: "The ultimate unlimited package for ultimate martial arts mastery and fitness.",
    features: [
      "UNLIMITED access to ALL Martial Arts sessions",
      "Unlimited classes per week (Jiu-jitsu, Karate, Judo, Muay Thai)",
      "Unlimited 24/7 Gym & Fitness Suite access",
      "Unlimited Sauna & Thermal Steam room access",
      "Free 6-Week Beginners Self-Defence Course entry",
      "10% discount on Private Coaching & Merch"
    ],
    popular: true,
    maxArts: 99,
    sessionsPerWeek: 99
  },
  {
    id: "junior",
    name: "Junior Membership",
    price: 25.00,
    period: "month",
    description: "Tailored for youth practitioners under 16 across all kids martial arts sessions.",
    features: [
      "Access to all Kids Martial Arts sessions",
      "Kids Jiu-jitsu, Judo, and Karate classes",
      "Confidence, discipline & anti-bullying focus",
      "Youth belt grading progression eligible",
      "Parent spectator lounge access"
    ],
    popular: false,
    maxArts: 3,
    sessionsPerWeek: 5
  }
];

export const ADDONS_AND_COURSES = [
  {
    id: "self-defence",
    name: "6-Week Beginners' Self-Defence Course",
    price: 180.00,
    unit: "course",
    description: "Comprehensive 6-week intensive course (2 x 1-hr sessions per week) teaching real-world awareness, de-escalation, and situational self-defence.",
    category: "Specialist Course"
  },
  {
    id: "private-martial-arts",
    name: "Private Martial Arts Tuition",
    price: 15.00,
    unit: "hour",
    description: "1-on-1 private technical instruction with accredited head or assistant coaches.",
    category: "Coaching"
  },
  {
    id: "personal-fitness",
    name: "Personal Fitness Training",
    price: 35.00,
    unit: "hour",
    description: "Customized 1-on-1 strength, conditioning, and athletic performance coaching.",
    category: "Coaching"
  },
  {
    id: "casual-fitness-room",
    name: "Casual Use of Fitness Room",
    price: 6.00,
    unit: "visit",
    description: "Pay-as-you-go day pass access to the strength & cardio fitness facility.",
    category: "Casual Access"
  }
];

export const TIMETABLE_SLOTS = [
  {
    time: "06:00 - 07:30",
    label: "Early Morning Combat",
    sessions: {
      Monday: { title: "Jiu-jitsu", instructor: "Sarah Nova", level: "All Levels", category: "Jiu-jitsu", location: "Dojo Mat A" },
      Tuesday: { title: "Karate", instructor: "Guy Victory", level: "All Levels", category: "Karate", location: "Dojo Mat B" },
      Wednesday: { title: "Judo", instructor: "Sarah Nova", level: "All Levels", category: "Judo", location: "Dojo Mat A" },
      Thursday: { title: "Jiu-jitsu", instructor: "Mauricio Gomez", level: "All Levels", category: "Jiu-jitsu", location: "Dojo Mat A" },
      Friday: { title: "Muay Thai", instructor: "Guy Victory", level: "All Levels", category: "Muay Thai", location: "Striking Zone" },
      Saturday: null,
      Sunday: null
    }
  },
  {
    time: "08:00 - 10:00",
    label: "Morning Technical & Private",
    sessions: {
      Monday: { title: "Muay Thai", instructor: "Guy Victory", level: "Intermediate", category: "Muay Thai", location: "Striking Zone" },
      Tuesday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Wednesday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Thursday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Friday: { title: "Jiu-jitsu", instructor: "Sarah Nova", level: "Advanced", category: "Jiu-jitsu", location: "Dojo Mat A" },
      Saturday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Sunday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" }
    }
  },
  {
    time: "10:30 - 12:00",
    label: "Late Morning Sessions",
    sessions: {
      Monday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Tuesday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Wednesday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Thursday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Friday: null,
      Saturday: { title: "Judo", instructor: "Sarah Nova", level: "All Levels", category: "Judo", location: "Dojo Mat A" },
      Sunday: { title: "Karate", instructor: "Morris Davis", level: "All Levels", category: "Karate", location: "Dojo Mat B" }
    }
  },
  {
    time: "13:00 - 14:30",
    label: "Afternoon Practice & Private",
    sessions: {
      Monday: { title: "Open Mat / Personal Practice", instructor: "Supervised Mat", level: "All Members", category: "Open Mat", location: "Main Dojo" },
      Tuesday: { title: "Open Mat / Personal Practice", instructor: "Supervised Mat", level: "All Members", category: "Open Mat", location: "Main Dojo" },
      Wednesday: { title: "Open Mat / Personal Practice", instructor: "Supervised Mat", level: "All Members", category: "Open Mat", location: "Main Dojo" },
      Thursday: { title: "Open Mat / Personal Practice", instructor: "Supervised Mat", level: "All Members", category: "Open Mat", location: "Main Dojo" },
      Friday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Saturday: null,
      Sunday: null
    }
  },
  {
    time: "15:00 - 17:00",
    label: "Youth & Weekend Special",
    sessions: {
      Monday: { title: "Kids Jiu-jitsu", instructor: "Sarah Nova", level: "Youth (Ages 6-15)", category: "Kids", location: "Dojo Mat A" },
      Tuesday: { title: "Kids Judo", instructor: "Sarah Nova", level: "Youth (Ages 6-15)", category: "Kids", location: "Dojo Mat A" },
      Wednesday: { title: "Kids Karate", instructor: "Morris Davis", level: "Youth (Ages 6-15)", category: "Kids", location: "Dojo Mat B" },
      Thursday: { title: "Kids Jiu-jitsu", instructor: "Mauricio Gomez", level: "Youth (Ages 6-15)", category: "Kids", location: "Dojo Mat A" },
      Friday: { title: "Kids Judo", instructor: "Sarah Nova", level: "Youth (Ages 6-15)", category: "Kids", location: "Dojo Mat A" },
      Saturday: { title: "Open Mat / Karate / Muay Thai", instructor: "Guy Victory & Morris Davis", level: "Open Practice", category: "Karate", location: "Main Dojo" },
      Sunday: { title: "Open Mat / Judo / Jiu-jitsu", instructor: "Mauricio Gomez & Sarah Nova", level: "Open Practice", category: "Jiu-jitsu", location: "Main Dojo" }
    }
  },
  {
    time: "17:30 - 19:00",
    label: "Evening Prime - Slot 1",
    sessions: {
      Monday: { title: "Karate", instructor: "Guy Victory", level: "Adults All Levels", category: "Karate", location: "Dojo Mat B" },
      Tuesday: { title: "Muay Thai", instructor: "Guy Victory", level: "Adults All Levels", category: "Muay Thai", location: "Striking Zone" },
      Wednesday: { title: "Judo", instructor: "Sarah Nova", level: "Adults All Levels", category: "Judo", location: "Dojo Mat A" },
      Thursday: { title: "Jiu-jitsu", instructor: "Mauricio Gomez", level: "Adults All Levels", category: "Jiu-jitsu", location: "Dojo Mat A" },
      Friday: { title: "Muay Thai", instructor: "Guy Victory", level: "Sparring & Clinch", category: "Muay Thai", location: "Striking Zone" },
      Saturday: null,
      Sunday: null
    }
  },
  {
    time: "19:00 - 21:00",
    label: "Evening Prime - Slot 2",
    sessions: {
      Monday: { title: "Jiu-jitsu", instructor: "Mauricio Gomez", level: "Advanced & Competition", category: "Jiu-jitsu", location: "Dojo Mat A" },
      Tuesday: { title: "Judo", instructor: "Sarah Nova", level: "Advanced Takedowns", category: "Judo", location: "Dojo Mat A" },
      Wednesday: { title: "Jiu-jitsu", instructor: "Mauricio Gomez", level: "No-Gi Submission Grappling", category: "Jiu-jitsu", location: "Dojo Mat A" },
      Thursday: { title: "Karate", instructor: "Morris Davis", level: "Black Belt Kata & Kumite", category: "Karate", location: "Dojo Mat B" },
      Friday: { title: "Private Tuition", instructor: "Coaches Available", level: "Private 1-on-1", category: "Private", location: "Private Suite" },
      Saturday: null,
      Sunday: null
    }
  }
];

export const FACILITIES = [
  {
    id: "matted-area",
    title: "High-Impact Matted Arena",
    category: "Martial Arts",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000",
    description: "Over 3,000 sq ft of professional Olympic-grade seamless safety tatami mats designed for high-amplitude throws, takedowns, and joint submission work.",
    specs: ["Professional Olympic Tatami", "Sub-floor Shock Absorption", "Hygiene UV Sanitized Daily", "Divided Dual Training Zones"]
  },
  {
    id: "equipped-gym",
    title: "Strength & Conditioning Suite",
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1000",
    description: "Fully loaded gym floor featuring squat racks, Olympic lifting platforms, heavy bags, kettlebells, assault bikes, and specialized combat athlete machinery.",
    specs: ["Rogue Power Racks & Platforms", "Heavy Striking & Muay Thai Bags", "Cardio Assault Bikes & Rowers", "Free Weights Up To 50kg"]
  },
  {
    id: "sauna-steam",
    title: "Finnish Sauna & Thermal Steam Room",
    category: "Recovery",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000",
    description: "Unwind after grueling sessions in our high-temperature dry cedar Finnish sauna and aromatic eucalyptus steam chamber for optimal muscular recovery.",
    specs: ["Cedar Wood Dry Sauna (85-95°C)", "Eucalyptus Herbal Steam Room", "Ice Cold Plunge Shower", "Relaxation Lounge"]
  },
  {
    id: "changing-facilities",
    title: "Luxury Changing Rooms & Lockers",
    category: "Amenities",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000",
    description: "Spacious gender-segregated changing facilities equipped with rainfall hot showers, keyless digital lockers, hair dryers, and grooming stations.",
    specs: ["High-Pressure Rainfall Showers", "Keyless Digital Lockers", "Grooming & Blow-dry Stations", "Complimentary Towel Service"]
  }
];

export const MOCK_COMMUNITY_POSTS = [
  {
    id: 1,
    author: "Alex Turner",
    role: "Purple Belt (Jiu-jitsu)",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
    time: "2 hours ago",
    category: "Technique",
    content: "Awesome technical instruction from Mauricio on the de la Riva guard sweep tonight! Anyone up for extra drilling before Thursday's 17:30 session?",
    likes: 8,
    comments: 3
  },
  {
    id: 2,
    author: "Elena Rostova",
    role: "Muay Thai Practitioner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    time: "5 hours ago",
    category: "General",
    content: "Just completed week 3 of Traci's S&C program. Cardio on the assault bikes is brutal but my sparring endurance has doubled! 💪🔥",
    likes: 12,
    comments: 5
  },
  {
    id: 3,
    author: "Marcus Chen",
    role: "Green Belt (Judo)",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
    time: "1 day ago",
    category: "Training Partners",
    content: "Looking for a drilling partner for Saturday's 10:30 Judo session with Coach Sarah. Focusing on Harai Goshi setup.",
    likes: 6,
    comments: 2
  }
];
