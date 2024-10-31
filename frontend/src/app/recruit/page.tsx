"use client";

import { useFetchData } from "@/lib/fetch";
import { useState } from "react";

interface IRecruit {
  name: string;
  star: number;
  prob: number;
}

interface IRecruitAPIResponse {
  normal: IRecruit[];
  final: IRecruit[];
}

const recruitFromData = ({ normal, final }: IRecruitAPIResponse) => {
  const result = [];
  const probs: IRecruit[][] = [...Array(9).fill(normal), final];

  for (let i = 0; i < 10; i++) {
    const curProb = Math.random();
    let idx = 0;
    while (curProb > probs[i][idx].prob) {
      idx++;
    }
    result.push(probs[i][idx]);
  }
  return result;
};

const defaultState: IRecruitAPIResponse = {
  normal: [],
  final: []
};

const RecruitPage: React.FC = () => {
  const [cardProbs, setCardProbs] = useState<IRecruitAPIResponse>(defaultState);
  const [cards, setCards] = useState<IRecruit[]>([]);
  const [curRecruitType, setCurRecruitType] = useState("");
  const [cur3Point, setCur3Point] = useState<number | null>(null);
  const [recruitPoint, setRecruitPoint] = useState(0);

  const recruitTypes = ["상시", "픽업"];
  const pickUpCharacter = "마리(아이돌)";

  const normalProbs = useFetchData<IRecruitAPIResponse>(
    "/api/v0/recruit",
    defaultState
  );
  const pickUpProbs = useFetchData<IRecruitAPIResponse>(
    `/api/v0/recruit/pickup/${pickUpCharacter}`,
    defaultState
  );

  const updateRecruitType = (recruitType: string) => {
    setCurRecruitType(recruitType);
    setCardProbs(recruitType === "픽업" ? pickUpProbs : normalProbs);
  };

  const doRecruit = () => {
    if (cardProbs.normal.length === 0) {
      return;
    }
    setCur3Point(null);
    setCards(recruitFromData(cardProbs));
    setRecruitPoint((prev) => prev + 10);
  };

  const resetRecruit = () => {
    setCards([]);
    setRecruitPoint(0);
    setCur3Point(null);
  };

  const repeatRecruit = () => {
    if (cardProbs.normal.length === 0) {
      return;
    }
    setCur3Point(null);
    recruitLoop(0);
  };

  const repeatTimesRecruit = (totalPoint: number) => {
    if (cardProbs.normal.length === 0) {
      return;
    }
    setCur3Point(0);
    recruitTimesLoop(0, totalPoint);
  };

  const recruitLoop = (currentPoint: number) => {
    const newCards = recruitFromData(cardProbs);
    const newPoint = currentPoint + 10;

    setCards(newCards);
    setRecruitPoint(newPoint);

    if (newCards.every((card) => card.star !== 3) && newPoint < 200) {
      setTimeout(() => recruitLoop(newPoint), 100);
    }
  };

  const recruitTimesLoop = (currentPoint: number, totalPoint: number) => {
    const newCards = recruitFromData(cardProbs);
    const newPoint = currentPoint + 10;

    setCards(newCards);
    setRecruitPoint(newPoint);

    const count = newCards.filter((card) => card.star === 3).length;
    setCur3Point((prev) => (prev ? prev + count : count));

    if (newPoint < totalPoint) {
      setTimeout(() => recruitLoop(newPoint), 100);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-16">
      <div className="flex space-x-4">
        {recruitTypes.map((recruitType) => (
          <button
            key={recruitType}
            className={`border-2 border-gray-400 p-2 rounded-md h-16 text-xs ${recruitType === curRecruitType ? "bg-yellow-200" : ""}`}
            onClick={() => updateRecruitType(recruitType)}
          >
            <div>
              {recruitType === "픽업" && pickUpCharacter} {recruitType} 모집
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`text-center text-xs m-2 border-gray-400 p-2`}
          >
            <img src={`/FX_TEX_GT_${card.star}.png`} className="w-12 h-12" />
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
        <button
          className="p-2 bg-cyan-400 rounded-md font-bold text-xs"
          onClick={repeatRecruit}
        >
          뽑을 때 까지 모집 하기
        </button>
        <button
          className="p-2 bg-cyan-400 rounded-md font-bold text-xs"
          onClick={() => repeatTimesRecruit(200)}
        >
          200연 모집 하기
        </button>
        <button
          className="p-2 bg-cyan-400 rounded-md font-bold text-xs"
          onClick={resetRecruit}
        >
          초기화
        </button>
      </div>
      <div>모집 포인트: {recruitPoint}</div>
      {cur3Point && <div>획득한 3성의 갯수: {cur3Point}</div>}
    </div>
  );
};

export default RecruitPage;
