import { Box, Typography, Card, CardContent } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      <Card sx={{ 
        borderRadius: 2, 
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' 
      }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
            About This Project
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            This application is a React-based TODO list built as an assessment project. The primary goal is to demonstrate proficiency in React by implementing a multi-page application that utilizes a custom global state management solution built entirely with React Context and Hooks.
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Core features include the ability to add, edit, check, and delete TODO items, all while ensuring a mobile-friendly user interface.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The motivation behind this project is to serve as a practical proof-of-concept for managing and sharing global state across multiple components effectively, without relying on external state management libraries.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
