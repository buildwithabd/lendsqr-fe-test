import { useState, useEffect } from 'react';
import './Table.scss';
import { mockApi } from '../services/mockApi';
import type { User, UserFilters } from '../types/user.types';
import FilterIcon from '../assets/filter-icon.svg';
import MoreIcon from '../assets/more-icon.svg';
import React from 'react';

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
  const [usersPerPage, setUsersPerPage] = useState<number>(100);
  const [totalPages, setTotalPages] = useState<number>(0);

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
  }, [currentPage, usersPerPage]);

  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await mockApi.getUsers(currentPage, usersPerPage);
      setUsers(response.data);
      setTotalUsers(response.total);
      setTotalPages(response.totalPages);
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

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setUsersPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const rangeStart = Math.max(2, currentPage - delta);
      const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

      if (rangeStart > 2) {
        pages.push('...');
      }

      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }

      if (rangeEnd < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
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

      {/* Pagination Footer */}
      <div className="table-footer">
        <div className="showing-info">
          <span>
            Showing
          </span>
          <div className="per-page-select">
            <select value={usersPerPage} onChange={handlePerPageChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <span>
            out of {totalUsers}
          </span>
        </div>

        <div className="pagination">
          {/* Previous Button */}
          <button
            className="pagination-arrow"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M9.3335 11.0833L5.25016 6.99996L9.3335 2.91663"
                stroke="#213F7D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="pagination-ellipsis">...</span>
              ) : (
                <button
                  className={`pagination-btn ${
                    currentPage === page ? 'active' : ''
                  }`}
                  onClick={() => handlePageChange(page as number)}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          {/* Next Button */}
          <button
            className="pagination-arrow"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M4.6665 2.91663L8.74984 6.99996L4.6665 11.0833"
                stroke="#213F7D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;