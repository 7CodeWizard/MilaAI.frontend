import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { GetSupport } from '../../components/Icons'
import Input from '../../elements/Input'
import Textarea from '../../elements/Textarea'
import FAQs from './FAQs'
import Button from '../../components/Button'
import api from '../../services/restApi'
import { MESSAGES } from '../../constants/messages'

type SupportForm = {
  subject: string
  message: string
}

const schema = yup.object().shape({
  subject: yup.string().required('Please type subject.'),
  message: yup.string().required('Please type message.')
})

const Support: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  })
  const [isSending, setSending] = useState(false)
  const { t } = useTranslation()

  const onSubmit = (form: SupportForm) => {
    setSending(true)

    api.support
      .sendFeedback(form.subject, form.message)
      .then(() => {
        setSending(false)

        setValue('subject', '')
        setValue('message', '')

        toast.success(MESSAGES.SUPPORT_SUCCESS, {
          position: 'top-center',
          duration: 2000
        })
      })
      .catch(() => {
        toast.error(MESSAGES.SUPPORT_ERROR, {
          position: 'top-center',
          duration: 2000
        })
      })
  }

  return (
    <div className="px-4 lg:py-14 flex justify-center max-lg:pt-4 max-lg:pb-20 max-lg:px-2">
      <div className="bg-white dark:bg-mila-gray-25 rounded-xl p-2 w-full max-md:w-full md:lg:w-[400px] lg:xl:w-[600px] xl:w-[700px]">
        <div className="p-2 bg-white dark:bg-mila-gray-50 rounded-lg flex justify-between max-sm:flex-col">
          <div className="flex gap-4">
            <div className="min-w-[52px]">
              <GetSupport />
            </div>
            <div className="flex flex-col">
              <h3 className="text-yellow-900 dark:text-white font-semibold text-2xl">
                {t('support.title')}
              </h3>
              <h3 className="text-yellow-800 dark:text-white">{t('support.description')}</h3>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-white dark:bg-mila-gray-50 shadow-sm rounded-3xl p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <Input
                label={t('support.subject')}
                placeholder={t('support.subject.placeholder')}
                className="text-sm"
                errorMessage={errors.subject?.message}
                {...register('subject')}
              />
              <Textarea
                label={t('support.message')}
                placeholder={t('support.message.placeholder')}
                className="text-sm"
                rows={5}
                errorMessage={errors.message?.message}
                {...register('message')}
              />
            </div>
            <div className="py-2 flex gap-3">
              <Button
                text={t('send')}
                color="blue"
                width="fit-parent"
                size="lg"
                type="submit"
                isLoading={isSending}
                disabled={isSending}
              />
            </div>
          </form>
        </div>

        <FAQs />
      </div>
    </div>
  )
}

export default Support
