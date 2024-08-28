"use client";

import Image from "next/image";

type HomeBtnProps = {
  bgColor: string;
  iconUrl: string;
  altText: string;
  title: string;
  description: string;
  onClick: () => void;
};

const HomeBtn = (props: HomeBtnProps) => {
  const { bgColor, iconUrl, altText, title, description, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer min-w-[200px] max-w-[100%] h-[180px] flex-1 ${bgColor} rounded-lg p-4 flex flex-col justify-between`}
    >
      <header className="flex-center w-[35px] h-[35px] glassmorphism rounded">
        <Image src={iconUrl} alt={altText} width={20} height={20} />
      </header>

      <section className="flex flex-col gap-1 items-start">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm whitespace-nowrap">{description}</p>
      </section>
    </button>
  );
};

export default HomeBtn;
