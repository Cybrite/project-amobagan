"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Heart,
  Check,
  TrendingUp,
  QrCode,
  Home,
  Calendar,
  Clock,
  User,
  Flame,
  BellRing,
} from "lucide-react";
import { useState } from "react";

export default function Component() {
  const [days, setDays] = useState([
    { day: "Sun", date: "11" },
    { day: "Mon", date: "12" },
    { day: "Tue", date: "13" },
    { day: "Wed", date: "14", active: true },
    { day: "Thu", date: "15" },
    { day: "Fri", date: "16" },
    { day: "Sat", date: "17" },
  ]);
  const [goals, setGoals] = useState([
    {
      text: "Swap white rice or bread → millets or whole wheat roti",
      completed: false,
    },
    { text: "Drink soaked methi in the morning", completed: true },
    { text: "Walk for 15 minutes after lunch", completed: true },
  ]);

  const toggleGoal = (index: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal, i) =>
        i === index ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const selectDay = (index: number) => {
    setDays((prevDays) =>
      prevDays.map((day, i) => ({
        ...day,
        active: i === index,
      }))
    );
  };

  return (
    <div className="max-w-sm mx-auto bg-[#F0EDE4] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Hello, Somnath
          </h1>
          <p className="text-sm text-gray-600">Be Healthy!</p>
        </div>
        <div className="flex gap-2">
          <span className="mr-2">
            <Flame />
          </span>
          <span className="mr-2">
            <BellRing />
          </span>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4 mb-4">
        {" "}
        <div className="flex justify-between items-center">
          {days.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">{day.day}</span>
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                  day.active
                    ? "border-2 border-[#004743] bg-white text-gray-900"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }`}
                onClick={() => selectDay(index)}
              >
                {day.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Goal Card */}
      <div className="px-4 mb-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Target className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Current Goal</h3>
                  <p className="text-sm text-gray-600">
                    Focus On Controlling Sugar
                  </p>
                </div>
              </div>
              <Heart className="w-5 h-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {" "}
            <div className="space-y-3">
              {goals.map((goal, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 cursor-pointer ${
                      goal.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 bg-white"
                    }`}
                    onClick={() => toggleGoal(index)}
                  >
                    {goal.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span
                    className={`text-sm ${
                      goal.completed
                        ? "text-gray-500 line-through"
                        : "text-gray-900"
                    }`}
                  >
                    {goal.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm font-medium text-green-600">
                Yah! One more to go!
              </span>
              <Button
                variant="link"
                className="text-blue-600 p-0 h-auto text-sm"
              >
                View more
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nutrition Progress Card */}
      <div className="px-4 mb-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Nutrition Progress
              </h3>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">
                Artificial Sweeteners
              </span>
              <Badge
                variant="destructive"
                className="w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                1
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              <em>{'"You Have eaten 2 items with artificial sweeteners"'}</em>
            </p>
            <Button
              variant="outline"
              className="w-full mb-3 bg-gray-50 text-gray-700 border-gray-200"
            >
              View Suggestion
            </Button>
            <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white">
              <QrCode className="w-4 h-4 mr-2" />
              Scan Barcode
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center py-2">
            <Home className="w-5 h-5 text-gray-900" />
            <span className="text-xs text-gray-900 mt-1">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Meal Planning</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">History</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400 mt-1">Profile</span>
          </div>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
}
