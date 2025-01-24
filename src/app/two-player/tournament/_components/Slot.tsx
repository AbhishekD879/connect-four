import Avatar from "@/lib/components/ui/Avatar";

const PLAYERS = {
  player1: {
    key: "player1",
    avatarUrl:
      "https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw",
    avatarBg: "#38A85C",
  },
  player2: {
    key: "player2",
    avatarUrl: "https://www.w3schools.com/howto/img_avatar2.png",
    avatarBg: "#F5D244",
  },
};

interface SlotProps {
  cell: string | null;
  onClick?: () => void;
}

const Slot = ({ onClick, cell }: SlotProps) => {
  if (cell === null) {
    return (
      <div
        className="bg-[#7B99F8] p-2 flex justify-center items-center w-full h-full"
        onClick={onClick}
      >
        <div className="w-[70px] aspect-square bg-white rounded-full"></div>
      </div>
    );
  }
  const avatarBg =
    cell === "Player1" ? PLAYERS.player1.avatarBg : PLAYERS.player2.avatarBg;
  const avatarUrl =
    cell === "Player1" ? PLAYERS.player1.avatarUrl : PLAYERS.player2.avatarUrl;
  return (
    <div
      className="bg-[#7B99F8] justify-center items-center flex w-full h-full"
      onClick={onClick}
    >
      <Avatar avatarBg={avatarBg} avatarUrl={avatarUrl} />
    </div>
  );
};

export default Slot;
