import { useQueryClient } from '@tanstack/react-query'
import { productActions } from '..'

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient()

  const handlePrefetchProduct = (id: number) => {
    queryClient.prefetchQuery(
      ['product', id],
      () => productActions.getProductById(id),
      {
        staleTime: 1000 * 60 * 60,
      }
    )
  }

  return { handlePrefetchProduct }
}
