import Avatar, { AvatarProps } from "@/lib/components/ui/Avatar";

export interface ConfigurationCardProps extends AvatarProps {
  key: string;
  configBg: string;
  onClick: () => void;
  label: string;
  value: string | number;
}

const ConfigurationCard = ({
  configBg,
  avatarBg,
  avatarUrl,
  onClick,
  value,
  label,
}: ConfigurationCardProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: configBg,
      }}
      className="w-full h-20 rounded-2xl flex items-center px-2.5"
    >
      <div className="flex items-center gap-2">
        <Avatar avatarBg={avatarBg} avatarUrl={avatarUrl} />
        <div className="flex flex-col gap-y-2">
          <p>{label}</p>
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationCard;
