"use client";

import {
  RecruitCardsResult,
  RecruitCur3List,
  RecruitPickUpCount,
  RecruitStartButtons,
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

const useRecruitData = () => {
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

const useRecruitActions = (
  recruitProbs: IRecruitAPIResponse[],
  recruitTypes: string[]
) => {
  const [cardProbs, setCardProbs] = useState<IRecruitAPIResponse>(defaultState);
  const [cards, setCards] = useState<IRecruit[]>([]);
  const [curRecruitType, setCurRecruitType] = useState("");
  const [cur3List, setCur3List] = useState<string[]>([]);
  const [pickUpCount, setPickUpCount] = useState<number | undefined>();
  const [recruitPoint, setRecruitPoint] = useState(0);
  const [running, setRunning] = useState<boolean>(false);

  const updateRecruitType = useCallback(
    (idx: number) => {
      resetRecruit();
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
      resetRecruit();
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

  return {
    curRecruitType,
    updateRecruitType,
    cards,
    running,
    doRecruit,
    repeatRecruit,
    resetRecruit,
    recruitPoint,
    cur3List,
    pickUpCount
  };
};

const RecruitPage: React.FC = () => {
  const { recruitProbs, recruitTypes, loading } = useRecruitData();
  const {
    curRecruitType,
    updateRecruitType,
    cards,
    running,
    doRecruit,
    repeatRecruit,
    resetRecruit,
    recruitPoint,
    cur3List,
    pickUpCount
  } = useRecruitActions(recruitProbs, recruitTypes);

  //FIXME #29
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

      <RecruitCardsResult cards={cards} />

      <RecruitStartButtons
        running={running}
        doRecruit={doRecruit}
        repeatRecruit={repeatRecruit}
        resetRecruit={resetRecruit}
      />

      <div>모집 포인트: {recruitPoint}</div>
      <RecruitCur3List cur3List={cur3List} />

      <RecruitPickUpCount count={pickUpCount} />
    </div>
  );
};

export default RecruitPage;
