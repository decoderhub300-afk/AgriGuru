import React, { useState, useEffect } from 'react';
import { 
  Sprout, CloudSun, Calendar, Bell, Bot, BarChart3, Settings, 
  MapPin, Plus, Trash2, CheckCircle2, Clock, AlertTriangle, 
  Droplet, ShieldAlert, ChevronRight, Globe, Download, RefreshCw, 
  Search, FileText, Check, X, ArrowUpRight, Compass, Heart, 
  Layers, Package, Award, Sparkles, AlertCircle, PhoneCall, HelpCircle,
  Navigation, User, CheckCircle, RotateCcw, Send, Image as ImageIcon,
  Lightbulb, MessageSquare, Mic, MicOff, Volume2, VolumeX
} from 'lucide-react';

const t = {
  en: {
    appName: "AgriGuru", tagline: "Your Smart Companion from Sowing to Harvesting.", dashboard: "Dashboard", farms: "Farms & Plots", seeds: "Seeds & Inventory", calendar: "Farming Calendar", weather: "Live Weather", advisor: "AgriGuru AI", logs: "Activity Logs", settings: "Profile & Settings", activeCrops: "Active Crops", totalPlots: "Total Plots", pendingTasks: "Pending Tasks", weatherAlerts: "Weather Warnings", cropAge: "Crop Age", days: "days", sowedOn: "Sowed on", expectedHarvest: "Expected Harvest", viewDetails: "View Details", addNewPlot: "Add New Farm Plot", recordSowing: "Record Seed Sowing", logActivity: "Log Irrigation / Fertilizer", askAI: "Ask AgriGuru AI", temperature: "Temperature", humidity: "Humidity", wind: "Wind", rainfall: "Rainfall Forecast", aiAdvisorTitle: "AgriGuru Intelligent Advisor", aiSubtitle: "Ask anything about your crops, weather precautions, or pest management.", typePrompt: "Type or speak your farming question...", send: "Send", save: "Save Record", cancel: "Cancel", completed: "Completed", dueToday: "Due Today", overdue: "Overdue", pending: "Pending", markComplete: "Mark Complete", exportCSV: "Export CSV", printReport: "Print Report", soilType: "Soil Type", irrigationMethod: "Irrigation Method", plotName: "Plot / Field Name", cropName: "Crop Name & Variety", sowingDate: "Sowing Date", area: "Area", actions: "Actions", noData: "No records found. Get started by adding a plot or crop!", noCropsYet: "No crops added yet.", noTasksYet: "No farming tasks scheduled yet.", noWeatherYet: "Set up your farm location to see local weather.", addFirstCrop: "Add Your First Crop", resetApp: "Reset App Data", confirmReset: "Are you sure you want to reset all profile and farm data? This action cannot be undone."
  },
  hi: {
    appName: "एग्रीगुरु (AgriGuru)", tagline: "बुवाई से कटाई तक आपका स्मार्ट साथी।", dashboard: "डैशबोर्ड", farms: "खेत और प्लॉट", seeds: "बीज और सामग्री", calendar: "खेती कैलेंडर", weather: "लाइव मौसम", advisor: "एग्रीगुरु एआई", logs: "गतिविधि लॉग", settings: "प्रोफ़ाइल और सेटिंग्स", activeCrops: "सक्रिय फसलें", totalPlots: "कुल प्लॉट", pendingTasks: "लंबित कार्य", weatherAlerts: "मौसम चेतावनी", cropAge: "फसल की आयु", days: "दिन", sowedOn: "बोया गया", expectedHarvest: "अनुमानित कटाई", viewDetails: "विवरण देखें", addNewPlot: "नया खेत प्लॉट जोड़ें", recordSowing: "बीज बुवाई दर्ज करें", logActivity: "सिंचाई / खाद दर्ज करें", askAI: "एग्रीगुरु एआई से पूछें", temperature: "तापमान", humidity: "नमी", wind: "हवा", rainfall: "वर्षा पूर्वानुमान", aiAdvisorTitle: "एग्रीगुरु बुद्धिमान सलाहकार", aiSubtitle: "अपनी फसलों, मौसम सावधानियों या कीट प्रबंधन के बारे में कुछ भी पूछें।", typePrompt: "अपना कृषि प्रश्न टाइप करें या बोलें...", send: "भेजें", save: "रिकॉर्ड सहेजें", cancel: "रद्द करें", completed: "पूर्ण", dueToday: "आज देय", overdue: "अतिदेय", pending: "लंबित", markComplete: "पूर्ण के रूप में चिह्नित करें", exportCSV: "सीएसवी निर्यात", printReport: "प्रिंट रिपोर्ट", soilType: "मिट्टी का प्रकार", irrigationMethod: "सिंचाई विधि", plotName: "प्लॉट / खेत का नाम", cropName: "फसल का नाम और किस्म", sowingDate: "बुवाई की तारीख", area: "क्षेत्रफल", actions: "कार्य", noData: "कोई रिकॉर्ड नहीं मिला। प्लॉट या फसल जोड़कर शुरुआत करें!", noCropsYet: "अभी तक कोई फसल नहीं जोड़ी गई है।", noTasksYet: "अभी तक कोई कृषि कार्य निर्धारित नहीं है।", noWeatherYet: "स्थानीय मौसम देखने के लिए अपने खेत का स्थान सेट करें।", addFirstCrop: "अपनी पहली फसल जोड़ें", resetApp: "ऐप डेटा रीसेट करें", confirmReset: "क्या आप वाकई सभी प्रोफ़ाइल और फ़ार्म डेटा रीसेट करना चाहते हैं? इस कार्रवाई को पूर्ववत नहीं किया जा सकता।"
  }
};

/* ───────── UI-only styling helpers (no logic) ───────── */
const FURROWS = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Cpath d='M-4 32L32 -4M-4 18L18 -4M10 32L32 10' stroke='%23ffffff' stroke-opacity='.07' stroke-width='2'/%3E%3C/svg%3E")`;
const inputCls = "w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none transition focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-600 placeholder:text-stone-400";
const labelCls = "block text-xs font-semibold text-stone-600 mb-1.5";
const btnPrimary = "bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:ring-4 focus-visible:ring-emerald-500/30 outline-none";
const btnGhost = "text-stone-600 font-semibold rounded-xl hover:bg-stone-100 transition active:scale-95";
const emptyBox = "bg-white/70 p-10 rounded-3xl border-2 border-dashed border-emerald-300/70 text-center";
const lift = "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10";

