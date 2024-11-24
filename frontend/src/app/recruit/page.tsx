"use client";

import {
  RecruitCard,
  RecruitStartButton,
  RecruitTypeButtons
} from "@/components/recruit/Recruit";
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
        setRecruitTypes(["", ...pickUpCharacters.map((x) => `${x.name}`)]);
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
  const [pickUpCount, setPickUpCount] = useState<number | undefined>();
  const [recruitPoint, setRecruitPoint] = useState(0);
  const { recruitProbs, recruitTypes, loading } = useFetchRecruitData();
  const [running, setRunning] = useState<boolean>(false);

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
    setPickUpCount(undefined);
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

  const addCur3List = (cards: IRecruit[]) => {
    const new3List = cards
      .filter((card) => card.star === 3)
      .map((card) => card.name);
    setCur3List((prev) => [...prev, ...new3List]);

    const name = curRecruitType;
    const addPickupCount = cards.filter((card) => card.name === name).length;

    if (addPickupCount > 0) {
      setPickUpCount((prev) => (prev ? prev + addPickupCount : addPickupCount));
    }
  };

  const shouldContinue = (
    newPoint: number,
    totalPoint: number,
    stopOption: boolean,
    newCards: IRecruit[]
  ): boolean => {
    if (newPoint >= totalPoint) {
      return false;
    }

    if (!stopOption) {
      return true;
    }

    if (curRecruitType === "") {
      return shouldContinueNoraml(newCards);
    }

    return shouldContinuePickup(newCards, curRecruitType);
  };

  const shouldContinueNoraml = (cards: IRecruit[]): boolean => {
    return cards.every((card) => card.star !== 3); // 하나도 3성이 없으면 계속 함
  };

  const shouldContinuePickup = (cards: IRecruit[], name: string): boolean => {
    return cards.every((card) => card.name !== name); // 동일한 이름이 없으면 계속 함
  };

  const recruitLoop = (
    currentPoint: number,
    totalPoint: number,
    stopOption: boolean
  ) => {
    setRunning(true);

    const newCards = recruitFromData(cardProbs);
    const newPoint = currentPoint + 10;

    setCards(newCards);
    setRecruitPoint(newPoint);

    if (!stopOption) {
      addCur3List(newCards);
    }

    if (shouldContinue(newPoint, totalPoint, stopOption, newCards)) {
      setTimeout(() => recruitLoop(newPoint, totalPoint, stopOption), 100);
    } else {
      setRunning(false);
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-16">
      <RecruitTypeButtons
        recruitTypes={recruitTypes}
        curRecruitType={curRecruitType}
        updateFn={updateRecruitType}
      />

      <div className="grid grid-cols-5">
        {cards.map((card, i) => (
          <RecruitCard key={i} card={card} />
        ))}
      </div>

      {!running && (
        <div className="flex justify-center space-x-4">
          <RecruitStartButton onClick={doRecruit} label="모집 하기" />
          <RecruitStartButton
            onClick={() => repeatRecruit(200, true)}
            label="뽑을 때 까지 모집 하기"
          />
          <RecruitStartButton
            onClick={() => repeatRecruit(200, false)}
            label="200연 모집 하기"
          />
          <RecruitStartButton onClick={resetRecruit} label="초기화" />
        </div>
      )}
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
      {pickUpCount && <div>픽업 카운트: {pickUpCount}</div>}
    </div>
  );
};

export default RecruitPage;
