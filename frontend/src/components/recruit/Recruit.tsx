interface IRecruit {
  name: string;
  star: number;
  prob: number;
}

interface RecruitStartButtonProps {
  label: string;
  onClick: any;
}

interface RecruitTypeButtonsProps {
  recruitTypes: string[];
  curRecruitType: string;
  updateFn: (idx: number) => void;
}

export const RecruitStartButton = ({
  label,
  onClick
}: RecruitStartButtonProps) => (
  <button
    className="p-2 bg-cyan-400 rounded-md font-bold text-xs"
    onClick={onClick}
  >
    {label}
  </button>
);

export const RecruitTypeButtons = ({
  recruitTypes,
  curRecruitType,
  updateFn
}: RecruitTypeButtonsProps) => {
  return (
    <div className="flex space-x-4">
      {recruitTypes.map((recruitType, idx) => (
        <button
          key={recruitType}
          className={`border-2 border-gray-400 p-2 rounded-md w-20 h-16 text-xs ${recruitType === curRecruitType ? "bg-yellow-200" : ""}`}
          onClick={() => updateFn(idx)}
        >
          {recruitType === "" ? (
            <span>상시 모집</span>
          ) : (
            <div className="flex flex-col">
              <span>픽업 모집</span>
              <span className="text-[10px] font-bold">{recruitType}</span>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export const RecruitCard = ({ card }: { card: IRecruit }) => {
  const matched = card.name.match(/^(.*?)(\s*\(.*\))?$/);
  const name = matched ? matched[1].trim() : "";
  const cloth = matched && matched[2] ? matched[2]?.trim() : "";
  return (
    <div className={`text-center m-2 border-gray-400 p-2 w-16 h-20`}>
      <img src={`/FX_TEX_GT_${card.star}.png`} className="w-12 h-12" />
      <div className="flex flex-col overflow-hidden">
        <span className="text-xs">{name}</span>
        {cloth && <span className="text-[8px]">{cloth}</span>}
      </div>
    </div>
  );
};

export const RecruitCardsResult = ({ cards }: { cards: IRecruit[] }) => (
  <div className="grid grid-cols-5">
    {cards.map((card, i) => (
      <RecruitCard key={i} card={card} />
    ))}
  </div>
);

export const RecruitStartButtons = ({
  running,
  doRecruit,
  repeatRecruit,
  resetRecruit
}: {
  running: boolean;
  doRecruit: () => void;
  repeatRecruit: (totalPoint: number, stopAtStar: boolean) => void;
  resetRecruit: () => void;
}) => {
  if (running) return null;
  return (
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
  );
};

export const RecruitPickUpCount = ({
  count
}: {
  count: number | undefined;
}) => {
  if (!count) return null;

  return <div>픽업 카운트: {count}</div>;
};

export const RecruitCur3List = ({ cur3List }: { cur3List: string[] }) => {
  if (cur3List.length === 0) return null;
  return (
    <>
      <div>획득한 3성: {cur3List.length}</div>
      {cur3List.map((c3) => (
        <div className="text-xs" key={c3}>
          {c3}
        </div>
      ))}
    </>
  );
};
