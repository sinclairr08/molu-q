"use client";

import { useEffect, useState } from "react";

const RecruitPage: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [curRecruitType, setCurRecruitType] = useState("");
  const recruitTypes = ["상시", "픽업"];

  useEffect(() => {
    setCards(
      Array.from({ length: 10 }, () => Math.floor(Math.random() * 3) + 1)
    );
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 mt-16">
      <div className="flex space-x-4">
        {recruitTypes.map((recruitType) => (
          <button
            key={recruitType}
            className={`border-2 border-gray-400 p-2 rounded-md h-16 text-xs ${recruitType === curRecruitType ? "bg-yellow-200" : ""}`}
            onClick={() => setCurRecruitType(recruitType)}
          >
            <div>{recruitType} 모집</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5">
        {cards.map((card, i) => (
          <div
            key={i}
            className="text-center text-xs m-2 border-gray-400 border-2"
          >
            {"★".repeat(card)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitPage;
