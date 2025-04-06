import { useState } from 'react';
import './App.css';
import { Box, Button, Input, Flex, Heading, Container, Text, useToast } from '@chakra-ui/react';
import { motion } from "framer-motion";
import { forwardRef } from 'react';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// 基本テーマ色
const theme = extendTheme({
  styles: {
    global: {
      body: {
        color: "gray.700"
      },
    },
  },

});

export const Todo = () => {
  const [detailTxt, setDetailTxt] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([])
  const [fireState, setFireState] = useState([]);
  const toast = useToast();

  // フォームを入力したとき
  const AddList = () => {
    // 全項目が入力されていない場合はトースト表示
    if (!detailTxt || !date) {
      showToast()
      return;
    }

    // 項目が入力されていればデータをtodoリストに反映
    const listGroup = { detail: detailTxt, date: date };
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
    });
  };

  // 完了ボタンを押したとき
  const handleComplete = (index) => {
    // ここでfireStateを更新してアニメーションを発火させる
    setFireState((prev) => ({ ...prev, [index]: true }));
  }

  // todoリストからの削除
  const CompleteItem = (completeIndex) => {
    // アイテムを削除
    setList(list.filter((_, index) => index !== completeIndex));
    setFireState(list.filter((_, index) => index !== completeIndex));
  };

  // カレンダー表示
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Input
      placeholder="年/月/日"
      onClick={onClick}
      ref={ref}
      value={value}
      readOnly
      cursor="pointer"
    />
  ));

  return (
    <ChakraProvider theme={theme}>
      <Container w="95%" maxW="4xl" >
        <Box mt="40px">
          <Heading fontSize="27px" mb="15px">📝Burning Todo</Heading>
          <Text mb="50px">完了ボタンを押したらtodoが燃えます</Text>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="flex-end"
          >
            <Box w={{ base: "100%", md: "70%" }} mr={{ base: "0", md: "5px" }}>
              <Text mb="5px" fontWeight="bold" fontSize="16px">やること</Text>
              <Input
                placeholder="詳細"
                value={detailTxt}
                onChange={(event) => setDetailTxt(event.target.value)}
                h="38px"
              />
            </Box>
            <Box w={{ base: "100%", md: "20%" }} mr={{ base: "0", md: "5px" }} mt={{ base: "20px", md: "0" }} >
              <Text mb="5px" fontWeight="bold" fontSize="16px">いつまでに</Text>
              <DatePicker
                selected={date ? new Date(date) : null}
                onChange={(selectedDate) => {
                  const formatted = selectedDate.toISOString().slice(0, 10);
                  setDate(formatted);
                }}
                customInput={<CustomInput />}
                dateFormat="yyyy/MM/dd"
              />
            </Box>
            <Button color="white" bg="#F27457" _hover={{ opacity: 0.7 }} onClick={AddList} h="38px" mt={{ base: "15px", md: "0" }} >
              追加
            </Button>
          </Flex>
        </Box>

        <Heading mt="50px" mb="5px" fontWeight="bold" fontSize="16px">todoリスト</Heading>
        <Box w="100%" pt="10px" pb="10px" minHeight="500px" bg="gray.50" borderRadius="md">
          <Box w="95%" mt="20px" mr="auto" ml="auto">
            {list.map((item, index) => (
              <Flex position="relative" key={index} direction={{ base: "column", md: "row" }} mb="25px" justify="space-between" align="flex-start">
                <Text w={{ base: "100%", md: "15%" }} fontSize="lg" mr="10px">{item.date}〆</Text>
                <Text w={{ base: "100%", md: "73%" }} mt={{ base: "3px", md: "0" }} fontWeight="bold" mr="20px">{item.detail}</Text>
                <Button bg="#03A696" color="white" h="38px" _hover={{ opacity: 0.7 }} w="70px" mt={{ base: "10px", md: "0" }} onClick={() => handleComplete(index)}>
                  完了
                </Button>
                {/* fireStateがtrueの時のアニメーション設定 */}
                {fireState[index] && (
                  <Box
                    as={motion.div}
                    position="absolute"
                    top={{ base: "-5px", md: "-55px" }}
                    left={{ base: "-5%", md: "auto" }}
                    right={{ base: "auto", md: "-4%" }}
                    transform="translate(-50%, -50%)"
                    pointerEvents="none"
                    initial={{ scale: 0.3, opacity: 1, y: 0 }}
                    animate={{ scale: 1, opacity: 0, y: -20 }}
                    transition={{ duration: 5 }}
                    fontSize="100px"
                    onAnimationComplete={() => {
                      // アニメーションが終わったらアイテムを削除
                      CompleteItem(index);
                    }}
                  >
                    🔥
                  </Box>
                )}
              </Flex>
            ))}
          </Box>
        </Box>
      </Container>
    </ChakraProvider >
  )
}
