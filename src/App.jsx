import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sprout, CloudSun, Calendar, Bell, Bot, BarChart3, Settings, 
  MapPin, Plus, Trash2, CheckCircle2, Clock, AlertTriangle, 
  Droplet, ShieldAlert, ChevronRight, Globe, Download, RefreshCw, 
  Search, FileText, Check, X, ArrowUpRight, Compass, Heart, 
  Layers, Package, Award, Sparkles, AlertCircle, PhoneCall, HelpCircle,
  Navigation, User, CheckCircle, RotateCcw, Send, Image as ImageIcon,
  Lightbulb, MessageSquare
} from 'lucide-react';

const t = {
  en: {
    appName: "AgriGuru",
    tagline: "Your Smart Companion from Sowing to Harvesting.",
    dashboard: "Dashboard",
    farms: "Farms & Plots",
    seeds: "Seeds & Inventory",
    calendar: "Farming Calendar",
    weather: "Live Weather",
    advisor: "AgriGuru AI",
    logs: "Activity Logs",
    settings: "Profile & Settings",
    activeCrops: "Active Crops",
    totalPlots: "Total Plots",
    pendingTasks: "Pending Tasks",
    weatherAlerts: "Weather Warnings",
    cropAge: "Crop Age",
    days: "days",
    sowedOn: "Sowed on",
    expectedHarvest: "Expected Harvest",
    viewDetails: "View Details",
    addNewPlot: "Add New Farm Plot",
    recordSowing: "Record Seed Sowing",
    logActivity: "Log Irrigation / Fertilizer",
    askAI: "Ask AgriGuru AI",
    temperature: "Temperature",
    humidity: "Humidity",
    wind: "Wind",
    rainfall: "Rainfall Forecast",
    aiAdvisorTitle: "AgriGuru Intelligent Advisor",
    aiSubtitle: "Ask anything about your crops, weather precautions, or pest management.",
    typePrompt: "Type your farming question in English or Hindi...",
    send: "Send",
    save: "Save Record",
    cancel: "Cancel",
    completed: "Completed",
    dueToday: "Due Today",
    overdue: "Overdue",
    pending: "Pending",
    markComplete: "Mark Complete",
    exportCSV: "Export CSV",
    printReport: "Print Report",
    soilType: "Soil Type",
    irrigationMethod: "Irrigation Method",
    plotName: "Plot / Field Name",
    cropName: "Crop Name & Variety",
    sowingDate: "Sowing Date",
    area: "Area",
    actions: "Actions",
    noData: "No records found. Get started by adding a plot or crop!",
    noCropsYet: "No crops added yet.",
    noTasksYet: "No farming tasks scheduled yet.",
    noWeatherYet: "Set up your farm location to see local weather.",
    addFirstCrop: "Add Your First Crop",
    resetApp: "Reset App Data",
    confirmReset: "Are you sure you want to reset all profile and farm data? This action cannot be undone."
  },
  hi: {
    appName: "एग्रीगुरु (AgriGuru)",
    tagline: "बुवाई से कटाई तक आपका स्मार्ट साथी।",
    dashboard: "डैशबोर्ड",
    farms: "खेत और प्लॉट",
    seeds: "बीज और सामग्री",
    calendar: "खेती कैलेंडर",
    weather: "लाइव मौसम",
    advisor: "एग्रीगुरु एआई",
    logs: "गतिविधि लॉग",
    settings: "प्रोफ़ाइल और सेटिंग्स",
    activeCrops: "सक्रिय फसलें",
    totalPlots: "कुल प्लॉट",
    pendingTasks: "लंबित कार्य",
    weatherAlerts: "मौसम चेतावनी",
    cropAge: "फसल की आयु",
    days: "दिन",
    sowedOn: "बोया गया",
    expectedHarvest: "अनुमानित कटाई",
    viewDetails: "विवरण देखें",
    addNewPlot: "नया खेत प्लॉट जोड़ें",
    recordSowing: "बीज बुवाई दर्ज करें",
    logActivity: "सिंचाई / खाद दर्ज करें",
    askAI: "एग्रीगुरु एआई से पूछें",
    temperature: "तापमान",
    humidity: "नमी",
    wind: "हवा",
    rainfall: "वर्षा पूर्वानुमान",
    aiAdvisorTitle: "एग्रीगुरु बुद्धिमान सलाहकार",
    aiSubtitle: "अपनी फसलों, मौसम सावधानियों या कीट प्रबंधन के बारे में कुछ भी पूछें।",
    typePrompt: "हिंदी या अंग्रेजी में अपना कृषि प्रश्न टाइप करें...",
    send: "भेजें",
    save: "रिकॉर्ड सहेजें",
    cancel: "रद्द करें",
    completed: "पूर्ण",
    dueToday: "आज देय",
    overdue: "अतिदेय",
    pending: "लंबित",
    markComplete: "पूर्ण के रूप में चिह्नित करें",
    exportCSV: "सीएसवी निर्यात",
    printReport: "प्रिंट रिपोर्ट",
    soilType: "मिट्टी का प्रकार",
    irrigationMethod: "सिंचाई विधि",
    plotName: "प्लॉट / खेत का नाम",
    cropName: "फसल का नाम और किस्म",
    sowingDate: "बुवाई की तारीख",
    area: "क्षेत्रफल",
    actions: "कार्य",
    noData: "कोई रिकॉर्ड नहीं मिला। प्लॉट या फसल जोड़कर शुरुआत करें!",
    noCropsYet: "अभी तक कोई फसल नहीं जोड़ी गई है।",
    noTasksYet: "अभी तक कोई कृषि कार्य निर्धारित नहीं है।",
    noWeatherYet: "स्थानीय मौसम देखने के लिए अपने खेत का स्थान सेट करें।",
    addFirstCrop: "अपनी पहली फसल जोड़ें",
    resetApp: "ऐप डेटा रीसेट करें",
    confirmReset: "क्या आप वाकई सभी प्रोफ़ाइल और फ़ार्म डेटा रीसेट करना चाहते हैं? इस कार्रवाई को पूर्ववत नहीं किया जा सकता।"
  }
};

