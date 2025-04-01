

export default function Unauthorized() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-12">
            <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-center text-2xl font-bold text-gray-900">Unauthorized Access</h2>
                <p className="mt-4 text-center text-gray-600">You do not have permission to access this page.</p>
                <p className="mt-4 text-center text-gray-600">If you believe this is a mistake, please contact your administrator.</p>
                <p className="mt-4 text-center text-gray-600">Please check the URL or return to the homepage.</p>
                <a href="/" className="mt-4 block text-center text-indigo-600 hover:underline">
                    Go to Homepage
                </a>
                {/* <button
                    onClick={() => window.history.back()}
                    className="mt-4 block w-full text-center text-indigo-600 hover:underline"
                >
                    Go Back
                </button> */}
                {/* <p className="mt-4 text-center text-gray-600">If you think this is a mistake, please contact support.</p>
                <a href="/contact" className="mt-4 block text-center text-indigo-600 hover:underline">
                    Contact Support
                </a> */}
                {/* <p className="mt-4 text-center text-gray-600">Or return to the previous page.</p>
                <button
                    onClick={() => window.history.back()}
                    className="mt-4 block w-full text-center text-indigo-600 hover:underline"
                >
                    Go Back
                </button> */}
                {/* <p className="mt-4 text-center text-gray-600">If you are an admin, please check your permissions.</p>
                <p className="mt-4 text-center text-gray-600">If you are not an admin, please contact your administrator.</p> */}
                {/* <a href="/" className="mt-4 block text-center text-indigo-600 hover:underline">
                    Go to Homepage
                </a> */}
            </div>
        </div>
    )
}
