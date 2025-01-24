import Link from "next/link";

export interface GameSelectionButtonProps {
  text: string;
  Icon: any;
  comingSoon: boolean;
  bgColor: string;
  to?: string;
}

const ComingSoonChip = () => {
  return (
    <div className="bg-green-700 text-white rounded-2xl px-4 py-1 absolute -top-2 -left-6 text-xs -rotate-[30deg] md:static md:rotate-0 md:text-sm">
      {" "}
      Coming Soon{" "}
    </div>
  );
};

const SelectionButton = ({
  text,
  comingSoon,
  bgColor,
  Icon,
  to,
}: GameSelectionButtonProps) => {
  if (to) {
    return (
      <Link
        style={{
          backgroundColor: bgColor,
        }}
        className={`flex  items-center justify-between text-white rounded-3xl h-16 w-full px-2.5 sm:px-0.5 relative md:px-2.5`}
        href={to}
      >
        <button>
          <div className="flex gap-2 items-center justify-between">
            {" "}
            <Icon /> <span>{text}</span>
          </div>
          {comingSoon && <ComingSoonChip />}
        </button>
      </Link>
    );
  }
  return (
    <button
      style={{
        backgroundColor: bgColor,
      }}
      className={`flex  items-center justify-between text-white rounded-3xl h-16 w-full px-2.5 sm:px-0.5 relative md:px-2.5`}
    >
      <div className="flex gap-2 items-center justify-between">
        {" "}
        <Icon /> <span>{text}</span>
      </div>
      {comingSoon && <ComingSoonChip />}
    </button>
  );
};

export default SelectionButton;
