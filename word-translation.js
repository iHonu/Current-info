export function getHelloWord(countryCode) {
  const helloWordSmall = translations[countryCode];
  if (helloWordSmall) {
    const helloWord = helloWordSmall;
    return helloWord;
  } else {
    return 'Hello';
  }
}

const translations = {
  af: 'Hallo',
  ar: 'مرحبا',
  bn: 'হ্যালো',
  cs: 'Ahoj',
  da: 'Hej',
  de: 'Hallo',
  el: 'Γειά σας',
  en: 'Hello',
  es: 'Hola',
  fi: 'Hei',
  fr: 'Bonjour',
  hi: 'नमस्ते',
  hu: 'Szia',
  id: 'Halo',
  it: 'Ciao',
  ja: 'こんにちは',
  ko: '안녕하세요',
  ms: 'Halo',
  nl: 'Hallo',
  no: 'Hei',
  pl: 'Cześć',
  pt: 'Olá',
  ro: 'Salut',
  ru: 'Привет',
  sv: 'Hej',
  th: 'สวัสดี',
  tr: 'Merhaba',
  uk: 'Привіт',
  vi: 'Xin chào',
  zh: '你好',
};
