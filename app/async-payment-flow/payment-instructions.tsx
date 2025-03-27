'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Users, Globe2 } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "./language-context"

export function PaymentInstructions() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md">
        <div className="space-y-4">
          {/* Header with Logo and Language Toggle */}
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-24 h-8">
              <Image
                src="https://ucarecdn.com/7795ffb7-c75e-41a3-a7d3-ed32a221fce1/-/preview/194x80/"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
              className="flex items-center gap-2"
            >
              <Globe2 className="w-4 h-4" />
              <span>{language === 'zh' ? 'English' : '中文'}</span>
            </Button>
          </div>

          {/* Booking Confirmation Card */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h2 className="text-lg font-medium">{t('booking.status.pending')}</h2>
            </div>

            <div className="text-center mb-6">
              <div className="text-gray-500">N/A Yong Xiang Pua</div>
              <div className="text-2xl font-bold mt-2">28 3月</div>
              <div className="text-xl">11:15 上午</div>
              <div className="text-gray-500 mt-2">2 {t('booking.adults')}</div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+6598223670</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>puayongxiang@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-4 h-4" />
                <span>Couple Date</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">{t('payment.required')}</h3>
                <p className="text-sm text-gray-600">{t('payment.instruction')}</p>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('payment.bank')}</span>
                  <span>{t('payment.bank.name')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('payment.bank.code')}</span>
                  <span>013</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('payment.account')}</span>
                  <span>2803031549106856</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                {/* Share Section */}
                <div>
                  <h3 className="font-medium mb-2">{t('share.title')}</h3>
                  <div className="text-sm text-gray-600 mb-3">
                    {t('share.email.sent')}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value="https://reserve.oddle.me/zh_TW/ch"
                      readOnly
                      className="flex-1 text-sm bg-gray-50 border rounded px-3 py-2"
                    />
                    <Button variant="secondary" className="bg-purple-900 text-white hover:bg-purple-800">
                      {t('button.copy')}
                    </Button>
                  </div>
                </div>

                {/* Reservation Management */}
                <div className="mt-4">
                  <h3 className="font-medium mb-2">{t('manage.reservation')}</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-center">
                      {t('button.modify')}
                    </Button>
                    <Button variant="outline" className="w-full justify-center text-red-600 hover:text-red-700">
                      {t('button.cancel')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Reservation Policy */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">{t('policy.title')}</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                {t('policy.update')}
                {t('policy.description')}
              </div>
              <ul className="list-disc pl-4 space-y-2">
                <li>{t('policy.deposit')}</li>
                <li>{t('policy.bank.name')}</li>
                <li>{t('policy.bank.account')}</li>
                <li>{t('policy.email')}</li>
                <li>{t('policy.deadline')}</li>
                <li>{t('policy.confirmation')}</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 