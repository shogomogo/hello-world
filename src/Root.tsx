import React from "react";
import { Composition } from "remotion";
import { TerminalConsole } from "./TerminalConsole";
import { StoryCreatorPromo } from "./StoryCreatorPromo";

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
      <Composition
        id="StoryCreatorPromo"
        component={StoryCreatorPromo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
