"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useQueryParams<T>() {
  const router = useRouter();
  const defaultPathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams?.toString());

  function setQueryParams(
    params: Partial<T>,
    replace = true,
    pathname = defaultPathname,
  ) {
    // Delete if value is undefined or null from urlSearchParams
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        urlSearchParams.delete(key);
      } else {
        urlSearchParams.set(key, String(value));
      }
    });

    const search = urlSearchParams.toString();
    const query = search ? `?${search}` : "";

    replace
      ? router.replace(`${pathname}${query}`)
      : router.push(`${pathname}${query}`);
  }

  return { queryParams: searchParams, setQueryParams };
}
