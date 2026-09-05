import { trpc } from "@/lib/trpc";
import { HAS_PLATFORM_API } from "@/lib/runtime";
import { staticCatalog } from "@/lib/staticCatalog";

export function usePublicCatalog() {
  const query = trpc.catalog.list.useQuery(undefined, {
    enabled: HAS_PLATFORM_API,
    retry: false,
  });
  const data = (HAS_PLATFORM_API ? (query.data ?? []) : staticCatalog) as NonNullable<typeof query.data>;
  return {
    ...query,
    data,
    isLoading: HAS_PLATFORM_API ? query.isLoading : false,
    error: HAS_PLATFORM_API ? query.error : null,
  };
}
