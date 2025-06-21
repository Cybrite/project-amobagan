interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps = 4 }: StepIndicatorProps) => (
  <div className="flex items-center justify-center space-x-4 mb-8">
    {Array.from({ length: totalSteps }).map((_, index) => (
      <div key={index} className="flex items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            currentStep >= index + 1
              ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
              : "bg-white/10 text-gray-400 border border-white/20"
          }`}
        >
          {index + 1}
        </div>
        {index < totalSteps - 1 && (
          <div
            className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
              currentStep > index + 1
                ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                : "bg-white/20"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

export default StepIndicator;