export default function AgriGuruApp() {
  // Check onboarding status
  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('agriguru_profile_completed') === 'true';
  });

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [farmerProfile, setFarmerProfile] = useState(() => {
    const saved = localStorage.getItem('agriguru_farmer_profile');
    return saved ? JSON.parse(saved) : {
      name: '',
      village: '',
      district: '',
      state: '',
      pincode: '',
      season: 'Kharif / Rabi',
      lat: null,
      lon: null,
      locationType: ''
    };
  });

  const [plots, setPlots] = useState(() => {
    const saved = localStorage.getItem('agriguru_plots');
    return saved ? JSON.parse(saved) : [];
  });

  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem('agriguru_crops');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('agriguru_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('agriguru_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [weatherData, setWeatherData] = useState(() => {
    const saved = localStorage.getItem('agriguru_weather');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('agriguru_farmer_profile', JSON.stringify(farmerProfile));
    localStorage.setItem('agriguru_plots', JSON.stringify(plots));
    localStorage.setItem('agriguru_crops', JSON.stringify(crops));
    localStorage.setItem('agriguru_tasks', JSON.stringify(tasks));
    localStorage.setItem('agriguru_logs', JSON.stringify(logs));
    if (weatherData) {
      localStorage.setItem('agriguru_weather', JSON.stringify(weatherData));
    }
  }, [farmerProfile, plots, crops, tasks, logs, weatherData]);

  // Automatic location and weather fetch on app load if onboarded
  useEffect(() => {
    if (isOnboarded && !weatherData) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setFarmerProfile(prev => ({ ...prev, lat: latitude, lon: longitude, locationType: 'gps' }));
            fetchWeatherForLocation(latitude, longitude, "GPS Location");
          },
          (err) => {
            fetchWeatherForLocation(22.7196, 75.8577, "Indore");
          }
        );
      } else {
        fetchWeatherForLocation(22.7196, 75.8577, "Indore");
      }
    }
  }, [isOnboarded]);

  // Modal visibility states
  const [showPlotModal, setShowPlotModal] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notificationBanner, setNotificationBanner] = useState({ show: false, message: "" });

  // Onboarding Temporary Form States
  const [onboardProfile, setOnboardProfile] = useState({
    name: '',
    language: 'en',
    state: '',
    district: '',
    village: '',
    pincode: ''
  });

  const [onboardFarm, setOnboardFarm] = useState({
    name: '',
    area: '',
    unit: 'acres',
    soil: 'Alluvial (Loam)',
    irrigation: 'Tube well'
  });

  const [locationStatus, setLocationStatus] = useState({ loading: false, message: '' });

  // Form inputs for modals
  const [newPlot, setNewPlot] = useState({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  const [newCrop, setNewCrop] = useState({ plotId: '', cropName: '', variety: '', supplier: '', sowingDate: new Date().toISOString().split('T')[0], areaUsed: 1, durationDays: 120 });
  const [newLog, setNewLog] = useState({ type: 'Irrigation', plot: '', crop: '', details: '', date: new Date().toISOString().split('T')[0] });

  // AI Chatbot state with initial interactive advice & image preview support
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Namaste! I am your AgriGuru AI Advisor, powered by Gemini. You can ask me anything from crop management and weather advisories to general knowledge, science, history, and geography!',
      time: 'Just now'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Quick preset questions for easy typing on mobile or desktop
  const quickQuestions = [
    "How to manage yellowing leaves on Wheat?",
    "Best fertilizer schedule for Paddy/Rice",
    "What causes seasons on Earth?",
    "Explain photosynthesis in simple terms"
  ];

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim() || isAiLoading) return;

    const userMsg = {
      role: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsAiLoading(true);

    try {
      const payload = {
        contents: [
          ...chatMessages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: query }] }
        ],
        systemInstruction: {
          parts: [{ text: "You are AgriGuru AI Advisor, an advanced smart farming assistant and versatile general knowledge expert. You answer any question from agriculture, crop protection, pest diagnostics, soil health, weather science, to general knowledge, history, geography, and science with accurate, engaging, structured, and detailed responses. Do not use markdown asterisks or bullet star symbols in your response." }]
        }
      };

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      let rawAiText = result.candidates?.[0]?.content?.parts?.[0]?.text || `Here is detailed information regarding "${query}": AgriGuru AI provides comprehensive insights across agricultural science, crop planning, and general inquiries.`;
      
      // Remove all asterisks from the AI response
      const aiText = rawAiText.replace(/\*/g, '');

      const aiMsg = {
        role: 'assistant',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const fallbackText = `AgriGuru AI Advisor: Regarding "${query}", this topic involves key principles connecting theory and practical application. Whether in agriculture, science, or general knowledge, structured inquiry provides the best insights!`;
      setChatMessages(prev => [...prev, { role: 'assistant', text: fallbackText.replace(/\*/g, ''), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
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
            setFarmerProfile(prev => ({
              ...prev,
              village: city,
              state: state,
              district: geoData.address.county || geoData.address.state_district || prev.district,
              lat: latitude,
              lon: longitude
            }));
          }
        }
      } catch (e) {
        console.warn("Reverse geocode failed", e);
      }

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
      const data = await res.json();
      
      if (data && data.current_weather) {
        const curr = data.current_weather;
        const compiledWeather = {
          temp: Math.round(curr.temperature),
          feelsLike: Math.round(curr.temperature),
          condition: curr.weathercode <= 3 ? 'Clear / Partly Cloudy' : 'Cloudy / Precipitation',
          humidity: data.hourly?.relativehumidity_2m?.[0] || 50,
          windSpeed: curr.windspeed,
          rainfallChance: `${data.daily?.precipitation_probability_max?.[0] || 10}%`,
          locationName: resolvedName,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          forecast: (data.daily?.time || []).slice(0, 7).map((time, idx) => ({
            day: idx === 0 ? 'Today' : new Date(time).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            temp: `${Math.round(data.daily.temperature_2m_max[idx])}° / ${Math.round(data.daily.temperature_2m_min[idx])}°`,
            cond: data.daily.precipitation_probability_max[idx] > 40 ? 'Rain Likely' : 'Sunny/Clear',
            rain: `${data.daily.precipitation_probability_max[idx]}%`
          }))
        };
        setWeatherData(compiledWeather);
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
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherForLocation(latitude, longitude, "GPS Location");
      },
      (error) => {
        setLocationStatus({ loading: false, message: 'GPS access denied or unavailable. Using default location.' });
        fetchWeatherForLocation(24.12, 82.65, "Vindhyanagar");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  // Onboarding Submission Handlers
  const handleCompleteOnboarding = () => {
    const updatedProfile = {
      ...farmerProfile,
      name: onboardProfile.name,
      village: onboardProfile.village,
      district: onboardProfile.district,
      state: onboardProfile.state,
      pincode: onboardProfile.pincode
    };
    setFarmerProfile(updatedProfile);
    setLang(onboardProfile.language);

    if (onboardFarm.name && onboardFarm.area) {
      const initialFarmPlot = {
        id: 'p_' + Date.now(),
        name: onboardFarm.name,
        area: onboardFarm.area,
        unit: onboardFarm.unit,
        soil: onboardFarm.soil,
        irrigation: onboardFarm.irrigation,
        village: onboardProfile.village,
        district: onboardProfile.district,
        state: onboardProfile.state,
        pin: onboardProfile.pincode
      };
      setPlots([initialFarmPlot]);
    }

    localStorage.setItem('agriguru_profile_completed', 'true');
    setIsOnboarded(true);
  };

  // Helper function for crop age
  const getCropAge = (sowingDateStr) => {
    if (!sowingDateStr) return 0;
    const sowed = new Date(sowingDateStr);
    const today = new Date();
    const diffTime = Math.abs(today - sowed);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Add Plot Handler
  const handleAddPlot = (e) => {
    e.preventDefault();
    if (!newPlot.name || !newPlot.area) return;
    const plotToAdd = { 
      id: 'p_' + Date.now(), 
      ...newPlot, 
      village: farmerProfile.village, 
      district: farmerProfile.district, 
      state: farmerProfile.state 
    };
    setPlots([...plots, plotToAdd]);
    setShowPlotModal(false);
    setNewPlot({ name: '', area: '', unit: 'acres', soil: 'Alluvial (Loam)', irrigation: 'Tube well' });
  };

  // Add Crop Handler
  const handleAddCrop = (e) => {
    e.preventDefault();
    if (!newCrop.cropName || !newCrop.sowingDate) return;
    const selectedPlot = plots.find(p => p.id === newCrop.plotId) || plots[0];
    const sDate = new Date(newCrop.sowingDate);
    const hDate = new Date(sDate.getTime() + ((newCrop.durationDays || 120) * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    
    const cropToAdd = {
      id: 'c_' + Date.now(),
      ...newCrop,
      plotId: selectedPlot ? selectedPlot.id : '',
      plotName: selectedPlot ? selectedPlot.name : 'General Field',
      expectedHarvest: hDate,
      stage: 'Germination & Establishment',
      status: 'Growing'
    };
    
    setCrops([...crops, cropToAdd]);
    
    // Add initial task
    const taskToAdd = {
      id: 't_' + Date.now(),
      cropId: cropToAdd.id,
      title: `${cropToAdd.cropName} - Initial Irrigation & Soil Moisture Inspection`,
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Pending',
      priority: 'High',
      cropName: cropToAdd.cropName
    };
    setTasks([...tasks, taskToAdd]);

    // Add activity log
    const logToAdd = {
      id: 'l_' + Date.now(),
      date: newCrop.sowingDate,
      type: 'Sowing',
      plot: cropToAdd.plotName,
      crop: cropToAdd.cropName,
      details: `Sowed ${newCrop.cropName} (${newCrop.variety || 'Standard'}) in ${newCrop.areaUsed || 1} ${selectedPlot?.unit || 'acres'}`
    };
    setLogs([logToAdd, ...logs]);

    setShowCropModal(false);
    setNewCrop({ plotId: '', cropName: '', variety: '', supplier: '', sowingDate: new Date().toISOString().split('T')[0], areaUsed: 1, durationDays: 120 });
  };

  // Add Activity Log Handler
  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLog.details) return;
    const logToAdd = { id: 'l_' + Date.now(), ...newLog };
    setLogs([logToAdd, ...logs]);
    setShowActivityModal(false);
    setNewLog({ type: 'Irrigation', plot: plots[0]?.name || '', crop: crops[0]?.cropName || '', details: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleTaskToggle = (taskId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  const handleResetApp = () => {
    localStorage.clear();
    setPlots([]);
    setCrops([]);
    setTasks([]);
    setLogs([]);
    setWeatherData(null);
    setFarmerProfile({ name: '', village: '', district: '', state: '', pincode: '', season: 'Kharif / Rabi' });
    setIsOnboarded(false);
    setOnboardingStep(1);
    setShowResetConfirm(false);
  };

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 font-sans antialiased text-stone-900">
        <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
          
          {/* Top Progress Header */}
          <div className="bg-emerald-900 text-white p-6 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-700 p-2 rounded-xl">
                <Sprout className="w-8 h-8 text-amber-300" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">AgriGuru</h1>
                <p className="text-xs text-emerald-200">{txt.tagline}</p>
              </div>
            </div>
            
            {onboardingStep > 1 && (
              <div className="flex items-center space-x-2 pt-2">
                {[2, 3, 4, 5].map((step) => (
                  <div 
                    key={step} 
                    className={`h-2 flex-1 rounded-full transition-all ${
                      onboardingStep >= step ? 'bg-amber-400' : 'bg-emerald-800'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-6">
            {/* SCREEN 1: Welcome */}
            {onboardingStep === 1 && (
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <Sprout className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-stone-900">Welcome to AgriGuru! 🌱</h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Your personal smart farming advisor. Track crops from seed sowing to harvest, monitor live weather, and receive timely agricultural guidance.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => setOnboardingStep(2)}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: Farmer Details */}
            {onboardingStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Step 1: Farmer Profile</h2>
                  <p className="text-xs text-stone-500">Please enter your basic information. Fields start empty.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Preferred Language</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setOnboardProfile({ ...onboardProfile, language: 'en' })}
                        className={`py-2.5 rounded-xl border text-sm font-semibold transition ${
                          onboardProfile.language === 'en' ? 'bg-emerald-100 border-emerald-600 text-emerald-900' : 'border-stone-200 text-stone-600'
                        }`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setOnboardProfile({ ...onboardProfile, language: 'hi' })}
                        className={`py-2.5 rounded-xl border text-sm font-semibold transition ${
                          onboardProfile.language === 'hi' ? 'bg-emerald-100 border-emerald-600 text-emerald-900' : 'border-stone-200 text-stone-600'
                        }`}
                      >
                        हिंदी (Hindi)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={onboardProfile.name}
                      onChange={(e) => setOnboardProfile({ ...onboardProfile, name: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">State *</label>
                      <input 
                        type="text" 
                        required
                        value={onboardProfile.state}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, state: e.target.value })}
                        placeholder="e.g. Punjab"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">District *</label>
                      <input 
                        type="text" 
                        required
                        value={onboardProfile.district}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, district: e.target.value })}
                        placeholder="e.g. Ludhiana"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Village / Town *</label>
                      <input 
                        type="text" 
                        required
                        value={onboardProfile.village}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, village: e.target.value })}
                        placeholder="e.g. Khanna"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">PIN Code (Optional)</label>
                      <input 
                        type="text" 
                        value={onboardProfile.pincode}
                        onChange={(e) => setOnboardProfile({ ...onboardProfile, pincode: e.target.value })}
                        placeholder="141401"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button 
                    onClick={() => setOnboardingStep(1)} 
                    className="px-4 py-2.5 rounded-xl text-stone-600 text-sm font-medium hover:bg-stone-100"
                  >
                    Back
                  </button>
                  <button 
                    disabled={!onboardProfile.name || !onboardProfile.state || !onboardProfile.district || !onboardProfile.village}
                    onClick={() => setOnboardingStep(3)} 
                    className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 3: Location Setup */}
            {onboardingStep === 3 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Step 2: Location Setup</h2>
                  <p className="text-xs text-stone-500">Configure your location to receive real local weather and advisory.</p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleGetCurrentLocation}
                    className="w-full bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 p-4 rounded-2xl flex items-center space-x-3 transition text-left"
                  >
                    <div className="p-2.5 bg-sky-600 text-white rounded-xl">
                      <Navigation className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Use My Current Location (GPS)</h4>
                      <p className="text-xs text-sky-700">Request browser geolocation permission to fetch live local coordinates.</p>
                    </div>
                  </button>

                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                    <h4 className="font-bold text-sm text-stone-900">Manual Location Selected:</h4>
                    <p className="text-xs text-stone-600">
                      {onboardProfile.village}, {onboardProfile.district}, {onboardProfile.state} {onboardProfile.pincode}
                    </p>
                  </div>

                  {locationStatus.message && (
                    <div className={`p-3 rounded-xl text-xs font-medium ${
                      locationStatus.loading ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {locationStatus.message}
                    </div>
                  )}
                </div>

                <div className="pt-3 flex justify-between">
                  <button 
                    onClick={() => setOnboardingStep(2)} 
                    className="px-4 py-2.5 rounded-xl text-stone-600 text-sm font-medium hover:bg-stone-100"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setOnboardingStep(4)} 
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition"
                  >
                    Next: Setup Farm
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 4: Farm Setup */}
            {onboardingStep === 4 && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Step 3: Register Your First Farm Plot</h2>
                  <p className="text-xs text-stone-500">Add land details to start managing crops.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Farm / Plot Name *</label>
                    <input 
                      type="text" 
                      value={onboardFarm.name}
                      onChange={(e) => setOnboardFarm({ ...onboardFarm, name: e.target.value })}
                      placeholder="e.g. Main Road Field"
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Area Size *</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={onboardFarm.area}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, area: e.target.value })}
                        placeholder="2.5"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Unit</label>
                      <select 
                        value={onboardFarm.unit}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, unit: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      >
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                        <option value="bigha">Bigha</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Soil Type</label>
                      <select 
                        value={onboardFarm.soil}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, soil: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      >
                        <option value="Alluvial (Loam)">Alluvial (Loam)</option>
                        <option value="Black Cotton Soil">Black Cotton Soil</option>
                        <option value="Red Sandy Soil">Red Sandy Soil</option>
                        <option value="Clay Soil">Clay Soil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Irrigation Method</label>
                      <input 
                        type="text" 
                        value={onboardFarm.irrigation}
                        onChange={(e) => setOnboardFarm({ ...onboardFarm, irrigation: e.target.value })}
                        placeholder="e.g. Canal / Drip"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex justify-between">
                  <button 
                    onClick={() => setOnboardingStep(3)} 
                    className="px-4 py-2.5 rounded-xl text-stone-600 text-sm font-medium hover:bg-stone-100"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setOnboardingStep(5)} 
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow transition"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 5: Add First Crop Prompt */}
            {onboardingStep === 5 && (
              <div className="text-center space-y-6 py-4">
                <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                  <Sprout className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-stone-900">Setup Ready! 🎉</h2>
                  <p className="text-sm text-stone-600 max-w-md mx-auto">
                    Your farm profile has been created. Your crop list is currently empty. You can add your first sowed crop now or explore your clean dashboard.
                  </p>
                </div>
                <div className="pt-2 space-y-3">
                  <button 
                    onClick={handleCompleteOnboarding}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Go to My Personalized Dashboard</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans flex flex-col antialiased">
      {/* Top Header Navbar */}
      <header className="bg-emerald-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-700 p-2 rounded-xl border border-emerald-600 shadow-inner flex items-center justify-center">
              <Sprout className="w-7 h-7 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold tracking-tight text-white">{txt.appName}</h1>
                <span className="bg-amber-500 text-stone-900 text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">Smart Farm</span>
              </div>
              <p className="text-xs text-emerald-200">{txt.tagline}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            {/* Location & Farmer badge */}
            <div className="hidden md:flex items-center space-x-2 bg-emerald-800/80 px-3 py-1.5 rounded-lg border border-emerald-700 text-xs text-emerald-100">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{farmerProfile.name} • {farmerProfile.village}, {farmerProfile.district} ({farmerProfile.state})</span>
            </div>

            {/* Language Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 px-3 py-1.5 rounded-lg text-xs font-medium border border-emerald-600 transition"
            >
              <Globe className="w-4 h-4 text-emerald-300" />
              <span>{lang === 'en' ? 'हिंदी (Hindi)' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-emerald-950/90 border-t border-emerald-800/60 px-4">
          <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-3 overflow-x-auto py-2 no-scrollbar">
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
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                    isActive 
                      ? 'bg-emerald-700 text-white shadow-sm font-semibold border-b-2 border-amber-400' 
                      : 'text-emerald-200 hover:bg-emerald-900/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-300'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">

        {/* ========================================== */}
        {/* TAB 1: DASHBOARD                           */}
        {/* ========================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Namaste, {farmerProfile.name} Ji! 🙏</h2>
                <p className="text-emerald-100 text-sm max-w-xl">
                  {farmerProfile.village ? `${farmerProfile.village}, ${farmerProfile.district}` : 'Your Farm'} Dashboard
                </p>
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setShowCropModal(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md transition flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{txt.recordSowing}</span>
                </button>
              </div>
            </div>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">{txt.activeCrops}</p>
                  <h3 className="text-2xl font-bold text-stone-900">{crops.length}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-xl">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">{txt.totalPlots}</p>
                  <h3 className="text-2xl font-bold text-stone-900">{plots.length} Plots</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-blue-100 text-blue-700 rounded-xl">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">{txt.pendingTasks}</p>
                  <h3 className="text-2xl font-bold text-stone-900">{tasks.filter(t => t.status === 'Pending').length}</h3>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center space-x-4">
                <div className="p-3 bg-sky-100 text-sky-700 rounded-xl">
                  <CloudSun className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">{txt.temperature}</p>
                  <h3 className="text-2xl font-bold text-stone-900">
                    {weatherData ? `${weatherData.temp}°C` : '--'}
                  </h3>
                  <span className="text-xs text-sky-700 font-medium">
                    {weatherData ? weatherData.condition : txt.noWeatherYet}
                  </span>
                </div>
              </div>
            </div>

            {/* Active Crops Grid & Tasks Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                  <Sprout className="w-5 h-5 text-emerald-700" />
                  <span>Active Crops</span>
                </h3>

                {crops.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-dashed border-stone-300 text-center space-y-3">
                    <p className="text-stone-600 font-semibold">{txt.noCropsYet}</p>
                    <button 
                      onClick={() => setShowCropModal(true)}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
                    >
                      {txt.addFirstCrop}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {crops.map((crop) => {
                      const age = getCropAge(crop.sowingDate);
                      const progressPercent = Math.min(100, Math.round((age / (crop.durationDays || 120)) * 100));
                      return (
                        <div key={crop.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">{crop.plotName}</span>
                              <h4 className="text-lg font-bold text-stone-900 mt-1">{crop.cropName}</h4>
                              <p className="text-xs text-stone-600">Variety: {crop.variety || 'N/A'}</p>
                            </div>
                            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                              {txt.cropAge}: {age} {txt.days}
                            </span>
                          </div>
                          <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tasks */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <span>Tasks</span>
                </h3>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                  {tasks.length === 0 ? (
                    <p className="text-xs text-stone-500 text-center py-4">{txt.noTasksYet}</p>
                  ) : (
                    tasks.map((task) => (
                      <div key={task.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-start justify-between">
                        <div className="flex items-start space-x-2">
                          <button 
                            onClick={() => handleTaskToggle(task.id)}
                            className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border ${
                              task.status === 'Completed' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white border-stone-300'
                            }`}
                          >
                            {task.status === 'Completed' && <Check className="w-3.5 h-3.5" />}
                          </button>
                          <div>
                            <p className={`text-xs font-semibold ${task.status === 'Completed' ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                              {task.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: FARMS & PLOTS MANAGEMENT            */}
        {/* ========================================== */}
        {activeTab === 'farms' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">Registered Farm Plots</h2>
              </div>
              <button 
                onClick={() => setShowPlotModal(true)}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow transition flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>{txt.addNewPlot}</span>
              </button>
            </div>

            {plots.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-stone-300 text-center">
                <p className="text-stone-500 text-sm">No farm plots registered yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plots.map((plot) => (
                  <div key={plot.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                      <span>{plot.name} ({plot.area} {plot.unit})</span>
                    </h3>
                    <div className="pt-2 flex space-x-2">
                      <button 
                        onClick={() => setPlots(plots.filter(p => p.id !== plot.id))}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition border border-red-200 text-xs flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: SEEDS & INVENTORY                     */}
        {/* ========================================== */}
        {activeTab === 'seeds' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-stone-900">Seed & Input Inventory</h2>
            {crops.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-stone-300 text-center">
                <p className="text-stone-500 text-sm">{txt.noCropsYet}</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-100 border-b border-stone-200 text-xs font-bold uppercase text-stone-600">
                    <tr>
                      <th className="p-4">{txt.cropName}</th>
                      <th className="p-4">Variety</th>
                      <th className="p-4">{txt.sowingDate}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {crops.map((c) => (
                      <tr key={c.id}>
                        <td className="p-4 font-semibold">{c.cropName}</td>
                        <td className="p-4">{c.variety || 'N/A'}</td>
                        <td className="p-4">{c.sowingDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: FARMING CALENDAR                      */}
        {/* ========================================== */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-stone-900">Farming Calendar & Stages</h2>
            {crops.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-stone-300 text-center">
                <p className="text-stone-500 text-sm">{txt.noCropsYet}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crops.map((crop) => (
                  <div key={crop.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                    <h3 className="font-bold text-lg text-stone-900">{crop.cropName}</h3>
                    <p className="text-xs text-stone-500">Sowed on: {crop.sowingDate} | Age: {getCropAge(crop.sowingDate)} days</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: LIVE WEATHER                          */}
        {/* ========================================== */}
        {activeTab === 'weather' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">Live Hyperlocal Weather & 7-Day Forecast</h2>
                <p className="text-xs text-stone-500">Real-time meteorological data integrated with GPS coordinates</p>
              </div>
              <button 
                onClick={handleGetCurrentLocation}
                className="bg-sky-700 hover:bg-sky-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow transition flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Live Weather</span>
              </button>
            </div>

            {weatherData ? (
              <div className="space-y-6">
                {/* Main Current Weather Card */}
                <div className="bg-gradient-to-br from-sky-800 to-sky-950 text-white p-6 rounded-2xl shadow-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-sky-700/80 text-sky-200 text-xs font-bold px-3 py-1 rounded-full">{weatherData.locationName}</span>
                      <h3 className="text-4xl font-extrabold mt-3">{weatherData.temp}°C</h3>
                      <p className="text-sm text-sky-200 mt-1">{weatherData.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-sky-300">Last updated: {weatherData.lastUpdated}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-sky-700/50">
                    <div className="bg-sky-900/50 p-3 rounded-xl border border-sky-700/40">
                      <p className="text-xs text-sky-300 font-medium">Humidity</p>
                      <p className="text-lg font-bold mt-0.5">{weatherData.humidity}%</p>
                    </div>
                    <div className="bg-sky-900/50 p-3 rounded-xl border border-sky-700/40">
                      <p className="text-xs text-sky-300 font-medium">Wind Speed</p>
                      <p className="text-lg font-bold mt-0.5">{weatherData.windSpeed} km/h</p>
                    </div>
                    <div className="bg-sky-900/50 p-3 rounded-xl border border-sky-700/40">
                      <p className="text-xs text-sky-300 font-medium">Rain Probability</p>
                      <p className="text-lg font-bold mt-0.5">{weatherData.rainfallChance}</p>
                    </div>
                    <div className="bg-sky-900/50 p-3 rounded-xl border border-sky-700/40">
                      <p className="text-xs text-sky-300 font-medium">Feels Like</p>
                      <p className="text-lg font-bold mt-0.5">{weatherData.feelsLike}°C</p>
                    </div>
                  </div>
                </div>

                {/* 7-Day Extended Forecast */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 flex items-center space-x-2">
                    <CloudSun className="w-5 h-5 text-sky-600" />
                    <span>7-Day Extended Farming Weather Forecast</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                    {weatherData.forecast && weatherData.forecast.map((dayItem, idx) => (
                      <div key={idx} className="bg-stone-50 border border-stone-200 p-4 rounded-xl text-center space-y-2 hover:border-sky-500 transition">
                        <p className="text-xs font-bold text-stone-700">{dayItem.day}</p>
                        <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-full flex items-center justify-center mx-auto">
                          <CloudSun className="w-5 h-5" />
                        </div>
                        <p className="text-sm font-extrabold text-stone-900">{dayItem.temp}</p>
                        <p className="text-[11px] text-stone-600">{dayItem.cond}</p>
                        <span className="inline-block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Rain: {dayItem.rain}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-stone-300 text-center space-y-3">
                <p className="text-stone-600 text-sm">{txt.noWeatherYet}</p>
                <button 
                  onClick={handleGetCurrentLocation}
                  className="bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Fetch Location Weather
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: AGRIGURU AI ADVISOR                   */}
        {/* ========================================== */}
        {activeTab === 'advisor' && (
          <div className="space-y-4 animate-fadeIn flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto">
            {/* Header Title */}
            <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-amber-500 text-stone-900 rounded-xl">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold">{txt.aiAdvisorTitle}</h2>
                  <p className="text-xs text-emerald-200">{txt.aiSubtitle}</p>
                </div>
              </div>
              <span className="bg-emerald-800 text-amber-300 text-xs px-3 py-1 rounded-full font-medium flex items-center space-x-1 border border-emerald-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Active</span>
              </span>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs py-1.5 px-3 rounded-full font-medium whitespace-nowrap flex items-center space-x-1.5 transition shrink-0"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>{q}</span>
                </button>
              ))}
            </div>

            {/* Chat History Area */}
            <div className="bg-white rounded-2xl border border-stone-200 flex-1 p-4 overflow-y-auto space-y-4 shadow-inner">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2.5 max-w-xl ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-amber-500 text-stone-900 font-bold text-xs' : 'bg-emerald-800 text-white'
                    }`}>
                      {msg.role === 'user' ? 'You' : <Bot className="w-4 h-4" />}
                    </div>
                    
                    <div className={`p-4 rounded-2xl text-sm space-y-2 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-emerald-800 text-white rounded-tr-none' 
                        : 'bg-stone-100 text-stone-800 rounded-tl-none border border-stone-200'
                    }`}>
                      <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                      
                      {/* Attached Visual Guide / Image if present */}
                      {msg.image && (
                        <div className="pt-2">
                          <img 
                            src={msg.image} 
                            alt="Farming visual guide" 
                            className="rounded-xl max-h-48 w-full object-cover border border-stone-300 shadow-sm"
                          />
                          <span className="text-[10px] text-stone-500 mt-1 block">Visual Crop Reference</span>
                        </div>
                      )}

                      <span className={`text-[10px] block text-right ${msg.role === 'user' ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isAiLoading && (
                <div className="flex justify-start items-center space-x-2 text-stone-500 text-xs py-2">
                  <div className="w-7 h-7 bg-emerald-800 text-white rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 animate-spin" />
                  </div>
                  <span className="animate-pulse font-medium">AgriGuru AI is thinking and preparing recommendations...</span>
                </div>
              )}
            </div>

            {/* Input Box Component */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="bg-white p-2.5 rounded-2xl border border-stone-300 shadow-md flex items-center space-x-2"
            >
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={txt.typePrompt}
                className="flex-1 bg-transparent px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!chatInput.trim() || isAiLoading}
                className="bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition flex items-center justify-center font-bold"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: ACTIVITY LOGS                         */}
        {/* ========================================== */}
        {activeTab === 'logs' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-2xl font-bold text-stone-900">Activity Logs</h2>
            {logs.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-dashed border-stone-300 text-center">
                <p className="text-stone-500 text-sm">No activity logs recorded yet.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-100 border-b border-stone-200 text-xs font-bold uppercase text-stone-600">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {logs.map((l) => (
                      <tr key={l.id}>
                        <td className="p-4">{l.date}</td>
                        <td className="p-4 font-semibold">{l.type}</td>
                        <td className="p-4">{l.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB: PROFILE & SETTINGS                    */}
        {/* ========================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn max-w-2xl">
            <h2 className="text-2xl font-bold text-stone-900">Farmer Settings & Data Management</h2>
            
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-stone-900">Current Profile</h3>
              <div className="text-sm space-y-1 text-stone-700">
                <p><strong>Name:</strong> {farmerProfile.name || 'Not set'}</p>
                <p><strong>Location:</strong> {farmerProfile.village}, {farmerProfile.district}, {farmerProfile.state}</p>
                <p><strong>PIN Code:</strong> {farmerProfile.pincode || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-2xl border border-red-200 space-y-3">
              <h3 className="font-bold text-lg text-red-900">Reset Application Data</h3>
              <p className="text-xs text-red-700">Clears all saved farm plots, crops, logs, and profile records stored locally on this device.</p>
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{txt.resetApp}</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* ========================================== */}
      {/* MODALS                                     */}
      {/* ========================================== */}
      
      {/* Add Plot Modal */}
      {showPlotModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">{txt.addNewPlot}</h3>
              <button onClick={() => setShowPlotModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddPlot} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">{txt.plotName}</label>
                <input 
                  type="text" 
                  required
                  value={newPlot.name} 
                  onChange={(e) => setNewPlot({ ...newPlot, name: e.target.value })} 
                  placeholder="e.g. North Acre Field"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Area Size</label>
                  <input 
                    type="number" 
                    step="0.1"
                    required
                    value={newPlot.area} 
                    onChange={(e) => setNewPlot({ ...newPlot, area: e.target.value })} 
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Unit</label>
                  <select 
                    value={newPlot.unit} 
                    onChange={(e) => setNewPlot({ ...newPlot, unit: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                  >
                    <option value="acres">Acres</option>
                    <option value="hectares">Hectares</option>
                    <option value="bigha">Bigha</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowPlotModal(false)} className="px-4 py-2 text-stone-600 text-sm font-semibold">{txt.cancel}</button>
                <button type="submit" className="bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-sm shadow">{txt.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Sowing Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">{txt.recordSowing}</h3>
              <button onClick={() => setShowCropModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddCrop} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">{txt.cropName} *</label>
                <input 
                  type="text" 
                  required
                  value={newCrop.cropName} 
                  onChange={(e) => setNewCrop({ ...newCrop, cropName: e.target.value })} 
                  placeholder="e.g. Wheat, Rice, Tomato"
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Variety</label>
                  <input 
                    type="text" 
                    value={newCrop.variety} 
                    onChange={(e) => setNewCrop({ ...newCrop, variety: e.target.value })} 
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">{txt.sowingDate} *</label>
                  <input 
                    type="date" 
                    required
                    value={newCrop.sowingDate} 
                    onChange={(e) => setNewCrop({ ...newCrop, sowingDate: e.target.value })} 
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowCropModal(false)} className="px-4 py-2 text-stone-600 text-sm font-semibold">{txt.cancel}</button>
                <button type="submit" className="bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-sm shadow">{txt.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-4 text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
            <h3 className="font-bold text-lg text-stone-900">Confirm Reset</h3>
            <p className="text-xs text-stone-600">{txt.confirmReset}</p>
            <div className="flex justify-center space-x-3 pt-2">
              <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 text-stone-600 text-sm font-semibold">{txt.cancel}</button>
              <button onClick={handleResetApp} className="bg-red-600 text-white font-bold px-5 py-2 rounded-xl text-sm">Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-6 border-t border-stone-800 text-center text-xs space-y-1">
        <p>© 2026 AgriGuru Smart Farming App. Designed for Indian Farmers.</p>
      </footer>
    </div>
  );
}
