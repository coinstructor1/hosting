"use client";
import { IEarnItem } from "@/app/models/EarnItems";
import EarnItem from "./EarnItem";

interface EarnSectionProps {
  earnItems: IEarnItem[];
}

const EarnSection: React.FC<EarnSectionProps> = ({ earnItems }) => {
  return (
    <div className="w-full p-6 ">
      <h4 className="pb-2 ">Hamster Youtube</h4>
      <div className="flex flex-col items-center">
        {earnItems
          .filter((item) => !item.dailyTask)
          .map((item) => (
            <EarnItem key={item.id} item={item}></EarnItem>
          ))}
      </div>
      <h4 className="pb-2 pt-2">Daily tasks</h4>
      <div className="flex flex-col items-center">
        {earnItems
          .filter((item) => item.dailyTask)
          .map((item) => (
            <EarnItem key={item.id} item={item}></EarnItem>
          ))}
      </div>
    </div>
  );
};
export default EarnSection;
