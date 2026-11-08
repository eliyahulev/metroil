export const translations = {
  he: {
    header: {
      logo: "מטרו ישראל",
      nav: {
        news: "חדשות",
        lines: "קווים",
        project: "הפרויקט",
        how: "איך זה נעשה",
        contact: "צור קשר",
      },
      menuLabel: "פתח תפריט ניווט",
      mainAction: "קראו את חדשות המטרו",
    },
    home: {
      hero: {
        title: "מידע וחדשות על המטרו של גוש דן",
        subtitle: "פרויקט התחבורה הגדול בישראל",
        factsLabel: "המטרו במספרים",
        stats: [
          ["פתיחה מתוכננת", "2037"],
          ["קווים", "3"],
          ["תחנות תת־קרקעיות", "109"],
        ],
        lineDetail: (km, stations) => `${km} ק״מ · ${stations} תחנות`,
        secondary: "ראו את מפת הקווים",
        factLabel: "אורך הרשת",
        factValue: "150 ק״מ",
        factTitle: "24 רשויות מקומיות על הקווים",
        alt: "רכבת מטרו בתחנה תת־קרקעית, הדמיה",
      },
      news: {
        title: "חדשות המטרו",
        description: "הדיווחים האחרונים על המכרזים, ההיתרים והעבודות בשטח.",
      },
      lines: {
        title: "שלושת קווי המטרו",
        description: "שלושה קווים תת־קרקעיים שיחברו את ערי גוש דן.",
        items: [
          { id: "m1", name: "M1", text: "צפון–דרום, מהוד השרון ורעננה עד רחובות ולוד", km: 85, stations: 62 },
          { id: "m2", name: "M2", text: "מזרח–מערב, מפתח תקווה לחולון", km: 26, stations: 22 },
          { id: "m3", name: "M3", text: "חצי טבעת, מבת ים להרצליה", km: 39, stations: 25 },
        ],
        km: (km) => `${km} ק״מ`,
        mapAlt: "מפת קווי המטרו M1, ‏M2 ו־M3 בגוש דן",
      },
      project: {
        title: "מצב הפרויקט",
        description: "הנתונים העדכניים על העלות, המכרזים ולוח הזמנים.",
        cost: { label: "עלות מוערכת", value: "177", unit: "מיליארד ש״ח", billions: 177 },
        tenders: { label: "מכרזי התשתית (אינפרא 1)", value: "65 מיליארד ש״ח", billions: 65 },
        stats: [
          ["19", "קבוצות שעברו מיון מוקדם"],
          ["21 אלף", "הודעות הפקעה שנשלחו, בקירוב"],
          ["אוק׳ 2026", "היתר ראשון לתחנה"],
        ],
      },
      contact: {
        title: "צור קשר",
        description: "יש לכם שאלות? נשמח לשמוע מכם",
        name: "שם מלא",
        email: "כתובת אימייל",
        message: "הודעה",
        submit: "שלח הודעה",
        sending: "שולח...",
        success: "ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.",
        error: "אירעה שגיאה. אנא נסו שוב.",
        namePlaceholder: "הכניסו את שמכם",
        emailPlaceholder: "הכניסו את כתובת האימייל",
        messagePlaceholder: "כתבו את הודעתכם כאן...",
      },
    },
    howItsDone: {
      title: "איך זה נעשה",
      description: "תהליך הבנייה והמימוש של פרויקט המטרו הגדול בישראל",
      timeline: {
        step1: {
          title: "תכנון ראשוני ואישורים",
          description:
            "פרויקט המטרו הוא פרויקט התשתית הגדול ביותר במדינת ישראל, עם 109 תחנות תת־קרקעיות, 24 ערים מחוברות, ו-300 קילומטרים של מנהרות. הפרויקט כולל שלושה קווים עיקריים שיחברו את כל גוש דן.",
        },
        step2: {
          title: "מכרזי הענק הבין־לאומיים",
          description:
            'נת"ע החלה בשלב המיון המוקדם למכרזי הענק של פרויקט המטרו בגוש דן, בהיקף כ-65 מיליארד ש"ח. המכרזים מתבצעים במתכונת DB (Design Build) - תכנון ובנייה, כאשר החברות הזוכות יהיו אחראיות על התכנון המפורט והביצוע של המנהרות והתחנות התת־קרקעיות.',
        },
        step3: {
          title: "שיתוף פעולה בין־לאומי",
          description:
            "המכרזים פתוחים לחברות מובילות מהארץ ומהעולם, בעלות ניסיון מוכח בפרויקטי מטרו ותשתיות תת־קרקעיות מורכבות. החברות הזוכות יביאו עמן טכנולוגיות מתקדמות וניסיון מפרויקטים דומים ברחבי העולם.",
        },
        step4: {
          title: "תחילת הבנייה",
          description:
            'הפרויקט כולל עשרות תחנות תת־קרקעיות, מאות קילומטרים של מנהרות ואלפי עובדים מהארץ ומהעולם. על פי נת"ע, הפרויקט צפוי ליצור אלפי מקומות עבודה ולהביא למהפכה תחבורתית שתשנה את פני גוש דן.',
        },
        step5: {
          title: "הפעלה והשקה",
          description:
            "הפרויקט הוא מחולל שינוי כלכלי וחברתי, קטר שיניע את המשק קדימה ויוביל את תושבי ישראל לעתיד תחבורתי טוב יותר. המטרו הוא מחויב המציאות למען הדורות הבאים.",
        },
      },
      process: {
        title: "תהליך המימוש:",
        text: 'הפרויקט מנוהל על ידי נת"ע (נתיבי תחבורה עירוניים) ומשרד התחבורה, תוך שיתוף פעולה מלא עם הרשויות המקומיות, משרדי הממשלה וחברות התשתית. האתגר גדול והאחריות אדירה, אך המטרו הוא מחויב המציאות למען הדורות הבאים.',
      },
    },
    privacy: {
      title: "הגדרות פרטיות",
      content: [
        'אתר זה הוא אתר עצמאי ואינו קשור בכל דרך שהיא לנת"ע (נתיבי תחבורה עירוניים בע"מ) או למשרד התחבורה. אין לאתר כל קשר רשמי, מסחרי או אחר לגופים אלה, וכל המידע המוצג בו הוא בלתי רשמי ואינו מהווה מקור רשמי של נת"ע או של משרד התחבורה.',
        'מטרו ישראל מחויבת להגנה על פרטיות המשתמשים באתר זה. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך בהתאם לחוק הגנת הפרטיות התשמ"א-1981 ולחוק הגנת הפרטיות (תיקון), התשנ"ו-1996.',
        'אנו אוספים מידע אישי רק כאשר אתה מספק אותו מרצונך, כגון בעת יצירת קשר או הרשמה לשירותים. המידע שנאסף עשוי לכלול שם, כתובת דוא"ל, מספר טלפון ופרטים נוספים הנדרשים לשירות.',
        "המידע האישי משמש אותנו למטרות הבאות: מתן שירותים, שיפור האתר, תקשורת עם המשתמשים, ועמידה בדרישות החוק. אנו לא מוכרים או מעבירים מידע אישי לצדדים שלישיים ללא הסכמתך המפורשת, למעט במקרים הנדרשים על פי חוק.",
        "אנו נוקטים באמצעי אבטחה טכנולוגיים וארגוניים מתקדמים להגנה על המידע האישי מפני גישה לא מורשית, שימוש לרעה, חשיפה או הרס. עם זאת, אין אפשרות להבטיח אבטחה מוחלטת של מידע המועבר דרך האינטרנט.",
        "לפי חוק הגנת הפרטיות, יש לך זכות לעיין במידע האישי עליך המצוי בידינו, לדרוש תיקון או מחיקה של מידע שגוי או לא מעודכן, ולבקש שלא נעשה שימוש במידע למטרות שיווק. ניתן לפנות אלינו בכל עת בנושא זה.",
        "האתר עשוי להשתמש בעוגיות לשיפור חוויית המשתמש ולניתוח התנהגות המשתמשים. ניתן להגדיר את הדפדפן לסרב לעוגיות, אך הדבר עלול להשפיע על תפקוד האתר.",
        "אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת. שינויים משמעותיים יפורסמו באתר. המשך השימוש באתר לאחר פרסום השינויים מהווה הסכמה למדיניות המעודכנת.",
        "לשאלות או בקשות בנושא פרטיות, ניתן לפנות אלינו באמצעות פרטי הקשר המופיעים באתר. אנו מחויבים להגיב לבקשות בהתאם לדרישות החוק.",
      ],
    },
    accessibility: {
      title: "הגדרות נגישות",
      content: [
        'מטרו ישראל מחויבת להבטיח נגישות מלאה לאתר זה עבור כל המשתמשים, כולל אנשים עם מוגבלויות. אנו פועלים בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות התשנ"ח-1998 ולתקנות נגישות השירות.',
        "האתר נבנה בהתאם לתקן WCAG 2.1 ברמה AA, וכולל תכונות נגישות כגון: ניווט מקלדת, תמיכה בקוראי מסך, ניגודיות צבעים מותאמת, וטקסט חלופי לתמונות. תכונות נגישות זמינות כוללות: ניווט מלא באמצעות מקלדת, תמיכה בקוראי מסך עבור משתמשים עם לקויות ראייה, ניגודיות צבעים גבוהה לקריאה נוחה, טקסט חלופי לכל התמונות והגרפיקה, כותרות וסימונים סמנטיים לניווט קל, וגודל טקסט ניתן להגדלה.",
        "ניתן לנווט באתר במלואו באמצעות מקלדת בלבד. השתמשו בכפתור Tab למעבר בין אלמנטים, Enter לביצוע פעולות, ו-Escape לסגירת תפריטים.",
        "ניתן להגדיל את הטקסט באתר באמצעות הגדרות הדפדפן (Ctrl/Cmd + +). כמו כן, רוב הדפדפנים המודרניים תומכים בהגדרות נגישות נוספות שניתן להפעיל בהגדרות הדפדפן.",
        "אם נתקלת בבעיית נגישות באתר, נשמח לשמוע ממך. אנא צור קשר עמנו ונפעל לתיקון הבעיה בהקדם האפשרי. אנו מחויבים לשפר את הנגישות באופן מתמיד.",
        "אנו ממשיכים לעבוד על שיפור הנגישות של האתר ומוסיפים תכונות חדשות באופן קבוע. אנו עוקבים אחר התקנים העדכניים ביותר ומעדכנים את האתר בהתאם.",
      ],
    },
    footer: {
      copyright: "מטרו ישראל",
      lede: "מידע עצמאי על המטרו של גוש דן.",
      privacy: "הגדרות פרטיות",
      accessibility: "הגדרות נגישות",
      legalLabel: "מידע משפטי",
    },
    cookies: {
      text: "האתר משתמש בעוגיות של Google Analytics כדי להבין איך משתמשים בו.",
      more: "מדיניות הפרטיות",
      accept: "הבנתי",
    },
    news: {
      title: "חדשות ועדכונים",
      description: "כל החדשות והעדכונים האחרונים על פרויקט המטרו",
      loading: "טוען...",
      noPosts: "אין עדיין חדשות",
      notFound: "הכתבה לא נמצאה",
      backToNews: "חזרה לחדשות",
      readMore: "קרא עוד",
      latestNews: "חדשות אחרונות",
      viewAll: "לכל החדשות",
      loadMore: "טען עוד כתבות",
    },
  },
  en: {
    header: {
      logo: "Metro Israel",
      nav: {
        news: "News",
        lines: "Lines",
        project: "Project",
        how: "How it's built",
        contact: "Contact",
      },
      menuLabel: "Open navigation menu",
      mainAction: "Read metro news",
    },
    home: {
      hero: {
        title: "News and facts on the Gush Dan metro",
        subtitle: "Israel's Largest Transportation Project",
        factsLabel: "The metro in numbers",
        stats: [
          ["Planned opening", "2037"],
          ["Lines", "3"],
          ["Underground stations", "109"],
        ],
        lineDetail: (km, stations) => `${km} km · ${stations} stations`,
        secondary: "See the line map",
        factLabel: "Network length",
        factValue: "150 km",
        factTitle: "24 local authorities on the lines",
        alt: "A metro train at an underground station, rendering",
      },
      news: {
        title: "Metro news",
        description: "The latest reports on tenders, permits and work on the ground.",
      },
      lines: {
        title: "The three metro lines",
        description: "Three underground lines that will connect the cities of Gush Dan.",
        items: [
          { id: "m1", name: "M1", text: "North–south, from Hod HaSharon and Ra'anana to Rehovot and Lod", km: 85, stations: 62 },
          { id: "m2", name: "M2", text: "East–west, from Petah Tikva to Holon", km: 26, stations: 22 },
          { id: "m3", name: "M3", text: "A half ring, from Bat Yam to Herzliya", km: 39, stations: 25 },
        ],
        km: (km) => `${km} km`,
        mapAlt: "Map of metro lines M1, M2 and M3 in Gush Dan",
      },
      project: {
        title: "Where the project stands",
        description: "The latest figures on cost, tenders and schedule.",
        cost: { label: "Estimated cost", value: "₪177", unit: "billion", billions: 177 },
        tenders: { label: "Infrastructure tenders (Infra 1)", value: "₪65 billion", billions: 65 },
        stats: [
          ["19", "Groups through prequalification"],
          ["21,000", "Expropriation notices sent, approximately"],
          ["Oct 2026", "First station permit"],
        ],
      },
      contact: {
        title: "Contact Us",
        description: "Have questions? We'd love to hear from you",
        name: "Full Name",
        email: "Email Address",
        message: "Message",
        submit: "Send Message",
        sending: "Sending...",
        success: "Message sent successfully! We'll get back to you soon.",
        error: "An error occurred. Please try again.",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your email address",
        messagePlaceholder: "Write your message here...",
      },
    },
    howItsDone: {
      title: "How it's built",
      description:
        "The construction and implementation process of Israel's largest metro project",
      timeline: {
        step1: {
          title: "Initial Planning and Approvals",
          description:
            "The metro project is the largest infrastructure project in the State of Israel, with 109 underground stations, 24 connected cities, and 300 kilometers of tunnels. The project includes three main lines that will connect all of Gush Dan.",
        },
        step2: {
          title: "International Mega Tenders",
          description:
            "NTA has begun the preliminary screening phase for the mega tenders of the Gush Dan metro project, with a scope of approximately 65 billion NIS. The tenders are conducted in DB (Design Build) format - design and construction, where the winning companies will be responsible for the detailed design and execution of the tunnels and underground stations.",
        },
        step3: {
          title: "International Cooperation",
          description:
            "The tenders are open to leading companies from Israel and around the world, with proven experience in metro projects and complex underground infrastructure. The winning companies will bring advanced technologies and experience from similar projects around the world.",
        },
        step4: {
          title: "Construction Begins",
          description:
            "The project includes dozens of underground stations, hundreds of kilometers of tunnels, and thousands of workers from Israel and around the world. According to NTA, the project is expected to create thousands of jobs and bring about a transportation revolution that will change the face of Gush Dan.",
        },
        step5: {
          title: "Operation and Launch",
          description:
            "The project is an economic and social change driver, a locomotive that will drive the economy forward and lead the residents of Israel to a better transportation future. The metro is a necessity for future generations.",
        },
      },
      process: {
        title: "Implementation Process:",
        text: "The project is managed by NTA (Metropolitan Mass Transit System) and the Ministry of Transportation, with full cooperation with local authorities, government ministries, and infrastructure companies. The challenge is great and the responsibility is enormous, but the metro is a necessity for future generations.",
      },
    },
    privacy: {
      title: "Privacy Settings",
      content: [
        "This is an independent website and is not affiliated in any way with NTA (Metropolitan Mass Transit System Ltd. / Netivei Ta'avura Ironiyim) or the Ministry of Transport. The website has no official, commercial, or other connection to these entities, and all information presented on it is unofficial and does not constitute an official source from NTA or the Ministry of Transport.",
        "Metro Israel is committed to protecting the privacy of users of this website. This policy explains how we collect, use, and protect your personal information in accordance with the Protection of Privacy Law, 5741-1981 and the Protection of Privacy Law (Amendment), 5756-1996.",
        "We collect personal information only when you provide it voluntarily, such as when contacting us or registering for services. The information collected may include name, email address, phone number, and other details required for the service.",
        "Personal information is used for the following purposes: providing services, improving the website, communicating with users, and complying with legal requirements. We do not sell or transfer personal information to third parties without your explicit consent, except in cases required by law.",
        "We employ advanced technological and organizational security measures to protect personal information from unauthorized access, misuse, disclosure, or destruction. However, it is not possible to guarantee absolute security of information transmitted over the Internet.",
        "According to the Protection of Privacy Law, you have the right to review your personal information in our possession, request correction or deletion of incorrect or outdated information, and request that we not use the information for marketing purposes. You can contact us at any time regarding this matter.",
        "The website may use cookies to improve user experience and analyze user behavior. You can configure your browser to refuse cookies, but this may affect the website's functionality.",
        "We reserve the right to update this policy from time to time. Significant changes will be published on the website. Continued use of the website after publication of changes constitutes acceptance of the updated policy.",
        "For questions or requests regarding privacy, you can contact us using the contact details provided on the website. We are committed to responding to requests in accordance with legal requirements.",
      ],
    },
    accessibility: {
      title: "Accessibility Settings",
      content: [
        "Metro Israel is committed to ensuring full accessibility of this website for all users, including people with disabilities. We operate in accordance with the Equal Rights for Persons with Disabilities Law, 5758-1998 and the Service Accessibility Regulations.",
        "The website is built in accordance with WCAG 2.1 Level AA standards and includes accessibility features such as: keyboard navigation, screen reader support, adjusted color contrast, and alternative text for images. Available accessibility features include: full keyboard navigation, screen reader support for users with visual impairments, high color contrast for comfortable reading, alternative text for all images and graphics, semantic headings and markers for easy navigation, and resizable text.",
        "You can navigate the entire website using only the keyboard. Use the Tab key to move between elements, Enter to perform actions, and Escape to close menus.",
        "You can enlarge the text on the website using browser settings (Ctrl/Cmd + +). Additionally, most modern browsers support additional accessibility settings that can be activated in the browser settings.",
        "If you encounter an accessibility issue on the website, we would be happy to hear from you. Please contact us and we will work to fix the issue as soon as possible. We are committed to continuously improving accessibility.",
        "We continue to work on improving the website's accessibility and regularly add new features. We follow the latest standards and update the website accordingly.",
      ],
    },
    footer: {
      copyright: "Metro Israel",
      lede: "Independent information on the Gush Dan metro.",
      privacy: "Privacy Settings",
      accessibility: "Accessibility Settings",
      legalLabel: "Legal",
    },
    cookies: {
      text: "This site uses Google Analytics cookies to understand how it is used.",
      more: "Privacy policy",
      accept: "Got it",
    },
    news: {
      title: "News & Updates",
      description: "All the latest news and updates about the Metro project",
      loading: "Loading...",
      noPosts: "No news yet",
      notFound: "Article not found",
      backToNews: "Back to News",
      readMore: "Read more",
      latestNews: "Latest News",
      viewAll: "View All News",
      loadMore: "Load more articles",
    },
  },
};
