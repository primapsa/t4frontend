import React from 'react';
import {Flex, Loader} from '@mantine/core';


const PreloaderExt = ({isLoaded = true}: PleloaderType) => {
    return (
        <>
            {
                isLoaded &&
                <Flex style={
                    {
                        height: '100vh',
                        width: '100vw',
                        position: "absolute",
                        zIndex: '10',
                        top: '0',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                } >
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