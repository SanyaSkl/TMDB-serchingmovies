import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export const HeroSkeleton = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                maxWidth: 1200,
                width: '100%',
                mx: 'auto',
                px: 3,
            }}
        >
            {/* Заголовок */}
            <Skeleton
                variant="text"
                sx={{
                    fontSize: { xs: '2rem', md: '3rem' },
                    width: '60%',
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                }}
            />
            {/* Подзаголовок */}
            <Skeleton
                variant="text"
                sx={{
                    fontSize: { xs: '1rem', md: '1.5rem' },
                    width: '70%',
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                }}
            />
            {/* Поиск */}
            <Skeleton
                variant="rounded"
                sx={{
                    height: 56,
                    maxWidth: 560,
                    width: '100%',
                    borderRadius: '30px',
                    bgcolor: 'rgba(255, 255, 255, 0.15)',
                }}
            />
        </Box>
    );
};