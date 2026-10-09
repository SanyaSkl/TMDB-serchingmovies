import Box from '@mui/material/Box'
import { MovieCardSkeleton } from './MovieCardSkeleton'

type Props = {
  count?: number
}

export const MovieGridSkeleton = ({ count = 6 }: Props) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(6, 1fr)',
        },
        gap: 3,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </Box>
  )
}
