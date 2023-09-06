import React from 'react';
import {Flex, Loader} from '@mantine/core';

const PreloaderExt = ({isLoaded = true}: PleloaderType) => {
    return (
        <>
            {
                isLoaded &&
                <Flex style={{height: '80vh'}} justify={'center'} align={'center'}>
                    <Loader variant="dots"/>
                </Flex>
            }
        </>
    )

};
export default React.memo(PreloaderExt);

type PleloaderType = {
    isLoaded?: boolean
}