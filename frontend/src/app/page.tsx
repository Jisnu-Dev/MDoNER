import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      {/* Main Content Area */}
      <main className="flex-grow py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI-Powered DPR Quality Assessment & Risk Prediction System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing project evaluation with intelligent assessment, 
              risk prediction, and transparent decision-making for sustainable 
              development in North Eastern India.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
