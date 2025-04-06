import { useState, } from 'react'
import './App.css'
import { TodoList } from './components/todoList'
import { InputTodo } from './components/inputTodo'
import { Box, Heading, Container, Text, useToast } from '@chakra-ui/react'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import 'react-datepicker/dist/react-datepicker.css'

// 基本テーマ色
const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "gray.700"
      },
    },
  },
})

export const Todo = () => {
  const [detailTxt, setDetailTxt] = useState("")
  const [date, setDate] = useState("")
  const [list, setList] = useState([])
  const [fireState, setFireState] = useState([])
  const toast = useToast()

  // フォームを入力したとき
  const AddList = () => {
    // 全項目が入力されていない場合はトースト表示
    if (!detailTxt || !date) {
      showToast()
      return
    }

    // 項目が入力されていればデータをtodoリストに反映
    const listGroup = { detail: detailTxt, date: date }
    setList([...list, listGroup])

    // フォームをクリア
    setDetailTxt("")
    setDate("")
  }

  // トースト表示
  const showToast = () => {
    toast({
      title: "全項目を記載してください",
      status: "error",
      duration: 1000,
      position: "top",
      isClosable: true,
    })
  }

  // 完了ボタンを押したとき
  const handleComplete = (index) => {
    // ここでfireStateを更新してアニメーションを発火させる
    setFireState((prev) => ({ ...prev, [index]: true }))
  }

  // todoリストからの削除
  const CompleteItem = (completeIndex) => {
    // アイテムを削除
    setList(list.filter((_, index) => index !== completeIndex))
    setFireState(list.filter((_, index) => index !== completeIndex))
  }

  return (
    <ChakraProvider theme={theme}>
      <Container w="95%" maxW="4xl" >
        <Box mt="40px">
          <Heading fontSize="27px" mb="15px">📝Burning Todo</Heading>
          <Text mb="50px">完了ボタンを押したらtodoが燃えます</Text>
          <InputTodo
            detailTxt={detailTxt}
            setDetailTxt={setDetailTxt}
            date={date}
            setDate={setDate}
            AddList={AddList}
          />
        </Box>
        <TodoList
          list={list}
          handleComplete={handleComplete}
          fireState={fireState}
          CompleteItem={CompleteItem}
        />
      </Container>
    </ChakraProvider >
  )
}
