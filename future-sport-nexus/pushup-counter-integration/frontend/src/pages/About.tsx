import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About This Project</h1>
        <p className="text-lg mb-4">
          This project integrates a push-up counting application using Python and React. 
          The backend utilizes OpenCV and MediaPipe to accurately count push-up repetitions 
          based on video input from a webcam.
        </p>
        <p className="text-lg mb-4">
          Users can record their push-up sessions and receive real-time feedback on their 
          performance. The frontend provides a user-friendly interface for navigating 
          through different sports and viewing demo videos.
        </p>
        <p className="text-lg mb-4">
          The application aims to help users improve their fitness routines by providing 
          valuable insights and tracking their progress over time.
        </p>
      </div>
    </div>
  );
};

export default About;