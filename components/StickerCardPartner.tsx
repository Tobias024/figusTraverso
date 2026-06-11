"use client";

import { forwardRef } from "react";
import { StickerData } from "./StickerCard";

type Props = { data: StickerData };

function LogoSlot({
  url,
  label,
  className,
}: {
  url: string;
  label: string;
  className: string;
}) {
  if (url) {
    return (
      <div className={className}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url} alt="" />
      </div>
    );
  }
  return (
    <div className={`${className} logo-slot-empty`}>
      <span>{label}</span>
    </div>
  );
}

const StickerCardPartner = forwardRef<HTMLDivElement, Props>(
  function StickerCardPartner({ data }, ref) {
    // vertical country code, one letter per line
    const codeLetters = (data.countryCode || "").split("");

    return (
      <div className="pcard" ref={ref}>
        {/* photo window */}
        <div className="pwindow">
          {data.photoUrl ? (
            <img
              className="pphoto"
              src={data.photoUrl}
              alt=""
              style={{
                objectPosition: `${data.posX}% ${data.posY}%`,
                transform: `scale(${data.zoom})`,
              }}
            />
          ) : (
            <div className="pstripes">
              <span>Subí una foto</span>
            </div>
          )}
        </div>

        {/* right sidebar */}
        <div className="psidebar">
          <LogoSlot url={data.sponsorUrl} label="SPONSOR" className="psponsor" />
          <LogoSlot url={data.partnerUrl} label="PARTNER" className="ppartner" />
          <div className="pbadge">
            <div className="pstripes-mini" />
          </div>
          <div className="pcode">
            {codeLetters.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
          <LogoSlot url={data.brandUrl} label="MARCA" className="pbrand" />
        </div>

        {/* bottom bars */}
        <div className="pname-bar">
          <span>{data.name}</span>
        </div>
        <div className="pcountry-bar">
          <span>{data.countryCode}</span>
        </div>
      </div>
    );
  }
);

export default StickerCardPartner;
