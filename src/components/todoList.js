import { Box, Button, Input, Flex, Heading, Text } from '@chakra-ui/react'
import { motion } from "framer-motion"
import 'react-datepicker/dist/react-datepicker.css'

export const TodoList = (props) => {
    const { list, handleComplete, fireState, CompleteItem } = props

    return (
        <>
            <Heading mt="50px" mb="5px" fontWeight="bold" fontSize="16px">todoリスト</Heading>
            <Box w="100%" pt="10px" pb="10px" minHeight="500px" bg="gray.50" borderRadius="md">
                <Box w="95%" mt="20px" mr="auto" ml="auto">
                    {list.map((item, index) => (
                        <Flex position="relative" key={index} direction={{ base: "column", md: "row" }} mb="25px" justify="space-between" align="flex-start">
                            <Text w={{ base: "100%", md: "15%" }} fontSize="lg" mr="10px">{item.date}〆</Text>
                            <Text w={{ base: "100%", md: "73%" }} mt={{ base: "3px", md: "0" }} fontWeight="bold" mr="20px">{item.detail}</Text>
                            <Button
                                bg="#03A696" color="white" h="38px" _hover={{ opacity: 0.7 }} w="70px" mt={{ base: "10px", md: "0" }} onClick={() => handleComplete(index)}>
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
                                        CompleteItem(index)
                                    }}
                                >
                                    🔥
                                </Box>
                            )}
                        </Flex>
                    ))}
                </Box>
            </Box>
        </>
    )
}