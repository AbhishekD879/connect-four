"use client";
import ConfigurationCard, {
  ConfigurationCardProps,
} from "@/app/two-player/_components/ConfigurationCard";
import { useDialog } from "@/lib/context/DialogContext";
import { useSettingsContext } from "@/lib/context/ConfigureContext";
import Link from "next/link";

export default function TwoPlayer() {
  const { openDialog } = useDialog();
  const { state } = useSettingsContext();
  const config: ConfigurationCardProps[] = [
    {
      key: "player1",
      avatarUrl:
        "https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw",
      avatarBg: "#38A85C",
      configBg: "#DCF6DF",
      onClick: () => openDialog("player1"),
      label: "player 01",
      value: state.player1,
    },
    {
      key: "player2",
      avatarUrl: "https://www.w3schools.com/howto/img_avatar2.png",
      avatarBg: "#F5D244",
      configBg: "#F7EBD5",
      onClick: () => openDialog("player2"),
      label: "player 02",
      value: state.player2,
    },
    {
      key: "numberOfGames",
      avatarUrl: "https://www.freeiconspng.com/uploads/black-trophy-png-30.png",
      avatarBg: "#B1C3F9",
      configBg: "#F0F0FB",
      onClick: () => openDialog("numberOfGames"),
      label: "Number of Games",
      value: state.numberOfGames,
    },
    {
      key: "whoStarts",
      avatarUrl:
        "https://www.freeiconspng.com/thumbs/sports-icon-png/sports-running-icon-2.png",
      avatarBg: "#38A85C",
      configBg: "#DCF6DF",
      onClick: () => openDialog("whoStarts"),
      label: "Who Starts",
      value: state.whoStarts,
    },
  ];
  return (
    <div className="">
      <div className="bg-white shadow rounded-3xl flex flex-col h-full w-[90%] mx-auto items-center gap-y-2 justify-start md:w-[70%] p-4">
        {config.map((item) => (
          <ConfigurationCard {...item} />
        ))}
        <hr />
        <button className="bg-[#467BFD] h-8 text-center w-full rounded-2xl shadow text-white">
          <Link href="/two-player/tournament">Start Game</Link>
        </button>
      </div>
    </div>
  );
}
