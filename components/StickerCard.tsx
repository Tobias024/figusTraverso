"use client";

import { forwardRef } from "react";
import { HeightIcon, WeightIcon, PositionIcon } from "./StatIcons";

export type StickerData = {
  photoUrl: string | null;
  zoom: number;
  posX: number;
  posY: number;
  countryCode: string;
  name: string;
  country: string;
  height: string;
  weight: string;
  position: string;
  flagUrl: string;
  badgeUrl: string;
};

type Props = { data: StickerData };

const Stat = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label?: string;
  value: string;
}) => (
  <div className="stat">
    <div className="stat-chip">{icon}</div>
    {label ? <div className="stat-label">{label}</div> : null}
    <div className="stat-value">{value}</div>
  </div>
);

const StickerCard = forwardRef<HTMLDivElement, Props>(function StickerCard(
  { data },
  ref
) {
  return (
    <div className="card" ref={ref}>
      <div className="frame">
        <div className="window">
          {/* photo / placeholder */}
          {data.photoUrl ? (
            <img
              className="photo"
              src={data.photoUrl}
              alt=""
              style={{
                objectPosition: `${data.posX}% ${data.posY}%`,
                transform: `scale(${data.zoom})`,
              }}
            />
          ) : (
            <div className="photo-placeholder">
              <span>Subí una foto</span>
            </div>
          )}

          <div className="top-fade" />

          {/* FIFA-style logo chip */}
          <div className="logo-chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/template/logo.png" alt="" />
          </div>

          {/* country code box */}
          <div className="code-box">{data.countryCode}</div>

          {/* flag */}
          <div className="flag-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.flagUrl} alt="" />
          </div>

          {/* left stats strip */}
          <div className="stats">
            <Stat icon={<HeightIcon />} label="ALTURA" value={data.height} />
            <Stat icon={<WeightIcon />} label="PESO" value={data.weight} />
            <Stat icon={<PositionIcon />} value={data.position} />
          </div>
        </div>

        {/* bottom: name + country */}
        <div className="name-band">
          <div className="name">{data.name}</div>
        </div>
        <div className="country-bar">
          <span>{data.country}</span>
        </div>

        {/* federation badge */}
        <div className="badge-chip">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.badgeUrl} alt="" />
        </div>
      </div>
    </div>
  );
});

export default StickerCard;
