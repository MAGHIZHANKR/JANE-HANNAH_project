import { 
  LayoutDashboard, 
  Camera, 
  Users, 
  ShieldAlert, 
  ClipboardList, 
  Settings,
  Shield,
  BarChart2,
  User,
  Bell,
  Calendar
} from 'lucide-react';
import { NavItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  // Super Admin Items
  { title: 'Prime Dashboard', path: '/super-admin-dashboard', icon: LayoutDashboard, roles: ['super_admin'] },
  
  // Admin Items
  { title: 'Ops Dashboard', path: '/admin-dashboard', icon: LayoutDashboard, roles: ['admin'] },
  
  // Shared Admin/Super Admin
  { title: 'Live Monitoring', path: '/monitoring', icon: Camera, roles: ['admin', 'super_admin'] },
  { title: 'Attendance', path: '/attendance', icon: ClipboardList, roles: ['admin', 'super_admin'] },
  { title: 'Unauthorized Alerts', path: '/alerts', icon: ShieldAlert, roles: ['admin', 'super_admin'] },
  { title: 'User Management', path: '/users', icon: Users, roles: ['admin', 'super_admin'] },
  { title: 'Global Analytics', path: '/analytics', icon: BarChart2, roles: ['super_admin'] },
  { title: 'Nexus Authority', path: '/admins', icon: Shield, roles: ['super_admin'] },
  
  // User Items
  { title: 'My Dashboard', path: '/user-dashboard', icon: LayoutDashboard, roles: ['user'] },
  { title: 'My Attendance', path: '/my-attendance', icon: Calendar, roles: ['user'] },
  { title: 'Profile', path: '/profile', icon: User, roles: ['user'] },
  { title: 'Notifications', path: '/notifications', icon: Bell, roles: ['user'] },
  
  // Shared Items
  { title: 'Settings', path: '/settings', icon: Settings, roles: ['user', 'admin', 'super_admin'] },
];

export const DUMMY_ATTENDANCE: any[] = [
  { id: '1', name: 'Alex Johnson', userId: 'VG-001', timestamp: '2024-05-08 08:30:12', status: 'present', confidence: 98.4, location: 'Main Entrance' },
  { id: '2', name: 'Sarah Williams', userId: 'VG-002', timestamp: '2024-05-08 08:35:45', status: 'present', confidence: 99.1, location: 'East Wing' },
  { id: '3', name: 'Michael Chen', userId: 'VG-003', timestamp: '2024-05-08 08:45:10', status: 'late', confidence: 96.8, location: 'Parking Gate' },
  { id: '4', name: 'Elena Rodriguez', userId: 'VG-004', timestamp: '2024-05-08 09:02:33', status: 'present', confidence: 97.2, location: 'Main Entrance' },
  { id: '5', name: 'David Kim', userId: 'VG-005', timestamp: '2024-05-08 09:15:12', status: 'present', confidence: 99.5, location: 'Lab Area' },
];

export const DUMMY_STATS = {
  totalAttendance: { value: 124, change: '+12%', label: 'Attendance Today' },
  unauthorized: { value: 3, change: '-25%', label: 'Unauthorized Alerts' },
  activeCameras: { value: 12, change: 'All Stable', label: 'Active Cameras' },
  registeredUsers: { value: 450, change: '+5', label: 'Registered Users' },
};
