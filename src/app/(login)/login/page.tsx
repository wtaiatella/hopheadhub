import { Input } from '@/components/hhh/input';
import React from 'react';

export default function Login() {
  return (
    <>
      <div className="bg-gradient-to-r from-primary to-secondary p-8 text-2xl text-white text-center flex-col flex items-center justify-center">
        <p className="mb-8 font-bold text-4xl">
          Hello! <span className="text-highlight font-bold">Beer</span> friend!
        </p>
        <p className="text-3xl">
          Not a <span className="text-highlight font-bold">member</span> yet?
        </p>
        <p className="text-3xl">
          Don&apos;t worry,{' '}
          <span className="text-highlight font-bold">register</span> and start
          to share your beer{' '}
          <span className="text-highlight font-bold">experiences!</span>
        </p>
      </div>

      <div className="bg-white p-24">
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <Input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
          <a href="/signup">Don&apos;t have a login? Sign up here</a>
        </div>
        <div>
          <a href="/forgot-password">Forgot your password?</a>
        </div>
      </div>
    </>
  );
}
