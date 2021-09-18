import { memo } from 'react';
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

interface BlogPostTimelineProps {
  title: string;
  loading: boolean;
  data: Array<{ id: string; title: string; postUrl: string }>;
}

const BlogPostTimeline = ({ title, loading, data }: BlogPostTimelineProps) => {
  return (
    <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Typography>빙수밭 블로그 최신 글</Typography>
      {loading && (
        <Paper>
          <LinearProgress />
        </Paper>
      )}
      {data.map((m) => (
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
  );
};

export default memo(BlogPostTimeline);
