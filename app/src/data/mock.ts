// Mock data for the T3 Chat Clone UI

export type User = {
	id: string
	name: string
	email: string
	authProvider: 'google'
	createdAt: string
	updatedAt: string
}

export type ThreadMessage = {
	id: string
	type: 'reasoning' | 'text' | 'image'
	role: 'user' | 'assistant'
	content: string
	timestamp: string
}

export type Thread = {
	id: string
	userId: string
	title: string
	messages: ThreadMessage[]
	createdAt: string
	updatedAt: string
}

// Mock user
export const mockUser: User = {
	id: 'user-1',
	name: 'John Doe',
	email: 'john.doe@example.com',
	authProvider: 'google',
	createdAt: '2024-01-01T00:00:00Z',
	updatedAt: '2024-01-01T00:00:00Z'
}

// Mock chat threads with realistic conversations
export const mockThreads: Thread[] = [
	{
		id: 'thread-1',
		userId: 'user-1',
		title: 'React Component Help',
		createdAt: '2024-01-15T10:30:00Z',
		updatedAt: '2024-01-15T11:15:00Z',
		messages: [
			{
				id: 'msg-1',
				type: 'text',
				role: 'user',
				content: 'Can you help me create a React component that displays user data?',
				timestamp: '2024-01-15T10:30:00Z'
			},
			{
				id: 'msg-2',
				type: 'text',
				role: 'assistant',
				content: 'I\'d be happy to help you create a React component for displaying user data! Here\'s a simple example:\n\n```tsx\nimport React from \'react\';\n\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n  avatar?: string;\n}\n\ninterface UserCardProps {\n  user: User;\n}\n\nconst UserCard: React.FC<UserCardProps> = ({ user }) => {\n  return (\n    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">\n      {user.avatar && (\n        <img\n          src={user.avatar}\n          alt={user.name}\n          className="w-16 h-16 rounded-full mx-auto mb-4"\n        />\n      )}\n      <h2 className="text-xl font-semibold text-center mb-2">{user.name}</h2>\n      <p className="text-gray-600 text-center">{user.email}</p>\n    </div>\n  );\n};\n\nexport default UserCard;\n```\n\nThis component:\n- Uses TypeScript interfaces for type safety\n- Displays user name, email, and optional avatar\n- Uses Tailwind CSS for styling\n- Is reusable and follows React best practices\n\nWould you like me to modify it in any way?',
				timestamp: '2024-01-15T10:32:00Z'
			},
			{
				id: 'msg-3',
				type: 'text',
				role: 'user',
				content: 'That looks great! Can you add a loading state to it?',
				timestamp: '2024-01-15T11:10:00Z'
			},
			{
				id: 'msg-4',
				type: 'text',
				role: 'assistant',
				content: 'Absolutely! Here\'s the updated component with a loading state:\n\n```tsx\nimport React from \'react\';\n\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n  avatar?: string;\n}\n\ninterface UserCardProps {\n  user?: User;\n  isLoading?: boolean;\n}\n\nconst UserCard: React.FC<UserCardProps> = ({ user, isLoading = false }) => {\n  if (isLoading) {\n    return (\n      <div className="bg-white rounded-lg shadow-md p-6 max-w-sm animate-pulse">\n        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>\n        <div className="h-6 bg-gray-300 rounded mb-2"></div>\n        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>\n      </div>\n    );\n  }\n\n  if (!user) {\n    return (\n      <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">\n        <p className="text-gray-500 text-center">No user data available</p>\n      </div>\n    );\n  }\n\n  return (\n    <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">\n      {user.avatar && (\n        <img\n          src={user.avatar}\n          alt={user.name}\n          className="w-16 h-16 rounded-full mx-auto mb-4"\n        />\n      )}\n      <h2 className="text-xl font-semibold text-center mb-2">{user.name}</h2>\n      <p className="text-gray-600 text-center">{user.email}</p>\n    </div>\n  );\n};\n\nexport default UserCard;\n```\n\nNow the component:\n- Shows a skeleton loading animation when `isLoading` is true\n- Handles the case when no user data is provided\n- Uses Tailwind\'s `animate-pulse` for a smooth loading effect\n\nYou can use it like this:\n```tsx\n// Loading state\n<UserCard isLoading={true} />\n\n// With user data\n<UserCard user={userData} />\n```',
				timestamp: '2024-01-15T11:15:00Z'
			}
		]
	},
	{
		id: 'thread-2',
		userId: 'user-1',
		title: 'API Integration Question',
		createdAt: '2024-01-14T14:20:00Z',
		updatedAt: '2024-01-14T15:45:00Z',
		messages: [
			{
				id: 'msg-5',
				type: 'text',
				role: 'user',
				content: 'What\'s the best way to handle API errors in a React application?',
				timestamp: '2024-01-14T14:20:00Z'
			},
			{
				id: 'msg-6',
				type: 'text',
				role: 'assistant',
				content: 'Great question! Here are several effective approaches for handling API errors in React:\n\n## 1. Custom Hook Approach\n\n```tsx\nimport { useState, useCallback } from \'react\';\n\ninterface ApiError {\n  message: string;\n  status?: number;\n  code?: string;\n}\n\ninterface UseApiState<T> {\n  data: T | null;\n  loading: boolean;\n  error: ApiError | null;\n}\n\nfunction useApi<T>() {\n  const [state, setState] = useState<UseApiState<T>>({\n    data: null,\n    loading: false,\n    error: null,\n  });\n\n  const execute = useCallback(async (apiCall: () => Promise<T>) => {\n    setState({ data: null, loading: true, error: null });\n    \n    try {\n      const result = await apiCall();\n      setState({ data: result, loading: false, error: null });\n      return result;\n    } catch (err) {\n      const error: ApiError = {\n        message: err instanceof Error ? err.message : \'Unknown error\',\n        status: err?.response?.status,\n        code: err?.code,\n      };\n      setState({ data: null, loading: false, error });\n      throw error;\n    }\n  }, []);\n\n  return { ...state, execute };\n}\n```\n\n## 2. Error Boundary for Global Handling\n\n```tsx\nimport React, { Component, ReactNode } from \'react\';\n\ninterface Props {\n  children: ReactNode;\n  fallback?: ReactNode;\n}\n\ninterface State {\n  hasError: boolean;\n  error?: Error;\n}\n\nclass ApiErrorBoundary extends Component<Props, State> {\n  constructor(props: Props) {\n    super(props);\n    this.state = { hasError: false };\n  }\n\n  static getDerivedStateFromError(error: Error): State {\n    return { hasError: true, error };\n  }\n\n  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {\n    console.error(\'API Error caught by boundary:\', error, errorInfo);\n    // You can also log to an error reporting service here\n  }\n\n  render() {\n    if (this.state.hasError) {\n      return this.props.fallback || (\n        <div className="text-center p-4">\n          <h2 className="text-xl font-semibold text-red-600 mb-2">\n            Something went wrong\n          </h2>\n          <p className="text-gray-600">\n            {this.state.error?.message || \'An unexpected error occurred\'}\n          </p>\n        </div>\n      );\n    }\n\n    return this.props.children;\n  }\n}\n```\n\n## 3. Usage Example\n\n```tsx\nfunction UserProfile({ userId }: { userId: string }) {\n  const { data: user, loading, error, execute } = useApi<User>();\n\n  useEffect(() => {\n    execute(() => fetchUser(userId));\n  }, [userId, execute]);\n\n  if (loading) return <div>Loading...</div>;\n  \n  if (error) {\n    return (\n      <div className="bg-red-50 border border-red-200 rounded p-4">\n        <h3 className="text-red-800 font-semibold">Error Loading User</h3>\n        <p className="text-red-600">{error.message}</p>\n        {error.status && (\n          <p className="text-red-500 text-sm">Status: {error.status}</p>\n        )}\n        <button \n          onClick={() => execute(() => fetchUser(userId))}\n          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"\n        >\n          Retry\n        </button>\n      </div>\n    );\n  }\n\n  return user ? <UserCard user={user} /> : null;\n}\n```\n\nThis approach provides:\n- ✅ Centralized error handling\n- ✅ Loading states\n- ✅ Retry functionality\n- ✅ Type safety\n- ✅ Reusable across components',
				timestamp: '2024-01-14T14:25:00Z'
			},
			{
				id: 'msg-7',
				type: 'text',
				role: 'user',
				content: 'This is really helpful! How would you handle network timeouts specifically?',
				timestamp: '2024-01-14T15:40:00Z'
			},
			{
				id: 'msg-8',
				type: 'text',
				role: 'assistant',
				content: 'Excellent follow-up question! Here\'s how to handle network timeouts effectively:\n\n## Custom Fetch with Timeout\n\n```tsx\nclass TimeoutError extends Error {\n  constructor(timeout: number) {\n    super(`Request timed out after ${timeout}ms`);\n    this.name = \'TimeoutError\';\n  }\n}\n\nfunction fetchWithTimeout(\n  url: string,\n  options: RequestInit = {},\n  timeout: number = 10000\n): Promise<Response> {\n  return new Promise((resolve, reject) => {\n    const controller = new AbortController();\n    \n    // Set up the timeout\n    const timeoutId = setTimeout(() => {\n      controller.abort();\n      reject(new TimeoutError(timeout));\n    }, timeout);\n    \n    // Make the request\n    fetch(url, {\n      ...options,\n      signal: controller.signal,\n    })\n      .then(response => {\n        clearTimeout(timeoutId);\n        resolve(response);\n      })\n      .catch(error => {\n        clearTimeout(timeoutId);\n        if (error.name === \'AbortError\') {\n          reject(new TimeoutError(timeout));\n        } else {\n          reject(error);\n        }\n      });\n  });\n}\n```\n\n## Enhanced API Hook with Retry Logic\n\n```tsx\ninterface RetryConfig {\n  maxRetries: number;\n  retryDelay: number;\n  backoffMultiplier: number;\n}\n\nfunction useApiWithRetry<T>(retryConfig: RetryConfig = {\n  maxRetries: 3,\n  retryDelay: 1000,\n  backoffMultiplier: 2\n}) {\n  const [state, setState] = useState<UseApiState<T>>({\n    data: null,\n    loading: false,\n    error: null,\n  });\n  \n  const [retryCount, setRetryCount] = useState(0);\n\n  const executeWithRetry = useCallback(async (\n    apiCall: () => Promise<T>,\n    attempt: number = 0\n  ): Promise<T> => {\n    setState(prev => ({ ...prev, loading: true, error: null }));\n    \n    try {\n      const result = await apiCall();\n      setState({ data: result, loading: false, error: null });\n      setRetryCount(0);\n      return result;\n    } catch (err) {\n      const isTimeoutError = err instanceof TimeoutError;\n      const isNetworkError = err instanceof TypeError;\n      const shouldRetry = (isTimeoutError || isNetworkError) && \n                         attempt < retryConfig.maxRetries;\n      \n      if (shouldRetry) {\n        const delay = retryConfig.retryDelay * \n                     Math.pow(retryConfig.backoffMultiplier, attempt);\n        \n        setRetryCount(attempt + 1);\n        \n        await new Promise(resolve => setTimeout(resolve, delay));\n        return executeWithRetry(apiCall, attempt + 1);\n      } else {\n        const error: ApiError = {\n          message: err instanceof Error ? err.message : \'Unknown error\',\n          status: err?.response?.status,\n          code: err?.code || (isTimeoutError ? \'TIMEOUT\' : \'NETWORK_ERROR\'),\n        };\n        setState({ data: null, loading: false, error });\n        setRetryCount(0);\n        throw error;\n      }\n    }\n  }, [retryConfig]);\n\n  return { ...state, execute: executeWithRetry, retryCount };\n}\n```\n\n## Usage with Timeout Handling\n\n```tsx\nfunction DataComponent() {\n  const { data, loading, error, execute, retryCount } = useApiWithRetry();\n\n  const loadData = useCallback(() => {\n    execute(() => \n      fetchWithTimeout(\'/api/data\', {}, 5000) // 5 second timeout\n        .then(response => response.json())\n    );\n  }, [execute]);\n\n  useEffect(() => {\n    loadData();\n  }, [loadData]);\n\n  if (loading) {\n    return (\n      <div className="flex items-center space-x-2">\n        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>\n        <span>Loading...</span>\n        {retryCount > 0 && (\n          <span className="text-sm text-gray-500">\n            (Retry {retryCount}/3)\n          </span>\n        )}\n      </div>\n    );\n  }\n\n  if (error) {\n    const isTimeout = error.code === \'TIMEOUT\';\n    \n    return (\n      <div className="bg-red-50 border border-red-200 rounded p-4">\n        <h3 className="text-red-800 font-semibold">\n          {isTimeout ? \'Request Timed Out\' : \'Connection Error\'}\n        </h3>\n        <p className="text-red-600">{error.message}</p>\n        <button \n          onClick={loadData}\n          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"\n        >\n          Try Again\n        </button>\n      </div>\n    );\n  }\n\n  return <div>{/* Your data display */}</div>;\n}\n```\n\nKey features:\n- ⏱️ Configurable timeouts\n- 🔄 Automatic retry with exponential backoff\n- 🎯 Specific timeout error handling\n- 📊 Retry attempt tracking\n- 🚫 Request cancellation support',
				timestamp: '2024-01-14T15:45:00Z'
			}
		]
	},
	{
		id: 'thread-3',
		userId: 'user-1',
		title: 'CSS Grid Layout',
		createdAt: '2024-01-13T09:15:00Z',
		updatedAt: '2024-01-13T10:30:00Z',
		messages: [
			{
				id: 'msg-9',
				type: 'text',
				role: 'user',
				content: 'Can you explain CSS Grid and show me a practical example?',
				timestamp: '2024-01-13T09:15:00Z'
			},
			{
				id: 'msg-10',
				type: 'text',
				role: 'assistant',
				content: 'CSS Grid is a powerful layout system that allows you to create complex, responsive layouts with ease! Here\'s a comprehensive explanation with examples:\n\n## Basic Grid Concepts\n\nCSS Grid works with:\n- **Grid Container**: The parent element with `display: grid`\n- **Grid Items**: The direct children of the grid container\n- **Grid Lines**: The dividing lines that make up the structure\n- **Grid Areas**: Rectangular areas defined by grid lines\n\n## Practical Example: Dashboard Layout\n\n```css\n.dashboard {\n  display: grid;\n  grid-template-columns: 250px 1fr 300px;\n  grid-template-rows: 60px 1fr 50px;\n  grid-template-areas:\n    "sidebar header notifications"\n    "sidebar main notifications"\n    "sidebar footer footer";\n  height: 100vh;\n  gap: 1rem;\n}\n\n.sidebar {\n  grid-area: sidebar;\n  background: #2d3748;\n  color: white;\n  padding: 1rem;\n}\n\n.header {\n  grid-area: header;\n  background: #4a5568;\n  color: white;\n  display: flex;\n  align-items: center;\n  padding: 0 1rem;\n}\n\n.notifications {\n  grid-area: notifications;\n  background: #f7fafc;\n  padding: 1rem;\n  overflow-y: auto;\n}\n\n.main {\n  grid-area: main;\n  background: white;\n  padding: 2rem;\n  overflow-y: auto;\n}\n\n.footer {\n  grid-area: footer;\n  background: #e2e8f0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n/* Responsive Design */\n@media (max-width: 768px) {\n  .dashboard {\n    grid-template-columns: 1fr;\n    grid-template-rows: 60px auto 1fr auto 50px;\n    grid-template-areas:\n      "header"\n      "sidebar"\n      "main"\n      "notifications"\n      "footer";\n  }\n  \n  .sidebar {\n    max-height: 200px;\n    overflow-y: auto;\n  }\n}\n```\n\n## Advanced Grid Features\n\n### 1. Fractional Units (fr)\n```css\n.container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr; /* 1:2:1 ratio */\n}\n```\n\n### 2. Repeat Function\n```css\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n}\n```\n\n### 3. Grid Lines and Positioning\n```css\n.featured-item {\n  grid-column: 1 / 3; /* Span from line 1 to line 3 */\n  grid-row: 1 / 2;\n}\n\n.sidebar-item {\n  grid-column: 3 / 4;\n  grid-row: 1 / 3; /* Span 2 rows */\n}\n```\n\n## React Component Example\n\n```tsx\nimport React from \'react\';\n\nconst DashboardLayout: React.FC = () => {\n  return (\n    <div className="dashboard">\n      <aside className="sidebar">\n        <h2 className="text-xl font-bold mb-4">Navigation</h2>\n        <nav>\n          <ul className="space-y-2">\n            <li><a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</a></li>\n            <li><a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Analytics</a></li>\n            <li><a href="#" className="block py-2 px-3 rounded hover:bg-gray-700">Settings</a></li>\n          </ul>\n        </nav>\n      </aside>\n      \n      <header className="header">\n        <h1 className="text-2xl font-bold">Dashboard</h1>\n      </header>\n      \n      <aside className="notifications">\n        <h3 className="font-semibold mb-3">Notifications</h3>\n        <div className="space-y-2">\n          <div className="bg-blue-100 p-2 rounded text-sm">\n            New user registered\n          </div>\n          <div className="bg-green-100 p-2 rounded text-sm">\n            Payment received\n          </div>\n        </div>\n      </aside>\n      \n      <main className="main">\n        <h2 className="text-xl font-semibold mb-4">Main Content</h2>\n        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\n          {/* Content cards */}\n          <div className="bg-gray-50 p-4 rounded">Card 1</div>\n          <div className="bg-gray-50 p-4 rounded">Card 2</div>\n          <div className="bg-gray-50 p-4 rounded">Card 3</div>\n        </div>\n      </main>\n      \n      <footer className="footer">\n        <p className="text-sm text-gray-600">© 2024 Your Company</p>\n      </footer>\n    </div>\n  );\n};\n\nexport default DashboardLayout;\n```\n\n## Key Advantages of CSS Grid\n\n1. **Two-dimensional layout**: Control both rows and columns\n2. **Flexible sizing**: Use fr units, percentages, fixed sizes\n3. **Responsive design**: Easy media query adjustments\n4. **Semantic structure**: Named grid areas improve readability\n5. **No need for floats or positioning hacks**\n\nCSS Grid is perfect for creating complex layouts like dashboards, magazine-style layouts, and responsive card grids!',
				timestamp: '2024-01-13T09:30:00Z'
			},
			{
				id: 'msg-11',
				type: 'text',
				role: 'user',
				content: 'This is awesome! Can you show me how to create a responsive image gallery with Grid?',
				timestamp: '2024-01-13T10:25:00Z'
			},
			{
				id: 'msg-12',
				type: 'text',
				role: 'assistant',
				content: 'Absolutely! Here\'s a beautiful responsive image gallery using CSS Grid:\n\n```css\n.image-gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  grid-auto-rows: 250px;\n  gap: 1rem;\n  padding: 1rem;\n}\n\n.gallery-item {\n  border-radius: 8px;\n  overflow: hidden;\n  transition: transform 0.3s ease;\n  position: relative;\n}\n\n.gallery-item:hover {\n  transform: scale(1.05);\n}\n\n.gallery-item img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n/* Featured items that span multiple cells */\n.gallery-item.featured {\n  grid-column: span 2;\n  grid-row: span 2;\n}\n\n.gallery-item.wide {\n  grid-column: span 2;\n}\n\n.gallery-item.tall {\n  grid-row: span 2;\n}\n```\n\n```tsx\nimport React, { useState } from \'react\';\n\ninterface GalleryImage {\n  id: number;\n  src: string;\n  alt: string;\n  featured?: boolean;\n  wide?: boolean;\n  tall?: boolean;\n}\n\nconst ImageGallery: React.FC = () => {\n  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);\n  \n  const images: GalleryImage[] = [\n    { id: 1, src: \'/api/placeholder/500/500\', alt: \'Landscape 1\', featured: true },\n    { id: 2, src: \'/api/placeholder/250/250\', alt: \'Portrait 1\' },\n    { id: 3, src: \'/api/placeholder/250/250\', alt: \'Square 1\' },\n    { id: 4, src: \'/api/placeholder/500/250\', alt: \'Wide 1\', wide: true },\n    { id: 5, src: \'/api/placeholder/250/500\', alt: \'Tall 1\', tall: true },\n    { id: 6, src: \'/api/placeholder/250/250\', alt: \'Square 2\' },\n    // ... more images\n  ];\n\n  return (\n    <div className="container mx-auto">\n      <h1 className="text-3xl font-bold text-center mb-8">Photo Gallery</h1>\n      \n      <div className="image-gallery">\n        {images.map((image) => (\n          <div\n            key={image.id}\n            className={`gallery-item cursor-pointer ${\n              image.featured ? \'featured\' : \'\'\n            } ${\n              image.wide ? \'wide\' : \'\'\n            } ${\n              image.tall ? \'tall\' : \'\'\n            }`}\n            onClick={() => setSelectedImage(image)}\n          >\n            <img\n              src={image.src}\n              alt={image.alt}\n              className="transition-transform duration-300 hover:scale-110"\n            />\n            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">\n              <span className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">\n                View Image\n              </span>\n            </div>\n          </div>\n        ))}\n      </div>\n      \n      {/* Modal for fullscreen view */}\n      {selectedImage && (\n        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">\n          <div className="max-w-4xl max-h-4xl p-4">\n            <img\n              src={selectedImage.src}\n              alt={selectedImage.alt}\n              className="max-w-full max-h-full object-contain"\n            />\n            <button\n              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"\n              onClick={() => setSelectedImage(null)}\n            >\n              ×\n            </button>\n          </div>\n        </div>\n      )}\n    </div>\n  );\n};\n\nexport default ImageGallery;\n```\n\nThis gallery features:\n- 📱 **Responsive design** that adapts to any screen size\n- 🖼️ **Variable sized items** (featured, wide, tall)\n- ✨ **Smooth hover effects**\n- 🔍 **Modal lightbox** for fullscreen viewing\n- 🎯 **Auto-fit columns** that adjust based on available space\n\nThe key is using `repeat(auto-fit, minmax(250px, 1fr))` which creates as many columns as possible while keeping each at least 250px wide!',
				timestamp: '2024-01-13T10:30:00Z'
			}
		]
	},
	{
		id: 'thread-4',
		userId: 'user-1',
		title: 'TypeScript Best Practices',
		createdAt: '2024-01-12T16:45:00Z',
		updatedAt: '2024-01-12T17:20:00Z',
		messages: [
			{
				id: 'msg-13',
				type: 'text',
				role: 'user',
				content: 'What are some TypeScript best practices I should follow in my React projects?',
				timestamp: '2024-01-12T16:45:00Z'
			},
			{
				id: 'msg-14',
				type: 'text',
				role: 'assistant',
				content: 'Great question! Here are the essential TypeScript best practices for React projects:\n\n## 1. Strict TypeScript Configuration\n\n```json\n// tsconfig.json\n{\n  "compilerOptions": {\n    "strict": true,\n    "noImplicitAny": true,\n    "noImplicitReturns": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "exactOptionalPropertyTypes": true\n  }\n}\n```\n\n## 2. Proper Component Typing\n\n```tsx\n// ✅ Good: Explicit interface for props\ninterface ButtonProps {\n  children: React.ReactNode;\n  variant: \'primary\' | \'secondary\' | \'danger\';\n  size?: \'small\' | \'medium\' | \'large\';\n  disabled?: boolean;\n  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;\n}\n\nconst Button: React.FC<ButtonProps> = ({ \n  children, \n  variant, \n  size = \'medium\', \n  disabled = false, \n  onClick \n}) => {\n  return (\n    <button\n      className={`btn btn-${variant} btn-${size}`}\n      disabled={disabled}\n      onClick={onClick}\n    >\n      {children}\n    </button>\n  );\n};\n\n// ❌ Avoid: Any or loose typing\nconst BadButton = (props: any) => {\n  return <button {...props} />;\n};\n```\n\n## 3. API Response Typing\n\n```tsx\n// Define API response shapes\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n  avatar?: string;\n  createdAt: string;\n}\n\ninterface ApiResponse<T> {\n  data: T;\n  message: string;\n  success: boolean;\n}\n\n// Type your API calls\nasync function fetchUser(id: string): Promise<User> {\n  const response = await fetch(`/api/users/${id}`);\n  const result: ApiResponse<User> = await response.json();\n  \n  if (!result.success) {\n    throw new Error(result.message);\n  }\n  \n  return result.data;\n}\n```\n\n## 4. Custom Hooks with Proper Typing\n\n```tsx\ninterface UseAsyncState<T> {\n  data: T | null;\n  loading: boolean;\n  error: string | null;\n}\n\nfunction useAsync<T>(\n  asyncFunction: () => Promise<T>,\n  dependencies: React.DependencyList = []\n): UseAsyncState<T> {\n  const [state, setState] = useState<UseAsyncState<T>>({\n    data: null,\n    loading: true,\n    error: null,\n  });\n\n  useEffect(() => {\n    let isMounted = true;\n    \n    setState({ data: null, loading: true, error: null });\n    \n    asyncFunction()\n      .then(data => {\n        if (isMounted) {\n          setState({ data, loading: false, error: null });\n        }\n      })\n      .catch(error => {\n        if (isMounted) {\n          setState({ \n            data: null, \n            loading: false, \n            error: error.message || \'An error occurred\' \n          });\n        }\n      });\n      \n    return () => {\n      isMounted = false;\n    };\n  }, dependencies);\n\n  return state;\n}\n\n// Usage\nfunction UserProfile({ userId }: { userId: string }) {\n  const { data: user, loading, error } = useAsync(\n    () => fetchUser(userId),\n    [userId]\n  );\n\n  if (loading) return <div>Loading...</div>;\n  if (error) return <div>Error: {error}</div>;\n  if (!user) return <div>No user found</div>;\n\n  return <div>Welcome, {user.name}!</div>;\n}\n```\n\n## 5. Union Types and Discriminated Unions\n\n```tsx\n// ✅ Good: Discriminated unions for state management\ntype AsyncState<T> =\n  | { status: \'idle\' }\n  | { status: \'loading\' }\n  | { status: \'success\'; data: T }\n  | { status: \'error\'; error: string };\n\nfunction DataComponent() {\n  const [state, setState] = useState<AsyncState<User>>({ status: \'idle\' });\n\n  const handleLoad = async () => {\n    setState({ status: \'loading\' });\n    try {\n      const data = await fetchUser(\'123\');\n      setState({ status: \'success\', data });\n    } catch (error) {\n      setState({ \n        status: \'error\', \n        error: error instanceof Error ? error.message : \'Unknown error\' \n      });\n    }\n  };\n\n  // TypeScript knows the shape based on status\n  switch (state.status) {\n    case \'idle\':\n      return <button onClick={handleLoad}>Load User</button>;\n    case \'loading\':\n      return <div>Loading...</div>;\n    case \'success\':\n      return <div>Hello, {state.data.name}!</div>; // data is typed as User\n    case \'error\':\n      return <div>Error: {state.error}</div>; // error is typed as string\n  }\n}\n```\n\n## 6. Generic Components\n\n```tsx\ninterface ListProps<T> {\n  items: T[];\n  renderItem: (item: T, index: number) => React.ReactNode;\n  keyExtractor: (item: T) => string | number;\n  emptyMessage?: string;\n}\n\nfunction List<T>({\n  items,\n  renderItem,\n  keyExtractor,\n  emptyMessage = \'No items found\'\n}: ListProps<T>) {\n  if (items.length === 0) {\n    return <div className="text-gray-500">{emptyMessage}</div>;\n  }\n\n  return (\n    <ul>\n      {items.map((item, index) => (\n        <li key={keyExtractor(item)}>\n          {renderItem(item, index)}\n        </li>\n      ))}\n    </ul>\n  );\n}\n\n// Usage with full type safety\n<List\n  items={users}\n  keyExtractor={user => user.id}\n  renderItem={user => <UserCard user={user} />}\n  emptyMessage="No users available"\n/>\n```\n\n## 7. Utility Types\n\n```tsx\n// Use built-in utility types\ntype CreateUserData = Omit<User, \'id\' | \'createdAt\'>;\ntype UpdateUserData = Partial<Pick<User, \'name\' | \'email\'>>;\ntype UserKeys = keyof User;\n\n// Create custom utility types\ntype NonNullable<T> = T extends null | undefined ? never : T;\ntype ApiKeys<T> = {\n  [K in keyof T]: T[K] extends string ? K : never;\n}[keyof T];\n```\n\n## Key Takeaways\n\n1. **Always use interfaces for object shapes**\n2. **Type your API responses and async operations**\n3. **Use discriminated unions for complex state**\n4. **Leverage generic components for reusability**\n5. **Enable strict TypeScript options**\n6. **Use utility types to derive new types**\n7. **Type event handlers properly**\n\nThese practices will make your code more maintainable, catch bugs early, and provide excellent IDE support!',
				timestamp: '2024-01-12T17:20:00Z'
			}
		]
	}
]

// Model options for the chat interface
export const mockModels = [
	{ id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
	{ id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
	{ id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
	{ id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
	{ id: 'gemini-pro', name: 'Gemini Pro', provider: 'Google' }
]
