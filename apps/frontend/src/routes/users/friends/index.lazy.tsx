import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import {
  Header,
  HeaderSpace,
  HeroSection,
  Pagination,
} from '../../../components'
import { PER_PAGE, usePagination, useUserFriends } from '../../../hooks'

export const Route = createLazyFileRoute('/users/friends/')({
  component: () => <Page />,
})

function Page() {
  const {
    currentPage,
    nextPage,
    prevPage,
    setCurrentPage,
    setTotalPage,
    totalPage,
  } = usePagination()
  const { data: usersData } = useUserFriends({
    page: currentPage,
    perPage: PER_PAGE,
  })

  useEffect(
    () => setTotalPage(Math.ceil((usersData?.pageInfo.total || 1) / PER_PAGE)),
    [usersData?.pageInfo.total, setTotalPage],
  )
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
            {usersData?.data.map((user) => (
              <UserFriend
                key={user._id}
                name={`${user.profile.firstName} ${user.profile.lastName}`}
                favSport={user.profile.favSport}
                favSportPersonality={user.profile.favSportPersonality}
                favSportTeam={user.profile.favSportTeam}
              />
            ))}
          </div>
        </div>
      </section>
      <Pagination
        setCurrent={setCurrentPage}
        next={nextPage}
        prev={prevPage}
        curPage={currentPage}
        totalPage={totalPage}
      />
    </>
  )
}

export type UserFriendRequestProps = {
  name: string
  favSport?: string
  favSportPersonality?: string
  favSportTeam?: string
}
function UserFriend({
  name,
  favSport,
  favSportPersonality,
  favSportTeam,
}: UserFriendRequestProps) {
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
          <div>{name}</div>
        </h3>
        <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
          Favorite Sport: {favSport ?? '??'}
        </p>
        <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
          Favorite Sport Team: {favSportTeam ?? '??'}
        </p>
        <p className="mb-4 font-light text-gray-500 dark:text-gray-400">
          Favorite Sport Personality: {favSportPersonality ?? '??'}
        </p>
      </div>
    </div>
  )
}
