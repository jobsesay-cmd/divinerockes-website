import { LoginForm } from '@/components/forms/login-form';

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Sign in</h1>
      <LoginForm />
    </main>
  );
}