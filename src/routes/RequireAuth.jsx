import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../api/apiClient";

export default function RequireAuth() {
  // Проверяем есть ли токен в localStorage
  const token = getToken();
  const location = useLocation();
  
  // Если токена нет - перенаправляем на логин
  if (!token) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  
  // Если токен есть - показываем защищенную страницу
  return <Outlet />;
}