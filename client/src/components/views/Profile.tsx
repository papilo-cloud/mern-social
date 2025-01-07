import Dialog from '../core/DialogBox/index'
import {Button, ButtonText} from '../core/Button/index'
import EditIcon from '../icons/EditIcon.tsx'
import DeleteIcon from '../icons/DeleteIcon.tsx'
import { auth } from '../../utils/auth/auth-helper'
import { read, remove, listByUser } from '../../utils/api-user'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/Context.tsx'
import FollowProfButton from '../core/FollowProfButton/FollowProfButton.tsx'
import {Avatar} from '../core/Avatar/Avatar.tsx'
import FollowGrid from '../core/FollowGrid/FollowGrid.tsx'
import {TabItems, TabLists} from '../core/Tab/index.ts'
import PostList from '../Newsfeed/PostList.tsx'
import Snackbar from '../core/Snackbar/Snackbar.tsx'

const Profile = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>({})
  const [isFollowing, setIsFollowing] = useState(true)
  const [follow, setFollow] = useState({
    isFollowing: true,
    message: '',
    open: false
  })
  const [posts, setPosts] = useState<any>([])

  const jwt = auth.isAuthenticated()
  const { userId } = useParams()
  const { signout, setOpen, open } = useAuth().auth
  const navigate = useNavigate()

  useEffect(() => {
    read(userId, jwt.token)
      .then(response => {
        if (response.status != 200) {
          console.log(user)
        } else {
          let following = checkFollow(response.data)
          setIsFollowing(following)
          setFollow({
            ...follow, isFollowing: following
          })
          setUser(response.data)
          loadPosts(response.data._id)
        }
      })
  }, [userId])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleDeleteAccount = () => {
    remove(userId, jwt.token)
      .then(response => {
        if (response.status != 200) {
          console.log(response)
        } else {
          signout(() => navigate('/', {replace: true}))
        }
      })
  }

  const checkFollow = (user) => {
    return user.followers.some(fol => fol._id == jwt.user.id)
  }

  const clickFollowButton = (callApi) => {
    callApi(jwt.user.id, jwt.token, user._id)
      .then(res => {
        if (res.status != 200) {
          console.log(res)
        } else {
          setIsFollowing(!isFollowing)
          setFollow({
            ...follow, isFollowing: !isFollowing, open: true
          })
          setOpen(true)
        }
      })
  }
  console.log(follow)

  const loadPosts = (user) => {
    listByUser(user, jwt.token)
      .then(res => {
        if (res.status != 200) {
          console.log(res)
        } else {
          setPosts(res.data)
        }
      })
  }

  const handleEdit = () => {
    navigate(`/user/edit/${jwt.user.id}`)
  }

  return (
    <>
    <Snackbar timedOut={5} isOpen={open}>{user.name}</Snackbar>
    <div className='relative flex self-center w-full min-h-[80vh] justify-center items-center mt-20'>
      <div className='flex flex-col max-w-[800px] drop-shadow-md rounded p-5 bg-white'>
          <h3 className='text-xl font-medium text-[#c14832]'>Profile</h3>
          <div className='relative flex items-center justify-between gap-3 border-b-2 p-4'>
            <div>
                <Avatar photo={user.photo} />
                <ul className='flex flex-col'>
                  <li className=' font-medium text-lg'>{ user.name}</li>
                  <li className=' opacity-70'>{user.email}</li>
                </ul>
            </div>
            { jwt.user && jwt.user.id == user._id ?
                <div className='flex gap-5'>
                  <button onClick={handleEdit}>
                    <EditIcon width={20} height={20} />
                  </button>
                  <button onClick={handleClick}>
                    <DeleteIcon width={20} height={20} />
                  </button>
                
              </div> :
              <FollowProfButton following={isFollowing} onButtonClick={clickFollowButton}  />
            }
          </div>
          <div className='border-b-2 p-2 mb-4'>
            <p>{user.about}</p>
            <p className='opacity-70'>Joined: {new Date(user.created).toDateString()} </p>
          </div>
          <TabLists
            className="bg-slate-200"
            activeButtonStyle="border-b-2 border-b-green-600 text-green-600" 
            buttonStyle=""
            tabIndex={1}>
            <TabItems label="posts">
                <PostList posts={posts} removeUpdate={() => {}} />
            </TabItems>
            <TabItems label="following">
                <FollowGrid array={user.following} />
            </TabItems>
            <TabItems label="follower">
                <FollowGrid array={user.followers} />
            </TabItems>
        </TabLists>
      </div>
    </div>
    {
      isOpen && (
        <Dialog.Root>
            <Dialog.Title>Delete Content</Dialog.Title>
            <Dialog.Content>
                <Dialog.ContentText>Confirm to delete your account.</Dialog.ContentText>
            </Dialog.Content>
            <Dialog.Action>
              <Button onClick={handleClick} className='bg-transparent'>
                  <ButtonText className='text-[#262425]'>Cancel</ButtonText>
              </Button>
              <Button onClick={handleDeleteAccount} className='bg-transparent'>
                  <ButtonText className='text-red-500'>Confirm</ButtonText>
              </Button>
            </Dialog.Action>
        </Dialog.Root>
      )
    }
    </>
  )
}

export default Profile