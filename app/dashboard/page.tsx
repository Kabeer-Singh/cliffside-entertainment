"use client";
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
