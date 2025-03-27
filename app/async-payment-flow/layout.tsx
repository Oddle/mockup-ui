import { LanguageProvider } from "./language-context"

export default function AsyncPaymentFlowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </LanguageProvider>
  )
} 