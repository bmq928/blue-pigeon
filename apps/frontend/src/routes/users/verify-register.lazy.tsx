import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useRegisterVerify } from '../../hooks/use-register-verify'

export const Route = createLazyFileRoute('/users/verify-register')({
  component: () => <Page />,
})

function Page() {
  const { mutate } = useRegisterVerify()
  const { register, handleSubmit } = useForm<{
    k1: string
    k2: string
    k3: string
    k4: string
    k5: string
    k6: string
  }>()
  const navigate = useNavigate()

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify your email address
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(({ k1, k2, k3, k4, k5, k6 }) =>
                mutate(
                  { key: `${k1}${k2}${k3}${k4}${k5}${k6}` },
                  { onSuccess: () => navigate({ to: '/' }) },
                ),
              )}
            >
              <div className="flex flex-col mt-4">
                <span>Enter the code you received</span>
              </div>
              <div
                id="otp"
                className="flex flex-row justify-center text-center px-2 mt-5"
              >
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="first"
                  maxLength={1}
                  {...register('k1')}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="second"
                  maxLength={1}
                  {...register('k2')}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="third"
                  maxLength={1}
                  {...register('k3')}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fourth"
                  maxLength={1}
                  {...register('k4')}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="fifth"
                  maxLength={1}
                  {...register('k5')}
                />
                <input
                  className="m-2 border h-10 w-10 text-center form-control rounded"
                  type="text"
                  id="sixth"
                  maxLength={1}
                  {...register('k6')}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Verify account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
