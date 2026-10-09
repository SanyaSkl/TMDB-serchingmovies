import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

export const MovieCardSkeleton = () => {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 220,
        borderRadius: '10px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}
    >
      {/* Постер 2:3 */}
      <Skeleton variant="rectangular" sx={{ width: '100%', aspectRatio: '2 / 3' }} />
      {/* Заголовок */}
      <Skeleton variant="text" sx={{ mx: 1.25, mt: 1, width: '70%' }} />
      {/* Рейтинг */}
      <Skeleton variant="text" sx={{ mx: 1.25, mb: 1, width: '40%' }} />
    </Box>
  )
}
