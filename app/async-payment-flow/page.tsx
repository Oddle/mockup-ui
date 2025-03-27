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

export default function AsyncPaymentFlow() {
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "atm">("credit")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    if (paymentMethod === "atm") {
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    return <PaymentInstructions />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-md">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">付款以完成訂位</h2>
            <Link href="#" className="text-sm text-primary">回上一步</Link>
          </div>

          <div className="space-y-6">
            {/* Reservation Summary */}
            <div>
              <h3 className="font-medium mb-4">訂位摘要</h3>
              <div className="bg-white rounded-lg border p-4">
                <div className="text-lg font-medium mb-4">星期六, 29 三月, 11:30 上午</div>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span>預訂玫瑰芭芭標米版</span>
                    <span className="text-gray-500">x2</span>
                  </div>
                  <div>
                    <span className="text-sm text-primary">訂金</span>
                    <div className="text-lg font-medium">NT$30</div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span>總計</span>
                  <span className="text-lg font-medium">NT$30</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="font-medium mb-4">付款資訊</h3>
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
                      <span>信用卡付款 (一次付清)</span>
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
                        <Label className="mb-1 block">信用卡號</Label>
                        <div className="relative">
                          <Input 
                            placeholder="0000 0000 0000 0000" 
                            className="pl-10"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="mb-1 block">有效期限</Label>
                          <div className="relative">
                            <Input 
                              placeholder="MM / YY" 
                              className="pl-10"
                            />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <Label className="mb-1 block">安全碼</Label>
                          <div className="relative">
                            <Input 
                              placeholder="000" 
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
                          我要記住本次交易資訊，方便下次快速結帳。
                        </Label>
                      </div>

                      {/* Info Box */}
                      <div className="bg-blue-50 p-4 rounded-lg text-sm">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                          <div className="text-gray-600">
                            會依照國際標準以安全、加密的方式處理您的付款資訊。請放心Oddle沒有登入您的付款資訊的權限。
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
                    <Label htmlFor="atm" className="cursor-pointer">ATM</Label>
                  </div>

                  {paymentMethod === "atm" && (
                    <div className="p-3 pt-0 space-y-4">
                      <div>
                        <Label className="mb-1 block">付款銀行</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="臺灣世華銀行" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="land-bank">臺灣世華銀行</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                        <h4 className="text-sm font-medium text-gray-900">注意事項</h4>
                        <ul className="list-disc text-sm text-gray-600 pl-4 space-y-2">
                          <li>
                            如果您使用的提款卡與ATM所屬銀行不同，銀行可能會收取<span className="text-red-500">跨行轉帳手續費</span>。實際收費金額將依各銀行公告為準。
                          </li>
                          <li>
                            請務必在付款前確認付款金額和付款期限。
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </RadioGroup>

              <div className="space-y-4 mt-4">
                <div className="text-sm text-gray-500 text-center">
                  該筆訂金無法退款
                </div>

                {/* Submit Button */}
                <Button 
                  className="w-full bg-indigo-900 hover:bg-indigo-800 text-white"
                  onClick={handleSubmit}
                >
                  確認並付款 NT$30
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 