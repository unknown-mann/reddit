import { Timestamp } from 'firebase/firestore';
import moment from 'moment';
import { Box, Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { FaReddit } from "react-icons/fa";
import { AiOutlineDelete } from 'react-icons/ai';

export interface Comment {
    id: string
    creatorId: string
    creatorDisplayText: string
    communityId: string
    postId: string
    postTitle: string
    text: string
    createdAt: Timestamp
}

interface CommentItemProps {
    comment: Comment
    onDeleteComment: (comment: Comment) => void
    loadingDelete: boolean
    userId: string
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDeleteComment, loadingDelete, userId }) => {
    return (
        <Flex>
            <Box>
                <Icon as={FaReddit} fontSize={30} color='gray.300' />
            </Box>
            <Stack spacing={1}>
                <Stack direction='row' align='center' fontSize='8pt'>
                    <Text fontWeight={700} color='gray.800' ml={2}>
                        {comment.creatorDisplayText}
                    </Text>
                    <Text color='gray.600'>
                        {moment(new Date(comment.createdAt.seconds * 1000)).fromNow()}
                    </Text>
                </Stack>
                <Text fontSize='10pt' color='gray.800' pl={2}>
                    {comment.text}
                </Text>
                <Stack direction='row' align='center' cursor='pointer' color='gray.500' pl={2}>
                    {userId === comment.creatorId && (
                        <Button
                            display='flex'
                            alignItems='center'
                            fontSize='9pt'
                            fontWeight={500}
                            height='auto'
                            _hover={{ color: 'blue.500' }}
                            isLoading={loadingDelete}
                            variant='unstyled'
                            leftIcon={<AiOutlineDelete />}
                            onClick={() => onDeleteComment(comment)}
                        >
                            Delete
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Flex>
    );
};

export default CommentItem;