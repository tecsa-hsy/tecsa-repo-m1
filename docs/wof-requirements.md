
# Requirements according to ISO/IEC 9126 quality model
[ISO/IEC 9126: en.wikipedia.org/wiki/ISO/IEC_9126](https://en.wikipedia.org/wiki/ISO/IEC_9126)

---

## 1. Introduction
- This course is not intended to turn you into a coding expert. 
- This course aims to provide you with a clear insight into the entire development process of a full-stack web application. 
- Using a simple web app as a practical example: the game 'WoF,' which we will develop from conception to deployment.

## 2. Functional Requirements: describe *what* the system does

**1. Functionality:**

[Frontend MockUp with Draw.io](./diagrams/wof-frontend-mockup.drawio)

* **FR.1.1 Spin Wheel:**
    * FR.1.1.1 The system shall allow the user to initiate a "spin" action via a dedicated button in the frontend.
    * FR.1.1.2 The frontend shall send a request to the backend to determine the spin result.
    * FR.1.1.3 The backend shall randomly select a result ("Blank", "1000$", "5000$") based on predefined probabilities/weights.
    * FR.1.1.4 The backend shall update the game state (wins/losses, last result) based on the spin outcome.
    * FR.1.1.5 The backend shall return the updated game state to the frontend.
    * FR.1.1.6 The frontend shall display the final spin result to the user.
    * FR.1.1.7 The frontend shall update the win/loss statistics based on the backend's response.
* **FR.1.2 Display Game State:**
    * FR.1.2.1 The system shall display the current win and loss statistics to the user.
    * FR.1.1.2 Upon initial load or refresh, the frontend shall fetch the latest game state from the backend and display it.
* **FR.1.3 Reset Statistics:**
    * FR.1.3.1 The system shall allow the user to reset the win and loss statistics via a dedicated button.
    * FR.1.3.2 Upon reset, the frontend shall send a request to the backend to clear the statistics.
    * FR.1.3.3 The backend shall reset the win and loss counts to zero and clear the last result.
    * FR.1.3.4 The backend shall return the reset game state to the frontend.
    * FR.1.3.5 The frontend shall update the displayed statistics to zero and clear the result message.
* **FR.1.4 Persistent Game State:**
    * FR.1.4.1 The backend shall store the game's win/loss statistics and the last result persistently in a file (`lucky_wheel_state.json`).
    * FR.1.4.2 The game state shall be loaded from this file upon backend startup.
    * FR.1.4.3 The game state shall be saved to this file after every spin and every reset action.
    * FR.1.4.4 In the last version of the system, the game state shall be saved to a MariaDB instead of a file.

---

## Non-Functional Requirements: describe *how well* the system performs its functions

**1. Maintainability:**
* **NFR.1.1 Modularity:** The codebase is separated into distinct frontend and backend components, communicating via a well-defined REST API.
* **NR.1.2 Readability:** All code shall follow the Airbnb JavaScript Style Guide and the Google HTML/CSS Style Guide. Variable and function names must be clear and descriptive. Core logic shall be documented with comments. Adherence is verified via code review and ESLint configuration..
* **NR.1.3 Testability:** The clear separation of concerns (UI vs. business logic) allows for easier testing of individual components (backend API endpoints should be testable independently).

**2. Reliability:**
* **NR.2.1 Fault Tolerance (Backend):** The backend shall gracefully handle cases where the game state file is not found or is corrupted upon reading, by initializing a new game state.
* **NR.2.2 Error Handling (Frontend):** The frontend shall display user-friendly error messages if communication with the backend fails.
* **NR.2.3 Error Logging (Backend):** The backend shall log errors to the console when file operations fail.

**3. Portability:**
* **NR.3.1 Platform Independence (Backend):** The backend, shall be executable on the following operating systems: Windows, macOS, Linux, Android, Ios.
* **NR.3.2 Platform Independence (Frontend):** The frontend shall be viewable in the following modern web browser on desktop & mobile devices: Chrome, Firefox, Edge & Safari.
* **NR.3.3 Deployment Environment:** The application shall be deployable to the local development environment and to a virtual private server.

**4. Usability:**
* **NR.4.1 User Interface Clarity:** The user interface shall clearly present the "Spin" button, the result message, and the win/loss statistics.
* **NR.4.2 Responsiveness (UI):** The "Spin" button shall be disabled during the spinning animation to prevent multiple concurrent spins.
* **NR.4.3 Feedback:** The frontend shall provide visual feedback (e.g., spinning animation, changing text) while the wheel is being spun and before the final result is displayed.
* **NR.4.4 Language:** The user interface shall primarily use English for user-facing text and messages.
* **NR.4.4 Internet Accessibility:** The application must be accessible via the internet at a dedicated domain name.

**5. Efficiency:**
* **NR.5.1 Response Time:** The backend shall respond to spin and reset requests within a 100-500ms under normal load, excluding the frontend's artificial delay.
* **NR.5.2 Resource Usage:** The backend shall not exceed an average CPU usage of 15% and memory usage of 300 MB during normal operation, as measured over 10mins under typical load (2 concurrent users).

**6. Security:**
* **NR.6.1 Data Confidentiality (HTTPS):** The system shall ensure that all data transmitted between the client (frontend) and the server (backend) is encrypted using HTTPS 
* **NR.6.2 Data Integrity (HTTPS):** The system shall ensure that all data transmitted between the client and the server cannot be altered without detection during transit.
* **NR.6.3 Authentication (Server Certificate):** The system shall present a valid SSL/TLS certificate to the client, allowing the client to verify the identity of the server.

---