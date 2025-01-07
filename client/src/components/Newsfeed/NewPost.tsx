import { useState } from 'react'
import { auth } from '../../utils/auth/auth-helper'
import {Avatar} from '../core/Avatar/Avatar'
import { Button, ButtonText } from '../core/Button/index'
import { FormField, HelperText, TextArea, TextLabel } from '../core/Form/index'
import UploadIcon from '../icons/UploadIcon'
import { createPost, upload } from '../../utils/api-user'

interface NewPostProps {
    addUpdate: (post:any) => any
}
const NewPost = ({addUpdate}: NewPostProps) => {
  const [values, setValues] = useState({
    text: '',
    error: '',
    file: null,
    postedBy: ''
  })

  const jwt = auth.isAuthenticated()

  const handleChange = (name) => (event) => {
    const value = name == 'file' ?
      event.target.files[0] : event.target.value
    setValues({
      ...values,
      [name]: value
    })
  }

  const handlePostSubmit = (event) => {
    event.preventDefault()
    const post = {
      text: values.text || undefined,
      postedBy: jwt.user.id || undefined
    }
    if(values.file){
      const data = new FormData()
      const filename: any = Date.now() + values.file['name']
      data.append('name', filename)
      data.append('file', values.file)
      post['photo'] = filename

      upload(data)
        .then(res => {
          if (res.status != 200) {
            console.log(res)
          }
        })
    }
  createPost(jwt.user.id, jwt.token, post)
    .then(res => {
      if (res.status != 200) {
        setValues({...values, error: res.error})
      } else {
        setValues({...values, text: '', file: null})
        addUpdate(res.data)
      }
      console.log(addUpdate)
      console.log(res.data)
    })
  }


  return (
    <div className='text-base relative'>
      <div className='px-4 py-2 bg-[#ccdfd8] flex items-center gap-4'>
        <Avatar photo={jwt?.user?.photo} />
        <p className='text-lg font-semibold'>{jwt.user.name}</p>
      </div>
        <FormField onSubmit={handlePostSubmit} className='bg-white flex flex-col'>
            <div className='w-full py-2 px-10'>
                <TextArea
                    value={values.text}
                    onChange={handleChange('text')}
                    className='w-full min-h-28'
                    placeholder='Share your thoughts...' />
                <TextLabel className=' self-start cursor-pointer'>
                    <input type="file" style={{
                      display: 'none'
                    }} 
                    onChange={handleChange('file')}/>
                    <UploadIcon />
                    <span className='ml-2'>
                      {values.file ? values.file['name']: ''}
                    </span>
                </TextLabel>
            </div>
            {
              values.error && <HelperText>{values.error}</HelperText>
            }
            <div className='w-full flex px-4 py-2 bg-[#ccdfd8]'>
                <Button className='self-start bg-[#9d9f9f] px-6'>
                    <ButtonText className='text-[#434a4b] font-semibold'>POST</ButtonText>
                </Button>
            </div>
        </FormField>
    </div>
  )
}

export default NewPost