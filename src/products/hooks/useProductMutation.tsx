import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productActions } from '..'
import { ProductLike } from '../services/actions'

export const useProductMutation = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: productActions.createProduct,

    onMutate: (product) => {
      console.log('Mutate - Optimistic update')
      //Optimistic product
      const optimisticProduct = { id: Math.random(), ...product }
      // save product into cache queryClient

      queryClient.setQueryData<ProductLike[]>(
        ['products', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product]

          return [...oldData, optimisticProduct]
        }
      )

      return {
        optimisticProduct,
      }
    },

    // onSuccess: (product) => {
    //   //TODO: Esto sirve para invalidar queries y hacer que se genere una nueva consulta al ir al portal
    //   //   queryClient.invalidateQueries(['products', { filterKey: product.category }])

    //   queryClient.setQueryData<ProductLike[]>(
    //     ['products', { filterKey: product.category }],
    //     (oldData) => {
    //       if (!oldData) return [product]

    //       return [...oldData, product]
    //     }
    //   )
    // },

    onSuccess: (product, _, context) => {
      queryClient.removeQueries(['product', context?.optimisticProduct.id])
      queryClient.setQueryData<ProductLike[]>(
        ['product', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product]

          return oldData.map((cachedProduct) => {
            return cachedProduct?.id === context?.optimisticProduct.id
              ? product
              : cachedProduct
          })
        }
      )
    },

    onError: (error, variables, context) => {
      console.log({ error, variables, context })
      queryClient.removeQueries(['products', context?.optimisticProduct.id])
      queryClient.setQueryData<ProductLike[]>(
        ['product', { filterKey: variables.category }],
        (oldData) => {
          if (!oldData) return []

          return oldData.filter((cachedProduct) => {
            return cachedProduct?.id !== context?.optimisticProduct.id
          })
        }
      )
    },
  })
  return {
    mutation,
  }
}
