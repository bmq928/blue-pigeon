import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import {
  Header,
  HeaderSpace,
  HeroSection,
  Pagination,
  Post,
} from '../../components'
import { PER_PAGE, usePagination, useUserProfile } from '../../hooks'
import { usePosts } from '../../hooks/use-posts'

export const Route = createLazyFileRoute('/posts/')({
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
  const { data: postsData } = usePosts({ page: currentPage, perPage: PER_PAGE })
  const { data: userProfileData } = useUserProfile()

  useEffect(
    () => setTotalPage(Math.ceil((postsData?.pageInfo.total || 1) / PER_PAGE)),
    [postsData?.pageInfo.total, setTotalPage],
  )

  return (
    <>
      <Header />
      <HeaderSpace />
      <HeroSection
        title="Posts"
        description="Broaden your intellectual horizons and share wisdom by consistently contributing new posts."
      />
      <section className="bg-white dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-screen-xl">
          <div className="flex flex-row-reverse pb-5">
            <Link
              className="text-primary-700 border-primary-600 border-2 border-solid font-medium rounded-lg text-sm px-4 lg:px-5 py-1 lg:py-1.5"
              to="/posts/new"
            >
              <span className="text-lg pr-2">+</span>
              New Post
            </Link>
          </div>
          <div className="grid gap-8">
            {postsData?.data.map((post) => (
              <Post
                key={post._id}
                createdBy={`${userProfileData?.profile.firstName} ${userProfileData?.profile.lastName}`}
                staticLinks={post.staticLinks}
                text={post.text ?? '<empty>'}
                updatedAt={post.updatedAt}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="pt-8">
        <Pagination
          setCurrent={setCurrentPage}
          next={nextPage}
          prev={prevPage}
          curPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </>
  )
}
