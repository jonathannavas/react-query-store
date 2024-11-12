import { useQuery } from '@tanstack/react-query'
import { productActions } from '..'

interface Props {
  id: number
}
export const useProduct = ({ id }: Props) => {
  const {
    isLoading,
    isError,
    isFetching,
    data: product,
  } = useQuery(['products', id], () => productActions.getProductById(id), {
    staleTime: 1000 * 60 * 60,
  })
  return {
    isLoading,
    isError,
    isFetching,
    product,
  }
}
