import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { FeedbackLeave } from '../Icons'
import Textarea from '../../elements/Textarea'
import Rating from '../../elements/Rating'
import Button from '../Button'
import api from '../../services/restApi'
import { useParams } from 'react-router'
import { useChatStore } from '../../state'
import { MESSAGES } from '../../constants/messages'

const Feedback: FC = () => {
  const { id } = useParams()
  const [difficulty] = useChatStore((state) => [state.studyMode])
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')

  const onFeedback = () => {
    setLoading(true)
    api.chat
      .sendFeedback({
        id,
        difficulty_level: difficulty,
        feedback,
        rating
      })
      .then(() => {
        setLoading(false)

        toast.success(MESSAGES.FEEDBACK_SUCCESS, {
          position: 'top-center',
          duration: 2000
        })
      })
  }

  return (
    <div className="px-2 py-6">
      <div className="flex flex-col items-center">
        <FeedbackLeave />
        <h3 className="mt-4 text-blue-900 text-lg font-medium text-center dark:text-white">
          Give Us Feedback!
          <br />
          (Optional)
        </h3>
        <h3 className="mt-2 text-blue-900 text-sm font-medium dark:text-white">
          Your feedback is invaluable to making Mila and your language learning experience better.
        </h3>
      </div>
      <div className="flex flex-col items-center mt-3">
        <div className="text-center text-[#344054] dark:text-white">
          <h3 className="font-semibold">Rate Your Experience</h3>
          <h3>(Tap the stars)</h3>
        </div>
        <div className="mt-3">
          <Rating
            value={rating}
            onChange={(v) => {
              setRating(v)
            }}
          />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xs font-medium text-[#344054]">Type your feedback here.</h3>
        <Textarea
          className="mt-2"
          rows={4}
          value={feedback}
          onChange={(e) => {
            setFeedback(e.currentTarget.value)
          }}
        />
        <Button
          text="Send feedback"
          width="fit-parent"
          color="blue"
          size="md"
          onClick={onFeedback}
          isLoading={loading}
          disabled={loading}
        />
      </div>
    </div>
  )
}

export default Feedback
