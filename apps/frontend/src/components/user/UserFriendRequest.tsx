import { toast } from 'react-toastify'
import {
  useUserFriendRequestAccept,
  useUserFriendRequestCreate,
} from '../../hooks'

export type UserFriendRequestProps = {
  userId: string
  name: string
  favSport?: string
  favSportPersonality?: string
  favSportTeam?: string
  type: 'listing' | 'request'
}
export function UserFriendRequest({
  userId,
  name,
  favSport,
  favSportPersonality,
  favSportTeam,
  type,
}: UserFriendRequestProps) {
  const { mutate: addFiendRequest } = useUserFriendRequestCreate()
  const { mutate: acceptFriendRequest } = useUserFriendRequestAccept()

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
        <button
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          onClick={() =>
            type === 'listing'
              ? addFiendRequest(
                  { friendId: userId },
                  { onSuccess: () => toast.success('Success') },
                )
              : acceptFriendRequest(
                  { friendId: userId },
                  { onSuccess: () => toast.success('Success') },
                )
          }
        >
          {type === 'listing' ? '+ Add Friend' : 'Accept Request'}
        </button>
      </div>
    </div>
  )
}
