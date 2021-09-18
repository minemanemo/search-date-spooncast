import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import { Wrapper } from '@components/StyledComponent';
import SearchBox from '@components/SearchBox';
import SearchResult, { initSearchResultData } from '@components/SearchResult';
import { BlogPostData } from '@components/BlogPostTimeline';

const Search: NextPage = () => {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(initSearchResultData);

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

  function handleChangeKeyword(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.currentTarget.value);
  }

  function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      requestSearchAPI(keyword);
    }
  }

  return (
    <Wrapper>
      <Box>
        <SearchBox
          keyword={keyword}
          loading={loading}
          onChangeKeyword={handleChangeKeyword}
          onKeyPressEnter={handlePressEnter}
        />

        <Stack
          style={{ marginTop: 10, flexWrap: 'wrap', gap: 10 }}
          direction="row"
        >
          <Chip label="🤠 고유 닉네임으로 가입 날짜를 조회합니다." />
          <Chip label="🙋🏼 닉네임의 @ 이후부터 입력해야합니다!" />
          <Chip label="🤫 잊지마세요" />
        </Stack>

        <SearchResult data={searchResult} />
      </Box>
    </Wrapper>
  );
};

export default Search;
