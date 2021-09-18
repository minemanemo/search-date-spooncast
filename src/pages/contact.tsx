import type { NextPage } from 'next';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { Wrapper } from '@components/StyledComponent';

const Contact: NextPage = () => {
  return (
    <Wrapper>
      <Typography>Kakao Talk Plus</Typography>

      <Card>
        <CardContent>
          <Typography>빙수밭의 이것저것</Typography>
        </CardContent>
        <CardActions>
          <Link href="http://pf.kakao.com/_ZLnQT" target="_blank">
            <Button size="small">바로가기</Button>
          </Link>
        </CardActions>
      </Card>
    </Wrapper>
  );
};

export default Contact;
