"use client";

import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

const InvitationForm = () => {
    const [memberCount, setMemberCount] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        mobile: ''
    });

    const handleIncrement = () => {
        setMemberCount(prev => prev + 1);
    };

    const handleDecrement = () => {
        setMemberCount(prev => prev > 0 ? prev - 1 : 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log({ ...formData, memberCount });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 bg-opacity-25"
            style={{
                backgroundImage: 'url("/invite.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <Card className="w-full max-w-md mx-4 bg-[#18130c] bg-opacity-20 backdrop-blur-sm p-8 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold text-white">Submit Form</h1>
                        <p className="text-gray-200">Confirm Your Invitation By filling this form</p>
                    </div>

                    <div className="space-y-4">
                        <Input
                            placeholder="Enter Your Name"
                            className="bg-white text-black h-12 rounded-full px-6"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <Input
                            placeholder="Enter Mobile Number"
                            type="tel"
                            className="bg-white text-black h-12 rounded-full px-6"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />

                        <div className="flex items-center justify-between rounded-full px-6 h-12">
                            <span className="text-white">How many member coming?</span>
                            <div className="flex items-center gap-2 bg-white px-3 h-10 rounded-full ">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-black text-white"
                                    onClick={handleDecrement}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-black w-4 text-center">{memberCount}</span>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-full bg-black text-white"
                                    onClick={handleIncrement}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 rounded-full bg-amber-400 hover:bg-amber-500 text-black font-semibold"
                    >
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default InvitationForm;