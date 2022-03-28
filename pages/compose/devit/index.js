import AppLayout from "components/AppLayout"
import { Button } from "components/Button"
import { TextArea, Form, Img, Section, ButtonClose, Container } from "./styles"
import useUser from "hooks/useUser"
import { useState, useEffect } from "react"
import { addDevit, uploadImage } from "../../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import { getDownloadURL } from "firebase/storage"
import Avatar from "components/Avatar"
import Header from "components/Header"
import ArrowLeft from "components/Icons/ArrowLeft"
import Link from "next/link"

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const user = useUser()
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  /*eslint-disable */
  const [porgress, setProgress] = useState(0)

  const router = useRouter()
  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADING

  useEffect(() => {
    if (task) {
      const onProgress = (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        setProgress(prog)
      }
      const onError = (error) => {
        console.log(error)
      }
      const onComplete = () => {
        getDownloadURL(task.snapshot.ref).then(setImgURL)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (e) => {
    const { value } = e.target
    setMessage(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    sendDevit()
  }

  const sendDevit = async () => {
    try {
      await addDevit({
        avatar: user.avatar,
        content: message,
        userId: user.uid,
        userName: user.userName,
        img: imgURL,
      })
      router.push("/home")
    } catch (error) {}
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]
    const uploadTask = uploadImage(file)
    setTask(uploadTask)
  }

  return (
    <AppLayout>
      <Head>
        <title> Crear un devit / Devtter</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Link href="/">
            <a>
              <ArrowLeft width={27} height={32} stroke="#09f" />
            </a>
          </Link>
          <Button fontSize="14px" disabled={isButtonDisabled}>
            Devittear
          </Button>
        </Header>
        <Container>
          {user && <Avatar src={user.avatar} alt={user.userName} />}
          <TextArea
            placeholder="¿Qué esta pasando?"
            value={message}
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            drag={drag}
          ></TextArea>
          {imgURL && (
            <Section>
              <ButtonClose onClick={() => setImgURL(null)}>x</ButtonClose>
              <div
                style={{
                  width: "250px",
                }}
              >
                <Img
                  src={imgURL}
                  alt=""
                  title=""
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                />
              </div>
            </Section>
          )}
        </Container>
      </Form>
    </AppLayout>
  )
}
