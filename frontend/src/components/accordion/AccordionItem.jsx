import React from "react";

export default function AccordionItem({ children }) {
  return (
    <article className="border-b">
      <div className="border-l-2 bg-grey-lightest border-indigo">
        {/* Charts */}
        <div className="grid grid-cols-2">{children}</div>
      </div>
    </article>
  );
}
