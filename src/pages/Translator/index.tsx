import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Translator from '../../components/Translator'
import { TranslatorHeader } from '../../components/Icons'

const TranslatorPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="px-4 md:py-14 flex justify-center items-center max-md:pt-4 max-md:pb-20 h-full">
      <div className="bg-white dark:bg-mila-gray-25 rounded-xl p-2 w-[800px] max-sm:w-full">
        <div className="p-2 bg-white dark:bg-mila-gray-25 rounded-lg flex justify-between max-sm:flex-col">
          <div className="flex gap-4">
            <TranslatorHeader />
            <div className="flex flex-col">
              <h3 className="text-purple-900 dark:text-white font-semibold text-2xl">
                {t('translator.title')}
              </h3>
              <h3 className="text-purple-800 dark:text-white">{t('translator.description')}</h3>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <Translator />
        </div>
      </div>
    </div>
  )
}

export default TranslatorPage
