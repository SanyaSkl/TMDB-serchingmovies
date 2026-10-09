import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import {useAppSelector} from "@/hooks/useAppSelector.ts";
import {selectIsFetching} from "@/store/selectors.ts";


export const LoadingBar = () => {
    const isFetching = useAppSelector(selectIsFetching)

    if (!isFetching) return null

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 72,
                left: 0,
                right: 0,
                zIndex: (theme) => theme.zIndex.appBar,
                height: 2,
                pointerEvents: 'none',
            }}
        >
            <LinearProgress
                sx={{
                    height: 2,
                    backgroundColor: 'transparent',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: '#01b4e4',
                    },
                }}
            />
        </Box>
    );
};