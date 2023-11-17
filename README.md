# Interview Test

This project is developed for interview testing.

### Structure overview

Split to 3 services.

-   Frontend - **Vue 3**
-   Backend - **NestJS** (Backend API Gateway)
-   Service - **NestJS** (Microservice RPC Connection)

```
interview-test/
├── backend/
│   ├── src/
│   │   ├── configurations/
│   │   │   └── configuration.factory.ts
│   │   ├── helpers/
│   │   │   └── mock-response.ts
│   │   ├── resources/
│   │   │   └── service/
│   │   │       ├── controllers/
│   │   │       │   ├── service.controller.ts
│   │   │       │   └── service.controller.spec.ts
│   │   │       └── service.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── ...
├── frontend/
│   ├── public
│   ├── src/
│   │   ├── assets/
│   │   │   └── _base.css
│   │   ├── components/
│   │   │   └── Nav.vue
│   │   ├── composables/
│   │   │   ├── axios-instance.ts
│   │   │   ├── axios-instance.test.ts
│   │   │   ├── count-the-smiley-faces.service.ts
│   │   │   ├── count-the-smiley-faces.service.test.ts
│   │   │   ├── find-the-odd-int.service.ts
│   │   │   ├── find-the-odd-int.service.test.ts
│   │   │   ├── permutations.service.ts
│   │   │   └── permutations.service.test.ts
│   │   ├── router/
│   │   │   └── index.ts
│   │   ├── views/
│   │   │   ├── CountTheSmileyFaces/
│   │   │   │   ├── CountTheSmileyFacesView.vue
│   │   │   │   └── CountTheSmileyFacesView.test.ts
│   │   │   ├── FindTheOddInt/
│   │   │   │   ├── FindTheOddIntView.vue
│   │   │   │   └── FindTheOddIntView.test.ts
│   │   │   ├── Home/
│   │   │   │   └── Home.vue
│   │   │   └── Permutations/
│   │   │       ├── PermutationsView.vue
│   │   │       └── PermutationsView.test.ts
│   │   ├── App.vue
│   │   ├── main.ts
│   │   └── vite-env.d.ts
│   ├── Dockerfile
│   ├── index.html
│   ├── vite.config.ts
│   └── ...
├── service/
│   ├── src/
│   │   ├── configurations/
│   │   │   └── configuration.factory.ts
│   │   ├── exceptions/
│   │   │   └── invalid-data.exception.ts
│   │   ├── resources/
│   │   │   ├── count-the-smiley-faces/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── count-the-smiley-faces.controller.ts
│   │   │   │   │   └── count-the-smiley-faces.controller.spec.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── count-the-smiley-faces.service.ts
│   │   │   │   │   └── count-the-smiley-faces.service.spec.ts
│   │   │   │   └── count-the-smiley-faces.module.ts
│   │   │   ├── find-the-odd-int/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── find-the-odd-int.controller.ts
│   │   │   │   │   └── find-the-odd-int.controller.spec.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── find-the-odd-int.service.ts
│   │   │   │   │   └── find-the-odd-int.service.spec.ts
│   │   │   │   └── find-the-odd-int.module.ts
│   │   │   └── permutations/
│   │   │       ├── controllers/
│   │   │       │   ├── permutations.controller.ts
│   │   │       │   └── permutations.controller.spec.ts
│   │   │       ├── services/
│   │   │       │   ├── permutations.service.ts
│   │   │       │   └── permutations.service.spec.ts
│   │   │       └── permutations.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── ...
├── docker-compose.override.yml
└── docker-compose.yml
```

### Running the app

```bash
# all services
$ docker compose up

# frontend
$ docker compose up frontend

# backend
$ docker compose up backend

# service
$ docker compose up service
```

### Test

```bash
# frontend
$ docker compose run --rm frontend npm run test

# backend
$ docker compose run --rm backend npm run test

# service
$ docker compose run --rm service npm run test
```
