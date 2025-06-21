interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator = ({ currentStep, totalSteps = 4 }: StepIndicatorProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center justify-center mb-8">
      <div
        className="relative w-60 h-3"
        style={{ backgroundColor: "#FBFFFC" }}
      >
        <div
          className="absolute top-0 left-0 h-full transition-all duration-500 ease-out"
          style={{
            backgroundColor: "#004743",
            width: `${progressPercentage}%`,
          }}
        />
    
        <div
          className="absolute top-1/2 transform -translate-y-1/2 w-2 h-6 rounded-full flex items-center justify-center transition-all duration-500 ease-out"
          style={{
            left: `calc(${progressPercentage}% - 12px)`,
            minWidth: "24px",
          }}
        >
          <img
            src="https://res.cloudinary.com/dqqyuvg1v/image/upload/v1750475065/Vector_ug5wsz.png"
            alt="star"
            className="w-5 h-5"
          />
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
