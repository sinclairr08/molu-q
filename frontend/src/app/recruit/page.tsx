"use client";

import { useState } from "react";

const RecruitPage: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [curRecruitType, setCurRecruitType] = useState("");
  const recruitTypes = ["상시", "픽업"];

  const doRecruit = () => {
    setCards(
      Array.from({ length: 10 }, () => Math.floor(Math.random() * 3) + 1)
    );
  };

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

      <div className="flex justify-center space-x-4">
        <button
          className="p-2 bg-cyan-400 rounded-md font-bold text-xs"
          onClick={doRecruit}
        >
          모집 하기
        </button>
      </div>
    </div>
  );
};

export default RecruitPage;
