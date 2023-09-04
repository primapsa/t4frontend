import React from 'react';
import {Center, Flex, Text} from "@mantine/core";

const EmptyState = () => {
    return (
        <Center style={{height: '80vh'}}>
            <Flex align={"center"} justify={"center"}>
                <Text>Упс... Ничего нет</Text>
            </Flex>
        </Center>
    );
};

export default EmptyState;