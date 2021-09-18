import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';

import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

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

const Wrapper = styled('div')(() => ({
  padding: 20,
  display: 'flex',
  flexDirection: 'column',
  '& > *:not(:last-child)': {
    marginBottom: 20,
  },
}));

type Data = { id: string; postUrl: string; title: string };

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('검색해주세요');
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [datetime, setDatetime] = useState('');
  const [blogPost, setBlogPost] = useState<{
    minemanemo: Data[];
    bingsubat: Data[];
  }>({ minemanemo: [], bingsubat: [] });

  const requestSearchAPI = async (keyword: string) => {
    const url = `/api/spoon/searchDateJoin?keyword=${keyword}`;

    try {
      setLoading(true);
      const { data } = await axios.post(url);

      if (data.code !== 'Success') {
        throw new Error('SERVER ERRER');
      }

      setNickname(data.results.nickname || '');
      setDatetime(data.results.date_joined || '');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const requestPostAPI = async (
    blogname: 'bingsubat' | 'minemanemo'
  ): Promise<Data[]> => {
    const url = `/api/tistory/${blogname}`;

    try {
      setPostLoading(true);
      const { data } = await axios.get(url);
      return data.results.posts.map((d: any) => ({
        id: d.id,
        postUrl: d.postUrl,
        title: d.title,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setPostLoading(false);
    }
    return [];
  };

  function handleChangeKeyword(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.currentTarget.value);
  }

  function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      requestSearchAPI(keyword);
    }
  }

  useEffect(() => {
    const requestPostAPIS = async () => {
      const bingsubat = await requestPostAPI('bingsubat');
      const minemanemo = await requestPostAPI('minemanemo');

      setBlogPost({ bingsubat, minemanemo });
    };

    requestPostAPIS();
  }, []);

  return (
    <Wrapper>
      <Box>
        <Paper style={{ padding: '5px 0' }} elevation={3}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={keyword}
              onChange={handleChangeKeyword}
              onKeyPress={handlePressEnter}
              placeholder="닉네임의 @ 이후부터 입력해주세요"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {loading && <LinearProgress />}
        </Paper>

        <Stack style={{ marginTop: 10 }} direction="row" spacing={1}>
          <Chip
            style={{ flex: 1 }}
            label="고유 닉네임으로 가입 날짜를 조회합니다."
          />
        </Stack>

        {nickname !== '' && (
          <Paper style={{ marginTop: 20 }} elevation={3}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ padding: 30 }}>
                <Avatar>{nickname.slice(0, 1).toUpperCase()}</Avatar>
              </div>
              <div>
                <Typography fontSize={15}>{decodeURI(nickname)}</Typography>
                <Typography fontSize={15}>{datetime}</Typography>
              </div>
            </div>
          </Paper>
        )}
        {nickname === '' && (
          <Paper
            style={{
              padding: 20,
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            elevation={3}
          >
            <Typography>💬 바로 여기에 검색 결과가 표시 됩니다</Typography>
            <Typography>🙋🏼 닉네임의 @ 이후부터 입력해야합니다!</Typography>
            <Typography>🤫 잊지마세요</Typography>
          </Paper>
        )}
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box style={{ display: 'flex', gap: 30 }}>
        <Box
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Typography>빙수밭 블로그 최신 글</Typography>
          {postLoading && (
            <Paper>
              <LinearProgress />
            </Paper>
          )}
          {blogPost.bingsubat.map((m) => (
            <Card key={m.id} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography>{m.title}</Typography>
              </CardContent>
              <CardActions>
                <Link href={m.postUrl}>
                  <Button size="small">바로가기</Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Box
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <Typography>미네마네모 블로그 최신 글</Typography>
          {postLoading && (
            <Paper>
              <LinearProgress />
            </Paper>
          )}
          {blogPost.minemanemo.map((m) => (
            <Card key={m.id} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography fontSize={14}>{m.title}</Typography>
              </CardContent>
              <CardActions>
                <Link href={m.postUrl}>
                  <Button size="small">바로가기</Button>
                </Link>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Home;
