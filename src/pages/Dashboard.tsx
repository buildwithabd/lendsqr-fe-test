import './Dashboard.scss';
import UsersTable from '../components/UsersTable';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Users</h1>
            <div className='stats'>
                <div className="stat-card">
                    <div className="stat-icon">
                        <img src='/components/d_users.svg' alt='users' />
                    </div>
                    <div className="stat-content">
                        <p>USERS</p>
                        <h2>2,453</h2>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon active-users">
                        <img src='/components/active_users.svg' alt='active users' />
                    </div>
                    <div className="stat-content">
                        <p>ACTIVE USERS</p>
                        <h2>2,453</h2>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon loans">
                        <img src='/components/loan.svg' alt='loans' />
                    </div>
                    <div className="stat-content">
                        <p>USERS WITH LOANS</p>
                        <h2>12,453</h2>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon savings">
                        <img src='/components/money.svg' alt='savings' />
                    </div>
                    <div className="stat-content">
                        <p>USERS WITH SAVINGS</p>
                        <h2>102,453</h2>
                    </div>
                </div>
            </div>
            <UsersTable />
        </div>
    )
}

export default Dashboard