export type HeroSectionProps = {
  title: string
  description: string
}
export function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}
