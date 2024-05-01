import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import { ProtectedRoute } from './component/ProtectedRoute';
import ProductAdminListPage from './pages/Admin/ProductAdmintList';
import ProductAdminCreatePage from './pages/Admin/ProductAdminCreatePage';
import ProductAdminDetailPage from './pages/Admin/ProductAdminDetailPage';
import ProductAdminEditPage from './pages/Admin/ProductAdminEditPage';
import CategoryAdminPage from './pages/Admin/CategoryAdminPage';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/user" element={
          <ProtectedRoute userRole="user">
            <UserDashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute userRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/kategori" element={
          <ProtectedRoute userRole="admin">
            <CategoryAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/product" element={
          <ProtectedRoute userRole="admin">
            <ProductAdminListPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/product/create" element={
          <ProtectedRoute userRole="admin">
            <ProductAdminCreatePage />
          </ProtectedRoute>
        } />
        <Route path="/admin/product/detail/:id" element={
          <ProtectedRoute userRole="admin">
            <ProductAdminDetailPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/product/edit/:id" element={
          <ProtectedRoute userRole="admin">
            <ProductAdminEditPage />
          </ProtectedRoute>
        } />
      </Routes>
      
    </div>
  )
}

export default App;
