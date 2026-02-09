import React from "react";

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}

interface AvatarCirclesProps {
  numPeople?: number;
  avatarUrls: Avatar[];
  className?: string;
}

export const AvatarCircles: React.FC<AvatarCirclesProps> = ({
  numPeople,
  avatarUrls,
  className = "",
}) => {
  return (
    <div className={`flex -space-x-4 rtl:space-x-reverse ${className}`}>
      {avatarUrls.map((avatar, index) => (
        <a
          key={index}
          href={avatar.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block"
        >
          <img
            className="h-10 w-10 rounded-full border-2 border-white bg-slate-100 object-cover shadow-sm transition-transform hover:scale-110 hover:z-10"
            src={avatar.imageUrl}
            alt={`Avatar ${index}`}
          />
        </a>
      ))}
      {numPeople && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-center text-xs font-bold text-white shadow-sm">
          +{numPeople}
        </div>
      )}
    </div>
  );
};
