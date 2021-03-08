import React, { useContext } from "react"
import { useQuery } from "@apollo/react-hooks"
import { HStack, VStack, Flex, Text, Box, Spinner } from "@chakra-ui/react"
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ComposedChart, XAxis, YAxis, Legend, CartesianGrid, Area, Bar, Line } from "recharts"
import moment from "moment"

import { AuthContext } from "../context/auth"
import { FETCH_USER_QUERY } from "../graphql/FETCH_USER_QUERY"
import Menu from "./dashboard/Menu"
import Footer from "./dashboard/Footer"

export default function Home() {
  const { user } = useContext(AuthContext)
  const { loading, data } = useQuery(FETCH_USER_QUERY, { variables: { userId: user.id }})

  if (loading){ // always check loading when working with queries
    return <Spinner color="teal.500" size="xl" ml="50%" mr="50%" mt={12}/>
  } else {
    const amountAdded = data.getUser.cards.reduce((a, {balanceRemaining}) => a + parseFloat(balanceRemaining), 0).toFixed(2)
    const interestEarned = (amountAdded * .08).toFixed(2)
    const yourBalance = (parseFloat(amountAdded) + parseFloat(interestEarned)).toFixed(2)

    const numCards = data.getUser.cards.length
    var lastAdded = 0
    numCards > 0 ? lastAdded = data.getUser.cards[0].createdAt : lastAdded = 0
    
    var runningSum = 0
    // reverse the copy of the array for recharts (cards is cached, so must not mutate it directly)
    const data1 = data.getUser.cards.map(data.getUser.cards.pop,[...data.getUser.cards]) 
    for (var i=0; i<data1.length; i++){
      data1[i].cardValue_float = parseFloat(data1[i].balanceRemaining)
      data1[i].name = "Card Value"

      runningSum = (parseFloat(runningSum) + parseFloat(data1[i].balanceRemaining)).toFixed(2)
      data1[i].amountAdded = runningSum
      data1[i].averageValue = (runningSum/(i+1)).toFixed(2)
      data1[i].dateAdded = moment(data1[i].createdAt).format("M/D")
      data1[i].cardValue = parseFloat(data1[i].balanceRemaining).toFixed(2)
    }

    const data2 = [
      { "name": "Amount Added", "value": parseFloat(amountAdded) },
      { "name": "Interest Earned", "value": parseFloat(interestEarned) }
    ]

    return (
      <HStack spacing={3} align="end">
        <Menu />

        <VStack spacing={3} w="100%">
          <HStack w="100%" spacing={3} align="end"> 
            <VStack w="50%" spacing={3}> 
              <Flex p={3} w="100%" h="150px" borderWidth={1} boxShadow="sm" direction="column"> {/* Your Balance */}
                <Text p={3} fontWeight="bold" color="teal.500">Your Balance</Text>
                <Text alignSelf="center" my={4} fontSize="4xl" fontWeight="light">
                  ${yourBalance}
                </Text>
              </Flex>

              <Flex p={3} w="100%" h="150px" borderWidth={1} boxShadow="sm" direction="column"> {/* Interest Earned */}
                <Text p={3} fontWeight="bold" color="teal.500">Interest Earned</Text>
                <Text alignSelf="center" my={4} fontSize="4xl" fontWeight="light">
                  ${interestEarned}
                </Text>
              </Flex>
            </VStack>

            <Flex p={3} w="100%" h="310.5px" borderWidth={1} boxShadow="sm" align="center" direction="column"> {/* Earnings Overview */}
              <Text p={3} fontWeight="bold" color="teal.500">Earnings Overview</Text>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data1}>
                  <XAxis dataKey="dateAdded" />
                  <YAxis type="number" domain={[0, "dataMax+"+amountAdded.toString()]} />
                  <Tooltip />
                  <Legend align="right" verticalAlign="bottom"/>
                  <CartesianGrid stroke="#f5f5f5" />
                  <Area name="Amount Added" type="monotone" dataKey="amountAdded" fill="#8884d8" stroke="#8884d8" />
                  <Bar name="Card Value" dataKey="cardValue" barSize={20} fill="#413ea0" />
                  <Line name="Average Value"type="monotone" dataKey="averageValue" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </Flex>
          </HStack>
          
          <Flex p={3} w="100%" h="100px" borderWidth={1} boxShadow="sm" align="center" justify="space-around"> {/* Banner */}
            <Box align="center">
              <Text fontSize="2xl" fontWeight="semibold">{numCards}</Text>
              <Text fontWeight="light">Cards Added</Text>
            </Box>
            { numCards > 0 ? (
              <>
                <Box align="center">
                  <Text fontSize="2xl" fontWeight="semibold">${amountAdded}</Text>
                  <Text fontWeight="light">Amount Added</Text>
                </Box>
                <Box align="center">
                  <Text fontSize="2xl" fontWeight="semibold">{moment(lastAdded).format("l")}</Text>
                  <Text fontWeight="light">Last Added</Text>
                </Box>
              </>
            ) : "" }
          </Flex>

          <HStack w="100%" spacing={3} align="end">
            <Flex p={3} w="50%" h="200px" borderWidth={1} boxShadow="sm" align="center" direction="column"> {/* Progress Report */}
              <Text p={3} fontWeight="bold" color="teal.500">Progress Report</Text>
              <Flex width="100%" height="100%"  align="center">
                <ResponsiveContainer width="50%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie data={data1} dataKey="cardValue_float" nameKey="name" outerRadius="80%" fill="#8884d8" />
                    <Pie data={data2} dataKey="value" nameKey="name" innerRadius="85%" outerRadius="100%" fill="#82ca9d" />
                  </PieChart>
                </ResponsiveContainer>
                <VStack alignItems="left">
                  <Text color="#8884d8">Amount Added (${amountAdded})</Text>
                  <Text color="#82ca9d">Your Balance (${yourBalance})</Text>
                </VStack>
              </Flex>
            </Flex>
            
            <Flex p={3} w="50%" h="200px" borderWidth={1} boxShadow="sm" align="center" direction="column" overflow="scroll"> {/* Latest Activity */}
              <Text p={3} fontWeight="bold" color="teal.500">Latest Activity</Text>
              <Table variant="simple">
                <TableCaption>All values are pending until verified.</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Card Number</Th>
                    <Th>Value</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.getUser.cards.map((card) => (
                    <Tr key={card.id}>
                      <Td>************{card.cardNumber.substring(12,16)}</Td>
                      <Td>${parseFloat(card.balanceRemaining).toFixed(2)}</Td>
                      <Td>{moment(card.createdAt).format("l")}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Flex>
          </HStack>

          <Footer />
        </VStack>
      </HStack>
    )
  }
  
}
