import {useRouter} from "next/router";
import Styles from './Home.module.css'
import ReactMarkdown from 'react-markdown'

export const HomePage = () => {
    const router = useRouter()
    const getStartedClick = () => {
        router.push('/users')
    }

    return (
        <div className={Styles.homeContainer}>
            <h1 className={Styles.projectName}>Users and Posts</h1>
            <div className={Styles.description}>
                <p>
                    GitHub Repository: <a href="https://github.com/NeriRos/users-and-posts">NeriRos/users-and-posts</a>
                </p>
            </div>
            <ReactMarkdown className={Styles.content}>
                {`
## Introduction

You're about to work on a task that encompasses 4 main components:

**External Data Source**

This is an external API that's the source of user and post data. These are it’s endpoints

- users: https://jsonplaceholder.typicode.com/users
- posts: https://jsonplaceholder.typicode.com/posts?userId={userId}

**Database**

A MySQL database Docker container (Please use version mysql:5.7.42 as the latest version has instability issues with
connections)

**Backend Server**

This is your own internal API, built on top of typescript and node to communicate with both the external data source and
the local MySQL database

**Frontend Application**

A UI interface built using React and TypeScript.

## How to test

1. Navigate to the users management page: https://users-and-posts-seven.vercel.app/users
2. Play with the pagination and sorting features.
3. Click on a user to navigate to the user's posts page.
4. Filter posts by title or content.
5. Delete a post and see that it is removed from the list, try refreshing.
6. Delete all posts and see that they come back (because they are fetched from the external API and saved).

## Task Details

### Part 1: User Table

Your task begins with building a users table:

- Set up an internal API endpoint that fetches a list of users from the external API.
- Display these users in an organized table that supports:
    - Pagination (show 4 users at a time)
    - Sorting users by their names
    - Displaying user details:
        - Full name
        - Email address
        - Address
            - Formatted as “street, suite, city, zipcode”).
            - Keep the address column at 50px and use ellipsis (...) for any overflow.

### Part 2: User Posts

When clicking a user row, the app will navigate to a new page that displays a list of the user's posts, fetched from the
backend.

- Your backend should be smart enough to first check for the user's posts in the local MySQL database. If they exist,
  use
  them. If not, fetch them from the external posts API, store them in the local database, and then use them.
- Ensure the backend endpoint for fetching user's posts supports pagination.
- Each post should display the Title, Body, and a Delete icon (pick any suitable icon library).
- When the Delete icon is clicked, the post should be deleted from the local database, and the frontend should reflect
  this change
- Add a text input field at the top of the posts. Whenever the text changes, the already fetched posts should be
  filtered
  to display only those titles that contain the input text.
- Keep the design intuitive and ensure readability of posts.

## Tech Stack

You are required to use

- Node.JS with Typescript
- React with Typescript
- MySQL docker container

Other than that please feel free to use any library/framework you’d like.

## Objective

- This task is designed to understand your dev skills in a typical day-to-day task scenario.
- Code should be production ready, well organized, and maintainable.

`}
            </ReactMarkdown>
            <button className={Styles.getStarted} onClick={getStartedClick}>Get Started</button>
        </div>
    )
}