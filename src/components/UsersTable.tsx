// UsersTable.tsx
import { useState, useEffect } from 'react';
import './Table.module.scss';
import { mockApi } from '../services/mockApi';
import type { User, UserFilters } from '../types/user.types';
import FilterIcon from '../assets/filter-icon.svg';
import MoreIcon from '../assets/more-icon.svg';

interface TableHeader {
  key: keyof UserFilters;
  label: string;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<keyof User | null>(null);
  const [filters, setFilters] = useState<UserFilters>({
    organization: '',
    username: '',
    email: '',
    phone: '',
    dateJoined: '',
    status: ''
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const usersPerPage = 100;

  const headers: TableHeader[] = [
    { key: 'organization', label: 'Organization' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone Number' },
    { key: 'dateJoined', label: 'Date Joined' },
    { key: 'status', label: 'Status' }
  ];

  // Fetch users on component mount or page change
  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await mockApi.getUsers(currentPage, usersPerPage);
      setUsers(response.data);
      setTotalUsers(response.total);
      setError(null);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (key: keyof User): void => {
    setActiveFilter(activeFilter === key ? null : key);
  };

  const applyFilters = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await mockApi.filterUsers(filters);
      setUsers(response.data);
      setTotalUsers(response.total);
      setActiveFilter(null);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to filter users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = (): void => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      phone: '',
      dateJoined: '',
      status: ''
    });
    setCurrentPage(1);
    fetchUsers();
    setActiveFilter(null);
  };

  const handleFilterChange = (key: keyof UserFilters, value: string): void => {
    setFilters({ ...filters, [key]: value });
  };

  if (loading && users.length === 0) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              {headers.map((header) => (
                <th key={header.key}>
                  <div className="header-cell">
                    <span>{header.label}</span>
                    <img
                      src={FilterIcon}
                      alt="Filter"
                      className={`filter-icon ${
                        filters[header.key] ? 'active' : ''
                      }`}
                      onClick={() => handleFilterClick(header.key)}
                    />
                  </div>

                  {activeFilter === header.key && (
                    <div className="filter-dropdown">
                      <div className="filter-form">
                        <div className="filter-group">
                          <label>{header.label}</label>
                          {header.key === 'status' ? (
                            <select
                              value={filters[header.key] || ''}
                              onChange={(e) =>
                                handleFilterChange(header.key, e.target.value)
                              }
                            >
                              <option value="">Select</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                              <option value="Blacklisted">Blacklisted</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              placeholder={header.label}
                              value={filters[header.key] || ''}
                              onChange={(e) =>
                                handleFilterChange(header.key, e.target.value)
                              }
                            />
                          )}
                        </div>

                        <div className="filter-buttons">
                          <button className="reset" onClick={resetFilters}>
                            Reset
                          </button>
                          <button className="apply" onClick={applyFilters}>
                            Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody className="table-body">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <span className={`status ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="actions-menu">
                    <button className="actions-btn">
                      <img src={MoreIcon} alt="Actions" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <p>
          Showing {(currentPage - 1) * usersPerPage + 1} to{' '}
          {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} users
        </p>
      </div>
    </div>
  );
};

export default UsersTable;