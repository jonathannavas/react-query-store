import { useQuery } from '@tanstack/react-query'
import { productActions } from '..'

interface Props {
  filterKey?: string
}
export const useProducts = ({ filterKey }: Props) => {
  const {
    isLoading,
    isError,
    isFetching,
    data: products = [],
  } = useQuery(
    ['products', { filterKey }],
    () => productActions.getProducts({ filterKey }),
    {
      staleTime: 1000 * 60 * 60,
    }
  )
  return {
    isLoading,
    isError,
    isFetching,
    products,
  }
}
