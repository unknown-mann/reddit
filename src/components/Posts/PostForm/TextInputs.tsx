import { Button, Flex, Input, Stack, Textarea } from '@chakra-ui/react';

interface TextInputsProps {
    onChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    handleCreatePost: () => void
    loading: boolean
    textInputs: {
        title: string
        body: string
    }
}

const TextInputs: React.FC<TextInputsProps> = ({ textInputs, onChange, handleCreatePost, loading }) => {
    return (
        <Stack spacing={3} width='100%'>
            <Input
                name='title'
                placeholder='Title'
                value={textInputs.title}
                onChange={onChange}
                fontSize='10pt'
                borderColor="gray.200"
                borderRadius={4}
                color="gray.800"
                _hover={{ borderColor: "gray.300" }}
                _placeholder={{ color: 'gray.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'black' }}
            />
            <Textarea
                name='body'
                placeholder="Text (optional)"
                value={textInputs.body}
                onChange={onChange}
                borderColor="gray.100"
                height='100px'
                fontSize='10pt'
                borderRadius={4}
                color="gray.800"
                _hover={{ borderColor: "gray.300" }}
                _placeholder={{ color: 'gray.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'black' }}
            />
            <Flex justify='flex-end'>
                <Button
                    height='34px'
                    padding='0px 30px'
                    disabled={!textInputs.title}
                    isLoading={loading}
                    onClick={handleCreatePost}
                >
                    Post
                </Button>
            </Flex>
        </Stack>
    );
};

export default TextInputs;