"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Store } from "lucide-react";

// Add types for items
type Item = {
  id: string;
  name: string;
  price: string;
};

// Mock data for items
const items: Item[] = [
  { id: "1", name: "Chicken Rice", price: "$4.50" },
  { id: "2", name: "Laksa", price: "$5.50" },
  { id: "3", name: "Nasi Lemak", price: "$4.00" },
];

export default function ItemAvailabilityDemo() {
  const [isPaused, setIsPaused] = useState(false);
  const [pauseType, setPauseType] = useState<"today" | "indefinite">("today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<"available" | "today" | "indefinite" | "four_hours">("available");
  const [segmentedStatus, setSegmentedStatus] = useState<"available" | "today" | "indefinite">("available");
  const [selectedMethod, setSelectedMethod] = useState<"modal" | "dropdown" | "toggle" | "segmented">("modal");
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // Separate state for Variation 1
  const [toggleByStoreModalOpen, setToggleByStoreModalOpen] = useState(false);
  const [selectedItemForToggle, setSelectedItemForToggle] = useState<string | null>(null);

  const handleAvailabilityChange = (
    itemName: string,
    isAvailable: boolean,
    unavailabilityType?: "today" | "indefinite"
  ) => {
    console.log(`${itemName} availability changed:`, { isAvailable, unavailabilityType });
  };

  const togglePauseType = () => {
    const newPauseType = pauseType === "today" ? "indefinite" : "today";
    setPauseType(newPauseType);
    handleAvailabilityChange("Chicken Rice", false, newPauseType);
  };

  // Mock data for store availability
  const storeAvailability = {
    "Tampines Mall": {
      status: "Out for Today",
      lastUpdated: "2 hours ago"
    },
    "Jurong Point": {
      status: "Available",
      lastUpdated: "1 hour ago"
    },
    "NEX": {
      status: "Off the menu",
      lastUpdated: "3 days ago"
    }
  };

  // Add new types for store availability
  type ItemStatus = "available" | "today" | "indefinite";
  type StoreItemStatuses = Record<string, Record<string, ItemStatus>>;

  // Mock data for stores
  const stores = [
    { id: "tampines", name: "Tampines Mall" },
    { id: "jurong", name: "Jurong Point" },
    { id: "nex", name: "NEX" },
  ];

  // Add new state for store availability
  const [selectedStore, setSelectedStore] = useState(stores[0].id);
  const [itemStatuses, setItemStatuses] = useState<StoreItemStatuses>({});
  const [statusSelectionModalOpen, setStatusSelectionModalOpen] = useState(false);
  const [selectedStoreForStatus, setSelectedStoreForStatus] = useState<string | null>(null);
  const [selectedItemForStock, setSelectedItemForStock] = useState<string | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

  // Add new functions for store availability
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

  const getStoreItemStatus = (itemId: string, storeId: string): ItemStatus => {
    return itemStatuses[storeId]?.[itemId] || "available";
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Item Availability</h1>
        <p className="text-sm text-muted-foreground">
          Comparing current and proposed availability controls
        </p>
      </div>

      {/* Current Implementation Reference */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Implementation</h2>
          <Badge variant="outline" className="text-xs">Reference</Badge>
        </div>
        <Card className="p-4 mb-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Chicken Rice</h3>
              <p className="text-sm text-muted-foreground">Simple on/off toggle</p>
            </div>
            <Switch
              checked={true}
              onCheckedChange={(checked) => console.log("Toggled:", checked)}
            />
          </div>
        </Card>
        <p className="text-sm text-muted-foreground">
          Current system only allows turning items on/off indefinitely, without timeframe options.
        </p>
      </div>

      <div className="p-4 bg-muted rounded-lg text-sm mb-8">
        <h2 className="font-semibold mb-3">Comparison with Current System</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• <strong>Current:</strong> Simple on/off toggle without timeframe options</li>
          <li>• <strong>New Patterns:</strong> Enhanced with:
            <ul className="ml-4 mt-1 space-y-1">
              <li>- Temporary pause (until tomorrow) or indefinite pause</li>
              <li>- Clear visual feedback</li>
              <li>- Mobile-optimized controls</li>
              <li>- Prevents accidental state changes</li>
            </ul>
          </li>
        </ul>
      </div>

      <Separator className="my-8" />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Merchant View</h2>
          <Badge variant="outline" className="text-xs">New</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Enhanced controls with timeframe options
        </p>
      </div>

      <div className="space-y-6">
        {/* Modal Edit Pattern */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Android</h2>
          <p className="text-sm text-muted-foreground mb-3">Similar to Deliveroo&apos;s availability controls</p>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">Roti Prata</h3>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "h-8 px-3",
                      "hover:bg-muted",
                      "flex items-center gap-2"
                    )}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      modalStatus === "available" && "bg-green-500",
                      modalStatus === "today" && "bg-yellow-500",
                      modalStatus === "four_hours" && "bg-yellow-500",
                      modalStatus === "indefinite" && "bg-red-500"
                    )} />
                    <span>
                      {modalStatus === "available" && "Available"}
                      {modalStatus === "today" && "Out for Today"}
                      {modalStatus === "four_hours" && `Out until ${new Date(Date.now() + 4 * 60 * 60 * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`}
                      {modalStatus === "indefinite" && "Off the menu"}
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Availability - Roti Prata</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <RadioGroup 
                      value={modalStatus} 
                      onValueChange={(value) => {
                        setModalStatus(value as "available" | "today" | "indefinite" | "four_hours");
                        setIsModalOpen(false);
                      }} 
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <RadioGroupItem value="available" id="modal-available" />
                        <Label htmlFor="modal-available" className="flex-1">
                          <span className="font-medium">Available</span>
                          <span className="block text-xs text-muted-foreground">Item is available for ordering</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <RadioGroupItem value="four_hours" id="modal-four-hours" />
                        <Label htmlFor="modal-four-hours" className="flex-1">
                          <span className="font-medium">Out for 4 Hours</span>
                          <span className="block text-xs text-muted-foreground">Item will be back at {new Date(Date.now() + 4 * 60 * 60 * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <RadioGroupItem value="today" id="modal-today" />
                        <Label htmlFor="modal-today" className="flex-1">
                          <span className="font-medium">Out for Today</span>
                          <span className="block text-xs text-muted-foreground">Item will be back tomorrow at 12:00 AM</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <RadioGroupItem value="indefinite" id="modal-indefinite" />
                        <Label htmlFor="modal-indefinite" className="flex-1">
                          <span className="font-medium">Off the menu</span>
                          <span className="block text-xs text-muted-foreground">Item stays unavailable until you reactivate it</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Menu Management Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Menu Management</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage item availability across different stores
              </p>
            </div>
            <Badge variant="outline" className="text-xs">New</Badge>
          </div>

          {/* Store-specific Availability Pattern */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium mb-2">Variation 1: Toggle By Store</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage item availability for a specific store
              </p>
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
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.price}</p>
                        </div>
                        <Dialog open={toggleByStoreModalOpen && selectedItemForToggle === item.id} onOpenChange={setToggleByStoreModalOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setSelectedItemForToggle(item.id)}
                              className={cn(
                                "h-8 px-3",
                                "hover:bg-muted",
                                "flex items-center gap-2"
                              )}
                            >
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                getStatusColor(getStoreItemStatus(item.id, selectedStore))
                              )} />
                              <span>{getStatusText(getStoreItemStatus(item.id, selectedStore))}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Availability - {item.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <RadioGroup 
                                value={getStoreItemStatus(item.id, selectedStore)} 
                                onValueChange={(value) => {
                                  handleStockChange(selectedStore, item.id, value as ItemStatus);
                                  setToggleByStoreModalOpen(false);
                                }} 
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
                    </Card>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-base font-medium mb-2">Variation 2: Store Stock Availability</h3>
              <p className="text-sm text-muted-foreground mb-4">
                View and manage availability across all stores
              </p>
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
            </div>
          </div>
        </section>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="other-patterns">
            <AccordionTrigger>Other Implementation Patterns</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6">
                {/* Dropdown Pattern - Mobile Optimized */}
                <section>
                  <h2 className="text-lg font-semibold mb-3">2. Inline Dropdown</h2>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Nasi Lemak</h3>
                        <Badge variant="outline" className="text-xs">Popular</Badge>
                      </div>
                      <Select defaultValue="available">
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectItem value="available">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span>Available</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="today">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-yellow-500" />
                              <span>Out for Today</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="indefinite">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              <span>Off the menu</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </Card>
                </section>

                {/* Option 1: Right-aligned Controls */}
                <section>
                  <h2 className="text-lg font-semibold mb-3">3. Toggle Variations</h2>
                  
                  {/* Variation A: Inline with Description */}
                  <Card className="p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">Chicken Rice</h3>
                        {isPaused && (
                          <div className="text-xs text-muted-foreground">
                            {pauseType === "today" ? "Returns tomorrow" : "Removed from menu"}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {isPaused && (
                          <button
                            onClick={togglePauseType}
                            className="text-xs text-primary hover:underline"
                          >
                            {pauseType === "today" ? "Remove from menu" : "Set for today only"}
                          </button>
                        )}
                        <Switch
                          checked={!isPaused}
                          onCheckedChange={(checked) => {
                            setIsPaused(!checked);
                            if (!checked) {
                              setPauseType("today");
                              handleAvailabilityChange("Chicken Rice", false, "today");
                            } else {
                              handleAvailabilityChange("Chicken Rice", true);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Variation B: Status Colors */}
                  <Card className="p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          !isPaused && "bg-green-500",
                          isPaused && pauseType === "today" && "bg-yellow-500",
                          isPaused && pauseType === "indefinite" && "bg-red-500"
                        )} />
                        <h3 className="font-medium">Chicken Rice</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        {isPaused && (
                          <select
                            value={pauseType}
                            onChange={(e) => {
                              setPauseType(e.target.value as "today" | "indefinite");
                              handleAvailabilityChange("Chicken Rice", false, e.target.value as "today" | "indefinite");
                            }}
                            className="text-xs border rounded px-2 py-1"
                          >
                            <option value="today">Out for today</option>
                            <option value="indefinite">Off the menu</option>
                          </select>
                        )}
                        <Switch
                          checked={!isPaused}
                          onCheckedChange={(checked) => {
                            setIsPaused(!checked);
                            if (!checked) {
                              setPauseType("today");
                              handleAvailabilityChange("Chicken Rice", false, "today");
                            } else {
                              handleAvailabilityChange("Chicken Rice", true);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Variation C: Compact Toggle Group */}
                  <Card className="p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Chicken Rice</h3>
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          className={cn(
                            "px-3 py-1.5 text-xs font-medium transition-colors",
                            !isPaused && "bg-primary text-primary-foreground",
                            isPaused && "bg-background hover:bg-muted"
                          )}
                          onClick={() => {
                            setIsPaused(false);
                            handleAvailabilityChange("Chicken Rice", true);
                          }}
                        >
                          Available
                        </button>
                        <div className="w-px h-full bg-border" />
                        <button
                          className={cn(
                            "px-3 py-1.5 text-xs font-medium transition-colors",
                            isPaused && pauseType === "today" && "bg-yellow-50 text-yellow-700",
                            !isPaused && "bg-background hover:bg-muted"
                          )}
                          onClick={() => {
                            setIsPaused(true);
                            setPauseType("today");
                            handleAvailabilityChange("Chicken Rice", false, "today");
                          }}
                        >
                          Out for Today
                        </button>
                        <div className="w-px h-full bg-border" />
                        <button
                          className={cn(
                            "px-3 py-1.5 text-xs font-medium transition-colors",
                            isPaused && pauseType === "indefinite" && "bg-red-50 text-red-700",
                            !isPaused && "bg-background hover:bg-muted"
                          )}
                          onClick={() => {
                            setIsPaused(true);
                            setPauseType("indefinite");
                            handleAvailabilityChange("Chicken Rice", false, "indefinite");
                          }}
                        >
                          Off the menu
                        </button>
                      </div>
                    </div>
                  </Card>

                  {/* Variation D: Minimal with Tooltip */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Chicken Rice</h3>
                        {isPaused && (
                          <div 
                            className={cn(
                              "px-1.5 py-0.5 rounded text-xs font-medium",
                              pauseType === "today" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700"
                            )}
                          >
                            {pauseType === "today" ? "Out for today" : "Off the menu"}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePauseType}
                          className={cn(
                            "rounded-full p-1.5 hover:bg-muted transition-colors",
                            !isPaused && "text-muted-foreground"
                          )}
                          disabled={!isPaused}
                        >
                          <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 7.5C1.5 4.18629 4.18629 1.5 7.5 1.5C10.8137 1.5 13.5 4.18629 13.5 7.5C13.5 10.8137 10.8137 13.5 7.5 13.5C4.18629 13.5 1.5 10.8137 1.5 7.5ZM7.5 2.5C4.73858 2.5 2.5 4.73858 2.5 7.5C2.5 10.2614 4.73858 12.5 7.5 12.5C10.2614 12.5 12.5 10.2614 12.5 7.5C12.5 4.73858 10.2614 2.5 7.5 2.5ZM7 8.5V4H8V8.5H7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                          </svg>
                        </button>
                        <Switch
                          checked={!isPaused}
                          onCheckedChange={(checked) => {
                            setIsPaused(!checked);
                            if (!checked) {
                              setPauseType("today");
                              handleAvailabilityChange("Chicken Rice", false, "today");
                            } else {
                              handleAvailabilityChange("Chicken Rice", true);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                </section>

                {/* Button Group Pattern - Mobile Optimized */}
                <section>
                  <h2 className="text-lg font-semibold mb-3">4. Segmented Control</h2>
                  <Card className="p-4">
                    <div className="mb-4">
                      <h3 className="font-medium">Laksa</h3>
                      <p className="text-sm text-muted-foreground">Special of the day</p>
                    </div>
                    <div className="grid grid-cols-3 gap-1 bg-muted p-1 rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-9 rounded-md",
                          segmentedStatus === "available" && "bg-background shadow-sm"
                        )}
                        onClick={() => setSegmentedStatus("available")}
                      >
                        Available
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-9 rounded-md",
                          segmentedStatus === "today" && "bg-background shadow-sm"
                        )}
                        onClick={() => setSegmentedStatus("today")}
                      >
                        Out for Today
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-9 rounded-md",
                          segmentedStatus === "indefinite" && "bg-background shadow-sm"
                        )}
                        onClick={() => setSegmentedStatus("indefinite")}
                      >
                        Off the menu
                      </Button>
                    </div>
                  </Card>
                </section>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator className="my-8" />

        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Shop View</h2>
            <Badge variant="outline" className="text-xs">Preview</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            How items appear to customers based on availability status
          </p>
        </div>

        <div className="space-y-4">
          {/* Available Item */}
          <div>
            <h3 className="text-sm font-medium mb-2">Available Item Preview</h3>
            <Card className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                  Image
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">阿元香草鸡 | Ah Yuan Fragrant Herbal Chicken</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">松软入味，卤香浓郁 Soft and sumptuously tasty.</p>
                  <p className="font-medium">$14.00</p>
                  <Button size="sm" className="mt-2">Add</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Out for Today Item */}
          <div>
            <h3 className="text-sm font-medium mb-2">Out for Today Preview</h3>
            <Card className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                  Image
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">咖喱鸡 | Curry Chicken</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">浓郁香料，温和可口 Rich spices, mild and delicious.</p>
                  <p className="font-medium">$12.00</p>
                  <Button size="sm" className="mt-2" disabled>Out of Stock Today</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Off the Menu Item */}
          <div>
            <h3 className="text-sm font-medium mb-2">Off the Menu Preview</h3>
            <Card className="p-4">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                  Image
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">炸鸡翅 | Fried Chicken Wings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">外酥内嫩，风味十足 Crispy outside, tender inside.</p>
                  <p className="font-medium">$10.00</p>
                  <Button size="sm" className="mt-2" disabled>Out of Stock</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Store Availability Modal */}
      <Dialog open={isStoreModalOpen} onOpenChange={setIsStoreModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Store Availability - Roti Prata</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="Tampines Mall" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {Object.keys(storeAvailability).map((store) => (
                <TabsTrigger key={store} value={store}>
                  {store}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(storeAvailability).map(([store, data]) => (
              <TabsContent key={store} value={store}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        data.status === "Available" && "bg-green-500",
                        data.status === "Out for Today" && "bg-yellow-500",
                        data.status === "Off the menu" && "bg-red-500"
                      )} />
                      <span className="font-medium">{data.status}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Updated {data.lastUpdated}</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm">Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
} 