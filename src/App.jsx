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

  // Dedicated Waitlist states (at the bottom)
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistPhone, setWaitlistPhone] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);

  // Tech Tabs state
  const [activeTab, setActiveTab] = useState('structure');

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Helper function to send data to Google Sheets Webhook
  const sendToGoogleSheets = async (data) => {
    if (!GOOGLE_SHEET_WEBHOOK_URL) {
      console.log("Google Sheet URL is not set. Data compiled:", data);
      return true;
    }

    try {
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

  // Quiz Handlers
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
      formType: 'Backyard Compatibility Check',
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

  // Waitlist Form Handler
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
      purpose: 'Waitlist Form Bottom',
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
            <a href="#simulator-section" className="nav-link">הדמיית פתיחה</a>
            <a href="#pains-section" className="nav-link">כאב ופתרון</a>
            <a href="#salad-section" className="nav-link">מפרט האלמנטים</a>
            <a href="#waitlist-section" className="nav-link">הצטרפות לרשימה</a>
            <a href="#faq-section" className="nav-link">שאלות נפוצות</a>
          </nav>
          <div className="header-actions">
            <a 
              href="https://wa.me/972503734973?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%94%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A7%D7%A8%D7%90%D7%95%D7%95%D7%A0%D7%99%20%D7%94%D7%91%D7%95%D7%98%D7%99%D7%A7%20%D7%A9%D7%9C%D7%95%D7%9B%D7%9D" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary phone-btn"
            >
              <span>💬 ייעוץ מהיר בווטסאפ</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Text/Copy Column */}
          <div className="hero-content animate-fade-in-up">
            <div className="gold-badge">אלטרנטיבת הבנייה המהירה והחסכונית ביותר לחצר</div>
            <h1 className="hero-title">
              יחידת בנייה קלה וניידת – <span className="gold-gradient-text">בלי כאבי ראש</span>
            </h1>
            <p className="hero-description">
              תפסיקו לשרוף הון על שכירות או להסתבך עם קבלנים שמחרבים את הגינה. 
              אנו מספקים מבנה מודולרי נייד ברמת גימור מודרנית מרהיבה עם <strong>רצפת גלריה מעץ מלא</strong>, שמגיע מוכן לשטח תוך זמן קצר. קלי קלות.
            </p>

            <div className="hero-usp-list">
              <div className="usp-item">
                <span className="usp-icon">⚡</span>
                <span className="usp-text"><strong>פשטות ומהירות:</strong> הצבה נקייה בשטח ביום אחד ללא שבועות של רעש ואבק.</span>
              </div>
              <div className="usp-item">
                <span className="usp-icon">🌳</span>
                <span className="usp-text"><strong>אינטגרציה לגינה:</strong> חיפוי טיח יוקרתי בגוון טרקוטה המשתלב בטבעיות בחצר.</span>
              </div>
              <div className="usp-item">
                <span className="usp-icon">💰</span>
                <span className="usp-text"><strong>חיסכון מקסימלי:</strong> חוסכים מאות אלפי שקלים לעומת בנייה קלה מסורתית או שיפוץ קבוע.</span>
              </div>
            </div>

            <div className="hero-cta-group">
              <a href="#simulator-section" className="btn-primary">הדמיית וידאו של פתיחת החדר</a>
              <a 
                href="https://wa.me/972503734973?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%94%D7%9E%D7%97%20%D7%9C%D7%A7%D7%91%D7%9C%20%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%A7%D7%A8%D7%90%D7%95%D7%95%D7%A0%D7%99%20%D7%94%D7%91%D7%95%D7%98%D7%99%D7%A7%20%D7%A9%D7%9C%D7%95%D7%9B%D7%9D"
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary"
              >
                📱 ווטסאפ מהיר לפרטים
              </a>
            </div>
          </div>

          {/* Simple Backyard Check Form */}
          <div className="hero-visual">
            <div className="quiz-card animate-fade-in-up">
              {!formSubmitted ? (
                <div>
                  <div className="quiz-header">
                    <h3>בדיקת התאמה לחצר</h3>
                    <p className="step-indicator">שלב {quizStep} מתוך 4</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${(quizStep / 4) * 100}%` }}></div>
                    </div>
                  </div>

                  {quizStep === 1 && (
                    <div className="quiz-step">
                      <h4 className="quiz-question">מה השימוש המתוכנן עבור החלל?</h4>
                      <div className="quiz-options">
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'תוספת מגורים למשפחה')}
                        >
                          🧑‍🎓 תוספת מגורים לילד בוגר / הורים בחצר
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'יחידת השכרה מניבה')}
                        >
                          💸 יחידת אירוח להשכרה ויצירת הכנסה נוספת
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'משרד או קליניקה')}
                        >
                          💼 משרד עבודה ביתי שקט או קליניקת טיפולים
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'אחר')}
                        >
                          ⭐ סטודיו פרטי או חלל עבודה חיצוני פתוח
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
                          onClick={() => handleSelectOption('size', 'חצר קטנה')}
                        >
                          🏡 חצר קומפקטית / קטנה (הפתרון הנייד מתאים בול!)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('size', 'חצר בינונית')}
                        >
                          🌳 חצר ממוצעת / גינה בינונית
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('size', 'נחלה או שטח גדול')}
                        >
                          ⛳ שטח אדמה פתוח רחב או נחלה גדולה
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
                          onClick={() => handleSelectOption('access', 'גישה רחבה ופתוחה')}
                        >
                          🚜 רחוב רחב ללא כבלי חשמל או עצים נמוכים (מעבר חלק)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('access', 'גישה מאתגרת או צרה')}
                        >
                          🧱 רחוב פנימי צר, עצים או כבלים (נצטרך תכנון מנוף)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('access', 'לא בטוח')}
                        >
                          🔍 צריכים שנבדוק לכם את הגישה מרחוק בלוויין
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
                          placeholder="ישראל ישראלי..." 
                          className="form-input" 
                          value={answers.name}
                          onChange={handleTextChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="quiz-phone">מספר טלפון</label>
                        <input 
                          type="tel" 
                          id="quiz-phone"
                          name="phone" 
                          placeholder="050-0000000" 
                          className="form-input"
                          value={answers.phone}
                          onChange={handleTextChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="quiz-email">אימייל (אופציונלי)</label>
                        <input 
                          type="email" 
                          id="quiz-email"
                          name="email" 
                          placeholder="yourname@domain.com" 
                          className="form-input"
                          value={answers.email}
                          onChange={handleTextChange}
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                        {isSubmitting ? "שומר נתונים..." : "✨ בדקו התאמה וקבלו פרטים בווטסאפ"}
                      </button>
                      <button type="button" className="back-link" onClick={() => setQuizStep(3)}>← חזרה לשלב הקודם</button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="quiz-success">
                  <div className="success-icon">👍</div>
                  <h3>הבקשה נקלטה במערכת!</h3>
                  <p>
                    תודה <strong>{answers.name}</strong>. התחלנו לבצע ניתוח של דרכי ההגעה לחצר שלכם במפות לוויין. 
                    נציג מוסמך ייצור איתך קשר בהקדם למספר <strong>{answers.phone}</strong> כדי להציג את האפשרויות והפתרונות המודולריים המתאימים.
                  </p>
                  <button type="button" className="btn-secondary" onClick={resetQuiz}>בדיקה חדשה</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section (HTML5 Premium Lazy Loaded Video) */}
      <section className="simulator-section" id="simulator-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">טכנולוגיית שינוע ופריסה מתקדמת</div>
            <h2>הדמיית פתיחת חדר מתרחב</h2>
            <p>
              צפו בטכנולוגיית הפתיחה המודולרית. היחידות שלנו משונעות במצב סגור ונוח להובלה בכבישים, 
              ובשטח נפרסות ליצירת חלל מרווח ללא צורך ביציקות בטון.
            </p>
          </div>

          <div className="simulator-container glass-panel">
            {/* Column 1: Video simulation player */}
            <div className="simulator-video-wrapper">
              <video 
                className="simulator-video"
                src="/caravan_simulation.mp4"
                poster="/luxury_caravan_backyard.jpg"
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="simulation-disclaimer">
                ⚠️ * סרטון הדמיה בלבד להמחשה ויזואלית של פוטנציאל המרחב והפתיחה המודולרית.
              </div>
            </div>

            {/* Column 2: Structural Elements */}
            <div className="simulator-controls">
              <h3>מפרט האלמנטים המודולריים המוצגים בהדמיה:</h3>
              <div className="caravan-annotations-list">
                <div className="anno-tag animate-hover-lift">
                  <span className="anno-dot"></span>
                  <span className="anno-text"><strong>רצפת גלריה מעץ מלא:</strong> בסיס פנימי חם, עמיד ואסתטי ברמת גימור בוטיק אמיתית.</span>
                </div>
                <div className="anno-tag animate-hover-lift">
                  <span className="anno-dot"></span>
                  <span className="anno-text"><strong>פאנלים מבודדים:</strong> בידוד תרמי מושלם בקירות לשמירה על חום וקור.</span>
                </div>
                <div className="anno-tag animate-hover-lift">
                  <span className="anno-dot"></span>
                  <span className="anno-text"><strong>חיפוי גבס פנימי:</strong> קירות פנים חלקים וישרים המוכנים לצבע או עיצוב.</span>
                </div>
                <div className="anno-tag animate-hover-lift">
                  <span className="anno-dot"></span>
                  <span className="anno-text"><strong>גג מבודד ואטום:</strong> הגנה מוחלטת מפני רטיבות, נזילות ורעשי גשם קיצוניים.</span>
                </div>
                <div className="anno-tag animate-hover-lift">
                  <span className="anno-dot"></span>
                  <span className="anno-text"><strong>טיח יוקרתי טבעי:</strong> מעטפת טיח בגוון טרקוטה המשתלבת באופן מושלם בגינה.</span>
                </div>
                <div className="anno-tag animate-hover-lift">
                  <span className="anno-dot"></span>
                  <span className="anno-text"><strong>חיבור Plug & Play:</strong> תשתיות מובנות עם נקודות חיבור מהירות לחשמל ולמים.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pains and Solutions Focus Section */}
      <section className="comparison-section" id="pains-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">ההבדל בין סיוט להתקדמות חכמה</div>
            <h2>כאבי הבנייה לעומת הפתרון המודולרי</h2>
            <p>
              בנייה ושיפוצים בחצר הם סרט בלהות של אובדן כספים, זמן ובריאות. 
              פלאנט קראוון מעניקה לכם אלטרנטיבה פשוטה, חסכונית ונקייה שנפרסת תוך יום אחד.
            </p>
          </div>

          <div className="comparison-grid">
            {/* Pains */}
            <div className="comp-card pain-card animate-hover-lift">
              <div className="card-badge danger-badge">סיוט השיפוצים והבנייה ❌</div>
              <h3>למה שיפוץ קבוע הוא בור ללא תחתית?</h3>
              <ul className="comp-list">
                <li>
                  <span className="bullet-icon">⏳</span>
                  <span><strong>סיוט הבירוקרטיה וההתרים:</strong> המתנה של שנים בוועדות התכנון, ריצות לעירייה, תשלום הון לאדריכלים ומודדים עוד לפני שהנחתם בלוק אחד.</span>
                </li>
                <li>
                  <span className="bullet-icon">🧹</span>
                  <span><strong>חורבן הגינה והשקט:</strong> הגינה שלכם הופכת לאתר בנייה מאובק. טרקטורים רומסים את הדשא, פועלים מסתובבים בחצר חודשים ארוכים.</span>
                </li>
                <li>
                  <span className="bullet-icon">💸</span>
                  <span><strong>עלויות בלתי צפויות וחריגות:</strong> הצעת המחיר שקיבלתם מקבלן אף פעם אינה סופית. שיפוצים תמיד גוררים חריגות של עשרות אלפי שקלים.</span>
                </li>
              </ul>
            </div>

            {/* Solutions */}
            <div className="comp-card solution-card animate-hover-lift">
              <div className="card-badge success-badge">הפתרון של פלאנט קראוון ✨</div>
              <h3>בנייה קלה, מהירה וחסכונית</h3>
              <ul className="comp-list">
                <li>
                  <span className="bullet-icon">⚡</span>
                  <span><strong>מוכן לשימוש תוך יום אחד:</strong> היחידה מגיעה מורכבת במלואה מהמפעל. מנוף מניח אותה במיקום שבחרתם, מחברים לתשתיות – ומשתמשים בה מיד. קלי קלות.</span>
                </li>
                <li>
                  <span className="bullet-icon">🌻</span>
                  <span><strong>אפס לכלוך ובלאגן:</strong> החצר שלכם נשארת נקייה וירוקה. אין ערמות חול, אין אבק בטון ואין רעשי עבודה בתוך הבית הראשי.</span>
                </li>
                <li>
                  <span className="bullet-icon">💰</span>
                  <span><strong>חיסכון מובטח במחיר ידוע:</strong> אתם חוסכים מאות אלפי שקלים ויודעים מראש את עלות היחידה וההצבה. בלי שטיקים ובלי הפתעות תקציביות.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Terracotta Visual Vibe Section */}
      <section className="vibe-showcase-section">
        <div className="container vibe-grid">
          <div className="vibe-image-wrapper animate-fade-in-up">
            <img 
              src="/luxury_caravan_backyard.jpg" 
              alt="Terracotta modular caravan in green garden" 
              className="vibe-image"
            />
            <div className="vibe-image-glow"></div>
          </div>
          <div className="vibe-content">
            <div className="gold-badge">העיצוב המודרני החדש</div>
            <h2>סגנון מינימליסטי המשתלב בטבע של הגינה שלכם</h2>
            <p>
              יחידת הבוטיק שלנו עוצבה תוך חשיבה על אסתטיקה מודרנית ונקייה. 
              חיפוי הטיח היוקרתי בגוון הטרקוטה הטבעי וחלונות העץ הדו-שכבתיים מעניקים למבנה מראה ייחודי, 
              מכובד ואלגנטי, שאינו נראה כמו מכולת פועלים תעשייתית אלא משפר את מראה החצר שלכם.
            </p>
            <div className="vibe-points">
              <div className="vibe-point animate-hover-lift">
                <span className="point-icon">🍂</span>
                <span><strong>גוון טרקוטה יוקרתי:</strong> טיח חיצוני עמיד ועשיר במראה אדמה חם.</span>
              </div>
              <div className="vibe-point animate-hover-lift">
                <span className="point-icon">🪵</span>
                <span><strong>חלונות בעיצוב אישי:</strong> אלומיניום קליל בשילוב מסגרות עץ חמימות הניתנים להזמנה אישית.</span>
              </div>
              <div className="vibe-point animate-hover-lift">
                <span className="point-icon">✨</span>
                <span><strong>מבנה שטוח ונקי:</strong> קווים ישרים ומינימליזם ארכיטקטוני המעלה את ערך השימוש בנכס.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salad Ingredients (Focus on modular elements and benefits, Reiterate NO FURNITURE) */}
      <section className="salad-section" id="salad-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">חלל פתוח ונקי לעיצוב עצמאי</div>
            <h2>פירקנו לכם את האלמנטים המבניים</h2>
            <p>
              אנו מספקים את היחידה כחלל פתוח ונקי, **ללא ריהוט, מטבח או כלים סניטריים**. 
              זה מעניק לכם חופש עיצובי מלא לעצב ולאבזר את המרחב בדיוק לפי הצרכים המדויקים שלכם.
            </p>
          </div>

          <div className="salad-grid">
            {/* Element 1 */}
            <div className="salad-card animate-hover-lift">
              <div className="card-icon-box">🪵</div>
              <h3>רצפת גלריה מעץ מלא</h3>
              <p>בסיס פנימי חם, עמיד ואסתטי ברמת גימור בוטיק אמיתית, המונח על גבי שלדת פלדה מחוזקת וניידת:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>שלדת גלגל ומבנה פלדה:</strong> בסיס חזק ויציב המיועד לשינוע מהיר בכל עת ללא יסודות בטון.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>רצפת גלריה יוקרתית:</strong> לוחות עץ איכותיים המעניקים תחושה ביתית חמה ונעימה מהצעד הראשון.</span>
                </li>
              </ul>
            </div>

            {/* Element 2 */}
            <div className="salad-card animate-hover-lift">
              <div className="card-icon-box">❄️</div>
              <h3>מעטפת ובידוד מתקדם</h3>
              <p>קירות ותקרה בעלי בידוד תרמי ואקוסטי מעולה למניעת חום, רטיבות ורעשים חיצוניים:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>פאנלים מבודדים איכותיים:</strong> שמירה מירבית על טמפרטורה פנימית נוחה ונעימה.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>גג מבודד ואטום:</strong> איטום מוחלט לנזילות ורטיבות ומניעת רעשי גשם קיצוניים.</span>
                </li>
              </ul>
            </div>

            {/* Element 3 */}
            <div className="salad-card animate-hover-lift">
              <div className="card-icon-box">🏠</div>
              <h3>גימור וחלונות בעיצוב אישי</h3>
              <p>המבנה מיוצר בסטנדרט אסתטי גבוה במיוחד המשתלב בצורה מושלמת בגינה:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>חיפוי גבס פנימי חלק:</strong> קירות פנים ישרים ונקיים בדיוק כמו בבית רגיל.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>טיח טרקוטה חיצוני:</strong> גימור טיח יוקרתי בגוון אדמה חם ועמיד לפגעי מזג האוויר.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>חלונות בהזמנה אישית:</strong> חלונות אלומיניום הניתנים להתאמה מלאה של מיקום, גודל וגוון.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="no-furniture-alert">
            💡 <strong>הבהרה חשובה:</strong> כל היחידות של פלאנט קראוון מסופקות כחלל פתוח (רצפת גלריה מעץ מלא, מעטפת מבודדת, קירות גבס פנימיים ותשתיות מובנות) **ללא ריהוט, מטבח או כלים סניטריים**. אתם מקבלים דף חלק לעצב את המרחב שלכם ללא תכתיבים מראש.
          </div>
        </div>
      </section>

      {/* Simplified Tech Specs Tabs (No Prices, No licensing details) */}
      <section className="specs-section" id="specs-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">פשטות הנדסית</div>
            <h2>פירוט האלמנרטים המודולריים של המבנה</h2>
            <p>אנו מאמינים בבנייה קלה איכותית ופשוטה. הנה המאפיינים המרכזיים של המבנה:</p>
          </div>

          <div className="specs-tabs-container">
            <div className="specs-tabs-header">
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'structure' ? 'active' : ''}`}
                onClick={() => setActiveTab('structure')}
              >
                🏠 שלד ורצפת גלריה
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'isolation' ? 'active' : ''}`}
                onClick={() => setActiveTab('isolation')}
              >
                ❄️ בידוד וקירות
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'utilities' ? 'active' : ''}`}
                onClick={() => setActiveTab('utilities')}
              >
                ⚡ חשמל ותשתיות Plug & Play
              </button>
            </div>

            <div className="specs-tab-content">
              {activeTab === 'structure' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>שלדת פלדה מחוזקת ורצפת גלריה מעץ מלא</h3>
                    <p>
                      הבסיס של כל יחידות פלאנט קראוון תוכנן כדי לאפשר שינוע קל ופשטות בהעמדה בשטח, 
                      תוך שימור מלא של עקרון הבנייה הקלה הניידת:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>רצפת גלריה מעץ מלא:</strong> לוחות עץ איכותיים המונחים על תשתית בידוד למניעת רטיבות ולמגע חמים ונעים.</li>
                      <li><strong>שלדת פלדה מחוזקת לשינוע:</strong> עמידות לאורך עשרות שנים, בנויה לגרירה והנפה ללא עיוותים.</li>
                      <li><strong>אפס פגיעה בגינה:</strong> אין צורך ביציקות בטון, מה שמאפשר להחזיר את הגינה למצבה המקורי אם היחידה מפונה.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">🚜</div>
                </div>
              )}

              {activeTab === 'isolation' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>מעטפת פאנלים מבודדים וחיפוי גבס פנימי</h3>
                    <p>
                      קירות המבנה מיוצרים בשיטה מתקדמת המבטיחה הגנה אקלימית מעולה ומראה פנימי 
                      ביתי וחמים:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>פאנל מבודד תרמי:</strong> שומר על טמפרטורה פנימית נוחה ומאפשר מיזוג מהיר של היחידה תוך דקות.</li>
                      <li><strong>קירות גבס פנימיים:</strong> גימור קירות חלק ונקי בדיוק כמו בבית רגיל, ללא מראה תעשייתי.</li>
                      <li><strong>חלונות בהזמנה אישית:</strong> ניתן לבחור את מיקומי החלונות ועיצובם על פי כיווני האור בחצר שלכם.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">❄️</div>
                </div>
              )}

              {activeTab === 'utilities' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>חיבור מהיר (Plug & Play) לתשתיות הבית</h3>
                    <p>
                      אל תסתבכו עם עבודות אינסטלציה וחשמל מסובכות. היחידות שלנו יוצאות מהמפעל 
                      כשהן כוללות נקודות חיבור מהירות מובנות:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>נקודת חיבור חשמל ראשית:</strong> לוח חשמל פנימי מוסדר עם שקע חיבור מהיר חיצוני.</li>
                      <li><strong>הכנה לחיבורי מים:</strong> צנרת מים פנימית מוסתרת עם יציאות מהירות להתחברות קלה בשטח.</li>
                      <li><strong>ללא צורך בחפירות עמוקות:</strong> הכל מתחבר בצורה נקייה וסמויה מהעין.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">⚡</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section (At the bottom, placeholders simplified) */}
      <section className="contact-section" id="waitlist-section">
        <div className="container contact-box">
          <div className="contact-content">
            <h2>הצטרפו לרשימת ההמתנה לקבלת פרטים נוספים</h2>
            <p>
              בשל הייצור המוקפד והממוקד שלנו, אנו פותחים מספר מוגבל של מקומות אספקה לכל רבעון. 
              הירשמו עכשיו כדי לשריין את מקומכם ברשימת ההמתנה ולקבל עדיפות לבירור התאמה טלפוני ללא עלות. 
              הנתונים מסונכרנים ישירות לגוגל שיטס של המפעל.
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
                    <label className="form-label" htmlFor="wl-phone">טלפון</label>
                    <input 
                      type="tel" 
                      id="wl-phone"
                      placeholder="050-0000000" 
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
                  {waitlistSubmitting ? "מסנכרן לרשימה..." : "🔒 שריינו מקום ברשימת ההמתנה"}
                </button>
              </form>
            ) : (
              <div className="waitlist-success glass-panel">
                <div className="success-icon">👍</div>
                <h3>נרשמת בהצלחה לרשימת ההמתנה!</h3>
                <p>
                  שלום <strong>{waitlistName}</strong>. מקומך ברשימה נקלט והמידע מסונכרן. 
                  נציג טלפוני ייצור איתך קשר בהקדם האפשרי במספר <strong>{waitlistPhone}</strong> כדי להציג את כל הפרטים.
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
            <div className="gold-badge">פשטות ושקיפות</div>
            <h2>שאלות ותשובות נפוצות</h2>
            <p>כל מה שצריך לדעת על הובלה, שינוע והתאמה אישית של יחידות הבנייה הקלה המודולרית:</p>
          </div>

          <div className="faq-list">
            {/* FAQ 1 */}
            <div className={`faq-item ${openFaq === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ האם היחידות מגיעות עם ריהוט או חלוקת חדרים פנימית?</span>
                <span className="faq-toggle-icon">{openFaq === 1 ? '−' : '+'}</span>
              </div>
              {openFaq === 1 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    לא. אנו מספקים את היחידות כחלל פתוח ונקי (מעטפת מבודדת, קירות גבס פנימיים, רצפת גלריה מעץ מלא והכנה לתשתיות) 
                    <strong>ללא ריהוט, ללא מטבח וללא כלים סניטריים (שירותים/מקלחת)</strong>. 
                    הדבר נעשה בכוונה על מנת לאפשר לכם חופש עיצובי מלא – תוכלו לחלק את החלל כרצונכם, לבנות מחיצות גבס פנימיות, ולהתקין את המטבח או הריהוט המדויק שאתם בוחרים מבלי להיות מוגבלים למפרט קבוע מראש.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className={`faq-item ${openFaq === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ מהן עלויות היחידה וההצבה בשטח?</span>
                <span className="faq-toggle-icon">{openFaq === 2 ? '−' : '+'}</span>
              </div>
              {openFaq === 2 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    על מנת לספק הצעת מחיר אמינה והוגנת, אנו מתחשבים במספר פרמטרים כגון סגנון היחידה המבוקש, סוג החלונות בהתאמה אישית, 
                    מורכבות גישת המנוף וההובלה לשטח שלכם. 
                    <strong>אנו לא מפרסמים מחירים באתר האינטרנט</strong>, אך נציג המכירות שלנו ישמח לספק לכם הצעת מחיר מלאה ומפורטת בשיחה טלפונית קצרה לאחר שנבדוק את הגישה לגינה שלכם במפות לוויין.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className={`faq-item ${openFaq === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ איך עובד תהליך שינוע היחידה המתרחבת?</span>
                <span className="faq-toggle-icon">{openFaq === 3 ? '−' : '+'}</span>
              </div>
              {openFaq === 3 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    היחידות המתרחבות שלנו מתוכננות לשינוע נוח במיוחד. הן מובלות בכבישים כשהן במצב סגור וצר, 
                    מה שמאפשר מעבר קל ברחובות פנימיים וגישה לחצרות מאתגרות. 
                    לאחר הצבתן בשטח שלכם, אנו מפעילים את מנגנון הפתיחה והחדר הנוסף נפרס החוצה ומכפיל את שטח הפנים תוך זמן קצר מאוד. 
                    הכל מתוכנן לפשטות מרבית.
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
          <p>© 2026 פלאנט קראוון - פתרונות בנייה קלה וניידת לחצר. כל הזכויות שמורות.</p>
          <p className="footer-warning">
            ⚠️ המידע המוצג באתר זה נועד למטרות שיווקיות ואינפורמטיביות כלליות בלבד. היחידות מסופקות במבנה פתוח (חלל ריק ללא ריהוט, מטבח או סניטציה) עם רצפת גלריה מעץ מלא לצורך עיצוב עצמאי.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
