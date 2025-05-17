
'use client'

import { usePathname } from 'next/navigation'
import ClientLayout from './ClientLayout'
import AdminLayout from '@/app/admin/layout'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return isAdmin ? <div>{children}</div> : <ClientLayout>{children}</ClientLayout>

}
