# Lendsqr Frontend Engineering Assessment

This repository contains my submission for the **Lendsqr Frontend Engineering Assessment**.  
The project is a pixel-perfect implementation of selected screens from the Lendsqr Admin Console, built with **React**, **TypeScript**, and **SCSS**, following modern frontend best practices.

The goal of this assessment is to demonstrate:
- Attention to visual detail
- Strong frontend architecture and code quality
- Correct use of React, TypeScript, and SCSS
- Data handling at scale (500 mock users)
- Responsiveness and test coverage

---

## 🔗 Live Demo

**Deployed Application:**  
https://<candidate-name>-lendsqr-fe-test.<cloud-platform-domain>

> Example: https://abdullah-agboola-lendsqr-fe-test.vercel.app

---

## 📁 Pages Implemented

The following pages were implemented based on the provided Figma design:

1. **Login Page**
   - Static authentication flow
   - Client-side validation
   - Responsive layout

2. **Dashboard**
   - Overview metrics
   - Navigation to users section
   - Fully responsive layout

3. **Users Page**
   - Fetches **500 users** from a mock API
   - Pagination
   - Filtering and status indicators
   - Click-through to user details

4. **User Details Page**
   - Displays full user profile
   - Data persisted and retrieved from **localStorage**
   - Tab-based layout as per design

---

## 🧰 Tech Stack

- **React** (with functional components and hooks)
- **TypeScript** (strict typing enabled)
- **SCSS** (modular, scalable styling)
- **React Router** (routing)
- **Jest & React Testing Library** (unit testing)
- **Mock API** (JSON Generator / Mocky)

---

## 🧪 Testing

Unit tests were implemented to cover:
- Positive and negative rendering scenarios
- Component state handling
- Data fetching and empty/error states

Tests are colocated with components where applicable to improve maintainability.

To run tests locally:

```bash
npm run test
