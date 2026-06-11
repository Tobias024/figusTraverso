"use client";

import { forwardRef } from "react";
import { StickerData } from "./StickerCard";

type Props = { data: StickerData };

const StickerCardPartner = forwardRef<HTMLDivElement, Props>(
  function StickerCardPartner({ data }, ref) {
    // vertical country code (fixed decoration), one letter per line
    const codeLetters = (data.countryCode || "ARG").split("");

    return (
      <div className="pcard" ref={ref}>
        {/* photo window (editable) */}
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

        {/* right sidebar (fixed) */}
        <div className="psidebar">
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

        {/* bottom sign (editable) */}
        <div className="pname-bar">
          <span>{data.name}</span>
        </div>
      </div>
    );
  }
);

export default StickerCardPartner;
