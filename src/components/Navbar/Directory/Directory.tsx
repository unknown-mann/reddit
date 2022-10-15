import { Flex, Icon, Menu, MenuButton, MenuList, Text, Image } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useDirectory from '../../../hooks/useDirectory';
import Communities from './Communities';

const Directory: React.FC = () => {

    const { directoryState, toggleMenuOpen } = useDirectory()

    return (
        <Menu isOpen={directoryState.isOpen} onClose={toggleMenuOpen}>
            <MenuButton
                cursor='pointer'
                padding='0px 6px'
                mr='auto'
                ml={{ base: 0, md: 2 }}
                borderRadius={4}
                _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
                onClick={toggleMenuOpen}
            >
                <Flex align='center' justify='space-between'>
                    <Flex align='center' mr={2}>
                        {directoryState.selectedMenuItem.imageURL ? (
                            <Image
                                src={directoryState.selectedMenuItem.imageURL}
                                borderRadius='full'
                                boxSize='24px'
                                mr={2}
                            />
                        ) : (
                            <Icon
                                fontSize={24}
                                mr={{ base: 1, md: 2 }}
                                as={directoryState.selectedMenuItem.icon}
                                color={directoryState.selectedMenuItem.iconColor}
                            />
                        )}
                        <Flex display={{ base: 'none', md: 'flex' }}>
                            <Text color='gray.800' fontWeight={600} fontSize='10pt'>
                                {directoryState.selectedMenuItem.displayText}
                            </Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon color='gray.500' fontSize={24} />
                </Flex>
            </MenuButton>
            <MenuList bg='white' zIndex={2}>
                <Communities />
            </MenuList>
        </Menu>
    );
};

export default Directory;