"use client";

import React, { useState, ReactNode } from "react";

interface TabProps {
  label: string;
  children: ReactNode;
}

interface TabsProps {
  tabs: TabProps[];
}

// 👉 เพิ่มคอมโพเนนต์ Tab
export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>;
};

// 👉 คอมโพเนนต์ Tabs
export const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg">
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`p-4 text-lg font-semibold rounded-t-2xl transition ${
              activeIndex === index
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-green-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        <Tab>{tabs[activeIndex].children}</Tab>
      </div>
    </div>
  );
};
