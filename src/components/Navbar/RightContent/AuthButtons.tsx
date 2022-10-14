import { useSetRecoilState } from 'recoil';
import { Button } from '@chakra-ui/react';
import { authModalState } from '../../../atoms/authModalAtom';

const AuthButtons: React.FC = () => {

    const setAuthModalState = useSetRecoilState(authModalState)

    return (
        <>
            <Button
                variant='outline'
                height='28px'
                display={{ base: 'none', sm: 'flex' }}
                width={{ base: '70px', md: '110px' }}
                mr={2}
                _hover={{ opacity: 0.8 }}
                onClick={() => setAuthModalState({ open: true, view: 'login' })}
            >
                Log In
            </Button>
            <Button
                height='28px'
                display={{ base: 'none', sm: 'flex' }}
                width={{ base: '70px', md: '110px' }}
                mr={2}
                onClick={() => setAuthModalState({ open: true, view: 'signup' })}
            >
                Sign Up
            </Button>
        </>
    );
};

export default AuthButtons;