"use client";

import * as React from "react";
import { Switch } from "./switch";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { cn } from "@/lib/utils";

interface ItemAvailabilityToggleProps {
  defaultAvailable?: boolean;
  onAvailabilityChange?: (isAvailable: boolean, unavailabilityType?: "today" | "indefinite") => void;
  className?: string;
}

export function ItemAvailabilityToggle({
  defaultAvailable = true,
  onAvailabilityChange,
  className,
}: ItemAvailabilityToggleProps) {
  const [isAvailable, setIsAvailable] = React.useState(defaultAvailable);
  const [unavailabilityType, setUnavailabilityType] = React.useState<"today" | "indefinite">("today");

  const handleSwitchChange = (checked: boolean) => {
    setIsAvailable(checked);
    if (checked) {
      onAvailabilityChange?.(true);
    } else {
      onAvailabilityChange?.(false, unavailabilityType);
    }
  };

  const handleRadioChange = (value: "today" | "indefinite") => {
    setUnavailabilityType(value);
    onAvailabilityChange?.(false, value);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor="availability-toggle" className="text-sm font-medium">
          Item Availability
        </Label>
        <Switch
          id="availability-toggle"
          checked={isAvailable}
          onCheckedChange={handleSwitchChange}
        />
      </div>

      {!isAvailable && (
        <div className="animate-in slide-in-from-top duration-200 ease-in-out">
          <RadioGroup
            value={unavailabilityType}
            onValueChange={handleRadioChange}
            className="space-y-3 rounded-md border p-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="today" id="today" />
              <Label htmlFor="today" className="font-normal">
                Unavailable Today Only
                <span className="block text-sm text-muted-foreground">
                  Item will be available for future orders
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="indefinite" id="indefinite" />
              <Label htmlFor="indefinite" className="font-normal">
                Unavailable Indefinitely
                <span className="block text-sm text-muted-foreground">
                  Item will be hidden from all orders until re-enabled
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      )}

      <div className="text-sm text-muted-foreground">
        {isAvailable ? (
          <p>This item is currently available for all orders</p>
        ) : (
          <p>
            This item is {unavailabilityType === "today" ? "temporarily" : "indefinitely"} unavailable
            {unavailabilityType === "today" && " (until end of day)"}
          </p>
        )}
      </div>
    </div>
  );
} 