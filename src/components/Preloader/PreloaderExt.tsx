import React from 'react';
import {Flex, Loader} from '@mantine/core';

const PreloaderExt = ({isLoaded = true, children}: PleloaderType) => {
    return (
        <>
            {
                isLoaded ?
                    <Flex style={{height: '80vh'}} justify={'center'} align={'center'}>
                        <Loader variant="dots"/>
                    </Flex>:
                    children
            }
        </>
    )

};
export default React.memo(PreloaderExt);

type PleloaderType = {
    isLoaded: boolean
    children: React.ReactNode
}