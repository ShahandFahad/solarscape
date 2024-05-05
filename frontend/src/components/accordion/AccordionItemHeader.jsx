import React from "react";

export default function AccordionItemHeader({ name, children }) {
  return (
    <article className="border-b">
      <div className="border-l-2 border-transparent">
        <header className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none bg-gray-100">
          <span className="text-grey-darkest font-thin text-xl">{name}</span>
          {children}
        </header>
      </div>
    </article>
  );
}
