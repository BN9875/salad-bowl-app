import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. EMBEDDED INDIAN PANTRY & INR DATASET
// ==========================================
const INGREDIENTS_DATA = [
  // LEAFY / CRUNCH BASES
  {
    id: 'base_01',
    name: 'Fresh Spinach (Palak)',
    category: 'Fresh Produce',
    pillar: 'base',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    market_unit_label: '1 bunch (~250g)',
    market_unit_grams: 250,
    market_unit_price_inr: 20,
    prep_tip: 'Wash thoroughly, pat dry, and tear into bite-sized leaves.'
  },
  {
    id: 'base_02',
    name: 'English Cucumber',
    category: 'Fresh Produce',
    pillar: 'base',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 15, protein: 0.6, carbs: 3.6, fat: 0.1 },
    market_unit_label: '1 pc (~200g)',
    market_unit_grams: 200,
    market_unit_price_inr: 18,
    prep_tip: 'Dice into half-moons with skin on for extra crunch.'
  },
  {
    id: 'base_03',
    name: 'Shredded Green Cabbage',
    category: 'Fresh Produce',
    pillar: 'base',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1 },
    market_unit_label: '1 small head (~400g)',
    market_unit_grams: 400,
    market_unit_price_inr: 22,
    prep_tip: 'Finely shred and toss with a pinch of salt 5 mins prior.'
  },
  {
    id: 'base_04',
    name: 'Iceberg Lettuce',
    category: 'Fresh Produce',
    pillar: 'base',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 14, protein: 0.9, carbs: 3.0, fat: 0.1 },
    market_unit_label: '1 head (~300g)',
    market_unit_grams: 300,
    market_unit_price_inr: 45,
    prep_tip: 'Chill leaves in ice water for 5 mins and hand-tear.'
  },
  {
    id: 'base_05',
    name: 'Bell Peppers & Cherry Tomatoes',
    category: 'Fresh Produce',
    pillar: 'base',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 26, protein: 1.0, carbs: 6.0, fat: 0.2 },
    market_unit_label: '250g pack',
    market_unit_grams: 250,
    market_unit_price_inr: 40,
    prep_tip: 'Slice bell peppers thin and halve the cherry tomatoes.'
  },

  // LEAN PROTEINS
  {
    id: 'prot_01',
    name: 'Fresh Malai Paneer',
    category: 'Protein & Dairy',
    pillar: 'protein',
    diet: 'veg',
    allergies: ['dairy'],
    low_fat_friendly: false,
    per_100g: { calories: 265, protein: 18.3, carbs: 1.2, fat: 20.8 },
    market_unit_label: '200g pack',
    market_unit_grams: 200,
    market_unit_price_inr: 90,
    prep_tip: 'Cube and pan-sear with jeera powder and black pepper for 3 mins.'
  },
  {
    id: 'prot_02',
    name: 'Low-Fat Paneer',
    category: 'Protein & Dairy',
    pillar: 'protein',
    diet: 'veg',
    allergies: ['dairy'],
    low_fat_friendly: true,
    per_100g: { calories: 175, protein: 21.0, carbs: 3.5, fat: 8.0 },
    market_unit_label: '200g pack',
    market_unit_grams: 200,
    market_unit_price_inr: 95,
    prep_tip: 'Cube and lightly toast on a non-stick tawa with chaat masala.'
  },
  {
    id: 'prot_03',
    name: 'Boiled Eggs',
    category: 'Protein & Dairy',
    pillar: 'protein',
    diet: 'nonveg',
    allergies: ['eggs'],
    low_fat_friendly: true,
    per_100g: { calories: 155, protein: 13.0, carbs: 1.1, fat: 11.0 },
    market_unit_label: '6 pcs pack (~300g)',
    market_unit_grams: 300,
    market_unit_price_inr: 48,
    prep_tip: 'Hard-boil for 9 mins, peel, quarter, and season with rock salt.'
  },
  {
    id: 'prot_04',
    name: 'Boiled Kabuli Chana (Chickpeas)',
    category: 'Protein & Dairy',
    pillar: 'protein',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 164, protein: 8.9, carbs: 27.4, fat: 2.6 },
    market_unit_label: '500g raw pack (~1kg boiled)',
    market_unit_grams: 1000,
    market_unit_price_inr: 75,
    prep_tip: 'Toss boiled chana with roasted cumin, lemon juice, and coriander.'
  },
  {
    id: 'prot_05',
    name: 'Steamed Moong Sprouts',
    category: 'Protein & Dairy',
    pillar: 'protein',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 80, protein: 7.5, carbs: 13.0, fat: 0.4 },
    market_unit_label: '200g pack',
    market_unit_grams: 200,
    market_unit_price_inr: 28,
    prep_tip: 'Steam sprouts for 4 mins so they stay crunchy yet easy to digest.'
  },
  {
    id: 'prot_06',
    name: 'Firm Soya Tofu',
    category: 'Protein & Dairy',
    pillar: 'protein',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 144, protein: 15.0, carbs: 3.5, fat: 8.0 },
    market_unit_label: '200g pack',
    market_unit_grams: 200,
    market_unit_price_inr: 85,
    prep_tip: 'Press dry, cube, and pan-sear with soy sauce and sesame seeds.'
  },
  {
    id: 'prot_07',
    name: 'Grilled Chicken Breast',
    category: 'Protein & Dairy',
    pillar: 'protein',
    diet: 'nonveg',
    allergies: ['eggs'],
    low_fat_friendly: true,
    per_100g: { calories: 165, protein: 31.0, carbs: 0.0, fat: 3.6 },
    market_unit_label: '250g pack',
    market_unit_grams: 250,
    market_unit_price_inr: 115,
    prep_tip: 'Marinate in lemon, garlic, and pepper; pan-grill 4 mins per side.'
  },

  // COMPLEX CARBS & FRUITS
  {
    id: 'carb_01',
    name: 'Roasted Sweet Potato (Shakarkandi)',
    category: 'Pantry & Carbs',
    pillar: 'carb',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1 },
    market_unit_label: '500g pack',
    market_unit_grams: 500,
    market_unit_price_inr: 30,
    prep_tip: 'Cube boiled sweet potato and toss with chaat masala and lime.'
  },
  {
    id: 'carb_02',
    name: 'Cooked White Quinoa',
    category: 'Pantry & Carbs',
    pillar: 'carb',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
    market_unit_label: '250g raw pack (~650g cooked)',
    market_unit_grams: 650,
    market_unit_price_inr: 95,
    prep_tip: 'Fluff cooked quinoa with a fork and cool before folding into greens.'
  },
  {
    id: 'carb_03',
    name: 'Boiled Sweet Corn Kernels',
    category: 'Pantry & Carbs',
    pillar: 'carb',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 96, protein: 3.4, carbs: 21.0, fat: 1.5 },
    market_unit_label: '200g pack',
    market_unit_grams: 200,
    market_unit_price_inr: 40,
    prep_tip: 'Boil kernels for 5 mins and season with black pepper and lemon.'
  },
  {
    id: 'carb_04',
    name: 'Fresh Pomegranate Arils (Anaar)',
    category: 'Fresh Produce',
    pillar: 'carb',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 83, protein: 1.7, carbs: 18.7, fat: 1.2 },
    market_unit_label: '200g cup',
    market_unit_grams: 200,
    market_unit_price_inr: 65,
    prep_tip: 'Scatter fresh arils on top right before serving for sweet bursts.'
  },
  {
    id: 'carb_05',
    name: 'Diced Shimla Apple',
    category: 'Fresh Produce',
    pillar: 'carb',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2 },
    market_unit_label: '2 pcs (~300g)',
    market_unit_grams: 300,
    market_unit_price_inr: 60,
    prep_tip: 'Dice with skin on and toss in lemon juice to prevent browning.'
  },
  {
    id: 'carb_06',
    name: 'Whole Wheat Croutons',
    category: 'Pantry & Carbs',
    pillar: 'carb',
    diet: 'veg',
    allergies: ['gluten'],
    low_fat_friendly: true,
    per_100g: { calories: 265, protein: 9.0, carbs: 49.0, fat: 3.2 },
    market_unit_label: '200g loaf',
    market_unit_grams: 200,
    market_unit_price_inr: 35,
    prep_tip: 'Cube whole wheat bread and dry-toast on a pan until crisp.'
  },

  // HEALTHY FATS & DRESSINGS
  {
    id: 'fat_01',
    name: 'Walnut Halves (Akhrot)',
    category: 'Pantry & Seeds',
    pillar: 'fat',
    diet: 'veg',
    allergies: ['nuts'],
    low_fat_friendly: false,
    per_100g: { calories: 654, protein: 15.2, carbs: 13.7, fat: 65.2 },
    market_unit_label: '100g pack',
    market_unit_grams: 100,
    market_unit_price_inr: 125,
    prep_tip: 'Roughly crush and dry-roast for 2 mins for aromatic crunch.'
  },
  {
    id: 'fat_02',
    name: 'Roasted Pumpkin & Sunflower Seeds',
    category: 'Pantry & Seeds',
    pillar: 'fat',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 560, protein: 26.0, carbs: 14.0, fat: 48.0 },
    market_unit_label: '100g pack',
    market_unit_grams: 100,
    market_unit_price_inr: 85,
    prep_tip: 'Sprinkle over the dressed salad as a finishing crunch.'
  },
  {
    id: 'fat_03',
    name: 'Hung Curd & Mint Dressing',
    category: 'Protein & Dairy',
    pillar: 'fat',
    diet: 'veg',
    allergies: ['dairy'],
    low_fat_friendly: true,
    per_100g: { calories: 115, protein: 6.5, carbs: 5.5, fat: 7.5 },
    market_unit_label: '200g curd cup',
    market_unit_grams: 200,
    market_unit_price_inr: 30,
    prep_tip: 'Whisk thick curd with crushed mint, roasted jeera, and salt.'
  },
  {
    id: 'fat_04',
    name: 'Olive Oil, Lemon & Mustard Vinaigrette',
    category: 'Pantry & Seeds',
    pillar: 'fat',
    diet: 'veg',
    allergies: [],
    low_fat_friendly: true,
    per_100g: { calories: 540, protein: 0.2, carbs: 2.5, fat: 60.0 },
    market_unit_label: '100ml bottle',
    market_unit_grams: 100,
    market_unit_price_inr: 95,
    prep_tip: 'Whisk olive oil, fresh lemon juice, mustard, and black pepper.'
  },
  {
    id: 'fat_05',
    name: 'Roasted Peanut & Lime Crunch',
    category: 'Pantry & Seeds',
    pillar: 'fat',
    diet: 'veg',
    allergies: ['nuts'],
    low_fat_friendly: false,
    per_100g: { calories: 567, protein: 25.8, carbs: 16.1, fat: 49.2 },
    market_unit_label: '200g pack',
    market_unit_grams: 200,
    market_unit_price_inr: 45,
    prep_tip: 'Crush roasted peanuts coarsely and toss with lime and chilli flakes.'
  }
];

