export type TextAvatarProps = {
  name: string
}
export function TextAvatar({ name }: TextAvatarProps) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name.slice(0, 2)}
      </span>
    </div>
  )
}
