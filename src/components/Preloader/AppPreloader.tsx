import React from 'react';
import {Flex, Loader} from '@mantine/core';
import {useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {AppStatus} from "../../redux/appReducer";
import {getMemoAuthStatus} from "../../selectors/selectors";

const PreloaderExt = () => {
    const status = useSelector<RootStateType, AppStatus | undefined>(getMemoAuthStatus)

    return (
        <>
            {
                status ?
                    <Flex style={{height: '100vh'}} justify={'center'} align={'center'}>
                        <Loader variant="dots"/>
                    </Flex> :
                    null
            }
        </>
    )

};
export default React.memo(PreloaderExt);

