import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';

import Box from '@mui/material/Box';

import { Wrapper } from '@components/StyledComponent';
import BlogPostTimeline, { BlogPostData } from '@components/BlogPostTimeline';

const Bingsubat: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BlogPostData[]>([]);

  const requestPostAPI = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/tistory/bingsubat');
      const _data = data.results.posts.map((d: any) => ({
        id: d.id,
        postUrl: d.postUrl,
        title: d.title,
      }));
      setData(_data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestPostAPI();
  }, []);

  return (
    <Wrapper>
      <Box style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <BlogPostTimeline
          title="빙수밭 블로그 최신 글"
          loading={loading}
          data={data}
        />
      </Box>
    </Wrapper>
  );
};

export default Bingsubat;
