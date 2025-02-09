"use client"

import { usePathname } from "next/navigation"

export default function MerchantSignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPricingPage = pathname === "/merchant-sign-up/pricing"

  return (
    <div className={isPricingPage ? "w-full" : "max-w-[600px] mx-auto py-10 px-4"}>
      {children}
    </div>
  )
} 