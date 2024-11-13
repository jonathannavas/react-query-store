import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productActions } from '..'
import { ProductLike } from '../services/actions'

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: productActions.createProduct,
    onSuccess: (product) => {
      //TODO: Esto sirve para invalidar queries y hacer que se genere una nueva consulta al ir al portal
      //   queryClient.invalidateQueries(['products', { filterKey: product.category }])

      queryClient.setQueryData<ProductLike[]>(
        ['products', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product]

          return [...oldData, product]
        }
      )
    },
  })
  return {
    mutation,
  }
}
