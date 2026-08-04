import React, { useContext, useState } from 'react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/login.css';

const roleToPath = {
  'Centre Head': '/dashboard/centre-head',
  'Cluster Manager': '/dashboard/cluster-manager',
  'Department Head': '/dashboard/department-head',
  'Regional Head': '/dashboard/regional-head',
  Director: '/dashboard/director',
  Chairperson: '/dashboard/chairperson',
  'Purchase Manager': '/dashboard/purchase-manager',
  Accounts: '/dashboard/accounts',
};

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeTab = (tab) => {
    setActiveTab(tab);
    setError('');
    setSuccessMessage('');
    setShowPassword(false);
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;

    setSignupData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (error) {
      setError('');
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = loginData.email.trim().toLowerCase();
    const password = loginData.password;

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      const user = await login(email, password);
      const dashboardPath = roleToPath[user.role];

      if (!dashboardPath) {
        throw new Error('No dashboard is configured for this account.');
      }

      navigate(dashboardPath, { replace: true });
    } catch (requestError) {
      console.error('Login failed:', requestError);

      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          'Unable to connect to the server.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    if (
      !signupData.name.trim() ||
      !signupData.email.trim() ||
      !signupData.password
    ) {
      setError('Please complete all signup fields.');
      return;
    }

    /*
      Your current backend ZIP does not contain a public registration endpoint.
      This prevents the page from pretending that an account was created.
    */
    setError('');
    setSuccessMessage(
      'Account creation is managed by the campus administrator. Please contact the administrator for access.'
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-brand-panel">
        <div className="auth-brand-top">
       <div className="auth-logo">
  <img
    src="/sapiens-logo.png"
    alt="Sapiens Group of Institutes"
  />
</div>

          <div>
            <p className="auth-brand-name">SAPIENS GROUP</p>
            <h2 className="auth-brand-type">of Institutes</h2>
          </div>
        </div>

        <div className="auth-hero-content">
          <p className="auth-eyebrow">Campus Head</p>

          <h1 className="auth-hero-title">
            Requirement Portal
          </h1>

          <p className="auth-description">
            Generate, route and track every requirement across all five
            campuses—from Centre Head to Accounts—with a single clean workflow.
          </p>
        </div>

        <p className="auth-motto">
          नभः स्पृशं · Touching the skies
        </p>

        <div className="auth-decoration" aria-hidden="true" />
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrapper">
          <div className="auth-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'login'}
              className={`auth-tab ${
                activeTab === 'login' ? 'auth-tab-active' : ''
              }`}
              onClick={() => changeTab('login')}
            >
              Login
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'signup'}
              className={`auth-tab ${
                activeTab === 'signup' ? 'auth-tab-active' : ''
              }`}
              onClick={() => changeTab('signup')}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="auth-alert auth-alert-error" role="alert">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="auth-alert auth-alert-success" role="status">
              {successMessage}
            </div>
          )}

          {activeTab === 'login' ? (
            <form className="auth-form" onSubmit={handleLogin}>
              <div className="auth-field">
                <label htmlFor="login-email">Email</label>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="you@sapiens.edu"
                  autoComplete="email"
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>

                <div className="auth-password-wrapper">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword((previousValue) => !previousValue)
                    }
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle
                      size={20}
                      className="auth-spinner"
                    />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>

              <p className="auth-login-help">
                Use the credentials provided by your campus administrator.
              </p>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleSignup}>
              <div className="auth-field">
                <label htmlFor="signup-name">Full Name</label>

                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-email">Email</label>

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="you@sapiens.edu"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-password">Password</label>

                <div className="auth-password-wrapper">
                  <input
                    id="signup-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword((previousValue) => !previousValue)
                    }
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-submit-button">
                Request Access
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Login;
