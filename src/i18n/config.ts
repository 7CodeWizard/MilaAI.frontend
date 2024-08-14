import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import it from './locales/it/translation.json'
import cn from './locales/cn/translation.json'
import ko from './locales/ko/translation.json'
import es from './locales/es/translation.json'
import mx from './locales/mx/translation.json'
import fr from './locales/fr/translation.json'
import ge from './locales/ge/translation.json'
import jp from './locales/jp/translation.json'
import ru from './locales/ru/translation.json'
import pt from './locales/pt/translation.json'
import cz from './locales/cz/translation.json'
import da from './locales/da/translation.json'
import du from './locales/du/translation.json'
import fi from './locales/fi/translation.json'
import gr from './locales/gr/translation.json'
import id from './locales/id/translation.json'
import no from './locales/no/translation.json'
import po from './locales/po/translation.json'
import ro from './locales/ro/translation.json'
import sw from './locales/sw/translation.json'
import tr from './locales/tr/translation.json'
import ua from './locales/ua/translation.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  interpolation: {
    escapeValue: false
  },

  resources: {
    en: {
      translation: en
    },
    it: {
      translation: it
    },
    cn: {
      translation: cn
    },
    ko: {
      translation: ko
    },
    es: {
      translation: es
    },
    mx: {
      translation: mx
    },
    fr: {
      translation: fr
    },
    ge: {
      translation: ge
    },
    jp: {
      translation: jp
    },
    ru: {
      translation: ru
    },
    pt: {
      translation: pt
    },
    cz: {
      translation: cz
    },
    da: {
      translation: da
    },
    du: {
      translation: du
    },
    fi: {
      translation: fi
    },
    gr: {
      translation: gr
    },
    id: {
      translation: id
    },
    no: {
      translation: no
    },
    po: {
      translation: po
    },
    ro: {
      translation: ro
    },
    sw: {
      translation: sw
    },
    tr: {
      translation: tr
    },
    ua: {
      translation: ua
    }
  }
})

i18n.languages = [
  'en',
  'it',
  'cn',
  'ko',
  'es',
  'mx',
  'fr',
  'ge',
  'jp',
  'ru',
  'pt',
  'cz',
  'da',
  'du',
  'fi',
  'gr',
  'id',
  'no',
  'po',
  'ro',
  'sw',
  'tr',
  'ua'
]

export default i18n