// ==========================================
// 2. TELEMETRY HELPER (GA4 / MIXPANEL READY)
// ==========================================
const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) window.gtag('event', eventName, params);
    if (window.mixpanel) window.mixpanel.track(eventName, params);
    console.debug(`[Analytics Event]: ${eventName}`, params);
  }
};

export default function App() {
  // Telemetry Timers
  const pageLoadTime = useRef(Date.now());
  const resultsRef = useRef(null);

  // Section 1: Mandatory Biometric State
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  // Section 2: Mandatory Dietary & Plan State
  const [dietPreference, setDietPreference] = useState(''); // 'veg' | 'nonveg'
  const [dietStyle, setDietStyle] = useState(''); // 'regular' | 'lowfat'
  const [planHorizon, setPlanHorizon] = useState(''); // '1day' | '7day'
  const [allergies, setAllergies] = useState({
    dairy: false,
    nuts: false,
    gluten: false,
    eggs: false
  });

  // Output & Interaction State
  const [generatedOutput, setGeneratedOutput] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null); // null | 'yes' | 'no' | 'already_voted'
  const [clientIpHash, setClientIpHash] = useState('local_session');

  // Initialize Page View Telemetry & Check Unique Session/IP Vote Guard
  useEffect(() => {
    trackEvent('page_view', { app_name: 'Salad Bowl' });

    const existingVote = localStorage.getItem('salad_bowl_feedback_submitted');
    if (existingVote) {
      setFeedbackStatus('already_voted');
    }

    // Lightweight public IP fetch for unique session validation (fails gracefully offline)
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (data?.ip) {
          setClientIpHash(data.ip);
          if (localStorage.getItem(`salad_bowl_ip_${data.ip}`)) {
            setFeedbackStatus('already_voted');
          }
        }
      })
      .catch(() => {});
  }, []);

  // Check if all mandatory fields are populated
  const isFormValid =
    gender !== '' &&
    age !== '' &&
    Number(age) >= 15 &&
    Number(age) <= 80 &&
    weight !== '' &&
    Number(weight) >= 35 &&
    Number(weight) <= 150 &&
    height !== '' &&
    Number(height) >= 120 &&
    Number(height) <= 220 &&
    dietPreference !== '' &&
    dietStyle !== '' &&
    planHorizon !== '';

  const toggleAllergy = (key) => {
    setAllergies((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ==========================================
  // 3. DETERMINISTIC RULE & SCALING ENGINE
  // ==========================================
  const generateSaladPlan = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);

    // 1. Mifflin-St Jeor BMR -> TDEE (1.375) -> Breakfast (25%)
    const bmr = 10 * w + 6.25 * h - 5 * a + (gender === 'male' ? 5 : -161);
    const breakfastCalories = Math.round(bmr * 1.375 * 0.25);

    // 2. Macro Split based on Regular vs Low-Fat
    const ratios =
      dietStyle === 'lowfat'
        ? { protein: 0.4, carb: 0.45, fat: 0.15 }
        : { protein: 0.35, carb: 0.35, fat: 0.3 };

    const targetMacros = {
      calories: breakfastCalories,
      proteinGrams: Math.round((breakfastCalories * ratios.protein) / 4),
      carbGrams: Math.round((breakfastCalories * ratios.carb) / 4),
      fatGrams: Math.round((breakfastCalories * ratios.fat) / 9)
    };

    // 3. Filter Pantry Pool by Diet (Veg/Non-Veg) & Checked Allergies
    const activeAllergies = Object.keys(allergies).filter((k) => allergies[k]);

    const filterPillar = (pillarName) => {
      let pool = INGREDIENTS_DATA.filter((item) => {
        if (item.pillar !== pillarName) return false;
        if (dietPreference === 'veg' && item.diet === 'nonveg') return false;
        const hasAllergy = item.allergies.some((al) => activeAllergies.includes(al));
        if (hasAllergy) return false;
        return true;
      });

      // If Low-Fat mode is active, prioritize low_fat_friendly items if available
      if (dietStyle === 'lowfat') {
        const lowFatPool = pool.filter((i) => i.low_fat_friendly);
        if (lowFatPool.length > 0) pool = lowFatPool;
      }

      return pool;
    };

    const bases = filterPillar('base');
    const proteins = filterPillar('protein');
    const carbs = filterPillar('carb');
    const fats = filterPillar('fat');

    // 4. Build Day Slots & Scale Ingredient Gram Weights Deterministically
    const labels =
      planHorizon === '1day'
        ? ['Option A — Balanced Bowl', 'Option B — Alternate Crunch']
        : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const salads = labels.map((dayLabel, idx) => {
      // Deterministic non-repeating rotation across days
      const baseItem = bases[idx % bases.length];
      const proteinItem = proteins[idx % proteins.length];
      const carbItem = carbs[(idx * 2) % carbs.length];
      const fatItem = fats[idx % fats.length];

      // Fixed 100g base for volume & micronutrients
      const baseGrams = 100;
      const baseCals = (baseItem.per_100g.calories * baseGrams) / 100;

      // Remaining calorie budget distributed across Protein, Carb, Fat pillars
      const remainingCals = Math.max(200, breakfastCalories - baseCals);
      const targetProtCals = remainingCals * ratios.protein;
      const targetCarbCals = remainingCals * ratios.carb;
      const targetFatCals = remainingCals * ratios.fat;

      // Calculate exact scaled gram weights (clamped to realistic culinary portions)
      const protGrams = Math.min(
        240,
        Math.max(55, Math.round((targetProtCals / proteinItem.per_100g.calories) * 100))
      );
      const carbGrams = Math.min(
        220,
        Math.max(45, Math.round((targetCarbCals / carbItem.per_100g.calories) * 100))
      );
      const fatGrams = Math.min(
        65,
        Math.max(12, Math.round((targetFatCals / fatItem.per_100g.calories) * 100))
      );

      // Sum actual delivered macros for transparency
      const components = [
        { item: baseItem, grams: baseGrams },
        { item: proteinItem, grams: protGrams },
        { item: carbItem, grams: carbGrams },
        { item: fatItem, grams: fatGrams }
      ];

      const totals = components.reduce(
        (acc, c) => {
          const factor = c.grams / 100;
          acc.calories += c.item.per_100g.calories * factor;
          acc.protein += c.item.per_100g.protein * factor;
          acc.carbs += c.item.per_100g.carbs * factor;
          acc.fat += c.item.per_100g.fat * factor;
          return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );

      return {
        dayLabel,
        title: `${proteinItem.name.split(' (')[0]} & ${carbItem.name.split(' (')[0]} Bowl`,
        components,
        macros: {
          calories: Math.round(totals.calories),
          protein: Math.round(totals.protein),
          carbs: Math.round(totals.carbs),
          fat: Math.round(totals.fat)
        }
      };
    });

    // 5. Consolidate Grocery List & Round to Indian Market Purchase Units
    const groceryMap = {};
    salads.forEach((salad) => {
      salad.components.forEach(({ item, grams }) => {
        if (!groceryMap[item.id]) {
          groceryMap[item.id] = {
            ...item,
            totalGramsNeeded: 0
          };
        }
        groceryMap[item.id].totalGramsNeeded += grams;
      });
    });

    const categorizedGroceries = {
      'Fresh Produce': [],
      'Protein & Dairy': [],
      'Pantry, Carbs & Seeds': []
    };

    let totalEstimatedInr = 0;

    Object.values(groceryMap).forEach((entry) => {
      const packsNeeded = Math.max(1, Math.ceil(entry.totalGramsNeeded / entry.market_unit_grams));
      const estimatedCost = packsNeeded * entry.market_unit_price_inr;
      totalEstimatedInr += estimatedCost;

      const bucket =
        entry.category === 'Fresh Produce'
          ? 'Fresh Produce'
          : entry.category === 'Protein & Dairy'
          ? 'Protein & Dairy'
          : 'Pantry, Carbs & Seeds';

      categorizedGroceries[bucket].push({
        id: entry.id,
        name: entry.name,
        totalGramsNeeded: entry.totalGramsNeeded,
        packsNeeded,
        marketUnitLabel: entry.market_unit_label,
        estimatedCost
      });
    });

    setGeneratedOutput({
      targetMacros,
      salads,
      categorizedGroceries,
      totalEstimatedInr
    });

    // Track Telemetry Events
    const durationSec = Math.round((Date.now() - pageLoadTime.current) / 1000);
    trackEvent('plan_generated', {
      plan_horizon: planHorizon,
      diet_preference: dietPreference,
      diet_style: dietStyle,
      allergies_count: activeAllergies.length
    });
    trackEvent('form_completion_duration', { seconds: durationSec });

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // ==========================================
  // 4. EXPORT & FEEDBACK HANDLERS
  // ==========================================
  const handleCopyClipboard = () => {
    if (!generatedOutput) return;

    let text = `🥗 SALAD BOWL — PERSONALIZED BREAKFAST PLAN\n`;
    text += `Target: ~${generatedOutput.targetMacros.calories} kcal | ${generatedOutput.targetMacros.proteinGrams}g Protein | ${generatedOutput.targetMacros.carbGrams}g Carbs | ${generatedOutput.targetMacros.fatGrams}g Fat\n\n`;

    generatedOutput.salads.forEach((s) => {
      text += `• ${s.dayLabel}: ${s.title} (${s.macros.calories} kcal, ${s.macros.protein}g P)\n`;
      text += `  Ingredients: ${s.components.map((c) => `${c.item.name} (${c.grams}g)`).join(', ')}\n`;
    });

    text += `\n🛒 CONSOLIDATED GROCERY LIST (Est. ₹${generatedOutput.totalEstimatedInr}):\n`;
    Object.entries(generatedOutput.categorizedGroceries).forEach(([cat, items]) => {
      if (items.length > 0) {
        text += `\n[${cat}]\n`;
        items.forEach((i) => {
          text += `- ${i.name}: ${i.packsNeeded}x ${i.marketUnitLabel} (Need ~${i.totalGramsNeeded}g) — ~₹${i.estimatedCost}\n`;
        });
      }
    });

    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    trackEvent('plan_exported', { method: 'clipboard' });
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const handleDownloadPdf = () => {
    trackEvent('plan_exported', { method: 'pdf_print' });
    window.print();
  };

  const handleFeedbackSubmit = (vote) => {
    if (feedbackStatus) return;
    setFeedbackStatus(vote);
    localStorage.setItem('salad_bowl_feedback_submitted', vote);
    localStorage.setItem(`salad_bowl_ip_${clientIpHash}`, vote);
    trackEvent('feedback_submitted', { useful: vote, ip_hash: clientIpHash });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans pb-20 print:bg-white print:pb-0">
      {/* ==========================================
          SECTION 1: HEADER
         ========================================== */}
      <header className="bg-emerald-800 text-white py-10 px-4 text-center shadow-sm print:bg-white print:text-stone-900 print:border-b print:py-4">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-emerald-700 text-emerald-100 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 print:hidden">
            Deterministic Nutrition Engine
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Salad Bowl</h1>
          <p className="text-emerald-100 mt-2 text-sm md:text-base max-w-xl mx-auto print:text-stone-600">
            Zero-decision, macro-balanced breakfast salads tailored to your biometrics and Indian pantry realities.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-10">
        {/* ==========================================
            SECTION 2: MANDATORY 2-PART INPUT FORM
           ========================================== */}
        <form
          onSubmit={generateSaladPlan}
          className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 space-y-8 print:hidden"
        >
          {/* PART 1: USER BIOMETRIC DETAILS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h2 className="text-lg font-bold text-stone-900">1. User Biometric Details</h2>
              <span className="text-xs font-medium text-rose-600">* All fields mandatory</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Gender *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  min="15"
                  max="80"
                  placeholder="e.g. 28"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  min="35"
                  max="150"
                  placeholder="e.g. 62"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Height (cm) *
                </label>
                <input
                  type="number"
                  min="120"
                  max="220"
                  placeholder="e.g. 165"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* PART 2: DIETARY REQUIREMENTS & CONSTRAINTS */}
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h2 className="text-lg font-bold text-stone-900">2. Dietary Requirements & Plan</h2>
              <span className="text-xs font-medium text-rose-600">* All fields mandatory</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Dietary Preference: Veg / Non-Veg */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Dietary Preference *
                </label>
                <select
                  value={dietPreference}
                  onChange={(e) => setDietPreference(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="" disabled>
                    Select Preference
                  </option>
                  <option value="veg">Vegetarian</option>
                  <option value="nonveg">Non-Vegetarian</option>
                </select>
              </div>

              {/* Nutrient Style: Regular / Low-Fat */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Nutrient Split *
                </label>
                <select
                  value={dietStyle}
                  onChange={(e) => setDietStyle(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="" disabled>
                    Select Diet Style
                  </option>
                  <option value="regular">Regular Balanced (35P / 35C / 30F)</option>
                  <option value="lowfat">Low-Fat High-Protein (40P / 45C / 15F)</option>
                </select>
              </div>

              {/* Plan Horizon: 1 Day / 7 Days */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-1.5">
                  Plan Duration *
                </label>
                <select
                  value={planHorizon}
                  onChange={(e) => setPlanHorizon(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="" disabled>
                    Select Plan Type
                  </option>
                  <option value="7day">Weekly Plan (7 Days)</option>
                  <option value="1day">One-Day Plan (2 Daily Options)</option>
                </select>
              </div>
            </div>

            {/* 4 Major Allergy Blocks */}
            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wide mb-2">
                Allergy Exclusions (Check any to block ingredients)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { key: 'dairy', label: 'Dairy / Lactose' },
                  { key: 'nuts', label: 'Tree Nuts & Peanuts' },
                  { key: 'gluten', label: 'Gluten / Grains' },
                  { key: 'eggs', label: 'Eggs & Poultry' }
                ].map((item) => (
                  <label
                    key={item.key}
                    className={`flex items-center space-x-2.5 p-3 rounded-xl border text-sm cursor-pointer transition ${
                      allergies[item.key]
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-medium'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={allergies[item.key]}
                      onChange={() => toggleAllergy(item.key)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SINGLE PRIMARY CTA */}
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-base transition shadow-sm ${
                isFormValid
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white cursor-pointer'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              {isFormValid ? 'Generate Custom Salad Plan' : 'Complete All Mandatory Fields Above'}
            </button>
          </div>
        </form>

        {/* ==========================================
            SECTION 3: RECIPES & GROCERIES SECTION
           ========================================== */}
        {generatedOutput && (
          <div ref={resultsRef} className="space-y-8">
            {/* Macro Target Summary Banner */}
            <div className="bg-emerald-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm print:bg-stone-100 print:text-stone-900 print:border">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-300 font-semibold print:text-stone-500">
                  Calculated Breakfast Target
                </p>
                <h3 className="text-xl font-bold mt-0.5">
                  {generatedOutput.targetMacros.calories} kcal per bowl
                </h3>
              </div>
              <div className="flex gap-4 text-center">
                <div className="bg-emerald-800/80 px-4 py-2 rounded-xl print:bg-white print:border">
                  <span className="block text-lg font-bold">{generatedOutput.targetMacros.proteinGrams}g</span>
                  <span className="text-xs text-emerald-200 print:text-stone-500">Protein</span>
                </div>
                <div className="bg-emerald-800/80 px-4 py-2 rounded-xl print:bg-white print:border">
                  <span className="block text-lg font-bold">{generatedOutput.targetMacros.carbGrams}g</span>
                  <span className="text-xs text-emerald-200 print:text-stone-500">Carbs</span>
                </div>
                <div className="bg-emerald-800/80 px-4 py-2 rounded-xl print:bg-white print:border">
                  <span className="block text-lg font-bold">{generatedOutput.targetMacros.fatGrams}g</span>
                  <span className="text-xs text-emerald-200 print:text-stone-500">Fats</span>
                </div>
              </div>
            </div>

            {/* SUB-SECTION A: GENERATED SALAD RECIPES */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">
                    Sub-Section A: Generated Salad Recipes
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Locked 4-pillar macro structure with dynamically scaled gram portions.
                  </p>
                </div>

                {/* Plan-Specific Export CTA */}
                <div className="flex items-center gap-2 print:hidden">
                  {planHorizon === '7day' ? (
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
                    >
                      <span>Download Weekly Plan (PDF)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCopyClipboard}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
                    >
                      <span>{copiedToast ? 'Copied to Clipboard!' : 'Copy Daily Plan to Clipboard'}</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {generatedOutput.salads.map((salad, idx) => (
                  <div
                    key={idx}
                    className="border border-stone-200 rounded-xl p-5 bg-stone-50/70 flex flex-col justify-between space-y-4 break-inside-avoid"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                          {salad.dayLabel}
                        </span>
                        <span className="text-xs font-semibold bg-white border border-stone-200 px-2.5 py-0.5 rounded-full text-stone-700">
                          {salad.macros.calories} kcal • {salad.macros.protein}g P
                        </span>
                      </div>
                      <h3 className="font-bold text-stone-900 text-base mt-1">{salad.title}</h3>

                      {/* Scaled Ingredients List */}
                      <ul className="mt-3 space-y-1.5 text-sm text-stone-700">
                        {salad.components.map((c, cIdx) => (
                          <li key={cIdx} className="flex justify-between border-b border-stone-200/60 pb-1">
                            <span>{c.item.name}</span>
                            <span className="font-semibold text-stone-900">{c.grams}g</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Collapsible Short & Precise Recipe Prep Block */}
                    <details className="group bg-white border border-stone-200 rounded-lg p-3 text-xs">
                      <summary className="font-semibold text-emerald-800 cursor-pointer select-none flex items-center justify-between">
                        <span>Click to Expand Recipe Prep</span>
                        <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <ol className="mt-2.5 space-y-1.5 text-stone-600 list-decimal list-inside leading-relaxed">
                        <li>
                          <strong>Prep Base:</strong> {salad.components[0].item.prep_tip}
                        </li>
                        <li>
                          <strong>Cook/Assemble:</strong> {salad.components[1].item.prep_tip}{' '}
                          {salad.components[2].item.prep_tip}
                        </li>
                        <li>
                          <strong>Dress & Toss:</strong> {salad.components[3].item.prep_tip} Toss gently and serve fresh.
                        </li>
                      </ol>
                    </details>
                  </div>
                ))}
              </div>
            </section>

            {/* SUB-SECTION B: CONSOLIDATED GROCERY LIST & APPROX PRICE */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 md:p-8 space-y-6 break-inside-avoid">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">
                    Sub-Section B: Consolidated Grocery List & Approx. Price
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Quantities rounded up to standard Indian retail purchase units.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-xs text-stone-500">Approx. Total</span>
                    <span className="text-xl font-extrabold text-emerald-800">
                      ~₹{generatedOutput.totalEstimatedInr}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyClipboard}
                    className="print:hidden bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-stone-300 transition"
                  >
                    {copiedToast ? 'Copied!' : 'Copy List'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(generatedOutput.categorizedGroceries).map(([category, items]) =>
                  items.length > 0 ? (
                    <div key={category} className="space-y-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 border-b pb-1.5">
                        {category}
                      </h3>
                      <ul className="space-y-2.5 text-sm">
                        {items.map((item) => (
                          <li key={item.id} className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-medium text-stone-800 block">{item.name}</span>
                              <span className="text-xs text-stone-500">
                                Buy {item.packsNeeded}× {item.marketUnitLabel} (Need {item.totalGramsNeeded}g)
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-stone-600 whitespace-nowrap">
                              ~₹{item.estimatedCost}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null
                )}
              </div>

              {/* Minor Feature Disclaimer Note */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900">
                <strong>Note on Indicative Pricing:</strong> Approximate INR prices are based on baseline Indian quick-commerce retail packs and may vary by city, brand, and seasonal availability.
              </div>
            </section>

            {/* ==========================================
                SECTION 4: VALIDATION & FEEDBACK POLL
               ========================================== */}
            <section className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 text-center space-y-3 print:hidden">
              <h3 className="text-base font-bold text-stone-900">
                Quick Validation Check: Did you find this Salad Bowl plan useful?
              </h3>
              <p className="text-xs text-stone-500">
                Your single response helps validate this tool (restricted to one vote per unique IP/session).
              </p>

              {feedbackStatus === null ? (
                <div className="flex justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => handleFeedbackSubmit('yes')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-sm font-semibold transition"
                  >
                    👍 Yes, very useful
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedbackSubmit('no')}
                    className="px-5 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-300 text-sm font-semibold transition"
                  >
                    👎 Not quite
                  </button>
                </div>
              ) : (
                <div className="inline-block bg-emerald-50 text-emerald-800 text-xs font-semibold px-4 py-2 rounded-full border border-emerald-200">
                  {feedbackStatus === 'already_voted'
                    ? '✓ Feedback already recorded for this IP/session. Thank you!'
                    : '✓ Thank you! Your feedback has been recorded for product validation.'}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}