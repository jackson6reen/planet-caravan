import React, { useState } from 'react';
import './App.css';

function App() {
  // Lead form quiz step states
  const [quizStep, setQuizStep] = useState(1);
  const [answers, setAnswers] = useState({
    purpose: '',
    size: '',
    access: '',
    name: '',
    phone: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // ROI calculator states
  const [monthlyRent, setMonthlyRent] = useState(4800);
  const [durationYears, setDurationYears] = useState(4);

  // Technical Tabs state
  const [activeTab, setActiveTab] = useState('chassis');

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);

  // Quiz Option Handlers
  const handleSelectOption = (field, value) => {
    setAnswers({ ...answers, [field]: value });
    setQuizStep(quizStep + 1);
  };

  const handleTextChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    if (!answers.name || !answers.phone) {
      alert("אנא מלא את כל השדות כדי להמשיך בבדיקה");
      return;
    }
    setFormSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({
      purpose: '',
      size: '',
      access: '',
      name: '',
      phone: ''
    });
    setQuizStep(1);
    setFormSubmitted(false);
  };

  // Calculations for savings
  const totalRentCost = monthlyRent * 12 * durationYears;
  const caravanEstCost = 148000; // Average premium price for 5.20 x 2.50
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
            <span className="logo-subtext">Luxury Tiny Houses</span>
          </div>
          <nav className="header-nav">
            <a href="#salad-section" className="nav-link">מפרט המצרכים</a>
            <a href="#comparison-section" className="nav-link">הבנייה מול פלאנט</a>
            <a href="#roi-section" className="nav-link">חיסכון פיננסי</a>
            <a href="#specs-section" className="nav-link">פרטים טכניים</a>
            <a href="#faq-section" className="nav-link">שאלות ותשובות</a>
          </nav>
          <div className="header-actions">
            <a href="tel:0500000000" className="btn-primary phone-btn">
              <span>📞 פגישת ייעוץ אדריכלי</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          {/* Text/Copy Column */}
          <div className="hero-content">
            <div className="gold-badge">היי-אנד בלעדי על גלגלים</div>
            <h1 className="hero-title">
              העמידו יחידת <span className="gold-gradient-text">VIP מעוצבת</span> בחצר שלכם בתוך יום אחד
            </h1>
            <p className="hero-description">
              בלי היתרי בנייה של שנתיים, בלי לקרוע את הגינה ובחצי מחיר מבניית בלוקים. 
              דגם הבוטיק החדש במימדי פרימיום של <strong>5.20 מטר על 2.50 מטר</strong> – מוגמר ומוכן למגורים (Turnkey) ברמת 5 כוכבים.
            </p>

            <div className="hero-usp-list">
              <div className="usp-item">
                <span className="usp-icon">💎</span>
                <span className="usp-text"><strong>חומרי על מורכבים:</strong> שלדת גליה מגולוונת, פאנלים PUR 80 מ"מ ואלומיניום קליל.</span>
              </div>
              <div className="usp-item">
                <span className="usp-icon">📜</span>
                <span className="usp-text"><strong>חוקיות וארנונה:</strong> רשום כרכב נגרר מורשה – ללא ארנונה וללא אישורי בנייה.</span>
              </div>
              <div className="usp-item">
                <span className="usp-icon">⚡</span>
                <span className="usp-text"><strong>חיבור מהיר (Plug & Play):</strong> מים, חשמל וביוב מתחברים תוך שעתיים לבית הראשי.</span>
              </div>
            </div>

            <div className="hero-cta-group">
              <a href="#quiz-anchor" className="btn-primary">בדקו התאמה לחצר וקבלו מחיר</a>
              <a href="#salad-section" className="btn-secondary">פירקנו לכם את המפרט</a>
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
              <span className="image-dimension-tag">מידות פרימיום: 5.20 מ' X 2.50 מ'</span>
              <div className="image-overlay-glow"></div>
            </div>

            {/* Glassmorphic Interactive Lead Form */}
            <div className="quiz-card">
              {!formSubmitted ? (
                <div>
                  <div className="quiz-header">
                    <h3>בדיקת היתכנות ומחיר</h3>
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
                          🎓 סטודיו עצמאי לילד הסטודנט (חוסך שכירות בחוץ)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'מגורים להורים מבוגרים')}
                        >
                          👵 מגורים להורים קרוב להשגחה (עם כניסה נפרדת)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'יחידת Airbnb או השכרה')}
                        >
                          💸 השכרה מניבה (יצירת הכנסה פסיבית של 5,000 ש"ח/חודש)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('purpose', 'קליניקה או משרד ביתי')}
                        >
                          💼 קליניקת טיפולים או משרד ביתי שקט ומעוצב
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
                          onClick={() => handleSelectOption('size', 'גינה קטנה (עד 40 מ"ר)')}
                        >
                          🏡 חצר קומפקטית / קטנה (הדגם של 5.20 מ' מתאים בול!)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('size', 'גינה בינונית (40-80 מ"ר)')}
                        >
                          🌳 חצר ממוצעת / גינה בינונית (40 עד 80 מ"ר)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('size', 'נחלה או שטח גדול')}
                        >
                          ⛳ שטח אדמה פתוח / נחלה (מעל 80 מ"ר)
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
                          🚜 רחוב פתוח ללא בעיית כבלים או עצים (מעבר מנוף חלק)
                        </button>
                        <button 
                          type="button"
                          className="quiz-opt-btn"
                          onClick={() => handleSelectOption('access', 'רחוב צר או צמחייה עבותה')}
                        >
                          🧱 רחוב פנימי צר, עצים או כבלים (נשמח לייעוץ מנופאי)
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
                      <h4 className="quiz-question">מידע ליצירת קשר ושליחת הדוח:</h4>
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
                      <button type="submit" className="btn-primary w-full">
                        ✨ קבל הצעת מחיר מותאמת אישית
                      </button>
                      <button type="button" className="back-link" onClick={() => setQuizStep(3)}>← חזרה לשלב הקודם</button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="quiz-success">
                  <div className="success-icon">🏆</div>
                  <h3>הבקשה נשלחה בהצלחה!</h3>
                  <p>
                    שלום <strong>{answers.name}</strong>. התחלנו לבצע סריקה לווינית של דרכי הגישה לכתובת שלכם. 
                    נציג מומחה מפלאנט קראוון ייצור איתכם קשר טלפוני למספר <strong>{answers.phone}</strong> 
                    כדי לתאם בדיקת שטח סופית ולהציג לכם את מחירון היחידה.
                  </p>
                  <button type="button" className="btn-secondary" onClick={resetQuiz}>בדיקה נוספת</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Salad Ingredients Breakdown Section */}
      <section className="salad-section" id="salad-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">מפרט הבוטיק הלא מתפשר</div>
            <h2>פירקנו לכם את הקראוון <span className="gold-gradient-text">ממש כמו סלט</span></h2>
            <p>
              אנחנו לא מאמינים במילים יפות ללא כיסוי. הנה המרכיבים ברמה הכי גבוהה בשוק שמבטיחים 
              שהיחידה במידות <strong>5.20 מ' X 2.50 מ'</strong> שלכם תרגיש ותתפקד כמו דירת יוקרה לכל החיים.
            </p>
          </div>

          <div className="salad-grid">
            {/* Card 1: Chassis & Underbody */}
            <div className="salad-card animate-fade-in-up">
              <div className="card-icon-box">🚜</div>
              <h3>01. שלדה ורצפת גליה מחוזקת</h3>
              <p>היסודות החוקיים והנדסיים שישמרו על היחידה יציבה ויאפשרו גרירה חלקה בדרכים:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>שלדת גליה (Galia Chassis) מגולוונת:</strong> מותג השלדות המוביל, הגנה של 30+ שנה מחלודה.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>סרנים כפולים עם בלמים:</strong> נשיאת משקל עד 3.5 טון לבטיחות גרירה אופטימלית.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>רצפת מתכת גליה מחוזקת:</strong> בידוד תחתון וחוזק מבני שמונע רטיבות קרקע ועיוותים.</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Insulation & Walls */}
            <div className="salad-card">
              <div className="card-icon-box">❄️</div>
              <h3>02. מעטפת ובידוד תרמי קיצוני</h3>
              <p>כדי שלא תרגישו בתוך פחית שימורים לוהטת, הטמענו את טכנולוגיית הבידוד המתקדמת ביותר:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>פאנלים מבודדים פוליאוריטן (PUR) 80 מ"מ:</strong> צפיפות תעשייתית לבידוד חום/קור מושלם.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>בידוד רעש אקוסטי:</strong> מונע מרעשי הרחוב והשכנים להיכנס, ושומר על השקט שלכם.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>איטום מוחלט לנזילות:</strong> קירות חיצוניים בעלי ציפוי אלומיניום קומפוזיט עמיד למזג האוויר.</span>
                </li>
              </ul>
            </div>

            {/* Card 3: Windows & Glass */}
            <div className="salad-card">
              <div className="card-icon-box">🪟</div>
              <h3>03. אלומיניום וחלונות קליל</h3>
              <p>אור טבעי, נוף לגינה ובידוד אקוסטי מהמעלה הראשונה:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>פרופיל אלומיניום קליל (Klil):</strong> גוון שחור מט יוקרתי, עמידות ועיצוב מודרני מדהים.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>זכוכית כפולה Double Glazing:</strong> 4 מ"מ - 12 מ"מ מרווח - 4 מ"מ. מניעת מעבר חום ורעש.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>דלת הזזה פנורמית ענקית:</strong> פתיחה רחבה שמחברת את הסלון ישירות לדק הגינה שלכם.</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Customized Woodwork & Kitchen */}
            <div className="salad-card">
              <div className="card-icon-box">🍳</div>
              <h3>04. נגרות פרימיום ומטבח VIP</h3>
              <p>כי חוויית המגורים מתחילה במטבח פרקטי ומעורר השראה:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>מנגנוני Blum בטריקה שקטה:</strong> איכות פרזול ללא פשרות, ארונות שלא נשחקים לעולם.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>משטח עבודה פורצלן או שיש קיסר:</strong> עמיד לחום, שריטות וכתמים, קל לניקוי ומראה יוקרתי.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>כיור וברז מט מוזהב נשלף:</strong> עיצוב איטלקי שמכניס סטייל ואלגנטיות לכל הכנת קפה.</span>
                </li>
              </ul>
            </div>

            {/* Card 5: Bathroom & Plumbing */}
            <div className="salad-card">
              <div className="card-icon-box">🚿</div>
              <h3>05. רחצה ברמת מלון חמישה כוכבים</h3>
              <p>פינוק יומי עם מערכות סניטריות מוסתרות ואיכותיות:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>אסלה תלויה עם מכל הדחה סמוי (Geberit):</strong> קל לניקוי, מראה נקי ואמינות שוויצרית.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>חיפוי פורצלן גדול 120X60:</strong> מרקם מרהיב דמוי שיש, עם מינימום חיבורים ורובה.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>ראש גשם אינטגרלי מוזהב:</strong> לחץ מים מפנק, איכות מים חמים מבוקרת ותרמוסטטית.</span>
                </li>
              </ul>
            </div>

            {/* Card 6: Infrastructure & Utilities */}
            <div className="salad-card">
              <div className="card-icon-box">⚡</div>
              <h3>06. מערכות ותשתיות Plug & Play</h3>
              <p>ללא חפירות מתישות בגינה, התחברות קלה ומהירה למערכות הבית הראשי:</p>
              <ul className="ingredients-list">
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>לוח חשמל תלת-פאזי מובנה:</strong> רכיבי קצה ABB/Schneider להפעלה בטוחה של מכשירים זוללי חשמל.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>צנרת מים SP שוודית מקורית:</strong> מונעת נזילות, פיצוצים או הצטברות אבנית לאורך שנים.</span>
                </li>
                <li>
                  <span className="ing-bullet">✔</span>
                  <span><strong>מערכת שסתום אל-חוזר לביוב:</strong> מניעה אבסולוטית של ריחות רעים או סתימות מהגינה.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pain vs Solution Section */}
      <section className="comparison-section" id="comparison-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">ההבדל שעושה את ההבדל</div>
            <h2>בניית יחידה קבועה מול פלאנט קראוון</h2>
            <p>פירקנו לכם את האמת לפנים. בנייה היא סיוט. פלאנט קראוון הוא הפתרון החכם שחוסך לכם זמן, בריאות וכסף.</p>
          </div>

          <div className="comparison-grid">
            {/* Conventional building pain */}
            <div className="comp-card pain-card">
              <div className="card-badge danger-badge">הסיוט של הבנייה הישנה ❌</div>
              <h3>בנייה קונבנציונלית בחצר</h3>
              <ul className="comp-list">
                <li>
                  <span className="bullet-icon">⏳</span>
                  <span><strong>בירוקרטיה מתישה:</strong> שנתיים של ריצות לוועדה המקומית, אדריכלים, מהנדסים והוצאות אישורים מראש.</span>
                </li>
                <li>
                  <span className="bullet-icon">🚜</span>
                  <span><strong>חורבן של הגינה:</strong> פועלים משבע בבוקר, רעש, אבק בטון, הרס של הדשא ומריבות עם השכנים.</span>
                </li>
                <li>
                  <span className="bullet-icon">💸</span>
                  <span><strong>בור כספי ללא תחתית:</strong> המחיר תמיד קופץ ב-30% מעל התקציב בגלל הפתעות אינסטלציה וחשמל של קבלנים.</span>
                </li>
                <li>
                  <span className="bullet-icon">📜</span>
                  <span><strong>קנס ארנונה לכל החיים:</strong> העירייה תגדיל את הארנונה שלכם מיד עם השלמת הבנייה, תשלום שנתי מנופח.</span>
                </li>
              </ul>
            </div>

            {/* Planet Caravan Solution */}
            <div className="comp-card solution-card">
              <div className="card-badge success-badge">הקדמה של פלאנט קראוון ✨</div>
              <h3>הבוטיק הנייד שלנו (5.20 מ')</h3>
              <ul className="comp-list">
                <li>
                  <span className="bullet-icon">⚡</span>
                  <span><strong>כניסה תוך 24 שעות:</strong> מנוף מניח את היחידה מוכנה. מחברים לחשמל ומים – וישנים שם בערב.</span>
                </li>
                <li>
                  <span className="bullet-icon">🌻</span>
                  <span><strong>אפס הרס לגינה:</strong> אין שקי מלט, אין פועלים שמסתובבים בבית. הכל יוצא נקי ואסתטי.</span>
                </li>
                <li>
                  <span className="bullet-icon">💰</span>
                  <span><strong>מחיר סופי וקבוע מראש:</strong> חיסכון של מעל 180,000 ש"ח. בלי שינויים מומצאים ובלי סחטנות קבלנים.</span>
                </li>
                <li>
                  <span className="bullet-icon">🚙</span>
                  <span><strong>חוקיות וגמישות מוחלטת:</strong> נכס נייד (רשום כרכב) ללא היתר בנייה, ללא ארנונה ואפשרות למכור או לנייד בעתיד.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="roi-section" id="roi-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">כוחו של נכס מניב</div>
            <h2>כמה כסף נשאר בתוך המשפחה שלכם?</h2>
            <p>
              שכירות בחוץ היא השקעה אבודה בנכס של אדם זר. 
              גררו את הסליידרים וראו איך רכישת יחידת בוטיק של פלאנט קראוון מחזירה את עצמה במהירות.
            </p>
          </div>

          <div className="roi-calculator-box">
            <div className="calculator-inputs">
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-title">דמי שכירות חודשיים צפויים (או חיסכון שכירות)</span>
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
                <span className="slider-hint">כמה הילד היה משלם בחוץ (או כמה תקבלו מהשכרת היחידה)</span>
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-title">משך השימוש המתוכנן (בשנים)</span>
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
                <span className="slider-hint">מספר השנים שבהן היחידה תשמש למגורים</span>
              </div>
            </div>

            <div className="calculator-results">
              <div className="result-metric">
                <p className="result-label">סה"כ כסף שהיה הולך לבעל בית זר:</p>
                <p className="result-value text-red">{totalRentCost.toLocaleString()} ש"ח</p>
              </div>

              <div className="result-divider"></div>

              <div className="result-metric">
                <p className="result-label">עלות רכישה משוערת לדגם 5.20X2.50 פרימיום:</p>
                <p className="result-value text-gold">{caravanEstCost.toLocaleString()} ש"ח</p>
              </div>

              <div className="result-divider"></div>

              <div className="result-metric highlight">
                <p className="result-label">
                  {isSaving ? "החיסכון והנכס שנשאר אצלכם בכיס:" : "עלות יחסית משוערת:"}
                </p>
                <p className={`result-value ${isSaving ? 'text-green' : 'text-red'}`}>
                  {isSaving ? `+ ${netSavings.toLocaleString()} ש"ח` : `${netSavings.toLocaleString()} ש"ח`}
                </p>
              </div>

              <p className="calculator-conclusion">
                💡 <strong>ניתוח כלכלי מהיר:</strong> במקום לזרוק <strong>{totalRentCost.toLocaleString()} ש"ח</strong> לכיס של אדם זר, 
                אתם מעמידים נכס יוקרתי בגינה, חוסכים <strong>{netSavings.toLocaleString()} ש"ח</strong>, 
                ומחזיקים בנכס נייד ששומר על ערכו וניתן למכירה מיידית בשוק יד שנייה!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Tab Details */}
      <section className="specs-section" id="specs-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">מפרט ממוקד לרוכש היוקרתי</div>
            <h2>פירוט מרכיבי העל ההנדסיים</h2>
            <p>הקראוונים שלנו מתוכננים לעמוד בסטנדרט ההנדסי הקשוח ביותר. בחרו את הקטגוריה וגלו את האמת:</p>
          </div>

          <div className="specs-tabs-container">
            <div className="specs-tabs-header">
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'chassis' ? 'active' : ''}`}
                onClick={() => setActiveTab('chassis')}
              >
                🚜 שלדת גליה ורצפה
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'insulation' ? 'active' : ''}`}
                onClick={() => setActiveTab('insulation')}
              >
                ❄️ פאנלים ובידוד
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'woodwork' ? 'active' : ''}`}
                onClick={() => setActiveTab('woodwork')}
              >
                🛋️ נגרות וציוד קצה
              </button>
              <button 
                type="button"
                className={`tab-btn ${activeTab === 'plumbing' ? 'active' : ''}`}
                onClick={() => setActiveTab('plumbing')}
              >
                💧 אינסטלציה וביוב
              </button>
            </div>

            <div className="specs-tab-content">
              {activeTab === 'chassis' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>שלדת גליה (Galia Chassis) מחוזקת לרצינות מוחלטת</h3>
                    <p>
                      ללא שלדה מוסדרת, קראוון הוא סכנה בטיחותית ופירצה לקנסות. אנו משתמשים בבסיס 
                      הטוב ביותר שניתן להשיג בישראל ואירופה:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>שלדה מגולוונת בטבילה חמה:</strong> הגנה מוחלטת מקרני שמש, רטיבות ומלחים של הקרקע.</li>
                      <li><strong>סרנים ובלמים מחברות קצה:</strong> מערכות בלימה ובלימת זעזועים המאפשרות תזוזה נוחה ובטיחות מוגברת.</li>
                      <li><strong>רישוי רכב מלא:</strong> היחידה מגיעה עם טסט בתוקף ולוחית רישוי צהובה של משרד התחבורה.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">🚜</div>
                </div>
              )}

              {activeTab === 'insulation' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>פאנלים מבודדים פוליאוריטן (PUR) 80 מ"מ</h3>
                    <p>
                      בידוד איכותי הוא ההבדל בין שינה עמוקה ושלווה לבין חיים בתוך תנור סאונה. 
                      אנו לא מתפשרים על רמת האקוסטיקה והבידוד התרמי שלכם:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>פאנל מבודד PUR בצפיפות גבוהה:</strong> בידוד תרמי מושלם בקירות ובתקרה, חוסך עד 40% בצריכת החשמל למיזוג.</li>
                      <li><strong>חלונות אלומיניום קליל עם זיגוג כפול:</strong> איטום מוחלט מרעשי כביש, כלבים נובחים או מסיבות של השכנים.</li>
                      <li><strong>איטום מוגן מים תלת-שכבתי:</strong> יציקה וגג אטום מפני חדירת מי גשמים בשיא החורף.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">❄️</div>
                </div>
              )}

              {activeTab === 'woodwork' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>ציוד קצה היי-אנד ונגרות מותאמת אדריכלית</h3>
                    <p>
                      כאשר הממדים הם 5.20 מטר על 2.50 מטר, כל סנטימטר של עיצוב פנים נשקל בקפידה. 
                      היחידה שלנו מריחה ומעוצבת כמו דירת יוקרה מעבר לים:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>פרזול Blum אוסטרי:</strong> ארונות ומגירות בטריקה שקטה ללא בלאי וללא רעשים.</li>
                      <li><strong>מיטה זוגית עם בוכנות גז:</strong> ארגז מצעים ענק מובנה מתחת למיטה לניצול שטח מושלם.</li>
                      <li><strong>מטבחון בעיצוב נקי:</strong> שיש קוורץ שאינו נשרט, כיור אינטגרלי וארונות בגוון שחור מט יוקרתי.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">🛋️</div>
                </div>
              )}

              {activeTab === 'plumbing' && (
                <div className="spec-tab-pane">
                  <div className="pane-info">
                    <h3>אינסטלציה Geberit וחיבור תשתיות Plug & Play</h3>
                    <p>
                      אינסטלציה גרועה בקראוון היא אסון. אנו מטמיעים מערכות מים סמויות ואמינות 
                      שימנעו מכם קריאות לאינסטלטורים לאורך עשרות שנים:
                    </p>
                    <ul className="spec-features-list">
                      <li><strong>מכלי הדחה סמויים Geberit:</strong> המותג המוביל בעולם למניעת נזילות, עם לחצן קיר יוקרתי בזהב.</li>
                      <li><strong>צנרת SP מבודדת:</strong> שומרת על לחץ מים חזק ויציב, ומונעת הצטברות אבנית או קפיאה של מים בחורף.</li>
                      <li><strong>חיבורי ביוב מהירים בלתי נראים:</strong> ללא ריחות וללא ריקבון, חיבור מהיר ישירות לשוחה של הבית שלכם.</li>
                    </ul>
                  </div>
                  <div className="pane-icon-large">💧</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="faq-section" id="faq-section">
        <div className="container">
          <div className="section-header">
            <div className="gold-badge">שקיפות מלאה</div>
            <h2>שאלות נפוצות של רוכשים חכמים</h2>
            <p>כשרוכשים יחידת מגורים היי-אנד, חשוב להבין את כל הפרטים המשפטיים והלוגיסטיים. הנה התשובות:</p>
          </div>

          <div className="faq-list">
            {/* FAQ 1 */}
            <div className={`faq-item ${openFaq === 1 ? 'open' : ''}`} onClick={() => toggleFaq(1)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ איך זה חוקי ללא צורך בהיתר בנייה של העירייה?</span>
                <span className="faq-toggle-icon">{openFaq === 1 ? '−' : '+'}</span>
              </div>
              {openFaq === 1 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    על פי חוק התכנון והבנייה הישראלי, מבנה מצריך היתר בנייה רק כאשר הוא מקובע חיבור קבע לקרקע (למשל יצוק בבטון או מונח על יסודות קבועים). 
                    היחידות של פלאנט קראוון מיוצרות על שלדה בעלת גלגלים, לוחית רישוי צהובה ורישיון נגרר פעיל ממשרד התחבורה. 
                    הן מונחות על רגליים תומכות זמניות הניתנות לכיוונון. מבחינה משפטית, היחידה מוגדרת כרכב נגרר החונה בשטח פרטי. 
                    אנו מספקים לכל לקוח תיק משפטי מפורט הכולל חוות דעת משפטית חתומה על ידי עורך דין מומחה לתכנון ובנייה על מנת להציג לפקחים במקרה הצורך.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className={`faq-item ${openFaq === 2 ? 'open' : ''}`} onClick={() => toggleFaq(2)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ מהן עלויות המימון ותוכניות התשלומים שיש לכם?</span>
                <span className="faq-toggle-icon">{openFaq === 2 ? '−' : '+'}</span>
              </div>
              {openFaq === 2 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    אנחנו עובדים בשיתוף פעולה הדוק עם גופי מימון ובנקים מובילים כדי לאפשר לכם לרכוש את יחידת הבוטיק בראש שקט. 
                    אנו מציעים מסלולי מימון של עד 100% מעלות הקראוון בפריסה של עד 60 תשלומים חודשיים נוחים. 
                    ברוב המקרים, ההחזר החודשי על המימון נמוך משמעותית מדמי השכירות הממוצעים באזורכם, 
                    כך שהיחידה למעשה ממומנת לחלוטין מדמי השכירות (אם היא מושכרת) או מהחיסכון הישיר של תשלום השכירות של ילדכם בחוץ.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className={`faq-item ${openFaq === 3 ? 'open' : ''}`} onClick={() => toggleFaq(3)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ איך מתבצעת ההצבה בגינה אם יש מכשולים כמו חומות או עצים?</span>
                <span className="faq-toggle-icon">{openFaq === 3 ? '−' : '+'}</span>
              </div>
              {openFaq === 3 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    לנו בפלאנט קראוון יש ניסיון של עשרות הצבות מורכבות ברחבי הארץ. לפני ההובלה, הצוות ההנדסי שלנו מנתח את החצר שלכם באמצעות הדמיות תלת-ממד ומפות לוויין. 
                    ביום ההצבה אנו משתמשים במנופי זרוע מקצועיים (עד 100 טון במידת הצורך) שיכולים להניף את היחידה בעדינות רבה מעל גג הבית הראשי או מעל חומות גבוהות ולהניחה במדויק במיקום שנבחר. 
                    ההצבה כולה מסתיימת תוך מספר שעות ללא שום נזק לבית או לגינה שלכם.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className={`faq-item ${openFaq === 4 ? 'open' : ''}`} onClick={() => toggleFaq(4)}>
              <div className="faq-question-box">
                <span className="faq-question">❓ האם יש אחריות ומה לגבי עמידות איטום הגג בחורף?</span>
                <span className="faq-toggle-icon">{openFaq === 4 ? '−' : '+'}</span>
              </div>
              {openFaq === 4 && (
                <div className="faq-answer animate-fade-in-up">
                  <p>
                    בוודאי. מאחר ומדובר במוצר היי-אנד, אנו מספקים אחריות יצרן מקיפה על השלדה, על קירות הפאנל המבודד ועל איטום הגג. 
                    הגג נאטם בשיטה תעשייתית רב-שכבתית עמידה למים ולקרינת UV קשה, כך שאין שום סיכוי לרטיבות, חדירת מים או עובש גם במהלך סערות החורף הקשות ביותר. 
                    אנו מתחייבים לאיכות ייצור בלתי מתפשרת שעומדת בתקנים המחמירים ביותר.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="contact-section">
        <div className="container contact-box">
          <div className="contact-content">
            <h2>בואו לחוות את איכות ההיי-אנד באולם התצוגה</h2>
            <p>
              אל תאמינו רק למילים ותמונות. אנו מזמינים אתכם לפגישת ייעוץ פרטית באולם התצוגה שלנו, 
              להיכנס ליחידת הבוטיק במידות 5.20 מ' X 2.50 מ', להרגיש את גובה התקרה, לבחון את הגימורים של Blum 
              ולראות בעיניים את איכות שלדת הגליה והפאנלים המבודדים. 
              בואו לקחת החלטה שתחסוך לכם מאות אלפי שקלים.
            </p>
            <div className="contact-buttons">
              <a href="tel:0500000000" className="btn-primary">📞 חייגו עכשיו לתיאום פגישה: 050-0000000</a>
              <a href="#quiz-anchor" className="btn-secondary">✏️ לבדיקת התאמה מהירה בחצר</a>
            </div>
          </div>
        </div>
      </section>

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
