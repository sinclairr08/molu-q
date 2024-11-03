"use client";

import { useFetchData } from "@/lib/fetch";
import axios from "axios";
import { useEffect, useState } from "react";

interface IRecruit {
  name: string;
  star: number;
  prob: number;
}

interface ICurrentRecruit {
  name: string;
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

const RecruitButton = ({ label, onClick }: { label: string; onClick: any }) => (
  <button
    className="p-2 bg-cyan-400 rounded-md font-bold text-xs"
    onClick={onClick}
  >
    {label}
  </button>
);

const RecruitPage: React.FC = () => {
  const [cardProbs, setCardProbs] = useState<IRecruitAPIResponse>(defaultState);
  const [cards, setCards] = useState<IRecruit[]>([]);
  const [curRecruitType, setCurRecruitType] = useState("");
  const [cur3Point, setCur3Point] = useState<number | null>(null);
  const [recruitPoint, setRecruitPoint] = useState(0);
  const [recruitTypes, setRecruitTypes] = useState<string[]>(["상시 모집"]);
  const [recruitProbs, setRecruitProbs] = useState<IRecruitAPIResponse[]>([]);

  const normalProbs = useFetchData<IRecruitAPIResponse>(
    "/api/v0/recruit",
    defaultState
  );

  const pickUpCharacters = useFetchData<ICurrentRecruit[]>(
    `/api/v0/recruit/pickup/current`,
    []
  );

  useEffect(() => {
    if (normalProbs.normal.length > 0 && recruitProbs.length === 0) {
      setRecruitProbs([normalProbs]);
    }
  }, [normalProbs]);

  useEffect(() => {
    if (!Array.isArray(pickUpCharacters) || pickUpCharacters.length === 0) {
      return;
    }

    const fetchAllPickUps = async () => {
      const pickUpProbs = await Promise.all(
        pickUpCharacters.map((character) =>
          axios
            .get(`/api/v0/recruit/pickup/${character.name}`)
            .then((res) => res.data)
        )
      );

      setRecruitProbs((prev) => [...prev, ...pickUpProbs]);
    };

    fetchAllPickUps();
    setRecruitTypes((prev) => [
      ...prev,
      ...pickUpCharacters.map((x) => `${x.name} 픽업 모집`)
    ]);
  }, [pickUpCharacters]);

  const updateRecruitType = (idx: number) => {
    setCurRecruitType(recruitTypes[idx]);
    setCardProbs(recruitProbs[idx]);
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
        {recruitTypes.map((recruitType, idx) => (
          <button
            key={recruitType}
            className={`border-2 border-gray-400 p-2 rounded-md h-16 text-xs ${recruitType === curRecruitType ? "bg-yellow-200" : ""}`}
            onClick={() => updateRecruitType(idx)}
          >
            <div>{recruitType}</div>
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
        <RecruitButton onClick={doRecruit} label="모집 하기" />
        <RecruitButton onClick={repeatRecruit} label="뽑을 때 까지 모집 하기" />
        <RecruitButton
          onClick={() => repeatTimesRecruit(200)}
          label="200연 모집 하기"
        />
        <RecruitButton onClick={resetRecruit} label="초기화" />
      </div>
      <div>모집 포인트: {recruitPoint}</div>
      {cur3Point && <div>획득한 3성의 갯수: {cur3Point}</div>}
    </div>
  );
};

export default RecruitPage;
