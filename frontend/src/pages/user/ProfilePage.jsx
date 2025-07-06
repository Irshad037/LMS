import React, { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import useAuthStore from '../../store/useAuthStore';
import user_icon from '../../assets/user_icon.svg';

const ProfilePage = () => {
    const { authUser } = useAuthStore();
    const [activeTab, setActiveTab] = useState('overview');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <>
                        <h2 className="text-xl font-semibold text-zinc-800 mb-4">About</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            {authUser?.bio || 'No bio provided'}
                        </p>
                    </>
                );
            case 'enrolled':
                return (
                    <p className="text-zinc-500 italic">You haven't enrolled in any courses yet.</p>
                );
            case 'created':
                return (
                    <p className="text-zinc-500 italic">You haven't create any courses yet.</p>
                );
            case 'settings':
                return (
                    <p className="text-zinc-500 italic">Settings will be available soon.</p>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6">
                <div>
                    <img
                        src={authUser?.profileImg || user_icon}
                        alt="Profile"
                        className={
                            authUser?.profileImg
                                ? 'w-28 h-28 rounded-full border-4 border-blue-600 object-cover'
                                : 'w-28 h-28 rounded-full bg-zinc-200 p-2'
                        }
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-zinc-800">{authUser?.name}</h1>
                    <p className="text-zinc-500">{authUser?.email}</p>
                    <div className="mt-2 inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full capitalize">
                        {authUser?.role}
                    </div>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
                    <FaUserEdit /> Edit Profile
                </button>
            </div>

            {/* Tabs */}
            <div className="mt-10">
                <div className="flex gap-6 border-b border-gray-200 mb-6">
                    {(authUser?.role === 'instructor'
                        ? ['overview', 'enrolled', 'created', 'settings']
                        : ['overview', 'enrolled', 'settings']
                    ).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`capitalize pb-2 transition font-medium ${activeTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-zinc-500 hover:text-blue-600'
                                }`}
                        >
                            {tab === 'enrolled'
                                ? 'Enrolled Courses'
                                : tab === 'created'
                                    ? 'Created Courses'
                                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                
                {/* Tab Content */}
                <div className="bg-white rounded-xl p-6 shadow">{renderTabContent()}</div>
            </div>

        </div>
    );
};

export default ProfilePage;
