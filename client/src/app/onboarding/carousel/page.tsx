"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const cardVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: 0.2,
    },
  },
};

const progressBarVariants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
};

const imageVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.1,
    },
  },
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 },
  },
};

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
        {" "}
        <Card className="bg-[#F0EDE4] overflow-hidden shadow-xl">
          <CardContent className="p-8 flex flex-col items-center">
            <motion.div
              className="flex w-full justify-between mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {Array.from({ length: carouselItems.length }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 flex-1 mx-1 rounded-full transition-all duration-500 ${
                    currentIndex === index ? "bg-[#004743]" : "bg-gray-300"
                  }`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                />
              ))}
            </motion.div>

            <div className="py-12 px-4 text-center min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {carouselItems.map(
                  (item, index) =>
                    currentIndex === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.9 }}
                        transition={{
                          duration: 0.5,
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                        }}
                        className="w-full"
                      >
                        <motion.div
                          className="flex justify-center mb-8"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                            delay: 0.2,
                          }}
                        >
                          <div className="relative">
                            <motion.div
                              className="absolute inset-0 bg-[#004743]/10 rounded-full"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={96}
                              height={96}
                              className="w-24 h-24 relative z-10"
                            />
                          </div>
                        </motion.div>

                        <motion.h2
                          className="text-3xl font-bold mb-6 text-[#004743]"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          {item.title}
                        </motion.h2>

                        <motion.p
                          className="text-gray-600 text-lg leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          {item.description}
                        </motion.p>
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>

            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleContinue}
                  className="w-full mt-4 bg-[#004743] hover:bg-[#003a37] text-white font-medium py-6 text-xl rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Continue
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
