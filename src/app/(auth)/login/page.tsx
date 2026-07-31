export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left Image */}
      <div
        className="relative hidden w-1/2 bg-cover bg-center lg:flex"
        style={{
          backgroundImage: "url('/src/assets/images/banana.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative flex w-full flex-col justify-between p-12 text-white">
          <h1 className="text-5xl font-bold tracking-wide">
            SleekFinds
          </h1>

          <div>
            <h2 className="text-5xl font-bold leading-tight">
              Curated Heritage
              <br />
              for the Conscious Collector.
            </h2>

            <p className="mt-5 max-w-md text-lg text-gray-200">
              Join our community of enthusiasts preserving craftsmanship
              through sustainable second-hand luxury.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full items-center justify-center bg-background px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="mb-12 flex gap-8 border-b border-border pb-4">
            <button
              type="button"
              className="border-b-2 border-primary pb-2 font-semibold text-foreground"
            >
              Sign In
            </button>

            <button
              type="button"
              className="pb-2 text-muted transition hover:text-foreground"
            >
              Create Account
            </button>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-foreground">
            Welcome Back
          </h2>

          <p className="mt-2 text-muted">
            Enter your details to access your curated collection.
          </p>

          {/* Form */}
          <form className="mt-10 space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>

              <input
                type="email"
                placeholder="name@example.com"
                className="mt-2 w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm text-muted transition hover:text-foreground"
                >
                  Forgot?
                </button>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-lg border border-border bg-surface p-3 text-foreground placeholder:text-muted-light outline-none transition focus:border-primary"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-primary py-3 font-medium text-white transition hover:bg-primary-hover"
            >
              Sign In →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}