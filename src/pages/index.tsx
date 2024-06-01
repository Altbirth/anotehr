import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
  date: string;
}

interface User {
  id: number;
  name: string; 
  email: string;
  bio: string;
  post: Post[];
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='profile-section'>
        <div className="flex flex-col items-center mb-20">
          <Image src="/profile.jpg" alt="profile picture" width={150} height={150} className="w-24 h-24 rounded-full mb-4"/>
          <Typography variant="h3" gutterBottom>{data.name}</Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>{data.email}</Typography>
          <Typography variant="body2" gutterBottom sx={{ color: 'white' }}>{data.bio}</Typography>
        </div>
        <Typography variant="h6" gutterBottom sx={{ marginTop: '2rem' }}>Notes</Typography>
        <div className="flex flex-col space-y-4">
          {data.post.map((post, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-1">
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{post.title}</Typography>
                <Typography variant="body1">{post.content}</Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>{post.date}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Main>
  );
};

export default Home;
