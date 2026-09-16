// Tiny client-side BG/EN toggle - no build step, no page duplication (the
// duplicate-content class of bug already bit this site once on the
// station-count copy - a second full HTML file per language would just
// give that bug two more places to drift). Every translated string lives
// here once; index.html/app.html mark the DOM with data-i18n keys and this
// script fills them in. Bulgarian is the shipped markup (site's home
// market), so BG is both the default and the no-JS fallback.
(function () {
  var STORAGE_KEY = 'driveRadioLang';

  var dict = {
    nav_app: { bg: 'За приложението', en: 'Features' },
    nav_listen: { bg: 'Слушай онлайн', en: 'Listen online' },
    nav_home: { bg: 'Начало', en: 'Home' },
    web_player: { bg: 'Уеб плеър', en: 'Web player' },
    download_badge_alt: { bg: 'Изтегли от Google Play', en: 'Get it on Google Play' },

    // index.html
    index_title: { bg: 'Drive Radio — Радиото за колата', en: 'Drive Radio — The radio for your car' },
    index_meta_description: {
      bg: 'Радиото, което тръгва само щом влезеш в колата. Стотици станции, любими на един тап, Android Auto — без да докосваш телефона.',
      en: 'The radio that starts the moment you get in the car. Hundreds of stations, favorites in one tap, Android Auto — without touching your phone.',
    },
    hero_tagline: {
      bg: 'Drive Radio се грижи музиката да е винаги с теб, без да се налага да мислиш за нея.',
      en: 'Drive Radio makes sure the music is always with you, without you having to think about it.',
    },
    shot_catalog_alt: { bg: 'Каталог със станции', en: 'Station catalog' },
    shot_favorites_alt: { bg: 'Плейър и любими станции', en: 'Player and favorite stations' },
    shot_history_alt: { bg: 'История на песните', en: 'Song history' },
    highlights_eyebrow: { bg: 'Защо Drive Radio', en: 'Why Drive Radio' },
    highlights_h2: { bg: 'Радио, направено за шофиране — не за докосване', en: 'Radio built for driving — not for touching' },
    hl_bluetooth_title: { bg: 'Bluetooth Auto Start', en: 'Bluetooth Auto Start' },
    hl_bluetooth_desc: {
      bg: 'Качи се. Свържи се. Drive Radio започва да свири — без да вадиш телефона.',
      en: 'Get in. Connect. Drive Radio starts playing — without ever taking out your phone.',
    },
    hl_stations_title: { bg: 'Стотици станции', en: 'Hundreds of stations' },
    hl_stations_desc: {
      bg: 'Над 100 подбрани български радиостанции, плюс хиляди от цял свят.',
      en: '100+ curated Bulgarian radio stations, plus thousands more from around the world.',
    },
    hl_aa_title: { bg: 'Android Auto', en: 'Android Auto' },
    hl_aa_desc: { bg: 'Направо на екрана на колата, до навигацията.', en: 'Right on your car’s screen, next to navigation.' },
    hl_favorites_title: { bg: 'Любими', en: 'Favorites' },
    hl_favorites_desc: {
      bg: 'Твоите станции, подредени по твой начин, винаги под ръка.',
      en: 'Your stations, arranged your way, always within reach.',
    },
    hl_reconnect_title: { bg: 'Никога не спира', en: 'Never stops' },
    hl_reconnect_desc: {
      bg: 'Изгубиш ли мобилни данни или интернет, радиото само се свързва отново, щом се появят.',
      en: 'Lose mobile data or internet, and the radio reconnects on its own the moment it’s back.',
    },
    index_footer_cta_h2: { bg: 'Готов за път?', en: 'Ready to hit the road?' },
    index_footer_cta_p: {
      bg: 'Свържи телефона с колата и остави Drive Radio да свърши останалото.',
      en: 'Connect your phone to the car and let Drive Radio take care of the rest.',
    },

    // app.html
    app_title: { bg: 'Всички функции — Drive Radio', en: 'All features — Drive Radio' },
    app_meta_description: {
      bg: 'Всичко, което Drive Radio прави — с реални снимки от приложението, не мокъпи.',
      en: 'Everything Drive Radio does — with real screenshots from the app, not mockups.',
    },
    intro_eyebrow: { bg: 'За приложението', en: 'About the app' },
    intro_h1: { bg: 'Всичко, което Drive Radio прави', en: 'Everything Drive Radio does' },
    intro_p: {
      bg: 'Реални снимки от самото приложение — не мокъпи, не обещания. Точно това виждаш, ако го инсталираш днес.',
      en: 'Real screenshots from the app itself — no mockups, no promises. Exactly what you’ll see if you install it today.',
    },

    f01_h2: { bg: 'Качи се. Свържи се. Drive Radio започва да свири.', en: 'Get in. Connect. Drive Radio starts playing.' },
    f01_p: {
      bg: 'Избираш какво да се случва при свързване с колата си — веднъж, за всяко устройство. После Drive Radio просто се грижи за останалото, без нито един допълнителен тап.',
      en: 'Choose what happens when you connect to your car — once, per device. After that, Drive Radio just takes care of it, no extra tap needed.',
    },
    f01_alt: { bg: 'Настройки за автоматично пускане при Bluetooth свързване', en: 'Auto-start settings for a Bluetooth connection' },

    f02_h2: { bg: 'Три стъпки, веднъж — после нищо за мислене.', en: 'Three steps, once — then nothing to think about.' },
    f02_p: {
      bg: 'Drive Radio те превежда точно през нужните разрешения, обяснени на прост език, и спира дотам. Никакви излишни екрани.',
      en: 'Drive Radio walks you through exactly the permissions it needs, explained in plain language, and stops there. No extra screens.',
    },
    f02_alt: { bg: 'Стъпки за настройка на автоматизацията', en: 'Automation setup steps' },

    f03_h2: { bg: 'На екрана на колата, до навигацията — където му е мястото.', en: 'On your car’s screen, next to navigation — right where it belongs.' },
    f03_p: {
      bg: 'Drive Radio се появява направо в Android Auto, докато Waze или Maps карат отпред.',
      en: 'Drive Radio shows up right inside Android Auto, while Waze or Maps leads the way.',
    },
    f03_alt: { bg: 'Drive Radio в Android Auto до навигация', en: 'Drive Radio in Android Auto next to navigation' },

    f04_h2: { bg: 'Автомобилен режим — големи бутони, бърз достъп, нищо излишно.', en: 'Car Mode — big buttons, quick access, nothing extra.' },
    f04_p: {
      bg: 'Навигация, музикално приложение и телефон — на един тап, без да търсиш из менюта докато шофираш. Списъкът със станции се появява с един тап и сам се скрива след кратко бездействие.',
      en: 'Navigation, your music app and phone — one tap away, no digging through menus while you drive. The station list appears with a tap and hides itself again after a few idle seconds.',
    },
    f04_alt: { bg: 'Автомобилен режим с бърз достъп', en: 'Car Mode with quick access' },

    f05_h2: { bg: 'Над 100 подбрани станции. Претърсени и подредени вместо теб.', en: '100+ curated stations. Searched and sorted for you.' },
    f05_p: {
      bg: 'Всички български радиостанции на едно място — по държава, жанр или бързо търсене по име.',
      en: 'Every Bulgarian radio station in one place — by country, genre, or a quick search by name.',
    },
    f05_alt: { bg: 'Каталог с над 100 подбрани радиостанции', en: 'Catalog of 100+ curated radio stations' },

    f06_h2: { bg: 'Радиостанции от цял свят, на един тап разстояние.', en: 'Radio stations from around the world, one tap away.' },
    f06_p: {
      bg: 'Откривай станции от различни държави и жанрове, без да напускаш Drive Radio.',
      en: 'Discover stations from different countries and genres, without ever leaving Drive Radio.',
    },
    f06_alt: { bg: 'Радио станции от цял свят', en: 'Radio stations from around the world' },

    f07_h2: { bg: 'Любими — само станциите, които наистина слушаш.', en: 'Favorites — only the stations you actually listen to.' },
    f07_p: {
      bg: 'Подреди ги по свой ред, с едно плъзгане. Твоите станции остават точно както ги искаш.',
      en: 'Arrange them your way, with a single drag. Your stations stay exactly how you want them.',
    },
    f07_alt: { bg: 'Списък с любими станции', en: 'List of favorite stations' },

    f08_h2: { bg: 'Тази песен от преди малко? Ето я.', en: 'That song from a bit ago? Right here.' },
    f08_p: {
      bg: 'Пълна история на всичко изсвирено — търсене по песен или станция, групирано по дни.',
      en: 'A full history of everything played — search by song or station, grouped by day.',
    },
    f08_alt: { bg: 'История на изсвирените песни', en: 'History of played songs' },

    f09_h2: { bg: 'Хареса песента? Едно докосване до Spotify.', en: 'Like the song? One tap to Spotify.' },
    f09_p: {
      bg: 'Директна връзка към Spotify, YouTube Music, Deezer и още — точно за песента, която в момента върви.',
      en: 'A direct link to Spotify, YouTube Music, Deezer and more — for the exact song playing right now.',
    },
    f09_alt: { bg: 'Избор на музикална платформа', en: 'Choosing a music platform' },

    detail_eyebrow: { bg: 'И детайлите', en: 'And the details' },
    detail_h2: { bg: 'Малките неща, които правят разликата', en: 'The small things that make the difference' },

    d_onboarding_title: { bg: 'Лесно начало', en: 'Easy start' },
    d_onboarding_desc: {
      bg: 'Кратко въведение, после право към музиката — без излишни екрани.',
      en: 'A short intro, then straight to the music — no extra screens.',
    },
    d_onboarding_alt: { bg: 'Лесно първо стартиране', en: 'Easy first launch' },

    d_onboarding_done_title: { bg: 'Готово за тръгване', en: 'Ready to go' },
    d_onboarding_done_desc: {
      bg: 'Влез, за да синхронизираш любимите между устройствата си — или просто продължи без акаунт.',
      en: 'Sign in to sync your favorites across devices — or just continue without an account.',
    },
    d_onboarding_done_alt: { bg: 'Край на въведението с вход в акаунт', en: 'End of onboarding with account sign-in' },

    d_quickbuttons_title: { bg: 'Всичко на един поглед', en: 'Everything at a glance' },
    d_quickbuttons_desc: {
      bg: 'Навигация, музика, телефон — винаги на екрана, дори когато списъкът със станции сам се скрие.',
      en: 'Navigation, music, phone — always on screen, even when the station list hides itself.',
    },
    d_quickbuttons_alt: { bg: 'Бързи бутони в Автомобилен режим', en: 'Quick-access buttons in Car Mode' },

    d_settings_title: { bg: 'Настройки, на едно място', en: 'Settings, all in one place' },
    d_settings_desc: {
      bg: 'Bluetooth устройства, език, платформа, плейбек — всичко ясно подредено.',
      en: 'Bluetooth devices, language, music platform, playback — all clearly laid out.',
    },
    d_settings_alt: { bg: 'Основни настройки', en: 'Main settings' },

    d_playback_title: { bg: 'Твоите правила', en: 'Your rules' },
    d_playback_desc: { bg: 'Timer за заспиване, поведение на Next/Prev — ти решаваш.', en: 'Sleep timer, Next/Prev behavior — you decide.' },
    d_playback_alt: { bg: 'Настройки за плейбек', en: 'Playback settings' },

    d_languages_title: { bg: 'На твоя език', en: 'In your language' },
    d_languages_desc: { bg: 'Приложението говори твоя език, не само български.', en: 'The app speaks your language, not just Bulgarian.' },
    d_languages_alt: { bg: 'Избор на език', en: 'Language selection' },

    d_premium_title: { bg: 'Premium, когато поискаш', en: 'Premium, whenever you want it' },
    d_premium_desc: {
      bg: 'Безплатното е достатъчно добро. Premium просто прави всичко още по-приятно.',
      en: 'The free version is good enough on its own. Premium just makes everything a bit nicer.',
    },
    d_premium_alt: { bg: 'Premium функция', en: 'Premium feature' },

    d_help_title: { bg: 'Помощ, когато ти трябва', en: 'Help, whenever you need it' },
    d_help_desc: { bg: 'Обратна връзка и подкрепа — на един клик разстояние.', en: 'Feedback and support — one click away.' },
    d_help_alt: { bg: 'Помощ и обратна връзка', en: 'Help and feedback' },

    app_footer_cta_h2: { bg: 'Готов да чуеш разликата?', en: 'Ready to hear the difference?' },
    app_footer_cta_p: {
      bg: 'Безплатно е и стартира само щом влезеш в колата.',
      en: 'It’s free, and it starts the moment you get in the car.',
    },
  };

  function lang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'bg';
  }

  function applyLang(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var entry = dict[el.getAttribute('data-i18n')];
      if (entry) el.textContent = entry[l];
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      var entry = dict[el.getAttribute('data-i18n-alt')];
      if (entry) el.setAttribute('alt', entry[l]);
    });
    document.querySelectorAll('[data-i18n-content]').forEach(function (el) {
      var entry = dict[el.getAttribute('data-i18n-content')];
      if (entry) el.setAttribute('content', entry[l]);
    });
    var titleEntry = dict[document.documentElement.getAttribute('data-i18n-title')];
    if (titleEntry) document.title = titleEntry[l];
    document.querySelectorAll('.badge img').forEach(function (img) {
      img.src = 'assets/google-play-badge' + (l === 'en' ? '-en' : '') + '.png';
    });
    document.querySelectorAll('[data-lang-toggle] [data-lang]').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === l);
    });
  }

  function setLang(l) {
    localStorage.setItem(STORAGE_KEY, l);
    applyLang(l);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(lang());
    document.querySelectorAll('[data-lang-toggle] [data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(btn.getAttribute('data-lang'));
      });
    });
  });
})();
