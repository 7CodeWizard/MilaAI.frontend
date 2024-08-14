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
  [LanguageEnum.Chinese]: '太好了! (tài hǎo le!)',
  [LanguageEnum.Japanese]: 'すごい! (Sugoi!)',
  [LanguageEnum.British]: 'Magnificent!',
  [LanguageEnum.American]: 'Magnificent!',
  [LanguageEnum.German]: 'Herrlich!',
  [LanguageEnum.French]: 'Magnifique !',
  [LanguageEnum.Spanish]: '¡Magnífico!'
}

interface InterestsProps {
  onSelectInterests: (value: Array<string>) => void
}

const interestTopic = ["Arts & Culture", "Science & Knowledge", "Lifestyle & Personal Development", "Social & Economics", "Fantasy & Imagination", "Spiritual Exploration",]

const interests = {
  arts: ["#arts & culture", "#literature & books", "#movies & tv", "#music & dance", "#fashion & design", "#anime & manga", "#comedy & humour"],
  science: ["#technology & innovation", "#education & learning", "#language & linguistics", "#history", "#psychology", "#science",],
  lifestyle: ["#food", "#cooking & baking", "#health & wellbeing", "#mental health", "#sports & fitness", "#travel & adventure", "#hobbies & leisure", "#diy & crafts", "#pets & animals", "#life skills & adulting",],
  social: ["#business & economics", "#politics & current affairs", "#social activism", "#shopping", "#real estate & housing", "#employment & careers", "#media & news", "#public health & welfare",],
  fantasy: ["#fantasy & sci-fi", "#gaming & esports", "#magic & surrealism", "#mythology & folklore", "#horror & supernatural", "#comic books & graphic novels", "#board games & rpgs", "#fairytales & enchantment",],
  spiritual: ["#world religions", "#spirituality", "#mindfulness", "#philosophy", "#ethics", "#mysticism", "#new age beliefs", "#indigenous & paganism", "#religious art & architecture", "#theology",],
}

const Interests: FC<InterestsProps> = ({ onSelectInterests }) => {
  const { t } = useTranslation()
  const [selectedInterests, setSelectedInterests] = useState([])
  const [targetLanguage] = useAuthStore((state) => [state.targetLanguage])
  const [isTyping, setIsTyping] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(false)
      setStep(1)
    }, 2000)

    setTimeout(() => {
      setIsTyping(false)
      setStep(2)
    }, 4000)

    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    setTimeout(() => {
      setIsTyping(true)
    }, 3000)

    setTimeout(() => {
      setStep(3)
    }, 5000)
  }, [])

  const onClickInterests = (interest: string) => {
    const isSelected = selectedInterests.includes(interest);

    if (isSelected) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  }

  const submitInterests = () => {
    onSelectInterests(selectedInterests)
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
              {greeting[targetLanguage]} {"Let's get to know you"}
            </div>
          </TransitionEffect>

          {step === 0 && isTyping && <IsTyping />}
          {step >= 1 && (
            <TransitionEffect duration={1}>
              <div className="bot-message ml-[50px]">
                {/* TO DO: Update translation */}
                {"So that I can suggest better conversations to you, what are some of your hobbies and interests?"}
              </div>
            </TransitionEffect>
          )}
          {step === 1 && isTyping && <IsTyping />}
          {step >= 2 && (
            <TransitionEffect duration={1}>
              {/* TO DO: Update translation */}
              <div className="bot-message ml-[50px]">{"Please select up to 5"}</div>
            </TransitionEffect>
          )}
        </div>
      </div>

      {step === 3 && (
        <div className="flex flex-col gap-1.5 items-end mt-2">
          <TransitionEffect className="flex flex-col gap-1.5 items-end relative" duration={2}>
            <div className="absolute -right-1 top-0 text-indigo-100">
              <SpeechBubbleRight />
            </div>
            {/* TO DO: Add translation */}
            <div className="user-message">{"Pick your interests"}</div>
            <div className="user-message">
              <p className="py-2 text-gray-800">{interestTopic[0]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {interests.arts.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      type="button"
                      className={`rounded-2xl py-1 px-2 ${selectedInterests.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickInterests(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{interestTopic[1]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {interests.science.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`rounded-2xl py-1 px-2 ${selectedInterests.includes(tag) ? "bg-pink-700 text-white" : "text-pink-600"}`}
                      onClick={() => {
                        onClickInterests(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{interestTopic[2]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {interests.lifestyle.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      type="button"
                      className={`rounded-2xl py-1 px-2 ${selectedInterests.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickInterests(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{interestTopic[3]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {interests.social.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`rounded-2xl py-1 px-2 ${selectedInterests.includes(tag) ? "bg-pink-700 text-white" : "text-pink-600"}`}
                      onClick={() => {
                        onClickInterests(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{interestTopic[4]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {interests.fantasy.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      type="button"
                      className={`rounded-2xl py-1 px-2 ${selectedInterests.includes(tag) ? "bg-indigo-700 text-white" : "text-indigo-700"}`}
                      onClick={() => {
                        onClickInterests(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
              <p className="py-2 text-gray-800">{interestTopic[5]}</p>
              <div className="max-w-md flex flex-col md:flex-row flex-wrap gap-2 items-start justify-start m-2">
                {interests.spiritual.map((tag, index) => (
                  <div key={index} className="w-fit rounded-2xl bg-indigo-100">
                    <button
                      className={`rounded-2xl py-1 px-2 ${selectedInterests.includes(tag) ? "bg-pink-700 text-white" : "text-pink-600"}`}
                      onClick={() => {
                        onClickInterests(tag)
                      }}>
                      {tag}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {selectedInterests.length > 5 && <p className="text-red-500">Select up to 5 only.</p>}
            <button
              disabled={selectedInterests.length === 0 || selectedInterests.length > 5}
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
          {selectedInterests.map((interest, index) =>
            <div key={index} className="mb-1 user-selected">
              <p>{interest}</p>
            </div>
          )}
        </TransitionEffect>
      )}
    </>
  )
}

export default Interests
