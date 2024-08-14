import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../../services/restApi'
import { ChineseNotation, JapaneseNotation, LanguageEnum } from '../../services/interface'
import { useAuthStore } from '../../state'
import Button from '../../components/Button'
import { useSettingStore } from '../../state/settingStore'
import { Gear, Tick } from '../../components/Icons'
import { classNames } from '../../utils'
import Select, { IOption } from '../../elements/Select'
import Range from '../../elements/Range'
import Toggle from '../../elements/Toggle'
import { avatarBackgroundColors, avatarImages } from '../../constants/avatar'
import { useMsal } from '@azure/msal-react'
import {
  dailyCommitOptions,
  i18nCode,
  nativeLanguageOptions,
  proficiencyOptions,
  targetLanguages,
  themeColors
} from '../../constants'
import { ITargetLanguageOption } from '../../interfaces'
import { MESSAGES } from '../../constants/messages'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { appLinks } from '../../utils/constant'

const PersonalInfo: FC = () => {
  const [user, setUser, setAADAuthenticated, setUserRegistered] = useAuthStore((state) => [
    state.user,
    state.setUser,
    state.setAADAuthenticated,
    state.setUserRegistered
  ])
  const [
    themeColor,
    setThemeColor,
    showRomaji,
    setRomajiShown,
    japaneseNotation,
    setJapaneseNotation,
    chineseNotation,
    setChineseNotation,
    autoSubmitThreadhold,
    setAutoSubmitThreadhold,
    autoRecord,
    setAutoRecord,
    audioOnly,
    setAudioOnly,
    colorMode,
    setColorMode
  ] = useSettingStore((state) => [
    state.themeColor,
    state.setThemeColor,

    state.showRomaji,
    state.setRomajiShown,

    state.japaneseNotation,
    state.setJapaneseNotation,

    state.chineseNotation,
    state.setChineseNotation,

    state.autoSubmitThreadhold,
    state.setAutoSubmitThreadhold,
    state.autoRecord,
    state.setAutoRecord,
    state.audioOnly,
    state.setAudioOnly,

    state.colorMode,
    state.setColorMode
  ])
  const [isRomajiShown, setIsRomajiShown] = useState(showRomaji)
  const [dailyCommit, setDailyCommit] = useState<IOption>(
    dailyCommitOptions.find((o) => o.value === user.daily_commitment) || dailyCommitOptions[0]
  )
  const [proficiencyOption, setProficiencyOption] = useState<IOption>(
    proficiencyOptions.find((o) => o.value === user.proficiency) || proficiencyOptions[0]
  )
  const { instance } = useMsal()
  const navigate = useNavigate()

  const [nativeLanguage, setNativeLanguage] = useState<IOption>(
    nativeLanguageOptions.find((l) => l.value === user.native_language) || nativeLanguageOptions[0]
  )
  const [targetLanguage, setTargetLanguage] = useState<ITargetLanguageOption>(
    targetLanguages.find((l) => l.value === user.target_language) || targetLanguages[0]
  )
  const [fullName, setFullName] = useState(user.full_name)
  const [isSaving, setIsSaving] = useState(false)
  const [avatarIndex, setAvatarIndex] = useState(user.icon_id || 0)
  const [avatarBgIndex, setAvatarBgIndex] = useState(user.background_id || 0)
  const [jpNotation, setJpNotation] = useState<JapaneseNotation>(japaneseNotation)
  const [cnNotation, setCnNotation] = useState<ChineseNotation>(chineseNotation)
  const [threadhold, setThreadhold] = useState(autoSubmitThreadhold)
  const [autoRecordEnabled, setAutoRecordEnabled] = useState(autoRecord)
  const [isAudioOnly, setIsAudioOnly] = useState(audioOnly)
  const { t, i18n } = useTranslation()

  const onSave = () => {
    setIsSaving(true)
    setRomajiShown(isRomajiShown)
    setJapaneseNotation(jpNotation)
    setAutoSubmitThreadhold(threadhold)
    setAutoRecord(autoRecordEnabled)
    setAudioOnly(isAudioOnly)
    setChineseNotation(cnNotation)
    i18n.changeLanguage(i18nCode[nativeLanguage.value])

    api.users
      .update({
        full_name: fullName,
        native_language: nativeLanguage.value.toString(),
        target_language: targetLanguage.value.toString(),
        daily_commitment: ~~dailyCommit.value,
        background_id: avatarBgIndex,
        icon_id: avatarIndex,
        proficiency: proficiencyOption.value.toString()
      })
      .then((resp) => {
        setIsSaving(false)

        toast.success(MESSAGES.USER_UPDATE_SUCCESS, {
          position: 'top-center',
          duration: 2000
        })

        setUser({
          ...user,
          full_name: fullName,
          native_language: nativeLanguage.value.toString(),
          target_language: targetLanguage.value.toString(),
          daily_commitment: ~~dailyCommit.value,
          background_id: avatarBgIndex,
          icon_id: avatarIndex,
          experience: resp.user_metrics.experience,
          proficiency: resp.user_metrics.proficiency,
          next_level_exp_req: resp.user_metrics.next_level_exp_req,
          level_name: resp.user_metrics.level_name,
          level: resp.user_metrics.level
        })
      })
      .catch(() => {
        setIsSaving(false)
      })
  }

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">
            {t('settings.personal-info.title')}
          </h3>
          <h3 className="text-sm text-[#475569] dark:text-slate-300">
            {t('settings.personal-info.description')}
          </h3>
        </div>

        <Button
          text={t('save')}
          color={themeColor}
          size="lg"
          onClick={onSave}
          isLoading={isSaving}
          disabled={isSaving}
        />
      </div>

      <div className="mt-5 mb-6 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />

      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
        <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
          {t('settings.personal-info.name')}
        </h3>
        <input
          value={fullName}
          className="outline-none border border-[#CBD5E1] rounded-lg px-3 py-2 focus:border-gray-300 w-[400px] text-sm max-sm:w-full  dark:bg-transparent dark:border-slate-300 dark:text-white"
          onChange={(e) => {
            setFullName(e.currentTarget.value)
          }}
          disabled={isSaving}
        />
      </div>
      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
        <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
          {t('settings.personal-info.email')}
        </h3>
        <input
          value={user.email}
          className="outline-none border border-[#CBD5E1] rounded-lg px-3 py-2 focus:border-gray-300 w-[400px] text-sm max-sm:w-full disabled:bg-slate-200  dark:bg-transparent dark:border-slate-300 dark:text-white"
          readOnly
          disabled
        />
      </div>
      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />

      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
        <div className="w-[280px]">
          <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300">
            {t('settings.personal-info.profile-picture')}
          </h3>
          <h3 className="text-sm text-[#475569] dark:text-slate-300 w-[280px]">
            {t('settings.personal-info.profile-picture.description')}
          </h3>
          <div className="w-full flex justify-center max-sm:justify-start">
            <div
              className={classNames(
                'mt-6 w-[50px] h-[50px] rounded-full',
                avatarBackgroundColors[avatarBgIndex].bgColor
              )}>
              <img src={avatarImages[avatarIndex]} className="mt-1" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 w-0 max-sm:w-full">
          <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300">
            {t('settings.choose-avatar')}
          </h3>
          <div className="flex gap-4 overflow-x-auto slim-scrollbar">
            {avatarImages.map((avatar, index) => (
              <div
                className="cursor-pointer w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                key={index}
                onClick={() => {
                  setAvatarIndex(index)
                }}>
                <img
                  src={avatar}
                  key={index}
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
                />
              </div>
            ))}
          </div>
          <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300">
            {t('settings.choose-background-color')}
          </h3>
          <div className="flex gap-5 overflow-x-auto slim-scrollbar">
            {avatarBackgroundColors.map((c, index) => (
              <div
                className={classNames(
                  c.bgColor,
                  'w-[50px] h-[50px] rounded-full cursor-pointer min-w-[50px]'
                )}
                key={`bg-${index}`}
                onClick={() => {
                  setAvatarBgIndex(index)
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5 mt-6">
        <div className="w-[280px]">
          <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300">Dark Mode</h3>
        </div>
        <div className="w-[400px]">
          <Toggle
            checked={colorMode === 'dark'}
            color="blue"
            onChange={(enabled) => {
              setColorMode(enabled ? 'dark' : 'light')
            }}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold dark:text-white">{t('settings.language')}</h3>
        <h3 className="text-sm text-[#475569] dark:text-slate-300">
          {t('settings.language.description')}
        </h3>
      </div>
      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />

      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5 mt-6">
        <div className="w-[280px]">
          <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300">
            {t('settings.auto-submit')}
          </h3>
        </div>
        <div className="w-[400px] max-sm:w-full">
          <Range
            min={1}
            max={10}
            value={threadhold}
            onChange={(t) => {
              setThreadhold(t)
            }}
            step={1}
            tooltip={(value) => `${value} sec`}
            color={themeColor}
          />
        </div>
      </div>
      <div className="text-sm text-[#475569] dark:text-slate-300 mt-6">
        {t('settings.auto-submit.description', { seconds: threadhold })}
      </div>

      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5 mt-6">
        <div className="w-[280px]">
          <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300">
            {t('settings.auto-record')}
          </h3>
        </div>
        <div className="w-[400px]">
          <Toggle
            checked={autoRecordEnabled}
            color="blue"
            onChange={(enabled) => {
              setAutoRecordEnabled(enabled)
            }}
          />
        </div>
      </div>
      <h3 className="text-sm text-[#475569] dark:text-slate-300 mt-2">
        {t('settings.auto-record.description')}
      </h3>

      {(targetLanguage.value === LanguageEnum.Japanese ||
        targetLanguage.value === LanguageEnum.Chinese) && (
          <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
        )}
      {(targetLanguage.value === LanguageEnum.Japanese ||
        targetLanguage.value === LanguageEnum.Chinese) && (
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => {
              setIsRomajiShown(!isRomajiShown)
            }}>
            <input
              type="checkbox"
              className={classNames(
                'text-white w-4 h-4',
                themeColor === 'orange' ? 'accent-orange-600' : '',
                themeColor === 'blue' ? 'accent-blue-600' : '',
                themeColor === 'pink' ? 'accent-pink-600' : ''
              )}
              checked={isRomajiShown}
            />
            <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
              {t('settings.showPR')}
            </h3>
          </div>
        )}

      {isRomajiShown && targetLanguage.value === LanguageEnum.Japanese && (
        <>
          <h3 className="mt-4 text-[#475569] dark:text-slate-300 text-sm">
            {t('settings.showPR.description')}
          </h3>
          <div className="flex gap-2 mt-5">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                setJpNotation('Furigana')
              }}>
              <input
                type="checkbox"
                className={classNames(
                  'text-white w-4 h-4',
                  themeColor === 'orange' ? 'accent-orange-600' : '',
                  themeColor === 'blue' ? 'accent-blue-600' : '',
                  themeColor === 'pink' ? 'accent-pink-600' : ''
                )}
                checked={jpNotation === 'Furigana'}
              />
              <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[100px]">
                {t('settings.furigana')}
              </h3>
            </div>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                setJpNotation('Romaji')
              }}>
              <input
                type="checkbox"
                className={classNames(
                  'text-white w-4 h-4',
                  themeColor === 'orange' ? 'accent-orange-600' : '',
                  themeColor === 'blue' ? 'accent-blue-600' : '',
                  themeColor === 'pink' ? 'accent-pink-600' : ''
                )}
                checked={jpNotation === 'Romaji'}
              />
              <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[100px]">
                {t('settings.romaji')}
              </h3>
            </div>
          </div>

          <h3 className="mt-4 text-[#475569] dark:text-slate-300 text-sm">
            {t('settings.FR.description')}
          </h3>
        </>
      )}

      {isRomajiShown && targetLanguage.value === LanguageEnum.Chinese && (
        <>
          <h3 className="mt-4 text-[#475569] dark:text-slate-300 text-sm">
            {t('settings.showPR.description')}
          </h3>
          <div className="flex gap-2 mt-5">
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                setCnNotation('Romaji')
              }}>
              <input
                type="checkbox"
                className={classNames(
                  'text-white w-4 h-4',
                  themeColor === 'orange' ? 'accent-orange-600' : '',
                  themeColor === 'blue' ? 'accent-blue-600' : '',
                  themeColor === 'pink' ? 'accent-pink-600' : ''
                )}
                checked={cnNotation === 'Romaji'}
              />
              <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[100px]">
                Romaji
              </h3>
            </div>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => {
                setCnNotation('Zhuyin')
              }}>
              <input
                type="checkbox"
                className={classNames(
                  'text-white w-4 h-4',
                  themeColor === 'orange' ? 'accent-orange-600' : '',
                  themeColor === 'blue' ? 'accent-blue-600' : '',
                  themeColor === 'pink' ? 'accent-pink-600' : ''
                )}
                checked={cnNotation === 'Zhuyin'}
              />
              <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[100px]">
                Zhuyin
              </h3>
            </div>
          </div>

          <h3 className="mt-4 text-[#475569] dark:text-slate-300 text-sm">
            {t('settings.FR.description')}
          </h3>
        </>
      )}

      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
        <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
          {t('settings.proficiencylevel')}
        </h3>
        <div className="w-[400px] max-sm:w-full">
          <Select
            options={proficiencyOptions}
            value={proficiencyOption}
            onChange={(val) => {
              setProficiencyOption(val)
            }}
            className="flex-1"
            disabled={isSaving}
          />
        </div>
      </div>

      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
      <div className="flex gap-8 max-sm:flex-col max-sm:gap-1.5">
        <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
          {t('settings.daily-commit')}
        </h3>
        <div className="w-[400px] max-sm:w-full">
          <Select
            options={dailyCommitOptions}
            value={dailyCommit}
            onChange={(val) => {
              setDailyCommit(val)
            }}
            className="flex-1"
            disabled={isSaving}
          />
          <h3 className="mt-2 text-[#475569] dark:text-slate-300 text-sm pl-1">
            {t('settings.daily-commit.description')}
          </h3>
        </div>
      </div>

      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
      <div className="flex gap-8 max-sm:flex-col max-sm:gap-5">
        <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px] max-w-[280px]">
          {t('settings.native-language')}
        </h3>
        <div className="w-[400px] max-sm:w-full">
          <Select
            options={nativeLanguageOptions}
            value={nativeLanguage}
            onChange={(val) => {
              setNativeLanguage(val)
            }}
            className="flex-1"
            disabled={isSaving}
          />
          <h3 className="mt-2 text-[#475569] dark:text-slate-300 text-sm pl-1">
            {t('settings.native-language.description')}
          </h3>
        </div>
      </div>

      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
      <div className="flex gap-8 max-sm:flex-col max-sm:gap-5">
        <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px] max-w-[280px]">
          {t('settings.target-language')}
        </h3>
        <div className="flex-1 flex gap-2 overflow-x-auto slim-scrollbar">
          {targetLanguages.map((option, index) => (
            <div
              className={classNames(
                'w-[90px] p-2 flex justify-center border',
                targetLanguage.value === option.value
                  ? 'border-blue-400 rounded-lg'
                  : 'border-transparent'
              )}
              key={index}>
              <button
                key={index}
                className="flex flex-col items-center"
                onClick={() => {
                  setTargetLanguage(option)
                }}>
                {option.flag}
                <div className="text-sm font-semibold text-[#334155] text-center mt-2">
                  {option.label}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="my-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />
      <div className="flex gap-8 max-sm:gap-5 max-sm:flex-col">
        <h3 className="text-sm font-semibold text-[#334155] dark:text-slate-300 w-[280px]">
          {t('settings.theme')}
        </h3>
        <div className="flex gap-2">
          {themeColors.map((color, index) => (
            <div
              className={classNames(
                color.bgColor,
                'w-[50px] h-[50px] rounded-lg cursor-pointer flex justify-center items-center'
              )}
              key={index}
              onClick={() => {
                setThemeColor(color.color)
              }}>
              {themeColor === color.color && <Tick />}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 border-t w-full h-0 border-[#E2E8F0] dark:border-mila-gray-25" />

      <div className="mt-5 flex justify-between px-2">
        <Button
          text="Log out"
          color="pink"
          size="lg"
          onClick={() => {
            setUser(null)
            setUserRegistered(false)
            setAADAuthenticated(false)
            instance.logout()
          }}
        />
        <Button
          text={t('save')}
          color={themeColor}
          size="lg"
          onClick={onSave}
          isLoading={isSaving}
          disabled={isSaving}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 text-sm pl-2">
        <div className="flex flex-col text-[#475467] dark:text-slate-300 text-left gap-4">
          <div className="flex max-md:flex-col">
            We care about your data in our
            <button
              className="cursor-pointer underline underline-offset-4 max-md:text-left"
              onClick={() => navigate(appLinks.privacyPolicy)}>
              &nbsp;privacy policy.
            </button>
          </div>
          <button
            className="cursor-pointer underline underline-offset-4 text-[#475467] dark:text-slate-300 w-fit"
            onClick={() => navigate(appLinks.termsConditions)}>
            Terms and Conditions
          </button>
        </div>
      </div>
    </>
  )
}

export default PersonalInfo
