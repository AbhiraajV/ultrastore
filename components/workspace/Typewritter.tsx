import Typewriter from "typewriter-effect";
export const TypeWriter = ({
  cond,
}: {
  cond: "Features" | "FilesToUpload";
}) => {
  const features = [
    "So secure its like we dont even have it 🔐🤫",
    "Totally free of cost 💵❌",
  ];
  const filesYouCanUpload = [
    "Classified Government Documents",
    "Restricted National Archives",
    "Secret Selfies!",
  ];
  const run = cond === "Features" ? features : filesYouCanUpload;
  return (
    <Typewriter
      options={{
        strings: run,
        autoStart: true,
        loop: true,
        deleteSpeed: 20,
      }}
    />
  );
};
