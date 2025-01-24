import Avatar from "@/lib/components/ui/Avatar";

interface PlayerCardProps {
  avatarBg: string;
  avatarUrl: string;
  name: string;
  score: number;
  highlight: boolean;
  configBg: string;
}

const PlayerCard = ({
  avatarBg,
  avatarUrl,
  name,
  score,
  highlight,
  configBg,
}: PlayerCardProps) => {
  return (
    <div
      style={{
        backgroundColor: configBg,
      }}
      className="w-full h-20 rounded-2xl flex justify-between items-center p-2.5"
    >
      <div>
        {highlight ? (
          <div className="p-1 rounded-full bg-orange-500">
            <Avatar avatarBg={avatarBg} avatarUrl={avatarUrl} />
          </div>
        ) : (
          <Avatar avatarBg={avatarBg} avatarUrl={avatarUrl} />
        )}
      </div>
      <div className="flex items-center flex-col gap-2">
        <p>Player 01</p>
        <p>{name}</p>
      </div>
      <div className="flex items-center flex-col gap-2">
        <p>Score</p>
        <p>{score}</p>
      </div>
    </div>
  );
};

export default PlayerCard;
