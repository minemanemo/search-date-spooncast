import { memo, useEffect, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export type SearchResultData = {
  nickname: string;
  datetime: string;
};
export const initSearchResultData: SearchResultData = {
  nickname: '',
  datetime: '',
};

interface SearchResultProps {
  data: SearchResultData;
}

const SearchResult = ({ data }: SearchResultProps) => {
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount(renderCount + 1);
  }, [data]);

  if (renderCount <= 1) {
    return (
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
      </Paper>
    );
  }

  if (data.nickname === '') {
    return (
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
        <Typography>❌ 입력하신 사용자는 검색되지 않아요</Typography>
      </Paper>
    );
  }

  return (
    <Paper style={{ marginTop: 20 }} elevation={3}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ padding: 30 }}>
          <Avatar>{data.nickname.slice(0, 1).toUpperCase()}</Avatar>
        </div>
        <div>
          <Typography fontSize={15}>{data.nickname}</Typography>
          <Typography fontSize={15}>{data.datetime}</Typography>
        </div>
      </div>
    </Paper>
  );
};

export default memo(SearchResult);
