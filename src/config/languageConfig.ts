export type SupportedLanguage = 'vi' | 'en' | 'ja' | 'ko' | 'zh' | 'th' | 'fr' | 'de' | 'es' | 'pt';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string; // Tên ngôn ngữ bằng chính ngôn ngữ đó
  nameEnglish: string; // Tên tiếng Anh (dùng trong prompt cho AI)
  htmlLang: string; // Giá trị cho <html lang="...">
  direction: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguage, LanguageConfig> = {
  vi: { code: 'vi', name: 'Tiếng Việt', nameEnglish: 'Vietnamese', htmlLang: 'vi', direction: 'ltr' },
  en: { code: 'en', name: 'English', nameEnglish: 'English', htmlLang: 'en', direction: 'ltr' },
  ja: { code: 'ja', name: '日本語', nameEnglish: 'Japanese', htmlLang: 'ja', direction: 'ltr' },
  ko: { code: 'ko', name: '한국어', nameEnglish: 'Korean', htmlLang: 'ko', direction: 'ltr' },
  zh: { code: 'zh', name: '中文', nameEnglish: 'Chinese', htmlLang: 'zh', direction: 'ltr' },
  th: { code: 'th', name: 'ภาษาไทย', nameEnglish: 'Thai', htmlLang: 'th', direction: 'ltr' },
  fr: { code: 'fr', name: 'Français', nameEnglish: 'French', htmlLang: 'fr', direction: 'ltr' },
  de: { code: 'de', name: 'Deutsch', nameEnglish: 'German', htmlLang: 'de', direction: 'ltr' },
  es: { code: 'es', name: 'Español', nameEnglish: 'Spanish', htmlLang: 'es', direction: 'ltr' },
  pt: { code: 'pt', name: 'Português', nameEnglish: 'Portuguese', htmlLang: 'pt', direction: 'ltr' }
};

export function getLanguageConfig(): LanguageConfig {
  const langCode = (import.meta.env.VITE_LANGUAGE || 'vi') as SupportedLanguage;
  const config = SUPPORTED_LANGUAGES[langCode];
  if (!config) {
    console.warn(`Ngôn ngữ "${langCode}" không hỗ trợ. Sử dụng mặc định: Tiếng Việt.`);
    return SUPPORTED_LANGUAGES.vi;
  }
  return config;
}
