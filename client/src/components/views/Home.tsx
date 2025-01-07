import { auth } from '../../utils/auth/auth-helper'
import NewsFeed from "./NewsFeed"
import FindPeople from './FindPeople'

const Home = () => {
  const jwt = auth.isAuthenticated()

  return (
    <div className=' justify-center items-center text-3xl flex flex-col mt-20 h:[100vh - 80px] px-3'>
        {
          !jwt ? <h1>Hello world</h1>:
          <div className='w-full flex gap-10'>
              <NewsFeed />
              <div className='w-[500px] h-full '>
                  <FindPeople />
              </div>
          </div>
        }
    </div>
  )
}

export default Home