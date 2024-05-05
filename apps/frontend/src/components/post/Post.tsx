import { formatDistance } from 'date-fns/formatDistance'
import { TextAvatar } from '../avatar'

export type PostProps = {
  text: string
  staticLinks: string[]
  createdBy: string
  updatedAt: Date
}
export function Post({
  text,
  staticLinks = [],
  createdBy,
  updatedAt,
}: PostProps) {
  return (
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          <svg
            className="mr-1 w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
          Post
        </span>
        <span className="text-sm">
          {formatDistance(updatedAt, new Date(), { addSuffix: true })}
        </span>
      </div>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {text}
        {staticLinks.length ? (
          <div>
            {staticLinks.map((link: string, idx: number) => (
              <div key={link}>
                <a className="text-primary-800 underline" href={link} download>
                  file {idx}
                </a>
              </div>
            ))}
          </div>
        ) : null}
      </p>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <TextAvatar name={createdBy} />
          <span className="font-medium dark:text-white">{createdBy}</span>
        </div>
      </div>
    </article>
  )
}
