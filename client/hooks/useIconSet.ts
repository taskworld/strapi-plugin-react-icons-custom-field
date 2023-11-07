import { useEffect, useState } from "react";

import type { ReactIcon } from "../utils/react-icons";

type IconSet = [string, ReactIcon][];

async function loadIcons(iconSetId: string) {
  const { default: mod, ...rest } = await import(
    /* webpackMode: "lazy" */
    `react-icons/${iconSetId}/index.js`
  );
  return Object.entries(rest) as IconSet;
}

export default function useIconSet(id: string) {
  const [loading, setLoading] = useState(true);
  const [iconSet, setIconSet] = useState<IconSet>([]);

  useEffect(() => {
    loadIcons(id)
      .then((val) => setIconSet(val))
      .finally(() => setLoading(false));
  }, [id]);

  return { loading, iconSet };
}
