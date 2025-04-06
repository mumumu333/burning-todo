import { forwardRef } from 'react'
import { Box, Button, Input, Flex, Text } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ja } from 'date-fns/locale'

export const InputTodo = (props) => {
    const { detailTxt, setDetailTxt, date, setDate, AddList } = props

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
    ))

    return (
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
                        const formatted = selectedDate.toISOString().slice(0, 10)
                        setDate(formatted)
                    }}
                    customInput={<CustomInput />}
                    dateFormat="yyyy/MM/dd"
                    locale={ja}
                />
            </Box>
            <Button color="white" bg="#F27457" _hover={{ opacity: 0.7 }} onClick={AddList} h="38px" mt={{ base: "15px", md: "0" }} >
                追加
            </Button>
        </Flex>
    )
}