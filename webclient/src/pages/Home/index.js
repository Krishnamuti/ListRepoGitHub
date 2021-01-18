import { Avatar, Badge, Box, Button, Divider, Flex, Heading, Input, List, ListItem, Text } from '@chakra-ui/react';
import React, { useState, useCallback } from 'react';

import { api } from '../../services/api';

const Home = () => {

    const IUser = {
        avatar_url: '',
        bio: '',
        name: ''
    };

    const [userName, setUserName] = useState('');
    const [infoUser, setInfoUser] = useState({});
    const [repo, setRepo] = useState([]);


    const handleSearch = useCallback(async () => {
        if (userName) {
            const { data: { avatar_url, bio, name } } = await api.get(`users/${userName}`);
            const { data } = await api.get(`users/${userName}/repos`);

            const repoFormatted = data.map(({ id, name, language, description }) => ({ id, name, language, description }));

            setInfoUser({ avatar_url, bio, name });
            setRepo(repoFormatted);
            console.log(repoFormatted);
        }
    }, [userName]);


    return (
        <Flex flexDir="column" alignItems="center" paddingX={10} paddingY={5}>
            <Box width="480px">
                <Flex flexDir="column">
                    <Heading>Listagem de repositórios</Heading>
                    <Input
                        type="text"
                        placeholder="Username"
                        marginTop="3"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                    />
                    <Button type="button" marginTop="6" onClick={handleSearch}>Pesquisar</Button>
                </Flex>
                <Flex flexDir="column" marginTop={10}>
                    <List>
                        {infoUser.name && (
                            <ListItem marginBottom={4}>
                                <Box bg="gray.300" padding={5} rounded="lg">
                                    <Flex alignItems="center">
                                        <Avatar size="lg" marginBottom={2} name={infoUser.name}
                                            src={infoUser.avatar_url} />
                                        <Heading marginLeft={2} fontSize="2xl">{infoUser.name}</Heading>
                                    </Flex>
                                    <Divider />
                                    <Text>{infoUser.bio}</Text>
                                </Box>
                            </ListItem>
                        )}
                        {repo.map(({ id, name, description, language }) => (
                            <ListItem key={id} marginBottom={4}>
                                <Box bg="purple.400" padding={5} rounded="lg">
                                    <Heading fontSize="2xl" marginBottom={2}>{name}</Heading>
                                    <Divider />
                                    <Text>{description}</Text>
                                    <Divider />
                                    <Badge marginRight={3} variant="solid">{language}</Badge>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Flex>
            </Box>
        </Flex>
    );
};

export { Home };