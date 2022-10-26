import { useState } from "react";
import { useRouter } from "next/router";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Text, Input, Flex, Icon } from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { auth, firestore } from "../../../firebase/clientApp";

interface CreateComminityModalProps {
    open: boolean
    handleClose: () => void
}

const CreateComminityModal: React.FC<CreateComminityModalProps> = ({ open, handleClose }) => {

    const [user] = useAuthState(auth)

    const [communityName, setCommunityName] = useState('')
    const [charsRemaining, setCharsRemaining] = useState(21)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {

        if (evt.target.value.length > 21) return

        setCommunityName(evt.target.value)
        setCharsRemaining(21 - evt.target.value.length)
    }

    const handleCreateComminity = async () => {

        if (error) setError('')

        const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(communityName) || communityName.length < 3) {
            setError("Community names must be between 3-21 characters, and can only contain letters, numbers, or underscores.")
            return
        }

        setLoading(true)

        try {
            const communityDocRef = doc(firestore, 'communities', communityName)

            await runTransaction(firestore, async (transaction) => {

                const communityDoc = await transaction.get(communityDocRef)
                if (communityDoc.exists()) {
                    throw new Error(`Sorry, /r${communityName} is taken. Try another.`)
                }
                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1
                })
                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true
                })
            })

            handleClose()
            router.push(`r/${communityName}`)
        } catch (error: any) {
            console.log(error);
            setError(error?.message)
        }

        setLoading(false)
        setCommunityName('')

    }

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size={{ base: 'sm', md: 'lg' }}>
                <ModalOverlay />
                <ModalContent bg='white' color='gray.800'>
                    <ModalHeader
                        display='flex'
                        flexDirection='column'
                        fontSize={15}
                        p={3}
                        m={2}
                        borderBottom='1px solid'
                        borderBottomColor='gray.200'
                    >
                        Create a community
                    </ModalHeader>
                    <Box px={3} >
                        <ModalCloseButton />
                        <ModalBody
                            display='flex'
                            flexDirection='column'
                            padding='10px 0'
                        >
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color='gray.500' mb={-2}>
                                Community names including capitalization cannot be changed
                            </Text>
                            <Text position='relative' top='28px' left='10px' width='20px' color='gray.400'>
                                r/
                            </Text>
                            <Input
                                position='relative'
                                size='sm'
                                pl='22px'
                                borderColor="gray.200"
                                color="gray.800"
                                _hover={{ borderColor: "gray.300" }}
                                _placeholder={{ color: 'gray.500' }}
                                _focus={{ outline: 'none' }}
                                value={communityName}
                                onChange={handleChange}
                            />
                            <Text mt={1} fontSize='9pt' color={charsRemaining === 0 ? 'red' : 'gray.500'}>
                                {charsRemaining} Characters remaining
                            </Text>
                            <Text fontSize='9pt' color='red' pt={1}>{error}</Text>
                            <Box my={2}>
                                <Text fontWeight={600} fontSize={15} mb={1}>Community type</Text>
                                <Flex alignItems='flex-start' direction='column'>
                                    <Flex align='center'>
                                        <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                                        <Text fontSize="10pt" mr={1}>Public</Text>
                                    </Flex>
                                    <Text fontSize="8pt" color="gray.500" pt={1}>
                                        Anyone can view, post, and comment to this community
                                    </Text>
                                </Flex>
                            </Box>
                        </ModalBody>
                    </Box>
                    <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
                        <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            height="30px"
                            _active={{ bg: 'blue.500' }}
                            _hover={{ bg: 'blue.400' }}
                            isLoading={loading}
                            disabled={!communityName}
                            onClick={handleCreateComminity}
                        >
                            Create Community
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default CreateComminityModal;