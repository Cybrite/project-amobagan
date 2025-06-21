interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

const StepIndicator = ({
  currentStep,
  totalSteps = 4,
  onBack,
}: StepIndicatorProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="relative flex items-center justify-center mb-8">
      {onBack && currentStep > 1 && (
        <button
          onClick={onBack}
          className="absolute left-0 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Go back to previous step"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      <div className="relative w-full max-w-80 h-3" style={{ backgroundColor: "#FBFFFC" }}>
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
