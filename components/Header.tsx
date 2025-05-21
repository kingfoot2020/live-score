import React, { useState, useEffect } from 'react'
import { FiSearch, FiSettings, FiChevronDown, FiUser, FiMenu, FiX, FiBell } from 'react-icons/fi'

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`sticky top-0 z-30 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
              <span className="text-primary">Bet</span>Score
            </div>
            
            <div className={`${isSearchOpen ? 'block absolute top-16 left-0 right-0 px-4 z-20 bg-white pb-3 shadow-md' : 'hidden'} md:static md:block md:shadow-none md:pb-0 md:z-auto transition-all`}>
              <div className="relative md:w-64">
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none transition-all focus:border-primary"
                />
                <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Mobile toggle buttons */}
            <button 
              className="md:hidden rounded-full p-1.5 hover:bg-gray-100 transition-colors" 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
                if (isMobileMenuOpen) setIsMobileMenuOpen(false)
              }}
              aria-label="Toggle search"
            >
              {isSearchOpen ? <FiX className="text-lg" /> : <FiSearch className="text-lg" />}
            </button>
            
            <button 
              className="md:hidden rounded-full p-1.5 hover:bg-gray-100 transition-colors" 
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen)
                if (isSearchOpen) setIsSearchOpen(false)
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="flex items-center space-x-1 border border-gray-200 rounded-md px-2 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-5 h-auto" />
                <FiChevronDown className="text-gray-500 text-xs" />
              </div>
              
              <button className="btn-primary">
                <FiUser className="mr-2" aria-hidden="true" />
                Sign In
              </button>
              
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700 relative"
                aria-label="Settings"
              >
                <FiBell className="text-lg" aria-hidden="true" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                aria-label="Settings"
              >
                <FiSettings className="text-lg" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 animate-fade-in">
            <nav className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                <a href="#" className="flex items-center px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                  <FiUser className="mr-3 text-gray-500" aria-hidden="true" />
                  <span className="font-medium">Sign In</span>
                </a>
                
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Language</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 rounded-md text-sm">
                      <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-4 h-auto" />
                      <span>English</span>
                    </button>
                  </div>
                </div>
                
                <div className="px-4 py-3 flex items-center">
                  <FiBell className="mr-3 text-gray-500" aria-hidden="true" />
                  <span className="font-medium">Notifications</span>
                  <span className="ml-auto px-2 py-0.5 bg-red-100 text-red-500 text-xs rounded-full">3</span>
                </div>
                
                <div className="px-4 py-3 flex items-center">
                  <FiSettings className="mr-3 text-gray-500" aria-hidden="true" />
                  <span className="font-medium">Settings</span>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 