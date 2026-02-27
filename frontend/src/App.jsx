// import { Routes, Route } from 'react-router-dom'
// import Layout from './components/Layout'
// import Dashboard from './pages/Dashboard'
// import CampaignPage from './pages/CampaignPage'
// import PitchPage from './pages/PitchPage'
// import LeadScoringPage from './pages/LeadScoringPage'

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Dashboard />} />
//         <Route path="campaign" element={<CampaignPage />} />
//         <Route path="pitch" element={<PitchPage />} />
//         <Route path="leads" element={<LeadScoringPage />} />
//       </Route>
//     </Routes>
//   )
// }
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import CampaignPage from './pages/CampaignPage'
import PitchPage from './pages/PitchPage'
import LeadScoringPage from './pages/LeadScoringPage'

export default function App() {
  return (
    <Routes>
      {/* Landing page — shown at localhost:5173 */}
      <Route path="/" element={<LandingPage />} />

      {/* App dashboard — shown at localhost:5173/dashboard */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="campaign" element={<CampaignPage />} />
        <Route path="pitch" element={<PitchPage />} />
        <Route path="leads" element={<LeadScoringPage />} />
      </Route>
    </Routes>
  )
}