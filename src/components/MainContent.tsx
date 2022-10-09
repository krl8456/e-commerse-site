import React from "react";

function MainContent({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: "5em" }}>{children}</div>;
}

export default MainContent;
