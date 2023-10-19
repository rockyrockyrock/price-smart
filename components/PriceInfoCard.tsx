import React from "react";

interface PriceInfoCardProps {
  title: string;
  icon: React.ReactNode;
  value: string;
}

const PriceInfoCard = ({
  title,
  icon,
  value,
}: PriceInfoCardProps) => {
  return (
    <div className={`price-info_card`}>
      {/* Title */}
      <p className="text-base text-black-100">{title}</p>
      {/* Price */}
      <div className="flex gap-1 items-center">
        <span className="w-4 h-4">{icon}</span>
        <span className="text-2xl font-bold text-secondary pl-4 pt-2">{value}</span>
      </div>
    </div>
  );
};

export default PriceInfoCard;
