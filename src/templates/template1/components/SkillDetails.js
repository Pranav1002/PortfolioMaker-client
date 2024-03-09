import React from "react";

export default function SkillDetails() {
  return (
    <div className="pt-6">
      <div className="flex items-end justify-between">
        <h4 className="font-body font-semibold uppercase text-black">Python</h4>
        <h3 className="font-body text-3xl font-bold text-primary">70%</h3>
      </div>
      <div className="mt-2 h-3 w-full rounded-full bg-lila">
        <div className="h-3 rounded-full bg-gray-900"></div>
      </div>
    </div>
  );
}
