import { createPostAdapter } from '@/adapters/post.adapter'
import useFetchAndLoad from '@/hooks/useFetchAndLoad'
import { Button } from '@/pages/Login/styled-components/AuthForm.styled'
import { AppStore } from '@/redux/store'
import { createPost } from '@/services/posts.services'
import { uploadImg } from '@/services/public.services'
import { Image, InputImage, Row } from '@/styled-components'
import { Loader } from '@/styled-components/Loading.styled'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Column } from '../../Home/styled-components/Container'
import { usePostContext } from '../context/PostProvider'
import {
  BoxImageUploaded,
  DeleteImgButton,
  FormPost,
  ImageInput,
  ImageUploaded,
  ImageUploadImage,
  InputForm,
} from '../styled-components/PostForm.styled'
interface Inputs {
  description: string
}
const PostForm = () => {
  const { loading, callEndpoint } = useFetchAndLoad()
  const { setPostsFunc } = usePostContext()
  const [image, setImage] = useState('')
  const user = useSelector((state: AppStore) => state.user)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit = async ({ description }: Inputs) => {
    if (loading) return
    const response = await callEndpoint(
      createPost({ description, image, user: user.id })
    )
    setPostsFunc(createPostAdapter(response))
    setImage('')
    reset({
      description: '',
    })
  }

  const uploadImage = async (files: File) => {
    const response = await callEndpoint(uploadImg(files))
    setImage(response.data.url)
  }

  return (
    <Row>
      <Column gap="2px">
        <Image style={{ width: '60px', height: '60px' }} src={user.pic} alt={user.email}></Image>
      </Column>
      <FormPost onSubmit={handleSubmit(onSubmit)}>
        <Column gap="1rem">
          <InputForm
            placeholder="¿Qué está pasando?"
            required={true}
            rows={5}
            {...register('description', {
              required: 'Invalid content',
            })}
          ></InputForm>
          <ImageInput htmlFor="input">
            <InputImage
              id="input"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return
                uploadImage(e.target.files[0])
                e.target.value = ''
              }}
            ></InputImage>
            <ImageUploadImage alt='upload_image_post_icon' src="https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png"></ImageUploadImage>
          </ImageInput>
          {image && (
            <BoxImageUploaded>
              <ImageUploaded src={image}></ImageUploaded>
              <DeleteImgButton
                onClick={() => {
                  setImage('')
                }}
              >
                X
              </DeleteImgButton>
            </BoxImageUploaded>
          )}
          {!loading ? (
            <Button
              display="asd"
              style={{ backgroundColor: '#1E2337', margin: 'auto' }}
              type="submit"
            >
              Publicar
            </Button>
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loader></Loader>
            </div>
          )}
        </Column>
      </FormPost>
    </Row>
  )
}
export default PostForm
