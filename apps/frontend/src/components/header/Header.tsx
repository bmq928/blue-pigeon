import { Link } from '@tanstack/react-router'
import { useBearerToken, useLogout } from '../../hooks'

export function Header() {
  const { data } = useBearerToken()
  const { mutate: logout } = useLogout()

  const isLogin = !!data?.token

  return (
    <header className="fixed w-screen ">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link className="flex items-center" to="/">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Blue Pigeon
            </span>
          </Link>

          {!isLogin && (
            <div className="flex items-center lg:order-2">
              <Link
                to="/users/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
              <Link
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                to="/users/register"
              >
                Register
              </Link>
            </div>
          )}
          {isLogin && (
            <div className="flex items-center lg:order-2 gap-5">
              <Link className="text-primary-700 underline " to="/users/profile">
                {data.email}
              </Link>
              <button
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                onClick={() => logout()}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
