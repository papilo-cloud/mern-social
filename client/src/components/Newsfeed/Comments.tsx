import { auth } from '../../utils/auth/auth-helper'
import { Avatar } from '../core/Avatar/Avatar'
import { FormField, TextArea } from '../core/Form'

const Comments = () => {
    const jwt = auth.isAuthenticated()
    
  return (
    <div className='px-8 py-2 flex items-end gap-4'>
        <Avatar photo={jwt.user.photo} />
        <FormField className='w-full text-base'>
            <TextArea className='w-full bg-inherit mb-1' placeholder='Write something...' />
        </FormField>
    </div>
  )
}

export default Comments