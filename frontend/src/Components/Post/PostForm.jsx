import {
  Box,
  Button,
  Center,
  FormControl,
  Image,
  Tooltip,
} from "@chakra-ui/react"
import React, { useState } from "react"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import "../styles.css"

const PostForm = ({ fetchPosts, createPostsRequests }) => {
  const [loading, setLoading] = useState(false)

  const post = {
    title: "",
    description: "",
    image: null,
    user: "",
  }

  const cleanImagen = () => {
    document.getElementById("fichero-tarifas").value = ""
    let imagediv = document.getElementById("imagediv")
    imagediv.setAttribute("hidden", "true")
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <Box w="100%">
        <Box background="white">
          <Formik
            initialValues={post}
            enableReinitialize
            validationSchema={Yup.object({
              title: Yup.string().required("Title is Required"),
              description: Yup.string().required("Description is Required"),
            })}
            onSubmit={async (values, actions) => {
              setLoading(true)
              await createPostsRequests(values)
              fetchPosts()
              cleanImagen()
              setLoading(false)
              actions.resetForm()
              actions.setSubmitting(false)
            }}
          >
            {({ setFieldValue, isSubmitting, handleSubmit }) => (
              <Form
                onSubmit={handleSubmit}
                style={{
                  borderRadius: "1px",
                  borderColor: "#E2E8F0",
                  // eslint-disable-next-line no-dupe-keys
                  borderRadius: "5px",
                  paddingRight: "1.5rem",
                  paddingLeft: "1.5rem",
                  paddingBottom: "0.5rem",
                  paddingTop: "0.7rem",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <FormControl
                  width="full"
                  display="flex"
                  style={{ borderBottom: "1px solid #ccc" }}
                >
                  <Field
                    placeholder="Título"
                    name="title"
                    style={{
                      background: (0, 0, 255, 0.45),
                      width: "100%",
                      outline: "none",
                    }}
                  ></Field>
                  <Tooltip label="Elegir imagen" placement="right-end">
                    <div className="custom-input-file">
                      <input
                        tabIndex="-1"
                        accept="image/*"
                        type="file"
                        id="fichero-tarifas"
                        name="image"
                        className="input-file"
                        onChange={(e) => {
                          setFieldValue("image", e.target.files[0])

                          let reader = new FileReader()
                          reader.readAsDataURL(e.target.files[0])

                          reader.onload = function () {
                            let preview = document.getElementById("preview")
                            preview.src = reader.result
                            let divimg = document.getElementById("imagediv")
                            divimg.removeAttribute("hidden")
                          }
                        }}
                      />
                      <img
                        src="https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png"
                        width="100%"
                        alt="img"
                      />
                    </div>
                  </Tooltip>
                </FormControl>
                <FormControl>
                  <Field
                    style={{
                      marginTop: "2px",
                      background: (0, 0, 255, 0.45),
                      width: "100%",
                      outline: "none",
                    }}
                    component="textarea"
                    name="description"
                    id="description"
                    placeholder="..."
                    rows="3"
                  />
                </FormControl>

                <Center hidden id="imagediv">
                  <Image
                    id="preview"
                    objectFit="cover"
                    boxSize={500}
                    borderRadius={15}
                    mb={"10px"}
                  ></Image>
                  <Button
                    onClick={() => {
                      cleanImagen()
                    }}
                    color="red"
                    _hover={{ color: "red.700" }}
                    variant="ghost"
                    ml={-3}
                  >
                    <i className="fa-solid fa-circle-xmark"></i>
                  </Button>
                </Center>

                <ErrorMessage component="p" name="image" />

                {loading ? (
                  <Button
                    isLoading
                    colorScheme="blackAlpha"
                    loadingText="Publicando"
                    variant="ghost"
                  >
                    Email
                  </Button>
                ) : (
                  <Button
                    w="40"
                    h="7"
                    type="submit"
                    variant="ghost"
                    colorScheme="blackAlpha"
                    disabled={isSubmitting}
                  >
                    Publicar
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  )
}

export default PostForm
