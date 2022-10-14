import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { Flex, Skeleton, SkeletonCircle, Stack, Text, Image, Icon, Box, Button } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';
import { Community } from '../../atoms/communitiesAtom';
import { firestore } from '../../firebase/clientApp';
import useCommunityData from '../../hooks/useCommunityData';

const Recommendations = () => {

    const [communities, setCommunities] = useState<Community[]>([])
    const [lodaing, setLoading] = useState(false)

    const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData()

    const getCommunityRecommendations = async () => {

        setLoading(true)
        try {

            const communityQuery = query(
                collection(firestore, 'communities'),
                orderBy('numberOfMembers', 'desc'),
                limit(5)
            )
            const communityDocs = await getDocs(communityQuery)
            const communities = communityDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            setCommunities(communities as Community[])
        } catch (error: any) {
            console.log(error.message);
        }
        setLoading(false)
    }

    useEffect(() => {
        getCommunityRecommendations()
    }, [])

    return (
        <Flex direction='column' bg='white' borderRadius={4} border='1px solid' borderColor='gray.300'>
            <Flex
                align='flex-end'
                color='white'
                p='6px 10px'
                height='70px'
                borderRadius='4px 4px 0px 0px'
                fontWeight={700}
                bgImage='url(/images/recCommsArt.png)'
                backgroundSize='cover'
                bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
                url('images/recCommsArt.png')"
            >
                Top Communities
            </Flex>
            <Flex direction='column'>
                {lodaing ? (
                    <Stack mt={2} p={1}>
                        {[0, 1, 3].map(item => (
                            <Flex key={item} justify="space-around" align="center">
                                <SkeletonCircle startColor='gray.300' endColor='gray.400' size="8" ml={4} />
                                <Skeleton startColor='gray.300' endColor='gray.400' height="10px" width="60%" mr={4} />
                            </Flex>
                        ))}
                    </Stack>
                ) : (
                    <>
                        {communities.map((item, index) => {
                            const isJoined = !!communityStateValue.mySnippets.find(snippet => snippet.communityId === item.id)
                            return (
                                <Link href={`/r/${item.id}`} key={item.id}>
                                    <Flex
                                        position='relative'
                                        align='center'
                                        fontSize='10pt'
                                        borderBottom='1px solid'
                                        borderColor='gray.200'
                                        p='10px 12px'
                                        cursor='pointer'
                                        _hover={{ bg: 'gray.100' }}
                                    >
                                        <Flex width='80%' align='center'>
                                            <Flex width='10%'>
                                                <Text color='gray.800' fontWeight={600}>{index + 1}</Text>
                                            </Flex>
                                            <Flex width='80%' align='center' color='gray.800' fontWeight={500}>
                                                {item.imageURL ? (
                                                    <Image src={item.imageURL} borderRadius='full' boxSize='28px' mr={2} />
                                                ) : (
                                                    <Icon as={FaReddit} fontSize={30} color='brand.100' mr={2} />
                                                )}
                                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {`r/${item.id}`}
                                                </span>
                                            </Flex>
                                        </Flex>
                                        <Box position='absolute' right='10px'>
                                            <Button
                                                height='22px'
                                                fontSize='8pt'
                                                variant={isJoined ? 'outline' : 'solid'}
                                                onClick={evt => {
                                                    evt.stopPropagation()
                                                    onJoinOrLeaveCommunity(item, isJoined)
                                                }}
                                            >
                                                {isJoined ? 'Joined' : 'Join'}
                                            </Button>
                                        </Box>
                                    </Flex>
                                </Link>
                            )
                        })}
                    </>
                )}
            </Flex>
        </Flex>
    );
};


export default Recommendations;