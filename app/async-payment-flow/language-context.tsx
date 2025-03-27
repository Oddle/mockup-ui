'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'zh' | 'en'

interface Translations {
  [key: string]: {
    [key: string]: string
  }
}

const translations: Translations = {
  zh: {
    'booking.status.pending': '訂位處理中',
    'booking.adults': '位大人',
    'payment.pending': '交易待付款',
    'payment.required': '付款資訊',
    'payment.instruction': '請於 2025年3月15日 23:59:59 前支付訂金 $500，否則預訂將被取消。以下是付款資料：',
    'payment.bank': '付款銀行',
    'payment.bank.name': '臺灣世華銀行',
    'payment.bank.code': '銀行代碼',
    'payment.account': '虛擬帳號',
    'share.title': '分享此預訂',
    'share.email.sent': '副本已發送至您的電子郵件',
    'manage.reservation': '管理您的預訂',
    'button.copy': '複製',
    'button.modify': '修改預訂',
    'button.cancel': '取消預訂',
    'policy.title': '預訂政策',
    'policy.update': '金流預訂已改版😅',
    'policy.description': '親愛的顧客，由於店內座位位置有限，為了確保每一組客人都能享受到最好的用餐體驗，我們需要預先收取訂位金來確保訂位！😊',
    'policy.deposit': '🤝 線上訂位完人，訂金$500 • 訂位人請請填寫下方連戶',
    'policy.bank.name': '國泰世華(013)',
    'policy.bank.account': '帳號：013-1300-1055877',
    'policy.email': '再煩您將匯款至客服Email，請在裡面註明您的聯絡資訊跟匯款時間回覆',
    'policy.deadline': '在訂付位前一天未付訂金，「系統將會自動取消訂位」❗️',
    'policy.confirmation': '未收到訂金前皆視為預約訂位，請務必在收到Email確認後再前往用餐喔！',
  },
  en: {
    'booking.status.pending': 'Booking Pending',
    'booking.adults': 'Adults',
    'payment.pending': 'Payment Pending',
    'payment.required': 'Payment Required',
    'payment.instruction': 'Please make payment of $500 by March 15, 2025 23:59:59. Otherwise, your booking will be cancelled. The following are the details:',
    'payment.bank': 'Bank',
    'payment.bank.name': 'HSBC Bank',
    'payment.bank.code': 'Bank Code',
    'payment.account': 'Account Number',
    'share.title': 'Share This Reservation',
    'share.email.sent': 'A copy has been sent to your email',
    'manage.reservation': 'Manage Your Reservation',
    'button.copy': 'Copy',
    'button.modify': 'Modify Reservation',
    'button.cancel': 'Cancel Reservation',
    'policy.title': 'Reservation Policy',
    'policy.update': 'Payment reservation has been updated 😅',
    'policy.description': 'Dear customer, due to limited seating in the restaurant, we need to collect a deposit in advance to ensure your reservation and provide the best dining experience for every guest! 😊',
    'policy.deposit': '🤝 After online reservation, deposit $500 • Please fill in the form below',
    'policy.bank.name': 'HSBC Bank (013)',
    'policy.bank.account': 'Account: 013-1300-1055877',
    'policy.email': 'Please send the transfer receipt to customer service Email, including your contact information and transfer time',
    'policy.deadline': 'If deposit is not paid by the day before the reservation, "the system will automatically cancel the reservation" ❗️',
    'policy.confirmation': 'All reservations are considered tentative until deposit is received. Please wait for Email confirmation before dining.',
  }
}

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
} | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh')

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 