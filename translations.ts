
export const translations = {
  nl: {
    nav: {
      home: 'Home',
      services: 'Diensten',
      approach: 'Aanpak',
      pricing: 'Prijzen',
      portfolio: 'Portfolio',
      about: 'Over Hope',
      contact: 'Contact',
      faq: 'FAQ',
      cta: 'Plan een gesprek'
    },
    hero: {
      title_prefix: "SKYE is",
      title_suffix: "Unlimited",
      subtitle: "Professionele websites en systemen vanaf €150 per maand. Geen grote investering vooraf, wel direct professioneel online.",
      cta_primary: "Bekijk Pakketten",
      cta_secondary: "Plan een gesprek",
      bullets: ["Vast maandbedrag", "Geen gedoe", "Altijd up-to-date"]
    },
    pain_points: {
      title: "Je wilt gewoon dat het werkt.",
      subtitle: "Geen offertes van €5.000 waar je van schrikt. Geen technische kopzorgen.",
      items: [
        { title: "Geen Tijd", desc: "Je bent ondernemer. Je wilt niet prutsen met plugins, updates of beveiliging. Dat moet gewoon geregeld zijn." },
        { title: "Onduidelijke Kosten", desc: "Bureaus die uurtje-factuurtje werken of vage offertes sturen? Bij mij weet je precies waar je aan toe bent." },
        { title: "Groei Plafond", desc: "Je 'doe-het-zelf' site voldoet niet meer. Je hebt een systeem nodig dat met je meegroeit, zonder dat je opnieuw moet beginnen." }
      ]
    },
    services: {
      title: "Jouw Digitale Fundament",
      subtitle: "Of je nu start of schaalt: ik bouw de basis en de groei.",
      cta_text: "Bekijk alle services"
    },
    pricing: {
      title: "Kies jouw model",
      subtitle: "Huren voor flexibiliteit of afkopen voor eigendom. Transparant en eerlijk.",
      maintenance_note: "Bij afkoop optioneel onderhoud: €49/mnd."
    },
    cta_final: {
      title: "Klaar voor duidelijkheid?",
      subtitle: "Start met een solide basis. Breid later uit. Skye is unlimited.",
      button: "Plan een kennismaking"
    },
    footer: {
      rights: "Alle rechten voorbehouden.",
      built: "Gemaakt door Hope."
    }
  },
  // English fallback (simplified to keep structure valid, though prompt requested Dutch focus)
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      approach: 'Approach',
      pricing: 'Pricing',
      portfolio: 'Portfolio',
      about: 'About Hope',
      contact: 'Contact',
      faq: 'FAQ',
      cta: 'Schedule Call'
    },
    hero: {
      title_prefix: "SKYE is",
      title_suffix: "Unlimited",
      subtitle: "Professional websites starting at €150/month. No huge upfront costs, just professional results.",
      cta_primary: "View Packages",
      cta_secondary: "Schedule Call",
      bullets: ["Fixed Monthly Fee", "No Hassle", "Always Up-to-date"]
    },
    pain_points: {
      title: "You just want it to work.",
      subtitle: "No scary €5,000 quotes. No technical headaches.",
      items: [
        { title: "No Time", desc: "You are an entrepreneur. You don't want to mess with plugins. It just needs to be handled." },
        { title: "Unclear Costs", desc: "Agencies with vague quotes? With me, you know exactly what you pay." },
        { title: "Growth Ceiling", desc: "Your DIY site isn't cutting it. You need a system that scales with you." }
      ]
    },
    services: {
      title: "Your Digital Foundation",
      subtitle: "Whether you start or scale: I build the foundation for growth.",
      cta_text: "View all services"
    },
    pricing: {
      title: "Choose your model",
      subtitle: "Rent for flexibility or buy for ownership. Transparent and honest.",
      maintenance_note: "Optional maintenance with buyout: €49/mo."
    },
    cta_final: {
      title: "Ready for clarity?",
      subtitle: "Start with a solid base. Expand later. Skye is unlimited.",
      button: "Schedule Introduction"
    },
    footer: {
      rights: "All rights reserved.",
      built: "Made by Hope."
    }
  }
};

export type Language = 'nl' | 'en';
export type Content = typeof translations.nl;
