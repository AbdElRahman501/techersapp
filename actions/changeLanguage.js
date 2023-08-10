import en from '../locales/en.json';
import ar from '../locales/ar.json';
import { useSelector } from 'react-redux';

const translations = { en, ar };

const t = (key, params = {}) => {
    const { language } = useSelector((state) => state.languageState);

    // console.log("🚀 ~ file: cahngeLanguage.js:13 ~ t ~ language:", language)
    const translation = translations[language][key];
    // console.log("🚀 ~ file: cahngeLanguage.js:13 ~ t ~ translation:", translation)
    if (!translation) {
        console.warn(`Translation for key '${key}' in language '${language}' not found.`);
        return key;
    }

    // Simple template replacement using curly braces
    return translation.replace(/{([^}]+)}/g, (match, key) => params[key] || match);
};

export default t;
