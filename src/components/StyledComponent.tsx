import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')(() => ({
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  '& > *:not(:last-child)': {
    marginBottom: 20,
  },
}));
