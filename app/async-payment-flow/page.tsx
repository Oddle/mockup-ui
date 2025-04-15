"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Info, CreditCard, Calendar, Lock } from "lucide-react"
import Link from "next/link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { PaymentInstructions } from "./payment-instructions"
// Import Language Context
import { LanguageProvider, useLanguage } from "./language-context"

// Define language options locally as context doesn't provide them
const languageOptions = [
  { value: "en", label: "English" },
  { value: "zh-TW", label: "繁體中文" },
];

// Component content that needs context
function PaymentFlowContent() {
  const { language, setLanguage, t } = useLanguage(); // Use the context hook (removed languageOptions)
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "atm">("atm")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (paymentMethod === "atm") {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    // Pass language context values if PaymentInstructions doesn't use the hook itself
    // Assuming PaymentInstructions uses useLanguage() internally, no props needed here
    return <PaymentInstructions />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md">
        <Card className="p-6">
          {/* Adjusted Header with Flexbox */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">{t('completePaymentTitle')}</h2>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-primary">{t('backLink')}</Link>
              {/* Language Selector Dropdown - Now uses context */}
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[120px] h-8 text-xs">
                  <SelectValue placeholder={t('languagePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((option: { value: string; label: string }) => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            {/* Reservation Summary */}
            <div>
              <h3 className="font-medium mb-4">{t('reservationSummaryTitle')}</h3>
              <div className="bg-white rounded-lg border p-4">
                <div className="text-lg font-medium mb-4">{t('reservationDateTime')}</div> {/* Use translated key */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span>{t('productName')}</span> {/* Assuming 'productName' key exists */}
                    <span className="text-gray-500">x2</span>
                  </div>
                  <div>
                    <span className="text-sm text-primary">{t('depositLabel')}</span>
                    <div className="text-lg font-medium">NT$30</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span>{t('totalLabel')}</span>
                  <span className="text-lg font-medium">NT$30</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="font-medium mb-4">{t('paymentInfoTitle')}</h3>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value: "credit" | "atm") => setPaymentMethod(value)}
                className="space-y-4"
              >
                {/* Credit Card Option */}
                <div className={`rounded-lg border bg-white ${paymentMethod === "credit" ? "border-primary" : ""}`}>
                  <div className="flex items-center gap-2 p-3">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="flex items-center gap-2 flex-1 cursor-pointer">
                      <span>{t('creditCardLabel')}</span>
                      {/* Icons remain */}
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-600 rounded"></div>
                        <div className="w-8 h-5 bg-red-600 rounded"></div>
                        <div className="w-8 h-5 bg-green-600 rounded"></div>
                      </div>
                    </Label>
                  </div>

                  {paymentMethod === "credit" && (
                    <div className="p-3 pt-0 space-y-4">
                      <div>
                        <Label className="mb-1 block">{t('creditCardNumberLabel')}</Label>
                        <div className="relative">
                          <Input
                            placeholder={t('creditCardNumberPlaceholder')}
                            className="pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-1 block">{t('expiryDateLabel')}</Label>
                          <div className="relative">
                            <Input
                              placeholder={t('expiryDatePlaceholder')}
                              className="pl-10"
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <Label className="mb-1 block">{t('securityCodeLabel')}</Label>
                          <div className="relative">
                            <Input
                              placeholder={t('securityCodePlaceholder')}
                              className="pl-10"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* Save Card Option */}
                      <div className="flex items-start gap-2">
                        <Checkbox id="save" />
                        <Label htmlFor="save" className="text-sm leading-tight">
                          {t('saveCardCheckboxLabel')}
                        </Label>
                      </div>

                      {/* Info Box */}
                      <div className="bg-blue-50 p-4 rounded-lg text-sm">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                          <div className="text-gray-600">
                            {t('securityInfoText')}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ATM Option */}
                <div className={`rounded-lg border bg-white ${paymentMethod === "atm" ? "border-primary" : ""}`}>
                  <div className="flex items-center gap-2 p-3">
                    <RadioGroupItem value="atm" id="atm" />
                    <Label htmlFor="atm" className="cursor-pointer">{t('atmLabel')}</Label>
                  </div>

                  {paymentMethod === "atm" && (
                    <div className="p-3 pt-0 space-y-4">
                      <div>
                        <Label className="mb-1 block">{t('paymentBankLabel')}</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder={t('bankName')} /> {/* Assuming 'bankName' key */}
                          </SelectTrigger>
                          <SelectContent>
                            {/* This should likely be dynamic/translated too */}
                            <SelectItem value="land-bank">{t('bankName')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">{t('notesTitle')}</h4>
                        <ul className="list-disc text-sm text-gray-600 pl-4 space-y-2">
                          {/* Adjusted note1 key, removed interpolation */} 
                          <li>{t('note1WithFee')}</li> 
                          <li>{t('note2')}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </RadioGroup>

              <div className="space-y-4 mt-4">
                <div className="text-sm text-gray-500 text-center">
                  {t('nonRefundableDepositText')}
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full bg-indigo-900 hover:bg-indigo-800 text-white"
                  onClick={handleSubmit}
                >
                  {/* Adjusted button key, removed interpolation */} 
                  {t('confirmAndPayButtonLabel')} NT$30 
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Default export wraps the content component with the provider
export default function AsyncPaymentFlow() {
  return (
    <LanguageProvider>
      <PaymentFlowContent />
    </LanguageProvider>
  );
} 