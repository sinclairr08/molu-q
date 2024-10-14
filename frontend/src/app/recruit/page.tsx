"use client";

import { useState } from "react";

interface IRecruit {
  name: string;
  star: number;
  prob: number;
}

const mockData: IRecruit[] = [
  { name: "요시미", star: 1, prob: 0.785 },
  { name: "아이리", star: 2, prob: 0.97 },
  { name: "나츠", star: 3, prob: 1.0 }
];

const recruitFromData = (data: IRecruit[]) => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    const curProb = Math.random();
    let idx = 0;
    while (curProb > data[idx].prob) {
      idx++;
    }
    result.push(data[idx]);
  }
  return result;
};

const RecruitPage: React.FC = () => {
  const [cards, setCards] = useState<IRecruit[]>([]);
  const [curRecruitType, setCurRecruitType] = useState("");
  const recruitTypes = ["상시", "픽업"];

  const doRecruit = () => {
    setCards(recruitFromData(mockData));
  };

  const getCardStyle = (star: number) => {
    if (star === 1) return "bg-blue-300";
    if (star === 2) return "bg-yellow-300";
    else return "bg-purple-300";
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
            className={`text-center text-xs m-2 border-gray-400 p-2 ${getCardStyle(card.star)}`}
          >
            <span>{card.name}</span>
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
