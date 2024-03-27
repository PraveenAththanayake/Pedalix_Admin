"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { NavLists } from "@/constants/navLists";
import Map from "@/components/Map";
import Users from "@/components/admin_card/users";

export default function UserInfo() {
  const [selectedTab, setSelectedTab] = useState<number | null>(0);
  const handleTabClick = (index: number): void => {
    setSelectedTab(index === selectedTab ? null : index);
  };

  return (
    <div className="w-full h-screen">
      <Navbar>
        {NavLists.map((list, index) => (
          <div
            key={index}
            className={`hover:bg-primary hover:text-white px-4 py-2 rounded-md cursor-pointer transition-all duration-300 ease-in-out text-sm font-medium ${
              selectedTab === index ? "text-white bg-primary" : "text-gray-800"
            }`}
            onClick={() => handleTabClick(index)}
          >
            <div className="flex items-center gap-3">
              <list.icon />
              {list.name}
            </div>
          </div>
        ))}
      </Navbar>
      <div className="w-full relative top-24 lg:top-28 flexCenter h-max">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-[90vw] h-[50vw] lg:w-[44vw] lg:min-h-32">
            <Map />
          </div>
          <div>
            {selectedTab === 0 ? <Users /> : null}
            {selectedTab === 1 ? <Users /> : null}
            {selectedTab === 2 ? <Users /> : null}
            {selectedTab === 3 ? <Users /> : null}
            {selectedTab === 4 ? <Users /> : null}
            {selectedTab === 5 ? <Users /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
