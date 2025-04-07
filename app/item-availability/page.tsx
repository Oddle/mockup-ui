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
import { Store, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define common availability options
const availabilityOptions = [
  {
    value: "available",
    label: "Available",
    description: "In stock here",
  },
  {
    value: "today",
    label: "Out for Today",
    description: "Out of store here for today",
  },
  {
    value: "indefinite",
    label: "Off the menu",
    description: "Permanently out of stock here",
  },
];

// Define category-specific availability options
const categoryAvailabilityOptions = [
  {
    value: "available",
    label: "Available",
    description: "All items are in stock here",
  },
  {
    value: "today",
    label: "Out for Today",
    description: "All items are out of stock for today.",
  },
  {
    value: "indefinite",
    label: "Off the menu",
    description: "All items are permanently out of stock."
  },
];

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

// Add types for availability
type AvailabilityStatus = "available" | "out_for_today" | "off_menu" | "out_for_four_hours";
type DateKey = "today" | "today_4hours" | "today_5hours" | "tomorrow" | "next_week";
type ItemAvailability = Record<string, AvailabilityStatus>;
type ItemAvailabilityByDate = Record<DateKey, ItemAvailability>;

export default function ItemAvailabilityDemo() {
  const { toast } = useToast();
  const [isPaused, setIsPaused] = useState(false);
  const [pauseType, setPauseType] = useState<"today" | "indefinite">("today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<"available" | "today" | "indefinite" | "four_hours">("available");
  const [segmentedStatus, setSegmentedStatus] = useState<"available" | "today" | "indefinite">("available");
  const [selectedDate, setSelectedDate] = useState<DateKey>("today");
  // Add new state for category and item statuses
  const [categoryStatus, setCategoryStatus] = useState<"available" | "today" | "indefinite">("available");
  const [itemStatuses, setItemStatuses] = useState<Record<string, "available" | "today" | "indefinite">>({
    "nasi-goreng": "available",
    "mee-goreng": "available"
  });

  // Add new state for category dialog
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  // Add new state for item dialogs
  const [isNasiDialogOpen, setIsNasiDialogOpen] = useState(false);
  const [isMeeDialogOpen, setIsMeeDialogOpen] = useState(false);

  // Add function to handle category status change
  const handleCategoryStatusChange = (status: "available" | "today" | "indefinite") => {
    setCategoryStatus(status);
    // Propagate status to all items in the category
    setItemStatuses({
      "nasi-goreng": status,
      "mee-goreng": status
    });
    // Close the dialog after selection
    setIsCategoryDialogOpen(false);
  };

  // Add function to handle individual item status change
  const handleItemStatusChange = (itemId: string, status: "available" | "today" | "indefinite") => {
    // Only allow item status changes if category is available
    if (categoryStatus !== "available") {
      toast({
        title: "Cannot modify item",
        description: `This item cannot be modified because the category &quot;${getStatusText(categoryStatus)}&quot; is set. Please change the category status to &quot;Available&quot; to modify individual items.`,
        variant: "destructive",
      });
      return;
    }
    setItemStatuses(prev => ({
      ...prev,
      [itemId]: status
    }));
  };

  // Add function to get status color
  const getStatusColor = (status: "available" | "today" | "indefinite") => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "today":
        return "bg-yellow-500";
      case "indefinite":
        return "bg-red-500";
    }
  };

  // Add function to get status text
  const getStatusText = (status: "available" | "today" | "indefinite") => {
    switch (status) {
      case "available":
        return "Available";
      case "today":
        return "Out for Today";
      case "indefinite":
        return "Off the menu";
    }
  };

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

  // Add new types for store availability
  type ItemStatus = "available" | "today" | "indefinite";
  type StoreStatuses = Record<string, Record<string, ItemStatus>>;

  // Mock data for stores
  const stores = [
    { id: "tampines", name: "Tampines Mall" },
    { id: "jurong", name: "Jurong Point" },
    { id: "nex", name: "NEX" },
    { id: "vivocity", name: "VivoCity" },
    { id: "jewel", name: "Jewel Changi" },
    { id: "suntec", name: "Suntec City" },
    { id: "marina", name: "Marina Square" },
    { id: "orchard", name: "ION Orchard" },
    { id: "somerset", name: "313@Somerset" },
    { id: "bishan", name: "Junction 8" },
    { id: "amk", name: "AMK Hub" },
    { id: "clementi", name: "Clementi Mall" },
    { id: "westgate", name: "Westgate" },
    { id: "parkway", name: "Parkway Parade" },
    { id: "compass", name: "Compass One" },
    { id: "causeway", name: "Causeway Point" },
    { id: "northpoint", name: "Northpoint City" },
    { id: "waterway", name: "Waterway Point" },
    { id: "plaza", name: "Plaza Singapura" },
    { id: "raffles", name: "Raffles City" }
  ];

  // Add new state for store availability
  const [selectedItemForStock, setSelectedItemForStock] = useState<string | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [storeEditStates, setStoreEditStates] = useState<Record<string, boolean>>({});
  const [storeStatuses, setStoreStatuses] = useState<StoreStatuses>({});

  // Add new functions for store availability
  const handleStockChange = (storeId: string, itemId: string, status: ItemStatus) => {
    setStoreStatuses(prev => ({
      ...prev,
      [storeId]: {
        ...(prev[storeId] || {}),
        [itemId]: status
      }
    }));
    setStoreEditStates(prev => ({ ...prev, [storeId]: false }));
  };

  const getStoreItemStatus = (itemId: string, storeId: string): ItemStatus => {
    return storeStatuses[storeId]?.[itemId] || "available";
  };

  // Mock data for item availability by date
  const itemAvailabilityByDate: ItemAvailabilityByDate = {
    today: {
      "阿元香草鸡": "available",
      "咖喱鸡": "out_for_today",
      "沙爹": "out_for_four_hours",
      "炸鸡翅": "off_menu"
    },
    today_4hours: {
      "阿元香草鸡": "available",
      "咖喱鸡": "out_for_today",
      "沙爹": "out_for_today",
      "炸鸡翅": "off_menu"
    },
    today_5hours: {
      "阿元香草鸡": "available",
      "咖喱鸡": "out_for_today",
      "沙爹": "available",
      "炸鸡翅": "off_menu"
    },
    tomorrow: {
      "阿元香草鸡": "available",
      "咖喱鸡": "available",
      "沙爹": "available",
      "炸鸡翅": "off_menu"
    },
    next_week: {
      "阿元香草鸡": "available",
      "咖喱鸡": "available",
      "沙爹": "available",
      "炸鸡翅": "off_menu"
    }
  };

  // Add state for managing item availability
  const itemAvailability = itemAvailabilityByDate;

  // Add state for visibility settings
  const [showOnOddleShop, setShowOnOddleShop] = useState(true);
  const [showOnRegister, setShowOnRegister] = useState(true);

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
                      {availabilityOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-3 rounded-lg border p-3">
                          <RadioGroupItem value={option.value} id={`modal-${option.value}`} />
                          <Label htmlFor={`modal-${option.value}`} className="flex-1">
                            <span className="font-medium">{option.label}</span>
                            <span className="block text-xs text-muted-foreground">{option.description}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          {/* Category Section */}
          <Separator className="my-8" />

          {/* Menu Management Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Category with Nested Items</div>
            </div>
          </section>

          <Card className="p-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium">Main Course</h3>
                </div>
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
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
                      <div className={cn("w-2 h-2 rounded-full", getStatusColor(categoryStatus))} />
                      <span>{getStatusText(categoryStatus)}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category Availability - Main Course</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <RadioGroup
                        value={categoryStatus}
                        onValueChange={(value) => {
                          handleCategoryStatusChange(value as "available" | "today" | "indefinite");
                          // Close the dialog after selection
                          const dialog = document.querySelector('[role="dialog"]');
                          if (dialog) {
                            (dialog as HTMLElement).click();
                          }
                        }}
                        className="space-y-2"
                      >
                        {categoryAvailabilityOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-3 rounded-lg border p-3">
                            <RadioGroupItem value={option.value} id={`category-${option.value}`} />
                            <Label htmlFor={`category-${option.value}`} className="flex-1">
                              <span className="font-medium">{option.label}</span>
                              <span className="block text-xs text-muted-foreground">{option.description}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Category Items */}
              <div className="space-y-2 pl-4 border-l-2 border-muted">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">Nasi Goreng</h3>
                  </div>
                  <Dialog open={isNasiDialogOpen} onOpenChange={setIsNasiDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "h-8 px-3",
                          "hover:bg-muted",
                          "flex items-center gap-2",
                          categoryStatus !== "available" && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={categoryStatus !== "available"}
                      >
                        <div className={cn("w-2 h-2 rounded-full", getStatusColor(itemStatuses["nasi-goreng"]))} />
                        <span>{getStatusText(itemStatuses["nasi-goreng"])}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Availability - Nasi Goreng</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <RadioGroup
                          value={itemStatuses["nasi-goreng"]}
                          onValueChange={(value) => {
                            handleItemStatusChange("nasi-goreng", value as "available" | "today" | "indefinite");
                            setIsNasiDialogOpen(false);
                          }}
                          className="space-y-2"
                        >
                          {availabilityOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3 rounded-lg border p-3">
                              <RadioGroupItem value={option.value} id={`nasi-${option.value}`} />
                              <Label htmlFor={`nasi-${option.value}`} className="flex-1">
                                <span className="font-medium">{option.label}</span>
                                <span className="block text-xs text-muted-foreground">{option.description}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">Mee Goreng</h3>
                  </div>
                  <Dialog open={isMeeDialogOpen} onOpenChange={setIsMeeDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className={cn(
                          "h-8 px-3",
                          "hover:bg-muted",
                          "flex items-center gap-2",
                          categoryStatus !== "available" && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={categoryStatus !== "available"}
                      >
                        <div className={cn("w-2 h-2 rounded-full", getStatusColor(itemStatuses["mee-goreng"]))} />
                        <span>{getStatusText(itemStatuses["mee-goreng"])}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Availability - Mee Goreng</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <RadioGroup
                          value={itemStatuses["mee-goreng"]}
                          onValueChange={(value) => {
                            handleItemStatusChange("mee-goreng", value as "available" | "today" | "indefinite");
                            setIsMeeDialogOpen(false);
                          }}
                          className="space-y-2"
                        >
                          {availabilityOptions.map((option) => (
                            <div key={option.value} className="flex items-center space-x-3 rounded-lg border p-3">
                              <RadioGroupItem value={option.value} id={`mee-${option.value}`} />
                              <Label htmlFor={`mee-${option.value}`} className="flex-1">
                                <span className="font-medium">{option.label}</span>
                                <span className="block text-xs text-muted-foreground">{option.description}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
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
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Items</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <Card key={item.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedItemForStock(item.id);
                                setIsStockModalOpen(true);
                              }}
                              className="h-8 w-8 p-0"
                            >
                              <Store className="h-4 w-4" />
                              <span className="sr-only">Store Availability</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit Item</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
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

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Shop View</h2>
            <p className="text-gray-500">View and manage item availability for a specific date</p>
          </div>
          <Badge variant="outline" className="h-7">New</Badge>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <Select value={selectedDate} onValueChange={(value: DateKey) => setSelectedDate(value)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">
                Today ({new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })})
              </SelectItem>
              <SelectItem value="today_4hours">
                Today (4 hours later - {new Date(Date.now() + 4 * 60 * 60 * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })})
              </SelectItem>
              <SelectItem value="today_5hours">
                Today (5 hours later - {new Date(Date.now() + 5 * 60 * 60 * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })})
              </SelectItem>
              <SelectItem value="tomorrow">
                Tomorrow ({new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })})
              </SelectItem>
              <SelectItem value="next_week">
                Next Week ({new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            {Object.entries(itemAvailability[selectedDate]).map(([itemName, status]) => (
              <div key={itemName}>
                <Card className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs">
                      Image
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{itemName}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {itemName === "阿元香草鸡" && "Item is always Available"}
                        {itemName === "咖喱鸡" && "Item is turned off for the day"}
                        {itemName === "沙爹" && "Item is turned off for the next 4 hours"}
                        {itemName === "炸鸡翅" && "Item is off the menu"}
                      </p>
                      <p className="font-medium">$14.00</p>
                      <Button
                        size="sm"
                        className="mt-2"
                        disabled={status !== "available"}
                      >
                        {status === "available" ? "Add" :
                          status === "out_for_today" ? "Out of Stock Today" :
                            status === "out_for_four_hours" ? `Out until ${new Date(Date.now() + 4 * 60 * 60 * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}` :
                              "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Store Stock Availability Modal */}
      <Dialog open={isStockModalOpen} onOpenChange={setIsStockModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl">Item Availability</DialogTitle>
          </DialogHeader>

          {/* Main Content with Scroll */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-6">
              {/* Visibility Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Visibility on Menu</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="modal-oddle-shop" className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      Show item on Oddle Shop
                    </Label>
                    <Switch
                      id="modal-oddle-shop"
                      checked={showOnOddleShop}
                      onCheckedChange={setShowOnOddleShop}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="modal-register" className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                        <path d="M4 9C4 7.89543 4.89543 7 6 7H18C19.1046 7 20 7.89543 20 9V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V9Z" stroke="currentColor" strokeWidth="2" />
                        <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Show item on Register
                    </Label>
                    <Switch
                      id="modal-register"
                      checked={showOnRegister}
                      onCheckedChange={setShowOnRegister}
                    />
                  </div>
                  {showOnOddleShop && showOnRegister && (
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                      The item will be shown on both Oddle Shop and Register.
                    </p>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Store Availability Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Availability at Stores</h2>
                <div className="grid grid-cols-2 gap-3">
                  {stores.map((store) => {
                    const currentStatus = getStoreItemStatus(selectedItemForStock || '', store.id);
                    const statusConfig = {
                      available: { color: "bg-green-500", text: "Available" },
                      today: { color: "bg-yellow-500", text: "Out for Today" },
                      indefinite: { color: "bg-red-500", text: "Off the Menu" }
                    };

                    return (
                      <div key={store.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="font-medium text-sm truncate mr-2">{store.name}</div>
                        <Dialog
                          open={storeEditStates[store.id]}
                          onOpenChange={(open) => setStoreEditStates(prev => ({ ...prev, [store.id]: open }))}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-muted h-7 px-2 min-w-[120px] justify-between"
                            >
                              <div className={`w-2 h-2 rounded-full ${statusConfig[currentStatus].color}`} />
                              <span className="text-xs">{statusConfig[currentStatus].text}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit Store Availability</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <RadioGroup
                                value={currentStatus}
                                onValueChange={(value) => {
                                  handleStockChange(store.id, selectedItemForStock || '', value as ItemStatus);
                                }}
                                className="space-y-2"
                              >
                                {availabilityOptions.map((option) => (
                                  <div key={option.value} className="flex items-center space-x-3 rounded-lg border p-3">
                                    <RadioGroupItem value={option.value} id={`${store.id}-${selectedItemForStock}-${option.value}`} />
                                    <Label htmlFor={`${store.id}-${selectedItemForStock}-${option.value}`} className="flex-1">
                                      <span className="font-medium">{option.label}</span>
                                      <span className="block text-xs text-muted-foreground">{option.description}</span>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 