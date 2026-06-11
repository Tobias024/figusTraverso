"use client";

import { forwardRef } from "react";
import { StickerData } from "./StickerCard";

type Props = { data: StickerData };

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

        {/* right sidebar with fixed partner logos */}
        <div className="psidebar">
          <div className="psponsor">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/template/cocacola.svg" alt="" />
          </div>
          <div className="ppartner">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/template/fifa26.png" alt="" />
            <div className="ppartner-caption">
              OFFICIAL
              <br />
              PARTNER
            </div>
          </div>
          <div className="pbadge">
            <div className="pstripes-mini" />
          </div>
          <div className="pcode">
            {codeLetters.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>

        {/* bottom bars (editable) */}
        <div className="pname-bar">
          <span>{data.name}</span>
        </div>
        <div className="pcountry-bar">
          <span>{data.countryCode}</span>
        </div>

        {/* brand logo bottom-right */}
        <div className="pbrand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/template/panini.svg" alt="" />
        </div>
      </div>
    );
  }
);

export default StickerCardPartner;
