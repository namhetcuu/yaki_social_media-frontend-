import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Button,
  Grid,
} from '@mui/material';

const initialCommunities = [
  {
    id: 1,
    name: 'Web Development',
    description: 'A place to share knowledge about HTML, CSS, JavaScript and popular languages.',
    avatar: 'https://i.pravatar.cc/150?img=12',
    joined: false,
  },
  {
    id: 2,
    name: 'Machine Learning',
    description: 'Discussion about machine learning, AI and data science.',
    avatar: 'https://i.pravatar.cc/150?img=25',
    joined: true,
  },
  {
    id: 3,
    name: 'React Việt Nam',
    description: 'Community for React developers in Vietnam.',
    avatar: 'https://i.pravatar.cc/150?img=28',
    joined: false,
  },
];

const Communities = () => {
  const [communities, setCommunities] = useState(initialCommunities);

  const handleJoinClick = (id) => {
    const updated = communities.map((c) =>
      c.id === id ? { ...c, joined: !c.joined } : c
    );
    setCommunities(updated);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={4}
        sx={{
          color: '#111',
          textTransform: 'uppercase',
          borderBottom: '4px solid #000',
          display: 'inline-block',
        }}
      >
        Communities
      </Typography>

      <Grid container spacing={3}>
        {communities.map((community) => (
          <Grid item xs={12} md={6} key={community.id}>
            <Card
              sx={{
                border: '3px solid #000',
                boxShadow: '6px 6px 0 #000',
                borderRadius: 0,
                backgroundColor: '#fff',
                transition: 'transform 0.1s',
                '&:hover': {
                  transform: 'translate(-4px, -4px)',
                  boxShadow: '10px 10px 0 #000',
                },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={community.avatar}
                    sx={{
                      width: 56,
                      height: 56,
                      border: '2px solid #000',
                    }}
                  />
                }
                title={
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: '#111' }}
                  >
                    {community.name}
                  </Typography>
                }
                subheader={
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#333',
                      fontStyle: 'italic',
                      mt: 1,
                    }}
                  >
                    {community.description}
                  </Typography>
                }
              />
              <CardContent sx={{ textAlign: 'right' }}>
                <Button
                  variant={community.joined ? 'outlined' : 'contained'}
                  onClick={() => handleJoinClick(community.id)}
                  sx={{
                    border: '2px solid #000',
                    borderRadius: 0,
                    fontWeight: 'bold',
                    backgroundColor: community.joined ? '#fff' : '#000',
                    color: community.joined ? '#000' : '#fff',
                    boxShadow: '3px 3px 0 #000',
                    '&:hover': {
                      backgroundColor: community.joined ? '#eee' : '#222',
                    },
                  }}
                >
                  {community.joined ? 'Joined' : 'Join Now'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Communities;
