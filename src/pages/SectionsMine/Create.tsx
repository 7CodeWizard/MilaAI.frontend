import { FC, useMemo, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { CreateConversation, Randomize } from '../../components/Icons'
import { Modal, ModalProps } from '../../components/Modal'
import Input from '../../elements/Input'
import Button from '../../components/Button'
import { IVoiceOption } from '../../elements/Select/VoiceSelect'
import api from '../../services/restApi'
import { useNavigate } from 'react-router'
import { appLinks } from '../../utils/constant'
import { useAuthStore, useChatStore, useSectionsStore } from '../../state'
import { VOICES } from '../../constants'

type CreateConversationForm = {
  topic: string
  goalUser: string
  characterRoleAI: string
  characterRoleUser: string
}

const schema = yup.object().shape({
  goalUser: yup.string().required('Please input user goal.'),
  characterRoleAI: yup.string().required('Please input Mila’s role.'),
  characterRoleUser: yup.string().required('Please input your role.'),
})

const CreateMyConversation: FC<ModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [user] = useAuthStore((state) => [state.user])
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch
  } = useForm({
    resolver: yupResolver(schema)
  })

  const voiceOptions: IVoiceOption[] = useMemo(() => {
    const options: IVoiceOption[] = []

    const VOICE = VOICES[user.target_language]
    let index = 0
    for (let persona in VOICE) {
      options.push({
        label: persona,
        url: VOICE[persona],
        value: index++
      })
    }

    return options
  }, [])

  const [voiceOption, setVoiceOption] = useState(voiceOptions[0])

  const [setCurrentSection] = useSectionsStore((state) => [state.setCurrentSection])
  const [isCreating, setCreating] = useState(false)
  const [setStudyMode] = useChatStore((state) => [state.setStudyMode])

  const onCreate = (form: CreateConversationForm) => {
    setCreating(true)
    api.chat
      .createCustomConversation({
        ai_role: form.characterRoleAI,
        user_role: form.characterRoleUser,
        context: form.goalUser,
      })
      .then((response) => {
        setCurrentSection({
          ...response,
          source: 'mine',
          goal_user: form.goalUser,
          language_details: {
            [user.target_language]: {
              ai_role: form.characterRoleAI,
              user_role: form.characterRoleUser,
              context: form.goalUser,
            }
          },
          background_id: 0,
          icon_id: 0
        })

        setStudyMode(1)
        navigate(`${appLinks.section}/${response.id}`)
        setCreating(false)
        onClose()
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="w-[530px]">
      <form onSubmit={handleSubmit(onCreate)}>
        <div className="bg-white dark:bg-mila-gray-25 rounded-xl w-full px-4 py-10">
          <div className="px-2 bg-white dark:bg-mila-gray-50 rounded-lg flex justify-between">
            <div className="flex flex-row items-start gap-4">
              <CreateConversation />
              <div className="flex flex-col">
                <h3 className="text-fuchsia-500 dark:text-white font-semibold text-xl md:text-2xl">
                  {t('chats.mine.create.title')}
                </h3>
                <p className="text-fuchsia-500 text-sm md:text-base dark:text-white">
                  {t('chats.mine.create.description')}
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 pt-8 bg-white dark:bg-mila-gray-50 rounded-lg flex flex-col justify-between gap-4">
            <Input
              label={`${t('chats.mine.create.goal.description')}`}
              placeholder={t('chats.mine.create.goal.label')}
              helperText={t('chats.mine.create.goal.placeholder')}
              errorMessage={errors.goalUser?.message}
              {...register('goalUser')}
            />
            <Input
              label={"Mila's character"}
              placeholder={"Mila's character"}
              helperText={"Example - a friendly local Chinese waitor"}
              errorMessage={""}
              {...register('characterRoleAI')}
            />
            <Input
              label={"My character"}
              placeholder={"My character"}
              helperText={"Example - a customer"}
              errorMessage={""}
              {...register('characterRoleUser')}
            />
          </div>
          <div className="pt-8 flex flex-col gap-2 items-center">
            <Button
              text={t('create-scenario')}
              width="fit-parent"
              color="pink"
              type="submit"
              isLoading={isCreating}
              disabled={isCreating}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default CreateMyConversation
