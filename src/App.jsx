import React, { useState } from 'react';
import './App.css';

// --- CONFIGURATION ---
// Paste your Google Apps Script Web App URL here to synchronize submissions directly with Google Sheets.
const GOOGLE_SHEET_WEBHOOK_URL = ''; 

function App() {
  // Lead form quiz step states
  const [quizStep, setQuizStep] = useState(1);
  const [answers, setAnswers] = useState({
    purpose: '',
    size: '',
    access: '',
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Dedicated Waitlist states
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);

  // ROI calculator states (approximate costs and rentals without showing exact sizes)
  const [monthlyRent, setMonthlyRent] = useState(4800);
  const [durationYears, setDurationYears] = useState(4);

  // Technical Tabs state (simplified for luxury experience, not details)
  const [activeTab, setActiveTab] = useState('experience');

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Helper function to send data to Google Sheets Webhook
  const sendToGoogleSheets = async (data) => {
    if (!GOOGLE_SHEET_WEBHOOK_URL) {
      console.log("Google Sheet URL is not set. Data compiled:", data);
      return true;
    }

    try {
      // mode: 'no-cors' allows submission to Google Apps Script redirects
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString()
        })
      });
      return true;
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      return false;
    }
  };

  // Quiz Option Handlers
  const handleSelectOption = (field, value) => {
    setAnswers({ ...answers, [field]: value });
    setQuizStep(quizStep + 1);
  };

  const handleTextChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();
    if (!answers.name || !answers.phone) {
      alert("אנא מלא את כל השדות כדי להמשיך בבדיקה");
      return;
    }
    
    setIsSubmitting(true);
    const leadData = {
      formType: 'Compatibility Quiz',
      name: answers.name,
      phone: answers.phone,
      email: answers.email || 'N/A',
      purpose: answers.purpose,
      size: answers.size,
      access: answers.access
    };
    
    await sendToGoogleSheets(leadData);
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  // Waitlist submission handler
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!waitlistName || !waitlistPhone) {
      alert("אנא מלא את שמך ומספר הטלפון שלך");
      return;
    }

    setWaitlistSubmitting(true);
    const waitlistData = {
      formType: 'Waitlist Form',
      name: waitlistName,
      phone: waitlistPhone,
      email: waitlistEmail || 'N/A',
      purpose: 'Waitlist',
      size: 'N/A',
      access: 'N/A'
    };

    await sendToGoogleSheets(waitlistData);
    setWaitlistSubmitting(false);
    setWaitlistSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({
      purpose: '',
      size: '',
      access: '',
      name: '',
      phone: '',
      email: ''
    });
    setQuizStep(1);
    setFormSubmitted(false);
  };

  // Calculations for savings
  const totalRentCost = monthlyRent * 12 * durationYears;
  const caravanEstCost = 155000; // Estimated luxury caravan package
  const netSavings = totalRentCost - caravanEstCost;
  const isSaving = netSavings > 0;

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="landing-wrapper">
      {/* Luxurious Header */}
      <header className="site-header">
        <div className="container header-container">
          <div className="logo-container">
            <span className="logo-text gold-gradient-text">PLANET CARAVAN</span>
            <span className="logo-subtext">פלאנט קראוון</span>
          </div>
          <nav className="header-nav">
            <a href="#solutions-section" className="nav-link">פתרונות וכאבים</a>
            <a href="#salad-section" className="nav-link">החוויה היוקרתית</a>
            <a href="#roi-section" className="nav-link">פוטנציאל חיסכון</a>
            <a href="#waitlist-section" className="nav-link">רשימת המתנה</a>
            <a href="#faq-section" className="nav-link">שאלות נפוצות</a>
          </nav>
          <div className="header-actions">
            <a 
              href="https://wa.me/972503734973?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%94%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A7%D7%A8%D7%90%D7%95%D7%95%D7%A0%D7%99%20%D7%94%D7%91%D7%95%D7%98%D7%99%D7%A7%20%D7%A9%D7%9C%D7%95%D7%9B%D7%9D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary phone-btn"
            >
              <span>💬 לשיחה מהירה בווטסאפ</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Text/Copy Column */}
          <div className="hero-content">
            <div className="gold-badge">הפתרון הנדל"ני החכם והיוקרתי בישראל</div>
            <h1 className="hero-title">
              הקימו יחידת <span className="gold-gradient-text">סוויטה מפוארת</span> בחצר שלכם בתוך יום אחד
            </h1>
            <p className="hero-description">
              תפסיקו לזרוק אלפי שקלים על שכירות של אחרים או להתבוסס בסיוט של היתרי בנייה וקבלנים. 
              אנו מתכננים ומעמידים יחידות בוטיק שלמות – מוגמרות ומוכנות למגורים (Turnkey) ברמת גימור של מלון 5 כוכבים, ללא צורך באישורים מסובכים.
            </p>

            <div className="hero-usp-list">
              <div className="usp-item">
                <span className="usp-icon">💰</span>
                <span className="usp-text"><strong>חיסכון של מאות אלפי שקלים:</strong> עוקפים את העיריות, חוסכים אדריכלים ואגרות פיתוח.</span>
              </div>
              <div className="usp-item">
                <span className="usp-icon">📜</span>
                <span className="usp-text"><strong>חוקיות וארנונה:</strong> מוגדר כרכב נגרר מורשה – ללא ארנונה וללא צורך בהיתר בנייה מסורבל.</span>
              </div>
              <div className="usp-item">
                <span className="usp-icon">✨</span>
                <span className="usp-text"><strong>חופש וגמישות:</strong> נכס נייד ששומר על ערכו. עוברים דירה? הקראוון נוסע איתכם.</span>
              </div>
            </div>

            <div className="hero-cta-group">
              <a href="#quiz-anchor" className="btn-primary">בדקו התאמה לגינה שלכם</a>
              <a 
                href="https://wa.me/972503734973?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%94%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A7%D7%A8%D7%90%D7%95%D7%95%D7%A0%D7%99%20%D7%94%D7%91%D7%95%D7%98%D7%99%D7%A7%20%D7%A9%D7%9C%D7%95%D7%9C%D7%9D"
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
              >
                📱 דברו איתנו בווטסאפ
              </a>
            </div>
          </div>

          {/* Image & Interactive Quiz Column */}
          <div className="hero-visual" id="quiz-anchor">
            <div className="visual-image-wrapper">
              <img 
                src="/luxury_caravan_backyard.png" 
                alt="Luxury Tiny House parked in backyard" 
                className="hero-image"
              />
              <span className="image-dimension-tag">סוויטת בוטיק VIP לחצר</span>
              <div className="image-overlay-glow"></div>
            </div>

            {/* Glassmorphic Interactive Lead Form */}
            <div className="quiz-card">
              {!formSubmitted ? (
                <div>
                  <div className="quiz-header">
                    <h3>בדיקת היתכנות מהירה בחצר</h3>
                    <p className="step-indicator">שלב {quizStep} מתוך 4</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(quizStep / 4) * 100}%` }}></div>
                    </div>
                  </div>

                  {quizStep === 1 && (
                    <div className="quiz-step">
                      <h4 className="quiz-question">מה המטרה המרכזית של יחידת הבוטיק?</h4>
                      <div className="quiz-options">
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'מגורים לילד בוגר')}
                        >
                          🎓 סטודיו עצמאי לילד הסטודנט (לחסוך שכירות בחוץ)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'מגורים להורים מבוגרים')}
                        >
                          👵 מגורים להורים קרוב להשגחה (עם פרטיות מוחלטת)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'יחידת Airbnb או השכרה')}
                        >
                          💸 יצירת הכנסה פסיבית יציבה (כ-5,000 ש"ח בכל חודש)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'קליניקה או משרד')}
                        >
                          💼 קליניקת טיפולים או משרד עבודה שקט ומנותק
                        </button>
                      </div>
                    </div>
                  )}

                  {quizStep === 2 && (
                    <div className="quiz-step">
                      <h4 className="quiz-question">מהו שטח הגינה הפנוי להצבה?</h4>
                      <div className="quiz-options">
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('size', 'גינה קטנה')}
                        >
                          🏡 חצר קומפקטית / קטנה (ננצל כל סנטימטר)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('size', 'גינה בינונית')}
                        >
                          🌳 חצר ממוצעת / גינה בינונית
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('size', 'נחלה או שטח גדול')}
                        >
                          ⛳ שטח אדמה פתוח / נחלה גדולה
                        </button>
                      </div>
                      <button type="button" className="back-link" onClick={() => setQuizStep(1)}>← חזרה לשלב הקודם</button>
                    </div>
                  )}

                  {quizStep === 3 && (
                    <div className="quiz-step">
                      <h4 className="quiz-question">איך נראית גישת ההובלה לחצר שלכם?</h4>
                      <div className="quiz-options">
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('access', 'גישה פתוחה לחלוטין')}
                        >
                          🚜 רחוב רחב ללא כבלי חשמל או עצים נמוכים (הנפה קלה)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('access', 'גישה מאתגרת או צרה')}
                        >
                          🧱 רחוב פנימי צר, עצים או כבלים (נצטרך תכנון מנוף זרוע)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('access', 'לא בטוח')}
                        >
                          🔍 לא בטוחים (צריכים בדיקה לווינית מרחוק ללא עלות)
                        </button>
                      </div>
                      <button type="button" className="back-link" onClick={() => setQuizStep(2)}>← חזרה לשלב הקודם</button>
                    </div>
                  )}

                  {quizStep === 4 && (
                    <form onSubmit={handleSubmitQuiz} className="quiz-step">
                      <h4 className="quiz-question">נא למלא פרטים לשליחת בדיקת ההיתכנות:</h4>
                      <div className="form-group">
                        <label className="form-label" htmlFor="quiz-name">שם מלא</label>
                        <input 
                          type="text" 
                          id="quiz-name"
                          name="name" 
                          placeholder="יוסי כהן..." 
                          className="form-input" 
                          value={answers.name}
                          onChange={handleTextChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="quiz-phone">טלפון נייד</label>
                        <input 
                          type="tel" 
                          id="quiz-phone"
                          name="phone" 
                          placeholder="050-1234567" 
                          className="form-input"
                          value={answers.phone}
                          onChange={handleTextChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="quiz-email">דואר אלקטרוני (אופציונלי)</label>
                        <input 
                          type="email" 
                          id="quiz-email"
                          name="email" 
                          placeholder="name@example.com" 
                          className="form-input"
                          value={answers.email}
                          onChange={handleTextChange}
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                        {isSubmitting ? "שולח נתונים..." : "✨ קבלו הצעת מחיר וניתוח שטח"}
                      </button>
                      <button type="button" className="back-link" onClick={() => setQuizStep(3)}>← חזרה לשלב הקודם</button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="quiz-success">
                  <div className="success-icon">🏆</div>
                  <h3>הבדיקה הועברה לצוות הטכני!</h3>
                  <p>
                    תודה <strong>{answers.name}</strong>. התחלנו לבדוק את דרכי הגישה וההנפה לבית שלכם במפות לוויין. 
                    נציג מוסמך ייצור איתך קשר במספר <strong>{answers.phone}</strong> כדי לתאם שיחה קצרה ולהציג מחירונים ופתרונות מותאמים אישית.
                  </p>
                  <button type="button" className="btn-secondary" onClick={resetQuiz}>התחל בדיקה חדשה</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions & Pain points Focus Section */}
      <section className="comparison-section" id="solutions-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">הסיוט של הבנייה לעומת החופש המודרני</div>
            <h2>למה אנשים חכמים מפסיקים לבנות מבני קבע בחצר?</h2>
            <p>
              בניית יחידת דיור מבטון או קונסטרוקציה קלה בחצר היא בור ללא תחתית של אובדן זמן, בריאות וכספים. 
              הנה הסיבות לכך שרוכשים מתוחכמים עוברים לפתרונות הניידים של פלאנט קראוון.
            </p>
          </div>

          <div className="comparison-grid">
            {/* The Pain Card */}
            <div className="comp-card pain-card">
              <div className="card-badge danger-badge">הסיוט הישן ❌</div>
              <h3>הבלגאן של בנייה קבועה</h3>
              <ul className="comp-list">
                <li>
                  <span className="bullet-icon">⏳</span>
                  <span><strong>שנתיים של סחבת עירונית:</strong> שילמתם לאדריכלים ומודדים, הגשתם תוכניות, והעירייה מעכבת אתכם חודשים ארוכים מסיבות בירוקרטיות.</span>
                </li>
                <li>
                  <span className="bullet-icon">🚜</span>
                  <span><strong>חורבן הגינה הפרטית:</strong> טרקטורים רומסים את הדשא שטיפחתם, שקי מלט וחול חוסמים את השבילים, ופועלים רועשים מסתובבים לכם בחצר.</span>
                </li>
                <li>
                  <span className="bullet-icon">💸</span>
                  <span><strong>חריגות תקציב מטורפות:</strong> הצעת המחיר הראשונית הייתה 200,000 ש"ח, אבל בפועל מצאתם את עצמכם משלמים 330,000 ש"ח על תוספות ותקלות.</span>
                </li>
                <li>
                  <span className="bullet-icon">📜</span>
                  <span><strong>קנס ארנונה לכל החיים:</strong> העירייה תדע על תוספת הבנייה ותתקע לכם חיוב ארנונה חודשי מנופח ללא אפשרות ביטול.</span>
                </li>
              </ul>
            </div>

            {/* The Solution Card */}
            <div className="comp-card solution-card">
              <div className="card-badge success-badge">הפתרון החכם של פלאנט קראוון ✨</div>
              <h3>נוחות, יוקרה וחיסכון מיידי</h3>
              <ul className="comp-list">
                <li>
                  <span className="bullet-icon">⚡</span>
                  <span><strong>מגורים תוך יום אחד:</strong> היחידה מגיעה מורכבת במלואה (Turnkey). מנוף מניח אותה במקומה, מחברים לתשתיות – וישנים שם בלילה.</span>
                </li>
                <li>
                  <span className="bullet-icon">🌻</span>
                  <span><strong>אפס לכלוך ובלאגן:</strong> הגינה שלכם נשארת נקייה. אין שבירת קירות, אין אבק בטון ואין פועלים שמסתובבים לכם מול העיניים.</span>
                </li>
                <li>
                  <span className="bullet-icon">💰</span>
                  <span><strong>מחיר קבוע וידוע מראש:</strong> אתם יודעים בדיוק כמה אתם משלמים מהשקל הראשון. בלי חריגות, בלי שטיקים ובלי הפתעות של קבלנים.</span>
                </li>
                <li>
                  <span className="bullet-icon">🚙</span>
                  <span><strong>חוקיות וגמישות מוחלטת:</strong> המבנה מוגדר כרכב נגרר מורשה. הוא אינו מחובר קבע לקרקע, לכן פטור מהיתר בנייה ומארנונה.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Savings & ROI Section */}
      <section className="roi-section" id="roi-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">מנתחים את המספרים</div>
            <h2>כמה כסף נשאר בתוך המשפחה שלכם?</h2>
            <p>
              שכירות מחוץ לבית היא כסף שנזרק לפח של אדם זר. 
              השתמשו בסליידרים שלמטה כדי לראות את ההבדל הכלכלי העצום ברכישת יחידת בוטיק בחצר שלכם.
            </p>
          </div>

          <div className="roi-calculator-box">
            <div className="calculator-inputs">
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-title">דמי שכירות חודשיים ממוצעים (או חיסכון שכירות)</span>
                  <span className="slider-value">{monthlyRent.toLocaleString()} ש"ח</span>
                </div>
                <input 
                  type="range" 
                  min="3500" 
                  max="8000" 
                  step="100"
                  value={monthlyRent} 
                  onChange={(e) => setMonthlyRent(Number(e.target.value))}
                  className="roi-slider"
                />
                <span className="slider-hint">כמה הילד היה משלם על דירה מעופשת (או כמה דייר ישלם לכם בכל חודש)</span>
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-title">משך השימוש המתוכנן ביחידה (שנים)</span>
                  <span className="slider-value">{durationYears} שנים</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="10" 
                  step="1"
                  value={durationYears} 
                  onChange={(e) => setDurationYears(Number(e.target.value))}
                  className="roi-slider"
                />
                <span className="slider-hint">מספר השנים שבהן היחידה תשמש למגורים או להשכרה</span>
              </div>
            </div>

            <div className="calculator-results">
              <div className="result-metric">
                <p className="result-label">סה"כ כסף שהיה נזרק לבעל בית זר:</p>
                <p className="result-value text-red">{totalRentCost.toLocaleString()} ש"ח</p>
              </div>

              <div className="result-divider"></div>

              <div className="result-metric">
                <p className="result-label">עלות משוערת לרכישת יחידת פלאנט קראוון:</p>
                <p className="result-value text-gold">{caravanEstCost.toLocaleString()} ש"ח</p>
              </div>

              <div className="result-divider"></div>

              <div className="result-metric highlight">
                <p className="result-label">
                  {isSaving ? "החיסכון הפיננסי שנשאר אצלכם בכיס (והנכס נשאר שלכם):" : "עלות יחסית משוערת:"}
                </p>
                <p className={`result-value ${isSaving ? 'text-green' : 'text-red'}`}>
                  {isSaving ? `+ ${netSavings.toLocaleString()} ש"ח` : `${netSavings.toLocaleString()} ש"ח`}
                </p>
              </div>

              <p className="calculator-conclusion">
                💡 <strong>שורה תחתונה:</strong> במקום לשרוף <strong>{totalRentCost.toLocaleString()} ש"ח</strong> על שכירות אבודה בחוץ, 
                אתם רוכשים נכס יוקרתי ומעוצב שנשאר בבעלותכם מלאה, וחוסכים <strong>{netSavings.toLocaleString()} ש"ח</strong> שאתם יכולים למכור בעתיד או להמשיך להשכיר.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Salad Ingredients Section (Focus on luxury and benefits, no details) */}
      <section className="salad-section" id="salad-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">חוויה של מלון בוטיק בחצר</div>
            <h2>המצרכים שמבטיחים מגורי <span className="gold-gradient-text">היי-אנד</span> אמיתיים</h2>
            <p>
              היחידות שלנו מתוכננות ומיוצרות מהחומרים היוקרתיים והאיכותיים ביותר. 
              ללא אלמנטים זולים או פשרות הנדסיות, אלא חוויה של סוויטת פאר פרטית.
            </p>
          </div>

          <div className="salad-grid">
            {/* Base & Structure */}
            <div className="salad-card">
              <div className="card-icon-box">🚜</div>
              <h3>בסיס ושלדת פרימיום</h3>
              <p>היסודות החוקיים והנדסיים שישמרו על היחידה יציבה ויאפשרו גרירה ושינוע חלקים:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>שלדת גליה (Galia Chassis) מחוזקת:</strong> בסיס פרימיום המוגן מחלודה ורטיבות ל-30+ שנים.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>רישוי וטסט מלאים:</strong> רישיון נגרר מוסדר ולוחית רישוי צהובה של משרד התחבורה.</span>
                </li>
              </ul>
            </div>

            {/* Insulation */}
            <div className="salad-card">
              <div className="card-icon-box">❄️</div>
              <h3>מעטפת ובידוד תרמי מושלם</h3>
              <p>בידוד תעשייתי קיצוני שמונע רעשים חיצוניים ושומר על הטמפרטורה המושלמת:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>פאנלים מבודדים פוליאוריטן (PUR) מחוזקים:</strong> מוגנים מפני חום יולי-אוגוסט וקור החורף.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>חלונות אלומיניום קליל:</strong> פרופיל שחור מט יוקרתי עם זיגוג כפול לבידוד אקוסטי מוחלט מרעשים.</span>
                </li>
              </ul>
            </div>

            {/* Carpentry & Comfort */}
            <div className="salad-card">
              <div className="card-icon-box">🛋️</div>
              <h3>נגרות יוקרה ועיצוב פנים</h3>
              <p>ניצול חכם של המרחב וחוויית מגורים יומיומית שלא נופלת מדירת פאר במרכז הארץ:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>מטבח VIP בעיצוב אדריכלי:</strong> מגירות ומנגנונים שקטים של Blum ומשטחי עבודה יוקרתיים.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>חדר רחצה 5 כוכבים:</strong> אסלה תלויה סמויה מבית Geberit, חיפויי שיש יוקרתיים וברזי זהב מעוצבים.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Tabs Section (Simplified) */}
      <section className="specs-section" id="specs-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">האיכות בפרטים הקטנים</div>
            <h2>מה הופך את פלאנט קראוון לסוויטה מלכותית?</h2>
            <p>שילוב הנדסי מנצח בין חוקיות מלאה, בידוד מתקדם וציוד קצה איכותי:</p>
          </div>

          <div className="specs-tabs-container">
            <div className="specs-tabs-header">
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                🏠 חוויית המגורים והמרחב
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'infrastructure' ? 'active' : ''}`}
                onClick={() => setActiveTab('infrastructure')}
              >
                ⚡ תשתיות וחיבור Plug & Play
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'legality' ? 'active' : ''}`}
                onClick={() => setActiveTab('legality')}
              >
                📜 רישוי וחוקיות מוחלטת
              </button>
            </div>

            <div className="specs-tab-content">
              {activeTab === 'experience' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>מרחב אירוח מרווח ומואר באופן טבעי</h3>
                    <p>
                      היחידה שלנו מתוכננת על ידי אדריכלית פנים מומחית כדי לתת לכם תחושה של דירה מרווחת, 
                      תוך שימוש בחלונות ענק המאפשרים כניסת אור טבעי ומחברים את היחידה ישירות לגינה:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>תקרה גבוהה ומאווררת:</strong> מונעת תחושת דוחק או קלסטרופוביה ומעניקה תחושת חופש.</li>
                      <li><strong>ריהוט מובנה חכם:</strong> פתרונות אחסון נסתרים ומיטה זוגית עם בוכנות גז לאחסון מצעים וחפצים.</li>
                      <li><strong>תאורת LED חכמה והיקפית:</strong> יוצרת אווירה חמימה ויוקרתית בשעות הערב.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">🏠</div>
                </div>
              )}

              {activeTab === 'infrastructure' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>חיבור מהיר ואסתטי ללא צורך בחפירות ביוב</h3>
                    <p>
                      אל תדאגו מהעבודות בשטח. היחידה מתוכננת לחיבור מהיר, אסתטי ונקי המשתלב 
                      בצורה חלקה עם מערכת התשתיות הקיימת בבית שלכם:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>לוח חשמל מוגן:</strong> רכיבי קצה איכותיים למניעת עומס או נפילות חשמל בזמן שימוש.</li>
                      <li><strong>חיבור ביוב אל-חוזר:</strong> מונע עליית ריחות או סתימות ושומר על ההיגיינה של הגינה.</li>
                      <li><strong>חיבור תשתיות Plug & Play:</strong> כל החיבורים מוסתרים בתוך שרוול מוגן מתחת לדשא.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">⚡</div>
                </div>
              )}

              {activeTab === 'legality' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>הסדר משפטי ופטור מלא מאישורי בנייה</h3>
                    <p>
                      חוק התכנון והבנייה בישראל מגדיר בנייה לא חוקית כמבנה המחובר קבע לקרקע. 
                      פתרון הבוטיק שלנו בנוי על פטור חוקי מלא:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>רכב נגרר מורשה:</strong> היחידה מותקנת על גלגלים ואינה מקובעת ליסודות בטון.</li>
                      <li><strong>חוות דעת משפטית חתומה:</strong> אנו מספקים לכם מסמך משפטי מפורט מומחה לתכנון ובנייה לשקט נפשי מוחלט.</li>
                      <li><strong>אפס ארנונה נוספת:</strong> מאחר ולא מדובר במבנה קבע, אין שום תשלום ארנונה נוסף לעירייה.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">📜</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section (Synchronized to Google Sheets) */}
      <section className="contact-section" id="waitlist-section">
        <div className="container contact-box">
          <div className="contact-content">
            <h2>הצטרפו לרשמית ההמתנה המוגבלת לשנת 2026</h2>
            <p>
              בשל הביקוש הרב וקצב הייצור המוקפד שלנו לשמירה על רמת גימור היי-אנד, אנו פותחים מספר מוגבל של מקומות אספקה. 
              הירשמו עכשיו כדי לשריין את מקומכם ברשימת ההמתנה ולקבל עדיפות לייעוץ אדריכלי ללא עלות. 
              הנתונים מסונכרנים ישירות לרשומות המפעל.
            </p>

            {!waitlistSubmitted ? (
              <form onSubmit={handleWaitlistSubmit} className="waitlist-form glass-panel">
                <div className="waitlist-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="wl-name">שם מלא</label>
                    <input 
                      type="text" 
                      id="wl-name"
                      placeholder="ישראל ישראלי..." 
                      className="form-input"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="wl-phone">טלפון נייד</label>
                    <input 
                      type="tel" 
                      id="wl-phone"
                      placeholder="050-3734973" 
                      className="form-input"
                      value={waitlistPhone}
                      onChange={(e) => setWaitlistPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="wl-email">דואר אלקטרוני</label>
                    <input 
                      type="email" 
                      id="wl-email"
                      placeholder="name@domain.com" 
                      className="form-input"
                      value={waitlistEmail}
                      onChange={(e) => setWaitlistEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full" disabled={waitlistSubmitting}>
                  {waitlistSubmitting ? "שולח נתונים ומסנכרן..." : "🔒 שריינו לי מקום ברשימת ההמתנה"}
                </button>
              </form>
            ) : (
              <div className="waitlist-success glass-panel">
                <div className="success-icon">🎉</div>
                <h3>נרשמת בהצלחה לרשימת ההמתנה!</h3>
                <p>
                  שלום <strong>{waitlistName}</strong>. מקומך ברשימת ההמתנה שוריין בהצלחה והמידע סונכרן ישירות למערכת. 
                  נציג מכירות ייצור איתך קשר במספר <strong>{waitlistPhone}</strong> בהתאם לתור שלך ברשימה.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faq-section" id="faq-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">היושר של פלאנט קראוון</div>
            <h2>שאלות נפוצות של רוכשים חכמים</h2>
            <p>שאלות משפטיות ולוגיסטיות נפוצות לגבי הצבת סוויטת הבוטיק בחצר:</p>
          </div>

          <div className="faq-list">
            {/* FAQ 1 */}
            <div className={`faq-item ${openFaq === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ מה המידות של יחידות הבוטיק שאתם מייצרים?</span>
                <span className="faq-toggle-icon">{openFaq === 1 ? '−' : '+'}</span>
              </div>
              {openFaq === 1 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    על מנת להבטיח את פתרון המגורים האופטימלי והמדויק ביותר לחצר שלכם, אנו מציעים מגוון גדלים המתוכננים אדריכלית. 
                    <strong>אנו לא מפרסמים מידות מדויקות באתר האינטרנט</strong>, מכיוון שכל הצבה נבחנת הנדסית בהתאם למבנה השטח, דרכי הגישה של המנוף ומטרת המגורים. 
                    נציגי המכירות שלנו ישמחו להציג בפניכם את המידות המדויקות והאפשרויות השונות במהלך שיחת המכירה הטלפונית או בפגישה באולם התצוגה.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className={`faq-item ${openFaq === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ האם פקח של העירייה יכול להוריד לי את היחידה מהחצר?</span>
                <span className="faq-toggle-icon">{openFaq === 2 ? '−' : '+'}</span>
              </div>
              {openFaq === 2 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    מבחינה חוקית, היחידות שלנו רשומות כרכב נגרר מורשה עם רישיון רכב בתוקף ולוחית רישוי צהובה ממשרד התחבורה. 
                    היחידה מונחת על גלגלים ורגליים תומכות זמניות מתכווננות, ללא חיבור יצוק בבטון או קבוע לקרקע. 
                    חוקית, היא מוגדרת כרכב חונה בשטח פרטי. פקחי עירייה אינם יכולים להפעיל צווי הריסה או צווים מנהליים כנגד רכב חונה. 
                    אנו מספקים לכל רוכש ליווי משפטי מלא וחוות דעת משפטית מפורטת להצגה לפקחים.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className={`faq-item ${openFaq === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ מהן עלויות ופריסת המימון לקראוון הבוטיק?</span>
                <span className="faq-toggle-icon">{openFaq === 3 ? '−' : '+'}</span>
              </div>
              {openFaq === 3 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    אנו מציעים תוכניות מימון גמישות מאוד בשיתוף עם גורמים בנקאיים ופיננסיים, עם פריסה של עד 60 תשלומים חודשיים נוחים. 
                    ההחזר החודשי של המימון יוצא לרוב נמוך משמעותית מדמי השכירות שהייתם משלמים עבור דירה מחוץ לבית – כך שהנכס למעשה מממן את עצמו. 
                    פרטים מדויקים על עלויות היחידה והחזרים חודשיים יינתנו באופן אישי על ידי נציגינו.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/972503734973?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%94%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A7%D7%A8%D7%90%D7%95%D7%95%D7%A0%D7%99%20%D7%94%D7%91%D7%95%D7%98%D7%99%D7%A7%20%D7%A9%D7%9C%D7%95%D7%9C%D7%9D" 
        className="floating-whatsapp" 
        target="_blank" 
        rel="noopener noreferrer"
        title="דברו איתנו בווטסאפ"
      >
        <svg className="whatsapp-icon" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.023 14.07 1 11.517 1c-5.44 0-9.866 4.372-9.87 9.802 0 1.958.522 3.869 1.514 5.568L2.09 20.31l4.249-1.127zM18.23 15.145c-.34-.17-2.012-.993-2.321-1.106-.31-.113-.536-.17-.761.17-.225.34-.87 1.106-1.066 1.332-.197.227-.394.256-.733.085-.34-.17-1.436-.53-2.736-1.692-1.01-.902-1.694-2.019-1.892-2.36-.197-.34-.02-.524.15-.693.153-.153.34-.397.51-.595.17-.198.227-.34.34-.567.113-.227.056-.425-.028-.595-.085-.17-.76-1.83-1.042-2.51-.275-.66-.554-.57-.761-.58-.195-.01-.42-.01-.646-.01-.225 0-.59.085-.902.425-.31.34-1.183 1.162-1.183 2.835 0 1.673 1.21 3.29 1.38 3.518.17.227 2.38 3.637 5.766 5.093.805.347 1.434.554 1.924.71.81.258 1.547.222 2.13.135.65-.098 2.01-.822 2.29-1.616.28-.793.28-1.472.197-1.615-.084-.14-.31-.225-.65-.395z"/>
        </svg>
      </a>

      {/* Luxurious Footer */}
      <footer className="site-footer">
        <div className="container footer-container">
          <span className="logo-text gold-gradient-text">PLANET CARAVAN</span>
          <p>© 2026 פלאנט קראוון - יחידות דיור יוקרתיות על גלגלים. כל הזכויות שמורות.</p>
          <p className="footer-warning">
            ⚠️ המידע המוצג באתר זה נועד למטרות שיווקיות ואינפורמטיביות כלליות בלבד, ואינו מהווה תחליף לייעוץ משפטי פרטני התואם את תנאי השטח והרשות המקומית הספציפית של הרוכש.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
