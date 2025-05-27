
// 'use client'

// import { usePathname } from 'next/navigation'
// import ClientLayout from './ClientLayout'


// export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname()
//   const isAdmin = pathname.startsWith('/business/agent')
//   const isAgency = pathname.startsWith("/business/agency")

//   return isAdmin ? <div>{children}</div> : <ClientLayout>{children}</ClientLayout>


// }


'use client'

import { usePathname } from 'next/navigation'
import ClientLayout from './ClientLayout'


export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/business/agent')
  const isAgency = pathname.startsWith('/business/agency')

  const showRawLayout = isAdmin || isAgency

  return showRawLayout ? <div>{children}</div> : <ClientLayout>{children}</ClientLayout>
}

