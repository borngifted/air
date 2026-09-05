import { trpc } from "@/lib/trpc";
import { HAS_PLATFORM_API } from "@/lib/runtime";
import { staticCatalog } from "@/lib/staticCatalog";
import { shouldUseStaticCatalog } from "@/lib/publicCatalogFallback";

export function usePublicCatalog() {
  const query = trpc.catalog.list.useQuery(undefined, {
    enabled: HAS_PLATFORM_API,
    retry: false,
  });
  const isStaticFallback = shouldUseStaticCatalog(HAS_PLATFORM_API, Boolean(query.error));
  const data = (isStaticFallback ? staticCatalog : (query.data ?? [])) as NonNullable<typeof query.data>;
  return {
    ...query,
    data,
    isLoading: isStaticFallback ? false : query.isLoading,
    error: isStaticFallback ? null : query.error,
    isStaticFallback,
  };
}
