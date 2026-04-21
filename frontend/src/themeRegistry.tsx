"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = createCache({ key: "mui", prepend: true });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
