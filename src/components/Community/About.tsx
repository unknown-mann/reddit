import { useRef, useState } from 'react';
import Link from 'next/link';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import { Box, Button, Divider, Flex, Icon, Stack, Text, Image } from '@chakra-ui/react';
import moment from 'moment';
import { RiCakeLine } from 'react-icons/ri'
import { FaReddit } from 'react-icons/fa';
import { auth, firestore, storage } from '../../firebase/clientApp';
import { Community, communityState } from '../../atoms/communitiesAtom';
import useSelectFile from '../../hooks/useSelectFile';

interface AboutProps {
    communityData: Community
}

const About: React.FC<AboutProps> = ({ communityData }) => {

    const [user] = useAuthState(auth)

    const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile()

    const selectedFileRef = useRef<HTMLInputElement>(null)

    const [uploadingImage, setUploadingImage] = useState(false)

    const setCommunityStateValue = useSetRecoilState(communityState)

    const onUpdateImage = async () => {

        if (!selectedFile) return

        setUploadingImage(true)
        try {

            const imageRef = ref(storage, `communities/${communityData.id}/image`)
            await uploadString(imageRef, selectedFile, 'data_url')
            const downloadURL = await getDownloadURL(imageRef)
            await updateDoc(doc(firestore, 'communities', communityData.id), {
                imageURL: downloadURL
            })

            setCommunityStateValue(prev => ({
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downloadURL
                } as Community
            }))

        } catch (error: any) {
            console.log(error.message);
        }
        setUploadingImage(false)
    }

    return (
        <Box position='sticky' top='14px'>
            <Flex
                align='center'
                bg='blue.400'
                color='white'
                p={3}
                borderRadius='4px 4px 0px 0px'
            >
                <Text fontSize='10pt' fontWeight={700}>About Community</Text>
            </Flex>
            <Flex direction='column' p={3} bg='white' borderRadius='0px 0px 4px 4px'>
                <Stack>
                    <Flex width='100%' p={2} fontSize='10pt' fontWeight={600} color='gray.800'>
                        <Flex flexGrow={1} mt={2}>
                            <Text mr={2}>{communityData.numberOfMembers.toLocaleString()}</Text>
                            <Text>
                                {communityData.numberOfMembers === 1 ? 'Member' : 'Members'}
                            </Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex align='center' width='100%' p={1} fontWeight={500} fontSize='10pt' color='gray.800'>
                        <Icon as={RiCakeLine} fontSize={18} mr={2} />
                        {communityData.createdAt && (
                            <Text>Created {moment(new Date(communityData.createdAt?.seconds * 1000)).format('MMM DD, YYYY')}</Text>
                        )}
                    </Flex>
                    <Link href={`/r/${communityData.id}/submit`}>
                        <Button
                            height='30px'
                            mt={3}
                            _active={{ bg: 'blue.500' }}
                        >
                            Create Post
                        </Button>
                    </Link>
                    {user?.uid === communityData.creatorId && (
                        <>
                            <Divider />
                            <Stack spacing={1} fontSize='10pt'>
                                <Text fontWeight={600} color='gray.800'>Admin</Text>
                                <Flex align='center' justify='space-between'>
                                    <Text
                                        color='blue.500'
                                        cursor='pointer'
                                        _hover={{ textDecoration: 'underline' }}
                                        onClick={() => selectedFileRef.current?.click()}
                                    >
                                        Change Image
                                    </Text>
                                    {communityData.imageURL || selectedFile ? (
                                        <Image
                                            src={selectedFile || communityData.imageURL}
                                            alt='Community Image'
                                            borderRadius='full'
                                            boxSize='40px'
                                        />
                                    ) : (
                                        <Icon as={FaReddit} fontSize={40} color='brand.100' mr={2} />
                                    )}
                                </Flex>
                                {selectedFile && (
                                    <Button
                                        variant='unstyled'
                                        alignSelf='flex-start'
                                        color='gray.800'
                                        p={3}
                                        pl={0}
                                        fontWeight={600}
                                        cursor='pointer'
                                        _hover={{ opacity: 0.8 }}
                                        isLoading={uploadingImage}
                                        onClick={onUpdateImage}
                                    >
                                        Save Changes
                                    </Button>
                                )}
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    hidden
                                    ref={selectedFileRef}
                                    onChange={onSelectFile}
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    );
};

export default About;