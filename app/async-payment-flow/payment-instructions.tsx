'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Users, Globe2, Info } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "./language-context"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Bank Code to Name Mapping
const bankNameMap: { [key: string]: { en: string; 'zh-TW': string } } = {
  '004': { en: 'Bank of Taiwan (BOT)', 'zh-TW': '台灣銀行' },
  '005': { en: 'Land Bank of Taiwan', 'zh-TW': '土地銀行' },
  '007': { en: 'First Bank', 'zh-TW': '第一銀行' },
  '118': { en: 'Bank of Panhsin', 'zh-TW': '板信銀行' },
  '808': { en: 'E.SUN BANK', 'zh-TW': '玉山銀行' }, // Assuming Chinese name for E.SUN
  '813': { en: 'Taipei Fubon Bank', 'zh-TW': '台北富邦銀行' }, // Assuming Chinese name for Fubon
  '814': { en: 'Yuanta Bank (formerly Ta Chong)', 'zh-TW': '元大銀行 (原大眾銀行)' }, // Clarified merger
  '822': { en: 'CTBC Bank', 'zh-TW': '中國信託' },
  '013': { en: 'Cathay United Bank', 'zh-TW': '國泰世華銀行' },
  // Add more mappings as needed
};

interface PayloadType {
  OrderInfo: {
    TradeAmt: string;
  };
  ATMInfo: {
    ExpireDate: string;
    BankCode: string;
    vAccount: string;
  };
}

interface PaymentInstructionsProps {
  payload?: PayloadType;
}

export function PaymentInstructions({ payload }: PaymentInstructionsProps) {
  const { language, setLanguage, t } = useLanguage()

  // Dummy data for demonstration
  const dummyPayload = {
    OrderInfo: {
      TradeAmt: 'TWD 2,000',
    },
    ATMInfo: {
      ExpireDate: '2024-03-28 23:59:59',
      BankCode: '013',
      vAccount: '12345678901234',
    }
  };

  // Use dummy data if no payload provided
  const actualPayload = payload || dummyPayload;

  // Extract data from payload, providing fallbacks
  const tradeAmt = actualPayload?.OrderInfo?.TradeAmt ?? 'N/A';
  const expireDate = actualPayload?.ATMInfo?.ExpireDate ?? 'N/A';
  const bankCode = actualPayload?.ATMInfo?.BankCode ?? 'N/A';
  const vAccount = actualPayload?.ATMInfo?.vAccount ?? 'N/A';

  // Get dynamic bank name based on code and language
  const bankInfo = bankCode !== 'N/A' ? bankNameMap[bankCode] : undefined;
  const dynamicBankName = bankInfo ? bankInfo[language] : `Bank Code ${bankCode}`;

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
              onClick={() => setLanguage(language === 'zh-TW' ? 'en' : 'zh-TW')}
              className="flex items-center gap-2"
            >
              <Globe2 className="w-4 h-4" />
              <span>{language === 'zh-TW' ? 'English' : '繁體中文'}</span>
            </Button>
          </div>

          {/* Booking Confirmation Card */}
          <Card className="p-6">
            <TooltipProvider>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-medium">{t('booking.status.pending')}</h2>
                </div>
                
              </div>

              <div className="text-center mb-6">
                <div className="text-gray-500">Yong Xiang Pua</div>
                <div className="text-2xl font-bold mt-2">28 March</div>
                <div className="text-xl">11:15 AM</div>
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
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Amount:</span>
                      <span className="font-medium">{tradeAmt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Deadline:</span>
                      <span className="font-medium">{expireDate}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('payment.bank')}</span>
                    <span>{dynamicBankName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('payment.bank.code')}</span>
                    <span>{bankCode}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('payment.account')}</span>
                    <span>{vAccount}</span>
                  </div>
                  <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="w-80">
                    <p className="font-medium mb-2 text-sm">Tooltip is not required in actual design. To be updated based on Oddle payload</p>
                    <div className="space-y-2 text-sm">
                      <p>Payment Amount: OrderInfo.TradeAmt</p>
                      <p>Payment Deadline: ATMInfo.ExpireDate</p>
                      <p>Bank Name: ATMInfo.BankCode (mapped to localized name)</p>
                      <p>Bank Code: ATMInfo.BankCode</p>
                      <p>Account Number: ATMInfo.vAccount</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
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
            </TooltipProvider>
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