import { createLazyFileRoute } from '@tanstack/react-router'
import { Header, HeaderSpace, HeroSection } from '../../components'

export const Route = createLazyFileRoute('/users/')({
  component: () => <Page />,
})

function Page() {
  return (
    <>
      <Header />
      <HeaderSpace />
      <HeroSection
        title="Friends"
        description="Expand your horizons and enrich your life by forging new
              friendships around the globe"
      />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="grid gap-8 mb-6 lg:mb-16">
            <User />
            <User />
            <User />
            <User />
          </div>
        </div>
      </section>
    </>
  )
}

function User() {
  return (
    <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
      <div>
        <img
          className="h-60 rounded-lg sm:rounded-none sm:rounded-l-lg"
          src="https://static.vecteezy.com/system/resources/previews/014/830/344/non_2x/cute-happy-friends-hugging-students-in-front-of-classroom-lesson-board-at-school-vector.jpg"
          alt="Friend"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          <div>Bonnie Green</div>
        </h3>
        <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
          Favorite Sport: Football
        </p>
        <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
          Favorite Sport Team: Manchester United
        </p>
        <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
          Favorite Sport Personality: Ronaldo
        </p>
        <button className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
          + Add Friend
        </button>
      </div>
    </div>
  )
}
