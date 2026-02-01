import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Img,
  staticFile,
  Sequence,
} from "remotion";

const COLORS = {
  bg: "#0a0a0f",
  primary: "#d946ef",
  secondary: "#8b5cf6",
  text: "#ffffff",
  textMuted: "#a1a1aa",
};

// テキストフェードインコンポーネント
const FadeInText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const y = interpolate(opacity, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// スクリーンショット表示コンポーネント
const ScreenshotSlide: React.FC<{
  imageSrc: string;
  title: string;
  description: string;
}> = ({ imageSrc, title, description }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const scale = interpolate(slideIn, [0, 1], [0.9, 1]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 背景グラデーション */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${COLORS.primary}15 0%, transparent 50%)`,
        }}
      />

      {/* タイトル */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 60,
          right: 60,
          display: "flex",
          alignItems: "center",
          gap: 20,
          opacity,
        }}
      >
        <div
          style={{
            width: 8,
            height: 40,
            background: `linear-gradient(180deg, ${COLORS.primary}, ${COLORS.secondary})`,
            borderRadius: 4,
          }}
        />
        <div>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: COLORS.text,
              margin: 0,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontSize: 20,
              color: COLORS.textMuted,
              margin: "8px 0 0 0",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* スクリーンショット */}
      <div
        style={{
          marginTop: 80,
          transform: `scale(${scale})`,
          opacity,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 25px 80px ${COLORS.primary}30`,
          border: `1px solid ${COLORS.primary}30`,
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: 1100,
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

// イントロセクション
const IntroSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const glowIntensity = interpolate(
    frame,
    [0, 30, 60, 90],
    [0, 0.5, 0.8, 0.5],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 背景グロー */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${COLORS.primary}${Math.floor(glowIntensity * 40).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <FadeInText
        style={{
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <p
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            lineHeight: 1.4,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          1分以上のAIアニメ作り
        </p>
        <p
          style={{
            fontSize: 64,
            fontWeight: 800,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: "20px 0 0 0",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          超大変だ...
        </p>
      </FadeInText>
    </AbsoluteFill>
  );
};

// 問題提示セクション
const ProblemSection: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${COLORS.secondary}20 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      <FadeInText
        style={{
          textAlign: "center",
          padding: "0 100px",
        }}
      >
        <p
          style={{
            fontSize: 36,
            color: COLORS.textMuted,
            margin: 0,
            lineHeight: 1.6,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Flova等は楽だけど
        </p>
        <p
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: COLORS.text,
            margin: "20px 0 0 0",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          こだわれない...
        </p>
      </FadeInText>
    </AbsoluteFill>
  );
};

// ソリューション紹介セクション
const SolutionSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const textOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 背景グラデーション */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${COLORS.primary}20 0%, transparent 60%)`,
        }}
      />

      <div style={{ textAlign: "center" }}>
        {/* ロゴ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            SC
          </div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: COLORS.text,
              margin: 0,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Story Creator AI
          </h1>
        </div>

        {/* サブタイトル */}
        <p
          style={{
            fontSize: 32,
            color: COLORS.textMuted,
            marginTop: 30,
            opacity: textOpacity,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          シナリオからキーフレームまでを自動生成
        </p>
      </div>
    </AbsoluteFill>
  );
};

// フローセクション
const FlowSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const steps = [
    "アイデア",
    "プロット",
    "キャラデザ",
    "背景",
    "キーフレーム",
    "動画",
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at 50% 100%, ${COLORS.secondary}15 0%, transparent 50%)`,
        }}
      />

      <FadeInText>
        <p
          style={{
            fontSize: 36,
            color: COLORS.textMuted,
            textAlign: "center",
            marginBottom: 50,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          一気通貫でアニメを生成
        </p>
      </FadeInText>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginTop: 30,
        }}
      >
        {steps.map((step, index) => {
          const delay = index * 8;
          const stepOpacity = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          return (
            <React.Fragment key={step}>
              <div
                style={{
                  opacity: stepOpacity,
                  transform: `scale(${interpolate(stepOpacity, [0, 1], [0.8, 1])})`,
                }}
              >
                <div
                  style={{
                    padding: "16px 28px",
                    background:
                      index === steps.length - 1
                        ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`
                        : `${COLORS.primary}20`,
                    borderRadius: 12,
                    border: `1px solid ${COLORS.primary}50`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 600,
                      color: COLORS.text,
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {step}
                  </span>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  style={{
                    opacity: stepOpacity,
                    fontSize: 28,
                    color: COLORS.primary,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// エンディングセクション
const EndingSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, ${COLORS.primary}25 0%, transparent 60%)`,
          filter: "blur(100px)",
        }}
      />

      <div
        style={{
          textAlign: "center",
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 44,
              fontWeight: 800,
              color: "white",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            SC
          </div>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: COLORS.text,
              margin: 0,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Story Creator AI
          </h1>
        </div>

        <p
          style={{
            fontSize: 36,
            color: COLORS.textMuted,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          AIエージェントで、アニメ制作をもっと自由に
        </p>
      </div>
    </AbsoluteFill>
  );
};

// メインコンポーネント
export const StoryCreatorPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      {/* イントロ: 0-90 (0-3秒) */}
      <Sequence from={0} durationInFrames={90}>
        <IntroSection />
      </Sequence>

      {/* 問題提示: 90-150 (3-5秒) */}
      <Sequence from={90} durationInFrames={60}>
        <ProblemSection />
      </Sequence>

      {/* ソリューション: 150-210 (5-7秒) */}
      <Sequence from={150} durationInFrames={60}>
        <SolutionSection />
      </Sequence>

      {/* フロー説明: 210-300 (7-10秒) */}
      <Sequence from={210} durationInFrames={90}>
        <FlowSection />
      </Sequence>

      {/* プロット生成: 300-390 (10-13秒) */}
      <Sequence from={300} durationInFrames={90}>
        <ScreenshotSlide
          imageSrc="download/plot/01_plot.png"
          title="プロット生成"
          description="アイデアを具体化して、ストーリーを細かくしていきます"
        />
      </Sequence>

      {/* キャラデザ: 390-480 (13-16秒) */}
      <Sequence from={390} durationInFrames={90}>
        <ScreenshotSlide
          imageSrc="download/plot/02_character.png"
          title="スタイル設定"
          description="キャラクターデザインと世界観を設定できます"
        />
      </Sequence>

      {/* 背景生成: 480-570 (16-19秒) */}
      <Sequence from={480} durationInFrames={90}>
        <ScreenshotSlide
          imageSrc="download/plot/03_background.png"
          title="背景生成"
          description="背景・シーンを生成・編集できます"
        />
      </Sequence>

      {/* キーフレーム: 570-660 (19-22秒) */}
      <Sequence from={570} durationInFrames={90}>
        <ScreenshotSlide
          imageSrc="download/plot/04_keyframe.png"
          title="キーフレーム"
          description="重要な場面のカットを生成します"
        />
      </Sequence>

      {/* 動画編集: 660-750 (22-25秒) */}
      <Sequence from={660} durationInFrames={90}>
        <ScreenshotSlide
          imageSrc="download/plot/05_video.png"
          title="動画編集"
          description="クリップを繋いで最終動画を作成"
        />
      </Sequence>

      {/* エンディング: 750-900 (25-30秒) */}
      <Sequence from={750} durationInFrames={150}>
        <EndingSection />
      </Sequence>
    </AbsoluteFill>
  );
};
