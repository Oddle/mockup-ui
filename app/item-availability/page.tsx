"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function ItemAvailabilityDemo() {
  const [isPaused, setIsPaused] = useState(false);
  const [pauseType, setPauseType] = useState<"today" | "indefinite">("today");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<"available" | "today" | "indefinite" | "four_hours">("available");
  
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

      <Separator className="my-8" />

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Proposed New Patterns</h2>
          <Badge variant="outline" className="text-xs">New</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Enhanced controls with timeframe options
        </p>
      </div>

      <div className="space-y-6">
        {/* Modal Edit Pattern */}
        <section>
          <h2 className="text-lg font-semibold mb-3">1. Modal</h2>
          <p className="text-sm text-muted-foreground mb-3">Inspired by Deliveroo's availability controls</p>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">Roti Prata</h3>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
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
                      {modalStatus === "four_hours" && "Out for 4 Hours"}
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
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Available</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="today">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Paused Today</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="indefinite">
                    <div className="flex items-center justify-between gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>Paused</span>
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
                  "data-[state=active]:bg-background data-[state=active]:shadow-sm"
                )}
                data-state="active"
              >
                Available
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 rounded-md"
              >
                Pause Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 rounded-md"
              >
                Pause
              </Button>
            </div>
          </Card>
        </section>

        <div className="mt-8 p-4 bg-muted rounded-lg text-sm">
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
      </div>
    </div>
  );
} 