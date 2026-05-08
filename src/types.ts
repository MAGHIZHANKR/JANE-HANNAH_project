import { ComponentType } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'user';
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  name: string;
  userId: string;
  timestamp: string;
  status: 'present' | 'late' | 'absent';
  confidence: number;
  cameraLocation: string;
}

export interface UnauthorizedAlert {
  id: string;
  imageUrl: string;
  timestamp: string;
  location: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface NavItem {
  title: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  roles?: ('super_admin' | 'admin' | 'user')[];
}
