import React, { useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import type { AppProps } from 'next/app';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const path = useMemo(() => {
    if (router.pathname === '/') return 'home';

    const [, pathValue] = router.pathname.split('/');
    return pathValue;
  }, [router.pathname]);
  console.log('🚀 ~ file: _app.tsx ~ line 33 ~ path ~ path', path);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'home') {
      router.push('/');
    } else {
      router.push(`/${newValue}`);
    }
  };

  return (
    <div>
      <Head>
        <title>Spooncast meter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" style={{ backgroundColor: '#fbba3c' }}>
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Spooncast meter
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ marginTop: 40 }}>
        <Component {...pageProps} />
      </div>

      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={path} onChange={handleChange}>
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Search"
            value="search"
            icon={<SearchIcon />}
          />
          <BottomNavigationAction
            label="Bingsubat"
            value="bingsubat"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Minemanemo"
            value="minemanemo"
            icon={<StarIcon />}
          />
          <BottomNavigationAction
            label="Contact"
            value="contact"
            icon={<ContactSupportIcon />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
export default MyApp;
