import popup from './../assets/sounds/popup.mp3'
import { UserWord } from './../services/interface'
import { IWord } from '../services/interface'
import { Token } from '../interfaces'

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

export const playPopupSound = () => {
  const audio = new Audio(popup)
  audio.play()
}

export const getSplittedWords = (message: string, wordsMap: IWord | UserWord) => {
  if (Object.keys(wordsMap).length === 0) return []

  let words = Object.keys(wordsMap)

  const sortedWords = words.sort((a, b) => b.length - a.length)
  const pattern = sortedWords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  return message.split(new RegExp(`(${pattern})`)).filter((t) => t.length !== 0)
}

export const getTokensWithSpaces = (message: string, tokens: Token[]): Token[] => {
  if (tokens.length === 0) return []

  const map = {}
  for (let token of tokens) {
    map[token.token] = token
  }

  const sortedWords = Object.keys(map).sort((a, b) => b.length - a.length)
  const pattern = sortedWords.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const finalWords = message.split(new RegExp(`(${pattern})`)).filter((t) => t.length !== 0)
  return finalWords.map((word) =>
    map[word]
      ? map[word]
      : {
          audio: null,
          furigana: null,
          kanji_only_length: null,
          romanization: null,
          token: word,
          translation: null
        }
  )
}
export const roundToTwoDecimals = (number: Number) => Number(number.toFixed(2))
