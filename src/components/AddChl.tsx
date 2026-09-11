"use client";

import * as React from "react";
import { format } from "date-fns";
import { ChevronDownIcon, Plus } from "lucide-react";
import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const PRESET_COLORS = [
  "#6366f1",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

export default function AddChallenge() {
  const [taskName, setTaskName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#6366f1");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string>(() => {
    return new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  });
  const isCustomColor = !PRESET_COLORS.includes(selectedColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim()) return;

    const finalDate = date ? new Date(date) : new Date();
    if (time) {
      const [hours, minutes] = time.split(":").map(Number);
      finalDate.setHours(hours || 0, minutes || 0, 0, 0);
    }

    const newChallenge = {
      id: Date.now(),
      name: taskName,
      color: selectedColor,
      date: finalDate.toISOString(),
    };

    const existing = localStorage.getItem("challenges");
    const currentChallenges = existing ? JSON.parse(existing) : [];
    const updatedChallenges = [...currentChallenges, newChallenge];

    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));

    setTaskName("");
    setDialogOpen(false);
    window.dispatchEvent(new Event("challengesUpdated"));
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Button
          size="lg"
          className="fixed cursor-pointer bottom-6 right-4 rounded-full shadow-lg font-min hover:rotate-12 transition-transform"
        >
          <Plus className="mr-1 h-5 w-5" /> Add Challenge
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-serif">
            Add New Challenge
          </DialogTitle>
          <DialogDescription>
            Set a name, color and target date for your new challenge.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <h2 className="text-sm font-medium">Task name</h2>
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="stop social media or etc..."
              required
            />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-sm font-medium">Color</h2>
            <div className="flex items-center gap-3">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`h-8 w-8 rounded-full border-2 transition-all ${
                    selectedColor === color
                      ? "border-foreground scale-110"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                />
              ))}

              <label
                className={`relative flex h-8 w-8 items-center justify-center rounded-full border border-border text-xs cursor-pointer transition-all ${
                  isCustomColor
                    ? "ring-2 ring-foreground scale-110"
                    : "bg-accent hover:bg-accent/70"
                }`}
                style={{
                  backgroundColor: isCustomColor ? selectedColor : undefined,
                }}
              >
                {!isCustomColor && "+"}
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>
          </div>

          <FieldGroup className="mx-auto mt-6 flex gap-4">
            <Field className="w-full flex flex-col gap-1.5">
              <FieldLabel htmlFor="date-picker-optional" className="text-sm">
                Date
              </FieldLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    id="date-picker-optional"
                    className="w-full justify-between font-normal"
                  >
                    {date ? format(date, "PPP") : "Select date"}
                    <ChevronDownIcon className="h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    defaultMonth={date}
                    onSelect={(d) => {
                      setDate(d);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>

            <Field className="flex flex-col gap-1.5">
              <FieldLabel htmlFor="time-picker-optional" className="text-sm">
                Time
              </FieldLabel>
              <Input
                type="time"
                id="time-picker-optional"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="appearance-none w-fit bg-background [&::-webkit-calendar-picker-indicator]:hidden"
              />
            </Field>
          </FieldGroup>

          <Button type="submit" className="w-full">
            Add Challenge
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
