import dynamic from 'next/dynamic'

const CompletionContent = dynamic(() => import('@/components/completion-content'), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] flex items-center justify-center">
      <div className="text-muted-foreground">Loading...</div>
    </div>
  )
})

export default function SignUpCompletion() {
  return (
    <div className="max-w-[600px] mx-auto py-10 px-4">
      <CompletionContent />
    </div>
  )
} 