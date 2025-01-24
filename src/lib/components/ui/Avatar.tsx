export interface AvatarProps {
  avatarBg: string;
  avatarUrl: string;
}
const Avatar = ({ avatarBg, avatarUrl }: AvatarProps) => {
  return (
    <div
      style={{
        backgroundColor: avatarBg,
        width: "70px",
        borderRadius: "100%",
        padding: ".4rem",
      }}
      className="aspect-square flex items-center justify-center rounded-full"
    >
      <img
        style={{
          height: "100%",
          borderRadius: "100%",
        }}
        className="aspect-square object-cover object-center"
        src={avatarUrl}
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;
