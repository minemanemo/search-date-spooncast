import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import SearchBox from '@components/SearchBox';
import SearchResult, { initSearchResultData } from '@components/SearchResult';
import BlogPostTimeline from '@components/BlogPostTimeline';

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
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(initSearchResultData);
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

      setSearchResult({
        nickname: decodeURI(data.results.nickname) || '',
        datetime: data.results.date_joined || '',
      });
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
        <SearchBox
          keyword={keyword}
          loading={loading}
          onChangeKeyword={handleChangeKeyword}
          onKeyPressEnter={handlePressEnter}
        />

        <Stack style={{ marginTop: 10 }} direction="row" spacing={1}>
          <Chip label="🤠 고유 닉네임으로 가입 날짜를 조회합니다." />
          <Chip label="🙋🏼 닉네임의 @ 이후부터 입력해야합니다!" />
          <Chip label="🤫 잊지마세요" />
        </Stack>

        <SearchResult data={searchResult} />
      </Box>

      <Box style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <BlogPostTimeline
          title="빙수밭 블로그 최신 글"
          loading={postLoading}
          data={blogPost.bingsubat}
        />

        <BlogPostTimeline
          title="미네마네모 블로그 최신 글"
          loading={postLoading}
          data={blogPost.minemanemo}
        />
      </Box>
    </Wrapper>
  );
};

export default Home;
