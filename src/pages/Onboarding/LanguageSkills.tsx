import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BlueMila, SpeechBubbleLeft, SpeechBubbleRight } from '../../components/Icons'
import TransitionEffect from '../../components/TransitionEffect'
import './index.css'
import { LanguageEnum } from '../../services/interface'
import { useAuthStore } from '../../state'
import { fullLanguage } from '../../utils/constant'
import IsTyping from './IsTyping'

const greeting = {
  [LanguageEnum.Chinese]: '棒棒的! (bàng bàng de!)',
  [LanguageEnum.Japanese]: 'すごい! (Sugoi!)',
  [LanguageEnum.British]: 'Magnificent!',
  [LanguageEnum.American]: 'Magnificent!',
  [LanguageEnum.German]: 'Herrlich!',
  [LanguageEnum.French]: 'Magnifique !',
  [LanguageEnum.Spanish]: '¡Magnífico!'
}

interface LanguageSkillsProps {
  onSelectLanguageSkills: (value: Array<string>) => void
}

const skillTopics = ["Listening", "Speaking", "Reading", "Writing", "Vocabulary", "Grammar", "Cultural Understanding"]

const skills = {
  listening: ["Conversational", "Pitch accents and intonation patterns", "Implied meanings and inferences", "Spoken narratives or stories "],
  speaking: ["Pronunciation", "Opportunities and networking", "Intonation and pitch accent accuracy", "Conversational skills", "Expressing emotions",],
  reading: ["Kanji, katakana and hiragana", "Vocabulary and phrases", "Comprehension", "Grammar and syntax",],
  writing: ["Hiragana, katakana and kanji", "Sentence structure", "Composition and conherence",],
  vocab: ["Memorizing", "Word usage and context", "Build up vocabulary base",],
  grammar: ["Grammatical rules and structures", "Verb conjugations and particles", "Formation and syntax",],
  culture: ["Cultural norms", "Cultural references", "Socio-cultural contexts",],
}

const LanguageSkills: FC<LanguageSkillsProps> = ({ onSelectLanguageSkills }) => {
  const { t } = useTranslation()
  const [selectedSkills, setSelectedSkills] = useState([])
  const [targetLanguage] = useAuthStore((state) => [state.targetLanguage])
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    setTimeout(() => {
      setIsTyping(false)
      setStep(1)
    }, 2000)

    setTimeout(() => {
      setStep(2)
    }, 3000)
  }, [])

  const onClickSkills = (interest: string) => {
    const isSelected = selectedSkills.includes(interest);

    if (isSelected) {
      setSelectedSkills(selectedSkills.filter((i) => i !== interest));
    } else {
      setSelectedSkills([...selectedSkills, interest]);
    }
  }

  const submitInterests = () => {
    onSelectLanguageSkills(selectedSkills)
    setStep(4)
  }

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [step, isTyping])

  return (
    <>
      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <TransitionEffect duration={1} className="flex gap-3 items-start">
            <div className="w-[40px]">
              <BlueMila />
            </div>
            <div className="bot-message mt-4">
              <div className="absolute -left-1 top-0">
                <SpeechBubbleLeft />
              </div>
              {/* TO DO: Update translation */}
              {greeting[targetLanguage]} {"Are there any specific things you're trying to improve with these goals?"}
            </div>
          </TransitionEffect>

          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={1}>
              <div className="bot-message ml-[50px]">
                {/* TO DO: Update translation */}
                {"You must select at least one and up to as many as you like"}
              </div>
            </TransitionEffect>
          )}
        </div>
      </div>

      {step === 2 && (
        <div className="flex flex-col gap-1.5 items-end mt-2">
          <TransitionEffect className="flex flex-col gap-1.5 items-end relative" duration={2}>
            <div className="absolute -right-1 top-0 text-indigo-50">
              <SpeechBubbleRight />
            </div>

            <div className="user-message">{"Select your areas of improvement"}</div>
            <div className="user-message">
              <p className="py-2 text-gray-800">{skillTopics[0]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {skills.listening.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`text-left rounded-2xl py-1 px-2 ${selectedSkills.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickSkills(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{skillTopics[1]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {skills.speaking.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`text-left rounded-2xl py-1 px-2 ${selectedSkills.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickSkills(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{skillTopics[2]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {skills.reading.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`text-left rounded-2xl py-1 px-2 ${selectedSkills.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickSkills(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{skillTopics[3]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {skills.writing.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`text-left rounded-2xl py-1 px-2 ${selectedSkills.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickSkills(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{skillTopics[4]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {skills.vocab.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`text-left rounded-2xl py-1 px-2 ${selectedSkills.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickSkills(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{skillTopics[5]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {skills.grammar.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`text-left rounded-2xl py-1 px-2 ${selectedSkills.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickSkills(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{skillTopics[6]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {skills.culture.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`text-left rounded-2xl py-1 px-2 ${selectedSkills.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickSkills(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              disabled={selectedSkills.length === 0}
              className="rounded-full px-3 py-2 mt-2 font-semibold text-sm bg-indigo-200 text-indigo-800 disabled:bg-indigo-100 disabled:text-indigo-300"
              onClick={submitInterests}
            >
              Submit
            </button>
          </TransitionEffect>
        </div>
      )}
      {step === 4 && (
        <TransitionEffect className="flex flex-col items-end mt-3 relative" duration={2}>
          <div className="absolute -right-1 top-0 text-indigo-500">
            <SpeechBubbleRight />
          </div>
          {selectedSkills.map((interest, index) =>
            <div key={index} className="mb-1 user-selected">
              <p>{interest}</p>
            </div>
          )}
        </TransitionEffect>
      )}
    </>
  )
}

export default LanguageSkills
