"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";

const carouselItems = [
  {
    title: "Scan & Learn",
    description:
      "Quickly scan any product barcode to instantly see its nutritional value and health impact",
    image:
      "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1750475065/scan_icon_nryb5e.png",
  },
  {
    title: "Personalized Insights",
    description:
      "Get recommendations tailored to your specific health goals and dietary preferences",
    image:
      "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1750475065/insights_icon_fkc8se.png",
  },
  {
    title: "Make Better Choices",
    description:
      "Compare alternatives and find healthier options that match your nutrition priorities",
    image:
      "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1750475065/choices_icon_vyh8fw.png",
  },
];

export default function CarouselPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleContinue = () => {
    router.push("/onboarding/user-details");
  };

  return (
    <div className="min-h-screen bg-[#F5F3F0] flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-[#F0EDE4]">
          <CardContent className="p-8 flex flex-col items-center">
            <div className="flex w-full justify-between mb-2">
              {Array.from({ length: carouselItems.length }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 mx-1 rounded-full ${
                    currentIndex === index ? "bg-[#004743]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="py-12 px-4 text-center">
              {carouselItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`${currentIndex === index ? "block" : "hidden"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    y: currentIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center mb-6">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={96}
                      height={96}
                      className="w-24 h-24"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                onClick={handleContinue}
                className="w-full mt-4 bg-[#004743] text-white font-medium py-6 text-xl rounded-lg transition-colors duration-300 shadow-sm"
              >
                Continue
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
