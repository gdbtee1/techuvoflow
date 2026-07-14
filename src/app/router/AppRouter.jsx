import {
  Routes,
  Route
} from "react-router-dom";


// Layout

import AppLayout
from "../../components/layout/AppLayout";


// Protection

import ProtectedRoute
from "./ProtectedRoute";


// Auth

import Signup
from "../../features/auth/pages/Signup";

import Login
from "../../features/auth/pages/Login";


// Workspace

import Onboarding
from "../../features/workspace/components/Onboarding";


// Core Pages

import Dashboard
from "../../pages/Dashboard";


// CRM

import CRM
from "../../features/crm/pages/CRM";


// Automations

import Automations
from "../../features/automations/pages/Automations";


// Inbox

import Inbox
from "../../features/inbox/Inbox";


// Appointments

import Appointments
from "../../features/appointments/pages/Appointments";


// AI Agents

import Agents
from "../../features/agents/pages/Agents";


// Analytics

import Analytics
from "../../features/analytics/pages/Analytics";


// Settings

import Settings
from "../../features/settings/pages/Settings";




function ProtectedLayout({
  children
}) {

  return (

    <ProtectedRoute>

      <AppLayout>

        {children}

      </AppLayout>

    </ProtectedRoute>

  );

}





export default function AppRouter() {

  return (

    <Routes>


      {/* PUBLIC */}

      <Route
        path="/signup"
        element={<Signup />}
      />


      <Route
        path="/login"
        element={<Login />}
      />





      {/* WORKSPACE SETUP */}

      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        }
      />






      {/* APPLICATION */}

      <Route
        path="/"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />



      <Route
        path="/crm"
        element={
          <ProtectedLayout>
            <CRM />
          </ProtectedLayout>
        }
      />



      <Route
        path="/automations"
        element={
          <ProtectedLayout>
            <Automations />
          </ProtectedLayout>
        }
      />



      <Route
        path="/inbox"
        element={
          <ProtectedLayout>
            <Inbox />
          </ProtectedLayout>
        }
      />



      <Route
        path="/appointments"
        element={
          <ProtectedLayout>
            <Appointments />
          </ProtectedLayout>
        }
      />



      <Route
        path="/agents"
        element={
          <ProtectedLayout>
            <Agents />
          </ProtectedLayout>
        }
      />



      <Route
        path="/analytics"
        element={
          <ProtectedLayout>
            <Analytics />
          </ProtectedLayout>
        }
      />



      <Route
        path="/settings"
        element={
          <ProtectedLayout>
            <Settings />
          </ProtectedLayout>
        }
      />







      {/* FUTURE READY ROUTES */}


      <Route
        path="/billing"
        element={
          <ProtectedLayout>
            <div>
              <h1 className="text-3xl font-bold">
                Billing
              </h1>
            </div>
          </ProtectedLayout>
        }
      />




      <Route
        path="/team"
        element={
          <ProtectedLayout>
            <div>
              <h1 className="text-3xl font-bold">
                Team Management
              </h1>
            </div>
          </ProtectedLayout>
        }
      />




      <Route
        path="/integrations"
        element={
          <ProtectedLayout>
            <div>
              <h1 className="text-3xl font-bold">
                Integrations
              </h1>
            </div>
          </ProtectedLayout>
        }
      />







      {/* FALLBACK */}

      <Route
        path="*"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />


    </Routes>

  );

}