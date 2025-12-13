# Problem Statements

## 1. Non-Functional Login System
**Issue:** The initial login page was a static UI ("prop in front") with no actual authentication logic or data entry capabilities.
**Impact:** Users could not sign up or log in using email/password, restricting access to Google Sign-In or Guest functionality only.
**Solution:** Implemented Firebase Email/Password authentication, created a `LoginForm` component with validation, and updated `AuthContext` to handle these new methods.

## 2. Lack of Route Protection
**Issue:** Application routes like `/daily-tasks` were accessible without authentication.
**Impact:** Unauthorized users could access private sections of the application by manually entering the URL.
**Solution:** Implemented client-side route protection in `src/app/(app)/layout.tsx` to redirect unauthenticated users to `/login`.

## 3. Security Vulnerability (CVE-2025-55182)
**Issue:** The application was running on versions of React (`19.2.0`) and Next.js (`16.0.5`) that were flagged for a security vulnerability.
**Impact:** Potential security risks associated with the reported CVE.
**Solution:** Updated `react` and `react-dom` to `19.2.1` and `next` to `16.0.7`, verified the build, and republished the application.

## 4. Verification Tooling Issues (Browser Extension)
**Issue:** Automated browser verification failed repeatedly due to timeouts waiting for the browser extension.
**Impact:** Unable to automatically verify UI flows.
**Solution:** Switched to manual verification and rigorous code reviews (git diffs, file reads) and build checks to ensure quality.
