'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

type AvailabilityStatus = 'on' | 'off' | 'today'

interface Item {
  id: string
  name: string
  price: string
  availability: AvailabilityStatus
}

interface Category {
  id: string
  name: string
  availability: AvailabilityStatus
  items: Item[]
}

export default function CategoryItemAvailability() {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Main Course',
      availability: 'on',
      items: [
        { id: '1-1', name: 'Beef Tenderloin', price: '$45', availability: 'on' },
        { id: '1-2', name: 'Grilled Salmon', price: '$38', availability: 'on' },
        { id: '1-3', name: 'Chicken Marsala', price: '$32', availability: 'on' },
      ]
    },
    {
      id: '2',
      name: 'Appetizers',
      availability: 'off',
      items: [
        { id: '2-1', name: 'Bruschetta', price: '$12', availability: 'off' },
        { id: '2-2', name: 'Calamari', price: '$15', availability: 'off' },
      ]
    },
    {
      id: '3',
      name: 'Desserts',
      availability: 'today',
      items: [
        { id: '3-1', name: 'Tiramisu', price: '$10', availability: 'today' },
        { id: '3-2', name: 'Panna Cotta', price: '$9', availability: 'today' },
      ]
    }
  ])

  const [showDialog, setShowDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handleCategoryToggle = (categoryId: string, newStatus: AvailabilityStatus) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          availability: newStatus,
          items: category.items.map(item => ({
            ...item,
            availability: newStatus
          }))
        }
      }
      return category
    }))
  }

  const handleItemToggle = (categoryId: string, itemId: string, newStatus: AvailabilityStatus) => {
    const category = categories.find(c => c.id === categoryId)
    if (!category) return

    if (category.availability !== 'on') {
      setSelectedItem(category.items.find(item => item.id === itemId) || null)
      setShowDialog(true)
      return
    }

    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => {
            if (item.id === itemId) {
              return { ...item, availability: newStatus }
            }
            return item
          })
        }
      }
      return category
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-2xl font-bold mb-8">Category & Item Availability</h1>
        
        <div className="space-y-6">
          {categories.map(category => (
            <Card key={category.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">{category.name}</h2>
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`category-${category.id}`}>Available</Label>
                  <Switch
                    id={`category-${category.id}`}
                    checked={category.availability === 'on'}
                    onCheckedChange={(checked) => handleCategoryToggle(category.id, checked ? 'on' : 'off')}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {category.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.price}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`item-${item.id}`}>Available</Label>
                      <Switch
                        id={`item-${item.id}`}
                        checked={item.availability === 'on'}
                        onCheckedChange={(checked) => handleItemToggle(category.id, item.id, checked ? 'on' : 'off')}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Category Availability Required</DialogTitle>
              <DialogDescription>
                To change the availability of "{selectedItem?.name}", please first set the category "{categories.find(c => c.items.some(i => i.id === selectedItem?.id))?.name}" to Available.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 