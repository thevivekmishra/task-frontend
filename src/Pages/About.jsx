// src/About.jsx
import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const About = () => {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <animated.div style={fadeIn} className=" items-center justify-center md:p-8 text-gray-100">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg shadow-lg md:p-8">
        <h1 className="text-3xl font-bold mb-4">About TaskMang</h1>
        <p className="mb-4">
          Welcome to our Task Management App TaskMang! Our platform is designed to help you manage your tasks efficiently and effectively. 
          You can easily add tasks by clicking the add icon, edit your tasks, mark them as important, and update them as completed. 
          Our intuitive interface ensures that managing tasks is a seamless experience, allowing you to stay organized and on top of your responsibilities.
        </p>
        <p className="mb-4">
          Our app provides features such as categorizing tasks based on their importance and completion status. You can quickly navigate through 
          different sections to view all tasks, important tasks, completed tasks, and incomplete tasks. This organization helps you prioritize 
          your work and track your progress efficiently.
        </p>
        <h2 className="text-2xl font-bold mb-4">Privacy and Security</h2>
        <p className="mb-4">
          We take your privacy and security seriously. Your passwords are hashed and encrypted using industry-standard encryption algorithms. 
          This means that we cannot see or access your passwords. They are securely stored in our database to ensure your personal information 
          remains safe and confidential.
        </p>
        <p className="mb-4">
          Your data is protected with strong security measures to prevent unauthorized access and ensure that your information is kept private. 
          We continuously monitor and update our security practices to safeguard your data against potential threats.
        </p>
        <p className="mb-4">
          Designed and developed by <span className="font-semibold">Vivek Kumar Mishra</span>.
        </p>
        <p>
          For any support, please email us at <a href="mailto:mishravivek9569@gmail.com" className="text-blue-400 hover:underline">mishravivek9569@gmail.com</a>.
        </p>
      </div>
    </animated.div>
  );
};

export default About;
