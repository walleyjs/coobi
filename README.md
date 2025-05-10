# Coobi Intervention Engine – Server-Side Micro-Intervention & Flexible Content Model

## Overview
This project is a backend system for delivering tailored micro-interventions (reflections, exercises, psychoeducation) for addiction recovery. It dynamically selects and returns the appropriate intervention for each user based on their biometric and behavioral data, supporting localization, branching, and ordered steps.

---

## Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL database (local or remote)

---

## Installation & Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure your database:**
   - Copy `.env.example` to `.env` and set your `DATABASE_URL` for PostgreSQL.

4. **Run database migrations:**
   ```sh
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Seed the database with sample data:**
   ```sh
   npx prisma db seed
   ```

6. **Start the GraphQL server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
   The server will be available at [http://localhost:4000](http://localhost:4000)

---

## Example GraphQL Usage

### Get the Next Intervention for a User
```graphql
query {
  nextIntervention(userId: "<USER_ID>") {
    id
    slug
    category
    isActive
    steps {
      id
      stepOrder
      type
      content
      logic
    }
  }
}
```

### Submit a Response to an Exercise Step
```graphql
mutation {
  submitExerciseStepResponse(
    userId: "<USER_ID>"
    stepId: "<STEP_ID>"
    response: { answer: "yes" }
  ) {
    id
    userId
    stepId
    response
    createdAt
  }
}
```

---

## API Output Structure (Frontend Guide)
- **Exercise**: Contains `id`, `slug`, `category`, `isActive`, and an array of `steps`.
- **Step**: Each step has `id`, `stepOrder`, `type` (e.g., `question`, `info`, `reflection`), `content` (localized prompts/options), and optional `logic` for branching.
- **Frontend Rendering**:
  - For `type: "question"`, render radio/select options from `content.options`.
  - For `type: "reflection"`, render a free-text input.
  - For `type: "info"`, display the prompt as information.
  - Use the `logic` field to determine the next step based on user response if present.

---

## Extending & Testing
- **Add more users or interventions** by editing `prisma/seed.ts` and re-running the seed script.
- **Test all branches** by adjusting user metrics and running the `nextIntervention` query.
- **Add new step types or branching logic** by updating the schema and seed data.
- **Check user progress** by querying `ExerciseStepResponse` records for a user.

