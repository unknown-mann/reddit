import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Box, Flex, Icon, MenuItem, Text } from '@chakra-ui/react';
import { FaReddit } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { communityState } from '../../../atoms/communitiesAtom';
import CreateComminityModal from '../../Modals/CreateCommunity/CreateComminityModal';
import MenuListItem from './MenuListItem';

const Communities = () => {

    const [open, setOpen] = useState(false)
    const mySnippets = useRecoilValue(communityState).mySnippets

    const moderatingCommunities = mySnippets.filter(snippet => snippet.isModerator).map(snippet => snippet)
    const myCommunities = mySnippets.map(snippet => snippet)

    return (
        <>
            <CreateComminityModal open={open} handleClose={() => setOpen(false)} />
            {!!moderatingCommunities.length && (
                <Box mt={3} mb={4} >
                    <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
                        MODERATING
                    </Text>
                    {moderatingCommunities.map(snippet => (
                        <MenuListItem
                            key={snippet.communityId}
                            icon={FaReddit}
                            displayText={`r/${snippet.communityId}`}
                            link={`/r/${snippet.communityId}`}
                            iconColor='brand.100'
                            imageURL={snippet.imageURL}
                        />
                    ))}
                </Box>
            )}
            <Box mt={3} mb={4} >
                <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
                    MY COMMUNITIES
                </Text>
                <MenuItem
                    width='100%'
                    color='gray.800'
                    fontSize='10pt'
                    _hover={{ bg: 'gray.100' }}
                    onClick={() => setOpen(true)}
                >
                    <Flex align='center'>
                        <Icon as={GrAdd} fontSize={20} mr={2} />
                        Create Community
                    </Flex>
                </MenuItem>
                {!!myCommunities.length && (
                    <>
                        {myCommunities.map(snippet => (
                            <MenuListItem
                                key={snippet.communityId}
                                icon={FaReddit}
                                displayText={`r/${snippet.communityId}`}
                                link={`/r/${snippet.communityId}`}
                                iconColor='blue.500'
                                imageURL={snippet.imageURL}
                            />
                        ))}
                    </>
                )}
            </Box>
        </>
    );
};

export default Communities;