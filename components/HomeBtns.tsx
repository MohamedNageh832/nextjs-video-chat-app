"use client";

import { homeBtns } from "@/constants";
import HomeBtn from "./HomeBtn";

const HomeBtns = () => {
  return (
    <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-4">
      {homeBtns.map((btn) => (
        <HomeBtn
          key={btn.description}
          bgColor={btn.bgColor}
          iconUrl={btn.iconUrl}
          altText={btn.altText}
          title={btn.title}
          description={btn.description}
          onClick={btn.onClick}
        />
      ))}
    </section>
  );
};

export default HomeBtns;
