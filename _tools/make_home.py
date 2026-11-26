# Builds the two language versions of the homepage from one source.
#
#   _tools/home.src.html  ->  index.html     (Bulgarian, https://driveradio.app/)
#                         ->  en/index.html  (English,   https://driveradio.app/en/)
#
# Both pages carry the same markup with every text in both languages
# (<span data-l="bg"> / <span data-l="en">); the CSS shows the one matching
# <html lang>. Each URL now has ONE fixed language, so Google sees a Bulgarian
# page and an English page instead of one page whose language changes by JS.
# Edit home.src.html, then run:  python _tools/make_home.py
# (Folders starting with "_" are not published by GitHub Pages / Jekyll.)
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = (ROOT / '_tools' / 'home.src.html').read_text(encoding='utf-8')

PLAY = 'https://play.google.com/store/apps/details?id=bg.driveradio.app'


def play(campaign):
    return PLAY + '&amp;referrer=utm_source%3Ddriveradio.app%26utm_medium%3Dwebsite%26utm_campaign%3D' + campaign


PAGES = {
    'bg': {
        'out': ROOT / 'index.html',
        'LANG': 'bg',
        'TITLE': 'Drive Radio – онлайн радио, което стартира само в колата',
        'DESCRIPTION': 'С Drive Radio твоето онлайн радио стартира само, щом телефонът се свърже с колата по Bluetooth. Работи и при заключен телефон, с Android Auto и бутоните на волана. Слушането е безплатно.',
        'URL': 'https://driveradio.app/',
        'OG_LOCALE': 'bg_BG',
        'OG_TITLE': 'Drive Radio – Без докосване. Само карай.',
        'OG_DESCRIPTION': 'Качваш се, телефонът се свързва с колата и твоето радио стартира само.',
        'PLAY': play('home_bg'),
        'PLAYER': 'https://player.driveradio.app/?lang=bg',
        # Real-car Short (YouTube): empty VIDEO_ID hides the section on that page
        'VIDEO_ID': '-r-MTbUttYo',
        'VIDEO_URL': 'https://youtube.com/shorts/-r-MTbUttYo',
        'VIDEO_POSTER': '/img/short-car-bg.jpg',
        'VIDEO_LABEL': 'Пусни видеото: Drive Radio в истинска кола',
        'BG_CURRENT': 'true',
        'EN_CURRENT': 'false',
    },
    'en': {
        'out': ROOT / 'en' / 'index.html',
        'LANG': 'en',
        'TITLE': 'Drive Radio – online radio that starts by itself in your car',
        'DESCRIPTION': 'With Drive Radio your online radio starts by itself when the phone connects to the car over Bluetooth. Works with the phone locked, with Android Auto and the steering wheel buttons. Listening is free.',
        'URL': 'https://driveradio.app/en/',
        'OG_LOCALE': 'en_US',
        'OG_TITLE': 'Drive Radio – No tapping. Just drive.',
        'OG_DESCRIPTION': 'Get in, your phone connects to the car and your radio starts by itself.',
        'PLAY': play('home_en'),
        'PLAYER': 'https://player.driveradio.app/?lang=en',
        'VIDEO_ID': '',  # English Short not uploaded yet
        'VIDEO_URL': '',
        'VIDEO_POSTER': '/img/short-car-en.jpg',
        'VIDEO_LABEL': 'Play the video: Drive Radio in a real car',
        'BG_CURRENT': 'false',
        'EN_CURRENT': 'true',
    },
}

for key, page in PAGES.items():
    page['VIDEO_HIDDEN'] = '' if page['VIDEO_ID'] else 'hidden'
    html = SRC
    for name, value in page.items():
        if name == 'out':
            continue
        html = html.replace('{{' + name + '}}', value)
    if '{{' in html:
        raise SystemExit('unfilled placeholder in ' + key)
    page['out'].parent.mkdir(parents=True, exist_ok=True)
    page['out'].write_text(html, encoding='utf-8', newline='\n')
    print('wrote', page['out'].relative_to(ROOT))
