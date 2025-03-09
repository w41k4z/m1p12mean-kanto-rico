# Auto-Care Project

## Development environment

### Step 1: Database

```bash
cd auto-care-database
```
```bash
docker-compose up --build -d
```

### Step 2: Server

Start the containers using Docker Compose:

```bash
cd server
```
```bash
npm install
```
```bash
npm run seed
```
```bash
npm run dev
```
