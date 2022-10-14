import { useRef } from 'react';
import { Button, Flex, Image, Stack } from '@chakra-ui/react';

interface ImageUploadProps {
    selectedFile?: string
    setSelectedFile: (value: string) => void
    onSelectImage: (evt: React.ChangeEvent<HTMLInputElement>) => void
    setSelectedTab: (value: string) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ selectedFile, setSelectedFile, onSelectImage, setSelectedTab }) => {

    const selectedFileRef = useRef<HTMLInputElement>(null)

    return (
        <Flex direction='column' justify='center' align='center' width='100%'>
            {selectedFile ? (
                <>
                    <Image src={selectedFile} maxWidth='400px' maxHeight='400px' />
                    <Stack direction='row' mt={4}>
                        <Button height='28px' onClick={() => setSelectedTab('Post')}>
                            Back to Post
                        </Button>
                        <Button variant='outline' height='28px' onClick={() => setSelectedFile('')}>
                            Remove
                        </Button>
                    </Stack>
                </>
            ) : (
                <>
                    <Flex
                        justify='center'
                        align='center'
                        p={20}
                        border='1px dashed'
                        borderColor='gray.200'
                        width='100%'
                        borderRadius={4}
                    >
                        <Button variant='outline' height='29px' onClick={() => selectedFileRef.current?.click()}>
                            Upload
                        </Button>
                        <input
                            ref={selectedFileRef}
                            onChange={onSelectImage}
                            type='file'
                            accept="image/x-png,image/gif,image/jpeg"
                            hidden
                        />
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default ImageUpload;