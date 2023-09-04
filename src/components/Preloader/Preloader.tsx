import React from 'react';
import {Center, Loader, Flex} from '@mantine/core';

const Preloader = ({isLoaded = true}: PleloaderType) => {
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
type PleloaderType = {
    isLoaded?: boolean
}
export default React.memo(Preloader);