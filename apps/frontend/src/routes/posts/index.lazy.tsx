import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { Post, Header, HeaderSpace, HeroSection } from '../../components'

export const Route = createLazyFileRoute('/posts/')({
  component: () => <Page />,
})

function Page() {
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
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </section>
    </>
  )
}
