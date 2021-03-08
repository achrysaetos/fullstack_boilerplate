import React, { useContext } from "react"
import { useMutation } from "@apollo/react-hooks"
import { Flex, Text, Button, FormControl, useDisclosure, IconButton, Input } from "@chakra-ui/react"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

import { AuthContext } from "../../context/auth"
import { useForm } from "../../util/hooks"
import { CREATE_CARD_MUTATION } from "../../graphql/CREATE_CARD_MUTATION"

export default function AddCard() {
    const { user } = useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { values, onChange, onSubmit } = useForm(createCardCallback, { 
      userId: user.id,
      cardNumber: "",
      cvvNumber: "",
      expirationMonth: "",
      expirationYear: "",
      balanceRemaining: ""
    })

    const [createCard] = useMutation(CREATE_CARD_MUTATION, {
      variables: values,
      update() {
        values.cardNumber = ""
        values.cvvNumber = ""
        values.expirationMonth = ""
        values.expirationYear = ""
        values.balanceRemaining = ""
      }
    })
  
    function createCardCallback() { // to call createCard() in useForm()
      createCard()
    }

  return (
    <>
      <IconButton variant="outline" colorScheme="teal" icon={<AddIcon />} size="lg" mr={6} onClick={onOpen}/>
      <Modal onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom" size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text color="teal.500">Add a Card</Text>
            <ModalCloseButton _focus="outline: 0" />
          </ModalHeader>

          <ModalBody>
            { user ? 
              <>
                <Flex w="100%" justifyContent="center">
                  <form onSubmit={onSubmit} noValidate>
                    <FormControl>
                      <Flex alignItems="center">
                        <Text fontSize="lg" mr={6} fontWeight="semibold">Card Number:</Text>
                        <Input 
                          textAlign="center"
                          w="200px"
                          size="lg" 
                          variant="flushed"
                          focusBorderColor="grey"
                          autoComplete="off"
                          placeholder="####-####-####-####"
                          name="cardNumber"
                          type="text"
                          value={values.cardNumber}
                          onChange={onChange}
                        />
                      </Flex>

                      <Flex alignItems="center">
                        <Text fontSize="lg" mr={6} fontWeight="semibold">Expiration Date:</Text>
                        <Input 
                          textAlign="center"
                          w="25px"
                          size="lg" 
                          variant="flushed"
                          focusBorderColor="grey"
                          autoComplete="off"
                          placeholder="##"
                          name="expirationMonth"
                          type="text"
                          value={values.expirationMonth}
                          onChange={onChange}
                        />
                        <Text fontSize="lg" px={2}>/</Text>
                        <Input 
                          textAlign="center"
                          w="25px"
                          size="lg" 
                          variant="flushed"
                          focusBorderColor="grey"
                          autoComplete="off"
                          placeholder="##"
                          name="expirationYear"
                          type="text"
                          value={values.expirationYear}
                          onChange={onChange}
                        />

                        <Text fontSize="lg" mr={6} fontWeight="semibold" ml={6}>CVV:</Text>
                        <Input 
                          textAlign="center"
                          w="40px"
                          size="lg" 
                          variant="flushed"
                          focusBorderColor="grey"
                          autoComplete="off"
                          placeholder="###"
                          name="cvvNumber"
                          type="text"
                          value={values.cvvNumber}
                          onChange={onChange}
                        />
                      </Flex>
                      
                      <Flex alignItems="center">
                        <Text fontSize="lg" mr={6} fontWeight="semibold">Balance Remaining:</Text>
                        <Text fontSize="lg" pr={2} color="gray.500">$</Text>
                        <Input 
                          textAlign="center"
                          w="60px"
                          size="lg" 
                          variant="flushed"
                          focusBorderColor="grey"
                          autoComplete="off"
                          placeholder="## . ##"
                          name="balanceRemaining"
                          type="text"
                          value={values.balanceRemaining}
                          onChange={onChange}
                        />
                      </Flex>
                    </FormControl>
                    
                    <Button 
                      colorScheme="teal" 
                      variant="outline" 
                      width="full" 
                      mt={6} 
                      size="lg" 
                      type="submit" 
                      onClick={onClose} 
                      disabled={
                        values.cardNumber.trim() === "" || 
                        values.cvvNumber.trim() === "" || 
                        values.expirationMonth.trim() === "" || 
                        values.expirationYear.trim() === "" || 
                        values.balanceRemaining.trim() === ""
                      }
                    >
                      Add
                    </Button>
                  </form>
                </Flex>
              </> 
            : "" }
          </ModalBody>
          
          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )

}
