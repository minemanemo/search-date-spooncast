import { memo } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export type BlogPostData = { id: string; postUrl: string; title: string };

interface BlogPostTimelineProps {
  title: string;
  loading: boolean;
  data: BlogPostData[];
}

const BlogPostTimeline = ({ title, loading, data }: BlogPostTimelineProps) => {
  return (
    <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Typography>{title}</Typography>
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
            <Link href={m.postUrl} target="_blank">
              <Button size="small">바로가기</Button>
            </Link>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default memo(BlogPostTimeline);
