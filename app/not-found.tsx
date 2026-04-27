export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-6">

            <h1 className="text-[120px] font-extrabold text-gray-800 leading-none">
                404
            </h1>

            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
                Oops! Page not found
            </h2>
        </div>
    );
}