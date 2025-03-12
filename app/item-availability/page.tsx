"use client";

import { ItemAvailabilityToggle } from "@/components/ui/item-availability-toggle";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseType, setPauseType] = useState<"today" | "indefinite">("today");
  
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
        {/* Option 1: Right-aligned Controls */}
        <section>
          <h2 className="text-lg font-semibold mb-3">1. Right-aligned Controls</h2>
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">Chicken Rice</h3>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <Switch
                    id="availability-toggle-1"
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
                  {isPaused && (
                    <Badge 
                      variant="outline"
                      className="cursor-pointer active:bg-secondary/80 transition-colors flex items-center gap-1.5 py-1 px-3"
                      onClick={togglePauseType}
                    >
                      {pauseType === "today" ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                          <span>Back Tomorrow</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-red-500" />
                          <span>Paused Indefinitely</span>
                        </>
                      )}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Option 2: Button Style */}
        <section>
          <h2 className="text-lg font-semibold mb-3">2. Button Style</h2>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Chicken Rice</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={togglePauseType}
                >
                  {pauseType === "today" ? (
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      Resumes Tomorrow
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      Paused
                    </span>
                  )}
                </Button>
              </div>
              <Switch
                id="availability-toggle-2"
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
          </Card>
        </section>

        {/* Option 3: Status Pill */}
        <section>
          <h2 className="text-lg font-semibold mb-3">3. Status Pill</h2>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Chicken Rice</h3>
                {isPaused && (
                  <div 
                    className="rounded-full px-3 py-0.5 text-xs font-medium cursor-pointer active:opacity-80 transition-opacity flex items-center gap-1.5"
                    onClick={togglePauseType}
                    style={{
                      backgroundColor: pauseType === "today" ? "rgb(253 224 71 / 0.2)" : "rgb(252 165 165 / 0.2)",
                      color: pauseType === "today" ? "rgb(161 98 7)" : "rgb(153 27 27)"
                    }}
                  >
                    {pauseType === "today" ? "Back Tomorrow" : "Unavailable"}
                  </div>
                )}
              </div>
              <Switch
                id="availability-toggle-3"
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
          </Card>
        </section>

        {/* Option 4: Two-State Toggle */}
        <section>
          <h2 className="text-lg font-semibold mb-3">4. Two-State Toggle</h2>
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">Chicken Rice</h3>
                {isPaused && (
                  <div className="flex rounded-md overflow-hidden text-xs border">
                    <button
                      className={cn(
                        "px-2 py-1 transition-colors",
                        pauseType === "today"
                          ? "bg-yellow-50 text-yellow-700 border-r"
                          : "bg-white text-muted-foreground hover:bg-muted"
                      )}
                      onClick={() => {
                        if (pauseType !== "today") {
                          setPauseType("today");
                          handleAvailabilityChange("Chicken Rice", false, "today");
                        }
                      }}
                    >
                      Today
                    </button>
                    <button
                      className={cn(
                        "px-2 py-1 transition-colors",
                        pauseType === "indefinite"
                          ? "bg-red-50 text-red-700"
                          : "bg-white text-muted-foreground hover:bg-muted"
                      )}
                      onClick={() => {
                        if (pauseType !== "indefinite") {
                          setPauseType("indefinite");
                          handleAvailabilityChange("Chicken Rice", false, "indefinite");
                        }
                      }}
                    >
                      Indefinite
                    </button>
                  </div>
                )}
              </div>
              <Switch
                id="availability-toggle-4"
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

        {/* Button Group Pattern - Mobile Optimized */}
        <section>
          <h2 className="text-lg font-semibold mb-3">3. Segmented Control</h2>
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

        {/* Modal Edit Pattern */}
        <section>
          <h2 className="text-lg font-semibold mb-3">4. Modal Edit</h2>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-medium">Roti Prata</h3>
                <Badge variant="secondary" className="text-xs">
                  Available
                </Badge>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Availability - Roti Prata</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between pb-4">
                      <div>
                        <Label htmlFor="modal-toggle">Item Status</Label>
                        <p className="text-sm text-muted-foreground">Set item availability</p>
                      </div>
                      <Switch id="modal-toggle" defaultChecked />
                    </div>
                    <RadioGroup defaultValue="today" className="space-y-2">
                      <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <RadioGroupItem value="today" id="modal-today" />
                        <Label htmlFor="modal-today" className="flex-1">
                          <span className="font-medium">Pause for Today</span>
                          <span className="block text-xs text-muted-foreground">Item will be back tomorrow at 12:00 AM</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 rounded-lg border p-3">
                        <RadioGroupItem value="indefinite" id="modal-indefinite" />
                        <Label htmlFor="modal-indefinite" className="flex-1">
                          <span className="font-medium">Pause Indefinitely</span>
                          <span className="block text-xs text-muted-foreground">Item stays unavailable until you reactivate it</span>
                        </Label>
                      </div>
                    </RadioGroup>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsModalOpen(false)}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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