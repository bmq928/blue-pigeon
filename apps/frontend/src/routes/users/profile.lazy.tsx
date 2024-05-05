import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { Header } from '../../components'
import { useUserProfile } from '../../hooks'
import { useForm } from 'react-hook-form'
import {
  UpdateUserProfileBody,
  useUserProfileMutate,
} from '../../hooks/use-user-profile-mutate'
import { toast } from 'react-toastify'

export const Route = createLazyFileRoute('/users/profile')({
  component: () => <Page />,
})

function Page() {
  const { data: userProfileData } = useUserProfile()
  const { register, handleSubmit } = useForm<UpdateUserProfileBody>()
  const { mutate } = useUserProfileMutate()

  return (
    <>
      <Header />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                User Profile
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit((body) =>
                  mutate(body, {
                    onSuccess: () => toast.success('Profile updated'),
                  }),
                )}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={userProfileData?.credential.email}
                    disabled
                  />
                </div>
                <div>
                  <label
                    htmlFor="first-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={userProfileData?.profile.firstName}
                    {...register('firstName')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="fav-sport"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    defaultValue={userProfileData?.profile.lastName}
                    {...register('lastName')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="fav-sport"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Favorite Sport
                  </label>
                  <select
                    id="fav-sport"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('favSport')}
                  >
                    <option
                      value="Football"
                      selected={
                        userProfileData?.profile.favSport === 'Football'
                      }
                    >
                      Football
                    </option>
                    <option
                      value="Cricket"
                      selected={userProfileData?.profile.favSport === 'Cricket'}
                    >
                      Cricket
                    </option>
                    <option
                      value="Hockey"
                      selected={userProfileData?.profile.favSport === 'Hockey'}
                    >
                      Hockey
                    </option>
                    <option
                      value="Tennis"
                      selected={userProfileData?.profile.favSport === 'Tennis'}
                    >
                      Tennis
                    </option>
                    <option
                      value="Volleyball"
                      selected={
                        userProfileData?.profile.favSport === 'Volleyball'
                      }
                    >
                      Volleyball
                    </option>
                    <option
                      value="TableTennis"
                      selected={
                        userProfileData?.profile.favSport === 'TableTennis'
                      }
                    >
                      TableTennis
                    </option>
                    <option
                      value="Basketball"
                      selected={
                        userProfileData?.profile.favSport === 'Basketball'
                      }
                    >
                      Basketball
                    </option>
                    <option
                      value="Baseball"
                      selected={
                        userProfileData?.profile.favSport === 'Baseball'
                      }
                    >
                      Baseball
                    </option>
                    <option
                      value="Rugby"
                      selected={userProfileData?.profile.favSport === 'Rugby'}
                    >
                      Rugby
                    </option>
                    <option
                      value="Golf"
                      selected={userProfileData?.profile.favSport === 'Golf'}
                    >
                      Golf
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="fav-sport-personality"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Favorite Sport Personality
                  </label>
                  <select
                    id="fav-sport-personality"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('favSportPersonality')}
                  >
                    <option
                      value="Messi"
                      selected={
                        userProfileData?.profile.favSportPersonality === 'Messi'
                      }
                    >
                      Messi
                    </option>
                    <option
                      value="Ronaldo"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'Ronaldo'
                      }
                    >
                      Ronaldo
                    </option>
                    <option
                      value="Roger Federer"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'Roger Federer'
                      }
                    >
                      Roger Federer
                    </option>
                    <option
                      value="Serena Wiliams"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'Serena Wiliams'
                      }
                    >
                      Serena Wiliams
                    </option>
                    <option
                      value="Michael Jordan"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'Michael Jordan'
                      }
                    >
                      Michael Jordan
                    </option>
                    <option
                      value="Lebron James"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'Lebron James'
                      }
                    >
                      Lebron James
                    </option>
                    <option
                      value="John Cena"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'John Cena'
                      }
                    >
                      John Cena
                    </option>
                    <option
                      value="Pele"
                      selected={
                        userProfileData?.profile.favSportPersonality === 'Pele'
                      }
                    >
                      Pele
                    </option>
                    <option
                      value="Neymar"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'Neymar'
                      }
                    >
                      Neymar
                    </option>
                    <option
                      value="Magic Johnson"
                      selected={
                        userProfileData?.profile.favSportPersonality ===
                        'Magic Johnson'
                      }
                    >
                      Magic Johnson
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="fav-sport-team"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Favorite Sport Team
                  </label>

                  <select
                    id="fav-sport-team"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...register('favSportTeam')}
                  >
                    <option
                      value="Manchester United"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Manchester United'
                      }
                    >
                      Manchester United
                    </option>
                    <option
                      value="Liverpool FC"
                      selected={
                        userProfileData?.profile.favSportTeam === 'Liverpool FC'
                      }
                    >
                      Liverpool FC
                    </option>
                    <option
                      value="Portland Trail Blazers"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Portland Trail Blazers'
                      }
                    >
                      Portland Trail Blazers
                    </option>
                    <option
                      value="NewYork Rangers"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'NewYork Rangers'
                      }
                    >
                      NewYork Rangers
                    </option>
                    <option
                      value="Chicago Blackhawks"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Chicago Blackhawks'
                      }
                    >
                      Chicago Blackhawks
                    </option>
                    <option
                      value="Philadelphia Eagles"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Philadelphia Eagles'
                      }
                    >
                      Philadelphia Eagles
                    </option>
                    <option
                      value="Texas Rangers"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Texas Rangers'
                      }
                    >
                      Texas Rangers
                    </option>
                    <option value="Chelsea FC">Chelsea FC</option>
                    <option
                      value="San Francisco Giants"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'San Francisco Giants'
                      }
                    >
                      San Francisco Giants
                    </option>
                    <option
                      value="Dallas Mavericks"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Dallas Mavericks'
                      }
                    >
                      Dallas Mavericks
                    </option>
                    <option
                      value="Atlanta Braves"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Atlanta Braves'
                      }
                    >
                      Atlanta Braves
                    </option>
                    <option
                      value="New England Patriots"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'New England Patriots'
                      }
                    >
                      New England Patriots
                    </option>
                    <option
                      value="Bayern Munich"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Bayern Munich'
                      }
                    >
                      Bayern Munich
                    </option>
                    <option
                      value="Chicago Bulls"
                      selected={
                        userProfileData?.profile.favSportTeam ===
                        'Chicago Bulls'
                      }
                    >
                      Chicago Bulls
                    </option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Update
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Find more friends{' '}
                  <Link
                    to="/users"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    click here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
