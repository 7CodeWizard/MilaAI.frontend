import { Suspense } from 'react'

import { Loader } from '../components'

const withSuspense = (Component: React.FC) => (props: JSX.IntrinsicAttributes) => {
  return (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )
}

export default withSuspense
