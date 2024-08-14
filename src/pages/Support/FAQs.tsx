import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FAQ, MinusCircle, PlusCircle } from '../../components/Icons'
import { classNames } from '../../utils'

interface FAQItemProps {
  title: string
  content: string
}

const FAQItem: FC<FAQItemProps> = ({ title, content }) => {
  const [opened, setOpened] = useState(false)

  return (
    <div className="px-4 pt-2">
      <button
        className="flex gap-6 items-center cursor-pointer w-full"
        onClick={() => setOpened(!opened)}
      >
        {opened ? <MinusCircle /> : <PlusCircle />}
        <h3 className="text-lg text-[#0F172A] dark:text-slate-300 font-medium text-left flex-1">
          {title}
        </h3>
      </button>
      <div
        className={classNames(
          'mt-2 pl-12 text-[#475569] overflow-hidden dark:text-slate-300 transition-all duration-300 mb-2',
          opened ? 'h-fit' : 'h-0'
        )}
      >
        {content}
      </div>
    </div>
  )
}

const FAQs: FC = () => {
  const { t } = useTranslation()

  const items = Array(9)
    .fill(0)
    .map((_, index) => ({
      title: t(`faqs.${index}.title`),
      content: t(`faqs.${index}.content`)
    }))

  return (
    <div className="mt-6">
      <div className="p-2 bg-white dark:bg-mila-gray-50 rounded-lg flex justify-between max-sm:flex-col">
        <div className="flex gap-4">
          <div className="min-w-[52px]">
            <FAQ />
          </div>
          <div className="flex flex-col">
            <h3 className="text-yellow-900 dark:text-white font-semibold text-2xl">
              {t('faq.title')}
            </h3>
            <h3 className="text-yellow-800 dark:text-white">{t('faq.description')}</h3>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-mila-gray-50 mt-4 shadow-sm divide-y p-2 dark:divide-mila-gray-25">
        {items.map((item, index) => (
          <FAQItem {...item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default FAQs
