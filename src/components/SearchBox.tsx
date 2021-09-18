import React, { memo } from 'react';

import { styled, alpha } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/material/LinearProgress';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    cursor: 'pointer',
  },
}));

interface SearchBoxProps {
  keyword: string;
  loading: boolean;
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPressEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBox = ({
  keyword,
  loading,
  onChangeKeyword,
  onKeyPressEnter,
}: SearchBoxProps) => {
  return (
    <Paper style={{ padding: '5px 0' }} elevation={3}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={keyword}
          onChange={onChangeKeyword}
          onKeyPress={onKeyPressEnter}
          placeholder="닉네임의 @ 이후부터 입력해주세요"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
      {loading && <LinearProgress />}
    </Paper>
  );
};

export default memo(SearchBox);
