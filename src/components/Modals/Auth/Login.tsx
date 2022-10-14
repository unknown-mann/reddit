import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { auth } from '../../../firebase/clientApp';
import { authModalState } from '../../../atoms/authModalAtom';
import { FIREBASE_ERRORS } from '../../../firebase/errors';

const Login: React.FC = () => {

    const setAuthModalState = useSetRecoilState(authModalState)

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth)

    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({
            ...prev,
            [evt.target.name]: evt.target.value
        }))
    }

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name='email'
                placeholder='Email'
                type='email'
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                color='gray.500'
                _placeholder={{ color: 'gray.500' }}
                _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                bg='gray.50'
            />
            <Input
                required
                name='password'
                placeholder='Password'
                type='password'
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                color='gray.500'
                _placeholder={{ color: 'gray.500' }}
                _hover={{ bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                _focus={{ outline: 'none', bg: 'white', border: '1px solid', borderColor: 'blue.500' }}
                bg='gray.50'
            />
            <Text textAlign='center' color='red' fontSize='10pt'>
                {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button
                type='submit'
                isLoading={loading}
                width='100%'
                height='36px'
                my={2}
            >
                Log In
            </Button>
            <Flex justifyContent='center' mb={2} fontSize='10pt'>
                <Text mr={1}>
                    Forgot your password?
                </Text>
                <Text
                    color='blue.500'
                    cursor='pointer'
                    _hover={{ opacity: 0.8 }}
                    _active={{ opacity: 1 }}
                    onClick={() => setAuthModalState(prev => ({ ...prev, view: 'resetPassword' }))}
                >
                    Reset
                </Text>
            </Flex>
            <Flex justifyContent='center' fontSize='10pt'>
                <Text mr={1}>
                    New here?
                </Text>
                <Text
                    color='blue.500'
                    cursor='pointer'
                    fontWeight={700}
                    _hover={{ opacity: 0.8 }}
                    _active={{ opacity: 1 }}
                    onClick={() => setAuthModalState(prev => ({ ...prev, view: 'signup' }))}
                >
                    SIGN UP
                </Text>
            </Flex>
        </form>
    );
};

export default Login;