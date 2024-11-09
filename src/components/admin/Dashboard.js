
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui/card';

export const Dashboard = () => {
    return (
        <>
            <div className="container mx-auto py-8">
                <div className="mb-6">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search here..."
                    />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create Event</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Button variant="primary">Create Event</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Ongoing Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium">John's Wedding</h3>
                                    <p className="text-gray-500">johnswedding.atithiagman.com</p>
                                    <p className="text-gray-500">11/November/2024</p>
                                    <div className="flex justify-end">
                                        <Button variant="subtle" size="sm" className="mr-2">
                                            Edit
                                        </Button>
                                        <Button variant="subtle" size="sm" className="text-red-500">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">John's Wedding</h3>
                                    <p className="text-gray-500">johnswedding.atithiagman.com</p>
                                    <p className="text-gray-500">11/November/2024</p>
                                    <div className="flex justify-end">
                                        <Button variant="subtle" size="sm" className="mr-2">
                                            Edit
                                        </Button>
                                        <Button variant="subtle" size="sm" className="text-red-500">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Completed Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium">John's Wedding</h3>
                                    <p className="text-gray-500">johnswedding.atithiagman.com</p>
                                    <p className="text-gray-500">11/November/2024</p>
                                    <div className="flex justify-end">
                                        <Button variant="subtle" size="sm" className="mr-2">
                                            Edit
                                        </Button>
                                        <Button variant="subtle" size="sm" className="text-red-500">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">John's Wedding</h3>
                                    <p className="text-gray-500">johnswedding.atithiagman.com</p>
                                    <p className="text-gray-500">11/November/2024</p>
                                    <div className="flex justify-end">
                                        <Button variant="subtle" size="sm" className="mr-2">
                                            Edit
                                        </Button>
                                        <Button variant="subtle" size="sm" className="text-red-500">
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};