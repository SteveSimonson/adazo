import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { ProductPage } from './pages/Product'
import { Why } from './pages/Why'
import { Quiz } from './pages/Quiz'
import { VibePage } from './pages/Vibe'
import { ReelsPage } from './pages/Reels'
import { WatchPage } from './pages/Watch'
import { GiftsHubPage } from './pages/Gifts'
import { GiftGuidePage } from './pages/GiftGuide'
import { BuyerGuidesHubPage } from './pages/BuyerGuides'
import { BuyerGuidePage } from './pages/BuyerGuide'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import ConbalBalloons from './components/ConbalBalloons'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GoogleAnalytics />
      <ConbalBalloons />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="gifts" element={<GiftsHubPage />} />
          <Route path="gifts/:slug" element={<GiftGuidePage />} />
          <Route path="guides" element={<BuyerGuidesHubPage />} />
          <Route path="guides/:slug" element={<BuyerGuidePage />} />
          <Route path="why" element={<Why />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="reels" element={<ReelsPage />} />
          <Route path="watch" element={<WatchPage />} />
          <Route path="vibe/:vibeId" element={<VibePage />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
