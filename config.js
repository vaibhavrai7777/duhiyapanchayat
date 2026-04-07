/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  DUHIA GRAM PANCHAYAT — CONFIG FILE                 ║
 * ║  Edit ONLY this file to change any website content  ║
 * ╚══════════════════════════════════════════════════════╝
 */
const CONFIG = {

  /* ── 1. PANCHAYAT INFO ──────────────────────────────── */
  panchayat: {
    nameHi: "दुहिया ग्राम पंचायत", nameEn: "Duhia Gram Panchayat",
    blockHi: "जवनिया", blockEn: "Jawania",
    districtHi: "गाजीपुर", districtEn: "Ghazipur",
    pincode: "233001", population: 2847, families: 523, wards: 15,
  },

  /* ── 2. PRADHAN ────────────────────────────────────── */
  pradhan: {
    nameHi: "विनीत राय", nameEn: "Vineet Rai",
    phone: "8303049123", whatsapp: "918303049123",
    roleHi: "ग्राम प्रधान", roleEn: "Gram Pradhan",
  },

  /* ── 3. SAHAYAK ────────────────────────────────────── */
  sahayak: {
    nameHi: "आकाश राय", nameEn: "Akash Rai",
    phone: "7982181475", roleHi: "प्रधान सहायक", roleEn: "Pradhan Sahayak",
  },

  /* ── 4. MAP — Duhiya village, Zamania block, Ghazipur ── */
  map: { lat: 25.4196, lng: 83.5579 },

  /* ── 5. OFFICE HOURS ───────────────────────────────── */
  officeHours: { hi: "सोम–शनि: प्रातः 9 बजे – सायं 5 बजे", en: "Mon–Sat: 9 AM – 5 PM" },

  /* ── 6. PORTAL PASSWORD — CHANGE THIS! ─────────────── */
  portalPassword: "2026",

  /* ── 7. AI / CLOUD ─────────────────────────────────── */
  anthropicApiKey: "",          // Only for local testing. Empty = use proxy below.
  chatProxyUrl: "",             // Set "/.netlify/functions/chat" after deploying to Netlify

  /* ── 8. ANNOUNCEMENTS — ADD/EDIT/REMOVE HERE ───────── */
  announcements: [
    {
      icon: "📅", titleHi: "ग्राम सभा बैठक — अप्रैल 2026", titleEn: "Gram Sabha Meeting — April 2026",
      textHi: "15 अप्रैल 2026 को प्रातः 10 बजे पंचायत भवन में बैठक।",
      textEn: "Meeting on April 15, 2026 at 10 AM at Panchayat Bhavan.", date: "5 अप्रैल, 2026",
    },
    {
      icon: "💊", titleHi: "निःशुल्क स्वास्थ्य शिविर", titleEn: "Free Health Camp",
      textHi: "20 अप्रैल 2026 को प्राथमिक विद्यालय में निःशुल्क स्वास्थ्य जाँच।",
      textEn: "Free health checkup on April 20 at Primary School.", date: "3 अप्रैल, 2026",
    },
    {
      icon: "📋", titleHi: "राशन कार्ड अपडेट", titleEn: "Ration Card Update",
      textHi: "नाम जुड़वाना हो तो 10 अप्रैल तक पंचायत कार्यालय संपर्क करें।",
      textEn: "Contact Panchayat office by April 10 to add names.", date: "1 अप्रैल, 2026",
    },
  ],

  /* ── 9. GOVERNMENT SCHEMES ─────────────────────────── */
  schemes: [
    { icon: "fas fa-home",         color: "#e65100,#ff6d00", nameHi: "PM आवास योजना (ग्रामीण)", nameEn: "PM Awas Yojana", descHi: "गरीब परिवारों को पक्का मकान के लिए ₹1.20 लाख तक।", descEn: "Up to ₹1.20 lakh for poor families to build a home.", url: "https://pmayg.nic.in" },
    { icon: "fas fa-briefcase",    color: "#1b5e20,#2e7d32", nameHi: "मनरेगा (MGNREGA)",        nameEn: "MGNREGA",        descHi: "100 दिन के रोजगार की गारंटी।",                        descEn: "Guarantee of 100 days employment.", url: "https://nrega.nic.in" },
    { icon: "fas fa-fire",         color: "#880e4f,#ad1457", nameHi: "उज्ज्वला योजना",          nameEn: "Ujjwala Yojana", descHi: "BPL परिवारों को मुफ्त LPG गैस कनेक्शन।",             descEn: "Free LPG gas for BPL families.", url: "https://www.pmuy.gov.in" },
    { icon: "fas fa-heartbeat",    color: "#01579b,#0288d1", nameHi: "आयुष्मान भारत",           nameEn: "Ayushman Bharat",descHi: "₹5 लाख तक का मुफ्त इलाज।",                           descEn: "Free treatment up to ₹5 lakh.", url: "https://pmjay.gov.in" },
    { icon: "fas fa-user-graduate",color: "#4a148c,#6a1b9a", nameHi: "वृद्धा / विधवा पेंशन",  nameEn: "Old Age Pension", descHi: "60+ बुजुर्गों और विधवाओं को मासिक पेंशन।",           descEn: "Monthly pension for elderly above 60.", url: "https://sspy-up.gov.in" },
    { icon: "fas fa-tint",         color: "#006064,#00838f", nameHi: "हर घर जल",               nameEn: "Har Ghar Jal",   descHi: "हर घर में नल से शुद्ध पेयजल।",                       descEn: "Clean tap water to every household.", url: "https://jaljeevanmission.gov.in" },
  ],

  /* ── 10. AI SYSTEM PROMPT ──────────────────────────── */
  aiSystemPrompt: `You are the helpful AI assistant for Duhia Gram Panchayat, Jawania block, Ghazipur district, Uttar Pradesh, India. Gram Pradhan: Vineet Rai (8303049123). Pradhan Sahayak: Akash Rai (7982181475). Help villagers with PM Awas, MGNREGA, Ujjwala, Ayushman Bharat, pension, ration cards, Jal Jeevan Mission, complaint filing, and panchayat services. Reply in the same language the user writes in (Hindi or English). Keep answers simple. Use emojis. If unsure, direct them to call Pradhan Vineet Rai at 8303049123.`,
};
