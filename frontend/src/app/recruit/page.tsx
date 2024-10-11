"use client";

import { useEffect, useState } from "react";

const RecruitPage: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    setCards(
      Array.from({ length: 10 }, () => Math.floor(Math.random() * 3) + 1)
    );
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 mt-16">
      <div className="flex space-x-4">
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
    </div>
  );
};

export default RecruitPage;
