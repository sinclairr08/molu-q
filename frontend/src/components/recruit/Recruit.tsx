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
