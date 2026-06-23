import TrainingPaths from '@/components/home/TrainingPaths'
import { fetchPaths } from '@/lib/api'

export const revalidate = 60

export default async function ProgrammesPage() {
  const paths = await fetchPaths()

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <TrainingPaths paths={paths} />
      </div>
    </div>
  )
}
