"use client";

import { useEffect, useState } from "react";
import { mapboxInit } from "@common/mapboxInit";

const ContactMapSection = () => {
  const [mapLock, setMapLock] = useState(false);

  useEffect(() => {
    mapboxInit();
  }, []);

  return (
    <>
        {/* map */}
        <div className="sb-map-frame">
            <div id="map" className={`sb-map ${mapLock ? "sb-active": ""}`} />
            <div className={`sb-lock ${mapLock ? "sb-active": ""}`} onClick={() => setMapLock(!mapLock)}>
              <i className={`fas ${mapLock ? "fa-unlock": "fa-lock"}`} />
            </div>
        </div>
        {/* map end */}
    </>
  );
};

export default ContactMapSection;