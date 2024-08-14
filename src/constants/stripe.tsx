import { Layer1, Layer2, Layer3 } from '../components/Icons'

export const PLANS = [
  {
    id: import.meta.env.VITE_PRICE_ID_YEARLY,
    icon: <Layer3 />,
    title: 'Mila Premium 12 Months',
    priceValue: 10,
    duration: 12,
    price: '£10/mo',
    priceDescription: 'Billed Annually. That’s £120 a year.',
    paymentLink: 'https://buy.stripe.com/test_4gwbIPcwt2qwaqY146',
    bestDeal: true
  },
  {
    id: import.meta.env.VITE_PRICE_ID_BIYEARLY,
    icon: <Layer2 />,
    title: 'Mila Premium 6 Months',
    priceValue: 12.5,
    duration: 6,
    price: '£12.5/mo',
    priceDescription: "Billed every 6 months. That's £75 every 6 months.",
    paymentLink: 'https://buy.stripe.com/test_4gw28ffIFe9e42A4gh',
    bestDeal: false
  },
  {
    id: import.meta.env.VITE_PRICE_ID_MONTHLY,
    icon: <Layer1 />,
    title: 'Mila Premium 1 Month',
    priceValue: 15,
    duration: 1,
    price: '£15/mo',
    priceDescription: "Billed every month. That's £15 a month.",
    paymentLink: 'https://buy.stripe.com/test_14k28fgMJ3uA9mU6oo',
    bestDeal: false
  }
]
