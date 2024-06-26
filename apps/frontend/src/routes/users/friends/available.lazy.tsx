import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import {
  Header,
  HeaderSpace,
  HeroSection,
  Pagination,
  UserFriendRequest,
} from '../../../components'
import {
  PER_PAGE,
  usePagination,
  useUserFriendsAvailable,
} from '../../../hooks'

export const Route = createLazyFileRoute('/users/friends/available')({
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
  const { data: usersData } = useUserFriendsAvailable({
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
        title="Find more friends"
        description="Expand your horizons and enrich your life by forging new
              friendships around the globe"
      />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="grid gap-8 mb-6 lg:mb-16">
            {usersData?.data.map((user) => (
              <UserFriendRequest
                userId={user._id}
                type="listing"
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
