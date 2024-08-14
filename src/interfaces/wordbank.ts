export interface LearnedWord {
  id: string
  word: string
  romanization: string
  confidence: number
}

export interface WordProgress {
  [date: string]: {
    new_word_count: number
    total_words: number
  }
}

export interface WordMeaning {
  definition: string
  partOfSpeech: string
  example: string
}

export interface WordDefinition {
  phonetic: string
  meanings: WordMeaning[]
}
