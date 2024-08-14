import { FC } from 'react'
import { IconProps } from '../../interfaces'

export const FeedbackMessage: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.5 12H7.51M12 12H12.01M16.5 12H16.51M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.1971 3.23374 14.3397 3.65806 15.3845C3.73927 15.5845 3.77988 15.6845 3.798 15.7653C3.81572 15.8443 3.8222 15.9028 3.82221 15.9839C3.82222 16.0667 3.80718 16.1569 3.77711 16.3374L3.18413 19.8952C3.12203 20.2678 3.09098 20.4541 3.14876 20.5888C3.19933 20.7067 3.29328 20.8007 3.41118 20.8512C3.54589 20.909 3.73218 20.878 4.10476 20.8159L7.66265 20.2229C7.84309 20.1928 7.9333 20.1778 8.01613 20.1778C8.09715 20.1778 8.15566 20.1843 8.23472 20.202C8.31554 20.2201 8.41552 20.2607 8.61549 20.3419C9.6603 20.7663 10.8029 21 12 21ZM8 12C8 12.2761 7.77614 12.5 7.5 12.5C7.22386 12.5 7 12.2761 7 12C7 11.7239 7.22386 11.5 7.5 11.5C7.77614 11.5 8 11.7239 8 12ZM12.5 12C12.5 12.2761 12.2761 12.5 12 12.5C11.7239 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.7239 11.5 12 11.5C12.2761 11.5 12.5 11.7239 12.5 12ZM17 12C17 12.2761 16.7761 12.5 16.5 12.5C16.2239 12.5 16 12.2761 16 12C16 11.7239 16.2239 11.5 16.5 11.5C16.7761 11.5 17 11.7239 17 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Support: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.13626 9.13628L4.92893 4.92896M4.92893 19.0711L9.16797 14.8321M14.8611 14.8638L19.0684 19.0711M19.0684 4.92896L14.8287 9.16862M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
      stroke="#EA580C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Settings: FC<IconProps> = ({ width = '32', height = '32' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.0505 9H5.5C4.11929 9 3 7.88071 3 6.5C3 5.11929 4.11929 4 5.5 4H15.0505M8.94949 20H18.5C19.8807 20 21 18.8807 21 17.5C21 16.1193 19.8807 15 18.5 15H8.94949M3 17.5C3 19.433 4.567 21 6.5 21C8.433 21 10 19.433 10 17.5C10 15.567 8.433 14 6.5 14C4.567 14 3 15.567 3 17.5ZM21 6.5C21 8.433 19.433 10 17.5 10C15.567 10 14 8.433 14 6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Home: FC<IconProps> = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 11.2982C3 10.7239 3 10.4367 3.07403 10.1722C3.1396 9.93794 3.24737 9.7176 3.39203 9.52201C3.55534 9.30121 3.78202 9.1249 4.23539 8.77228L11.0177 3.49715C11.369 3.2239 11.5447 3.08727 11.7387 3.03476C11.9098 2.98841 12.0902 2.98841 12.2613 3.03476C12.4553 3.08727 12.631 3.2239 12.9823 3.49715L19.7646 8.77228C20.218 9.1249 20.4447 9.30121 20.608 9.52201C20.7526 9.7176 20.8604 9.93794 20.926 10.1722C21 10.4367 21 10.7239 21 11.2982V18.5331C21 19.6532 21 20.2133 20.782 20.6411C20.5903 21.0174 20.2843 21.3234 19.908 21.5152C19.4802 21.7331 18.9201 21.7331 17.8 21.7331H6.2C5.07989 21.7331 4.51984 21.7331 4.09202 21.5152C3.71569 21.3234 3.40973 21.0174 3.21799 20.6411C3 20.2133 3 19.6532 3 18.5331V11.2982Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Conversations: FC<IconProps> = ({ width = '32', height = '32' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.09436 11.2288C6.03221 10.8282 5.99996 10.4179 5.99996 10C5.99996 5.58172 9.60525 2 14.0526 2C18.4999 2 22.1052 5.58172 22.1052 10C22.1052 10.9981 21.9213 11.9535 21.5852 12.8345C21.5154 13.0175 21.4804 13.109 21.4646 13.1804C21.4489 13.2512 21.4428 13.301 21.4411 13.3735C21.4394 13.4466 21.4493 13.5272 21.4692 13.6883L21.8717 16.9585C21.9153 17.3125 21.9371 17.4895 21.8782 17.6182C21.8266 17.731 21.735 17.8205 21.6211 17.8695C21.4911 17.9254 21.3146 17.8995 20.9617 17.8478L17.7765 17.3809C17.6101 17.3565 17.527 17.3443 17.4512 17.3448C17.3763 17.3452 17.3245 17.3507 17.2511 17.3661C17.177 17.3817 17.0823 17.4172 16.893 17.4881C16.0097 17.819 15.0524 18 14.0526 18C13.6344 18 13.2237 17.9683 12.8227 17.9073M7.63158 22C10.5965 22 13 19.5376 13 16.5C13 13.4624 10.5965 11 7.63158 11C4.66668 11 2.26316 13.4624 2.26316 16.5C2.26316 17.1106 2.36028 17.6979 2.53955 18.2467C2.61533 18.4787 2.65322 18.5947 2.66566 18.6739C2.67864 18.7567 2.68091 18.8031 2.67608 18.8867C2.67145 18.9668 2.65141 19.0573 2.61134 19.2383L2 22L4.9948 21.591C5.15827 21.5687 5.24 21.5575 5.31137 21.558C5.38652 21.5585 5.42641 21.5626 5.50011 21.5773C5.5701 21.5912 5.67416 21.6279 5.88227 21.7014C6.43059 21.8949 7.01911 22 7.63158 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Lessons: FC<IconProps> = ({ width = '32', height = '32' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21L11.8999 20.8499C11.2053 19.808 10.858 19.287 10.3991 18.9098C9.99286 18.5759 9.52476 18.3254 9.02161 18.1726C8.45325 18 7.82711 18 6.57482 18H5.2C4.07989 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V6.2C2 5.07989 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H5.6C7.84021 3 8.96031 3 9.81596 3.43597C10.5686 3.81947 11.1805 4.43139 11.564 5.18404C12 6.03968 12 7.15979 12 9.4M12 21V9.4M12 21L12.1001 20.8499C12.7947 19.808 13.142 19.287 13.6009 18.9098C14.0071 18.5759 14.4752 18.3254 14.9784 18.1726C15.5467 18 16.1729 18 17.4252 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V6.2C22 5.07989 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H18.4C16.1598 3 15.0397 3 14.184 3.43597C13.4314 3.81947 12.8195 4.43139 12.436 5.18404C12 6.03968 12 7.15979 12 9.4"
      stroke="#7C2D12"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Chats: FC<IconProps> = ({ width = '32', height = '32' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 19V16H7C5.34315 16 4 17.3431 4 19M8.8 22H16.8C17.9201 22 18.4802 22 18.908 21.782C19.2843 21.5903 19.5903 21.2843 19.782 20.908C20 20.4802 20 19.9201 20 18.8V5.2C20 4.07989 20 3.51984 19.782 3.09202C19.5903 2.71569 19.2843 2.40973 18.908 2.21799C18.4802 2 17.9201 2 16.8 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22Z"
      stroke="#713F12"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Listening: FC<IconProps> = ({ width = '32', height = '32' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 17V13C22 7.47715 17.5228 3 12 3C6.47715 3 2 7.47715 2 13V17M7.5 21C6.11929 21 5 19.8807 5 18.5V15.5C5 14.1193 6.11929 13 7.5 13C8.88071 13 10 14.1193 10 15.5V18.5C10 19.8807 8.88071 21 7.5 21ZM16.5 21C15.1193 21 14 19.8807 14 18.5V15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V18.5C19 19.8807 17.8807 21 16.5 21Z"
      stroke="#064E3B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Culture: FC<IconProps> = ({ width = '32', height = '32' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.07598 7.48282L7.36402 10.5457C7.58715 10.705 7.69872 10.7847 7.81548 10.8031C7.91821 10.8192 8.02343 10.8029 8.11648 10.7565C8.22223 10.7037 8.30449 10.594 8.46901 10.3747L9.37511 9.16652C9.42164 9.10448 9.4449 9.07347 9.47224 9.04671C9.49652 9.02295 9.52315 9.00173 9.55173 8.98338C9.58392 8.9627 9.61935 8.94696 9.6902 8.91546L13.5588 7.19609C13.7192 7.12482 13.7993 7.08918 13.8598 7.03352C13.9133 6.9843 13.9554 6.924 13.9832 6.85684C14.0146 6.78091 14.0204 6.69336 14.0321 6.51826L14.3154 2.2694M13.5 13.5L16.116 14.6211C16.4195 14.7512 16.5713 14.8163 16.6517 14.9243C16.7222 15.0191 16.7569 15.1358 16.7496 15.2537C16.7413 15.3881 16.6497 15.5255 16.4665 15.8002L15.2375 17.6438C15.1507 17.774 15.1072 17.8391 15.0499 17.8863C14.9991 17.928 14.9406 17.9593 14.8777 17.9784C14.8067 18 14.7284 18 14.5719 18H12.5766C12.3693 18 12.2656 18 12.1774 17.9653C12.0995 17.9347 12.0305 17.885 11.9768 17.8208C11.916 17.7481 11.8832 17.6497 11.8177 17.453L11.1048 15.3144C11.0661 15.1983 11.0468 15.1403 11.0417 15.0814C11.0372 15.0291 11.0409 14.9764 11.0528 14.9253C11.0662 14.8677 11.0935 14.813 11.1482 14.7036L11.6897 13.6206C11.7997 13.4005 11.8547 13.2905 11.9395 13.2222C12.0141 13.162 12.1046 13.1246 12.1999 13.1143C12.3081 13.1027 12.4248 13.1416 12.6582 13.2194L13.5 13.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="#1E3A8A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const Ranking: FC = () => (
  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10.5" cy="11" r="9" fill="#FDF2F8" stroke="#F472B6" strokeWidth="3" />
    <path
      d="M16 11.5C16 12.5 15.5 13.5 14.5 14.5"
      stroke="#F9A8D4"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16.5" r="1" fill="#F9A8D4" />
  </svg>
)

export const WordBank: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 9.00002V17M9.5 9.00002V17M14.5 9.00002V17M19 9.00002V17M3 18.6L3 19.4C3 19.9601 3 20.2401 3.10899 20.454C3.20487 20.6422 3.35785 20.7952 3.54601 20.891C3.75992 21 4.03995 21 4.6 21H19.4C19.9601 21 20.2401 21 20.454 20.891C20.6422 20.7952 20.7951 20.6422 20.891 20.454C21 20.2401 21 19.9601 21 19.4V18.6C21 18.04 21 17.7599 20.891 17.546C20.7951 17.3579 20.6422 17.2049 20.454 17.109C20.2401 17 19.9601 17 19.4 17H4.6C4.03995 17 3.75992 17 3.54601 17.109C3.35785 17.2049 3.20487 17.3579 3.10899 17.546C3 17.7599 3 18.04 3 18.6ZM11.6529 3.07715L4.25291 4.7216C3.80585 4.82094 3.58232 4.87062 3.41546 4.99082C3.26829 5.09685 3.15273 5.24092 3.08115 5.40759C3 5.59654 3 5.82553 3 6.28349L3 7.40002C3 7.96007 3 8.2401 3.10899 8.45401C3.20487 8.64217 3.35785 8.79515 3.54601 8.89103C3.75992 9.00002 4.03995 9.00002 4.6 9.00002H19.4C19.9601 9.00002 20.2401 9.00002 20.454 8.89103C20.6422 8.79515 20.7951 8.64217 20.891 8.45401C21 8.2401 21 7.96007 21 7.40002V6.2835C21 5.82553 21 5.59655 20.9188 5.40759C20.8473 5.24092 20.7317 5.09685 20.5845 4.99082C20.4177 4.87062 20.1942 4.82094 19.7471 4.7216L12.3471 3.07715C12.2176 3.04837 12.1528 3.03398 12.0874 3.02824C12.0292 3.02314 11.9708 3.02314 11.9126 3.02824C11.8472 3.03398 11.7824 3.04837 11.6529 3.07715Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobilePractice: FC = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.33203 10.5L11.332 12.5L15.832 8M19.332 21V7.8C19.332 6.11984 19.332 5.27976 19.0051 4.63803C18.7174 4.07354 18.2585 3.6146 17.694 3.32698C17.0523 3 16.2122 3 14.532 3H10.132C8.45187 3 7.6118 3 6.97006 3.32698C6.40557 3.6146 5.94663 4.07354 5.65901 4.63803C5.33203 5.27976 5.33203 6.11984 5.33203 7.8V21L12.332 17L19.332 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileChats: FC = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.84436 11.2288C6.78221 10.8282 6.74996 10.4179 6.74996 10C6.74996 5.58172 10.3552 2 14.8026 2C19.2499 2 22.8552 5.58172 22.8552 10C22.8552 10.9981 22.6713 11.9535 22.3352 12.8345C22.2654 13.0175 22.2304 13.109 22.2146 13.1804C22.1989 13.2512 22.1928 13.301 22.1911 13.3735C22.1894 13.4466 22.1993 13.5272 22.2192 13.6883L22.6217 16.9585C22.6653 17.3125 22.6871 17.4895 22.6282 17.6182C22.5766 17.731 22.485 17.8205 22.3711 17.8695C22.2411 17.9254 22.0646 17.8995 21.7117 17.8478L18.5265 17.3809C18.3601 17.3565 18.277 17.3443 18.2012 17.3448C18.1263 17.3452 18.0745 17.3507 18.0011 17.3661C17.927 17.3817 17.8323 17.4172 17.643 17.4881C16.7597 17.819 15.8024 18 14.8026 18C14.3844 18 13.9737 17.9683 13.5727 17.9073M8.38158 22C11.3465 22 13.75 19.5376 13.75 16.5C13.75 13.4624 11.3465 11 8.38158 11C5.41668 11 3.01316 13.4624 3.01316 16.5C3.01316 17.1106 3.11028 17.6979 3.28955 18.2467C3.36533 18.4787 3.40322 18.5947 3.41566 18.6739C3.42864 18.7567 3.43091 18.8031 3.42608 18.8867C3.42145 18.9668 3.40141 19.0573 3.36134 19.2383L2.75 22L5.7448 21.591C5.90827 21.5687 5.99 21.5575 6.06137 21.558C6.13652 21.5585 6.17641 21.5626 6.25011 21.5773C6.3201 21.5912 6.42416 21.6279 6.63227 21.7014C7.18059 21.8949 7.76911 22 8.38158 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileHome: FC = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.5 11.2982C3.5 10.7239 3.5 10.4367 3.57403 10.1722C3.6396 9.93794 3.74737 9.7176 3.89203 9.52201C4.05534 9.30121 4.28202 9.1249 4.73539 8.77228L11.5177 3.49715C11.869 3.2239 12.0447 3.08727 12.2387 3.03476C12.4098 2.98841 12.5902 2.98841 12.7613 3.03476C12.9553 3.08727 13.131 3.2239 13.4823 3.49715L20.2646 8.77228C20.718 9.1249 20.9447 9.30121 21.108 9.52201C21.2526 9.7176 21.3604 9.93794 21.426 10.1722C21.5 10.4367 21.5 10.7239 21.5 11.2982V18.5331C21.5 19.6532 21.5 20.2133 21.282 20.6411C21.0903 21.0174 20.7843 21.3234 20.408 21.5152C19.9802 21.7331 19.4201 21.7331 18.3 21.7331H6.7C5.57989 21.7331 5.01984 21.7331 4.59202 21.5152C4.21569 21.3234 3.90973 21.0174 3.71799 20.6411C3.5 20.2133 3.5 19.6532 3.5 18.5331V11.2982Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileProfile: FC = () => (
  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.25 21C20.25 19.6044 20.25 18.9067 20.0778 18.3389C19.69 17.0605 18.6895 16.06 17.4111 15.6722C16.8433 15.5 16.1456 15.5 14.75 15.5H9.75C8.35444 15.5 7.65665 15.5 7.08886 15.6722C5.81045 16.06 4.81004 17.0605 4.42224 18.3389C4.25 18.9067 4.25 19.6044 4.25 21M16.75 7.5C16.75 9.98528 14.7353 12 12.25 12C9.76472 12 7.75 9.98528 7.75 7.5C7.75 5.01472 9.76472 3 12.25 3C14.7353 3 16.75 5.01472 16.75 7.5Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileMore: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 12H21M3 6H21M3 18H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileTranslator: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.913 17H20.087M12.913 17L11 21M12.913 17L15.7783 11.009C16.0092 10.5263 16.1246 10.2849 16.2826 10.2086C16.4199 10.1423 16.5801 10.1423 16.7174 10.2086C16.8754 10.2849 16.9908 10.5263 17.2217 11.009L20.087 17M20.087 17L22 21M2 5H8M8 5H11.5M8 5V3M11.5 5H14M11.5 5C11.0039 7.95729 9.85259 10.6362 8.16555 12.8844M10 14C9.38747 13.7248 8.76265 13.3421 8.16555 12.8844M8.16555 12.8844C6.81302 11.8478 5.60276 10.4266 5 9M8.16555 12.8844C6.56086 15.0229 4.47143 16.7718 2 18"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileWordbank: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21L11.8999 20.8499C11.2053 19.808 10.858 19.287 10.3991 18.9098C9.99286 18.5759 9.52476 18.3254 9.02161 18.1726C8.45325 18 7.82711 18 6.57482 18H5.2C4.07989 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V6.2C2 5.07989 2 4.51984 2.21799 4.09202C2.40973 3.71569 2.71569 3.40973 3.09202 3.21799C3.51984 3 4.07989 3 5.2 3H5.6C7.84021 3 8.96031 3 9.81596 3.43597C10.5686 3.81947 11.1805 4.43139 11.564 5.18404C12 6.03968 12 7.15979 12 9.4M12 21V9.4M12 21L12.1001 20.8499C12.7947 19.808 13.142 19.287 13.6009 18.9098C14.0071 18.5759 14.4752 18.3254 14.9784 18.1726C15.5467 18 16.1729 18 17.4252 18H18.8C19.9201 18 20.4802 18 20.908 17.782C21.2843 17.5903 21.5903 17.2843 21.782 16.908C22 16.4802 22 15.9201 22 14.8V6.2C22 5.07989 22 4.51984 21.782 4.09202C21.5903 3.71569 21.2843 3.40973 20.908 3.21799C20.4802 3 19.9201 3 18.8 3H18.4C16.1598 3 15.0397 3 14.184 3.43597C13.4314 3.81947 12.8195 4.43139 12.436 5.18404C12 6.03968 12 7.15979 12 9.4"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileSectionMila: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 14.4996V11.494C17 11.3145 17 11.2248 16.9727 11.1456C16.9485 11.0755 16.9091 11.0117 16.8572 10.9587C16.7986 10.8989 16.7183 10.8587 16.5578 10.7785L12 8.49958M4 9.49958V16.3062C4 16.6781 4 16.8641 4.05802 17.0269C4.10931 17.1708 4.1929 17.3011 4.30238 17.4077C4.42622 17.5283 4.59527 17.6057 4.93335 17.7607L11.3334 20.694C11.5786 20.8064 11.7012 20.8626 11.8289 20.8848C11.9421 20.9045 12.0579 20.9045 12.1711 20.8848C12.2988 20.8626 12.4214 20.8064 12.6666 20.694L19.0666 17.7607C19.4047 17.6057 19.5738 17.5283 19.6976 17.4077C19.8071 17.3011 19.8907 17.1708 19.942 17.0269C20 16.8641 20 16.6781 20 16.3062V9.49958M2 8.49958L11.6422 3.67846C11.7734 3.61287 11.839 3.58008 11.9078 3.56717C11.9687 3.55574 12.0313 3.55574 12.0922 3.56717C12.161 3.58008 12.2266 3.61287 12.3578 3.67846L22 8.49958L12.3578 13.3207C12.2266 13.3863 12.161 13.4191 12.0922 13.432C12.0313 13.4434 11.9687 13.4434 11.9078 13.432C11.839 13.4191 11.7734 13.3863 11.6422 13.3207L2 8.49958Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileSectionComunity: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileSectionMine: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.99997 11.2224L12.7778 15.0002M7.97485 20.975C6.60801 22.3419 4 22.0002 2 22.0002C3.0251 20.0002 1.65827 17.3921 3.0251 16.0253C4.39194 14.6585 6.60801 14.6585 7.97485 16.0253C9.34168 17.3921 9.34168 19.6082 7.97485 20.975ZM11.9216 15.9248L21.0587 6.05671C21.8635 5.18755 21.8375 3.83776 20.9999 3.00017C20.1624 2.16258 18.8126 2.13663 17.9434 2.94141L8.07534 12.0785C7.5654 12.5507 7.31043 12.7868 7.16173 13.0385C6.80514 13.6423 6.79079 14.3887 7.12391 15.0057C7.26283 15.2631 7.50853 15.5088 7.99995 16.0002C8.49136 16.4916 8.73707 16.7373 8.99438 16.8762C9.6114 17.2093 10.3578 17.195 10.9616 16.8384C11.2134 16.6897 11.4494 16.4347 11.9216 15.9248Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileSectionFeedback: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 9.5H12M8 13H15M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.1971 3.23374 14.3397 3.65806 15.3845C3.73927 15.5845 3.77988 15.6845 3.798 15.7653C3.81572 15.8443 3.8222 15.9028 3.82221 15.9839C3.82222 16.0667 3.80718 16.1569 3.77711 16.3374L3.18413 19.8952C3.12203 20.2678 3.09098 20.4541 3.14876 20.5888C3.19933 20.7067 3.29328 20.8007 3.41118 20.8512C3.54589 20.909 3.73218 20.878 4.10476 20.8159L7.66265 20.2229C7.84309 20.1928 7.9333 20.1778 8.01613 20.1778C8.09715 20.1778 8.15566 20.1843 8.23472 20.202C8.31554 20.2201 8.41552 20.2607 8.61549 20.3419C9.6603 20.7663 10.8029 21 12 21Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileSectionSupport: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.13626 9.13628L4.92893 4.92896M4.92893 19.0711L9.16797 14.8321M14.8611 14.8638L19.0684 19.0711M19.0684 4.92896L14.8287 9.16862M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MobileSectionSettings: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.0505 9H5.5C4.11929 9 3 7.88071 3 6.5C3 5.11929 4.11929 4 5.5 4H15.0505M8.94949 20H18.5C19.8807 20 21 18.8807 21 17.5C21 16.1193 19.8807 15 18.5 15H8.94949M3 17.5C3 19.433 4.567 21 6.5 21C8.433 21 10 19.433 10 17.5C10 15.567 8.433 14 6.5 14C4.567 14 3 15.567 3 17.5ZM21 6.5C21 8.433 19.433 10 17.5 10C15.567 10 14 8.433 14 6.5C14 4.567 15.567 3 17.5 3C19.433 3 21 4.567 21 6.5Z"
      stroke="#2563EB"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)