"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useTranslationReady() {
  const { i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized && i18n.hasLoadedNamespace("translation")) {
      setIsReady(true);
    } else {
      const handleInitialized = () => {
        setIsReady(true);
      };

      i18n.on("initialized", handleInitialized);
      i18n.on("loaded", handleInitialized);

      return () => {
        i18n.off("initialized", handleInitialized);
        i18n.off("loaded", handleInitialized);
      };
    }
  }, [i18n]);

  return isReady;
}
