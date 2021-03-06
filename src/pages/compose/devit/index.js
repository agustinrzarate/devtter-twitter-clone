import { Button } from "src/components/Button"
import {
  TextArea,
  Form,
  Section,
  ButtonClose,
  Container,
} from "src/styles/Devit"
import { useState, useEffect } from "react"
import { addDevit, uploadImage } from "../../../firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import { getDownloadURL } from "firebase/storage"
import Avatar from "src/components/Avatar"
import Header from "src/components/Header"
import ArrowLeft from "src/components/Icons/ArrowLeft"
import Link from "next/link"
import Image from "next/image"
import { useSelector } from "react-redux"
import { getUser } from "src/redux/selectors/user"

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

export default function Devit() {
  const user = useSelector((state) => getUser(state))
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
    } catch (error) {
      console.log(error)
    }
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
    <div style={{ height: "100%" }}>
      <Head>
        <title> Crear un devit / Devtter</title>
      </Head>
      <Header>
        <Link href="/home">
          <a>
            <ArrowLeft width={27} height={32} stroke="#09f" />
          </a>
        </Link>
        <Button fontSize="14px" disabled={isButtonDisabled}>
          Devittear
        </Button>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Container>
          {user && <Avatar src={user.avatar} alt={user.userName} />}
          <TextArea
            placeholder="??Qu?? esta pasando?"
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
                <Image
                  src={imgURL}
                  alt=""
                  title=""
                  width="100%"
                  height="100%"
                  layout="responsive"
                  objectFit="contain"
                  style={{ borderRadius: 10, border: "1px solid #f2f2f2" }}
                />
              </div>
            </Section>
          )}
        </Container>
      </Form>
    </div>
  )
}
