import { ReactNode } from "react"

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[800px] mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center">
            Set up your online store
          </h1>
          <p className="text-muted-foreground text-center mt-2">
            Complete these steps to launch your online ordering platform
          </p>
        </div>
        {children}
      </div>
    </div>
  )
} 