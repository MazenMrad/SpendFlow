"use client"

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSession } from "next-auth/react";
import { changePassword } from '../actions/auth';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Account() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [alertConfig, setAlertConfig] = useState<{
        open: boolean;
        title: string;
        description: string;
        type: 'success' | 'error';
    }>({
        open: false,
        title: '',
        description: '',
        type: 'success'
    });

    useEffect(() => {
        if (session?.user) {
            setFormData({
                fullName: session.user.name || '',
                email: session.user.email || '',
            });
        }
    }, [session]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        setIsEditing(false);
        console.log('Account updated:', formData);
    };

    return (
        <Layout pageTitle="Account">
            <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
                {/* Profile Card */}
                <div className="bg-white rounded-[20px] lg:rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA] p-6 lg:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-primary to-teal-primary flex items-center justify-center">
                                <span className="text-white font-gilroy-bold text-2xl">
                                    {formData.fullName ? formData.fullName.slice(0, 2).toUpperCase() : 'MR'}
                                </span>
                            </div>
                        </div>
                        {/* Profile Info */}
                        <div className="flex-1">
                            <h2 className="text-text-primary font-gilroy-bold text-2xl lg:text-3xl">
                                {formData.fullName}
                            </h2>
                            <p className="text-text-secondary font-gilroy-regular text-sm lg:text-base mt-1">
                                {formData.email}
                            </p>
                            <p className="text-text-secondary font-gilroy-regular text-sm mt-2">
                                Member since January 2024
                            </p>
                        </div>

                        {/* Edit Button */}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-6 py-2 rounded-lg font-gilroy-bold cursor-pointer text-sm font-medium transition-colors ${isEditing
                                ? 'bg-red-notification text-white hover:bg-red-notification/90'
                                : 'bg-teal-primary text-white hover:bg-teal-primary/90'
                                }`}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                {/* Personal Information Card */}
                <div className="bg-white rounded-[20px] lg:rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA] p-6 lg:p-8">
                    <h3 className="text-text-primary font-gilroy-bold text-xl lg:text-2xl mb-6">
                        Personal Information
                    </h3>

                    <div className="space-y-5">
                        {/* Full Name */}
                        <div className="flex flex-col">
                            <label htmlFor="fullName" className="text-text-primary font-gilroy-bold text-sm mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="h-10 border border-border-light rounded-lg px-3 text-text-primary font-gilroy-regular bg-white disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-text-primary font-gilroy-bold text-sm mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="h-10 border border-border-light rounded-lg px-3 text-text-primary font-gilroy-regular bg-white disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-accent"
                            />
                        </div>

                        {/* Password */}
                        <div className="border-t border-border-light pt-5">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h4 className="text-text-primary font-gilroy-bold text-base mb-1">
                                            Password
                                        </h4>
                                        <p className="text-text-secondary font-gilroy-regular text-sm">
                                            Manage your password
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsChangingPassword(!isChangingPassword)}
                                        className="mt-3 md:mt-0 px-6 py-2 border border-border-light hover:bg-gray-50 text-text-primary font-gilroy-bold cursor-pointer text-sm font-medium rounded-lg transition-colors"
                                    >
                                        {isChangingPassword ? "Cancel" : "Change Password"}
                                    </button>
                                </div>

                                {isChangingPassword && (
                                    <div className="space-y-4 pt-4">
                                        <div className="flex flex-col">
                                            <label className="text-text-primary font-gilroy-bold text-sm mb-2">Current Password</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={passwordData.currentPassword}
                                                onChange={handlePasswordChange}
                                                className="h-10 border border-border-light rounded-lg px-3 mb-2"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-text-primary font-gilroy-bold text-sm mb-2">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                className="h-10 border border-border-light rounded-lg px-3 mb-2"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-text-primary font-gilroy-bold text-sm mb-2">Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                className="h-10 border border-border-light rounded-lg px-3"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                onClick={async () => {
                                                    if (passwordData.newPassword !== passwordData.confirmPassword) {
                                                        setAlertConfig({
                                                            open: true,
                                                            title: 'Wait!',
                                                            description: 'Passwords do not match. Please check and try again.',
                                                            type: 'error'
                                                        });
                                                        return;
                                                    }
                                                    const fd = new FormData();
                                                    fd.append("currentPassword", passwordData.currentPassword);
                                                    fd.append("newPassword", passwordData.newPassword);
                                                    const res = await changePassword(fd);
                                                    if (res.success) {
                                                        setAlertConfig({
                                                            open: true,
                                                            title: 'Success!',
                                                            description: 'Your password has been changed successfully.',
                                                            type: 'success'
                                                        });
                                                        setIsChangingPassword(false);
                                                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                                    } else {
                                                        setAlertConfig({
                                                            open: true,
                                                            title: 'Error',
                                                            description: res.error || "Failed to change password. Please try again.",
                                                            type: 'error'
                                                        });
                                                    }
                                                }}
                                                className="px-6 py-2 bg-[#017EFA] text-white rounded-lg font-gilroy-bold"
                                            >
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    {isEditing && (
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={handleSave}
                                className="px-8 py-2 bg-teal-primary hover:bg-teal-primary/90 text-white font-gilroy-bold cursor-pointer text-sm font-medium rounded-lg transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
                </div>

                {/* Delete Account */}
                <div className="bg-white rounded-[20px] lg:rounded-[39px] shadow-[0_4px_20px_0_rgba(0,0,0,0.25),0_5px_10px_0_#F1F2FA] p-6 lg:p-8 border-l-4 border-red-notification">
                    <button className="px-6 py-2 bg-red-notification hover:bg-red-notification/90 text-white font-gilroy-bold cursor-pointer text-sm font-medium rounded-lg transition-colors">
                        Delete Account
                    </button>
                </div>
            </div>

            <AlertDialog open={alertConfig.open} onOpenChange={(open) => setAlertConfig(prev => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className={alertConfig.type === 'error' ? 'text-red-600' : 'text-green-600'}>
                            {alertConfig.title}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertConfig.description}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setAlertConfig(prev => ({ ...prev, open: false }))}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Layout>
    );
}
