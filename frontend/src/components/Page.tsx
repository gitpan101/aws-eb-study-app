import { Box } from '@mui/material';
import { CSSProperties } from 'react';

interface IPage {
  addonStyles?: CSSProperties;
}

const Page = ({ children, addonStyles }: React.PropsWithChildren<IPage>) => {
  return (
    <Box
      sx={{
        p: 2,
        pl: 4,
        pr: 4,
        ...addonStyles,
      }}
    >
      {children}
    </Box>
  );
};

export default Page;
