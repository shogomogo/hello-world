import React from "react";
import { Composition } from "remotion";
import { TerminalConsole } from "./TerminalConsole";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TerminalConsole"
        component={TerminalConsole}
        durationInFrames={150}
        fps={30}
        width={1280}
        height={1008}
      />
    </>
  );
};
