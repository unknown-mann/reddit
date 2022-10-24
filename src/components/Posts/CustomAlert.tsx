import { useRef } from 'react';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';

interface AlertProps {
    isOpen: boolean
    onClose: () => void
    name: string
    onDelete: () => void
    loadingDelete: boolean
}

const CustomAlert: React.FC<AlertProps> = ({ isOpen, onClose, name, onDelete, loadingDelete }) => {

    const cancelRef = useRef(null)

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            size={{ base: 'xs', sm: 'sm', md: 'md' }}
        >
            <AlertDialogOverlay>
                <AlertDialogContent bgColor='white' color='black'>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete {name}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can`t undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button
                            bgColor='gray.100'
                            color='#2D3748'
                            _hover={{ bgColor: 'gray.200' }}
                            ref={cancelRef}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='outline'
                            bgColor='red.500'
                            color='white'
                            border='none'
                            ml={3}
                            _hover={{ bgColor: 'red.600' }}
                            isLoading={loadingDelete}
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default CustomAlert;