# GST & Tax Website — Phase 10

## Public Website UI

Phase 10 builds the public-facing Angular website on top of the Phase 9 foundation.

### Included
- Responsive premium GST & Tax Consultant home page
- Header/navigation and footer
- Dynamic profile information from `GET /api/profile`
- Dynamic services from `GET /api/services`
- Service detail route: `/services/:slug`
- About page: `/about`
- Contact page: `/contact`
- Inquiry form connected to `POST /api/inquiries`
- WhatsApp floating button using the profile WhatsApp number
- WhatsApp inquiry URL returned by the backend
- Mobile responsive layout

### Run

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
npm install
npm start
```

Open `http://localhost:4200`.

### API

The frontend expects the backend at:
`http://localhost:5000/api`

Change `src/environments/environment.ts` if required.

### Important

Phase 10 does not include the admin panel. Admin dashboard, service management UI, uploads and protected admin workflows remain for later phases.
