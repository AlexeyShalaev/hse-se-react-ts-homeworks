import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { selectUsers } from '../store/usersSlice';

export default function UserList() {
  const users = useSelector(selectUsers);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Список пользователей</h1>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg divide-y">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 flex items-center justify-between hover:bg-gray-50"
          >
            <span className="text-gray-900">{user.name}</span>
            <Link
              to={`/user/${user.id}`}
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            >
              Редактировать
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}