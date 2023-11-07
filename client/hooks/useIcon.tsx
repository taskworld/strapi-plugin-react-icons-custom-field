import React, { Fragment, useEffect, useState } from "react";

import type { ReactIcon } from "../utils/react-icons";

async function loadIcon(iconId?: string) {
  if (!iconId) return Fragment;

  const chunks = iconId.split(/(?=[A-Z])/);
  if (chunks.length === 0) return Fragment;

  const iconSetId = chunks[0].toLowerCase();
  const mod = await import(
    /* webpackMode: "lazy" */ `react-icons/${iconSetId}/index.js`
  );

  return mod[iconId] ?? Fragment;
}

export function useIcon(iconId: string) {
  // @ts-expect-error
  const [icon, setIcon] = useState<ReactIcon>(() => Fragment);

  useEffect(() => {
    loadIcon(iconId).then((val) => setIcon(() => val));
  }, [iconId]);

  return icon;
}
