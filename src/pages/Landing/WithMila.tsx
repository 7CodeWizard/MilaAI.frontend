import Button from '../../components/Button'
import NewsLetter from './../../assets/images/landing/Newsletter.png'

const WithMila = () => (
  <div className="flex bg-slate-500 sm:max-lg:px-10 xl:px-32 lg:px-20 max-sm:flex-col-reverse gap-16">
    <div className="flex-1 sm:max-lg:pt-10 2xl:pt-40 xl:pt-20 lg:pt-20 pb-40 max-sm:pb-20 sm:max-lg:pb-20 max-sm:px-4">
      <h3 className="text-5xl font-bold text-orange-100 max-sm:text-3xl">
        With Mila, make it a reality.
      </h3>
      <p className="text-xl text-orange-100 mt-10 max-sm:mt-4">
        Imagine speaking Spanish confidently at a local café in Barcelona, or discussing a French
        film without needing subtitles. What language experience do you dream of?
      </p>

      <div className="mt-12">
        <Button text="Start Learning" color="blue" />
      </div>
    </div>
    <div className="flex-1 flex justify-end relative overflow-hidden">
      <img src={NewsLetter} className="absolute -top-[110px] max-sm:relative max-sm:-top-[50px]" />
    </div>
  </div>
)

export default WithMila
