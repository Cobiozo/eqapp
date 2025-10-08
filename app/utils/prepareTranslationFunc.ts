import translate from "./translate"

export default function prepareTranslationFunc(lang: string) {
  return (key: string, data?: string | number) => {
    return translate(lang, key, data);
  }
}
