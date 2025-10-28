import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Bus, Route, Settings, ChevronRight, Search } from 'lucide-react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();

	const navigation = [
		{
			name: 'Locations',
			href: '/locations',
			icon: MapPin,
			description: 'Manage airports and locations'
		},
		{
			name: 'Transportations',
			href: '/transportations',
			icon: Bus,
			description: 'Manage transport options'
		},
		{
			name: 'Routes',
			href: '/routes',
			icon: Route,
			description: 'Find optimal routes'
		},
	];

	// Close sidebar when route changes on mobile
	useEffect(() => {
		if (window.innerWidth < 1024) {
			setSidebarOpen(false);
		}
	}, [location]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
			{/* Sidebar for Desktop - Fixed position */}
			<div className="hidden lg:flex lg:flex-shrink-0">
				<div className="w-80 flex flex-col fixed left-0 top-0 h-screen bg-white/95 backdrop-blur-xl border-r border-slate-200/60 shadow-xl z-30">
					{/* Desktop Header */}
					<div className="flex items-center h-20 px-6 border-b border-slate-200/60 flex-shrink-0">
						<div className="flex items-center space-x-3">
							<div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
								<Route className="w-6 h-6 text-white" />
							</div>
							<div>
								<h1 className="text-xl font-bold text-slate-900">RouteFinder</h1>
								<p className="text-sm text-slate-500">Case Routes</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
						{navigation.map((item) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.href;
							return (
								<Link
									key={item.name}
									to={item.href}
									className={`
                    group flex items-center justify-between p-4 rounded-2xl transition-all duration-200 
                    border border-transparent
                    ${isActive
											? 'bg-blue-50 border-blue-200 shadow-sm'
											: 'hover:bg-slate-50 hover:shadow-sm'
										}
                  `}
								>
									<div className="flex items-center space-x-3">
										<div className={`
                      p-2 rounded-xl transition-colors
                      ${isActive
												? 'bg-blue-500 text-white'
												: 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
											}
                    `}>
											<Icon size={20} />
										</div>
										<div className="text-left">
											<div className={`
                        font-semibold transition-colors
                        ${isActive ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}
                      `}>
												{item.name}
											</div>
											<div className="text-sm text-slate-500">
												{item.description}
											</div>
										</div>
									</div>
									<ChevronRight
										size={16}
										className={`
                      transition-transform flex-shrink-0
                      ${isActive ? 'text-blue-500' : 'text-slate-300 group-hover:text-slate-400'}
                      ${isActive ? 'translate-x-0' : '-translate-x-1 group-hover:translate-x-0'}
                    `}
									/>
								</Link>
							);
						})}
					</nav>

					{/* Footer */}
				</div>
			</div>

			{/* Mobile Sidebar Overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Mobile Sidebar */}
			<div className={`
        lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/60 
        transform transition-transform duration-300 ease-in-out shadow-xl
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
				<div className="flex flex-col h-full">
					{/* Mobile Sidebar Header */}
					<div className="flex items-center justify-between h-16 px-4 border-b border-slate-200/60 flex-shrink-0">
						<h2 className="text-lg font-semibold text-slate-900">Menu</h2>
						<button
							onClick={() => setSidebarOpen(false)}
							className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
						>
							<X size={20} />
						</button>
					</div>

					{/* Mobile Navigation */}
					<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
						{navigation.map((item) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.href;
							return (
								<Link
									key={item.name}
									to={item.href}
									className={`
                    group flex items-center justify-between p-4 rounded-2xl transition-all duration-200 
                    mobile-tap-target border border-transparent
                    ${isActive
											? 'bg-blue-50 border-blue-200 shadow-sm'
											: 'hover:bg-slate-50 hover:shadow-sm'
										}
                  `}
									onClick={() => setSidebarOpen(false)}
								>
									<div className="flex items-center space-x-3">
										<div className={`
                      p-2 rounded-xl transition-colors
                      ${isActive
												? 'bg-blue-500 text-white'
												: 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600'
											}
                    `}>
											<Icon size={20} />
										</div>
										<div className="text-left">
											<div className={`
                        font-semibold transition-colors
                        ${isActive ? 'text-blue-700' : 'text-slate-700 group-hover:text-slate-900'}
                      `}>
												{item.name}
											</div>
										</div>
									</div>
									<ChevronRight
										size={16}
										className={`
                      transition-transform flex-shrink-0
                      ${isActive ? 'text-blue-500' : 'text-slate-300 group-hover:text-slate-400'}
                    `}
									/>
								</Link>
							);
						})}
					</nav>
				</div>
			</div>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col lg:ml-80 min-w-0">
				{/* Mobile Header */}
				<header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 flex-shrink-0">
					<div className="flex items-center justify-between h-16 px-4">
						<button
							onClick={() => setSidebarOpen(true)}
							className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors mobile-tap-target"
						>
							<Menu size={24} />
						</button>

						<div className="flex items-center space-x-2">
							<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
								<Route className="w-4 h-4 text-white" />
							</div>
							<h1 className="text-lg font-bold text-slate-900">RouteFinder</h1>
						</div>

						<div className="w-10"></div>
					</div>
				</header>

				{/* Desktop Header */}
				<header className="hidden lg:sticky lg:top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex-shrink-0">
					<div className="flex items-center justify-between h-20 px-8">
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-1 text-sm text-slate-500">
								<span>Welcome to</span>
								<span className="font-semibold text-slate-700">RouteFinder</span>
							</div>
						</div>

						<div className="flex items-center space-x-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
								<input
									type="text"
									placeholder="Search..."
									className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
								/>
							</div>
						</div>
					</div>
				</header>

				{/* Page Content - This should be perfectly aligned */}
				<main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
					<div className="max-w-7xl mx-auto w-full">
						{children}
					</div>
				</main>
			</div>
		</div>
	);
};

export default Layout;
