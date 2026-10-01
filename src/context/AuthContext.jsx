import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_COMMUNITY_POSTS } from '../data/gymData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dobu_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default demo user if none saved
    return {
      id: 'demo-user-1',
      name: 'Jordan Smith',
      email: 'jordan.smith@example.com',
      memberSince: 'January 2025',
      activePlan: 'elite', // Default to Elite plan or null
      selectedDisciplines: ['Jiu-jitsu', 'Muay Thai'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
  });

  const [bookedClasses, setBookedClasses] = useState(() => {
    const saved = localStorage.getItem('dobu_booked_classes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'book-1',
        day: 'Monday',
        time: '06:00 - 07:30',
        title: 'Jiu-jitsu',
        instructor: 'Sarah Nova',
        location: 'Dojo Mat A',
        bookedAt: new Date().toISOString()
      },
      {
        id: 'book-2',
        day: 'Wednesday',
        time: '17:30 - 19:00',
        title: 'Judo',
        instructor: 'Sarah Nova',
        location: 'Dojo Mat A',
        bookedAt: new Date().toISOString()
      }
    ];
  });

  const [communityPosts, setCommunityPosts] = useState(() => {
    const saved = localStorage.getItem('dobu_community_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_COMMUNITY_POSTS;
      }
    }
    return MOCK_COMMUNITY_POSTS;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dobu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dobu_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('dobu_booked_classes', JSON.stringify(bookedClasses));
  }, [bookedClasses]);

  useEffect(() => {
    localStorage.setItem('dobu_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  const login = (email, password) => {
    const mockUser = {
      id: 'user-' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      activePlan: 'intermediate',
      selectedDisciplines: ['Karate'],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
    };
    setUser(mockUser);
    return { success: true };
  };

  const register = (name, email, password, initialPlan = 'basic') => {
    const newUser = {
      id: 'user-' + Date.now(),
      name,
      email,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      activePlan: initialPlan,
      selectedDisciplines: ['Jiu-jitsu'],
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=200'
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateActivePlan = (planId) => {
    if (!user) return false;
    const updated = { ...user, activePlan: planId };
    setUser(updated);
    return true;
  };

  const bookClass = (session, day, time) => {
    const bookingId = `${day}-${time}-${session.title}`.replace(/\s+/g, '-').toLowerCase();
    const alreadyBooked = bookedClasses.some(b => b.id === bookingId);

    if (alreadyBooked) {
      return { success: false, message: 'Class is already in your schedule!' };
    }

    const newBooking = {
      id: bookingId,
      day,
      time,
      title: session.title,
      instructor: session.instructor,
      location: session.location || 'Main Dojo',
      bookedAt: new Date().toISOString()
    };

    setBookedClasses(prev => [newBooking, ...prev]);
    return { success: true, message: 'Class successfully added to your timetable!' };
  };

  const cancelBooking = (bookingId) => {
    setBookedClasses(prev => prev.filter(b => b.id !== bookingId));
  };

  const addCommunityPost = (content, category = 'General') => {
    if (!user) return;
    const newPost = {
      id: Date.now(),
      author: user.name,
      role: 'DoBu Member',
      avatar: user.avatar,
      time: 'Just now',
      category,
      content,
      likes: 0,
      comments: 0
    };
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  const likeCommunityPost = (postId) => {
    setCommunityPosts(prev =>
      prev.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        bookedClasses,
        communityPosts,
        login,
        register,
        logout,
        updateActivePlan,
        bookClass,
        cancelBooking,
        addCommunityPost,
        likeCommunityPost
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
