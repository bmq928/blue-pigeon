import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts/new')({
  component: () => <div>Hello /posts/new!</div>
})