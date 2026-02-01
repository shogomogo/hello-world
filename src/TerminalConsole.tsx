import React from "react";
import { AbsoluteFill } from "remotion";

export const TerminalConsole: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#e8e8e8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 22px 70px rgba(0, 0, 0, 0.3)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: 38,
            backgroundColor: "#e4e4e4",
            borderBottom: "1px solid #d1d1d1",
            display: "flex",
            alignItems: "center",
            paddingLeft: 12,
            paddingRight: 12,
            position: "relative",
          }}
        >
          {/* Traffic Lights */}
          <div style={{ display: "flex", gap: 8, zIndex: 1 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ff5f57",
                border: "1px solid #e14942",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#febc2e",
                border: "1px solid #dfa123",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#28c840",
                border: "1px solid #1faa32",
              }}
            />
          </div>
          {/* Window Title */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 13,
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
              fontWeight: 500,
              color: "#4d4d4d",
            }}
          >
            ターミナル
          </div>
        </div>

        {/* Terminal Content */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            padding: 10,
            fontFamily: "Menlo, Monaco, 'Courier New', monospace",
            fontSize: 14,
            lineHeight: 1.4,
            color: "#000000",
          }}
        >
          {/* Prompt Line */}
          <div style={{ display: "flex" }}>
            <span style={{ color: "#000000" }}>user@macbook ~ % </span>
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 17,
                backgroundColor: "#000000",
                marginLeft: 2,
                animation: "blink 1s step-end infinite",
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
