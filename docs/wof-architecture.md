
# 1. Introduction and Goals {#section-introduction-and-goals}

## 1.1. Stakeholder

Any person, group, or organization with an interest or concern in our project.

```markdown
| Who                                  | Intention / Needs                                                                              |
|------------------------------------- | ---------------------------------------------------------------------------------------------- |
| SW Enthusiasts & Aspiring Architects | Learn RE & SW Arc Doc. Learn Fullstack Web Development from conception to deployment.          |
| Instructor                           | Reach 10 Millions of students and give them the highest quality software development training. |
| Online Education Platform            | Attract Millions of Students.                                                                  |
```

## 1.2. Introduction
The main goal of the software system to build is to provide a clear insight into the entire development process of a full-stack web application. That is:
- Requirements Gathering
- Software Architecture Documentation
- Development Environment setup
- Web-App Development with Frontend, Backend and Database 
- Local Deployment to Ubuntu VM accessible over the internet
- Virtual Private Server Deployment accessible over the internet
- Dedicated domain name usage and secure access over the internet

For this purpose will we use a simple web app as a practical example: the game 'Wheel Of Fortune' which we will develop from conception to deployment.


## 1.3. Top functional requirements

[FRs](./wof-requirements.md)


## 1.4. Top Quality Goals

```markdown
| No.  | Quality Goal | Description                                                                                              |
|----- | ------------ | -------------------------------------------------------------------------------------------------------- |
| QG1. | Maintainable | Modular & readable code structure with clear separation of FE, BE & DB and easy to understand doc.       |
| QG2. | Portable     | Execution across multiple platforms (Windows, macOS, Linux, mobile OS) & deployment to local & VPS envs. |
| QG3. | Easy to use  | User-friendly interface with proper feedback mechanisms and accessibility via the internet.              |
```


# 2. Architecture Constraints {#section-architecture-constraints}

```markdown
| No.  | Quality Goal   | Description / Motivation                                    |
|----- | -------------- | ----------------------------------------------------------- |
| AC1. | Ubuntu VM      | Consistency among all participants & cloud env preparation. |
| AC3. | Dev Tools      | VS Code, Git, GitHub, XAMPP.                                |
| AC3. | Dev Frameworks | ARC42, C4-Model, MarkDown, PlantUml, Draw.io.               |
| AC2. | FE TECH        | HTML / CSS / Javascript because of simplicity.              |
| AC3. | BE TECH        | Node.js / Express because of simplicity.                    |
| AC3. | DB TECH        | FS & MariaDB because of simplicity.                         |
| AC3. | Language       | Englisch due to reach                                       |
```

# 3. Context and Scope {#section-context-and-scope}

[Context Diagram](./diagrams/3.wof-context.puml)

# 4. Solution Strategy {#section-solution-strategy}

# 5. Building Block View {#section-building-block-view}

[Software Components](./diagrams/5.wof-sw_components.puml)

## Interface: Frontend ↔ Backend (REST API)

FE communicates with BE via a JSON-based REST API over HTTP.

- **Base API URL:** `http://localhost:3000/api/wheel`
- **Protocol:** HTTP   
- **Data format:** JSON  
- **Data Transfer Objects(DTO):**
```javascript
interface GameState {
    wins: number;
    losses: number;
    lastResult: string;
}
```
- **Endpoints**
```markdown
| Endpoint | Method | Description              | Req Body | Resp (JSON) Example                                 |
| -------- | ------ | ------------------------ | -------- | --------------------------------------------------- |
| `/`      | GET    | Fetch current game state | –        | `{ "wins": 2, "losses": 1, "lastResult": "1000€" }` |
| `/spin`  | POST   | Spin wheel, update stats | –        | `{ "wins": 3, "losses": 1, "lastResult": "Blank" }` |
| `/reset` | POST   | Reset statistics to zero | –        | `{ "wins": 0, "losses": 0, "lastResult": null }`    |
```
- **Error handling:** Error responses are returned with HTTP status 500 and a JSON error message. 

# 6. Runtime View {#section-runtime-view}

# 7. Deployment View {#section-deployment-view}

## Development Environment

[Develoment Env](./diagrams/7.wof-dev_environment.puml)

## Local Environment Deployment

[Local Deployment](./diagrams/7.wof-local_env_deployment.puml)

## Integration Environment Deployment

[Int Deployment](./diagrams/7.wof-local_env_deployment.puml)

# 8. Cross-cutting Concepts {#section-concepts}

# 9. Architecture Decisions {#section-design-decisions}

## Frontend Technology

* Problem Statement
Which FE Tech to use for our purposes...?

* Decision Drivers
-> most important factors 

* Considered Options
- O1. HTML/CSS/Javascript
Note: considered just one option, because it was prescribed in the constraints

* Decision Outcome: O1

## Communication between Frontend & Backend

* Problem Statement
Which communication protocol to use between FE & BE...?

* Decision Drivers
-> most important factors 

* Considered Options
- O1. REST API
Note: considered just one option, because it was prescribed in the constraints

* Decision Outcome: O1

# 10. Quality Requirements {#section-quality-scenarios}

[NFRs](./wof-requirements.md)

# 11. Risks and Technical Debts {#section-technical-risks}

# 12. Glossary {#section-glossary}


```table
+-----------------------+-----------------------------------------------+
| Term                  | Definition                                    |
+=======================+===============================================+
| Arc                   | Architecture                                  |
+-----------------------+-----------------------------------------------+
| BE                    | Backend                                       |
+-----------------------+-----------------------------------------------+ 
| Doc                   | Documentation                                 |
+-----------------------+-----------------------------------------------+
| ENV                   | Environment                                   |
+-----------------------+-----------------------------------------------+ 
| FE                    | Frontend                                      |
+-----------------------+-----------------------------------------------+ 
| FS                    | Filesystem                                    |
+-----------------------+-----------------------------------------------+  
| Int                   | Integration                                   |
+-----------------------+-----------------------------------------------+ 
| RE                    | Requirements Engineering                      |
+-----------------------+-----------------------------------------------+ 
| SW                    | Software                                      |
+-----------------------+-----------------------------------------------+
```