const CROP_THEMES = [
  { grad: 'from-emerald-500 to-lime-400', soft: 'bg-emerald-50', border: 'border-emerald-200' },
  { grad: 'from-amber-500 to-yellow-300', soft: 'bg-amber-50', border: 'border-amber-200' },
  { grad: 'from-sky-500 to-cyan-300', soft: 'bg-sky-50', border: 'border-sky-200' },
  { grad: 'from-rose-500 to-orange-300', soft: 'bg-rose-50', border: 'border-rose-200' },
  { grad: 'from-violet-500 to-fuchsia-300', soft: 'bg-violet-50', border: 'border-violet-200' },
  { grad: 'from-teal-500 to-emerald-300', soft: 'bg-teal-50', border: 'border-teal-200' },
];
const cropEmoji = (name = '') => {
  const n = name.toLowerCase();
  const map = [[/wheat|gehu|गेहूं/, '🌾'], [/rice|paddy|dhan|धान|चावल/, '🌾'], [/maize|corn|makka|मक्का/, '🌽'], [/tomato|टमाटर/, '🍅'], [/potato|aloo|आलू/, '🥔'], [/onion|pyaz|प्याज/, '🧅'], [/chilli|chili|pepper|मिर्च/, '🌶️'], [/brinjal|eggplant|baingan|बैंगन/, '🍆'], [/sugarcane|ganna|गन्ना/, '🎋'], [/banana|केला/, '🍌'], [/mango|आम/, '🥭'], [/soy|mustard|sarson|सरसों|सोयाबीन/, '🌼'], [/cotton|कपास/, '☁️'], [/carrot|gajar|गाजर/, '🥕'], [/pea|matar|मटर|gram|chana|चना/, '🫛']];
  const hit = map.find(([re]) => re.test(n));
  return hit ? hit[1] : '🌱';
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&display=swap');
    .ag-root { font-family: 'Hind', ui-sans-serif, system-ui, sans-serif; background: #eef4ec; }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    @keyframes agFade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
    @keyframes agPop { from { opacity: 0; transform: scale(.94) translateY(8px); } to { opacity: 1; transform: none; } }
    @keyframes agSway { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
    @keyframes agDot { 0%,80%,100% { transform: translateY(0); opacity: .4; } 40% { transform: translateY(-5px); opacity: 1; } }
    @keyframes agGrow { from { width: 0; } }
    @keyframes agMsg { from { opacity: 0; transform: translateY(6px) scale(.98); } to { opacity: 1; transform: none; } }
    .animate-fadeIn { animation: agFade .45s ease-out both; }
    .ag-pop { animation: agPop .28s cubic-bezier(.2,.9,.3,1.2) both; }
    .ag-sway { animation: agSway 3.6s ease-in-out infinite; transform-origin: 50% 90%; }
    .ag-dot { display:inline-block; width:7px; height:7px; border-radius:9999px; background:#047857; animation: agDot 1.2s infinite; }
    .ag-grow { animation: agGrow 1s ease-out both; }
    .ag-msg { animation: agMsg .3s ease-out both; }
    @media (prefers-reduced-motion: reduce) { .animate-fadeIn,.ag-pop,.ag-sway,.ag-dot,.ag-grow,.ag-msg { animation: none !important; } }
  `}</style>
);

export default function AgriGuruApp() {
  const [isOnboarded, setIsOnboarded] = useState(() => localStorage.getItem('agriguru_profile_completed') === 'true');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);

  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('agriguru_farmer_profile');
    return saved ? JSON.parse(saved) : { name: '', village: '', district: '', state: '', pincode: '', season: 'Kharif / Rabi', lat: null, lon: null, locationType: '' };
  });

  const [plots, setPlots] = useState(() => JSON.parse(localStorage.getItem('agriguru_plots') || '[]'));
  const [crops, setCrops] = useState(() => JSON.parse(localStorage.getItem('agriguru_crops') || '[]'));
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('agriguru_tasks') || '[]'));
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem('agriguru_logs') || '[]'));
  const [weatherData, setWeatherData] = useState(() => JSON.parse(localStorage.getItem('agriguru_weather') || 'null'));

  useEffect(() => {
    localStorage.setItem('agriguru_farmer_profile', JSON.stringify(farmerProfile));
    localStorage.setItem('agriguru_plots', JSON.stringify(plots));
    localStorage.setItem('agriguru_crops', JSON.stringify(crops));
    localStorage.setItem('agriguru_tasks', JSON.stringify(tasks));
    localStorage.setItem('agriguru_logs', JSON.stringify(logs));
    if (weatherData) localStorage.setItem('agriguru_weather', JSON.stringify(weatherData));
  }, [farmerProfile, plots, crops, tasks, logs, weatherData]);

  useEffect(() => {
    if (isOnboarded && !weatherData) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setFarmerProfile(prev => ({ ...prev, lat: latitude, lon: longitude, locationType: 'gps' }));
            fetchWeatherForLocation(latitude, longitude, "GPS Location");
          },
          () => fetchWeatherForLocation(22.7196, 75.8577, "Indore")
        );
      } else {
        fetchWeatherForLocation(22.7196, 75.8577, "Indore");
      }
    }
  }, [isOnboarded]);

  const [showPlotModal, setShowPlotModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [cropToDelete, setCropToDelete] = useState(null);
  const [onboardProfile, setOnboardProfile] = useState({ name: '', language: 'en', state: '', district: '', village: '', pincode: '' });
  const [onboardFarm, setOnboardFarm] = useState({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  const [locationStatus, setLocationStatus] = useState({ loading: false, message: '' });
  const [newPlot, setNewPlot] = useState({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  const [newCrop, setNewCrop] = useState({ plotId: '', cropName: '', variety: '', supplier: '', sowingDate: new Date().toISOString().split('T')[0], areaUsed: 1, durationDays: 120 });
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: 'Namaste! I am your AgriGuru AI Advisor. Ask me anything about farming!', time: 'Just now', id: 'initial' }]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const quickQuestions = [
    "How to manage yellowing leaves on Wheat?",
    "Best fertilizer schedule for Paddy/Rice",
    "What causes seasons on Earth?",
    "Explain photosynthesis in simple terms"
  ];

  const speakText = (text, messageId) => {
    if (!window.speechSynthesis) return;
    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.onstart = () => setSpeakingMessageId(messageId);
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    window.speechSynthesis.speak(utterance);
  };

  const toggleRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported. Use Chrome/Edge.");
      return;
    }
    if (isRecording) {
      if (window.recognitionInstance) window.recognitionInstance.stop();
      setIsRecording(false);
    } else {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      recognition.interimResults = false;
      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        setChatInput((prev) => (prev ? prev + " " + event.results[0][0].transcript : event.results[0][0].transcript));
        setIsRecording(false);
      };
      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      window.recognitionInstance = recognition;
      recognition.start();
    }
  };

    const handleSendMessage = async (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim() || isAiLoading) return;

    const userMsg = { 
      role: 'user', 
      text: query, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      id: 'user_' + Date.now() 
    };
    
    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsAiLoading(true);

    try {
      // ✅ SECURE: Reads from Vercel/.env. Never hardcoded.
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      // ✅ CURRENT ACTIVE MODEL: Replaces deprecated models
      const modelName = "openai/gpt-oss-20b"; 
      
      // 🔍 DEBUG: Check your browser console (F12) to confirm this is running
      console.log("Using model:", modelName);

      if (!apiKey) {
        throw new Error("Missing VITE_GROQ_API_KEY. Please check your .env or Vercel settings.");
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${apiKey}`, 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { 
              role: "system", 
              content: "You are AgriGuru AI, an expert smart farming assistant. Provide accurate, practical advice on crop management, pest diagnostics, soil health, and weather. Keep responses clear and structured. Do not use markdown asterisks (*) in your response." 
            },
            ...chatMessages.map(m => ({ 
              role: m.role === 'user' ? 'user' : 'assistant', 
              content: m.text 
            })),
            { role: "user", content: query }
          ],
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `API failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      const cleanText = data.choices[0].message.content.replace(/\*/g, '');
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        text: cleanText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        id: 'ai_' + Date.now() 
      }]);

    } catch (err) {
      console.error("AI Chat Error:", err);
      
      // 🔍 DEBUG: Shows the EXACT error in the chat so you know what failed
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        text: `AgriGuru AI error: ${err.message}`, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        id: 'error_' + Date.now() 
      }]);
    } finally {
      setIsAiLoading(false);
    }
  };
  const txt = t[lang];

  const fetchWeatherForLocation = async (latitude, longitude, locName) => {
    setLocationStatus({ loading: true, message: 'Detecting live location & fetching weather...' });
    try {
      let resolvedName = locName;
      try {
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        const geoData = await geoRes.json();
        if (geoData && geoData.address) {
          const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state_district || '';
          const state = geoData.address.state || '';
          if (city) {
            resolvedName = `${city}, ${state}`;
            setFarmerProfile(prev => ({ ...prev, village: city, state: state, district: geoData.address.county || prev.district, lat: latitude, lon: longitude }));
          }
        }
      } catch (e) { console.warn("Reverse geocode failed", e); }

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
      const data = await res.json();
      
      if (data && data.current_weather) {
        const curr = data.current_weather;
        setWeatherData({
          temp: Math.round(curr.temperature), feelsLike: Math.round(curr.temperature),
          condition: curr.weathercode <= 3 ? 'Clear / Partly Cloudy' : 'Cloudy / Precipitation',
          humidity: data.hourly?.relativehumidity_2m?.[0] || 50, windSpeed: curr.windspeed,
          rainfallChance: `${data.daily?.precipitation_probability_max?.[0] || 10}%`,
          locationName: resolvedName, lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          forecast: (data.daily?.time || []).slice(0, 7).map((time, idx) => ({
            day: idx === 0 ? 'Today' : new Date(time).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            temp: `${Math.round(data.daily.temperature_2m_max[idx])}° / ${Math.round(data.daily.temperature_2m_min[idx])}°`,
            cond: data.daily.precipitation_probability_max[idx] > 40 ? 'Rain Likely' : 'Sunny/Clear',
            rain: `${data.daily.precipitation_probability_max[idx]}%`
          }))
        });
        setLocationStatus({ loading: false, message: `Live location detected: ${resolvedName}` });
      }
    } catch (err) {
      setLocationStatus({ loading: false, message: 'Failed to load live weather. Using default coordinates.' });
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus({ loading: false, message: 'Geolocation is not supported by your browser.' });
      return;
    }
    setLocationStatus({ loading: true, message: 'Acquiring GPS coordinates...' });
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeatherForLocation(pos.coords.latitude, pos.coords.longitude, "GPS Location"),
      () => {
        setLocationStatus({ loading: false, message: 'GPS access denied. Using default location.' });
        fetchWeatherForLocation(24.12, 82.65, "Vindhyanagar");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const handleCompleteOnboarding = () => {
    setFarmerProfile(prev => ({ ...prev, ...onboardProfile }));
    setLang(onboardProfile.language);
    if (onboardFarm.name && onboardFarm.area) {
      setPlots([{ id: 'p_' + Date.now(), ...onboardFarm, village: onboardProfile.village, district: onboardProfile.district, state: onboardProfile.state, pin: onboardProfile.pincode }]);
    }
    localStorage.setItem('agriguru_profile_completed', 'true');
    setIsOnboarded(true);
  };

  const getCropAge = (sowingDateStr) => {
    if (!sowingDateStr) return 0;
    return Math.ceil(Math.abs(new Date() - new Date(sowingDateStr)) / (1000 * 60 * 60 * 24));
  };

  const handleAddPlot = (e) => {
    e.preventDefault();
    if (!newPlot.name || !newPlot.area) return;
    setPlots([...plots, { id: 'p_' + Date.now(), ...newPlot, village: farmerProfile.village, district: farmerProfile.district, state: farmerProfile.state }]);
    setShowPlotModal(false);
    setNewPlot({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  };

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (!newCrop.cropName || !newCrop.sowingDate) return;
    const selectedPlot = plots.find(p => p.id === newCrop.plotId) || plots[0];
    const hDate = new Date(new Date(newCrop.sowingDate).getTime() + ((newCrop.durationDays || 120) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
    const cropToAdd = { id: 'c_' + Date.now(), ...newCrop, plotId: selectedPlot ? selectedPlot.id : '', plotName: selectedPlot ? selectedPlot.name : 'General Field', expectedHarvest: hDate, stage: 'Germination & Establishment', status: 'Growing' };
    setCrops([...crops, cropToAdd]);
    
    setTasks([...tasks, { id: 't_' + Date.now(), cropId: cropToAdd.id, title: `${cropToAdd.cropName} - Initial Irrigation & Soil Moisture Inspection`, date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'Pending', priority: 'High', cropName: cropToAdd.cropName }]);
    setLogs([{ id: 'l_' + Date.now(), date: newCrop.sowingDate, type: 'Sowing', plot: cropToAdd.plotName, crop: cropToAdd.cropName, details: `Sowed ${newCrop.cropName} in ${newCrop.areaUsed || 1} ${selectedPlot?.unit || 'acres'}` }, ...logs]);
    
    setShowCropModal(false);
    setNewCrop({ plotId: '', cropName: '', variety: '', supplier: '', sowingDate: new Date().toISOString().split('T')[0], areaUsed: 1, durationDays: 120 });
  };

  const handleTaskToggle = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  const handleDeleteCrop = (cropId) => {
    setCrops(crops.filter(c => c.id !== cropId));
    setTasks(tasks.filter(tk => tk.cropId !== cropId));
    setCropToDelete(null);
  };

  const handleResetApp = () => {
    localStorage.clear();
    setPlots([]); setCrops([]); setTasks([]); setLogs([]); setWeatherData(null);
    setFarmerProfile({ name: '', village: '', district: '', state: '', pincode: '', season: 'Kharif / Rabi' });
    setIsOnboarded(false); setOnboardingStep(1); setShowResetConfirm(false);
  };

  /* ───────────────────────── ONBOARDING ───────────────────────── */
  if (!isOnboarded) {
    return (
      <div className="ag-root min-h-screen flex items-center justify-center p-4 text-stone-900 antialiased" style={{ backgroundImage: `radial-gradient(1000px 500px at 10% -10%, #bbf7d0 0%, transparent 60%), radial-gradient(800px 500px at 100% 110%, #fde68a 0%, transparent 55%)` }}>
        <GlobalStyles />
        <div className="ag-pop bg-white w-full max-w-xl rounded-[28px] shadow-2xl shadow-emerald-900/15 border border-white overflow-hidden">
          <div className="text-white p-6 space-y-3" style={{ backgroundColor: '#064e3b', backgroundImage: FURROWS }}>
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-700/80 p-2.5 rounded-2xl ring-1 ring-emerald-400/30"><Sprout className="w-8 h-8 text-amber-300 ag-sway" /></div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">AgriGuru</h1>
                <p className="text-xs text-emerald-200">{txt.tagline}</p>
              </div>
            </div>
            {onboardingStep > 1 && (
              <div className="flex items-center space-x-2 pt-2">
                {[2, 3, 4, 5].map((step) => (
                  <div key={step} className="h-1.5 flex-1 rounded-full bg-emerald-800 overflow-hidden">
                    <div className={`h-full rounded-full bg-amber-400 transition-all duration-500 ${onboardingStep >= step ? 'w-full' : 'w-0'}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 sm:p-8">
            {onboardingStep === 1 && (
              <div className="text-center space-y-6 py-4 animate-fadeIn">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-amber-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50"><Sprout className="w-12 h-12 ag-sway" /></div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-stone-900">Welcome to AgriGuru! 🌱</h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">Your personal smart farming advisor. Track crops from seed sowing to harvest, monitor live weather, and receive timely agricultural guidance.</p>
                </div>
                <button onClick={() => setOnboardingStep(2)} className={`${btnPrimary} w-full py-3.5 flex items-center justify-center space-x-2 group`}>
                  <span>Get Started</span><ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
            {onboardingStep === 2 && (
              <div className="space-y-5 animate-fadeIn">
                <div><h2 className="text-xl font-bold text-stone-900">Step 1: Farmer Profile</h2><p className="text-xs text-stone-500">Please enter your basic information.</p></div>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Preferred Language</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button type="button" onClick={() => setOnboardProfile({ ...onboardProfile, language: 'en' })} className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all active:scale-95 ${onboardProfile.language === 'en' ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm' : 'border-stone-200 text-stone-600 hover:border-emerald-300'}`}>English</button>
                      <button type="button" onClick={() => setOnboardProfile({ ...onboardProfile, language: 'hi' })} className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all active:scale-95 ${onboardProfile.language === 'hi' ? 'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-sm' : 'border-stone-200 text-stone-600 hover:border-emerald-300'}`}>हिंदी (Hindi)</button>
                    </div>
                  </div>
                  <div><label className={labelCls}>Full Name *</label><input type="text" required value={onboardProfile.name} onChange={(e) => setOnboardProfile({ ...onboardProfile, name: e.target.value })} placeholder="e.g. Rajesh Kumar" className={inputCls} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>State *</label><input type="text" required value={onboardProfile.state} onChange={(e) => setOnboardProfile({ ...onboardProfile, state: e.target.value })} placeholder="e.g. Punjab" className={inputCls} /></div>
                    <div><label className={labelCls}>District *</label><input type="text" required value={onboardProfile.district} onChange={(e) => setOnboardProfile({ ...onboardProfile, district: e.target.value })} placeholder="e.g. Ludhiana" className={inputCls} /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Village / Town *</label><input type="text" required value={onboardProfile.village} onChange={(e) => setOnboardProfile({ ...onboardProfile, village: e.target.value })} placeholder="e.g. Khanna" className={inputCls} /></div>
                    <div><label className={labelCls}>PIN Code</label><input type="text" value={onboardProfile.pincode} onChange={(e) => setOnboardProfile({ ...onboardProfile, pincode: e.target.value })} placeholder="141401" className={inputCls} /></div>
                  </div>
                </div>
                <div className="pt-3 flex justify-between">
                  <button onClick={() => setOnboardingStep(1)} className={`${btnGhost} px-4 py-2.5 text-sm`}>Back</button>
                  <button disabled={!onboardProfile.name || !onboardProfile.state || !onboardProfile.district || !onboardProfile.village} onClick={() => setOnboardingStep(3)} className={`${btnPrimary} disabled:opacity-40 disabled:hover:translate-y-0 disabled:shadow-none px-6 py-2.5 text-sm`}>Continue</button>
                </div>
              </div>
            )}
            {onboardingStep === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div><h2 className="text-xl font-bold text-stone-900">Step 2: Location Setup</h2><p className="text-xs text-stone-500">Configure your location to receive real local weather.</p></div>
                <div className="space-y-3">
                  <button onClick={handleGetCurrentLocation} className={`w-full bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 p-4 rounded-2xl flex items-center space-x-3 text-left ${lift} active:scale-[.98]`}>
                    <div className="p-2.5 bg-sky-600 text-white rounded-xl"><Navigation className="w-5 h-5" /></div>
                    <div><h4 className="font-bold text-sm">Use My Current Location (GPS)</h4><p className="text-xs text-sky-700">Request browser geolocation permission.</p></div>
                  </button>
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                    <h4 className="font-bold text-sm text-stone-900">Manual Location Selected:</h4>
                    <p className="text-xs text-stone-600">{onboardProfile.village}, {onboardProfile.district}, {onboardProfile.state} {onboardProfile.pincode}</p>
                  </div>
                  {locationStatus.message && (
                    <div className={`ag-pop p-3 rounded-xl text-xs font-medium ${locationStatus.loading ? 'bg-amber-50 text-amber-800 border border-amber-200 animate-pulse' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'}`}>{locationStatus.message}</div>
                  )}
                </div>
                <div className="pt-3 flex justify-between">
                  <button onClick={() => setOnboardingStep(2)} className={`${btnGhost} px-4 py-2.5 text-sm`}>Back</button>
                  <button onClick={() => setOnboardingStep(4)} className={`${btnPrimary} px-6 py-2.5 text-sm`}>Next: Setup Farm</button>
                </div>
              </div>
            )}
            {onboardingStep === 4 && (
              <div className="space-y-5 animate-fadeIn">
                <div><h2 className="text-xl font-bold text-stone-900">Step 3: Register Your First Farm Plot</h2><p className="text-xs text-stone-500">Add land details to start managing crops.</p></div>
                <div className="space-y-4">
                  <div><label className={labelCls}>Farm / Plot Name *</label><input type="text" value={onboardFarm.name} onChange={(e) => setOnboardFarm({ ...onboardFarm, name: e.target.value })} placeholder="e.g. Main Road Field" className={inputCls} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Area Size *</label><input type="number" step="0.1" value={onboardFarm.area} onChange={(e) => setOnboardFarm({ ...onboardFarm, area: e.target.value })} placeholder="2.5" className={inputCls} /></div>
                    <div><label className={labelCls}>Unit</label><select value={onboardFarm.unit} onChange={(e) => setOnboardFarm({ ...onboardFarm, unit: e.target.value })} className={inputCls}><option value="acres">Acres</option><option value="hectares">Hectares</option><option value="bigha">Bigha</option></select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className={labelCls}>Soil Type</label><select value={onboardFarm.soil} onChange={(e) => setOnboardFarm({ ...onboardFarm, soil: e.target.value })} className={inputCls}><option value="Alluvial (Loam)">Alluvial (Loam)</option><option value="Black Cotton Soil">Black Cotton Soil</option><option value="Red Sandy Soil">Red Sandy Soil</option><option value="Clay Soil">Clay Soil</option></select></div>
                    <div><label className={labelCls}>Irrigation Method</label><input type="text" value={onboardFarm.irrigation} onChange={(e) => setOnboardFarm({ ...onboardFarm, irrigation: e.target.value })} placeholder="e.g. Canal / Drip" className={inputCls} /></div>
                  </div>
                </div>
                <div className="pt-3 flex justify-between">
                  <button onClick={() => setOnboardingStep(3)} className={`${btnGhost} px-4 py-2.5 text-sm`}>Back</button>
                  <button onClick={() => setOnboardingStep(5)} className={`${btnPrimary} px-6 py-2.5 text-sm`}>Continue</button>
                </div>
              </div>
            )}
            {onboardingStep === 5 && (
              <div className="text-center space-y-6 py-4 animate-fadeIn">
                <div className="w-20 h-20 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-amber-50"><Sprout className="w-10 h-10 ag-sway" /></div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-stone-900">Setup Ready! 🎉</h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">Your farm profile has been created. You can add your first sowed crop now or explore your clean dashboard.</p>
                </div>
                <div className="pt-2 space-y-3">
                  <button onClick={handleCompleteOnboarding} className={`${btnPrimary} w-full py-3.5 flex items-center justify-center space-x-2`}>
                    <CheckCircle className="w-5 h-5" /><span>Go to My Personalized Dashboard</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ───────────────────────── MAIN APP ───────────────────────── */
  return (
    <div className="ag-root min-h-screen text-stone-900 flex flex-col antialiased">
      <GlobalStyles />
      <header className="text-white shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#064e3b', backgroundImage: FURROWS }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-700/70 p-2 rounded-2xl ring-1 ring-emerald-400/30 flex items-center justify-center"><Sprout className="w-7 h-7 text-amber-300 ag-sway" /></div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">{txt.appName}</h1>
                <span className="bg-amber-400 text-stone-900 text-[11px] font-bold px-2 py-0.5 rounded-full">Smart Farm</span>
              </div>
              <p className="text-xs text-emerald-200">{txt.tagline}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <div className="hidden md:flex items-center space-x-2 bg-black/20 px-3 py-1.5 rounded-full ring-1 ring-white/10 text-xs text-emerald-50">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{farmerProfile.name} • {farmerProfile.village}, {farmerProfile.district} ({farmerProfile.state})</span>
            </div>
            <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-emerald-50 px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ring-white/15 transition active:scale-95">
              <Globe className="w-4 h-4 text-amber-300" />
              <span>{lang === 'en' ? 'हिंदी (Hindi)' : 'English'}</span>
            </button>
          </div>
        </div>
        <div className="bg-black/25 border-t border-white/10 px-4">
          <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar">
            {[
              { id: 'dashboard', label: txt.dashboard, icon: BarChart3 },
              { id: 'farms', label: txt.farms, icon: MapPin },
              { id: 'seeds', label: txt.seeds, icon: Package },
              { id: 'calendar', label: txt.calendar, icon: Calendar },
              { id: 'weather', label: txt.weather, icon: CloudSun },
              { id: 'advisor', label: txt.advisor, icon: Bot },
              { id: 'logs', label: txt.logs, icon: FileText },
              { id: 'settings', label: txt.settings, icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`group flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${isActive ? 'bg-white text-emerald-900 shadow-md' : 'text-emerald-100 hover:bg-white/10 hover:text-white'}`}>
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-emerald-700' : 'text-amber-300'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-900/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ backgroundImage: `${FURROWS}, linear-gradient(120deg, #065f46 0%, #047857 55%, #b45309 135%)` }}>
              <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-amber-300/25 blur-2xl pointer-events-none" />
              <div className="relative space-y-2">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Namaste, {farmerProfile.name} Ji! 🙏</h2>
                <p className="text-emerald-50/90 text-sm max-w-xl">{farmerProfile.village ? `${farmerProfile.village}, ${farmerProfile.district}` : 'Your Farm'} Dashboard</p>
              </div>
              <div className="relative flex flex-wrap gap-3 w-full md:w-auto">
                <button onClick={() => setShowCropModal(true)} className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold px-5 py-3 rounded-2xl text-sm shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center space-x-2 group">
                  <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /><span>{txt.recordSowing}</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`group bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center space-x-4 ${lift}`}>
                <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-md shadow-emerald-600/30 transition-transform group-hover:rotate-6 group-hover:scale-110"><Sprout className="w-6 h-6" /></div>
                <div><p className="text-xs text-stone-500 font-medium">{txt.activeCrops}</p><h3 className="text-3xl font-bold text-stone-900">{crops.length}</h3></div>
              </div>
              <div className={`group bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex items-center space-x-4 ${lift}`}>
                <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md shadow-amber-500/30 transition-transform group-hover:rotate-6 group-hover:scale-110"><MapPin className="w-6 h-6" /></div>
                <div><p className="text-xs text-stone-500 font-medium">{txt.totalPlots}</p><h3 className="text-3xl font-bold text-stone-900">{plots.length} <span className="text-base font-semibold text-stone-500">Plots</span></h3></div>
              </div>
              <div className={`group bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex items-center space-x-4 ${lift}`}>
                <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-600/30 transition-transform group-hover:rotate-6 group-hover:scale-110"><Clock className="w-6 h-6" /></div>
                <div><p className="text-xs text-stone-500 font-medium">{txt.pendingTasks}</p><h3 className="text-3xl font-bold text-stone-900">{tasks.filter(t => t.status === 'Pending').length}</h3></div>
              </div>
              <div className={`group bg-white p-5 rounded-2xl border border-sky-100 shadow-sm flex items-center space-x-4 ${lift}`}>
                <div className="p-3 bg-sky-500 text-white rounded-2xl shadow-md shadow-sky-500/30 transition-transform group-hover:rotate-6 group-hover:scale-110"><CloudSun className="w-6 h-6" /></div>
                <div><p className="text-xs text-stone-500 font-medium">{txt.temperature}</p><h3 className="text-3xl font-bold text-stone-900">{weatherData ? `${weatherData.temp}°C` : '--'}</h3><span className="text-xs text-sky-700 font-medium">{weatherData ? weatherData.condition : txt.noWeatherYet}</span></div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2"><Sprout className="w-5 h-5 text-emerald-700" /><span>Active Crops</span></h3>
                {crops.length === 0 ? (
                  <div className={`${emptyBox} space-y-3`}>
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center"><Sprout className="w-7 h-7 ag-sway" /></div>
                    <p className="text-stone-600 font-semibold">{txt.noCropsYet}</p>
                    <button onClick={() => setShowCropModal(true)} className={`${btnPrimary} px-5 py-2.5 text-xs`}>{txt.addFirstCrop}</button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {crops.map((crop, ci) => {
                      const age = getCropAge(crop.sowingDate);
                      const progressPercent = Math.min(100, Math.round((age / (crop.durationDays || 120)) * 100));
                      return (
                        <div key={crop.id} className={`relative overflow-hidden bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3 ${lift}`}>
                          <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${CROP_THEMES[ci % CROP_THEMES.length].grad}`} />
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{crop.plotName}</span>
                              <h4 className="text-xl font-bold text-stone-900 mt-1.5"><span className="mr-1.5">{cropEmoji(crop.cropName)}</span>{crop.cropName}</h4>
                              <p className="text-xs text-stone-600">Variety: {crop.variety || 'N/A'}</p>
                            </div>
                            <div className="flex items-center space-x-2"><span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">{txt.cropAge}: {age} {txt.days}</span><button onClick={() => setCropToDelete(crop)} title="Remove crop" className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition active:scale-90"><Trash2 className="w-4 h-4" /></button></div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-stone-100 h-3 rounded-full overflow-hidden">
                              <div className="ag-grow h-3 rounded-full bg-gradient-to-r from-emerald-500 via-lime-400 to-amber-400" style={{ width: `${progressPercent}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-emerald-800 w-9 text-right">{progressPercent}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2"><Clock className="w-5 h-5 text-amber-600" /><span>Tasks</span></h3>
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-2.5">
                  {tasks.length === 0 ? <p className="text-xs text-stone-500 text-center py-6">{txt.noTasksYet}</p> : tasks.map((task) => (
                    <div key={task.id} onClick={() => handleTaskToggle(task.id)} className={`p-3 rounded-xl border flex items-start justify-between cursor-pointer transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50/60 ${task.status === 'Completed' ? 'bg-emerald-50/50 border-emerald-200' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="flex items-start space-x-2.5">
                        <button className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border-2 shrink-0 transition-all duration-200 ${task.status === 'Completed' ? 'bg-emerald-600 text-white border-emerald-600 scale-110' : 'bg-white border-stone-300'}`}>
                          {task.status === 'Completed' && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <div><p className={`text-xs font-semibold transition ${task.status === 'Completed' ? 'line-through text-stone-400' : 'text-stone-900'}`}>{task.title}</p></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'farms' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div><h2 className="text-2xl font-bold text-stone-900">Registered Farm Plots</h2></div>
              <button onClick={() => setShowPlotModal(true)} className={`${btnPrimary} px-5 py-2.5 text-sm flex items-center space-x-2 group`}>
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /><span>{txt.addNewPlot}</span>
              </button>
            </div>
            {plots.length === 0 ? (
              <div className={emptyBox}><p className="text-stone-500 text-sm">No farm plots registered yet.</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plots.map((plot) => (
                  <div key={plot.id} className={`relative overflow-hidden bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 ${lift}`}>
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 to-amber-400" />
                    <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2 pt-1"><span className="p-1.5 bg-emerald-100 rounded-lg"><MapPin className="w-5 h-5 text-emerald-700" /></span><span>{plot.name} ({plot.area} {plot.unit})</span></h3>
                    <div className="pt-2 flex space-x-2">
                      <button onClick={() => setPlots(plots.filter(p => p.id !== plot.id))} className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all border border-red-200 text-xs font-semibold flex items-center space-x-1 active:scale-95">
                        <Trash2 className="w-4 h-4" /><span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'seeds' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">Seed & Input Inventory</h2>
                <p className="text-xs text-stone-500">{crops.length} {crops.length === 1 ? 'crop' : 'crops'} sown. Use the bin icon on a card to remove one.</p>
              </div>
              <button onClick={() => setShowCropModal(true)} className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all hover:-translate-y-0.5 active:scale-95 flex items-center space-x-2 group">
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /><span>{txt.recordSowing}</span>
              </button>
            </div>
            {crops.length === 0 ? (
              <div className={`${emptyBox} space-y-3`}>
                <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-3xl">🌱</div>
                <p className="text-stone-600 font-semibold">{txt.noCropsYet}</p>
                <button onClick={() => setShowCropModal(true)} className={`${btnPrimary} px-5 py-2.5 text-xs`}>{txt.addFirstCrop}</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {crops.map((c, i) => {
                  const th = CROP_THEMES[i % CROP_THEMES.length];
                  return (
                    <div key={c.id} className={`relative overflow-hidden rounded-2xl border ${th.border} ${th.soft} p-5 ${lift}`}>
                      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${th.grad}`} />
                      <div className="flex items-start justify-between pt-1">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${th.grad} flex items-center justify-center text-2xl shadow-md`}>{cropEmoji(c.cropName)}</div>
                          <div>
                            <h3 className="font-bold text-lg text-stone-900 leading-tight">{c.cropName}</h3>
                            <p className="text-xs text-stone-600">Variety: {c.variety || 'N/A'}</p>
                          </div>
                        </div>
                        <button onClick={() => setCropToDelete(c)} title="Remove crop" className="p-2 rounded-xl bg-white/80 text-red-500 hover:bg-red-500 hover:text-white shadow-sm transition active:scale-90"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                        <div className="bg-white/80 rounded-xl p-2.5"><p className="text-stone-500">{txt.sowingDate}</p><p className="font-bold text-stone-900">{c.sowingDate}</p></div>
                        <div className="bg-white/80 rounded-xl p-2.5"><p className="text-stone-500">{txt.expectedHarvest}</p><p className="font-bold text-stone-900">{c.expectedHarvest || 'N/A'}</p></div>
                        <div className="bg-white/80 rounded-xl p-2.5"><p className="text-stone-500">{txt.plotName}</p><p className="font-bold text-stone-900 truncate">{c.plotName || 'General Field'}</p></div>
                        <div className="bg-white/80 rounded-xl p-2.5"><p className="text-stone-500">{txt.cropAge}</p><p className="font-bold text-stone-900">{getCropAge(c.sowingDate)} {txt.days}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h2 className="text-2xl font-bold text-stone-900">Farming Calendar & Stages</h2>
              <button onClick={() => setShowCropModal(true)} className="bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all hover:-translate-y-0.5 active:scale-95 flex items-center space-x-2 group">
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /><span>{txt.recordSowing}</span>
              </button>
            </div>
            {crops.length === 0 ? (
              <div className={emptyBox}><p className="text-stone-500 text-sm">{txt.noCropsYet}</p></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crops.map((crop) => (
                  <div key={crop.id} className={`bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4 ${lift}`}>
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex flex-col items-center justify-center shadow-md">
                      <span className="text-lg font-bold leading-none">{getCropAge(crop.sowingDate)}</span><span className="text-[10px] opacity-90">{txt.days}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-stone-900"><span className="mr-1.5">{cropEmoji(crop.cropName)}</span>{crop.cropName}</h3>
                      <p className="text-xs text-stone-500">Sowed on: {crop.sowingDate} | Age: {getCropAge(crop.sowingDate)} days</p>
                      <p className="text-xs text-emerald-700 font-medium">{txt.expectedHarvest}: {crop.expectedHarvest || 'N/A'}</p>
                    </div>
                    <button onClick={() => setCropToDelete(crop)} title="Remove crop" className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition active:scale-90"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'weather' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">Live Hyperlocal Weather & 7-Day Forecast</h2>
                <p className="text-xs text-stone-500">Real-time meteorological data integrated with GPS coordinates</p>
              </div>
              <button onClick={handleGetCurrentLocation} className="bg-sky-700 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-xl text-sm shadow-md transition-all hover:-translate-y-0.5 active:scale-95 flex items-center space-x-2 group">
                <RefreshCw className={`w-4 h-4 transition-transform duration-500 group-hover:rotate-180 ${locationStatus.loading ? 'animate-spin' : ''}`} /><span>Refresh Live Weather</span>
              </button>
            </div>
            {weatherData ? (
              <div className="space-y-6">
                <div className="relative overflow-hidden text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-sky-900/20 space-y-4" style={{ backgroundImage: 'linear-gradient(160deg, #0369a1 0%, #0c4a6e 70%, #082f49 100%)' }}>
                  <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-amber-300/30 blur-2xl pointer-events-none" />
                  <CloudSun className="absolute right-6 top-6 w-24 h-24 text-amber-200/80 ag-sway pointer-events-none" />
                  <div className="relative flex justify-between items-start">
                    <div>
                      <span className="bg-white/15 text-sky-50 text-xs font-semibold px-3 py-1 rounded-full ring-1 ring-white/20">{weatherData.locationName}</span>
                      <h3 className="text-6xl font-bold mt-4">{weatherData.temp}°C</h3>
                      <p className="text-sm text-sky-100 mt-1">{weatherData.condition}</p>
                    </div>
                  </div>
                  <p className="relative text-xs text-sky-200">Last updated: {weatherData.lastUpdated}</p>
                  <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
                    {[['Humidity', `${weatherData.humidity}%`], ['Wind Speed', `${weatherData.windSpeed} km/h`], ['Rain Probability', weatherData.rainfallChance], ['Feels Like', `${weatherData.feelsLike}°C`]].map(([label, value]) => (
                      <div key={label} className="bg-white/10 hover:bg-white/20 transition p-3 rounded-2xl ring-1 ring-white/10 backdrop-blur-sm"><p className="text-xs text-sky-200 font-medium">{label}</p><p className="text-xl font-bold mt-0.5">{value}</p></div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2"><CloudSun className="w-5 h-5 text-sky-600" /><span>7-Day Extended Farming Weather Forecast</span></h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                    {weatherData.forecast && weatherData.forecast.map((dayItem, idx) => (
                      <div key={idx} className={`border p-4 rounded-2xl text-center space-y-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-sky-400 ${idx === 0 ? 'bg-sky-50 border-sky-300' : 'bg-stone-50 border-stone-200'}`}>
                        <p className="text-xs font-bold text-stone-700">{dayItem.day}</p>
                        <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center mx-auto">{dayItem.rain && parseInt(dayItem.rain) > 40 ? <Droplet className="w-5 h-5" /> : <CloudSun className="w-5 h-5" />}</div>
                        <p className="text-sm font-bold text-stone-900">{dayItem.temp}</p>
                        <p className="text-[11px] text-stone-600">{dayItem.cond}</p>
                        <span className="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Rain: {dayItem.rain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`${emptyBox} space-y-3`}>
                <p className="text-stone-600 text-sm">{txt.noWeatherYet}</p>
                <button onClick={handleGetCurrentLocation} className="bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition active:scale-95">Fetch Location Weather</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="space-y-4 animate-fadeIn flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto">
            <div className="text-white p-4 rounded-2xl shadow-lg flex items-center justify-between" style={{ backgroundColor: '#064e3b', backgroundImage: FURROWS }}>
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-400 text-stone-900 rounded-xl shadow-md"><Bot className="w-6 h-6" /></div>
                <div>
                  <h2 className="text-base font-bold">{txt.aiAdvisorTitle}</h2>
                  <p className="text-xs text-emerald-200">{txt.aiSubtitle}</p>
                </div>
              </div>
              <span className="bg-white/10 text-amber-200 text-xs px-3 py-1 rounded-full font-semibold flex items-center space-x-1.5 ring-1 ring-white/15">
                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span></span><Sparkles className="w-3.5 h-3.5" /><span>AI Active</span>
              </span>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <button key={idx} onClick={() => handleSendMessage(q)} className="bg-white hover:bg-emerald-600 hover:text-white border border-emerald-200 hover:border-emerald-600 text-emerald-900 text-xs py-2 px-3.5 rounded-full font-semibold whitespace-nowrap flex items-center space-x-1.5 shadow-sm transition-all hover:-translate-y-0.5 active:scale-95 shrink-0">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" /><span>{q}</span>
                </button>
              ))}
            </div>
            <div className="bg-white/90 rounded-2xl border border-stone-200 flex-1 p-4 overflow-y-auto space-y-4 shadow-inner">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`ag-msg flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2.5 max-w-xl ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow ${msg.role === 'user' ? 'bg-amber-400 text-stone-900 font-bold text-[10px]' : 'bg-emerald-800 text-white'}`}>
                      {msg.role === 'user' ? 'You' : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm space-y-2 shadow-sm ${msg.role === 'user' ? 'bg-gradient-to-br from-emerald-700 to-emerald-800 text-white rounded-tr-sm' : 'bg-stone-100 text-stone-800 rounded-tl-sm border border-stone-200'}`}>
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className={`text-[10px] ${msg.role === 'user' ? 'text-emerald-200' : 'text-stone-400'}`}>{msg.time}</span>
                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => speakText(msg.text, msg.id)}
                            className={`p-1.5 rounded-lg transition active:scale-90 ${speakingMessageId === msg.id ? 'bg-emerald-600 text-white animate-pulse' : 'bg-stone-200 text-stone-600 hover:bg-emerald-100 hover:text-emerald-800'}`}
                            title={speakingMessageId === msg.id ? "Stop Speaking" : "Read Aloud"}
                          >
                            {speakingMessageId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isAiLoading && (
                <div className="ag-msg flex justify-start items-center space-x-2.5 text-stone-500 text-xs py-2">
                  <div className="w-8 h-8 bg-emerald-800 text-white rounded-full flex items-center justify-center"><Bot className="w-4 h-4" /></div>
                  <div className="bg-stone-100 border border-stone-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center space-x-1.5">
                    <span className="ag-dot" /><span className="ag-dot" style={{ animationDelay: '.15s' }} /><span className="ag-dot" style={{ animationDelay: '.3s' }} />
                    <span className="font-medium pl-1">AgriGuru AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="bg-white p-2.5 rounded-2xl border border-stone-300 shadow-lg flex items-center space-x-2 transition focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-500/15">
              <button type="button" onClick={toggleRecording} className={`p-2.5 rounded-xl transition-all flex items-center justify-center active:scale-90 ${isRecording ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40' : 'bg-stone-100 text-stone-600 hover:bg-emerald-100 hover:text-emerald-800'}`} title={isRecording ? "Stop Recording" : "Start Voice Input"}>
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder={txt.typePrompt} className="flex-1 bg-transparent px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-400" />
              <button type="submit" disabled={!chatInput.trim() || isAiLoading} className="bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all flex items-center justify-center hover:-translate-y-0.5 active:scale-90 group">
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-stone-900">Activity Logs</h2>
            {logs.length === 0 ? (
              <div className={emptyBox}><p className="text-stone-500 text-sm">No activity logs recorded yet.</p></div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-emerald-900 text-emerald-50 text-xs font-semibold">
                    <tr><th className="p-4">Date</th><th className="p-4">Type</th><th className="p-4">Details</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {logs.map((l) => (<tr key={l.id} className="hover:bg-emerald-50/70 transition-colors"><td className="p-4">{l.date}</td><td className="p-4 font-semibold"><span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">{l.type}</span></td><td className="p-4">{l.details}</td></tr>))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-2xl">
            <h2 className="text-2xl font-bold text-stone-900">Farmer Settings & Data Management</h2>
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-600 to-amber-400 text-white text-xl font-bold flex items-center justify-center shadow-md">{(farmerProfile.name || 'F').charAt(0).toUpperCase()}</div>
                <h3 className="font-bold text-lg text-stone-900">Current Profile</h3>
              </div>
              <div className="text-sm space-y-1 text-stone-700">
                <p><strong>Name:</strong> {farmerProfile.name || 'Not set'}</p>
                <p><strong>Location:</strong> {farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}</p>
                <p><strong>PIN Code:</strong> {farmerProfile.pincode || 'N/A'}</p>
              </div>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-200 space-y-3">
              <h3 className="font-bold text-lg text-red-900">Reset Application Data</h3>
              <p className="text-xs text-red-700">Clears all saved farm plots, crops, logs, and profile records stored locally on this device.</p>
              <button onClick={() => setShowResetConfirm(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition active:scale-95 group">
                <RotateCcw className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-180" /><span>{txt.resetApp}</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {showPlotModal && (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="ag-pop bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="text-white p-4 px-6 flex justify-between items-center" style={{ backgroundColor: '#064e3b', backgroundImage: FURROWS }}>
              <h3 className="font-bold text-lg">{txt.addNewPlot}</h3>
              <button onClick={() => setShowPlotModal(false)} className="p-1.5 rounded-full hover:bg-white/15 transition active:scale-90"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddPlot} className="p-6 space-y-4">
              <div><label className={labelCls}>{txt.plotName}</label><input type="text" required value={newPlot.name} onChange={(e) => setNewPlot({ ...newPlot, name: e.target.value })} placeholder="e.g. North Acre Field" className={inputCls} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelCls}>Area Size</label><input type="number" step="0.1" required value={newPlot.area} onChange={(e) => setNewPlot({ ...newPlot, area: e.target.value })} className={inputCls} /></div>
                <div><label className={labelCls}>Unit</label><select value={newPlot.unit} onChange={(e) => setNewPlot({ ...newPlot, unit: e.target.value })} className={inputCls}><option value="acres">Acres</option><option value="hectares">Hectares</option><option value="bigha">Bigha</option></select></div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowPlotModal(false)} className={`${btnGhost} px-4 py-2 text-sm`}>{txt.cancel}</button>
                <button type="submit" className={`${btnPrimary} px-6 py-2 text-sm`}>{txt.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCropModal && (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="ag-pop bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="text-white p-4 px-6 flex justify-between items-center" style={{ backgroundColor: '#064e3b', backgroundImage: FURROWS }}>
              <h3 className="font-bold text-lg">{txt.recordSowing}</h3>
              <button onClick={() => setShowCropModal(false)} className="p-1.5 rounded-full hover:bg-white/15 transition active:scale-90"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddCrop} className="p-6 space-y-4">
              <div><label className={labelCls}>{txt.cropName} *</label><input type="text" required value={newCrop.cropName} onChange={(e) => setNewCrop({ ...newCrop, cropName: e.target.value })} placeholder="e.g. Wheat, Rice, Tomato" className={inputCls} /></div>
              {plots.length > 0 && (
                <div><label className={labelCls}>{txt.plotName}</label><select value={newCrop.plotId || plots[0].id} onChange={(e) => setNewCrop({ ...newCrop, plotId: e.target.value })} className={inputCls}>{plots.map(pl => <option key={pl.id} value={pl.id}>{pl.name}</option>)}</select></div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelCls}>Variety</label><input type="text" value={newCrop.variety} onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })} className={inputCls} /></div>
                <div><label className={labelCls}>{txt.sowingDate} *</label><input type="date" required value={newCrop.sowingDate} onChange={(e) => setNewCrop({ ...newCrop, sowingDate: e.target.value })} className={inputCls} /></div>
              </div>
              <div><label className={labelCls}>Days to harvest</label><input type="number" min="1" value={newCrop.durationDays} onChange={(e) => setNewCrop({ ...newCrop, durationDays: Number(e.target.value) })} className={inputCls} /></div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowCropModal(false)} className={`${btnGhost} px-4 py-2 text-sm`}>{txt.cancel}</button>
                <button type="submit" className={`${btnPrimary} px-6 py-2 text-sm`}>{txt.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="ag-pop bg-white w-full max-w-md rounded-3xl p-6 space-y-4 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto"><AlertTriangle className="w-8 h-8 text-red-600" /></div>
            <h3 className="font-bold text-lg text-stone-900">Confirm Reset</h3>
            <p className="text-xs text-stone-600">{txt.confirmReset}</p>
            <div className="flex justify-center space-x-3 pt-2">
              <button onClick={() => setShowResetConfirm(false)} className={`${btnGhost} px-4 py-2 text-sm`}>{txt.cancel}</button>
              <button onClick={handleResetApp} className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition active:scale-95">Reset</button>
            </div>
          </div>
        </div>
      )}

      {cropToDelete && (
        <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="ag-pop bg-white w-full max-w-md rounded-3xl p-6 space-y-4 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto text-3xl">{cropEmoji(cropToDelete.cropName)}</div>
            <h3 className="font-bold text-lg text-stone-900">Remove {cropToDelete.cropName}?</h3>
            <p className="text-xs text-stone-600">This removes the crop and its scheduled tasks. Your activity log keeps the sowing record.</p>
            <div className="flex justify-center space-x-3 pt-2">
              <button onClick={() => setCropToDelete(null)} className={`${btnGhost} px-4 py-2 text-sm`}>{txt.cancel}</button>
              <button onClick={() => handleDeleteCrop(cropToDelete.id)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition active:scale-95 flex items-center space-x-1.5"><Trash2 className="w-4 h-4" /><span>Remove crop</span></button>
            </div>
          </div>
        </div>
      )}

            )}

      <footer className="bg-stone-900 text-stone-400 py-6 border-t border-stone-800 text-center text-xs space-y-1">
        <p>© 2026 AgriGuru Smart Farming App. Designed for Indian Farmers.</p>
        <p className="text-stone-500 mt-1">Made by Adarsh and Saksham</p>
      </footer>
    </div>
  );
}
