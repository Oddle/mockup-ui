"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Store } from "lucide-react";

// Mock data
const stores = [
  { id: "tampines", name: "Tampines Mall" },
  { id: "jurong", name: "Jurong Point" },
  { id: "nex", name: "NEX" },
];

const items = [
  { id: "chicken-rice", name: "Chicken Rice", price: "$5.90" },
  { id: "nasi-lemak", name: "Nasi Lemak", price: "$4.90" },
  { id: "roti-prata", name: "Roti Prata", price: "$2.50" },
  { id: "laksa", name: "Laksa", price: "$6.90" },
];

type ItemStatus = "available" | "today" | "indefinite";
type StoreItemStatuses = Record<string, Record<string, ItemStatus>>;

type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
type StoreStockStatuses = Record<string, Record<string, StockStatus>>;

export default function ItemStoreAvailabilityPage() {
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [itemStatuses, setItemStatuses] = useState<StoreItemStatuses>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Modified state for second variation
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedItemForStock, setSelectedItemForStock] = useState<string | null>(null);
  const [storeStockStatuses, setStoreStockStatuses] = useState<StoreStockStatuses>({});

  const [statusSelectionModalOpen, setStatusSelectionModalOpen] = useState(false);
  const [selectedStoreForStatus, setSelectedStoreForStatus] = useState<string | null>(null);

  const handleStatusChange = (itemId: string, status: ItemStatus) => {
    setItemStatuses(prev => ({
      ...prev,
      [selectedStore]: {
        ...(prev[selectedStore] || {}),
        [itemId]: status
      }
    }));
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "today": return "bg-yellow-500";
      case "indefinite": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Available";
      case "today": return "Out of Stock for Today";
      case "indefinite": return "Off the Menu";
      default: return "Set Status";
    }
  };

  const getItemStatus = (itemId: string): ItemStatus => {
    return itemStatuses[selectedStore]?.[itemId] || "available";
  };

  const handleStockChange = (storeId: string, itemId: string, status: ItemStatus) => {
    setItemStatuses(prev => ({
      ...prev,
      [storeId]: {
        ...(prev[storeId] || {}),
        [itemId]: status
      }
    }));
    setStatusSelectionModalOpen(false);
  };

  const getStoreItemStatus = (itemId: string, storeId: string): ItemStatus => {
    return itemStatuses[storeId]?.[itemId] || "available";
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case "in_stock": return "bg-green-500";
      case "low_stock": return "bg-yellow-500";
      case "out_of_stock": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStockStatusText = (status: string) => {
    switch (status) {
      case "in_stock": return "In Stock";
      case "low_stock": return "Low Stock";
      case "out_of_stock": return "Out of Stock";
      default: return "Set Stock Status";
    }
  };

  const getStoreStockStatus = (itemId: string, storeId: string): StockStatus => {
    return storeStockStatuses[itemId]?.[storeId] || "in_stock";
  };

  const getStockStatusButton = (status: StockStatus) => {
    const statusConfig = {
      in_stock: { text: "Available", color: "bg-green-500" },
      low_stock: { text: "Low Stock", color: "bg-yellow-500" },
      out_of_stock: { text: "Out of Stock", color: "bg-red-500" }
    };
    const config = statusConfig[status] || statusConfig.in_stock;
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className={cn(
          "h-8 px-3",
          "hover:bg-muted",
          "flex items-center gap-2"
        )}
      >
        <div className={cn("w-2 h-2 rounded-full", config.color)} />
        <span>{config.text}</span>
      </Button>
    );
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Store Availability</h1>
        <p className="text-sm text-muted-foreground">
          Comparing different store availability management patterns
        </p>
      </div>

      <div className="space-y-8">
        {/* Store-specific Availability Pattern */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Variation 1: Toggle By Store</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage item availability across different stores with store-specific status controls
              </p>
            </div>
            <Badge variant="outline" className="text-xs">New</Badge>
          </div>
          <Card className="p-6">
            <div className="mb-6">
              <Select value={selectedStore} onValueChange={setSelectedStore}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog open={isModalOpen && selectedItem === item.id} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setSelectedItem(item.id)}
                            className={cn(
                              "h-8 px-3",
                              "hover:bg-muted",
                              "flex items-center gap-2"
                            )}
                          >
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              getStatusColor(getItemStatus(item.id))
                            )} />
                            <span>{getStatusText(getItemStatus(item.id))}</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Availability - {item.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <RadioGroup 
                              value={getItemStatus(item.id)} 
                              onValueChange={(value) => handleStatusChange(item.id, value as ItemStatus)} 
                              className="space-y-2"
                            >
                              <div className="flex items-center space-x-3 rounded-lg border p-3">
                                <RadioGroupItem value="available" id={`${item.id}-available`} />
                                <Label htmlFor={`${item.id}-available`} className="flex-1">
                                  <span className="font-medium">Available</span>
                                  <span className="block text-xs text-muted-foreground">Item is available for ordering</span>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 rounded-lg border p-3">
                                <RadioGroupItem value="today" id={`${item.id}-today`} />
                                <Label htmlFor={`${item.id}-today`} className="flex-1">
                                  <span className="font-medium">Out of Stock for Today</span>
                                  <span className="block text-xs text-muted-foreground">Item will be back tomorrow at 12:00 AM</span>
                                </Label>
                              </div>
                              <div className="flex items-center space-x-3 rounded-lg border p-3">
                                <RadioGroupItem value="indefinite" id={`${item.id}-indefinite`} />
                                <Label htmlFor={`${item.id}-indefinite`} className="flex-1">
                                  <span className="font-medium">Off the Menu</span>
                                  <span className="block text-xs text-muted-foreground">Item stays unavailable until you reactivate it</span>
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>

        <Separator />

        {/* Second Variation: Store Stock Availability Modal */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Variation 2: Store Stock Availability</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage stock levels across different stores with a unified interface
              </p>
            </div>
            <Badge variant="outline" className="text-xs">New</Badge>
          </div>
          <Card className="p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.price}</p>
                    </div>
                    <Dialog open={isStockModalOpen && selectedItemForStock === item.id} onOpenChange={setIsStockModalOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedItemForStock(item.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Store className="h-4 w-4" />
                          <span className="sr-only">Store Availability</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Store Availability - {item.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          {stores.map((store) => (
                            <Card key={store.id} className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-medium">{store.name}</h3>
                                </div>
                                <Dialog 
                                  open={statusSelectionModalOpen && selectedStoreForStatus === store.id} 
                                  onOpenChange={setStatusSelectionModalOpen}
                                >
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedStoreForStatus(store.id)}
                                      className={cn(
                                        "h-8 px-3",
                                        "hover:bg-muted",
                                        "flex items-center gap-2"
                                      )}
                                    >
                                      <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        getStatusColor(getStoreItemStatus(item.id, store.id))
                                      )} />
                                      <span>{getStatusText(getStoreItemStatus(item.id, store.id))}</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Set Status - {store.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <RadioGroup 
                                        value={getStoreItemStatus(item.id, store.id)} 
                                        onValueChange={(value) => handleStockChange(store.id, item.id, value as ItemStatus)}
                                        className="space-y-2"
                                      >
                                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                                          <RadioGroupItem value="available" id={`${item.id}-${store.id}-available`} />
                                          <Label htmlFor={`${item.id}-${store.id}-available`} className="flex-1">
                                            <span className="font-medium">Available</span>
                                            <span className="block text-xs text-muted-foreground">Item is available for ordering</span>
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                                          <RadioGroupItem value="today" id={`${item.id}-${store.id}-today`} />
                                          <Label htmlFor={`${item.id}-${store.id}-today`} className="flex-1">
                                            <span className="font-medium">Out of Stock for Today</span>
                                            <span className="block text-xs text-muted-foreground">Item will be back tomorrow at 12:00 AM</span>
                                          </Label>
                                        </div>
                                        <div className="flex items-center space-x-3 rounded-lg border p-3">
                                          <RadioGroupItem value="indefinite" id={`${item.id}-${store.id}-indefinite`} />
                                          <Label htmlFor={`${item.id}-${store.id}-indefinite`} className="flex-1">
                                            <span className="font-medium">Off the Menu</span>
                                            <span className="block text-xs text-muted-foreground">Item stays unavailable until you reactivate it</span>
                                          </Label>
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
} 