import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientLayoutWrapper } from '@/components/layout/ClientLayoutWrapper'
import { fetchPaths } from '@/lib/api'
import { TrainingPath } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PG Training — Higher Education Professional Development',
  description: '25 years of excellence in professional development for higher education institutions worldwide.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let paths: TrainingPath[] = []
  try {
    paths = await fetchPaths()
  } catch {
    const { TRAINING_PATHS } = await import('@/data/courses')
    paths = TRAINING_PATHS
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayoutWrapper paths={paths}>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
