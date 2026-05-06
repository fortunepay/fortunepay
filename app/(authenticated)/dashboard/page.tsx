import Image from 'next/image'

export const metadata = {
    title: "Fortunepay",
};

export default function DashboardPage() {
    return (
        <>
            <div className="relative w-full h-56 rounded-xl overflow-hidden shadow mb-6">
                <Image
                    src="/backgrounds/home.webp"
                    alt="Dashboard Banner"
                    fill
                    className="object-cover"
                    loading="eager"
                    sizes='auto'
                />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <h5 className="text-lg font-semibold mb-2">Users</h5>
                    <p className="text-gray-500">
                        Manage platform users and permissions.
                    </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <h5 className="text-lg font-semibold mb-2">Analytics</h5>
                    <p className="text-gray-500">
                        View dashboard insights and statistics.
                    </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                    <h5 className="text-lg font-semibold mb-2">Settings</h5>
                    <p className="text-gray-500">
                        Configure system and application settings.
                    </p>
                </div>
            </div>
        </>
    )
}