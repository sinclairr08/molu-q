"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

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

const recruitFromData = ({
  normal,
  final
}: IRecruitAPIResponse): IRecruit[] => {
  const result: IRecruit[] = [];

  for (let i = 0; i < 10; i++) {
    const curProb = Math.random();
    const targetProb = i < 9 ? normal : final;
    const targetRecruit =
      targetProb.find((p) => p.prob >= curProb) ??
      targetProb[targetProb.length - 1];
    result.push(targetRecruit);
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

const RecruitCard = ({ card }: { card: IRecruit }) => (
  <div className={`text-center text-xs m-2 border-gray-400 p-2`}>
    <img src={`/FX_TEX_GT_${card.star}.png`} className="w-12 h-12" />
    <span>{card.name}</span>
  </div>
);

const useFetchRecruitData = () => {
  const [recruitProbs, setRecruitProbs] = useState<IRecruitAPIResponse[]>([]);
  const [recruitTypes, setRecruitTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecruitData = async () => {
      try {
        const [normalProbs, pickUpCharacters] = await Promise.all([
          axios
            .get<IRecruitAPIResponse>("/api/v0/recruit")
            .then((res) => res.data),
          axios
            .get<ICurrentRecruit[]>("/api/v0/recruit/pickup/current")
            .then((res) => res.data)
        ]);

        const pickUpProbs: IRecruitAPIResponse[] =
          pickUpCharacters.length > 0
            ? await Promise.all(
                pickUpCharacters.map((character) =>
                  axios
                    .get(`/api/v0/recruit/pickup/${character.name}`)
                    .then((res) => res.data)
                )
              )
            : [];

        setRecruitProbs([normalProbs, ...pickUpProbs]);
        setRecruitTypes([
          "상시 모집",
          ...pickUpCharacters.map((x) => `${x.name} 픽업 모집`)
        ]);
      } catch (error) {
        console.error("Failed to fetch pickup character", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruitData();
  }, []);

  return { recruitProbs, recruitTypes, loading };
};

const RecruitPage: React.FC = () => {
  const [cardProbs, setCardProbs] = useState<IRecruitAPIResponse>(defaultState);
  const [cards, setCards] = useState<IRecruit[]>([]);
  const [curRecruitType, setCurRecruitType] = useState("");
  const [cur3List, setCur3List] = useState<string[]>([]);
  const [recruitPoint, setRecruitPoint] = useState(0);
  const { recruitProbs, recruitTypes, loading } = useFetchRecruitData();

  const updateRecruitType = useCallback(
    (idx: number) => {
      setCurRecruitType(recruitTypes[idx]);
      setCardProbs(recruitProbs[idx]);
    },
    [recruitProbs, recruitTypes]
  );

  const doRecruit = useCallback(() => {
    if (cardProbs.normal.length === 0) {
      return;
    }
    setCur3List([]);
    setCards(recruitFromData(cardProbs));
    setRecruitPoint((prev) => prev + 10);
  }, [cardProbs]);

  const resetRecruit = useCallback(() => {
    setCards([]);
    setRecruitPoint(0);
    setCur3List([]);
  }, []);

  const repeatRecruit = useCallback(
    (totalPoint: number = 200, stopAtStar: boolean = true) => {
      if (cardProbs.normal.length === 0) {
        return;
      }
      setCur3List([]);
      recruitLoop(0, totalPoint, stopAtStar);
    },
    [cardProbs]
  );

  const recruitLoop = (
    currentPoint: number,
    totalPoint: number,
    stopAtStar: boolean
  ) => {
    const newCards = recruitFromData(cardProbs);
    const newPoint = currentPoint + 10;

    setCards(newCards);
    setRecruitPoint(newPoint);

    if (!stopAtStar) {
      const new3List = newCards
        .filter((card) => card.star === 3)
        .map((card) => card.name);
      setCur3List((prev) => [...prev, ...new3List]);
    }

    const hasNoStar3 = newCards.every((card) => card.star !== 3);
    const hasRemainingPoint = newPoint < totalPoint;
    const shouldContinue = stopAtStar
      ? hasNoStar3 && hasRemainingPoint
      : hasRemainingPoint;

    if (shouldContinue) {
      setTimeout(() => recruitLoop(newPoint, totalPoint, stopAtStar), 100);
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

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
          <RecruitCard key={i} card={card} />
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <RecruitButton onClick={doRecruit} label="모집 하기" />
        <RecruitButton
          onClick={() => repeatRecruit(200, true)}
          label="뽑을 때 까지 모집 하기"
        />
        <RecruitButton
          onClick={() => repeatRecruit(200, false)}
          label="200연 모집 하기"
        />
        <RecruitButton onClick={resetRecruit} label="초기화" />
      </div>
      <div>모집 포인트: {recruitPoint}</div>
      {cur3List.length > 0 && (
        <>
          <div>획득한 3성: {cur3List.length}</div>
          {cur3List.map((c3) => (
            <div className="text-xs" key={c3}>
              {c3}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RecruitPage;
