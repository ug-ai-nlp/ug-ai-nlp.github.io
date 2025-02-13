"use client";

import { useEffect } from "react";

export default function GoHome() {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "/") {
        window.location.href = "/";
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <></>;
}
